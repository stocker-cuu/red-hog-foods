import { BRAND_NAME, LOCATION, PHONE, PRESENTATIONS, SALSAS, SITE_URL, SOCIAL } from '@/lib/data';

/**
 * Datos estructurados para buscadores (schema.org).
 * Solo se declara información confirmada: nada de ratings, inventario ni horarios.
 */
export default function StructuredData() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND_NAME,
    alternateName: 'Red Hog Salsa',
    url: SITE_URL,
    image: `${SITE_URL}/logo.jpg`,
    logo: `${SITE_URL}/logo.jpg`,
    telephone: PHONE,
    description: `Salsas artesanales elaboradas en ${LOCATION}.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chihuahua',
      addressRegion: 'Chihuahua',
      addressCountry: 'MX',
    },
    sameAs: [SOCIAL.instagram.url, SOCIAL.facebook.url],
  };

  const products = SALSAS.filter((s) => s.heatLevel > 0).map((salsa) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Salsa ${salsa.name} — Red Hog`,
    description: salsa.description,
    image: `${SITE_URL}${salsa.image}`,
    brand: { '@type': 'Brand', name: 'Red Hog' },
    offers: Object.values(PRESENTATIONS).map((p) => ({
      '@type': 'Offer',
      name: p.volume,
      price: p.price,
      priceCurrency: 'MXN',
    })),
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([business, ...products]) }}
    />
  );
}
