import { languagesActions } from './languages-slice'
import { uiActions } from '../ui-slice/ui-slice'

// Languages
export const fetchLanguages = token => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'fetchLanguages', isLoading: true }))

      const response = await fetch('http://localhost:9000/api/languages', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch languages list!')
      }

      const langData = data.langData
      dispatch(languagesActions.setFetchedLanguages(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'fetchLanguages', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const createLanguage = (token, title) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'createLanguage', isLoading: true }))

      const response = await fetch('http://localhost:9000/api/languages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          title: title
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not create new language!')
      }

      const langData = data.langData
      dispatch(languagesActions.setCreatedLanguage(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'createLanguage', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const fetchLanguageObj = (token, languageId) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'fetchLanguageObj', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch a language!')
      }

      const langData = data.langData
      dispatch(languagesActions.setLanguageObj(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'fetchLanguageObj', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

// WordsList & Packs
export const saveWordsList = (token, languageId, wordsList) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'saveWordsList', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/wordsList`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          wordsList: wordsList
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not create new language!')
      }

      const langData = data.langData
      dispatch(languagesActions.setWordsList(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'saveWordsList', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const createWordsPack = (token, languageId, wordsList) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'createWordsPack', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/wordsPack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          languageId,
          wordsList
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not create a new language!')
      }

      const langData = data.langData
      dispatch(languagesActions.setCreatedWordsPack(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'createWordsPack', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const wordLevelUp = (token, wordsPackId, wordId) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'changeWordLevel', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ wordsPackId }/wordLevelUp`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          wordId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not up the word\'s level!')
      }

      const langData = data.langData
      dispatch(languagesActions.setWordsPack(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'changeWordLevel', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const wordLevelDown = (token, wordsPackId, wordId) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'changeWordLevel', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ wordsPackId }/wordLevelDown`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          wordId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not up the word\'s level!')
      }

      const langData = data.langData
      dispatch(languagesActions.setWordsPack(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'changeWordLevel', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const finishPack = (token, wordsPackId, words) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'finishPack', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ wordsPackId }/finish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          words
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not complete the word\'s pack!')
      }

      const langData = data.langData
      dispatch(languagesActions.finishPack(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'finishPack', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const wordsSuggestion = (token, languageId, word) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'wordsSuggestion', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/searchWords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          word
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch suggested words!')
      } 

      const langData = data.langData
      dispatch(languagesActions.setSuggestedWords(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'wordsSuggestion', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

// Words
export const searchWords = (token, languageId, word) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'searchWords', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/searchWords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          word
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch searched words!')
      } 

      const langData = data.langData
      dispatch(languagesActions.setSearchedWords(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'searchWords', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const saveWord = (token, languageId, word) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'saveWord', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/words`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          word
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not save a word!')
      }

      const langData = data.langData
      dispatch(languagesActions.setSavedWord(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'saveWord', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const deleteWord = (token, languageId, word) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'deleteWord', isLoading: true }))

      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/words`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          word
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not delete a word')
      }

      const langData = data.langData
      dispatch(languagesActions.setDeletedWord(langData))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'deleteWord', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}