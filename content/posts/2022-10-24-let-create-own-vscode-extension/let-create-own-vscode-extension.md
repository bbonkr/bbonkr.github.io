---
title: 'Let create own vscode extension'
date: 2022-10-24
categories:
    - Computing
    - HowTo
tags:
    - typescript
    - vscode
    - vscode extensions
comments: false
---

타입스크립트로 비주얼 스튜디오 확장을 작성할 준비를 하고, 작성된 확작을 게시하는 내용에 대한 리뷰입니다.

비주얼 스튜디오 코드의 확작에 대한 정보는 [Extension API](https://code.visualstudio.com/api) 페이지에서 제공하고 있습니다.

## 준비

[Your First Extension: Visual Studio Code](https://code.visualstudio.com/api/get-started/your-first-extension) 페이지에서 타입스크립트로 확장을 작성하는 방법을 알려줍니다.

[yoman](https://yeoman.io/) 패키지와 [VS Code Extension Generator](https://www.npmjs.com/package/generator-code) 패키지를 사용해서 부트스트랩 코드를 얻을 수 있습니다.

### 의존 패키지 설치

```shell
$ npm install -g yo generator-code # yoman 패키지와 vs code extension generator 패키지를 전역에 설치합니다.
```

### 프로젝트 초기화

```shell
$ yo code # 프로젝트를 초기화하기 위한 정보를 입력받는 내용이 출력됩니다. (아래 목록을 확인하세요.)
```

1. What type of extension do you want to create?
    1. New Extension (TypeScript) 👉 **선택**
    2. New Extension (JavaScript)
    3. New Color Theme
    4. New Language Support
    5. New Code Snippets
    6. New Keymap
    7. New Extension Pack
    8. New Language Pack (Localization)
    9. New Web Extension (TypeScript)
    10. New Notebook Renderer (TypeScript)
2. What's the name of your extension? **확장 이름 입력**
3. What's the identifier of your extension? **확장 식별자 입력**
4. What's the description of your extension? **설명을 입력**
5. Initialize a git repository? **git 저장소 초기화 N** 또는 git 저장소 URI
6. Bundle the source code with webpack? **webpack을 사용해서 번들링 Y**
7. Which package manager to use?
    1. npm 👉 **선택**
    2. yarn
    3. pnpm
8. Do you want to open the new folder with Visual Studio Code?
    1. Open with `code`
    2. Skip

프로젝트 정보를 모두 입력하면 확장의 식별자에 해당하는 디렉터리가 작성되고, 타입스크립트로 비주얼 스튜디오 코드 확장을 작성할 수 있는 환경이 준비됩니다.

준비된 프로젝트의 package.json 파일을 보면, 2. 에서 입력한 내용이 `displayName` 으로 사용되고, 3. 에서 입력한 내용이 `name` 으로 사용되고, 4. 에서 입력한 내용이 `description` 으로 사용되는 것을 확인할 수 있습니다.

이제, 비주얼 스튜디오 코드 확작을 작성할 준비를 마쳤습니다.

원하는 기능을 구현하고, 비주얼 스튜디오 마켓플레이스에 게시하면 혹시나 비슷한 기능이 필요하신 분들이 사용할 수 있습니다.

## 게시

[Publishing Extension: Visual Studio Code](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) 페이지에서 작성한 확장을 비주얼 스튜디오 마켓플레이스에 게시하는 방법을 설명합니다.

[비주얼 스튜디오 마켓플레이스](https://marketplace.visualstudio.com/)에 사인인하고, [비주얼 스튜디오 마켓플레이스 관리](https://marketplace.visualstudio.com/manage) 페이지에서 게시자(Publisher)를 작성해야 합니다.

로컬 개발환경에서 게시하기 위해서, [vsce](https://github.com/microsoft/vscode-vsce) 도구를 사용합니다.

비주얼 스튜디오 마켓플레이스는 애져 데브옵스 마켓플레이스 서비스를 사용하므로, 애져 데브옵스 계정을 작성해야 합니다.

애져 데브옵스 계정 작성과 개인 액세스 토큰 (PAT, Personal Access Token)을 작성하는 방법을 [Publishing Extension: Visual Studio Code](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)[#Get a Personal Access Token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) 페이지에서 설명하고 있습니다.

비주얼 스튜디오 마켓플레이스의 게시자 작상과 애져 데브옵스의 액세스 토큰을 작성했으면, 이제 게시할 준비를 마쳤습니다.

### 게시전 확인 사항

[Publishing Extension: Visual Studio Code](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)[#Publishing extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions) 페이지에서 vsce 도구로 게시할 때, 확인하는 사항을 설명하고 있습니다.

-   사용하는 이미지 파일의 URI 는 `HTTPS` 를 사용해야 합니다.
-   svg 파일은 [신뢰하는 제공자](https://code.visualstudio.com/api/references/extension-manifest#approved-badges)가 아니면 사용하지 않는 것을 권장합니다.

package.json 파일에 아래 항목이 존재하는 확인합니다.

-   publisher
-   version

### 게시자 식별자

프로젝트의 package.json 파일을 열고, publisher 항목을 추가합니다.

```json
{
    // ... 생략
    "publisher": "<비주얼 스튜디오 마켓플레이스 게시자 식별자>"
    // ... 생략
}
```

### 번들링 확인

게시전에 문제없이 번들이 작성되는지 확인합니다.

```shell
$ npm run vscode:prepublish
```

### vsce 도구 설치

```shell
$ npm install -g vsce
```

### vsce 로그인

> 동일한 환경에서 게시를 시도하는 중이면 최초 한번만 vsce 로그인을 진행하시면 됩니다.

```shell
$ vsce login <비주얼 스튜디오 마켓플레이스 게시자 식별자>
```

개인 액세스 토큰(PAT, Personal Access Token) 입력을 기다리는 프롬프트가 출력되면 애져 데브옵스에서 작성한 개인 액세스 토큰(PAT, Personal Access Token)을 입력합니다.

아래 명령으로 정상적으로 로그인이 되었는지 확인할 수 있습니다.

```shell
$ vsce ls-publishers # 정상적으로 로그인된 경우 게시자 목록이 출력됩니다.
```

### 게시

아래 명령으로 번들링하고, 비주얼 스튜디오 마켓플레이스에 게시합니다.

```shell
$ vsce publish
```

게시된 확작은 확인 후 바로 공개됩니다.

### 문제해결

`vsce publish` 명령은 현재 작업중인 프로젝트가 깃 저장소인 경우 기본적으로 깃 태그를 작성합니다.

따라서, 현재 저장소에 작성하려는 태그가 있으면 게시가 실패합니다.

예상되는 실패 메시지는 아래와 같습니다.

```plaintext
Error: Invalid URL
Error: Process completed with exit code 1.
```

이 경우 `vsce publish` 명령에 옵션을 추가합니다.

```shell
$ vsce publish --no-git-tag-version --no-update-package-json
```

-   `--no-git-tag-version`: 깃 태그를 작성하지 않습니다.
-   `--no-update-package-json`: package.json 파일을 변경하지 않습니다.

## 마침

이제 원하는 기능이 포함된 확장을 작성하고 게시할 수 있습니다.
