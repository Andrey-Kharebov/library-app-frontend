import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wordsSuggestion } from '../../../../../store/languages-slice/languages-thunks'

import SectionWrapper from '../../../../common/wrappers/SectionWrapper'
import SearchBar from '../../../../common/SearchBar'
import WordsBlock from './WordsBlock'
import Pagination from '../../../../common/Pagination'

const WordsTab = ({ languageTitleObj }) => { 
  return (
    <SectionWrapper className='words-tab'>
      words-tab
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
//       <Pagination 
//         currentPage={ page } 
//         setCurrentPage={ num => pageHandler(num) } 
//         maxLength={ wordsLength } 
//         perPage={ showOnPage } 
//       />
//     </SectionWrapper>
//   )
// }

export default WordsTab