import React from 'react'
import { useParams } from 'react-router-dom'

import Navigation from './components/common/Navigation'
import Main from './containers/Main'
import Languages from './containers/Languages'

const Root = () => {
  const { firstParam } = useParams()

  const container = firstParam ? firstParam : 'main'

  const containersList = {
    'main': Main,
    'languages': Languages
  }

  const Specified = containersList[container] ? containersList[container] : () => <div>404</div>
   
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