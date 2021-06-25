---
title: SPA 에서 파일 다운로드
date: 2020-09-07 20:10:06
categories:
    - HowTo
tags:
    - code snippet
    - npm
    - react
    - typescript
intro:
comments:
---

SPA <small>Single Page Application</small> 로 작성중인 웹 응용프로그램에서 파일 다운로드를 구현할 때, 새 창으로 다운로드할 파일의 URI를 제공해서 처리하면 매우 편리하게 파일을 다운로드할 수 있습니다.

```javascript
const fileDownloadUri = '파일 다운로드 URI';
window.open(fileDownloadUri, '_blank');
```

파일 URI와 함께 인증이 필요할 때, 쿠키를 사용중이면 동일하게 사용하면 됩니다.

그런데, 쿠키를 사용하지 않고, JWT 등을 사용해서 요청 헤더에 데이터를 제공하는 형식으로 인증을 처리중이면, 새창을 열어서 처리하는 방식으로는 처리가 불가능합니다.

이 때, 사용할 수 있는 간단한 코드조각을 npm 패키지로 공유합니다.

## 📢 @bbon/filedownload 패키지

[npm: @bbon/filedownload 패키지](https://www.npmjs.com/package/@bbon/filedownload) 페이지에서 패키지를 확인하실 수 있습니다.


## 🛠 설치

```bash
$ npm install @bbon/filedownload
```

```bash
$ yarn add @bbon/filedownload
```

## 🎮 사용

HTTP 요청은 사용중인 패키지 또는 API를 사용하시면 됩니다.

응답 형식은 `BLOB` 으로 지정되어야 합니다.

AWS S3, Azure Storage, Google Cloud Storage 등의 클라우드 객체 저장소에 사용이 가능합니다.
물론, 직접 구현한 웹 응용프로그램의 BLOB 응답에도 사용가능합니다.

예제 코드에서 HTTP 요청은 [Axios 패키지](https://www.npmjs.com/package/axios)를 사용합니다.

```typescript
const requestConfig: AxiosRequestConfig = {
    ...Axios.defaults,
    responseType: 'blob',
};

Axios.get(fileDownloadUrl, requestConfig)
    .then((res) => {
        if (res) {
            const contentType =
                res.headers['content-type'] || 'application/octet-stream';
            const helper = new FileDownloadHelper();
            helper.download({
                data: res.data,
                filename: fileName,
                contentType,
            });
        }
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        setLoading(false);
    });
```

전체코드는 [GitHub: bbon-filedownload-sample](https://github.com/bbonkr/bbon-filedownload-sample) 저장소에서 확인하실 수 있습니다.

[😎 예제 페이지](https://bbon.me/bbon-filedownload-sample/)에서 동작을 확인하실 수 있습니다. <small>(다운로드 버튼을 클릭하면, 빨간 이미지를 다운로드합니다. 확인하실 때 눈👁을 조심하십시오.)</small>