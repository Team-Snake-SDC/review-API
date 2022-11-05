
COPY reviews_details(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/youngminko/hackreactor/reviews.csv'
DELIMITER ',';

COPY characteristics(id, product_id, name)
FROM '/Users/youngminko/hackreactor/characteristics.csv'
DELIMITER ',';

COPY reviews_characteristics(id, characteristics_id, review_id, value)
FROM '/Users/youngminko/hackreactor/characteristic_reviews.csv'
DELIMITER ',';


COPY reviews_photos(id, review_id, url)
FROM '/Users/youngminko/hackreactor/reviews_photos.csv'
DELIMITER ',';
