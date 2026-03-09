import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/client/Navbar';
import BookServiceButton from '../../../../components/client/BookServiceButton';
import { slugToKey, serviceItems } from '../../../../lib/servicesConfig';
import ptTranslations from '../../../../locale/pt.json';
import enTranslations from '../../../../locale/en.json';

export async function generateStaticParams() {
  const slugs = Object.keys(slugToKey);
  const langs = ['pt', 'en'];
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const translationKey = slugToKey[slug];
  if (!translationKey) return { title: 'Nevada Consulting' };

  const translations = lang === 'pt' ? ptTranslations : enTranslations;
  const service = translations.translation.services[translationKey];

  return {
    title: `${service.subtitle} — Nevada Consulting`,
  };
}

export default async function ServicePage({ params }) {
  const { lang, slug } = await params;
  const translationKey = slugToKey[slug];

  if (!translationKey) notFound();

  const translations = lang === 'pt' ? ptTranslations : enTranslations;
  const t = translations.translation;
  const service = t.services[translationKey];
  const backLabel = t.services.backToServices;
  const serviceConfig = serviceItems.find((s) => s.slug === slug);

  return (
    <>
      <Navbar hideNav />
      <main className='min-h-screen bg-[#0e0e0e] text-white pt-24 pb-16 px-6'>
        <div className='max-w-3xl mx-auto'>
          <Link
            href={`/${lang}#services`}
            className='inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 mb-10'
          >
            ← {backLabel}
          </Link>

          <p className='text-purple-primary text-sm font-semibold uppercase tracking-widest mb-4'>
            {t.services.title}
          </p>

          <h1 className='text-3xl md:text-4xl font-bold leading-snug mb-6'>
            {service.subtitle}
          </h1>

          <p className='text-gray-300 text-lg leading-relaxed'>
            {service.description}
          </p>

          <BookServiceButton slug={slug} serviceName={service.subtitle} b2b={serviceConfig?.b2b ?? false} />
        </div>
      </main>
    </>
  );
}
