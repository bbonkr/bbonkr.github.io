---
title: 'Postman: Variables usages'
date: 2019-11-01 15:38:22
categories:
- HowTo
tags:
- postman
- test
- tools
- api
- http api
- restful api
intro:
comments:
---

HTTP API  웹 응용프로그램을 작성할 때,  [Postman](https://www.getpostman.com/) 을 많이 사용합니다.

작성한 API 가 잘 동작하는지 클라이언트에서 사용하는 것과 동일한 요청을 GUI를 통해 실행할 수 있어 매우 편리합니다.

{% asset_img postman-variable-usage-001.png %}

[무료 요금제](https://www.getpostman.com/pricing) 를 사용해도 매우 많은 기능을 제공합니다.

많은 기능 중 반복되는 값 - 예를 들면 기본 주소 -을 처리하기 위한 변수 기능을 좋아합니다. 

## 변수 <small>Variable</small>

### 종류

변수는 글로벌, 콜렉션, 환경, 데이터, 로컬 단위로 관리가 가능합니다. 

> - [Variables scopes](https://learning.getpostman.com/docs/postman/environments-and-globals/variables/#variable-scopes)

전역 변수와 환경 변수는 오른쪽 위 버튼을 클릭하면 관리 화면을 찾을 수 있습니다.

{% asset_img postman-variable-usage-002.png %}

> - [Managing global variables](https://learning.getpostman.com/docs/postman/environments-and-globals/manage-globals/)

콜렉션 변수는 콜렉션 편집 화면에서 찾을 수 있습니다.

> - [Edit and view collection detail](https://learning.getpostman.com/docs/postman/collections/managing-collections/#edit-and-view-collection-details)

### 사용

HTTP API 는 기본적으로 하나의 기능이 하나의 URI를 갖습니다.

인증처리를 하는 URI

```http
POST https://your-service.com/api/signin
{
    "username": "<your username>",
    "password": "<your password>"
}
```

매장 정보를 요청하는 URI

```http
GET https://your-service.com/api/stores
Authorization Bearer <your token>
```

Postman 을 사용하면 보통 한번만 작성한 후 저장하면, 다시 불러서 사용할 수 있습니다.

그런데, 동일한 API를 테스트 서버 대상, 스테이징 서버 대상, 프로덕션 서버 대상으로 테스트를 진행하려고 하면 주소 앞부분만 다르고 나머지 부분이 동일할 수 있습니다.

> 해당 시나리오는 환경 변수를 사용하는 것이 더 좋겠습니다.

예제 URI 의 `https://your-service.com` 부분이 다를 것입니다.

콜렉션 편집 화면을 열고 변수 탭에서 아래 이미지와 같이 변수를 추가합니다.

> 기본주소를 `http://localhost:3000` 으로 설정합니다.

{% asset_img postman-variable-usage-003.png %}


## 예제

테스트 대상 웹 응용프로그램의 기본주소는 `http://localhost:3000` 입니다.

`/api/signin` 끝점으로 POST 요청을 하면 token 데이터를 얻을 수 있습니다.

`/api/stores` 끝점으로 요청 헤더에 Bearer 인증을 추가해서 GET 요청을 하면 사용자의 매장 정보를 얻을 수 있습니다.

```http
POST /api/signin

{
    username,
    password
}
```

```http
GET /api/stores
Authorization Bearer
```

Postman 컬렉션 편집 윈도우를 열고, 아래 변수 항목을 추가합니다.

| 이름      | 초기값 | 현재값                   |
|:------- |:--- |:--------------------- |
| baseurl |     | http://localhost:3000 |
| token   |     |                       |

Postman 의 현재 컬렉션에 signin 요청을 추가합니다.

요청 URL은 `{{baseurl}}/api/signin` 을 입력합니다.

{% asset_img postman-variable-usage-004.png %}

응답에서 token 변수의 값을 설정하기 위해 Tests 탭으로 이동합니다.

```js
pm.test('call', ()=> {
    var jsonData = JSON.parse(responseBody);
    if(jsonData){
        if(jsonData.success){
            if(jsonData.data){
                const token = jsonData.data.token;
                pm.environment.set("token", token); // token 변수의 값을 설정
            }
        }
    }
});
```

{% asset_img postman-variable-usage-005.png %}

> Test 탭의 오른쪽에 코드 조각이 제공됩니다.

이제 `/api/signin` 끝점으로 요청을 보내면 응답 데이터에서 token 을 찾을 수 있으면 토큰 변수의 값이 설정됩니다.

Postman 의 현재 컬렉션에 get stores 요청을 추가합니다.

요청 URL은 `{{baseurl}}/api/stores` 를 입력합니다.

Authorization 탭에서 인증 형식을 Bearer Token 으로 선택하고 토큰의 값은 변수를 사용할 것이므로 `{{token}}` 을 입력합니다.

{% asset_img postman-variable-usage-006.png %}

준비를 마쳤습니다.

Signin 요청을 먼저 실행해서 토큰을 얻고, Get stores 요청을 실행하면 이전 Signin 요청에서 얻은 토큰을 요청 헤더 인증 값으로 사용됩니다.

그리고, 테스트 서버의 기본 주소가 변경되면 컬렉션 변수의 값만 변경하면 해당 컬렉션 내의 요청이 변경된 기본주소를 참조할 것 입니다.

## 오류 정정

2019-11-03 현재 컬렉션 변수는 스크립트 환경 <small>Pre-request Script, Tests</small> 에서 쓰기를 지원하지 않습니다.

스크립트로 변수 값 쓰기를 하려면 전역 변수 또는 환경 변수를 사용해야 합니다.

전역변수 쓰기

```js
pm.globals.set("token", token);
```

환경변수 쓰기

```js
pm.environment.set("token", token);
```

## 참조

- [Postman: Learning Center](https://learning.getpostman.com/)
- [Extracting data from response and chaning requests](https://blog.getpostman.com/2014/01/27/extracting-data-from-responses-and-chaining-requests/)
