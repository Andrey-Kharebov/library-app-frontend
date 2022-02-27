import React from 'react'
import { useParams } from 'react-router-dom'

import Languages from '../components/pages/Languages'

const LanguagesContainer = () => {
  const { secondParam } = useParams()

  const pages = {
    'index': Languages
  }

  const pageType = secondParam ? secondParam : 'index'
  const Specified = pages[pageType] ? pages[pageType] : null

  return <Specified />
}

export default LanguagesContainer