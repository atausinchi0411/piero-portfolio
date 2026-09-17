import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Piero",
  lastName: "",
  name: "Piero",
  role: "Ingeniero de IA y Automatizacion",
  avatar: "/images/avatar.jpg",
  email: "qando0kna29@gmail.com",
  location: "Europe/Madrid",
  languages: ["Espanol", "Ingles"],
  locale: "es",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Suscribete al boletin de {person.firstName}</>,
  description: <>Novedades sobre proyectos de IA y automatizacion</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Inicio",
  title: `Portafolio de ${person.name}`,
  description: `Portafolio con proyectos de IA, pipelines de automatizacion y aplicaciones empresariales`,
  headline: <>Ingenieria e IA — construyendo soluciones mas inteligentes</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Apps Empresariales</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Proyecto destacado
        </Text>
      </Row>
    ),
    href: "/work/enterprise-operations-suite",
  },
  subline: (
    <>
      Soy {person.firstName}, un ingeniero mecanico convertido en{" "}
      <Text as="span" size="xl" weight="strong">constructor de IA</Text>. Automatizo procesos, construyo apps empresariales <br /> y creo herramientas con IA para operaciones reales.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre mi",
  title: `Sobre mi – ${person.name}`,
  description: `Conoce a ${person.name} — ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduccion",
    description: (
      <>
        Ingeniero mecanico con MBA y una fuerte orientacion hacia la IA y la automatizacion. Construyo herramientas que
        resuelven problemas operacionales reales — desde aplicaciones web empresariales y pipelines de analisis de datos
        hasta produccion musical asistida por IA. Trabajo como Ingeniero de Fiabilidad y Mantenimiento en una importante
        operacion minera internacional, donde he introducido soluciones con IA para optimizar
        procesos y reducir costos.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiencia Laboral",
    experiences: [
      {
        company: "Operacion Minera Internacional",
        timeframe: "2023 - Presente",
        role: "Ingeniero de Fiabilidad y Mantenimiento",
        achievements: [
          <>
            Construi un paquete completo de 4 aplicaciones web empresariales (React + Node.js) que digitalizaron
            los traspasos de turno, seguimiento de rutinas, dashboards operacionales y analisis asistido por IA para
            el departamento de mantenimiento.
          </>,
          <>
            Desarrolle un pipeline de analisis en Python que cruza datos de SAP para detectar mal uso de equipos
            y calibrar puntuacion de fallos en una flota de 13+ equipos, generando ahorros significativos
            en costos de mantenimiento.
          </>,
          <>
            Introduje herramientas de IA (Claude, scripts de automatizacion) en los flujos de trabajo diarios de ingenieria,
            aumentando la productividad del equipo y habilitando la toma de decisiones basada en datos.
          </>,
        ],
        images: [],
      },
      {
        company: "AQUATERMICA",
        timeframe: "2021 - 2023",
        role: "Ingeniero de Proyectos y Diseno (HVAC)",
        achievements: [
          <>
            Disene sistemas HVAC y gestione proyectos de instalacion para clientes residenciales y comerciales
            en Lima, Peru.
          </>,
          <>
            Posteriormente lidere un rediseno completo del area comercial usando analisis de datos con IA — procesando
            1,476 presupuestos historicos para identificar 19 acciones priorizadas, de las cuales 17 eran mejoras
            de costo cero.
          </>,
        ],
        images: [],
      },
      {
        company: "Empresa GIS — Malta",
        timeframe: "2020 - 2021",
        role: "Tecnico GIS",
        achievements: [
          <>
            Trabaje en proyectos de sistemas de informacion geografica, procesando datos espaciales y creando
            mapas tecnicos para planificacion de infraestructura.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Estudios",
    institutions: [
      {
        name: "UTEC (Universidad de Ingenieria y Tecnologia) — Lima",
        description: <>Bachiller en Ingenieria Mecanica.</>,
      },
      {
        name: "UTEC + LSCM — MBA",
        description: <>Master en Administracion de Empresas, completado en 2024.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Habilidades Tecnicas",
    skills: [
      {
        title: "Desarrollo Web",
        description: (
          <>Apps full-stack con React, Vite, Node.js y SQL Server. Experiencia desplegando en IIS con PM2 y Windows Auth SSO.</>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "Node.js", icon: "nodejs" },
          { name: "JavaScript", icon: "javascript" },
        ],
        images: [],
      },
      {
        title: "Python y Analisis de Datos",
        description: (
          <>Pipelines automatizados para procesamiento de datos, cruce de datos SAP, modelos de puntuacion y generacion de reportes usando pandas e integracion con Excel/VBA.</>
        ),
        tags: [
          { name: "Python", icon: "python" },
        ],
        images: [],
      },
      {
        title: "IA y Automatizacion",
        description: (
          <>Uso de Claude AI, Suno AI y scripts personalizados para automatizar flujos de trabajo — desde analisis empresarial hasta pipelines de produccion musical con procesamiento por lotes.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "DevOps e Infraestructura",
        description: (
          <>Despliegue en Windows Server con IIS, gestion de procesos con PM2, administracion de SQL Server, scripts de auto-actualizacion con deteccion de cambios en entidades y generacion de migraciones SQL.</>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Escribiendo sobre IA y automatizacion...",
  description: `Lee lo ultimo de ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Proyectos",
  title: `Proyectos – ${person.name}`,
  description: `Proyectos de IA y automatizacion por ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galeria",
  title: `Galeria – ${person.name}`,
  description: `Una coleccion de ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
