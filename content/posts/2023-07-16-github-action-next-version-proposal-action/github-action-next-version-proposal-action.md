---
title: 'Github Action: next-version-proposal-action'
date: 2023-07-16
categories:
    - Blog
    - Computing
tags:
    - github
    - github-actions
    - github-repository
    - typescript
draft: false
featuredImage:
comments: false
github: # If you want to show github buttons, fill owner and repo
    owner: bbonkr
    repo: next-version-proposal-action
---

## 개요

깃허브 워크플로우 중 PULL_REQUEST 이벤트에서 활용할 수 있는 액션입니다.

기본 브랜치로 병합이 지정된 풀 리퀘스트가 완료될 때, 기본 브랜치로 병합이 발생하는 경우 풀 리퀘스트의 라벨에 따라 다음 버전 이름을 제안합니다.

## 동작:

깃 태그 이름 중 SEMVER[^sember] 형식의 태그 이름을 검색해서, 최신 버전에 해당하는 태그 이름을 찾습니다.

SEMVER[^sember] 형식의 깃 태그를 찾을 수 없는 경우 `1.0.0` 을 제안합니다.

최신 버전에 해당하는 깃 태그를 찾은 경우, 지정된 풀 리퀘스트에 지정되어 있는 라벨을 기준으로 주 버전, 부 버전, 패치 버전을 1 증가 시킨 버전 이름을 제안합니다.

## 입력과 출력

### 입력

| Name                | Required | Description                                                 |
| :------------------ | :------: | :---------------------------------------------------------- |
| github_token        |    ✅    | 깃허브 개인 인증 토큰 (PAT); 저장소 읽기 권한이 필요합니다. |
| pr                  |    ✅    | 풀 리퀘스트 번호; 예) 100                                   |
| major_labels        |    ✅    | 주 버전이 증가하는 풀리퀘스트 라벨 이름 목록; 쉼표로 구분   |
| minor_labels        |    ✅    | 부 버전이 증가하는 풀리퀘스트 라벨 이름 목록; 쉼표로 구분   |
| patch_labels        |    ✅    | 패치 버전이 증가하는 풀리퀘스트 라벨 이름 목록; 쉼표로 구분 |
| next_version_prefix |          | 다음 버전 이름 접두어                                       |

현재 워크플로우가 실행되고 있는 저장소에 대한 작업인 경우 `github_token` 에 입력할 깃허브 개인 인증 토큰의 값은 미리 정의된 변수 중 하나를 사용할 수 있습니다.

-   `github.token`
-   `secrets.GITHUB_TOKEN`

현재 워크플로우가 실행된 이벤트 트리거가 `pull_request` 인 경우 `pr` 에 입력할 풀 리퀘스트 번호의 값은 현재 컨텍스트의 이벤트 데이터를 사용할 수 있습니다.

-   github.event.pull_request.number

### 출력

| Name               | Description                     |
| :----------------- | :------------------------------ |
| latest_version     | 깃 태그에서 찾은 최신 버전 이름 |
| next_version       | 제안된 다음 버전 이름           |
| next_version_major | 제안된 다음 버전의 주 버전      |
| next_version_minor | 제안된 다음 버전의 부 버전      |
| next_version_patch | 제안된 다음 버전의 패치 버전    |

> `latest_version == ''` 인 경우 `next_version` 의 값은 `1.0.0` 입니다.

## 예제

아래 워크플로우는 메인 브랜치를 베이스로 하는 풀 리퀘스트가 병합으로 완료되면 실행됩니다.

```yaml
name: 'create-tag'

on:
    pull_request:
        branches:
            - main
        types:
            - closed

jobs:
    get_next_version:
        runs-on: ubuntu-latest
        if: github.event.pull_request.merged == true # 풀 리퀘스트가 병합으로 완료된 상태를 확인
        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Get next version
              uses: bbonkr/next-version-proposal-action@v1
              id: next_version_proposal
              with:
                  github_token: ${{ github.token }} # 깃허브 개인 인증 토큰
                  pr: ${{ github.event.pull_request.number }} # 연관 풀 리퀘스트 번호
                  major_labels: 'major, next' # 주 버전이 증가하는 풀리퀘스트 라벨 이름 목록
                  minor_labels: 'enhancement, feature' # 부 버전이 증가하는 풀리퀘스트 라벨 이름 목록
                  patch_labels: 'bug, documentation, chore, dependencies' # 패치 버전이 증가하는 풀리퀘스트 라벨 이름 목록
                  next_version_prefix: 'v' # 버전 이름의 접두어를 지정

            - name: logging
              run: |
                  echo "latest_version=${{ steps.next_version_proposal.outputs.latest_version }}"
                  echo "next_version=${{ steps.next_version_proposal.outputs.next_version }}"
                  echo "next_version_major=${{ steps.next_version_proposal.outputs.next_version_major }}"
                  echo "next_version_minor=${{ steps.next_version_proposal.outputs.next_version_minor }}"
                  echo "next_version_patch=${{ steps.next_version_proposal.outputs.next_version_patch }}"
```

## 제약사항:

1. SEMVER[^sember] 형식을 처리할 때, 주 버전 <small>major</small>, 부 버전 <small>minor</small>, 패치 버전 <small>patch</small> 부분에 대한 다음 버전을 제안합니다. 미리보기 <small>pre-release</small>, 빌드 번호 <small>build</small> 부분은 처리하지 않습니다.

## 관련 내용

-   [GitHub: bbonkr/next-version-proposal-action](https://github.com/bbonkr/next-version-proposal-action)
-   [GitHub marketplace: next-version-proposal-action](https://github.com/marketplace/actions/next-version-proposal-action)
-   [GitHub actions: github-context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context)
-   [GitHub workflows event trigger: pull_request](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request)
-   [GitHub Actions: expression](https://docs.github.com/en/actions/learn-github-actions/expressions#functions)
-   [GitHub CLI](https://docs.github.com/en/actions/using-workflows/using-github-cli-in-workflows)
-   [GitHub rest: list-pull-requests](https://docs.github.com/ko/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests)
-   [GitHub rest: list-matching-references](https://docs.github.com/ko/rest/git/refs?apiVersion=2022-11-28#list-matching-references)

[^sember]: https://semver.org/
