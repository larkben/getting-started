/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true
    }
    return config
  }
}

module.exports = nextConfig
