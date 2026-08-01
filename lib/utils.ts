import { PRESENTATIONS, SALSAS, WHATSAPP_NUMBER } from './data';
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

  const message = `Hola, Red Hog. Quiero hacer este pedido:
${items}

*Total: \$${cart.total} MXN*

*Datos:*
Nombre: ${checkout.name}
Zona/colonia: ${checkout.zone}
Entrega o recolección: ${checkout.delivery === 'delivery' ? 'Entrega a domicilio' : 'Recolección'}
${checkout.comments ? `Comentarios: ${checkout.comments}` : ''}

Quedo pendiente de confirmar disponibilidad, costo de entrega y forma de pago.`;

  return encodeURIComponent(message);
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
