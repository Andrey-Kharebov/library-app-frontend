import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLanguage } from '../../../store/languages-slice/languages-thunks'

const NewLanguageBlock = () => {
  const languageInputRef = useRef()
  const dispatch = useDispatch()

  const token = useSelector(state => state.authReducer.token)
  const error = useSelector(state => state.uiReducer.error)

  const addLanguageHandler = () => {
    dispatch(createLanguage(token, languageInputRef.current.value))
    languageInputRef.current.value = ''
  }

  return (
    <div className='new-language-block'>
        <input ref={ languageInputRef } />
        <button onClick={ addLanguageHandler }>Add language</button>
        { error && <div className='error-block'>{ error }</div> }
      </div>
  )
}

export default NewLanguageBlock