import http from 'k6/http';

export const options = {
    stages: [
        { duration: '2m', target: 10 },    
        { duration: '1m', target: 10 },   
        { duration: '2m', target: 0 },  
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],  
        http_req_failed: ['rate<0.01'],   
    }
};


export default function(){
    http.get("https://test.k6.io")
}