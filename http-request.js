// verify status code
// pass headers
// negative case
// positive case
import http from 'k6/http'
import { check } from 'k6';

export const options = {
    vus: 10,           
    iterations: 20,   
    thresholds: {
        http_req_duration: ['p(95)<2000'],  
        http_req_failed: ['rate<0.1'],     
    }
};

export default function(){
    const endpoint = 'https://aayushbot-1.onrender.com/chat';

    const payload = JSON.stringify({
        message: "Helloo how are you??",
        session_id : 'test-session' + __VU + '-' + __ITER
    })

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    console.log(`VU ${__VU} - Sending POST to ${endpoint}`);

    const res = http.post(endpoint, payload, { headers: headers });
    console.log(`VU ${__VU} - Response status: ${res.status}`);


   check(res, {
        'response code is 200': (res) => res.status === 200,
        'correct endpoint': (res) => res.url === endpoint,
        'response has answer': (res) => res.json('answer') !== undefined,
        'response has session_id': (res) => res.json('session_id') !== undefined,
        'response time < 2000ms': (res) => res.timings.duration < 2000,
    });
}
