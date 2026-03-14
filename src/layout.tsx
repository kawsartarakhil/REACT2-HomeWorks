import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <header className='flex justify-evenly text-2xl font-bold  shadow h-20 items-center text-blue-950 bg-blue-950/10'>
      <Link to='/'>
      <h1>Home</h1>
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