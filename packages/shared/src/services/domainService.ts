import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { User } from '../types'

export interface DomainResolution {
  user: User
  appType: 'portfolio' | 'admin'
  domain: string
}

export class DomainService {
  /**
   * Resolve a domain to a user and determine app type
   */
  async resolveDomain(host: string): Promise<DomainResolution | null> {
    try {
      // Query users by portfolio domain
      const portfolioQuery = query(
        collection(db, 'users'),
        where('portfolioDomain', '==', host),
      )
      const portfolioSnapshot = await getDocs(portfolioQuery)

      if (!portfolioSnapshot.empty) {
        const userDoc = portfolioSnapshot.docs[0]
        return {
          user: userDoc.data() as User,
          appType: 'portfolio',
          domain: host,
        }
      }

      // Query users by admin domain
      const adminQuery = query(
        collection(db, 'users'),
        where('adminDomain', '==', host),
      )
      const adminSnapshot = await getDocs(adminQuery)

      if (!adminSnapshot.empty) {
        const userDoc = adminSnapshot.docs[0]
        return {
          user: userDoc.data() as User,
          appType: 'admin',
          domain: host,
        }
      }

      return null
    } catch (error) {
      console.error('Error resolving domain:', error)
      return null
    }
  }

  /**
   * Get user by domain (for middleware)
   */
  async getUserByDomain(domain: string): Promise<User | null> {
    const resolution = await this.resolveDomain(domain)
    return resolution?.user || null
  }

  /**
   * Check if domain is valid for user
   */
  async isDomainValid(domain: string, userId: string): Promise<boolean> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (!userDoc.exists()) return false

      const user = userDoc.data() as User
      return user.portfolioDomain === domain || user.adminDomain === domain
    } catch (error) {
      console.error('Error validating domain:', error)
      return false
    }
  }

  /**
   * Get all domains for a user
   */
  async getUserDomains(
    userId: string,
  ): Promise<{ portfolio: string; admin: string } | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (!userDoc.exists()) return null

      const user = userDoc.data() as User
      return {
        portfolio: user.portfolioDomain,
        admin: user.adminDomain,
      }
    } catch (error) {
      console.error('Error getting user domains:', error)
      return null
    }
  }

  /**
   * Update user domains
   */
  async updateUserDomains(
    userId: string,
    domains: { portfolio?: string; admin?: string },
  ): Promise<boolean> {
    try {
      const userRef = doc(db, 'users', userId)
      const updateData: Partial<User> = {}

      if (domains.portfolio) updateData.portfolioDomain = domains.portfolio
      if (domains.admin) updateData.adminDomain = domains.admin

      await updateDoc(userRef, updateData)
      return true
    } catch (error) {
      console.error('Error updating user domains:', error)
      return false
    }
  }
}

export const domainService = new DomainService()
