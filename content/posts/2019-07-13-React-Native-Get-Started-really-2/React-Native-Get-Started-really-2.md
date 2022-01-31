---
title: 'React Native Get Started really #2'
date: 2019-07-13 17:47:19
categories:
- HowTo
tags:
- react-native
- rn
intro:
comments:
---

[React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started) 페이지의 내용을 따라하면서 발생한 문제들입니다.

-   [시작하기 정말? #1](/2019/07/13/React-Native-Get-Started-really-1/)
-   시작하기 정말? #2 👈
-   [시작하기 정말? #3](/2019/07/13/React-Native-Get-Started-really-3/)

기본적인 설치 및 구성은 페이지를 보며 진행했습니다.

저의 환경은 macOS 10.14.5 입니다.

Expo 는 사용하지 않고, React Native CLI 로 프로젝트를 스캐폴딩했습니다.

Node, XCode, Android Studio 가 설치되어 있습니다.

-   Node v11.7.0
-   npm v6.5.0
-   Xcode v10.2.1 (10E1001), XCode command line tools installed
-   Android Studio v3.4, Android SDK installed

Xamarin 으로 작성된 모바일 응용프로그램을 React Native 로 재작성하기 위해 프로젝트를 만들었습니다.

```bash
$ react-native init ScoreBoard
```

보통은 스캐폴딩된 프로젝트가 바로 실행이 가능하니, 바로 실행해 봤습니다.

```bash
$ react-native run-android
info Starting JS server...
info Installing the app...

> Configure project :app
File /Users/bbon/.android/repositories.cfg could not be loaded.
Checking the license for package Android SDK Build-Tools 28.0.3 in /Users/bbon/Library/Developer/Xamarin/android-sdk-macosx/licenses
Warning: License for package Android SDK Build-Tools 28.0.3 not accepted.

FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':app'.
> Failed to install the following Android SDK packages as some licences have not been accepted.
     build-tools;28.0.3 Android SDK Build-Tools 28.0.3
  To build this project, accept the SDK license agreements and install the missing components using the Android Studio SDK Manager.
  Alternatively, to transfer the license agreements from one workstation to another, see http://d.android.com/r/studio-ui/export-licenses.html

  Using Android SDK: /Users/bbon/Library/Developer/Xamarin/android-sdk-macosx

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 10s

error Failed to install the app. Please accept all necessary SDK licenses using SDK Manager: "$ANDROID_HOME/tools/bin/sdkmanager --licenses". Run CLI with --verbose flag for more details.
Error: Command failed: ./gradlew app:installDebug -PreactNativeDevServerPort=8081

FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':app'.
> Failed to install the following Android SDK packages as some licences have not been accepted.
     build-tools;28.0.3 Android SDK Build-Tools 28.0.3
  To build this project, accept the SDK license agreements and install the missing components using the Android Studio SDK Manager.
  Alternatively, to transfer the license agreements from one workstation to another, see http://d.android.com/r/studio-ui/export-licenses.html

  Using Android SDK: /Users/bbon/Library/Developer/Xamarin/android-sdk-macosx

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 10s

    at checkExecSyncError (child_process.js:625:11)
    at execFileSync (child_process.js:643:13)
    at runOnAllDevices (/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/@react-native-community/cli-platform-android/build/commands/runAndroid/runOnAllDevices.js:75:39)
    at buildAndRun (/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/@react-native-community/cli-platform-android/build/commands/runAndroid/index.js:137:41)
    at then.result (/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/@react-native-community/cli-platform-android/build/commands/runAndroid/index.js:103:12)
    at processTicksAndRejections (internal/process/next_tick.js:81:5)

```

Android Studio 를 설치하고 실행하지 않아 안드로이드 SDK 라이선스 사용에 대한 동의를 하지 않아 발생한 문제로 보여집니다.

아래 명령으로 안드로이드 SDK 라이선스 사용 동의를 진행할 수 있습니다.

```bash
$ $ANDROID_HOME/tools/bin/sdkmanager --licenses
```

이후 정상적으로 실행이 가능합니다.

```bash
$ react-native run-android
```
