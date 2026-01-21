import http from 'k6/http';

export const options = {
    stages: [
        { duration: '2m', target: 50 },     // Ramp to 50 VUs
        { duration: '3m', target: 100 },    // Increase to 100 VUs
        { duration: '3m', target: 200 },    // Increase to 200 VUs
        { duration: '3m', target: 300 },    // Increase to 300 VUs
        { duration: '5m', target: 300 },    // Hold at 300 VUs
        { duration: '2m', target: 0 },      // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'],  // More lenient at stress
        http_req_failed: ['rate<0.05'],     // Allow 5% errors
    }
};


export default function(){
    http.get("https://test.k6.io")
}