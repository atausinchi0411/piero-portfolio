"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { L } from "@/content/types";
import { useLocale } from "@/lib/i18n";
import s from "./Sequence.module.css";

type Frame = { src: string; label: L };

type Props = {
  frames: Frame[];
  chrome?: string;
  /** Milisegundos por paso. */
  interval?: number;
};

/**
 * Encadena varias capturas de un mismo flujo dentro de un solo marco.
 *
 * Alternativa a un GIF: mantiene la calidad completa de cada PNG, pesa mucho
 * menos, y deja al lector parar y elegir el paso que quiera mirar. Si el
 * sistema pide menos movimiento, no avanza solo.
 */
export function Sequence({ frames, chrome, interval = 3000 }: Props) {
  const { t } = useLocale();
  const [activo, setActivo] = useState(0);
  const [corriendo, setCorriendo] = useState(true);
  const tocado = useRef(false);

  useEffect(() => {
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (menosMovimiento || !corriendo || frames.length < 2) return;

    const id = window.setInterval(() => {
      setActivo((i) => (i + 1) % frames.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [corriendo, frames.length, interval]);

  const elegir = (i: number) => {
    tocado.current = true;
    setCorriendo(false);
    setActivo(i);
  };

  return (
    <div className={s.wrap}>
      <figure
        className={s.frame}
        onMouseEnter={() => setCorriendo(false)}
        onMouseLeave={() => {
          if (!tocado.current) setCorriendo(true);
        }}
      >
        <div className={s.bar}>
          <span className={s.light} />
          <span className={s.light} />
          <span className={s.light} />
          {chrome && <span className={`mono ${s.chromeLabel}`}>{chrome}</span>}
          <span className={`mono ${s.counter}`}>
            {activo + 1}/{frames.length}
          </span>
        </div>

        <div className={s.canvas}>
          {frames.map((frame, i) => (
            <Image
              key={frame.src}
              src={frame.src}
              alt={t(frame.label)}
              fill
              sizes="(max-width: 860px) 100vw, 820px"
              className={s.img}
              data-on={i === activo}
              priority={i === 0}
            />
          ))}
        </div>
      </figure>

      <div className={s.steps}>
        {frames.map((frame, i) => (
          <button
            key={frame.src}
            type="button"
            className={s.step}
            data-on={i === activo}
            onClick={() => elegir(i)}
          >
            <span className={`mono ${s.stepNum}`}>{i + 1}</span>
            {t(frame.label)}
          </button>
        ))}
      </div>
    </div>
  );
}
