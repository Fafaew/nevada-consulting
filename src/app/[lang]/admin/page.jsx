import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '../../../lib/prisma.js';
import { serviceItems } from '../../../lib/servicesConfig.js';
import Navbar from '../../../components/client/Navbar';
import AdminPricesForm from '../../../components/client/AdminPricesForm';

export default async function AdminPage({ params }) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect(`/${lang}`);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== 'ADMIN') redirect(`/${lang}`);

  const stored = await prisma.servicePrice.findMany();
  const storedMap = Object.fromEntries(stored.map((p) => [p.slug, p]));

  const commercialServices = serviceItems.filter(
    (s) =>
      !['high-performance-team', 'recruitment-training', 'behavioral-assessment'].includes(s.slug),
  );

  // Inicializa preços ausentes com as env vars
  const prices = commercialServices.map((s) => {
    if (storedMap[s.slug]) return storedMap[s.slug];
    const key = s.slug.toUpperCase().replace(/-/g, '_');
    return {
      slug: s.slug,
      priceBrl: process.env[`PRICE_${key}`] ?? '0',
      priceUsd: process.env[`PRICE_USD_${key}`] ?? null,
    };
  });

  return (
    <>
      <Navbar hideNav />
      <main className='min-h-screen bg-[#0e0e0e] text-white px-6 pt-32 pb-20'>
        <div className='max-w-2xl mx-auto'>
          <p className='text-purple-primary text-sm font-semibold uppercase tracking-widest mb-3'>
            Administração
          </p>
          <h1 className='text-4xl font-bold mb-2'>Preços dos Serviços</h1>
          <p className='text-gray-400 text-lg mb-10'>
            Atualize os valores cobrados em BRL e USD.
          </p>
          <AdminPricesForm
            initialPrices={prices.map((p) => ({
              slug: p.slug,
              priceBrl: p.priceBrl?.toString() ?? '0',
              priceUsd: p.priceUsd?.toString() ?? '',
            }))}
            serviceItems={commercialServices}
          />
        </div>
      </main>
    </>
  );
}
