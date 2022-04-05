import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguages } from '../../../store/languages-slice/languages-thunks'

import PageWrapper from '../../common/wrappers/PageWrapper'
import MainTabs from '../../common/tabs/MainTabs'
import NewLanguageBlock from './NewLanguageBlock'
import LanguageContentSection from './LanguageContentSection/LanguageContentSection'
import Loader from '../../common/Loader'
import Error from '../../common/Error'

const LanguagesPage = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const langTitlesList = useSelector(state => state.languagesReducer.langTitlesList)
  const loadingObj = useSelector(state => state.uiReducer.loadingObj)
  const errorObj = useSelector(state => state.uiReducer.errorObj)

  const [tab, setTab] = useState(0)

  useEffect(() => { // первоначальный запрос списка языков 
    if (token && !langTitlesList) {
      dispatch(fetchLanguages(token))
    }
  }, [dispatch, token, langTitlesList])

  let mainTabs

  if (langTitlesList && !loadingObj && !errorObj && langTitlesList.length > 0) {
    mainTabs = {
      items: langTitlesList.map((i, idx) => {
        return { name: i.title, val: idx === 0 ? 'selected' : 'non-selected' }
      }),
      onTabClick: tab => setTab(tab),
      tab: tab
    }
  }

  const currentMainTab = mainTabs && langTitlesList[tab]

  if (loadingObj && loadingObj.type === 'fetchLanguages') return <PageWrapper title='Languages' className='languages-page'><Loader /></PageWrapper>
  if (errorObj && errorObj.type === 'fetchLanguages') return <PageWrapper title='Languages' className='languages-page'><Error error={ errorObj.error } /></PageWrapper>

  return (
    <PageWrapper title='Languages' className='languages-page'>
      <NewLanguageBlock />
      { !langTitlesList || langTitlesList.length === 0 ? (
        <p>There are no languages here yet. Create your first one!</p>
      ) : (
        <>
          { mainTabs && <MainTabs { ...mainTabs } /> }
          { currentMainTab && <LanguageContentSection langTitleObj={ currentMainTab } />}
        </>
      ) }
    </PageWrapper>
  )
}


export default LanguagesPage