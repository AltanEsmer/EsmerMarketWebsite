# Push Notifications Guide

This document provides information on how to use push notifications in the Esmer Market website, both for users and administrators.

## For Users

### Enabling Notifications

1. When you visit the Esmer Market website, you'll see a notification permission prompt on the homepage.
2. Click "Enable Notifications" to receive updates about:
   - Special promotions and sales
   - Order status updates
   - New product arrivals
   - Market events and news

### Managing Notification Permissions

If you need to manage your notification permissions after your initial choice:

**Chrome**:
1. Click the lock icon in the address bar
2. Select "Notifications" from the dropdown
3. Choose "Allow" or "Block" as needed

**Firefox**:
1. Click the lock icon in the address bar
2. Select "Notifications" from the dropdown
3. Choose "Allow" or "Block" as needed

**Safari**:
1. Go to Safari > Preferences > Websites > Notifications
2. Find "Esmer Market" in the list
3. Choose "Allow" or "Deny" as needed

### Notification Types

As a user, you may receive the following types of notifications:

1. **Promotional Notifications**: Information about sales, discounts, and special offers
2. **Order Updates**: Status changes for your orders (confirmed, processing, ready for pickup)
3. **New Product Notifications**: Alerts when new seasonal products arrive
4. **Event Notifications**: Information about upcoming market events or changes in operating hours

## For Administrators

### Sending Notifications

Administrators can send notifications to users via:

1. **Firebase Console**:
   - Log in to the [Firebase Console](https://console.firebase.google.com/)
   - Navigate to your project
   - Go to "Messaging" > "Campaigns"
   - Create a new campaign following the steps in the interface

2. **Admin Dashboard** (Coming Soon):
   - Log in to the Esmer Market admin dashboard
   - Navigate to the "Notifications" section
   - Create and send notifications to all users or specific user segments

### Creating Notification Campaigns

When creating a notification campaign:

1. **Choose a meaningful title**: Keep it short and clear
2. **Write a concise message body**: Provide the essential information
3. **Add an action URL**: Link to relevant pages (e.g., promotion page)
4. **Schedule appropriately**: Consider timing for maximum engagement
5. **Target specific segments**: Send to relevant user groups when possible

### Notification Best Practices

1. **Frequency**: Limit notifications to 1-2 per week to avoid user fatigue
2. **Timing**: Send between 10 AM and 8 PM local time
3. **Content**: Ensure each notification provides clear value to the user
4. **Testing**: Test notifications on multiple devices before sending to all users
5. **Tracking**: Monitor open rates and engagement to optimize future notifications

### Technical Implementation

For developers and administrators who need to extend the notification system:

1. **FCM Tokens**: User FCM tokens are generated when they grant notification permission
2. **Server Integration**: The backend can store and manage these tokens for targeted notifications
3. **Custom Notifications**: Use the Firebase Admin SDK or FCM REST API to send custom notifications
4. **Notification Analytics**: View delivery and engagement metrics in the Firebase Console

### Example: Sending a Notification via API

```javascript
// Example server-side code (Node.js with Firebase Admin SDK)
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendNotification(token, title, body, link) {
  try {
    const message = {
      notification: {
        title,
        body
      },
      data: {
        url: link
      },
      token
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Example usage
sendNotification(
  'USER_FCM_TOKEN',
  'Weekend Special: Fresh Produce',
  'Visit our store this weekend for 20% off all fresh produce!',
  'https://esmermarket.com/promotions/weekend-special'
);
```

## Troubleshooting

### User Issues

Common issues users may experience:

1. **Not receiving notifications**: 
   - Check browser notification permissions
   - Ensure the device is connected to the internet
   - Verify that notifications are not disabled at the system level

2. **Too many notifications**: 
   - Users can manage notification permissions through their browser settings

### Administrator Issues

Common issues administrators may encounter:

1. **Failed notification delivery**:
   - Check FCM token validity
   - Verify Firebase project configuration
   - Ensure the notification payload is correctly formatted

2. **Low engagement rates**:
   - Review notification content and timing
   - Segment users more effectively
   - Test different notification strategies

For technical support or additional questions, please contact the development team. 