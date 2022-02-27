import React, { useState } from 'react'

import PageWrapper from '../../common/wrappers/PageWrapper'
import SubTabs from '../../common/tabs/SubTabs'
import WordsTab from './WordsTab'
import TextsTab from './TextsTab'

const languageTabs = ['Слова', 'Тексты']

const LanguagesPage = () => {
  const [tab, setTab] = useState(0)

  const tabs = {
    0: <WordsTab />,
    1: <TextsTab />
  }

  const Specified = tabs[tab] ? tabs[tab] : null

  return (
    <PageWrapper title='Языки' className='languages-page'>
      <SubTabs tab={ tab } setTab={ setTab } data={ languageTabs } />
      { Specified }
    </PageWrapper>
  )
}

export default LanguagesPage