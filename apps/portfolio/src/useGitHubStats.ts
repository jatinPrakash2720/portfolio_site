'use client'

import { useState, useEffect } from 'react'

interface GitHubUser {
  login: string
  avatar_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
}

interface GitHubStats {
  user: GitHubUser
  repos: GitHubRepo[]
  totalStars: number
  totalForks: number
  languages: Record<string, number>
  totalRepos: number
  followers: number
  following: number
  isDemo?: boolean
}

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/github')

        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub stats: ${response.status}`)
        }

        const data = await response.json()
        console.log('GitHub Stats fetched:', {
          login: data.user.login,
          totalStars: data.totalStars,
          totalRepos: data.totalRepos,
          isDemo: data.isDemo,
        })
        setStats(data)
      } catch (err) {
        console.error('Error fetching GitHub stats:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
