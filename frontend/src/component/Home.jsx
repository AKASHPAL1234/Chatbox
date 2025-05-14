import React from 'react'
import Sidebar from './Sidebar'
import Promt from './Promt'

function Home() {
  return (
    <div className='h-screen flex '>
        <Sidebar/>
        <Promt/>
    </div>
  )
}

export default Home