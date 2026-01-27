import http from "k6/http";       
import { check, sleep } from "k6";   

/* IDEA 
Test    Users    Duration      What it tests
Stress  20→150    4 min        Where does it break?
*/

const BASE_URL = "http://localhost:8080";

export const options = {
    stages: [
        { duration: "30s", target: 20 },    // warm up
        { duration: "30s", target: 50 },    // push to 50
        { duration: "30s", target: 100 },   // push to 100
        { duration: "1m", target: 100 },    // hold at 100
        { duration: "30s", target: 150 },   // push to 150
        { duration: "30s", target: 150 },   // hold at 150
        { duration: "1m", target: 0 },      // cool down
    ],
    thresholds: {
        http_req_failed: ['rate<0.15'],     // stress allows more failures
        http_req_duration: ['p(95)<3000'],
    },
};

export default function () {
    const payload = JSON.stringify({
        task: `Stress Test - VU${__VU} - ${Date.now()}`,
        description: `Iteration ${__ITER}`
    });

    const res = http.post(`${BASE_URL}/todo`, payload, {
        headers: { "Content-Type": "application/json" },
    });

    check(res, {
        "status is 200": (r) => r.status === 200,
        "has todo object": (r) => r.json().todo !== undefined,
    });

    sleep(0.2);  // minimal sleep - hammer the server
}