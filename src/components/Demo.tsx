"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";
import { ui, useLocale } from "@/lib/i18n";
import s from "./Demo.module.css";

type Props = {
  project: Project;
  /** "card" para la fila de la tarjeta, "page" para el detalle del proyecto. */
  size?: "card" | "page";
};

/**
 * Botón "Pruébalo" y la ventana con la app dentro.
 *
 * La app no se carga hasta que alguien pulsa: Nexo pesa 2,5 MB y no tiene
 * sentido que lo pague quien solo viene a leer. Una vez abierta se queda
 * montada, así que cerrar y volver a abrir no pierde lo que el visitante hizo.
 *
 * Va en un <dialog> nativo: Esc, foco atrapado y capa superior sin librerías.
 */
export function DemoButton({ project, size = "card" }: Props) {
  const { t, locale } = useLocale();
  const ref = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const demo = project.demo;

  // El fondo no debe desplazarse mientras la demo está abierta.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const unlock = () => document.documentElement.classList.remove("demoOpen");
    dialog.addEventListener("close", unlock);
    return () => {
      dialog.removeEventListener("close", unlock);
      unlock();
    };
  }, []);

  if (!demo) return null;

  // La guía de la demo habla el idioma del portfolio.
  const src = `${demo.src}?lang=${locale}`;

  const open = () => {
    setOpened(true);
    document.documentElement.classList.add("demoOpen");
    ref.current?.showModal();
  };

  return (
    <>
      <button
        type="button"
        className={size === "page" ? s.buttonPage : s.button}
        onClick={open}
        aria-haspopup="dialog"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
        </svg>
        {t(ui.tryIt)}
      </button>

      <dialog
        ref={ref}
        className={`${s.dialog} ${demo.viewport === "phone" ? s.phone : ""}`}
        aria-label={`${project.title} — demo`}
        // Clic en el velo, fuera de la ventana, la cierra.
        onClick={(e) => {
          if (e.target === ref.current) ref.current.close();
        }}
      >
        <div className={s.window}>
          <header className={s.bar}>
            <span className={s.lights} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className={s.title}>{project.title}</span>
            <span className={`mono ${s.note}`}>{t(ui.demoNote)}</span>
            <a href={src} target="_blank" rel="noreferrer" className={s.newTab}>
              {t(ui.demoNewTab)}
            </a>
            <button
              type="button"
              className={s.close}
              onClick={() => ref.current?.close()}
              aria-label={t(ui.demoClose)}
              // biome-ignore lint/a11y/noAutofocus: al abrir, el foco va a la salida
              autoFocus
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div className={s.stage}>
            {!loaded && <p className={`mono ${s.loading}`}>{t(ui.demoLoading)}</p>}
            {opened && (
              <iframe
                src={src}
                title={`${project.title} — demo`}
                className={s.frame}
                onLoad={() => setLoaded(true)}
                // Mismo origen para que la app pueda guardar en localStorage;
                // el sandbox le quita todo lo demás (navegar la página de
                // arriba, abrir ventanas emergentes, etc.).
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads"
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
