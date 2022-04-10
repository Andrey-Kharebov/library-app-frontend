import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wordLevelDown, wordLevelUp } from '../../../../../../../store/languages-slice/languages-thunks'

const ActionsBlock = ({ wordsPackId, currentWord }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)

  const wordLevelDownHandler = () => {
    dispatch(wordLevelDown(token, wordsPackId, currentWord._id))
  }

  const wordLevelUpHandler = () => {
    dispatch(wordLevelUp(token, wordsPackId, currentWord._id))
  }

  return (
    <div className='actions-block'>
      <button onClick={ wordLevelDownHandler } disabled={ currentWord.level === 1 }>Down</button>
      <button onClick={ wordLevelUpHandler }>Up</button>
    </div>
  )
}

export default ActionsBlock