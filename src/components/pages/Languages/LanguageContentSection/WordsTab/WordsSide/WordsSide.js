import React from 'react'

import ActionsBlock from './ActionsBlock'
import WordsListBlock from './WordsListBlock'
import WordsSuggestionsBlock from './WordsSuggestionsBlock'

const WordsSide = ({ languageTitleObj }) => {
  return (
    <div className='words-side'>
      <ActionsBlock languageTitleObj={ languageTitleObj } />
      <WordsListBlock languageTitleObj={ languageTitleObj } />
      <WordsSuggestionsBlock />
    </div>
  )
}

export default WordsSide