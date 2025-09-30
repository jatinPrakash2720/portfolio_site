import { z } from 'zod'

export const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
})

export const userStatsSchema = z.object({
  name: z.string().nullable(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  public_repos: z.number(),
})

export const contributionCalendarSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(
    z.object({
      contributionDays: z.array(
        z.object({
          contributionCount: z.number(),
          date: z.string(),
          weekday: z.number(),
          color: z.string(),
        }),
      ),
    }),
  ),
})
