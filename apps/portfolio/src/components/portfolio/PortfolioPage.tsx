'use client'

import { User } from '@/types/index'
import Sidebar from '../Sidebar'
import TextType from '../TextType'
import LogoLoop from '../LogoLoop'
import LaserFlow from '../LaserFlow'
import { useLeetCodeStats } from '../../useLeetCodeStats'
import { useLinkedInStats } from '../../useLinkedInStats'
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

interface PortfolioPageProps {
  user: User
  domain: string
}

export default function PortfolioPage({ user, domain }: PortfolioPageProps) {
  const { stats: leetcodeStats, loading: leetcodeLoading } = useLeetCodeStats()
  const { stats: linkedinStats, loading: linkedinLoading } = useLinkedInStats()

  // User data for sidebar
  const userData = {
    name: user.fullName,
    avatar: user.profilePictureUrl,
    username: `@${user.username}`,
  }

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

  return (
    <div className="h-screen flex relative bg-black text-white">
      {/* LaserFlow Foreground */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <LaserFlow
          className=""
          style={{}}
          dpr={3}
          horizontalBeamOffset={0.255}
          verticalBeamOffset={-0.5}
          verticalSizing={11.0}
          horizontalSizing={3.5}
          color="#8B5CF6"
        />
      </div>

      <Sidebar user={userData} />

      <main className="flex-1 pl-20 relative z-10">
        {/* Main 8x6 Grid */}
        <div className="grid grid-cols-8 grid-rows-6 gap-7 m-10 h-[calc(100vh-5rem)]">
          {/* Tech Logos Strip - 6x1 */}
          <div className="col-span-6 row-span-1 rounded-3xl border-2 overflow-hidden relative z-10 group hover:border-transparent transition-all duration-300 bg-[#0F0F0F] border-white/10">
            <div className="flex items-center h-full px-6">
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
            </div>
          </div>

          {/* Profile Image - 2x4 */}
          <div className="col-span-2 rounded-3xl border-2 row-span-4 col-start-7 row-start-1 flex items-center justify-center z-10 group hover:border-transparent transition-all duration-300 hover:bg-opacity-80 relative bg-[#0F0F0F] border-white/10">
            <img
              src={user.profilePictureUrl}
              alt={user.fullName}
              className="w-full h-full object-cover rounded-3xl pointer-events-none relative z-0"
            />
          </div>

          {/* Description Block - 4x6 */}
          <div className="col-span-6 rounded-3xl border-2 row-span-4 col-start-1 row-start-2 p-6 flex flex-col z-10 group hover:border-transparent transition-all duration-300 hover:bg-opacity-80 relative bg-[#0F0F0F] border-white/10">
            <h2 className="text-2xl font-bold mb-4 pointer-events-none relative z-0">
              About Me
            </h2>
            <div className="leading-relaxed overflow-y-auto scrollbar-hide flex-1 font-light text-sm tracking-wide relative z-0 text-white/80">
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
            </div>
          </div>

          {/* Social Media Buttons - 3x 1x6 positioned below description */}
          <div className="col-span-2 row-span-1 col-start-1 row-start-6 z-10">
            <a
              href="https://leetcode.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent bg-[#0F0F0F] border-white/10"
            >
              <div className="font-semibold text-base group-hover:text-purple-400 transition-colors duration-300">
                LeetCode
              </div>
              <div className="text-sm font-light text-white/80">
                {leetcodeLoading
                  ? 'Loading...'
                  : leetcodeStats
                    ? `${leetcodeStats.solvedCount} Problems Solved${leetcodeStats.isDemo ? ' (Demo)' : ''}`
                    : 'Problems Solved'}
              </div>
            </a>
          </div>

          <div className="col-span-2 row-span-1 col-start-3 row-start-6 z-10">
            <a
              href={
                user.socialLinks?.linkedin ||
                'https://linkedin.com/in/yourusername'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent bg-[#0F0F0F] border-white/10"
            >
              <div className="font-semibold text-base group-hover:text-purple-400 transition-colors duration-300">
                LinkedIn
              </div>
              <div className="text-sm font-light text-white/80">
                {linkedinLoading
                  ? 'Loading...'
                  : linkedinStats
                    ? `${linkedinStats.connections || 0} Connections${linkedinStats.isDemo ? ' (Demo)' : ''}`
                    : 'Professional'}
              </div>
            </a>
          </div>

          <div className="col-span-2 row-span-1 col-start-5 row-start-6 z-10">
            <a
              href={
                user.socialLinks?.github || 'https://github.com/yourusername'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent bg-[#0F0F0F] border-white/10"
            >
              <div className="font-semibold text-base group-hover:text-purple-400 transition-colors duration-300">
                GitHub
              </div>
              <div className="text-sm font-light text-white/80">
                Repositories
              </div>
            </a>
          </div>

          {/* Navigation Buttons - 2x 1x2 positioned to the right of profile */}
          <div className="col-span-2 row-span-1 col-start-7 row-start-5 z-10">
            <button className="w-full h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent bg-[#0F0F0F] border-white/10">
              <div className="font-semibold text-base group-hover:text-purple-400 transition-colors duration-300">
                Projects
              </div>
              <div className="text-sm font-light text-white/80">Portfolio</div>
            </button>
          </div>

          <div className="col-span-2 row-span-1 col-start-7 row-start-6 z-10">
            <button className="w-full h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent bg-[#0F0F0F] border-white/10">
              <div className="font-semibold text-base group-hover:text-purple-400 transition-colors duration-300">
                Contact
              </div>
              <div className="text-sm font-light text-white/80">
                Get in Touch
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
