import { createSlice, current } from '@reduxjs/toolkit'

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
    },
    setLanguageObj(state, action) {
      const languageObj = action.payload
      languageObj.wordsList = { changed: false, wordsList: languageObj.wordsList }
      const alreadyFetchedLanguageObj = state.languagesObjs.find(l => l._id === languageObj._id)
      if (alreadyFetchedLanguageObj) {
        console.log('bange')
      } else {
        state.languagesObjs.push(languageObj)
      }
      // console.log(languageObj)
      // console.log(current(state.languagesObjs))
    }
  }
})

export const languagesActions = languagesSlice.actions

export default languagesSlice