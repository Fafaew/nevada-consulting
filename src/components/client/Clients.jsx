'use client';

/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id='clients'
      className='py-16 bg-gray-100 overflow-hidden'
    >
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl text-black font-bold text-center mb-12'>
          {heading}
        </h2>

        <div className='relative h-32 overflow-hidden'>
          <div
            className='flex absolute h-full will-change-transform'
            style={{
              width: 'max-content',
              animation: `clients-marquee ${logos.length * 2}s linear infinite`,
              animationPlayState: inView ? 'running' : 'paused',
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={`a-${index}`}
                className='flex items-center justify-center min-w-[200px] h-full px-4'
              >
                <Image
                  src={logo}
                  alt={`Cliente ${index + 1}`}
                  width={128}
                  height={80}
                  className='object-contain'
                  sizes='128px'
                  loading='lazy'
                />
              </div>
            ))}
            {logos.map((logo, index) => (
              <div
                key={`b-${index}`}
                aria-hidden='true'
                className='flex items-center justify-center min-w-[200px] h-full px-4'
              >
                <Image
                  src={logo}
                  alt=''
                  width={128}
                  height={80}
                  className='object-contain'
                  sizes='128px'
                  loading='lazy'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes clients-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
};

export default Clients;
