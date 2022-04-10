import React from 'react'
import { useSelector } from 'react-redux'

import WordCardBlock from './WordCardBlock/WordCardBlock'
import WordsPacksBlock from './WordsPacksBlock'

const CardsSide = ({ langTitleObj }) => {  
  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))
  const wordsPack = langObj.wordsPacks.find(wp => wp.active)
 
  return (
    <div className='cards-side'>
      { wordsPack && <WordCardBlock langTitleObj={ langTitleObj } wordsPack={ wordsPack } />}
      <WordsPacksBlock langTitleObj={ langTitleObj } />
    </div>
  )
}

export default CardsSide