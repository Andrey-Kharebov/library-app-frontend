import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import store from './store'

import Root from './Root'

const Router = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Routes>
          <Route path='/:firstParam' element={ <Root /> } />
          <Route path='/' element={ <Root /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default Router