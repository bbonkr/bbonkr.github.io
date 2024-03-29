---
title: MariaDB 를 빠르게 설치
date: 2019-02-24 20:44:52
categories:
  - Computing
tags:
  - docker
  - mariadb
intro:
comments:
---

## 도커 Docker

[Docker](https://www.docker.com/)는 컨테이너를 사용해 애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있는 소프트웨어 플랫폼입니다.

저는 개발 환경을 준비하기 위해 도커 <small>Docker</small>를 활용하고 있습니다.

## 도커 설치

[설치 파일](https://hub.docker.com/editions/community/docker-ce-desktop-windows)을 내려받아 설치합니다. 링크는 윈도우즈에서 도커를 사용하기 위해 필요합니다.

## 이미지 검색

MariaDB 이미지를 검색합니다.

```powershell
PS> docker search mariadb
NAME                                                      DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mariadb                                                   MariaDB is a community-developed fork of MyS…   2596                [OK]
bitnami/mariadb                                           Bitnami MariaDB Docker Image                    86                                      [OK]
linuxserver/mariadb                                       A Mariadb container, brought to you by Linux…   59
toughiq/mariadb-cluster                                   Dockerized Automated MariaDB Galera Cluster …   37                                      [OK]
```

## 이미지 다운로드

공식 이미지를 다운로드합니다.

```powershell
PS> docker pull mariadb
```

## 컨테이너 실행

다운로드 받은 이미지로 컨테이너를 실행합니다.

> 컨테이너 실행 인수와 환경변수는 [docker hub mariadb](https://hub.docker.com/_/mariadb)에서 확인할 수 있습니다.

## docker-compose

docker-compose를 사용하면 컨테이너 실행시 복잡하게 입력해야 하는 인수를 미리 준비하고 컨테이너 실행, 중지, 제거 절차를 손쉽게 처리할 수 있습니다.

적당한 디렉터리에 docker-compose.yml 파일을 아래의 내용으로 작성합니다.

사용자 프로필 디렉터리에 docker 디렉터리를 만들고 컨테이너 이름에 해당하는 mariadb 디렉터리를 만들었습니다.
그 안에 config, data 디렉터리를 추가했습니다.
docker-compose.yml 파일은 mariadb 디렉터리에 있습니다.

사용자 프로필 디렉터리는 윈도우즈 탐색기를 열고 주소창에 %userprofile% 을 입력하면 바로 이동할 수 있습니다.

```powershell
PS> tree .
C:\USERS\{username}\DOCKER
└─mariadb
├─config
└─data
```

docker-compose.yml 파일의 내용입니다.

```yml
version: "3.1"

services:
  db:
    container_name: mariadb
    image: mariadb:latest
    restart: always
    ports:
      - 3306:3306
    volumes:
      - /c/Users/{username}/docker/mariadb/data:/var/lib/mysql
      - /c/Users/{username}/docker/mariadb/config:/etc/mysql/conf.d
    environment:
      MYSQL_ROOT_PASSWORD: { password }
      TZ: Asia/Seoul
```

> {username}: 윈도우즈 사용자 계정이름으로 변경이 필요합니다.
> {password}: mariadb root 계정의 비밀번호로 변경이 필요합니다. (원하는 값으로 변경합니다.)

mariadb/config 디렉터리에는 미리 구성한 cnf 파일을 추가합니다.

제가 사용하는 문자셋과 정렬을 구성한 mariadb.cnf 파일의 내용은 아래와 같습니다.

```ini
# MariaDB-specific config file.
# Read by /etc/mysql/my.cnf

[client]
# Default is Latin1, if you need UTF-8 set this (also in server section)
#default-character-set = utf8
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
#
# * Character sets
#
# Default is Latin1, if you need UTF-8 set all this (also in client section)
#
#character-set-server  = utf8
#collation-server      = utf8_general_ci
#character_set_server   = utf8
#collation_server       = utf8_general_ci
# Import all .cnf files from configuration directory
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

!includedir /etc/mysql/mariadb.conf.d/
```

docker-compose.yml 파일을 작성했으면, 해당 파일이 있는 위치에서 아래 명령으로 컨테이너는 작성하고 실행합니다.

```powershell
PS> docker-compose up -d
```

컨테이너 상태를 확인하려면 ps 명령을 사용합니다.

```powershell
PS> docker-compose ps
The system cannot find the path specified.
 Name               Command             State           Ports
----------------------------------------------------------------------
mariadb   docker-entrypoint.sh mysqld   Up      0.0.0.0:3306->3306/tcp
```

컨테이너를 중지하려면 stop 명령을 사용합니다.

```powershell
PS> docker-compose stop
```

컨테이너를 시작하려면 start 명령을 사용합니다.

```powershell
PS> docker-compose start
```

컨테이너를 제거하려면 down 명령을 사용합니다.

```powershell
ps> docker-compose down
```
