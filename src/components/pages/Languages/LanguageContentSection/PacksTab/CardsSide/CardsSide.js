import React from 'react'

import WordCardBlock from './WordCardBlock/WordCardBlock'
import WordsPacksBlock from './WordsPacksBlock'

const CardsSide = ({ langTitleObj }) => {  
  return (
    <div className='cards-side'>
      {/* <WordCardBlock languageTitleObj={ languageTitleObj } /> */}
      <WordsPacksBlock langTitleObj={ langTitleObj } />
    </div>
  )
}

export default CardsSide