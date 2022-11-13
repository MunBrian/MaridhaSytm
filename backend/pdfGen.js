module.exports = (
  userName,
  fromDate,
  toDate,
  totalRent,
  hotelName,
  hotelType
) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
            ul{
                list-style: none;
            }
            .main{
                max-width: 800px;
                 margin: auto;
                 padding: 30px;
                 border: 1px solid #eee;
                 box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                 font-size: 16px;
                 line-height: 24px;
                 font-family: 'Helvetica Neue', 'Helvetica',
                 color: #555;
            }

            .heading{
                border: 2px solid black;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 10px;
            }

            .book-details{
                background-color: #D3D3D3;
                padding: 12px 0px;
            }

            li{
                margin: 8px 0;
                font-size: 20px;
                font-weight: bold;
            }
          </style>
       </head>
       <body>
            <div class="main">
                <div class="heading">
                     <h1>Maridha Hotel</h1>
                    <h2>Hotel Booking Receipt</h2>
                    <p>Date of Booking: ${currentDate}</p>
                </div>
               <div class="book-details">
                   <ul>
                       <li>Customer Name: ${userName} </li>
                       <li>Hotel Name: ${hotelName} </li>
                       <li>Hotel Type: ${hotelType}</li>
                       <li>Booked From: ${fromDate}</li>
                       <li>Booked To: ${toDate} </li>
                       <li>Amount Paid: ${totalRent}</li>
                    </ul>
               </div>

               <div class="footer">
                   <h3>Thank you. Welcome Again.</h3>
               </div>
            </div>
       </body>
    </html>
    `;
};
