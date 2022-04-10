import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchWords } from '../../../../../store/languages-slice/languages-thunks'

import Loader from '../../../../common/Loader'
import Error from '../../../../common/Error'
import SectionWrapper from '../../../../common/wrappers/SectionWrapper'
import SearchBar from '../../../../common/SearchBar'
import WordsBlock from './WordsBlock'
import Pagination from '../../../../common/Pagination'

const WordsTab = ({ langTitleObj }) => { 
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))
  const loadingObj = useSelector(state => state.uiReducer.loadingObj)
  const errorObj = useSelector(state => state.uiReducer.errorObj)
  
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)

  const wordsLength = langObj.searchedWords.length
  const showOnPage = 10 

  useEffect(() => {
    setSearchValue('')
  }, [langTitleObj])

  useEffect(() => {
    const timeTillRequest = setTimeout(() => {
      if (searchValue) dispatch(searchWords(token, langTitleObj._id, searchValue))
    }, 500)

    return () => {
      clearTimeout(timeTillRequest)
    }
  }, [dispatch, searchValue, token, langTitleObj._id])

  const changeSearchValueHandler = event => {
    setSearchValue(event.target.value)
  }

  const pageHandler = number => setPage(number)

  return (
    <SectionWrapper className='words-tab'>
      <SearchBar value={ searchValue } changeHandler={ changeSearchValueHandler } />
      { loadingObj && (loadingObj.type === 'searchWords' || loadingObj.type === 'saveWord' || loadingObj.type === 'deleteWord') 
        ? (
          <div className='words-tab-content'><Loader /></div>
        ) : errorObj && (errorObj.type === 'searchWords' || errorObj.type === 'saveWord' || errorObj.type === 'deleteWord')
        ? (
          <div className='words-tab-content'><Error error={ errorObj.error } /></div>
        ) : (
          <div className='words-tab-content'>
            <WordsBlock langTitleObj={ langTitleObj } currentPage={ page } perPage={ showOnPage } setPage={ setPage } />
            <Pagination 
              currentPage={ page } 
              setCurrentPage={ num => pageHandler(num) } 
              maxLength={ wordsLength } 
              perPage={ showOnPage } 
            />
          </div>
        )} 
    </SectionWrapper>
  )
}

export default WordsTab