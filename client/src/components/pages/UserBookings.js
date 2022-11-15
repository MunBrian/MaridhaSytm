import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserBookings = () => {
  const [data, setData] = useState([]);

  const user = localStorage.getItem("user");
  const token = JSON.parse(user).token;

  const deleteHotel = async (hotelId) => {
    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const url = "http://localhost:5000/api/booked/userbooked/" + hotelId;
    const res = await axios.delete(url, config);

    if (res) {
      toast.success("Hotel Deleted Successfully");
    }

    setTimeout(() => {
      window.location.reload(true);
    }, 5000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
      const userData = (
        await axios.get("http://localhost:5000/api/booked/userbooked", config)
      ).data;
      setData(userData);
    };

    fetchData();
  }, []);

  return data.map((hotel) => {
    return (
      <div className="container" style={{ marginTop: "16px" }} key={hotel._id}>
        <div className="row">
          <div className="col-md-5">
            <img
              alt="hotel"
              src={hotel.imageurls[0]}
              className="smallimg"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h6>{hotel.name}</h6>
            <p>{hotel.description}</p>
            <p>Maximum Count : {hotel.maxcount}</p>
            <p>Phone Number : {hotel.phonenumber}</p>
            <p>Type Of Room : {hotel.type}</p>
            <p>Cost of Booking : {hotel.rentperday}</p>
            <div style={{ float: "right", paddingBottom: "10px" }}>
              <button
                className="btn btn-primary"
                onClick={() => deleteHotel(hotel._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default UserBookings;
