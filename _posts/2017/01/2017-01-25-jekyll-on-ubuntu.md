---
layout: post
title: "Jekyll on Ubuntu"
description: 'Jekyll on Ubuntu'
tags:
- jekyll
- ruby
- nodejs
categories:
- Computing
twitter_text: 'Jekyll on Ubuntu'
---

## [RVM <small>Ruby Version Manager</small>](https://rvm.io/) 설치

패키지를 갱신합니다.

```bash
$ sudo apt-get update
```

RVM을 설치하기 위해 curl을 설치합니다.

```bash
$ sudo apt-get install curl
```

[RVM](https://rvm.io/)을 설치합니다.

```bash
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
```

```bash
$ \curl -sSL https://get.rvm.io | bash -s stable
```

설치후 프로파일 추가사항 적용을 위해 아래 명령을 실행합니다.

```bash
$ source ~/.rvm/scripts/rvm
```


## [루비](https://www.ruby-lang.org/ko/) 설치

RVM을 사용하여 [루비](https://www.ruby-lang.org/ko/)를 설치합니다.

```bash
$ rvm install ruby-2.4.0
```

설치된 루비 버전 확인합니다.

```bash
$ ruby -v
```

## [Nodejs](https://nodejs.org/ko/) 설치

```bash
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
```

```bash
$ sudo apt-get install -y nodejs
```

## [Jekyll](https://jekyllrb.com/) 설치

```bash
$ gem install jekyll
```
