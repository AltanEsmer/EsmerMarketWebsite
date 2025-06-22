"use client";

import { useEffect, useState } from 'react';
import { isStoreOpen } from '../utils/hours';
import { useTranslation } from 'react-i18next';

/**
 * Component that indicates whether the store is currently open or closed
 * Updates automatically every minute
 */
export default function IsOpenIndicator() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Check if store is open on initial render
    setIsOpen(isStoreOpen());
    
    // Update the status every minute
    const interval = setInterval(() => {
      setIsOpen(isStoreOpen());
    }, 60000); // 60000ms = 1 minute
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center space-x-2">
      <div 
        className={`w-3 h-3 rounded-full ${
          isOpen ? 'bg-green-500' : 'bg-red-500'
        }`}
        aria-hidden="true"
      />
      <span className={`text-sm font-medium ${
        isOpen ? 'text-green-600' : 'text-red-600'
      }`}>
        {isOpen ? t('store.open') : t('store.closed')}
      </span>
    </div>
  );
} 