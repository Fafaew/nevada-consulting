/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Clients = ({ logos }) => {
  const { t } = useTranslation();

  return (
    <section className='py-16 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          {t('clients.title')}
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className='flex items-center justify-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={logo}
                alt={`Cliente ${index + 1}`}
                className='max-w-full h-auto max-h-16 object-contain'
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
