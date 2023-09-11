import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

const worksans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Wake up and shine, you have work to do!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={worksans.className}>
        {children}
      </body>
      <Toaster />
    </html>
  );
}
