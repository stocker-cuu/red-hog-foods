'use client';

import { useState } from 'react';
import { PRESENTATIONS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/app/providers/CartProvider';
import type { PresentationKey, Salsa } from '@/lib/types';

export default function SalsaOrderPanel({ salsa }: { salsa: Salsa }) {
  const [presentation, setPresentation] = useState<PresentationKey>('small');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const price = PRESENTATIONS[presentation].price;

  const handleAddToCart = () => {
    addToCart(salsa.id, presentation, quantity);
    setQuantity(1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <div className="border-t border-gray-200 pt-6 space-y-4">
      <div className="space-y-2">
        <span className="text-sm font-semibold">Presentación</span>
        <div className="flex gap-3">
          {(Object.keys(PRESENTATIONS) as PresentationKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setPresentation(key)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                presentation === key ? 'bg-redhog-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="block">{PRESENTATIONS[key].volume}</span>
              <span className="block text-xs opacity-80">{formatPrice(PRESENTATIONS[key].price)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Cantidad</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg"
            aria-label="Quitar uno"
          >
            −
          </button>
          <span className="px-5 py-2 font-semibold w-14 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg"
            aria-label="Agregar uno"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center py-2">
        <span className="text-gray-600">Total</span>
        <span className="font-bold text-2xl">{formatPrice(price * quantity)}</span>
      </div>

      <button
        onClick={handleAddToCart}
        className={`w-full btn btn-large transition-all ${
          justAdded ? 'bg-green-600 text-white' : 'bg-redhog-red text-white hover:bg-red-700'
        }`}
      >
        {justAdded ? '✓ Agregado a tu pedido' : 'Agregar al pedido'}
      </button>
    </div>
  );
}
