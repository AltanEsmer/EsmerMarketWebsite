# Ticket 4: Implement Firebase Cloud Messaging (FCM)

## **Objective**
Integrate Firebase Cloud Messaging (FCM) into the Esmer Market website to enable push notifications for promotions, order updates, and other real-time alerts.

---

## **Requirements**
### **1. Firebase Setup**
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Enable **Firebase Cloud Messaging (FCM)**.
- Generate and configure the **Server Key** & **VAPID Key** for Web Push Notifications.

### **2. Install Firebase SDK**
- Install the Firebase package in the Next.js project:
  ```sh
  npm install firebase
  ```
- Create a `firebaseConfig.ts` file to initialize Firebase.

### **3. Implement Notification Permission Request**
- Ask the user for notification permission when they visit the site.
- Store and manage FCM tokens for users.

### **4. Handle Incoming Notifications**
- Use Firebase's `onMessage` listener to display push notifications.
- Ensure notifications appear even when the website is open.

### **5. Send Test Notifications**
- Use Firebase Console’s **Cloud Messaging** section to send test push notifications to the web app.
- Ensure notifications work as expected on different browsers.

---

## **Implementation Details**
### **1. Firebase Configuration**
Create `firebaseConfig.ts`:
```typescript
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
```

### **2. Request Notification Permission**
Create a function to request permission:
```typescript
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_PUBLIC_KEY",
      });
      console.log("FCM Token:", token);
    } else {
      console.warn("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error requesting notifications:", error);
  }
};
```

### **3. Handle Incoming Messages**
Modify `firebaseConfig.ts` to handle messages:
```typescript
import { onMessage } from "firebase/messaging";

onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  new Notification(payload.notification?.title || "New Notification", {
    body: payload.notification?.body,
  });
});
```

---

## **Potential Errors & Fixes**

### **1. Notifications Not Showing Up**
- **Fix:** Ensure `Notification.requestPermission()` is granted.
- **Fix:** Check browser settings for blocked notifications.

### **2. Firebase Token Not Generated**
- **Fix:** Make sure the **VAPID Key** is set correctly in `getToken()`.
- **Fix:** Verify that the Firebase configuration keys are correct.

### **3. Notifications Not Received When Site is Open**
- **Fix:** Use `onMessage()` in the foreground to handle notifications properly.

---

## **Next Steps**
- Add a UI component to toggle notifications on/off.
- Store FCM tokens in the database for targeted notifications.
- Implement admin functionality to send notifications to users.

---

## **Documentation Updates**
- Update **docs/fcm-setup.md** with setup and configuration details.
- Update **docs/push-notifications.md** with usage instructions for enabling/disabling notifications.

