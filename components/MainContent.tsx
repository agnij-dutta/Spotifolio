"use client"

import { Play, Download, Shuffle, ArrowUpRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = 'https://drive.google.com/uc?export=download&id=1ATfZjD1YXQlBkNpUVVPtonMGkCvjYo-A'
  link.download = 'Agnij_Dutta_SoftwareDeveloper-2.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
import { fetchGitHubProjects, CategorizedProject } from "@/lib/github"
import { Loading, LoadingRow, LoadingCard } from "@/components/ui/loading"

const portfolioData = {
  Education: {
    title: "Education",
    subtitle: "Academic Background",
    description: "Data Science • Machine Learning • Computer Science",
    gradient: "from-blue-900 to-black",
    items: [
      {
        title: "BS Data Science and Applications",
        type: "Major: Data Science | Minor: Machine Learning",
        company: "Indian Institute of Technology, Madras",
        duration: "2028",
        icon: "/iit-madras-logo.svg",
      },
    ],
  },
  "Work Experience": {
    title: "Work Experience",
    subtitle: "Professional Journey",
    description: "Internships • Developer Roles • Data Science",
    gradient: "from-green-900 to-black",
    items: [
      {
        title: "SDE Intern",
        type: "Built features to boost admin productivity by 85%",
        company: "Workwise",
        duration: "2025-present",
        icon: "/workwise.png",
      },
      {
        title: "Developer Advocate",
        type: "Community growth and maintenance",
        company: "HackQuest",
        duration: "2024-present",
        icon: "/hackquest.webp",
      },
      {
        title: "Data Science Intern",
        type: "Increased customer retention by 20%",
        company: "Project Control & Systems",
        duration: "2023-2024",
        icon: "https://skillicons.dev/icons?i=python,r",
      },
    ],
  },
  "AI Projects": {
    title: "AI Projects",
    subtitle: "Machine Learning & Data Science",
    description: "TensorFlow • PyTorch • OpenCV • Data Analysis",
    gradient: "from-purple-900 to-black",
    items: [],
  },
  "Web Projects": {
    title: "Web Projects",
    subtitle: "Full-Stack Applications",
    description: "React • Next.js • Node.js • TypeScript",
    gradient: "from-orange-900 to-black",
    items: [],
  },
  "Blockchain Projects": {
    title: "Blockchain Projects",
    subtitle: "Web3 & Cryptocurrency",
    description: "Solidity • Rust • Move • Smart Contracts",
    gradient: "from-yellow-900 to-black",
    items: [],
  },
  "Skills & Tools": {
    title: "Skills & Tools",
    subtitle: "Technical Expertise",
    description: "Programming languages • Frameworks • Development tools",
    gradient: "from-red-900 to-black",
    items: [
      {
        title: "JavaScript/TypeScript",
        type: "Programming Language",
        company: "Frontend & Backend",
        duration: "Expert",
        icon: "https://skillicons.dev/icons?i=js,typescript",
      },
      {
        title: "React/Next.js",
        type: "Frontend Framework",
        company: "UI Development",
        duration: "Expert",
        icon: "https://skillicons.dev/icons?i=react,nextjs",
      },
      {
        title: "Node.js",
        type: "Backend Framework",
        company: "API Development",
        duration: "Advanced",
        icon: "https://skillicons.dev/icons?i=nodejs",
      },
      {
        title: "Python/R",
        type: "Data Science",
        company: "ML & Analysis",
        duration: "Advanced",
        icon: "https://skillicons.dev/icons?i=python,r",
      },
      {
        title: "Solidity/Rust",
        type: "Blockchain",
        company: "Smart Contracts",
        duration: "Advanced",
        icon: "https://skillicons.dev/icons?i=solidity,rust",
      },
      {
        title: "HTML/CSS",
        type: "Web Development",
        company: "Frontend",
        duration: "Expert",
        icon: "https://skillicons.dev/icons?i=html,css",
      },
      {
        title: "Java",
        type: "Programming Language",
        company: "Backend",
        duration: "Intermediate",
        icon: "https://skillicons.dev/icons?i=java",
      },
      {
        title: "Database & Cloud",
        type: "Supabase, Firebase",
        company: "Backend Services",
        duration: "Advanced",
        icon: "https://skillicons.dev/icons?i=supabase,firebase",
      },
    ],
  },

  Contact: {
    title: "Contact Me",
    subtitle: "Get In Touch",
    description: "Available for opportunities • Remote work • Collaboration",
    gradient: "from-teal-900 to-black",
    items: [
      {
        title: "Email",
        type: "agnijdutta413@gmail.com",
        company: "Primary Contact",
        duration: "24/7",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
        url: "mailto:agnijdutta413@gmail.com",
      },
      {
        title: "LinkedIn",
        type: "linkedin.com/in/agnij-dutta",
        company: "Professional Network",
        duration: "Active",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
        url: "https://linkedin.com/in/agnij-dutta",
      },
      {
        title: "GitHub",
        type: "github.com/agnij-dutta",
        company: "Code Portfolio",
        duration: "Active",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg",
        url: "https://github.com/agnij-dutta",
      },
      {
        title: "X",
        type: "@0xholmesdev",
        company: "Tech Discussions",
        duration: "Active",
        icon: "https://img.icons8.com/fluency/48/ffffff/twitter.png",
        url: "https://x.com/0xholmesdev",
      },
      {
        title: "Location",
        type: "Kolkata, West Bengal",
        company: "India",
        duration: "Local Time",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHRleHQgeD0iNSIgeT0iMzAiIGZvbnQtc2l6ZT0iMjQiPvCfk408L3RleHQ+Cjwvc3ZnPgo=",
      },
    ],
  },
}

export { portfolioData }

type PortfolioSection = keyof typeof portfolioData
type SectionTarget = PortfolioSection | "Home"

const homeHero = {
  cover: "/WhatsApp Image 2025-11-28 at 01.48.04.jpeg",
  label: "Portfolio Album",
  title: "Agnij Dutta",
  tagline: "Full-stack developer and data scientist crafting human-centered tooling for Workwise, HackQuest, and the BS Data Science program at IIT Madras.",
  stats: [
    { value: "85% ↑", label: "Admin efficiency", hint: "Workwise command center" },
    { value: "20% ↑", label: "Customer retention", hint: "Project Control & Systems" },
    { value: "2028", label: "BS Data Science", hint: "IIT Madras · ML minor" },
  ],
}

const homeQuickFilters: { title: string; detail: string; meta: string; target: PortfolioSection }[] = [
  {
    title: "Work Experience",
    detail: "Workwise, HackQuest, Project Control & Systems",
    meta: "3 live roles",
    target: "Work Experience",
  },
  {
    title: "Education",
    detail: "BS Data Science & Applications · IIT Madras",
    meta: "2028 cohort",
    target: "Education",
  },
  {
    title: "AI Projects",
    detail: "Retention intelligence, resume agent, ML ops",
    meta: "GitHub drops",
    target: "AI Projects",
  },
  {
    title: "Skills & Tools",
    detail: "Next.js, Supabase, Python, ML stack",
    meta: "Hands-on",
    target: "Skills & Tools",
  },
]

type HomeShelfCard = {
  title: string
  description: string
  badge: string
  meta: string
  image: string
  target: PortfolioSection
  imageFit?: "cover" | "contain"
}

type HomeShelf = {
  title: string
  subtitle: string
  cards: HomeShelfCard[]
}

const homeShelves: HomeShelf[] = [
  {
    title: "Made For You",
    subtitle: "Snapshots of current work on repeat",
    cards: [
      {
        title: "Ops Autopilot",
        description: "Designing Workwise's admin control room as an SDE intern to lift productivity by 85%.",
        badge: "Workwise · 2025 — Present",
        meta: "Next.js · Supabase · tRPC",
        image: "/workwise.png",
        imageFit: "contain",
        target: "Work Experience",
      },
      {
        title: "Builder Signals",
        description: "Producing developer advocacy programs and content to keep HackQuest's community shipping.",
        badge: "HackQuest · 2024 — Present",
        meta: "Content ops · Community tooling",
        image: "/hackquest.webp",
        target: "Work Experience",
      },
      {
        title: "Retention Intelligence",
        description: "Modeling churn drivers for Project Control & Systems to keep 20% more customers engaged.",
        badge: "Project Control & Systems · 2023 — 2024",
        meta: "Python · ML notebooks",
        image: "/placeholder.jpg",
        target: "Work Experience",
      },
    ],
  },
  {
    title: "Learning Queue",
    subtitle: "Academic and research sets I loop daily",
    cards: [
      {
        title: "Data Science Studio",
        description: "BS Data Science & Applications curriculum at IIT Madras with a focus on product analytics.",
        badge: "IIT Madras · Core Track",
        meta: "Statistics · Data pipelines",
        image: "/iit-madras-logo.svg",
        imageFit: "contain",
        target: "Education",
      },
      {
        title: "ML Minor Sessions",
        description: "Computer vision and generative modeling labs forming the minor specialization.",
        badge: "IIT Madras · ML Minor",
        meta: "TensorFlow · PyTorch",
        image: "/skill-icons.jpg",
        target: "Education",
      },
      {
        title: "Storytelling for DevRel",
        description: "Narratives that turn technical work into repeatable learning for HackQuest builders.",
        badge: "HackQuest · Live content",
        meta: "Workshops · Guides",
        image: "/hackquest.webp",
        target: "Work Experience",
      },
    ],
  },
  {
    title: "Prototype Radio",
    subtitle: "Mix of personal builds powering this portfolio",
    cards: [
      {
        title: "Spotify UI Experiments",
        description: "Recreated Spotify's home stack in Next.js to double as a living portfolio hub.",
        badge: "Web Project",
        meta: "Next.js · Tailwind · Shadcn",
        image: "/placeholder-logo.png",
        imageFit: "contain",
        target: "Web Projects",
      },
      {
        title: "Resume Generator",
        description: "One-click PDF generation scripted to keep my story consistent across drops.",
        badge: "Automation",
        meta: "TypeScript · PDFKit",
        image: "/placeholder-logo.svg",
        imageFit: "contain",
        target: "AI Projects",
      },
      {
        title: "Data Viz Pack",
        description: "Reusable chart blocks for explaining ML insights to non-technical partners.",
        badge: "Toolkit",
        meta: "D3 · Observable",
        image: "/placeholder-user.jpg",
        target: "Skills & Tools",
      },
    ],
  },
]

const homeSpotlight = {
  title: "Workwise Command Center",
  description: "Built a unified workspace for ops leads with predictive tickets, contextual dashboards, and automated follow-ups — lifting admin productivity by 85%.",
  image: "/workwise.png",
  meta: ["SDE Intern", "2025 — Present"],
  target: "Work Experience" as PortfolioSection,
}

const homeTimeline: { year: string; title: string; description: string; badge?: string; target: SectionTarget }[] = [
  {
    year: "2025",
    title: "Workwise · SDE Intern",
    description: "Own the builder experience for ops tooling and productivity systems.",
    badge: "Now Playing",
    target: "Work Experience",
  },
  {
    year: "2024",
    title: "HackQuest · Developer Advocate",
    description: "Scalable content, demos, and community rituals that keep devs engaged.",
    badge: "Live",
    target: "Work Experience",
  },
  {
    year: "2023",
    title: "Project Control & Systems · Data Science Intern",
    description: "Predictive models that improved customer retention by 20%.",
    target: "Work Experience",
  },
  {
    year: "2028",
    title: "BS Data Science & Applications",
    description: "Major in Data Science, ML minor at IIT Madras.",
    target: "Education",
  },
]

const homeNowPlaying = {
  title: "Data Science & Applications",
  description: "Undergraduate journey at IIT Madras blending statistics, ML, and product thinking with a 2028 graduation target.",
  bullets: [
    "Major: Data Science & Applications",
    "Minor: Machine Learning",
    "Studios: Computer Vision, Causal ML, Product Analytics",
  ],
  image: "/iit-madras-logo.svg",
  target: "Education" as PortfolioSection,
}

const sectionColumns: Record<string, { label: string; field: string; icon?: boolean }[]> = {
  "Education": [
    { label: "Degree", field: "title", icon: true },
    { label: "Institute", field: "company" },
    { label: "Year", field: "duration" },
  ],
  "Work Experience": [
    { label: "Role", field: "title", icon: true },
    { label: "Company", field: "company" },
    { label: "Duration", field: "duration" },
    { label: "Description", field: "type" },
  ],
  "AI Projects": [
    { label: "Project", field: "title", icon: true },
    { label: "Tech Stack", field: "type" },
    { label: "Type", field: "company" },
    { label: "Year", field: "duration" },
  ],
  "Web Projects": [
    { label: "Project", field: "title", icon: true },
    { label: "Tech Stack", field: "type" },
    { label: "Type", field: "company" },
    { label: "Year", field: "duration" },
  ],
  "Blockchain Projects": [
    { label: "Project", field: "title", icon: true },
    { label: "Tech Stack", field: "type" },
    { label: "Type", field: "company" },
    { label: "Year", field: "duration" },
  ],
  "Skills & Tools": [
    { label: "Skill", field: "title", icon: true },
    { label: "Type", field: "type" },
    { label: "Area", field: "company" },
    { label: "Level", field: "duration" },
  ],

  "Contact": [
    { label: "Method", field: "title", icon: true },
    { label: "Value", field: "type" },
    { label: "Status", field: "company" },
    { label: "Availability", field: "duration" },
  ],
}

interface MainContentProps {
  activeSection: string
  setActiveSection: (section: string) => void
  onOpenRightSidebar: () => void
}

export function MainContent({ activeSection, setActiveSection, onOpenRightSidebar }: MainContentProps) {
  const [githubProjects, setGitHubProjects] = useState<{
    'AI Projects': CategorizedProject[]
    'Web Projects': CategorizedProject[]
    'Blockchain Projects': CategorizedProject[]
  }>({
    'AI Projects': [],
    'Web Projects': [],
    'Blockchain Projects': []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Fetch GitHub projects on component mount and when switching to project tabs
  useEffect(() => {
    const loadGitHubProjects = async () => {
      // Only fetch if switching to a project tab or if not loaded yet
      const isProjectTab = activeSection === 'AI Projects' || activeSection === 'Web Projects' || activeSection === 'Blockchain Projects'
      
      if (!isProjectTab && hasLoaded) return
      
      setIsLoading(true)
      try {
        const projects = await fetchGitHubProjects()
        setGitHubProjects(projects)
        setHasLoaded(true)
      } catch (error) {
        console.error('Failed to load GitHub projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubProjects()
  }, [activeSection, hasLoaded])

  const sectionNames = Object.keys(portfolioData)

  if (activeSection === "Home") {
    return <HomeShowcase setActiveSection={setActiveSection} />
  }

  // Merge GitHub data with hardcoded data
  const getCurrentData = () => {
    const baseData = portfolioData[activeSection as keyof typeof portfolioData] || portfolioData["Education"]
    
    // For project sections, merge with GitHub data
    if (activeSection === 'AI Projects' || activeSection === 'Web Projects' || activeSection === 'Blockchain Projects') {
      const githubData = githubProjects[activeSection as keyof typeof githubProjects] || []
      
      if (githubData.length > 0) {
        return {
          ...baseData,
          items: githubData
        }
      }
    }
    
    return baseData
  }

  const currentData = getCurrentData()
  const columns = sectionColumns[activeSection] || sectionColumns["Education"]

  // Handler for shuffle
  const handleShuffle = () => {
    let randomSection = activeSection
    while (randomSection === activeSection) {
      randomSection = sectionNames[Math.floor(Math.random() * sectionNames.length)]
    }
    setActiveSection(randomSection)
  }

  return (
    <ScrollArea className="flex-1 bg-[#121212] text-white rounded-xl h-full">
      <div className={`bg-gradient-to-b ${currentData.gradient} rounded-t-xl p-4 md:p-8 relative`}>
        {/* Fade gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none"></div>
        {/* Section Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold">PORTFOLIO</p>
          <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-4">{currentData.title}</h2>
          <p className="text-base text-gray-300">{currentData.description}</p>
        </div>

        {/* Spotify-style controls */}
        <div className="mb-8 flex items-center gap-4">
          {/* Play Button */}
          <a
            href="https://drive.google.com/uc?export=download&id=1ATfZjD1YXQlBkNpUVVPtonMGkCvjYo-A"
            download
            className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition-colors shadow-lg focus:outline-none"
            title="Play Resume"
          >
            <Play size={36} className="text-black" />
          </a>
          {/* Shuffle Button */}
          <button
            onClick={handleShuffle}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#232323] hover:bg-[#333] transition-colors text-white"
            title="Shuffle Section"
          >
            <Shuffle size={28} />
          </button>
          {/* Download Button */}
          <a
            href="https://drive.google.com/uc?export=download&id=1ATfZjD1YXQlBkNpUVVPtonMGkCvjYo-A"
            download="Agnij_Dutta_SoftwareDeveloper-2.pdf"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#232323] hover:bg-[#333] transition-colors text-white"
            title="Download Resume (PDF)"
          >
            <Download size={28} />
          </a>
        </div>
      </div>
      {/* Table content in bottom section */}
      <div className="p-4 md:p-8">
      {/* Responsive table for larger screens */}
      <div className="hidden md:block">
          <table className="w-full text-left text-base text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
                <th className="pb-3 text-lg font-semibold">#</th>
                {columns.map((col) => (
                  <th key={col.field} className="pb-3 text-lg font-semibold">{col.label}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (activeSection === 'AI Projects' || activeSection === 'Web Projects' || activeSection === 'Blockchain Projects') ? (
              // Show loading rows for project sections
              Array.from({ length: 3 }).map((_, index) => (
                <LoadingRow key={index} />
              ))
            ) : currentData.items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-gray-400">
                  <Loading message="No projects found" />
                </td>
              </tr>
            ) : (
              currentData.items.map((item, index) => (
                <tr key={index} className={`hover:bg-white/10 cursor-pointer ${('url' in item && item.url) ? 'hover:bg-blue-500/20' : ''}`} onClick={() => {
                  // If it's a GitHub project, open the URL instead of sidebar
                  if ('url' in item && typeof item.url === 'string' && item.url) {
                    window.open(item.url, '_blank')
                  } else {
                    onOpenRightSidebar()
                  }
                }}>
                  <td className="py-3">{index + 1}</td>
                  {columns.map((col, colIdx) => (
                    <td className="py-3" key={col.field}>
                      {col.icon ? (
                        <div className="flex items-center">
                          <Image
                            src={item.icon || "/placeholder.svg?height=40&width=40"}
                            width={40}
                            height={40}
                            alt={`${item.title} icon`}
                            className={`mr-3 rounded ${item.title === "GitHub" ? "filter invert" : ""}`}
                          />
                          <div>
                            <span className="text-white text-lg font-medium">{(item as any)[col.field]}</span>
                            {'stars' in item && typeof item.stars === 'number' && item.stars > 0 && (
                              <div className="text-xs text-gray-400 mt-1">
                                ⭐ {item.stars} • 🍴 {(item as CategorizedProject).forks}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-lg">{(item as any)[col.field]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {isLoading && (activeSection === 'AI Projects' || activeSection === 'Web Projects' || activeSection === 'Blockchain Projects') ? (
          // Show loading cards for project sections
          Array.from({ length: 3 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        ) : currentData.items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Loading message="No projects found" />
          </div>
        ) : (
          currentData.items.map((item, index) => (
            <div key={index} className={`bg-white/5 p-4 rounded-lg hover:bg-white/10 cursor-pointer ${('url' in item && item.url) ? 'hover:bg-blue-500/20' : ''}`} onClick={() => {
              // If it's a GitHub project, open the URL instead of sidebar
              if ('url' in item && typeof item.url === 'string' && item.url) {
                window.open(item.url, '_blank')
              } else {
                onOpenRightSidebar()
              }
            }}>
              <div className="flex items-center mb-2">
                <span className="text-base text-gray-400 mr-2">{index + 1}</span>
                {columns[0].icon && (
                  <Image
                    src={item.icon || "/placeholder.svg?height=40&width=40"}
                    width={40}
                    height={40}
                    alt={`${item.title} icon`}
                    className={`mr-3 rounded ${item.title === "GitHub" ? "filter invert" : ""}`}
                  />
                )}
                <div>
                  <p className="text-white font-medium text-lg">{(item as any)[columns[0].field]}</p>
                  {'stars' in item && typeof item.stars === 'number' && item.stars > 0 && (
                    <div className="text-xs text-gray-400 mt-1">
                      ⭐ {item.stars} • 🍴 {(item as CategorizedProject).forks}
                    </div>
                  )}
                </div>
              </div>
              {columns.slice(1).map((col) => (
                <div key={col.field} className="ml-8 pl-3 text-base text-gray-300">
                  <span className="font-semibold">{col.label}: </span>{(item as any)[col.field]}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      </div>
    </ScrollArea>
  )
}

function HomeShowcase({ setActiveSection }: { setActiveSection: (section: SectionTarget) => void }) {
  return (
    <ScrollArea className="flex-1 min-w-0 bg-[#121212] text-white rounded-xl h-full">
      <div className="p-4 md:p-8 space-y-8 min-w-0">
        <section className="bg-gradient-to-r from-[#4421ff] via-[#161616] to-black rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -bottom-20 right-0 w-64 h-64 bg-green-500/20 blur-3xl" />
            <div className="absolute -top-10 left-10 w-40 h-40 bg-purple-500/20 blur-2xl" />
          </div>
          <div className="flex flex-col xl:flex-row gap-8 relative">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0">
              <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-black/40">
                <Image
                  src={homeHero.cover}
                  alt="Agnij Dutta portrait"
                  fill
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-cover object-left"
                  priority
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-green-300">
                <Sparkles size={16} /> {homeHero.label}
              </p>
              <h2 className="text-4xl md:text-6xl font-bold mt-4">{homeHero.title}</h2>
              <p className="mt-4 text-base md:text-lg text-gray-100 max-w-3xl">{homeHero.tagline}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {homeHero.stats.map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="text-sm uppercase tracking-wide text-gray-300">{stat.label}</p>
                    <p className="text-xs text-gray-400 mt-2">{stat.hint}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveSection("Work Experience")}
                  className="flex items-center gap-2 bg-green-500 text-black px-5 py-3 rounded-full font-semibold shadow-lg hover:bg-green-400 transition-colors"
                >
                  <Play size={18} fill="black" />
                  Play my story
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-3 rounded-full font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Download size={18} />
                  Download resume
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 min-w-0">
          {homeQuickFilters.map((filter) => (
            <button
              key={filter.title}
              onClick={() => setActiveSection(filter.target)}
              className="bg-[#1c1c1c] rounded-2xl p-4 text-left border border-white/5 hover:border-white/20 transition-colors"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-green-400">{filter.meta}</p>
              <h3 className="text-xl font-semibold mt-3">{filter.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{filter.detail}</p>
              <div className="mt-4 flex items-center text-sm text-white/70 gap-2">
                Dive in <ArrowUpRight size={16} />
              </div>
            </button>
          ))}
        </section>

        <section className="grid xl:grid-cols-[2fr_1fr] gap-6 min-w-0">
          <div className="space-y-6 min-w-0">
            {homeShelves.map((shelf) => (
              <div key={shelf.title} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{shelf.title}</h2>
                    <p className="text-sm text-gray-400">{shelf.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setActiveSection(shelf.cards[0].target)}
                    className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
                  >
                    Show all <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                  {shelf.cards.map((card) => (
                    <button
                      key={card.title}
                      onClick={() => setActiveSection(card.target)}
                      className="bg-[#181818] rounded-2xl p-4 w-full sm:w-72 flex-shrink-0 text-left border border-white/5 hover:border-white/20 transition-colors snap-start"
                    >
                      <div className={`relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl ${card.imageFit === 'contain' ? 'bg-white/5 flex items-center justify-center' : ''}`}>
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 768px) 70vw, 280px"
                          className={`${card.imageFit === 'contain' ? 'object-contain p-6' : 'object-cover'}`}
                        />
                      </div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{card.badge}</p>
                      <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
                      <p className="text-sm text-gray-400 mt-2">{card.description}</p>
                      <p className="text-xs text-gray-500 mt-3">{card.meta}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 min-w-0">
            <section className="bg-[#191919] rounded-2xl p-6 border border-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-green-400">Now Playing</p>
              <div className="flex items-center gap-4 mt-4">
                <Image
                  src={homeNowPlaying.image}
                  alt="IIT Madras"
                  width={64}
                  height={64}
                  className="rounded-xl bg-white/5 p-2"
                />
                <div>
                  <h3 className="text-2xl font-semibold">{homeNowPlaying.title}</h3>
                  <p className="text-sm text-gray-400">{homeNowPlaying.description}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {homeNowPlaying.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> {bullet}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActiveSection(homeNowPlaying.target)}
                className="mt-5 text-sm text-white/80 underline underline-offset-4"
              >
                Go to education
              </button>
            </section>

            <section className="bg-[#191919] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Journey Timeline</p>
                  <h3 className="text-xl font-semibold">Highlights queue</h3>
                </div>
              </div>
              <div className="space-y-4">
                {homeTimeline.map((entry) => (
                  <button
                    key={`${entry.year}-${entry.title}`}
                    onClick={() => entry.target !== "Home" && setActiveSection(entry.target)}
                    className="w-full text-left bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">{entry.year}</p>
                      {entry.badge && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">{entry.badge}</span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mt-1">{entry.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{entry.description}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-b from-[#202020] to-[#0f0f0f] rounded-2xl p-6 border border-white/5">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Spotlight</p>
              <div className="relative w-full h-48 mt-4 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
                <Image
                  src={homeSpotlight.image}
                  alt={homeSpotlight.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 320px"
                  className="object-contain p-6"
                />
              </div>
              <h3 className="text-2xl font-semibold mt-4">{homeSpotlight.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{homeSpotlight.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {homeSpotlight.meta.map((meta) => (
                  <span key={meta} className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-200">
                    {meta}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActiveSection(homeSpotlight.target)}
                className="mt-5 flex items-center gap-2 text-green-300 text-sm"
              >
                Open case study <ArrowUpRight size={16} />
              </button>
            </section>
          </div>
        </section>
      </div>
    </ScrollArea>
  )
}
