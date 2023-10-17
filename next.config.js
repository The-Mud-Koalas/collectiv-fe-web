/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nivo"],
  experimental: { esmExternals: 'loose' },
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BACKEND_URL}`.replace("https://", "")]
  }
}

module.exports = nextConfig
