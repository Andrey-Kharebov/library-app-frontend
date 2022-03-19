import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { languagesActions } from '../../../../../../store/languages-slice/languages-slice'

const WordsListBlock = ({ languageTitleObj }) => {
  const dispatch = useDispatch()
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)

  const changeWordsListHandler = event => {
    dispatch(languagesActions.changeWordsList({ languageObjId: languageObj._id, value: event.target.value }))
  }

  console.log(languageTitleObj)
  console.log(languageObj)
  return (
    <div className='words-list-block'>
      <textarea value={ languageObj && languageObj.wordsList.value } onChange={ changeWordsListHandler } />
    </div>
  )
}

export default WordsListBlock