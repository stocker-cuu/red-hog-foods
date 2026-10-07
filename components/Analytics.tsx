import Script from 'next/script';

/**
 * Google Analytics y Meta Pixel.
 *
 * No se activan hasta que existan los identificadores. Mientras estén vacíos
 * este componente no pinta nada, así que el sitio no carga scripts de más.
 *
 * Dónde se ponen: en Netlify → Site configuration → Environment variables.
 * Los nombres están en el archivo .env.example.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

/**
 * Registra un evento en las herramientas que estén activas.
 * Si no hay identificadores configurados, no hace nada y no truena.
 */
export function registrarEvento(nombre: string, datos?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  try {
    w.gtag?.('event', nombre, datos);
    w.fbq?.('trackCustom', nombre, datos);
  } catch {
    // La medición nunca debe romper una venta
  }
}
