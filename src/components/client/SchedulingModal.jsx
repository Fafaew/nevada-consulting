'use client';

import { useState, useEffect } from 'react';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useLanguage } from '../../providers/LanguageContext.jsx';

const toDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDateLabel = (date, lang) =>
  date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

const formatTimeSlot = (isoString, lang) =>
  new Date(isoString).toLocaleTimeString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  });

const MONTH_NAMES = {
  pt: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const DAY_NAMES = {
  pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

const i18n = {
  pt: {
    chooseDate: 'Escolha uma data',
    chooseTime: 'Escolha um horário',
    goToPayment: 'Ir para pagamento',
    noSlots: 'Nenhum horário disponível neste dia.',
    errorSlots: 'Erro ao buscar horários.',
    back: '← Voltar',
    loading: 'Aguarde...',
  },
  en: {
    chooseDate: 'Choose a date',
    chooseTime: 'Choose a time',
    goToPayment: 'Go to payment',
    noSlots: 'No slots available on this day.',
    errorSlots: 'Error fetching slots.',
    back: '← Back',
    loading: 'Please wait...',
  },
};

export default function SchedulingModal({
  isOpen,
  onClose,
  slug,
  serviceName,
}) {
  const { currentLanguage: lang } = useLanguage();
  const t = i18n[lang] ?? i18n.pt;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      setStep(1);
      setSelectedDate(null);
      setCalYear(now.getFullYear());
      setCalMonth(now.getMonth());
      setSlots([]);
      setSelectedSlot(null);
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!selectedDate || !slug) return;
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    setError('');

    fetch(`/api/availability?date=${toDateString(selectedDate)}&slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots ?? []);
        if ((data.slots ?? []).length === 0) setError(t.noSlots);
      })
      .catch(() => setError(t.errorSlots))
      .finally(() => setSlotsLoading(false));
  }, [selectedDate, slug, t]);

  const handlePayment = async () => {
    setRedirecting(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          startTime: selectedSlot,
          serviceName,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao iniciar pagamento');
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setRedirecting(false);
    }
  };

  // Calendar helpers
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const calMonthStart = new Date(calYear, calMonth, 1);

  const canGoPrev = calMonthStart > currentMonthStart;
  const canGoNext = true;

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    if (calMonth === 0) {
      setCalYear(calYear - 1);
      setCalMonth(11);
    } else setCalMonth(calMonth - 1);
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    if (calMonth === 11) {
      setCalYear(calYear + 1);
      setCalMonth(0);
    } else setCalMonth(calMonth + 1);
  };

  const handleDayClick = (day) => {
    const date = new Date(calYear, calMonth, day);
    const dow = date.getDay();
    if (date <= today || dow === 0 || dow === 6) return;
    setSelectedDate(date);
    setStep(2);
  };

  const calendarDays = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black/70 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='relative bg-[#111] border border-gray-800 rounded-2xl p-8 w-full max-w-lg mx-4 z-10 max-h-[90vh] overflow-y-auto'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer'
        >
          <IoClose size={24} />
        </button>

        {/* Progress bar */}
        {step < 3 && (
          <div className='flex items-center gap-2 mb-6'>
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  step >= s ? 'bg-purple-primary' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1 — Calendar picker */}
        {step === 1 && (
          <>
            <h2 className='text-white text-xl font-bold mb-1'>
              {t.chooseDate}
            </h2>
            <p className='text-gray-400 text-sm mb-6'>{serviceName}</p>

            {/* Month navigation */}
            <div className='flex items-center justify-between mb-4'>
              <button
                onClick={handlePrevMonth}
                disabled={!canGoPrev}
                className='p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800
                  disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer'
              >
                <IoChevronBack size={18} />
              </button>

              <span className='text-white font-semibold text-sm'>
                {MONTH_NAMES[lang]?.[calMonth] ?? MONTH_NAMES.pt[calMonth]}{' '}
                {calYear}
              </span>

              <button
                onClick={handleNextMonth}
                disabled={!canGoNext}
                className='p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800
                  disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer'
              >
                <IoChevronForward size={18} />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className='grid grid-cols-7 mb-1'>
              {(DAY_NAMES[lang] ?? DAY_NAMES.pt).map((name) => (
                <div
                  key={name}
                  className='text-center text-gray-500 text-xs font-medium py-1'
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className='grid grid-cols-7 gap-y-1'>
              {calendarDays.map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`} />;

                const date = new Date(calYear, calMonth, day);
                const dow = date.getDay();
                const isWeekend = dow === 0 || dow === 6;
                const isPast = date <= today;
                const isDisabled = isWeekend || isPast;
                const isSelected =
                  selectedDate && isSameDay(date, selectedDate);

                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    disabled={isDisabled}
                    className={`
                      aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                      transition-colors duration-200
                      ${
                        isDisabled
                          ? 'text-gray-600 cursor-not-allowed'
                          : isSelected
                            ? 'bg-purple-primary text-white'
                            : 'text-gray-300 hover:bg-purple-primary/20 hover:text-white cursor-pointer'
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 2 — Time slots */}
        {step === 2 && (
          <>
            <button
              onClick={() => {
                setStep(1);
                setError('');
              }}
              className='text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1 cursor-pointer'
            >
              {t.back}
            </button>
            <h2 className='text-white text-xl font-bold mb-1'>
              {t.chooseTime}
            </h2>
            <p className='text-gray-400 text-sm mb-6 capitalize'>
              {selectedDate && formatDateLabel(selectedDate, lang)}
            </p>

            {slotsLoading && (
              <div className='flex justify-center py-8'>
                <div className='w-8 h-8 border-2 border-purple-primary border-t-transparent rounded-full animate-spin' />
              </div>
            )}

            {!slotsLoading && error && (
              <p className='text-red-400 text-sm text-center py-4'>{error}</p>
            )}

            {!slotsLoading && !error && slots.length > 0 && (
              <>
                <div className='grid grid-cols-3 gap-2 mb-6'>
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-3 rounded-xl border text-sm font-medium transition-colors duration-200 cursor-pointer
                        ${
                          selectedSlot === slot
                            ? 'border-purple-primary bg-purple-primary text-white'
                            : 'border-gray-700 text-gray-300 hover:border-purple-primary hover:text-white hover:bg-purple-primary/10'
                        }`}
                    >
                      {formatTimeSlot(slot, lang)}
                    </button>
                  ))}
                </div>

                {error && <p className='text-red-400 text-sm mb-4'>{error}</p>}

                <button
                  onClick={handlePayment}
                  disabled={!selectedSlot || redirecting}
                  className='w-full bg-purple-primary hover:bg-purple-700 text-white font-semibold
                    py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 cursor-pointer'
                >
                  {redirecting ? t.loading : t.goToPayment}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
