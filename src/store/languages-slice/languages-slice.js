import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  words: [],
  wordsList: ''
}

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setLanguagesData(state, action) {
      state.words = action.payload.words
      state.wordsList = action.payload.wordsList
    }
  }
})

export const languagesActions = languagesSlice.actions

export default languagesSlice