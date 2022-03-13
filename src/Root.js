import React from 'react'
import { useAuth } from './hooks/auth-hook'

import Navigation from './components/common/Navigation'
import Auth from './containers/Auth'
import Main from './containers/Main'
import Languages from './containers/Languages'

const Root = () => {
  const { firstParam } = useAuth()

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