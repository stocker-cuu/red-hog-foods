import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND_NAME, PHONE, PRIVACIDAD, SITE_URL, WHATSAPP_NUMBER } from '@/lib/data';

export const metadata: Metadata = {
  title: `Aviso de privacidad | ${BRAND_NAME}`,
  description: `Cómo ${BRAND_NAME} cuida los datos personales de quienes hacen pedidos en ${SITE_URL}.`,
  alternates: { canonical: '/aviso-de-privacidad' },
};

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold text-redhog-red">{titulo}</h2>
      <div className="space-y-2 text-gray-800 leading-relaxed">{children}</div>
    </section>
  );
}

export default function AvisoDePrivacidad() {
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <main>
      <Header />
      <div className="container-max py-6 md:py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-redhog-red">
          ← Volver al inicio
        </Link>
      </div>

      <article className="container-max max-w-3xl pb-16 space-y-8">
        <header className="space-y-2">
          <h1 className="headline">Aviso de privacidad</h1>
          <p className="text-sm text-gray-600">Última actualización: {PRIVACIDAD.actualizado}</p>
        </header>

        <Seccion titulo="Quién es responsable de tus datos">
          <p>
            {PRIVACIDAD.responsable}, con domicilio en {PRIVACIDAD.domicilio}, es responsable del uso y protección de
            tus datos personales, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares.
          </p>
        </Seccion>

        <Seccion titulo="Qué datos recabamos">
          <p>Cuando haces un pedido en esta página recabamos únicamente:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre.</li>
            <li>Número de WhatsApp.</li>
            <li>Colonia o zona y, si pides entrega a domicilio, tu dirección.</li>
            <li>Tu ubicación, solo si decides compartirla con el botón “Compartir mi ubicación exacta”.</li>
            <li>Los comentarios que escribas y las salsas que elijas.</li>
          </ul>
          <p>
            Tu nombre, WhatsApp y colonia se guardan desde que los escribes en el formulario, aunque no termines de
            enviar el pedido, para poder ayudarte a completarlo. No recabamos datos sensibles ni datos bancarios: el pago
            se acuerda directamente por WhatsApp.
          </p>
        </Seccion>

        <Seccion titulo="Para qué los usamos">
          <p>Finalidades necesarias para atender tu pedido:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Confirmar tu pedido, disponibilidad, costo de entrega y forma de pago.</li>
            <li>Entregarte tu pedido o acordar la recolección.</li>
            <li>Darte seguimiento si tu pedido quedó incompleto.</li>
            <li>Llevar el registro de nuestras ventas y de tu historial de compras.</li>
          </ul>
          <p>Finalidad adicional, que puedes rechazar en cualquier momento:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Avisarte de nuevos sabores, promociones o lotes disponibles.</li>
          </ul>
          <p>
            Si no quieres que usemos tus datos para la finalidad adicional, escríbenos por WhatsApp y dejamos de
            enviarte avisos. Esto no afecta tus pedidos.
          </p>
        </Seccion>

        <Seccion titulo="Con quién los compartimos">
          <p>
            No vendemos ni compartimos tus datos con nadie para fines comerciales. Se guardan en un servicio de base de
            datos en la nube que usamos para administrar nuestros pedidos, y la conversación sobre tu pedido ocurre por
            WhatsApp. Solo los compartiríamos si una autoridad competente lo requiere conforme a la ley.
          </p>
        </Seccion>

        <Seccion titulo="Tus derechos (ARCO)">
          <p>
            Puedes pedirnos en cualquier momento acceder a tus datos, corregirlos, cancelarlos u oponerte a su uso, así
            como revocar tu consentimiento. Envíanos tu solicitud por{' '}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-redhog-red underline">
              WhatsApp al {PHONE}
            </a>{' '}
            indicando tu nombre, el teléfono con el que hiciste tu pedido y lo que necesitas. Te respondemos en un plazo
            máximo de 20 días hábiles.
          </p>
        </Seccion>

        <Seccion titulo="Almacenamiento en tu navegador">
          <p>
            Esta página guarda en tu propio navegador el contenido de tu carrito y un identificador anónimo, para que no
            pierdas tu pedido si cierras la página. No usamos esa información para identificarte en otros sitios.
          </p>
        </Seccion>

        <Seccion titulo="Cambios a este aviso">
          <p>Cualquier cambio a este aviso lo publicaremos en esta misma página, con su fecha de actualización.</p>
        </Seccion>
      </article>

      <Footer />
    </main>
  );
}
