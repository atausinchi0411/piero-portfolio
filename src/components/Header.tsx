"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { person } from "@/content/site";
import { ui, useLocale } from "@/lib/i18n";
import s from "./Header.module.css";

function ThemeToggle() {
  const { t } = useLocale();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      setTheme(attr);
      return;
    }
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("piero.theme", next);
    } catch {
      /* preferencia no persistida */
    }
  };

  return (
    <button type="button" className={s.icon} onClick={flip} aria-label={t(ui.themeToggle)}>
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      )}
    </button>
  );
}

function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div className={s.segmented} role="group" aria-label="Language">
      {(["en", "es"] as const).map((code) => (
        <button
          key={code}
          type="button"
          className={s.segment}
          data-active={locale === code}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/**
 * Sección visible ahora mismo.
 *
 * Marca la que cruza la línea imaginaria del tercio superior de la pantalla,
 * que es donde la vista está leyendo, no la que más área ocupa. Con secciones
 * de alturas muy distintas —Experiencia es enorme— el área engaña.
 */
function useActiveSection(ids: string[]) {
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

/** Cuánto del documento queda leído. Da sensación de longitud sin un índice. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const scrollable = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
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
  }, []);

  return (
    <span
      className={s.progress}
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

const SECTIONS = ["work", "experience", "skills", "about", "contact"] as const;

export function Header() {
  const { t } = useLocale();
  const active = useActiveSection(SECTIONS as unknown as string[]);

  const nav = [
    { id: "work", label: t(ui.work) },
    { id: "experience", label: t(ui.experience) },
    { id: "about", label: t(ui.about) },
    { id: "contact", label: t(ui.contact) },
  ];

  return (
    <header className={s.header}>
      <div className={`wrap ${s.inner}`}>
        <Link href="/" className={s.brand}>
          <span className={s.dot} aria-hidden="true" />
          <span className={s.brandName}>
            {person.name} <span className={s.brandLast}>{person.lastName}</span>
          </span>
        </Link>

        <nav className={s.nav}>
          {nav.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              data-active={active === item.id || undefined}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={s.actions}>
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>

      <ReadingProgress />
    </header>
  );
}
