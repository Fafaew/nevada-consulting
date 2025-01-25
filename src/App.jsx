import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import { LanguageProvider } from './lib/LanguageContext';

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <Navbar />
        <Routes>
          {/* Redireciona a rota base para o idioma padrão */}
          <Route
            path='/'
            element={<Navigate to='/nevada-consulting/pt' replace />}
          />
          <Route path='/nevada-consulting/' element={<HomePage />} />
          <Route path='/nevada-consulting/pt' element={<HomePage />} />
          <Route path='/nevada-consulting/en' element={<HomePage />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
};

const HomePage = () => (
  <>
    <Header id='home' />
    <Services id='services' />
    <About id='about' />
    <Contact id='contact' />
  </>
);

export default App;
