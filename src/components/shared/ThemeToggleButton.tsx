'use client'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleTheme } from '@/store/features/uiSlice'

export function ThemeToggleButton() {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector((state) => state.ui.theme)

  const handleToggle = () => {
    // Dispatch the toggleTheme action when clicked
    dispatch(toggleTheme())
  }

  // We can also use the theme state to conditionally apply classes
  // (You would need to configure Tailwind for dark mode)
  // For now, we'll just show the text.

  return (
    <button
      onClick={handleToggle}
      className="rounded-md bg-purple-600 px-4 py-2 text-white"
    >
      Toggle Theme (Current: {currentTheme})
    </button>
  )
}
