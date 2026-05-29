"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, X, Github, Code, GitBranch } from "lucide-react"
import Fuse from "fuse.js"
import { portfolioData as portfolioDataRaw } from "../MainContent"
import { searchGitHub, GitHubSearchResult } from "../../lib/github-search"

// Browse-all category cards (shown when the query is empty), mirroring the section nav.
const browseCategories: { section: string; label: string; gradient: string }[] = [
  { section: "AI Projects", label: "AI Projects", gradient: "from-purple-600 to-purple-900" },
  { section: "Web Projects", label: "Web Projects", gradient: "from-orange-500 to-orange-800" },
  { section: "Blockchain Projects", label: "Blockchain", gradient: "from-yellow-500 to-yellow-800" },
  { section: "Skills & Tools", label: "Skills & Tools", gradient: "from-red-500 to-red-800" },
  { section: "Work Experience", label: "Work Experience", gradient: "from-green-600 to-green-900" },
  { section: "Education", label: "Education", gradient: "from-blue-600 to-blue-900" },
  { section: "Achievements", label: "Achievements", gradient: "from-amber-500 to-orange-700" },
  { section: "Contact", label: "Contact", gradient: "from-teal-500 to-teal-800" },
]

function flatten(data: any) {
  const out: any[] = []
  Object.entries(data).forEach(([section, value]: any) => {
    value.items.forEach((item: any) => {
      out.push({ ...item, section, sectionTitle: value.title })
    })
  })
  return out
}

interface MobileSearchProps {
  setActiveSection: (section: string) => void
}

export function MobileSearch({ setActiveSection }: MobileSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [github, setGitHub] = useState<{
    repositories: GitHubSearchResult[]
    code: GitHubSearchResult[]
    issues: GitHubSearchResult[]
  }>({ repositories: [], code: [], issues: [] })
  const [loadingGitHub, setLoadingGitHub] = useState(false)

  const fuse = useMemo(
    () =>
      new Fuse(flatten(portfolioDataRaw), {
        keys: ["title", "type", "company", "section", "sectionTitle"],
        threshold: 0.4,
      }),
    [],
  )

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      setGitHub({ repositories: [], code: [], issues: [] })
      return
    }
    setResults(fuse.search(query).map((r) => r.item).slice(0, 6))

    const id = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoadingGitHub(true)
        try {
          setGitHub(await searchGitHub(query))
        } catch {
          /* ignore */
        } finally {
          setLoadingGitHub(false)
        }
      }
    }, 500)
    return () => clearTimeout(id)
  }, [query, fuse])

  const hasGitHub =
    github.repositories.length > 0 || github.code.length > 0 || github.issues.length > 0
  const showBrowse = query.trim() === ""

  return (
    <div className="flex h-full flex-col bg-[#121212]">
      {/* Sticky search header */}
      <div className="sticky top-0 z-10 bg-[#121212] px-4 pb-3 pt-2">
        <h1 className="mb-3 text-2xl font-bold text-white">Search</h1>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to explore?"
            autoComplete="off"
            className="w-full rounded-md bg-white py-3 pl-10 pr-10 text-sm font-medium text-black placeholder-black/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {showBrowse ? (
          <>
            <h2 className="mb-4 mt-2 text-lg font-bold text-white">Browse all</h2>
            <div className="grid grid-cols-2 gap-3">
              {browseCategories.map((cat) => (
                <button
                  key={cat.section}
                  onClick={() => setActiveSection(cat.section)}
                  className={`relative h-24 overflow-hidden rounded-lg bg-gradient-to-br ${cat.gradient} p-3 text-left`}
                >
                  <span className="relative z-10 text-base font-bold text-white drop-shadow">{cat.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6 pt-3">
            {/* Portfolio results */}
            {results.length > 0 && (
              <section>
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#a7a7a7]">Portfolio</h2>
                <div className="space-y-1">
                  {results.map((item) => (
                    <button
                      key={`${item.title}-${item.section}`}
                      onClick={() => setActiveSection(item.section)}
                      className="flex w-full items-center gap-3 rounded-md p-2 text-left active:bg-white/10"
                    >
                      {item.icon && <img src={item.icon} alt="" className="h-10 w-10 rounded object-contain" />}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{item.title}</p>
                        <p className="truncate text-xs text-[#a7a7a7]">
                          {item.company} · {item.sectionTitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* GitHub results */}
            {(loadingGitHub || hasGitHub) && (
              <section>
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#a7a7a7]">My GitHub</h2>
                {loadingGitHub && <p className="px-2 text-sm text-[#a7a7a7]">Searching my GitHub…</p>}
                <div className="space-y-1">
                  {github.repositories.map((item) => (
                    <a
                      key={`repo-${item.url}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-3 rounded-md p-2 active:bg-white/10"
                    >
                      <Github size={18} className="flex-shrink-0 text-[#a7a7a7]" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{item.title}</p>
                        <p className="truncate text-xs text-[#a7a7a7]">
                          {item.owner}/{item.repository}
                          {item.stars ? ` · ${item.stars}★` : ""}
                        </p>
                      </div>
                    </a>
                  ))}
                  {github.code.map((item) => (
                    <a
                      key={`code-${item.url}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-3 rounded-md p-2 active:bg-white/10"
                    >
                      <Code size={18} className="flex-shrink-0 text-[#a7a7a7]" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{item.title}</p>
                        <p className="truncate text-xs text-[#a7a7a7]">
                          {item.repository}
                          {item.language ? ` · ${item.language}` : ""}
                        </p>
                      </div>
                    </a>
                  ))}
                  {github.issues.map((item) => (
                    <a
                      key={`issue-${item.url}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-3 rounded-md p-2 active:bg-white/10"
                    >
                      <GitBranch size={18} className="flex-shrink-0 text-[#a7a7a7]" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{item.title}</p>
                        <p className="truncate text-xs text-[#a7a7a7]">{item.repository} · Issue</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {results.length === 0 && !loadingGitHub && !hasGitHub && (
              <p className="pt-6 text-center text-sm text-[#a7a7a7]">No results for “{query}”.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
