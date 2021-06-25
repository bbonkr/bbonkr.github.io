---
title: Migrate web apps to container
date: 2020-11-23 20:17:47
categories:
    - Log
tags:
    - docker
    - aws
    - lightsail
    - log
    - review
intro:
comments:
---

## 개요

AWS Lightsail 에서 실행되고 있는 두개의 웹 응용프로그램이 있습니다.

-   1 vCPU 프로세싱
-   512MB 메모리
-   20GB SSD 스토리지
-   3.5 USD 월별요금
-   1TB 전송
-   OS: Ubuntu 16.04

두 개의 웹 응용프로그램은 PHP 를 사용하고, nginx 를 사용해서 서비스되고 있습니다.

혹시나 다른 서버로 이전하게 될 수도 있고, 관리도 힘들어서 구성을 코드화하고 싶어졌습니다.

그래서, 두 응용프로그램을 컨테이너에서 실행될 수 있는 환경으로 이전했습니다.

Lightsail 에 새로운 인스턴스를 만들고, Docker를 설치하고, docker-compose 로 구성 내용을 관리하도록 이전했습니다.

-   1 vCPU
-   1GB 메모리
-   30GB SSD 스토리지
-   5.0 USD 월별요금
-   2TB 전송
-   OS: Ubuntu 20.04

## 계획


{% asset_img aws-lightsail-container.png %}

## 구현

호스트 `80`, `443` 포트는 nginx 컨테이너에 연결됩니다.

DBMS 와 두 web app은 호스트 장치에 포트를 연결하지 않고, 컨테이너 내부에서만 접근할 수 있도록 `EXPOSE` 명령으로 구성합니다.

도커 네트워크를 만들어서 사용합니다.

nginx 에서 리버스 프록시 연결을 위한 네트워크와 web app 에서 DBMS 접근을 위한 네트워크를 분리하려고 했으나, 복잡해지는 것 같아 내부 네트워크는 하나만 사용하도록 구성합니다.

### docker network

도커 네트워크를 작성합니다. 컨테이너는 작성된 네트워크로 연결됩니다.

```bash
$ docker network create <name of network>
```

> bridge 네트워크가 사용됩니다.

### nginx

GUI 환경에서 관리할 수 있는 [Nginx Proxy Manager](https://nginxproxymanager.com/) 를 사용합니다.

이제, 편리하게 GUI 환경에서 리버스 프록시를 관리할 수 있습니다.

docker-compose.yml 파일을 작성해서 구성을 코드화합니다.

### DBMS

docker-compose.yml 파일을 작성해서 구성을 코드화합니다.

볼륨을 연결해서 데이터베이스 파일이 유지됩니다.

### web apps

docker-compose.yml 파일을 작성해서 구성을 코드화하고, 볼륨을 연결해서 필요한 파일을 호스트에서 접근할 수 있고, 파일들이 컨테이너 외부에서 관리되어 계속 유지됩니다.

## 완료

[Nginx Proxy Manager](https://nginxproxymanager.com/) 를 사용하면 도메인을 연결하고, 리버스 프록시 구성시 [Let's Encrypt](https://letsencrypt.org/) 에서 인증서를 간편하게 구성하고, 재발행이 자동화되어 편리합니다.

이제, 필요한 구성이 코드화되고, 필요한 파일은 호스트에서 확인할 수 있으므로 서버 이전을 매우 편리하게 진행할 수 있습니다.

구성이 변경된 [블로그: bbon.kr](https://bbon.kr) web app 이 잘 동작하고 있습니다.

## 이슈

한번씩 CPU 사용량 급증하는 현상이 발생하고 있으나, 원인을 찾을 수 없습니다.

적은 리소스로 서버를 모니터링할 수 있는 도구를 찾고 있습니다.

## 남은 사항

[Nginx Proxy Manager](https://nginxproxymanager.com/)를 사용해서 리버스 프록시로 구성된 web app 의 도메인 별로 인증서를 사용하고 있는데, [Let's Encrypt](https://letsencrypt.org/) 에서 제공하는 와일드카드 인증서를 사용하도록 구성해야 합니다.

CPU 사용이 급증하는 현상의 원인을 파악하고, 해결해야 합니다.
