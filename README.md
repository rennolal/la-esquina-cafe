# La Esquina · Café de barrio

Landing mobile-first construida con React 19, TypeScript y Vinext (Vite), con API de contacto y Cloudflare D1.

Web publicada: 

## Ejecutar

Requiere Node.js >=22.13 y pnpm.

```sh
pnpm install
pnpm dev
```

Las seis imágenes WebP se conservan completas, sin pérdida, en `assets-encoded/public/images/*.base64`. `postinstall`, `predev` y `prebuild` ejecutan `scripts/restore-images.mjs` para reconstruir sus archivos originales en `public/images`. También se pueden restaurar manualmente con `node scripts/restore-images.mjs`.

## Compilar

```sh
pnpm build
```

## Formulario y base de datos

`app/api/contacto/route.ts` valida los campos y guarda los mensajes en D1. No envía emails. No existe una API pública para leer los mensajes. El esquema y la migración están en `db/` y `drizzle/`.

Para habilitar la base de datos en desarrollo, compilar y aplicar la migración local:

```sh
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_smooth_shard.sql
pnpm dev
```

La configuración `.openai/hosting.json` corresponde a la web existente en Sites. Exportar a GitHub no configura sincronización automática ni despliega desde GitHub. Fuera de Sites se necesita configurar el alojamiento compatible y el binding D1 `DB`.

## Contenido

- `app/page.tsx`: landing, productos de ejemplo y formulario.
- `app/globals.css`: diseño adaptable.
- `public/images/`: imágenes originales restauradas al ejecutar los scripts.
- `db/` y `drizzle/`: modelo de datos y migración.
- `worker/`, `vite.config.ts` y `scripts/`: entorno y compilación.

Nombre del local, dirección, horario y teléfono son datos de ejemplo. Fotografías generadas con IA. No se incluyen mensajes de contacto, credenciales, dependencias instaladas ni archivos de compilación.
