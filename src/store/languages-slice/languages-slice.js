import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  langTitlesList: null,
  langObjs: null
}

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    // setLanguagesList(state, action) {
    //   if (action.payload.languagesObjs.length > 0) {
    //     const firstLanguageObj = action.payload.languagesObjs[0]
    //     firstLanguageObj.wordsList = { changed: false, value: firstLanguageObj.wordsList, lastWord: firstLanguageObj.wordsList.trim().split('\n')[firstLanguageObj.wordsList.trim().split('\n').length - 1] }
    //     if (firstLanguageObj.wordsPacks.length > 0) {
    //       firstLanguageObj.wordsPacks = firstLanguageObj.wordsPacks.map((wp, idx) => {
    //         return idx === 0 ? { ...wp, active: true } : { ...wp, active: false }
    //       })
    //     }
        
    //     state.languagesTitlesList = action.payload.languagesTitlesList
    //     state.languagesObjs = [firstLanguageObj]
    //   }
    // },
    setFetchedLanguages(state, action) {
      if (action.payload === 'loading') {
        state.langTitlesList = 'loading'
      } else if (action.payload === 'error') {
        state.langTitlesList = 'error'
      } else if (action.payload.langObjs.length > 0) {
        const firstLangObj = action.payload.langObjs[0]
        
        state.langTitlesList = action.payload.langTitlesList
        state.langObjs = [firstLangObj]
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
      if (languageObj.wordsPacks.length > 0) {
        languageObj.wordsPacks = languageObj.wordsPacks.map((wp, idx) => {
          return idx === 0 ? { ...wp, active: true } : { ...wp, active: false }
        })
      }

      state.languagesObjs.push(languageObj)  
    },
    setWordsList(state, action) {
      let languageObj = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)
      languageObj.wordsList = { changed: false, value: action.payload.wordsList }
      languageObj.suggestedWords = []
    },
    setCreatedWordsPack(state, action) {
      console.log(action.payload)
      let languageObj = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)
      languageObj.wordsList = { changed: false, value: action.payload.wordsList }
      languageObj.words = [...action.payload.words]
      if (languageObj.wordsPacks.length === 0) {
        languageObj.wordsPacks.push({...action.payload.wordsPack, active: true })
      } else {
        languageObj.wordsPacks.push({...action.payload.wordsPack, active: false })
      }
    },
    setWordsPack(state, action) {
      const languageObj = state.languagesObjs.find(l => l._id === action.payload.wordsPack.language)
      
      languageObj.wordsPacks = languageObj.wordsPacks.map(wp => {
        if (wp._id === action.payload.wordsPack._id) {
          return {...action.payload.wordsPack, active: true}
        } else {
          return {...wp}
        }
      })
    },
    finishPack(state, action) {
      let languageObj = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)
      languageObj.wordsList = { changed: false, value: action.payload.wordsList }
      languageObj.wordsPacks = languageObj.wordsPacks.filter(wp => wp._id !== action.payload.wordsPackId)
      if (languageObj.wordsPacks.length > 0) {
        languageObj.wordsPacks[0].active = true
      }
    },
    setSuggestedWords(state, action) {
      console.log(action.payload)
      let languageObj = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)
      console.log(current(languageObj))
      languageObj.suggestedWords = action.payload.words 
    },
    setWordsObjs(state, action) {
      let languageObj = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)
      languageObj.wordsObjs = action.payload.words
    },
    setSavedWord(state, action) {
      console.log(action.payload)
      let languageObj = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)

      languageObj.wordsObjs = languageObj.wordsObjs.map(w => {
        if (w._id === action.payload.word._id) {
          return { ...action.payload.word, changed: false }
        } else {
          return { ...w }
        }
      })
    },

    
    changeWordsList(state, action) {
      const languageObj = state.languagesObjs.find(lo => lo._id === action.payload.languageObjId)
      languageObj.wordsList.changed = true 
      languageObj.wordsList.value = action.payload.value
    },
    changeActiveWordsPack(state, action) {
      const wordsPackId = action.payload.wordsPackId
      const languageObj = state.languagesObjs.find(l => l._id === action.payload.languageObjId)
      languageObj.wordsPacks = languageObj.wordsPacks.map(wp => {
        return wp._id === wordsPackId ? { ...wp, active: true, } : { ...wp, active: false }
      })
    },
    changeWordObj(state, action) {
      const languageObj = state.languagesObjs.find(l => l._id === action.payload.language)

      languageObj.wordsObjs = languageObj.wordsObjs.map(w => {
        if (w._id === action.payload._id) {
          return { ...action.payload, changed: true }
        } else {
          return { ...w }
        }
      })
    },
    deleteWordObj(state, action) {
      console.log(action.payload)
      const languageObj = state.languagesObjs.find(l => l._id === action.payload.word.language._id)
      if (languageObj.suggestedWords) {
        languageObj.suggestedWords = languageObj.suggestedWords.filter(w => w._id !== action.payload.word._id)
      }
      languageObj.words = [...action.payload.word.language.words]
    }
  }
})

export const languagesActions = languagesSlice.actions

export default languagesSlice