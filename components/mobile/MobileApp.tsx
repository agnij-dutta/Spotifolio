"use client"

import { useState } from "react"
import { ChevronLeft, X, Download, User, Bell, Clock } from "lucide-react"
import type { CategorizedProject } from "@/lib/github"
import { MainContent } from "../MainContent"
import { MobileSearch } from "./MobileSearch"
import { MobileMiniPlayer } from "./MobileMiniPlayer"
import { MobileBottomNav, type MobileTab } from "./MobileBottomNav"
import { AboutPanel, ProjectDetailPanel, AboutModal, aboutData } from "../RightSidebar"

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1ATfZjD1YXQlBkNpUVVPtonMGkCvjYo-A"
const RESUME_FILENAME = "Agnij_Dutta_SoftwareDeveloper-2.pdf"

const menuSections = [
  "Home",
  "Your Library",
  "Achievements",
  "Education",
  "Work Experience",
  "AI Projects",
  "Web Projects",
  "Blockchain Projects",
  "Skills & Tools",
  "Contact",
]

interface MobileAppProps {
  activeSection: string
  setActiveSection: (section: string) => void
  selectedProject: CategorizedProject | null
  onSelectProject: (project: CategorizedProject | null) => void
}

export function MobileApp({
  activeSection,
  setActiveSection,
  selectedProject,
  onSelectProject,
}: MobileAppProps) {
  const [tab, setTab] = useState<MobileTab>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)

  // Which bottom tab is highlighted.
  const activeTab: MobileTab =
    tab === "search" ? "search" : activeSection === "Your Library" ? "library" : "home"

  const handleBottomNav = (next: MobileTab) => {
    if (next === "home") setActiveSection("Home")
    if (next === "library") setActiveSection("Your Library")
    setTab(next)
  }

  // Navigate to a section from search / menu and surface it in the home stack.
  const navigateTo = (section: string) => {
    setActiveSection(section)
    setMenuOpen(false)
    setTab(section === "Your Library" ? "library" : "home")
  }

  const onHomeRoot = tab === "home" && activeSection === "Home"
  const onLibraryRoot = activeSection === "Your Library"
  const showBackBar = tab !== "search" && !onHomeRoot && !onLibraryRoot

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-black text-white">
      {/* Top bar (search tab has its own header) */}
      {tab !== "search" && (
        <header className="flex items-center gap-3 px-4 py-3">
          {showBackBar ? (
            <>
              <button
                onClick={() => setActiveSection("Home")}
                aria-label="Back"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40"
              >
                <ChevronLeft size={22} className="text-white" />
              </button>
              <span className="truncate text-base font-bold">{activeSection}</span>
            </>
          ) : (
            <>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="flex-shrink-0 rounded-full ring-2 ring-transparent active:ring-white/30"
              >
                <img src={aboutData.avatar} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
              </button>
              <span className="text-xl font-bold">{onLibraryRoot ? "Your Library" : "Home"}</span>
              <div className="ml-auto flex items-center gap-4 text-white/80">
                <Bell size={22} />
                <Clock size={22} />
              </div>
            </>
          )}
        </header>
      )}

      {/* Content */}
      <div className="flex min-h-0 flex-1">
        {tab === "search" ? (
          <MobileSearch setActiveSection={navigateTo} />
        ) : (
          <MainContent
            activeSection={onLibraryRoot ? "Your Library" : activeSection}
            setActiveSection={(s) => navigateTo(s)}
            onOpenRightSidebar={() => setAboutOpen(true)}
            onSelectProject={onSelectProject}
          />
        )}
      </div>

      {/* Now playing + tabs */}
      <div className="flex-shrink-0 pt-1">
        <MobileMiniPlayer />
        <MobileBottomNav active={activeTab} onSelect={handleBottomNav} />
      </div>

      {/* ---- Full-screen project detail overlay ---- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#121212]">
          <ProjectDetailPanel
            project={selectedProject}
            onBack={() => onSelectProject(null)}
            setActiveSection={navigateTo}
          />
        </div>
      )}

      {/* ---- Full-screen About overlay ---- */}
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#121212]">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => setAboutOpen(false)}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40"
            >
              <ChevronLeft size={22} className="text-white" />
            </button>
            <span className="text-base font-bold">About the artist</span>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <AboutPanel onAboutOpen={() => setBioOpen(true)} setActiveSection={navigateTo} />
          </div>
          <AboutModal open={bioOpen} onOpenChange={setBioOpen} />
        </div>
      )}

      {/* ---- Slide-down menu sheet ---- */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-x-0 top-0 max-h-[88vh] overflow-y-auto rounded-b-2xl bg-[#181818] pb-6 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <img src={aboutData.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="truncate text-lg font-bold">{aboutData.name}</p>
                <p className="truncate text-sm text-[#a7a7a7]">{aboutData.tagline}</p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="ml-auto text-white/70"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="px-2 py-2">
              {menuSections.map((section) => (
                <button
                  key={section}
                  onClick={() => navigateTo(section)}
                  className={`block w-full rounded-md px-4 py-3 text-left text-base font-medium active:bg-white/10 ${
                    activeSection === section ? "text-[#1DB954]" : "text-white"
                  }`}
                >
                  {section}
                </button>
              ))}

              <div className="my-2 border-t border-white/10" />

              <button
                onClick={() => {
                  setMenuOpen(false)
                  setAboutOpen(true)
                }}
                className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-base font-medium text-white active:bg-white/10"
              >
                <User size={20} className="text-[#a7a7a7]" />
                About the artist
              </button>
              <a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-base font-medium text-white active:bg-white/10"
              >
                <Download size={20} className="text-[#1DB954]" />
                Download résumé
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
