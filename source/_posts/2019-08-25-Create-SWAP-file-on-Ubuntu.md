---
title: Create SWAP file on Ubuntu
date: 2019-08-25 00:54:13
categories:
- HowTo
tags:
- ubuntu
- linux
- swap-file
- aws
- aws-lightsail
intro:
comments:
---

[AWS Lightsail](https://aws.amazon.com/ko/lightsail/) 3.5 USD/mo 요금제에 해당하는 작은 서버를 사용하고 있습니다.

> [AWS Lightsail pricing](https://aws.amazon.com/ko/lightsail/pricing/)

사용할 수 있는 자원은 아래와 같습니다.

- 512MB 메모리
- 1코어 프로세서
- 20GB SSD 디스크
- 1TB 전송

Ubuntu 에서 mariaDB 와 nginx, php7.2 를 기반으로 Wordpress를 실행하고 있습니다.

CPU 자원은 크게 부족하지 않습니다만, 메모리가 부족한 편입니다.

통계자료 쿼리가 실행되면 mariaDB 프로세스가 메모리를 확보하지 못해서 중지되어 버립니다.

5.0 USD/mo 요금제로 변경하면 적당할 것 같습니다만, 먼저 메모리를 확보하기 mariaDB 구성도 변경해보고, 필요없는 서비스는 모두 중지했지만 효과를 보지 못했습니다.

다른 방법을 생각해보던 중 스왑 파티션이 없는 것을 확인하고, 매우 방대한 디스크 공간에 스왑 파일을 만들면 메모리 확보에 도움이 될 것 같아 시도했습니다.


## 스왑 <small>Swap</small>

스왑 <small>Swap</small> 은 RAM 메모리 공간이 가득 찬 경우 사용되는 디스크 공간입니다. 

리눅스 시스템에 RAM 메모리 공간이 부족하면 비활성 페이지가 RAM 메모리 공간에서 스왑 공간으로 이동되어 RAM 메모리 공간을 사용할 수 있게 동작합니다.

스왑 파티션이 없는 경우 스왑 파일을 만들어 스왑 동작을 할 수 있습니다.


## 스왑 파일 작성



`/var` 디렉터리에 `swapfile`이라는 이름으로 4GB 크기로 파일을 작성합니다.

```bash
$ sudo dd if=/dev/zero of=/var/swapfile bs=1M count=4096
```

작성한 파일의 권한을 변경합니다.

```bash
$ sudo chmod 600 /var/swapfile
```

작성한 파일을 스왑파일로 지정합니다.

```bash
$ sudo mkswap /var/swapfile
```

스왑파일을 활성화합니다.

```bash
$ sudo swapon /var/swapfile 
```

## 마치며

결과는 매우 만족스럽습니다.

항상 **0**에 가까운 수치를 보고하던 메모리 공간이 조금 여유가 생겼습니다.

> 이전 결과를 저장해 두지 않아서 비교가 안되지만, 여유가 조금 있습니다. ;)

```bash
$ free -m
              total        used        free      shared  buff/cache   available
Mem:            486         118          35          61         332         264
Swap:          4095         177        3918
```

