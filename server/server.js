const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json())

// controllers
// get

// post




const port = procees.env.PORT;

app.listen(port, ()=>{console.log(`listening to port ${port}`)});