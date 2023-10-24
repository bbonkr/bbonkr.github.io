---
title: '깃허브 워크플로우를 활용한 자동 풀 리퀘스트 작성'
date: 2023-09-10
categories:
    - Blog
    - Computing
tags:
    - automation
    - git
    - git-flow
    - github
    - github-actions
    - github-workflows
draft: false
featuredImage:
comments: false
github: # If you want to show github buttons, fill owner and repo
    owner: bbonkr
    repo: get-overview-of-pull-requests-action
---

## 개요

### 깃 플로우 <Small>Git flow</small>

코드의 버전 제어를 위해 깃 <small>Git</small> 을 사용하면 보통 깃 플로우 <small>Git flow</small> 를 활용하고 계실 것으로 생각합니다.

통상적으로 깃 플로우를 활용하면 기본이 되는 브랜치 (보통 main) 와 코드 통합용 브랜치 (보통 dev), 작업용 브랜치 (features/\*, fix/\*, ...) ... 등 여러 브랜치를 관리해야 합니다.

작업이 완료된 코드는 여러 단계를 거쳐 기본 브랜치로 병합됩니다.

이 때, 브랜치간 병합과 코드 리뷰를 위해 깃허브의 풀 리퀘스트 기능을 많이 활용하고 계실 것으로 생각합니다.

### 현재 상태

제가 보통 관리는 저장소는 아래와 같이 처리하고 있습니다.

1. 작업 브랜치 (features/1-some-feature)에서 코드를 작성하고, 코드 통합을 위한 브랜치 (dev)로 풀 리퀘스트를 작성합니다.
2. 코드 리뷰가 필요한 경우 코드 리뷰를 진행하고, 관련 절차가 마무리되면 작업 브랜치의 변경사항을 코드 통합을 위한 브랜치에 병합니다.
3. 코드 통합을 위한 브랜치의 코드가 게시 등의 사유로 기본 브랜치로 병합되어야 하는 경우, 코드 통합을 위한 브랜치에서 기본 브랜치로 병합되는 풀 리퀘스트를 작성합니다.
4. 작성된 풀 리퀘스트는 필요한 절차를 마친 후 기본 브랜치로 병합합니다.

작업 브랜치에서 코드 통합을 위한 브랜치로의 풀 리퀘스트 작성은 자동화하지 않습니다.

> 자동화하려면 커밋 메시지 또는 다른 방법을 통해 가능하겠지만, 시간이 흐르면 잘 기억이 나지 않는 등의 사유로 의미가 없어져 버렸습니다.

하지만, 작업 브랜치에서 코드 통합을 위한 브랜치로의 풀 리퀘스트가 완료되는 경우 이 후 작성이 필요한 풀 리퀘스트는 자동화하면 수고를 줄일 수 있었습니다.

### 자동화

깃허브의 워크플로우는 여러가지 트리거를 제공하고 있습니다.

이 중 풀 리퀘스트가 완료되었을 때, 지정된 워크플로우를 실행하는 트리거를 활용하면 되겠다고 생각했습니다.

```yaml
name: 'Wokring branch pull closed as completed'

on: # rebuild any PRs and main branch changes
    pull_request:
        types: ['closed']

jobs:
    create-pr-to-main:
        if: github.event.pull_request.merged == true && github.event.pull_request.base.ref == 'dev'
        # ...
```

위 워크플로우 정의는 풀 리퀘스트가 완료되면 트리거 되는 워크플로우입니다.

그리고, `create-pr-to-main` 작업은 현재 이벤트 정보중 풀 리퀘스트가 병합되고, 풀 리퀘스트의 베이스 브랜치가 `dev` 브랜치면 실행됩니다.

그리고, 풀 리퀘스트의 작성은 깃허브 커맨드라인 도구 `gh`를 활용하면 커맨드라인에서 간편하게 작성할 수 있습니다.

## 풀 리퀘스트 작성 자동화

### 풀 리퀘스트의 작성

풀 리퀘스트를 작성하려면 기본적으로 아래 정보가 필요합니다.

1. 헤드 <small>head</small> 브랜치 이름
2. 베이스 <small>base</small> 브랜치 이름
3. 제목
4. 본문

헤드 브랜치는 현재 작업한 내용에 해당하는 브랜치입니다.
베이스 브랜치는 현재 작업한 내용을 병합하려는 브랜치입니다.

작성하려는 풀 리퀘스트의 헤드 브랜치는 워크플로우를 트리거한 완료된 풀 리퀘스트의 베이스 브랜치 이름을 사용하면 되겠습니다.

