---
layout: post
title: "Move MySQL DataFiles"
description: "MySQL 데이터베이스 파일 이동"
category: Computing
tags: ["mysql", "database"]
---
{% include JB/setup %}


Windows OS에 MySQL 을 설치하고, 데이터 파일을 관리하는 위치를 변경하는 내용입니다.

## Stop MySQL Service

Services ~~Services.msc~~ 를 실행하고, MySQL 서비스를 찾아서 중지합니다.

## Modify ini

MySQL 설치 위치의 my.ini 파일을 텍스트 편집기로 열어서 아래와 같이 변경합니다.
아래 내용은 D:\Database\MySql\ 디렉터리에 데이터 파일을 관리하려고 하는 경우입니다.

원본
```
datadir="C:/ProgramData/MySQL/MySQL Server 5.5/Data/"
```

변경
```
datadir="D:/Database/MySql/"
```

## Move Data files
기본위치 : C:\ProgramData\MySQL\MySQL Server 5.5\Data\

변경할 위치로 데이터 파일을 이동합니다. 

## Start MySQL Service

Services ~~Services.msc~~를 실행하고, MySQL 서비스를 찾아서 시작합니다.