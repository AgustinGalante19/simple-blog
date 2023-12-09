import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/ui/navigation';
import Providers from '@/components/providers';

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Simple Blog',
  description: 'Simple blog made with nextjs, mongodb and prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={titilliumWeb.className}>
        <Providers>
          <div className='flex min-h-screen flex-col'>
            <div className='flex-1 bg-neutral-100'>
              <Navigation />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
