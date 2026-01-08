"use client"

import { useState, useEffect, Suspense } from "react"
import { Sidebar } from "../components/Sidebar"
import { MainContent } from "../components/MainContent"
import { PlayerControls } from "../components/PlayerControls"
import { RightSidebar } from "../components/RightSidebar"
import { TopBar } from "../components/TopBar"
import { useSearchParams } from "next/navigation"

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

  // Automatically open/close right sidebar based on active section
  useEffect(() => {
    if (activeSection === "Home") {
      setIsRightSidebarOpen(false)
    } else {
      setIsRightSidebarOpen(true)
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

  return (
    <div className="flex flex-col h-screen bg-black">
      <section className="sr-only" aria-label="Portfolio introduction">
        <h1>
          Agnij Dutta | Full-stack Developer & Blockchain Engineer
        </h1>
        <p>
          Agnij Dutta is a full-stack developer and blockchain engineer from Kolkata, India. 
          Currently pursuing a Bachelor's degree in Data Science and AI Applications at the 
          <a href="https://www.iitm.ac.in" rel="noopener noreferrer" target="_blank"> Indian Institute of Technology Madras</a> (IIT Madras). Building human-centered software 
          solutions at <a href="https://workwise.io" rel="noopener noreferrer" target="_blank">Workwise</a> as an SDE Intern and contributing to community growth at 
          <a href="https://hackquest.io" rel="noopener noreferrer" target="_blank"> HackQuest</a> as a Developer Advocate. Specializes in <a href="https://react.dev" rel="noopener noreferrer" target="_blank">React</a>, <a href="https://nextjs.org" rel="noopener noreferrer" target="_blank">Next.js</a>, <a href="https://www.typescriptlang.org" rel="noopener noreferrer" target="_blank">TypeScript</a>, 
          blockchain protocols, smart contracts, machine learning, and data science. Connect on <a href="https://linkedin.com/in/agnij-dutta" rel="noopener noreferrer" target="_blank">LinkedIn</a> or <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank">GitHub</a>.
        </p>
        <h2>Professional Experience</h2>
        <ul>
          <li><a href="https://workwise.io" rel="noopener noreferrer" target="_blank">SDE Intern at Workwise</a> - Built features to boost admin productivity by 85%</li>
          <li><a href="https://hackquest.io" rel="noopener noreferrer" target="_blank">Developer Advocate at HackQuest</a> - Community growth and maintenance</li>
          <li>Data Science Intern at Project Control & Systems - Increased customer retention by 20%</li>
        </ul>
        <h2>Education</h2>
        <p>
          Bachelor's in Data Science and AI Applications at <a href="https://www.iitm.ac.in" rel="noopener noreferrer" target="_blank">Indian Institute of Technology Madras</a>. Major in <a href="https://www.iitm.ac.in/ds" rel="noopener noreferrer" target="_blank">Data Science</a>, Minor in <a href="https://www.iitm.ac.in/ml" rel="noopener noreferrer" target="_blank">Machine Learning</a>.
        </p>
        <h2>Technical Skills</h2>
        <ul>
          <li>Frontend: <a href="https://react.dev" rel="noopener noreferrer" target="_blank">React</a>, <a href="https://nextjs.org" rel="noopener noreferrer" target="_blank">Next.js</a>, <a href="https://www.typescriptlang.org" rel="noopener noreferrer" target="_blank">TypeScript</a>, JavaScript, HTML, CSS, Tailwind CSS</li>
          <li>Backend: <a href="https://nodejs.org" rel="noopener noreferrer" target="_blank">Node.js</a>, Express, REST APIs, GraphQL</li>
          <li>Blockchain: <a href="https://soliditylang.org" rel="noopener noreferrer" target="_blank">Solidity</a>, Smart Contracts, <a href="https://web3js.org" rel="noopener noreferrer" target="_blank">Web3</a>, <a href="https://ethereum.org" rel="noopener noreferrer" target="_blank">Ethereum</a>, Rust, Move</li>
          <li>Data Science & ML: <a href="https://www.python.org" rel="noopener noreferrer" target="_blank">Python</a>, <a href="https://www.tensorflow.org" rel="noopener noreferrer" target="_blank">TensorFlow</a>, <a href="https://pytorch.org" rel="noopener noreferrer" target="_blank">PyTorch</a>, OpenCV, R, Data Analysis</li>
          <li>Tools: <a href="https://git-scm.com" rel="noopener noreferrer" target="_blank">Git</a>, <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank">GitHub</a>, <a href="https://www.docker.com" rel="noopener noreferrer" target="_blank">Docker</a>, Linux, VS Code</li>
        </ul>
        <h2>Projects</h2>
        <p>
          Explore <a href="#ai-projects">AI projects</a>, <a href="#web-projects">web applications</a>, and <a href="#blockchain-projects">blockchain solutions</a>. Portfolio includes 
          machine learning models, full-stack web applications, and decentralized applications 
          built with modern technologies. View projects on <a href="https://github.com/agnij-dutta" rel="noopener noreferrer" target="_blank">GitHub</a>.
        </p>
        <nav aria-label="Portfolio sections">
          <ul>
            <li><a href="#education">Education</a></li>
            <li><a href="#work-experience">Work Experience</a></li>
            <li><a href="#ai-projects">AI Projects</a></li>
            <li><a href="#web-projects">Web Projects</a></li>
            <li><a href="#blockchain-projects">Blockchain Projects</a></li>
            <li><a href="#skills">Skills & Tools</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </section>
      <Suspense fallback={null}>
        <SpotifyTokenHandler />
      </Suspense>
      <TopBar onBack={goBack} onForward={goForward} canGoBack={historyIndex > 0} canGoForward={historyIndex < history.length - 1} setActiveSection={setActiveSection} />
      <div className="flex flex-1 overflow-hidden relative gap-2 px-2">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          width={leftSidebarWidth}
          setWidth={setLeftSidebarWidth}
        />
        <div
          className="flex-1 min-w-0 flex flex-col transition-all duration-300"
          style={{ marginRight: isRightSidebarOpen ? rightSidebarWidth + 8 : 0 }}
        >
          <MainContent activeSection={activeSection} setActiveSection={setActiveSection} onOpenRightSidebar={openRightSidebar} />
        </div>
        <RightSidebar 
          isOpen={isRightSidebarOpen} 
          onClose={() => setIsRightSidebarOpen(false)} 
          setActiveSection={setActiveSection}
          width={rightSidebarWidth}
          setWidth={setRightSidebarWidth}
        />
      </div>
      <div className="px-2 pb-2">
        <PlayerControls 
          onToggleRightSidebar={toggleRightSidebar}
          isRightSidebarOpen={isRightSidebarOpen}
        />
      </div>
    </div>
  )
}
