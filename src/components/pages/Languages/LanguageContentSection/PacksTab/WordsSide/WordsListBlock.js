import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { languagesActions } from '../../../../../../store/languages-slice/languages-slice'

// import Loader from '../../../../../common/Loader'
import Error from '../../../../../common/Error'

const WordsListBlock = ({ langTitleObj }) => {
  const dispatch = useDispatch()

  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))
  const loadingObj = useSelector(state => state.uiReducer.loadingObj)
  const errorObj = useSelector(state => state.uiReducer.errorObj)

  const changeWordsListHandler = event => {
    dispatch(languagesActions.changeWordsList({ langObjId: langObj._id, value: event.target.value }))
  }

  // disabled because it force textarea scrolled to up after rerender (problem when add a suggested word)
  // if (loadingObj && (loadingObj.type === 'saveWordsList' || loadingObj.type === 'createWordsPack')) return <div className='words-list-block'><Loader /></div>
  if (errorObj && (errorObj.type === 'saveWordsList' || errorObj.type === 'createWordsPack')) return <div className='words-list-block'><Error error={ errorObj.error } /></div>
  
  return (
    <div className='words-list-block'>
      <textarea value={ langObj.wordsList.value } onChange={ changeWordsListHandler } />
    </div>
  )
}

// const WordsListBlock = ({ languageTitleObj }) => {
//   const dispatch = useDispatch()
//   const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)

//   const changeWordsListHandler = event => {
//     dispatch(languagesActions.changeWordsList({ languageObjId: languageObj._id, value: event.target.value }))
//   }

//   return (
//     <div className='words-list-block'>
//       <textarea value={ languageObj && languageObj.wordsList.value } onChange={ changeWordsListHandler } />
//     </div>
//   )
// }

export default WordsListBlock