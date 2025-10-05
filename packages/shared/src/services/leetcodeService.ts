import { z } from 'zod'

// --- TypeScript Types ---

const leetcodeStatsSchema = z.object({
  totalSolved: z.number(),
  totalSubmissions: z.array(
    z.object({
      difficulty: z.string(),
      count: z.number(),
      submissions: z.number(),
    }),
  ),
  totalQuestions: z.number(),
  easySolved: z.number(),
  totalEasy: z.number(),
  mediumSolved: z.number(),
  totalMedium: z.number(),
  hardSolved: z.number(),
  totalHard: z.number(),
  ranking: z.number(),
  contributionPoint: z.number(),
  reputation: z.number(),
  submissionCalendar: z.record(z.string(), z.number()),
  recentSubmissions: z.array(
    z.object({
      title: z.string(),
      titleSlug: z.string(),
      timestamp: z.string(),
      statusDisplay: z.string(),
      lang: z.string(),
      __typename: z.string(),
    }),
  ),
  matchedUserStats: z.object({
    acSubmissionNum: z.array(
      z.object({
        difficulty: z.string(),
        count: z.number(),
        submissions: z.number(),
      }),
    ),
    totalSubmissionNum: z.array(
      z.object({
        difficulty: z.string(),
        count: z.number(),
        submissions: z.number(),
      }),
    ),
  }),
})

export type LeetCodeStats = z.infer<typeof leetcodeStatsSchema>

/**
 * Fetches LeetCode user statistics using the LeetCode Query API
 */
export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  const username = process.env.LEETCODE_USERNAME || 'sample-user'
  console.log('username', username)
  if (!username || username === 'sample-user') {
    console.warn(
      'LeetCode username is not configured. Please set LEETCODE_USERNAME in your environment variables.',
    )
    return null
  }

  try {
    const response = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        // Cache for 1 hour
        cache: 'force-cache',
      },
    )

    if (!response.ok) {
      throw new Error(`LeetCode API responded with status: ${response.status}`)
    }

    const data = await response.json()

    const validatedStats = leetcodeStatsSchema.safeParse(data)
    if (!validatedStats.success) {
      console.error('Invalid LeetCode stats data:', validatedStats.error)
      return null
    }

    return validatedStats.data
  } catch (error) {
    console.error('Failed to fetch LeetCode stats:', error)
    return null
  }
}

/**
 * Gets the total number of solved problems from LeetCode stats
 */
export function getSolvedProblemsCount(stats: LeetCodeStats): number {
  return stats.totalSolved
}

/**
 * Gets the breakdown of solved problems by difficulty
 */
export function getSolvedProblemsByDifficulty(stats: LeetCodeStats) {
  return {
    easy: stats.easySolved,
    medium: stats.mediumSolved,
    hard: stats.hardSolved,
  }
}
