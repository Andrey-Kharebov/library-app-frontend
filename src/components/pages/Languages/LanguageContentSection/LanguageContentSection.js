import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguageObj } from '../../../../store/languages-slice/languages-thunks'

import SubTabs from '../../../common/tabs/SubTabs'
import PacksTab from './PacksTab/PacksTab'
import WordsTab from './WordsTab/WordsTab'
import TextsTab from './TextsTab/TextsTab'
import Loader from '../../../common/Loader'
import Error from '../../../common/Error'

const langTabs = ['Packs', 'Words', 'Texts']

const LanguageContentSection = ({ langTitleObj }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))
  const loadingObj = useSelector(state => state.uiReducer.loadingObj)
  const errorObj = useSelector(state => state.uiReducer.errorObj)

  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (token && !langObj) {
      dispatch(fetchLanguageObj(token, langTitleObj._id))
    }
  }, [token, langObj, dispatch, langTitleObj._id])

  const tabs = {  
    0: langObj && <PacksTab langTitleObj={ langTitleObj } />,
    1: langObj && <WordsTab langTitleObj={ langTitleObj } />,
    2: <TextsTab />
  }

  const Specified = tabs[tab] ? tabs[tab] : null

  if (!langObj && loadingObj && (loadingObj.type === 'fetchLanguageObj' || loadingObj.type === 'fetchLanguageObj')) return <div className='language-content-section'><Loader /></div>
  if (!langObj && errorObj && errorObj.type === 'fetchLanguageObj') return <div className='language-content-section'><Error error={ errorObj.error } /></div>

  return (
    <div className='language-content-section'>
       <SubTabs tab={ tab } setTab={ setTab } data={ langTabs } />
       { Specified }
    </div>
  )
}

export default LanguageContentSection
