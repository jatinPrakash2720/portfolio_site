import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  theme: 'light' | 'dark'
  isModalOpen: boolean
  isMobileNavOpen: boolean
}

// Check for theme in localStorage ONLY if window is defined (i.e., we are on the client)
// This is a safe way to get an initial state, but we'll use a better "hydration" method later.
// For now, we default to 'dark'.
const initialState: UiState = {
  theme: 'dark',
  isModalOpen: false,
  isMobileNavOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // --- Theme Reducers ---
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    // --- Modal Reducers ---
    openModal: (state) => {
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
    // --- Mobile Nav Reducers ---
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen
    },
  },
})

export const { setTheme, toggleTheme, openModal, closeModal, toggleMobileNav } =
  uiSlice.actions
export default uiSlice.reducer
