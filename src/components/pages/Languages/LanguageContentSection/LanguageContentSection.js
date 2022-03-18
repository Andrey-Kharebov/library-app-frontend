import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguagesById } from '../../../../store/languages-slice/languages-thunks'

import SubTabs from '../../../common/tabs/SubTabs'
import TextsTab from './TextsTab'
import WordsTab from './WordsTab/WordsTab'
import Loader from '../../../common/Loader'

const languageTabs = ['Words', 'Texts']

const LanguageContentSection = ({ languageTitleObj }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs.find(lo => lo._id === languageTitleObj._id))
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
    if (token && !languageObj) {
      setIsLoading(true)
      dispatch(fetchLanguagesById(token, languageTitleObj._id))
    }
  }, [dispatch, token, languageTitleObj, languageObj])

  const [tab, setTab] = useState(0)

  const tabs = {  
    0: <WordsTab languageTitleObj={ languageTitleObj } />,
    1: <TextsTab />
  }

  const Specified = tabs[tab] ? tabs[tab] : null

  if (isLoading) {
    return (
      <div className='language-content-section'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='language-content-section'>
      <SubTabs tab={ tab } setTab={ setTab } data={ languageTabs } />
      { Specified }
    </div>
  )
}

export default LanguageContentSection