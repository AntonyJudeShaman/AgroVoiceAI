/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    
    domains: ['lh3.googleusercontent.com','avatars.githubusercontent.com'],
    remotePatterns: [
      {
        // protocol: 'https',
        // hostname: 'avatars.githubusercontent.com',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}