작성하려는 풀 리퀘스트의 베이스 브랜치는 깃 플로우에 의해 결정되는 부분이라 생각합니다.

> 깃 플로우의 정의에 따라 베이스 브랜치를 결정할 수 있게 지정해주시면 되겠습니다.

제목은 간략하게 베이스 브랜치 이름이나 필요한 정보를 결정하면 될 것 같습니다.

본문 역시 필요한 내용을 작성하면 되겠습니다. 저는 작성되는 풀 리퀘스트에 포함된 완료된 풀리퀘스트 목록을 사용하고 싶어서, 관련 풀리퀘스트를 수집하는 깃허브 액션을 작성해서 사용하고 있습니다.

> [bbonkr/get-overview-of-pull-requests-action](https://github.com/bbonkr/get-overview-of-pull-requests-action)
> 작성중인 풀 리퀘스트의 베이스 브랜치, 헤드 브랜치, 저장소의 기본 브랜치를 입력하면 이전 풀 리퀘스트 완료 시점부터 현재까지 저장소의 기본브랜치로 병합된 풀 리퀘스트의 번호 목록을 제공하는 깃허브 액션입니다.

### 깃허브 워크플로우

```yaml
name: 'PR completed'

on:
    pull_request:
        types: ['closed']

permissions:
    contents: write
    pull-requests: write

env:
    MAIN_BRANCH_NAME: main

jobs:
    create-or-update-pull:
        if: github.event.pull_request.merged == true && github.event.pull_request.base.ref == 'dev'
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Get overview of PULL_REQUEST
              uses: bbonkr/get-overview-of-pull-requests-action@v1
              id: get_overview
              with:
                  github_token: ${{ github.token }}
                  base: main
                  head: ${{ github.event.pull_request.base.ref }}
                  default_branch: dev

            - name: Create pull
              if: ${{ steps.get_overview.outputs.pull_number == '' }}
              run: |
                  gh pr create --base ${{ env.MAIN_BRANCH_NAME }} \
                    --head ${{ github.event.pull_request.base.ref }} \
                    --label '${{ steps.get_overview.outputs.labels }}' \
                    --project '${{ env.PROJECT_NAME }}' \
                    --reviewer ${{ steps.get_overview.outputs.reviewers }} \
                    --assignee ${{ steps.get_overview.outputs.assignees }} \
                    --body '${{ steps.get_overview.outputs.body }}' \
                    --title 'Release ${{ env.MAIN_BRANCH_NAME }} 🚀'
              env:
                  GITHUB_TOKEN: ${{ github.token }}

            - name: Update pull
              if: ${{ steps.get_overview.outputs.pull_number != '' }}
              run: |
                  gh pr edit ${{ steps.get_overview.outputs.pull_number }} \
                    --body '${{ steps.get_overview.outputs.body }}' \
                    --title 'Release ${{ env.MAIN_BRANCH_NAME }} 🚀' \
                    --add-label '${{ steps.get_overview.outputs.labels }}'
              env:
                  GITHUB_TOKEN: ${{ github.token }}
```

> 풀 업데이트 명령 실행시 권한관련 문제가 발생하면, `pull:write`, `content:write`, `org:read` 권한이 있는 개인 인증 토큰을 만들어 시크릿에 저장 후 사용하시면 문제가 해결되었습니다.

깃허브 워크플로우가 동작한 로그는 아래 링크에서 확인하실 수 있습니다.

> 시간이 지나면 실행 로그 접근이 불가능할 수도 있습니다.

-   [docs: Update README #22 bbonkr/get-overview-of-pull-requests-action](https://github.com/bbonkr/get-overview-of-pull-requests-action/actions/runs/5876132097)

## 마침

위에 소개해드린 워크플로우는 하나의 브랜치만 대상으로 하고 있어 크게 도움이 되지 않는다고 생각될 수 있습니다.

병합해야 하는 브랜치의 단계가 조금 많아지면, 많은 수고를 덜 수 있을 것이라 생각합니다.

그리고, 워크플로우에 필요하신 작업을 몇가지 더 추가하시면 직접 관리할 내용이 조금 줄어들수 있을 것이라 생각하며, 저와 비슷한 내용으로 고민하고 계신분들에게 도움이 되시면 좋겠습니다.

추가할 단계 추천

-   코드의 버전과 깃 태그 동기화
-   새 버전 작성시 깃허브 릴리즈 작성
