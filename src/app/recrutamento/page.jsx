'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useTranslation } from 'react-i18next';
import juProfile from '../../assets/imgs/juProfile.webp';
import testimonialsKomuh from '../../assets/imgs/testimonialsKomuh.png';
import testimonialsRV from '../../assets/imgs/testimonialsRV.png';
import Navbar from '../../components/client/Navbar.jsx';
import { SiWhatsapp } from 'react-icons/si';
import Clients from '../../components/client/Clients.jsx';
import Footer from '../../components/client/Footer.jsx';
import { trackEvent } from '../../lib/gtm.js';

const WHATSAPP_URL = 'https://wa.me/5511994607649';

function BtnWA({ children, location }) {
  return (
    <div className='group relative w-fit transition-transform duration-300 active:scale-95 mx-auto'>
      <a
        href={WHATSAPP_URL}
        onClick={() =>
          trackEvent('whatsapp_click', {
            location,
            page: 'recrutamento',
            destination: WHATSAPP_URL,
          })
        }
        className='relative z-10 flex rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 group-hover:scale-110'
      >
        <span className='flex items-center justify-center gap-3 rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 h-12 whitespace-nowrap'>
          <SiWhatsapp className='w-5 h-5 shrink-0' />
          {children}
        </span>
      </a>
      <span className='pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50' />
    </div>
  );
}

const AREAS = [
  {
    name: 'Tecnologia',
    icon: (
      <>
        <polyline points='16 18 22 12 16 6' />
        <polyline points='8 6 2 12 8 18' />
      </>
    ),
  },
  {
    name: 'Publicidade',
    icon: (
      <>
        <path d='M3 11l18-8v18l-18-8v-2z' />
        <path d='M11.6 16.8a3 3 0 1 1-5.8-1.6' />
      </>
    ),
  },
  {
    name: 'Marketing',
    icon: (
      <>
        <circle cx='12' cy='12' r='10' />
        <circle cx='12' cy='12' r='6' />
        <circle cx='12' cy='12' r='2' />
      </>
    ),
  },
  {
    name: 'Liderança',
    icon: (
      <>
        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
        <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      </>
    ),
  },
  {
    name: 'Saúde',
    icon: (
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    ),
  },
  {
    name: 'Fintechs',
    icon: (
      <>
        <line x1='12' y1='1' x2='12' y2='23' />
        <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
      </>
    ),
  },
  {
    name: 'Corporativo',
    icon: (
      <>
        <rect x='2' y='7' width='20' height='14' rx='2' ry='2' />
        <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' />
      </>
    ),
  },
  {
    name: 'Construção Civil',
    icon: (
      <>
        <path d='M3 21h18' />
        <path d='M5 21V7l8-4v18' />
        <path d='M19 21V11l-6-4' />
        <path d='M9 9v.01' />
        <path d='M9 12v.01' />
        <path d='M9 15v.01' />
        <path d='M9 18v.01' />
      </>
    ),
  },
];

const LOGOS = [testimonialsKomuh, testimonialsRV];

