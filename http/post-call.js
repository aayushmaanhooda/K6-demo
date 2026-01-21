import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 10,
    duration: '5s'
}

export default function () {
    const endpoint = "http://localhost:8000/users"

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const payload = JSON.stringify({
        "name": "aayushmaan",
        "job": "AI Engineer"
    });

    const res = http.post(endpoint, payload, { headers: headers });

    check(res, {
        "response is valid": (res) => res.status === 201,
    })
}