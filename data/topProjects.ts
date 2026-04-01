// This file is now a re-export layer.
// Real project data is fetched from the GitHub API via lib/github.ts.
// The TopProject interface is kept for the LibrarySection component contract.

export interface TopProject {
  id: string
  name: string
  description: string
  image: string               // screenshot URL or gradient fallback
  gradient: string
  techStack: string[]
  stars: number
  forks: number
  url: string
  homepage: string | null
  category: 'pinned' | 'recent'
  status: 'active' | 'completed'
  lastUpdated: string
  language: string
}

// Gradient palette keyed by primary language
const LANGUAGE_GRADIENTS: Record<string, string> = {
  TypeScript: 'from-blue-500 to-blue-700',
  JavaScript: 'from-yellow-500 to-orange-600',
  Python: 'from-blue-400 to-green-500',
  Rust: 'from-orange-600 to-red-700',
  Solidity: 'from-gray-500 to-purple-600',
  Go: 'from-cyan-500 to-blue-600',
  Java: 'from-red-500 to-orange-600',
  'C++': 'from-blue-600 to-indigo-700',
  HTML: 'from-orange-500 to-red-500',
  CSS: 'from-blue-500 to-purple-500',
  R: 'from-blue-400 to-gray-600',
  Move: 'from-purple-500 to-indigo-700',
}

function gradientForLanguage(lang: string | null): string {
  if (lang && LANGUAGE_GRADIENTS[lang]) return LANGUAGE_GRADIENTS[lang]
  return 'from-[#1DB954] to-green-700'
}

import { CategorizedProject, getScreenshotImageUrl } from '@/lib/github'

/** Convert a CategorizedProject from the GitHub API into a TopProject for the UI. */
export function toTopProject(p: CategorizedProject, index: number): TopProject {
  const isRecent = new Date(p.updatedAt).getTime() > Date.now() - 90 * 24 * 60 * 60 * 1000 // last 90 days

  return {
    id: `gh-${index}-${p.title.replace(/\s+/g, '-').toLowerCase()}`,
    name: p.title,
    description: p.description,
    image: p.screenshotUrl || '',
    gradient: gradientForLanguage(p.language),
    techStack: [p.language, ...p.topics.slice(0, 3)].filter(Boolean),
    stars: p.stars,
    forks: p.forks,
    url: p.url,
    homepage: p.homepage,
    category: isRecent ? 'recent' : 'pinned',
    status: isRecent ? 'active' : 'completed',
    lastUpdated: p.updatedAt,
    language: p.language,
  }
}

/** Compute aggregate stats from a list of TopProjects. */
export function computeProjectStats(projects: TopProject[]) {
  return {
    totalStars: projects.reduce((acc, p) => acc + p.stars, 0),
    totalForks: projects.reduce((acc, p) => acc + p.forks, 0),
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
  }
}
