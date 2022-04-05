import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadingObj: null,
  errorObj: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoadingObj(state, action) { // { type: 'fecthLanguages', isLoading: true }
      state.loadingObj = action.payload
    },
    setErrorObj(state, action) { // { type: 'fecthLanguages', error: 'Something went wrong!' }
      state.errorObj = action.payload
    }
  }
})

export const uiActions = uiSlice.actions

export default uiSlice