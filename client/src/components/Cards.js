import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/maridha-001.jpg'
              text='Explore the Tigoni Waterfalls'
              label='Adventure'
              path='/Exploring'
            />
            <CardItem
              src='images/maridha-001.jpg'
              text='Travel through the Chale Islands'
              label='Luxury'
              path='/Exploring'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/maridha-001.jpg'
              text='Set Sail in the Indian Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/Booking'
            />
            <CardItem
              src='images/maridha-001.jpg'
              text='Experience Football at the famous Nyayo Stadium'
              label='Adventure'
              path='/Booking'
            />
            <CardItem
              src='images/maridha-001.jpg'
              text='Ride through the Nyalbi Desert on a guided camel tour'
              label='Adrenaline'
              path='/Booking'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;