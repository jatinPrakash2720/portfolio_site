import { z } from 'zod'

// --- TypeScript Types ---

const linkedinProfileSchema = z.object({
  id: z.string(),
  firstName: z.object({
    localized: z.record(z.string()),
    preferredLocale: z.object({
      country: z.string(),
      language: z.string(),
    }),
  }),
  lastName: z.object({
    localized: z.record(z.string()),
    preferredLocale: z.object({
      country: z.string(),
      language: z.string(),
    }),
  }),
  headline: z.object({
    localized: z.record(z.string()),
    preferredLocale: z.object({
      country: z.string(),
      language: z.string(),
    }),
  }).optional(),
  vanityName: z.string().optional(),
  profilePicture: z.object({
    displayImage: z.string(),
  }).optional(),
})

export type LinkedInProfile = z.infer<typeof linkedinProfileSchema>

// Alternative: LinkedIn profile data from public sources (for demo purposes)
const linkedinPublicDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  headline: z.string().optional(),
  location: z.string().optional(),
  connections: z.number().optional(), // Estimated/approximate
  followers: z.number().optional(), // Estimated/approximate
  profileUrl: z.string(),
})

export type LinkedInPublicData = z.infer<typeof linkedinPublicDataSchema>

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN
const LINKEDIN_USER_ID = process.env.LINKEDIN_USER_ID || 'jatin-prakash'

// --- API Fetching Functions ---

/**
 * Fetches LinkedIn profile using official LinkedIn API (requires access token)
 * Note: This requires LinkedIn API approval and access token
 */
export async function getLinkedInProfile(): Promise<LinkedInProfile | null> {
  const accessToken = LINKEDIN_ACCESS_TOKEN

  if (!accessToken) {
    console.warn('LinkedIn access token is not configured. Please set LINKEDIN_ACCESS_TOKEN in your environment variables.')
    return null
  }

  try {
    const response = await fetch('https://api.linkedin.com/v2/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-RestLi-Protocol-Version': '2.0.0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API responded with status: ${response.status}`)
    }

    const data = await response.json()
    const validatedProfile = linkedinProfileSchema.safeParse(data)
    
    if (!validatedProfile.success) {
      console.error('Invalid LinkedIn profile data:', validatedProfile.error)
      return null
    }

    return validatedProfile.data
  } catch (error) {
    console.error('Failed to fetch LinkedIn profile:', error)
    return null
  }
}

/**
 * Gets public LinkedIn data (demo/fallback data)
 * Note: LinkedIn doesn't provide follower counts via API for security reasons
 */
export async function getLinkedInPublicData(): Promise<LinkedInPublicData | null> {
  const userId = LINKEDIN_USER_ID

  // Since LinkedIn doesn't provide follower counts via API, we'll use demo data
  // In a real implementation, you might scrape public data or use third-party services
  const demoData: LinkedInPublicData = {
    firstName: 'Jatin',
    lastName: 'Prakash',
    headline: 'Full Stack Developer | React | Node.js | TypeScript',
    location: 'India',
    connections: 500, // Demo data - LinkedIn doesn't provide this via API
    followers: 1200, // Demo data - LinkedIn doesn't provide this via API
    profileUrl: `https://linkedin.com/in/${userId}`,
  }

  try {
    // Validate demo data
    const validatedData = linkedinPublicDataSchema.safeParse(demoData)
    
    if (!validatedData.success) {
      console.error('Invalid LinkedIn demo data:', validatedData.error)
      return null
    }

    return validatedData.data
  } catch (error) {
    console.error('Failed to fetch LinkedIn public data:', error)
    return null
  }
}

/**
 * Gets LinkedIn statistics (connections/followers - demo data)
 * Note: LinkedIn's official API doesn't provide follower counts
 */
export function getLinkedInStats(data: LinkedInPublicData) {
  return {
    connections: data.connections || 0,
    followers: data.followers || 0,
    fullName: `${data.firstName} ${data.lastName}`,
    headline: data.headline || '',
    location: data.location || '',
    profileUrl: data.profileUrl,
  }
}
