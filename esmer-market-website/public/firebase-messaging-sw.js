// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Store for Firebase config
let firebaseConfig = null;

// Wait for Firebase config message from the main application
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    firebaseConfig = event.data.config;
    initializeFirebase();
  }
});

// Initialize Firebase when config is available
function initializeFirebase() {
  if (!firebaseConfig) return;

  try {
    // Initialize the Firebase app in the service worker by passing in
    // your app's Firebase config object.
    firebase.initializeApp({
      apiKey: firebaseConfig.FIREBASE_API_KEY,
      authDomain: firebaseConfig.FIREBASE_AUTH_DOMAIN,
      projectId: firebaseConfig.FIREBASE_PROJECT_ID,
      storageBucket: firebaseConfig.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: firebaseConfig.FIREBASE_MESSAGING_SENDER_ID,
      appId: firebaseConfig.FIREBASE_APP_ID,
    });

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging();

    // Handle background message
    messaging.onBackgroundMessage((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      
      // Customize notification here
      const notificationTitle = payload.notification.title || 'Background Message Title';
      const notificationOptions = {
        body: payload.notification.body || 'Background Message body.',
        icon: '/icon.png'
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });

    console.log('[firebase-messaging-sw.js] Firebase initialized successfully');
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Firebase initialization error:', error);
  }
} 