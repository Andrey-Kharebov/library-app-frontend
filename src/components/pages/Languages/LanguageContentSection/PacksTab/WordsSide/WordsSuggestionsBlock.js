import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wordsSuggestion, saveWordsList } from '../../../../../../store/languages-slice/languages-thunks'

import Loader from '../../../../../common/Loader'
import Error from '../../../../../common/Error'

const lastWordOfWordsList = wordsList => {
  let lastWord = wordsList.trim().split('\n')[wordsList.trim().split('\n').length - 1]

  return lastWord
}

const WordsSuggestionsBlock = ({ langTitleObj }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))
  const loadingObj = useSelector(state => state.uiReducer.loadingObj)
  const errorObj = useSelector(state => state.uiReducer.errorObj)

  const [lastStoreWord, setLastStoreWord] = useState(lastWordOfWordsList(langObj.wordsList.value))

  let lastWord = lastWordOfWordsList(langObj.wordsList.value)

  useEffect(() => {
    setLastStoreWord(lastWordOfWordsList(langObj.wordsList.value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langTitleObj])

  useEffect(() => {
    const timeTillRequest = setTimeout(() => {
      if (lastWord !== lastStoreWord) {
        dispatch(wordsSuggestion(token, langTitleObj._id, lastWord))
      }
    }, 500)

    return () => {
      clearTimeout(timeTillRequest)
    }
  }, [dispatch, lastWord, lastStoreWord, token, langTitleObj._id])

  const addSuggestedWordHandler = word => {
    let clearedWordsList = langObj.wordsList.value.replace(/\r?\n?[^\r\n]*$/, '')
    let updatedWordsList = clearedWordsList + `\n${ word.word } - ${ word.translation } // ${ word.example }`
    dispatch(saveWordsList(token, langTitleObj._id, updatedWordsList))
  } 

  if (loadingObj && loadingObj.type === 'wordsSuggestion') return <div className='words-suggestions-block'><Loader /></div>
  if (errorObj && errorObj.type === 'wordsSuggestion' ) return <div className='words-suggestions-block'><Error error={ errorObj.error } /></div>

  return (
    <div className='words-suggestions-block'>
      <ul>
        { langObj.suggestedWords.map(w => {
          return (
            <li key={ w._id } onClick={() => addSuggestedWordHandler(w)}><span>{ `${ w.word } - ${ w.translation } // ${ w.example }` }</span></li>
          )
        }) }
      </ul>
    </div>
  )
}

export default WordsSuggestionsBlock