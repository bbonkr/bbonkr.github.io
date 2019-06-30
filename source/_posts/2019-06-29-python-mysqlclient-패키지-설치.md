---
title: Python mysqlclient 패키지 설치 문제
date: 2019-06-29 17:04:12
categories:
  - HowTo
tags:
  - django
  - python
  - pip
  - mysql
  - mariadb
intro:
comments:
---

Django 프로젝트를 만들고, 데이터베이스 연결 구성을 위해 `mysqlclient` 패키지를 설치하던 중 문제가 발생했습니다.

## 환경

-   macOS Mojave 10.14.5
-   Python 3.7.3
-   pip 19.1.1 (Python 3.7)

## 문제

터미널에서 아래 명령으로 `mysqlclient` 패키지 설치를 실행하면 에러가 발생합니다.

```bash
$ pip3 install mysqlclient
Collecting mysqlclient
  Using cached https://files.pythonhosted.org/packages/f4/f1/3bb6f64ca7a429729413e6556b7ba5976df06019a5245a43d36032f1061e/mysqlclient-1.4.2.post1.tar.gz
    ERROR: Complete output from command python setup.py egg_info:
    ERROR: Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/private/var/folders/df/8jqrf7b543z2ff2s0rhbq54c0000gn/T/pip-install-v5w8wcwf/mysqlclient/setup.py", line 16, in <module>
        metadata, options = get_config()
      File "/private/var/folders/df/8jqrf7b543z2ff2s0rhbq54c0000gn/T/pip-install-v5w8wcwf/mysqlclient/setup_posix.py", line 53, in get_config
        libraries = [dequote(i[2:]) for i in libs if i.startswith('-l')]
      File "/private/var/folders/df/8jqrf7b543z2ff2s0rhbq54c0000gn/T/pip-install-v5w8wcwf/mysqlclient/setup_posix.py", line 53, in <listcomp>
        libraries = [dequote(i[2:]) for i in libs if i.startswith('-l')]
      File "/private/var/folders/df/8jqrf7b543z2ff2s0rhbq54c0000gn/T/pip-install-v5w8wcwf/mysqlclient/setup_posix.py", line 12, in dequote
        raise Exception("Wrong MySQL configuration: maybe https://bugs.mysql.com/bug.php?id=86971 ?")
    Exception: Wrong MySQL configuration: maybe https://bugs.mysql.com/bug.php?id=86971 ?
    ----------------------------------------
ERROR: Command "python setup.py egg_info" failed with error code 1 in /private/var/folders/df/8jqrf7b543z2ff2s0rhbq54c0000gn/T/pip-install-v5w8wcwf/mysqlclient/
```

## 해결

먼저 `mysqlclient` 문서를 확인합니다.

`mysqlclient` 문서
: [mysqlclient - PyPI](https://pypi.org/project/mysqlclient/)

필요한 의존 패키지를 설치합니다.

```bash
$ brew install mysql-connector-c
```

앞서 설치한 의존 패키지 MySQL Connector/C 의 기본 구성이 부정확해서 내용을 변경해야 합니다.

mysql_config 구성을 수정해야 합니다.

```bash
$ which mysql_config                    # 파일의 위치를 찾습니다.
/usr/local/bin/mysql_config
$ sudo nano /usr/local/bin/mysql_config # 편집기로 파일을 수정합니다.
```

아래 내용을 찾아서 변경합니다.

> on macOS, on or about line 112:

원본:

```ini
# Create options
libs="-L$pkglibdir"
libs="$libs -l "
```

변경:

```ini
# Create options
libs="-L$pkglibdir"
# libs="$libs -l "
libs="$libs -lmysqlclient -lssl -lcrypto"
```

SSL 관련 문제가 발생하면 아래 명령으로 정보를 확인해서 문제를 해결해야 합니다.

```bash
$ brew info openssl
```

이제 mysqlclient 패키지를 문제없이 설치할 수 있습니다.

```bash
$ pip3 install mysqlclient
Collecting mysqlclient
  Using cached https://files.pythonhosted.org/packages/f4/f1/3bb6f64ca7a429729413e6556b7ba5976df06019a5245a43d36032f1061e/mysqlclient-1.4.2.post1.tar.gz
Building wheels for collected packages: mysqlclient
  Building wheel for mysqlclient (setup.py) ... done
  Stored in directory: /Users/bbon/Library/Caches/pip/wheels/30/91/e0/2ee952bce05b1247807405c6710c6130e49468a5240ae27134
Successfully built mysqlclient
Installing collected packages: mysqlclient
Successfully installed mysqlclient-1.4.2.post1
```
