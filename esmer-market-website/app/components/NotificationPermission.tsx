"use client";

import { useState } from 'react';
import { useNotifications } from '../../lib/hooks/useNotifications';

interface NotificationPermissionProps {
  className?: string;
}

export default function NotificationPermission({ className }: NotificationPermissionProps) {
  const { notificationStatus, requestPermission } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestPermission = async () => {
    setIsLoading(true);
    await requestPermission();
    setIsLoading(false);
  };

  if (notificationStatus === 'unavailable') {
    return null; // Don't render anything if notifications are unavailable
  }

  if (notificationStatus === 'granted') {
    return (
      <div className={`text-sm text-green-600 ${className || ''}`}>
        You will receive notifications for promotions and updates
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      <p className="text-sm">
        Get notified about promotions, order updates, and more!
      </p>
      <button
        onClick={handleRequestPermission}
        disabled={isLoading}
        className={`inline-flex items-center justify-center px-4 py-2 rounded text-sm font-medium 
        ${isLoading 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-black text-white hover:bg-gray-800 transition-colors'
        }`}
      >
        {isLoading ? 'Requesting...' : 'Enable Notifications'}
      </button>
    </div>
  );
} 