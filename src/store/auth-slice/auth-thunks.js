import { authActions } from './auth-slice'
import { uiActions } from '../ui-slice/ui-slice'

export const loginRequest = formData => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'loginRequest', isLoading: true }))

      const response = await fetch('http://localhost:9000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Could not log you in!')
      }
      

      dispatch(authActions.login({ userId: responseData.userId, token: responseData.token }))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'loginRequest', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}

export const signUpRequest = formData => {
  return async dispatch => {
    try {
      dispatch(uiActions.setErrorObj(null))
      dispatch(uiActions.setLoadingObj({ type: 'signUpRequest', isLoading: true }))

      const response = await fetch('http://localhost:9000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Could not sign you up!')
      }

      dispatch(authActions.login({ userId: responseData.userId, token: responseData.token }))

      dispatch(uiActions.setLoadingObj(null))
    } catch (err) {
      dispatch(uiActions.setLoadingObj(null))
      dispatch(uiActions.setErrorObj({ type: 'signUpRequest', isError: true, error: err.message || 'Something went wrong, please try again!' }))
    }
  }
}
