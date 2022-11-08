import React, {useState, useEffect} from "react";
import axios from "axios";
import '../../App.css';
import 'antd/dist/antd.css';
import {DatePicker, Space} from 'antd';
import moment from "moment";

const {RangePicker} = DatePicker;

function Process() {

const [hotels, setHotels] = useState([])
const [loading, setLoading] = useState([])
const [error, setError] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = (await axios.get('/api/hotels/getallhotels')).data;
        //const characters = await response.json();
        //setHotels(response);
        setHotels(data)
        setLoading(false)

      } catch (error) {
        setError(true)
        console.log(error);
        setLoading(false)
      }
    }
    fetchData();
  }, []);
  
  
  function filterByDate(dates){
      console.log(moment(dates[0].format("DD-MM-YYYY")))
      console.log(moment(dates[1].format("DD-MM-YYYY")))
    }

    return (
    <div className="booking">
    <div className="row md-5">
      <div className="col-md-3">

          <RangePicker format="DD-MM-YYYY" onChange={filterByDate}/>
          {loading ? (<h1>Loading....</h1>) : error ? (<h1>Error</h1>) :(hotels.map(hotels=>{

                    return <h1>{hotels.name}</h1>

          }))} 
          

      </div>

    </div>
    </div>
    )
}

export default Process;
