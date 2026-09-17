import type { Experience, L, Project, SkillGroup } from "./types";

/* ============================================================
   PERFIL
   ============================================================ */

export const person = {
  name: "Piero",
  lastName: "Atausinchi",
  role: {
    en: "Reliability Engineer - builds the software his plant was missing",
    es: "Ingeniero de fiabilidad - construye el software que a su planta le faltaba",
  } satisfies L,
  location: { en: "Barcelona, Spain", es: "Barcelona, España" } satisfies L,
  timezone: "Europe/Madrid",
  email: "qando0kna29@gmail.com",
  // null = no se muestra el enlace.
  github: "https://github.com/atausinchi0411" as string | null,
  linkedin: "https://www.linkedin.com/in/piero-atausinchi/" as string | null,
  // Los dos se generan con `python tools/generar-cv.py`, que es donde vive el
  // contenido. No edites los PDF a mano: se regeneran y pierdes el cambio.
  // null en los dos = no se muestra el botón de descarga.
  cv: {
    en: "/Piero_Atausinchi_CV_EN.pdf",
    es: "/Piero_Atausinchi_CV_ES.pdf",
  } as L | null,
  // El nombre lleva año a propósito: Next y el CDN de Vercel cachean la imagen
  // optimizada por URL, así que sustituir el archivo sin cambiar la ruta deja
  // la foto vieja servida durante horas. Al cambiar de foto, cambia el nombre.
  photo: "/me/piero-2026.jpg" as string | null,
  available: {
    en: "Open to roles in data & automation across Europe",
    es: "Abierto a posiciones de datos y automatización en Europa",
  } satisfies L,
};

export const hero = {
  // Historial de esta frase, para que nadie repita los errores:
  //  - "el software que lo predice" prometía predicción. NexoIBP calcula
  //    disponibilidad, MTTF y MTTR y clasifica máquinas: eso es análisis.
  //  - "el software que usa mi departamento lo escribí yo" y "herramientas
  //    que la gente usa de verdad" discutían con un escéptico que no está en
  //    la sala. Un titular que se defiende suena inseguro.
  // Va en serif a 60px: dos líneas como mucho.
  headline: {
    en: "Simple tools for complex problems, built from the inside.",
    es: "Herramientas sencillas para problemas complejos, desde dentro.",
  } satisfies L,
  // Decir que no viene de programación es honesto y le protege en una
  // entrevista. Se dice con las palabras exactas y sin el término "vibe
  // coder", que en el sector se lee como "entrega código que no entiende" —
  // y eso descontaría NexoIBP entero, que es el activo más fuerte de aquí.
  sub: {
    en: "Reliability engineer at an underground mine near Barcelona. I did not come from software: I learned by building what my department needed, with AI as the tool and the problem in front of me.",
    es: "Ingeniero de fiabilidad en una mina subterránea cerca de Barcelona. No vengo de la programación: aprendí construyendo lo que mi departamento necesitaba, con la IA como herramienta y el problema delante.",
  } satisfies L,
};

/**
 * La tira de números bajo el hero. Credibilidad sin necesitar capturas.
 * Regla: solo números que puedas defender en una entrevista.
 */
export const heroMetrics = [
  { value: "18", label: { en: "trucks monitored", es: "camiones monitorizados" } },
  { value: "−15%", label: { en: "production cost", es: "coste de producción" } },
  { value: "6", label: { en: "years in engineering", es: "años en ingeniería" } },
  { value: "3", label: { en: "countries worked in", es: "países trabajados" } },
];

/* ============================================================
   PROYECTOS
   Orden = orden de aparición. El primero es el que más pesa.
   ============================================================ */

