'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER } from '../../lib/servicesConfig.js';
import LoginModal from './LoginModal.jsx';
import SchedulingModal from './SchedulingModal.jsx';

export default function BookServiceButton({
  slug,
  serviceName,
  b2b = false,
  variants,
  ctaLabel,
}) {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [schedulingOpen, setSchedulingOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState(null);

  if (b2b) {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no serviço: ${serviceName}. Gostaria de saber mais.`,
    );
    return (
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-block mt-8 px-8 py-4 bg-purple-primary text-white font-semibold rounded-lg
          hover:bg-purple-700 transition-colors duration-300 text-lg'
      >
        {ctaLabel ?? t('services.talkToSpecialist')}
      </a>
    );
  }

  if (variants) {
    const handleVariantClick = (variant) => {
      if (!session) {
        setLoginOpen(true);
        return;
      }
      setActiveVariant(variant);
    };

    return (
      <>
        <div className='mt-8 flex flex-col sm:flex-row gap-4'>
          {variants.map((v) => (
            <button
              key={v.slug}
              onClick={() => handleVariantClick(v)}
              className='px-6 py-4 bg-purple-primary text-white font-semibold rounded-lg
                hover:bg-purple-700 transition-colors duration-300 text-base cursor-pointer'
            >
              {session ? v.label : t('services.loginToBook')}
            </button>
          ))}
        </div>
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        <SchedulingModal
          isOpen={!!activeVariant}
          onClose={() => setActiveVariant(null)}
          slug={activeVariant?.slug}
          serviceName={activeVariant?.label}
        />
      </>
    );
  }

  const handleClick = () => {
    if (!session) {
      setLoginOpen(true);
      return;
    }
    setSchedulingOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className='mt-8 px-8 py-4 bg-purple-primary text-white font-semibold rounded-lg
          hover:bg-purple-700 transition-colors duration-300 text-lg cursor-pointer'
      >
        {session ? t('services.bookSession') : t('services.loginToBook')}
      </button>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <SchedulingModal
        isOpen={schedulingOpen}
        onClose={() => setSchedulingOpen(false)}
        slug={slug}
        serviceName={serviceName}
      />
    </>
  );
}
