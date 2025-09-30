'use client' // This is a Client Component

import { Provider } from 'react-redux'
import { store } from './store'

// This wrapper component makes the Redux store available to the rest of the app
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
