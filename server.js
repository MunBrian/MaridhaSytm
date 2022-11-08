const express = require("express");

const app = express();

const dbConfig = require('./db')
const hotelsRoute = require('./routes/hotelsRoute')
const usersRoute = require('./routes/usersRoute')


app.use('/api/hotels' , hotelsRoute)
app.use('/api/users' , usersRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on Port 5000'));

