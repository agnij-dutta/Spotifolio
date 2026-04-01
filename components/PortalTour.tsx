"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "spotifolio_tour_done"

interface TourStep {
  selector: string // CSS selector for the target element
  title: string
  description: string
  position: 'bottom' | 'right' | 'top' | 'left'
  // If no element found, fallback to center screen
}

const tourSteps: TourStep[] = [
  {
    selector: '[data-tour="sidebar"]',
    title: "Navigate Your Portfolio",
    description: "This is your sidebar - just like Spotify playlists. Jump between Home, your project Library, Achievements, and detailed sections like Education, Work Experience, and project categories.",
    position: 'right',
  },
  {
    selector: '[data-tour="home-greeting"]',
    title: "Your Personal Dashboard",
    description: "The home page shows a quick overview - time-based greeting, quick navigation cards for each section, and your featured deployed projects with live screenshots.",
    position: 'bottom',
  },
  {
    selector: '[data-tour="quick-play"]',
    title: "Quick Navigation",
    description: "These compact cards work like Spotify's quick-play shortcuts. Click any to jump straight to Work Experience, Education, AI Projects, Web Projects, Blockchain, or Skills & Tools.",
    position: 'bottom',
  },
  {
    selector: '[data-tour="featured-projects"]',
    title: "Featured Projects with Live Previews",
    description: "Your top deployed projects are showcased here with real screenshots pulled from their live URLs. Each card shows the project name, tech stack, and a live preview of the deployed site.",
    position: 'bottom',
  },
  {
    selector: '[data-tour="sidebar-library"]',
    title: "Your Library - All Projects",
    description: "Click 'Your Library' to see every project from your GitHub, sorted by stars. Filter by deployed, recent, or view as a grid or list - just like browsing your Spotify library.",
    position: 'right',
  },
  {
    selector: '[data-tour="sidebar-achievements"]',
    title: "Achievements & Hackathon Wins",
    description: "Your hackathon victories displayed as a Spotify playlist - ETHGlobal Bounty Winner, 1st Place Avalanche Hackathon, podium finishes at IIT Kharagpur events, and more.",
    position: 'right',
  },
  {
    selector: '[data-tour="search-bar"]',
    title: "Search Everything",
    description: "Search across your entire portfolio and GitHub repos. Type a project name, technology, or keyword - results include portfolio sections and live GitHub repository search.",
    position: 'bottom',
  },
  {
    selector: '[data-tour="player-bar"]',
    title: "The Player Bar",
    description: "If you connect Spotify, your currently playing track shows here. The play button also lets you download the resume. The progress bar turns green on hover, just like real Spotify.",
    position: 'top',
  },
]

export function PortalTour() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Small delay so DOM is painted
        setTimeout(() => setVisible(true), 800)
      }
    } catch {}
  }, [])

  const measure = useCallback(() => {
    if (!visible) return
    const s = tourSteps[step]
    const el = document.querySelector(s.selector)
    if (el) {
      const r = el.getBoundingClientRect()
      setRect(r)
      // Position tooltip relative to element
      const pad = 16
      const tw = 380 // tooltip width
      const th = 200 // approximate tooltip height
      let style: React.CSSProperties = { width: tw }

      switch (s.position) {
        case 'bottom':
          style.top = r.bottom + pad
          style.left = Math.max(pad, Math.min(r.left + r.width / 2 - tw / 2, window.innerWidth - tw - pad))
          break
        case 'top':
          style.top = r.top - th - pad
          style.left = Math.max(pad, Math.min(r.left + r.width / 2 - tw / 2, window.innerWidth - tw - pad))
          break
        case 'right':
          style.top = Math.max(pad, r.top + r.height / 2 - th / 2)
          style.left = r.right + pad
          break
        case 'left':
          style.top = Math.max(pad, r.top + r.height / 2 - th / 2)
          style.left = r.left - tw - pad
          break
      }
      setTooltipStyle(style)
    } else {
      // Fallback: center of screen
      setRect(null)
      setTooltipStyle({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 380,
      })
    }
  }, [step, visible])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  // Scroll element into view
  useEffect(() => {
    if (!visible) return
    const el = document.querySelector(tourSteps[step].selector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
      // Re-measure after scroll
      setTimeout(measure, 400)
    }
  }, [step, visible, measure])

  const dismiss = () => {
    setVisible(false)
    try { localStorage.setItem(STORAGE_KEY, "true") } catch {}
  }

  const next = () => {
    if (step < tourSteps.length - 1) setStep(s => s + 1)
    else dismiss()
  }

  const prev = () => {
    if (step > 0) setStep(s => s - 1)
  }

  if (!visible) return null

  const s = tourSteps[step]
  const isLast = step === tourSteps.length - 1
  const padding = 8

  // Spotlight rect with padding
  const sx = rect ? rect.left - padding : 0
  const sy = rect ? rect.top - padding : 0
  const sw = rect ? rect.width + padding * 2 : 0
  const sh = rect ? rect.height + padding * 2 : 0

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {/* Overlay with cutout */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && <rect x={sx} y={sy} width={sw} height={sh} rx="12" ry="12" fill="black" />}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tour-mask)" />
        {/* Glow border around spotlight */}
        {rect && (
          <>
            <rect x={sx} y={sy} width={sw} height={sh} rx="12" ry="12" fill="none" stroke="#1DB954" strokeWidth="2" opacity="0.6" />
            <rect x={sx - 2} y={sy - 2} width={sw + 4} height={sh + 4} rx="14" ry="14" fill="none" stroke="#1DB954" strokeWidth="1" opacity="0.2" />
          </>
        )}
      </svg>

      {/* Tooltip */}
      <div
        key={step}
        style={{
          position: 'fixed',
          ...tooltipStyle,
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          pointerEvents: 'auto',
          animation: 'tourSlideIn 0.3s ease-out',
          zIndex: 10000,
        }}
      >
        {/* Step counter + progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1DB954', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {step + 1} / {tourSteps.length}
          </span>
          <div style={{ display: 'flex', gap: 3 }}>
            {tourSteps.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i <= step ? '#1DB954' : '#404040',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{s.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#a7a7a7', margin: '0 0 20px' }}>{s.description}</p>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={dismiss} style={{
              background: 'none', border: 'none', color: '#727272', fontSize: 13, cursor: 'pointer', padding: '6px 0', fontFamily: 'inherit',
            }}>
              Skip
            </button>
            {step > 0 && (
              <button onClick={prev} style={{
                background: 'none', border: '1px solid #404040', color: '#a7a7a7', fontSize: 13, cursor: 'pointer', padding: '6px 16px', borderRadius: 500, fontFamily: 'inherit',
              }}>
                Back
              </button>
            )}
          </div>
          <button
            onClick={next}
            style={{
              background: '#1DB954', border: 'none', color: '#000', fontSize: 14, fontWeight: 700, padding: '10px 28px', borderRadius: 500, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'transform 0.1s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1ed760'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1DB954'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            {isLast ? "Let's Go!" : "Next"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes tourSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
