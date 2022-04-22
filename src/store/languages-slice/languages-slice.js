import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  langTitlesList: null,
  langObjs: null
}

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    // Languages
    setFetchedLanguages(state, action) {
      if (action.payload.langObjs.length > 0) {
        const firstLangObj = action.payload.langObjs[0]
        firstLangObj.wordsList = { changed: false, value: firstLangObj.wordsList }
        firstLangObj.suggestedWords = []
        firstLangObj.searchedWords = []
        

        if (firstLangObj.wordsPacks.length > 0) {
          firstLangObj.wordsPacks = firstLangObj.wordsPacks.map((wp, idx) => {
            return idx === 0 ? { ...wp, active: true } : { ...wp, active: false }
          })
        }

        state.langObjs = [firstLangObj]
      }
      state.langTitlesList = action.payload.langTitlesList
    },
    setCreatedLanguage(state, action) {
      const newLangObj = action.payload.newLangObj
      newLangObj.wordsList = { changed: false, value: newLangObj.wordsList }
      newLangObj.suggestedWords = []
      newLangObj.searchedWords = []

      if (!state.langTitlesList.length) {
        state.langTitlesList = [action.payload.newLangTitle]
        state.langObjs = [newLangObj]
      } else {
        state.langTitlesList.push(action.payload.newLangTitle)
        state.langObjs.push(newLangObj)
      }
    },
    setLanguageObj(state, action) {
      const langObj = action.payload.langObj
      langObj.wordsList = { changed: false, value: langObj.wordsList }
      langObj.suggestedWords = []
      langObj.searchedWords = []

      state.langObjs.push(langObj) 
    },

    // WordsList & Packs
    setWordsList(state, action) {
      const langObj = state.langObjs.find(lo => lo._id === action.payload.langTitle._id)
      langObj.wordsList = { changed: false, value: action.payload.wordsList }
      langObj.suggestedWords = []

      state.langObjs.push(langObj) 
    },
    changeWordsList(state, action) {
      const langObj = state.langObjs.find(lo => lo._id === action.payload.langObjId)
      langObj.wordsList.changed = true 
      langObj.wordsList.value = action.payload.value
    },
    setCreatedWordsPack(state, action) {
      let langObj = state.langObjs.find(l => l._id === action.payload.langTitle._id)
      langObj.wordsList = { changed: false, value: action.payload.wordsList }
      langObj.words = [...action.payload.words]
      if (langObj.wordsPacks.length === 0) {
        langObj.wordsPacks.push({...action.payload.wordsPack, active: true })
      } else {
        langObj.wordsPacks.push({...action.payload.wordsPack, active: false })
      }
    },
    setWordsPack(state, action) {
      const langObj = state.langObjs.find(lo => lo._id === action.payload.wordsPack.language)
      langObj.wordsPacks = langObj.wordsPacks.map(wp => {
        if (wp._id === action.payload.wordsPack._id) {
          return {...action.payload.wordsPack, active: true}
        } else {
          return {...wp}
        }
      })
    },
    changeActiveWordsPack(state, action) {
      const wordsPackId = action.payload.wordsPackId
      const langObj = state.langObjs.find(l => l._id === action.payload.langObjId)
      langObj.wordsPacks = langObj.wordsPacks.map(wp => {
        return wp._id === wordsPackId ? { ...wp, active: true, } : { ...wp, active: false }
      })
    },
    finishPack(state, action) {
      let langObj = state.langObjs.find(l => l._id === action.payload.langTitle._id)
      langObj.wordsList = { changed: false, value: action.payload.wordsList }
      langObj.wordsPacks = langObj.wordsPacks.filter(wp => wp._id !== action.payload.wordsPackId)
      if (langObj.wordsPacks.length > 0) {
        langObj.wordsPacks[0].active = true
      }
    },
    setSuggestedWords(state, action) {
      let langObj = state.langObjs.find(l => l._id === action.payload.langTitle._id)
      langObj.suggestedWords = action.payload.words 
    },

    // Words
    setSearchedWords(state, action) {
      let langObj = state.langObjs.find(l => l._id === action.payload.langTitle._id)
      langObj.searchedWords = action.payload.words 
    },
    setWordsObjs(state, action) {
      let languageObj = state.languagesObjs.find(l => l._id === action.payload.languageTitle._id)
      languageObj.wordsObjs = action.payload.words
    },
    setSavedWord(state, action) {
      console.log(action.payload)
      let langObj = state.langObjs.find(l => l._id === action.payload.langTitle._id)
      
      console.log(current(langObj))
      langObj.searchedWords = langObj.searchedWords.map(w => {
        return w._id === action.payload.word._id
          ? { ...action.payload.word, changed: false }
          : { ...w } 
      })
      langObj.suggestedWords = []
      langObj.wordsPacks = langObj.wordsPacks.map(wp => {
        let packForReplace = action.payload.wordsPacks.find(nwp => nwp._id === wp._id)

        return packForReplace
          ? wp.active 
            ? { ...packForReplace, active: true }
            : { ...packForReplace, active: false }            
          : wp
      })
    },
    setDeletedWord(state, action) {
      const langObj = state.langObjs.find(l => l._id === action.payload.langTitle._id)
      if (langObj.searchedWords) {
        langObj.searchedWords = langObj.searchedWords.filter(w => w._id !== action.payload.word._id)
      }
      langObj.words = [...action.payload.word.language.words]
    }
  }
})

export const languagesActions = languagesSlice.actions

export default languagesSlice