import { React, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SiWhatsapp } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      alert('preencha todos os campos');
      return;
    }
  }

  return (
    <div className='flex items-center flex-col bg-[#121212] text-white pt-12'>
      <h2 className='flex justify-center text-4xl font-bold my-6 text-[antiquewhite]'>
        {t('contact.title')}
      </h2>

      <form
        className='max-w-[600px] w-full flex flex-col text-black'
        onSubmit={sendEmail}
      >
        <input
          className='mb-3.5 h-[34px] rounded border-0 px-2'
          type='text'
          placeholder={t('contact.name')}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          className='mb-3.5 h-[34px] rounded border-0 px-2'
          type='text'
          placeholder={t('contact.email')}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <textarea
          className='mb-3.5 rounded border-0 p-2 h-[94px] resize-none'
          placeholder={t('contact.message')}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <div className='group relative w-full transition-transform duration-300 active:scale-95'>
          <div className='relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 group-hover:scale-105 w-full'>
            <input
              type='submit'
              value={t('contact.send')}
              className='w-full h-12 rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 cursor-pointer'
            />
          </div>
          <span className='pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50'></span>
        </div>
      </form>
      <div>
        <h2 className='flex justify-center text-4xl font-bold my-6 text-[antiquewhite]'>
          {t('contact.social')}
        </h2>
        <div className='flex gap-3'>
          <div className='text-[#25D366] cursor-pointer'>
            <a
              href='https://wa.me/5511994607649'
              target='_blank'
              rel='noopener noreferrer'
            >
              <SiWhatsapp className='w-12 h-12' />
            </a>
          </div>
          <div className='text-[#0A66C2] cursor-pointer'>
            <a
              href='https://www.linkedin.com/in/juliana-carvalho-41b452142/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin className='w-12 h-12' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
