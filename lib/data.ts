import type { Salsa } from './types';

// Configuración centralizada
export const WHATSAPP_NUMBER = '526142315153'; // ✅ Chihuahua
export const BRAND_NAME = 'Red Hog Foods';
export const BRAND_SHORT = 'Red Hog';
export const LOCATION = 'Chihuahua, Chihuahua, México';
export const SITE_URL = 'https://redhogfoods.com';

// Reglas de entrega — edita aquí si cambian tus zonas, el mínimo o el punto de recolección
export const DELIVERY = {
  zonaNombre: 'Zona El Reliz y alrededores',
  minFrascosFueraDeZona: 3,
  puntoRecoleccion: 'Alsuper Reliz',
} as const;
export const PHONE = '+52 614 231 5153'; // el que aparece en la etiqueta

// Redes sociales — un solo lugar para editarlas
export const SOCIAL = {
  instagram: {
    name: 'Instagram',
    url: 'https://www.instagram.com/redhogsalsa/',
    icon: '📸',
    cta: 'Síguenos y mira lo nuevo',
  },
  facebook: {
    name: 'Facebook',
    url: 'https://www.facebook.com/people/Red-Hog-Salsa/61574348140197/',
    icon: '👍',
    cta: 'Danos like y comenta',
  },
  google: {
    name: 'Google',
    url: 'https://g.page/r/CSHyV3wji0lfEBM/review',
    icon: '⭐',
    cta: 'Califícanos con estrellas',
  },
} as const;

/** Identificador de la ficha en Google Maps. Se necesita para leer reseñas con la API de Places. */
export const GOOGLE_PLACE_ID = 'ChIJw88gT5Vd6oYRIfJXfCOLSV8';

// Presentaciones y precios
export const PRESENTATIONS = {
  small: {
    volume: '220 ml',
    price: 75,
  },
  large: {
    volume: '350 ml',
    price: 125,
  },
} as const;

/**
 * Recomendación de conservación que aplica a todas las salsas.
 * Tomada del mismo texto de Preguntas Frecuentes: si cambia, cámbiala en los dos lados.
 * Si alguna salsa necesita una indicación distinta, ponle su propio campo `storage`.
 */
export const CONSERVACION_DEFAULT =
  'Se recomienda refrigerar aunque no se haya abierto, dado que son ingredientes naturales.';

// Productos
export const SALSAS: readonly Salsa[] = [
  {
    id: 'fresca',
    name: 'Fresca',
    description: 'Rojiza y jugosa, con ingredientes crudos',
    ingredients: 'Tomate, jalapeño, serrano en crudo',
    heat: '2 chiles',
    heatLevel: 2,
    pairings: ['Tacos de pescado', 'capeados', 'calditos', 'quesadillas', 'para dipear'],
    pairingNote:
      'Va bien con tacos de pescado, capeados, calditos, quesadillas o meramente como botana para dipear.',
    image: '/images/salsa-fresca.jpg',
    color: '#8BC34A',
  },
  {
    id: 'guera',
    name: 'Güera',
    description: 'Cremosita con especias',
    ingredients: 'Chiles güeros, chile habanero y especias',
    heat: '2 chiles',
    heatLevel: 2,
    pairings: ['Doritos y papas', 'taco gobernador', 'chuletas de cerdo', 'al pastor'],
    pairingNote:
      '100% dipeable con Doritos, Tostitos o cualquier papa. Por su cremosidad también se la pondría a un taquito gobernador, a unas chuletas de cerdo o a un taquito al pastor.',
    image: '/images/salsa-guera.jpg',
    color: '#FFC107',
  },
  {
    id: 'roja',
    name: 'Roja',
    description: 'La clásica de árbol pero con un toque más cremosito',
    ingredients: 'Tomate, chile de árbol tatemado y chiltepin',
    heat: '3 chiles',
    heatLevel: 3,
    pairings: ['Pozole', 'menudo dominguero', 'huevos al desayuno', 'caldo tlalpeño'],
    pairingNote:
      'Desde un plato de pozole o un menudo dominguero hasta unos huevitos al desayuno. No tanto de botanera por su picor ahumado, pero sí con un caldito tlalpeño o con lo que gustes.',
    image: '/images/salsa-roja.jpg',
    color: '#DC2626',
  },
  {
    id: 'tomatilla',
    name: 'Tomatilla',
    description: 'Tomatillo y chiles tatemados',
    ingredients: 'Tomatillo, jalapeño tatemado, serrano tatemado y cilantro',
    heat: '2 chiles',
    heatLevel: 2,
    pairings: ['Enchiladas suizas', 'Ruffles verdes', 'quecas sincronizadas'],
    pairingNote:
      'Se la pondría de extra a unas enchiladas suizas. Una porción a tu bolsa de Ruffles verdes, la agitas y listo. O unas quecas sincronizadas para cenar.',
    image: '/images/salsa-tomatilla.jpg',
    color: '#9C27B0',
  },
  {
    id: 'negra',
    name: 'Negra',
    description: 'Chiles tatemados, salsas negras',
    ingredients: 'Habaneros tatemados, salsas negras y especias',
    heat: '4 chiles',
    heatLevel: 4,
    pairings: ['Tostada de ceviche', 'aguachile', 'arroz rojo', 'frijoles charros'],
    pairingNote:
      'La usaría en una tostada de ceviche de pescado o de atún fresco, en un aguachile, en un arroz rojo o en unos frijoles charros en invierno. En fin: con todo.',
    image: '/images/salsa-negra.jpg',
    color: '#4A4A4A',
  },
  {
    id: 'coming-soon-1',
    name: 'Próximamente',
    description: 'Estamos trabajando en más sabores',
    ingredients: '...',
    heat: '?',
    heatLevel: 0,
    pairings: [],
    image: '/images/coming-soon.jpg',
    color: '#CCCCCC',
  },
  {
    id: 'coming-soon-2',
    name: 'Próximamente',
    description: 'Estamos trabajando en más sabores',
    ingredients: '...',
    heat: '?',
    heatLevel: 0,
    pairings: [],
    image: '/images/coming-soon.jpg',
    color: '#CCCCCC',
  },
  {
    id: 'coming-soon-3',
    name: 'Próximamente',
    description: 'Estamos trabajando en más sabores',
    ingredients: '...',
    heat: '?',
    heatLevel: 0,
    pairings: [],
    image: '/images/coming-soon.jpg',
    color: '#CCCCCC',
  },
];

