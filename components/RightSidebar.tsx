"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, ChevronLeft, ExternalLink, Star, GitFork, Globe, Code2, Calendar, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea as ModalScrollArea } from "@/components/ui/scroll-area"
import { MapPin } from "lucide-react"
import Image from "next/image"
import type { CategorizedProject } from "@/lib/github"

interface RightSidebarProps {
  isOpen: boolean
  onClose: () => void
  setActiveSection?: (section: string) => void
  width: number
  setWidth: (width: number) => void
  selectedProject?: CategorizedProject | null
  onClearProject?: () => void
}

export function RightSidebar({ isOpen, onClose, setActiveSection, width, setWidth, selectedProject, onClearProject }: RightSidebarProps) {
  const [hovered, setHovered] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  if (!isOpen) return null

  return (
    <div
      className="absolute right-2 top-0 h-full bg-[#121212] text-white z-30 group rounded-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: width, transition: 'width 0.3s', height: '100%', top: 0 }}
    >
      {/* Collapse button */}
      <button
        onClick={onClose}
        className={`absolute top-4 left-4 z-40 bg-black/70 p-2 rounded-full transition-opacity ${hovered ? 'opacity-100' : 'opacity-0'}`}
        title="Collapse sidebar"
      >
        <ChevronRight size={24} />
      </button>

      {/* Resize handle */}
      <div
        className="absolute left-0 top-0 w-1 h-full cursor-col-resize hover:bg-white/20 transition-colors z-50"
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
          const startX = e.clientX
          const startWidth = width
          const handleMouseMove = (e: MouseEvent) => {
            const newWidth = Math.max(300, Math.min(500, startWidth - (e.clientX - startX)))
            setWidth(newWidth)
          }
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }
          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        }}
      />

      <ScrollArea className="h-full">
        {selectedProject ? (
          <ProjectDetailPanel
            project={selectedProject}
            onBack={onClearProject}
            setActiveSection={setActiveSection}
          />
        ) : (
          <AboutPanel
            onAboutOpen={() => setAboutOpen(true)}
            setActiveSection={setActiveSection}
          />
        )}
      </ScrollArea>

      {/* About modal */}
      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
    </div>
  )
}

