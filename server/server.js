const express = require('express');
const app = express();
const {endPointReviewsGet, endPointMetaGet, endPointReviewsPost, endPointReviewsHelpfulPut, endPointReviewsReportPut}  = require('../db/db.js');
require('dotenv').config();

app.use(express.json())

// request handler
// get
app.get('/',(req, res)=>{
  res.send('reviews API');
})
// endpoint reviews
app.get('/reviews',endPointReviewsGet);
// endpoint /reviews/meta
app.get('/reviews/meta', endPointMetaGet);
// post
// endpoint /reviews
app.post('/reviews', endPointReviewsPost);
// put
// endpoint /reviews/:review_id/helpful
app.put('/reviews/:review_id/helpful', endPointReviewsHelpfulPut);
// endpoint /reviews/:review_id/report
app.put('/reviews/:review_id/report', endPointReviewsReportPut);


const port = process.env.PORT;

app.listen(port, ()=>{console.log(`listening to port ${port}`)});