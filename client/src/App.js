import React from 'react';
import NavBar from './components/navbar';
import './App.css';
import Home from './components/pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/herosection';
import Cards from './components/Cards';
import LogIn from './components/pages/LogIn';
import Booking from './components/pages/Booking';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <>
    <Router>
      <div>
       <NavBar />
       <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/Booking' element={<Booking/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
       </Routes>
       </div>
       </Router>
      
    </>
  );
}

export default App;