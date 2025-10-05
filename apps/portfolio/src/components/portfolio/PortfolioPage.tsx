'use client'

import { lazy, Suspense } from 'react'
import { User } from '../../types/index'
import { useTheme } from '../../contexts/ThemeContext'
import { useRouter } from 'next/navigation'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiAmazon,
  SiDocker,
  SiGit,
  SiFigma,
  SiExpress,
  SiGraphql,
  SiRedis,
  SiLinux,
  SiVercel,
} from 'react-icons/si'

// Lazy load heavy components
const TextType = lazy(() => import('../TextType'))
const LogoLoop = lazy(() => import('../LogoLoop'))
const PixelBlast = lazy(() => import('../PixelBlast'))

// Lazy load hooks that fetch external data
const useLeetCodeStats = () => {
  const { useLeetCodeStats: hook } = require('../../useLeetCodeStats')
  return hook()
}
const useLinkedInStats = () => {
  const { useLinkedInStats: hook } = require('../../useLinkedInStats')
  return hook()
}
const useGitHubStats = () => {
  const { useGitHubStats: hook } = require('../../useGitHubStats')
  return hook()
}

// Loading fallback component
const ComponentLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

interface PortfolioPageProps {
  user: User
  domain: string
}

export default function PortfolioPage({ user, domain }: PortfolioPageProps) {
  const { theme } = useTheme()
  const router = useRouter()
  const { stats: leetcodeStats, loading: leetcodeLoading } = useLeetCodeStats()
  const { stats: linkedinStats, loading: linkedinLoading } = useLinkedInStats()
  const { stats: githubStats, loading: githubLoading } = useGitHubStats()

  // Text for typing animation
  const typingTexts = [
    user.bio ||
      'I am a passionate full-stack developer with extensive experience in building scalable web applications and mobile solutions.',
    'Throughout my career, I have specialized in modern JavaScript frameworks, particularly React and Next.js for frontend development, and Node.js with Express for backend services.',
    'My expertise extends to cloud platforms, particularly AWS, where I have deployed and maintained production applications. I am proficient in containerization using Docker and have experience with CI/CD pipelines.',
    'I believe in creating user-centered solutions that not only meet technical requirements but also provide exceptional user experiences. I have led development teams and mentored junior developers.',
  ]

  // Tech logos for LogoLoop
  const techLogos = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    {
      node: <SiTypescript />,
      title: 'TypeScript',
      href: 'https://www.typescriptlang.org',
    },
    {
      node: <SiTailwindcss />,
      title: 'Tailwind CSS',
      href: 'https://tailwindcss.com',
    },
    { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
    { node: <SiPython />, title: 'Python', href: 'https://python.org' },
    {
      node: <SiJavascript />,
      title: 'JavaScript',
      href: 'https://javascript.info',
    },
    { node: <SiMongodb />, title: 'MongoDB', href: 'https://mongodb.com' },
    {
      node: <SiPostgresql />,
      title: 'PostgreSQL',
      href: 'https://postgresql.org',
    },
    { node: <SiAmazon />, title: 'AWS', href: 'https://aws.amazon.com' },
    { node: <SiDocker />, title: 'Docker', href: 'https://docker.com' },
    { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
    { node: <SiFigma />, title: 'Figma', href: 'https://figma.com' },
    { node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
    { node: <SiGraphql />, title: 'GraphQL', href: 'https://graphql.org' },
    { node: <SiRedis />, title: 'Redis', href: 'https://redis.io' },
    { node: <SiLinux />, title: 'Linux', href: 'https://linux.org' },
    { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
  ]

  const handleProjectsClick = () => {
    router.push('/projects')
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
      {/* Floating 3D Models */}

      {/* PixelBlast Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <PixelBlast
            variant="circle"
            pixelSize={4}
            color="#A855F7"
            patternScale={2}
            patternDensity={0.8}
            pixelSizeJitter={0.3}
            enableRipples={false}
            liquid={false}
            speed={0.3}
            edgeFade={0.15}
            transparent
          />
        </Suspense>
      </div>

      {/* Tint Overlay */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-300 ${
          theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/20'
        }`}
      />

      <main className="flex-1 relative z-10">
        {/* Mobile: 5x6 Grid, Tablet: 8x5, Desktop: 8x6 Grid */}
        <div className="relative grid grid-cols-5 grid-rows-6 md:grid-cols-8 md:grid-rows-5 lg:grid-rows-6 gap-3 m-4 md:m-6 lg:m-6 xl:m-10 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-5rem)]">
          {/* Description Box - Mobile: 2x3, Tablet: 6x3, Desktop: 6x4 */}
          <div
            className={`col-span-2 row-span-3 col-start-1 row-start-1 md:col-span-6 md:row-span-3 lg:col-span-6 lg:row-span-4 md:col-start-1 md:row-start-2 lg:row-start-2 rounded-2xl md:rounded-3xl border-2 p-3 md:p-4 lg:p-6 flex flex-col z-10 group hover:border-transparent transition-all duration-300 hover:bg-opacity-80 relative backdrop-blur-sm ${
              theme === 'dark'
                ? 'bg-[#0F0F0F]/80 border-purple-500/20'
                : 'bg-white/70 border-purple-300/40'
            }`}
          >
            <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 pointer-events-none relative z-0">
              About Me
            </h2>
            <div
              className={`leading-relaxed overflow-y-auto scrollbar-hide flex-1 font-light text-xs md:text-sm lg:text-base tracking-wide relative z-0 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}
            >
              <Suspense
                fallback={<div className="animate-pulse">Loading...</div>}
              >
                <TextType
                  text={typingTexts.join(' ')}
                  typingSpeed={30}
                  pauseDuration={2000}
                  deletingSpeed={20}
                  loop={false}
                  showCursor={true}
                  cursorCharacter="|"
                  className="block"
                  startOnVisible={true}
                  variableSpeed={undefined}
                  onSentenceComplete={undefined}
                />
              </Suspense>
            </div>
          </div>

          {/* Profile Image - Mobile: 3x2, Tablet: 2x3, Desktop: 2x4 */}
          <div
            className={`col-span-3 row-span-2 col-start-3 row-start-1 md:col-span-2 md:row-span-3 lg:row-span-4 md:col-start-7 md:row-start-1 lg:col-start-7 rounded-2xl md:rounded-3xl border-2 flex items-center justify-center z-10 group hover:border-transparent transition-all duration-300 hover:bg-opacity-80 relative backdrop-blur-sm overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#0F0F0F]/80 border-purple-500/20'
                : 'bg-white/70 border-purple-300/40'
            }`}
          >
            <img
              src={user.profilePictureUrl}
              alt={user.fullName}
              className="w-full h-full object-cover pointer-events-none relative z-0"
            />
          </div>

          {/* Tech Logos Strip - Mobile: 3x1, Tablet: 6x1, Desktop: 6x1 */}
          <div
            className={`col-span-3 row-span-1 col-start-3 row-start-5 md:col-span-6 md:row-span-1 md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1 rounded-2xl md:rounded-3xl border-2 overflow-hidden relative z-10 group hover:border-transparent transition-all duration-300 backdrop-blur-sm ${
              theme === 'dark'
                ? 'bg-[#0F0F0F]/80 border-purple-500/20'
                : 'bg-white/70 border-purple-300/40'
            }`}
          >
            <div className="flex items-center h-full px-2 md:px-6">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center gap-3 animate-pulse">
                      <div className="w-6 h-6 bg-purple-500/20 rounded animate-pulse"></div>
                      <div className="w-6 h-6 bg-purple-500/20 rounded animate-pulse"></div>
                      <div className="w-6 h-6 bg-purple-500/20 rounded animate-pulse"></div>
                      <div className="w-6 h-6 bg-purple-500/20 rounded animate-pulse"></div>
                      <div className="w-6 h-6 bg-purple-500/20 rounded animate-pulse"></div>
                      <div className="w-6 h-6 bg-purple-500/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                }
              >
                <LogoLoop
                  logos={techLogos}
                  speed={120}
                  direction="left"
                  logoHeight={32}
                  gap={40}
                  pauseOnHover
                  scaleOnHover
                  fadeOut
                  fadeOutColor="#0F0F0F"
                  ariaLabel="Technologies and tools"
                  className="w-full"
                />
              </Suspense>
            </div>
          </div>

          {/* LeetCode Button - Mobile: 3x1, Tablet: 2x1, Desktop: 2x1 */}
          <div className="col-span-3 row-span-1 col-start-1 row-start-4 md:col-span-2 md:row-start-5 lg:row-start-6 md:col-start-1 z-10">
            <a
              href="https://leetcode.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={`h-full rounded-2xl lg:rounded-3xl border-2 p-2 lg:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-[#0F0F0F]/80 border-purple-500/20'
                  : 'bg-white/70 border-purple-300/40'
              }`}
            >
              <div className="font-semibold text-xs lg:text-base group-hover:text-purple-400 transition-colors duration-300">
                LeetCode
              </div>
              <div className="text-[10px] lg:text-sm font-light text-white/80">
                {leetcodeLoading
                  ? 'Loading...'
                  : leetcodeStats
                    ? `${leetcodeStats.solvedCount} Problems${leetcodeStats.isDemo ? ' (Demo)' : ''}`
                    : 'Problems'}
              </div>
            </a>
          </div>

          {/* LinkedIn Button - Mobile: 5x1, Tablet: 2x1, Desktop: 2x1 */}
          <div className="col-span-5 row-span-1 col-start-1 row-start-6 md:col-span-2 md:row-start-5 lg:row-start-6 md:col-start-3 z-10">
            <a
              href={
                user.socialLinks?.linkedin ||
                'https://linkedin.com/in/yourusername'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`h-full rounded-2xl lg:rounded-3xl border-2 p-2 lg:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-[#0F0F0F]/80 border-purple-500/20'
                  : 'bg-white/70 border-purple-300/40'
              }`}
            >
              <div className="font-semibold text-xs lg:text-base group-hover:text-purple-400 transition-colors duration-300">
                LinkedIn
              </div>
              <div className="text-[10px] lg:text-sm font-light text-white/80">
                {linkedinLoading
                  ? 'Loading...'
                  : linkedinStats
                    ? `${linkedinStats.connections || 0} Connections${linkedinStats.isDemo ? ' (Demo)' : ''}`
                    : 'Professional'}
              </div>
            </a>
          </div>

          {/* GitHub Button - Mobile: 3x1, Tablet: 2x1, Desktop: 2x1 */}
          <div className="col-span-3 row-span-1 col-start-3 row-start-3 md:col-span-2 md:row-start-5 lg:row-start-6 md:col-start-5 z-10">
            <a
              href={
                user.socialLinks?.github || 'https://github.com/yourusername'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`h-full rounded-2xl lg:rounded-3xl border-2 p-2 lg:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-[#0F0F0F]/80 border-purple-500/20'
                  : 'bg-white/70 border-purple-300/40'
              }`}
            >
              <div className="font-semibold text-xs lg:text-base group-hover:text-purple-400 transition-colors duration-300">
                GitHub
              </div>
              <div className="text-[10px] lg:text-sm font-light text-white/80">
                {githubLoading
                  ? 'Loading...'
                  : githubStats
                    ? `⭐ ${githubStats.totalStars}${githubStats.isDemo ? ' (Demo)' : ''}`
                    : 'Repos'}
              </div>
            </a>
          </div>

          {/* Projects Button - Mobile: 2x1, Tablet: 2x1, Desktop: 2x1 */}
          <div className="col-span-2 row-span-1 col-start-4 row-start-4 md:col-span-2 md:row-start-4 lg:row-start-5 md:col-start-7 z-10">
            <button
              onClick={handleProjectsClick}
              className={`w-full h-full rounded-2xl lg:rounded-3xl border-2 p-2 lg:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-purple-500/15 border-purple-400/40'
                  : 'bg-purple-400/25 border-purple-300/50'
              }`}
            >
              <div className="font-semibold text-xs lg:text-base group-hover:text-purple-400 transition-colors duration-300">
                Projects
              </div>
              <div className="text-[10px] lg:text-sm font-light text-white/80">
                Portfolio
              </div>
            </button>
          </div>

          {/* Contact Button - Mobile: 2x1, Tablet: 2x1, Desktop: 2x1 */}
          <div className="col-span-2 row-span-1 col-start-1 row-start-5 md:col-span-2 md:row-start-5 lg:row-start-6 md:col-start-7 z-10">
            <button
              onClick={handleContactClick}
              className={`w-full h-full rounded-2xl lg:rounded-3xl border-2 p-2 lg:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-purple-600/15 border-purple-500/40'
                  : 'bg-purple-500/25 border-purple-400/50'
              }`}
            >
              <div className="font-semibold text-xs lg:text-base group-hover:text-purple-400 transition-colors duration-300">
                Contact
              </div>
              <div className="text-[10px] lg:text-sm font-light text-white/80">
                Get in Touch
              </div>
            </button>
          </div>

          {/* Empty space - Mobile: 2x2 (col 4-5, row 5-6) */}
          <div className="col-span-2 row-span-2 col-start-4 row-start-5 lg:hidden" />
        </div>
      </main>
    </div>
  )
}
