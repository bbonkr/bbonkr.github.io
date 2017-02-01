---
layout: post
title: "Javascript Web Storage API"
description: "Javascript Web Storage API"
excerpt: "Javascript Web Storage API"
category: Computing
tags: ["javascript", "api", "web storage"]
comments: true
twitter: true
image_width: 100
---

Web Storage API는 브라우저가 쿠키를 사용하는 것보다 훨씬 더 직관적인 방법으로 키-값 쌍을 안전하게 저장할 수 있는 메커니즘을 제공하는 합니다. [^mdn-using-the-web-storage-api]

로컬 저장소는 쿠키보다 저장 용량이 크며, 저장된 데이터를 서버로 전송하지 않습니다.

Web Storage API의 Storage 인터페이스[^mdn-storage-interface]는 특정 도메인에 대한 세션 저장소 또는 로컬 저장소에 대한 액세스를 제공하며 저장된 데이터 항목을 추가, 수정 또는 삭제할 수 있습니다.

동일 원본 <small>Origin</small> (도메인 및 프로토콜)에서는 데이터를 저장한 페이지가 달라도 동일한 로컬 저장소에 대해 I/O가 가능합니다.

Web Storage 인터페이스는 window 객체의 localStorage 와 SessionStorage 속성으로 구현되어 있습니다.

두 속성의 유일한 차이점은 localStorage에 저장된 데이터에는 만료 시간이 없지만, sessionStorage에 저장된 데이터는 브라우징 세션이 끝나면 (즉, 브라우저가 닫힐 때) 지워집니다.

## Storage Interface[^mdn-storage-interface]

로컬 저장소에 데이터를 키-값 형태로 저장합니다.

값은 문자열 형식만을 지원합니다.

### 명세 <small>Specifications</small>

Storage Interface 의 명세[^storage-interface-sepcification]는 아래와 같습니다.

```
interface Storage {
  readonly attribute unsigned long length;
  DOMString? key(unsigned long index);
  getter DOMString? getItem(DOMString key);
  setter void setItem(DOMString key, DOMString value);
  deleter void removeItem(DOMString key);
  void clear();
};
```


### 브라우저 지원 확인 <small>Check Browser support</small>

```javascript
if (typeof(Storage) !== "undefined") {
    // 현재 브라우저는 Web Storage API를 지원합니다.
} else {
    // 현재 브라우저는 Web Storage API를 지원하지 않습니다.
}
```

### 속성 <small>Properties</small>

#### Storage.length

로컬 저장소에 저장된 데이터의 수를 가져옵니다.

```javascript
var storage = window.localStorage;

storage.setItem('key1', 'value1');
storage.setItem('key2', 'value2');
storage.setItem('key3', 'value3');

var countOfKeyValuePairs = storage.length; // 3
```


### 메서드 <small>Methods</small>

#### Storage.key(n)

n 번째 키를 반환합니다.

```javascript
var storage = window.localStorage;

storage.setItem('key1', 'value1');
storage.setItem('key2', 'value2');
storage.setItem('key3', 'value3');

storage.key(0); // ==> key1
storage.key(1); // ==> key2
storage.key(2); // ==> key3
```


#### Storage.setItem(k, v)

로컬 저장소에 데이터를 키 `k`, 값 `v` 로 저장합니다.

새로운 키 `k` 로 데이터를 입력하면 로컬 저장소에 새로운 항목이 저장되고, 존재하는 키 `k` 를 입력하면 기존 항목의 값이 갱신됩니다.

```javascript
var storage = window.localStorage;

storage.setItem('key1', 'value1'); // 새로운 항목이 추가됨
storage.setItem('key2', 'value2'); // 새로운 항목이 추가됨
storage.setItem('key1', 'value3'); // 기존 키 key1 항목의 값이 'value3' 으로 갱신됨
```


#### Storage.getItem(k)

로컬 저장소에서 키 `k`에 해당하는 항목의 값을 반환합니다.

```javascript
var storage = window.localStorage;

storage.setItem('key1', 'value1');
storage.setItem('key2', 'value2');

var val1 = storage.getItem('key1'); // ==> 'value1'
var var2 = storage.getItem('key2'); // ==> 'value2'
var var3 = storage.getItem('key3'); // ==> undefined
```


#### Storage.removeItem(k)

로컬 저장소에서 키 `k`에 해당하는 항목을 제거합니다.

```javascript
var storage = window.localStorage;
var countOfKeyValuePairs = 0;

storage.setItem('key1', 'value1');
storage.setItem('key2', 'value2');

countOfKeyValuePairs = storage.length; // 2

storage.removeItem('key1');

countOfKeyValuePairs = storage.length; // 1
```


#### Storage.clear()

로컬 저장소를 초기화합니다.

```javascript
var storage = window.localStorage;
var countOfKeyValuePairs = 0;

storage.setItem('key1', 'value1');
storage.setItem('key2', 'value2');

countOfKeyValuePairs = storage.length; // 2

storage.clear();

countOfKeyValuePairs = storage.length; // 0
```


### 브라우저 호환성 <small>Browser compatibility</small>

웹 브라우저마다 로컬 저장소 <small>localStorage, sessionStorage</small> 저장 수준이 다릅니다. Web Storage Support Test[^web-storage-support-test] 사이트에서 현재 웹 브라우저의 저장 수준을 대략적으로 확인할 수 있습니다.

#### 데스크톱 <small>Desktop</small>

|Feature|Chrome|Firefox (Gecko)|Internet Explorer|Opera|Safari (WebKit)|
| :- | :-: | :-: | :-: | :-: | :-: |
|localStorage|4|3.5|8|10.50|4|
|sessionStorage|5|2|8|10.50|4|


#### 모바일 <small>Mobile</small>

|Feature|Android|Firefox Mobile (Gecko)|IE Phone|Opera Mobile|Safari Mobile|
| :- | :-: | :-: | :-: | :-: | :-: |
|Basic support|2.1|?|8|11|3.2[^ios-5-1-safarimobile]|



## window.localStorage [^mdn-window-localstorage]

만료시간이 없는 데이터를 키-값 형태로 저장합니다.

```javascript
var storage = window.localStorage;
storage.setItem('key1', 'value1');
var val1 = storage.getItem('key1');
```


## window.sessionStorage [^mdn-window-sessionstorage]

브라우징 세션이 끝나면 초기화되는 데이터를 키-값 형태로 저장합니다.

```javascript
var storage = window.sessionStorage;
storage.setItem('key1', 'value1');
var val1 = storage.getItem('key1');
```



[^mdn-using-the-web-storage-api]: [MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
[^mdn-storage-interface]: [MDN: storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
[^mdn-window-localstorage]: [MDN: window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
[^mdn-window-sessionstorage]: [MDN: window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
[^web-storage-support-test]: [Web Storage Support Test](http://dev-test.nemikor.com/web-storage/support-test/)
[^ios-5-1-safarimobile]: iOS 5.1부터 Safari Mobile 은 localStorage 데이터를 캐시 디렉터리에 저장합니다. 캐시 디렉터리는 일반적으로 공간이 부족한 경우 시스템에 의해 정리될 수도 있습니다.
[^storage-interface-sepcification]: [The Storage Interface](https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface)
