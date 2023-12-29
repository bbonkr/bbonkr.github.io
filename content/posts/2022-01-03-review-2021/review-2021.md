---
title: Review 2021
date: 2022-01-03
categories:
    - 'blog'
    - 'story'
tags:
    - 'review'
---

2021년을 돌아봅니다.

## 기술 스택

### .NET

드디어 .NET 6 가 출시되었습니다.

어떻게 하면 자주 사용하는 반복되는 코드들을 편리하게 사용할 수 있을까를 계속 생각하고 있습니다.

Nuget 으로 게시되는 라이브러리에 대한 생각을 정리했습니다.

추상화 계층의 경우 .NET Standard 를 포함하고, 구현 계층은 .NET 5, .NET 6 를 대상으로 하는 것이 좋겠다고 생각되어, 변경하고 있습니다.

### React

올해도 프론트엔드 업무는 React 를 사용했습니다.

[next.js](https://nextjs.org/) 활용을 연구하고 관련 이슈를 처리하고 있습니다.

npm 패키지는 webpack 보다 rollup 으로 번들링하는 것으로 변경하는 것이 여러가지 이점이 있는 것으로 생각되어 변경을 진행하고 있습니다.

### Container

코드를 작성하고, CI/CD 도구로 Docker image 를 게시해서, 필요한 컨테이너를 실행하고 있습니다.

아직, 다른 컨테이너 도구는 사용하지 않고 있습니다.

### CI/CD

GitHub Actions 와 Azure Pipeline 을 사용합니다.

git tag, npm 게시, nuget 게시, docker image 게시를 주로 사용했습니다.

게시한 후 GitHub 의 경우 Release 를 작성하는 기능도 사용하고 있습니다.

## 2021년 이야기

### 업무

파트타임으로 시작된 계약이 풀타임으로 갱신되어 업무를 지원하고 있습니다.

고민끝에 업무용 맥북프로를 주문했습니다만 내년(2022)에 받을 수 있을 것 같습니다.

그리고, MacOS 에서 처리가 불편한 작업을 위해 작은 데스크톱을 구성하려고 계획하고 있습니다.

### 취미

위쳐3: 와일드 헌터 게임을 완료했습니다.

매우 재미난 드라마의 한 시즌이 끝났다고 생각되었습니다.

## 응용프로그램과 라이브러리

코드를 작성하고, 저장소를 공개하고 있습니다.

### 응용프로그램

-   [Bing Today Image Collector](https://bbon.kr/bing-today-images-collector)
-   [apps.bbon.me](https://github.com/bbonkr/apps.bbon.me)

### 라이브러리

-   [kr.bbon.EntityFrameworkCore.Extensions](https://bbon.kr/kr-bbon-entityframeworkcore-extensions-package/)
-   [kr.bbon.AspNetCore](https://github.com/bbonkr/kr.bbon.AspNetCore)
-   [kr.bbon.Core](https://github.com/bbonkr/kr.bbon.Core)
-   [@bbon/react-calendar](https://github.com/bbonkr/react-calendar)

## 2022년에는

2020년 11월부터 계약해서 갱신을 반복하던 곳에서 2022년 04월까지 계약되어 협업을 진행하고 있습니다.

재미난 아이디어를 얻고, 계속 구현하고 공개하고 싶습니다.
