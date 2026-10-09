'use client';

import { useEffect, useState } from 'react';
import { COPY, DELIVERY } from '@/lib/data';
import { generateWhatsAppMessage, getWhatsAppLink } from '@/lib/utils';
import { useCart } from '@/app/providers/CartProvider';
import { registrarEvento } from './Analytics';
import type { CheckoutData } from '@/lib/types';
import { crearPedido, guardarCarrito, nuevoCarrito } from '@/lib/redhog';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ onClose, onSuccess }: CheckoutModalProps) {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    phone: '',
    zone: '',
    address: '',
    coords: null,
    delivery: 'delivery',
    inZone: true,
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ubicacion, setUbicacion] = useState<'inicial' | 'buscando' | 'lista' | 'error'>('inicial');
  const [errorUbicacion, setErrorUbicacion] = useState('');

  // Avisamos a la app que este visitante llegó al formulario
  useEffect(() => {
    guardarCarrito(cart, 'checkout', undefined, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Al salir de nombre, teléfono o colonia guardamos el avance (para dar seguimiento si no termina). */
  const guardarAvance = () => guardarCarrito(cart, 'checkout', { name: formData.name, phone: formData.phone, zone: formData.zone }, 300);

  const telefono = formData.phone.replace(/\D/g, '').slice(-10);
  const esEntrega = formData.delivery === 'delivery';
  const faltanFrascos = DELIVERY.minFrascosFueraDeZona - cart.totalJars;
  // Fuera de zona solo repartimos a domicilio a partir del mínimo de frascos
  const bloqueadoPorZona = esEntrega && !formData.inZone && faltanFrascos > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const compartirUbicacion = () => {
    if (!('geolocation' in navigator)) {
      setUbicacion('error');
      setErrorUbicacion('Tu navegador no puede compartir ubicación. Escribe tu dirección y con eso basta.');
      return;
    }

    setUbicacion('buscando');
    setErrorUbicacion('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          coords: {
            lat: +pos.coords.latitude.toFixed(6),
            lng: +pos.coords.longitude.toFixed(6),
            accuracy: Math.round(pos.coords.accuracy),
          },
        }));
        setUbicacion('lista');
      },
      (err) => {
        setUbicacion('error');
        setErrorUbicacion(
          err.code === err.PERMISSION_DENIED
            ? 'No diste permiso de ubicación. No pasa nada: escribe tu dirección y listo.'
            : 'No pudimos obtener tu ubicación. Escribe tu dirección y con eso basta.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const quitarUbicacion = () => {
    setFormData((prev) => ({ ...prev, coords: null }));
    setUbicacion('inicial');
    setErrorUbicacion('');
  };

  const cambiarARecoleccion = () => {
    setFormData((prev) => ({ ...prev, delivery: 'pickup' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.zone.trim()) {
      alert('Por favor completa tu nombre y tu colonia o zona.');
      return;
    }

    if (telefono.length !== 10) {
      alert('Escribe tu WhatsApp a 10 dígitos para poder confirmarte el pedido.');
      return;
    }

    if (bloqueadoPorZona) return;

    setIsSubmitting(true);

    // La ventana se abre antes de esperar a la app: si se abre después, el celular la bloquea
    const ventana = window.open('', '_blank');

    let folio: string | undefined;
    let total = cart.total;
    try {
      const r = await crearPedido(cart, formData);
      folio = r.folio;
      total = r.total;
    } catch (err) {
      const e2 = err as Error & { validacion?: boolean };
      if (e2.validacion) {
        ventana?.close();
        setIsSubmitting(false);
        alert(e2.message);
        return;
      }
      // Si la app no responde, el pedido sigue normal por WhatsApp: nunca se pierde una venta
    }

    registrarEvento('enviar_pedido_whatsapp', {
      value: cart.total,
      currency: 'MXN',
      frascos: cart.totalJars,
      entrega: formData.delivery,
      compartio_ubicacion: formData.coords !== null,
    });

    const message = generateWhatsAppMessage({ ...cart, total }, formData, false, folio);
    const link = getWhatsAppLink(message);
    if (ventana) ventana.location.href = link;
    else window.location.href = link;

    setTimeout(() => {
      clearCart();
      nuevoCarrito();
      onSuccess();
      setIsSubmitting(false);
      alert(COPY.checkout.successMessage);
    }, 500);
  };

  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">{COPY.checkout.title}</h2>
          <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl leading-none" aria-label="Cerrar">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              {COPY.checkout.name} *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Tu nombre completo"
              onBlur={guardarAvance}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">
              WhatsApp *
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={guardarAvance}
              className={inputClass}
              placeholder="614 123 4567"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Solo lo usamos para confirmar y dar seguimiento a tu pedido. No lo compartimos con nadie.
            </p>
          </div>

          <div>
            <label htmlFor="delivery" className="block text-sm font-semibold mb-2">
              {COPY.checkout.delivery} *
            </label>
            <select id="delivery" name="delivery" value={formData.delivery} onChange={handleChange} className={inputClass}>
              <option value="delivery">{COPY.checkout.deliveryOption1}</option>
              <option value="pickup">{COPY.checkout.deliveryOption2}</option>
            </select>
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-semibold mb-2">
              {COPY.checkout.zone} *
            </label>
            <input
              id="zone"
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Ej: El Reliz, Monteverde, Centro…"
              onBlur={guardarAvance}
              required
            />
          </div>

          {esEntrega && (
            <>
              <div>
                <label htmlFor="address" className="block text-sm font-semibold mb-2">
                  Dirección (calle y número)
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Ej: Jaén 2508, entre X y Y"
                />

                {/* Ubicación exacta desde el celular */}
                {formData.coords ? (
                  <div className="mt-2 flex items-center justify-between gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <span className="text-xs text-green-800">
                      ✓ Ubicación compartida (precisión ~{formData.coords.accuracy} m)
                    </span>
                    <button type="button" onClick={quitarUbicacion} className="text-xs text-green-900 underline">
                      quitar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={compartirUbicacion}
                    disabled={ubicacion === 'buscando'}
                    className="mt-2 w-full text-sm border-2 border-redhog-red text-redhog-red rounded-lg py-2 font-semibold hover:bg-redhog-red hover:text-white transition-colors disabled:opacity-60"
                  >
                    {ubicacion === 'buscando' ? 'Obteniendo ubicación…' : '📍 Compartir mi ubicación exacta'}
                  </button>
                )}

                {errorUbicacion && <p className="mt-2 text-xs text-gray-600">{errorUbicacion}</p>}
              </div>

              <fieldset>
                <legend className="block text-sm font-semibold mb-2">¿Tu domicilio está en {DELIVERY.zonaNombre}?</legend>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, inZone: true }))}
                    className={`flex-1 py-2 px-3 rounded text-sm font-semibold transition-colors ${
                      formData.inZone ? 'bg-redhog-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sí, estoy en la zona
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, inZone: false }))}
                    className={`flex-1 py-2 px-3 rounded text-sm font-semibold transition-colors ${
                      !formData.inZone ? 'bg-redhog-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Estoy fuera
                  </button>
                </div>
              </fieldset>
            </>
          )}

          {/* Regla de mínimo fuera de zona */}
          {bloqueadoPorZona && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 space-y-3">
              <p className="text-sm text-amber-900">
                Fuera de {DELIVERY.zonaNombre} entregamos a domicilio a partir de{' '}
                <strong>{DELIVERY.minFrascosFueraDeZona} frascos</strong>. Llevas {cart.totalJars}, te{' '}
                {faltanFrascos === 1 ? 'falta 1' : `faltan ${faltanFrascos}`}.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    document.getElementById('sabores')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 btn btn-small bg-redhog-red text-white hover:bg-red-700"
                >
                  Agregar más salsas
                </button>
                <button type="button" onClick={cambiarARecoleccion} className="flex-1 btn btn-small btn-outline">
                  Recoger en {DELIVERY.puntoRecoleccion}
                </button>
              </div>
            </div>
          )}

          {!esEntrega && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-900">
                Punto de recolección: <strong>{DELIVERY.puntoRecoleccion}</strong>. Acordamos día y hora por WhatsApp.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="comments" className="block text-sm font-semibold mb-2">
              {COPY.checkout.comments}
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className={inputClass}
              placeholder="Referencias, color de la casa, horario, etc."
              rows={3}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-700 whitespace-pre-line">{COPY.checkout.disclaimer}</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn btn-outline">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || bloqueadoPorZona}
              className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando…' : 'Enviar por WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
