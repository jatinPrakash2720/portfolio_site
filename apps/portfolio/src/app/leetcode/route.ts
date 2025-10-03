import { NextResponse } from 'next/server'
import {
  getLeetCodeStats,
  getSolvedProblemsCount,
  getSolvedProblemsByDifficulty,
} from '@/services/leetcodeService'

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || 'sample-user'

export async function GET() {
  try {
    const stats = await getLeetCodeStats()

    if (!stats) {
      // Return fallback data instead of error
      const demoData = {
        username: 'demo-user',
        solvedCount: 150, // Demo data
        difficultyBreakdown: {
          easy: 80,
          medium: 60,
          hard: 10,
        },
        streak: 5,
        totalActiveDays: 30,
        isPremium: false,
        isDemo: true, // Flag to indicate this is demo data
      }
      console.log('LeetCode API - Using demo data:', demoData)
      return NextResponse.json(demoData)
    }

    const solvedCount = getSolvedProblemsCount(stats)
    const difficultyBreakdown = getSolvedProblemsByDifficulty(stats)

    const responseData = {
      username: LEETCODE_USERNAME || 'demo-user',
      solvedCount,
      difficultyBreakdown,
      ranking: stats.ranking,
      contributionPoints: stats.contributionPoint,
      reputation: stats.reputation,
      totalQuestions: stats.totalQuestions,
      isDemo: false,
    }

    console.log('LeetCode API - Real data:', responseData)
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('LeetCode API route error:', error)
    // Return fallback data instead of error
    const fallbackData = {
      username: 'demo-user',
      solvedCount: 150, // Demo data
      difficultyBreakdown: {
        easy: 80,
        medium: 60,
        hard: 10,
      },
      streak: 5,
      totalActiveDays: 30,
      isPremium: false,
      isDemo: true, // Flag to indicate this is demo data
    }
    console.log(
      'LeetCode API - Using fallback data due to error:',
      fallbackData,
    )
    return NextResponse.json(fallbackData)
  }
}
