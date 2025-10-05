'use client'

import React, { useState, lazy, Suspense, memo } from 'react'
import AnimatedList from './ui/animated-list'
import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewUrl,
  WebPreviewBody,
} from '../../src/components/ai-elements/web-preview'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from './ui/button'
import { InfoIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Lazy load heavy components
const PixelBlast = lazy(() => import('./PixelBlast'))

interface Project {
  id: string
  name: string
  description: string
  url: string
  thumbnail: string
  tags: string[]
}

const hardcodedProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description:
      'Full-stack online shopping platform with cart and payment integration',
    url: 'http://34.69.58.115:3000',
    thumbnail:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Collaborative task tracking with real-time updates',
    url: 'https://github.com',
    thumbnail:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
    tags: ['Next.js', 'Firebase', 'TypeScript'],
  },
  {
    id: '3',
    name: 'Weather Dashboard',
    description: 'Real-time weather forecasting with interactive maps',
    url: 'https://openweathermap.org',
    thumbnail:
      'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400',
    tags: ['React', 'API', 'Charts'],
  },
  {
    id: '4',
    name: 'Social Media Clone',
    description: 'Instagram-like social platform with posts and stories',
    url: 'https://instagram.com',
    thumbnail:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    tags: ['React', 'Redux', 'Express'],
  },
  {
    id: '5',
    name: 'Portfolio Builder',
    description: 'Drag-and-drop portfolio website creator',
    url: 'https://ai-sdk.dev',
    thumbnail:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400',
    tags: ['Next.js', 'Tailwind', 'Framer'],
  },
  {
    id: '6',
    name: 'Chat Application',
    description: 'Real-time messaging with WebSockets',
    url: 'https://socket.io',
    thumbnail:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
    tags: ['Socket.io', 'React', 'Node.js'],
  },
  {
    id: '7',
    name: 'Music Streaming App',
    description: 'Spotify-like music player with playlists',
    url: 'https://spotify.com',
    thumbnail:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    tags: ['React', 'Audio API', 'Redux'],
  },
  {
    id: '8',
    name: 'Fitness Tracker',
    description: 'Track workouts, calories, and progress',
    url: 'https://fitbit.com',
    thumbnail:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    tags: ['React Native', 'Charts', 'Firebase'],
  },
]

// Memoized components for better performance
const ProjectCard = memo(
  ({
    project,
    isSelected,
    onClick,
  }: {
    project: Project
    isSelected: boolean
    onClick: () => void
  }) => (
    <div
      className="col-span-2 row-span-1 row-start-6 rounded-2xl overflow-hidden bg-black/80 backdrop-blur-sm border-2 border-purple-500/20 cursor-pointer hover:border-purple-500/50 transition-all hover:scale-[1.02] group"
      onClick={onClick}
    >
      <div className="relative h-full p-3 flex items-center gap-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm group-hover:text-purple-400 transition-colors truncate">
            {project.name}
          </h4>
          <p className="text-xs text-white/60 truncate">{project.tags[0]}</p>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
        )}
      </div>
    </div>
  ),
)

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

