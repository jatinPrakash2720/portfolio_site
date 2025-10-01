'use client'

import { MoreVertical } from 'lucide-react'

interface BubbleData {
  id: string
  size: number
  status: 'resources' | 'valid' | 'invalid'
}

interface BubbleChartProps {
  data: BubbleData[]
}

const statusColors = {
  resources: 'bg-gray-200',
  valid: 'bg-green-500',
  invalid: 'bg-orange-500',
}

export default function BubbleChart({ data }: BubbleChartProps) {
  const counts = {
    resources: data.filter(d => d.status === 'resources').length,
    valid: data.filter(d => d.status === 'valid').length,
    invalid: data.filter(d => d.status === 'invalid').length,
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 hover:bg-white/[0.07] transition-all h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider">
          Skills & Technologies
        </h3>
        <button className="w-6 h-6 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center">
          <MoreVertical size={14} />
        </button>
      </div>

      {/* Bubble Visualization */}
      <div className="h-40 relative flex items-end justify-center gap-1 px-2 mb-4">
        {data.map((bubble, idx) => {
          const size = 25 + bubble.size * 12
          const bottom = Math.random() * 50
          return (
            <div
              key={bubble.id}
              className={`${statusColors[bubble.status]} rounded-full absolute hover:scale-110 transition-transform cursor-pointer flex items-center justify-center text-[10px] font-bold text-black/60`}
              style={{
                width: size,
                height: size,
                bottom: `${bottom}px`,
                left: `${(idx / data.length) * 100}%`,
              }}
            >
              {bubble.size > 2 && bubble.size}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[10px]">
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-200" />
            <span className="text-white/60">Resources</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white/60">Valid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-white/60">Invalid</span>
          </div>
        </div>
        <span className="text-white/60">Total: <span className="font-bold">{data.length}</span></span>
      </div>
    </div>
  )
}

