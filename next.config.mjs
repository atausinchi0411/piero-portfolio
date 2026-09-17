/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Next comprime a 75 por defecto. En capturas de cuadros de mando, con
    // texto de 10px, 75 produce papilla visible. 92 pesa más y se lee.
    qualities: [75, 92],
  },
  // Permite compilar a otro directorio sin pisar el .next de un dev server
  // que esté corriendo: NEXT_DIST_DIR=.next-check npm run build
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
};

export default nextConfig;
