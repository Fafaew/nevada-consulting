import { redirect } from 'next/navigation';
import HomePage from '../../components/HomePage';
import { use } from 'react';

export function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export default function LangPage({ params }) {
  const { lang } = use(params);

  if (!['pt', 'en'].includes(lang)) {
    redirect('/pt');
  }

  return <HomePage />;
}
