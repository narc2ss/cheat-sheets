## 개요

클라이언트가 예상 트래픽을 알려주며 서버가 수용할 수 있지에 대한 여부를 물어보았다.

- 500명 접속

## 준비

k6에서 제공해주는 API를 사용하여 10분동안 600명의 target을 설정하고 POST 메서드를 호출하도록 스크립트를 작성하였다.

```bash
import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 100 },
    { duration: "1m", target: 200 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 400 },
    { duration: "1m", target: 600 },
    { duration: "1m", target: 500 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 200 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 0 },
  ],
};

export default function main() {
  const url = "__URL__";
  const body = JSON.stringify({
    userId: "__DATA__",
    modelName: "__DATA__",
    categoryName: "__DATA__",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post(url, body, params);

  sleep(1);
}
```

## 결과

- 요청 실패율 : 0%
- 최소 가상유저: 1명
- 최대 가상유저 : 600명
- 최소 응답시간 : 10.33ms
- 최대 응답시간 : 766.2ms

```bash
$ k6 run index.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: index.js
     output: -

  scenarios: (100.00%) 1 scenario, 600 max VUs, 10m30s max duration (incl. graceful stop):
           * default: Up to 600 looping VUs for 10m0s over 10 stages (gracefulRampDown: 30s, gracefulStop: 30s)

running (10m00.9s), 000/600 VUs, 141801 complete and 0 interrupted iterations
default ✓ [======================================] 000/600 VUs  10m0s

     data_received..................: 60 MB  100 kB/s
     data_sent......................: 34 MB  57 kB/s
     http_req_blocked...............: avg=2.01ms   min=0s      med=6µs      max=848.24ms p(90)=11µs     p(95)=16µs
     http_req_connecting............: avg=960.03µs min=0s      med=0s       max=434.11ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=139.69ms min=10.33ms med=123.61ms max=766.2ms  p(90)=236.3ms  p(95)=306.46ms
       { expected_response:true }...: avg=139.69ms min=10.33ms med=123.61ms max=766.2ms  p(90)=236.3ms  p(95)=306.46ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 141801
     http_req_receiving.............: avg=70.71µs  min=5µs     med=39µs     max=32.7ms   p(90)=84µs     p(95)=147µs
     http_req_sending...............: avg=172.44µs min=3µs     med=22µs     max=15.97ms  p(90)=94µs     p(95)=679µs
     http_req_tls_handshaking.......: avg=1.04ms   min=0s      med=0s       max=709.57ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=139.45ms min=10.29ms med=123.3ms  max=766.15ms p(90)=236.01ms p(95)=306.24ms
     http_reqs......................: 141801 235.963453/s
     iteration_duration.............: avg=1.14s    min=1.01s   med=1.12s    max=2.05s    p(90)=1.24s    p(95)=1.31s
     iterations.....................: 141801 235.963453/s
     vus............................: 1      min=1        max=600
     vus_max........................: 600    min=600      max=600

✨  Done in 602.98s.
```

## 느낀점

- 코드에 문제가 없더라도 하드웨어가 버텨주지 못하면 성공적인 서비스를 제공할 수 없다는 것을 느꼈다.

> Thank you @mdjoo0810 !
