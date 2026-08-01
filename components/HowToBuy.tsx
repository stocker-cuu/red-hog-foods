'use client';

import { COPY } from '@/lib/data';

export default function HowToBuy() {
  return (
    <section id="como-comprar" className="py-16 md:py-24 bg-redhog-cream">
      <div className="container-max">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="headline mb-3">{COPY.howToBuy.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COPY.howToBuy.steps.map((step) => (
            <div key={step.number} className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-redhog-red text-white flex items-center justify-center text-3xl font-bold">
                {step.number}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
