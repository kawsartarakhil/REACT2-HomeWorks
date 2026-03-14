import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <header>
      <Link to='/'>
      <h1>Welcome</h1>
      </Link>
      <Link to='/jotai'>
      <h1>Jotai</h1>
      </Link >
      
       <Link to='/redux'>
       <h1>Redux</h1>
      </Link>
      <Link to='/zustand'>
      <h1>Zustand</h1>
      </Link>
    </header>
    <main>
     <Outlet/>
    </main>
    <footer>

    </footer>
    </>
  )
}

export default Layout