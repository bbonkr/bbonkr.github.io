---
title: 'New CS File - vscode extension'
date: 2022-10-24
categories:
    - Computing
    - Repository
tags:
    - dotnet
    - csharp
    - github
    - github-repository
    - vscode
    - vscode-extensions
github: # If you want to show github buttons, fill owner and repo
    owner: bbonkr
    repo: vscode-extensions-new-cs-file
---

비주얼 스튜디오 코드 (Visual Studio Code)는 매우 유용한 통합 개발 환경을 제공합니다.

저는 타입스크립트 또는 자바스크립트로 작성하는 대부분의 코드를 비주얼 스튜디오 코드를 사용해서 작성합니다.

주 사용 장치를 맥으로 변경하면서, 닷넷 프로젝트도 간혹 비주얼 스튜디오 코드를 사용해서 진행합니다. 맥용 비주얼 스튜디오가 조금 불편하기도 하고 (윈도우용 비주얼 스튜디오에 비해), 비주얼 스튜디오 코드가 더 익숙해져서 그런 것 같습니다.

비주얼 스튜디오 코드에서 닷넷 프로젝트를 열고, 작업을 진행할 때 새 파일을 작성하면 빈 파일이 작성되어 매우 불편했습니다.

비주얼 스튜디오에서 새 파일을 작성하면, 작성되는 파일이 위치하는 디렉터리 기반으로 네임스페이스를 작성해주는데, 비쥬얼 스튜디오 코드에서는 이 기능이 제공되지 않습니다.

관련 확장을 설치하고 사용을 시도했으나, 마음에 드는 확장을 찾지 못했습니다.

그래서, 비주얼 스튜디오 코드의 확장을 작성하는 방법을 확인하고, 원하는 기능을 구현해서 사용하기로 했습니다.

## New CS File 확장

[New cs file](https://marketplace.visualstudio.com/items?itemName=bbonkr.kr-bbon-vscode-plugins-newcsfile) 페이지에서 관련 정보를 찾을 수 있습니다.

### 사용

비주얼 스튜디오 코드에서 닷넷 프로젝트를 열고, 커맨드 팔렛트에서 new cs file 명령을 찾거나, 워크 스페이스 파일 탐색기에서 폴더(디렉터리)를 선택하고 컨텍스트 메뉴를 열어 new cs file 명령을 실행합니다.

디렉터리 다이얼로그가 열리면 파일을 추가할 디렉터리를 선택합니다.
클래스 이름 입력창이 열리면, 추가하려는 클래스 (객체) 이름을 입력하고, 엔터키를 입력합니다.

선택된 위치에 `클래스이름.cs` 파일이 작성되고, 작성된 파일에는 디렉터리 구조를 기반한 네임스페이스가 추가되어져 있습니다.

작상된 파일의 내용:

```csharp
namespace Sample.Models
{
    public class TestModel
    {

    }
}

```

### 기능

네임스페이스는 파일이 작성되는 디렉터리와 프로젝트 파일(.csproj)의 이름을 기반으로 작성됩니다.
다만, 프로젝트 파일(.csproj)에 `<DefaultNamespace>` 요소가 있으면 그 값을 사용합니다.

아래와 같은 구조일 때 Models 디렉터리가 선택되고 TestModel 이라는 클래스가 작성되는 파일의 예제입니다.

```plaintext
- Sample           # directory
  - Models         # directory
    - TestModel    # 👈 Try to create file
  - Sample.csproj  # project file
```

DefaultNamespace 요소가 없는 경우:

TestModel 파일의 내용

```csharp
namespace Sample.Models
{
    public class TestModel
    {

    }
}

```

프로젝트 파일의 `DefaultNamespace` 요소가 `Sample.SpecialEdition` 인 경우:

```csharp
namespace Sample.SpecialEdition.Models
{
    public class TestModel
    {

    }
}
```

### 제한사항

작업하려는 프로젝트가 열린 워크스페이스의 디렉터리와 파일이름은 알파벳 문자와 숫자로만 구성되어야 합니다.

<!--
## 코드 리뷰

[GitHub: bbonkr/vscode-extensions-new-cs-file](https://github.com/bbonkr/vscode-extensions-new-cs-file)
-->

## 게시

깃허브 액션으로 게시를 자동화합니다. 다만, 게시 시점을 조정하기 위해 깃허브 릴리즈가 게시될 때에만 비주얼 스튜디오 마켓플레이스에 게시합니다.

GitHub actions

1. 기본 브랜치에 커밋이 전송됩니다.
    1. 코드를 체크아웃하고, 노드 환경을 구성한 후 의존 패키지를 설치하고, 지정된 npm 스크립트를 실행합니다.
    2. package.json 의 version 값으로 깃 태그를 검색합니다.
        1. version에 해당하는 깃 태그가 있는 경우 워크플로우는 종료됩니다.
        2. 깃 태그가 없는 경우 깃 태그를 작성합니다.
2. 깃 태그가 작성되면 초안 상태의 깃허브 릴리즈를 작성합니다.
3. 깃허브 릴리즈를 공개(게시)하면, 비주얼 스튜디오 마켓플레이스에 새 버전을 게시합니다.

## 마침

비주얼 스튜디오 코드 확장에 관심이 있으시면 [Let create own vscode extension](/2022/10/24/let-create-own-vscode-extension) 페이지도 둘러보세요.
