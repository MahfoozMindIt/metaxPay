import React, { useRef } from 'react'
import "../styles/Home.css"
import telegram from "../assets/telegram.svg"
import icon1 from "../assets/icon-1.svg"
import Slider from '../components/slider/Slider'
import Swiper from '../components/Swiper'
import Section3 from '../components/thirdSection/Section3'
import Section2 from '../components/2ndSection/Section2'
import Section4 from '../components/4rthSection/Section4'

const Home = () => {
 
  return (
    <section className='font-primary'>
    <div className=' banner   text-white '>
    <div className=' pt-28 px-32'>
  <div className='text-[90px]   leading-28 font-extrabold'>
  <h1>
        
        SPEND CRYPTO
              </h1>
              <h1>
                LIKE FIAT
              </h1>
  </div>


              <div className='mt-5 flex justify-between'>
    <section>
    <p className='text-[26px] '>
Seamless payment with your cryptocurrencies</p>

<div className='mt-16'>
    <button className='text-xl bg-white text-black rounded-full px-10 py-3'>
        Get the app
    </button>
</div>
    </section>
    <section className='hidden'>
<p className='text-[17px] font-medium'>Total Balance</p>
<h2 className='text-4xl'>$ 3,868.24</h2>

<div className='flex items-center gap-3 mt-14'>
<img src={telegram} alt="" className='rounded-full'/>
<div className='flex  justify-between font-medium w-[250px] '>
<span>
    Telegram
</span>
<span>
    -9.9 USD
</span>
</div>
</div>
<div className='flex  items-center gap-3 mt-5'>
    <img src={icon1} alt="" className='rounded-full'/>
    <div className='flex  justify-between font-medium w-[250px]'>
<span>
    Starbucks Coffee
</span>
<span>
    -5.8 USD
</span>
</div>
</div>
    </section>
</div>
<p className='text-2xl mt-5'>
Accepted by 130M+ merchants worldwide
</p>

    </div>
    <main className='mt-8'>
    <Slider/>
    </main>


    </div>

  <main>
    <Section2/>
  </main>

    <main className='w-full flex justify-center py-32'>
       <div className='w-[60%] flex flex-col gap-20 items-center'>
        <h2 className='text-5xl font-extrabold'>PAY, SEND, TRANSFER with MetaxPay</h2>
       <div className='w-[91%]'>
       <Swiper/>
       </div>
       </div>
    </main>

<main className='w-[100%]'>
    <Section3/>
    <Section4/>
</main>

    </section>
  )
}

export default Home
