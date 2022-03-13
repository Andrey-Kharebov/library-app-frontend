import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/auth-slice/auth-slice'

let logoutTimer

export const useAuth = () => {
  const { firstParam } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)
  const token = useSelector(state => state.authReducer.token)
  const tokenExpirationDate = useSelector(state => state.authReducer.tokenExpirationDate)

  // checks localStorage for auth data & unexpired token time
  useEffect(() => {
    const localStoredData = JSON.parse(localStorage.getItem('userData'))
    
    if (
      localStoredData && 
      localStoredData.token &&
      (new Date(localStoredData.expiration) > new Date() ? localStoredData.expiration : null) 
      ) {
      dispatch(authActions.login({ userId: localStoredData.userId, token: localStoredData.token, expiration: localStoredData.expiration }))
    } else {
      dispatch(authActions.setIsLoggedInToFalse()) // if nothing in LocStore => isLoggedIn = false
    }
  }, [dispatch])

  // set timer for authomatic logout if token expired
  useEffect(() => { // Udemy Mern 12 - 187
    if (token && tokenExpirationDate) { 
      const remainingTime = new Date(tokenExpirationDate).getTime() - new Date().getTime()
      logoutTimer = setTimeout(() => {
        dispatch(authActions.logout())
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer)
    }
  }, [dispatch, token, tokenExpirationDate])

  // checks if isLoggedIn and if not redirects to /auth and vice versa
  useEffect(() => {
    if (isLoggedIn === false && firstParam !== 'auth') { // redirect to /auth only in case of isLoggedIn === false (not !isLoggedIn)
      navigate('/auth', { replace: true })
    }
  }, [firstParam, isLoggedIn, navigate])

  return {
    firstParam
  }
}