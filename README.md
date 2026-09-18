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
| Añadir un proyecto | Nuevo objeto en `projects` |
| Reordenar proyectos | Mover el objeto dentro del array (el orden del array = el orden en pantalla) |
| Destacar un proyecto | `featured: true` |
| Añadir un trabajo | Nuevo objeto en `experience` |
| Poner mi foto | Guardar en `public/me/` con **nombre nuevo** y apuntar `person.photo`. Si reutilizas el nombre, el CDN sigue sirviendo la vieja |
| Cambiar el CV | Editar `tools/generar-cv.py` y ejecutar `python tools/generar-cv.py` |

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
| `shot` | Hay pantalla real que enseñar | Nexo, Apto, Tracker, Kuestiona |
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

## CV

Se genera en español e inglés desde un único sitio:

```bash
python tools/generar-cv.py
```

El contenido vive en `tools/generar-cv.py`, no aquí. Salen
`public/Piero_Atausinchi_CV_ES.pdf` y `_EN.pdf`, y `person.cv` es bilingüe: la
web descarga el que corresponde al idioma activo.

Los dos idiomas comparten el molde de maquetación a propósito. Si viviera
duplicado, cualquier arreglo habría que hacerlo dos veces y una de las dos
versiones se quedaría atrás sin que nadie lo notara.

**No edites los PDF a mano.** Se regeneran y pierdes el cambio.

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

Dirección: **hoja técnica con titulares editoriales**. Instrument Serif solo en el
titular del hero, el nombre del proyecto destacado y el título del caso; Inter en
todo lo demás y JetBrains Mono en los datos. Un solo color de señal (naranja). Los
colores se definen como tokens en `globals.css` y se redefinen para modo oscuro —
no hay colores sueltos en los componentes.

La paleta está medida, no elegida a ojo. La separación fondo/tarjeta de ~1.05 es la
normal en GitHub, Stripe y Linear: **lo que dibuja una tarjeta es el borde**
(objetivo ≥1.45 contra su superficie) y la sombra. En oscuro no hay sombra que
ayude, así que ahí el escalón de superficie tiene que ser real (≥1.20). Todo el
texto pasa AA 4.5 sobre las tres superficies. Si cambias un color, vuelve a medir.

Movimiento: aparición al entrar en pantalla con `IntersectionObserver` y no con
`animation-timeline: view()`, porque el soporte todavía no es uniforme y esto es la
primera impresión del sitio. Todo respeta `prefers-reduced-motion`.

El tema respeta la preferencia del sistema y se puede forzar con el botón del header.
La elección se guarda en `localStorage` y se aplica antes del primer paint.

## Despliegue

```bash
npx vercel --prod
```

Sale del directorio de trabajo, no de git. El repo `atausinchi0411/piero-portfolio`
está **desconectado** del proyecto de Vercel a propósito: todavía contiene la
plantilla vieja, y conectado habría reconstruido el sitio desde ella en el primer
push. Si algún día lo reconectas, sube antes este proyecto a ese repo.

Para comprobar que el build pasa sin tumbar un dev server abierto:

```bash
NEXT_DIST_DIR=.next-check npx next build
```

## Pendiente

- [ ] Capturas de AQUATERMICA no hacen falta: usa portada `flow`. Las que sí
      faltarían son de proyectos futuros
- [ ] Cerrar el año del plan de AQUATERMICA — ver la nota en `site.ts`, no cuadra
      con haber salido en mar. 2023
- [ ] Arreglar en LinkedIn la fecha de entrada en ICL (dice oct. 2024, es oct. 2025)
      y el fin de Malta (sep. 2025)
- [ ] Decidir si el email de contacto es este o uno profesional
- [ ] Dominio propio, y entonces definir `NEXT_PUBLIC_SITE_URL`
