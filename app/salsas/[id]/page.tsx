import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCartBar from '@/components/FloatingCartBar';
import SalsaOrderPanel from '@/components/SalsaOrderPanel';
import { CONSERVACION_DEFAULT, PRESENTATIONS, SALSAS, SITE_URL } from '@/lib/data';

interface Props {
  params: { id: string };
}

// Las salsas "próximamente" todavía no tienen página propia
const salsasPublicadas = SALSAS.filter((s) => s.heatLevel > 0);

export function generateStaticParams() {
  return salsasPublicadas.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const salsa = salsasPublicadas.find((s) => s.id === params.id);
  if (!salsa) return {};

  const title = `Salsa ${salsa.name} | Red Hog Salsa`;
  const description = `${salsa.description}. ${salsa.ingredients}. Picor: ${salsa.heat}.`;

  return {
    title,
    description,
    alternates: { canonical: `/salsas/${salsa.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/salsas/${salsa.id}`,
      type: 'website',
      images: [{ url: salsa.image, width: 900, height: 1200, alt: `Salsa ${salsa.name}` }],
    },
  };
}

export default function SalsaPage({ params }: Props) {
  const salsa = salsasPublicadas.find((s) => s.id === params.id);
  if (!salsa) notFound();

  const otras = salsasPublicadas.filter((s) => s.id !== salsa.id);

  const productoJsonLd = {
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
      url: `${SITE_URL}/salsas/${salsa.id}`,
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productoJsonLd) }} />

      <Header />

      <div className="container-max py-6 md:py-10">
        <Link href="/#sabores" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-redhog-red">
          ← Volver a todos los sabores
        </Link>
      </div>

      <article className="container-max pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Foto */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={salsa.image}
              alt={`Frasco de salsa ${salsa.name} de Red Hog`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/95 rounded-full px-4 py-2 text-sm font-bold shadow-md">
              <span aria-label={`Nivel de picor: ${salsa.heatLevel} de 4`}>
                {Array(salsa.heatLevel).fill('🌶️').join('')}
              </span>
            </div>
          </div>

          {/* Info y pedido */}
          <div className="space-y-6">
            <div>
              <h1 className="headline mb-2">Salsa {salsa.name}</h1>
              <p className="subheadline">{salsa.description}</p>
            </div>

            <dl className="space-y-4 border-t border-gray-200 pt-6">
              <div>
                <dt className="text-sm font-bold text-redhog-red mb-1">Ingredientes</dt>
                <dd className="text-gray-800">{salsa.ingredients}</dd>
              </div>

              <div>
                <dt className="text-sm font-bold text-redhog-red mb-1">Qué tan picosa</dt>
                <dd className="text-gray-800">
                  {salsa.heatLevel} de 4 <span aria-hidden="true">{Array(salsa.heatLevel).fill('🌶️').join('')}</span>
                </dd>
              </div>

              {salsa.pairings.length > 0 && (
                <div>
                  <dt className="text-sm font-bold text-redhog-red mb-1">Con qué va bien</dt>
                  <dd className="flex flex-wrap gap-2 pt-1">
                    {salsa.pairings.map((p) => (
                      <span key={p} className="bg-redhog-cream text-gray-800 text-sm rounded-full px-3 py-1">
                        {p}
                      </span>
                    ))}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-sm font-bold text-redhog-red mb-1">Cómo guardarla</dt>
                <dd className="text-gray-800">{salsa.storage ?? CONSERVACION_DEFAULT}</dd>
              </div>
            </dl>

            <SalsaOrderPanel salsa={salsa} />
          </div>
        </div>
      </article>

      {/* Las demás salsas */}
      <section className="bg-redhog-cream py-14">
        <div className="container-max">
          <h2 className="text-2xl font-bold mb-6">Los otros sabores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otras.map((s) => (
              <Link
                key={s.id}
                href={`/salsas/${s.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-redhog-red transition-colors"
              >
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={s.image}
                    alt={`Salsa ${s.name}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold group-hover:text-redhog-red transition-colors">{s.name}</p>
                  <p className="text-xs text-gray-600">{s.heat}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCartBar />
    </main>
  );
}
