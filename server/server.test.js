import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, group, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '1m'
}

export default function () {
  group('get /reviews')
}