export interface Achievement {
  id: string
  title: string
  organization: string
  date: string
  category: 'hackathon' | 'certification' | 'recognition' | 'award'
  description: string
  icon: string
  color: string
  link?: string
  badge?: string
  position?: string
}

export interface AchievementCategory {
  id: string
  title: string
  subtitle: string
  icon: string
  gradient: string
  achievements: Achievement[]
}

export const achievementCategories: AchievementCategory[] = [
  {
    id: 'hackathons',
    title: 'Hackathon Wins',
    subtitle: 'Competition victories across India',
    icon: 'trophy',
    gradient: 'from-amber-500 to-orange-600',
    achievements: [
      {
        id: 'hack-ethglobal',
        title: 'ETHGlobal New Delhi',
        organization: 'ETHGlobal',
        date: '2024',
        category: 'hackathon',
        description: 'Bounty winner at ETHGlobal New Delhi among 2000+ participants building decentralized applications.',
        icon: 'https://assets.ethglobal.com/logo-ethglobal.svg',
        color: '#627EEA',
        position: 'Bounty Winner',
        badge: 'Bounty Winner',
        link: 'https://ethglobal.com'
      },
      {
        id: 'hack-avalanche',
        title: 'Avalanche Team1 Hackathon Kolkata',
        organization: 'Avalanche',
        date: '2024',
        category: 'hackathon',
        description: 'First place out of 100+ teams at the Avalanche Team1 Hackathon in Kolkata.',
        icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
        color: '#E84142',
        position: '1st Place',
        badge: '1st Place'
      },
      {
        id: 'hack-eibs',
        title: 'East India Blockchain Summit 2025',
        organization: 'IIT Kharagpur',
        date: '2025',
        category: 'hackathon',
        description: 'Second place at the East India Blockchain Summit hackathon held at IIT Kharagpur.',
        icon: 'https://skillicons.dev/icons?i=ethereum',
        color: '#3B82F6',
        position: '2nd Place',
        badge: '2nd Place'
      },
      {
        id: 'hack-educhain',
        title: 'Edu-Chain Regional Hackathon',
        organization: 'Techno Main Salt Lake',
        date: '2024',
        category: 'hackathon',
        description: 'Third place at the Edu-Chain Regional Hackathon at Techno Main Salt Lake, Kolkata.',
        icon: 'https://skillicons.dev/icons?i=solidity',
        color: '#10B981',
        position: '3rd Place',
        badge: '3rd Place'
      },
      {
        id: 'hack-stellar',
        title: 'Build on Stellar Kolkata',
        organization: 'Stellar Development Foundation',
        date: '2024',
        category: 'hackathon',
        description: 'Fourth place at the Build on Stellar hackathon in Kolkata.',
        icon: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg',
        color: '#7C3AED',
        position: '4th Place',
        badge: '4th Place'
      },
      {
        id: 'hack-techtriad',
        title: 'Tech Triad Hackathon',
        organization: 'IIT Kharagpur',
        date: '2025',
        category: 'hackathon',
        description: 'Second place at the Tech Triad Hackathon held at IIT Kharagpur.',
        icon: 'https://skillicons.dev/icons?i=github',
        color: '#F59E0B',
        position: '2nd Place',
        badge: '2nd Place'
      },
      {
        id: 'hack-kshitij',
        title: 'AI Hackathon @ KSHITIJ',
        organization: 'IIT Kharagpur',
        date: '2025',
        category: 'hackathon',
        description: 'Second place at the AI hackathon during KSHITIJ, the annual techno-management fest of IIT Kharagpur.',
        icon: 'https://skillicons.dev/icons?i=pytorch',
        color: '#8B5CF6',
        position: '2nd Place',
        badge: '2nd Place'
      },
    ]
  },
]

export const allAchievements = achievementCategories.flatMap(cat => cat.achievements)
