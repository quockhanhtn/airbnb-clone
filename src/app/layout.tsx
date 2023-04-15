import { Nunito } from 'next/font/google';

import Navbar from '~/app/components/navbar';
import { RegisterModal } from './components/modals';
import { ClientOnly } from './components';
import { ToasterProvider } from './providers';

// css
import './globals.css';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone with NextJS 13',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
        </ClientOnly>
      </body>
    </html>
  );
}
