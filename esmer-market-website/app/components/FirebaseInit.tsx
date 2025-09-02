"use client";

import { useEffect } from 'react';
import { initializeFirestoreCollections } from '../../lib/firebase/initCollections';

export default function FirebaseInit() {
  useEffect(() => {
    // Skip initialization on server-side
    if (typeof window === 'undefined') return;
    
    // Initialize Firestore collections with sample data if needed
    initializeFirestoreCollections()
      .then(() => console.log('Firestore collections initialized'))
      .catch(error => console.error('Failed to initialize Firestore collections:', error));
  }, []);

  // This component doesn't render anything visible
  return null;
} 