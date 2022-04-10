import React from 'react'

import SectionWrapper from '../../../../common/wrappers/SectionWrapper'
import CardsSide from './CardsSide/CardsSide'
import WordsSide from './WordsSide/WordsSide'


const PacksTab = ({ langTitleObj }) => {
  return (
    <SectionWrapper className='packs-tab'>
      <CardsSide langTitleObj={ langTitleObj } />
      <WordsSide langTitleObj={ langTitleObj } />
    </SectionWrapper>
  )
}

export default PacksTab