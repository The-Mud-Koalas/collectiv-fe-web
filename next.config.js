/** @type {import('next').NextConfig} */
console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BACKEND_URL}`.replace("https://", "")]
  }
}

module.exports = nextConfig