export const projects: Project[] = [
  {
    slug: "nexo-ibp",
    title: "NexoIBP",
    year: "2025",
    featured: true,
    summary: {
      en: "Started as a way to capture KPIs. Ended up as the app the mine's maintenance department runs on.",
      es: "Empezó como una forma de capturar KPIs. Acabó siendo la app sobre la que funciona el mantenimiento de la mina.",
    },
    role: { en: "Designed and built it", es: "Lo diseñé y lo construí" },
    context: { en: "ICL Iberia - internal", es: "ICL Iberia - interno" },
    stack: ["React", "Tailwind", "Express", "SQL Server", "SAP"],
    // No decimos "en producción" mientras no lo esté. Está en despliegue con testers.
    metric: { value: "4", label: { en: "versions to get here", es: "versiones hasta llegar aquí" } },
    cover: {
      kind: "shot",
      src: "/screenshots/nexo-analisis-fiabilidad.png",
      chrome: "NexoIBP — Análisis de Fiabilidad",
    },
    href: null,
    privateNote: {
      en: "Internal to the company network, so there is no public link, and it is currently in rollout with a first group of testers. Every screenshot here was taken from a demo build running on invented data — real machine codes, notes and names never leave the site.",
      es: "Interno a la red de la empresa, así que no hay link público, y ahora mismo está en despliegue con un primer grupo de testers. Todas las capturas están tomadas de una versión demo con datos inventados: los códigos de máquina, notas y nombres reales no salen de la mina.",
    },
    body: [
      {
        kind: "p",
        text: {
          en: "The maintenance department ran on manual records and shared Excel files. Which meant, in practice, no data: nothing queryable, nothing comparable across shifts, nothing you could put a trend line through. Answering what happened last Tuesday meant asking three people and trusting their memory. NexoIBP exists to close that gap.",
          es: "El mantenimiento funcionaba con registros manuales y Excels compartidos. Que en la práctica significa: sin datos. Nada consultable, nada comparable entre turnos, nada a lo que trazarle una tendencia. Responder qué pasó el martes era preguntar a tres personas y fiarte de su memoria. NexoIBP existe para cerrar ese hueco.",
        },
      },
      { kind: "h", text: { en: "It grew into itself", es: "Fue creciendo hasta ser lo que es" } },
      {
        kind: "p",
        text: {
          en: "It did not start as this. The first version just captured KPIs and shift data, because that was the hole in front of me. Each version answered the question the last one raised: if we are already logging machine state, why not the inspection routine? If we have the routine, why not the handoff? By the fourth rewrite it had stopped being a data-capture tool and become the thing the department actually runs the shift on. The earlier names are still on my hard drive.",
          es: "La primera versión solo capturaba KPIs y datos de turno. Cada versión posterior respondía la pregunta que dejaba abierta la anterior: si ya se registra el estado de máquina, la rutina de inspección es el paso siguiente; con la rutina registrada, el relevo de turno se vuelve trivial. A la cuarta iteración había dejado de ser una herramienta de captura para convertirse en el sistema sobre el que el departamento organiza el turno.",
        },
      },
      {
        kind: "shot",
        src: "/screenshots/nexo-estado-maquinaria.png",
        chrome: "NexoIBP — Estado de Maquinaria",
        caption: {
          en: "The whole fleet in one screen, grouped by category. Colour is the state, the number underneath is how long it has been in it. This is the screen the shift opens on.",
          es: "Toda la flota en una pantalla, agrupada por categoría. El color es el estado y el número de abajo cuánto lleva así. Es la pantalla con la que arranca el turno.",
        },
      },
      { kind: "h", text: { en: "The decision that mattered", es: "La decisión que importó" } },
      {
        kind: "p",
        text: {
          en: "I built the interface on an AI app builder to get something in front of operators in weeks rather than months. It worked. Then it met the real constraint: mine operations data cannot sit on an external platform.",
          es: "Construí la interfaz sobre un constructor de apps con IA para poner algo delante de los operarios en semanas en vez de meses. Funcionó. Después apareció la restricción real: los datos de operación de una mina no pueden estar en una plataforma externa.",
        },
      },
      {
        kind: "p",
        text: {
          en: "So I moved it in-house without throwing away the work: I rebuilt the data layer underneath so the interface kept running unchanged, on the company's own servers and database. Same screens the team had already tested, none of the data leaving the building. Access is controlled by roles, so a shift operator and a maintenance manager see different things.",
          es: "Así que lo traje dentro sin tirar el trabajo: reconstruí la capa de datos por debajo para que la interfaz siguiera funcionando igual, sobre los servidores y la base de datos de la empresa. Las mismas pantallas que el equipo ya había probado, y ni un dato saliendo de casa. El acceso va por roles, así que un operario de turno y un jefe de mantenimiento no ven lo mismo.",
        },
      },
      { kind: "h", text: { en: "What it tracks", es: "Qué registra" } },
      {
        kind: "ul",
        items: [
          {
            en: "Machine status shift by shift, with the history behind each change.",
            es: "Estado de cada máquina turno a turno, con el histórico detrás de cada cambio.",
          },
          {
            en: "Zone assignments, checklists and non-working days, so the calendar reflects the mine and not an office.",
            es: "Asignación por zonas, checklists y días no laborables, para que el calendario refleje la mina y no una oficina.",
          },
          {
            en: "Reliability analysis per machine: availability, MTTF, MTTR and a composite score, with each machine sorted into reliable, chronic or one-off-impact. This is the part I care about most, because it is my day job pointed back at my own data.",
            es: "Análisis de fiabilidad por máquina: disponibilidad, MTTF, MTTR y un índice compuesto, con cada máquina clasificada en fiable, crónica o de impacto puntual. Es la parte que más me importa, porque es mi trabajo diario apuntando a mis propios datos.",
          },
          {
            en: "Period summaries and dashboards, exportable to CSV for the people who still want a file.",
            es: "Resúmenes por periodo y cuadros de mando, exportables a CSV para quien sigue queriendo un archivo.",
          },
        ],
      },
      {
        kind: "shot",
        src: "/screenshots/nexo-analisis-fiabilidad.png",
        chrome: "NexoIBP — Análisis de Fiabilidad",
        caption: {
          en: "Reliability view: the most reliable, most critical and most repeat-offending machine, then every machine ranked by availability, MTTF and MTTR. The timeline comparator shows why two trucks with similar fault counts are not the same problem.",
          es: "Vista de fiabilidad: la máquina más fiable, la más crítica y la más reincidente, y debajo toda la flota ordenada por disponibilidad, MTTF y MTTR. El comparador de líneas de tiempo enseña por qué dos camiones con el mismo número de averías no son el mismo problema.",
        },
      },
      {
        kind: "shot",
        src: "/screenshots/nexo-ranking-fiabilidad.png",
        chrome: "NexoIBP — Ranking de Fiabilidad",
        caption: {
          en: "The ranking sorts the whole fleet and puts each machine in a quadrant: reliable, chronic, or one-off impact. A truck that fails five times for an hour each is a different decision from one that fails once for ten days, even though both show up as downtime.",
          es: "El ranking ordena toda la flota y mete cada máquina en un cuadrante: fiable, crónica o de impacto puntual. Un camión que falla cinco veces una hora es una decisión distinta a uno que falla una vez diez días, aunque los dos aparezcan como parada.",
        },
      },
      {
        kind: "shot",
        src: "/screenshots/nexo-turnos.png",
        chrome: "NexoIBP — Control de Turnos",
        caption: {
          en: "Shift control. Open, partial, closed and non-working days, so it is obvious at a glance which handoffs are still missing.",
          es: "Control de turnos. Abierto, parcial, cerrado y días no laborables, para que se vea de un vistazo qué relevos siguen sin cerrar.",
        },
      },
      { kind: "h", text: { en: "What comes next", es: "Lo que viene" } },
      {
        kind: "p",
        text: {
          en: "Failure notes are written by hand, in a hurry, at the end of a shift. Same fault, five different wordings — which is why they never became data. I designed a classifier that sorts those notes into a fixed set of mining categories (electrical, mechanical, hydraulic, undercarriage, cooling, tooling) with consistent tags, so the same fault always lands in the same bucket. Once that runs against real notes, the department can finally see which failures actually repeat.",
          es: "Las notas de avería se escriben a mano, con prisa, al final del turno. La misma avería con cinco redacciones distintas: por eso nunca llegaron a ser datos. Diseñé un clasificador que ordena esas notas en un conjunto fijo de categorías de minería (eléctrico, mecánico, hidráulico, rodaje, refrigeración, herramienta) con etiquetas consistentes, para que la misma avería caiga siempre en el mismo sitio. Cuando eso corra sobre notas reales, el departamento podrá ver por fin qué fallos se repiten de verdad.",
        },
      },
      {
        kind: "p",
        text: {
          en: "The system is currently in rollout with a first group of five testers. Their feedback sets the build order for the next iteration.",
          es: "El sistema está actualmente en despliegue con un primer grupo de cinco testers. Su feedback marca el orden de construcción de la siguiente iteración.",
        },
      },
    ],
  },

  {
    slug: "cierre-masivo-ordenes-sap",
    title: "Bulk Order Closing in SAP",
    year: "2025",
    summary: {
      en: "Closing maintenance orders in SAP one by one was eating afternoons. Now a spreadsheet goes in and 30 orders close themselves.",
      es: "Cerrar órdenes de mantenimiento en SAP una a una se comía tardes enteras. Ahora entra un Excel y se cierran 30 solas.",
    },
    role: { en: "Built it", es: "Lo construí" },
    context: { en: "ICL Iberia - internal", es: "ICL Iberia - interno" },
    stack: ["VBA", "SAP GUI Scripting", "Excel"],
    metric: { value: "30", label: { en: "orders per run", es: "órdenes por tirada" } },
    // No hay captura y no la habrá: sería un Excel con datos de ICL. La portada
    // es el propio bucle manual descrito en el caso, y en qué se convirtió.
    cover: {
      kind: "steps",
      steps: [
        { en: "open order", es: "abrir orden" },
        { en: "hours", es: "horas" },
        { en: "dates", es: "fechas" },
        { en: "confirm", es: "confirmar" },
        { en: "close", es: "cerrar" },
        { en: "next", es: "siguiente" },
      ],
      repeat: "× 30",
      collapsesTo: { en: "1 run", es: "1 tirada" },
    },
    href: null,
    privateNote: {
      en: "Internal tool, no public link.",
      es: "Herramienta interna, sin link público.",
    },
    body: [
      {
        kind: "p",
        text: {
          en: "Closing a maintenance order in SAP is not hard. It is just long: open the order, enter the hours, enter the dates, confirm, close, next. Do that thirty times in a row and you have lost an afternoon to clicking, which is an afternoon nobody spends looking at why the machines broke in the first place.",
          es: "Cerrar una orden de mantenimiento en SAP no es difícil. Solo es largo: abres la orden, metes las horas, metes las fechas, confirmas, cierras, siguiente. Hazlo treinta veces seguidas y has perdido una tarde en hacer clics, que es una tarde que nadie dedica a mirar por qué se rompieron las máquinas.",
        },
      },
      {
        kind: "p",
        text: {
          en: "So I moved the tedious part to a spreadsheet. You list the orders you need to close with their hours and dates, run the macro, and it drives SAP itself through the GUI, order by order, while you do something else. Twenty or thirty at a time.",
          es: "Así que moví la parte tediosa a un Excel. Listas las órdenes que tienes que cerrar con sus horas y fechas, lanzas la macro, y ella misma maneja SAP a través de la interfaz, orden por orden, mientras tú haces otra cosa. Veinte o treinta de una tirada.",
        },
      },
      {
        kind: "p",
        text: {
          en: "The spreadsheet already existed and the process was already defined. What was missing was the hundred lines that connected them. Most of the time saved in a maintenance department is not won by new systems, but by removing the manual steps between the ones already in place.",
          es: "El Excel ya existía y el proceso ya estaba definido. Lo que faltaba eran las cien líneas que los conectaban. La mayor parte del tiempo que se gana en un departamento de mantenimiento no viene de sistemas nuevos, sino de eliminar los pasos manuales entre los que ya están.",
        },
      },
    ],
  },

  {
    slug: "aquatermica-sales-plan",
    title: "AQUATERMICA Annual Sales Plan",
    year: "2024", // VERIFICAR el año exacto del encargo
    featured: true,
    summary: {
      en: "Turned years of sales records into an annual plan: what to target next year, and the case for hiring a sales manager to get there.",
      es: "Convertí años de registros de ventas en un plan anual: qué objetivos marcar para el año siguiente, y el argumento para contratar a un gerente de ventas que los alcanzara.",
    },
    role: { en: "Analyst & consultant", es: "Analista y consultor" },
    context: { en: "AQUATERMICA - Lima, Peru", es: "AQUATERMICA - Lima, Perú" },
    stack: ["Claude", "Excel", "Data analysis"],
    metric: {
      value: "3",
      label: { en: "data sources crossed", es: "fuentes de datos cruzadas" },
    },
    // Es una consultoría, no un producto: no existe pantalla que capturar, y
    // los datos son del cliente. La portada es el propio cruce de fuentes.
    cover: {
      kind: "flow",
      // Etiquetas cortas a propósito: esto es una portada, no el caso. La
      // versión larga de cada fuente está en el cuerpo del proyecto.
      inputs: [
        { en: "Overall reports", es: "Reportes generales" },
        { en: "By salesperson", es: "Ventas por vendedor" },
        { en: "Ticket records", es: "Registros de ticket" },
      ],
      output: {
        en: "Annual targets + staffing case",
        es: "Objetivos anuales + caso de contratación",
      },
    },
    href: null,
    body: [
      {
        kind: "p",
        text: {
          en: "A company selling water-heating systems and pumps wanted to set targets for the coming year and was considering hiring a sales manager. Both decisions were being made on instinct, while the answers were sitting unread in their own sales system.",
          es: "Una empresa de sistemas de calefacción de agua y bombas quería fijar objetivos para el año siguiente y se planteaba contratar a un gerente de ventas. Ambas decisiones se estaban tomando por intuición, mientras las respuestas estaban sin leer dentro de su propio sistema de ventas.",
        },
      },
      { kind: "h", text: { en: "The analysis", es: "El análisis" } },
      {
        kind: "p",
        text: {
          en: "I worked through everything their sales system held: overall sales reports, sales broken down by salesperson, and ticket-level records. Cross-referenced, those three views answer questions none of them answers alone, because performance differences between salespeople only mean something once you can see what each of them was actually selling.",
          es: "Trabajé con todo lo que contenía su sistema de ventas: reportes generales, reportes de ventas por vendedor, y registros a nivel de ticket. Cruzadas, esas tres vistas responden preguntas que ninguna responde por separado, porque las diferencias de rendimiento entre vendedores solo significan algo cuando ves qué estaba vendiendo cada uno.",
        },
      },
      { kind: "h", text: { en: "What it produced", es: "Qué produjo" } },
      {
        kind: "ul",
        items: [
          {
            en: "Annual targets derived from historical performance rather than from a percentage added to last year.",
            es: "Objetivos anuales derivados del rendimiento histórico, en lugar de un porcentaje sumado al año anterior.",
          },
          {
            en: "A staffing case for the sales manager role, grounded in what the numbers showed the existing team could and could not cover.",
            es: "El argumento de contratación para el puesto de gerente de ventas, apoyado en lo que los números mostraban que el equipo existente podía y no podía cubrir.",
          },
        ],
      },
      {
        kind: "p",
        text: {
          en: "The engineering part was small. The useful part was refusing to answer 'should we hire someone' as an opinion when it could be answered as a measurement.",
          es: "La parte de ingeniería fue pequeña. La parte útil fue negarse a responder '¿contratamos a alguien?' como una opinión cuando podía responderse como una medición.",
        },
      },
    ],
  },

  {
    slug: "apto-ccse",
    title: "Apto - CCSE Exam Trainer",
    year: "2025",
    featured: true,
    summary: {
      en: "Study app for Spain's citizenship exam that estimates your probability of passing, then sizes each day's session to hit it.",
      es: "App de estudio para el examen de nacionalidad que estima tu probabilidad de aprobar y dimensiona la sesión diaria para alcanzarla.",
    },
    role: { en: "Developer", es: "Desarrollador" },
    context: {
      en: "Personal - built to pass my own exam",
      es: "Personal - lo hice para aprobar mi propio examen",
    },
    stack: ["HTML", "JavaScript", "localStorage", "Node (build)"],
    metric: { value: "1", label: { en: "file, no dependencies", es: "archivo, sin dependencias" } },
    cover: { kind: "shot", src: "/screenshots/apto-inicio.png", chrome: "Apto — Inicio" },
    href: null,
    body: [
      {
        kind: "p",
        text: {
          en: "The CCSE is the exam required for Spanish nationality: 25 questions drawn from an official bank of 300, 60% to pass. The study apps available were either paywalled or little more than flashcards, so I built my own.",
          es: "El CCSE es el examen requerido para la nacionalidad española: 25 preguntas extraídas de un banco oficial de 300, y un 60% para aprobar. Las apps de estudio disponibles o eran de pago o poco más que fichas, así que construí la mía.",
        },
      },
      {
        kind: "h",
        text: { en: "Estimating the exam, not the effort", es: "Estimar el examen, no el esfuerzo" },
      },
      {
        kind: "p",
        text: {
          en: "Most study apps tell you how much you have studied. That is the wrong question. What you actually want to know is whether you would pass if the exam were tomorrow.",
          es: "La mayoría de apps de estudio te dicen cuánto has estudiado. Esa es la pregunta equivocada. Lo que de verdad quieres saber es si aprobarías si el examen fuera mañana.",
        },
      },
      {
        kind: "p",
        text: {
          en: "So the app estimates mastery per topic, treats anything not yet studied as a random guess, and turns that into an expected score out of 25 and a probability of passing. From there it works backwards: given the exam date, how many new questions per day are needed to finish the bank two days early. The daily session is a consequence of the target, not a number I picked.",
          es: "Así que la app estima el dominio por tema, cuenta como respuesta al azar lo que aún no has estudiado, y lo convierte en una nota esperada sobre 25 y una probabilidad de aprobar. A partir de ahí trabaja hacia atrás: dada la fecha del examen, cuántas preguntas nuevas al día hacen falta para terminar el banco dos días antes. La sesión diaria es consecuencia del objetivo, no un número elegido a dedo.",
        },
      },
      {
        kind: "shot",
        src: "/screenshots/apto-inicio.png",
        chrome: "Apto — Hoy",
        caption: {
          en: "The home screen answers one question: am I going to pass? Expected score, probability, and mastery per topic, with the day's session sized to hit the target before the exam date.",
          es: "La pantalla de inicio responde a una sola pregunta: ¿voy a aprobar? Nota esperada, probabilidad y dominio por tema, con la sesión del día dimensionada para llegar al objetivo antes de la fecha del examen.",
        },
      },
      { kind: "h", text: { en: "The rest of it", es: "El resto" } },
      {
        kind: "ul",
        items: [
          {
            en: "300 official questions across the five exam topics (Government, Rights, Geography, Culture, Society), each with a written explanation.",
            es: "300 preguntas oficiales en los cinco temas del examen (Gobierno, Derechos, Geografía, Cultura, Sociedad), cada una con su explicación escrita.",
          },
          {
            en: "Spaced repetition: every question is classified mastered, learning, doubtful, failed or new, and the weak ones come back first.",
            es: "Repetición espaciada: cada pregunta se clasifica en dominada, aprendiendo, dudosa, fallada o nueva, y las flojas vuelven antes.",
          },
          {
            en: "Timed mock exams in the real format, plus the full syllabus readable inside the app.",
            es: "Simulacros cronometrados con el formato real, más el temario completo legible dentro de la app.",
          },
        ],
      },
      { kind: "h", text: { en: "One file", es: "Un solo archivo" } },
      {
        kind: "p",
        text: {
          en: "A Node build script merges the HTML template with the question and syllabus data and inlines everything into a single distributable file. No install, no server, no build step for whoever uses it. It runs from a USB stick on a locked-down PC, offline.",
          es: "Un script de build en Node fusiona la plantilla HTML con los datos de preguntas y temario y lo integra todo en un único archivo distribuible. Sin instalación, sin servidor, sin build para quien lo use. Funciona desde un USB en un PC restringido y sin internet.",
        },
      },
    ],
  },

  {
    slug: "finance-tracker",
    title: "Finance Tracker",
    year: "2025",
    summary: {
      en: "Personal finance app rebuilt five times in a single HTML file. Each version migrates the last one's data automatically.",
      es: "App de finanzas personales reconstruida cinco veces en un solo archivo HTML. Cada versión migra sola los datos de la anterior.",
    },
    role: { en: "Developer", es: "Desarrollador" },
    context: { en: "Personal", es: "Personal" },
    stack: ["HTML", "JavaScript", "localStorage"],
    metric: { value: "5", label: { en: "versions, zero data loss", es: "versiones, cero pérdida de datos" } },
    cover: { kind: "shot", src: "/screenshots/tracker-mes.png", chrome: "Finance Tracker — Mes" },
    href: null,
    privateNote: {
      en: "Screenshots use invented figures. The version I use has my own numbers in it.",
      es: "Las capturas usan cifras inventadas. La versión que uso tiene mis propios números.",
    },
    body: [
      {
        kind: "p",
        text: {
          en: "A budget only works if you actually open it, so this one is built for the phone and answers a single question at the top: what is left this month. Below that sit income, fixed payments you tick off as you pay them, and variable categories with a budget and a running total.",
          es: "Un presupuesto solo funciona si de verdad lo abres, así que este está hecho para el móvil y responde a una sola pregunta arriba del todo: cuánto te queda este mes. Debajo van los ingresos, los pagos fijos que marcas conforme los haces, y las categorías variables con su presupuesto y su total acumulado.",
        },
      },
      {
        kind: "shot",
        src: "/screenshots/tracker-mes.png",
        chrome: "Finance Tracker — Mes",
        caption: {
          en: "The month view. Debt payments carry a tag, so the part of the month that is not really yours stays visible.",
          es: "La vista de mes. Los pagos de deuda llevan etiqueta, para que la parte del mes que en realidad no es tuya siga a la vista.",
        },
      },
      {
        kind: "shot",
        src: "/screenshots/tracker-ano.png",
        chrome: "Finance Tracker — Año",
        caption: {
          en: "The year view projects the plan forward month by month and accumulates it, which turns a budget into a finish date for a debt.",
          es: "La vista de año proyecta el plan mes a mes y lo acumula, que es lo que convierte un presupuesto en una fecha de fin para una deuda.",
        },
      },
      { kind: "h", text: { en: "Five versions, no migrations by hand", es: "Cinco versiones, sin migrar a mano" } },
      {
        kind: "p",
        text: {
          en: "The interesting constraint was backward compatibility. Opening the current version with data from any earlier one walks the schema forward automatically: no export, no import, nothing lost. That is the only reason the app survived its own rewrites, because a budgeting tool that asks you to start over is a budgeting tool you stop using.",
          es: "La restricción interesante fue la compatibilidad hacia atrás. Abrir la versión actual con datos de cualquier anterior lleva el esquema hacia delante automáticamente: sin exportar, sin importar, sin perder nada. Es la única razón por la que la app sobrevivió a sus propias reescrituras, porque una herramienta de presupuesto que te pide empezar de cero es una herramienta que dejas de usar.",
        },
      },
      {
        kind: "ul",
        items: [
          {
            en: "V1-V2: income and payment tracking, categories, monthly summaries.",
            es: "V1-V2: registro de ingresos y pagos, categorías, resúmenes mensuales.",
          },
          { en: "V3: drag to reorder any list.", es: "V3: reordenar cualquier lista arrastrando." },
          {
            en: "V4: per-category budgets with progress bars and overspend warnings.",
            es: "V4: presupuestos por categoría con barras de progreso y aviso de exceso.",
          },
          {
            en: "V5: expense history per category, concept autocomplete, and the automatic migration chain.",
            es: "V5: historial de gastos por categoría, autocompletado de conceptos, y la cadena de migración automática.",
          },
        ],
      },
    ],
  },

  {
    slug: "kuestiona-offline",
    title: "Kuestiona Offline",
    year: "2025",
    featured: true,
    summary: {
      en: "Saves a whole online course for offline study in about five minutes, built for classmates who are not comfortable with computers.",
      es: "Guarda un curso online entero para estudiar sin internet en unos cinco minutos, hecho para compañeros que no se manejan con ordenadores.",
    },
    role: { en: "Designed and built it", es: "Lo diseñé y lo construí" },
    context: {
      en: "Personal - welcomed by the Kuestiona team",
      es: "Personal - con el respaldo del equipo de Kuestiona",
    },
    stack: ["Node.js", "PowerShell", "Bash", "HTML"],
    // Las capturas de la app dicen 100 publicaciones y 71 archivos (2,3 GB).
    // Tú mencionaste ~220 archivos: si contabas los vídeos de YouTube, ajústalo.
    metric: { value: "100", label: { en: "publications saved", es: "publicaciones guardadas" } },
    cover: { kind: "shot", src: "/screenshots/kuestiona-3-elegir.png", chrome: "Kuestiona Offline — Selección" },
    href: null,
    body: [
      {
        kind: "p",
        text: {
          en: "Students on the course could download their library and recommendations, but only one file at a time: a hundred publications, by hand. Most people simply did not, and lost access to material they had paid for whenever they were offline.",
          es: "Los alumnos del curso podían descargar su biblioteca y sus recomendaciones, pero de una en una: un centenar de publicaciones, a mano. La mayoría directamente no lo hacía, y perdía el acceso a un material que había pagado cada vez que se quedaba sin internet.",
        },
      },
      {
        kind: "sequence",
        chrome: "Mi curso",
        frames: [
          {
            src: "/screenshots/kuestiona-1-inicio.png",
            label: { en: "Welcome", es: "Bienvenida" },
          },
          {
            src: "/screenshots/kuestiona-2-sesion.png",
            label: { en: "Sign in", es: "Iniciar sesión" },
          },
          {
            src: "/screenshots/kuestiona-3-elegir.png",
            label: { en: "Choose", es: "Elegir" },
          },
          {
            src: "/screenshots/kuestiona-4-guardando.png",
            label: { en: "Saving", es: "Guardando" },
          },
          {
            src: "/screenshots/kuestiona-5-listo.png",
            label: { en: "Done", es: "Listo" },
          },
        ],
        caption: {
          en: "The whole tool is four steps and a progress bar. Every screen states what is happening, how long it will take and what not to close, because the people using it have no way to tell a frozen program from a slow one.",
          es: "La herramienta entera son cuatro pasos y una barra de progreso. Cada pantalla dice qué está pasando, cuánto va a tardar y qué no hay que cerrar, porque quien la usa no tiene forma de distinguir un programa colgado de uno lento.",
        },
      },
      {
        kind: "p",
        text: {
          en: "This tool does the whole thing in one go and rebuilds the course as a local site that looks like the original, so there is nothing new to learn: same sections, same navigation, just offline.",
          es: "Esta herramienta lo hace todo de una vez y reconstruye el curso como un sitio local con el mismo aspecto que el original, así que no hay nada nuevo que aprender: mismas secciones, misma navegación, pero sin conexión.",
        },
      },
      {
        kind: "h",
        text: {
          en: "The users were the hard part",
          es: "Lo difícil eran los usuarios",
        },
      },
      {
        kind: "p",
        text: {
          en: "The people who needed this least comfortable with computers were exactly the people who needed it most. So the design problem was never the downloading, it was everything around it.",
          es: "La gente que menos se maneja con un ordenador era justo la que más lo necesitaba. Así que el problema de diseño nunca fue la descarga, sino todo lo que la rodea.",
        },
      },
      {
        kind: "ul",
        items: [
          {
            en: "One double-click to start, on Windows or Mac. No terminal, no install, no Node to set up.",
            es: "Un doble clic para empezar, en Windows o en Mac. Sin terminal, sin instalación, sin Node que configurar.",
          },
          {
            en: "The instructions walk through the scary parts by name: the blue 'Windows protected your PC' warning, the macOS security block, what to do when it appears.",
            es: "Las instrucciones explican con nombre y apellidos las partes que asustan: el aviso azul de 'Windows protegió su PC', el bloqueo de seguridad de macOS, y qué hacer cuando aparecen.",
          },
          {
            en: "Re-running it only downloads what is new, so updating is the same action as installing.",
            es: "Volver a ejecutarlo solo descarga lo nuevo, así que actualizar es la misma acción que instalar.",
          },
          {
            en: "If the connection drops or the computer shuts down mid-download, reopening it picks up where it stopped. Nothing to redo, nothing to explain.",
            es: "Si se corta la conexión o se apaga el ordenador a medias, al volver a abrirlo sigue donde lo dejó. Nada que rehacer, nada que explicar.",
          },
          {
            en: "The password is never stored. Only the session is kept, and the instructions say in plain language which folder to delete to log out.",
            es: "La contraseña no se guarda nunca. Solo se conserva la sesión, y las instrucciones dicen en lenguaje llano qué carpeta borrar para cerrarla.",
          },
        ],
      },
      {
        kind: "p",
        text: {
          en: "The Kuestiona team backed it and it was well received by the students using it, which for a tool built by one classmate for the others is the only metric that counts.",
          es: "El equipo de Kuestiona lo respaldó y tuvo buena acogida entre los alumnos que lo usan, que para una herramienta hecha por un compañero para los demás es la única métrica que cuenta.",
        },
      },
    ],
  },

  {
    slug: "late-night-jazz",
    title: "Late Night Jazz Ballad",
    year: "2025",
    summary: {
      en: "An AI music pipeline with a custom Prompt Factory, from prompt engineering to tracks live on Spotify.",
      es: "Un pipeline de música con IA y una Prompt Factory propia, del prompt engineering a temas publicados en Spotify.",
    },
    role: { en: "Producer & pipeline engineer", es: "Productor e ingeniero de pipeline" },
    context: { en: "Personal project", es: "Proyecto personal" },
    stack: ["Suno AI", "HTML/JS", "ffmpeg", "DistroKid"],
    metric: { value: "2", label: { en: "releases published", es: "lanzamientos publicados" } },
    // Es música. Una captura de pantalla es justo lo que menos la representa.
    // Añade `duration` cuando quieras que salga el tiempo del tema.
    cover: { kind: "audio", title: "Late Night Jazz Ballad" },
    href: "https://youtu.be/-trmRNBeemM",
    body: [
      {
        kind: "p",
        text: {
          en: "A small side project, and the only one here with no engineering problem behind it. Generating one good AI track is luck; generating them consistently is a process. I built a prompt tool that produces controlled variations of tempo, mood and instrumentation instead of rewriting the prompt by hand each time, then ran the output through a fixed pipeline: Suno to generate, ffmpeg to normalise, DistroKid to distribute.",
          es: "Un proyecto pequeño, y el único aquí sin un problema de ingeniería detrás. Generar un buen tema con IA es suerte; generarlos de forma consistente es un proceso. Construí una herramienta de prompts que produce variaciones controladas de tempo, ambiente e instrumentación en lugar de reescribir el prompt a mano cada vez, y pasé el resultado por un pipeline fijo: Suno para generar, ffmpeg para normalizar, DistroKid para distribuir.",
        },
      },
      {
        kind: "p",
        text: {
          en: "It is here because it is the same habit as everything else on this page: when something works once by accident, turn it into a process so it works the next time on purpose. The tracks are published and streaming.",
          es: "Está aquí porque es la misma costumbre que todo lo demás en esta página: cuando algo sale bien una vez por casualidad, conviértelo en un proceso para que la siguiente salga bien a propósito. Los temas están publicados y en streaming.",
        },
      },
    ],
  },
];

