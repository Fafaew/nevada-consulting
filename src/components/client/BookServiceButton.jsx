'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER } from '../../lib/servicesConfig.js';
import LoginModal from './LoginModal.jsx';
import SchedulingModal from './SchedulingModal.jsx';

function NeonButton({ children, onClick, href, target, rel, noMargin }) {
  const baseClass =
    'relative z-10 px-6 py-3 bg-purple-primary text-white font-semibold rounded-lg transition-transform duration-300 group-hover:scale-105 h-12 flex items-center justify-center text-base';

  const wrapper = (content) => (
    <div
      className={`group relative w-fit active:scale-95${noMargin ? '' : ' mt-8'}`}
    >
      {content}
      <span className='pointer-events-none absolute -inset-3 z-0 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-700 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-50'></span>
    </div>
  );

  if (href) {
    return wrapper(
      <a href={href} target={target} rel={rel} className={baseClass}>
        {children}
      </a>,
    );
  }

  return wrapper(
    <button onClick={onClick} className={`${baseClass} cursor-pointer`}>
      {children}
    </button>,
  );
}

export default function BookServiceButton({
  slug,
  serviceName,
  b2b = false,
  variants,
  ctaLabel,
  alwaysShowLabel = false,
  whatsappCta = false,
}) {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [schedulingOpen, setSchedulingOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState(null);

  if (b2b) {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no serviço: ${serviceName}. Gostaria de saber mais.`,
    );
    return (
      <NeonButton
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {ctaLabel ?? t('services.talkToSpecialist')}
      </NeonButton>
    );
  }

  if (variants) {
    const handleVariantClick = (variant) => {
      if (!session) {
        setLoginOpen(true);
        return;
      }
      setActiveVariant(variant);
    };

    return (
      <>
        <div className='mt-4 flex flex-col sm:flex-row gap-6'>
          {variants.map((v) => (
            <NeonButton key={v.slug} onClick={() => handleVariantClick(v)}>
              {session || alwaysShowLabel ? v.label : t('services.loginToBook')}
            </NeonButton>
          ))}
        </div>
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        <SchedulingModal
          isOpen={!!activeVariant}
          onClose={() => setActiveVariant(null)}
          slug={activeVariant?.slug}
          serviceName={activeVariant?.label}
        />
      </>
    );
  }

  const handleClick = () => {
    if (!session) {
      setLoginOpen(true);
      return;
    }
    setSchedulingOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no serviço: ${serviceName}. Gostaria de falar diretamente com você.`,
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  if (whatsappCta) {
    return (
      <>
        <div className='mt-8 flex flex-col sm:flex-row gap-4 items-start'>
          <NeonButton noMargin onClick={handleClick}>
            {session ? t('services.bookSession') : t('services.loginToBook')}
          </NeonButton>
          <NeonButton
            noMargin
            href={whatsappHref}
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('services.talkDirectly')}
          </NeonButton>
        </div>
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        <SchedulingModal
          isOpen={schedulingOpen}
          onClose={() => setSchedulingOpen(false)}
          slug={slug}
          serviceName={serviceName}
        />
      </>
    );
  }

  return (
    <>
      <NeonButton onClick={handleClick}>
        {session ? t('services.bookSession') : t('services.loginToBook')}
      </NeonButton>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <SchedulingModal
        isOpen={schedulingOpen}
        onClose={() => setSchedulingOpen(false)}
        slug={slug}
        serviceName={serviceName}
      />
    </>
  );
}
