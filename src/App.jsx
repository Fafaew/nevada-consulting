import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import { LanguageProvider } from './lib/LanguageContext';

const app = () => {
  return (
    <div>
      <LanguageProvider>
        <Navbar />
        <Header />
        <Services />
      </LanguageProvider>
    </div>
  );
};

export default app;
