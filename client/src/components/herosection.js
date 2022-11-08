import React from 'react';
import '../App.css';
import { Button } from './button';
import './herosection.css';


function HeroSection() {
  return (
    <div className='hero-container'>
      <image src="./public/images/maridha-001.jpg"/>
      <h2>FIND YOUR HOME AWAY FROM HOME</h2>
      <p>Low prices on hotels & resorts</p>
      <div className='hero-btns'>
    
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;