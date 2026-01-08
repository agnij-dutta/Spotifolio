import type { Metadata, Viewport } from "next"
import "./globals.css"

const siteUrl = "https://agnij.dev"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agnij Dutta | Full-stack Developer & Blockchain Engineer",
    template: "%s | Agnij Dutta",
  },
  description:
    "Full-stack developer & blockchain engineer from Kolkata. Building at Workwise & HackQuest. IIT Madras Data Science student. React, Next.js, TypeScript.",
  keywords: [
    "Agnij Dutta",
    "Agnij Dutta portfolio",
    "full-stack developer",
    "full-stack developer India",
    "full-stack developer Kolkata",
    "blockchain developer",
    "blockchain engineer",
    "blockchain engineer India",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "IIT Madras",
    "IIT Madras data science",
    "data science student",
    "machine learning engineer",
    "ML engineer",
    "software engineer",
    "web developer",
    "frontend developer",
    "backend developer",
    "smart contract developer",
    "Solidity developer",
    "human-centered software",
    "product engineer",
    "Workwise",
    "HackQuest",
    "developer advocate",
    "SDE intern",
    "portfolio website",
    "developer portfolio",
    "tech portfolio",
  ],
  authors: [{ name: "Agnij Dutta", url: siteUrl }],
  creator: "Agnij Dutta",
  publisher: "Agnij Dutta",
  category: "technology",
  classification: "Portfolio Website",
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
  openGraph: {
    title: "Agnij Dutta | Full-stack Developer & Blockchain Engineer",
    description:
      "Full-stack developer and blockchain engineer from Kolkata. Building human-centered software at Workwise and HackQuest. IIT Madras Data Science student specializing in React, Next.js, TypeScript, and machine learning.",
    url: siteUrl,
    siteName: "Agnij Dutta Portfolio",
    images: [
      {
        url: `${siteUrl}/profile.jpg`,
        width: 1200,
        height: 630,
        alt: "Agnij Dutta - Full-stack Developer and Blockchain Engineer",
      },
    ],
    type: "website",
    locale: "en_US",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@0xholmesdev",
    site: "@0xholmesdev",
    title: "Agnij Dutta | Full-stack Developer & Blockchain Engineer",
    description:
      "Full-stack and blockchain developer from Kolkata. Building at Workwise and HackQuest. IIT Madras Data Science student.",
    images: [`${siteUrl}/profile.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  applicationName: "Agnij Dutta Portfolio",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Agnij Dutta",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata",
    "geo.position": "22.5726;88.3639",
    "ICBM": "22.5726, 88.3639",
    "mobile-web-app-capable": "yes",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Agnij Dutta",
  alternateName: ["Agnij", "Agnij D.", "Agnij Dutta Portfolio"],
  jobTitle: ["Full-stack Developer", "Blockchain Engineer", "Software Engineer"],
  description:
    "Full-stack developer and blockchain engineer from Kolkata, India. Currently studying Data Science at IIT Madras. Building human-centered software at Workwise and HackQuest. Specializes in React, Next.js, TypeScript, blockchain protocols, and machine learning.",
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/agnij-dutta",
    "https://linkedin.com/in/agnij-dutta",
    "https://x.com/0xholmesdev",
  ],
  worksFor: [
    {
      "@type": "Organization",
      name: "Workwise",
      jobTitle: "SDE Intern",
    },
    {
      "@type": "Organization",
      name: "HackQuest",
      jobTitle: "Developer Advocate",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Madras",
    department: {
      "@type": "Organization",
      name: "Data Science and AI Applications",
    },
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Data Science",
    "Machine Learning",
    "Blockchain",
    "Smart Contracts",
    "Solidity",
    "Web3",
    "Python",
    "Human-centered design",
    "Full-stack development",
    "Frontend development",
    "Backend development",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "Bachelor's Degree",
      about: "Data Science and AI Applications",
    },
  ],
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}#business`,
  name: "Agnij Dutta - Software Development Services",
  description: "Full-stack development and blockchain engineering services",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Web Development",
    "Blockchain Development",
    "Full-stack Development",
    "Software Engineering",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
  