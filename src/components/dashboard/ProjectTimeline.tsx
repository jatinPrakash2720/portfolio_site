'use client'

import { MoreVertical } from 'lucide-react'

interface TimelineProject {
  id: string
  name: string
  startDate: string
  duration: number
  category: 'customer' | 'product' | 'web'
  progress: number
  teamSize?: number
  avatars?: string[]
}

interface ProjectTimelineProps {
  projects: TimelineProject[]
}

const categoryColors = {
  customer: 'bg-green-500',
  product: 'bg-orange-500',
  web: 'bg-gray-200',
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  const dates = ['24.09', '25.09', '26.09', '27.09', '28.09', '29.09', '30.09']

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 hover:bg-white/[0.07] transition-all h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider">
          Projects Timeline
        </h3>
        <button className="w-6 h-6 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center">
          <MoreVertical size={14} />
        </button>
      </div>

      {/* Timeline Chart */}
      <div className="space-y-3 mb-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center gap-2">
            <span className="text-[10px] text-white/50 w-10">{project.startDate}</span>
            <div className="flex-1 relative">
              <div className={`h-7 ${categoryColors[project.category]} rounded-full flex items-center px-3 gap-2`}>
                {project.avatars && project.avatars.length > 0 && (
                  <div className="flex -space-x-1.5">
                    {project.avatars.map((avatar, idx) => (
                      <img
                        key={idx}
                        src={avatar}
                        alt=""
                        className="w-5 h-5 rounded-full border-2 border-white/20 object-cover"
                      />
                    ))}
                  </div>
                )}
                <span className="text-xs font-medium text-black/80 flex-1 truncate">{project.name}</span>
                {project.teamSize && (
                  <span className="text-[10px] font-bold text-black/70 bg-black/10 px-1.5 py-0.5 rounded-full">
                    {project.teamSize}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scale */}
      <div className="border-t border-white/10 pt-3">
        <div className="flex gap-2 items-center justify-end text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white/60">Customer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-white/60">Product</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-200" />
            <span className="text-white/60">Web</span>
          </div>
          <span className="ml-2 text-white/60">Total: <span className="font-bold">{projects.length}</span></span>
        </div>
      </div>
    </div>
  )
}

