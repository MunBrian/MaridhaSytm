import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import Hotel from "../Hotel";

const { RangePicker } = DatePicker;

function Process() {
  const navigate = useNavigate();

  //check user in local storage
  const user = localStorage.getItem("user");

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("http://localhost:5000/api/hotels")).data;
        //const characters = await response.json();
        //setHotels(response);
        setHotels(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function filterByDate(dates) {
    console.log(moment(dates[0].format("DD-MM-YYYY")));
    console.log(moment(dates[1].format("DD-MM-YYYY")));
  }

  return (
    <div className="container">
      <div>
        <div>
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          <div className="row justify-content-centre mt-5">
            {loading ? (
              <h1>Loading....</h1>
            ) : error ? (
              <h1>Error</h1>
            ) : (
              hotels.map((hotels) => {
                return (
                  //<div className="col-md-9 mt-2">
                  <Hotel hotels={hotels} />
                  //</div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process;
