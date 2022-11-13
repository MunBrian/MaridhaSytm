import React from "react";
import "../../App.css";
import HeroSection from "../herosection";
import Cards from "../Cards";
import Footer from "../Footer";
import Booking from "./Booking";

function Home() {
  const user = localStorage.getItem("user");

  return (
    <>
      {!user ? (
        <>
          <HeroSection />
          <Cards />
          <Footer />
        </>
      ) : (
        <Booking />
      )}
    </>
  );
}

export default Home;
