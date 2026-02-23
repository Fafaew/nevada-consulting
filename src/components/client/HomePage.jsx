'use client';

import Navbar from './Navbar';
import Header from './Header';
import Services from './Services';
import Clients from './Clients';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

import blip from '../../assets/imgs/blip.webp';
import komuh from '../../assets/imgs/komuh.webp';
import okto from '../../assets/imgs/okto.webp';
import quive from '../../assets/imgs/quive.webp';
import rv from '../../assets/imgs/rv.webp';
import edvisor from '../../assets/imgs/edvisor.webp';
import moveo from '../../assets/imgs/moveo.webp';

const clientLogos = [blip, komuh, okto, quive, rv, edvisor, moveo];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Header id='home' />
      <Services id='services' />
      <Clients id='clients' logos={clientLogos} />
      <About id='about' />
      <Contact id='contact' />
      <Footer />
    </>
  );
}
