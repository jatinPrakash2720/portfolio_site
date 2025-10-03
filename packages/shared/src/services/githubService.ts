/**
 * This service provides server-side functions for interacting with the GitHub API.
 * It is built with a functional approach and leverages Next.js's built-in fetch caching
 * to optimize performance and respect API rate limits.
 *
 * This module is marked as 'server-only' to prevent it from ever being included in a
 * client-side bundle, protecting the GITHUB_TOKEN.
 */
import 'server-only'
import { z } from 'zod'

// --- Zod Schemas for API Response Validation ---
// (These are excellent and remain unchanged)
const githubUserSchema = z.object({
  login: z.string(),
  avatar_url: z.string().url(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
})

const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  owner: z.object({ login: z.string() }), // We only need the owner's login for subsequent calls
})

// --- Public Type Definitions ---
export type GitHubUser = z.infer<typeof githubUserSchema>
export type GitHubRepo = z.infer<typeof githubRepoSchema>
export interface GitHubStats {
  user: GitHubUser
  repos: GitHubRepo[]
  totalStars: number
  totalForks: number
  languages: Record<string, number>
}

// --- Centralized API Fetcher with Caching ---

const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME

/**
 * A centralized fetch function for the GitHub API.
 * It automatically handles authentication and, most importantly, caching.
 *
 * @param endpoint The GitHub API endpoint to call (e.g., /users/username).
 * @returns A promise that resolves with the JSON response.
 */
async function fetchGitHubAPI<T>(endpoint: string): Promise<T> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Trio-Portfolio-App',
  }

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  }

  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    headers,
    // This is the most important part: Next.js's built-in fetch caching.
    // It tells Next.js to cache the result of this API call for 1 hour (3600 seconds).
    // Subsequent requests within this timeframe will receive the cached data instantly
    // without hitting the GitHub API again.
    // Cache for 1 hour
    cache: 'force-cache',
  })

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}

// --- Exported Service Functions ---

export async function getGitHubUser(): Promise<GitHubUser> {
  if (!GITHUB_USERNAME) throw new Error('GitHub username is not configured.')
  const user = await fetchGitHubAPI<GitHubUser>(`/users/${GITHUB_USERNAME}`)
  return githubUserSchema.parse(user)
}

export async function getGitHubUserRepos(): Promise<GitHubRepo[]> {
  if (!GITHUB_USERNAME) throw new Error('GitHub username is not configured.')
  const repos = await fetchGitHubAPI<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
  )
  return z.array(githubRepoSchema).parse(repos)
}

export async function getRepoLanguages(
  owner: string,
  repo: string,
): Promise<Record<string, number>> {
  return fetchGitHubAPI<Record<string, number>>(
    `/repos/${owner}/${repo}/languages`,
  )
}

/**
 * Fetches and computes comprehensive stats for the configured GitHub user.
 */
export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [user, repos] = await Promise.all([
      getGitHubUser(),
      getGitHubUserRepos(),
    ])

    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    )
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

    // Make language fetching more robust with Promise.allSettled
    // This ensures that if one language request fails, the entire page doesn't crash.
    const languagePromises = repos.map((repo) =>
      getRepoLanguages(repo.owner.login, repo.name),
    )
    const languageResults = await Promise.allSettled(languagePromises)

    const languages: Record<string, number> = {}
    languageResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        Object.entries(result.value).forEach(([lang, bytes]) => {
          languages[lang] = (languages[lang] || 0) + bytes
        })
      }
    })

    return { user, repos, totalStars, totalForks, languages }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    // In a real app, you might want to return a default state or re-throw
    // For now, we re-throw to let the error boundary catch it.
    throw error
  }
}
