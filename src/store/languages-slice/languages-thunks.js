import { languagesActions } from './languages-slice'
import { uiActions } from '../ui-slice/ui-slice'

export const fetchLanguagesData = () => {
  return async dispatch => {
    dispatch(uiActions.setIsLoading(true))
    const fetchData = async () => {
      const response = await fetch('http://localhost:9000/api/languages/english')

      if (!response.ok) {
        throw new Error('Could not fetch languages data!')
      }

      const data = await response.json()

      return data
    }
    
    try {
      const languagesData = await fetchData()
      
      dispatch(languagesActions.setLanguagesData({
        words: languagesData.words,
        wordsList: languagesData.wordsList
      }))
    } catch (err) {
      console.log('Something went wrong!')
    }
    dispatch(uiActions.setIsLoading(false))
  }
}
