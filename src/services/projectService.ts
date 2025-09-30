import { db } from '@/lib/firebase'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { Project, User } from '@/types'
import {
  projectCreationSchema,
  projectUpdateSchema,
} from '@/lib/validators/project'

/**
 * Fetches all projects from Firestore, ordered by creation date.
 * @returns An array of Project objects.
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(db, 'projects'),
      orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(projectsQuery)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Project,
    )
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return []
  }
}

/**
 * Fetches all projects for a specific author.
 * @param userId - The ID of the author.
 * @returns An array of Project objects.
 */
export async function getProjectsByAuthor(userId: string): Promise<Project[]> {
  try {
    const q = query(
      collection(db, 'projects'),
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Project,
    )
  } catch (error) {
    console.error(`Error fetching projects for user ${userId}:`, error)
    return []
  }
}

/**
 * Creates a new project document in Firestore.
 * @param data - The data for the new project.
 * @param author - The author (User object) of the project.
 * @returns The newly created Project object.
 */
export async function createProject(
  data: unknown,
  author: User,
): Promise<Project> {
  const validatedData = projectCreationSchema.parse(data)

  const newProjectData = {
    ...validatedData,
    createdAt: serverTimestamp(),
    // Denormalize author data for efficient reads
    authorId: author.id,
    authorUsername: author.username,
    authorAvatar: author.profilePictureUrl,
  }

  const docRef = await addDoc(collection(db, 'projects'), newProjectData)

  return { id: docRef.id, ...newProjectData } as unknown as Project
}

/**
 * Updates an existing project document.
 * @param projectId - The ID of the project to update.
 * @param data - The data to update.
 */
export async function updateProject(
  projectId: string,
  data: unknown,
): Promise<void> {
  const validatedData = projectUpdateSchema.parse(data)

  if (Object.keys(validatedData).length === 0) {
    throw new Error('No valid fields to update.')
  }

  const projectRef = doc(db, 'projects', projectId)
  await updateDoc(projectRef, validatedData)
}

/**
 * Deletes a project from Firestore.
 * @param projectId - The ID of the project to delete.
 */
export async function deleteProject(projectId: string): Promise<void> {
  const projectRef = doc(db, 'projects', projectId)
  await deleteDoc(projectRef)
}
