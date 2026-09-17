import Image from "next/image";
import { Frame } from "./Frame";
import s from "./Shot.module.css";

type Props = {
  src: string;
  alt: string;
  /** Texto de la barra de la ventana. */
  chrome?: string;
  /** "card" para la grid (16:10), "wide" para el detalle (16:9). */
  ratio?: "card" | "wide";
  priority?: boolean;
};

/** Captura real dentro del marco común. Para los bloques del caso. */
export function Shot({ src, alt, chrome, ratio = "wide", priority = false }: Props) {
  return (
    <Frame variant="window" label={chrome} ratio={ratio}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1180px) calc(100vw - 40px), 1140px"
        quality={92}
        className={s.img}
        priority={priority}
      />
    </Frame>
  );
}
