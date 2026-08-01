'use client';

import Image from 'next/image';
import { COPY } from '@/lib/data';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block">
              <span className="px-4 py-2 bg-red-50 text-redhog-red text-sm font-semibold rounded-full">
                ✓ {COPY.hero.badge}
              </span>
            </div>

            <h1 className="headline text-redhog-black">{COPY.hero.headline}</h1>

            <p className="subheadline">{COPY.hero.subheadline}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => scrollToSection('pedido')}
                className="btn btn-primary btn-large"
              >
                {COPY.hero.ctaPrimary}
              </button>
              <button
                onClick={() => scrollToSection('sabores')}
                className="btn btn-outline btn-large"
              >
                {COPY.hero.ctaSecondary}
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src="/hero-image.jpg"
                alt="Frascos de salsa Red Hog sobre tabla de madera"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full -mr-48 -mt-48 opacity-30 pointer-events-none"></div>
    </section>
  );
}
