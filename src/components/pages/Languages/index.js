import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLanguage, fetchLanguagesList } from '../../../store/languages-slice/languages-thunks'

import PageWrapper from '../../common/wrappers/PageWrapper'
import MainTabs from '../../common/tabs/MainTabs'
// import SubTabs from '../../common/tabs/SubTabs'
// import WordsTab from './WordsTab'
// import TextsTab from './TextsTab'

// const languageTabs = ['Words', 'Texts']

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

  // const currentMainTab = mainTabs ? mainTabs.items.find(i => i.val === 'selected') : null
  
  // const tabs = {
  //   0: <WordsTab />,
  //   1: <TextsTab />
  // }

  // const Specified = tabs[tab] ? tabs[tab] : null

  return (
    <PageWrapper title='Languages' className='languages-page'>
      <NewLanguageBlock />
      
      { languagesList && languagesList.length === 0 ? (
        <p>There are no languages here yet. Create your first one!</p>
      ) : (
        <>
          { mainTabs && <MainTabs { ...mainTabs } /> }
          { currentMainTab && <LanguageTab language={ currentMainTab }/>}
        </>
      ) }      
      
      {/* <SubTabs tab={ tab } setTab={ setTab } data={ languageTabs } />
      { Specified } */}
    </PageWrapper>
  )
}

const NewLanguageBlock = () => {
  const languageInputRef = useRef()
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const error = useSelector(state => state.uiReducer.error)

  const addLanguageHandler = () => {
    dispatch(createLanguage(token, languageInputRef.current.value))
    languageInputRef.current.value = ''
  }

  return (
    <div className='new-language-block'>
        <input ref={ languageInputRef } />
        <button onClick={ addLanguageHandler }>Add language</button>
        { error && <div className='error-block'>{ error }</div> }
      </div>
  )
}

const LanguageTab = ({ language }) => {
  return (
    <div>{ language }</div>
  )
}

export default LanguagesPage