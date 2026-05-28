// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// images: {
//   // domains: ["images.unsplash.com"],
// },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.41"],
  experimental: {
    workerThreads: true,
  },
};

export default nextConfig;
