"use client"

import { useState, useEffect, useRef } from "react"
import {
  Play,
  Pause,
  Pin,
  Clock,
  Star,
  GitFork,
  ExternalLink,
  MoreHorizontal,
  Grid3X3,
  List,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Eye,
  Globe,
  Code2
} from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchGitHubProjects, CategorizedProject } from "@/lib/github"
import { TopProject, toTopProject, computeProjectStats } from "@/data/topProjects"

interface LibrarySectionProps {
  setActiveSection?: (section: string) => void
  onSelectProject?: (project: CategorizedProject | null) => void
}

function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  return <span>{count.toLocaleString()}</span>
}

function ProjectScreenshot({ project, className = "" }: { project: TopProject; className?: string }) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const hasScreenshot = project.image && project.homepage && !imgError

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient background always visible as fallback */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

      {/* Language icon centered on gradient */}
      {!hasScreenshot && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Code2 size={48} className="text-white/30" />
        </div>
      )}

      {/* Screenshot image */}
      {hasScreenshot && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover object-top"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            unoptimized
          />
        </div>
      )}

      {/* Deployed badge */}
      {project.homepage && (
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 z-10">
          <Globe size={10} className="text-[#1DB954]" />
          <span className="text-[10px] text-white font-medium">Live</span>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index, isPlaying, onPlay, onCardClick }: {
  project: TopProject; index: number; isPlaying: boolean; onPlay: () => void; onCardClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`
        group relative bg-[#181818] rounded-lg p-4 cursor-pointer
        transition-all duration-300 ease-out
        hover:bg-[#282828] hover:shadow-xl hover:shadow-black/40
        ${isHovered ? 'scale-[1.02]' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.5s ease-out forwards',
        opacity: 0
      }}
    >
      {/* Album art - screenshot or gradient */}
      <div className="relative aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
        <ProjectScreenshot project={project} className="absolute inset-0" />

        {/* Shimmer on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
          transition-transform duration-700 ease-out
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `} />

        {/* Play button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPlay() }}
          className={`
            absolute bottom-2 right-2 w-12 h-12 rounded-full
            bg-[#1DB954] shadow-xl shadow-black/40 flex items-center justify-center
            transition-all duration-300 ease-out hover:scale-110 hover:bg-[#1ed760]
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          {isPlaying ? <Pause size={24} className="text-black" fill="black" /> : <Play size={24} className="text-black ml-1" fill="black" />}
        </button>

        {/* Status dot */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full z-10 ${project.status === 'active' ? 'bg-[#1DB954] animate-pulse' : 'bg-gray-500'}`} />
      </div>

      {/* Project info */}
      <h3 className="text-white font-bold text-base mb-1 truncate group-hover:text-[#1DB954] transition-colors">
        {project.name}
      </h3>
      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">{tech}</span>
        ))}
        {project.techStack.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-400">+{project.techStack.length - 3}</span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" />{project.stars}</span>
          <span className="flex items-center gap-1"><GitFork size={12} />{project.forks}</span>
        </div>
        {project.homepage && (
          <span className="flex items-center gap-1 text-[#1DB954]"><Globe size={12} />Deployed</span>
        )}
      </div>
    </div>
  )
}

function ProjectListItem({ project, index, isPlaying, onPlay, onCardClick }: {
  project: TopProject; index: number; isPlaying: boolean; onPlay: () => void; onCardClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group flex items-center gap-4 p-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-white/10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
      style={{
        animationDelay: `${index * 30}ms`,
        animation: 'fadeInLeft 0.4s ease-out forwards',
        opacity: 0
      }}
    >
      <div className="w-8 flex items-center justify-center">
        {isHovered ? (
          <button onClick={(e) => { e.stopPropagation(); onPlay() }} className="text-white hover:text-[#1DB954] transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        ) : (
          <span className={`text-sm ${isPlaying ? 'text-[#1DB954]' : 'text-gray-400'}`}>{index + 1}</span>
        )}
      </div>

      {/* Thumbnail - screenshot or gradient */}
      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
        <ProjectScreenshot project={project} className="absolute inset-0" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium truncate transition-colors ${isPlaying ? 'text-[#1DB954]' : 'text-white group-hover:text-white'}`}>
          {project.name}
        </h4>
        <p className="text-xs text-gray-400 truncate">{project.techStack.slice(0, 2).join(' / ')}</p>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Star size={12} className="text-yellow-500" />{project.stars}
        </span>
        {project.homepage && (
          <span className="flex items-center gap-1 text-[#1DB954]"><Globe size={10} /></span>
        )}
        <span className="w-16 text-right">
          {new Date(project.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  )
}

export function LibrarySection({ setActiveSection, onSelectProject }: LibrarySectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pinned' | 'recent' | 'deployed'>('all')
  const [allProjects, setAllProjects] = useState<TopProject[]>([])
  const [rawProjects, setRawProjects] = useState<CategorizedProject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        const data = await fetchGitHubProjects()
        const all = [
          ...data['Web Projects'],
          ...data['AI Projects'],
          ...data['Blockchain Projects'],
        ]
        // Deduplicate by URL
        const seen = new Set<string>()
        const unique = all.filter(p => {
          if (seen.has(p.url)) return false
          seen.add(p.url)
          return true
        })
        // Sort by stars then recency
        unique.sort((a, b) => b.stars - a.stars || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        setRawProjects(unique)
        setAllProjects(unique.map((p, i) => toTopProject(p, i)))
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const stats = computeProjectStats(allProjects)
  const deployedCount = allProjects.filter(p => p.homepage).length

  const filtered = allProjects.filter(p => {
    if (filter === 'pinned') return p.category === 'pinned'
    if (filter === 'recent') return p.category === 'recent'
    if (filter === 'deployed') return !!p.homepage
    return true
  })

  const pinnedProjects = filtered.filter(p => p.category === 'pinned' || filter === 'deployed' || filter === 'all')
  const recentProjects = filter === 'all' ? filtered.filter(p => p.category === 'recent') : []

  const handlePlay = (id: string) => setCurrentlyPlaying(currentlyPlaying === id ? null : id)

  return (
    <ScrollArea className="flex-1 bg-[#121212] text-white rounded-xl h-full">
      {/* Hero header */}
      <div className="bg-gradient-to-b from-[#1DB954]/30 via-[#1DB954]/10 to-[#121212] p-6 md:p-8">
        {/* Stats bar */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1DB954] to-green-700 flex items-center justify-center">
              <Code2 size={24} className="text-black" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{isLoading ? '...' : <AnimatedCounter value={stats.totalProjects} />}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Star size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{isLoading ? '...' : <AnimatedCounter value={stats.totalStars} />}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Stars</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <GitFork size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{isLoading ? '...' : <AnimatedCounter value={stats.totalForks} />}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Forks</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{isLoading ? '...' : <AnimatedCounter value={deployedCount} />}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Deployed</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-[#1DB954]" />
              Your Library
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">All Projects</h1>
            <p className="text-gray-400 mt-2">
              {allProjects.length} repos from GitHub / Live data
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Filters */}
            <div className="hidden md:flex items-center bg-white/5 rounded-full p-1">
              {(['all', 'recent', 'deployed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${filter === f ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center bg-white/5 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                <Grid3X3 size={18} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 pt-0 space-y-8">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Code2 size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Try a different filter</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isPlaying={currentlyPlaying === project.id}
                onPlay={() => handlePlay(project.id)}
                onCardClick={() => {
                  const raw = rawProjects.find(p => p.url === project.url)
                  if (raw && onSelectProject) onSelectProject(raw)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#181818] rounded-lg overflow-hidden">
            {filtered.map((project, index) => (
              <ProjectListItem
                key={project.id}
                project={project}
                index={index}
                isPlaying={currentlyPlaying === project.id}
                onPlay={() => handlePlay(project.id)}
                onCardClick={() => {
                  const raw = rawProjects.find(p => p.url === project.url)
                  if (raw && onSelectProject) onSelectProject(raw)
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ScrollArea>
  )
}
