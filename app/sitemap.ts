import { MetadataRoute } from "next"
import { SECTION_TO_SLUG } from "@/lib/sections"

const siteUrl = "https://agnij.me"

const lastModified = new Date()

const priorityFor = (slug: string): number => {
  if (slug === "") return 1.0
  if (["ai-projects", "web-projects", "blockchain-projects"].includes(slug)) return 0.9
  if (["work-experience", "skills", "contact"].includes(slug)) return 0.8
  return 0.7
}

const changeFrequencyFor = (slug: string): MetadataRoute.Sitemap[number]["changeFrequency"] => {
  if (slug === "" || slug === "library" || slug === "achievements") return "weekly"
  if (slug.endsWith("projects")) return "weekly"
  return "monthly"
}

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(SECTION_TO_SLUG).map((slug) => ({
    url: slug === "" ? siteUrl : `${siteUrl}/#${slug}`,
    lastModified,
    changeFrequency: changeFrequencyFor(slug),
    priority: priorityFor(slug),
  }))
}
