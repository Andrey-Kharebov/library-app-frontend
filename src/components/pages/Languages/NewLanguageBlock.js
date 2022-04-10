import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLanguage } from '../../../store/languages-slice/languages-thunks'

const NewLanguageBlock = () => {
  const languageInputRef = useRef()
  const dispatch = useDispatch()
  
  const token = useSelector(state => state.authReducer.token)
  const errorObj = useSelector(state => state.uiReducer.errorObj)

  const addLanguageHandler = () => {
    dispatch(createLanguage(token, languageInputRef.current.value))
    languageInputRef.current.value = ''
  }

  return (
    <div className='new-language-block'>
      <input ref={ languageInputRef } />
      <button onClick={ addLanguageHandler }>Add language</button>
      { errorObj && errorObj.type === 'createLanguage' && <div className='error-block'>{ errorObj.error }</div> }
    </div>
  )
}

export default NewLanguageBlock