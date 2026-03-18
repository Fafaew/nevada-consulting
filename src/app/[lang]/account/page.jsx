import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '../../../lib/prisma.js';
import { serviceItems } from '../../../lib/servicesConfig.js';
import Navbar from '../../../components/client/Navbar';

const i18n = {
  pt: {
    title: 'Minha Conta — Nevada Consulting',
    area: 'Área do cliente',
    hello: 'Olá',
    welcome: 'Bem-vindo(a) ao seu painel.',
    upcoming: 'Próximos agendamentos',
    noBookings: 'Você ainda não possui agendamentos.',
    services: 'Conheça nossos serviços',
    confirmed: 'Confirmado',
    pending: 'Pendente',
  },
  en: {
    title: 'My Account — Nevada Consulting',
    area: 'Client Area',
    hello: 'Hello',
    welcome: 'Welcome to your dashboard.',
    upcoming: 'Upcoming appointments',
    noBookings: "You don't have any appointments yet.",
    services: 'Explore our services',
    confirmed: 'Confirmed',
    pending: 'Pending',
  },
};

const TZ = 'America/Sao_Paulo';

function getServiceName(slug, lang) {
  const service = serviceItems.find((s) => s.slug === slug);
  if (!service) return slug;
  return service.name[lang] ?? service.name.pt;
}

function formatDate(date, lang) {
  const locale = lang === 'en' ? 'en-US' : 'pt-BR';
  return date.toLocaleString(locale, {
    timeZone: TZ,
    dateStyle: 'long',
    timeStyle: 'short',
  });
}

export default async function DashboardPage({ params }) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${lang}`);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  const upcomingBookings = user
    ? await prisma.booking.findMany({
        where: {
          userId: user.id,
          date: { gte: new Date() },
          status: { not: 'CANCELLED' },
        },
        orderBy: { date: 'asc' },
      })
    : [];

  const firstName = session.user.name?.split(' ')[0];
  const t = i18n[lang] ?? i18n.pt;

  return (
    <>
      <Navbar hideNav />
      <main className='min-h-screen bg-[#0e0e0e] text-white px-6 pt-32 pb-20'>
        <div className='max-w-2xl mx-auto'>
          <p className='text-purple-primary text-sm font-semibold uppercase tracking-widest mb-3'>
            {t.area}
          </p>
          <h1 className='text-4xl font-bold mb-2'>
            {t.hello}, {firstName}!
          </h1>
          <p className='text-gray-400 text-lg mb-10'>{t.welcome}</p>

          <section>
            <h2 className='text-xl font-semibold mb-5'>{t.upcoming}</h2>

            {upcomingBookings.length === 0 ? (
              <div className='bg-[#1a1a1a] rounded-2xl p-8 text-center'>
                <p className='text-gray-400 mb-6'>{t.noBookings}</p>
                <Link
                  href={`/${lang}#services`}
                  className='inline-block bg-purple-primary hover:bg-purple-700 transition-colors text-white font-semibold px-6 py-3 rounded-full text-sm'
                >
                  {t.services}
                </Link>
              </div>
            ) : (
              <ul className='flex flex-col gap-4'>
                {upcomingBookings.map((booking) => (
                  <li
                    key={booking.id}
                    className='bg-[#1a1a1a] rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'
                  >
                    <div>
                      <p className='font-semibold text-white'>
                        {getServiceName(booking.service, lang)}
                      </p>
                      <p className='text-gray-400 text-sm mt-1'>
                        {formatDate(booking.date, lang)}
                      </p>
                    </div>
                    <span
                      className={`self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-yellow-900 text-yellow-300'
                      }`}
                    >
                      {booking.status === 'CONFIRMED' ? t.confirmed : t.pending}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
