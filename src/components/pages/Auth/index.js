import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest, signUpRequest } from '../../../store/auth-slice/auth-thunks'
import { uiActions } from '../../../store/ui-slice/ui-slice'

import PageWrapper from '../../common/wrappers/PageWrapper'
import Loader from '../../common/Loader'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const isLoading = useSelector(state => state.uiReducer.isLoading)
  const error = useSelector(state => state.uiReducer.error)
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

  const initialState = { name: '', email: '', password: '' }
  const [formMode, setFormMode] = useState('login')
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn, navigate])

  const formModeHandler = () => {
    if (formMode === 'login') {
      setFormMode('signup')
    } else {
      setFormMode('login')
    }

    setFormData(initialState)
    dispatch(uiActions.setError(null))
  }

  const formDataChangeHandler = event => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value
      }
    })
  }

  const formSubmitHandler = event => {
    event.preventDefault()
    
    if (formMode === 'login') {
      dispatch(loginRequest(formData))
    } else {
      dispatch(signUpRequest(formData))
    }

    setFormData(initialState)
    dispatch(uiActions.setError(null))
  }

  if (isLoading) {
    return (
      <PageWrapper title='Authorization' className='auth-page'>
        <Loader />
      </PageWrapper>
    )
  } 
  
  return (
    <PageWrapper title='Authorization' className='auth-page'>
      <div className='auth-card'>
        <div className='auth-card__switcher'>
          <span className={ `auth-card__title ${ formMode === 'login' ? 'active' : '' }` } onClick={ formModeHandler }>Login</span>
          |
          <span className={ `auth-card__title ${ formMode === 'signup' ? 'active' : '' }` } onClick={ formModeHandler }>Sign Up</span>
        </div>
        <form onSubmit={ formSubmitHandler }>
          { formMode === 'signup' && <input type='text' id='name' placeholder='Name' value={ formData.name } onChange={ (formDataChangeHandler) }  /> }
          <input type='email' id='email' placeholder='Email' value={ formData.email } onChange={ formDataChangeHandler } />
          <input type='password' id='password' placeholder='Password' value={ formData.password } onChange={ formDataChangeHandler } />
          <button type='submit'>Submit</button>
        </form>
      </div>
      { error && <div className='error-block'>{ error }</div> }
    </PageWrapper>
  )
}

export default Auth