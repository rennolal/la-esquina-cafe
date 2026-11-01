# Seguridad y rendimiento

## Cambios publicados

- HSTS: max-age=31536000 (sin incluir otros subdominios del proveedor).
- CSP con hashes SHA-256 calculados sobre los scripts inline exactos de cada respuesta HTML, sin unsafe-inline para scripts ni unsafe-eval.
- X-Frame-Options DENY, nosniff, strict-origin-when-cross-origin y Permissions-Policy para bloquear cámara, micrófono, ubicación, pagos y USB.
- Fuentes locales con subset latino, licencia OFL incluida; preload de las dos fuentes principales.
- Hero WebP con variantes 480/800/1280, preload responsive y prioridad alta. Imágenes secundarias lazy.
- Contenido de marketing renderizado en servidor; formulario como componente cliente independiente.

## Verificación y límites

Compilación correcta. La nueva puntuación de PageSpeed y el LCP aún requieren medición: la API devolvió 429 por cuota agotada. No se promete una puntuación concreta ni eliminar todo el JavaScript del framework.

## SPF / DMARC: pendiente de DNS

La URL actual pertenece a un subdominio del proveedor chatgpt.site. No hay acceso a su zona DNS desde el repositorio ni desde las herramientas de Sites. Estas políticas no se pueden añadir mediante HTML, React o cabeceras HTTP.

Para un dominio propio, revisar antes el proveedor de correo, los remitentes legítimos y los registros existentes. Si el dominio NO envía correo, se puede publicar un TXT SPF `v=spf1 -all` en el nombre correspondiente y un TXT DMARC `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s` en `_dmarc`. No aplicar esa configuración a un dominio que sí envía correo: hay que autorizar su proveedor y configurar DKIM.

Fuentes: https://www.cloudflare.com/learning/dns/dns-records/protect-domains-without-email/ y https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP

## Exportación

Las imágenes y fuentes se almacenan sin pérdida como Base64 en assets-encoded y se restauran con scripts/restore-images.mjs. Las entradas postinstall, predev y prebuild ya lo ejecutan. El repositorio no despliega automáticamente en Sites.
