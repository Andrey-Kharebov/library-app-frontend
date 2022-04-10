import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWord, saveWord } from '../../../../../store/languages-slice/languages-thunks'

const WordsBlock = ({ langTitleObj, currentPage, perPage, setPage }) => {
  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))

  let words = langObj.searchedWords.slice((currentPage - 1) * perPage, currentPage * perPage)

  if (currentPage !== 1 && words.length === 0) setPage(1)

  return (
    <div className='words-block'>
      <ul>
        { words.map(w => {
          return (
            <li key={ w._id }>
              <Input word={ w } langTitleObj={ langTitleObj } />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const Input = ({ word, langTitleObj }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)

  const [wordStr, setWordStr] = useState({ changed: false, value: `${ word.word } - ${ word.translation } // ${ word.example }` })

  useEffect(() => {
    setWordStr({ changed: false, value: `${ word.word } - ${ word.translation } // ${ word.example }` })
  }, [word])

  const changeWordHandler = event => setWordStr({ changed: true, value: event.target.value })

  const saveWordHandler = (word, wordStr) => {
    let updatedWord = {
      ...word,
      word: wordStr.value.split(' - ')[0],
      translation: wordStr.value.split(' - ')[1].split(' // ')[0],
      example: wordStr.value.split(' // ')[1],
    }  

    if (!updatedWord.word || !updatedWord.translation || !updatedWord.example) {
      console.log('ERROR')
      return
    }

    dispatch(saveWord(token, langTitleObj._id, updatedWord))
  }

  const deleteWordHandler = word => {
    dispatch(deleteWord(token, langTitleObj._id, word))
  }

  return (
    <>
      <input value={ wordStr.value } onChange={ changeWordHandler } />
      <button disabled={ wordStr.changed ? false : true } onClick={ () => saveWordHandler(word, wordStr) }>Save</button>
      <button onClick={ () => deleteWordHandler(word) }>Delete</button>
    </>
  )
}

// { wordsObjs && wordsObjs.map(w => {
//   //           return (
//   //             <li key={ w._id }>
//   //               <input value={ `${ w.word } - ${ w.translation } // ${ w.example }` } onChange={ event => changeWordHandler(event, w) } />
//   //               <button disabled={ w.changed ? false : true } onClick={ () => saveWordHandler(w) }>Save</button>
//   //               <button onClick={ () => deleteWordHandler(w) }>Delete</button>
//   //             </li>
//   //           )
//   //         })}

// const WordsBlock = ({ languageTitleObj, currentPage, perPage, searchValue }) => {
//   const dispatch = useDispatch()
//   const token = useSelector(state => state.authReducer.token)
//   const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
//   const wordsIdsArr = languageObj && languageObj.words 
//   const wordsObjs = languageObj && languageObj.wordsObjs
//   const suggestedWords = languageObj && languageObj.suggestedWords
  
//   useEffect(() => {
//     console.log('searchValue', searchValue)
//     if (wordsIdsArr && !searchValue) {
//       dispatch(getWords(token, languageTitleObj._id, wordsIdsArr.slice((currentPage - 1) * perPage, currentPage * perPage)))
//     }
//   }, [wordsIdsArr, searchValue, suggestedWords, dispatch, token, languageTitleObj._id, currentPage, perPage])

//   const changeWordHandler = (event, word) => {
//     let updatedWord = {
//       ...word,
//       word: event.target.value.trim().split(' - ')[0],
//       translation: event.target.value.trim().split(' - ')[1].split(' // ')[0],
//       example: event.target.value.trim().split(' // ')[1],
//     }  
//     dispatch(languagesActions.changeWordObj(updatedWord))
//   }

//   const deleteWordHandler = word => {
//     dispatch(deleteWord(token, languageTitleObj._id, word))
//   }
 
//   const saveWordHandler = word => {
//     dispatch(saveWord(token, languageTitleObj._id, word))
//   }

//   if (suggestedWords && searchValue && suggestedWords.length === 0) {
//     return (
//       <div className='words-block'>No words found</div>
//     )
//   }

//   if (suggestedWords && searchValue && suggestedWords.length > 0) {
//     return (
//       <div className='words-block'>
//         <ul>
//           { suggestedWords && suggestedWords.slice((currentPage - 1) * perPage, currentPage * perPage).map(w => {
//             return (
//               <li key={ w._id }>
//                 <input value={ `${ w.word } - ${ w.translation } // ${ w.example }` } onChange={ event => changeWordHandler(event, w) } />
//                 <button disabled={ w.changed ? false : true } onClick={ () => saveWordHandler(w) }>Save</button>
//                 <button onClick={ () => deleteWordHandler(w) }>Delete</button>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     )
//   }

//   return (
//     <div className='words-block'>
//       <ul>
//         { wordsObjs && wordsObjs.map(w => {
//           return (
//             <li key={ w._id }>
//               <input value={ `${ w.word } - ${ w.translation } // ${ w.example }` } onChange={ event => changeWordHandler(event, w) } />
//               <button disabled={ w.changed ? false : true } onClick={ () => saveWordHandler(w) }>Save</button>
//               <button onClick={ () => deleteWordHandler(w) }>Delete</button>
//             </li>
//           )
//         })}
//       </ul>
//     </div>
//   )
// }

export default WordsBlock