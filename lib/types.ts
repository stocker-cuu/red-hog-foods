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

export interface CheckoutData {
  name: string;
  zone: string;
  delivery: 'delivery' | 'pickup';
  comments: string;
}

export interface Salsa {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  heat: string;
  heatLevel: number;
  recommendedFor: string;
  image: string;
  color: string;
}
