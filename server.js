const express = require('express')
require('./config/db');
const PORT = process.env.PORT;

const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute')
const eventRouter = require('./routes/eventRoute')
const venueRouter = require('./routes/venueRoute')
const reservationRouter = require('./routes/reservationRoute')
const app = express()
app.use(bodyParser.json());
app.use(cors())

app.use('/user', userRoute)
app.use('/event', eventRouter)
app.use('/venue', venueRouter)
app.use('/reservation', reservationRouter)
app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
  });
