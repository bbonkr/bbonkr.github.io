---
title: python mysqlclient 패키지 설치
date: 2019-06-29 17:04:12
categories:
tags:
intro:
comments:
---

\$ pip3 install mysqlclient
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

---

ERROR: Command "python setup.py egg_info" failed with error code 1 in /private/var/folders/df/8jqrf7b543z2ff2s0rhbq54c0000gn/T/pip-install-v5w8wcwf/mysqlclient/

https://pypi.org/project/mysqlclient/

의존 패키지를 설치합니다.

```bash
$ brew install mysql-connector-c
```

패키지 설치를 시도하면 에러 메시지가 출력됩니다.

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

mysql_config 구성을 수정해야 합니다.

```bash
$ which mysql_config
/usr/local/bin/mysql_config
$ sudo nano /usr/local/bin/mysql_config
```

아래 내용을 찾아서 변경합니다.

> on macOS, on or about line 112:

```
# Create options
libs="-L$pkglibdir"
libs="$libs -l "
```

```
# Create options
libs="-L$pkglibdir"
# libs="$libs -l "
libs="$libs -lmysqlclient -lssl -lcrypto"
```

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
