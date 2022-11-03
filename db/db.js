const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
  user:"reviews",
  host:'localhost',
  database: "reviews",
  password: "wowthisispassword123",
  port: 5432
})




module.exports = {

}