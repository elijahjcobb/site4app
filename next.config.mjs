/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    domains: [
      "is1-ssl.mzstatic.com",
      "is2-ssl.mzstatic.com",
      "is3-ssl.mzstatic.com",
      "is4-ssl.mzstatic.com",
      "is5-ssl.mzstatic.com",
      "via.placeholder.com",
      "avatars.githubusercontent.com",
    ],
  },
}

export default nextConfig
