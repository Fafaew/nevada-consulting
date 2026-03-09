import Stripe from 'stripe';
import { prisma } from '../../../../lib/prisma.js';
import { getCalendarClient } from '../../../../lib/googleCalendar.js';
import { serviceItems } from '../../../../lib/servicesConfig.js';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const TZ = 'America/Sao_Paulo';

export async function POST(request) {
  const rawBody = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error(
      '[webhook/stripe] Signature verification failed:',
      err.message,
    );
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return Response.json({ received: true });
  }

  const checkoutSession = event.data.object;
  const { slug, startTime, serviceName, userEmail, userName, lang } =
    checkoutSession.metadata;
  const userId = checkoutSession.client_reference_id;

  if (!userId || !slug || !startTime) {
    console.error('[webhook/stripe] Missing metadata fields');
    return Response.json({ error: 'Missing metadata' }, { status: 400 });
  }

  const service = serviceItems.find((s) => s.slug === slug);
  const start = new Date(startTime);
  const duration = service?.duration ?? 60;
  const end = new Date(start.getTime() + duration * 60 * 1000);

  // 1. Create booking in DB (upsert for idempotency with success page)
  let booking;
  try {
    booking = await prisma.booking.upsert({
      where: { stripeSessionId: checkoutSession.id },
      update: { status: 'CONFIRMED' },
      create: {
        userId,
        service: slug,
        date: start,
        status: 'CONFIRMED',
        stripeSessionId: checkoutSession.id,
      },
    });
  } catch (err) {
    console.error('[webhook/stripe] Booking creation failed:', err.message);
    return Response.json({ error: 'Booking creation failed' }, { status: 500 });
  }

  // 2. Create Google Calendar event (non-blocking)
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
  } catch (err) {
    console.error(
      '[webhook/stripe] Calendar event failed:',
      err?.response?.data ?? err?.message,
    );
  }

  // 3. Send confirmation email (non-blocking)
  try {
    const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
    const formattedDate = start.toLocaleString(locale, {
      timeZone: TZ,
      dateStyle: 'long',
      timeStyle: 'short',
    });
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
  } catch (err) {
    console.error('[webhook/stripe] Email failed:', err.message);
  }

  return Response.json({ received: true });
}
