'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../providers/LanguageContext.jsx';
import {
  PiBuildingOfficeThin,
  PiPresentationChart,
  PiStrategy,
} from 'react-icons/pi';
import { FaChartLine } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import React from 'react';

const B2C_SLUGS = [
  'behavioral-assessment',
  'resume-linkedin-portfolio',
  'interview-preparation',
];
const B2B_SLUGS = ['high-performance-team', 'recruitment-training'];

export default function ServiceSelectorModal({ isOpen, onClose, filter }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const router = useRouter();

  const allItems = [
    {
      slug: 'high-performance-team',
      icon: <PiBuildingOfficeThin />,
      label: t('services.first.subtitle'),
    },
    {
      slug: 'recruitment-training',
      icon: <FaChartLine />,
      label: t('services.third.subtitle'),
    },
    {
      slug: 'behavioral-assessment',
      icon: <RiTeamLine />,
      label: t('services.fourth.subtitle'),
    },
    {
      slug: 'resume-linkedin-portfolio',
      icon: <PiStrategy />,
      label: t('services.fifth.subtitle'),
    },
    {
      slug: 'interview-preparation',
      icon: <PiPresentationChart />,
      label: t('services.sixth.subtitle'),
    },
  ];

  const items =
    filter === 'b2c'
      ? allItems.filter((i) => B2C_SLUGS.includes(i.slug))
      : filter === 'b2b'
        ? allItems.filter((i) => B2B_SLUGS.includes(i.slug))
        : allItems;

  const handleSelect = (slug) => {
    onClose();
    router.push(`/${currentLanguage}/services/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'
      onClick={onClose}
    >
      <div
        className='bg-[#111] border border-gray-800 rounded-2xl w-full max-w-lg p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-white text-xl font-bold'>
            {t('services.selectService')}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-white transition-colors text-2xl leading-none cursor-pointer'
          >
            ×
          </button>
        </div>

        <ul className='flex flex-col gap-2'>
          {items.map(({ slug, icon, label }) => (
            <li key={slug}>
              <button
                onClick={() => handleSelect(slug)}
                className='w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left
                  text-gray-300 hover:bg-purple-primary hover:text-white transition-colors
                  duration-200 cursor-pointer group'
              >
                <span className='text-purple-primary group-hover:text-white text-xl flex-shrink-0'>
                  {React.cloneElement(icon, { className: 'w-5 h-5' })}
                </span>
                <span className='text-sm font-medium leading-snug'>
                  {label}
                </span>
                <span className='ml-auto text-gray-600 group-hover:text-white'>
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
