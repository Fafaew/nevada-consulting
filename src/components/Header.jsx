import React from 'react';

import { RevealText } from '../utils/RevealText';
import { useTranslation } from 'react-i18next';

import logo from '../assets/imgs/logo.webp';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className='relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 h-[80vh] lg:h-auto'>
      <img
        alt=''
        src='https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        className='absolute inset-0 -z-10 size-full object-cover object-right md:object-center scale-x-[-1]'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/90'></div>

      <div
        aria-hidden='true'
        className='hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl'
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className='aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20'
        />
      </div>
      <div
        aria-hidden='true'
        className='absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu'
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className='aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20'
        />
      </div>
      <div className=' relative mx-auto max-w-7xl px-6 lg:px-8 flex justify-center bottom-8 lg:bottom-20'>
        <div className='mx-auto max-w-2xl lg:mx-0 flex flex-col items-center'>
          <img
            src={logo}
            alt='Descrição da imagem'
            className='h-24 lg:h-48 mb-4'
          />
          <h1 className='text-5xl font-semibold tracking-tight text-white sm:text-7xl text-center'>
            Nevada Consulting
          </h1>
          <div className='mt-8 lg:mt-6 text-3xl text-center h-12 lg:h-auto'>
            <RevealText />
          </div>
          <div className='group relative w-fit transition-transform duration-300 active:scale-95 mt-14'>
            <button className='relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 group-hover:scale-110 w-60'>
              <span className='flex items-center justify-center rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80 h-12'>
                {t('navbar.contact')}
              </span>
            </button>
            <span className='pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50'></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
