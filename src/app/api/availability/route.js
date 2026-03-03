import { getCalendarClient } from '../../../lib/googleCalendar.js';
import { serviceItems } from '../../../lib/servicesConfig.js';

const TZ = 'America/Sao_Paulo';
const WORK_START_HOUR = 8;
const WORK_END_HOUR = 18;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date'); // "YYYY-MM-DD"
  const slug = searchParams.get('slug');

  if (!dateStr || !slug) {
    return Response.json({ error: 'Missing date or slug' }, { status: 400 });
  }

  const service = serviceItems.find((s) => s.slug === slug);
  if (!service) {
    return Response.json({ error: 'Unknown service slug' }, { status: 400 });
  }

  // Reject weekends using local date math
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);
  const dow = localDate.getDay(); // 0=Sun, 6=Sat
  if (dow === 0 || dow === 6) {
    return Response.json({ slots: [] });
  }

  const dayStart = new Date(`${dateStr}T${String(WORK_START_HOUR).padStart(2, '0')}:00:00-03:00`);
  const dayEnd = new Date(`${dateStr}T${String(WORK_END_HOUR).padStart(2, '0')}:00:00-03:00`);
  const duration = service.duration; // minutes

  try {
    const calendar = getCalendarClient();
    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        timeZone: TZ,
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    const busyPeriods =
      freebusyRes.data.calendars[process.env.GOOGLE_CALENDAR_ID]?.busy ?? [];

    const slots = [];
    let cursor = new Date(dayStart);

    while (cursor < dayEnd) {
      const slotEnd = new Date(cursor.getTime() + duration * 60 * 1000);
      if (slotEnd > dayEnd) break;

      const isBusy = busyPeriods.some((busy) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return cursor < busyEnd && slotEnd > busyStart;
      });

      if (!isBusy) {
        slots.push(cursor.toISOString());
      }

      cursor = new Date(cursor.getTime() + 60 * 60 * 1000);
    }

    return Response.json({ slots });
  } catch (err) {
    console.error('[availability] Google Calendar error:', err);
    return Response.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
