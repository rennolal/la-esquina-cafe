import {NextRequest,NextResponse} from 'next/server';
export function proxy(request:NextRequest){
 const nonce=Buffer.from(crypto.randomUUID()).toString('base64');
 const csp=["default-src 'self'",`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,"style-src 'self' 'unsafe-inline'","img-src 'self' data:","font-src 'self'","connect-src 'self'","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'",'upgrade-insecure-requests'].join('; ');
 const headers=new Headers(request.headers);headers.set('Content-Security-Policy',csp);headers.set('x-nonce',nonce);
 const response=NextResponse.next({request:{headers}});response.headers.set('Content-Security-Policy',csp);return response;
}
export const config={matcher:['/((?!api|_next/static|_next/image|images|fonts|favicon.ico).*)']};
