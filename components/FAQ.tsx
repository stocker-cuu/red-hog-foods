'use client';

import { useState } from 'react';
import { COPY } from '@/lib/data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-redhog-cream">
      <div className="container-max">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="headline mb-3">{COPY.faq.title}</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {COPY.faq.items.map((item, idx) => (
            <div key={idx} className="card">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-left">{item.question}</span>
                <span className={`text-2xl transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-4 border-t border-gray-200 text-gray-700">
                  {item.answer.includes('[PENDIENTE') ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800">
                      {item.answer}
                    </div>
                  ) : (
                    item.answer
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
