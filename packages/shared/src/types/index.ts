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
}

export interface Project {
  id: string
  title: string
  description: string
  coverImageUrl: string
  videoUrl?: string
  liveUrl?: string
  sourceCodeUrl?: string
  technologies: string[]
  createdAt: Timestamp

  authorId: string
  authorUsername: string
  authorAvatar: string
}
