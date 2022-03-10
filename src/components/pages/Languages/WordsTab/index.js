import React from 'react'
import { useSelector } from 'react-redux'

import SectionWrapper from '../../../common/wrappers/SectionWrapper'
import Loader from '../../../common/Loader'

const WordsTab = () => {
  // const dispatch = useDispatch()
  const isLoading = useSelector(state => state.uiReducer.isLoading)

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