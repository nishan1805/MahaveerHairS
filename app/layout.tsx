import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, Manrope } from 'next/font/google';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#01B1EE',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Mahaveer Hair Solution — Premium Hair Systems, Wigs & Salon Services',
  description: 'Explore premium hair solutions, natural hair patches, custom wigs, hair extensions, and professional in-person salon consultations at Mahaveer Hair Solution.',
  openGraph: {
    title: 'Mahaveer Hair Solution — Premium Hair Systems, Wigs & Salon Services',
    description: 'Explore premium hair solutions, natural hair patches, custom wigs, hair extensions, and professional in-person salon consultations at Mahaveer Hair Solution.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahaveer Hair Solution — Premium Hair Systems, Wigs & Salon Services',
    description: 'Explore premium hair solutions, natural hair patches, custom wigs, hair extensions, and professional in-person salon consultations at Mahaveer Hair Solution.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${manrope.variable}`}>
      <body className="bg-white text-[#111315] font-body antialiased min-h-screen selection:bg-[#EAF8FE] selection:text-[#006F96]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
