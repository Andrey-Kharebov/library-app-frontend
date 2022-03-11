import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navigation from './components/common/Navigation'
import Auth from './containers/Auth'
import Main from './containers/Main'
import Languages from './containers/Languages'

const Root = () => {
  const { firstParam } = useParams()
  const navigate = useNavigate()

  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn && firstParam !== 'auth') {
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