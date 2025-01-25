import { React, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
    };

    emailjs
      .send(
        'service_jtmtc9o',
        'template_smovfcs',
        templateParams,
        'ylu3SO7qR-i-z9E09',
      )
      .then(
        (res) => {
          console.log('Email Enviado', res.status, res.text);
          setName('');
          setEmail('');
          setMessage('');
        },
        (err) => {
          console.log('error', err);
        },
      );
  }

  return (
    <div
      id='contact'
      className='flex items-center flex-col bg-[#121212] text-white pt-4 lg:pt-12 px-8'
    >
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

        <div className='group relative w-full transition-transform duration-300 active:scale-95 mb-8'>
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
    </div>
  );
};

export default Contact;
