'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRESENTATIONS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/app/providers/CartProvider';
import type { PresentationKey, Salsa } from '@/lib/types';

interface SalsaCardProps {
  salsa: Salsa;
}

export default function SalsaCard({ salsa }: SalsaCardProps) {
  const [presentation, setPresentation] = useState<PresentationKey>('small');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const price = PRESENTATIONS[presentation].price;

  // Las salsas en desarrollo todavía no se pueden pedir
  const isComingSoon = salsa.heatLevel === 0;

  const handleAddToCart = () => {
    addToCart(salsa.id, presentation, quantity);
    setQuantity(1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (isComingSoon) {
    return (
      <div className="card border-dashed flex flex-col items-center justify-center h-full min-h-[380px] bg-redhog-cream/40 p-8 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-redhog-red/40 flex items-center justify-center mb-4">
          <span className="text-2xl text-redhog-red/60">+</span>
        </div>
        <h3 className="font-bold text-lg mb-2">Próximamente</h3>
        <p className="text-sm text-gray-600">Estamos preparando un nuevo sabor</p>
      </div>
    );
  }

  return (
    <div className="card card-hover flex flex-col h-full">
      <Link href={`/salsas/${salsa.id}`} className="group relative w-full aspect-square bg-gray-100 block">
        <Image
          src={salsa.image}
          alt={`Salsa ${salsa.name} de Red Hog`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/95 rounded-full px-3 py-1 text-xs font-bold shadow-md">
          <span aria-label={`Nivel de picor: ${salsa.heatLevel} de 4`}>
            {Array(salsa.heatLevel).fill('🌶️').join('')}
          </span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/salsas/${salsa.id}`} className="hover:text-redhog-red transition-colors">
          <h3 className="font-bold text-lg mb-1">{salsa.name}</h3>
        </Link>

        <p className="text-xs text-gray-600 mb-3">{salsa.heat}</p>

        <p className="text-sm text-gray-700 mb-3">{salsa.description}</p>

        <div className="mb-4 text-xs text-gray-600">
          <p className="font-semibold mb-1">Ingredientes:</p>
          <p>{salsa.ingredients}</p>
        </div>

        <p className="text-xs text-redhog-red font-semibold mb-2">👉 {salsa.pairings.join(', ')}</p>

        <Link
          href={`/salsas/${salsa.id}`}
          className="text-xs font-semibold text-gray-700 underline underline-offset-2 hover:text-redhog-red mb-4"
        >
          Ver detalles de la {salsa.name}
        </Link>

        <div className="border-t border-gray-200 my-3 pt-3 mt-auto space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold">Presentación:</label>
            <div className="flex gap-2">
              {(Object.keys(PRESENTATIONS) as PresentationKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setPresentation(key)}
                  className={`flex-1 py-2 px-3 rounded text-xs font-semibold transition-colors ${
                    presentation === key
                      ? 'bg-redhog-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {PRESENTATIONS[key].volume}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold">Cantidad:</label>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                aria-label="Quitar uno"
              >
                −
              </button>
              <span className="px-3 py-1 font-semibold w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                aria-label="Agregar uno"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Total:</span>
              <span className="font-bold text-lg">{formatPrice(price * quantity)}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-full btn btn-small transition-all ${
                justAdded ? 'bg-green-600 text-white' : 'bg-redhog-red text-white hover:bg-red-700'
              }`}
            >
              {justAdded ? '✓ Agregado' : 'Agregar al pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
