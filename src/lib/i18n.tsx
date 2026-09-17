"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { L } from "@/content/types";

export type Locale = "en" | "es";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Resuelve un texto bilingüe al idioma activo. */
  t: (value: L) => string;
};

const LocaleContext = createContext<Ctx>({
  locale: "en",
  setLocale: () => {},
  t: (v) => v.en,
});

const KEY = "piero.locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restaura la preferencia. En SSR y en navegación privada esto puede fallar,
  // así que nunca dejamos que rompa el render.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "en" || saved === "es") {
        setLocaleState(saved);
        return;
      }
      if (navigator.language?.toLowerCase().startsWith("es")) setLocaleState("es");
    } catch {
      /* sin almacenamiento: nos quedamos con el idioma por defecto */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* preferencia no persistida, no pasa nada */
    }
  }, []);

  const t = useCallback((value: L) => value[locale], [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);

/** Copia de interfaz que no vive en el archivo de contenido. */
export const ui = {
  work: { en: "Work", es: "Proyectos" },
  about: { en: "About", es: "Sobre mí" },
  contact: { en: "Contact", es: "Contacto" },
  experience: { en: "Experience", es: "Experiencia" },
  skills: { en: "Skills", es: "Habilidades" },
  selectedWork: { en: "Main projects", es: "Principales proyectos" },
  allWork: { en: "Everything else", es: "Todo lo demás" },
  readCase: { en: "Read the case", es: "Ver el caso" },
  backToWork: { en: "All work", es: "Todos los proyectos" },
  present: { en: "Present", es: "Actualidad" },
  role: { en: "Role", es: "Rol" },
  stack: { en: "Stack", es: "Stack" },
  year: { en: "Year", es: "Año" },
  languagesTitle: { en: "Languages", es: "Idiomas" },
  studiesTitle: { en: "Education", es: "Formación" },
  shotPending: { en: "Screenshot pending", es: "Captura pendiente" },
  // Etiquetas de la barra en portadas generadas. Dicen qué es el dibujo, para
  // que nadie lo confunda con una captura de una pantalla que no existe.
  coverAnalysis: { en: "Analysis", es: "Análisis" },
  coverProcess: { en: "Process", es: "Proceso" },
  coverAudio: { en: "Audio", es: "Audio" },
  privateProject: { en: "Private", es: "Privado" },
  contactLead: {
    en: "If any of this looks like a problem you have, write to me. I read everything.",
    es: "Si algo de esto se parece a un problema que tienes, escríbeme. Lo leo todo.",
  },
  // Sobre mí
  howIWork: { en: "How I work", es: "Cómo trabajo" },
  seeProof: { en: "See it in", es: "Se ve en" },
  // Contacto: dos vías, porque llegan dos tipos de visitante y no quieren
  // lo mismo. Mezclarlas hace que ninguno encuentre lo suyo.
  laneHiring: { en: "If you are hiring", es: "Si estás contratando" },
  laneHiringText: {
    en: "Looking at me for a role in data, automation or reliability. Start with the CV and LinkedIn.",
    es: "Me estás mirando para un puesto de datos, automatización o fiabilidad. Empieza por el CV y LinkedIn.",
  },
  laneProject: { en: "If you have a problem", es: "Si tienes un problema" },
  laneProjectText: {
    en: "You have a process running on spreadsheets and memory. Tell me what it is and what it costs you.",
    es: "Tienes un proceso funcionando sobre Excels y memoria. Cuéntame cuál es y lo que te cuesta.",
  },
  writeToMe: { en: "Write to me", es: "Escríbeme" },
  cvPending: { en: "CV on request", es: "CV a petición" },
  downloadCv: { en: "Download CV", es: "Descargar CV" },
  themeToggle: { en: "Toggle theme", es: "Cambiar tema" },
  sectionsNav: { en: "Sections", es: "Secciones" },
} satisfies Record<string, L>;
