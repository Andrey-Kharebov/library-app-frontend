import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  languagesList: null
}

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setLanguagesList(state, action) {
      state.languagesList = action.payload
    }
  }
})

export const languagesActions = languagesSlice.actions

export default languagesSlice