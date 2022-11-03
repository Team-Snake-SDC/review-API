const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
  user:"",
  host:'localhost:3000',
  database: "review",
  password: "idontknow",
  port: process.env.PORT
})




module.exports = {

}