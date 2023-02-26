/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { dev }) => {
    if (dev && Array.isArray(config.target) && config.target.includes("web")) {
      config.optimization.minimize = false;
      delete config.optimization.minimizer;
      config.target = ["web", "es2017"];
    }
    return config;
  },
};

if (!isProd) {
  nextConfig.experimental = {
    legacyBrowsers: false,
  };
}

module.exports = nextConfig;
