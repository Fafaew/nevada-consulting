'use client';

import '../lib/i18n';
import { LanguageProvider } from './LanguageContext';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </SessionProvider>
  );
}
