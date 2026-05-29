"use client"

import { useState, useEffect, Suspense } from "react"
import { Sidebar } from "../components/Sidebar"
import { MainContent } from "../components/MainContent"
import { PlayerControls } from "../components/PlayerControls"
import { RightSidebar } from "../components/RightSidebar"
import { TopBar } from "../components/TopBar"
import { PortalTour } from "../components/PortalTour"
import { MobileApp } from "../components/mobile/MobileApp"
import { SeoContent } from "../components/SeoContent"
import { useMediaQuery } from "../hooks/use-device"
import { useSearchParams } from "next/navigation"
import type { CategorizedProject } from "@/lib/github"
import { SECTION_TO_SLUG, SLUG_TO_SECTION } from "@/lib/sections"

const DEFAULT_SECTION = "Home"

// Component that handles Spotify token processing
function SpotifyTokenHandler() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const expiresIn = searchParams.get('expires_in')

    if (accessToken && refreshToken && expiresIn) {
      
      // Save tokens to localStorage in the new format
      const tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: Date.now() + parseInt(expiresIn) * 1000
      }
      localStorage.setItem('spotify_tokens', JSON.stringify(tokens))
      
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [searchParams])

  return null
}

export default function Home() {
  const [history, setHistory] = useState([DEFAULT_SECTION])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [activeSection, setActiveSectionState] = useState(DEFAULT_SECTION)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(240)
  const [rightSidebarWidth, setRightSidebarWidth] = useState(384)
  const [selectedProject, setSelectedProject] = useState<CategorizedProject | null>(null)

  // Layout switching. Phones (< md) get the Spotify-style mobile layout; md+ gets the
  // full desktop layout. `mounted` avoids a hydration flash before we know the viewport.
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  // Tablet range. Below `lg` we shrink the right panel so the main content never gets
  // crushed on an iPad-sized screen.
  const isTablet = useMediaQuery("(max-width: 1023px)")

  // Automatically open/close right sidebar based on active section
  // Don't auto-close if a project is selected (user clicked a project)
  useEffect(() => {
    if (selectedProject) return // keep sidebar open when viewing a project
    const fullPageSections = ["Home", "Your Library", "Achievements"]
    if (fullPageSections.includes(activeSection)) {
      setIsRightSidebarOpen(false)
    } else {
      setIsRightSidebarOpen(true)
    }
  }, [activeSection])

  // Hash <-> activeSection sync so sections are real shareable URLs
  useEffect(() => {
    const applyHash = () => {
      const slug = window.location.hash.replace(/^#/, "")
      const section = SLUG_TO_SECTION[slug]
      if (section && section !== activeSection) {
        setHistory((h) => [...h.slice(0, historyIndex + 1), section])
        setHistoryIndex((i) => i + 1)
        setActiveSectionState(section)
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const slug = SECTION_TO_SLUG[activeSection]
    if (slug === undefined) return
    const target = slug === "" ? window.location.pathname : `${window.location.pathname}#${slug}`
    if (window.location.pathname + window.location.hash !== target) {
      window.history.replaceState({}, "", target)
    }
  }, [activeSection])

  // Custom setActiveSection that manages history
  const setActiveSection = (section: string) => {
    if (section === activeSection) return
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(section)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setActiveSectionState(section)
  }

  // Go back in history
  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setActiveSectionState(history[newIndex])
    }
  }

  // Go forward in history
  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setActiveSectionState(history[newIndex])
    }
  }

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen)
  }
  const openRightSidebar = () => setIsRightSidebarOpen(true)

  const handleSelectProject = (project: CategorizedProject | null) => {
    setSelectedProject(project)
    if (project) setIsRightSidebarOpen(true)
  }

  // Avoid a flash of the desktop layout before we know the viewport.
  if (!mounted) {
    return <div className="h-screen w-full bg-black" />
  }

  // Phones: the real app, laid out like the Spotify mobile app (bottom tabs,
  // now-playing bar, full-screen pages). Same shared state as the desktop layout.
  if (isMobile) {
    return (
      <>
        <SeoContent />
        <Suspense fallback={null}>
          <SpotifyTokenHandler />
        </Suspense>
        <MobileApp
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          selectedProject={selectedProject}
          onSelectProject={handleSelectProject}
        />
      </>
    )
  }

  // On tablet, clamp the (wider) right panel so the main content keeps usable room
  // when a section's detail sidebar is open. The left nav keeps its normal width.
  const effectiveLeftWidth = leftSidebarWidth
  const effectiveRightWidth = isTablet ? Math.min(rightSidebarWidth, 320) : rightSidebarWidth

  return (
    <div className="flex flex-col h-screen bg-black">
      <SeoContent />
      <Suspense fallback={null}>
        <SpotifyTokenHandler />
      </Suspense>
      <TopBar onBack={goBack} onForward={goForward} canGoBack={historyIndex > 0} canGoForward={historyIndex < history.length - 1} setActiveSection={setActiveSection} />
      <div className="flex flex-1 overflow-hidden relative gap-2 px-2">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          width={effectiveLeftWidth}
          setWidth={setLeftSidebarWidth}
        />
        <div
          className="flex-1 min-w-0 flex flex-col transition-all duration-300"
          style={{ marginRight: isRightSidebarOpen ? effectiveRightWidth + 8 : 0 }}
        >
          <MainContent activeSection={activeSection} setActiveSection={setActiveSection} onOpenRightSidebar={openRightSidebar} onSelectProject={handleSelectProject} />
        </div>
        <RightSidebar
          isOpen={isRightSidebarOpen}
          onClose={() => { setIsRightSidebarOpen(false); setSelectedProject(null) }}
          setActiveSection={setActiveSection}
          width={effectiveRightWidth}
          setWidth={setRightSidebarWidth}
          selectedProject={selectedProject}
          onClearProject={() => setSelectedProject(null)}
        />
      </div>
      <div className="px-2 pb-2">
        <PlayerControls
          onToggleRightSidebar={toggleRightSidebar}
          isRightSidebarOpen={isRightSidebarOpen}
        />
      </div>
      <PortalTour />
    </div>
  )
}
