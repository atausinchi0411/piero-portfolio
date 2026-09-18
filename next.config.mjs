/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Next comprime a 75 por defecto. En capturas de cuadros de mando, con
    // texto de 10px, 75 produce papilla visible. 92 pesa más y se lee.
    qualities: [75, 92],
  },

  /**
   * El sitio anterior tenía páginas de verdad en estas rutas. Este es una
   * sola página con anclas, así que cualquiera que tenga el enlace guardado
   * —o Google, que las tiene indexadas— caía en un 404.
   *
   * Permanentes: le dicen al buscador que traslade la autoridad del enlace
   * viejo al nuevo en vez de dar la página por muerta.
   */
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/gallery/:path*", destination: "/", permanent: true },
      // El proyecto se llamaba "NexoIBP"; ahora es solo "Nexo".
      { source: "/work/nexo-ibp", destination: "/work/nexo", permanent: true },
      // El CV estuvo un rato en una ruta sin sufijo de idioma.
      { source: "/Piero_Atausinchi_CV.pdf",
        destination: "/Piero_Atausinchi_CV_ES.pdf", permanent: true },
    ];
  },

  // Permite compilar a otro directorio sin pisar el .next de un dev server
  // que esté corriendo: NEXT_DIST_DIR=.next-check npm run build
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
};

export default nextConfig;
