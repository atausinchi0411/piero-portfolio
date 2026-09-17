"use client";

import Link from "next/link";
import type { Project } from "@/content/types";
import { ui, useLocale } from "@/lib/i18n";
import { Cover } from "./Cover";
import { Sequence } from "./Sequence";
import { Shot } from "./Shot";
import s from "./CaseStudy.module.css";

export function CaseStudy({ project }: { project: Project }) {
  const { t } = useLocale();

  return (
    <article className={`wrap ${s.page}`}>
      <Link href="/#work" className={s.back}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
        {t(ui.backToWork)}
      </Link>

      <header className={s.head}>
        <p className="eyebrow">{t(project.context)}</p>
        <h1 className={s.title}>{project.title}</h1>
        <p className={`lead ${s.summary}`}>{t(project.summary)}</p>
      </header>

      {/* Ficha técnica: lo que un reclutador escanea en tres segundos. */}
      <dl className={s.spec}>
        <div>
          <dt className="eyebrow">{t(ui.role)}</dt>
          <dd>{t(project.role)}</dd>
        </div>
        <div>
          <dt className="eyebrow">{t(ui.year)}</dt>
          <dd className="mono">{project.year}</dd>
        </div>
        {/* El dato duro va grande, como en la parrilla. Antes el número
            estaba en estilo de etiqueta y parecía un encabezado. */}
        <div>
          <dt className={`mono ${s.specMetric}`}>{project.metric.value}</dt>
          <dd className={s.specMetricLabel}>{t(project.metric.label)}</dd>
        </div>
        <div className={s.specStack}>
          <dt className="eyebrow">{t(ui.stack)}</dt>
          <dd>
            <div className={s.tags}>
              {project.stack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </dd>
        </div>
      </dl>

      <Cover
        cover={project.cover}
        title={project.title}
        ratio="wide"
        sizes="(max-width: 1180px) calc(100vw - 40px), 1140px"
        priority
      />

      {project.privateNote && (
        <p className={s.note}>
          <span className={`mono ${s.noteTag}`}>{t(ui.privateProject)}</span>
          {t(project.privateNote)}
        </p>
      )}

      <div className={s.body}>
        {project.body.map((block, i) => {
          if (block.kind === "h") {
            // biome-ignore lint/suspicious/noArrayIndexKey: bloques estáticos, no se reordenan
            return <h2 key={i}>{t(block.text)}</h2>;
          }
          if (block.kind === "p") {
            // biome-ignore lint/suspicious/noArrayIndexKey: bloques estáticos
            return <p key={i}>{t(block.text)}</p>;
          }
          if (block.kind === "ul") {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: bloques estáticos
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item.en}>{t(item)}</li>
                ))}
              </ul>
            );
          }
          if (block.kind === "sequence") {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: bloques estáticos
              <figure key={i} className={s.inlineShot}>
                <Sequence frames={block.frames} chrome={block.chrome} />
                <figcaption>{t(block.caption)}</figcaption>
              </figure>
            );
          }
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: bloques estáticos
            <figure key={i} className={s.inlineShot}>
              <Shot src={block.src} alt={t(block.caption)} chrome={block.chrome} ratio="wide" />
              <figcaption>{t(block.caption)}</figcaption>
            </figure>
          );
        })}
      </div>

      {project.href && (
        <a href={project.href} className={s.visit} target="_blank" rel="noreferrer">
          {project.href.replace(/^https?:\/\//, "")}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      )}
    </article>
  );
}
