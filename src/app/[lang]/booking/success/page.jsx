import Stripe from 'stripe';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { prisma } from '../../../../lib/prisma.js';
import { serviceItems } from '../../../../lib/servicesConfig.js';
import { Resend } from 'resend';
import { getCalendarClient } from '../../../../lib/googleCalendar.js';
import Navbar from '../../../../components/client/Navbar';

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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { lang } = await params;
  const { session_id } = await searchParams;
  const t = i18n[lang] ?? i18n.pt;
  const locale = lang === 'pt' ? 'pt-BR' : 'en-US';

  let serviceName = '';
  let formattedDate = '';

  if (session_id) {
    try {
      const checkoutSession =
        await stripe.checkout.sessions.retrieve(session_id);
      const {
        slug,
        startTime,
        serviceName: metaServiceName,
        userName,
        userEmail,
      } = checkoutSession.metadata ?? {};
      const userId = checkoutSession.client_reference_id;

      serviceName = metaServiceName ?? '';

      if (startTime) {
        formattedDate = new Date(startTime).toLocaleString(locale, {
          timeZone: TZ,
          dateStyle: 'long',
          timeStyle: 'short',
        });
      }

      // Create booking + send email only if webhook hasn't done it yet
      if (
        userId &&
        slug &&
        startTime &&
        checkoutSession.payment_status === 'paid'
      ) {
        const start = new Date(startTime);
        const alreadyCreated = await prisma.booking.findUnique({
          where: { stripeSessionId: session_id },
        });

        if (!alreadyCreated) {
          const service = serviceItems.find((s) => s.slug === slug);
          const duration = service?.duration ?? 60;
          const end = new Date(start.getTime() + duration * 60 * 1000);

          const booking = await prisma.booking.create({
            data: {
              userId,
              service: slug,
              date: start,
              status: 'CONFIRMED',
              stripeSessionId: session_id,
            },
          });

          // Create Google Calendar event (non-blocking)
          try {
            const calendar = getCalendarClient();
            await calendar.events.insert({
              calendarId: process.env.GOOGLE_CALENDAR_ID,
              sendUpdates: 'all',
              requestBody: {
                summary: `Consulta: ${serviceName}`,
                description: `Cliente: ${userName || userEmail}\nBooking ID: ${booking.id}`,
                start: { dateTime: start.toISOString(), timeZone: TZ },
                end: { dateTime: end.toISOString(), timeZone: TZ },
                attendees: [
                  { email: userEmail },
                  { email: process.env.GOOGLE_CALENDAR_ID, organizer: true },
                ],
                reminders: {
                  useDefault: false,
                  overrides: [
                    { method: 'email', minutes: 60 },
                    { method: 'popup', minutes: 15 },
                  ],
                },
              },
            });
          } catch (calErr) {
            console.error(
              '[booking/success] Calendar event failed:',
              calErr?.response?.data ?? calErr?.message,
            );
          }

          // Send confirmation email
          try {
            await resend.emails.send({
              from: 'Nevada Consulting <noreply@nevadaconsulting.com.br>',
              to: userEmail,
              subject: 'Confirmação de agendamento — Nevada Consulting',
              html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; color: #fff; border-radius: 12px;">
                  <h2 style="color: #8D519E; margin-bottom: 8px;">Agendamento confirmado!</h2>
                  <p style="color: #ccc;">Olá, ${userName || ''}.</p>
                  <p style="color: #ccc;">Seu pagamento foi confirmado e sua consulta foi agendada com sucesso.</p>
                  <div style="background: #1a1a1a; border-radius: 8px; padding: 16px; margin: 20px 0;">
                    <p style="margin: 0; color: #fff;"><strong>Serviço:</strong> ${serviceName}</p>
                    <p style="margin: 8px 0 0; color: #fff;"><strong>Data:</strong> ${formattedDate}</p>
                  </div>
                  <p style="color: #666; font-size: 13px;">Você receberá um convite do Google Calendar em breve.</p>
                </div>
              `,
            });
          } catch (emailErr) {
            console.error('[booking/success] Email failed:', emailErr.message);
          }
        }
      }
    } catch (err) {
      console.error('[booking/success] Error:', err.message);
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
