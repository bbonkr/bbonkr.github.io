---
layout: post
title: "Windows 10 사진 앱 실행불가"
description: "Windows 10 사진 앱 실행불가"
category: Computing
tags: ["windows", "windows-10", "app", "error"]
---
{% include JB/setup %}


Windows 10 사진 앱을 실행하면, 원격 프로시저를 호출하지 못했습니다 에러가 발생하며 사진 앱이 종료되어 버려 이미지를 확인할 수 없습니다.

## 사진 앱 오류

이미지 파일들이 기본적으로 사진앱으로 보여지게 설정되어져 있습니다.
그런데, 언제부터인지 이미지 파일을 열어보기 힘들어졌습니다. 사진앱이 시작되다 원격 프로시저 호출시 오류가 발생합니다.

아래 이미지와 같은 순으로 동작하다 오류가 발생하면서 종료되어 버립니다.

![사진앱 시작](/images/2015/09/04/windows-10-media-pack/p-001.png)

![오류발생](/images/2015/09/04/windows-10-media-pack/p-002.png)

관련 문제의 해결방법을 검색해보니, 미디어 기능팩을 설치하라고 합니다.

제가 사용중인 Windows 10은 Windows 10 Enterprise N 에디션이라고 되어있습니다.

> `설정` > `시스템` > `정보` 화면에서 확인할 수 있습니다.

## Windows 10 N 및 KN 버전을 위한 미디어 기능 팩

Windows 10 N 및 Windows 10 KN Edition은 Windows Media Player와 관련 기술을 제외하고 Windows 10과 동일한 기능을 포함합니다.

최종 사용자 고객은 Windows 10 N 및 KN 버전을 위한 미디어 기능 팩(KB3010081)을 설치하여 미디어 기능을 정상적으로 활성화할 수 있습니다.

이 기능 팩은 Windows 10 N 또는 Windows 10 KN Edition을 실행하는 컴퓨터에 적용할 수 있습니다.

**[다운로드 페이지](https://www.microsoft.com/ko-kr/download/details.aspx?id=48231)**에서 다운로드 받을 수 있습니다.

## 지원되는 운영 체제

Windows 10

* Windows 10 Home N
* Windows 10 Pro N
* Windows 10 Education N
* Windows 10 Enterprise N
* Windows 10 Enterprise N Evaluation
* Windows 10 Enterprise N 2015 LTSB
* Windows 10 Enterprise N 2015 LTSB Evaluation 또는 Windows 10 Home KN
* Windows 10 Pro KN
* Windows 10 Education KN
* Windows 10 Enterprise KN
* Windows 10 Enterprise KN Evaluation
* Windows 10 Enterprise KN 2015 LTSB
* Windows 10 Enterprise KN 2015 LTSB Evaluation

## 미디어 관련 앱의 실행

미디어 기능 팩을 설치하면 사진앱과 Groove 음악, Movies & TV 앱도 정상적으로 실행됩니다.