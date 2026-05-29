import * as React from "react"

// A phone is gated out of the full experience. iPads / tablets / desktops are not.
// We treat the *shortest physical side* of the screen as the deciding factor so that
// phones are caught in both portrait and landscape, while iPads (>=768 short side)
// always get the full Spotify-style app.
const PHONE_MAX_SHORT_SIDE = 600

function detectPhone(): boolean {
  if (typeof window === "undefined") return false

  const ua = navigator.userAgent || ""

  // Explicit phone user-agents. iPad is intentionally NOT matched here.
  const phoneUA =
    /iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|BB10|Opera Mini|IEMobile|webOS|Mobile Safari/i.test(
      ua,
    ) && !/iPad|Tablet/i.test(ua)

  // Touch-first device with a small physical screen. A desktop with a trackpad/mouse
  // reports a "fine" primary pointer, so resizing a desktop window never triggers this.
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false
  const shortSide = Math.min(
    window.screen?.width ?? Number.POSITIVE_INFINITY,
    window.screen?.height ?? Number.POSITIVE_INFINITY,
  )
  const smallTouch = coarse && shortSide > 0 && shortSide < PHONE_MAX_SHORT_SIDE

  return phoneUA || smallTouch
}

export interface DeviceInfo {
  /** False until the first client-side measurement; used to avoid a hydration flash. */
  ready: boolean
  /** True for mobile phones (the full app is gated for these). */
  isPhone: boolean
}

export function useDevice(): DeviceInfo {
  const [info, setInfo] = React.useState<DeviceInfo>({ ready: false, isPhone: false })

  React.useEffect(() => {
    const update = () => setInfo({ ready: true, isPhone: detectPhone() })
    update()

    const orientation = window.matchMedia("(orientation: portrait)")
    orientation.addEventListener?.("change", update)
    window.addEventListener("resize", update)
    return () => {
      orientation.removeEventListener?.("change", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return info
}

/**
 * Reusable media-query hook. Returns `false` during SSR / before mount, then tracks
 * the query live. Used for tablet-vs-desktop layout decisions.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}
