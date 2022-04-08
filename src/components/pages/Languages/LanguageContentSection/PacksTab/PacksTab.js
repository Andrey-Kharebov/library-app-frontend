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
// const PacksTab = ({ languageTitleObj }) => {
//   return (
//     <SectionWrapper className='packs-tab'>
//       <CardsSide languageTitleObj={ languageTitleObj } />
//       <WordsSide languageTitleObj={ languageTitleObj } />
//     </SectionWrapper>
//   )
// }

export default PacksTab