// ---- PROJECT DETAIL PANEL ----
export function ProjectDetailPanel({ project, onBack, setActiveSection }: {
  project: CategorizedProject
  onBack?: () => void
  setActiveSection?: (section: string) => void
}) {
  // Two-attempt image strategy: try screenshotUrl first, fall back to ogImageUrl
  const initialSrc = project.screenshotUrl && project.homepage
    ? project.screenshotUrl
    : project.ogImageUrl ?? null
  const [currentSrc, setCurrentSrc] = useState<string | null>(initialSrc)
  const [triedFallback, setTriedFallback] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleImgError = () => {
    if (!triedFallback && project.ogImageUrl && currentSrc !== project.ogImageUrl) {
      setCurrentSrc(project.ogImageUrl)
      setTriedFallback(true)
      setImgLoaded(false)
    } else {
      setCurrentSrc(null)
    }
  }

  const hasImage = !!currentSrc
  const description = project.description && project.description.trim().length > 0
    ? project.description
    : `A ${project.language ?? 'code'} project by Agnij Dutta.`

  return (
    <div className="p-0">
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#a7a7a7] hover:text-white px-6 pt-4 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to profile
        </button>
      )}

      {/* Screenshot header */}
      <div className="relative w-full aspect-video overflow-hidden shadow-2xl shadow-black/40">
        {hasImage ? (
          <>
            <div className="absolute inset-0 bg-[#282828] rounded-md" />
            <div className={`absolute inset-0 transition-opacity duration-500 rounded-md overflow-hidden ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src={currentSrc!}
                alt={project.title}
                fill
                sizes="400px"
                className="object-cover object-top"
                onLoad={() => setImgLoaded(true)}
                onError={handleImgError}
                unoptimized
              />
            </div>
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#121212] to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#282828] to-[#121212] flex items-center justify-center">
            <Code2 size={64} className="text-white/10" />
          </div>
        )}

        {/* Live badge */}
        {project.homepage && (
          <div className="absolute top-4 right-4 bg-[#1DB954] rounded-full px-3 py-1 flex items-center gap-1.5">
            <Globe size={12} className="text-black" />
            <span className="text-xs font-bold text-black">Live</span>
          </div>
        )}

        {/* Floating play-style CTA inside preview */}
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 flex items-center justify-center shadow-xl shadow-black/50 transition-all"
            title="Visit live site"
          >
            <Globe size={20} className="text-black" />
          </a>
        )}
      </div>

      {/* Project info */}
      <div className="px-6 -mt-4 relative z-10">
        <h2 className="text-2xl font-bold">{project.title}</h2>

        {/* Quick chip row: Live + Source */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] text-xs text-white transition-colors"
            >
              <Globe size={12} />
              Live
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] text-xs text-white transition-colors"
          >
            <Code2 size={12} />
            Source
          </a>
        </div>

        <p className="text-sm text-[#e7e7e7] mt-3 leading-relaxed">{description}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-4 text-sm text-[#a7a7a7]">
          {project.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500" />
              {project.stars} stars
            </span>
          )}
          {project.forks > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={14} />
              {project.forks} forks
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {project.duration}
          </span>
        </div>

        {/* Language & tech */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.language && project.language !== 'Unknown' && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-[#282828] text-white font-medium">
              {project.language}
            </span>
          )}
          {project.topics.slice(0, 5).map(topic => (
            <span key={topic} className="text-xs px-3 py-1.5 rounded-full bg-[#282828] text-[#a7a7a7]">
              {topic}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 mt-6">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-6 rounded-full transition-colors"
            >
              <Globe size={16} />
              Visit Live Site
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-transparent border border-[#727272] hover:border-white text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            <Code2 size={16} />
            View Source Code
          </a>
        </div>

        {/* Category link */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-[#a7a7a7] uppercase tracking-wider mb-2">Category</p>
          <p className="text-sm text-white">{project.company}</p>
        </div>

        {/* Tech stack detail */}
        {project.type && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-[#a7a7a7] uppercase tracking-wider mb-2">Tech Stack</p>
            <p className="text-sm text-white">{project.type}</p>
          </div>
        )}
      </div>

      <div className="h-8" />
    </div>
  )
}

// ---- ABOUT PANEL (default) ----
export const aboutData = {
  name: "Agnij Dutta",
  tagline: "Building meaningful things with code.",
  backgroundImage: "https://github.com/agnij-dutta/agnij-dutta/blob/main/background-mic.jpeg?raw=true",
  avatar: "https://avatars.githubusercontent.com/u/126397667?v=4",
  shortBio: "Hi, I'm Agnij, a passionate software engineer currently pursuing...",
  fullBio: `Hi, I'm Agnij, a passionate software engineer currently pursuing my Bachelor's in Data Science at IIT Madras. I love building at the intersection of AI, Web3, and software engineering—bringing together smart systems, scalable backends, and intuitive frontends. Whether it's crafting seamless UIs with React and Next.js, developing intelligent solutions with machine learning and NLP, or building smart contracts and decentralized apps on Ethereum and Solana, I'm always exploring new ways to turn ideas into impactful products. Beyond code, I'm a part-time poet who believes that creativity and logic can—and should—coexist. I'm constantly learning, deeply curious, and always open to opportunities where I can grow, collaborate, and build something meaningful.`,
  education: {
    title: "Bachelor's Data Science and AI Applications",
    institute: "Indian Institute of Technology, Madras",
    major: "Data Science | Machine Learning"
  },
  workExperiences: [
    { date: "2025", title: "SDE Intern", company: "Workwise", description: "Built features to boost admin productivity by 85%" },
    { date: "2024", title: "Developer Advocate", company: "HackQuest", description: "Community growth and maintenance" },
    { date: "2023", title: "Data Science Intern", company: "Project Control & Systems", description: "Increased customer retention by 20%" },
  ]
}

export function AboutPanel({ onAboutOpen, setActiveSection }: { onAboutOpen: () => void; setActiveSection?: (section: string) => void }) {
  const goToEducation = () => setActiveSection?.("Education")
  const goToWorkExperience = () => setActiveSection?.("Work Experience")

  return (
    <div className="p-0">
      {/* Background image */}
      <div className="relative w-full" style={{ height: 340 }}>
        <div
          className="w-full h-full bg-cover bg-center rounded-t-xl"
          style={{ backgroundImage: `url(${aboutData.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute top-2 left-6">
          <h2 className="text-2xl font-bold text-white">About The Artist</h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
      </div>

      {/* Name + avatar */}
      <div
        className="flex flex-col gap-2 px-6 -mt-12 mb-2 relative z-10 cursor-pointer hover:bg-[#232323] rounded-xl transition-colors"
        onClick={onAboutOpen}
      >
        <div className="flex items-center">
          <img
            src={aboutData.avatar}
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-black shadow-lg object-cover mr-4"
          />
          <div>
            <h2 className="text-3xl font-bold leading-tight hover:underline">{aboutData.name}</h2>
            <p className="text-sm text-[#a7a7a7] mt-1">{aboutData.tagline}</p>
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed mb-2">
          {aboutData.shortBio} <button className="text-[#1DB954] underline ml-1" onClick={e => { e.stopPropagation(); onAboutOpen() }}>View more</button>
        </p>
      </div>

      {/* Location */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-3 text-sm text-[#a7a7a7]">
          <MapPin size={16} className="text-[#1DB954]" />
          Kolkata, India
        </div>
      </div>

      {/* Credits */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Credits</h3>
          <button className="text-xs font-bold uppercase tracking-wider text-[#a7a7a7] hover:text-white transition-colors" onClick={goToEducation}>Show all</button>
        </div>
        <div className="bg-[#1F1F1F] p-4 rounded-lg cursor-pointer hover:bg-[#2A2A2A] transition-colors" onClick={goToEducation}>
          <h4 className="font-medium text-white mb-1">{aboutData.education.institute}</h4>
          <p className="text-sm text-[#a7a7a7]">{aboutData.education.title}</p>
          <button className="mt-2 px-4 py-1 border border-[#727272] rounded-full text-sm hover:border-white transition-colors">
            Follow
          </button>
        </div>
      </div>

      {/* On Tour */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">On tour</h3>
          <button className="text-xs font-bold uppercase tracking-wider text-[#a7a7a7] hover:text-white transition-colors" onClick={goToWorkExperience}>Show all</button>
        </div>
        <div className="space-y-4">
          {aboutData.workExperiences.map((exp, i) => (
            <div key={i} className="flex items-start space-x-4 cursor-pointer hover:bg-[#1F1F1F] p-2 rounded transition-colors" onClick={goToWorkExperience}>
              <div className="text-center">
                <div className="text-sm text-[#a7a7a7]">Jan</div>
                <div className="text-2xl font-bold">{exp.date.slice(-2)}</div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{exp.title}</h4>
                <p className="text-sm text-[#a7a7a7]">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- ABOUT MODAL ----
export function AboutModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40" />
      <DialogContent className="bg-[#181818] rounded-2xl max-w-3xl w-full p-0 text-white flex flex-row items-stretch shadow-2xl border-none overflow-hidden">
        <DialogTitle className="sr-only">{aboutData.name}</DialogTitle>
        <div className="flex flex-col items-center justify-center w-80 min-w-[320px] bg-[#232323] p-8 border-r border-[#222]">
          <img src={aboutData.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-black shadow-lg object-cover mb-4" />
          <h2 className="text-2xl font-bold mb-1 text-center">{aboutData.name}</h2>
          <p className="text-base text-[#a7a7a7] mb-6 text-center">{aboutData.tagline}</p>
          <div className="flex items-center gap-3">
            <MapPin className="text-[#1DB954]" size={22} />
            <div>
              <div className="text-lg font-semibold">Kolkata, IN</div>
              <div className="text-xs text-[#a7a7a7]">Location</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-8 flex flex-col">
          <ModalScrollArea className="h-full max-h-[1200px] pr-2">
            <div className="text-base text-gray-300 whitespace-pre-line text-left leading-relaxed">
              {aboutData.fullBio}
            </div>
          </ModalScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
