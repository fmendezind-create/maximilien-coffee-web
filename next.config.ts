import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholders actuales son SVG generados localmente.
    // Al reemplazar con fotografía real (JPG/WebP), esta config sigue funcionando sin cambios.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
