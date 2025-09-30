'use client'

import { useAppDispatch } from '@/store/hooks'
import { setTheme } from '@/store/features/uiSlice'
import { useEffect } from 'react'

// This component doesn't render any UI.
// It's a client-side-only utility to sync the store with localStorage.
export function StoreHydrator() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // This effect runs once on the client after the initial render.
    const savedTheme = localStorage.getItem('portfolioTheme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      dispatch(setTheme(savedTheme))
    }
  }, [dispatch]) // Dependency array ensures this runs only once

  return null // Render nothing
}
