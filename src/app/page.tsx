'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import StatsCard from '@/components/dashboard/StatsCard'
import DotMatrix from '@/components/dashboard/DotMatrix'
import ProjectTimeline from '@/components/dashboard/ProjectTimeline'
import BubbleChart from '@/components/dashboard/BubbleChart'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { BorderTrail } from '@/components/ui/border-trail'
import { useLeetCodeStats } from '@/hooks/useLeetCodeStats'
import { useLinkedInStats } from '@/hooks/useLinkedInStats'

function HomeContent() {
  const { theme } = useTheme()
  const { stats: leetcodeStats, loading: leetcodeLoading } = useLeetCodeStats()
  const { stats: linkedinStats, loading: linkedinLoading } = useLinkedInStats()

  // Mock data - replace with your actual data
  const userData = {
    name: 'Your Name',
    avatar: 'https://ui-avatars.com/api/?name=Your+Name&background=random',
    username: '@yourhandle',
  }

  const timelineProjects = [
    {
      id: '1',
      name: 'E-commerce Platform',
      startDate: '30.09',
      duration: 5,
      category: 'customer' as const,
      progress: 85,
      teamSize: 10,
    },
    {
      id: '2',
      name: 'Mobile App',
      startDate: '29.09',
      duration: 8,
      category: 'product' as const,
      progress: 60,
      teamSize: 20,
      avatars: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
      ],
    },
    {
      id: '3',
      name: 'Dashboard Analytics',
      startDate: '28.09',
      duration: 3,
      category: 'web' as const,
      progress: 45,
      teamSize: 10,
    },
    {
      id: '4',
      name: 'API Integration',
      startDate: '27.09',
      duration: 4,
      category: 'customer' as const,
      progress: 90,
      teamSize: 31,
    },
    {
      id: '5',
      name: 'AI Chatbot',
      startDate: '26.09',
      duration: 6,
      category: 'product' as const,
      progress: 70,
      teamSize: 10,
    },
  ]

  const skillBubbles = Array.from({ length: 15 }, (_, i) => ({
    id: `skill-${i}`,
    size: Math.floor(Math.random() * 5) + 1,
    status: (['resources', 'valid', 'invalid'] as const)[
      Math.floor(Math.random() * 3)
    ],
  }))

  const dotMatrixData = Array.from({ length: 6 }, () =>
    Array.from({ length: 10 }, () => Math.floor(Math.random() * 4)),
  )

  return (
    <div
      className={`h-screen transition-colors duration-300 flex relative ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Sidebar user={userData} />

      <main className="flex-1 pl-20 relative z-10">
        {/* Page Title & Filters */}
        {/* <div className="mb-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-medium">
              Date: <span className="text-white/60">Now</span>
            </button>
            <button className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-medium">
              Category: <span className="text-white/60">All</span>
            </button>
            <button className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-medium">
              Status: <span className="text-white/60">Active</span>
            </button>
          </div>
        </div> */}

        {/* Font Test */}
        {/* <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-2 rounded text-sm max-w-xs">
          <div className="font-boldonse-thin">Boldonse Thin (100)</div>
          <div className="font-boldonse-light">Boldonse Light (300)</div>
          <div className="font-boldonse-regular">Boldonse Regular (400)</div>
          <div className="font-boldonse-medium">Boldonse Medium (500)</div>
          <div className="font-boldonse-semibold">Boldonse Semibold (600)</div>
          <div className="font-boldonse-bold">Boldonse Bold (700)</div>
          <div className="font-boldonse-extrabold">
            Boldonse Extrabold (800)
          </div>
          <div className="font-boldonse-black">Boldonse Black (900)</div>
        </div> */}

        {/* Main 8x6 Grid */}
        <div className="grid grid-cols-8 grid-rows-6 gap-7 m-10 h-[calc(100vh-5rem)]">
          {/* Moving Skills Strip - 6x1 */}
          <div
            className={`col-span-6 row-span-1 rounded-3xl border-2 overflow-hidden relative z-10 group hover:border-transparent transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#1A1A1A] border-white/10'
                : 'bg-gray-100 border-gray-300/20'
            }`}
          >
            <BorderTrail
              className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
              }`}
              size={80}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            />
            <div className="flex items-center h-full">
              <div className="flex animate-scroll">
                {[
                  'React',
                  'TypeScript',
                  'Node.js',
                  'Python',
                  'JavaScript',
                  'Next.js',
                  'MongoDB',
                  'PostgreSQL',
                  'AWS',
                  'Docker',
                  'Git',
                  'Figma',
                  'Tailwind CSS',
                  'Express.js',
                  'GraphQL',
                  'Redis',
                  'Linux',
                  'Vercel',
                  // Duplicate for seamless loop
                  'React',
                  'TypeScript',
                  'Node.js',
                  'Python',
                  'JavaScript',
                  'Next.js',
                  'MongoDB',
                  'PostgreSQL',
                  'AWS',
                  'Docker',
                  'Git',
                  'Figma',
                ].map((skill, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 mx-4 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      theme === 'dark'
                        ? 'bg-white/10 text-white'
                        : 'bg-black/10 text-gray-900'
                    }`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image - 2x4 */}
          <div
            className={`col-span-2 rounded-3xl border-2 row-span-4 col-start-7 row-start-1  flex items-center justify-center z-10 group hover:border-transparent transition-all duration-300 hover:bg-opacity-80 relative ${
              theme === 'dark'
                ? 'bg-[#1A1A1A] border-white/10'
                : 'bg-gray-100 border-gray-300/20'
            }`}
            onMouseEnter={() => console.log('Profile hovered')}
          >
            <BorderTrail
              className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
              }`}
              size={100}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover rounded-3xl pointer-events-none relative z-0"
            />
          </div>

          {/* Description Block - 4x6 */}
          <div
            className={`col-span-6 rounded-3xl border-2 row-span-4 col-start-1 row-start-2 p-6 flex flex-col z-10 group hover:border-transparent transition-all duration-300 hover:bg-opacity-80 relative ${
              theme === 'dark'
                ? 'bg-[#1A1A1A] border-white/10'
                : 'bg-gray-100 border-gray-300/20'
            }`}
            onMouseEnter={() => console.log('Description hovered')}
          >
            <BorderTrail
              className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
              }`}
              size={120}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            />
            <h2 className="text-2xl font-boldonse-bold mb-4 pointer-events-none relative z-0">
              About Me
            </h2>
            <div
              className={`leading-relaxed overflow-y-auto scrollbar-hide flex-1 font-boldonse-thin text-sm tracking-wide relative z-0 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}
            >
              <p className="mb-4">
                I am a passionate full-stack developer with over 5 years of
                experience in building scalable web applications and mobile
                solutions. My journey in technology began during my computer
                science studies, where I discovered my love for problem-solving
                and creating innovative digital experiences.
              </p>
              <p className="mb-4">
                Throughout my career, I have specialized in modern JavaScript
                frameworks, particularly React and Next.js for frontend
                development, and Node.js with Express for backend services. I
                have extensive experience with database design and management
                using both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis)
                technologies.
              </p>
              <p className="mb-4">
                My expertise extends to cloud platforms, particularly AWS, where
                I have deployed and maintained production applications. I am
                proficient in containerization using Docker and have experience
                with CI/CD pipelines. I also have a strong foundation in version
                control with Git and collaborative development practices.
              </p>
              <p className="mb-4">
                In addition to my technical skills, I have worked extensively
                with design tools like Figma and have experience in UI/UX design
                principles. I believe in creating user-centered solutions that
                not only meet technical requirements but also provide
                exceptional user experiences. I have led development teams and
                mentored junior developers, fostering collaborative and
                innovative work environments.
              </p>
              {/* <p className="mb-4">
                I am constantly learning and staying updated with the latest
                technologies and best practices in software development. I have
                contributed to open-source projects and regularly participate in
                developer communities. My goal is to continue building impactful
                applications that solve real-world problems while mentoring the
                next generation of developers.
              </p>
              <p>
                When I'm not coding, I enjoy contributing to open-source
                projects, writing technical blogs, and participating in
                hackathons. I am always excited about new opportunities to work
                on challenging projects that allow me to grow both technically
                and professionally.
              </p> */}
              <span
                className={theme === 'dark' ? 'text-white/60' : 'text-gray-500'}
              >
                ...
              </span>
            </div>
          </div>

          {/* Social Media Buttons - 3x 1x6 positioned below description */}
          <div className="col-span-2 row-span-1 col-start-1 row-start-6 z-10">
            <a
              href="https://leetcode.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={`h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-transform group relative hover:border-transparent transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#1A1A1A] border-white/10'
                  : 'bg-gray-100 border-gray-300/20'
              }`}
            >
              <BorderTrail
                className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
                }`}
                size={60}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <div className="font-boldonse-semibold text-sm group-hover:text-orange-500 transition-colors duration-300">
                LeetCode
              </div>
              <div
                className={`text-xs font-boldonse-light ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                }`}
              >
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
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={`h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-transform group relative hover:border-transparent transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#1A1A1A] border-white/10'
                  : 'bg-gray-100 border-gray-300/20'
              }`}
            >
              <BorderTrail
                className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
                }`}
                size={60}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <div className="font-boldonse-semibold text-sm group-hover:text-blue-600 transition-colors duration-300">
                LinkedIn
              </div>
              <div
                className={`text-xs font-boldonse-light ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                }`}
              >
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
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={`h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-transform group relative hover:border-transparent transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#1A1A1A] border-white/10'
                  : 'bg-gray-100 border-gray-300/20'
              }`}
            >
              <BorderTrail
                className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
                }`}
                size={60}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <div className="font-boldonse-semibold text-sm group-hover:text-gray-800 transition-colors duration-300">
                GitHub
              </div>
              <div
                className={`text-xs font-boldonse-light ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                }`}
              >
                Repositories
              </div>
            </a>
          </div>

          {/* Navigation Buttons - 2x 1x2 positioned to the right of profile */}
          <div className="col-span-2 row-span-1 col-start-7 row-start-5 z-10">
            <button
              className={`w-full h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-transform group relative hover:border-transparent transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#1A1A1A] border-white/10'
                  : 'bg-gray-100 border-gray-300/20'
              }`}
            >
              <BorderTrail
                className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
                }`}
                size={60}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <div className="font-boldonse-semibold text-sm group-hover:text-purple-600 transition-colors duration-300">
                Projects
              </div>
              <div
                className={`text-xs font-boldonse-light ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                }`}
              >
                Portfolio
              </div>
            </button>
          </div>

          <div className="col-span-2 row-span-1 col-start-7 row-start-6 z-10">
            <button
              className={`w-full h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center hover:scale-105 transition-transform group relative hover:border-transparent transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#1A1A1A] border-white/10'
                  : 'bg-gray-100 border-gray-300/20'
              }`}
            >
              <BorderTrail
                className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === 'dark' ? 'bg-white/60' : 'bg-gray-600'
                }`}
                size={60}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <div className="font-boldonse-semibold text-sm group-hover:text-green-600 transition-colors duration-300">
                Contact
              </div>
              <div
                className={`text-xs font-boldonse-light ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-600'
                }`}
              >
                Get in Touch
              </div>
            </button>
          </div>
        </div>
      </main>

    </div>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  )
}
