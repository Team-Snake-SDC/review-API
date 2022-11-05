const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
  user:"reviews",
  host:'localhost',
  database: "reviews",
  password: "wowthisispassword123",
  port: 5432
})

const endPointReviewsGet = (req, res)=>{
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort;
  let product_id = req.query.product_id;
  let queryString = `select * from
  (select detail.review_id, detail.rating, detail.summary, detail.recommend, detail.response, detail.body, detail.date, detail.reviewer_name, detail.helpfulness, detail.product_id,
    (select json_agg(pho) from
    (select id, url from reviews_photos WHERE review_id = detail.review_id AND detail.reported = false)
     pho
     ) as photos from reviews_details as detail WHERE product_id = ${product_id}
  ) review limit ${count} offset ${(page-1)*count}`
  pool.query(queryString)
  .then((data)=>{
    let a = {};
    a.product = product_id;
    a.page = page;
    a.count = count;
    a.result = data.rows.map((ele)=>{
      ele.date = new Date(parseInt(ele.date));
      if (ele.photos === null) {
        ele.photos = [];
      }
      if (ele.response === 'null') {
        ele.response = null;
      }
      return ele;
    });
    res.send(a);
  })
  .catch((err)=>{
    console.log(err);
    res.end('no reviews found');
  })
}

const endPointMetaGet = (req, res) => {
  let product_id = req.query.product_id;
  let queryString = `SELECT rating, COUNT (rating) FROM reviews_details WHERE product_id = ${product_id} GROUP BY rating`;
  let queryString1 = `SELECT recommend, COUNT (recommend) FROM reviews_details WHERE product_id = ${product_id} GROUP BY recommend`;
  let queryString2 =
  `SELECT name, id, value FROM characteristics INNER JOIN
    (SELECT characteristics_id, AVG (value) as value FROM
      (SELECT characteristics_id, value FROM reviews_characteristics INNER JOIN
        (SELECT review_id
        FROM reviews_details WHERE product_id = ${product_id}
        ) as reviews_id ON reviews_id.review_id = reviews_characteristics.review_id
      ) as character_val GROUP BY characteristics_id
    ) AS character_avg ON characteristics.id = character_avg.characteristics_id`
  Promise.all([pool.query(queryString).then((data)=>{
    data.rows
    return data.rows.map((obj)=>{
      let newObj = {};
      newObj[obj.rating] = obj.count;
      return newObj;
    })
  }),
  pool.query(queryString1).then((data)=>{
    return data.rows.map((obj)=>{
      let newObj = {};
      newObj[obj.recommend] = obj.count;
      return newObj;
    })
  }),
  pool.query(queryString2).then((data)=>{
    return data.rows
    .map((obj)=>{
      let newObj = {};
      newObj[obj.name] = {id: parseInt(obj.id), value: obj.value};
      return newObj;
    })
  })
])
  .then((data)=>{
    let obj = {}
    obj["product_id"] = product_id;
    obj.ratings = data[0];
    obj.recommended = data[1];
    obj.characteristics = data[2];
    res.send(obj);
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

  pool.query(queryString)
  .then((data)=>{
    return data.rows[0].review_id;
  })
  .then((data)=>{
    let queryString1 = `INSERT INTO reviews_photos (review_id, url) SELECT UNNEST('{${Array(photos.length).fill(data,0)}}' :: INTEGER []), UNNEST('{${photos}}' :: TEXT [])`;
    return pool.query(queryString1)
  })
  .then(()=>{
    res.send('added succesfully');
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