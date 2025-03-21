import { useState, useEffect, useCallback } from 'react';
import { MessagePayload } from 'firebase/messaging';
import { requestNotificationPermission, setupMessageListener } from '../firebase/notifications';

export type NotificationStatus = 'initial' | 'granted' | 'denied' | 'unavailable';

interface UseNotificationsReturn {
  notificationStatus: NotificationStatus;
  requestPermission: () => Promise<void>;
  fcmToken: string | null;
  lastNotification: MessagePayload | null;
}

export function useNotifications(): UseNotificationsReturn {
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('initial');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<MessagePayload | null>(null);

  // Check if notifications are available in this browser/environment
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      setNotificationStatus('unavailable');
      return;
    }

    // Check if the browser supports notifications
    if (!('Notification' in window)) {
      setNotificationStatus('unavailable');
      return;
    }

    // Check current permission status
    if (Notification.permission === 'granted') {
      setNotificationStatus('granted');
    } else if (Notification.permission === 'denied') {
      setNotificationStatus('denied');
    }

    // Setup message listener if permission is granted
    if (Notification.permission === 'granted') {
      setupMessageListener((payload) => {
        setLastNotification(payload);
      });
    }
  }, []);

  // Function to request permission
  const requestPermission = useCallback(async () => {
    if (notificationStatus === 'unavailable') {
      return;
    }

    try {
      const token = await requestNotificationPermission();
      
      if (token) {
        setFcmToken(token);
        setNotificationStatus('granted');
        
        // Setup message listener
        setupMessageListener((payload) => {
          setLastNotification(payload);
        });
      } else {
        setNotificationStatus('denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setNotificationStatus('denied');
    }
  }, [notificationStatus]);

  return {
    notificationStatus,
    requestPermission,
    fcmToken,
    lastNotification,
  };
} 