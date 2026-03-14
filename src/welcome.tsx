import React from 'react'
import { Link } from 'react-router-dom'
import Jotai from './assets/jotai-mascot.png'
import Redux from './assets/redux.png'
import Zustand from './assets/zustand.png'
const Welcome = () => {
  return (
    <div className='flex flex-col items-center text-blue-950 gap-5'>
     <h1 className='text-6xl font-black m-10'>Kawsar's Home-Work</h1>
     <p className='text-[18px]'><span className='font-bold mr-5'>DESCRIPTION:</span>This is a 3 page homework made with <span className='font-bold m-2'>Jotai</span>,<span className='font-bold m-1'>Redux</span>,<span className='font-bold m-1'>Zustad </span> </p>
     <div className="flex items-center text-center w-250"><img src={Jotai} className="w-35" /><p>Jotai is a lightweight state management library for React.
Instead of using a big global store like Redux, Jotai manages state using atoms.

Think of atoms as tiny containers of state. 🧪
Each atom holds one piece of data.

The cool part: components subscribe only to the atoms they use, so re-renders stay small and fast.</p></div>
<div  className="flex items-center text-center w-250"><img src={Redux} className="w-35" /><p>Redux is a state management library used mostly with React apps.
It keeps your application's state in one central store so every component can access it.

Instead of many scattered states, Redux creates one predictable state container.

It was created to solve problems when apps become large and many components need the same data..</p></div>
<div  className="flex items-center text-center w-250"><img src={Zustand} className="w-55" /><p>Zustand is a lightweight state management library for React.

It lets you create a global store where components can read and update state without complicated setup.

Unlike Redux, Zustand doesn't require reducers, actions, or dispatch functions.

Instead, it uses a simple hook-based store.</p></div>
     <Link to='/jotai'>
      <button className='border-2 p-3 font-bold bg-blue-400/20 ml-20 m-5'>View-Work</button>
     </Link>
    </div>
  )
}

export default Welcome