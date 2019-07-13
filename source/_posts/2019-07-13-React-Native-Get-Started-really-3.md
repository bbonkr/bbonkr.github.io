---
title: 'React Native Get Started really #3'
date: 2019-07-13 17:47:45
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
-   [시작하기 정말? #2](/2019/07/13/React-Native-Get-Started-really-2/)
-   시작하기 정말? #3 👈

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

이제 서랍장 형식으로 동작하는 메뉴를 작성하기 위해 [네비게이션](https://facebook.github.io/react-native/docs/navigation) 관련 패키지 추가하고 실행하니 또 문제가 발생합니다.

`react-native-gesture-handler` 패키지는 네이티브 코드가 포함되어 있습니다.
따라서 link 명령으로 해당 내용을 각 플랫폼 프로젝트에 추가되어야 합니다.

[페이지의 설명](https://facebook.github.io/react-native/docs/navigation)대로 아래 명령을 실행합니다.

```bash
$ react-native link react-native-gesture-handler
```

안드로이드 가상장치에서 확인하기 위해 실행합니다.

```bash
$ react-native run-android
react-native run-android
error React Native CLI uses autolinking for native dependencies, but the following modules are linked manually:
  - react-native-gesture-handler (to unlink run: "react-native unlink react-native-gesture-handler")
This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward, you can unlink this dependency via "react-native unlink <dependency>" and it will be included in your app automatically. If a library isn't compatible with autolinking, disregard this message and notify the library maintainers.
Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
info Starting JS server...
info Installing the app...

> Task :react-native-gesture-handler:compileDebugJavaWithJavac FAILED

Deprecated Gradle features were used in this build, making it incompatible with Gradle 6.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/5.4.1/userguide/command_line_interface.html#sec:command_line_warnings
14 actionable tasks: 2 executed, 12 up-to-date
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:3: error: package android.support.v4.util does not exist
import android.support.v4.util.Pools;
                              ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:19: error: package Pools does not exist
  private static final Pools.SynchronizedPool<RNGestureHandlerEvent> EVENTS_POOL =
                            ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerStateChangeEvent.java:3: error: package android.support.v4.util does not exist
import android.support.v4.util.Pools;
                              ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerStateChangeEvent.java:19: error: package Pools does not exist
  private static final Pools.SynchronizedPool<RNGestureHandlerStateChangeEvent> EVENTS_POOL =
                            ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:20: error: package Pools does not exist
          new Pools.SynchronizedPool<>(TOUCH_EVENTS_POOL_SIZE);
                   ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerStateChangeEvent.java:20: error: package Pools does not exist
          new Pools.SynchronizedPool<>(TOUCH_EVENTS_POOL_SIZE);
                   ^
Note: /Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerButtonViewManager.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
6 errors

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':react-native-gesture-handler:compileDebugJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 5s

error Failed to install the app. Make sure you have the Android development environment set up: https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment. Run CLI with --verbose flag for more details.
Error: Command failed: ./gradlew app:installDebug -PreactNativeDevServerPort=8081
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:3: error: package android.support.v4.util does not exist
import android.support.v4.util.Pools;
                              ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:19: error: package Pools does not exist
  private static final Pools.SynchronizedPool<RNGestureHandlerEvent> EVENTS_POOL =
                            ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerStateChangeEvent.java:3: error: package android.support.v4.util does not exist
import android.support.v4.util.Pools;
                              ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerStateChangeEvent.java:19: error: package Pools does not exist
  private static final Pools.SynchronizedPool<RNGestureHandlerStateChangeEvent> EVENTS_POOL =
                            ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerEvent.java:20: error: package Pools does not exist
          new Pools.SynchronizedPool<>(TOUCH_EVENTS_POOL_SIZE);
                   ^
/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerStateChangeEvent.java:20: error: package Pools does not exist
          new Pools.SynchronizedPool<>(TOUCH_EVENTS_POOL_SIZE);
                   ^
Note: /Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerButtonViewManager.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
6 errors

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':react-native-gesture-handler:compileDebugJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 5s

    at checkExecSyncError (child_process.js:625:11)
    at execFileSync (child_process.js:643:13)
    at runOnAllDevices (/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/@react-native-community/cli-platform-android/build/commands/runAndroid/runOnAllDevices.js:75:39)
    at buildAndRun (/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/@react-native-community/cli-platform-android/build/commands/runAndroid/index.js:137:41)
    at then.result (/Users/bbon/Repos/scoreboard-rn/ScoreBoard/node_modules/@react-native-community/cli-platform-android/build/commands/runAndroid/index.js:103:12)
    at processTicksAndRejections (internal/process/next_tick.js:81:5)
```

출력된 에러 메시지 관련 내용으로 검색된 [깃허브 이슈](https://github.com/kmagiera/react-native-gesture-handler/issues/510) 페이지에서 방법을 제시합니다.

[jetifier 패키지](https://www.npmjs.com/package/jetifier)를 설치하고, 실행합니다.

```bash
$ npm install jetifier
$ npx jetify
```

다시 link 명령을 실행합니다.

```
$ react-native link react-native-gesture-handler
```

이제 정상적으로 실행됩니다.

```bash
$ react-native run-android
```

iOS 가상장치에서도 빌드 문제가 발생해서, pod 으로 의존 패키지를 다시 설치하도록 한 후 실행합니다.

```bash
$ cd ios
$ pod install
$ cd ..
$ react-native run-ios
```

정상적으로 실행됩니다.

{% asset_img react-native-3-2019-07-12-001.png %}

{% asset_img react-native-3-2019-07-12-002.png %}

{% asset_img react-native-3-2019-07-12-003.png %}
