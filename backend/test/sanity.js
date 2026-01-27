import http from "k6/http";       
import { check } from "k6";   

/* IDEA 
Test    Users    Duration       What it tests
Sanity   1       1 request     Does POST work?
*/

export const options = {
    vus: 1, // single virtual user
    iterations: 1, //run once
    thresholds :{
        http_req_failed: ['rate==0'], // no failures allowed
        http_req_duration: ['p(95)< 2000'] // resposne under 2 seconds
    },
}


const BASE_URL = "http://localhost:8080"

export default function (){
    console.log("Starting the sanity test....\n")

    // TEST 1
    console.log("Testing Root endpoint")
    let res = http.get(`${BASE_URL}/`)
    check(res, {
        "root endpoint returns 200": (r) => r.status === 200,
    });

     // TEST 2
    console.log("Testing POST todo")
    const newTodo = JSON.stringify({
        "task": "Sanity test todo",
        "description": "Created by K6 sanity test"
     })

    res = http.post(`${BASE_URL}/todo`, newTodo, {headers: {"Content-Type" : "application/json"}})

    check(res, {
        'POST /todo returns 200': (r) => r.status === 200,
        'POST /todo returns todo object': (r) => r.json().todo !== undefined,
    });


}