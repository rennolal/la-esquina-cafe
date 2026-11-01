import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'La Esquina · Tu café de siempre',description:'Café, un desayuno rico y un ratito para ti. Descubre la carta de La Esquina, tu cafetería de barrio.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
