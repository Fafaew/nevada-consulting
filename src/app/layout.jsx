import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '../providers/Providers';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata = {
  title: 'Nevada Consulting',
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='pt'>
      <body className={jakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
