/** Hash only the exact inline scripts rendered by React. Never allow arbitrary inline JS. */
export async function secureResponse(response: Response): Promise<Response> {
  const headers = new Headers(response.headers);
  headers.set('Strict-Transport-Security', 'max-age=31536000');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  const isHtml = headers.get('content-type')?.includes('text/html');
  let body: BodyInit | null = response.body;
  const hashes: string[] = [];
  if (isHtml) {
    const html = await response.text();
    // All interpolated user-facing text is escaped by React. Scripts come from the framework.
    const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
      .filter(([, attrs, code]) => !/\bsrc\s*=/i.test(attrs) && code.trim());
    const values = await Promise.all(scripts.map(async ([,, code]) => {
      const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code)));
      return `'sha256-${btoa(String.fromCharCode(...digest))}'`;
    }));
    hashes.push(...new Set(values));
    body = html;
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('Cache-Control', 'no-cache');
  }
  headers.set('Content-Security-Policy', [
    "default-src 'self'", `script-src 'self' ${hashes.join(' ')}`.trim(),
    "script-src-attr 'none'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data:",
    "font-src 'self'", "connect-src 'self'", "object-src 'none'", "base-uri 'self'",
    "form-action 'self'", "frame-ancestors 'none'", 'upgrade-insecure-requests',
  ].join('; '));
  return new Response(body, {status:response.status,statusText:response.statusText,headers});
}
