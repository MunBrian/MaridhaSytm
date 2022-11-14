import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
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

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  //fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await axios.get("http://localhost:5000/api/hotels");
      setHotels(data.data);
      //setHotels(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));
  }

  const searchHotel = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", marginTop: "20px", alignItems: "center" }}>
        <div>
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div>
          <input
            style={{
              width: "100%",
              marginLeft: "20px",
              padding: "6px 0px",
              textAlign: "center",
            }}
            type="text"
            placeholder="Search for hotel name"
            onChange={searchHotel}
          />
        </div>
      </div>
      <div className="row justify-content-centre mt-5">
        {loading ? (
          <h1>Loading....</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          hotels
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((hotels) => {
              return (
                //<div className="col-md-9 mt-2">
                <Hotel
                  key={hotels._id}
                  hotels={hotels}
                  fromDate={fromDate}
                  toDate={toDate}
                  fetchData={fetchData}
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
