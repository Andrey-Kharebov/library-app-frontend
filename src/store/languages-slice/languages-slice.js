import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  languagesTitlesList: null,
  languagesObjs: null
}

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setLanguagesList(state, action) {
      if (action.payload.languagesObjs.length > 0) {
        const firstLanguageObj = action.payload.languagesObjs[0]
        firstLanguageObj.wordsList = { changed: false, value: firstLanguageObj.wordsList }
        
        state.languagesTitlesList = action.payload.languagesTitlesList
        state.languagesObjs = [firstLanguageObj]
      }
    },
    setCreatedLanguage(state, action) {
      if (!state.languagesTitlesList) {
        state.languagesTitlesList = [action.payload.newLanguageTitle]
        state.languagesObjs = [action.payload.newLanguageObj]
      } else {
        state.languagesTitlesList.push(action.payload.newLanguageTitle)
        state.languagesObjs.push(action.payload.newLanguageObj)
      }
    }
  }
})

export const languagesActions = languagesSlice.actions

export default languagesSlice