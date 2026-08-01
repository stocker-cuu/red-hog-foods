'use client';

import { useState } from 'react';
import { COPY, PRESENTATIONS, SALSAS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/app/providers/CartProvider';
import CheckoutModal from './CheckoutModal';

export default function Cart() {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!showCheckout && cart.items.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-redhog-cream">
        <div className="container-max text-center">
          <div className="mb-6 text-6xl">🛒</div>
          <h2 className="headline mb-3">{COPY.cart.empty}</h2>
          <p className="subheadline">{COPY.cart.emptyDescription}</p>
        </div>
      </section>
    );
  }

  if (showCheckout) {
    return (
      <CheckoutModal
        onClose={() => setShowCheckout(false)}
        onSuccess={() => {
          setShowCheckout(false);
        }}
      />
    );
  }

  return (
    <section id="pedido" className="py-16 md:py-24 bg-redhog-cream">
      <div className="container-max">
        <h2 className="headline mb-8">Tu pedido</h2>

        <div className="space-y-4 mb-8">
          {cart.items.map((item, index) => {
            const salsa = SALSAS.find((s) => s.id === item.salsaId);
            const presentation = PRESENTATIONS[item.presentation];

            return (
              <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center">
                <div className="flex-grow">
                  <h3 className="font-bold">
                    {salsa?.name} · {presentation.volume}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {formatPrice(item.price)} = {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => updateCartItem(index, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(index, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg p-6 space-y-4 mb-8">
          <div className="flex justify-between text-lg">
            <span>Total ({cart.totalJars} {COPY.cart.jars}):</span>
            <span className="font-bold text-2xl text-redhog-red">{formatPrice(cart.total)}</span>
          </div>
        </div>

        <button onClick={() => setShowCheckout(true)} className="w-full btn btn-primary btn-large">
          {COPY.cart.ctaWhatsApp}
        </button>
      </div>
    </section>
  );
}
