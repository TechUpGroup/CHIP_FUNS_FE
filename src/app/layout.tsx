import type { Metadata } from 'next';
import './globals.css';

import { Darker_Grotesque, Work_Sans } from 'next/font/google';
import { Layout } from '@/views/_components/Layout';

const darkerGrotesque = Darker_Grotesque({
  variable: '--font-darker-grotesque',
  subsets: ['latin'],
});

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Game',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${darkerGrotesque.variable} ${workSans.variable} font-darker leading-normal antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
