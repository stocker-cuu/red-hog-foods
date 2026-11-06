'use client';

import { useEffect } from 'react';

/** Al llegar a la portada con /#faq, /#sabores… desde otra página, baja a esa sección. */
export default function IrAlHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }), 150);
    return () => clearTimeout(t);
  }, []);
  return null;
}
