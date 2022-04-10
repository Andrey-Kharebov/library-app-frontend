import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveWordsList, createWordsPack } from '../../../../../../store/languages-slice/languages-thunks'

const ActionsBlock = ({ langTitleObj }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const langObj = useSelector(state => state.languagesReducer.langObjs.find(lo => lo._id === langTitleObj._id))

  const saveWordsListHandler = () => {
    dispatch(saveWordsList(token, langObj._id, langObj.wordsList.value))
  }

  const createWordsPackHandler = () => {
    dispatch(createWordsPack(token, langObj._id, langObj.wordsList.value))
  }

  return (  
    <div className='actions-block'>
      <button onClick={ createWordsPackHandler }>Create pack</button>
      <button disabled={ !langObj.wordsList.changed } onClick={ saveWordsListHandler }>Save</button>
    </div>
  )
}

export default ActionsBlock