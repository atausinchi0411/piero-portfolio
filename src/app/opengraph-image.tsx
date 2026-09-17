import { ImageResponse } from "next/og";
import { hero, person } from "@/content/site";

export const alt = "Piero Atausinchi — Reliability & Automation Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen de previsualización al compartir el enlace.
 *
 * Sin esto, pegar el sitio en LinkedIn o WhatsApp produce una tarjeta vacía,
 * que es exactamente donde más se va a compartir. Se genera desde el mismo
 * contenido que la página: si cambia el titular, cambia la imagen.
 */
export default function OpengraphImage() {
  const full = `${person.name} ${person.lastName}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f4f1ea",
        padding: 64,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ab3d0c" }} />
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#45454e",
          }}
        >
          {full}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 62,
          lineHeight: 1.1,
          letterSpacing: -2,
          color: "#16161a",
          maxWidth: 940,
        }}
      >
        {hero.headline.en}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ width: "100%", height: 1, background: "#cfc7b7" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 28, color: "#45454e" }}>{person.role.en}</div>
          <div style={{ fontSize: 22, color: "#74747f" }}>
            {person.location.en}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
