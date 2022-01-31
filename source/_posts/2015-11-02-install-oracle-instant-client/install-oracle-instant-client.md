---
title: "Install Oracle Instant Client"
date: 2015-11-02
intro: "Install and Configure Oracle Instant Client"
categories: 
    - Computing
tags:
    - oracle
    - database
    - dev
comments: false
---

## 파일 다운로드

[Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html) 페이지에서 설치할 대상 OS 및 아키텍쳐가 기술된 링크를 클릭해서 아래 항목을 다운로드 받습니다.

-   Instant Client Package - Basic
-   Instant Client Package - SQL\*Plus

## 설치

다운로드 받은 파일의 압축을 해제한 후 원하는 디렉터리로 복사/이동합니다.

설명을 위해 `D:\Oracle\InstantClient` 디렉터리에 압축을 해제한 것으로 합니다.

## 설정

### 시스템 변수

시스템 > 고급 시스템 설정 을 클릭하여 시스템 속성창을 실행합니다.

시스템 속성창의 고급 탭 아래쪽의 환경 변수를 클릭하여 환경 변수창을 실행합니다.

시스템 변수에 새로 만들기 버튼을 클릭해서 아래 항목을 추가합니다.

변수 이름: ORACLE_HOME

변수 값: D:\Oracle\InstantClient

변수 이름: TNS_ADMIN

변수 값: D:\Oracle\InstantClient

변수 이름: NLS_LANG

변수 값: KOREAN_KOREA.KO16MSWIN949

시스템 변수 중 이미 존재하는 Path 변수를 선택하고 편집 버튼을 클릭하여 아래 항목을 추가합니다.

기존 값은 그대로 두고 기존 값 뒤에 추가합니다.

변수 이름: Path
변수 값: <기존값은 유지>;D:\Oracle\InstantClient

### TNS Name

텍스트 편집기를 실행하고 아래 내용을 입력한 후 파일이름을 tnsnames.ora 로 변경한 후 Instant Client 디렉터리(D:\Oracle\InstantClient\tnsnames.ora)로 저장합니다.

```ini
<ALIAS> =
 (DESCRIPTION =
   (ADDRESS = (PROTOCOL = TCP)(HOST = <ServerHostName or Server IP>)(PORT = <Oracle Port Number>))
   (CONNECT_DATA =
     (SERVER = DEDICATED)
     (<SERVICE_NAME or SID> = <Service_Name or sid 실제값>)
   )
)
```

-   ALIAS: 접속시 사용할 별칭입니다.
-   ServerHostName or Server IP: Oracle Database 서버 정보와 동일하게 입력합니다.
-   Oracle Port Number: Oracle Database Listener 의 대기 포트를 입력합니다. (기본값: 1521)
-   SERVICE_NAME orSID: Oracle Database 서버 정보와 동일하게 입력합니다. 서버가 SERVICE_NAME 이면 SERVICE_NAME, 서버가 SID 이면 SID 를 입력합니다.
-   Service_Name or sid 실제값: Oracle Database 서버 정보와 동일하게 입력합니다. SERVICE_NAME 혹은 SID 실제 값을 입력합니다.

## 확인

시스템 변수 값이 적용될 수 있도록 서버를 재시작합니다.

D:\Oracle\InstantClient 디렉터리에 Instant Client Package - SQL\*Plus 압축 파일의 내용까지 복사/이동한 상태라면 명령 프롬프트(CMD)를 실행하고, Instant Client 가 존재하는 디렉터리로 이동합니다.

```dos
c:\> d:
d:\> cd \Oracle\InstantClient
d:\Oracle\InstantClient\> sqlplus userid/password@sid
```

userid 와 password, sid 부분을 실제 사용하는 값으로 치환하여 sqlplus 로 연결을 시도하면 연결 성공 혹은 실패시 에러 코드를 알 수 있습니다.
