"use client"

import { Home, Search, Library } from "lucide-react"

export type MobileTab = "home" | "search" | "library"

interface MobileBottomNavProps {
  active: MobileTab
  onSelect: (tab: MobileTab) => void
}

const tabs: { key: MobileTab; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "search", label: "Search", icon: Search },
  { key: "library", label: "Your Library", icon: Library },
]

export function MobileBottomNav({ active, onSelect }: MobileBottomNavProps) {
  return (
    <nav className="flex items-stretch justify-around bg-black/95 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur">
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="flex flex-1 flex-col items-center gap-1 pb-2"
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              size={24}
              className={isActive ? "text-white" : "text-[#a7a7a7]"}
              strokeWidth={isActive ? 2.4 : 2}
            />
            <span className={`text-[10px] font-medium ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
