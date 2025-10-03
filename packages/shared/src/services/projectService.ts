import { z } from 'zod'

// Project Schema
const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  longDescription: z.string().optional(),
  imageUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  technologies: z.array(z.string()),
  category: z.enum(['web', 'mobile', 'desktop', 'api', 'library', 'other']),
  status: z.enum(['completed', 'in-progress', 'planned', 'archived']),
  featured: z.boolean().default(false),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  teamSize: z.number().optional(),
  role: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  solutions: z.array(z.string()).optional(),
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Type definitions
export type Project = z.infer<typeof projectSchema>
export type ProjectCategory = Project['category']
export type ProjectStatus = Project['status']

export interface ProjectFilters {
  category?: ProjectCategory
  status?: ProjectStatus
  featured?: boolean
  technologies?: string[]
  search?: string
}

export interface ProjectStats {
  total: number
  byCategory: Record<ProjectCategory, number>
  byStatus: Record<ProjectStatus, number>
  byTechnology: Record<string, number>
  featured: number
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js and Node.js',
    longDescription: 'A comprehensive e-commerce solution featuring user authentication, product management, shopping cart, payment processing, and admin dashboard. Built with modern web technologies and deployed on AWS.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    category: 'web',
    status: 'completed',
    featured: true,
    startDate: '2023-01-15',
    endDate: '2023-06-30',
    teamSize: 3,
    role: 'Full-stack Developer',
    highlights: [
      'Implemented real-time inventory management',
      'Integrated secure payment processing with Stripe',
      'Built responsive admin dashboard',
      'Achieved 99.9% uptime on AWS'
    ],
    challenges: [
      'Handling high traffic during peak shopping seasons',
      'Implementing secure payment processing',
      'Managing complex product variations'
    ],
    solutions: [
      'Implemented Redis caching for better performance',
      'Used Stripe webhooks for secure payment handling',
      'Created flexible product configuration system'
    ],
    metrics: {
      'Monthly Active Users': '10,000+',
      'Conversion Rate': '3.2%',
      'Page Load Time': '1.2s',
      'Uptime': '99.9%'
    },
    tags: ['ecommerce', 'fullstack', 'typescript', 'aws'],
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-06-30T00:00:00Z',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    longDescription: 'A modern task management solution with real-time collaboration, drag-and-drop functionality, and team management features. Built with React and Firebase for real-time synchronization.',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/username/task-manager',
    liveUrl: 'https://taskmanager-demo.vercel.app',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'Redux'],
    category: 'web',
    status: 'completed',
    featured: true,
    startDate: '2023-03-01',
    endDate: '2023-05-15',
    teamSize: 2,
    role: 'Frontend Developer',
    highlights: [
      'Real-time collaboration features',
      'Drag-and-drop task management',
      'Team and project organization',
      'Mobile-responsive design'
    ],
    tags: ['productivity', 'collaboration', 'react', 'firebase'],
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-05-15T00:00:00Z',
  },
  {
    id: '3',
    title: 'Weather API Service',
    description: 'A RESTful API service for weather data with caching and rate limiting',
    longDescription: 'A high-performance weather API service that aggregates data from multiple sources, implements intelligent caching, and provides rate limiting for optimal performance.',
    githubUrl: 'https://github.com/username/weather-api',
    liveUrl: 'https://weather-api.herokuapp.com',
    technologies: ['Node.js', 'Express', 'Redis', 'MongoDB', 'Docker', 'AWS'],
    category: 'api',
    status: 'completed',
    featured: false,
    startDate: '2023-02-01',
    endDate: '2023-04-30',
    teamSize: 1,
    role: 'Backend Developer',
    highlights: [
      'Implemented Redis caching for 90% faster response times',
      'Built rate limiting to handle 1000+ requests per minute',
      'Created comprehensive API documentation',
      'Achieved 99.95% uptime'
    ],
    metrics: {
      'Requests per minute': '1000+',
      'Average Response Time': '50ms',
      'Cache Hit Rate': '90%',
      'Uptime': '99.95%'
    },
    tags: ['api', 'backend', 'caching', 'performance'],
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-04-30T00:00:00Z',
  },
  {
    id: '4',
    title: 'Mobile Banking App',
    description: 'A secure mobile banking application with biometric authentication',
    longDescription: 'A comprehensive mobile banking solution with advanced security features, biometric authentication, and real-time transaction monitoring.',
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    category: 'mobile',
    status: 'in-progress',
    featured: true,
    startDate: '2023-06-01',
    teamSize: 4,
    role: 'Mobile Developer',
    highlights: [
      'Implemented biometric authentication',
      'Built secure transaction processing',
      'Created intuitive user interface',
      'Integrated with banking APIs'
    ],
    tags: ['mobile', 'banking', 'security', 'react-native'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
  },
]

