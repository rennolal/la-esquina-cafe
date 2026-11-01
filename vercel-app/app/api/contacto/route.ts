import { put } from '@vercel/blob';
export const runtime = 'nodejs';
export async function POST(request:Request){
 if(request.headers.get('origin') && request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Solicitud no permitida.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>16000)return Response.json({error:'Mensaje demasiado largo.'},{status:413});
 let data;try{const raw=await request.text();if(raw.length>16000)return Response.json({error:'Mensaje demasiado largo.'},{status:413});data=JSON.parse(raw);if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('Invalid input')}catch{return Response.json({error:'Solicitud inválida.'},{status:400})}
 const nombre=typeof data.nombre==='string'?data.nombre.trim():'';const email=typeof data.email==='string'?data.email.trim():'';const mensaje=typeof data.mensaje==='string'?data.mensaje.trim():'';
 if(!nombre||nombre.length>100||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||!mensaje||mensaje.length>3000)return Response.json({error:'Revisa el nombre, el email y el mensaje.'},{status:400});
 if(data.website)return Response.json({error:'Solicitud inválida.'},{status:400});
 try{const id=crypto.randomUUID();await put(`contactos/${id}.json`, JSON.stringify({id,nombre,email,mensaje,creado_en:new Date().toISOString()}), {access:'private',contentType:'application/json',addRandomSuffix:false});return Response.json({ok:true,id},{status:201})}catch{return Response.json({error:'No hemos podido guardar tu mensaje. Inténtalo de nuevo.'},{status:503})}
}
