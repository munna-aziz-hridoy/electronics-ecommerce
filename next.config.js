/** @type {import('next').NextConfig} */

const dotenv = require('dotenv')

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
