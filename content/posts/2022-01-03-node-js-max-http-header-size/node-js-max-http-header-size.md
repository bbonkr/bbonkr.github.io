---
title: node.js max-http-header-size
date: 2022-01-03
categories: 
  - "blog"
  - "computing"
tags: 
  - "http-431"
  - "node-js"
  - "nodejs"
---    

Node.js 응용프로그램에서 HTTP 요청시 `HTTP ERROR 431`[1](#fn-8592-http-error-431 "각주를 읽습니다.") 응답이 확인되면 서버의 구성을 변경해서 요청 헤더 크기의 조정이 필요할 수 있습니다.

아래 실행 옵션 또는 환경변수를 추가하기 전에 현재 사용중인 node.js 버젼을 먼저 확인하십시오.

`v13.13.0` 이전 버젼을 사용중이면, `v13.13.0` 이후 버젼으로 변경을 검토하시는게 좋을 것으로 생각됩니다.

`v13.13.0` 이전 버젼의 HTTP 요청 헤더의 크기 기본값은 `8KB` 입니다.

`v13.13.0` 이후 버젼부터 HTTP 요청 헤더의 크기 기본값은 `16KB` 입니다.

> HTTP 헤더 크기 제한 문제가 아닐 수도 있으니, 다른 이슈도 검토하셔야 합니다.

## 사용

### 실행 옵션 사용

```bash
$ node --max-http-header-size=24576 server.js
```

### 환경 변수 사용

```plaintext
NODE_OPTIONS=--max-http-header-size=24576
```

## 참조

- [Node.js api CLI: --max-http-header-size](https://nodejs.org/api/cli.html#--max-http-header-sizesize)

* * *

2. [MDN: 431 Request Header Fields Too Large](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/431) [↩](#fnref-8592-http-error-431 "메인 콘텐츠로 돌아갑니다.")
