import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '../../../../lib/prisma.js';
import { getCalendarClient } from '../../../../lib/googleCalendar.js';
import { serviceItems } from '../../../../lib/servicesConfig.js';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const TZ = 'America/Sao_Paulo';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

  // MP envia notificação via query params (IPN) ou JSON body (webhooks)
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic') ?? searchParams.get('type');
  let paymentId = searchParams.get('id');

  if (!paymentId) {
    try {
      const body = await request.json();
      if (body.type === 'payment') paymentId = body.data?.id;
    } catch {
      // body não é JSON, ignorar
    }
  }

  if (!paymentId || (topic && topic !== 'payment')) {
    return Response.json({ received: true });
  }

  let payment;
  try {
    const paymentClient = new Payment(client);
    payment = await paymentClient.get({ id: paymentId });
  } catch (err) {
    console.error('[webhook/mp] Failed to fetch payment:', err.message);
    return Response.json({ error: 'Failed to fetch payment' }, { status: 500 });
  }

  if (payment.status !== 'approved') {
    return Response.json({ received: true });
  }

  let metadata;
  try {
    metadata = JSON.parse(payment.external_reference);
  } catch {
    console.error('[webhook/mp] Invalid external_reference');
    return Response.json({ error: 'Invalid external_reference' }, { status: 400 });
  }

  const { slug, startTime, serviceName, userEmail, userName, userId, lang } = metadata;

  if (!userId || !slug || !startTime) {
    console.error('[webhook/mp] Missing metadata fields');
    return Response.json({ error: 'Missing metadata' }, { status: 400 });
  }

  const service = serviceItems.find((s) => s.slug === slug);
  const start = new Date(startTime);
  const duration = service?.duration ?? 60;
  const end = new Date(start.getTime() + duration * 60 * 1000);

  // 1. Criar booking (upsert para idempotência)
  let booking;
  try {
    booking = await prisma.booking.upsert({
      where: { paymentSessionId: String(paymentId) },
      update: { status: 'CONFIRMED' },
      create: {
        userId,
        service: slug,
        date: start,
        status: 'CONFIRMED',
        paymentSessionId: String(paymentId),
      },
    });
  } catch (err) {
    console.error('[webhook/mp] Booking creation failed:', err.message);
    return Response.json({ error: 'Booking creation failed' }, { status: 500 });
  }

  // 2. Criar evento no Google Calendar (não bloqueante)
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
    console.error('[webhook/mp] Calendar event failed:', err?.response?.data ?? err?.message);
  }

  // 3. Enviar email de confirmação (não bloqueante)
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
    console.error('[webhook/mp] Email failed:', err.message);
  }

  return Response.json({ received: true });
}
