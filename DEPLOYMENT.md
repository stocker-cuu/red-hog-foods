# 🚀 Guía de Despliegue - Red Hog Foods MVP

## ✅ Estado Actual

El proyecto está **listo para producción**. Compiló sin errores y está optimizado para Netlify.

## 📋 Pasos de Despliegue

### 1. Preparar el repositorio Git (si no está hecho)

```bash
cd "/Users/cesaragu/Desktop/EMPRENDIMIENTOS/REDHOG SALSAS"
git init
git add .
git commit -m "Initial commit: Red Hog Foods MVP"
git remote add origin https://github.com/TU_USUARIO/red-hog-foods.git
git push -u origin main
```

### 2. Desplegar en Netlify

**Opción A: Mediante Git (Recomendado)**

1. Ve a https://app.netlify.com/signup
2. Elige "GitHub" como proveedor
3. Conecta tu repositorio
4. Clic en "Deploy site"
5. Netlify detectará automáticamente:
   - Build command: `npm run build`
   - Publish directory: `.next`

**Opción B: Manual (sin Git)**

1. Compila localmente:
```bash
npm run build
```

2. Ve a https://app.netlify.com/drop
3. Arrastra y suelta la carpeta `.next`
4. Netlify generará un URL automático

### 3. Configurar dominio personalizado

Una vez desplegado en Netlify:

1. En dashboard de Netlify → Domain management
2. Add custom domain → `redhogfoods.com`
3. Sigue las instrucciones de DNS según tu registrador

## 🔧 Información Requerida ANTES de Desplegar

### 1. Número de WhatsApp
- **Ubicación:** `lib/data.ts`, línea 8
- **Formato:** `52` + código + número (sin +, sin espacios)
- **Ejemplo:** `525514123456`
- **Reemplazar:** `'525512345678'` con tu número real

### 2. Imágenes de Productos
Guarda en `public/images/`:
```
public/images/
├── salsa-fresca.jpg
├── salsa-guera.jpg
├── salsa-roja.jpg
├── salsa-tomatilla.jpg
└── salsa-negra.jpg
```

Requisitos:
- Formato: JPG o PNG
- Tamaño mínimo: 400x400px
- Tamaño máximo: 2MB

### 3. Imagen Hero
- **Archivo:** `public/hero-image.jpg`
- **Tamaño recomendado:** 800x800px
- **Contenido:** Foto atractiva de salsas o producto

### 4. Favicon
- **Archivo:** `public/favicon.ico`
- **Tamaño:** 32x32px
- **Herramienta:** https://favicon-generator.org/

### 5. Actualizar Instagram
- **Ubicación:** `components/Footer.tsx`, línea 11
- **Reemplazar:** `https://instagram.com/redhogfoods`
- **Con:** Tu URL real de Instagram

## 📝 Contenido Pendiente (Opcional antes de Desplegar)

Estos campos tienen placeholders y pueden editarse después:

### 1. FAQ - Información Real
**Ubicación:** `lib/data.ts`, línea ~70-85

Campos marcados como `[PENDIENTE]`:
- ¿Dónde entregan?
- ¿Necesitan refrigeración?

### 2. Testimonios
**Ubicación:** `lib/data.ts`, línea ~65

Cuando tengas testimonios reales:
```typescript
export const COPY = {
  testimonials: {
    title: '¿Ya probaste Red Hog?',
    cta: 'Comparte tu experiencia',
    items: [
      {
        name: 'María López',
        text: 'Las mejores salsas que he probado...',
        role: 'Cliente'
      }
    ]
  }
}
```

## 🎯 Verificación Pre-Despliegue

Antes de pusheaer a producción, verifica:

- [ ] Número de WhatsApp actualizado
- [ ] 5 imágenes de salsas en `public/images/`
- [ ] Imagen hero en `public/`
- [ ] Favicon en `public/`
- [ ] URL de Instagram actualizada
- [ ] Proyecto compiló sin errores (`npm run build`)
- [ ] No hay secretos en el código
- [ ] El carrito funciona en navegador
- [ ] Los botones de WhatsApp funcionan

## 🧪 Prueba Local Completa

Antes de desplegar:

```bash
npm run dev
# Abre http://localhost:3000
```

Verifica:
1. ✅ Header con navegación funcional
2. ✅ Hero section con botones
3. ✅ Tarjetas de salsas cargan
4. ✅ Puedes agregar productos al carrito
5. ✅ El carrito persiste (refresh la página)
6. ✅ El contador de carrito actualiza
7. ✅ Botón "Enviar por WhatsApp" abre modal
8. ✅ Modal de checkout funciona
9. ✅ El mensaje de WhatsApp se genera correctamente
10. ✅ Footer es accesible

## 📞 Soporte WhatsApp

El número se configura aquí:
```typescript
// lib/data.ts, línea 8
export const WHATSAPP_NUMBER = '525512345678'; // ← Cambiar
```

Formato:
- 52 = código de país México
- 55 = código de área Chihuahua (ejemplo)
- 14123456 = número sin 0 inicial

Total sin caracteres especiales: 10 dígitos + código país

## 🔒 Seguridad

- ✅ No hay secretos en el código
- ✅ No hay claves de API expuestas
- ✅ `.gitignore` configurado correctamente
- ✅ No hay logs sensibles

## 📊 Analytics (Opcional después)

Cuando quieras agregar:

1. **Google Analytics:** Editar `app/layout.tsx`
2. **Meta Pixel:** Agregar script en head
3. **Google Ads:** Conversion tracking

Avisa cuando quieras configurarlo.

## 🆘 Solución de Problemas

### Error "npm: command not found"
```bash
brew install node  # En Mac
```

### Error "Port 3000 already in use"
```bash
lsof -i :3000
kill -9 <PID>
```

### Error al desplegar en Netlify
1. Verifica que `.next` está en `.gitignore`
2. Verifica que `next.config.js` tiene `output: 'standalone'`
3. Verifica que `tsconfig.json` está actualizado

## ✨ Próximos Pasos (Después del Lanzamiento)

1. Monitorear tráfico y conversiones
2. Recopilar testimonios reales
3. Agregar analytics
4. Configurar métricas de WhatsApp
5. Considera integrar Clip cuando esté listo

## 📞 Contacto

Cualquier problema: revisa el README.md o contacta al desarrollador.

