import React, { useState } from 'react'

import PageWrapper from '../../common/wrappers/PageWrapper'
import SubTabs from '../../common/tabs/SubTabs'
import WordsTab from './WordsTab'
import TextsTab from './TextsTab'

const languageTabs = ['Words', 'Texts']

const LanguagesPage = () => {
  const [tab, setTab] = useState(0)

  const tabs = {
    0: <WordsTab />,
    1: <TextsTab />
  }

  const Specified = tabs[tab] ? tabs[tab] : null

  return (
    <PageWrapper title='Languages' className='languages-page'>
      <SubTabs tab={ tab } setTab={ setTab } data={ languageTabs } />
      { Specified }
    </PageWrapper>
  )
}

export default LanguagesPage