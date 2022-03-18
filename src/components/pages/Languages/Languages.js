import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguagesList } from '../../../store/languages-slice/languages-thunks'

import PageWrapper from '../../common/wrappers/PageWrapper'
import MainTabs from '../../common/tabs/MainTabs'
import NewLanguageBlock from './NewLanguageBlock'
import LanguageContentSection from './LanguageContentSection/LanguageContentSection'

const LanguagesPage = () => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const languagesTitlesList = useSelector(state => state.languagesReducer.languagesTitlesList)

  const [tab, setTab] = useState(0)

  let mainTabs

  useEffect(() => {
    if (token && !languagesTitlesList) {
      dispatch(fetchLanguagesList(token))
    }
  }, [dispatch, token, languagesTitlesList])

  if (languagesTitlesList && languagesTitlesList.length > 0) {
    mainTabs = {
      items: languagesTitlesList.map((i, idx) => {
        return { name: i.title, val: idx === 0 ? 'selected' : 'non-selected' }
      }),
      onTabClick: tab => setTab(tab),
      tab: tab
    }
  }

  const currentMainTab = mainTabs && languagesTitlesList[tab]
  
  return (
    <PageWrapper title='Languages' className='languages-page'>
      <NewLanguageBlock />
      { languagesTitlesList && languagesTitlesList.length === 0 ? (
        <p>There are no languages here yet. Create your first one!</p>
      ) : (
        <>
          { mainTabs && <MainTabs { ...mainTabs } /> }
          { currentMainTab && <LanguageContentSection languageTitleObj={ currentMainTab } />}
        </>
      ) }      
    </PageWrapper>
  )
}


export default LanguagesPage