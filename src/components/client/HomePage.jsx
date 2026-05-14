'use client';

import Navbar from './Navbar';
import Header from './Header';
import Services from './Services';
import Clients from './Clients';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Header id='home' />
      <Services id='services' />
      <Clients id='clients' />
      <About id='about' />
      <Contact id='contact' />
      <Footer />
    </>
  );
}
