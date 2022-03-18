import React from 'react'

import ActionsBlock from './ActionsBlock'
import WordsListBlock from './WordsListBlock'
import WordsSuggestionsBlock from './WordsSuggestionsBlock'

const WordsSide = () => {
  return (
    <div className='words-side'>
      <ActionsBlock />
      <WordsListBlock />
      <WordsSuggestionsBlock />
    </div>
  )
}

export default WordsSide