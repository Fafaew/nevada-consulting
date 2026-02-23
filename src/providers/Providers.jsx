'use client';

import '../lib/i18n';
import { LanguageProvider } from './LanguageContext';

export default function Providers({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
