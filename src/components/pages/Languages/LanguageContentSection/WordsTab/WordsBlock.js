import React from 'react'
import { useSelector } from 'react-redux'

const WordsBlock = ({ languageTitleObj }) => {
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
  const words = languageObj && languageObj.words
  
  const DUMMY_WORD = 'an(to) insight (into) - понимание, представление (о) понять // even the erroneous letters will allow us insight into how it perceived by real people'
  
  return (
    <div className='words-block'>
      <ul>
        { words && words.map((w, idx) => {
          if (idx > 9) return null
          return (
            <li key={ idx }>
              <textarea defaultValue={ DUMMY_WORD } />
              <button>Save</button>
              <button>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default WordsBlock