'use client'

import { useState, useEffect } from 'react'

interface LinkedInStats {
  firstName: string
  lastName: string
  headline?: string
  location?: string
  connections?: number
  followers?: number
  profileUrl: string
  isOfficial?: boolean
  isDemo?: boolean
}

export function useLinkedInStats() {
  const [stats, setStats] = useState<LinkedInStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/linkedin')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch LinkedIn stats: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('LinkedIn Stats fetched:', {
          fullName: `${data.firstName} ${data.lastName}`,
          connections: data.connections,
          followers: data.followers,
          isOfficial: data.isOfficial,
          isDemo: data.isDemo,
        })
        setStats(data)
      } catch (err) {
        console.error('Error fetching LinkedIn stats:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
