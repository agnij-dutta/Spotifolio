"use client"

import { useState } from "react"
import {
  Trophy,
  BadgeCheck,
  Star,
  Medal,
  Play,
  Clock,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { achievementCategories, Achievement, allAchievements } from "@/data/achievements"

interface AchievementsSectionProps {
  setActiveSection?: (section: string) => void
}

const categoryIcons = {
  hackathon: Trophy,
  certification: BadgeCheck,
  recognition: Star,
  award: Medal,
}

// Spotify playlist-style achievement row
function AchievementRow({ achievement, index }: { achievement: Achievement; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = categoryIcons[achievement.category]

  return (
    <div
      className="group grid grid-cols-[16px_44px_1fr_auto_80px] md:grid-cols-[40px_44px_1fr_180px_80px_40px] gap-4 items-center px-4 py-2 rounded-md hover:bg-white/10 transition-colors cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Index */}
      <div className="flex items-center justify-center">
        {isHovered ? (
          <Play size={14} className="text-white" fill="white" />
        ) : (
          <span className="text-sm text-[#a7a7a7]">{index + 1}</span>
        )}
      </div>

      {/* Icon */}
      <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden">
        {achievement.icon.startsWith('http') || achievement.icon.startsWith('/') ? (
          <Image
            src={achievement.icon}
            alt={achievement.title}
            width={40}
            height={40}
            className="object-contain bg-[#282828] p-1.5 rounded w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-[#282828] flex items-center justify-center rounded">
            <Icon size={20} className="text-[#1DB954]" />
          </div>
        )}
      </div>

      {/* Title + org */}
      <div className="min-w-0">
        <h4 className="text-sm font-medium text-white truncate group-hover:text-white">
          {achievement.title}
        </h4>
        <p className="text-xs text-[#a7a7a7] truncate">
          {achievement.organization}
        </p>
      </div>

      {/* Description - hidden on mobile */}
      <div className="hidden md:block text-sm text-[#a7a7a7] truncate">
        {achievement.description}
      </div>

      {/* Badge/Position */}
      <div className="flex items-center justify-end">
        {achievement.badge && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1DB954] font-medium">
            {achievement.badge}
          </span>
        )}
      </div>

      {/* Actions - hidden on mobile */}
      <div className="hidden md:flex items-center justify-end">
        {achievement.link ? (
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
          >
            <ExternalLink size={16} className="text-[#a7a7a7]" />
          </a>
        ) : (
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded">
            <MoreHorizontal size={16} className="text-[#a7a7a7]" />
          </button>
        )}
      </div>
    </div>
  )
}

export function AchievementsSection({ setActiveSection }: AchievementsSectionProps) {
  const totalCount = allAchievements.length
  const hackathonWins = allAchievements.filter(a => a.badge === '1st Place' || a.badge === 'Bounty Winner').length

  return (
    <ScrollArea className="flex-1 bg-[#121212] text-white rounded-xl h-full">
      {/* Playlist-style header with gradient */}
      <div className="bg-gradient-to-b from-amber-900/60 to-[#121212] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          {/* Playlist cover - trophy grid */}
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-2xl shadow-black/50 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <Trophy size={80} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider">Playlist</p>
            <h1 className="text-4xl md:text-7xl font-bold mt-2">Achievements</h1>
            <div className="flex items-center gap-1 mt-4 text-sm text-[#a7a7a7]">
              <span className="font-bold text-white">Agnij Dutta</span>
              <span className="mx-1">&bull;</span>
              <span>{totalCount} achievements</span>
              {hackathonWins > 0 && (
                <>
                  <span className="mx-1">&bull;</span>
                  <span>{hackathonWins} wins</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls row */}
      <div className="px-6 md:px-8 py-4 flex items-center gap-6">
        <button className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 transition-all flex items-center justify-center shadow-lg">
          <Play size={28} className="text-black ml-1" fill="black" />
        </button>
      </div>

      {/* Table header */}
      <div className="px-6 md:px-8">
        <div className="grid grid-cols-[16px_44px_1fr_auto_80px] md:grid-cols-[40px_44px_1fr_180px_80px_40px] gap-4 items-center px-4 py-2 border-b border-white/10 text-xs text-[#a7a7a7] uppercase tracking-wider">
          <div className="text-center">#</div>
          <div></div>
          <div>Title</div>
          <div className="hidden md:block">Description</div>
          <div className="text-right">Award</div>
          <div className="hidden md:block"></div>
        </div>

        {/* Achievement rows */}
        <div className="mt-1">
          {achievementCategories.map((category) => (
            <div key={category.id}>
              {/* Category divider - subtle, like Spotify disc separators */}
              {achievementCategories.indexOf(category) > 0 && (
                <div className="py-3 px-4">
                  <div className="border-t border-white/5" />
                </div>
              )}
              {category.achievements.map((achievement, index) => {
                const globalIndex = allAchievements.indexOf(achievement)
                return (
                  <AchievementRow
                    key={achievement.id}
                    achievement={achievement}
                    index={globalIndex}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer spacing */}
      <div className="h-8" />
    </ScrollArea>
  )
}
