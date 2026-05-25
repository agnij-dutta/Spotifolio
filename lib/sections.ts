export const SECTION_TO_SLUG: Record<string, string> = {
  Home: "",
  "Your Library": "library",
  Achievements: "achievements",
  Education: "education",
  "Work Experience": "work-experience",
  "AI Projects": "ai-projects",
  "Web Projects": "web-projects",
  "Blockchain Projects": "blockchain-projects",
  "Skills & Tools": "skills",
  Contact: "contact",
}

export const SLUG_TO_SECTION: Record<string, string> = Object.fromEntries(
  Object.entries(SECTION_TO_SLUG).map(([section, slug]) => [slug, section])
)

export const SECTIONS = Object.keys(SECTION_TO_SLUG)
