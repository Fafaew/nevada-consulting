'use client';

import React, { useState } from 'react';
import 'flag-icons/css/flag-icons.min.css';
import { Link } from 'react-scroll';
import Logo from '../../assets/icons/Logo.jsx';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../providers/LanguageContext.jsx';
import { AnimatedHamburgerButton } from './HamburgerButton';
import { useRouter } from 'next/navigation';
import { useScrollDirection } from '../../hooks/useScrollDirection.js';
import LoginModal from './LoginModal.jsx';
import { useSession, signOut } from 'next-auth/react';

const Navbar = ({ hideNav = false }) => {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguage();
  const router = useRouter();

  const { data: session } = useSession();
  const [nav, setNav] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const scrollDirection = useScrollDirection();

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    router.push(`/${lang}${hideNav ? '/account' : ''}`);
  };

  const navItems = [
    { id: 1, text: t('navbar.home'), to: 'home' },
    { id: 2, text: t('navbar.services'), to: 'services' },
    { id: 3, text: t('navbar.clients'), to: 'clients' },
    { id: 4, text: t('navbar.about'), to: 'about' },
    { id: 5, text: t('navbar.contact'), to: 'contact' },
  ];

  const logoEl = hideNav ? (
    <button onClick={() => router.push(`/${currentLanguage}`)}>
      <Logo className='ml-4 lg:ml-12 w-10 mb-2 lg:mb-0 lg:w-14 cursor-pointer' />
    </button>
  ) : (
    <Link
      to='home'
      smooth={true}
      duration={800}
      easing='easeInOutQuart'
      onClick={() => setNav(false)}
    >
      <Logo className='ml-4 lg:ml-12 w-10 mb-2 lg:mb-0 lg:w-14 cursor-pointer' />
    </Link>
  );

  return (
    <div
      className={`bg-black flex justify-between items-center h-16 lg:h-24 w-screen mx-auto px-4 text-white fixed z-50 transition-all duration-300 ${
        scrollDirection === 'down' ? '-top-24' : 'top-0'
      }`}
    >
      {logoEl}

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-center lg:mr-8'>
        {!hideNav &&
          navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                smooth={true}
                duration={800}
                easing='easeInOutQuart'
                className='p-4 hover:bg-purple-primary rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
              >
                {item.text}
              </Link>
            </li>
          ))}
        <button
          onClick={() => handleLanguageChange('pt')}
          className='fi fi-br h-[32px] cursor-pointer ml-8 lg:mr-2'
        ></button>
        <button
          onClick={() => handleLanguageChange('en')}
          className='fi fi-us h-[32px] ml-4 mr-4 cursor-pointer'
        ></button>
        {session ? (
          <>
            <button
              onClick={() =>
                hideNav
                  ? router.push(`/${currentLanguage}`)
                  : router.push(`/${currentLanguage}/account`)
              }
              className='ml-4 px-4 py-2 border border-purple-primary text-purple-primary hover:bg-purple-primary hover:text-white rounded-lg transition-colors duration-300 cursor-pointer font-medium'
            >
              {hideNav ? t('navbar.homePage') : t('navbar.myAccount')}
            </button>
            <button
              onClick={() => signOut()}
              className='ml-2 px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors duration-300 cursor-pointer font-medium'
            >
              {t('navbar.logout')}
            </button>
          </>
        ) : (
          <button
            onClick={() => setLoginOpen(true)}
            className='ml-4 px-4 py-2 border border-purple-primary text-purple-primary hover:bg-purple-primary hover:text-white rounded-lg transition-colors duration-300 cursor-pointer font-medium'
          >
            {t('navbar.login')}
          </button>
        )}
      </ul>

      {/* Mobile Navigation Icon */}
      <div className='block md:hidden'>
        <AnimatedHamburgerButton active={nav} setActive={setNav} />
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`fixed md:hidden top-16 left-0 w-full h-auto border-r border-r-gray-900 bg-[#000300] z-10 transition-opacity duration-800 ${
          nav ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Mobile Navigation Items */}
        {!hideNav &&
          navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                smooth={true}
                duration={800}
                easing='easeInOutQuart'
                className='block p-4 pl-8 border-b rounded-xl hover:bg-purple-primary duration-300 hover:text-black cursor-pointer border-gray-600'
                onClick={() => setNav(false)}
              >
                {item.text}
              </Link>
            </li>
          ))}
        {session ? (
          <>
            <li>
              <button
                onClick={() => {
                  hideNav
                    ? router.push(`/${currentLanguage}`)
                    : router.push(`/${currentLanguage}/account`);
                  setNav(false);
                }}
                className='block w-full text-left p-4 pl-8 border-b rounded-xl hover:bg-purple-primary duration-300 hover:text-black cursor-pointer border-gray-600'
              >
                {hideNav ? t('navbar.homePage') : t('navbar.myAccount')}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut();
                  setNav(false);
                }}
                className='block w-full text-left p-4 pl-8 border-b rounded-xl hover:bg-red-500 duration-300 hover:text-white cursor-pointer border-gray-600'
              >
                {t('navbar.logout')}
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => {
                setLoginOpen(true);
                setNav(false);
              }}
              className='block w-full text-left p-4 pl-8 border-b rounded-xl hover:bg-purple-primary duration-300 hover:text-black cursor-pointer border-gray-600'
            >
              {t('navbar.login')}
            </button>
          </li>
        )}
        <div className='p-4 pl-8 border-b rounded-xl hover:bg-purple-primary duration-300 hover:text-black cursor-pointer border-gray-600 flex items-center'>
          <p>{t('navbar.language')}</p>
          <button
            onClick={() => handleLanguageChange('pt')}
            className='fi fi-br h-[32px] cursor-pointer ml-5 lg:ml-8'
            style={{ width: '28px' }}
          ></button>
          <button
            onClick={() => handleLanguageChange('en')}
            className='fi fi-us h-[32px] ml-5 lg:ml-4 mr-4 cursor-pointer'
            style={{ width: '28px' }}
          ></button>
        </div>
      </ul>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default Navbar;
