import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
export const productos = sqliteTable('productos', {id:text('id').primaryKey(),nombre:text('nombre').notNull(),descripcion:text('descripcion').notNull(),precio:real('precio').notNull(),foto_url:text('foto_url').notNull(),estado:text('estado',{enum:['disponible','agotado']}).notNull()});
export const contactos = sqliteTable('contactos', {id:text('id').primaryKey(),nombre:text('nombre').notNull(),email:text('email').notNull(),mensaje:text('mensaje').notNull(),creado_en:text('creado_en').notNull()});
