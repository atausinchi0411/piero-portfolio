import type { ReactNode } from "react";
import s from "./Frame.module.css";

type Props = {
  /**
   * "window" dibuja las tres luces de una ventana de aplicación. Se reserva
   * para capturas reales: si no hay una pantalla detrás, la ventana miente.
   * "panel" es la misma geometría sin luces, para portadas generadas.
   */
  variant?: "window" | "panel";
  /** Texto de la barra superior. */
  label?: string;
  /** 16:10 para la grid, 16:9 para el detalle. */
  ratio?: "card" | "wide";
  /** Rellena el alto disponible en vez de fijar proporción (portada destacada). */
  fill?: boolean;
  children: ReactNode;
};

/**
 * Marco único de todo el sitio.
 *
 * Existe para que material tomado en momentos distintos — capturas a distinta
 * resolución, diagramas generados, una forma de onda — se lea como un solo
 * conjunto. Es la pieza que hace que la grid parezca diseñada y no recopilada.
 */
export function Frame({ variant = "window", label, ratio = "card", fill = false, children }: Props) {
  return (
    <figure className={s.frame} data-ratio={ratio} data-fill={fill || undefined}>
      <div className={s.bar}>
        {variant === "window" && (
          <span className={s.lights} aria-hidden="true">
            <span className={s.light} />
            <span className={s.light} />
            <span className={s.light} />
          </span>
        )}
        {label && <span className={`mono ${s.label}`}>{label}</span>}
      </div>
      <div className={s.canvas}>{children}</div>
    </figure>
  );
}
