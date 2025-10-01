'use client'

import { useLinkedInStats } from '@/hooks/useLinkedInStats'

export function LinkedInTest() {
  const { stats, loading, error } = useLinkedInStats()

  return (
    <div className="fixed bottom-4 left-4 bg-blue-600/90 text-white p-4 rounded-lg text-xs max-w-xs">
      <h3 className="font-bold mb-2">LinkedIn API Test</h3>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-200">Error: {error}</div>}
      {stats && (
        <div>
          <div>Name: {stats.firstName} {stats.lastName}</div>
          <div>Connections: {stats.connections || 'N/A'}</div>
          <div>Followers: {stats.followers || 'N/A'}</div>
          <div>Official: {stats.isOfficial ? 'Yes' : 'No'}</div>
          <div>Demo: {stats.isDemo ? 'Yes' : 'No'}</div>
          <div className="truncate">Headline: {stats.headline || 'N/A'}</div>
          {stats.location && <div>Location: {stats.location}</div>}
        </div>
      )}
    </div>
  )
}
