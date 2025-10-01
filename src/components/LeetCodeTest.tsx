'use client'

import { useLeetCodeStats } from '@/hooks/useLeetCodeStats'

export function LeetCodeTest() {
  const { stats, loading, error } = useLeetCodeStats()

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs">
      <h3 className="font-bold mb-2">LeetCode API Test</h3>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-400">Error: {error}</div>}
      {stats && (
        <div>
          <div>Username: {stats.username}</div>
          <div>Solved: {stats.solvedCount}</div>
          <div>Demo: {stats.isDemo ? 'Yes' : 'No'}</div>
          <div>Easy: {stats.difficultyBreakdown.easy}</div>
          <div>Medium: {stats.difficultyBreakdown.medium}</div>
          <div>Hard: {stats.difficultyBreakdown.hard}</div>
          {stats.ranking && (
            <div>Ranking: {stats.ranking.toLocaleString()}</div>
          )}
          {stats.contributionPoints && (
            <div>Points: {stats.contributionPoints}</div>
          )}
          {stats.totalQuestions && <div>Total: {stats.totalQuestions}</div>}
        </div>
      )}
    </div>
  )
}
