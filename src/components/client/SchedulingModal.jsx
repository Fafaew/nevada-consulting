'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IoClose } from 'react-icons/io5';
import { useLanguage } from '../../providers/LanguageContext.jsx';

const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; dates.length < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) dates.push(d);
  }
  return dates;
};

const toDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

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

const i18n = {
  pt: {
    chooseDate: 'Escolha uma data',
    chooseTime: 'Escolha um horário',
    confirm: 'Confirmar agendamento',
    confirmed: 'Agendamento confirmado!',
    confirmedMsg: (service, dateLabel, timeLabel) =>
      `Sua consulta de ${service} foi agendada para ${dateLabel} às ${timeLabel}.`,
    emailSent: 'Um e-mail de confirmação foi enviado para',
    noSlots: 'Nenhum horário disponível neste dia.',
    errorSlots: 'Erro ao buscar horários.',
    back: '← Voltar',
    loading: 'Aguarde...',
    close: 'Fechar',
  },
  en: {
    chooseDate: 'Choose a date',
    chooseTime: 'Choose a time',
    confirm: 'Confirm booking',
    confirmed: 'Booking confirmed!',
    confirmedMsg: (service, dateLabel, timeLabel) =>
      `Your ${service} session has been booked for ${dateLabel} at ${timeLabel}.`,
    emailSent: 'A confirmation email was sent to',
    noSlots: 'No slots available on this day.',
    errorSlots: 'Error fetching slots.',
    back: '← Back',
    loading: 'Please wait...',
    close: 'Close',
  },
};

export default function SchedulingModal({ isOpen, onClose, slug, serviceName }) {
  const { data: session } = useSession();
  const { currentLanguage: lang } = useLanguage();
  const t = i18n[lang] ?? i18n.pt;

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableDates = getAvailableDates();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate(null);
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
  }, [selectedDate, slug]);

  const handleConfirm = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, startTime: selectedSlot, serviceName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Booking failed');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' onClick={onClose} />

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

        {/* Step 1 — Date picker */}
        {step === 1 && (
          <>
            <h2 className='text-white text-xl font-bold mb-1'>{t.chooseDate}</h2>
            <p className='text-gray-400 text-sm mb-6'>{serviceName}</p>
            <div className='grid grid-cols-3 gap-2'>
              {availableDates.map((date) => (
                <button
                  key={toDateString(date)}
                  onClick={() => { setSelectedDate(date); setStep(2); }}
                  className='px-3 py-3 rounded-xl border border-gray-700 text-gray-300 text-sm
                    hover:border-purple-primary hover:text-white hover:bg-purple-primary/10
                    transition-colors duration-200 cursor-pointer text-center capitalize'
                >
                  {formatDateLabel(date, lang)}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2 — Time slots */}
        {step === 2 && (
          <>
            <button
              onClick={() => { setStep(1); setError(''); }}
              className='text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1 cursor-pointer'
            >
              {t.back}
            </button>
            <h2 className='text-white text-xl font-bold mb-1'>{t.chooseTime}</h2>
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
                        ${selectedSlot === slot
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
                  onClick={handleConfirm}
                  disabled={!selectedSlot || submitting}
                  className='w-full bg-purple-primary hover:bg-purple-700 text-white font-semibold
                    py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 cursor-pointer'
                >
                  {submitting ? t.loading : t.confirm}
                </button>
              </>
            )}
          </>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div className='flex flex-col items-center text-center py-4'>
            <div className='w-16 h-16 rounded-full bg-purple-primary/20 flex items-center justify-center mb-6'>
              <span className='text-3xl text-purple-primary'>✓</span>
            </div>
            <h2 className='text-white text-xl font-bold mb-3'>{t.confirmed}</h2>
            <p className='text-gray-300 text-sm leading-relaxed mb-2'>
              {t.confirmedMsg(
                serviceName,
                selectedDate ? formatDateLabel(selectedDate, lang) : '',
                selectedSlot ? formatTimeSlot(selectedSlot, lang) : ''
              )}
            </p>
            <p className='text-gray-500 text-xs mb-8'>
              {t.emailSent} {session?.user?.email}
            </p>
            <button
              onClick={onClose}
              className='bg-purple-primary hover:bg-purple-700 text-white font-semibold
                px-8 py-3 rounded-lg transition-colors duration-300 cursor-pointer'
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
