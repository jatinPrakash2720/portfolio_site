import PortfolioPage from '../components/portfolio/PortfolioPage'
import { domainService } from '../../../../packages/shared/src/services/domainService'
import { notFound } from 'next/navigation'

// Mock user data for development
const mockUser = {
  id: 'dev-user-1',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  headline: 'Full-stack Developer & UI/UX Enthusiast',
  bio: 'I am a passionate full-stack developer with over 5 years of experience in building scalable web applications and mobile solutions. My journey in technology began during my computer science studies, where I discovered my love for problem-solving and creating innovative digital experiences.',
  profilePictureUrl:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  portfolioDomain: 'localhost:3001',
  adminDomain: 'localhost:3002',
  socialLinks: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
  },
  skills: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Git',
    'Figma',
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Full-stack Developer',
      startDate: '2022-01-01',
      current: true,
      description:
        'Leading development of microservices architecture and mentoring junior developers.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full-stack Developer',
      startDate: '2020-06-01',
      endDate: '2021-12-31',
      current: false,
      description:
        'Built and maintained the main product platform using React and Node.js.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2016-09-01',
      endDate: '2020-05-31',
      description:
        'Graduated with honors, focused on software engineering and algorithms.',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description:
        'A full-stack e-commerce solution built with React, Node.js, and MongoDB.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/johndoe/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      imageUrl:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      coverImageUrl:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      createdAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      githubUrl: 'https://github.com/johndoe/taskmanager',
      liveUrl: 'https://taskmanager-demo.com',
      imageUrl:
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      coverImageUrl:
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      createdAt: new Date('2023-06-01'),
    },
  ],
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date(),
}

export default async function RootPortfolioPage() {
  // Get the host from headers (subdomain)
  const host = process.env.VERCEL_URL || 'localhost:3001'

  // Handle localhost for development
  if (host.includes('localhost')) {
    return <PortfolioPage user={mockUser} domain="localhost:3001" />
  }

  // For production subdomains
  // const resolution = await domainService.resolveDomain(host)

  // if (!resolution || resolution.appType !== 'portfolio') {
  //   notFound()
  // }

  // return <PortfolioPage user={resolution.user} domain={host} />
}

export async function generateMetadata() {
  const host = process.env.VERCEL_URL || 'localhost:3001'

  // Handle localhost for development
  if (host.includes('localhost')) {
    return {
      title: 'Portfolio Development - Localhost',
      description: 'Development portfolio page',
    }
  }

  // For production subdomains
  const resolution = await domainService.resolveDomain(host)

  if (!resolution || resolution.appType !== 'portfolio') {
    return {
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found',
    }
  }

  return {
    title: `${resolution.user.fullName} - Portfolio`,
    description:
      resolution.user.bio || `${resolution.user.fullName}'s portfolio`,
    openGraph: {
      title: `${resolution.user.fullName} - Portfolio`,
      description:
        resolution.user.bio || `${resolution.user.fullName}'s portfolio`,
      images: resolution.user.profilePictureUrl
        ? [resolution.user.profilePictureUrl]
        : [],
    },
  }
}
