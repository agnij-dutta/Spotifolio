"use client"

import { Play, Pause, Music, Laptop2 } from "lucide-react"
import Image from "next/image"
import { useSpotifyPlayback } from "../../lib/spotify"

/**
 * Spotify-mobile-style "Now Playing" pill that sits just above the bottom tab bar.
 * Display-only (mirrors the desktop PlayerControls behaviour).
 */
export function MobileMiniPlayer() {
  const { playbackState, error } = useSpotifyPlayback(3000)

  const track = playbackState?.item
  const isPlaying = playbackState?.is_playing
  const progress =
    track && track.duration_ms ? Math.min(100, (playbackState!.progress_ms / track.duration_ms) * 100) : 0

  const title = track?.name ?? (error ? "Spotify Unavailable" : "Not Playing")
  const subtitle = track
    ? track.artists.map((a) => a.name).join(", ")
    : error
      ? "Authentication error"
      : "Building things with code"

  return (
    <div className="mx-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#3a2a2a] to-[#2a2a2a] shadow-lg shadow-black/40">
      <div className="flex items-center gap-3 px-2.5 py-2">
        {track?.album?.images?.[0]?.url ? (
          <Image
            src={track.album.images[0].url}
            width={40}
            height={40}
            alt={title}
            className="h-10 w-10 flex-shrink-0 rounded"
          />
        ) : (
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-black/40">
            <Music size={18} className="text-gray-300" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <p className="flex items-center gap-1.5 truncate text-xs text-white/70">
            {track && <Laptop2 size={11} className="flex-shrink-0 text-[#1DB954]" />}
            <span className="truncate">{subtitle}</span>
          </p>
        </div>

        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-white"
        >
          {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
        </button>
      </div>

      {/* Progress line */}
      <div className="mx-2.5 mb-1 h-[3px] overflow-hidden rounded-full bg-white/20">
        <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
