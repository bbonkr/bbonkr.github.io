---
title: Configure end of line when using git for multi-platform development teams
date: 2021-12-22
categories: 
  - "blog"
  - "computing"
tags: 
  - "eol"
  - "git"
  - "troubleshooting"
---    

개발팀의 장비가 여러 플랫폼으로 구성된 경우 GIT 구성에 따라 변경사항이 없음에도 많은 파일이 스테이징 대상으로 출력됩니다.

보통 줄의 끝 (EOL; End of line)을 처리하는 방법이 OS 마다 달라서 발생합니다.

많이 사용되는 OS에서 줄의 끝을 표현하는 방법은 아래와 같습니다.

- Windows 는 CRLF (`\r\n` Carage return, Line feed)
- Unix 는 LF (`\n` Line feed)

## 구성

git config 명령으로 구성을 변경할 수 있습니다.

줄의 끝을 처리하는 두가지 방법이 제공됩니다.

### core.eof

```bash
$ git config --global core.eol native
```

core.eol에 사용할 수 있는 값은 아래와 같습니다.

- **native**
    
    기본값, OS의 EOL 처리방법을 사용합니다.
    
- crlf
    
    CRLF (`\r\n` Carage return, Line feed)를 사용합니다.
    
- lf
    
    LF (`\n` Line feed)를 사용합니다.
    

아래 명령으로 구성 내용을 확인할 수 있습니다.

```bash
$ git config --global --list
```

### core.autocrlf

git 데이터베이스에 텍스트 파일의 변경 이력 데이터 입출력시 줄의 끝을 어떻게 처리할지 결정합니다.

```bash
$ git config --global core.autocrlf true
```

core.autocrlf 에 사용할 수 있는 값은 아래와 같습니다.

- false
    
    기본값, 파일의 내용 그대로 데이터베이스 변경 이력에 입출력합니다.
    
- **true**
    
    데이터베이스에 입력하기 전에 CRLF 를 LF 로 변경합니다.
    
- input
    
    LF 를 줄의 끝으로 사용합니다.
    

## 무엇을 해야 하나요?

개발팀에 Windows, Macos, Linux 를 기반으로 개발을 진행하는 팀원 중 Windows 사용자는 core.autocrlf 구성의 값을 true 로 설정하면 됩니다.

```powershell
PS> git config --global core.autocrlf true
```

Macos, Linux 사용자의 경우 LF 가 사용되므로, core.autocrlf 구성의 값을 input으로 설정합니다.

```bash
$ git config --global core.autocrlf input
```

## 더 많은 내용

[GitHub Docs: Configuring Git to handle line endings](https://docs.github.com/en/get-started/getting-started-with-git/configuring-git-to-handle-line-endings#global-settings-for-line-endings) 페이지에서 추가정보를 찾을 수 있습니다.

`.gitattributes` 파일을 사용해서 사용자가 git 구성을 변경하지 않아도 동일한 저장소를 사용해서 협업하는 사용자간 줄의 끝 처리를 공유하는 방법이 설명되어 있습니다.

