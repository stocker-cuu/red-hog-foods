'use client';

import { BRAND_NAME, LOCATION, WHATSAPP_NUMBER, COPY, SOCIAL } from '@/lib/data';
import { BrandIcon, WhatsAppIcon } from './BrandIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

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
                <WhatsAppIcon className="w-5 h-5" color={false} />
                WhatsApp
              </a>
              {[SOCIAL.instagram, SOCIAL.facebook, SOCIAL.google].map((red) => (
                <a
                  key={red.name}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <BrandIcon brand={red.brand} className="w-5 h-5" color={false} />
                  {red.name === 'Google' ? 'Déjanos tu reseña' : red.name}
                </a>
              ))}
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