export default function RecrutamentoPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const PROCESS_STEPS = t('recrutamento.metodo.steps', { returnObjects: true });
  const TESTIMONIALS = t('recrutamento.prova.testimonials', {
    returnObjects: true,
  }).map((item, i) => ({ ...item, logo: LOGOS[i] }));
  const FAQ_ITEMS = t('recrutamento.faq.items', { returnObjects: true });
  const AREA_NAMES = t('recrutamento.especialidades.areas', {
    returnObjects: true,
  });
  const NEG_ITEMS = t('recrutamento.diferenciais.negative', {
    returnObjects: true,
  });
  const POS_ITEMS = t('recrutamento.diferenciais.positive', {
    returnObjects: true,
  });
  const JULIANA_CREDENTIALS = t('recrutamento.juliana.credentials', {
    returnObjects: true,
  });
  const NUMBERS = [
    {
      valor: '98',
      pct: '%',
      unit: t('recrutamento.numbers.card1unit'),
      desc: t('recrutamento.numbers.card1desc'),
    },
    {
      valor: '5',
      unit: t('recrutamento.numbers.card2unit'),
      desc: t('recrutamento.numbers.card2desc'),
    },
    {
      valor: '3',
      unit: t('recrutamento.numbers.card3unit'),
      desc: t('recrutamento.numbers.card3desc'),
    },
  ];

  return (
    <div className='text-base font-normal leading-[1.55] text-white bg-[#020617] antialiased'>
      <Navbar />

      {/* HERO */}
      <section
        className='relative overflow-hidden pt-24 pb-[64px] max-[900px]:pt-16 max-[900px]:pb-16'
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(141,81,158,0.18) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(99,102,241,0.12) 0%, transparent 50%), #020617',
        }}
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <div className='text-center max-w-[760px] mx-auto'>
            <h1 className='text-[clamp(36px,4.8vw,56px)] font-semibold leading-[1.08] tracking-[-0.02em] mt-10 mb-6 text-white'>
              {t('recrutamento.hero.h1_before')}{' '}
              <strong className='text-[#8D519E] font-bold'>
                {t('recrutamento.hero.h1_bold1')}
              </strong>{' '}
              {t('recrutamento.hero.h1_middle')}{' '}
              <strong className='text-[#8D519E] font-bold'>
                {t('recrutamento.hero.h1_bold2')}
              </strong>{' '}
              {t('recrutamento.hero.h1_after')}
            </h1>
            <p className='text-lg leading-[1.55] text-white/70 mb-9 max-w-[600px] mx-auto max-[900px]:text-[11px] max-[900px]:tracking-[0.08em]'>
              {t('recrutamento.hero.subtitle')}
            </p>
            <BtnWA location='hero'>{t('recrutamento.hero.btnWA')}</BtnWA>
          </div>
        </div>
      </section>

      {/* LOGOS MARQUEE */}
      <Clients title={t('recrutamento.clients.title')} />

      {/* STATS HIGHLIGHT */}
      <section
        className='py-16 border-t border-b border-white/[0.06]'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(141,81,158,0.12) 0%, transparent 70%), #020617',
        }}
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(28px,3.5vw,40px)] font-bold text-[#FAEBD7] leading-[1.15] mb-16 text-center'>
            {t('recrutamento.stats.title')}
          </h2>
          <div className='flex items-center justify-center max-w-[1100px] mx-auto max-sm:flex-col max-sm:gap-12'>
            <div className='flex-1 text-center px-12 flex flex-col items-center gap-5 max-sm:px-6'>
              <div className='text-[clamp(44px,6vw,64px)] font-bold leading-none text-[#8D519E] tracking-[-0.03em] flex items-start justify-center'>
                41
                <span className='text-[clamp(26px,3.5vw,38px)] font-bold'>
                  %
                </span>
              </div>
              <p className='text-[15px] leading-[1.6] text-white/70 max-w-[280px] mx-auto'>
                {t('recrutamento.stats.stat1')}
              </p>
            </div>
            <div className='w-px h-[120px] bg-white/[0.12] shrink-0 max-sm:w-[60px] max-sm:h-px' />
            <div className='flex-1 text-center px-12 flex flex-col items-center gap-5 max-sm:px-6'>
              <div className='text-[clamp(44px,6vw,64px)] font-bold leading-none text-[#8D519E] tracking-[-0.03em] flex items-start justify-center'>
                61
                <span className='text-[clamp(26px,3.5vw,38px)] font-bold'>
                  %
                </span>
              </div>
              <p className='text-[15px] leading-[1.6] text-white/70 max-w-[280px] mx-auto'>
                {t('recrutamento.stats.stat2')}
              </p>
            </div>
            <div className='w-px h-[120px] bg-white/[0.12] shrink-0 max-sm:w-[60px] max-sm:h-px' />
            <div className='flex-1 text-center px-12 flex flex-col items-center gap-5 max-sm:px-6'>
              <div className='text-[clamp(44px,6vw,64px)] font-bold leading-none text-[#8D519E] tracking-[-0.03em] flex items-start justify-center'>
                <span className='text-[15px] font-semibold tracking-normal pt-4 mr-0.5'>
                  {t('recrutamento.stats.stat3prefix')}{' '}
                </span>
                213
                <span className='text-[clamp(26px,3.5vw,38px)] font-bold'>
                  %
                </span>
              </div>
              <p className='text-[15px] leading-[1.6] text-white/70 max-w-[280px] mx-auto'>
                {t('recrutamento.stats.stat3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS NÚMEROS */}
      <section
        className='py-16 max-[900px]:py-[72px]'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(141,81,158,0.12) 0%, transparent 70%), #F1F5F9',
        }}
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(36px,5vw,56px)] font-bold leading-[1.08] tracking-tight text-[#020617] mb-14 text-center'>
            {t('recrutamento.numbers.title')}
          </h2>
          <div className='grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-sm:grid-cols-1'>
            {NUMBERS.map(({ valor, pct, unit, desc }) => (
              <div
                key={unit}
                className='bg-[#1a1a1a] rounded-[20px] py-14 px-10 text-center relative overflow-hidden shadow-[0_12px_32px_rgba(141,81,158,0.22)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(141,81,158,0.4)] max-sm:py-8 max-sm:px-6'
              >
                <div className='pointer-events-none absolute -top-[60%] -right-[40%] w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_65%)]' />
                <div className='pointer-events-none absolute inset-0 rounded-[20px] border border-white/[0.12]' />
                <div className='text-[clamp(72px,10vw,112px)] font-extrabold leading-none text-white tracking-[-0.04em] mb-2 [text-shadow:0_2px_24px_rgba(0,0,0,0.15)] relative z-[1]'>
                  {valor}
                  {pct && (
                    <span className='text-[clamp(40px,5.5vw,60px)] font-bold'>
                      {pct}
                    </span>
                  )}
                </div>
                <div className='text-[22px] font-extrabold text-white mt-3 leading-[1.2] relative z-[1]'>
                  {unit}
                </div>
                <div className='text-base text-white/75 mt-1.5 leading-[1.3] relative z-[1]'>
                  {desc}
                </div>
              </div>
            ))}
          </div>
          <div className='mt-14 flex justify-center'>
            <BtnWA location='numbers'>{t('recrutamento.hero.btnWA')}</BtnWA>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section
        className='py-16 max-[900px]:py-[72px]'
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(141,81,158,0.35) 0%, transparent 65%), radial-gradient(ellipse at bottom, rgba(141,81,158,0.35) 0%, transparent 65%), #020617',
        }}
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-white mb-12 text-center max-w-[800px] mx-auto'>
            {t('recrutamento.diferenciais.title')}
          </h2>
          <div className='grid grid-cols-2 gap-6 items-start max-md:grid-cols-1'>
            <div className='rounded-2xl overflow-hidden'>
              <div className='flex items-center gap-3 px-7 py-5 text-[15px] font-bold tracking-[0.01em] text-white bg-[#4B5563] border border-white/10 rounded-t-2xl'>
                <span className='w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold bg-red-500/20 text-red-400'>
                  ✕
                </span>
                {t('recrutamento.diferenciais.negativeHeader')}
              </div>
              <ul className='list-none flex flex-col bg-[#D1D5DB] border border-t-0 border-black/[0.08] rounded-b-2xl'>
                {NEG_ITEMS.map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-[14px] px-7 py-4 text-[15px] leading-[1.5] text-[#020617] border-t border-black/[0.08] font-medium'
                  >
                    <span className='shrink-0 text-[13px] font-bold mt-0.5 text-red-500'>
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className='rounded-2xl overflow-hidden'>
              <div className='flex items-center gap-3 px-7 py-5 text-[15px] font-bold tracking-[0.01em] text-white bg-gradient-to-br from-[#8D519E] to-[#6e3f7c] border border-white/10 rounded-t-2xl'>
                <span className='w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold bg-white/20 text-white'>
                  ✓
                </span>
                {t('recrutamento.diferenciais.positiveHeader')}
              </div>
              <ul className='list-none flex flex-col bg-white border border-t-0 border-[rgba(141,81,158,0.25)] rounded-b-2xl shadow-[0_24px_50px_rgba(2,6,23,0.2)]'>
                {POS_ITEMS.map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-[14px] px-7 py-4 text-[15px] leading-[1.5] text-[#020617] border-t border-[rgba(141,81,158,0.25)] font-medium'
                  >
                    <span className='shrink-0 text-[13px] font-bold mt-0.5 text-green-500'>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section className='py-16 max-[900px]:py-[72px]' id='especialidades'>
        <div className='max-w-[1200px] lg:max-w-[1100px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#FAEBD7] mb-12 text-center max-w-[800px] mx-auto'>
            {t('recrutamento.especialidades.title')}
          </h2>
          <div className='grid grid-cols-4 gap-5 max-md:grid-cols-2 max-[900px]:gap-[10px]'>
            {AREAS.map(({ icon }, idx) => (
              <div
                key={idx}
                className='group bg-gradient-to-[160deg] from-[#111827] to-[rgba(141,81,158,0.08)] border border-[rgba(141,81,158,0.25)] rounded-[18px] pt-8 px-5 pb-7 flex flex-col items-center justify-center gap-4 text-center transition-all duration-[250ms] ease-in-out relative overflow-hidden cursor-default hover:border-[#8D519E] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(141,81,158,0.22)]'
              >
                <span className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(141,81,158,0.18)_0%,transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <span className='w-14 h-14 rounded-[14px] bg-gradient-to-br from-[rgba(141,81,158,0.25)] to-[rgba(141,81,158,0.08)] border border-[rgba(141,81,158,0.25)] flex items-center justify-center text-[#D8B4FE] shrink-0 transition-all duration-[250ms] ease-in-out relative z-[1] group-hover:from-[#8D519E] group-hover:to-[#6e3f7c] group-hover:border-[#8D519E] group-hover:text-white group-hover:scale-[1.05]'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='w-7 h-7'
                  >
                    {icon}
                  </svg>
                </span>
                <span className='text-[15px] font-bold text-white tracking-[0.04em] uppercase relative z-[1]'>
                  {AREA_NAMES[idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JULIANA */}
      <section
        className='py-16 max-[900px]:py-[72px]'
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(141,81,158,0.35) 0%, transparent 65%), radial-gradient(ellipse at bottom, rgba(141,81,158,0.35) 0%, transparent 65%), #020617',
        }}
        id='juliana'
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <div className='grid grid-cols-[320px_1fr] gap-[72px] items-center max-[900px]:grid-cols-1 max-[900px]:gap-9 max-[900px]:text-center'>
            <div className='flex flex-col items-center gap-4 max-[900px]:-order-1'>
              <div className='w-[260px] h-[260px] rounded-full bg-gradient-to-br from-white/15 to-white/[0.04] border-4 border-white relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)]'>
                <Image
                  src={juProfile}
                  alt='Juliana Carvalho'
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes='260px'
                  priority
                />
              </div>
              <span className='text-[13px] font-semibold text-white/85 uppercase tracking-[0.14em]'>
                Founder · Nevada Consulting
              </span>
            </div>
            <div>
              <div className='text-xs uppercase tracking-[0.18em] text-[#D8B4FE] font-semibold mb-2'>
                {t('recrutamento.juliana.sectionLabel')}
              </div>
              <h2 className='text-[clamp(28px,3vw,34px)] font-bold leading-[1.15] text-white mb-1.5'>
                JULIANA CARVALHO
              </h2>
              <div className='text-[15px] text-white/[0.78] mb-6 font-medium'>
                {t('recrutamento.juliana.subtitle')}
              </div>
              <p className='text-base leading-[1.65] text-white/90 mb-3.5'>
                {t('recrutamento.juliana.bio')}
              </p>
              <div className='mt-6 flex flex-wrap gap-[10px] max-[900px]:justify-center'>
                {JULIANA_CREDENTIALS.map((c) => (
                  <span
                    key={c}
                    className='text-[13px] text-white bg-white/[0.14] py-[7px] px-4 border border-white/35 rounded-full font-semibold backdrop-blur-sm'
                  >
                    {c}
                  </span>
                ))}
              </div>
              <a
                href='https://www.linkedin.com/in/juliana-carvalhoss/'
                target='_blank'
                rel='noopener'
                className='inline-flex items-center gap-2 mt-[22px] text-white no-underline text-sm font-semibold border-b border-white/50 pb-1 transition-opacity duration-200 hover:opacity-75'
              >
                {t('recrutamento.juliana.linkedinCta')}
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                >
                  <path d='M7 17L17 7M17 7H7M17 7v10' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section className='py-16 max-[900px]:py-[72px]' id='metodo'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#FAEBD7] mb-12 text-center max-w-[800px] mx-auto'>
            {t('recrutamento.metodo.title')}
          </h2>
          {/* Desktop: static grid */}
          <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {PROCESS_STEPS.map(({ name, desc }, i) => (
              <div
                key={name}
                className='bg-gradient-to-br from-[#111827] to-[rgba(141,81,158,0.08)] border border-[rgba(141,81,158,0.25)] rounded-[20px] pt-[104px] px-7 pb-10 text-center flex flex-col gap-3.5 relative min-h-[280px] lg:min-h-[230px] transition-all duration-[250ms] hover:border-[#8D519E] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(141,81,158,0.22)]'
              >
                <div className='absolute top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#8D519E] to-[#6e3f7c] border-4 border-[#020617] text-white text-2xl font-extrabold flex items-center justify-center shadow-[0_8px_24px_rgba(141,81,158,0.5)]'>
                  {i + 1}
                </div>
                <span className='text-[19px] font-bold text-white tracking-[0.01em]'>
                  {name}
                </span>
                <span className='text-sm text-white/60 leading-[1.6]'>
                  {desc}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: carousel */}
          <div className='md:hidden'>
            <Slider
              ref={sliderRef}
              arrows={false}
              dots={false}
              infinite={false}
              speed={450}
              slidesToShow={1}
              slidesToScroll={1}
              swipeToSlide
              afterChange={setSlideIndex}
            >
              {PROCESS_STEPS.map(({ name, desc }, i) => (
                <div key={name} className='px-1'>
                  <div className='bg-gradient-to-br from-[#111827] to-[rgba(141,81,158,0.08)] border border-[rgba(141,81,158,0.25)] rounded-[20px] pt-[104px] px-7 pb-10 text-center flex flex-col gap-3.5 relative min-h-[280px]'>
                    <div className='absolute top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#8D519E] to-[#6e3f7c] border-4 border-[#020617] text-white text-2xl font-extrabold flex items-center justify-center shadow-[0_8px_24px_rgba(141,81,158,0.5)]'>
                      {i + 1}
                    </div>
                    <span className='text-[19px] font-bold text-white tracking-[0.01em]'>
                      {name}
                    </span>
                    <span className='text-sm text-white/60 leading-[1.6]'>
                      {desc}
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
            <div className='flex items-center justify-between mt-6 px-1'>
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                disabled={slideIndex === 0}
                className='w-[52px] h-[52px] rounded-full bg-[#111827] border border-[rgba(141,81,158,0.25)] text-white flex items-center justify-center transition-all duration-[250ms] p-0 disabled:opacity-30 disabled:cursor-not-allowed active:bg-[#8D519E] active:border-[#8D519E] active:scale-95'
                aria-label='Previous step'
              >
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-[22px] h-[22px]'
                >
                  <polyline points='15 18 9 12 15 6' />
                </svg>
              </button>
              <div className='flex gap-[10px]'>
                {PROCESS_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => sliderRef.current?.slickGoTo(i)}
                    aria-label={`Ir para etapa ${i + 1}`}
                    className={`border-none p-0 cursor-pointer transition-all duration-200 ${i === slideIndex ? 'h-[6px] w-7 rounded-md bg-[#8D519E]' : 'h-[6px] w-[6px] rounded-full bg-white/30'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                disabled={slideIndex === PROCESS_STEPS.length - 1}
                className='w-[52px] h-[52px] rounded-full bg-[#111827] border border-[rgba(141,81,158,0.25)] text-white flex items-center justify-center transition-all duration-[250ms] p-0 disabled:opacity-30 disabled:cursor-not-allowed active:bg-[#8D519E] active:border-[#8D519E] active:scale-95'
                aria-label='Next step'
              >
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-[22px] h-[22px]'
                >
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              </button>
            </div>
          </div>
          <div className='mt-14 flex justify-center'>
            <BtnWA location='metodo'>{t('recrutamento.hero.btnWA')}</BtnWA>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className='py-16 max-[900px]:py-[72px] bg-white' id='prova'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#020617] mb-12 text-center max-w-[800px] mx-auto'>
            {t('recrutamento.prova.title')}
          </h2>
          <div className='grid grid-cols-2 gap-6 max-[900px]:grid-cols-1'>
            {TESTIMONIALS.map(({ quote, author, company, logo }) => (
              <div
                key={author}
                className='bg-[#F1F5F9] border border-[rgba(2,6,23,0.08)] p-9 max-sm:p-7 rounded-2xl flex flex-col gap-6'
              >
                <div className='text-[56px] leading-[0.5] text-[#8D519E] h-7 font-bold'>
                  &quot;
                </div>
                <p className='text-base leading-[1.6] text-[rgba(2,6,23,0.75)] flex-1'>
                  {quote}
                </p>
                <div className='flex items-center gap-4 pt-6 border-t border-[rgba(2,6,23,0.08)]'>
                  <div className='w-12 h-12 rounded-full overflow-hidden shrink-0 bg-white border border-[rgba(2,6,23,0.08)]'>
                    <Image
                      src={logo}
                      alt={company}
                      width={48}
                      height={48}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <strong className='font-bold block text-[15px] text-[#020617]'>
                      {author}
                    </strong>
                    <span className='text-[13px] text-[#8D519E]'>
                      {company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-14 flex justify-center'>
            <BtnWA location='prova_social'>
              {t('recrutamento.hero.btnWA')}
            </BtnWA>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='py-16 max-[900px]:py-[72px]' id='faq'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#FAEBD7] mb-4 text-center max-w-[800px] mx-auto'>
            {t('recrutamento.faq.title')}
          </h2>
          <div className='mt-4 max-w-[880px] mx-auto'>
            {FAQ_ITEMS.map(({ q, a }, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={q}
                  className='border-t border-white/10 last:border-b last:border-white/10'
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className='w-full bg-transparent border-none py-6 text-center cursor-pointer flex justify-center items-center gap-6 font-[inherit] text-lg font-semibold text-white max-[900px]:text-base'
                  >
                    {q}
                    <span
                      className={`w-8 h-8 border rounded-full flex items-center justify-center shrink-0 transition-all duration-200 relative ${isOpen ? 'bg-[#8D519E] border-[#8D519E]' : 'border-[rgba(141,81,158,0.25)]'}`}
                    >
                      <span
                        className={`absolute w-3 h-[1.5px] ${isOpen ? 'bg-white' : 'bg-[#D8B4FE]'}`}
                      />
                      <span
                        className={`absolute w-[1.5px] h-3 bg-[#D8B4FE] transition-transform duration-[250ms] ${isOpen ? 'scale-y-0' : ''}`}
                      />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
                  >
                    <div className='pb-6 text-[15px] leading-[1.65] text-white/70 max-w-[760px] text-center mx-auto'>
                      {a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className='py-16 text-center border-t border-white/[0.08]'
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(141,81,158,0.25) 0%, transparent 60%), #020617',
        }}
        id='cta'
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(32px,4vw,44px)] font-bold leading-[1.1] text-[#FAEBD7] mb-12 max-w-[720px] mx-auto'>
            {t('recrutamento.cta.title')}
          </h2>
          <BtnWA location='cta_final'>{t('recrutamento.hero.btnWA')}</BtnWA>
        </div>
      </section>

      <Footer />

      {/* FAB WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        onClick={() =>
          trackEvent('whatsapp_click', {
            location: 'fab',
            page: 'recrutamento',
            destination: WHATSAPP_URL,
          })
        }
        className='fixed bottom-6 right-6 bg-[#25D366] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] no-underline z-[100] transition-transform duration-200 hover:scale-[1.08]'
        aria-label='Falar no WhatsApp'
      >
        <SiWhatsapp className='w-[30px] h-[30px]' />
      </a>
    </div>
  );
}
