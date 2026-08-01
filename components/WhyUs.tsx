'use client';

import { COPY } from '@/lib/data';

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-max">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="headline mb-3">{COPY.whyus.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COPY.whyus.benefits.map((benefit, idx) => (
            <div key={idx} className="card p-6 text-center">
              <div className="text-4xl mb-3">
                {idx === 0 && '📍'}
                {idx === 1 && '👨‍🍳'}
                {idx === 2 && '🌶️'}
                {idx === 3 && '🤝'}
              </div>
              <p className="font-semibold text-gray-900">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
