'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const LoginModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t('login.invalidCredentials'));
    } else {
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/70 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-[#111] border border-gray-800 rounded-2xl p-8 w-full max-w-md mx-4 z-10'>
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-white transition-colors'
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <h2 className='text-white text-2xl font-bold mb-6'>
          {t('login.title')}
        </h2>

        {/* Credentials form */}
        <form onSubmit={handleCredentialsLogin} className='space-y-4'>
          <input
            type='email'
            placeholder={t('login.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary'
          />
          <input
            type='password'
            placeholder={t('login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary'
          />

          {error && <p className='text-red-400 text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-purple-primary hover:bg-purple-primary/80 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer'
          >
            {loading ? t('login.loading') : t('login.signIn')}
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-6'>
          <div className='flex-1 border-t border-gray-700' />
          <span className='px-4 text-gray-400 text-sm'>{t('login.or')}</span>
          <div className='flex-1 border-t border-gray-700' />
        </div>

        {/* OAuth buttons */}
        <div className='space-y-3'>
          <button
            onClick={() => signIn('google')}
            className='w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg transition-colors cursor-pointer'
          >
            <FcGoogle size={22} />
            {t('login.google')}
          </button>

          <button
            onClick={() => signIn('facebook')}
            className='w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer'
          >
            <FaFacebook size={22} />
            {t('login.facebook')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
