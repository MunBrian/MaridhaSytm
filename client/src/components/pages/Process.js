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

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("http://localhost:5000/api/hotels")).data;
        setHotels(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [toDate, fromDate, navigate]);

  function filterByDate(dates) {
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));
    setFromDate(moment(dates[2]).format("DD-MM-YYYY"));
  }

  return (
    <div className="container">
      <div className="row-md-5 ">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-centre mt-5">
        {loading ? (
          <h1>Loading....</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          hotels.map((hotels) => {
            return (
              //<div className="col-md-9 mt-2">
              <Hotel
                key={hotels._id}
                hotels={hotels}
                fromDate={fromDate}
                toDate={toDate}
              />
              //</div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Process;
