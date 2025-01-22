import { React, useState } from 'react';

const Contact = () => {
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
    <div className='min-h-screen flex justify-center items-center flex-col bg-[#121212] text-white p-3.5'>
      <h1 className='mb-3.5'>Contato</h1>

      <form className='max-w-[600px] w-full flex flex-col' onSubmit={sendEmail}>
        <input
          className='mb-3.5 h-[34px] rounded border-0 px-2'
          type='text'
          placeholder='Digite seu nome'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          className='mb-3.5 h-[34px] rounded border-0 px-2'
          type='text'
          placeholder='Digite seu email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <textarea
          className='mb-3.5 rounded border-0 p-2 h-[94px] resize-none'
          placeholder='Digite sua mensagem...'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <input
          className='h-[34px] rounded border-0 cursor-pointer bg-[#0fdbff] text-lg transition-all duration-800 hover:bg-[#0fe3ff] hover:scale-[1.01]'
          type='submit'
          value='Enviar'
        />
      </form>
    </div>
  );
};

export default Contact;
