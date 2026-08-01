# Red Hog Foods - Landing Commerce

MVP de landing commerce para Red Hog Foods, una marca de salsas artesanales de Chihuahua, México.

## 🚀 Características

- ✅ Landpage responsive mobile-first
- ✅ Catálogo de 5 salsas con selector de presentación y cantidad
- ✅ Carrito persistente en localStorage
- ✅ Generación automática de mensajes de WhatsApp
- ✅ Formulario de pedido simple
- ✅ Sección de mayoreo
- ✅ FAQ y beneficios
- ✅ Diseño artesanal
- ✅ Listo para Netlify

## 📋 Requisitos antes de ir a producción

1. **Número de WhatsApp** - Actualizar en `lib/data.ts`
2. **Imágenes de productos** - Guardar en `public/images/`:
   - salsa-fresca.jpg
   - salsa-guera.jpg
   - salsa-roja.jpg
   - salsa-tomatilla.jpg
   - salsa-negra.jpg
3. **Imagen hero** - Guardar en `public/hero-image.jpg`
4. **Favicon** - Guardar en `public/favicon.ico`

## 🛠️ Instalación

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## 📦 Build para producción

```bash
npm run build
npm run start
```

## 🚀 Despliegue en Netlify

1. Push a GitHub
2. En Netlify: Connect repository
3. Build command: `npm run build`
4. Publish directory: `.next`

## 📝 Configuración

Toda la configuración está centralizada en `lib/data.ts`:
- WHATSAPP_NUMBER
- Precios y presentaciones
- Información de productos
- Textos de la página

## ⚠️ Notas

- El MVP usa localStorage para el carrito
- Los pedidos se envían por WhatsApp
- No hay backend, pagos ni autenticación
- Todo el contenido es editable en `lib/data.ts`

