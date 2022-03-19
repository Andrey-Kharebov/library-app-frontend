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
      const newLanguageObj = action.payload.newLanguageObj
      newLanguageObj.wordsList = { changed: false, value: newLanguageObj.wordsList }
      
      if (!state.languagesTitlesList) {
        state.languagesTitlesList = [action.payload.newLanguageTitle]
        state.languagesObjs = [newLanguageObj]
      } else {
        state.languagesTitlesList.push(action.payload.newLanguageTitle)
        state.languagesObjs.push(newLanguageObj)
      }
    },
    setLanguageObj(state, action) {
      const languageObj = action.payload
      languageObj.wordsList = { changed: false, value: languageObj.wordsList }
      state.languagesObjs.push(languageObj)  
    },
    setWordsList(state, action) {
      let fetchedLanguage = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)
      fetchedLanguage.wordsList = { changed: false, value: action.payload.wordsList }
    },

    
    changeWordsList(state, action) {
      const languageObj = state.languagesObjs.find(lo => lo._id === action.payload.languageObjId)
      languageObj.wordsList.changed = true 
      languageObj.wordsList.value = action.payload.value
    }
  }
})

export const languagesActions = languagesSlice.actions

export default languagesSlice