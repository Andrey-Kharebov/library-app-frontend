import React from 'react'

import WordCardBlock from './WordCardBlock/WordCardBlock'
import WordsPacksBlock from './WordsPacksBlock'

const CardsSide = ({ languageTitleObj }) => {  
  return (
    <div className='cards-side'>
      <WordCardBlock languageTitleObj={ languageTitleObj } />
      <WordsPacksBlock languageTitleObj={ languageTitleObj } />
    </div>
  )
}

export default CardsSide