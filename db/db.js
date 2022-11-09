const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.DBPORT
})

const endPointReviewsGet = (req, res)=>{
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort|| '';
  let product_id = req.query.product_id;
  let queryString =
  `SELECT json_build_object(
    'product', ${product_id},
    'page', ${(page-1)*count},
    'count', ${count},
    'results',
    (SELECT json_agg
      (json_build_object
        (
          'review_id', review_id,
          'rating', rating,
          'summary', summary,
          'recommend', recommend,
          'response', response,
          'body', body,
          'date', TO_CHAR(TO_TIMESTAMP(date/1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
          'reviewer_name', reviewer_name,
          'helpfulness', helpfulness,
          'photos',
          (
            SELECT json_agg(pho) FROM
            (
              SELECT id, url from reviews_photos WHERE review_id = details.review_id
            ) pho
          )
        )
      ) FROM (SELECT * FROM reviews_details WHERE product_id = ${product_id} AND reported = false limit ${count} offset ${(page-1)*count}) as details
    )
  )`


  pool.query(queryString)
  .then((data)=>{
    res.send(data.rows[0].json_build_object);
  })
  .catch((err)=>{
    console.log(err);
    res.end('no reviews found');
  })
}

const endPointMetaGet = (req, res) => {
  let product_id = req.query.product_id;
  let queryString =
    `SELECT json_build_object
    (
      'product_id', ${product_id},
      'ratings',
      (
        SELECT json_object_agg
        (
          rating,
          count
        ) FROM (SELECT rating, COUNT (rating) FROM reviews_details WHERE product_id = ${product_id} GROUP BY rating ORDER BY rating) as ratings
      ),
      'recommended',
      (
        SELECT json_object_agg
        (
          recommend,
          count
        ) FROM (SELECT recommend, COUNT (recommend) FROM reviews_details WHERE product_id = ${product_id} GROUP BY recommend) as recommended
      ),
      'characteristics',
      (
        SELECT json_object_agg
        (
          name,
          json_build_object
          (
            'id', id,
            'value', value
          )
        ) FROM
        (
          SELECT name, id, value FROM characteristics INNER JOIN
          (
            SELECT characteristics_id, AVG (value) as value FROM
            (
              SELECT characteristics_id, value FROM reviews_characteristics INNER JOIN
              (
                SELECT review_id FROM reviews_details WHERE product_id = ${product_id}
              ) as reviews_id ON reviews_id.review_id = reviews_characteristics.review_id
            ) as character_val GROUP BY characteristics_id
          ) AS character_avg ON characteristics.id = character_avg.characteristics_id ORDER BY characteristics_id
        ) as characteristics_value
      )
    )`
  pool.query(queryString)
  .then((data)=>{
    res.send(data.rows[0].json_build_object);
  })
  .catch((err)=>{
    console.log(err);
    res.end('cannot find');
  })
}

const endPointReviewsPost = (req, res)=>{
  let product_id = req.query.product_id;
  let rating = req.query.rating;
  let summary = req.query.summary;
  let body = req.query.body;
  let recommend = req.query.recommend;
  let name = req.query.name;
  let email = req.query.email;
  let photos = req.query.photos;
  let characteristics = req.query.characteristics;
  let queryString = `INSERT INTO reviews_details(review_id,product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES (default,${product_id}, ${rating},${new Date().valueOf()},'`+summary+"','"+body+"','"+recommend+"','"+name+"','"+email+"') RETURNING review_id";
  //  console.log(characteristics)
  pool.query(queryString)
  .then((data)=>{
    let queryString1 =
    `INSERT INTO reviews_photos (review_id, url)
      SELECT
      CAST(${data.rows[0].review_id} AS BIGINT),
      CAST(url AS text) FROM json_array_elements_text('${photos}') as photos(url)
    `;

    let queryString2 =
    `INSERT INTO reviews_characteristics (characteristics_id, review_id, value)
      SELECT
      CAST(characteristics_id AS BIGINT),
      CAST(${data.rows[0].review_id} AS BIGINT),
      CAST(value AS INT) FROM jsonb_each('${characteristics}') as character(characteristics_id, value)
    `

    return pool.query(queryString1)
    .then((data)=>{
      console.log(data.rows)
      return pool.query(queryString2)
    })
    .then(data=>{
      console.log('here', data.rows)
      res.send('added data');
    })
    .catch((err)=>{
      console.log(err);
    })
  })
  .catch((err)=>{
    console.log(err);
    res.end("error");
  })
}

const endPointReviewsHelpfulPut = (req, res)=> {
  let review_id = req.params.review_id;
  let queryString = `UPDATE reviews_details SET helpfulness = helpfulness + 1 WHERE review_id = ${review_id}`;
  pool.query(queryString)
  .then((data)=>{
    res.send("added helpfulness")
  })
  .catch((err)=>{
    console.log(err);
    res.end(err);
  })
}

const endPointReviewsReportPut = (req, res)=>{
  let review_id = req.params.review_id;
  let queryString = `UPDATE reviews_details SET reported = true WHERE review_id=${review_id}`
  pool.query(queryString)
  .then((date)=>{
    res.send('reported');
  })
  .catch((err)=>{
    console.log(err);
    res.end('error');
  })
}


module.exports = {
  endPointReviewsGet,
  endPointMetaGet,
  endPointReviewsPost,
  endPointReviewsHelpfulPut,
  endPointReviewsReportPut
}