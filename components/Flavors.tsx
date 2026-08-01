'use client';

import { SALSAS, COPY } from '@/lib/data';
import SalsaCard from './SalsaCard';

export default function Flavors() {
  return (
    <section id="sabores" className="py-16 md:py-24 bg-white">
      <div className="container-max">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="headline mb-3">{COPY.flavors.title}</h2>
          <p className="subheadline">{COPY.flavors.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SALSAS.map((salsa) => (
            <SalsaCard key={salsa.id} salsa={salsa} />
          ))}
        </div>
      </div>
    </section>
  );
}
