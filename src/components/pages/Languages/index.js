import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguagesList } from '../../../store/languages-slice/languages-thunks'

import PageWrapper from '../../common/wrappers/PageWrapper'
import MainTabs from '../../common/tabs/MainTabs'
import NewLanguageBlock from './NewLanguageBlock'
import LanguageContentSection from './LanguageContentSection'

const LanguagesPage = () => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const languagesList = useSelector(state => state.languagesReducer.languagesList)
  // const isLoading = useSelector(state => state.uiReducer.isLoading)

  const [tab, setTab] = useState(0)

  let mainTabs

  useEffect(() => {
    if (token && !languagesList) {
      dispatch(fetchLanguagesList(token))
    }
  }, [dispatch, token, languagesList])

  if (languagesList && languagesList.length > 0) {
    mainTabs = {
      items: languagesList.map((i, idx) => {
        return { name: i, val: idx === 0 ? 'selected' : 'non-selected'}
      }),
      onTabClick: tab => setTab(tab),
      tab: tab
    }
  }

  const currentMainTab = mainTabs && languagesList[tab]

  return (
    <PageWrapper title='Languages' className='languages-page'>
      <NewLanguageBlock />
      
      { languagesList && languagesList.length === 0 ? (
        <p>There are no languages here yet. Create your first one!</p>
      ) : (
        <>
          { mainTabs && <MainTabs { ...mainTabs } /> }
          { currentMainTab && <LanguageContentSection language={ currentMainTab } />}
        </>
      ) }      
    </PageWrapper>
  )
}


export default LanguagesPage