'use client'

import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react'

interface StatsCardProps {
  title: string
  stats: Array<{
    label: string
    value: string
    trend: 'up' | 'down'
  }>
  chart?: React.ReactNode
}

export default function StatsCard({ title, stats, chart }: StatsCardProps) {
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
              {stat.trend === 'up' ? (
                <TrendingUp size={14} className="text-green-500" />
              ) : (
                <TrendingDown size={14} className="text-orange-500" />
              )}
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {chart && <div className="h-24">{chart}</div>}
    </div>
  )
}

