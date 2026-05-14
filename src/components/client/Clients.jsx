'use client';

/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import blip from '../../assets/imgs/blip.webp';
import komuh from '../../assets/imgs/komuh.webp';
import okto from '../../assets/imgs/okto.webp';
import quive from '../../assets/imgs/quive.webp';
import rv from '../../assets/imgs/rv.webp';
import edvisor from '../../assets/imgs/edvisor.webp';
import moveo from '../../assets/imgs/moveo.webp';
import skintec from '../../assets/imgs/skintec.webp';
import trinio from '../../assets/imgs/trinio.webp';
import caixa from '../../assets/imgs/caixa.webp';

const MotionImage = motion.create(Image);

const defaultLogos = [
  blip,
  komuh,
  okto,
  quive,
  rv,
  edvisor,
  moveo,
  skintec,
  trinio,
  caixa,
];

const Clients = ({ logos = defaultLogos, title }) => {
  const { t } = useTranslation();
  const heading = title ?? t('clients.title');
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
  }, [controls, duplicatedLogos.length]);

  return (
    <section id='clients' className='py-16 bg-gray-100 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl text-black font-bold text-center mb-12'>
          {heading}
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
                <MotionImage
                  src={logo}
                  alt={`Cliente ${index + 1}`}
                  width={128}
                  height={80}
                  className='object-contain'
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
