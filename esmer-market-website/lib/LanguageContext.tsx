"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


type LanguageContextType = {
  language: string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'tr',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language] = useState('tr');
  const { i18n } = useTranslation();

  // Set language to Turkish on mount
  useEffect(() => {
    i18n.changeLanguage('tr');
    document.documentElement.lang = 'tr'; // Update html lang attribute
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
}; 