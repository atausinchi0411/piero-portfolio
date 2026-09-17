"use client";

import Image from "next/image";
import type { Cover as CoverSpec } from "@/content/types";
import { ui, useLocale } from "@/lib/i18n";
import { Frame } from "./Frame";
import s from "./Cover.module.css";

type Props = {
  cover: CoverSpec | null;
  /** Nombre del proyecto: alt de la imagen y fallback de la barra. */
  title: string;
  ratio?: "card" | "wide";
  fill?: boolean;
  priority?: boolean;
};

/* --------------------------------------------------------------- flow ---
   Trabajo de análisis: varias fuentes que solo responden la pregunta cuando
   se cruzan. El diagrama es el proyecto, no una ilustración del proyecto.  */

function Flow({ inputs, output }: { inputs: string[]; output: string }) {
  // Las curvas salen repartidas por el alto y entran todas al mismo punto.
  const y = inputs.map((_, i) => ((i + 0.5) / inputs.length) * 100);

  return (
    <div className={s.flow}>
      <ul className={s.flowIn}>
        {inputs.map((label, i) => (
          <li key={label} className={s.node}>
            <span className={`mono ${s.nodeIndex}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={s.nodeText}>{label}</span>
          </li>
        ))}
      </ul>

      <svg className={s.wires} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <title>conexiones</title>
        {y.map((from, i) => (
          <path
            key={from}
            d={`M0 ${from} C 55 ${from}, 45 50, 100 50`}
            className={s.wire}
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
          />
        ))}
      </svg>

      <div className={s.flowOut}>
        <span className={s.outDot} aria-hidden="true" />
        <span className={s.outText}>{output}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- steps ---
   Automatización: una secuencia manual que se repite hasta comerse la tarde,
   y la misma secuencia después de automatizarla.                          */

function Steps({ steps, repeat, collapsesTo }: { steps: string[]; repeat: string; collapsesTo: string }) {
  return (
    <div className={s.steps}>
      <ol className={s.stepRow}>
        {steps.map((step) => (
          <li key={step} className={`mono ${s.step}`}>
            {step}
          </li>
        ))}
        <li className={`mono ${s.repeat}`} aria-label={`repetido ${repeat}`}>
          {repeat}
        </li>
      </ol>

      <div className={s.collapse} aria-hidden="true">
        <span className={s.collapseLine} />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <title>se convierte en</title>
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
        <span className={s.collapseLine} />
      </div>

      <p className={`mono ${s.result}`}>{collapsesTo}</p>
    </div>
  );
}

/* -------------------------------------------------------------- audio --- */

/** Alturas deterministas: el servidor y el cliente deben pintar lo mismo. */
function waveform(seed: string, count: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return Array.from({ length: count }, (_, i) => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    const noise = ((h >>> 8) % 1000) / 1000;
    // Envolvente suave para que parezca una pieza y no ruido blanco.
    const envelope = Math.sin((i / count) * Math.PI) ** 0.55;
    return 14 + noise * 62 * envelope + envelope * 22;
  });
}

function Audio({ title, duration }: { title: string; duration?: string }) {
  const bars = waveform(title, 56);

  return (
    <div className={s.audio}>
      <div className={s.wave} aria-hidden="true">
        {bars.map((height, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: la forma es estática
            key={i}
            className={s.bar}
            style={{ height: `${height}%`, animationDelay: `${i * 0.011}s` }}
          />
        ))}
      </div>
      <p className={s.audioMeta}>
        <span className={s.audioTitle}>{title}</span>
        {duration && <span className={`mono ${s.audioTime}`}>{duration}</span>}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ dispatch --- */

export function Cover({ cover, title, ratio = "card", fill = false, priority = false }: Props) {
  const { t } = useLocale();

  if (!cover) {
    return (
      <Frame variant="panel" ratio={ratio} fill={fill}>
        <div className={s.pending}>
          <span className={`mono ${s.pendingText}`}>{t(ui.shotPending)}</span>
        </div>
      </Frame>
    );
  }

  if (cover.kind === "shot") {
    return (
      <Frame variant="window" label={cover.chrome ?? title} ratio={ratio} fill={fill}>
        <Image
          src={cover.src}
          alt={title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 560px"
          className={s.img}
          priority={priority}
        />
      </Frame>
    );
  }

  if (cover.kind === "flow") {
    return (
      <Frame variant="panel" label={t(ui.coverAnalysis)} ratio={ratio} fill={fill}>
        <Flow inputs={cover.inputs.map(t)} output={t(cover.output)} />
      </Frame>
    );
  }

  if (cover.kind === "steps") {
    return (
      <Frame variant="panel" label={t(ui.coverProcess)} ratio={ratio} fill={fill}>
        <Steps steps={cover.steps.map(t)} repeat={cover.repeat} collapsesTo={t(cover.collapsesTo)} />
      </Frame>
    );
  }

  return (
    <Frame variant="panel" label={t(ui.coverAudio)} ratio={ratio} fill={fill}>
      <Audio title={cover.title} duration={cover.duration} />
    </Frame>
  );
}
