import React from 'react';
import logo from '../assets/imgs/logo.webp';

import { useTranslation } from 'react-i18next';
import { SiWhatsapp } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className='items-center flex-col bg-[#121212] text-white pt-12'>
      <div className='grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2'>
        <div>
          <div>
            <img
              src={logo}
              alt='Descrição da imagem'
              className='h-12 lg:h-12 mb-2 m-auto'
            />
            <p className='text-base lg:text-2xl font-semibold tracking-tight text-white text-center'>
              Nevada Consulting
            </p>
          </div>
          <div className='flex justify-center mt-6'>
            <div className='text-[#0A66C2] cursor-pointer'>
              <a
                href='https://www.linkedin.com/in/juliana-carvalho-41b452142/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin className='w-10 h-10 mr-12' />
              </a>
            </div>
            <div className='text-[#25D366] cursor-pointer'>
              <a
                href='https://wa.me/5511994607649'
                target='_blank'
                rel='noopener noreferrer'
              >
                <SiWhatsapp className='w-10 h-10' />
              </a>
            </div>
          </div>
        </div>
        <div className='text-center m-auto text-lg pt-8'>
          <p>contato@nevadaconsulting.com.br</p>
          <p className='mt-4'>{t('footer.tel')}</p>
        </div>
      </div>
      <p className='flex justify-center text-center mt-12 pb-8 px-6'>
        COPYRIGHT ©2025 Nevada Consulting Todos os direitos reservados
      </p>
    </div>
  );
};

export default Footer;
