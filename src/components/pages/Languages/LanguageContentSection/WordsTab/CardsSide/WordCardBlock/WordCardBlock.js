import React from 'react'
import { useSelector } from 'react-redux'

import WordCard from './WordCard'
import ActionsBlocks from './ActionsBlocks'
import LevelsBlock from './LevelsBlock'

const WordCardBlock = ({ languageTitleObj }) => {
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)

  if (languageObj && languageObj.wordsPacks.length === 0) {
    return null
  } 

  return (
    <div className='word-card-block'>
      <WordCard languageTitleObj={ languageTitleObj } />
      <ActionsBlocks languageTitleObj={ languageTitleObj } />
      <LevelsBlock languageTitleObj={ languageTitleObj } />
    </div>
  )
}

export default WordCardBlock