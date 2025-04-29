import React, { useState } from 'react'
import "../styles/Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  const [value, setValue] = useState('');
 
  return (
    <section className='font-primary'>
  <div className='bg-gray-700 w-full h-[70px] flex justify-center items-center gap-20'>
    <Link className='bg-white px-4 py-1 font-bold text-black text-[20px] cursor-pointer hover:bg-black hover:text-white' to='/create-blog'>Create Blog</Link>
    <Link className='bg-white px-4 py-1 font-bold text-black text-[20px] cursor-pointer hover:bg-black hover:text-white' to='all-blogs'>All Blog</Link>

</div>



    </section>
  )
}

export default Home
