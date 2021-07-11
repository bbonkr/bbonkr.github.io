---
layout: post
title: GitHub Actions Sample
date: 2021-07-11 12:20:24
categories:
    - HowTo
tags:
    - github
    - github actions
    - .net
    - react
    - typescript
---

최근 작성하는 프로젝트들이 비슷한 형식으로 구성되어 CI/CD 를 GitHub Actions 를 활용하고 있습니다.

간단한 단계는 기본적으로 제공되는 GitHub Actions 패키지를 활용하고, 필요로 하는 특정 기능은 검색해보니 대부분 공개된 패키지가 존재합니다.

몇몇 시행착오를 거쳐 .NET 5 백엔드 응용프로그램과 React 프론트엔드 응용프로그램을 빌드하고, 태그한 후 GitHub Release Draft 를 작성하고, 태그된 커밋을 기준으로 도커 이미지를 빌드해서 레지스트리에 게시하게 구성된 GitHub Actions 입니다.

대상 프로젝트:

- 백엔드: .NET 5
- 프론트엔드: React
- 게시: Docker registry



구성된 저장소:

- [bbonkr/bing-wallpaper](https://github.com/bbonkr/bing-wallpaper)


## 📢 GitHub Actions

아래와 같이 두개의 워크플로우로 나눠서 작성되었으며, 두 워크플로우는 서로 의존하지 않습니다.

Workflows:
1. Build and tag
2. Docker image


### Build and Tag

```yaml
name: Build and tag

on:
  push:
    branches:
      - main # Default release branch
    tags:
      - "!*"

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 1

      - name: Setup dotnet
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 5.0.x

      - name: setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: build ClientApp
        run: |
          cd src/Sample.App/ClientApp
          npm install
          npm run build

      - name: Restore dependencies
        run: dotnet restore

      - name: Build
        run: dotnet build --no-restore

      - name: package-version
        run: grep '<Version>' < src/Sample.App/Sample.App.csproj | echo "::set-output name=version::$(sed 's/.*<Version>\(.*\)<\/Version>/\1/')"
        id: get_package_version

      - name: set-version  
        run: echo "PACKAGE_VERSION=${{ steps.get_package_version.outputs.version }}" >> $GITHUB_ENV

      - name: package-version-to-git-tag
        uses: pkgdeps/git-tag-action@v2
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          github_repo: ${{ github.repository }}
          version: ${{ env.PACKAGE_VERSION }}
          git_commit_sha: ${{ github.sha }}
          git_tag_prefix: "v"
      - name: Release Drafter
        id: release_drafter
        uses: release-drafter/release-drafter@v5
        with:
          config-name: release-drafter.yml
          version: ${{ env.PACKAGE_VERSION }}
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}

```

빌드를 확인하고, [Semver](https://semver.org) 형식의 태그를 추가합니다.

태그는 백엔드의 시작프로젝트로 설정되는 프로젝트의 버전 `Version` 요소를 참조합니다. 

백엔드의 시작 프로젝트로 설정되는 프로젝트 파일(.csproj)에 반드시 `<Version>` 요소가 존재해야 합니다.

예) 
```xml
<Version>1.0.0</Version>
```

빌드, 태그 액션은 하나의 작업으로 구성되어 있고, 작업은 여러 단계로 구성됩니다.

액션은 메인 브랜치에 커밋이 전송되었을 때 시작됩니다.
메인 브랜치에 태그가 전송된 경우에는 시작되지 않습니다.

작업은 아래 단계가 순서대로 실행됩니다.

1. 체크아웃
   메인 브랜치의 내용을 복제합니다.
2. .NET 5 도구를 설치합니다.
3. Nodejs 도구를 설치합니다.
4. 클라이언트 응용프로그램 디렉터리에서 npm 패키지를 설치하고, npm run build 스크립트를 실행해서 클라이언트 응용프로그램을 번들링합니다.
5. dotnet 의존 패키지를 설치합니다.
6. dotnet 프로젝트를 빌드합니다.
7. 백엔드 시작 프로젝트의 버전을 환경변수에 저장합니다.
8. 환경변수에 저장된 버전값으로 태그를 작성합니다. `git tag`
9. 작성된 태그와 연결된 릴리즈 초안을 작성합니다.


### Docker image

```yaml
name: docker image

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 1
      -
        name: Docker meta
        id: meta
        uses: docker/metadata-action@v3
        with:
          # list of Docker images to use as base name for tags
          images: |
            ${{ secrets.DOCKER_REGISTRY_URI }}/${{ github.repository }}
          # generate Docker tags based on the following events/attributes
          tags: |
            type=schedule
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}},enable=${{ !startsWith(github.ref, 'refs/tags/v0.') }}
            type=sha
          labels: |
            org.opencontainers.image.title=Sample File Share
            org.opencontainers.image.description=File sharing sample web app
            org.opencontainers.image.vendor=bbonkr

      -
        name: Set up QEMU
        uses: docker/setup-qemu-action@v1

      -
        name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      -
        name: Login to Registry
        uses: docker/login-action@v1 
        with:
          registry: ${{ secrets.DOCKER_REGISTRY_URI }}
          username: ${{ secrets.DOCKER_REGISTRY_USERNAME }}
          password: ${{ secrets.DOCKER_REGISTRY_PASSWORD }}
      -
        name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

```

메인 브랜치에 태그가 전송되면 도커 이미지를 빌드한 후 레지스트리에 새 이미지를 전송합니다.

도커 이미지의 버전은 액션 트리거인 태그가 사용됩니다.

빌드, 태그 액션은 하나의 작업으로 구성되어 있고, 작업은 여러 단계로 구성됩니다.

액션은 저장소에 `v*.*.*` 형식의 태그가 전송되었을 때 시작됩니다.

작업은 아래 단계가 순서대로 실행됩니다.

1. 체크아웃
    메인 브랜치의 내용을 복제합니다.
2. 도커 메타데이터를 수집합니다.
3. 도커 이미지를 빌드하기 위해 QEMU 도구를 설치합니다.
4. 도커 이미지를 빌드하기 위해 Buildx 도구를 설치합니다.
5. 레지스트리에 로그인합니다.
6. 도커 이미지를 빌드하고, 인증된 레지스트리에 이미지를 게시합니다.


## 👏 Conclusion

이렇게 구성해두면, 버전별 출시정보와 도커 이미지를 레지스트리에서 확인할 수 있습니다.


