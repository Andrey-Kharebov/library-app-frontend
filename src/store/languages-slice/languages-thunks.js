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
      dispatch(languagesActions.setWordsList({ languageTitle: languageData.languageTitle, wordsList: languageData.wordsList }))
      dispatch(languagesActions.setCreatedWordsPack({ languageTitle: languageData.languageTitle, wordsPack: languageData.wordsPack }))
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

// const DUMMY_WORDS = [
//   { id: 'w1', word: 'to squeeze', translation: 'сжать, надавить // you gotta put the squeeze on him 
//   { id: 'w2', word: 'brevity', translation: 'краткость // I am one of those who prefer brevity 
//   { id: 'w3', word: 'to tag along', translation: 'присоединиться, увязаться // if you\'re going down, I can tag along 
//   { id: 'w4', word: 'a vicar', translation: 'викарий, священник // quite inappropriate for a vicar, isn\'t it? 
//   { id: 'w5', word: 'to dismiss', translation: 'распустить, отклонить, уволить, отпустить // she dismissed the taxi at the corner of the road 

//   { id: 'w6', word: 'dismissive', translation: 'пренебрежительный // maybe it\'s because you are so dismissive 
//   { id: 'w7', word: 'sedition', translation: 'призыв к мятежу // today they started banishing people for sedition 
//   { id: 'w8', word: 'to right', translation: 'исправить // I will do whatever it takes to right the situation 
//   { id: 'w9', word: 'a scourge', translation: 'бедствие // they appeared just before the scourge of demons 
//   { id: 'w10', word: 'to ingratiate', translation: 'снискать расположение // they ingratiated themselves with the king 

//   { id: 'w11', word: 'to draw upon', translation: 'использовать // he can draw upon a restorative miracle 
//   { id: 'w12', word: 'a seam', translation: 'шов, стык // covered in tears, open seams and writhing grubs 
//   { id: 'w13', word: 'sane', translation: 'нормальный, вменяемый // it is not a thing a sane man would do 
//   { id: 'w14', word: 'to deprive (of)', translation: 'лишить (чего-то) // he wants to deprive them of safety from the marauders and wildlife 
//   { id: 'w15', word: 'to solicit unsolicited', translation: 'запрашивать незапрошенный // we will solicit this information / if you don\'t mind a bit of unsolicited advice, be cautious 

//   { id: 'w16', word: 'to taint', translation: 'испортить, запятнать // this book is tainting a collector\'s library 
//   { id: 'w17', word: 'to thwart', translation: 'помешать, сорвать // I\'m glad I\'ve managed to thwart your plans 
//   { id: 'w18', word: 'retrieval', translation: 'поиск // my retrieval efforts have been thwarted by marauders 
//   { id: 'w19', word: 'a layman', translation: 'обыватель // I just want to keep the writing out of layman\'s hands 
//   { id: 'w20', word: 'compelling', translation: 'веский, убедительный // you make a compelling argument 

//   { id: 'w21', word: 'tidiness tidy', translation: 'опрятность опрятный // the tidiness of my fellow worker is my responsibility 
//   { id: 'w22', word: 'an asset', translation: 'актив, имущество // this man was a company\'s asset 
//   { id: 'w23', word: 'a(to) pawn (off)', translation: 'пешка, ломбард заложить, всучить // I was thinking that we pawn off his teeth 
//   { id: 'w24', word: 'a heirloom', translation: 'семейная реликвия, фамильная вещь // her most precious heirloom 
//   { id: 'w25', word: 'to pass down', translation: 'передавать // heirlooms passed down to his family 
// ]



// to squeeze - сжать, надавить // you gotta put the squeeze on him 
// brevity - краткость // I am one of those who prefer brevity 
// to tag along - присоединиться, увязаться // if you\'re going down, I can tag along 
// a vicar - викарий, священник // quite inappropriate for a vicar, isn\'t it? 
// to dismiss - распустить, отклонить, уволить, отпустить // she dismissed the taxi at the corner of the road 

// dismissive - пренебрежительный // maybe it\'s because you are so dismissive 
// sedition - призыв к мятежу // today they started banishing people for sedition 
// to right - исправить // I will do whatever it takes to right the situation 
// a scourge - бедствие // they appeared just before the scourge of demons 
// to ingratiate - снискать расположение // they ingratiated themselves with the king 

// to draw upon - использовать // he can draw upon a restorative miracle 
// a seam - шов, стык // covered in tears, open seams and writhing grubs 
// sane - нормальный, вменяемый // it is not a thing a sane man would do 
// to deprive (of) - лишить (чего-то) // he wants to deprive them of safety from the marauders and wildlife 
// to solicit unsolicited - запрашивать незапрошенный // we will solicit this information / if you don\'t mind a bit of unsolicited advice, be cautious 

// to taint - испортить, запятнать // this book is tainting a collector\'s library 
// to thwart - помешать, сорвать // I\'m glad I\'ve managed to thwart your plans 
// retrieval - поиск // my retrieval efforts have been thwarted by marauders 
// a layman - обыватель // I just want to keep the writing out of layman\'s hands 
// compelling - веский, убедительный // you make a compelling argument 

// tidiness tidy - опрятность опрятный // the tidiness of my fellow worker is my responsibility 
// an asset - актив, имущество // this man was a company\'s asset 
// a(to) pawn (off) - пешка, ломбард заложить, всучить // I was thinking that we pawn off his teeth 
// a heirloom - емейная реликвия, фамильная вещь // her most precious heirloom 
// to pass down - передавать // heirlooms passed down to his family 
