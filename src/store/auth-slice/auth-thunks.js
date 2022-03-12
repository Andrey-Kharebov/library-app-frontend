import { authActions } from './auth-slice'
import { uiActions } from '../ui-slice/ui-slice'

export const loginRequest = formData => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const response = await fetch('http://localhost:9000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.message)
      }

      console.log(responseData)

      dispatch(uiActions.setIsLoading(false))
      dispatch(authActions.login({ token: responseData.token }))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}

export const signUpRequest = formData => {
  return async dispatch => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const response = await fetch('http://localhost:9000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.message)
      }

      dispatch(uiActions.setIsLoading(false))
      dispatch(authActions.login({ token: responseData.token }))
    } catch (err) {
      dispatch(uiActions.setIsLoading(false))
      dispatch(uiActions.setError(err.message || 'Something went wrong, please try again!'))
    }
  }
}
