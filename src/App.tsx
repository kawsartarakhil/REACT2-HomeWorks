import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import Welcome from './welcome'
import Zustand from './zustand'
import Redux from './redux'
import Jotai from './jotai'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Welcome />} />  
          <Route path='zustand' element={<Zustand />} />
          <Route path='redux' element={<Redux />} />
          <Route path='jotai' element={<Jotai />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App