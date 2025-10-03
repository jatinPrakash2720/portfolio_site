import { Timestamp } from 'firebase/firestore'

export interface User {
  id: string
  username: string
  fullName: string
  email: string
  headline: string
  bio: string
  profilePictureUrl: string
  // Multi-domain fields
  portfolioDomain: string
  adminDomain: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  skills?: string[]
  experience?: Experience[]
  education?: Education[]
  projects?: Project[]
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  title: string
  description: string
  coverImageUrl: string
  imageUrl?: string
  videoUrl?: string
  liveUrl?: string
  sourceCodeUrl?: string
  githubUrl?: string
  technologies: string[]
  createdAt: Timestamp | Date

  authorId?: string
  authorUsername?: string
  authorAvatar?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate?: string
  description?: string
}

export interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
}

export interface LinkedInStats {
  connections: number
  followers: number
  profileViews: number
  postImpressions: number
}

export interface DomainResolution {
  domain: string
  appType: 'portfolio' | 'admin'
  user: User
}