// Contenido de secciones
export const COPY = {
  hero: {
    headline: 'Salsas artesanales hechas en Chihuahua',
    subheadline: 'Cinco sabores para tacos, carne asada, botanas y todo lo que necesite más carácter',
    badge: 'Hechas en Chihuahua',
    ctaPrimary: 'Arma tu pedido',
    ctaSecondary: 'Conoce los sabores',
  },
  flavors: {
    title: 'Nuestros sabores',
    subtitle: 'Desde lo suave hasta lo retador',
  },
  about: {
    title: 'Quién hace tus salsas',
    image: '/quienes-somos.jpg',
    imageAlt: 'Los cinco sabores de Red Hog Salsa',
    paragraphs: [
      'Me llamo César, aunque casi todos me dicen Wero. Red Hog nació en una carne asada: unos amigos probaron mi salsa y no me dejaron en paz hasta que la vendiera.',
      'Preparo cada lote como si fuera para mi propia mesa. Unas son las recetas de siempre con un twist que se me ocurrió probando, y otras salieron puras de experimentar.',
      'Eso sí: una salsa tiene que picar. Si no, pídeme mermelada.',
    ],
    benefits: [
      'Recetas elaboradas en casa',
      'Preparadas en pequeños lotes',
      'Sabores y picores diferentes',
      'Compra directa con el productor',
    ],
  },
  howToBuy: {
    title: 'Cómo comprar en 3 pasos',
    steps: [
      {
        number: '1',
        title: 'Elige tus salsas',
        description: 'Selecciona sabores, volumen y cantidad',
      },
      {
        number: '2',
        title: 'Envía por WhatsApp',
        description: 'Tu pedido llega en un mensaje claro',
      },
      {
        number: '3',
        title: 'Confirmamos todo',
        description: 'Disponibilidad, costo de entrega y pago',
      },
    ],
  },
  testimonials: {
    title: '¿Ya probaste Red Hog?',
    cta: 'Cuéntanos qué te pareció',
    note: 'Tu reseña nos ayuda a que más gente en Chihuahua nos encuentre.',
    networks: [SOCIAL.google, SOCIAL.instagram, SOCIAL.facebook],
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Dónde entregan?',
        answer: 'Realizamos entregas dentro de Zona El Reliz y alrededores o punto a convenir dentro de esta zona. Si es fuera de Reliz, de 3 envases en adelante llevamos a domicilio o punto a convenir establecido por ambas partes.',
      },
      {
        question: '¿Cómo puedo pagar?',
        answer: 'Aceptamos: Efectivo, transferencia, tarjeta y Clip (recibimos un enlace por WhatsApp para pagar virtualmente).',
      },
      {
        question: '¿Necesitan refrigeración?',
        answer: 'Se recomienda refrigerar aunque no se haya abierto, dado que son ingredientes naturales. Nota: Salsas machas y chicharrón de chile (próximamente) pueden tener otras recomendaciones.',
      },
      {
        question: '¿Cuánto pican?',
        answer: 'Todas tienen algún tipo de chile, unas más que otras. El picómetro viene señalizado en cada una de las opciones con un sistema de chiles (1-4).',
      },
      {
        question: '¿Manejan pedidos para restaurantes o eventos?',
        answer: 'Claro que sí. Déjanos tus datos, nos ponemos en contacto contigo y cuadramos la operación según tus necesidades.',
      },
    ],
  },
  wholesale: {
    title: 'Salsas para tu negocio',
    subtitle: 'Restaurantes, taquerías, tiendas y eventos',
    description: 'Consulta sobre volúmenes especiales, precios mayoristas y soluciones personalizadas',
    cta: 'Solicitar información',
  },
  cart: {
    empty: 'Tu pedido está vacío',
    emptyDescription: 'Explora nuestros sabores y comienza a agregar',
    total: 'Total',
    jars: 'frascos',
    ctaWhatsApp: 'Enviar por WhatsApp',
  },
  checkout: {
    title: 'Completa tu pedido',
    name: 'Nombre',
    zone: 'Colonia o zona',
    delivery: 'Forma de entrega',
    comments: 'Comentarios (opcional)',
    deliveryOption1: 'Entrega a domicilio',
    deliveryOption2: 'Recolección en sucursal',
    disclaimer:
      '✓ Tu pedido queda sujeto a confirmación de disponibilidad\n✓ El costo de entrega se confirma por WhatsApp\n✓ El envío no equivale a pago confirmado',
    successMessage: 'Tu pedido fue enviado a WhatsApp. Espera confirmación de disponibilidad, costo y forma de pago.',
  },
  footer: {
    note: 'Disponibilidad, entrega y pago se confirman directamente por WhatsApp.',
  },
} as const;
