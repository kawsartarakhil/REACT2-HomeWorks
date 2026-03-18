import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/layout'
import Jotai from './pages/jotai'
import Redux from './pages/redux'
import Zustand from './pages/zustand'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Jotai/>}/>
        <Route path='redux' element={<Redux/>}/>
        <Route path='zustand' element={<Zustand/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App