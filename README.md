# Atelier review-API

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Description](#description)

## About

Atelier review-API was built with PostgreSQL and Express.js. This backend application connects review database with Atelier e-commerce website. Previously, all the data for Atelier e-commerce website was hosted on one API, taking about 50ms to receive data. As web traffic increased, it was necessary to scale the API services into microservices for a better response time and a better experience for the customers to meet a business requirement of handling 1000 request/s with at least 100ms response time.  

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## Installation

1. To install dependencies, from root directory type the following command
  ```
npm install
```
2. To Initiate ETL process for previous data,
  ```
psql -U YOUR_USERNAME -d DATABASE_NAME -h localhost  -p 5432 -f ./db/schema.sql
```
During this process make sure you fix the csv file location on schema.sql for each corresponding file

3. To start the microservice
```
npm run server
```

## Description
Data was hosted with PostgreSQL database. To meet the business requirement, reducing latency was our priority. we used indexing and JSON aggregate function to shorten the search time when request were made. To handle 1000 request/s, application was deployed on AWS EC2 instance with load balancing with Nginx. This application was tested with K6. In production, the latency was tested with loader.io and all the queries were handled within 20ms.
