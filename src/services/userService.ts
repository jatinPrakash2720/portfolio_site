import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { User } from '@/types'
import { userCreationSchema, userUpdateSchema } from '@/lib/validators/user'

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      console.warn(`No user found with id: ${userId}`)
      return null
    }

    return { id: userSnap.id, ...userSnap.data() } as User
  } catch (error) {
    console.error('Error getting user by id:', error)
    return null
  }
}

export async function createUser(userId: string, data: unknown): Promise<User> {
  const validatedData = userCreationSchema.parse(data)

  const userRef = doc(db, 'users', userId)

  const newUser: Omit<User, 'id'> = {
    ...validatedData,
    headline: '',
    bio: '',
    profilePictureUrl: `https://avatar.vercel.sh/${validatedData.username}`,
    socialLinks: {},
  }

  await setDoc(userRef, newUser)

  return { id: userId, ...newUser }
}

export async function updateUser(userId: string, data: unknown): Promise<User> {
  const validatedData = userUpdateSchema.parse(data)

  if (Object.keys(validatedData).length === 0) {
    throw new Error('No valid fields to update.')
  }

  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, validatedData)

  const updatedUser = await getUserById(userId)
  if (!updatedUser) {
    throw new Error('Failed to fetch updated user.')
  }

  return updatedUser
}