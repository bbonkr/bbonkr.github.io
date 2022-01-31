---
title: Update your apps to be 64-bit compliant by 2019-08-01
date: 2019-07-10 17:48:22
categories:
- HowTo
tags:
- xamarin
- android
- google play
intro:
comments:
---

> Google Play Store 에 게시되는 앱은 2019-08-01 까지 64비트 호환으로 업데이트되어야 합니다.

유사한 제목으로 전자우편을 받았습니다.

[CPU 아키텍쳐](https://docs.microsoft.com/ko-kr/xamarin/android/app-fundamentals/cpu-architectures?tabs=windows&WT.mc_id=docs-forums-jamont) 페이지에서 지원되는 아키텍쳐를 지정하는 방법을 확인할 수 있습니다.

[ABI 관련 APK 빌드](https://docs.microsoft.com/ko-kr/xamarin/android/deploy-test/building-apps/abi-specific-apks) 페이지에서 지원 아키텍쳐 별 바이너리를 작성하기 위한 방법을 확인할 수 있습니다.

2019-08-01 까지 64비트 지원 안드로이드 응용프로그램을 준비하기 위한 방법에 대한 자세한 설명은 [Preparing Android Apps for Google Play's 64-bit Requirements](https://devblogs.microsoft.com/xamarin/64-bit-requirements-xamarin-android-apps/) 페이지에서 확인할 수 있습니다.

아래 내용은 [Preparing Android Apps for Google Play's 64-bit Requirements](https://devblogs.microsoft.com/xamarin/64-bit-requirements-xamarin-android-apps/) 페이지의 내용을 간략하게 소개합니다.

## 변경

Xamarin.Android 는 4가지의 ABI를 지원합니다.

\*[ABI]: Application Binary Interface

-   armeabi-v7a
-   arm64-v8a
-   x86
-   x86_64

Xamarin 으로 작성된 앱은 64비트 호환으로 업데이트하기 위해 빌드 속성을 바꿔야 합니다.

### Visual Studio 2019

안드로이드 프로젝트의 속성창을 열고, 안드로이드 옵션 탭으로 이동합니다.

아래쪽의 고급 <small>Advanced</small> 버튼을 클릭하면 고급 설정창이 열립니다.

지원 아키텍쳐에 아래 두 항목이 선택되어야 합니다.

-   armeabi-v7a
-   arm64-v8a

{% asset_img vs2019-android-x64.png %}

### Visual Studio 2019 for Mac

안드로이드 프로젝트 속성창을 열고, 안드로이드 빌드 페이지로 이동합니다.

고급탭의 지원되는 ABI 목록에서 아래 두 항목이 선택되어야 합니다.

-   armeabi-v7a
-   arm64-v8a

{% asset_img vs2019forMac-android-x64.png %}

## 빌드

빌드 구성을 **Release**로 선택하고 빌드한 후 아카이브를 작성합니다.

## 확인

Android Studio 의 APK Analizer 도구를 사용해서 64비트 라이브러리가 포함되어 빌드되었는지 확인할 수 있습니다.

> [앱에서 64비트 기기를 지원하는지 확인](https://developer.android.com/distribute/best-practices/develop/64-bit?hl=ko) 페이지의 내용을 참조

APK Analyzer 도구를 실행하고 아카이브된 APK 파일을 선택합니다.

잠시후 아래와 같은 화면을 확인할 수 있습니다.

{% asset_img scoreboard.png %}

오른쪽 창의 lib 에 arm64-v8a 관련 내용이 보이면 64비트 지원 앱으로 판단하시면 됩니다.

## 주의

프로젝트에서 참조된 외부 라이브러리 관련 내용이 포함되어 있는지 확인해야 합니다.

필요한 내용이 보이지 않으면 외부 라이브러리가 64비트를 지원하는지 확인하고 지원하지 않으면 해결방안을 찾아야 합니다.
