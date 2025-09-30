import {repoSchema, userStatsSchema, contributionCalendarSchema} from '@/lib/validators/githubApi'
import {z} from 'zod'
// --- TypeScript Types ---

export type GitHubRepo = z.infer<typeof repoSchema>
export type GitHubUserStats = z.infer<typeof userStatsSchema>
export type GitHubContributionCalendar = z.infer<
  typeof contributionCalendarSchema
>

const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

// --- API Fetching Functions ---

/**
 * Fetches pinned repositories using the REST API.
 */
export async function getGitHubPinnedRepos(): Promise<GitHubRepo[]> {
  // ... (existing function code from before, no changes needed)
  const username = GITHUB_USERNAME
  const token = GITHUB_TOKEN

  if (!username || !token) {
    console.error('GitHub username or token is not configured.')
    return []
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=6`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      },
    )
    if (!response.ok)
      throw new Error(`GitHub API responded with status: ${response.status}`)
    const data = await response.json()
    const validatedRepos = z.array(repoSchema).safeParse(data)
    if (!validatedRepos.success) {
      console.error('Invalid repo data from GitHub API:', validatedRepos.error)
      return []
    }
    return validatedRepos.data
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error)
    return []
  }
}

/**
 * Fetches basic user statistics using the REST API.
 */
export async function getGitHubUserStats(): Promise<GitHubUserStats | null> {
  const username = GITHUB_USERNAME
  const token = GITHUB_TOKEN

  if (!username || !token) {
    console.error('GitHub username or token is not configured.')
    return null
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })
    if (!response.ok)
      throw new Error(`GitHub API responded with status: ${response.status}`)
    const data = await response.json()
    const validatedStats = userStatsSchema.safeParse(data)
    if (!validatedStats.success) {
      console.error('Invalid user stats from GitHub API:', validatedStats.error)
      return null
    }
    return validatedStats.data
  } catch (error) {
    console.error('Failed to fetch GitHub user stats:', error)
    return null
  }
}

/**
 * Fetches the user's contribution graph data using the GraphQL API.
 */
export async function getGitHubContributions(): Promise<GitHubContributionCalendar | null> {
  const username = GITHUB_USERNAME
  const token = GITHUB_TOKEN

  if (!username || !token) {
    console.error('GitHub username or token is not configured.')
    return null
  }

  const graphqlQuery = {
    query: `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  weekday
                  color
                }
              }
            }
          }
        }
      }
    `,
    variables: { username },
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
      next: { revalidate: 3600 },
    })

    if (!response.ok)
      throw new Error(
        `GitHub GraphQL API responded with status: ${response.status}`,
      )

    const data = await response.json()
    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar

    const validatedCalendar = contributionCalendarSchema.safeParse(calendar)
    if (!validatedCalendar.success) {
      console.error(
        'Invalid contribution data from GitHub API:',
        validatedCalendar.error,
      )
      return null
    }
    return validatedCalendar.data
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error)
    return null
  }
}
