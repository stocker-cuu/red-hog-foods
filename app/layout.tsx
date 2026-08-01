import type { Metadata } from 'next';
import { Providers } from './providers';
import { BRAND_NAME, SITE_URL } from '@/lib/data';
import StructuredData from '@/components/StructuredData';
import './globals.css';

const TITLE = 'Red Hog Salsa | Salsas Artesanales de Chihuahua';
const DESCRIPTION =
  'Salsas artesanales hechas en Chihuahua. Cinco sabores para tacos, carne asada, botanas y todo lo que necesite más carácter. Pide por WhatsApp.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'salsas artesanales, salsa picante, Chihuahua, México, carne asada, tacos',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND_NAME,
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Frascos de salsa Red Hog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  // El favicon lo toma Next.js de app/icon.png y app/apple-icon.png
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#B21D1D" />
        <StructuredData />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
