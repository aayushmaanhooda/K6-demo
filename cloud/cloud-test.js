import http from 'k6/http';
import { sleep } from 'k6';

const id = __ENV.id;


export const options = {
  vus: 10,
  duration: '3s',
  cloud: {
    // Project: Demo
    projectID: id,
    // Test runs with the same name groups test runs together.
    name: 'Cloud Test 1 (21/01/2026-13:20:52)'
  }
};

export default function() {
  http.get('https://quickpizza.grafana.com');
  sleep(1);
}