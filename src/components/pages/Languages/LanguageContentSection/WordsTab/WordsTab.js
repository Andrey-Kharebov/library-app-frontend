import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import SectionWrapper from '../../../../common/wrappers/SectionWrapper'
import SearchBar from '../../../../common/SearchBar'
import WordsBlock from './WordsBlock'
import Pagination from '../../../../common/Pagination'

const WordsTab = ({ languageTitleObj }) => {
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
  const wordsIdsArr = languageObj && languageObj.words 
  const wordsLength = wordsIdsArr && wordsIdsArr.length 
  const showOnPage = 10
  const [page, setPage] = useState(1)
  
  const pageHandler = number => setPage(number)

  return (
    <SectionWrapper className='words-tab'>
      <SearchBar />
      <WordsBlock languageTitleObj={ languageTitleObj } currentPage={ page } perPage={ showOnPage } />
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