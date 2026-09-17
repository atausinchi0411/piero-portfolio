"use client";

import Image from "next/image";
import { hero, person } from "@/content/site";
import { ui, useLocale } from "@/lib/i18n";
import s from "./Hero.module.css";

export function Hero() {
  const { t } = useLocale();
  const initials = `${person.name[0]}${person.lastName[0] ?? ""}`;

  return (
    <section className={`wrap ${s.hero}`}>
      <div className={s.main}>
        <p className={s.status}>
          <span className={s.pulse} aria-hidden="true" />
          <span className="mono">{t(person.available)}</span>
        </p>

        <h1 className={s.headline}>{t(hero.headline)}</h1>
        <p className={`lead ${s.sub}`}>{t(hero.sub)}</p>

        <div className={s.actions}>
          <a href="#work" className={s.primary}>
            {t(ui.selectedWork)}
          </a>
          <a href="#contact" className={s.secondary}>
            {t(ui.contact)}
          </a>
          {person.cv && (
            <a href={t(person.cv)} className={s.secondary} download>
              {t(ui.downloadCv)}
            </a>
          )}
        </div>
      </div>

      <aside className={s.side}>
        <div className={s.portrait}>
          {person.photo ? (
            <Image
              src={person.photo}
              alt={`${person.name} ${person.lastName}`}
              fill
              sizes="(max-width: 860px) 96px, 200px"
              quality={90}
              className={s.portraitImg}
              priority
            />
          ) : (
            <span className={`mono ${s.initials}`} aria-hidden="true">
              {initials}
            </span>
          )}
        </div>
        <p className={`mono ${s.where}`}>{t(person.location)}</p>
      </aside>

    </section>
  );
}
