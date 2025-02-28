import React from 'react';
import './Slider.css';
import s1 from "../../assets/s1.svg"
import s2 from "../../assets/s2.svg"
import s3 from "../../assets/s3.svg"
import s4 from "../../assets/s4.svg"
import s5 from "../../assets/s5.svg"
import s6 from "../../assets/s6.svg"
import s7 from "../../assets/s7.svg"
import s8 from "../../assets/s8.svg"
import s9 from "../../assets/s9.svg"
import s10 from "../../assets/s10.svg"

const Slider = () => {
  return (
    <div className="slider">
      <div className="slider-track">
        <img src={s1} alt="" />
        <img src={s2} alt="" />
        <img src={s3} alt="" />
        <img src={s4} alt="" />
        <img src={s5} alt="" />
        <img src={s6} alt="" />
        <img src={s7} alt="" />
        <img src={s8} alt="" />
        <img src={s9} alt="" />
        <img src={s10} alt="" />
      
        {/* Duplicate items for seamless looping */}  
        
          
        <img src={s1} alt="" />
        <img src={s2} alt="" />
        <img src={s3} alt="" />
        <img src={s4} alt="" />
        <img src={s5} alt="" />
        <img src={s6} alt="" />
        <img src={s7} alt="" />
        <img src={s8} alt="" />
        <img src={s9} alt="" />
        <img src={s10} alt="" />
      </div>
    </div>
  );
};

export default Slider;
