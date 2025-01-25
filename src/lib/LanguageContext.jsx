/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const urlLanguage = pathParts[0];
    if (['pt', 'en'].includes(urlLanguage)) {
      i18n.changeLanguage(urlLanguage);
      setCurrentLanguage(urlLanguage);
    } else {
      const defaultLanguage = 'pt';
      i18n.changeLanguage(defaultLanguage);
      setCurrentLanguage(defaultLanguage);
    }
  }, [i18n]);

  const changeLanguage = (newLanguage) => {
    if (newLanguage !== currentLanguage) {
      i18n.changeLanguage(newLanguage);
      setCurrentLanguage(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
