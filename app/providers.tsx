'use client';

import { CartProvider } from './providers/CartProvider';
import { StockProvider } from './providers/StockProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StockProvider>
      <CartProvider>{children}</CartProvider>
    </StockProvider>
  );
}
