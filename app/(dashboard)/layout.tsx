import type { Metadata } from 'next';

import { Navbar } from '@/components/Navbar';
import { wait } from '@/lib/wait';
import { Suspense } from 'react';

const options = {
  title: 'ToDo App | Dashboard',
  description:
    'Welcome to the dashboard of the the best todo app in the world!',
  url: 'https://schoolinkatodoproject.vercel.app/todo',
  ogImage:
    'https://github.com/The-CodeINN/schoolinkatodoproject/blob/main/public/images/schoollink_prototype.png',
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: 'https://schoolinkatodoproject.vercel.app/todo',
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  themeColor: '#ffffff',
};

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  await wait(8000);

  return (
    <div className='h-full relative '>
      <Navbar />

      <main className='md:px-16 px-6'>
        <div className='max-w-6xl mx-auto'>
          <Suspense fallback={<div className='bg-red-900'>Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default DashBoardLayout;
