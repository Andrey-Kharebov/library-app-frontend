import React from 'react'
import { useSelector } from 'react-redux'

const WordCard = ({ languageTitleObj }) => {
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
  let wordsPack
  if (languageObj && languageObj.wordsPacks) {
    wordsPack = languageObj.wordsPacks.find(wp => wp.active) 
  }

  if ( !wordsPack ) return null 

  return (
    <div className='word-card'>
      <span>{ wordsPack.words[0].translation }</span> 
      <span>{ wordsPack.words[0].example }</span>
    </div>
  )
}

export default WordCard