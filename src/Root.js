import React from 'react'
import { useParams } from 'react-router-dom'

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
    <div>
      <Specified />
    </div>
  )
}

export default Root