/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Clients = ({ logos }) => {
  const { t } = useTranslation();
  const controls = useAnimationControls();
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const animateCarousel = async () => {
      await controls.start({
        x: '-100%',
        transition: {
          duration: duplicatedLogos.length * 2,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    };

    animateCarousel();
  }, []);

  return (
    <section id='clients' className='py-16 bg-gray-100 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          {t('clients.title')}
        </h2>

        <div className='relative h-32 overflow-x-hidden'>
          <motion.div
            className='flex absolute h-full'
            animate={controls}
            style={{ x: 0 }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className='flex items-center justify-center min-w-[200px] h-full px-4'
              >
                <motion.img
                  src={logo}
                  alt={`Cliente ${index + 1}`}
                  className='w-32 h-20 object-contain'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
