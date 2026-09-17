import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n";
import { person } from "@/content/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Serif de display, solo para titulares y nombres de proyecto.
 *
 * Inter en todo el sitio es correcto y no dice nada: es la fuente por defecto
 * de la mitad de los portafolios que existen. Un serif de alto contraste junto
 * a datos en mono lee a revista técnica, no a blog de diseño, que es
 * exactamente el sitio donde queremos caer. Si alguna vez molesta, se quita
 * borrando --font-display de globals.css y todo vuelve a Inter.
 */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const fullName = [person.name, person.lastName].filter(Boolean).join(" ");

/**
 * Base para las URL absolutas de metadatos (OG, sitemap). Vercel expone su
 * propio dominio en VERCEL_URL; en local cae al puerto de desarrollo.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${fullName} — Reliability & Automation Engineer`,
    template: `%s — ${fullName}`,
  },
  description:
    "Mechanical engineer working reliability in an underground mine near Barcelona, building the data pipelines and internal apps that replaced paper and guesswork.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: fullName,
    url: siteUrl,
  },
  twitter: { card: "summary_large_image" },
};

/**
 * Aplica el tema guardado antes del primer paint para que no haya destello
 * de claro cuando el usuario ha elegido oscuro.
 */
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("piero.theme");
    if (t === "light" || t === "dark") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint: se ejecuta antes del paint a propósito */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${display.variable}`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