export default function ProjectsPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<Project>(
    hardcodedProjects[0],
  )
  const [featuredProjects] = useState<Project[]>(hardcodedProjects.slice(0, 3))
  const [showProjectDetails, setShowProjectDetails] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [isPixelBlastLoaded, setIsPixelBlastLoaded] = useState(false)
  const [isWebPreviewLoaded, setIsWebPreviewLoaded] = useState(false)

  // Fallback timeout to hide loader if iframe doesn't fire onLoad
  React.useEffect(() => {
    if (!isWebPreviewLoaded) {
      const timeout = setTimeout(() => {
        setIsWebPreviewLoaded(true)
      }, 3000) // Hide loader after 3 seconds max

      return () => clearTimeout(timeout)
    }
  }, [isWebPreviewLoaded])

  const projectNames = hardcodedProjects.map((p) => p.name)

  const handleProjectSelect = (name: string, index: number) => {
    setSelectedProject(hardcodedProjects[index])
    setIsWebPreviewLoaded(false) // Reset loader when project changes
    setShowDescription(false) // Hide description when selecting new project
  }

  const handleDescriptionClick = () => {
    setShowDescription(!showDescription)
    setShowProjectDetails(false) // Hide overlay when showing description in sidebar
  }

  const handleProfileClick = () => {
    router.push('/')
  }

  const handleContactClick = () => {
    router.push('/contact')
  }

  return (
    <div
      className={`h-screen flex relative transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Fallback Background */}
      {!isPixelBlastLoaded && (
        <div
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-purple-900/20 via-black to-purple-800/10'
              : 'bg-gradient-to-br from-purple-100/30 via-gray-50 to-purple-200/20'
          }`}
        />
      )}

      {/* PixelBlast Background - Lazy loaded */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<LoadingSpinner />}>
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color={theme === 'dark' ? '#8B5CF6' : '#A855F7'}
            patternScale={2}
            patternDensity={0.8}
            pixelSizeJitter={0.3}
            enableRipples={false}
            liquid={false}
            speed={0.3}
            edgeFade={0.15}
            transparent
            onLoad={() => setIsPixelBlastLoaded(true)}
          />
        </Suspense>
      </div>

      {/* Tint Overlay */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-300 ${
          theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/20'
        }`}
      />

      <main className="flex-1 relative z-10 ">
        {/* Mobile: 5x6, Tablet: 8x5, Desktop: 8x6 Grid */}
        <div className="relative grid grid-cols-5 grid-rows-6 md:grid-cols-8 md:grid-rows-5 lg:grid-rows-6 gap-3 m-4 md:m-6 lg:m-10 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-5rem)]">
          {/* Web Preview - Mobile: 5x4, Tablet: 6x4, Desktop: 6x5 */}
          <div className="col-span-5 row-span-3 md:col-span-6 md:row-span-5 lg:row-span-5 lgrounded-2xl md:rounded-3xl overflow-hidden bg-black/80 backdrop-blur-sm border-2 border-purple-500/20 relative">
            {/* Project Details Overlay */}
            {showProjectDetails && (
              <div className="absolute inset-0 z-20 bg-black/90 backdrop-blur-sm p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold">{selectedProject.name}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowProjectDetails(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-white/70 mb-4 text-lg">
                  {selectedProject.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-600/20 border-2 border-purple-500/30 rounded-full text-sm text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Web Preview */}
            <div className="h-full relative">
              {!isWebPreviewLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Loading preview...</p>
                  </div>
                </div>
              )}
              <WebPreview
                defaultUrl={selectedProject.url}
                style={{ height: '100%' }}
              >
                <WebPreviewNavigation
                  onDescriptionClick={handleDescriptionClick}
                >
                  <WebPreviewUrl src={selectedProject.url} />
                </WebPreviewNavigation>
                <WebPreviewBody
                  src={selectedProject.url}
                  onLoad={() => setIsWebPreviewLoaded(true)}
                />
              </WebPreview>
            </div>
          </div>

          {/* Project List / Description - Mobile: 5x2, Tablet: 2x3, Desktop: 2x4 */}
          <div className="col-span-5 row-span-2 row-start-4 md:col-span-2 md:row-span-3 md:col-start-7 md:row-start-1 lg:col-span-2 lg:row-span-4 lg:col-start-7 lg:row-start-1 rounded-2xl md:rounded-3xl overflow-hidden bg-black/80 backdrop-blur-sm border-2 border-purple-500/20">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">
                    {showDescription ? 'Project Details' : 'All Projects'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60">
                      {showDescription
                        ? selectedProject.name
                        : `${hardcodedProjects.length} total`}
                    </span>
                    {showDescription && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDescription(false)}
                        className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                {showDescription ? (
                  <div className="p-4 h-full overflow-y-auto scrollbar-hide">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">
                          Description
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">
                          Project URL
                        </h4>
                        <a
                          href={selectedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm break-all underline"
                        >
                          {selectedProject.url}
                        </a>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">
                          Project ID
                        </h4>
                        <p className="text-white/60 text-sm font-mono">
                          {selectedProject.id}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto scrollbar-hide">
                    <AnimatedList
                      items={projectNames}
                      onItemSelect={handleProjectSelect}
                      showGradients={true}
                      enableArrowNavigation={true}
                      displayScrollbar={true}
                      initialSelectedIndex={0}
                      className="h-full text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured Projects - Reduced size for laptop: 3x 1x1 */}
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="hidden lg:block col-span-1 row-span-1"
              style={{
                gridColumnStart: index + 1,
                gridRowStart: 5,
              }}
            >
              <div
                className="h-full rounded-xl overflow-hidden bg-black/80 backdrop-blur-sm border border-purple-500/20 cursor-pointer hover:border-purple-500/50 transition-all hover:scale-[1.02] group"
                onClick={() => {
                  setSelectedProject(project)
                  setIsWebPreviewLoaded(false)
                }}
              >
                <div className="relative h-full p-2 flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center">
                    <h4 className="font-semibold text-xs group-hover:text-purple-400 transition-colors truncate">
                      {project.name}
                    </h4>
                  </div>
                  {selectedProject.id === project.id && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Profile Button - Mobile: 2x1, Tablet: 1x1, Desktop: 1x1 */}
          <div className="col-span-2 row-span-1 row-start-6 md:col-span-1 md:row-span-1 md:col-start-7 md:row-start-4 lg:col-span-1 lg:row-span-1 lg:col-start-7 lg:row-start-5">
            <button
              onClick={handleProfileClick}
              className={`w-full h-full rounded-xl md:rounded-2xl border-2 p-2 md:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-purple-500/15 border-purple-400/40'
                  : 'bg-purple-400/25 border-purple-300/50'
              }`}
            >
              <div className="font-semibold text-xs md:text-sm group-hover:text-purple-400 transition-colors duration-300">
                Profile
              </div>
              <div className="text-[10px] md:text-xs font-light text-white/80">
                About Me
              </div>
            </button>
          </div>

          {/* Contact Button - Mobile: 2x1, Tablet: 1x1, Desktop: 1x1 */}
          <div className="col-span-2 row-span-1 row-start-6 md:col-span-1 md:row-span-1 md:col-start-8 md:row-start-4 lg:col-span-1 lg:row-span-1 lg:col-start-8 lg:row-start-5">
            <button
              onClick={handleContactClick}
              className={`w-full h-full rounded-xl md:rounded-2xl border-2 p-2 md:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-purple-600/15 border-purple-500/40'
                  : 'bg-purple-500/25 border-purple-400/50'
              }`}
            >
              <div className="font-semibold text-xs md:text-sm group-hover:text-purple-400 transition-colors duration-300">
                Contact
              </div>
              <div className="text-[10px] md:text-xs font-light text-white/80">
                Get in Touch
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
