"use client"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  MoreHorizontal,
  Clock,
  Star,
  GitFork,
  ExternalLink,
  TrendingUp,
  Activity,
  Code2,
  Layers,
  ChevronDown,
  Search,
  SlidersHorizontal
} from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchGitHubProjects, CategorizedProject } from "@/lib/github"

interface TopProjectsSectionProps {
  setActiveSection?: (section: string) => void
}

// Sound wave animation component for "playing" projects
function SoundWave({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className={`flex items-end gap-[2px] h-4 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-[3px] bg-[#1DB954] rounded-full transition-all ${
            isPlaying ? 'animate-soundwave' : 'h-1'
          }`}
          style={{
            animationDelay: `${bar * 0.1}s`,
            height: isPlaying ? undefined : '4px'
          }}
        />
      ))}
    </div>
  )
}

// Enhanced project row with micro-interactions
function ProjectRow({
  project,
  index,
  isPlaying,
  onPlay
}: {
  project: CategorizedProject
  index: number
  isPlaying: boolean
  onPlay: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className={`
        group grid grid-cols-[40px_1fr_120px_100px_80px_40px] gap-4 items-center
        px-4 py-3 rounded-md cursor-pointer
        transition-all duration-200 ease-out
        ${isPlaying ? 'bg-white/10' : 'hover:bg-white/5'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(project.url, '_blank')}
      style={{
        animationDelay: `${index * 30}ms`,
        animation: 'slideInRow 0.3s ease-out forwards',
        opacity: 0
      }}
    >
      {/* Index / Play button */}
      <div className="flex items-center justify-center">
        {isHovered ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPlay()
            }}
            className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <Pause size={16} className="text-[#1DB954]" />
            ) : (
              <Play size={16} className="text-white ml-0.5" fill="currentColor" />
            )}
          </button>
        ) : isPlaying ? (
          <SoundWave isPlaying={isPlaying} />
        ) : (
          <span className="text-gray-400 text-sm">{index + 1}</span>
        )}
      </div>

      {/* Project info with thumbnail */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-[#282828]">
          <Image
            src={project.icon || '/placeholder-logo.png'}
            alt={project.title}
            fill
            sizes="40px"
            className="object-contain p-1"
          />
          {/* Hover overlay with play icon */}
          <div className={`
            absolute inset-0 bg-black/60 flex items-center justify-center
            transition-opacity duration-200
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <Play size={16} className="text-white" fill="white" />
          </div>
        </div>
        <div className="min-w-0">
          <h4 className={`
            text-sm font-medium truncate transition-colors
            ${isPlaying ? 'text-[#1DB954]' : 'text-white'}
          `}>
            {project.title}
          </h4>
          <p className="text-xs text-gray-400 truncate">
            {project.company}
          </p>
        </div>
      </div>

      {/* Tech stack */}
      <div className="text-sm text-gray-400 truncate">
        {project.type}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <Star size={12} className={`${project.stars > 50 ? 'text-yellow-500' : ''}`} />
          {project.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={12} />
          {project.forks}
        </span>
      </div>

      {/* Year */}
      <div className="text-sm text-gray-400">
        {project.duration}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation()
            window.open(project.url, '_blank')
          }}
          className={`
            p-1 rounded-full transition-all
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            hover:bg-white/10
          `}
        >
          <ExternalLink size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}

// Category tab button
function CategoryTab({
  label,
  count,
  isActive,
  onClick,
  gradient
}: {
  label: string
  count: number
  isActive: boolean
  onClick: () => void
  gradient: string
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-200
        ${isActive
          ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
          : 'text-gray-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {label}
      <span className={`
        ml-2 px-1.5 py-0.5 rounded-full text-[10px]
        ${isActive ? 'bg-white/20' : 'bg-white/10'}
      `}>
        {count}
      </span>
    </button>
  )
}

export function TopProjectsSection({ setActiveSection }: TopProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'AI Projects' | 'Web Projects' | 'Blockchain Projects'>('Web Projects')
  const [projects, setProjects] = useState<{
    'AI Projects': CategorizedProject[]
    'Web Projects': CategorizedProject[]
    'Blockchain Projects': CategorizedProject[]
  }>({
    'AI Projects': [],
    'Web Projects': [],
    'Blockchain Projects': []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [playingProject, setPlayingProject] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'stars' | 'recent' | 'forks'>('stars')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true)
      try {
        const data = await fetchGitHubProjects()
        setProjects(data)
      } catch (error) {
        console.error('Failed to load projects:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProjects()
  }, [])

  const currentProjects = projects[activeCategory] || []

  // Filter and sort projects
  const filteredProjects = currentProjects
    .filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars
      if (sortBy === 'forks') return b.forks - a.forks
      return parseInt(b.duration) - parseInt(a.duration)
    })

  const totalStats = {
    projects: Object.values(projects).flat().length,
    stars: Object.values(projects).flat().reduce((acc, p) => acc + p.stars, 0),
    forks: Object.values(projects).flat().reduce((acc, p) => acc + p.forks, 0)
  }

  const categoryGradients = {
    'AI Projects': 'from-purple-500 to-pink-600',
    'Web Projects': 'from-blue-500 to-cyan-500',
    'Blockchain Projects': 'from-amber-500 to-orange-600'
  }

  return (
    <ScrollArea className="flex-1 bg-[#121212] text-white rounded-xl h-full">
      {/* Header with dynamic gradient based on category */}
      <div className={`bg-gradient-to-b ${categoryGradients[activeCategory].replace('from-', 'from-').split(' ')[0]}/20 to-[#121212] p-6 md:p-8`}>
        {/* Stats banner */}
        <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 min-w-fit">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1DB954] to-green-600 flex items-center justify-center">
              <Layers size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalStats.projects}</p>
              <p className="text-xs text-gray-400">Projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 min-w-fit">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Star size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalStats.stars}</p>
              <p className="text-xs text-gray-400">Stars</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 min-w-fit">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <GitFork size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalStats.forks}</p>
              <p className="text-xs text-gray-400">Forks</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 min-w-fit">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{currentProjects.filter(p => parseInt(p.duration) >= 2024).length}</p>
              <p className="text-xs text-gray-400">Active</p>
            </div>
          </div>
        </div>

        {/* Title and controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Code2 size={14} className="text-[#1DB954]" />
              GitHub Collection
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Top Projects</h1>
          </div>

          {/* Search and sort controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/30 w-48"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white/5 border border-white/10 rounded-full px-4 py-2 pr-8 text-sm text-white focus:outline-none focus:border-white/30 cursor-pointer"
              >
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="recent">Most Recent</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2">
          {(['Web Projects', 'AI Projects', 'Blockchain Projects'] as const).map((category) => (
            <CategoryTab
              key={category}
              label={category.replace(' Projects', '')}
              count={projects[category]?.length || 0}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              gradient={categoryGradients[category]}
            />
          ))}
        </div>
      </div>

      {/* Projects table */}
      <div className="px-4 md:px-8 pb-8">
        {/* Table header */}
        <div className="grid grid-cols-[40px_1fr_120px_100px_80px_40px] gap-4 items-center px-4 py-2 text-xs text-gray-400 border-b border-white/10 sticky top-0 bg-[#121212] z-10">
          <div className="text-center">#</div>
          <div>Title</div>
          <div>Tech Stack</div>
          <div className="flex items-center gap-1">
            <TrendingUp size={12} />
            Stats
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            Year
          </div>
          <div></div>
        </div>

        {/* Project rows */}
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-2 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="grid grid-cols-[40px_1fr_120px_100px_80px_40px] gap-4 items-center px-4 py-3"
              >
                <div className="w-6 h-6 bg-white/5 rounded animate-pulse mx-auto" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-white/5 rounded animate-pulse" />
                    <div className="w-20 h-3 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
                <div className="w-24 h-4 bg-white/5 rounded animate-pulse" />
                <div className="w-16 h-4 bg-white/5 rounded animate-pulse" />
                <div className="w-12 h-4 bg-white/5 rounded animate-pulse" />
                <div className="w-6 h-6 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Code2 size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="mt-2">
            {filteredProjects.map((project, index) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={index}
                isPlaying={playingProject === project.title}
                onPlay={() => setPlayingProject(
                  playingProject === project.title ? null : project.title
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideInRow {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes soundwave {
          0%, 100% {
            height: 4px;
          }
          50% {
            height: 16px;
          }
        }

        .animate-soundwave {
          animation: soundwave 0.5s ease-in-out infinite;
        }
      `}</style>
    </ScrollArea>
  )
}
