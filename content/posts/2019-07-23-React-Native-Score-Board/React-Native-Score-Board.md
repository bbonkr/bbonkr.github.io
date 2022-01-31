---
title: 회고 React Native Score Board
date: 2019-07-23 22:07:08
categories:
- Project
tags:
- react-native
- redux
- redux-saga
- android
- ios
- xamarin
intro:
comments:
---

[React Native](https://facebook.github.io/react-native/)로 자바스크립트와 [리액트](https://reactjs.org/)로 모바일 응용프로그램을 작성할 수 있습니다.

최근 0.60 버전의 변경점

-   AndroidX 지원
-   CocoaPods 통합
-   패키지의 자동 링크

## 개요

Xamarin 으로 작성했던 [너와 나의 점수판 Score Board](https://play.google.com/store/apps/details?id=kr.bbon.ScoreBoard) 모바일 응용프로그램을 React Native 로 다시 작성했습니다.

[GitHub: scoreboard](https://github.com/bbonkr/scoreboard) 저장소에서 코드를 확인할 수 있습니다.

가상장치에서 실행한 화면을 [공유](https://github.com/bbonkr/scoreboard/blob/master/README.md)합니다.

## 회고

코드를 작성하면서 가장 힘들었던 부분은 npm 패키지 중 플랫폼별 코드가 포함된 패키지의 링크입니다.

0.60 이후 버전에 추가된 패키지 자동링크 기능이 잘 동작하도록 정리된 패키지는 문제가 없는데, 아직 적용전이거나, 적용중인 패키지는 링크 명령으로 구성 반영이 잘 되지 않아 직접해야 하는 경우가 있습니다.

다행히 대부분 패키지에서 문서를 잘 제공해줍니다.

AndroidX 지원 때문인지 링크 명령으로 구성을 적용한 후 마이그레이션을 직접해야 하는 경우도 있습니다.

> [npm jetifier](https://www.npmjs.com/package/jetifier) 패키지로 편리하게 처리할 수 있습니다.

UI는 리액트로 작성합니다. 매우 빠르게 작성이 가능하지만 flex 로 구성하는 레이아웃은 생각을 많이 해야 합니다.

> 함수형 컴포넌트, Hooks API를 지원합니다.

Hot Loading은 화면을 작성하면서 바로 확인이 가능해서 매우 편리합니다.

> Xamarin 에서 제공될 기능도 매우 기대됩니다.
> [Announcing XAML Hot Reload for Xamarin.Forms](https://devblogs.microsoft.com/xamarin/xaml-hot-reload/)

저에게는 React Native 보다 Xamarin.Forms 가 빠르게 원하는 기능 구현이 가능하다고 생각됩니다.
