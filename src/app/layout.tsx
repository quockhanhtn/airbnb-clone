import { Nunito } from 'next/font/google';

import Navbar from '~/app/components/navbar';
import { LoginModal, RegisterModal, RentModal, SearchModal } from './components/modals';
import { ClientOnly } from './components';
import { ToasterProvider } from './providers';

// css
import './globals.css';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone with NextJS 13',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />

          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <main className="pb-20 pt-28">{children}</main>
      </body>
    </html>
  );
}
