import { MetadataRoute } from 'next'

const siteUrl = 'https://agnij.dev'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Agnij Dutta Portfolio',
    short_name: 'Agnij Dutta',
    description: 'Full-stack developer and blockchain engineer from Kolkata, India. Building human-centered software at Workwise and HackQuest. IIT Madras Data Science student.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/profile.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/profile.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
    categories: ['portfolio', 'developer', 'technology'],
    lang: 'en-US',
    dir: 'ltr',
  }
}