/* ============================================================
   EXPERIENCIA
   TODA ESTA SECCIÓN NECESITA QUE CONFIRMES LAS FECHAS.
   Las que había en el sitio anterior no cuadran con tu perfil.
   ============================================================ */

export const experience: Experience[] = [
  {
    company: "ICL Iberia",
    location: { en: "Súria, Barcelona", es: "Súria, Barcelona" },
    // VERIFICAR: LinkedIn arranca en oct. 2024, pero dijiste que entraste como
    // contractor antes (¿nov. 2023?). Si el periodo de contractor cuenta, ponlo aquí.
    // Fechas tomadas del CV (2026_Piero_atausinchi_CV.pdf). La web decia
    // oct. 2024: un año de más en la empresa actual.
    from: "oct. 2025",
    to: null,
    stack: ["SAP PM", "Python", "React", "Node.js", "SQL Server", "IoT"],
    roles: [
      {
        title: { en: "Reliability Engineer", es: "Ingeniero de fiabilidad" },
        from: "ene. 2026",
        to: null,
        transition: {
          en: "Moved from contractor to direct hire on the strength of the reliability work.",
          es: "Pasé de contractor a contratación directa por el trabajo de fiabilidad.",
        },
        bullets: [
          {
            en: "Lead reliability improvement for mobile mining equipment in an underground potash and salt operation, targeting availability and recurrent failures.",
            es: "Lidero la mejora de fiabilidad de equipos móviles de minería en una operación subterránea de potasa y sal, enfocado en disponibilidad y fallos recurrentes.",
          },
          {
            en: "Run failure analysis and Root Cause Analysis, turning findings into maintenance plan changes and concrete field actions.",
            es: "Ejecuto análisis de fallos y Root Cause Analysis, convirtiendo los hallazgos en cambios de plan de mantenimiento y acciones concretas en campo.",
          },
          {
            en: "Drive lubrication standardisation and grease consolidation, including technical evaluation against reliability best practice.",
            es: "Dirijo la estandarización de lubricación y la consolidación de grasas, con evaluación técnica contra buenas prácticas de fiabilidad.",
          },
          {
            en: "Run asset criticality analysis and optimise preventive maintenance strategy inside SAP PM based on operational risk and equipment impact.",
            es: "Realizo análisis de criticidad de activos y optimizo la estrategia de mantenimiento preventivo dentro de SAP PM según riesgo operativo e impacto del equipo.",
          },
          {
            en: "Track MTBF, MTTR and downtime trends to keep maintenance decisions on data rather than instinct.",
            es: "Sigo MTBF, MTTR y tendencias de parada para mantener las decisiones de mantenimiento sobre datos y no sobre instinto.",
          },
          {
            en: "Built NexoIBP, the internal web app that replaces manual records and shared spreadsheets for machine status, shift handover and reliability reporting. Currently in rollout.",
            es: "Construí NexoIBP, la aplicación web interna que sustituye registros manuales y Excels compartidos para estado de máquina, relevo de turno e informes de fiabilidad. Actualmente en despliegue.",
          },
          {
            en: "Automated bulk closing of maintenance orders in SAP, removing an afternoon of manual clicking from the weekly routine.",
            es: "Automaticé el cierre masivo de órdenes de mantenimiento en SAP, quitando una tarde de clics manuales de la rutina semanal.",
          },
        ],
      },
      {
        title: {
          en: "PM Implementation Leader — Continuous Improvement",
          es: "Líder de implementación PM — Mejora continua",
        },
        from: "oct. 2025",
        to: "ene. 2026",
        bullets: [
          {
            en: "Led field implementation of new processes and systems, including alignment standards and the lubricants consolidation programme.",
            es: "Lideré la implementación en campo de nuevos procesos y sistemas, incluyendo estándares de alineación y el programa de consolidación de lubricantes.",
          },
          {
            en: "Owned technology integration: SAP preventive maintenance plan enhancements, IoT for predictive maintenance, and SAP Mobile rollout support.",
            es: "Responsable de la integración tecnológica: mejoras del plan de mantenimiento preventivo en SAP, IoT para mantenimiento predictivo, y soporte al despliegue de SAP Mobile.",
          },
          {
            en: "Acted as change leader, mentor and project manager across every level of the organisation, working through real resistance to change.",
            es: "Actué como líder de cambio, mentor y jefe de proyecto en todos los niveles de la organización, trabajando contra una resistencia al cambio real.",
          },
        ],
      },
    ],
  },
  {
    company: "Infinite Fusion",
    location: { en: "Luqa & Qormi, Malta", es: "Luqa y Qormi, Malta" },
    from: "ago. 2023",
    // Saliste de Malta justo antes de empezar en ICL (oct. 2025). Con la fecha
    // anterior quedaba un hueco de 13 meses sin explicar, que es la primera
    // cosa que pregunta un reclutador.
    to: "sep. 2025",
    stack: ["ArcMap", "GIS", "MS Project"],
    roles: [
      {
        title: {
          en: "Geographic Information Systems Engineer",
          es: "Ingeniero de sistemas de información geográfica",
        },
        from: "oct. 2023",
        to: "sep. 2025",
        bullets: [
          {
            en: "Captured, stored, checked and displayed the distribution of new valves and pipes for infrastructure projects across Malta using GIS tools.",
            es: "Capturé, almacené, verifiqué y representé la distribución de nuevas válvulas y tuberías para proyectos de infraestructura por toda Malta usando herramientas GIS.",
          },
          {
            en: "Produced daily reports and ArcMap updates for the Water Services Corporation.",
            es: "Elaboré informes diarios y actualizaciones en ArcMap para la Water Services Corporation.",
          },
          {
            en: "Worked as a two-person field team covering the whole island: navigation, on-site visits and ground-level project execution.",
            es: "Trabajé en equipo de dos personas cubriendo toda la isla: navegación, visitas a obra y ejecución de proyecto a pie de campo.",
          },
        ],
      },
      {
        title: { en: "Project Coordinator", es: "Coordinador de proyecto" },
        from: "ago. 2023",
        to: "oct. 2023",
        bullets: [
          {
            en: "Consolidated project scheduling, dependencies and resource allocation in MS Project for the Zurrieq Farmhouse project.",
            es: "Consolidé planificación, dependencias y asignación de recursos en MS Project para el proyecto Zurrieq Farmhouse.",
          },
          {
            en: "Led communication with a 13-person team, carrying needs upward to management and decisions back down.",
            es: "Lideré la comunicación con un equipo de 13 personas, llevando necesidades hacia dirección y decisiones de vuelta al equipo.",
          },
          {
            en: "Coordinated procurement so materials landed on site two weeks ahead of need, which is what kept the schedule real.",
            es: "Coordiné las compras para que los materiales llegaran a obra dos semanas antes de necesitarse, que es lo que mantuvo el cronograma en pie.",
          },
          {
            en: "Delivered the full planning file in MS Project, then adapted it to Excel so the team would actually read it.",
            es: "Entregué el archivo de planificación completo en MS Project, y lo adapté a Excel para que el equipo lo leyera de verdad.",
          },
        ],
      },
    ],
  },
  {
    company: "AQUATERMICA SAC",
    location: { en: "Lima, Peru", es: "Lima, Perú" },
    from: "dic. 2020",
    to: "mar. 2023",
    stack: ["Autodesk Inventor", "ERP", "HVAC", "Cost control"],
    roles: [
      {
        title: {
          en: "Team Leader & Operations Engineer",
          es: "Líder de equipo e ingeniero de operaciones",
        },
        from: "dic. 2020",
        to: "mar. 2023",
        bullets: [
          {
            en: "Managed a team of 10 across logistics, production and services.",
            es: "Gestioné un equipo de 10 personas entre logística, producción y servicios.",
          },
          {
            en: "Led the project management of an ERP implementation, tightening communication across departments.",
            es: "Lideré la gestión de proyecto de una implementación de ERP, cerrando la comunicación entre departamentos.",
          },
          {
            en: "Redesigned a 5 BHP domestic boiler, cutting production cost by 10% while improving thermal performance. This became my thesis.",
            es: "Rediseñé un caldero doméstico de 5 BHP, reduciendo el coste de producción un 10% y mejorando el rendimiento térmico. Fue mi tesis.",
          },
          {
            en: "Ran cost control analysis that brought production costs down 15%.",
            es: "Ejecuté análisis de control de costes que bajaron los costes de producción un 15%.",
          },
          {
            en: "Modelled the machine room for the Pichanaqui hospital in Autodesk Inventor: 12 pumps, 4 water heaters, storage, treatment and piping.",
            es: "Modelé la sala de máquinas del hospital de Pichanaqui en Autodesk Inventor: 12 bombas, 4 calentadores, almacenamiento, tratamiento de agua y tuberías.",
          },
        ],
      },
    ],
  },
  {
    company: "HYDROSTEEL S.A.C",
    location: { en: "Lima, Peru · Freelance", es: "Lima, Perú · Freelance" },
    from: "2020",
    to: "2022",
    stack: ["Autodesk Inventor", "Technical drawing"],
    roles: [
      {
        title: {
          en: "CAD Modeller — Mechanical Systems",
          es: "Modelador CAD — sistemas mecánicos",
        },
        from: "2020",
        to: "2022",
        bullets: [
          {
            en: "Built 3D models of machines in Autodesk Inventor from client orders and drawings, with the detail needed to actually manufacture from them.",
            es: "Construí modelos 3D de máquinas en Autodesk Inventor a partir de pedidos y planos de cliente, con el detalle necesario para fabricar a partir de ellos.",
          },
          {
            en: "Worked directly with clients on specifications and revisions.",
            es: "Trabajé directamente con clientes en especificaciones y revisiones.",
          },
        ],
      },
    ],
  },
  {
    company: "Clínica San Juan de Dios",
    location: { en: "Lima, Peru · Part-time", es: "Lima, Perú · Jornada parcial" },
    from: "feb. 2020",
    to: "jul. 2020",
    stack: ["Energy audit"],
    roles: [
      {
        title: { en: "Team Leader & Design", es: "Líder de equipo y diseño" },
        from: "feb. 2020",
        to: "jul. 2020",
        bullets: [
          {
            en: "Ran the first phase of an economic and technical evaluation of the clinic's thermal plant.",
            es: "Ejecuté la primera fase de una evaluación económica y técnica de la planta térmica de la clínica.",
          },
          {
            en: "Found the boiler was oversized by 150%, and quantified the energy that was being lost because of it.",
            es: "Detecté que el caldero estaba sobredimensionado un 150%, y cuantifiqué la energía que se estaba perdiendo por ello.",
          },
        ],
      },
    ],
  },
];

