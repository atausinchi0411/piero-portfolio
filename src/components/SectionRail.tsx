"use client";

import { useEffect, useState } from "react";
import { ui, useLocale } from "@/lib/i18n";
import { SECTIONS, useActiveSection } from "@/lib/useActiveSection";
import s from "./SectionRail.module.css";

/**
 * Índice vertical fijo a la derecha.
 *
 * La página es larga a propósito — siete proyectos, cinco empresas — y a mitad
 * de Experiencia dejas de saber dónde estás. Esto responde a eso sin robar
 * espacio: vive en el margen que el contenedor de 1140px ya deja libre.
 *
 * Aparece al salir del hero. Arriba del todo no hace falta y ensucia la
 * primera impresión, que es lo único que mucha gente va a ver.
 */
export function SectionRail() {
  const { t } = useLocale();
  const active = useActiveSection(SECTIONS);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Las mismas etiquetas cortas del menú, no los títulos largos de sección.
  // "Principales proyectos" hacía el rail de 151px y se comía el margen: a
  // 1440px, que es la pantalla más común, se solapaba con el contenido.
  const labels: Record<(typeof SECTIONS)[number], string> = {
    work: t(ui.work),
    experience: t(ui.experience),
    skills: t(ui.skills),
    contact: t(ui.contact),
  };

  return (
    <nav
      className={s.rail}
      data-visible={visible || undefined}
      aria-label={t(ui.sectionsNav)}
    >
      <ol className={s.list}>
        {SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={s.item}
              data-active={active === id || undefined}
              aria-current={active === id ? "true" : undefined}
            >
              <span className={s.dot} aria-hidden="true" />
              <span className={s.label}>{labels[id]}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
