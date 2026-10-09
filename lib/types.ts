export type PresentationKey = 'small' | 'large';

export interface CartItem {
  salsaId: string;
  presentation: PresentationKey;
  quantity: number;
  salsaName: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalJars: number;
}

export interface Coords {
  lat: number;
  lng: number;
  /** Precisión aproximada en metros que reporta el navegador */
  accuracy: number;
}

export interface CheckoutData {
  name: string;
  /** WhatsApp del cliente, 10 dígitos */
  phone: string;
  /** Correo opcional, solo si quiere recibir promociones por correo */
  email?: string;
  /** Si aceptó recibir novedades y promociones (casilla desmarcada por defecto) */
  acceptsPromos?: boolean;
  zone: string;
  /** Calle y número. Solo se pide cuando es entrega a domicilio. */
  address: string;
  /** Ubicación compartida por el cliente desde su celular (opcional) */
  coords: Coords | null;
  delivery: 'delivery' | 'pickup';
  /** Si el domicilio cae dentro de la zona regular de reparto */
  inZone: boolean;
  comments: string;
}

export interface Salsa {
  id: string;
  /** Código del producto en la app de control (el tamaño grande es el mismo código + "G") */
  codigo?: string;
  name: string;
  description: string;
  ingredients: string;
  heat: string;
  /** 0 = próximamente (todavía no se vende), 1 a 4 = chiles de picor */
  heatLevel: number;
  /** Etiquetas cortas para la tarjeta del catálogo */
  pairings: readonly string[];
  /** Recomendación en palabras de Wero, se muestra en la página de la salsa */
  pairingNote?: string;
  /** Solo si esta salsa necesita algo distinto a CONSERVACION_DEFAULT */
  storage?: string;
  image: string;
  color: string;
}
