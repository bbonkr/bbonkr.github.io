---
title: Visual Studio 2017 RC 설치
date: 2016-12-07
intro: Visual Studio 2017 RC 오프라인 설치본 만들기
categories: Computing
tags:
    - visual studio
    - vs
    - ide
    - microsoft
comments: false
---

다운로드 페이지에서 온라인 설치 파일을 내려받습니다.
<small>이 문서에서는 Enterprise 에디션을 내려받아 진행합니다.</small>

## 오프라인 설치파일 준비

명령 프롬프트를 열고, 온라인 설치 파일을 실행하면서 **layout** 옵션을 추가해서 실행합니다.

```powershell
PS C:\downloads\> vs_enterprise.exe --layout c:\downloads\vs2017rc
```

> -   layout 옵션의 매개변수인 오프라인 설치파일 다운로드 경로는 상대경로를 지원하지 않습니다. (2016-12-07 현재)
> -   오프라인 설치본을 만들때, Android SDK 가 포함되지 않습니다. (2016-12-07 현재)

오프라인 설치본에 포함할 언어를 제한하기 위해서 **lang** 옵션을 사용합니다.

영문만 포함하려면 아래와 같이 --lang en-US 옵션을 추가합니다.

```powershell
PS C:\downloads\> vs_enterprise.exe --layout c:\downloads\vs2017rc --lang en-US
```

여러가지 언어를 포함하려면 아래와 같이 --lang 옵션의 매개변수에 포함할 언어의 ISO 코드를 추가합니다.

```powershell
PS C:\downloads\> vs_enterprise.exe --layout c:\downloads\vs2017rc --lang en-US ko-KR ja-JP
```

## 설치

오프라인 설치본이 다운로드된 디렉터리의 내용중 Certificates 디렉터리로 이동합니다.

디렉터리의 인증서 파일을 모두 설치합니다.
(윈도우 탐색기에서 인증서 파일을 선택하고, 마우스 오른쪽 버튼을 클릭하여 메뉴를 열고 설치 항목을 선택합니다.)

그 후, 오프라인 설치본이 다운로드된 디렉터리의 vs_enterprise.exe 파일을 실행합니다.

## 업데이트

업데이트가 가능한 시점이 되었을 때, 이미 만들어둔 오프라인 설치본이 있는 경로를 대상으로 다시 오프라인 설치본 만들기 명령을 실행합니다.

```
PS C:\downloads\> vs_enterprise.exe --layout c:\downloads\vs2017rc
```

## 관련 페이지

-   [Visual Studio 문서](https://docs.microsoft.com/ko-kr/visualstudio/welcome-to-visual-studio)
-   [Visual Studio 온라인 설치 파일의 명령 프롬프트 매개변수](https://docs.microsoft.com/ko-kr/visualstudio/install/use-command-line-parameters-to-install-visual-studio)
-   [Visual Studio 오프라인 설치본 만들기](https://docs.microsoft.com/ko-kr/visualstudio/install/create-an-offline-installation-of-visual-studio)
