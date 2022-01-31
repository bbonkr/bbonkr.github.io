---
title: PowerShell Core
date: 2019-06-01 21:17:23
categories: 
    - HowTo

tags: 
    - powershell
    - microsoft
intro:
comments:
---

작업을 시작하기 위해 파워쉘을 열었는데, 평소와는 다른 메시지가 출력됩니다.

```powershell
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Try the new cross-platform PowerShell https://aka.ms/pscore6
```

궁금해서 [https://aka.ms/pscore6](https://aka.ms/pscore6) 링크로 이동하니 [다양한 버전의 PowerShell 설치 <small>Installing various versions of PowerShell</small>](https://docs.microsoft.com/ko-kr/powershell/scripting/install/installing-powershell?view=powershell-6#powershell-core) 페이지가 열립니다.

페이지 아래쪽에 PowerShell Core 라는 제목이 보이고 아래와 같은 링크들이 있습니다.

-   [Installing PowerShell Core on Windows](https://docs.microsoft.com/ko-kr/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-6)
-   [Installing PowerShell Core on Linux](https://docs.microsoft.com/ko-kr/powershell/scripting/install/installing-powershell-core-on-linux?view=powershell-6)
-   [Installing PowerShell Core on macOS](https://docs.microsoft.com/ko-kr/powershell/scripting/install/installing-powershell-core-on-macos?view=powershell-6)
-   [Installing PowerShell Core on ARM](https://docs.microsoft.com/ko-kr/powershell/scripting/install/powershell-core-on-arm?view=powershell-6)

파워쉘은 Windows 에서만 사용할 수 있었는데, 이제 다른 OS에서도 파워쉘을 사용할 수 있습니다.

[GitHub](https://github.com/powershell/powershell) 에서 코드를 공개하고 있습니다.

## 설치

### Windows 10

[GitHub 출시 <small>Release</small> 페이지](https://github.com/PowerShell/PowerShell/releases/latest) 에서 설치 파일을 다운로드할 수 있습니다.

### Linux

[GitHub 출시 <small>Release</small> 페이지](https://github.com/PowerShell/PowerShell/releases/latest) 에서 설치 파일을 다운로드할 수 있고, 편리하게 패키지 관리자로 설치할 수 있습니다.

Ubuntu, Debian 에서

```bash
$ sudo apt-get install powershell
```

CentOS, RedHat 에서

```bash
$ sudo yum install powershell
```

Fedora 에서

```bash
$ sudo dnf install powershell
```

### macOS

[GitHub 출시 Release 페이지](https://github.com/PowerShell/PowerShell/releases/latest) 에서 설치 파일을 다운로드할 수 있고, 편리하게 패키지 관리자로 설치할 수 있습니다.

```bash
$ brew cask install powershell
```

### ARM

[Windows IoT](https://docs.microsoft.com/ko-kr/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-6#deploying-on-windows-iot) 와 [Raspbian](https://docs.microsoft.com/ko-kr/powershell/scripting/install/installing-powershell-core-on-linux?view=powershell-6#raspbian) 에서 설치하는 방법이 설명되어 있습니다.

## 실행

설치하면서 환경변수 PATH 에 설치되는 위치가 추가되므로 자주 사용하는 터미널 응용프로그램을 열고 `PWSH` 명령으로 PowerShell Core 를 실행할 수 있습니다.

시작메뉴에서 검색하면 PowerShell 6 으로 찾을 수 있습니다.

{% asset_img 2019-06-01-powershell-core-004.png %}

## 사용

Windows 10 에서 설치를 진행합니다.

[GitHub 출시 페이지](https://github.com/PowerShell/PowerShell/releases/latest) 에서 PowerShell-6.2.1-win-x64.msi 파일을 다운로드하고 실행하면 간단하게 설치됩니다.

설치 마법사에서 아래와 같이 환경변수에 설치 경로 추가 등의 항목을 선택하면 간단하게 편리한 환경을 구성할 수 있습니다.

{% asset_img 2019-06-01-powershell-core-001.png %}

윈도우 파워쉘과 유사한 아이콘이 사용됩니다.

{% asset_img 2019-06-01-powershell-core-002.png %}

터미널을 열고 PWSH 명령으로 PowerShell Core 를 실행하고, PowerShell 명령으로 Windows PowerShell을 실행할 수 있습니다.

{% asset_img 2019-06-01-powershell-core-003.png %}

## Visual Studio Code Terminal

Visual Studio Code 에서 기본 터미널로 설정하기 위해서 설정창을 열고 <kbd>Ctrl</kbd> + <kbd>,</kbd> 검색창에 terminal 을 입력한 후 `Terminal > Integrated > Env:Windows` 항목을 찾습니다.

{% asset_img 2019-06-01-powershell-core-005.png %}

아래쪽의 Edit in settings.json 링크를 클릭해서 설정 파일을 열고, `terminal.integrated.shell.windows` 의 값을 PowerShell Core 실행파일의 전체 경로로 변경합니다.

{% asset_img 2019-06-01-powershell-core-006.png %}

```json
"terminal.integrated.shell.windows": "C:\\Program Files\\PowerShell\\6\\pwsh.exe"
```

이제 Visual Studio Code 에서 터미널을 열면 <kbd>Ctrl</kbd> + <kbd>`</kbd> 터미널에서 PowerShell Core 가 사용됩니다.

{% asset_img 2019-06-01-powershell-core-007.png %}
