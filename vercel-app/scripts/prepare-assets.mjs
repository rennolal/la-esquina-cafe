import { readdir, readFile, mkdir, writeFile, access, copyFile } from 'node:fs/promises';
import { dirname } from 'node:path';
const encoded=new URL('../../assets-encoded/public/',import.meta.url);
const output=new URL('../public/',import.meta.url);
// The GitHub export stores binary assets losslessly as Base64 at the repository root.
async function restore(folder,rel=''){
 for(const entry of await readdir(folder,{withFileTypes:true})){
  if(entry.isDirectory()){await restore(new URL(entry.name+'/',folder),rel+entry.name+'/');continue;}
  if(!entry.name.endsWith('.base64'))continue;
  const dest=new URL(rel+entry.name.slice(0,-7),output);await mkdir(dirname(dest.pathname),{recursive:true});
  await writeFile(dest,Buffer.from((await readFile(new URL(entry.name,folder),'utf8')).trim(),'base64'));
 }
}
try{await access(encoded);await restore(encoded);}catch(error){if(error.code!=='ENOENT')throw error;}
await access(new URL('images/fachada-480.webp',output));
await access(new URL('fonts/playfair.woff',output));
