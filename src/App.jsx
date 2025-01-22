import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import About from './components/About';
import { LanguageProvider } from './lib/LanguageContext';
import Contact from './components/Contact';

const app = () => {
  return (
    <div>
      <LanguageProvider>
        <Navbar />
        <Header />
        <Services />
        <About />
        <Contact />
      </LanguageProvider>
    </div>
  );
};

export default app;
