'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/app/providers/CartProvider';

/**
 * Barra flotante de pedido para móvil.
 * Se oculta cuando la sección del pedido ya está a la vista, para no taparla.
 */
export default function FloatingCartBar() {
  const { cart } = useCart();
  const [pedidoVisible, setPedidoVisible] = useState(false);

  useEffect(() => {
    const revisar = () => {
      const seccion = document.getElementById('pedido');
      if (!seccion) return;

      const alturaPantalla = window.innerHeight || document.documentElement.clientHeight;
      // Si no se puede medir la pantalla, mejor dejar la barra visible que ocultarla de más
      if (!alturaPantalla) {
        setPedidoVisible(false);
        return;
      }

      const { top, bottom } = seccion.getBoundingClientRect();
      setPedidoVisible(top < alturaPantalla && bottom > 0);
    };

    revisar();
    window.addEventListener('scroll', revisar, { passive: true });
    window.addEventListener('resize', revisar);
    return () => {
      window.removeEventListener('scroll', revisar);
      window.removeEventListener('resize', revisar);
    };
  }, [cart.items.length]);

  if (cart.totalJars === 0 || pedidoVisible) return null;

  const irAlPedido = () => {
    const seccion = document.getElementById('pedido');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    } else {
      // En la página de una salsa el pedido vive en la portada
      window.location.href = '/#pedido';
    }
  };

  const productos = `${cart.totalJars} ${cart.totalJars === 1 ? 'producto' : 'productos'}`;

  return (
    <>
      {/* Deja aire al final para que la barra no tape el contenido */}
      <div className="md:hidden h-24" aria-hidden="true" />

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-black/20 to-transparent">
        <button
          onClick={irAlPedido}
          className="w-full bg-redhog-red text-white rounded-xl shadow-xl px-5 py-4 flex items-center justify-between gap-3 active:scale-[0.98] transition-transform"
        >
          <span className="flex items-center gap-2 font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3A1 1 0 005.4 17H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Ver pedido
          </span>
          <span className="text-sm opacity-90">{productos}</span>
          <span className="font-bold text-lg">{formatPrice(cart.total)}</span>
        </button>
      </div>
    </>
  );
}
