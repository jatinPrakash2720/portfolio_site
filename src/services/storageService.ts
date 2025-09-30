/**
 * This service provides server-side functions for managing files in Firebase Cloud Storage.
 * For the client-to-cloud pattern, the UPLOAD logic lives on the client, but management
 * tasks like DELETION should be handled securely on the server.
 */

import { app } from '@/lib/firebase'
import { getStorage, ref, deleteObject } from 'firebase/storage'

const storage = getStorage(app)

/**
 * Deletes an image from Firebase Storage based on its public URL.
 * This is a server-side function used for cleaning up old images.
 *
 * @param imageUrl The public https://... URL of the file to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  // Ignore placeholder images or empty URLs
  if (!imageUrl || imageUrl.includes('placehold.co')) {
    console.warn('Skipping deletion for placeholder or empty URL.')
    return
  }

  try {
    const fileRef = ref(storage, imageUrl)
    await deleteObject(fileRef)
    console.log('Successfully deleted old image from storage:', imageUrl)
  } catch (error: any) {
    if (error.code === 'storage/object-not-found') {
      console.warn(
        'Old image not found for deletion, it may have already been removed:',
        imageUrl,
      )
    } else {
      console.error('Error during file deletion:', error)
      // We don't throw here to avoid failing the whole operation if cleanup fails
    }
  }
}
