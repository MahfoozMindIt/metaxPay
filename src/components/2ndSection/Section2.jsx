import React from 'react'
import Gpay from "../../assets/Gpay.svg"
import Ipay from "../../assets/Ipay.svg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Section2 = () => {
  return (
    <section className='w-full flex flex-col items-center justify-center py-32'>
    <main className='w-[70%] h-[500px]'>
       <div className='w-[57%]'>
       <section className=' flex'>

<Swiper
     effect="coverflow"
     spaceBetween={2000} // Adjust spacing between slides
     slidesPerView={1} 
     centeredSlides={true} // Centers the active slide
     loop={true} // Infinite loop
     autoplay={{
       delay: 3000, // Auto-slide every 2 seconds
       disableOnInteraction: false,
     }}
     coverflowEffect={{
       rotate: 0, // No rotation
       stretch: 1, // Controls spacing between slides
       depth: 1, // Creates 3D depth effect
       modifier: 50, // Adjusts zoom strength
       slideShadows: false, // No shadow effect
     }}
     onSlideChange={() => console.log("Slide changed")}
     modules={[Autoplay, EffectCoverflow]}
     className="mySwiper"
   >
     
     <SwiperSlide>
     <div  className='flex flex-col gap-10  w-[800px] '>
          <div >
          <h2 className='text-7xl font-black'>
               VIRTUAL CARD
           </h2>
           <h2 className='text-5xl font-extrabold'>
           ANYTIME, ANYWHERE
           </h2>
          </div>

           <ul className='list-disc ml-10 font-medium text-[20px] flex flex-col gap-5 '>
<li>
Instant transaction
</li>
<li>
   
Widely-accepted
</li>
<li>
   
Compatible with Apple Pay/Google Pay
</li>
           </ul>

           <div className='p-10 text-white flex items-center gap-10' >
               <button className='bg-[#E11D5C] w-[220px] text-xl font-medium font-primary py-4 rounded-full' >
                   Get your card
               </button>
               <div className='flex gap-10'>
                   <img src={Gpay} alt="" className=''/>
                   <img src={Ipay} alt="" className=''/>
               </div>
           </div>
       </div>
       </SwiperSlide>
     <SwiperSlide>
        <div  className='flex flex-col gap-10  w-[800px] '>
          <div >
          <h2 className='text-7xl font-black'>
          PHYSICAL CARD
           </h2>
           <h2 className='text-5xl font-extrabold'>
           ONE CARD FOR ALL
           </h2>
          </div>

           <ul className='list-disc ml-10 font-medium text-[20px] flex flex-col gap-5 '>
<li>
Tap and Pay
</li>
<li>
   
ATM Withdrawl
</li>
           </ul>

           <div className='p-10 text-white flex items-center gap-10' >
               <button className='bg-[#E11D5C] w-[220px] text-xl font-medium font-primary py-4 rounded-full' >
                   Get your card
               </button>
               <div className='flex gap-10'>
                   <img src={Gpay} alt="" className=''/>
                   <img src={Ipay} alt="" className=''/>
               </div>
           </div>
       </div>
       </SwiperSlide>
  
   </Swiper>

   
     

       </section>
       </div>

      
    </main>
    <main className='flex gap-10 pt-10'>
            <button className='text-[20px] font-semibold'>
           VIRTUAL CARD
            </button>
            <button className='text-[20px] font-semibold'>
PHYSICAL CARD
            </button>
        </main>
    </section>
  )
}

export default Section2
