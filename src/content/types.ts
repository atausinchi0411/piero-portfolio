/** Texto bilingüe. Todo lo visible al usuario pasa por aquí. */
export type L = { en: string; es: string };

/** Párrafo o lista dentro del detalle de un proyecto. */
export type Block =
  | { kind: "p"; text: L }
  | { kind: "h"; text: L }
  | { kind: "ul"; items: L[] }
  | { kind: "shot"; src: string; caption: L; chrome?: string }
  /** Varias capturas de un mismo flujo, que se encadenan en el marco. */
  | {
      kind: "sequence";
      frames: { src: string; label: L }[];
      caption: L;
      chrome?: string;
    };

export type Metric = {
  /** El número. Se muestra grande y en mono. */
  value: string;
  label: L;
};

/**
 * Portada de un proyecto.
 *
 * Premisa: no todo proyecto tiene pantalla que capturar. Un análisis de
 * consultoría, una macro de SAP o una pieza de música no tienen interfaz, y
 * forzar una captura de esos casos produce o un Excel confidencial o una
 * imagen de stock. Ninguna de las dos cosas se publica aquí.
 *
 * En su lugar cada proyecto declara el medio al que pertenece y el sitio
 * dibuja la portada que le corresponde, siempre a partir de datos reales del
 * caso. Un diagrama no finge ser una pantalla: dice lo que es.
 */
export type Cover =
  /** Captura real, en el marco de navegador. */
  | { kind: "shot"; src: string; chrome?: string }
  /** N fuentes que convergen en un resultado. Para trabajo de análisis. */
  | { kind: "flow"; inputs: L[]; output: L }
  /** Una secuencia manual repetida que colapsa en una sola acción. */
  | { kind: "steps"; steps: L[]; repeat: string; collapsesTo: L }
  /** Forma de onda. Para audio. La duración solo se pinta si la sabes. */
  | { kind: "audio"; title: string; duration?: string };

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** Una línea. Es lo único que se lee en la grid — que cuente. */
  summary: L;
  role: L;
  /** Contexto: dónde/para quién. Aparece como eyebrow en el detalle. */
  context: L;
  stack: string[];
  /** El dato que da credibilidad de un vistazo. */
  metric: Metric;
  /** Portada en la grid. null = hueco tramado honesto, nunca stock. */
  cover: Cover | null;
  /** true = se muestra en la home destacado. */
  featured?: boolean;
  /** Link externo si existe (demo, repo). null si es privado. */
  href?: string | null;
  /** Por qué no hay link público. Honestidad > misterio. */
  privateNote?: L;
  /**
   * App que se puede usar dentro del portfolio, en un marco aislado.
   * `src` apunta a public/demos. `phone` la enseña a ancho de móvil en
   * escritorio, para las apps que se diseñaron para el teléfono.
   */
  demo?: { src: string; viewport?: "desktop" | "phone" };
  body: Block[];
};

/** Un puesto dentro de una empresa. Una empresa puede tener varios. */
export type Role = {
  title: L;
  from: string;
  to: string | null; // null = actualidad
  /** Nota corta sobre el cambio de puesto (ascenso, cambio de contrato...). */
  transition?: L;
  bullets: L[];
};

export type Experience = {
  company: string;
  location: L;
  /** Rango total en la empresa. Se muestra en el encabezado. */
  from: string;
  to: string | null;
  /** Del más reciente al más antiguo. Varios puestos = progresión visible. */
  roles: Role[];
  stack?: string[];
};

export type SkillGroup = {
  title: L;
  /** Dónde se usó. Sin esto un grupo de habilidades es solo un muro de etiquetas. */
  context?: L;
  items: string[];
};
