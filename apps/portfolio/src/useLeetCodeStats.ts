'use client'

import { useState, useEffect } from 'react'

interface LeetCodeStats {
  username: string
  solvedCount: number
  difficultyBreakdown: {
    easy: number
    medium: number
    hard: number
  }
  ranking?: number
  contributionPoints?: number
  reputation?: number
  totalQuestions?: number
  isDemo?: boolean
}

export function useLeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/leetcode')

        if (!response.ok) {
          throw new Error(`Failed to fetch LeetCode stats: ${response.status}`)
        }

        const data = await response.json()
        console.log('LeetCode Stats fetched:', {
          username: data.username,
          solvedCount: data.solvedCount,
          difficultyBreakdown: data.difficultyBreakdown,
          isDemo: data.isDemo,
        })
        setStats(data)
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
