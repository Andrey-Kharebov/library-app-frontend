import React from 'react'

import SectionWrapper from '../../../../common/wrappers/SectionWrapper'
import CardsSide from './CardsSide/CardsSide'
import WordsSide from './WordsSide/WordsSide'

const WordsTab = () => {
  return (
    <SectionWrapper className='words-tab'>
      <CardsSide />
      <WordsSide />
    </SectionWrapper>
  )
}

export default WordsTab