import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { setTheme, toggleTheme } from '../features/uiSlice'
import type { RootState } from '../store' // We can import this here, but see the store update below

// Create the listener middleware instance.
export const themeListenerMiddleware = createListenerMiddleware()

// Add a "listener" to the middleware.
// This listener will run whenever the setTheme or toggleTheme action is dispatched.
themeListenerMiddleware.startListening({
  // The matcher determines which actions this listener responds to.
  matcher: isAnyOf(setTheme, toggleTheme),

  // The "effect" is the code that runs as a side effect.
  effect: (action, listenerApi) => {
    // We check for the browser environment here.
    if (typeof window !== 'undefined') {
      // We get the latest state *after* the reducer has run.
      const state = listenerApi.getState() as RootState
      const newTheme = state.ui.theme

      console.log(`Theme changed to: ${newTheme}. Saving to localStorage.`)
      localStorage.setItem('portfolioTheme', newTheme)
    }
  },
})
