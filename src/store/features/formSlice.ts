import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// This allows for a form with any number of steps, each with any data
interface FormState {
  stepData: Record<string, any>
  currentStep: number
}

const initialState: FormState = {
  stepData: {},
  currentStep: 1,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateStepData: (
      state,
      action: PayloadAction<{ step: string; data: any }>,
    ) => {
      state.stepData[action.payload.step] = action.payload.data
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    resetForm: () => initialState, // Resets the form to its initial state
  },
})

export const { updateStepData, setCurrentStep, resetForm } = formSlice.actions
export default formSlice.reducer
