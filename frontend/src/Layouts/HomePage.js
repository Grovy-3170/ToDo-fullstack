import List from '@/components/home/List'
import React from 'react'

const HomePage = () => {
  return (
    <div className='w-full h-screen bg-white text-black'>
      <div className='text-green-500 text-4xl font-bold w-full flex justify-center p-16'>ToDo List by Aman Kumar</div>
      <div className='w-full flex justify-center'><List/></div>
    </div>
  )
}

export default HomePage
