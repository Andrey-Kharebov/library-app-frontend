import React from 'react'

import SectionWrapper from '../../../../common/wrappers/SectionWrapper'
import CardsSide from './CardsSide/CardsSide'
import WordsSide from './WordsSide/WordsSide'

const WordsTab = ({ languageTitleObj }) => {
  return (
    <SectionWrapper className='words-tab'>
      <CardsSide languageTitleObj={ languageTitleObj } />
      <WordsSide languageTitleObj={ languageTitleObj } />
    </SectionWrapper>
  )
}

export default WordsTab