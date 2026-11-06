'use client';

import { COPY, ENVIO_NACIONAL } from '@/lib/data';

export default function HowToBuy() {
  return (
    <section id="como-comprar" className="scroll-mt-24 py-16 md:py-24 bg-redhog-cream">
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

        <div className="mt-12 rounded-2xl border-2 border-dashed border-redhog-red/40 bg-white p-6 text-center max-w-2xl mx-auto">
          <p className="text-lg font-bold">📦 ¿Estás fuera de Chihuahua? Enviamos a todo México</p>
          <p className="text-gray-700 mt-1">
            Refrigerada en hielera con gel y por paquetería express para que llegue fresca. Desde {ENVIO_NACIONAL.minFrascos} frascos.
          </p>
          {ENVIO_NACIONAL.promo.activa && (
            <>
              <p className="mt-3 inline-block rounded-full bg-redhog-red px-4 py-1 text-sm font-bold text-white">
                🎉 {ENVIO_NACIONAL.promo.texto}**
              </p>
              <p className="mt-2 text-xs text-gray-500">**{ENVIO_NACIONAL.promo.letraChica}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
