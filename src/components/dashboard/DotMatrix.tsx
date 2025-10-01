'use client'

import { MoreVertical } from 'lucide-react'

interface DotMatrixProps {
  title: string
  stats: Array<{
    label: string
    value: string
    trend: 'up' | 'down'
  }>
  dotData: number[][]
}

const colorClasses = ['bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-gray-200']

export default function DotMatrix({ title, stats, dotData }: DotMatrixProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 hover:bg-white/[0.07] transition-all">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider">{title}</h3>
        <button className="w-6 h-6 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center">
          <MoreVertical size={14} />
        </button>
      </div>

      <div className="flex gap-6 mb-3">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-orange-500'}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Dot Matrix */}
      <div className="grid grid-cols-10 gap-1.5">
        {dotData.map((row, rowIdx) =>
          row.map((colorIdx, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`w-full aspect-square rounded-full ${colorClasses[colorIdx % colorClasses.length]} hover:scale-125 transition-transform`}
            />
          ))
        )}
      </div>
    </div>
  )
}

