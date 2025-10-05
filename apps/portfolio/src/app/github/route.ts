import { NextResponse } from 'next/server'
import {
  getGitHubStats,
  getGitHubUser,
  getGitHubUserRepos,
} from '../../../../../packages/shared/src/services/githubService'

export async function GET() {
  try {
    // Fetch comprehensive GitHub stats
    const stats = await getGitHubStats()

    if (!stats) {
      // Return demo data if no stats available
      const demoData = {
        user: {
          login: 'demo-user',
          avatar_url: 'https://github.com/identicons/demo-user.png',
          name: 'Demo User',
          bio: 'Full-stack developer passionate about open source',
          public_repos: 25,
          followers: 150,
          following: 100,
        },
        repos: [],
        totalStars: 120,
        totalForks: 45,
        languages: {
          TypeScript: 35000,
          JavaScript: 28000,
          Python: 15000,
          Go: 8000,
        },
        isDemo: true,
      }

      console.log('GitHub API - Using demo data:', demoData)
      return NextResponse.json(demoData)
    }

    const responseData = {
      user: stats.user,
      repos: stats.repos.slice(0, 6), // Return top 6 repos
      totalStars: stats.totalStars,
      totalForks: stats.totalForks,
      languages: stats.languages,
      totalRepos: stats.user.public_repos,
      followers: stats.user.followers,
      following: stats.user.following,
      isDemo: false,
    }

    console.log('GitHub API - Real data:', {
      login: responseData.user.login,
      totalStars: responseData.totalStars,
      totalRepos: responseData.totalRepos,
    })

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('GitHub API route error:', error)

    // Return fallback data instead of error
    const fallbackData = {
      user: {
        login: 'demo-user',
        avatar_url: 'https://github.com/identicons/demo-user.png',
        name: 'Demo User',
        bio: 'Full-stack developer',
        public_repos: 25,
        followers: 150,
        following: 100,
      },
      repos: [],
      totalStars: 120,
      totalForks: 45,
      languages: {
        TypeScript: 35000,
        JavaScript: 28000,
        Python: 15000,
      },
      isDemo: true,
    }

    console.log('GitHub API - Using fallback data due to error:', fallbackData)
    return NextResponse.json(fallbackData)
  }
}
