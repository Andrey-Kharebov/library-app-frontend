import React, { useState } from 'react'

import SubTabs from '../../../common/tabs/SubTabs'
import TextsTab from './TextsTab'
import WordsTab from './WordsTab'

const languageTabs = ['Words', 'Texts']

const LanguageContentSection = ({ language }) => {
  const [tab, setTab] = useState(0)

  const tabs = {  
    0: <WordsTab />,
    1: <TextsTab />
  }

  const Specified = tabs[tab] ? tabs[tab] : null

  return (
    <div className='language-content-section'>
      <SubTabs tab={ tab } setTab={ setTab } data={ languageTabs } />
      { Specified }
    </div>
  )
}

export default LanguageContentSection