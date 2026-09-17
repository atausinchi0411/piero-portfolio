import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Piero",
  lastName: "",
  name: "Piero",
  role: "AI & Automation Engineer",
  avatar: "/images/avatar.jpg",
  email: "qando0kna29@gmail.com",
  location: "Europe/Madrid",
  languages: ["Spanish", "English"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on AI projects and automation</>,
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
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio showcasing AI-powered projects, automation pipelines, and enterprise applications`,
  headline: <>Engineering meets AI — building smarter solutions</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Enterprise Apps</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/enterprise-operations-suite",
  },
  subline: (
    <>
      I'm {person.firstName}, a mechanical engineer turned{" "}
      <Text as="span" size="xl" weight="strong">AI builder</Text>. I automate processes, build enterprise apps, <br /> and create AI-powered tools for real-world operations.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name} — ${person.role}`,
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
    title: "Introduction",
    description: (
      <>
        Mechanical engineer with an MBA and a strong drive toward AI and automation. I build tools that
        solve real operational problems — from enterprise web apps and data analytics pipelines
        to AI-assisted music production. Working as a Reliability & Maintenance Engineer in a major
        international mining operation, where I've introduced AI-powered solutions to optimize
        processes and reduce costs.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "ICL Iberia",
        timeframe: "2023 - Present",
        role: "Reliability & Maintenance Engineer",
        achievements: [
          <>
            Built a full suite of 4 enterprise web applications (React + Node.js) that digitized
            shift handoffs, routine tracking, operational dashboards, and AI-assisted analysis for
            the maintenance department.
          </>,
          <>
            Developed a Python analytics pipeline that cross-references SAP data to detect equipment
            misuse and calibrate failure scoring across a 13+ equipment fleet, saving significant
            maintenance costs.
          </>,
          <>
            Introduced AI tools (Claude, automation scripts) into daily engineering workflows,
            increasing team productivity and enabling data-driven decision making.
          </>,
        ],
        images: [],
      },
      {
        company: "AQUATERMICA",
        timeframe: "2021 - 2023",
        role: "Project & Design Engineer (HVAC)",
        achievements: [
          <>
            Designed HVAC systems and managed installation projects for residential and commercial
            clients in Lima, Peru.
          </>,
          <>
            Later led a full commercial area redesign using AI-powered data analysis — processing
            1,476 historical quotes to identify 19 prioritized actions, 17 of which were zero-cost
            improvements.
          </>,
        ],
        images: [],
      },
      {
        company: "GIS Company — Malta",
        timeframe: "2020 - 2021",
        role: "GIS Technician",
        achievements: [
          <>
            Worked on geographic information systems projects, processing spatial data and creating
            technical maps for infrastructure planning.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "UTEC (Universidad de Ingeniería y Tecnología) — Lima",
        description: <>B.S. in Mechanical Engineering.</>,
      },
      {
        name: "UTEC + LSCM — MBA",
        description: <>Master of Business Administration, completed in 2024.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Web Development",
        description: (
          <>Full-stack apps with React, Vite, Node.js, and SQL Server. Experience deploying on IIS with PM2 and Windows Auth SSO.</>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "Node.js", icon: "nodejs" },
          { name: "JavaScript", icon: "javascript" },
        ],
        images: [],
      },
      {
        title: "Python & Data Analytics",
        description: (
          <>Automated pipelines for data processing, SAP cross-referencing, scoring models, and report generation using pandas and Excel/VBA integration.</>
        ),
        tags: [
          { name: "Python", icon: "python" },
        ],
        images: [],
      },
      {
        title: "AI & Automation",
        description: (
          <>Leveraging Claude AI, Suno AI, and custom scripts to automate workflows — from enterprise analysis to music production pipelines with batch processing.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "DevOps & Infrastructure",
        description: (
          <>Windows Server deployment with IIS, PM2 process management, SQL Server administration, auto-update scripts with entity-change detection and SQL migration generation.</>
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
  title: "Writing about AI and automation...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `AI and automation projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `A collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
