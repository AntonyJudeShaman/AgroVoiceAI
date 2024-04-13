import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/_next', '/_vercel']
    },
    sitemap: 'https://agrovoiceai.vercel.app/sitemap.xml'
  }
}

//
//               _          _                        _           _        ____  _
//              / \   _ __ | |_ ___  _ __  _   _    (_)_   _  __| | ___  / ___|| |__   __ _ _ __ ___   __ _ _ __
//             / _ \ | '_ \| __/ _ \| '_ \| | | |   | | | | |/ _` |/ _ \ \___ \| '_ \ / _` | '_ ` _ \ / _` | '_ \
//            / ___ \| | | | || (_) | | | | |_| |   | | |_| | (_| |  __/  ___) | | | | (_| | | | | | | (_| | | | |
//           /_/   \_\_| |_|\__\___/|_| |_|\__, |  _/ |\__,_|\__,_|\___| |____/|_| |_|\__,_|_| |_| |_|\__,_|_| |_|
//                                          |___/  |__/
//
