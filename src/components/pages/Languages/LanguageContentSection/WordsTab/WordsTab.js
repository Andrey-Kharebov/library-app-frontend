import React, { useState } from 'react'

import SectionWrapper from '../../../../common/wrappers/SectionWrapper'
import SearchBar from '../../../../common/SearchBar'
import WordsBlock from './WordsBlock'
import Pagination from '../../../../common/Pagination'

const WordsTab = ({ languageTitleObj }) => {
  const [page, setPage] = useState(1)

  const pageHandler = number => {
    setPage(number)
  }

  const wordsLength = 120
  const showOnPage = 10

  return (
    <SectionWrapper className='words-tab'>
      <SearchBar />
      {/* <WordsBlock languageTitleObj={ languageTitleObj } /> */}
      <Pagination 
        currentPage={ page } 
        setCurrentPage={ num => pageHandler(num) } 
        maxLength={ wordsLength } 
        perPage={ showOnPage } 
      />
    </SectionWrapper>
  )
}

export default WordsTab