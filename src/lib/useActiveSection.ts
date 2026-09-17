"use client";

import { useEffect, useState } from "react";

/**
 * Sección visible ahora mismo.
 *
 * Marca la que cruza la línea imaginaria del tercio superior de la pantalla,
 * que es por donde va leyendo la vista. No la que más área ocupa: con
 * secciones de alturas tan distintas — Experiencia es enorme — el área
 * engaña y el indicador se queda clavado.
 *
 * Vive aquí, y no dentro de la cabecera, porque la cabecera y el rail lateral
 * tienen que decir siempre lo mismo. Duplicar la lógica es duplicar el bug.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

/** Orden real de las secciones en la página. Fuente única. */
export const SECTIONS = ["work", "experience", "skills", "contact"] as const;
