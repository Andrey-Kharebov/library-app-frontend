import React from 'react'
import WordsPacksBlock from './WordsPacksBlock'
const CardsSide = ({ languageTitleObj }) => {
  return (
    <div className='cards-side'>
      <div className='word-card-block'>
        word-card-block
      </div>
      <WordsPacksBlock languageTitleObj={ languageTitleObj } />
    </div>
  )
}

export default CardsSide