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
import { WHATSAPP_NUMBER } from '../../lib/servicesConfig.js';

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

  const cardClass =
    'px-8 pt-6 pb-8 rounded-xl border border-purple-primary/25 bg-purple-primary/5 shadow-md shadow-purple-secondary duration-200 hover:scale-105 hover:shadow-purple-primary hover:border-purple-primary/60';

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

          <div className='sm:px-5 mx-6 sm:mx-0 flex flex-col gap-16'>
            {/* B2C — Para você */}
            <div>
              <h3 className='text-xl font-semibold text-purple-300 mb-6'>
                {t('services.b2cLabel')}
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                {items
                  .slice(2)
                  .map(({ id, slug, icon, subtitle, description }) => (
                    <Link
                      key={id}
                      href={`/${currentLanguage}/services/${slug}`}
                      className={cardClass}
                    >
                      <div className='text-purple-primary'>
                        {React.cloneElement(icon, {
                          className: 'w-12 h-12 m-auto',
                        })}
                      </div>
                      <div className='font-bold text-center mt-3'>
                        {subtitle}
                      </div>
                      <div className='text-center text-gray-300 text-sm mt-4'>
                        {description}
                      </div>
                    </Link>
                  ))}
              </div>
              <div className='mt-8 flex flex-col items-center gap-3'>
                <p className='text-gray-400 max-w-md'>
                  {t('services.ctaSubtitleB2C')}
                </p>
                <button
                  onClick={() => setSelectorOpen(true)}
                  className='px-8 py-3 bg-purple-primary text-white font-semibold rounded-lg
                    hover:bg-purple-700 transition-colors duration-300 cursor-pointer'
                >
                  {t('services.ctaButton')}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className='flex items-center gap-4'>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent to-purple-primary/40' />
              <div className='w-2 h-2 rounded-full bg-purple-primary/60' />
              <div className='w-3 h-3 rounded-full bg-purple-primary' />
              <div className='w-2 h-2 rounded-full bg-purple-primary/60' />
              <div className='flex-1 h-px bg-gradient-to-l from-transparent to-purple-primary/40' />
            </div>

            {/* B2B — Soluções corporativas */}
            <div>
              <h3 className='text-xl font-semibold text-purple-300 mb-6'>
                {t('services.b2bLabel')}
              </h3>
              <div className='flex flex-wrap justify-center gap-8'>
                {items
                  .slice(0, 2)
                  .map(({ id, slug, icon, subtitle, description }) => (
                    <Link
                      key={id}
                      href={`/${currentLanguage}/services/${slug}`}
                      className={`w-[25rem] ${cardClass}`}
                    >
                      <div className='text-purple-primary'>
                        {React.cloneElement(icon, {
                          className: 'w-12 h-12 m-auto',
                        })}
                      </div>
                      <div className='font-bold text-center mt-3'>
                        {subtitle}
                      </div>
                      <div className='text-center text-gray-300 text-sm mt-4'>
                        {description}
                      </div>
                    </Link>
                  ))}
              </div>
              <div className='mt-8 flex flex-col items-center gap-3'>
                <p className='text-gray-400 max-w-md'>
                  {t('services.ctaSubtitleB2B')}
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre as soluções corporativas da Nevada Consulting.')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-8 py-3 bg-purple-primary text-white font-semibold rounded-lg
                    hover:bg-purple-700 transition-colors duration-300'
                >
                  {t('services.talkToSpecialist')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceSelectorModal
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        filter='b2c'
      />
    </>
  );
};

export default Services;
