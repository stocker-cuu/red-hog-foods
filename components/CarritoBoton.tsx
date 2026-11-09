'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { irA } from '@/lib/irA';

/** Carrito del encabezado: el jabalí de Red Hog empujando un carrito, con el número de salsas encima. */
export default function CarritoBoton({ frascos, chico = false }: { frascos: number; chico?: boolean }) {
  const [brinca, setBrinca] = useState(false);
  const antes = useRef(frascos);

  // Cuando agregan salsas, el globito brinca para que se note
  useEffect(() => {
    if (frascos > antes.current) {
      setBrinca(true);
      const t = setTimeout(() => setBrinca(false), 600);
      antes.current = frascos;
      return () => clearTimeout(t);
    }
    antes.current = frascos;
    return undefined;
  }, [frascos]);

  const alto = chico ? 40 : 46;
  const ancho = Math.round((alto * 176) / 150);
  return (
    <button
      type="button"
      onClick={() => irA('pedido')}
      className="relative shrink-0 rounded-xl p-1 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-redhog-red"
      aria-label={frascos ? `Ver mi pedido: ${frascos} ${frascos === 1 ? 'salsa' : 'salsas'}` : 'Ver mi pedido'}
      title="Ver mi pedido"
    >
      <Image src="/images/carrito-jabali.png" alt="" width={ancho} height={alto} className="mix-blend-multiply" priority />
      {frascos > 0 && (
        <span
          className={`absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1.5 rounded-full bg-redhog-red text-white text-xs font-bold leading-[22px] text-center ring-2 ring-white shadow ${
            brinca ? 'animate-bounce' : ''
          }`}
        >
          {frascos > 99 ? '99+' : frascos}
        </span>
      )}
    </button>
  );
}