// Project Service
export class ProjectService {
  private projects: Project[] = mockProjects

  async getAllProjects(): Promise<Project[]> {
    return [...this.projects]
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projects.find(project => project.id === id) || null
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projects.filter(project => project.featured)
  }

  async getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
    return this.projects.filter(project => project.category === category)
  }

  async getProjectsByStatus(status: ProjectStatus): Promise<Project[]> {
    return this.projects.filter(project => project.status === status)
  }

  async searchProjects(query: string): Promise<Project[]> {
    const lowercaseQuery = query.toLowerCase()
    return this.projects.filter(project =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
      project.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  async filterProjects(filters: ProjectFilters): Promise<Project[]> {
    let filteredProjects = [...this.projects]

    if (filters.category) {
      filteredProjects = filteredProjects.filter(project => project.category === filters.category)
    }

    if (filters.status) {
      filteredProjects = filteredProjects.filter(project => project.status === filters.status)
    }

    if (filters.featured !== undefined) {
      filteredProjects = filteredProjects.filter(project => project.featured === filters.featured)
    }

    if (filters.technologies && filters.technologies.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        filters.technologies!.some(tech => project.technologies.includes(tech))
      )
    }

    if (filters.search) {
      const searchResults = await this.searchProjects(filters.search)
      filteredProjects = filteredProjects.filter(project =>
        searchResults.some(result => result.id === project.id)
      )
    }

    return filteredProjects
  }

  async getProjectStats(): Promise<ProjectStats> {
    const total = this.projects.length
    const featured = this.projects.filter(project => project.featured).length

    const byCategory = this.projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1
      return acc
    }, {} as Record<ProjectCategory, number>)

    const byStatus = this.projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    }, {} as Record<ProjectStatus, number>)

    const byTechnology = this.projects.reduce((acc, project) => {
      project.technologies.forEach(tech => {
        acc[tech] = (acc[tech] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    return {
      total,
      byCategory,
      byStatus,
      byTechnology,
      featured,
    }
  }

  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.projects.push(newProject)
    return newProject
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    const index = this.projects.findIndex(project => project.id === id)
    if (index === -1) return null

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return this.projects[index]
  }

  async deleteProject(id: string): Promise<boolean> {
    const index = this.projects.findIndex(project => project.id === id)
    if (index === -1) return false

    this.projects.splice(index, 1)
    return true
  }
}

// Default instance
export const projectService = new ProjectService()

// Utility functions
export function formatProjectDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getProjectDuration(startDate?: string, endDate?: string): string {
  if (!startDate) return 'Ongoing'
  
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  
  if (diffInMonths < 1) return 'Less than 1 month'
  if (diffInMonths === 1) return '1 month'
  return `${diffInMonths} months`
}

export function getProjectStatusColor(status: ProjectStatus): string {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-100'
    case 'in-progress':
      return 'text-blue-600 bg-blue-100'
    case 'planned':
      return 'text-yellow-600 bg-yellow-100'
    case 'archived':
      return 'text-gray-600 bg-gray-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}
