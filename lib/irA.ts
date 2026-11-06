/**
 * Lleva a una sección de la portada (#sabores, #faq…).
 * Si estás en otra página (una salsa, el aviso de privacidad), te manda a la portada en esa sección.
 */
export function irA(id: string) {
  const seccion = document.getElementById(id);
  if (seccion) seccion.scrollIntoView({ behavior: 'smooth' });
  else window.location.href = `/#${id}`;
}
