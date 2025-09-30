import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/uiSlice'
import formReducer from './features/formSlice'
import { themeListenerMiddleware } from './middleware/themeListener' // 👈 Import the new listener

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    form: formReducer,
  },
  // The listener middleware has a specific way it needs to be added.
  middleware: (getDefaultMiddleware) =>
    // We add it before the other default middleware.
    getDefaultMiddleware().prepend(themeListenerMiddleware.middleware), // 👈 Apply the listener
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
