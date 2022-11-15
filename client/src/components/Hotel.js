import "./Hotel.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Hotel({ hotels, fromDate, toDate }) {
  const [booked, setBooked] = useState([]);

  const bookRoom = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    const token = JSON.parse(user).token;
    const { _id: hotel_id } = hotels;

    //check if date is specified
    if (!fromDate || !toDate) {
      toast.error("Please specify hotel stay dates");
      return;
    }

    console.log(booked);

    let checkBooked = false;

    //check if hotel is booked
    booked.forEach((bookedhotel) => {
      if (
        hotels.name === bookedhotel.name &&
        (bookedhotel.fromDate === fromDate || bookedhotel.toDate === toDate)
      ) {
        toast.error(
          `Sorry!! Hotel is booked from ${bookedhotel.fromDate} to ${bookedhotel.toDate}. Please pick other dates`
        );
        checkBooked = true;
      }
    });

    //if not
    if (checkBooked === false) {
      //get hotel details
      const hotelDetails = {
        ...hotels,
        fromDate: fromDate,
        toDate: toDate,
        currentBooking: true,
      };

      const config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };

      const res = await postRoom(hotel_id, config, hotelDetails);

      if (res) {
        setTimeout(() => {
          toast.success("An receipt was sent to your email");
        }, 10000);
      }

      setTimeout(() => {
        window.location.reload(true);
      }, 14000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookedData = (await axios.get("http://localhost:5000/api/booked"))
        .data;
      setBooked(bookedData);
    };

    fetchData();
  }, []);

  const postRoom = async (hotel_id, config, hotelDetails) => {
    const url = "http://localhost:5000/api/hotels/book/" + hotel_id;
    const res = await axios.post(url, hotelDetails, config);
    return res;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <img alt="hotel" src={hotels.imageurls[0]} className="smallimg" />
        </div>
        <div className="col-md-7">
          <h6>{hotels.name}</h6>
          <p>{hotels.description}</p>
          <p>Maximum Count : {hotels.maxcount}</p>
          <p>Phone Number : {hotels.phonenumber}</p>
          <p>Type Of Room : {hotels.type}</p>
          <p>Cost of Booking : {hotels.rentperday}</p>

          <div style={{ float: "right" }}>
            <button className="btn btn-primary">VIEW DETAILS</button>
          </div>
          <div style={{ float: "left" }}>
            <button className="btn btn-primary" onClick={bookRoom}>
              BOOK A ROOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
