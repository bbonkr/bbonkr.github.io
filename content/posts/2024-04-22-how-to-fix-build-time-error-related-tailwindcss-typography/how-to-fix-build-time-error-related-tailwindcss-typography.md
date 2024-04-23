---
title: 'How to fix build time error related @tailwindcss/typography'
date: 2024-04-22
categories:
    - Blog
    - Computing
tags:
    - nextjs
    - github
    - tailwindcss
    - troubleshooting
draft: false
featuredImage:
comments: fal
github: # If you want to show github buttons, fill owner and repo
    owner:
    repo:
---

오랜만에 빌드 스크립트를 실행하니, 아래와 같이 오류와 함께 실패합니다.

```shell
$ npm run build

> sample-next-i18next@1.2.1 build
> next build

info  - Linting and checking validity of types
info  - Creating an optimized production build
Failed to compile.

./src/components/common/RouteIndicator/RouteIndicator.module.css
TypeError: Cannot read properties of undefined (reading '700')
    at module.exports [as typography] (/Users/helloworld/Repos/sample-next-i18next/node_modules/@tailwindcss/typography/src/styles.js:16:65)
```

### Error: Cannot read properties of undefined (reading '700')

검색을 하다 보니, 관련 이슈를 발견했습니다.

[tailwindlabs/tailwindcss-typography: Cannot read property '700' of undefined #214](https://github.com/tailwindlabs/tailwindcss-typography/issues/214)

> 2021-10-21 글임을 확인하고 깜짝놀랬습니다.
> 그동안 너무 신경을 못쓴것 같습니다.

@tailwindcss/typography 패키지의 최신 버전을 설치해서 해결이 가능하다고 하여, 관련 패키지들을 업그레이드했습니다.

### npm install @tailwindcss/typography@latest

```shell
$ npm install @tailwindcss/typography@latest
```

이 후 tailwindcss, next-i18n 관련 변경을 반영한 후 빌드 스크립트가 정상적으로 실행되는 것을 확인했습니다.

> -   [관련 변경사항](https://github.com/bbonkr/sample-next-i18next/pull/106/files)

```shell
$ npm run build

> sample-next-i18next@1.2.1 build
> next build

info  - Linting and checking validity of types
info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data
info  - Generating static pages (14/14)
info  - Finalizing page optimization

Route (pages)                              Size     First Load JS
┌ ● /                                      1.48 kB         102 kB
├   /_app                                  0 B            97.3 kB
├ ○ /404                                   193 B          97.5 kB
└ ● /about                                 1.48 kB         102 kB
+ First Load JS shared by all              99.6 kB
  ├ chunks/framework-7dc8a65f4a0cda33.js   45.3 kB
  ├ chunks/main-9f2823b223abd7dd.js        32.7 kB
  ├ chunks/pages/_app-1c32e923e1d3c53d.js  18.5 kB
  ├ chunks/webpack-69bfa6990bb9e155.js     775 B
  └ css/104acd707b7e6ae7.css               2.3 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```
