import http from "k6/http";       
import { check, sleep } from "k6";   

/* IDEA 
Test    Users    Duration      What it tests
Smoke   3        30sec         Works under light load?

Time:     0s        1s        2s        3s        4s
          │         │         │         │         │
VU1:      POST──────sleep─────POST──────sleep─────POST...
VU2:      POST──────sleep─────POST──────sleep─────POST...
VU3:      POST──────sleep─────POST──────sleep─────POST...
          │                   │
          └── all 3 hit       └── all 3 hit
              at same time        again
*/

const BASE_URL = "http://localhost:8080";

export const options = {
    vus: 3,
    duration: "30s",
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<500'],
    },
};

export default function() {
    const payload = JSON.stringify({
        task: `Smoke Test - VU${__VU} - ${Date.now()}`,
        description: `iterations ${__ITER}`
    });

    const res = http.post(`${BASE_URL}/todo`, payload, {headers: {"Content-Type": "application/json"}});

    check (res, {
        "status is 200 ": (r) => r.status === 200,
        "has todo object": (r) => r.json().todo !== undefined,
    });

    sleep(1);
}