"use client";

import Image from "next/image";
import Link from "next/link";
import { about, experience, languages, person, projects, skills, studies } from "@/content/site";
import { ui, useLocale } from "@/lib/i18n";
import { LeadProject, ProjectCards, ProjectIndex } from "./ProjectGrid";
import { Reveal } from "./Reveal";
import s from "./Sections.module.css";

export function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="sectionHead">
      <span className="sectionNum">{n}</span>
      <h2 className="sectionTitle">{title}</h2>
    </div>
  );
}

/* ------------------------------------------------------------ Proyectos */

export function WorkSection() {
  const { t } = useLocale();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  // El primer destacado manda: se lleva el ancho completo. Los otros van en
  // tarjetas, y todo lo demás baja a un índice de texto que se escanea.
  const [lead, ...alsoFeatured] = featured;

  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHead n="01" title={t(ui.selectedWork)} />

        {lead && <LeadProject project={lead} />}
        {alsoFeatured.length > 0 && <ProjectCards projects={alsoFeatured} startAt={2} />}

        {rest.length > 0 && (
          <>
            <div className={s.subHead}>
              <span className="eyebrow">{t(ui.allWork)}</span>
              <span className={`mono ${s.count}`}>{String(rest.length).padStart(2, "0")}</span>
            </div>
            <ProjectIndex projects={rest} startAt={featured.length + 1} />
          </>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Experiencia */

export function ExperienceSection() {
  const { t } = useLocale();

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead n="02" title={t(ui.experience)} />

        <ol className={s.timeline}>
          {experience.map((job) => (
            <li key={job.company} className={s.job}>
              <div className={s.when}>
                <span className="mono">{job.from}</span>
                <span className={s.dash} aria-hidden="true" />
                <span className="mono">{job.to ?? t(ui.present)}</span>
              </div>

              <div className={s.what}>
                <h3 className={s.company}>{job.company}</h3>
                <p className={s.place}>{t(job.location)}</p>

                {/* Varios puestos en la misma empresa se leen como progresión. */}
                <ol className={s.roles}>
                  {job.roles.map((role) => (
                    <li key={role.title.en} className={s.role}>
                      <div className={s.roleHead}>
                        <h4 className={s.roleTitle}>{t(role.title)}</h4>
                        <span className={`mono ${s.roleDates}`}>
                          {role.from} — {role.to ?? t(ui.present)}
                        </span>
                      </div>

                      {role.transition && (
                        <p className={s.transition}>{t(role.transition)}</p>
                      )}

                      <ul className={s.bullets}>
                        {role.bullets.map((b) => (
                          <li key={b.en}>{t(b)}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>

                {job.stack && (
                  <div className={s.tags}>
                    {job.stack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Habilidades / formación */

export function SkillsSection() {
  const { t } = useLocale();

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHead n="03" title={t(ui.skills)} />

        <div className={s.skillGrid}>
          {skills.map((group) => (
            <div key={group.title.en} className={s.skillGroup}>
              <h3 className={`eyebrow ${s.skillTitle}`}>{t(group.title)}</h3>
              {/* La línea de contexto es lo que separa esto de un muro de
                  logos: dice dónde se usó, no solo que aparece en el CV. */}
              {group.context && <p className={s.skillContext}>{t(group.context)}</p>}
              <div className={s.tags}>
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={s.twoUp}>
          <div>
            <h3 className={`eyebrow ${s.skillTitle}`}>{t(ui.studiesTitle)}</h3>
            <ul className={s.plainList}>
              {studies.map((st) => (
                <li key={st.org}>
                  <strong>{t(st.name)}</strong>
                  {st.year && <span className={`mono ${s.dim}`}> · {st.year}</span>}
                  <br />
                  <span className={s.dim}>{st.org}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`eyebrow ${s.skillTitle}`}>{t(ui.languagesTitle)}</h3>
            <ul className={s.plainList}>
              {languages.map((lang) => (
                <li key={lang.name.en}>
                  <strong>{t(lang.name)}</strong>
                  <span className={s.dim}> — {t(lang.level)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Sobre mí */

export function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHead n="04" title={t(ui.about)} />

        <div className={s.aboutTop}>
          <Reveal className={s.aboutPortrait}>
            {person.photo && (
              <Image
                src={person.photo}
                alt={`${person.name} ${person.lastName}`}
                width={896}
                height={1200}
                sizes="(max-width: 860px) calc(100vw - 40px), 320px"
                quality={90}
                className={s.aboutPhoto}
              />
            )}
            <p className={`mono ${s.aboutWhere}`}>{t(person.location)}</p>
          </Reveal>

          <Reveal delay={90} className={s.aboutText}>
            <p className={s.aboutLead}>{t(about.lead)}</p>
            {about.body.map((para) => (
              <p key={para.en} className={s.aboutPara}>
                {t(para)}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Cada principio enlaza al caso que lo demuestra. Sin el enlace esto
            sería una lista de frases bonitas, que es justo lo que no queremos. */}
        <div className={s.subHead}>
          <span className="eyebrow">{t(ui.howIWork)}</span>
        </div>

        <ol className={s.principles}>
          {about.principles.map((principle, i) => {
            const proof = projects.find((pr) => pr.slug === principle.proof);
            return (
              <Reveal
                key={principle.proof + principle.title.en}
                as="li"
                delay={i * 80}
                className={s.principle}
              >
                <span className={`mono ${s.principleNum}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.principleTitle}>{t(principle.title)}</h3>
                <p className={s.principleText}>{t(principle.text)}</p>
                {proof && (
                  <Link href={`/work/${proof.slug}`} className={`arrowLink ${s.principleProof}`}>
                    {t(ui.seeProof)} {proof.title}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <title>ir al caso</title>
                      <path d="M5 12h13M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Contacto */

export function ContactSection() {
  const { t } = useLocale();

  const links = [
    { label: "Email", href: `mailto:${person.email}`, value: person.email },
    person.linkedin && { label: "LinkedIn", href: person.linkedin, value: "/piero-atausinchi" },
    person.github && { label: "GitHub", href: person.github, value: "@atausinchi0411" },
  ].filter(Boolean) as { label: string; href: string; value: string }[];

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <SectionHead n="05" title={t(ui.contact)} />

        <p className={`lead ${s.contactLead}`}>{t(ui.contactLead)}</p>

        {/* Dos vías. Un reclutador y alguien con un encargo no buscan lo
            mismo, y una sola llamada a la acción deja fuera a uno de los dos. */}
        <div className={s.lanes}>
          <Reveal className={s.lane}>
            <span className={`eyebrow ${s.laneLabel}`}>{t(ui.laneHiring)}</span>
            <p className={s.laneText}>{t(ui.laneHiringText)}</p>
            <div className={s.laneActions}>
              {person.cv ? (
                <a href={person.cv} className={s.lanePrimary} download>
                  {t(ui.downloadCv)}
                </a>
              ) : (
                <a href={`mailto:${person.email}?subject=CV`} className={s.lanePrimary}>
                  {t(ui.cvPending)}
                </a>
              )}
              {person.linkedin && (
                <a href={person.linkedin} className={s.laneSecondary} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={80} className={s.lane}>
            <span className={`eyebrow ${s.laneLabel}`}>{t(ui.laneProject)}</span>
            <p className={s.laneText}>{t(ui.laneProjectText)}</p>
            <div className={s.laneActions}>
              <a href={`mailto:${person.email}`} className={s.lanePrimary}>
                {t(ui.writeToMe)}
              </a>
            </div>
          </Reveal>
        </div>

        <div className={s.contactGrid}>
          {links.map((link) => (
            <a key={link.label} href={link.href} className={s.contactCard}>
              <span className={`eyebrow ${s.contactLabel}`}>{link.label}</span>
              <span className={s.contactValue}>{link.value}</span>
              <svg className={s.contactArrow} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <title>abrir</title>
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.footerInner}`}>
        <span className={`mono ${s.dim}`}>
          © {year} {person.name} {person.lastName}
        </span>
        <span className={`mono ${s.dim}`}>Built from scratch. No template.</span>
      </div>
    </footer>
  );
}
