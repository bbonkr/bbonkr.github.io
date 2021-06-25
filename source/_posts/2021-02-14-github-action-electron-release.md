---
title: Electron Release with GitHub Action
date: 2021-02-14 20:30:05
categories:
    - HowTo
tags:
    - github
    - github-actions
    - electron
    - ci-cd
intro:
comments:
---

Electron 으로 작성된 응용 프로그램을 Windows, Macos 실행파일로 빌드하고, GitHub Release 에서 다운로드 가능한 상태로 준비하는 과정을 자동화한 워크플로우를 회고합니다.

## GitHub Actions

GitHub 에서 제공하는 워크 플로우 자동화 도구입니다.

활용해서 여러가지 자동화를 시도할 수 있습니다.

`Build`, `Release` 두 개의 액션으로 구성했습니다.

`Release` 액션은 `Build` 액션에 의존하고 있습니다.

모든 단계가 문제없이 실행되면, main 브랜치에 새로운 태그가 작성되고, GitHub Release 에 새로 작성된 태그에 해당하는 Electron 응용 프로그램이 다운로드가 준비된 상태로 비공개로 작성됩니다.

간략한 흐름은 아래와 같습니다.

1. main 브랜치에 커밋이 전송됩니다.
2. Build 액션이 실행됩니다.
    1. Ubuntu 에 Node.js 환경을 준비합니다.
    2. npm build 스크립트를 실행합니다.
    3. git tag를 작성합니다.
    4. GitHub Release 를 작성합니다.
    5. `upload-assets` 이벤트를 실행합니다.
3. Release 액션이 실행됩니다. Macos 와 Windows 에서 아래 단계가 각각 실행됩니다.
4. Node.js 환경을 준비합니다.
5. npm pack 스크립트를 실행합니다.
6. GitHub Release 에 응용프로그램을 업로드합니다.

### ⚙ Job: Build

main 브랜치에 커밋이 푸쉬되면 실행되는 GitHub Action 입니다.
[.github/workflows/build.yml 보기](https://github.com/bbonkr/renameapp/blob/main/.github/workflows/build.yml)

build Job 은 `Checkout`, `Install Node.js, Npm`, `Install Dependencies`, `Build`, `package-version`, `package-version-to-git-tag`, `Release Drafter`, `Check Upload Url`, `Repository Dispatch` 단계로 구성되어 있습니다.

Ubuntu 에서 실행합니다.

#### 👞 step: Checkout

원격 저장소에서 코드를 내려받습니다.

#### 👞 step: Install Node.js, Npm

Node.js 환경을 구성합니다.

v12 Node.js 를 사용합니다.

#### 👞 step: Install Dependencies

package.json 에 작성된 패키지를 설치합니다.

#### 👞 step: Build

npm build 스크립트를 실행합니다.

#### 👞 step: package-version

package.json 파일에 작성된 버전 값을 PACKAGE_VERION 환경변수로 설정합니다.

#### 👞 step: package-version-to-git-tag

[`pkgdeps/git-tag-action`](https://github.com/pkgdeps/git-tag-action) 액션으로 git tag 를 작성합니다.

package.json 파일의 버전과 git tag 를 동기화하기 위해 사용합니다.

`package-version` 단계에서 얻은 버전을 사용합니다.

#### 👞 step: Release Drafter

[`release-drafter/release-drafter`](https://github.com/release-drafter/release-drafter) 액션으로 작성된 git tag 에 대한 GitHub Release 를 작성합니다.

GitHub Release의 본문에 변경사항 정의된 템플릿 기반의 내용으로 작성됩니다.

`package-version` 단계에서 얻은 버전을 사용합니다.

작성된 GitHub Relase 는 Draft 상태입니다.

실행 파일이 업로드된 후 직접 상태를 변경해서 공개하도록 하고 싶습니다.

#### 👞 step: Check Upload Url

`Release Drafter` 단계의 출력값을 확인합니다.

`Release Drafter` 단계에서 작성된 GitHub Release 의 첨부파일 <small>Assets</small> 업로드 경로를 확인하기 위해 추가된 단계입니다.

#### 👞 step: Repository Dispatch

[`peter-evans/repository-dispatch`](https://github.com/peter-evans/repository-dispatch) 액션으로 지정된 GitHub 저장소를 대상으로 사용자 정의 이벤트를 실행합니다.

> `peter-evans/repository-dispatch` 액션은 GitHub api 중 web hook 을 사용합니다.

이벤트 형식은 `upload-assets` 으로 지정합니다.
웹 훅을 요청할 때, 요청 본문으로 `Release Drafter` 단계의 출력값중 `upload_url` 을 전송합니다.

### ⚙ Job: Release

저장소에 웹 훅 이벤트가 요청되면 실행되는 GitHub Action 입니다.
[.github/workflows/release.yml 보기](https://github.com/bbonkr/renameapp/blob/main/.github/workflows/release.yml)

구독하는 이벤트 형식은 `upload-assets` 입니다.

Release Job 은 `Context`, `Verify Upload Url`, `Checkout`, `Install Node.js, Npm`, `Install dependencies`, `Pack`, `Upload Assets to Release with a wildcard` 단계로 구성되어 있습니다.

Macos, Windows 에서 실행됩니다.
각 단계는 지정된 OS 별로 한번씩 두번 실행됩니다.

#### 👞 step: Context

GitHub Action 으로 제공되는 기본 데이터를 확인해보고 싶어서 추가한 단계입니다.

#### 👞 step: Verify Upload Url

웹 훅으로 입력된 요청 본문이 정상적으로 전달되는지 확인해보고 싶어서 추가한 단계입니다. `Conext` 단계에서 동일한 값을 확인할 수 있습니다.

#### 👞 step: Checkout

원격 저장소에서 코드를 내려받습니다.

#### 👞 step: Install Node.js, Npm

Node.js 환경을 구성합니다.

v12 Node.js 를 사용합니다.

#### 👞 step: Install dependencies

package.json 에 작성된 패키지를 설치합니다.

#### 👞 step: Pack

npm pack 스크립트를 실행합니다.

electron 으로 작성된 실행파일이 packages 디렉터리에 작성됩니다.

#### 👞 step: Upload Assets to Release with a wildcard

packages 디렉터리에 작성된 실행파일을 이전 Build 액션에서 전달한 업로드 경로를 사용해서 Release Assets 로 업로드합니다.

## 📋 Workflows

[Actions: bbonkr/renameapp](https://github.com/bbonkr/renameapp/actions) 페이지에서 실행된 워크플로우를 확인할 수 있습니다.

## 🧰 Releases

[Releases: bbonkr/renameapp](https://github.com/bbonkr/renameapp/releases) 페이지에서 작성된 GItHub Release 를 확인할 수 있습니다.

## 📢 Conclusion

가능하면 많은 부분을 자동화해서 꼭 필요한 일에 집중할 수 있는 환경을 준비하는 것은 매우 중요한 일이라고 생각됩니다.

이렇게 게시 워크플로우를 자동화해두면 이번 게시에 뭐가 변경되었는지를 작성하는 시간을 줄일 수 있고, 게시에 다운로그 가능한 파일을 누락하는 실수도 없습니다.

지속적으로 더 좋은 워크플로우를 생각하고, 구성하고 회고하도록 하겠습니다.

저와 유사한 워크플로우를 자동화하려고 진행하시는 분에게 도움이 되면 좋겠습니다.
