'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const LoginModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setError('');
    setEmailSent(false);
  };

  const switchMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleLogin = async (e) => {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError(t('login.passwordMismatch'));
      setLoading(false);
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setEmailSent(true);
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

        {/* Email sent screen */}
        {emailSent ? (
          <div className='flex flex-col items-center text-center py-4'>
            <div className='text-5xl mb-4'>📧</div>
            <h2 className='text-white text-xl font-bold mb-3'>
              {t('login.checkEmailTitle')}
            </h2>
            <p className='text-gray-400 text-sm leading-relaxed mb-2'>
              {t('login.checkEmailBody')}{' '}
              <strong className='text-white'>{email}</strong>.
            </p>
            <p className='text-gray-500 text-xs mb-6'>
              {t('login.checkEmailSpam')}
            </p>
            <button
              onClick={() => switchMode('login')}
              className='text-purple-primary hover:underline text-sm cursor-pointer'
            >
              {t('login.backToLogin')}
            </button>
          </div>
        ) : (
          <>
            {/* Title */}
            <h2 className='text-white text-2xl font-bold mb-2'>
              {mode === 'login' ? t('login.title') : t('login.registerTitle')}
            </h2>

            {/* Mode toggle */}
            <p className='text-gray-400 text-sm mb-6'>
              {mode === 'login' ? t('login.noAccount') : t('login.hasAccount')}{' '}
              <button
                onClick={() =>
                  switchMode(mode === 'login' ? 'register' : 'login')
                }
                className='text-purple-primary hover:underline font-medium cursor-pointer'
              >
                {mode === 'login'
                  ? t('login.register')
                  : t('login.backToLogin')}
              </button>
            </p>

            {/* Login form */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className='space-y-4'>
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
            )}

            {/* Register form */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className='space-y-4'>
                <input
                  type='text'
                  placeholder={t('login.name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary'
                />
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
                <input
                  type='password'
                  placeholder={t('login.confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className='w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary'
                />

                {error && <p className='text-red-400 text-sm'>{error}</p>}

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-purple-primary hover:bg-purple-primary/80 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer'
                >
                  {loading ? t('login.loading') : t('login.registerButton')}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className='flex items-center my-6'>
              <div className='flex-1 border-t border-gray-700' />
              <span className='px-4 text-gray-400 text-sm'>
                {t('login.or')}
              </span>
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
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
