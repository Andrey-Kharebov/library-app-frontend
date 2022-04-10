import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { languagesActions } from '../../../../../../store/languages-slice/languages-slice'

const WordsPacksBlock = ({ langTitleObj }) => {
  const dispatch = useDispatch()

  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))

  const activeWordsPackHandler = wordsPackId => {
    dispatch(languagesActions.changeActiveWordsPack({ langObjId: langTitleObj._id, wordsPackId: wordsPackId }))
  } 

  return (
    <div className='words-packs-block'>
      <span>Current Packs</span>
        { langObj.wordsPacks.length > 0 
          ? <ul>
              { langObj.wordsPacks.map(wp => {
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