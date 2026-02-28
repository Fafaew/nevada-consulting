import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import Navbar from '../../../components/client/Navbar';

export const metadata = {
  title: 'Minha Conta — Nevada Consulting',
};

export default async function DashboardPage({ params }) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${lang}`);
  }

  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-6'>
        <div className='max-w-2xl w-full'>
          <p className='text-purple-primary text-sm font-semibold uppercase tracking-widest mb-3'>
            Área do cliente
          </p>
          <h1 className='text-4xl font-bold mb-2'>
            Olá, {session.user.name?.split(' ')[0]}!
          </h1>
          <p className='text-gray-400 text-lg'>
            Bem-vindo(a) ao seu painel.
          </p>
        </div>
      </main>
    </>
  );
}
