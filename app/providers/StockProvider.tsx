'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { obtenerDisponibilidad } from '@/lib/redhog';
import type { PresentationKey, Salsa } from '@/lib/types';

/** Código en la app de una salsa en cierta presentación (la grande lleva "G"). */
export const codigoDe = (salsa: Salsa, presentation: PresentationKey) =>
  salsa.codigo ? (salsa.codigo + (presentation === 'large' ? 'G' : '')).toUpperCase() : null;

const StockContext = createContext<Record<string, boolean>>({});

/** Pregunta a la app qué salsas hay. Mientras no responda (o si falla) todo se puede pedir. */
export function StockProvider({ children }: { children: React.ReactNode }) {
  const [stock, setStock] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const cargar = () => obtenerDisponibilidad().then(setStock).catch(() => {});
    cargar();
    const t = setInterval(cargar, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);
  return <StockContext.Provider value={stock}>{children}</StockContext.Provider>;
}

export function useAgotado() {
  const stock = useContext(StockContext);
  return (salsa: Salsa, presentation: PresentationKey) => {
    const c = codigoDe(salsa, presentation);
    if (!c) return false;
    // Si la app ya respondió y esa presentación no existe allá, no se puede pedir (se perdería del pedido)
    if (Object.keys(stock).length && !(c in stock)) return true;
    return stock[c] === false;
  };
}
