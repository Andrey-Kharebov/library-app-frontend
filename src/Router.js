import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Root from './Root'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:firstParam' element={ <Root /> } />
        <Route path='/' element={ <Root /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router