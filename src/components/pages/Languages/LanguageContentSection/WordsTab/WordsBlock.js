import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { languagesActions } from '../../../../../store/languages-slice/languages-slice'
import { deleteWord, getWords, saveWord } from '../../../../../store/languages-slice/languages-thunks'

const WordsBlock = ({ languageTitleObj, currentPage, perPage, searchValue }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
  const wordsIdsArr = languageObj && languageObj.words 
  const wordsObjs = languageObj && languageObj.wordsObjs
  const suggestedWords = languageObj && languageObj.suggestedWords
  
  useEffect(() => {
    console.log('searchValue', searchValue)
    if (wordsIdsArr && !searchValue) {
      dispatch(getWords(token, languageTitleObj._id, wordsIdsArr.slice((currentPage - 1) * perPage, currentPage * perPage)))
    }
  }, [wordsIdsArr, searchValue, suggestedWords, dispatch, token, languageTitleObj._id, currentPage, perPage])

  const changeWordHandler = (event, word) => {
    let updatedWord = {
      ...word,
      word: event.target.value.trim().split(' - ')[0],
      translation: event.target.value.trim().split(' - ')[1].split(' // ')[0],
      example: event.target.value.trim().split(' // ')[1],
    }  
    dispatch(languagesActions.changeWordObj(updatedWord))
  }

  const deleteWordHandler = word => {
    dispatch(deleteWord(token, languageTitleObj._id, word))
  }
 
  const saveWordHandler = word => {
    dispatch(saveWord(token, languageTitleObj._id, word))
  }

  if (suggestedWords && searchValue && suggestedWords.length === 0) {
    return (
      <div className='words-block'>No words found</div>
    )
  }

  if (suggestedWords && searchValue && suggestedWords.length > 0) {
    return (
      <div className='words-block'>
        <ul>
          { suggestedWords && suggestedWords.slice((currentPage - 1) * perPage, currentPage * perPage).map(w => {
            return (
              <li key={ w._id }>
                <input value={ `${ w.word } - ${ w.translation } // ${ w.example }` } onChange={ event => changeWordHandler(event, w) } />
                <button disabled={ w.changed ? false : true } onClick={ () => saveWordHandler(w) }>Save</button>
                <button onClick={ () => deleteWordHandler(w) }>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className='words-block'>
      <ul>
        { wordsObjs && wordsObjs.map(w => {
          return (
            <li key={ w._id }>
              <input value={ `${ w.word } - ${ w.translation } // ${ w.example }` } onChange={ event => changeWordHandler(event, w) } />
              <button disabled={ w.changed ? false : true } onClick={ () => saveWordHandler(w) }>Save</button>
              <button onClick={ () => deleteWordHandler(w) }>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default WordsBlock