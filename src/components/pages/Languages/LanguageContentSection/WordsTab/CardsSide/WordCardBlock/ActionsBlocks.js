import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wordLevelDown, wordLevelUp } from '../../../../../../../store/languages-slice/languages-thunks'

const ActionsBlocks = ({ languageTitleObj, wordsPackId, currentWordId }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  
  const wordLevelDownHandler = () => {
    dispatch(wordLevelDown(token, wordsPackId, currentWordId))
  }

  const wordLevelUpHandler = () => {
    dispatch(wordLevelUp(token, wordsPackId, currentWordId))
  }

  if (!currentWordId) return null
  return (
    <div className='actions-block'>
      <button onClick={ wordLevelDownHandler }>Down</button>
      <button onClick={ wordLevelUpHandler }>Up</button>
    </div>
  )
}

export default ActionsBlocks