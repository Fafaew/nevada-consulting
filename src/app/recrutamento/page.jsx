'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import juProfile from '../../assets/imgs/juProfile.webp';
import Navbar from '../../components/client/Navbar.jsx';
import { SiWhatsapp } from 'react-icons/si';
import Clients from '../../components/client/Clients.jsx';


function BtnWA({ children = 'Fale conosco no WhatsApp' }) {
  return (
    <div className='group relative w-fit transition-transform duration-300 active:scale-95 mx-auto'>
      <a
        href='https://wa.me/5511994607649'
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

const PROCESS_STEPS = [
  {
    name: 'Awareness',
    desc: 'Mapeamento do mercado e identificação de talentos',
  },
  { name: 'Sourcing', desc: 'Abordagem ativa na rede e atração de candidatos' },
  {
    name: 'Interview',
    desc: 'Entrevistas técnicas e comportamentais conduzidas pessoalmente',
  },
  {
    name: 'Shortlist',
    desc: 'Apresentação de até 3 finalistas com relatório de fit',
  },
  { name: 'Fechamento', desc: 'Suporte na oferta, negociação e decisão final' },
  {
    name: 'Acompanhamento',
    desc: 'Follow-up pós-contratação durante o período de garantia',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'A Juliana realizou um trabalho excepcional na consultoria de recrutamento para a Komuh. Sua abordagem estratégica foi fundamental para otimizar todo nosso processo seletivo. Desde o início, esteve totalmente alinhada com a nossa cultura e necessidades, garantindo que cada pessoa candidata apresentada tivesse não só as habilidades técnicas, mas também o fit certo com o time.',
    author: 'Head of HR',
    company: 'Komuh (advertising)',
  },
  {
    quote:
      'Tive a oportunidade de trabalhar com a Juliana na Red Ventures Brasil e na OKTO Brasil, e sempre obtive excelentes resultados em seus recrutamentos. Sua habilidade em compreender os aspectos culturais das empresas permite que ela entregue profissionais não apenas alinhados tecnicamente, mas também aderentes à cultura organizacional.',
    author: 'Head of People',
    company: 'Red Ventures e OKTO Payments (tecnologia)',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Quanto tempo leva em média para fechar uma vaga?',
    a: 'Enviamos os perfis aprovados em até 5 dias úteis. O time to hire médio é de 30 dias — o cronograma detalhado é definido junto com você no briefing da vaga.',
  },
  {
    q: 'E se o profissional contratado não vingar nos primeiros meses?',
    a: 'A Nevada oferece reposição: caso o profissional contratado não permaneça nos primeiros 90 dias por razões relacionadas a fit, a vaga é reaberta sem custo adicional. Os termos são definidos em contrato antes do início do trabalho.',
  },
  {
    q: 'Como funciona o pagamento e qual o ticket médio?',
    a: 'O modelo é por sucesso: o pagamento acontece apenas após a contratação efetiva. Não há mensalidade nem fee inicial. O valor é proporcional ao salário da vaga, dentro da faixa de mercado para boutiques especializadas em recrutamento sênior, e é detalhado no briefing inicial.',
  },
  {
    q: 'Em quais áreas e seniorities a Nevada atua?',
    a: 'Engenharia (back-end, front-end, full-stack, mobile, DevOps, dados, machine learning), produto e design (PM, GPM, CPO, UI/UX), liderança técnica (CTO, VPs, Engineering Managers) e posições de C-level em outras áreas (marketing, agências, comercial). Foco em senioridade média e alta: pleno avançado, sênior, staff e lideranças. A Nevada não atua em vagas júnior nem em recrutamento de alto volume.',
  },
  {
    q: 'Em que cidades a Nevada atende?',
    a: 'A operação é remota e atende empresas em todo o Brasil, com concentração no eixo Sudeste (São Paulo, Rio de Janeiro, Belo Horizonte). Como a maioria dos clientes opera em modelo remoto ou híbrido, a localização da empresa pesa menos do que a localização dos candidatos disponíveis para a vaga.',
  },
];

export default function RecrutamentoPage() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const carousel = document.querySelector('.process-carousel');
    if (!carousel) return;
    const track = carousel.querySelector('.process-track');
    const cards = carousel.querySelectorAll('.process-step');
    const prevBtn = carousel.querySelector('.process-nav--prev');
    const nextBtn = carousel.querySelector('.process-nav--next');
    const dotsContainer = document.querySelector('.process-dots');
    const gap = 24;
    let currentIndex = 0;

    const dotBase =
      'h-[6px] w-[6px] rounded-full bg-white/30 transition-all duration-200 cursor-pointer border-none p-0';
    const dotActive =
      'h-[6px] w-7 rounded-md bg-[#8D519E] transition-all duration-200 cursor-pointer border-none p-0';

    function getVisible() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function update() {
      const visible = getVisible();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = Math.min(currentIndex, maxIndex);
      const cardWidth = cards[0].offsetWidth;
      track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;

      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = i === currentIndex ? dotActive : dotBase;
        dot.setAttribute('aria-label', `Ir para etapa ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          update();
        });
        dotsContainer.appendChild(dot);
      }
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        update();
      }
    });
    nextBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, cards.length - getVisible());
      if (currentIndex < maxIndex) {
        currentIndex++;
        update();
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 120);
    });
    update();
  }, []);

  return (
    <div className='font-sans text-base font-normal leading-[1.55] text-white bg-[#020617] antialiased'>
      <Navbar />

      {/* HERO */}
      <section
        className='relative overflow-hidden pt-24 pb-[88px] max-[900px]:pt-16 max-[900px]:pb-16'
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(141,81,158,0.18) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(99,102,241,0.12) 0%, transparent 50%), #020617',
        }}
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <div className='text-center max-w-[760px] mx-auto'>
            <h1 className='text-[clamp(36px,4.8vw,56px)] font-semibold leading-[1.08] tracking-[-0.02em] my-6 text-white'>
              Pare de perder{' '}
              <strong className='text-[#8D519E] font-bold'>tempo</strong> em
              processos lentos - e{' '}
              <strong className='text-[#8D519E] font-bold'>dinheiro</strong> com
              contratações erradas.
            </h1>
            <p className='text-lg leading-[1.55] text-white/70 mb-9 max-w-[600px] mx-auto max-[900px]:text-[11px] max-[900px]:tracking-[0.08em]'>
              Ajudamos empresas em crescimento a contratar profissionais
              excepcionais de forma rápida, menos custosa e sem risco.
            </p>
            <BtnWA />
          </div>
        </div>
      </section>

      {/* LOGOS MARQUEE */}
      <Clients title='Empresas que já confiaram na Nevada' />

      {/* STATS HIGHLIGHT */}
      <section
        className='py-20 border-t border-b border-white/[0.06]'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(141,81,158,0.12) 0%, transparent 70%), #020617',
        }}
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(28px,3.5vw,40px)] font-bold text-[#FAEBD7] leading-[1.15] mb-16 text-center'>
            Os dados do mercado
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
                das empresas erraram uma contratação em 2025
                <a
                  href='https://tedrh.com.br/noticia/53-das-empresas-admitem-contratacoes-erradas-em-2025'
                  target='_blank'
                  rel='noopener'
                  className='text-[10px] font-semibold text-[#D8B4FE] no-underline align-super ml-px opacity-60 hover:opacity-100 transition-opacity duration-200'
                >
                  *
                </a>
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
                dos erros de contratação estão relacionados ao fit cultural
                <a
                  href='https://tedrh.com.br/noticia/53-das-empresas-admitem-contratacoes-erradas-em-2025'
                  target='_blank'
                  rel='noopener'
                  className='text-[10px] font-semibold text-[#D8B4FE] no-underline align-super ml-px opacity-60 hover:opacity-100 transition-opacity duration-200'
                >
                  *
                </a>
              </p>
            </div>
            <div className='w-px h-[120px] bg-white/[0.12] shrink-0 max-sm:w-[60px] max-sm:h-px' />
            <div className='flex-1 text-center px-12 flex flex-col items-center gap-5 max-sm:px-6'>
              <div className='text-[clamp(44px,6vw,64px)] font-bold leading-none text-[#8D519E] tracking-[-0.03em] flex items-start justify-center'>
                <span className='text-[15px] font-semibold tracking-normal pt-4 mr-0.5'>
                  Até{' '}
                </span>
                213
                <span className='text-[clamp(26px,3.5vw,38px)] font-bold'>
                  %
                </span>
              </div>
              <p className='text-[15px] leading-[1.6] text-white/70 max-w-[280px] mx-auto'>
                do salário anual é o custo de uma contratação errada de um
                C-Level
                <a
                  href='https://www.americanprogress.org/article/there-are-significant-business-costs-to-replacing-employees/'
                  target='_blank'
                  rel='noopener'
                  className='text-[10px] font-semibold text-[#D8B4FE] no-underline align-super ml-px opacity-60 hover:opacity-100 transition-opacity duration-200'
                >
                  **
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS NÚMEROS */}
      <section
        className='py-[104px] max-[900px]:py-[72px]'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(141,81,158,0.12) 0%, transparent 70%), #F1F5F9',
        }}
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#020617] mb-14 text-center'>
            Nossos números
          </h2>
          <div className='grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-sm:grid-cols-1'>
            {[
              {
                valor: '98',
                pct: '%',
                unit: 'de retenção',
                desc: 'dos candidatos contratados',
              },
              { valor: '5', unit: 'dias úteis', desc: 'de SLA' },
              { valor: '3', unit: 'meses', desc: 'de garantia de reposição' },
            ].map(({ valor, pct, unit, desc }) => (
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
            <BtnWA />
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className='py-[104px] max-[900px]:py-[72px] bg-[#6366F1]'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-white mb-12 text-center max-w-[800px] mx-auto'>
            Por que as empresas nos escolhem?
          </h2>
          <div className='grid grid-cols-2 gap-6 items-start max-md:grid-cols-1'>
            <div className='rounded-2xl overflow-hidden'>
              <div className='flex items-center gap-3 px-7 py-5 text-[15px] font-bold tracking-[0.01em] text-white bg-[#4B5563] border border-white/10 rounded-t-2xl'>
                <span className='w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold bg-red-500/20 text-red-400'>
                  ✕
                </span>
                O que as outras soluções entregam
              </div>
              <ul className='list-none flex flex-col bg-[#D1D5DB] border border-t-0 border-black/[0.08] rounded-b-2xl'>
                {[
                  'Processos que demoram meses sem previsão de prazo',
                  'Fee antecipado independente do resultado',
                  'Sem garantia se o profissional não ficar',
                  'Dezenas de currículos sem curadoria real',
                  'Fit cultural ignorado no processo seletivo',
                  'Analistas júnior conduzindo a vaga do início ao fim',
                ].map((item) => (
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
                O que entregamos
              </div>
              <ul className='list-none flex flex-col bg-white border border-t-0 border-[rgba(141,81,158,0.25)] rounded-b-2xl shadow-[0_24px_50px_rgba(2,6,23,0.2)]'>
                {[
                  'Candidatos aprovados enviados em até 5 dias úteis',
                  'Modelo success fee — você só paga após contratar',
                  'Garantia de reposição de 3 meses',
                  'Apenas 3 finalistas pré-validados, com relatório',
                  'Fit cultural como critério de decisão',
                  'Processo seletivo com avaliação executiva da Juliana',
                ].map((item) => (
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
      <section className='py-[104px] max-[900px]:py-[72px]' id='especialidades'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#FAEBD7] mb-12 text-center max-w-[800px] mx-auto'>
            Áreas que atuamos
          </h2>
          <div className='grid grid-cols-4 gap-5 max-md:grid-cols-2 max-[900px]:gap-[10px]'>
            {AREAS.map(({ name, icon }) => (
              <div
                key={name}
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
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JULIANA */}
      <section
        className='py-[104px] max-[900px]:py-[72px] bg-[#6366F1]'
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
                QUEM GARANTE A QUALIDADE DOS PROCESSOS
              </div>
              <h2 className='text-[clamp(28px,3vw,34px)] font-bold leading-[1.15] text-white mb-1.5'>
                JULIANA CARVALHO
              </h2>
              <div className='text-[15px] text-white/[0.78] mb-6 font-medium'>
                Psicóloga, MBA USP, University of Akron (Ohio, EUA), +10 anos em
                recrutamento senior
              </div>
              <p className='text-base leading-[1.65] text-white/90 mb-3.5'>
                Liderei aquisição de talentos em empresas de referência antes de
                fundar a Nevada. Hoje atendo poucos clientes por escolha: o
                modelo boutique existe justamente para que cada processo seja
                conduzido pessoalmente, do primeiro briefing à entrevista final.
              </p>
              <div className='mt-6 flex flex-wrap gap-[10px] max-[900px]:justify-center'>
                {[
                  'Psicologia · UFMG',
                  'MBA · USP',
                  'College of Business Akron - EUA',
                  '+10 anos',
                ].map((c) => (
                  <span
                    key={c}
                    className='text-[13px] text-white bg-white/[0.14] py-[7px] px-4 border border-white/35 rounded-full font-semibold backdrop-blur-sm'
                  >
                    {c}
                  </span>
                ))}
              </div>
              <a
                href='https://www.linkedin.com'
                target='_blank'
                rel='noopener'
                className='inline-flex items-center gap-2 mt-[22px] text-white no-underline text-sm font-semibold border-b border-white/50 pb-1 transition-opacity duration-200 hover:opacity-75'
              >
                Conheça a trajetória completa no LinkedIn
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
      <section className='py-[104px] max-[900px]:py-[72px]' id='metodo'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#FAEBD7] mb-12 text-center max-w-[800px] mx-auto'>
            Nosso processo
          </h2>
          <div className='process-carousel relative px-16'>
            <button
              className='process-nav process-nav--prev absolute top-1/2 -translate-y-1/2 left-0 w-[52px] h-[52px] rounded-full bg-[#111827] border border-[rgba(141,81,158,0.25)] text-white cursor-pointer flex items-center justify-center z-10 transition-all duration-[250ms] p-0 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-[#8D519E] enabled:hover:border-[#8D519E] enabled:hover:scale-[1.06] enabled:hover:shadow-[0_8px_24px_rgba(141,81,158,0.45)] max-[768px]:top-auto max-[768px]:bottom-0 max-[768px]:translate-y-0 max-[768px]:left-[calc(50%-72px)]'
              aria-label='Etapa anterior'
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
            <div className='process-viewport overflow-hidden rounded-[18px]'>
              <div className='process-track flex gap-6 py-3 transition-[transform] duration-[550ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]'>
                {PROCESS_STEPS.map(({ name, desc }, i) => (
                  <div
                    key={name}
                    className='process-step shrink-0 grow-0 basis-[calc((100%-48px)/3)] max-[1024px]:basis-[calc((100%-24px)/2)] max-[768px]:basis-full bg-gradient-to-br from-[#111827] to-[rgba(141,81,158,0.08)] border border-[rgba(141,81,158,0.25)] rounded-[20px] pt-[104px] px-7 pb-10 text-center flex flex-col gap-3.5 relative min-h-[280px] transition-all duration-[250ms] hover:border-[#8D519E] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(141,81,158,0.22)]'
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
            </div>
            <button
              className='process-nav process-nav--next absolute top-1/2 -translate-y-1/2 right-0 w-[52px] h-[52px] rounded-full bg-[#111827] border border-[rgba(141,81,158,0.25)] text-white cursor-pointer flex items-center justify-center z-10 transition-all duration-[250ms] p-0 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-[#8D519E] enabled:hover:border-[#8D519E] enabled:hover:scale-[1.06] enabled:hover:shadow-[0_8px_24px_rgba(141,81,158,0.45)] max-[768px]:top-auto max-[768px]:bottom-0 max-[768px]:translate-y-0 max-[768px]:right-[calc(50%-72px)]'
              aria-label='Próxima etapa'
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
          <div
            className='process-dots flex gap-[10px] justify-center mt-9'
            role='tablist'
            aria-label='Navegação das etapas'
          />
          <div className='mt-14 flex justify-center'>
            <BtnWA />
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className='py-[104px] max-[900px]:py-[72px] bg-white' id='prova'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#020617] mb-12 text-center max-w-[800px] mx-auto'>
            Quem contrata, volta e recomenda
          </h2>
          <div className='grid grid-cols-2 gap-6 max-[900px]:grid-cols-1'>
            {TESTIMONIALS.map(({ quote, author, company }) => (
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
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#EBD9F7] to-[#8D519E] shrink-0' />
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
            <BtnWA />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='py-[104px] max-[900px]:py-[72px]' id='faq'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#FAEBD7] mb-4 text-center max-w-[800px] mx-auto'>
            Perguntas frequentes
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
        className='py-[104px] text-center border-t border-white/[0.08]'
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(141,81,158,0.25) 0%, transparent 60%), #020617',
        }}
        id='cta'
      >
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <h2 className='text-[clamp(32px,4vw,44px)] font-bold leading-[1.1] text-[#FAEBD7] mb-12 max-w-[720px] mx-auto'>
            Vamos conversar sobre sua vaga?
          </h2>
          <BtnWA />
        </div>
      </section>

      {/* FONTES */}
      <div className='py-[14px] bg-black border-t border-white/[0.04]'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <p className='text-[11px] text-white/25'>
            *{' '}
            <a
              href='https://tedrh.com.br/noticia/53-das-empresas-admitem-contratacoes-erradas-em-2025'
              target='_blank'
              rel='noopener'
              className='text-white/30 underline underline-offset-[3px] transition-colors hover:text-white/60'
            >
              TedRH (2025)
            </a>
            &nbsp;&nbsp; **{' '}
            <a
              href='https://www.americanprogress.org/article/there-are-significant-business-costs-to-replacing-employees/'
              target='_blank'
              rel='noopener'
              className='text-white/30 underline underline-offset-[3px] transition-colors hover:text-white/60'
            >
              Center for American Progress
            </a>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className='pt-12 pb-7 bg-black text-white/60 border-t border-white/[0.05]'>
        <div className='max-w-[1200px] mx-auto px-8 max-[900px]:px-6'>
          <div className='flex justify-between items-center flex-wrap gap-6'>
            <div className='text-white text-lg font-bold'>
              Nevada Consulting
            </div>
            <div className='text-[13px] flex gap-6 flex-wrap'>
              <a
                href='mailto:contato@nevadaconsulting.com.br'
                className='text-[inherit] no-underline hover:text-white transition-colors'
              >
                contato@nevadaconsulting.com.br
              </a>
              <a
                href='https://wa.me/5511994607649'
                className='text-[inherit] no-underline hover:text-white transition-colors'
              >
                (11) 9 9460-7649
              </a>
              <a
                href='https://www.linkedin.com'
                target='_blank'
                rel='noopener'
                className='text-[inherit] no-underline hover:text-white transition-colors'
              >
                LinkedIn da Juliana
              </a>
              <a
                href='https://www.linkedin.com'
                target='_blank'
                rel='noopener'
                className='text-[inherit] no-underline hover:text-white transition-colors'
              >
                LinkedIn da Nevada
              </a>
              <a
                href='#'
                className='text-[inherit] no-underline hover:text-white transition-colors'
              >
                Política de privacidade
              </a>
            </div>
          </div>
          <div className='mt-7 text-[12px] text-white/30 text-center border-t border-white/[0.05] pt-[22px]'>
            © 2026 Nevada Consulting · Todos os direitos reservados
          </div>
        </div>
      </footer>

      {/* FAB WHATSAPP */}
      <a
        href='https://wa.me/5511994607649'
        className='fixed bottom-6 right-6 bg-[#25D366] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] no-underline z-[100] transition-transform duration-200 hover:scale-[1.08]'
        aria-label='Falar no WhatsApp'
      >
        <SiWhatsapp className='w-[30px] h-[30px]' />
      </a>
    </div>
  );
}
