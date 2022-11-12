import React from "react";
import "./Hotel.css";
import axios from "axios";
import { toast } from "react-toastify";

function Hotel({ hotels, fromDate, toDate }) {
  const bookRoom = async (e) => {
    e.preventDefault();

    const { _id: hotel_id } = hotels;

    //check if date is specified
    if (!fromDate || !toDate) {
      toast.error("Please specify hotel stay dates");
      return;
    }

    const roomDetails = {
      fromDate,
      toDate,
      currentbooking: true,
    };

    const user = localStorage.getItem("user");
    const token = JSON.parse(user).token;

    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };
    const url = "http://localhost:5000/api/hotels/book/" + hotel_id;
    const res = await axios.post(url, roomDetails, config);

    if (res) {
      window.location.reload(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <img src={hotels.imageurls[0]} className="smallimg" />
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
