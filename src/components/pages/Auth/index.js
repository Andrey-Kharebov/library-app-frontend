import React, { useState } from 'react'
import PageWrapper from '../../common/wrappers/PageWrapper'

const Auth = () => {
  const initialState = { name: '', email: '', password: '' }
  const [formMode, setFormMode] = useState('login')
  const [formData, setFormData] = useState(initialState)

  const formModeHandler = () => {
    if (formMode === 'login') {
      setFormMode('signup')
    } else {
      setFormMode('login')
    }

    setFormData(initialState)
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
      console.log(formData.email, formData.password)
    } else {
      console.log(formData.name, formData.email, formData.password)
    }

    setFormData(initialState)
  }

  return (
    <PageWrapper title='Authentication' className='auth-page'>
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
    </PageWrapper>
  )
}

export default Auth