import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLanguage, fetchLanguagesList } from '../../../store/languages-slice/languages-thunks'

import PageWrapper from '../../common/wrappers/PageWrapper'
// import SubTabs from '../../common/tabs/SubTabs'
// import WordsTab from './WordsTab'
// import TextsTab from './TextsTab'

// const languageTabs = ['Words', 'Texts']

const LanguagesPage = () => {
  const languageInputRef = useRef()
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const languagesList = useSelector(state => state.languagesReducer.languagesList)
  // const isLoading = useSelector(state => state.uiReducer.isLoading)
  const error = useSelector(state => state.uiReducer.error)

  useEffect(() => {
    if (token && !languagesList) {
      dispatch(fetchLanguagesList(token))
    }
  }, [dispatch, token, languagesList])

  // const [tab, setTab] = useState(0)

  // const tabs = {
  //   0: <WordsTab />,
  //   1: <TextsTab />
  // }

  const addLanguageHandler = () => {
    dispatch(createLanguage(token, languageInputRef.current.value))
    languageInputRef.current.value = ''
  }

  // const Specified = tabs[tab] ? tabs[tab] : null

  return (
    <PageWrapper title='Languages' className='languages-page'>
      <div className='new-language-block'>
        <input ref={ languageInputRef } />
        <button onClick={ addLanguageHandler }>Add language</button>
        { error && <div className='error-block'>{ error }</div> }
      </div>

      { languagesList && languagesList.length === 0 ? (
        <p>There are no languages here yet. Create your first one!</p>
      ) : (
        languagesList && (
          <ul>
            { languagesList.map((l, idx) => <li key={ idx }>{ l }</li>) }
          </ul>
        )
      ) }      
      
      {/* <SubTabs tab={ tab } setTab={ setTab } data={ languageTabs } />
      { Specified } */}
    </PageWrapper>
  )
}

export default LanguagesPage