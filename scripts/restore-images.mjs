import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
const folder = new URL('../assets-encoded/public/images/', import.meta.url);
for (const name of await readdir(folder)) {
 if (!name.endsWith('.base64')) continue;
 const target = new URL('../public/images/' + name.slice(0, -7), import.meta.url);
 await mkdir(dirname(target.pathname), { recursive: true });
 await writeFile(target, Buffer.from((await readFile(new URL(name, folder), 'utf8')).trim(), 'base64'));
}
console.log('Imágenes WebP restauradas.');
