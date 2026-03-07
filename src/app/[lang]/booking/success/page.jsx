import Stripe from 'stripe';
import Link from 'next/link';
import Navbar from '../../../../components/client/Navbar';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const TZ = 'America/Sao_Paulo';

const i18n = {
  pt: {
    title: 'Agendamento confirmado!',
    subtitle: 'Seu pagamento foi aprovado e sua consulta está agendada.',
    service: 'Serviço',
    date: 'Data',
    email: 'Um e-mail de confirmação foi enviado para você.',
    home: 'Voltar ao início',
  },
  en: {
    title: 'Booking confirmed!',
    subtitle: 'Your payment was approved and your session is scheduled.',
    service: 'Service',
    date: 'Date',
    email: 'A confirmation email has been sent to you.',
    home: 'Back to home',
  },
};

export default async function BookingSuccessPage({ params, searchParams }) {
  const { lang } = await params;
  const { session_id } = await searchParams;
  const t = i18n[lang] ?? i18n.pt;
  const locale = lang === 'pt' ? 'pt-BR' : 'en-US';

  let serviceName = '';
  let formattedDate = '';

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      serviceName = session.metadata?.serviceName ?? '';
      const startTime = session.metadata?.startTime;
      if (startTime) {
        formattedDate = new Date(startTime).toLocaleString(locale, {
          timeZone: TZ,
          dateStyle: 'long',
          timeStyle: 'short',
        });
      }
    } catch {
      // session not found — show generic success
    }
  }

  return (
    <>
      <Navbar hideNav />
      <main className='min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-6'>
        <div className='max-w-md w-full text-center'>
          <div className='w-20 h-20 rounded-full bg-purple-primary/20 flex items-center justify-center mx-auto mb-8'>
            <span className='text-4xl text-purple-primary'>✓</span>
          </div>

          <h1 className='text-3xl font-bold mb-3'>{t.title}</h1>
          <p className='text-gray-400 mb-8'>{t.subtitle}</p>

          {(serviceName || formattedDate) && (
            <div className='bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-8 text-left'>
              {serviceName && (
                <p className='text-gray-400 text-sm'>
                  <span className='text-white font-semibold'>{t.service}:</span>{' '}
                  {serviceName}
                </p>
              )}
              {formattedDate && (
                <p className='text-gray-400 text-sm mt-2'>
                  <span className='text-white font-semibold'>{t.date}:</span>{' '}
                  {formattedDate}
                </p>
              )}
            </div>
          )}

          <p className='text-gray-500 text-sm mb-8'>{t.email}</p>

          <Link
            href={`/${lang}`}
            className='inline-block bg-purple-primary hover:bg-purple-700 text-white font-semibold
              px-8 py-3 rounded-lg transition-colors duration-300'
          >
            {t.home}
          </Link>
        </div>
      </main>
    </>
  );
}
