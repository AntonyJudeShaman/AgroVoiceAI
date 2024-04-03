// @ts-check

const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}

module.exports = withNextIntl(config)
