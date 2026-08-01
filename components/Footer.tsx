'use client';

import { BRAND_NAME, LOCATION, WHATSAPP_NUMBER, COPY, SOCIAL } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;
  const instagramLink = SOCIAL.instagram.url;

  return (
    <footer className="bg-redhog-dark text-white">
      <div className="container-max py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{BRAND_NAME}</h3>
            <p className="text-gray-300 text-sm">{LOCATION}</p>
            <p className="text-gray-400 text-xs">{COPY.footer.note}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Enlaces</h4>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => document.getElementById('sabores')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Nuestros sabores
              </button>
              <button
                onClick={() => document.getElementById('como-comprar')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Cómo comprar
              </button>
              <button
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Preguntas frecuentes
              </button>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-2 text-sm">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.982 1.523 9.91 9.91 0 00-4.01 4.153 10.02 10.02 0 00-.957 4.948c0 5.52 4.52 10.021 10.043 10.021h.002a10.01 10.01 0 0010.041-10.025c0-2.792-.73-5.415-2.111-7.697A10.016 10.016 0 0011.051 6.98" />
                </svg>
                WhatsApp
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z" />
                </svg>
                Instagram
              </a>
              <a
                href={SOCIAL.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} {BRAND_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
