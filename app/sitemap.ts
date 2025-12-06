import { MetadataRoute } from 'next'

const siteUrl = 'https://agnij.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    // Add more routes if you have separate pages in the future
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}

