import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';
import { prisma } from '../../../lib/prisma.js';
import { getCalendarClient } from '../../../lib/googleCalendar.js';
import { serviceItems } from '../../../lib/servicesConfig.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TZ = 'America/Sao_Paulo';

export async function GET() {
  return Response.json({
    message: 'Bookings endpoint',
    calendarConfigured: !!process.env.GOOGLE_CALENDAR_ID && !!process.env.GOOGLE_REFRESH_TOKEN,
  });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { slug, startTime, serviceName } = body;

  if (!slug || !startTime || !serviceName) {
    return Response.json({ error: 'Missing fields: slug, startTime, serviceName' }, { status: 400 });
  }

  const service = serviceItems.find((s) => s.slug === slug);
  if (!service) {
    return Response.json({ error: 'Unknown service slug' }, { status: 400 });
  }

  const start = new Date(startTime);
  const end = new Date(start.getTime() + service.duration * 60 * 1000);

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  // 1. Create booking in DB
  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      service: slug,
      date: start,
      status: 'PENDING',
    },
  });

  // 2. Create Google Calendar event (non-blocking on failure)
  let calendarError = null;
  try {
    const calendar = getCalendarClient();
    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      sendUpdates: 'all',
      requestBody: {
        summary: `Consulta: ${serviceName}`,
        description: `Cliente: ${session.user.name ?? session.user.email}\nBooking ID: ${booking.id}`,
        start: { dateTime: start.toISOString(), timeZone: TZ },
        end: { dateTime: end.toISOString(), timeZone: TZ },
        attendees: [
          { email: session.user.email },
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
    calendarError = err?.response?.data?.error ?? err?.message ?? 'unknown error';
    console.error('[bookings] Calendar event creation failed:', JSON.stringify(err?.response?.data ?? err?.message));
  }

  // 3. Send confirmation email (non-blocking on failure)
  try {
    const formattedDate = start.toLocaleString('pt-BR', {
      timeZone: TZ,
      dateStyle: 'long',
      timeStyle: 'short',
    });
    await resend.emails.send({
      from: 'Nevada Consulting <noreply@nevadaconsulting.com.br>',
      to: session.user.email,
      subject: 'Confirmação de agendamento — Nevada Consulting',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; color: #fff; border-radius: 12px;">
          <h2 style="color: #8D519E; margin-bottom: 8px;">Agendamento confirmado!</h2>
          <p style="color: #ccc;">Olá, ${session.user.name ?? ''}.</p>
          <p style="color: #ccc;">Sua consulta foi agendada com sucesso.</p>
          <div style="background: #1a1a1a; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; color: #fff;"><strong>Serviço:</strong> ${serviceName}</p>
            <p style="margin: 8px 0 0; color: #fff;"><strong>Data:</strong> ${formattedDate}</p>
          </div>
          <p style="color: #666; font-size: 13px;">Você receberá um convite do Google Calendar em breve.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[bookings] Confirmation email failed:', err.message);
  }

  return Response.json({ booking, calendarError }, { status: 201 });
}
