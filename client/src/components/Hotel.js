import React from 'react'
import "./Hotel.css"


function Hotel({hotels}) {
   
  return (
    <div className='container'>
    <div className="row">
        <div className="col-md-5">
            <img src={hotels.imageurls[0]} className="smallimg"/>
        </div>
        <div className="col-md-7">
           <h6>{hotels.name}</h6>
           <p>{hotels.description}</p>
           <p>Maximum Count : {hotels.maxcount}</p>
           <p>Phone Number : {hotels.phonenumber}</p>
           <p>Type Of Room : {hotels.type}</p>
           <p>Cost of Booking : {hotels.rentperday}</p>    

           <div style={{float: 'right'}} >
               <button className="btn btn-primary">VIEW DETAILS</button>   
            </div> 
            <div style={{float: 'left'}} >
            <button className="btn btn-primary">BOOK A ROOM</button>
            </div>
        </div>     
         
      
</div>

</div>
  )
}

export default Hotel