import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
const root = new URL('../assets-encoded/', import.meta.url);
async function restore(folder, relative = '') {
 for (const entry of await readdir(folder, {withFileTypes:true})) {
  const rel = relative + entry.name;
  if (entry.isDirectory()) { await restore(new URL(entry.name + '/', folder), rel + '/'); continue; }
  if (!entry.name.endsWith('.base64')) continue;
  const target = new URL('../' + rel.slice(0, -7), import.meta.url);
  await mkdir(dirname(target.pathname), {recursive:true});
  await writeFile(target, Buffer.from((await readFile(new URL(entry.name, folder), 'utf8')).trim(), 'base64'));
 }
}
await restore(root);
console.log('Imágenes y fuentes restauradas.');
