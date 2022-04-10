import React from 'react'

import ActionsBlock from './ActionsBlock'
import WordsListBlock from './WordsListBlock'
import WordsSuggestionsBlock from './WordsSuggestionsBlock'

const WordsSide = ({ langTitleObj }) => {
  return (
    <div className='words-side'>
      <ActionsBlock langTitleObj={ langTitleObj } />
      <WordsListBlock langTitleObj={ langTitleObj } />
      <WordsSuggestionsBlock langTitleObj={ langTitleObj } />
    </div>
  )
}

export default WordsSide