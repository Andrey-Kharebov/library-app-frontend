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


// const DUMMY_WORDS = [
//   { id: 'w1', word: 'to squeeze', translation: 'сжать, надавить', comment: 'you gotta put the squeeze on him' },
//   { id: 'w2', word: 'brevity', translation: 'краткость', comment: 'I am one of those who prefer brevity' },
//   { id: 'w3', word: 'to tag along', translation: 'присоединиться, увязаться', comment: 'if you\'re going down, I can tag along' },
//   { id: 'w4', word: 'a vicar', translation: 'викарий, священник', comment: 'quite inappropriate for a vicar, isn\'t it?' },
//   { id: 'w5', word: 'to dismiss', translation: 'распустить, отклонить, уволить, отпустить', comment: 'she dismissed the taxi at the corner of the road' },

//   { id: 'w6', word: 'dismissive', translation: 'пренебрежительный', comment: 'maybe it\'s because you are so dismissive' },
//   { id: 'w7', word: 'sedition', translation: 'призыв к мятежу', comment: 'today they started banishing people for sedition' },
//   { id: 'w8', word: 'to right', translation: 'исправить', comment: 'I will do whatever it takes to right the situation' },
//   { id: 'w9', word: 'a scourge', translation: 'бедствие', comment: 'they appeared just before the scourge of demons' },
//   { id: 'w10', word: 'to ingratiate', translation: 'снискать расположение', comment: 'they ingratiated themselves with the king' },

//   { id: 'w11', word: 'to draw upon', translation: 'использовать', comment: 'he can draw upon a restorative miracle' },
//   { id: 'w12', word: 'a seam', translation: 'шов, стык', comment: 'covered in tears, open seams and writhing grubs' },
//   { id: 'w13', word: 'sane', translation: 'нормальный, вменяемый', comment: 'it is not a thing a sane man would do' },
//   { id: 'w14', word: 'to deprive (of)', translation: 'лишить (чего-то)', comment: 'he wants to deprive them of safety from the marauders and wildlife' },
//   { id: 'w15', word: 'to solicit unsolicited', translation: 'запрашивать незапрошенный', comment: 'we will solicit this information / if you don\'t mind a bit of unsolicited advice, be cautious' },

//   { id: 'w16', word: 'to taint', translation: 'испортить, запятнать', comment: 'this book is tainting a collector\'s library' },
//   { id: 'w17', word: 'to thwart', translation: 'помешать, сорвать', comment: 'I\'m glad I\'ve managed to thwart your plans' },
//   { id: 'w18', word: 'retrieval', translation: 'поиск', comment: 'my retrieval efforts have been thwarted by marauders' },
//   { id: 'w19', word: 'a layman', translation: 'обыватель', comment: 'I just want to keep the writing out of layman\'s hands' },
//   { id: 'w20', word: 'compelling', translation: 'веский, убедительный', comment: 'you make a compelling argument' },

//   { id: 'w21', word: 'tidiness tidy', translation: 'опрятность опрятный', comment: 'the tidiness of my fellow worker is my responsibility' },
//   { id: 'w22', word: 'an asset', translation: 'актив, имущество', comment: 'this man was a company\'s asset' },
//   { id: 'w23', word: 'a(to) pawn (off)', translation: 'пешка, ломбард заложить, всучить', comment: 'I was thinking that we pawn off his teeth' },
//   { id: 'w24', word: 'a heirloom', translation: 'семейная реликвия, фамильная вещь', comment: 'her most precious heirloom' },
//   { id: 'w25', word: 'to pass down', translation: 'передавать', comment: 'heirlooms passed down to his family' },
// ]



