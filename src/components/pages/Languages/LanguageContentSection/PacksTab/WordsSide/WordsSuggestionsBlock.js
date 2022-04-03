import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wordsSuggestion, saveWordsList } from '../../../../../../store/languages-slice/languages-thunks'

const lastWordOfWordsList = wordsList => {
  let lastWord = wordsList.trim().split('\n')[wordsList.trim().split('\n').length - 1]

  return lastWord
}

const WordsSuggestionsBlock = ({ languageTitleObj }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
  const [prevWordsList, setPrevWordsList] = useState(languageObj && languageObj.wordsList.value)

  let lastWord
  let wordsList
  let changedLastWord
  let changedWordsList
  let suggestedWords

  if (languageObj && languageObj.wordsList) {
    lastWord = languageObj.wordsList.lastWord
    wordsList = languageObj.wordsList
    changedLastWord = lastWordOfWordsList(languageObj.wordsList.value)
    changedWordsList = languageObj.wordsList.changed
    if (languageObj.suggestedWords) suggestedWords = languageObj.suggestedWords
  }

  useEffect(() => {
    const timeoutTillRequest = setTimeout(() => {
      if (wordsList && wordsList.changed && lastWord !== changedLastWord) {
        dispatch(wordsSuggestion(token, languageTitleObj._id, changedLastWord))
      }
    }, 500)
    

    return () => {
      clearTimeout(timeoutTillRequest)
    }
  }, [dispatch, token, languageTitleObj._id, wordsList, lastWord, changedLastWord])

  useEffect(() => {
    if (!changedWordsList) {
      setPrevWordsList(wordsList && wordsList.value)
    }
  }, [changedWordsList, wordsList])

  const addSuggestedWordHandler = word => {
    let updatedWordsList = prevWordsList + `\n${ word.word } - ${ word.translation } // ${ word.example }`
    dispatch(saveWordsList(token, languageTitleObj._id, updatedWordsList))
  }

  return (
    <div className='words-suggestions-block'>
      <ul>
      { suggestedWords && suggestedWords.map(w => {
        return (
          <li key={ w._id }><span onClick={() => addSuggestedWordHandler(w)}>{ `${ w.word } - ${ w.translation } // ${ w.example }` }</span></li>
        )
      })}
      </ul>
    </div>
  )
}

export default WordsSuggestionsBlock