// Fechas y centros tomados del CV, con una excepción: el CV da el MBA por
// "04/2024 – ACTUAL" y está terminado desde 2024. Ese es un cuarto "Actual"
// mal que hay que arreglar también en Europass.
export const studies = [
  {
    name: { en: "MBA", es: "MBA" } satisfies L,
    org: "London School of Commerce Malta",
    year: "2024",
    note: {
      en: "Master of Business Administration.",
      es: "Máster en Administración de Empresas.",
    } satisfies L,
  },
  {
    name: { en: "B.S. Mechanical Engineering", es: "Ing. Mecánica" } satisfies L,
    org: "UTEC - Universidad de Ingeniería y Tecnología, Lima",
    year: "2016 - 2021",
    note: { en: "", es: "" } satisfies L,
  },
];

/* ============================================================
   HABILIDADES
   ============================================================ */

export const skills: SkillGroup[] = [
  {
    title: { en: "Reliability", es: "Fiabilidad" },
    context: {
      en: "The day job: 18 trucks underground, failure analysis and preventive strategy.",
      es: "El trabajo diario: 18 camiones bajo tierra, análisis de fallos y estrategia de preventivo.",
    },
    items: [
      "RCA",
      "Failure analysis",
      "MTBF / MTTR",
      "Asset criticality",
      "Preventive maintenance strategy",
      "Lubrication standardisation",
      "RCM",
    ],
  },
  {
    title: { en: "Maintenance systems", es: "Sistemas de mantenimiento" },
    context: {
      en: "Where the orders live. Also what I automated when closing them by hand ate afternoons.",
      es: "Donde viven las órdenes. También lo que automaticé cuando cerrarlas a mano se comía tardes.",
    },
    items: ["SAP PM", "SAP Mobile", "IoT / predictive maintenance", "Cost-per-ton analysis"],
  },
  {
    title: { en: "Data & Analysis", es: "Datos y análisis" },
    context: {
      en: "Turning manual records into something you can query. This is what made NexoIBP possible.",
      es: "Convertir registros manuales en algo consultable. Es lo que hizo posible NexoIBP.",
    },
    items: ["Python", "pandas", "SQL Server", "Excel/VBA", "Power Automate", "ArcMap / GIS"],
  },
  {
    title: { en: "Web", es: "Web" },
    context: {
      en: "The stack behind NexoIBP, and behind tools that had to run on locked-down office PCs.",
      es: "El stack detrás de NexoIBP, y de herramientas que debían correr en PCs corporativos restringidos.",
    },
    items: ["React", "Vite", "Node.js", "TypeScript", "Vanilla JS", "HTML/CSS"],
  },
  {
    // Quité "Windows Auth SSO" e "IIS/PM2": no los pude confirmar en el código de
    // NexoIBP (usa login propio por roles). Si los usas en otra app, dímelo y vuelven.
    title: { en: "Infrastructure", es: "Infraestructura" },
    context: {
      en: "Moving a working product onto company servers without the team noticing the change.",
      es: "Llevar un producto que ya funcionaba a los servidores de la empresa sin que el equipo notara el cambio.",
    },
    items: ["Windows Server", "SQL Server", "Role-based access", "Data migration"],
  },
  {
    title: { en: "AI", es: "IA" },
    context: {
      en: "A side project that turned into a pipeline: two releases published and streaming.",
      es: "Un proyecto paralelo que acabó siendo un pipeline: dos lanzamientos publicados y en streaming.",
    },
    items: ["Claude", "Stable Diffusion", "ComfyUI", "Suno", "Prompt engineering"],
  },
  {
    title: { en: "Leading change", es: "Gestión del cambio" },
    context: {
      en: "Thirteen people on a construction project, and field rollout to operators who did not want another app.",
      es: "Trece personas en un proyecto de obra, y despliegue en campo con operarios que no querían otra app más.",
    },
    items: ["Project management", "Change leadership", "Mentoring", "Field rollout"],
  },
];

export const languages = [
  { name: { en: "Spanish", es: "Español" }, level: { en: "Native", es: "Nativo" } },
  { name: { en: "English", es: "Inglés" }, level: { en: "Fluent", es: "Fluido" } },
  { name: { en: "Catalan", es: "Catalán" }, level: { en: "Understands", es: "Comprensión" } },
];
