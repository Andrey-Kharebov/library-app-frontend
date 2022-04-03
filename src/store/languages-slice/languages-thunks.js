import { languagesActions } from './languages-slice'
import { uiActions } from '../ui-slice/ui-slice'

export const fetchLanguagesList = token => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const response = await fetch('http://localhost:9000/api/languages', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch languages list!')
      }
      
      const languagesData = data.languagesData
      
      dispatch(languagesActions.setLanguagesList(languagesData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const createLanguage = (token, title) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languagesData = data.newLanguageData
      
      dispatch(languagesActions.setCreatedLanguage(languagesData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const fetchLanguagesById = (token, languageId) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch language!')
      }
      
      const languageData = data.languageObj

      
      dispatch(languagesActions.setLanguageObj(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const saveWordsList = (token, languageId, wordsList) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { languageTitle{ _id, title }, wordsList }
      
      dispatch(languagesActions.setWordsList(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const createWordsPack = (token, languageId, wordsList) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/wordsPack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          wordsList
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { languageTitle{ _id, title }, wordsList, wordsPack }
      console.log(languageData.wordsPack)
      dispatch(languagesActions.setCreatedWordsPack(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const wordLevelUp = (token, wordsPackId, wordId) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { wordsPack }
      dispatch(languagesActions.setWordsPack({ wordsPack: languageData.wordsPack }))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const wordLevelDown = (token, wordsPackId, wordId) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { wordsPack }
      dispatch(languagesActions.setWordsPack({ wordsPack: languageData.wordsPack }))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const finishPack = (token, wordsPackId, words) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { languageTitle{ _id, title }, wordsPackId, wordsList }
      dispatch(languagesActions.finishPack(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const wordsSuggestion = (token, languageId, word) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/wordsSuggestion`, {
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { languageTitle{ _id, title }, words }
      dispatch(languagesActions.setSuggestedWords(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const getWords = (token, languageId, wordsId) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const response = await fetch(`http://localhost:9000/api/languages/${ languageId }/words`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          wordsId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { languageTitle{ _id, title }, words }
      dispatch(languagesActions.setWordsObjs(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const saveWord = (token, languageId, word) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { languageTitle{ _id, title }, word }
      dispatch(languagesActions.setSavedWord(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const deleteWord = (token, languageId, word) => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
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
        throw new Error(data.message || 'Could not create a new language!')
      }

      const languageData = data.languageData // { languageTitle{ _id, title }, word }
      dispatch(languagesActions.deleteWordObj(languageData))
      dispatch(uiActions.setIsLoading(false))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}