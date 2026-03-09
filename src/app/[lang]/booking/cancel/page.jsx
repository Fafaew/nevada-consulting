import Link from 'next/link';
import Navbar from '../../../../components/client/Navbar';

const i18n = {
  pt: {
    title: 'Pagamento cancelado',
    subtitle:
      'Nenhuma cobrança foi realizada. Você pode tentar novamente quando quiser.',
    back: 'Voltar aos serviços',
  },
  en: {
    title: 'Payment cancelled',
    subtitle: 'No charge was made. You can try again whenever you are ready.',
    back: 'Back to services',
  },
};

export default async function BookingCancelPage({ params }) {
  const { lang } = await params;
  const t = i18n[lang] ?? i18n.pt;

  return (
    <>
      <Navbar hideNav />
      <main className='min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-6'>
        <div className='max-w-md w-full text-center'>
          <div className='w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-8'>
            <span className='text-4xl text-gray-400'>✕</span>
          </div>

          <h1 className='text-3xl font-bold mb-3'>{t.title}</h1>
          <p className='text-gray-400 mb-8'>{t.subtitle}</p>

          <Link
            href={`/${lang}#services`}
            className='inline-block border border-gray-700 hover:border-purple-primary text-gray-300
              hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300'
          >
            {t.back}
          </Link>
        </div>
      </main>
    </>
  );
}
