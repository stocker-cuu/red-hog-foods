'use client';

import Image from 'next/image';
import { COPY } from '@/lib/data';

export default function About() {
  return (
    <section id="quienes-somos" className="py-16 md:py-24 bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Foto */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={COPY.about.image}
              alt={COPY.about.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Texto */}
          <div className="space-y-5">
            <h2 className="headline">{COPY.about.title}</h2>

            {COPY.about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={i === COPY.about.paragraphs.length - 1 ? 'text-lg font-semibold text-redhog-red' : 'text-gray-700'}
              >
                {p}
              </p>
            ))}

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-gray-200">
              {COPY.about.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-gray-800">
                  <span className="text-redhog-red font-bold leading-6" aria-hidden="true">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
