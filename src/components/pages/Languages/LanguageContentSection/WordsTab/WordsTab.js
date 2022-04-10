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
  const wordsLength = langObj.searchedWords.length

  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
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

  //  if (loadingObj && (loadingObj.type === 'searchWords')) return <div className='words-list-block'><Loader /></div>
  //  if (errorObj && (errorObj.type === 'saveWordsList' || errorObj.type === 'createWordsPack')) return <div className='words-list-block'><Error error={ errorObj.error } /></div>

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
  
// const WordsTab = ({ languageTitleObj }) => {
//   const dispatch = useDispatch()
//   const token = useSelector(state => state.authReducer.token)
//   const [searchValue, setSearchValue] = useState('')
//   const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
//   const wordsIdsArr = languageObj && languageObj.words 
//   const suggestedWords = languageObj && languageObj.suggestedWords
//   const wordsLength = suggestedWords && searchValue ? suggestedWords.length : wordsIdsArr && wordsIdsArr.length 


//   const [page, setPage] = useState(1)
//   const showOnPage = 10 

//   useEffect(() => {
//     const timeoutTillRequest = setTimeout(() => {
//       if (searchValue) {
//         dispatch(wordsSuggestion(token, languageTitleObj._id, searchValue))
//       }
//     }, 500)

//     return () => {
//       clearTimeout(timeoutTillRequest)
//     }
//   }, [searchValue, dispatch, token, languageTitleObj._id])

//   const changeSearchValueHandler = event => {
//     setPage(1)
//     setSearchValue(event.target.value)
//   }
  
//   const pageHandler = number => setPage(number)

//   return (
//     <SectionWrapper className='words-tab'>
//       <SearchBar value={ searchValue } changeHandler={ changeSearchValueHandler } />
//       <WordsBlock languageTitleObj={ languageTitleObj } currentPage={ page } perPage={ showOnPage } searchValue={ searchValue } />
      // <Pagination 
      //   currentPage={ page } 
      //   setCurrentPage={ num => pageHandler(num) } 
      //   maxLength={ wordsLength } 
      //   perPage={ showOnPage } 
      // />
//     </SectionWrapper>
//   )
// }

export default WordsTab