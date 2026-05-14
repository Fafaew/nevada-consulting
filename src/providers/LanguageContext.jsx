'use client';

/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    const urlLanguage = pathParts[0];
    if (['pt', 'en'].includes(urlLanguage)) {
      i18n.changeLanguage(urlLanguage);
      setCurrentLanguage(urlLanguage);
      localStorage.setItem('lang', urlLanguage);
    }
  }, [pathname, i18n]);

  const changeLanguage = (newLanguage) => {
    if (newLanguage !== currentLanguage) {
      i18n.changeLanguage(newLanguage);
      setCurrentLanguage(newLanguage);
      localStorage.setItem('lang', newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
