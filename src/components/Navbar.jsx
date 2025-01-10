import React, { useState } from 'react';
import '/node_modules/flag-icons/css/flag-icons.min.css';

import Logo from '../assets/icons/Logo.jsx';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../lib/LanguageContext.jsx';
import { AnimatedHamburgerButton } from '../utils/HamburgerButton';

const Navbar = () => {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();

  const [nav, setNav] = useState(false);

  const navItems = [
    { id: 1, text: t('navbar.home') },
    { id: 2, text: t('navbar.services') },
    { id: 3, text: t('navbar.clients') },
    { id: 4, text: t('navbar.about') },
    { id: 5, text: t('navbar.contact') },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-16 lg:h-24 mx-auto px-4 text-white'>
      <Logo className='ml-4 lg:ml-12 w-12 lg:w-32' />

      <h1 className='w-full text-3xl font-bold text-purple-primary'></h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-center'>
        {navItems.map((item) => (
          <li
            key={item.id}
            className='p-4 hover:bg-purple-primary rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            {item.text}
          </li>
        ))}
        <button
          onClick={() => changeLanguage('pt')}
          className='fi fi-br h-[32px] cursor-pointer ml-8'
        ></button>
        <button
          onClick={() => changeLanguage('en')}
          className='fi fi-us h-[32px] ml-4 mr-4 cursor-pointer'
        ></button>
      </ul>

      {/* Mobile Navigation Icon */}
      <div className='block md:hidden'>
        <AnimatedHamburgerButton active={nav} setActive={setNav} />
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`fixed md:hidden top-16 left-0 w-full h-auto border-r border-r-gray-900 bg-[#000300] z-10 transition-opacity duration-500 ${
          nav ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className='p-4 pl-8 border-b rounded-xl hover:bg-purple-primary duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
        <div className='p-4 pl-8 border-b rounded-xl hover:bg-purple-primary duration-300 hover:text-black cursor-pointer border-gray-600 flex items-center'>
          <p>{t('navbar.language')}</p>
          <button
            onClick={() => changeLanguage('pt')}
            className='fi fi-br h-[32px] cursor-pointer ml-5 lg:ml-8'
            style={{ width: '28px' }}
          ></button>
          <button
            onClick={() => changeLanguage('en')}
            className='fi fi-us h-[32px] ml-5 lg:ml-4 mr-4 cursor-pointer'
            style={{ width: '28px' }}
          ></button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
