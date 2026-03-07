'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../providers/LanguageContext.jsx';
import ServiceSelectorModal from './ServiceSelectorModal.jsx';

import {
  PiBuildingOfficeThin,
  PiPresentationChart,
  PiStrategy,
} from 'react-icons/pi';
import { FaChartLine } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';

const Services = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [selectorOpen, setSelectorOpen] = useState(false);

  const items = [
    {
      id: 1,
      slug: 'high-performance-team',
      icon: <PiBuildingOfficeThin />,
      subtitle: t('services.first.subtitle'),
      description: t('services.first.description'),
    },
    {
      id: 3,
      slug: 'recruitment-training',
      icon: <FaChartLine />,
      subtitle: t('services.third.subtitle'),
      description: t('services.third.description'),
    },
    {
      id: 4,
      slug: 'behavioral-assessment',
      icon: <RiTeamLine />,
      subtitle: t('services.fourth.subtitle'),
      description: t('services.fourth.description'),
    },
    {
      id: 5,
      slug: 'resume-linkedin-portfolio',
      icon: <PiStrategy />,
      subtitle: t('services.fifth.subtitle'),
      description: t('services.fifth.description'),
    },
    {
      id: 6,
      slug: 'interview-preparation',
      icon: <PiPresentationChart />,
      subtitle: t('services.sixth.subtitle'),
      description: t('services.sixth.description'),
    },
  ];

  return (
    <>
      <div
        id='services'
        className='bg-gradient-to-b from-black to-gray-800 w-full text-white text-center pb-16'
      >
        <div className='max-w-full mx-auto flex flex-col w-full h-full'>
          <h2 className='flex justify-center text-4xl font-bold my-12 text-[antiquewhite]'>
            {t('services.title')}
          </h2>

          {/* B2C — cards em destaque */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:px-5'>
            {items.slice(2).map(({ id, slug, icon, subtitle, description }) => (
              <Link
                key={id}
                href={`/${currentLanguage}/services/${slug}`}
                className='mx-6 sm:mx-0 px-8 pt-6 pb-8 rounded-xl border border-purple-primary/25
                  bg-purple-primary/5 shadow-md shadow-purple-secondary duration-200
                  hover:scale-105 hover:shadow-purple-primary hover:border-purple-primary/60'
              >
                <div className='text-purple-primary'>
                  {React.cloneElement(icon, { className: 'w-12 h-12 m-auto' })}
                </div>
                <div className='font-bold text-center mt-3'>{subtitle}</div>
                <div className='text-center text-gray-300 text-sm mt-4'>{description}</div>
              </Link>
            ))}
          </div>

          {/* B2B — seção "Serviços para empresas" */}
          <div className='mt-14 sm:px-5'>
            <p className='text-xs font-semibold uppercase tracking-widest text-purple-primary/70 mb-4 px-6 sm:px-0'>
              {t('services.b2bLabel')}
            </p>
            <div className='flex flex-wrap justify-center gap-8'>
              {items.slice(0, 2).map(({ id, slug, icon, subtitle, description }) => (
                <Link
                  key={id}
                  href={`/${currentLanguage}/services/${slug}`}
                  className='w-[25rem] mx-6 sm:mx-0 px-8 pt-6 pb-8 rounded-xl border border-purple-primary/25
                    bg-purple-primary/5 shadow-md shadow-purple-secondary duration-200
                    hover:scale-105 hover:shadow-purple-primary hover:border-purple-primary/60'
                >
                  <div className='text-purple-primary'>
                    {React.cloneElement(icon, { className: 'w-12 h-12 m-auto' })}
                  </div>
                  <div className='font-bold text-center mt-3'>{subtitle}</div>
                  <div className='text-center text-gray-300 text-sm mt-4'>{description}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA único abaixo do grid */}
          <div className='mt-12 mx-6 sm:mx-12 border border-gray-700 rounded-2xl px-8 py-10 flex flex-col items-center gap-4'>
            <h3 className='text-2xl font-bold text-white'>{t('services.ctaTitle')}</h3>
            <p className='text-gray-400 max-w-md'>{t('services.ctaSubtitle')}</p>
            <button
              onClick={() => setSelectorOpen(true)}
              className='mt-2 px-8 py-3 bg-purple-primary text-white font-semibold rounded-lg
                hover:bg-purple-700 transition-colors duration-300 cursor-pointer'
            >
              {t('services.ctaButton')}
            </button>
          </div>
        </div>
      </div>

      <ServiceSelectorModal
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
      />
    </>
  );
};

export default Services;
