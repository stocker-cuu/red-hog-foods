import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Red Hog Foods | Salsas Artesanales de Chihuahua',
  description: 'Salsas artesanales hechas en Chihuahua. Cinco sabores para tacos, carne asada, botanas y todo lo que necesite más carácter.',
  keywords: 'salsas, artesanales, Chihuahua, México, picante, comida mexicana',
  openGraph: {
    title: 'Red Hog Foods | Salsas Artesanales de Chihuahua',
    description: 'Salsas artesanales hechas en Chihuahua. Cinco sabores para tacos, carne asada, botanas y todo lo que necesite más carácter.',
    url: 'https://redhogfoods.com',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Red Hog Foods',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#B21D1D" />
        <link rel="canonical" href="https://redhogfoods.com" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
