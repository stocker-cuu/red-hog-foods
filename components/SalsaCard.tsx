'use client';

import { useState } from 'react';
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

  const handleAddToCart = () => {
    addToCart(salsa.id, presentation, quantity);
    setQuantity(1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="card card-hover flex flex-col h-full">
      <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
        <div className="text-center text-gray-500 p-4">
          <div className="text-5xl mb-2" style={{ opacity: 0.3 }}>
            🍯
          </div>
          <p className="text-xs">
            {salsa.name}
            <br />
            <span className="text-gray-400">Reemplazar con salsa-{salsa.id}.jpg</span>
          </p>
        </div>
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
          <span>
            {Array(salsa.heatLevel)
              .fill('🌶️')
              .join('')}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1">{salsa.name}</h3>

        <p className="text-xs text-gray-600 mb-3">{salsa.heat}</p>

        <p className="text-sm text-gray-700 mb-3">{salsa.description}</p>

        <div className="mb-4 text-xs text-gray-600">
          <p className="font-semibold mb-1">Ingredientes:</p>
          <p>{salsa.ingredients}</p>
        </div>

        <p className="text-xs text-redhog-red font-semibold mb-4">👉 {salsa.recommendedFor}</p>

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
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-3 py-1 font-semibold w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
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
                justAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-redhog-red text-white hover:bg-red-700'
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
