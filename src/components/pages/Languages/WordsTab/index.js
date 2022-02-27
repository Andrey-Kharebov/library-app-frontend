import React from 'react'

import SectionWrapper from '../../../common/wrappers/SectionWrapper'

const WordsTab = () => {
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