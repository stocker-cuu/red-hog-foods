'use client';

import { useState } from 'react';
import { PRESENTATIONS } from '@/lib/data';
import { pedirAviso } from '@/lib/redhog';
import { codigoDe } from '@/app/providers/StockProvider';
import { registrarEvento } from './Analytics';
import type { PresentationKey, Salsa } from '@/lib/types';

/** Lo que se ve en lugar de "Agregar al pedido" cuando una salsa está agotada. */
export function AgotadoBox({ salsa, presentation, grande = false }: { salsa: Salsa; presentation: PresentationKey; grande?: boolean }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className={`rounded-lg border border-dashed border-redhog-red/40 bg-redhog-cream/40 text-center ${grande ? 'p-5' : 'p-3'}`}>
      <p className={`font-bold text-redhog-red ${grande ? 'text-lg' : ''}`}>Agotada por ahora</p>
      <p className={`text-gray-700 ${grande ? 'text-sm' : 'text-xs'} mt-1`}>
        <span aria-hidden="true">🧑‍🍳</span> Estamos preparando un lote nuevo
      </p>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={`mt-3 w-full btn ${grande ? 'btn-large' : 'btn-small'} bg-gray-900 text-white hover:bg-black`}
      >
        🔔 Avísame cuando vuelva
      </button>
      {abierto && <AvisoModal salsa={salsa} presentation={presentation} onClose={() => setAbierto(false)} />}
    </div>
  );
}

function AvisoModal({ salsa, presentation, onClose }: { salsa: Salsa; presentation: PresentationKey; onClose: () => void }) {
  const [nombre, setNombre] = useState('');
  const [tel, setTel] = useState('');
  const [promos, setPromos] = useState(false);
  const [estado, setEstado] = useState<'form' | 'enviando' | 'listo'>('form');
  const [error, setError] = useState('');
  const tamaño = PRESENTATIONS[presentation].volume;
  const inputClass = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red';

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const digitos = tel.replace(/\D/g, '').slice(-10);
    if (nombre.trim().length < 2) return setError('Escribe tu nombre');
    if (digitos.length !== 10) return setError('Tu WhatsApp debe tener 10 dígitos');
    const codigo = codigoDe(salsa, presentation);
    if (!codigo) return setError('No pudimos registrar esta salsa');
    setEstado('enviando');
    try {
      await pedirAviso(codigo, nombre.trim(), digitos, promos);
      registrarEvento('pedir_aviso_stock', { salsa: salsa.name, presentacion: tamaño });
      setEstado('listo');
    } catch (err) {
      setError((err as Error).message || 'No se pudo guardar, intenta de nuevo');
      setEstado('form');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-left" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Te avisamos 🔔</h2>
          <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl leading-none" aria-label="Cerrar">×</button>
        </div>
        {estado === 'listo' ? (
          <div className="p-6 text-center space-y-3">
            <p className="text-4xl" aria-hidden="true">🐗🌶️</p>
            <p className="font-semibold">¡Listo, {nombre.trim().split(' ')[0]}!</p>
            <p className="text-sm text-gray-700">En cuanto salga el lote nuevo de <b>{salsa.name} {tamaño}</b> te escribimos por WhatsApp.</p>
            <button type="button" onClick={onClose} className="btn btn-small bg-redhog-red text-white w-full">Cerrar</button>
          </div>
        ) : (
          <form onSubmit={enviar} className="p-6 space-y-4">
            <p className="text-sm text-gray-700">La <b>{salsa.name} {tamaño}</b> se nos acabó, pero ya estamos cocinando más. Déjanos tus datos y te avisamos en cuanto esté lista.</p>
            <div>
              <label htmlFor="aviso-nombre" className="block text-sm font-semibold mb-2">Nombre *</label>
              <input id="aviso-nombre" className={inputClass} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="aviso-tel" className="block text-sm font-semibold mb-2">WhatsApp *</label>
              <input id="aviso-tel" type="tel" inputMode="numeric" autoComplete="tel-national" className={inputClass} value={tel} onChange={(e) => setTel(e.target.value)} placeholder="614 123 4567" />
              <p className="mt-1 text-xs text-gray-500">
                Solo lo usamos para avisarte de esta salsa.{' '}
                <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer" className="underline hover:text-redhog-red">Aviso de privacidad</a>
              </p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-gray-200 p-3">
              <input type="checkbox" checked={promos} onChange={(e) => setPromos(e.target.checked)} className="mt-1 h-4 w-4 accent-redhog-red" />
              <span className="text-sm text-gray-800">
                También avísenme de nuevos sabores, lotes y promociones.
                <span className="block text-xs text-gray-500">Puedes darte de baja cuando quieras.</span>
              </span>
            </label>
            {error && <p className="text-sm text-redhog-red">{error}</p>}
            <button type="submit" disabled={estado === 'enviando'} className="btn btn-small bg-redhog-red text-white hover:bg-red-700 w-full disabled:opacity-60">
              {estado === 'enviando' ? 'Guardando…' : 'Avísame por WhatsApp'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
