"use client"

import { Github, Linkedin, Twitter, Mail, Download, Monitor, MapPin, ArrowUpRight, Music2 } from "lucide-react"
import { SeoContent } from "./SeoContent"

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1ATfZjD1YXQlBkNpUVVPtonMGkCvjYo-A"
const RESUME_FILENAME = "Agnij_Dutta_SoftwareDeveloper-2.pdf"
const AVATAR = "https://avatars.githubusercontent.com/u/126397667?v=4"

const links = [
  { label: "GitHub", href: "https://github.com/agnij-dutta", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/agnij-dutta", icon: Linkedin },
  { label: "X / Twitter", href: "https://x.com/0xholmesdev", icon: Twitter },
  { label: "Email", href: "mailto:agnijdutta413@gmail.com", icon: Mail },
]

/**
 * The phone experience. The full interactive, Spotify-style portfolio is desktop/tablet
 * only — on phones we show this focused, fully responsive landing card instead.
 */
export function MobileGate() {
  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-black text-white">
      {/* Crawler-facing semantic content (hidden); keeps SEO parity on phones. */}
      <SeoContent />

      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1DB954]/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-emerald-700/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f]/80 via-[#121212] to-black" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-10 pt-8 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1DB954] shadow-lg shadow-[#1DB954]/30">
            <Music2 size={16} className="text-black" fill="black" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-white/70">Portfolio</span>
        </div>

        {/* Hero */}
        <section className="mt-10 flex flex-col items-center text-center">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-[#1DB954]/40 blur-xl animate-pulse-glow" />
            <img
              src={AVATAR}
              alt="Agnij Dutta"
              className="relative h-28 w-28 rounded-full border-4 border-black object-cover shadow-2xl shadow-black/60 sm:h-32 sm:w-32"
            />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Agnij Dutta</h1>
          <p className="mt-2 text-sm font-medium text-[#1DB954] sm:text-base">
            Full-stack Developer &amp; Blockchain Engineer
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
            <MapPin size={13} className="text-[#1DB954]" />
            Kolkata, India
          </div>
        </section>

        {/* Now playing card */}
        <section className="mt-7 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
          <div className="flex h-5 items-end gap-[3px]" aria-hidden>
            <span className="sound-bar h-2" />
            <span className="sound-bar h-4" />
            <span className="sound-bar h-3" />
            <span className="sound-bar h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1DB954]">Now Playing</p>
            <p className="truncate text-sm font-medium text-white">Building things with code</p>
          </div>
        </section>

        {/* Bio */}
        <p className="mt-6 text-center text-sm leading-relaxed text-white/70">
          Software engineer pursuing a Bachelor&apos;s in Data Science at IIT Madras, building at the
          intersection of AI, Web3, and full-stack engineering — at Workwise and HackQuest.
        </p>

        {/* Primary CTA */}
        <a
          href={RESUME_URL}
          download={RESUME_FILENAME}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#1DB954] py-3.5 text-sm font-bold text-black shadow-lg shadow-[#1DB954]/20 transition-transform active:scale-[0.98]"
        >
          <Download size={18} />
          Download Résumé
        </a>

        {/* Links */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors active:bg-white/10"
            >
              <span className="flex items-center gap-2 truncate">
                <Icon size={18} className="shrink-0 text-[#1DB954]" />
                <span className="truncate">{label}</span>
              </span>
              <ArrowUpRight size={15} className="shrink-0 text-white/40 transition-colors group-active:text-white" />
            </a>
          ))}
        </div>

        {/* Desktop note */}
        <section className="mt-7 rounded-2xl border border-[#1DB954]/20 bg-[#1DB954]/[0.06] p-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1DB954]/15">
              <Monitor size={18} className="text-[#1DB954]" />
            </span>
            <h2 className="text-base font-bold">Best on a bigger screen</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            The full Spotify-style interactive portfolio — projects, the library, live previews, and search — is
            tuned for tablets and desktops. Open{" "}
            <span className="font-semibold text-white">agnij.me</span> on a larger device to explore everything.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Agnij Dutta · agnij.me
        </footer>
      </div>
    </main>
  )
}
