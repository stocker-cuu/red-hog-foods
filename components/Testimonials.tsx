'use client';

import { COPY } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-max">
        <div className="text-center space-y-6">
          <div>
            <h2 className="headline mb-3">{COPY.testimonials.title}</h2>
            <p className="subheadline">{COPY.testimonials.cta}</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-4 text-sm text-blue-800">
            <p>{COPY.testimonials.note}</p>
          </div>

          <p className="text-gray-600 text-sm">
            Una vez que tengas testimonios reales, reemplaza el contenido de{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">COPY.testimonials</code> en{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">lib/data.ts</code>
          </p>
        </div>
      </div>
    </section>
  );
}
