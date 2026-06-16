import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/:path((?!yandex_).*)",
        has: [{ type: "host", value: "www.voitov.ru" }],
        destination: "https://voitov.ru/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.voitov.studio" }],
        destination: "https://voitov.ru/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "voitov.studio" }],
        destination: "https://voitov.ru/:path*",
        permanent: true,
      },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/kompleks", destination: "/services/", permanent: true },
      { source: "/strategy", destination: "/services/strategy/", permanent: true },
      { source: "/design", destination: "/services/design/", permanent: true },
      { source: "/digital", destination: "/services/digital/", permanent: true },
      { source: "/marketing", destination: "/services/marketing/", permanent: true },
      { source: "/raboti", destination: "/portfolio/", permanent: true },
      { source: "/detail_project", destination: "/portfolio/", permanent: true },
      { source: "/detail_news", destination: "/news/", permanent: true },
      { source: "/services.html", destination: "/services/", permanent: true },
      { source: "/portfolio.html", destination: "/portfolio/", permanent: true },
      { source: "/blog.html", destination: "/blog/", permanent: true },
      { source: "/news.html", destination: "/news/", permanent: true },
      { source: "/contacts.html", destination: "/contacts/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.website-files.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
};

export default nextConfig;
