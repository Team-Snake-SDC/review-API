import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  vus: 5, // Virtual Users
  duration: '100s',
};

const reviews = `http://localhost:3000/reviews?product_id=${Math.floor(Math.random() * 2000000) + 1}`;

const reviewsMeta = `http://localhost:3000/reviews/meta?product_id=${Math.floor(Math.random() * 2000000) + 1}`;

const reviewsPUTreport = `http://localhost:3000/reviews/${Math.floor(Math.random() * 2000000) + 1}/report`;

const reviewsPUThelpful = `http://localhost:3000/reviews/${Math.floor(Math.random() * 2000000) + 1}/helpful`;

const reviewsPOSTpayload = {
  product_id: Math.floor(Math.random() *40000)+1,
  rating: Math.floor(Math.random() *5)+1,
  summary: "woohoo",
  body: "waahaa",
  recommend: false,
  name: "weehee",
  email: "weehee@woohoo.com",
  photos: ["https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", "https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"],
  characteristics: {}
}



export default function test() {
  group('GET /reviews', () => {
    const reviewsGETResponse = http.get(reviews);
    check(reviewsGETResponse, {
      'transaction time less than 10ms': (r) =>(r.timings.duration < 10),
      'transaction time less than 50ms': (r) =>(r.timings.duration < 50),
      'transaction time less than 100ms': (r) =>( r.timings.duration < 100),
      'transaction time less than 200ms': (r) =>( r.timings.duration < 200),
      'transaction time less than 300ms': (r) =>( r.timings.duration < 300),
      'transaction time less than 400ms': (r) =>( r.timings.duration < 400),
      'transaction time less than 500ms': (r) =>( r.timings.duration < 500),
      'transaction time less than1 1s': (r) =>( r.timings.duration < 1000),
      'transaction time less than 2s': (r) =>( r.timings.duration < 2000),
      'transaction time less than 5s': (r) =>( r.timings.duration < 5000),
      'transaction time less than 10s': (r) =>( r.timings.duration < 10000),
    });
  });
  group('GET /reviews/meta', () => {
    const reviewsMetaGETResponse = http.get(reviewsMeta);
    check(reviewsMetaGETResponse, {
      'transaction time less than 10ms': (r) =>(r.timings.duration < 10),
      'transaction time less than 50ms': (r) =>(r.timings.duration < 50),
      'transaction time less than 100ms': (r) =>( r.timings.duration < 100),
      'transaction time less than 200ms': (r) =>( r.timings.duration < 200),
      'transaction time less than 300ms': (r) =>( r.timings.duration < 300),
      'transaction time less than 400ms': (r) =>( r.timings.duration < 400),
      'transaction time less than 500ms': (r) =>( r.timings.duration < 500),
      'transaction time less than1 1s': (r) =>( r.timings.duration < 1000),
      'transaction time less than 2s': (r) =>( r.timings.duration < 2000),
      'transaction time less than 5s': (r) =>( r.timings.duration < 5000),
      'transaction time less than 10s': (r) =>( r.timings.duration < 10000),
    });
  });
  group('POST /reviews', () => {
    const reviewsMetaGETResponse = http.post(reviews,{}, reviewsPOSTpayload);
    check(reviewsMetaGETResponse, {
      'transaction time less than 10ms': (r) =>(r.timings.duration < 10),
      'transaction time less than 50ms': (r) =>(r.timings.duration < 50),
      'transaction time less than 100ms': (r) =>( r.timings.duration < 100),
      'transaction time less than 200ms': (r) =>( r.timings.duration < 200),
      'transaction time less than 300ms': (r) =>( r.timings.duration < 300),
      'transaction time less than 400ms': (r) =>( r.timings.duration < 400),
      'transaction time less than 500ms': (r) =>( r.timings.duration < 500),
      'transaction time less than1 1s': (r) =>( r.timings.duration < 1000),
      'transaction time less than 2s': (r) =>( r.timings.duration < 2000),
      'transaction time less than 5s': (r) =>( r.timings.duration < 5000),
      'transaction time less than 10s': (r) =>( r.timings.duration < 10000),
    });
  });
  group('POST /reviews', () => {
    const reviewsMetaGETResponse = http.put(reviews,{}, reviewsPOSTpayload);
    check(reviewsMetaGETResponse, {
      'transaction time less than 10ms': (r) =>(r.timings.duration < 10),
      'transaction time less than 50ms': (r) =>(r.timings.duration < 50),
      'transaction time less than 100ms': (r) =>( r.timings.duration < 100),
      'transaction time less than 200ms': (r) =>( r.timings.duration < 200),
      'transaction time less than 300ms': (r) =>( r.timings.duration < 300),
      'transaction time less than 400ms': (r) =>( r.timings.duration < 400),
      'transaction time less than 500ms': (r) =>( r.timings.duration < 500),
      'transaction time less than1 1s': (r) =>( r.timings.duration < 1000),
      'transaction time less than 2s': (r) =>( r.timings.duration < 2000),
      'transaction time less than 5s': (r) =>( r.timings.duration < 5000),
      'transaction time less than 10s': (r) =>( r.timings.duration < 10000),
    });
  });
  group('PUT /reviews/:review_id/report', () => {
    const reviewsMetaGETResponse = http.put(reviewsPUTreport);
    check(reviewsMetaGETResponse, {
      'transaction time less than 10ms': (r) =>(r.timings.duration < 10),
      'transaction time less than 50ms': (r) =>(r.timings.duration < 50),
      'transaction time less than 100ms': (r) =>( r.timings.duration < 100),
      'transaction time less than 200ms': (r) =>( r.timings.duration < 200),
      'transaction time less than 300ms': (r) =>( r.timings.duration < 300),
      'transaction time less than 400ms': (r) =>( r.timings.duration < 400),
      'transaction time less than 500ms': (r) =>( r.timings.duration < 500),
      'transaction time less than1 1s': (r) =>( r.timings.duration < 1000),
      'transaction time less than 2s': (r) =>( r.timings.duration < 2000),
      'transaction time less than 5s': (r) =>( r.timings.duration < 5000),
      'transaction time less than 10s': (r) =>( r.timings.duration < 10000),
    });
  });
  group('PUT /reviews/:review_id/helpful', () => {
    const reviewsMetaGETResponse = http.put(reviewsPUThelpful);
    check(reviewsMetaGETResponse, {
      'transaction time less than 10ms': (r) =>(r.timings.duration < 10),
      'transaction time less than 50ms': (r) =>(r.timings.duration < 50),
      'transaction time less than 100ms': (r) =>( r.timings.duration < 100),
      'transaction time less than 200ms': (r) =>( r.timings.duration < 200),
      'transaction time less than 300ms': (r) =>( r.timings.duration < 300),
      'transaction time less than 400ms': (r) =>( r.timings.duration < 400),
      'transaction time less than 500ms': (r) =>( r.timings.duration < 500),
      'transaction time less than1 1s': (r) =>( r.timings.duration < 1000),
      'transaction time less than 2s': (r) =>( r.timings.duration < 2000),
      'transaction time less than 5s': (r) =>( r.timings.duration < 5000),
      'transaction time less than 10s': (r) =>( r.timings.duration < 10000),
    });
  });
}