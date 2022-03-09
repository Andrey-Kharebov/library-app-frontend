import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLanguagesData } from '../../../../store/languages-slice/languages-thunks'

import SectionWrapper from '../../../common/wrappers/SectionWrapper'
import Loader from '../../../common/Loader'

const WordsTab = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.uiReducer.isLoading)
  const words = useSelector(state => state.languagesReducer.words)
  const wordsList = useSelector(state => state.languagesReducer.wordsList)

  useEffect(() => {
    dispatch(fetchLanguagesData())
  }, [dispatch])

  if (isLoading) {
    return <SectionWrapper className='words-tab'><Loader /></SectionWrapper>
  }

  return (
    <SectionWrapper className='words-tab'>
      <div className='cards-side'>
        cards-side
      </div>
      <div className='words-side'>
        <div className='actions-block'>
          <button>Create pack</button>
          <button>Save</button>
        </div>
        <div className='words-list-block'>
          <textarea />
        </div>
        <div className='words-suggestions-block'>
          <textarea />
        </div>
      </div>
    </SectionWrapper>
  )
}

export default WordsTab