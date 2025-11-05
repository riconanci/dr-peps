import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileTabBar from '@/components/MobileTabBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dr Peps - Educational Peptide Information',
  description: 'Evidence-based peptide education resource. Not medical advice. Always consult a licensed healthcare provider.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  metadataBase: new URL('https://drpeps.com'),
  keywords: ['peptides', 'education', 'BPC-157', 'TB-500', 'semaglutide', 'tirzepatide'],
  openGraph: {
    title: 'Dr Peps - Educational Peptide Information',
    description: 'Evidence-based peptide education resource. Not medical advice.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Peps - Educational Peptide Information',
    description: 'Evidence-based peptide education resource. Not medical advice.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <DisclaimerBanner />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
