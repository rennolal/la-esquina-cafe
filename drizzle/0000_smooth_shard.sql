CREATE TABLE `contactos` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`email` text NOT NULL,
	`mensaje` text NOT NULL,
	`creado_en` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `productos` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`descripcion` text NOT NULL,
	`precio` real NOT NULL,
	`foto_url` text NOT NULL,
	`estado` text NOT NULL
);
