// @ts-check

const withNextIntl = require('next-intl/plugin')()

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})

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
// @ts-ignore
module.exports = withNextIntl(withPWA(config))
