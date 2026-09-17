import Link from "next/link";
import s from "./not-found.module.css";

export const metadata = { title: "404" };

/**
 * Página de error.
 *
 * Existe porque el sitio anterior tenía rutas que ya no están, y un 404 por
 * defecto de Next parece un servidor roto. Este dice qué pasó y deja salida.
 */
export default function NotFound() {
  return (
    <main className={`wrap ${s.page}`}>
      <p className={`mono ${s.code}`}>404</p>
      <h1 className={s.title}>Esta página ya no está aquí.</h1>
      <p className={s.text}>
        Puede que vengas de una versión anterior del sitio. Todo el trabajo está
        ahora en una sola página.
      </p>
      <p className={`${s.text} ${s.en}`}>
        You may be coming from an older version of this site. Everything now
        lives on a single page.
      </p>

      <div className={s.actions}>
        <Link href="/" className={s.primary}>
          Ir al inicio
        </Link>
        <Link href="/#work" className={s.secondary}>
          Ver proyectos
        </Link>
      </div>
    </main>
  );
}
