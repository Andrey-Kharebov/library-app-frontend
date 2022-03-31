import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { languagesActions } from '../../../../../../store/languages-slice/languages-slice'

const WordsPacksBlock = ({ languageTitleObj }) => {
  const dispatch = useDispatch()
  // const token = useSelector(state => state.authReducer.token)
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)

  const activeWordsPackHandler = wordsPackId => {
    dispatch(languagesActions.changeActiveWordsPack({
      languageObjId: languageTitleObj._id, 
      wordsPackId: wordsPackId
    }))
  }

  return (
    <div className='words-packs-block'>
      <span>Current Packs</span>
      { languageObj && languageObj.wordsPacks.length > 0 
        ? <ul>
            { languageObj && languageObj.wordsPacks.map(wp => {
              return (
                <li key={ wp._id } className={ wp.active ? 'active' : '' } onClick={ () => activeWordsPackHandler(wp._id) }>{ wp.title }</li>
              )
            })}
          </ul>
        : <p>There are no created words packs here yet!</p>
      } 
    </div>
  )
}

export default WordsPacksBlock