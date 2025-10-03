import { NextResponse } from 'next/server'
import { getLinkedInProfile, getLinkedInPublicData, getLinkedInStats } from '@/services/linkedinService'

export async function GET() {
  try {
    // Try to get official LinkedIn profile first
    const profile = await getLinkedInProfile()
    
    if (profile) {
      const responseData = {
        id: profile.id,
        firstName: profile.firstName.localized.en_US || Object.values(profile.firstName.localized)[0],
        lastName: profile.lastName.localized.en_US || Object.values(profile.lastName.localized)[0],
        headline: profile.headline?.localized.en_US || Object.values(profile.headline?.localized || {})[0],
        vanityName: profile.vanityName,
        profileUrl: profile.vanityName ? `https://linkedin.com/in/${profile.vanityName}` : '',
        isOfficial: true,
        isDemo: false,
      }
      
      console.log('LinkedIn API - Official profile data:', responseData)
      return NextResponse.json(responseData)
    }

    // Fallback to public data (demo data)
    const publicData = await getLinkedInPublicData()
    
    if (!publicData) {
      // Return demo data if everything fails
      const demoData = {
        firstName: 'Demo',
        lastName: 'User',
        headline: 'Full Stack Developer',
        location: 'India',
        connections: 500,
        followers: 1200,
        profileUrl: 'https://linkedin.com/in/demo-user',
        isOfficial: false,
        isDemo: true,
      }
      
      console.log('LinkedIn API - Using demo data:', demoData)
      return NextResponse.json(demoData)
    }

    const stats = getLinkedInStats(publicData)
    const responseData = {
      ...stats,
      isOfficial: false,
      isDemo: true, // Mark as demo since we're using estimated data
    }
    
    console.log('LinkedIn API - Public data:', responseData)
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('LinkedIn API route error:', error)
    
    // Return fallback demo data
    const fallbackData = {
      firstName: 'Demo',
      lastName: 'User',
      headline: 'Full Stack Developer',
      location: 'India',
      connections: 500,
      followers: 1200,
      profileUrl: 'https://linkedin.com/in/demo-user',
      isOfficial: false,
      isDemo: true,
    }
    
    console.log('LinkedIn API - Using fallback data due to error:', fallbackData)
    return NextResponse.json(fallbackData)
  }
}
