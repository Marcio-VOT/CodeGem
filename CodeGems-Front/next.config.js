/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GITHUB_CLIENT_ID: 'ed2005b1d02b655bd369',

    GOOGLE_CLIENT_ID:
      '608225703044-pn94jenk7he8jn9r3l9akra29049q6h2.apps.googleusercontent.com',

    BACKEND_URL: 'http://localhost:4000',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
    ],
  },
}

module.exports = nextConfig
