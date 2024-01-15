/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_SECRET: process.env.NEXT_PUBLIC_API_SECRET,
  },
}

module.exports = nextConfig
