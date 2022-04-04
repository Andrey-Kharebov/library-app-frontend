import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguagesById } from '../../../../store/languages-slice/languages-thunks'
import { languagesActions } from '../../../../store/languages-slice/languages-slice'

import SubTabs from '../../../common/tabs/SubTabs'
import PacksTab from './PacksTab/PacksTab'
import WordsTab from './WordsTab/WordsTab'
import TextsTab from './TextsTab/TextsTab'
import Loader from '../../../common/Loader'

const langTabs = ['Packs', 'Words', 'Texts']

const LanguageContentSection = ({ langTitleObj }) => {
  const [tab, setTab] = useState(0)

  const tabs = {  
    0: <PacksTab />,
    1: <WordsTab  />,
    2: <TextsTab />
  }

  const Specified = tabs[tab] ? tabs[tab] : null

  return (
    <div className='language-content-section'>
       <SubTabs tab={ tab } setTab={ setTab } data={ langTabs } />
       { Specified }
    </div>
  )
}
// const LanguageContentSection = ({ languageTitleObj }) => {
//   const dispatch = useDispatch()
//   const token = useSelector(state => state.authReducer.token)
//   const languageObj = useSelector(state => state.languagesReducer.languagesObjs.find(lo => lo._id === languageTitleObj._id))
  
//   const [isLoading, setIsLoading] = useState(false)
//   const [tab, setTab] = useState(0)

//   useEffect(() => {
//     setTab(0)
//   }, [languageTitleObj])

//   useEffect(() => {
//     setIsLoading(false)
//     if (token && !languageObj) {
//       setIsLoading(true)
//       dispatch(fetchLanguagesById(token, languageTitleObj._id))
//     }
//   }, [dispatch, token, languageTitleObj, languageObj])

//   useEffect(() => {
//     if (languageObj) {
//       dispatch(languagesActions.setSuggestedWords({
//         languageTitle: { _id: languageTitleObj._id, title: languageTitleObj.title },
//         words: null
//       }))
//     }
//   }, [dispatch, tab, languageTitleObj._id, languageTitleObj.title])

//   const tabs = {  
//     0: <PacksTab languageTitleObj={ languageTitleObj } />,
//     1: <WordsTab languageTitleObj={ languageTitleObj } />,
//     2: <TextsTab languageTitleObj={ languageTitleObj } />
//   }

//   const Specified = tabs[tab] ? tabs[tab] : null

//   if (isLoading) {
//     return (
//       <div className='language-content-section'>
//         <Loader />
//       </div>
//     )
//   }

//   return (
//     <div className='language-content-section'>
//       <SubTabs tab={ tab } setTab={ setTab } data={ languageTabs } />
//       { Specified }
//     </div>
//   )
// }

export default LanguageContentSection
