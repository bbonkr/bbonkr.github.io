---
title: "GitHub Action: Git Tag Check Action"
date: 2022-01-20
categories: 
  - "blog"
  - "computing"
  - "repository"
tags: 
  - "git"
  - "git-tag"
  - "github"
  - "github-actions"
  - "github-repository"
  - "node-js"
  - "nodejs"
  - "ts"
  - "typescript"
github: # If you want to show github buttons, fill owner and repo
  owner: bbonkr
  repo: git-tag-check-action
---    

깃허브 워크플로우에서 활용할 수 있는 깃허브 액션 GitHub actions 을 작성했습니다.

입력된 태그가 깃 git 원격저장소에 존재하는지 조회한 후 있으면 입력된 태그를 반환하고, 찾을 수 없으면 빈 문자열을 반환하는 단계를 제공합니다.

[![View on Marketplace: git-tag-check-action](https://img.shields.io/badge/Marketplace-git--tag--check--action-blueviolet)](https://github.com/marketplace/actions/git-tag-check-action) [![출시 버전](https://img.shields.io/github/v/release/bbonkr/git-tag-check-action?display_name=tag&style=flat-square&include_prereleases)](https://github.com/bbonkr/git-tag-check-action/releases)

## git-tag-check-action

### Overview

버전 관리를 할 때 버전이름으로 git tag 를 작성하고 있습니다.

이 깃허브 액션은 현재 깃허브 저장소에 입력된 이름의 태그가 존재하는지 확인하는 작업에 도움이 될 수 있습니다.

예상되는 사용처:

- 워크플로우에서 현재 버젼이 존재하는 경우 이후 단계를 실행하지 않게 설정

### Usages

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: bbonkr/git-tag-check-action@v1.0.5
    id: git_tag_check
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      tag: 'v1.0.0'
  - name: logging found
    if: ${{ steps.git_tag_check.outputs.tag != '' }}
    run: |
      echo "Found tag=${{ steps.git_tag_check.outputs.tag }}"
  - name: logging not found
    if: ${{ steps.git_tag_check.outputs.tag == '' }}
    run: |
      echo "Tag does not exist"   
```

### Inputs

| Name | Required | Description |
| :-- | :-: | :-- |
| tag | ✅ | 태그, 확인하려는 태그입니다. |
| github\_token | ✅ | 깃허브 PAT, Repo 스코프가 필요합니다. |
| prefix |  | 버전 접두어입니다. 기본값은 `''` (빈 문자열)입니다. |

### Outputs

| Name | Description |
| :-- | :-- |
| tag | 입력된 태그가 있는 경우 조회된 태그가 반환됩니다. 없는 경우 `''` (빈 문자열)입니다. |

## Review

### GitHub Action with typescript

node.js 기반으로 동작하고, Typescript로 작성된 액션입니다.

처음 작성하는 액션이라, 어떻게 작성하는지 어떻게 게시하는지 확인을 하기 위해 [GitHub: actions/typescript-action](https://github.com/actions/typescript-action) 템플릿을 사용했습니다.

### dist/index.js

액션 실행에 사용되는 시작점입니다.

> 풀 리쿼스트 작성 또는 기본 브랜치로 커밋을 전송하기전에 `ncc build` 로 dist/ 디렉터리의 파일들을 다시 작성하고, 커밋한 후 풀 리퀘스트 작성 또는 원격 저장소에 커밋을 전송하는 방식을 사용하애 하는 것으로 생각됩니다. `npm run package` 스크립트로 실행이 준비되어져 있습니다.

### src/main.ts

구현하고자 하는 코드의 시작점입니다.

[`@actions/core`](https://www.npmjs.com/package/@actions/core) 패키지를 사용해서 깃허브 액션에 필요한 입력, 출력을 구현합니다.

[`@actions/github`](https://www.npmjs.com/package/@actions/github) 패키지를 사용해서 GitHub 저장소 액세스(`Octokit`)를 구현할 수 있습니다.

### GitHub Actions

깃허브 워크플로우가 미리 구성되어 있습니다.

`check-dist`, `test` 두 개의 워크플로우가 있습니다.

`check-dist` 는 dist/ 디렉터리에 있는 시작점 코드들이 현재 코드로 다시 작성되었는지 확인하는 워크프로우로 생각됩니다.

그런데, 로컬 장치에서 매번 다시 작성해서 커밋을 원격 저장소에 전송했는데, 워크플로우가 실행되는 장치에서 빌드와 차이점이 발견되고 있어 항상 오류 발생으로 종료되고 있습니다.

> 좀 더 확인해봐야할 필요가 있습니다.

`test` 워크플로우는 빌드를 확인하고, 단위 테스트를 실행하는 등의 작업이 실행되는 작업과 작성된 깃허브 액션을 실행해서 동작을 확인하는 작업으로 구성되어져 있습니다.

