import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isError: false,
  error: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const uiActions = uiSlice.actions

export default uiSlice