import { languagesActions } from './languages-slice'
import { uiActions } from '../ui-slice/ui-slice'

const baseUrl = `http://localhost:9000/`

// dispatch
// type for loading & error obj's
// data for http
// error message 
// reducer's function
const sendRequest = async (dispatch, requestType, instanceData, responseError, sliceFunction) => {
  try {
   dispatch(uiActions.setErrorObj(null))
   dispatch(uiActions.setLoadingObj({ type: requestType, isLoading: true }))

   const response = await fetch(`${ baseUrl }${ instanceData.endpoint }`, {
     method: instanceData.method,
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + instanceData.token
     },
     body: instanceData.body && JSON.stringify({ ...instanceData.body })
   })

   const data = await response.json()

   if (!response.ok) {
     throw new Error(data.message || responseError)
   }

   const langData = data.langData
   dispatch(languagesActions[sliceFunction](langData))

   dispatch(uiActions.setLoadingObj(null))
  } catch (err) {
   dispatch(uiActions.setLoadingObj(null))
   dispatch(uiActions.setErrorObj({ type: requestType, isError: true, error: err.message || 'Something went wrong, please try again!' }))
  }
}

// Languages
export const fetchLanguages = token => {
  const instanceData = {
    method: 'GET',
    endpoint: `api/languages`,
    token
  } 

  return async dispatch => await sendRequest(dispatch, 'fetchLanguages', instanceData, 'Could not fetch languages list!', 'setFetchedLanguages')
}

export const createLanguage = (token, title) => {
  const instanceData = {
    method: 'POST',
    endpoint: `api/languages`,
    token,
    body: { title }
  }

  return async dispatch => await sendRequest(dispatch, 'createLanguage', instanceData, 'Could not create new language!', 'setCreatedLanguage') 
}

export const fetchLanguageObj = (token, languageId) => {
  const instanceData = {
    method: 'GET',
    endpoint: `api/languages/${ languageId }`,
    token
  }

  return async dispatch => await sendRequest(dispatch, 'fetchLanguageObj', instanceData, 'Could not fetch a language!', 'setLanguageObj') 
}

// WordsList & Packs
export const saveWordsList = (token, languageId, wordsList) => {
  const instanceData = {
    method: 'PATCH',
    endpoint: `api/languages/${ languageId }/wordsList`,
    token,
    body: { wordsList }
  } 

  return async dispatch => await sendRequest(dispatch, 'saveWordsList', instanceData, 'Could not create new language!', 'setWordsList')
}

export const createWordsPack = (token, languageId, wordsList) => {
  const instanceData = {
    method: 'POST',
    endpoint: `api/languages/wordsPack`,
    token,
    body: { languageId, wordsList }
  } 

  return async dispatch => await sendRequest(dispatch, 'createWordsPack', instanceData, 'Could not create new words pack!', 'setCreatedWordsPack')
}

export const wordLevelUp = (token, wordsPackId, wordId) => {
  const instanceData = {
    method: 'PATCH',
    endpoint: `api/languages/${ wordsPackId }/wordLevelUp`,
    token,
    body: { wordsPackId, wordId }
  } 

  return async dispatch => await sendRequest(dispatch, 'changeWordLevel', instanceData, 'Could not up a word\'s level!', 'setWordsPack')  
}

export const wordLevelDown = (token, wordsPackId, wordId) => {
  const instanceData = {
    method: 'PATCH',
    endpoint: `api/languages/${ wordsPackId }/wordLevelDown`,
    token,
    body: { wordsPackId, wordId }
  } 

  return async dispatch => await sendRequest(dispatch, 'changeWordLevel', instanceData, 'Could not down a word\'s level!', 'setWordsPack') 
}

export const finishPack = (token, wordsPackId, words) => {
  const instanceData = {
    method: 'POST',
    endpoint: `api/languages/${ wordsPackId }/finish`,
    token,
    body: { wordsPackId, words }
  } 

  return async dispatch => await sendRequest(dispatch, 'finishPack', instanceData, 'Could not complete a word\'s pack!', 'finishPack')  
}

export const wordsSuggestion = (token, languageId, word) => {
  const instanceData = {
    method: 'POST',
    endpoint: `api/languages/${ languageId }/searchWords`,
    token,
    body: { languageId, word }
  }

  return async dispatch => await sendRequest(dispatch, 'wordsSuggestion', instanceData, 'Could not fetch suggested words!', 'setSuggestedWords') 
}

// Words
export const searchWords = (token, languageId, word) => {
  const instanceData = {
    method: 'POST',
    endpoint: `api/languages/${ languageId }/searchWords`,
    token,
    body: { languageId, word }
  }

  return async dispatch => await sendRequest(dispatch, 'searchWords', instanceData, 'Could not fetch searched words!', 'setSearchedWords') 
}

export const saveWord = (token, languageId, word) => {
  const instanceData = {
    method: 'PATCH',
    endpoint: `api/languages/${ languageId }/words`,
    token,
    body: { languageId, word }
  }

  return async dispatch => await sendRequest(dispatch, 'saveWord', instanceData, 'Could not save a word!', 'setSavedWord')
}

export const deleteWord = (token, languageId, word) => {
  const instanceData = {
    method: 'DELETE',
    endpoint: `api/languages/${ languageId }/words`,
    token,
    body: { languageId, word }
  }

  return async dispatch => await sendRequest(dispatch, 'deleteWord', instanceData, 'Could not delete a word!', 'setDeletedWord')
}