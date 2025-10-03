import { z } from 'zod'

// User Schema
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  skills: z.array(z.string()),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string(),
    current: z.boolean().default(false),
  })),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    gpa: z.number().optional(),
    description: z.string().optional(),
  })),
  projects: z.array(z.string()), // Array of project IDs
  socialLinks: z.record(z.string(), z.string()).optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']).default('dark'),
    language: z.string().default('en'),
    timezone: z.string().default('UTC'),
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(false),
    }),
  }),
  isPublic: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Type definitions
export type User = z.infer<typeof userSchema>
export type UserExperience = User['experience'][0]
export type UserEducation = User['education'][0]
export type UserPreferences = User['preferences']

export interface UserProfile {
  user: User
  stats: {
    totalProjects: number
    totalExperience: number
    skillsCount: number
    profileCompleteness: number
  }
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    githubUrl: 'https://github.com/johndoe',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    twitterUrl: 'https://twitter.com/johndoe',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    experience: [
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Senior Full-stack Developer',
        startDate: '2022-01-01',
        current: true,
        description: 'Leading development of microservices architecture and mentoring junior developers.',
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Full-stack Developer',
        startDate: '2020-06-01',
        endDate: '2021-12-31',
        current: false,
        description: 'Built and maintained the main product platform using React and Node.js.',
      },
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016-09-01',
        endDate: '2020-05-31',
        gpa: 3.8,
        description: 'Focused on software engineering and data structures.',
      },
    ],
    projects: ['1', '2', '3'],
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      timezone: 'America/Los_Angeles',
      notifications: {
        email: true,
        push: false,
      },
    },
    isPublic: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
  },
]

// User Service
export class UserService {
  private users: User[] = mockUsers

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users]
  }

  async getPublicUsers(): Promise<User[]> {
    return this.users.filter(user => user.isPublic)
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.users.push(newUser)
    return newUser
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id)
    if (index === -1) return null

    this.users[index] = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return this.users[index]
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id)
    if (index === -1) return false

    this.users.splice(index, 1)
    return true
  }

  async getUserProfile(id: string): Promise<UserProfile | null> {
    const user = await this.getUserById(id)
    if (!user) return null

    const stats = {
      totalProjects: user.projects.length,
      totalExperience: user.experience.length,
      skillsCount: user.skills.length,
      profileCompleteness: this.calculateProfileCompleteness(user),
    }

    return { user, stats }
  }

  private calculateProfileCompleteness(user: User): number {
    const fields = [
      user.name,
      user.bio,
      user.avatar,
      user.location,
      user.website,
      user.githubUrl,
      user.linkedinUrl,
      user.skills.length > 0,
      user.experience.length > 0,
      user.education.length > 0,
    ]

    const completedFields = fields.filter(Boolean).length
    return Math.round((completedFields / fields.length) * 100)
  }

  async searchUsers(query: string): Promise<User[]> {
    const lowercaseQuery = query.toLowerCase()
    return this.users.filter(user =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.bio?.toLowerCase().includes(lowercaseQuery) ||
      user.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
    )
  }

  async getUsersBySkill(skill: string): Promise<User[]> {
    return this.users.filter(user =>
      user.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    )
  }

  async addExperience(userId: string, experience: Omit<UserExperience, 'id'>): Promise<User | null> {
    const user = await this.getUserById(userId)
    if (!user) return null

    const newExperience: UserExperience = {
      ...experience,
      id: Date.now().toString(),
    }

    user.experience.push(newExperience)
    user.updatedAt = new Date().toISOString()

    return user
  }

  async updateExperience(userId: string, experienceId: string, updates: Partial<UserExperience>): Promise<User | null> {
    const user = await this.getUserById(userId)
    if (!user) return null

    const experienceIndex = user.experience.findIndex(exp => exp.id === experienceId)
    if (experienceIndex === -1) return null

    user.experience[experienceIndex] = {
      ...user.experience[experienceIndex],
      ...updates,
    }
    user.updatedAt = new Date().toISOString()

    return user
  }

  async deleteExperience(userId: string, experienceId: string): Promise<User | null> {
    const user = await this.getUserById(userId)
    if (!user) return null

    user.experience = user.experience.filter(exp => exp.id !== experienceId)
    user.updatedAt = new Date().toISOString()

    return user
  }

  async addEducation(userId: string, education: Omit<UserEducation, 'id'>): Promise<User | null> {
    const user = await this.getUserById(userId)
    if (!user) return null

    const newEducation: UserEducation = {
      ...education,
      id: Date.now().toString(),
    }

    user.education.push(newEducation)
    user.updatedAt = new Date().toISOString()

    return user
  }

  async updateEducation(userId: string, educationId: string, updates: Partial<UserEducation>): Promise<User | null> {
    const user = await this.getUserById(userId)
    if (!user) return null

    const educationIndex = user.education.findIndex(edu => edu.id === educationId)
    if (educationIndex === -1) return null

    user.education[educationIndex] = {
      ...user.education[educationIndex],
      ...updates,
    }
    user.updatedAt = new Date().toISOString()

    return user
  }

  async deleteEducation(userId: string, educationId: string): Promise<User | null> {
    const user = await this.getUserById(userId)
    if (!user) return null

    user.education = user.education.filter(edu => edu.id !== educationId)
    user.updatedAt = new Date().toISOString()

    return user
  }
}

// Default instance
export const userService = new UserService()

// Utility functions
export function formatUserDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getExperienceDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  
  if (diffInMonths < 1) return 'Less than 1 month'
  if (diffInMonths === 1) return '1 month'
  if (diffInMonths < 12) return `${diffInMonths} months`
  
  const years = Math.floor(diffInMonths / 12)
  const months = diffInMonths % 12
  
  if (months === 0) return `${years} year${years > 1 ? 's' : ''}`
  return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
