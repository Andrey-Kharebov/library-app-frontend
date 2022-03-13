import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth-slice/auth-slice'

import Navigation from './components/common/Navigation'
import Auth from './containers/Auth'
import Main from './containers/Main'
import Languages from './containers/Languages'

let logoutTimer

const Root = () => {
  const { firstParam } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)
  const token = useSelector(state => state.authReducer.token)
  const tokenExpirationDate = useSelector(state => state.authReducer.tokenExpirationDate)
  
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

  useEffect(() => {
    if (isLoggedIn === false && firstParam !== 'auth') { // redirect to /auth only in case of isLoggedIn === false (not !isLoggedIn)
      navigate('/auth', { replace: true })
    }
  }, [firstParam, isLoggedIn, navigate])

  const container = firstParam ? firstParam : 'main'

  const containersList = {
    'auth': Auth,
    'main': Main,
    'languages': Languages
  }

  const isAuth = firstParam === 'auth' ? true : false 

  const Specified = containersList[container] ? containersList[container] : () => <div>404</div>

  if (isAuth) {
    return (
      <div className='app-wrapper'>
        <Specified />
      </div>
    )
  }

  return (
    <div className='app-wrapper'>
      <Navigation />
      <div className='app-wrapper__content'>
        <Specified />
      </div>
    </div>
  )
}

export default Root