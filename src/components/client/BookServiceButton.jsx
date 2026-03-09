'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER } from '../../lib/servicesConfig.js';
import LoginModal from './LoginModal.jsx';
import SchedulingModal from './SchedulingModal.jsx';

export default function BookServiceButton({ slug, serviceName, b2b = false }) {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [schedulingOpen, setSchedulingOpen] = useState(false);

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
        {t('services.talkToSpecialist')}
      </a>
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
