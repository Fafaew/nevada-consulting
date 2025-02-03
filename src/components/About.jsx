import { motion } from 'framer-motion';
import { React, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import juProfile from '../assets/imgs/juProfile.webp';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id='about'>
      <h2 className='flex justify-center text-4xl font-bold mt-12 mb-6 sm:mb-12 text-purple-secondary'>
        {t('about.title')}
      </h2>
      <div className='w-full px-8 pb-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-auto'>
        <div>
          <h3 className='text-4xl md:text-3xl font-semibold'>
            {t('about.subtitle')}
          </h3>
          <p className='text-base md:text-lg text-slate-700 my-4 md:my-6'>
            {t('about.history.first')}
          </p>
          <p className='text-base md:text-lg text-slate-700 my-4 md:my-6'>
            {t('about.history.second')}
          </p>
          <p className='text-base md:text-lg text-slate-700 my-4 md:my-6'>
            {t('about.history.third')}
          </p>
          <p className='text-base md:text-lg text-slate-700 my-4 md:my-6'>
            {t('about.history.fourth')}
          </p>
        </div>
        <ShuffleGrid />
      </div>
      <div className='w-full bg-purple-secondary grid grid-cols-1 md:grid-cols-[35%_65%] relative items-center overflow-visible'>
        <div className='col-span-1 md:col-start-1 relative mx-auto md:mx-0 md:mt-0 md:absolute md:left-28 mt-0 md:-top-4 md:-bottom-4 md:w-[60%]'>
          <h2 className='text-center text-4xl font-bold mt-7 lg:hidden'>
            Juliana Carvalho
          </h2>
          <h3 className='text-center font-medium text-xl mt-1 mb-6 lg:hidden'>
            {t('about.description.subtitle')}
          </h3>
          <img
            className='w-full h-full object-cover rounded-none lg:rounded-3xl'
            src={juProfile}
            alt='Juliana Carvalho'
          />
        </div>
        <div className='col-span-1 md:col-start-2 p-6 md:pl-0 mx-4 md:mr-14 mt-0 lg:mt-6'>
          <h2 className='text-4xl font-bold hidden lg:block'>
            Juliana Carvalho
          </h2>
          <h3 className='font-medium text-xl mt-1 hidden lg:block'>
            {t('about.description.subtitle')}
          </h3>
          <p className='mt-0 lg:mt-6'>{t('about.description.first')}</p>
          <p className='mt-4'>{t('about.description.second')}</p>
          <p className='mt-4'>{t('about.description.third')}</p>
          <p className='mt-4'>{t('about.description.fourth')}</p>
        </div>
      </div>
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1633119446564-877e2c2ae501?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/5439428/pexels-photo-5439428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: 'tween' }}
      className='w-full h-full'
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className='grid grid-cols-3 grid-rows-2 h-[450px] gap-1'>
      {squares.map((sq) => sq)}
    </div>
  );
};

export default About;
