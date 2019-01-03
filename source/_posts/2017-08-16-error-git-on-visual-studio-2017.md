---
title: "Visual Studio 2017 에서 원격 저장소로 푸시 중 오류 발생"
date: 2017-08-16
intro: "Visual Studio 2017 에서 원격 저장소로 푸시 중 오류 발생"
tags:
    - .net
    - git
    - troubleshooting
    - visualstudio
categories: Computing
comments: false
---

Visual Studio 2017 에서 원격 저장소를 대상으로 **push** 명령을 실행하면, 아래와 유사한 오류가 발생합니다.

{% asset_img error-git-visual-studio-2017-001.png %}

아래와 유사한 내용을 출력창에서 확인할 수 있습니다.

> <span class="text-danger">Error encountered while pushing to the remote repository: Git failed with a fatal error.</span>
> PushCommand.ExecutePushCommand

커뮤니티에서는 Visual Studio 확장 중 Git for Windows 에 포함된 Git core 에 openSSL 관련 파일이 원인으로 추정되고 있습니다.

## 해결방법

Visual Studio 2017 이 설치된 디렉터리로 이동합니다.

`[Visual Studio 2017 디렉터리]\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\mingw32\bin` 디렉터리에 있는 **libeay32.dll**, **ssleay32.dll** 파일을 `[Visual Studio 2017 디렉터리]\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\mingw32\libexec\git-core` 디렉터리로 복사합니다.

그 후 Visual Studio 2017 에서 커밋을 만들고, 원격 저장소로 전송합니다.

### Visual Studio 2017 Enterprise 의 경우 예제

1. 윈도우 탐색기를 열고, `C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\mingw32\bin` 디렉터리로 이동합니다.
2. 아래 두 파일을 선택하고 복사합니다.
    1. **libeay32.dll**
    2. **ssleay32.dll**
3. `C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\mingw32\libexec\git-core` 디렉터리로 이동합니다.
4. 붙여넣기합니다.
