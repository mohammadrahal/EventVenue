const express = require('express')
require('./config/db');
const PORT = process.env.PORT;

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(express)
app.use(bodyParser.json());
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
