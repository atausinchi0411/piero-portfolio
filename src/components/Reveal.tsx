"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import s from "./Reveal.module.css";

type Props = {
  children: ReactNode;
  /** Retardo en ms. Para escalonar hermanos en una fila. */
  delay?: number;
  /** "up" sube al entrar, "fade" solo aparece. */
  mode?: "up" | "fade";
  as?: "div" | "li" | "section";
  className?: string;
};

/**
 * Aparición al entrar en pantalla.
 *
 * Con IntersectionObserver y no con `animation-timeline: view()` a propósito:
 * el soporte de scroll-driven animations todavía no es uniforme, y esto es
 * la primera impresión del sitio. Si el sistema pide menos movimiento, el
 * contenido sale ya visible y no se anima nada.
 */
export function Reveal({ children, delay = 0, mode = "up", as = "div", className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={[s.reveal, className].filter(Boolean).join(" ")}
      data-mode={mode}
      data-shown={shown || undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
