---
title: 'Review 2022'
date: 2022-12-31
categories:
    - story
    - blog
tags:
    - review
    - log
featuredImage:
---

<!-- post content here -->

2022년을 돌아봅니다.

## Tech Stacks

### .NET & React

제 경력의 큰 지분을 차지하는 기술들입니다.

문서를 지속적으로 확인하고, 새로운 기능, 변경되는 기능들을 따라가고 있습니다.

### Container

일부 백엔드 기능이 필요한 응용프로그램은 지속적으로 도커 이미지로 관리하고 있습니다.

[도커 레지스트리](https://hub.docker.com/_/registry) 이미지로 컨테이너를 실행해서 개인용 저장소로 사용하고 있었는데, 관리가 불편해서, [하버](https://goharbor.io) 컨테이너로 변경해서 관리하고 있습니다.

도커 레지스트리 대비 하버가 매우 편리합니다.

### CI/CD

깃허브 저장소의 코드 중 게시가 필요한 코드들은 빌드, 게시를 자동화하고 있습니다.

깃허브 액션의 워크플로우에서 깃 태그와 라이브러리 버전을 동기화하기 위해 버전 문자열을 찾고, 깃 태그가 존재하는지 확인하는 깃허브 액션을 작성해서 사용하고 있습니다.

-   [bbonkr/get-version-action](https://github.com/marketplace/actions/get-version-action)
-   [bbonkr/git-tag-check-action](https://github.com/marketplace/actions/git-tag-check-action)

### Unit test

깃허브 저장소에서 관리되는 코드에 가능하면 테스트 코드를 추가하고 있습니다.

## Story of 2022

### Gears

작년에 주문하고, 지난 1월에 도착한 맥북 프로를 매우 유용하게 사용하고 있습니다.

간혹 윈도우 환경이 필요한 경우에는 예전에 사용하던 씽크패드 랩탑을 활용해가며 업무, 취미를 진행했습니다.

### Work

지난 2019년부터 계약직으로 업무를 진행하던 곳에 근로계약을 요청드려 정규직으로 전환되었습니다.

계속 원격지에서 근무하고 있습니다.

재미난 일들을 진행했고, 백엔드 팀에서 퇴사하시는 분이 발생해서 재미없는 일도 때때로 진행하고 있습니다.

### Hobbies

애플 티비에서 할인하는 영화를 구매해서 시간 날때 보고, 또 보고 합니다.

-   [영화 목록](https://www.themoviedb.org/list/8233625?sort_by=primary_release_date.desc)

콘솔 게임기 **엑스박스**를 구입해서 할인하는 게임을 구매해서 저녁시간에 잔잔하게 즐기고 있습니다.

## Applications and Libraries

### Android

재미로 작성한 [안드로이드 앱](https://play.google.com/store/apps/details?id=kr.bbon.ScoreBoard)에 요구사항을 요청하시는 분이 계셔서 매우 곤란했습니다.

요청사항 중 도저히 이해할 수가 없는 두가지를 적용하지 못했습니다.

모바일 응용프로그램의 버전관리가 궁금해서 알파, 베타 테스트를 운영중이었는데, 공개 베타 테스트를 닫아야 할 것 같습니다.

### Maintenance

잔잔하게 다운로드 숫자가 유지되고 있어, 틈틈이 유지보수를 진행하고 있습니다.

Nuget packages:

-   [Nuget: kr.bbon.Core](https://www.nuget.org/packages/kr.bbon.Core)
    -   [GitHub: bbonkr/kr.bbon.Core](https://github.com/bbonkr/kr.bbon.Core)
-   [Nuget: kr.bbon.AspNetCore](https://www.nuget.org/packages/kr.bbon.AspNetCore)
    -   [GitHub: bbonkr/kr.bbon.AspNetCore](https://github.com/bbonkr/kr.bbon.AspNetCore)
-   [Nuget: kr.bbon.Xamarin.Forms](https://www.nuget.org/packages/kr.bbon.Xamarin.Forms)
    -   [GitHub: bbonkr/kr.bbon.Xamarin.Forms](https://github.com/bbonkr/kr.bbon.Xamarin.Forms)
-   [Nuget: kr.bbon.EntityFrameworkCore.Extensions](https://www.nuget.org/packages/kr.bbon.EntityFrameworkCore.Extensions)
    -   [GitHub: bbonkr/kr.bbon.EntityFrameworkCore.Extensions](https://github.com/bbonkr/kr.bbon.EntityFrameworkCore.Extensions)

NPM Packages:

-   [NPM: @bbon/formatter](https://www.npmjs.com/package/@bbon/formatter)
    -   [GitHub: bbonkr/bbon-formatter](https://github.com/bbonkr/bbon-formatter)
-   [NPM: @bbon/filedownload](https://www.npmjs.com/package/@bbon/filedownload)
    -   [GitHub: bbonkr/bbon-filedownload](https://github.com/bbonkr/bbon-filedownload)
-   [NPM: @bbon/react-calendar](https://www.npmjs.com/package/@bbon/react-calendar)
    -   [GitHub: bbonkr/react-calendar](https://github.com/bbonkr/react-calendar)

Visual Studio Code Extensions:

-   [New CS file](https://marketplace.visualstudio.com/items?itemName=bbonkr.kr-bbon-vscode-plugins-newcsfile)
    -   [GitHub: bbonkr/vscode-extensions-new-cs-file](https://github.com/bbonkr/vscode-extensions-new-cs-file)

GitHub Actions:

-   [bbonkr/get-version-action](https://github.com/marketplace/actions/get-version-action)
    -   [GitHub: bbonkr/get-version-action](https://github.com/bbonkr/get-version-action)
-   [bbonkr/git-tag-check-action](https://github.com/marketplace/actions/git-tag-check-action)
    -   [GitHub: bbonkr/git-tag-check-action](https://github.com/bbonkr/git-tag-check-action)

## In 2023

...
