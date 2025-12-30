/** @type {import('next').nextConfig} */
const nextConfig = {
  reactCompiler: true,

  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  assetPrefix:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_ENV_URL
      : undefined,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "darpanmagazineadmin.eclickprojects.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.darpanmagazine.com",
        pathname: "/**",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL,
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
  },
};

export default nextConfig;
