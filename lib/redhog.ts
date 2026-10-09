// Envío de carritos y pedidos a la app de control de Red Hog Foods.
// La página solo puede llamar a dos funciones del servidor; los precios los recalcula la app.
import { REDHOG_APP, SALSAS } from './data';
import type { Cart, CheckoutData } from './types';
import { getMapsLink } from './utils';

const CLAVE_CARRITO = 'redhog-carrito-id';

/** Identificador anónimo del carrito de este navegador (para medir carritos abandonados). */
export function carritoId(): string {
  try {
    let id = localStorage.getItem(CLAVE_CARRITO);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(CLAVE_CARRITO, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Después de enviar un pedido, el siguiente carrito es uno nuevo. */
export function nuevoCarrito() {
  try {
    localStorage.removeItem(CLAVE_CARRITO);
  } catch {
    /* sin almacenamiento */
  }
}

function itemsParaApp(cart: Cart) {
  return cart.items
    .map((item) => {
      const salsa = SALSAS.find((s) => s.id === item.salsaId);
      if (!salsa?.codigo) return null;
      return { codigo: salsa.codigo + (item.presentation === 'large' ? 'G' : ''), cantidad: item.quantity };
    })
    .filter(Boolean);
}

async function rpc(fn: string, body: unknown) {
  const res = await fetch(`${REDHOG_APP.url}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: REDHOG_APP.key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || `Error ${res.status}`) as Error & { validacion?: boolean };
    // Los errores que lanzamos a propósito (teléfono, pedido vacío…) llegan con código P0001
    err.validacion = data?.code === 'P0001';
    throw err;
  }
  return data;
}

let pendiente: ReturnType<typeof setTimeout> | undefined;

/** Guarda el estado del carrito. Se agrupan los cambios para no mandar una llamada por clic. */
export function guardarCarrito(
  cart: Cart,
  etapa: 'carrito' | 'checkout' = 'carrito',
  datos?: Partial<Pick<CheckoutData, 'name' | 'phone' | 'zone'>>,
  esperar = 1500
) {
  clearTimeout(pendiente);
  pendiente = setTimeout(() => {
    rpc('guardar_carrito', {
      p_id: carritoId(),
      p_items: itemsParaApp(cart),
      p_etapa: etapa,
      p_nombre: datos?.name || null,
      p_telefono: datos?.phone || null,
      p_zona: datos?.zone || null,
      p_origen: typeof document !== 'undefined' ? document.referrer.slice(0, 200) || null : null,
    }).catch(() => {
      /* si falla, la compra sigue normal por WhatsApp */
    });
  }, esperar);
}

/** Crea el pedido en la app. Devuelve el folio y el total calculado con los precios de la app. */
export async function crearPedido(cart: Cart, form: CheckoutData): Promise<{ folio: string; total: number }> {
  clearTimeout(pendiente);
  const esEntrega = form.delivery === 'delivery';
  const data = await rpc('crear_pedido', {
    p: {
      nombre: form.name,
      telefono: form.phone,
      zona: form.zone,
      direccion: esEntrega ? form.address : '',
      entrega: esEntrega ? 'entrega' : 'recoger',
      en_zona: esEntrega ? form.inZone : null,
      ubicacion: esEntrega ? getMapsLink(form) : null,
      comentarios: form.comments,
      items: itemsParaApp(cart),
      carrito_id: carritoId(),
    },
  });
  const fila = Array.isArray(data) ? data[0] : data;
  return { folio: fila.folio, total: Number(fila.total) };
}
