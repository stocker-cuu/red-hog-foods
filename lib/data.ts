export const WHATSAPP_NUMBER = '525512345678';
export const BRAND_NAME = 'Red Hog Foods';
export const BRAND_SHORT = 'Red Hog';
export const LOCATION = 'Chihuahua, Chihuahua, México';

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

export const SALSAS = [
  {
    id: 'fresca',
    name: 'Fresca',
    description: 'Verde, jugosa y con el toque perfecto de cilantro',
    ingredients: 'Tomatillos, jalapeños, cilantro, cebolla, ajo',
    heat: 'Suave',
    heatLevel: 1,
    recommendedFor: 'Pescados, mariscos, botanas frescas',
    image: '/images/salsa-fresca.jpg',
    color: '#8BC34A',
  },
  {
    id: 'guera',
    name: 'Güera',
    description: 'Amarilla cremosa con un toque de serrano',
    ingredients: 'Chiles güeros, tomate, ajo, crema',
    heat: 'Medio',
    heatLevel: 2,
    recommendedFor: 'Tacos al pastor, quesadillas, carne asada',
    image: '/images/salsa-guera.jpg',
    color: '#FFC107',
  },
  {
    id: 'roja',
    name: 'Roja',
    description: 'Clásica, balanceada y lista para todo',
    ingredients: 'Tomates rojos, chiles guajillo, ajo, especias',
    heat: 'Medio',
    heatLevel: 2,
    recommendedFor: 'Carne asada, enchiladas, chilaquiles',
    image: '/images/salsa-roja.jpg',
    color: '#DC2626',
  },
  {
    id: 'tomatilla',
    name: 'Tomatilla',
    description: 'Vibrante con tomatillo fresco y habanero',
    ingredients: 'Tomatillos, habaneros, cilantro, cebolla',
    heat: 'Picoso',
    heatLevel: 3,
    recommendedFor: 'Tacos, ceviche, ceviches, consome',
    image: '/images/salsa-tomatilla.jpg',
    color: '#9C27B0',
  },
  {
    id: 'negra',
    name: 'Negra',
    description: 'Oscura, ahumada y con profundidad de sabor',
    ingredients: 'Chiles negros, tomate, ajo, especias ahumadas',
    heat: 'Muy picoso',
    heatLevel: 4,
    recommendedFor: 'Para los valientes: tacos de barbacoa, huevos',
    image: '/images/salsa-negra.jpg',
    color: '#4A4A4A',
  },
] as const;

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
  whyus: {
    title: '¿Por qué Red Hog?',
    benefits: [
      'Elaboradas en Chihuahua',
      'Preparadas en pequeños lotes',
      'Cinco sabores para diferentes niveles de picor',
      'Compra directa al productor',
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
    cta: 'Comparte tu experiencia',
    note: '[Testimonios reales - Reemplazar cuando estén disponibles]',
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Dónde entregan?',
        answer: '[PENDIENTE: Definir cobertura de entrega]',
      },
      {
        question: '¿Cómo puedo pagar?',
        answer: 'Por WhatsApp confirmamos formas de pago: transferencia, Clip o efectivo en recolección.',
      },
      {
        question: '¿Necesitan refrigeración?',
        answer: '[PENDIENTE: Confirmar condiciones de conservación]',
      },
      {
        question: '¿Cuánto pican?',
        answer: 'Tenemos desde Fresca (muy suave) hasta Negra (muy picosa). Explora cada una en nuestros sabores.',
      },
      {
        question: '¿Manejan pedidos para restaurantes o eventos?',
        answer: 'Sí, accede a nuestra sección de Mayoreo o contacta directamente por WhatsApp.',
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
