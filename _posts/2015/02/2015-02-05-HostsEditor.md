---
layout: post
title: "HostsEditor"
description: "HostsEditor"
category: Repositories
tags: [
    "c#",
    "app",
    "csharp",
    ".net",
    "windows-forms",
    "github"
    ]
---

{% include JB/setup %}

## 개요
Windows 의 Hosts 파일을 편집하는 응용 프로그램입니다.

메모장(Notepad.exe) 프로그램을 찾아서 관리자 권한으로 실행하고, 파일 메뉴의 열기 명령으로 파일 선택창을 열고 %windir%\system32\drivers\etc\hosts 파일을 선택하는게 귀찮아서 시작된 프로젝트입니다.

## 시스템 요구사항
* Windows OS
* .Net Framework 4.0

Windows 7인 경우 .Net Framework 4.0설치 필요, Windows 8 이후 OS인 경우 그냥 실행.

## 사용법
프로그램을 실행하면 권한 상승을 위해 관리자 권한으로 실행창이 열리고 허용하면 프로그램이 시작됩니다.
프로그램이 열렸으면 이미 편집하기 위한 Hosts 파일의 내용이 텍스트박스에 보여집니다.

**편집**하고, **저장**! **끝**!

<!--
## 다운로드

가능하면 본인이 직접 빌드해서 사용하십시오.
[GitHub](https://github.com/bbonkr/HostsEditor)에서 소스코드를 확인하실 수 있습니다.

빌드가 귀찮으시면 [다운로드](https://github.com/bbonkr/HostsEditor/tree/master/deploy/deploy.zip) 하여 사용하십시오.
-->


{% include JB/github_buttons user="bbonkr" repo="HostsEditor" %}
