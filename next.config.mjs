/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Add domain here
  },
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY, // Ensure env variable is accessible
  },
}

export default nextConfig;

