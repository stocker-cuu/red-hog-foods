'use client';

import { COPY } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-max">
        <div className="text-center space-y-8">
          <div>
            <h2 className="headline mb-3">{COPY.testimonials.title}</h2>
            <p className="subheadline">{COPY.testimonials.cta}</p>
          </div>

          <p className="text-gray-600">{COPY.testimonials.note}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {COPY.testimonials.networks.map((network) => (
              <a
                key={network.name}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-redhog-cream rounded-lg p-6 border-2 border-transparent hover:border-redhog-red hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-2">{network.icon}</div>
                <p className="font-bold">{network.name}</p>
                <p className="text-xs text-gray-600 mt-1">Déjanos tu reseña</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
