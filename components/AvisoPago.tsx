'use client';

import { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/data';

/** Al volver de pagar con Clip (redhogfoods.com/?pago=ok o ?pago=error) le confirma al cliente qué pasó. */
export default function AvisoPago() {
  const [estado, setEstado] = useState<'ok' | 'error' | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('pago');
    if (p === 'ok' || p === 'error') {
      setEstado(p);
      // Se quita de la dirección para que no vuelva a salir al recargar
      const url = new URL(window.location.href);
      url.searchParams.delete('pago');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }, []);

  if (!estado) return null;
  const ok = estado === 'ok';
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => setEstado(null)}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <p className="text-5xl" aria-hidden="true">{ok ? '✅' : '⚠️'}</p>
        <h2 className="mt-3 text-xl font-bold">{ok ? '¡Pago recibido!' : 'No se completó el pago'}</h2>
        <p className="mt-2 text-sm text-gray-700">
          {ok
            ? 'Gracias por tu compra 🐗🌶️ Te escribimos por WhatsApp para coordinar tu entrega.'
            : 'No te preocupes, no se te cobró. Escríbenos por WhatsApp y te mandamos un link nuevo o te damos otra forma de pago.'}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          {!ok && (
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn btn-small bg-green-600 text-white">
              Escribir por WhatsApp
            </a>
          )}
          <button type="button" onClick={() => setEstado(null)} className="btn btn-small bg-redhog-red text-white">
            {ok ? '¡Listo!' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
