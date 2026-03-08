'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Testimonials from './Testimonials';

import Image from 'next/image';
import juProfile from '../../assets/imgs/juProfile.webp';

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
        <div className='col-span-1 md:col-start-1 flex flex-col items-center justify-center py-10 px-6'>
          <h2 className='text-center text-4xl font-bold mb-1 lg:hidden'>
            Juliana Carvalho
          </h2>
          <h3 className='text-center font-medium text-xl mb-6 lg:hidden'>
            {t('about.description.subtitle')}
          </h3>
          <div className='w-52 h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-white shadow-xl'>
            <Image
              className='w-full h-full object-cover scale-150 object-[center_15%]'
              src={juProfile}
              alt='Juliana Carvalho'
              width={512}
              height={512}
            />
          </div>
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
      <Testimonials />
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

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(squareData);

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(shuffle([...squareData]));

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className='grid grid-cols-3 grid-rows-2 h-[450px] gap-1'>
      {squares.map((sq) => (
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
        />
      ))}
    </div>
  );
};

export default About;
