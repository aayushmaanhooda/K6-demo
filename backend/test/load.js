import http from "k6/http";       
import { check, sleep } from "k6";   

/* IDEA 
Test    Users    Duration      What it tests
Load    10→20    3.5 min       Handles normal traffic?

Users
  │
20├─────────────────────────────────────────────────────┬───────────┐
  │                                                     │           │
  │                                                     │   HOLD    │
15├─────────────────────────────────────────────────────┤   20 VUs  │
  │                                         RAMP        │   (1min)  │
  │                              ┌──────────UP          │           │
10├──────────────────┬───────────┤                      │           ├───────┐
  │                  │           │                      │           │       │
  │      HOLD        │   RAMP    │                      │           │ RAMP  │
  │      10 VUs      │   UP      │                      │           │ DOWN  │
5 ├──────(1min)──────┤           │                      │           │       │
  │                  │           │                      │           │       │
  │  RAMP UP         │           │                      │           │       │
0 ├──────────────────┴───────────┴──────────────────────┴───────────┴───────┘
  0      30s        1m30s       2m        2m30s       3m30s       4m
                            TIME
*/

const BASE_URL = "http://localhost:8080";

export const options = {
    stages: [
        { duration: "30s", target: 10 },   // ramp up to 10
        { duration: "1m", target: 10 },    // hold at 10
        { duration: "30s", target: 20 },   // ramp up to 20
        { duration: "1m", target: 20 },    // hold at 20
        { duration: "30s", target: 0 },    // ramp down
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'],
        http_req_duration: ['p(95)<1000'],
    },
};


export default function() {
    const payload = JSON.stringify({
        task : `Load Test - VU${__VU} - ${Date.now()}`,
        description: `Iteration ${__ITER}`
    });

    const res = http.post(`${BASE_URL}/todo`, payload, {headers: {"Content-Type": "application/json"}});

    check(res, {
        "status ois 200": (r) => r.status === 200,
        "has todo object": (r) => r.json().todo != undefined,
    });

    sleep(Math.random() * 0.5 + 0.5)
}