# La Esquina · Vercel personal

Versión React + Next.js independiente de ChatGPT Sites y Team Rockstars. El proyecto Vercel se llama `la-esquina-cafe`, en `rennolal-8237`.

## Ejecución

Node.js 22 o superior. Ejecutar dentro de esta carpeta:

```
npm install
node scripts/prepare-assets.mjs
npm run dev
```

Para compilar: `npm run build`. El script prebuild restaura imágenes y fuentes desde `../assets-encoded` cuando se ejecuta en el repositorio completo. El despliegue directo ya incluye los archivos binarios en public.

## Mensajes

POST `/api/contacto` valida nombre, email y mensaje. Cada mensaje se guarda como JSON en Vercel Blob **privado**, en la carpeta contactos, con UUID y fecha. No hay endpoint público para leer mensajes. El almacenamiento se configura en Vercel y el secreto BLOB_READ_WRITE_TOKEN queda exclusivamente en el servidor. No se utiliza D1 ni se consulta el alojamiento de Rockstars.

Las notificaciones por correo aún no están configuradas.

## Publicación

Configurar `vercel-app` como Root Directory al importar el repositorio completo en Vercel. Framework: Next.js. Build: npm run build. Install: npm install. La publicación inicial se realiza mediante la API de Vercel; no implica sincronización automática con GitHub.

Cabeceras de seguridad en next.config.mjs. CSP con nonce por petición en proxy.ts; renderizado dinámico para que Next.js incluya el nonce en sus scripts. Los datos del local siguen siendo de ejemplo.
