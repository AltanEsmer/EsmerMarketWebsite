import { messaging, getToken, onMessage } from './firebaseConfig';
import { Messaging, MessagePayload } from 'firebase/messaging';

/**
 * Request notification permission from the user
 * @returns Promise with FCM token if permission is granted
 */
export const requestNotificationPermission = async () => {
  if (!messaging) {
    console.warn("Messaging is not initialized");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      // Get the FCM token
      const token = await getToken(messaging as Messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return null;
  }
};

/**
 * Set up handler for incoming FCM messages
 * @param callback Optional callback to handle notification data
 */
export const setupMessageListener = (callback?: (payload: MessagePayload) => void) => {
  if (!messaging) {
    console.warn("Messaging is not initialized");
    return;
  }

  onMessage(messaging as Messaging, (payload) => {
    console.log("Message received:", payload);
    
    // Display notification
    if (Notification.permission === 'granted') {
      const notificationTitle = payload.notification?.title || "New Notification";
      const notificationOptions = {
        body: payload.notification?.body,
        icon: '/icon.png', // Use an appropriate icon from your public folder
      };
      
      new Notification(notificationTitle, notificationOptions);
    }
    
    // Call custom callback if provided
    if (callback && typeof callback === 'function') {
      callback(payload);
    }
  });
}; 