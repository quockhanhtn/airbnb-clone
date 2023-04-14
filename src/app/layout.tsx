import { Nunito } from 'next/font/google';

import Navbar from '~/app/components/navbar';

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
      </body>
    </html>
  );
}
