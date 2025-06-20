"use client";

import { useEffect } from 'react';
import { initializeFirestoreCollections } from '../../lib/firebase/initCollections';

export default function FirebaseInit() {
  useEffect(() => {
    // Skip initialization on server-side
    if (typeof window === 'undefined') return;
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
          
          // Pass environment variables to service worker
          if (registration.active) {
            registration.active.postMessage({
              type: 'FIREBASE_CONFIG',
              config: {
                FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
              }
            });
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
    
    // Initialize Firestore collections with sample data if needed
    initializeFirestoreCollections()
      .then(() => console.log('Firestore collections initialized'))
      .catch(error => console.error('Failed to initialize Firestore collections:', error));
  }, []);

  // This component doesn't render anything visible
  return null;
} 