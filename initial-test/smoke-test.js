import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        http_req_duration :['p(95)<1000'],
        http_req_failed :['rate<0.1'],
    }
};

export default function(){
    http.get("https://test.k6.io")
}