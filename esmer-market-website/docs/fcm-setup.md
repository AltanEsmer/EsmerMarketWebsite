# Firebase Cloud Messaging (FCM) Setup Guide

This document provides instructions on how to set up and use Firebase Cloud Messaging (FCM) for push notifications in the Esmer Market website.

## Prerequisites

1. A Firebase account
2. Access to the [Firebase Console](https://console.firebase.google.com/)
3. Admin privileges for the Esmer Market website

## Firebase Project Setup

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new Firebase project
3. Enter your project name (e.g., "Esmer Market")
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"

### 2. Register Your Web App

1. Once your project is created, click on the Web icon (</>) to add a web app
2. Enter a nickname for your app (e.g., "Esmer Market Web")
3. Check the box to set up Firebase Hosting if needed
4. Click "Register app"
5. Firebase will generate a configuration object. Save these values for later use

### 3. Set Up Cloud Messaging

1. In the Firebase Console, navigate to your project
2. Go to "Project Settings" > "Cloud Messaging" tab
3. Under "Web configuration", click "Generate key pair" to create a VAPID key
4. Save the generated VAPID key for later use

## Environment Configuration

Update the `.env.local` file with your Firebase configuration values:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_VAPID_KEY=YOUR_FIREBASE_VAPID_KEY
```

Replace the placeholders with the actual values from your Firebase project.

## Implementation Details

The FCM implementation includes the following components:

### 1. Firebase Configuration

Located in `lib/firebase/firebaseConfig.ts`, this file initializes the Firebase app and messaging service.

### 2. Notification Utilities

Located in `lib/firebase/notifications.ts`, this file provides functions for:
- Requesting notification permission
- Setting up message listeners
- Handling incoming notifications

### 3. Service Worker

Located in `public/firebase-messaging-sw.js`, this service worker handles background notifications when the website is not in focus.

### 4. React Hook

Located in `lib/hooks/useNotifications.ts`, this hook provides a simple interface for React components to:
- Request notification permissions
- Get notification status
- Receive FCM tokens
- Handle incoming notifications

### 5. Notification Permission Component

Located in `app/components/NotificationPermission.tsx`, this component provides a UI for users to enable notifications.

## Usage Examples

### Requesting Notification Permission

```tsx
import { useNotifications } from '../../lib/hooks/useNotifications';

function MyComponent() {
  const { notificationStatus, requestPermission } = useNotifications();
  
  return (
    <button onClick={requestPermission}>
      Enable Notifications
    </button>
  );
}
```

### Displaying the Notification Permission Component

```tsx
import NotificationPermission from './components/NotificationPermission';

function MyPage() {
  return (
    <div>
      <h1>Welcome to Esmer Market</h1>
      <NotificationPermission className="my-4" />
    </div>
  );
}
```

## Testing Notifications

### Using Firebase Console

1. Go to the Firebase Console
2. Navigate to "Messaging" > "Campaigns"
3. Click "New Campaign"
4. Select "Notification message"
5. Fill out the notification details (title, body, etc.)
6. Under "Target", select your app
7. Under "Target user segment", select "User segment" and create a new segment or use an existing one
8. Click "Review" and then "Publish"

### Using the FCM REST API

You can also send notifications programmatically using the FCM REST API. Here's an example using curl:

```bash
curl -X POST -H "Authorization: key=YOUR_SERVER_KEY" -H "Content-Type: application/json" \
  -d '{
    "to": "DEVICE_TOKEN",
    "notification": {
      "title": "New Promotion",
      "body": "Check out our new weekly specials!"
    }
  }' \
  https://fcm.googleapis.com/fcm/send
```

Replace `YOUR_SERVER_KEY` with your Firebase Server Key and `DEVICE_TOKEN` with the FCM token of the target device.

## Troubleshooting

### Notifications Not Showing Up

- Make sure the user has granted notification permissions
- Check browser settings to ensure notifications are not blocked
- Verify that the FCM token is correctly generated and stored

### Service Worker Issues

- Make sure the service worker is properly registered
- Check that the Firebase configuration is correctly passed to the service worker
- Verify that the service worker is receiving the postMessage with Firebase config

### Firebase Token Not Generated

- Check that the VAPID key is correctly set in the `.env.local` file
- Verify that Firebase is properly initialized
- Check browser console for any errors 