# Portfolio — Piero Atausinchi

Construido desde cero. Sin plantilla, sin librería de UI, sin licencia de terceros.
Next.js (App Router) + CSS propio.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Dónde se edita cada cosa

Para el 95% de los cambios solo tocas **un archivo**:

```
src/content/site.ts
```

Ahí viven el perfil, los proyectos, la experiencia, las habilidades y los idiomas.
Todo el texto visible es bilingüe: `{ en: "...", es: "..." }`. Si escribes solo uno de
los dos, TypeScript te avisa al compilar.

| Quiero… | Voy a… |
|---|---|
| Cambiar el titular | `hero.headline` |
| Cambiar los 4 números de arriba | `heroMetrics` |
| Añadir un proyecto | Nuevo objeto en `projects` |
| Reordenar proyectos | Mover el objeto dentro del array (el orden del array = el orden en pantalla) |
| Destacar un proyecto | `featured: true` |
| Añadir un trabajo | Nuevo objeto en `experience` |
| Poner mi foto | Guardar en `public/me/` y apuntar `person.photo` |
| Poner el CV | Guardar el PDF en `public/` y apuntar `person.cv` |

## Portadas — el sistema, y por qué es así

Cada proyecto declara **de qué medio es**, y el sitio dibuja la portada que le
corresponde. No todo proyecto tiene pantalla que capturar: una consultoría, una
macro de SAP o un tema de música no tienen interfaz, y nunca la van a tener.
Antes esos tres salían como un hueco tramado en medio de la parrilla.

```ts
cover: { kind: "shot",  src: "/screenshots/x.png", chrome: "App — Pantalla" }
cover: { kind: "flow",  inputs: [L, L, L], output: L }
cover: { kind: "steps", steps: [L...], repeat: "× 30", collapsesTo: L }
cover: { kind: "audio", title: "...", duration: "3:41" }   // duration opcional
cover: null                                                 // hueco honesto
```

| kind | Para qué | Quién lo usa hoy |
|---|---|---|
| `shot` | Hay pantalla real que enseñar | NexoIBP, Apto, Tracker, Kuestiona |
| `flow` | Análisis: N fuentes que se cruzan | AQUATERMICA |
| `steps` | Automatización: bucle manual que colapsa | Cierre masivo en SAP |
| `audio` | Música | Late Night Jazz |

Las tres portadas generadas se dibujan en CSS y SVG a partir del propio
contenido del caso, y escalan solas con container queries: la misma portada se
pinta a 260px en una tarjeta y a 640px en el destacado.

**Regla que no se rompe:** las generadas nunca llevan las tres luces de ventana.
Ese cromo dice "esto es una captura de una app". Ponerlo alrededor de un
diagrama sería una mentira pequeña y gratuita. Llevan una etiqueta que dice qué
son — ANÁLISIS, PROCESO, AUDIO.

Si algún día tienes captura de un proyecto que hoy usa `flow` o `steps`, cambias
el `cover` a `{ kind: "shot", ... }` y ya está. El resto del sitio no se entera.

## Capturas

Van en `public/screenshots/` y se referencian desde `cover` (grid) o desde un bloque
`{ kind: "shot" }` (detalle del proyecto).

Si `cover` es `null`, el sitio dibuja un hueco tramado que dice "captura pendiente".
**Eso es a propósito.** Nunca se rellena con una imagen de stock: un hueco honesto
comunica mejor que una foto prestada.

Recomendación para que se vean como un conjunto:
- Ancho ~1600px, proporción 16:10
- Recortar por arriba (el componente alinea `object-position: top`)
- Anonimizar datos de ICL antes de publicar

## Jerarquía de la parrilla

Los proyectos no salen todos iguales. El orden del array manda, y `featured`
decide el nivel:

1. **Primer `featured`** → tarjeta a ancho completo con la portada grande.
2. **Resto de `featured`** → tarjetas de dos columnas con portada.
3. **Todo lo demás** → índice de texto, sin portada. Se escanea en segundos y
   hace que las portadas de arriba conserven su valor.

## Sobre mí y los tres principios

`about.principles` en `site.ts`. Cada principio lleva un campo `proof` con el
`slug` del proyecto que lo demuestra, y el sitio pinta el enlace solo. **Si
cambias un principio, comprueba que el caso que lo respalda sigue diciendo lo
mismo** — sin ese enlace esto es una lista de frases bonitas.

## Imagen al compartir

`src/app/opengraph-image.tsx` genera la tarjeta de previsualización (LinkedIn,
WhatsApp, Slack) desde el mismo contenido de `site.ts`: si cambias el titular o
las métricas, cambia la imagen. No hay que mantener un PNG a mano.

En producción define `NEXT_PUBLIC_SITE_URL` con el dominio real, o deja que
Vercel use su propia `VERCEL_URL`.

## Estructura

```
src/
├── content/
│   ├── site.ts        ← lo que editas tú
│   └── types.ts       ← forma de los datos
├── lib/i18n.tsx       ← idioma EN/ES + copia de interfaz
├── app/
│   ├── globals.css    ← tokens de diseño (colores, espaciado, sombras)
│   ├── layout.tsx     ← fuentes y metadatos
│   ├── page.tsx       ← home
│   └── work/[slug]/   ← detalle de proyecto (se genera solo desde `projects`)
└── components/        ← cada componente con su .module.css al lado
```

## Diseño

Dirección: **hoja técnica**. Tipografía apretada, números en monoespaciada, un solo
color de señal (naranja). Los colores se definen como tokens en `globals.css` y se
redefinen para modo oscuro — no hay colores sueltos en los componentes.

El tema respeta la preferencia del sistema y se puede forzar con el botón del header.
La elección se guarda en `localStorage` y se aplica antes del primer paint.

## Pendiente

- [ ] Capturas reales de cada proyecto
- [ ] Foto propia en `public/me/`
- [ ] CV en PDF
- [ ] Confirmar fechas marcadas con `VERIFICAR` en `site.ts`
- [ ] Verificar que el GitHub enlazado es el correcto
- [ ] Decidir si el email de contacto es este o uno profesional
