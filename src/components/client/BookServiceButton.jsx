'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import LoginModal from './LoginModal.jsx';

export default function BookServiceButton() {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleClick = () => {
    if (!session) {
      setLoginOpen(true);
      return;
    }
    // TODO: navigate to scheduling + Stripe payment flow
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
    </>
  );
}
