"use client";

import Link from "next/link";
import type { Project } from "@/content/types";
import { ui, useLocale } from "@/lib/i18n";
import { Cover } from "./Cover";
import { Reveal } from "./Reveal";
import s from "./ProjectGrid.module.css";

function Arrow({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>ir</title>
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ lead ---
   El proyecto que más pesa no puede ocupar la misma caja que los demás. Va a
   ancho completo, con la portada grande y el texto a un lado.              */

export function LeadProject({ project }: { project: Project }) {
  const { t } = useLocale();

  return (
    <Reveal>
      <Link href={`/work/${project.slug}`} className={s.lead}>
        <div className={s.leadText}>
          <p className={s.leadTop}>
            <span className={`mono ${s.index}`}>01</span>
            <span className={`mono ${s.year}`}>{project.year}</span>
          </p>

          <h3 className={s.leadTitle}>{project.title}</h3>
          <p className={s.leadSummary}>{t(project.summary)}</p>

          <p className={s.leadMetric}>
            <b className="mono">{project.metric.value}</b>
            <span>{t(project.metric.label)}</span>
          </p>

          <div className={s.tags}>
            {project.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>

          <span className={s.cta}>
            {t(ui.readCase)}
            <Arrow />
          </span>
        </div>

        <div className={s.leadCover}>
          <Cover cover={project.cover} title={project.title} fill priority />
        </div>
      </Link>
    </Reveal>
  );
}

/* ----------------------------------------------------------------- cards --- */

function Card({ project, n, delay }: { project: Project; n: number; delay: number }) {
  const { t } = useLocale();

  return (
    <Reveal delay={delay}>
      <Link href={`/work/${project.slug}`} className={s.card}>
        <Cover cover={project.cover} title={project.title} />

        <div className={s.meta}>
          <p className={s.leadTop}>
            <span className={`mono ${s.index}`}>{String(n).padStart(2, "0")}</span>
            <span className={`mono ${s.year}`}>{project.year}</span>
          </p>

          <h3 className={s.title}>{project.title}</h3>
          <p className={s.summary}>{t(project.summary)}</p>

          <p className={s.cardMetric}>
            <b className="mono">{project.metric.value}</b>
            <span>{t(project.metric.label)}</span>
          </p>

          <div className={s.tags}>
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className={`mono ${s.more}`}>+{project.stack.length - 4}</span>
            )}
          </div>
        </div>

        <span className={s.cta}>
          {t(ui.readCase)}
          <Arrow />
        </span>
      </Link>
    </Reveal>
  );
}

export function ProjectCards({ projects, startAt = 2 }: { projects: Project[]; startAt?: number }) {
  return (
    <div className={s.grid}>
      {projects.map((project, i) => (
        <Card key={project.slug} project={project} n={startAt + i} delay={i * 70} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- index ---
   El resto no necesita portada: necesita ser escaneable. Una tabla se lee en
   segundos y deja que las portadas de arriba sigan pesando.                */

export function ProjectIndex({ projects, startAt }: { projects: Project[]; startAt: number }) {
  const { t } = useLocale();

  return (
    <ol className={s.index_}>
      {projects.map((project, i) => (
        <Reveal key={project.slug} as="li" delay={i * 50}>
          <Link href={`/work/${project.slug}`} className={s.row}>
            <span className={`mono ${s.rowNum}`}>{String(startAt + i).padStart(2, "0")}</span>

            <span className={s.rowMain}>
              <span className={s.rowTitle}>{project.title}</span>
              <span className={s.rowSummary}>{t(project.summary)}</span>
            </span>

            <span className={s.rowTags}>
              {project.stack.slice(0, 3).map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </span>

            <span className={`mono ${s.rowYear}`}>{project.year}</span>
            <span className={s.rowArrow}>
              <Arrow size={14} />
            </span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
