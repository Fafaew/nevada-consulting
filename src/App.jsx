import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { LanguageProvider } from './lib/LanguageContext';

const app = () => {
  return (
    <div>
      <LanguageProvider>
        <Navbar />
        <Header />
      </LanguageProvider>
    </div>
  );
};

export default app;
