'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRESENTATIONS, SALSAS } from '@/lib/data';
import { calculateCartTotal } from '@/lib/utils';
import type { CartItem, Cart, PresentationKey } from '@/lib/types';

interface CartContextType {
  cart: Cart;
  addToCart: (salsaId: string, presentation: PresentationKey, quantity: number) => void;
  updateCartItem: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    totalJars: 0,
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('redhog-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCart(parsed);
      } catch (e) {
        console.error('Failed to load cart from storage', e);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('redhog-cart', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (salsaId: string, presentation: PresentationKey, quantity: number) => {
    if (quantity <= 0) return;

    const salsa = SALSAS.find((s) => s.id === salsaId);
    if (!salsa) return;

    const price = PRESENTATIONS[presentation].price;

    setCart((prev) => {
      const existingIndex = prev.items.findIndex((item) => item.salsaId === salsaId && item.presentation === presentation);

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = [...prev.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [
          ...prev.items,
          {
            salsaId,
            presentation,
            quantity,
            salsaName: salsa.name,
            price,
          },
        ];
      }

      const { total, totalJars } = calculateCartTotal(newItems);
      return { items: newItems, total, totalJars };
    });
  };

  const updateCartItem = (index: number, quantity: number) => {
    if (quantity < 0) return;

    setCart((prev) => {
      if (index < 0 || index >= prev.items.length) return prev;

      const newItems = [...prev.items];
      if (quantity === 0) {
        newItems.splice(index, 1);
      } else {
        newItems[index].quantity = quantity;
      }

      const { total, totalJars } = calculateCartTotal(newItems);
      return { items: newItems, total, totalJars };
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const newItems = prev.items.filter((_, i) => i !== index);
      const { total, totalJars } = calculateCartTotal(newItems);
      return { items: newItems, total, totalJars };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, totalJars: 0 });
  };

  return <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
