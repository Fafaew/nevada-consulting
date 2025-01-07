import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import '/node_modules/flag-icons/css/flag-icons.min.css';

import Logo from '../assets/icons/Logo.jsx';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = (newLanguage) => {
    if (newLanguage !== currentLanguage) {
      changeLanguage(newLanguage);
      setCurrentLanguage(newLanguage);
    }
  };

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: t('navbar.home') },
    { id: 2, text: t('navbar.company') },
    { id: 3, text: t('navbar.resources') },
    { id: 4, text: t('navbar.about') },
    { id: 5, text: t('navbar.contact') },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white'>
      <Logo width='80px' className='ml-6' />

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
          onClick={() => handleChangeLanguage('pt')}
          className='fi fi-br h-[32px] cursor-pointer'
        ></button>
        <button
          onClick={() => handleChangeLanguage('en')}
          className='fi fi-us h-[32px] ml-4 cursor-pointer'
        ></button>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-24 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
