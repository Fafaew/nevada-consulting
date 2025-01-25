import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import Clients from './components/Clients';
import About from './components/About';
import Contact from './components/Contact';
import { LanguageProvider } from './lib/LanguageContext';
import Footer from './components/Footer';

import blip from '../src/assets/imgs/blip.webp';
import komuh from '../src/assets/imgs/komuh.webp';
import okto from '../src/assets/imgs/okto.webp';
import quive from '../src/assets/imgs/quive.webp';
import rv from '../src/assets/imgs/rv.webp';

const clientLogos = [blip, komuh, okto, quive, rv];

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pt' element={<HomePage />} />
          <Route path='/en' element={<HomePage />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
};

const HomePage = () => (
  <>
    <Header id='home' />
    <Services id='services' />
    <Clients id='clients' logos={clientLogos} />
    <About id='about' />
    <Contact id='contact' />
    <Footer />
  </>
);

export default App;
