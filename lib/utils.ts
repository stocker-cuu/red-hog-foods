import { DELIVERY, PRESENTATIONS, SALSAS, WHATSAPP_NUMBER } from './data';
import type { Cart, CheckoutData, CartItem } from './types';

export function generateWhatsAppMessage(cart: Cart, checkout: CheckoutData, isWholesale: boolean = false): string {
  if (isWholesale) {
    return generateWholesaleMessage(checkout);
  }

  const items = cart.items
    .map((item) => {
      const salsa = SALSAS.find((s) => s.id === item.salsaId);
      const presentation = PRESENTATIONS[item.presentation];
      const subtotal = item.price * item.quantity;
      return `• ${item.quantity} × ${salsa?.name || 'Salsa'} de ${presentation.volume} — \$${subtotal}`;
    })
    .join('\n');

  const esEntrega = checkout.delivery === 'delivery';

  const lineas = [
    'Hola, Red Hog. Quiero hacer este pedido:',
    items,
    '',
    `*Total: \$${cart.total} MXN*`,
    '',
    '*Datos:*',
    `Nombre: ${checkout.name}`,
    `Zona/colonia: ${checkout.zone}`,
    `Entrega o recolección: ${esEntrega ? 'Entrega a domicilio' : `Recolección en ${DELIVERY.puntoRecoleccion}`}`,
  ];

  if (esEntrega) {
    lineas.push(`Zona de reparto: ${checkout.inZone ? `dentro de ${DELIVERY.zonaNombre}` : 'fuera de la zona regular'}`);
  }

  if (esEntrega && checkout.address.trim()) {
    lineas.push(`Dirección: ${checkout.address.trim()}`);
  }

  const mapa = getMapsLink(checkout);
  if (esEntrega && mapa) {
    lineas.push(`Ubicación: ${mapa}`);
  }

  if (checkout.comments.trim()) {
    lineas.push(`Comentarios: ${checkout.comments.trim()}`);
  }

  lineas.push('', 'Quedo pendiente de confirmar disponibilidad, costo de entrega y forma de pago.');

  return encodeURIComponent(lineas.join('\n'));
}

function generateWholesaleMessage(checkout: CheckoutData): string {
  const message = `Hola, Red Hog. Tengo interés en compras mayoristas.

*Datos:*
Nombre: ${checkout.name}
Negocio/zona: ${checkout.zone}
${checkout.comments ? `Detalles: ${checkout.comments}` : ''}

Me gustaría conocer opciones de volumen, precios especiales y disponibilidad.`;

  return encodeURIComponent(message);
}

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

/**
 * Link de Google Maps para llegar al cliente.
 * Si compartió su ubicación usa las coordenadas exactas (el pin cae en el punto real);
 * si no, arma una búsqueda con la dirección que escribió.
 */
export function getMapsLink(checkout: CheckoutData): string | null {
  if (checkout.coords) {
    const { lat, lng } = checkout.coords;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  const partes = [checkout.address, checkout.zone, 'Chihuahua, Chihuahua, México']
    .map((p) => p.trim())
    .filter(Boolean);

  if (!checkout.address.trim()) return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partes.join(', '))}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
  }).format(price);
}

export function calculateCartTotal(items: CartItem[]): { total: number; totalJars: number } {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalJars = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, totalJars };
}
