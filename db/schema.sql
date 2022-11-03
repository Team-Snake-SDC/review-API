
COPY reviews_details(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/youngminko/hackreactor/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics(id, product_id, name)
FROM '/Users/youngminko/hackreactor/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_characteristics(id, characteristics_id, review_id, value)
FROM '/Users/youngminko/hackreactor/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;


COPY reviews_photos(id, review_id, url)
FROM '/Users/youngminko/hackreactor/reviews_photos.csv'
DELIMITER ','
CSV HEADER;
