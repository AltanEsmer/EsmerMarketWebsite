"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../lib/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tr' : 'en';
    setLanguage(newLanguage);
  };
  
  return (
    <button 
      onClick={toggleLanguage}
      className="ml-3 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors flex items-center"
      aria-label={t('language.switch')}
    >
      <span className="mr-1">{language === 'en' ? '🇬🇧' : '🇹🇷'}</span>
      <span>{t('language.switch')}</span>
    </button>
  );
} 