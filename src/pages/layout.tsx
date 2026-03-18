import React from 'react'
import {Link, Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div>
       <header className='flex justify-evenly shadow font-black h-15 text-2xl items-center' >
         <Link to='/'>
         <h1>Jotai</h1>
         </Link>
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
    </div>
  )
}

export default Layout