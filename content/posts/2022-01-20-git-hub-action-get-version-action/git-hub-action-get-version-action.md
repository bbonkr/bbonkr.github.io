---
title: "GitHub Action: Get Version Action"
date: 2022-01-20
categories: 
  - "blog"
  - "computing"
  - "repository"
tags: 
  - "github"
  - "github-actions"
  - "github-repository"
  - "node-js"
  - "nodejs"
  - "ts"
  - "typescript"
github: # If you want to show github buttons, fill owner and repo
  owner: bbonkr
  repo: get-version-action
---    

NPM package.json 또는 c# SDK 스타일 프로젝트 파일의 version 문자열을 추출하는 깃허브 액션입니다.

[![View on Marketplace: get-version-action](https://img.shields.io/badge/Marketplace-get--version--action-blueviolet)](https://github.com/marketplace/actions/get-version-action) [![출시 버전](https://img.shields.io/github/v/release/bbonkr/get-version-action?display_name=tag&style=flat-square&include_prereleases)](https://github.com/bbonkr/get-version-action/releases)

## get-version-action

### Overview

버전 이름이 필요한 단계에 값을 제공하기 위해 NPM package.json 또는 c# SDK 스타일 프로젝트 파일의 버전을 값을 추출합니다.

### Usages

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: bbonkr/get-version-action@v1.0.1
    id: get_version
    with:
      project: "./package.json"
  - name: logging
    run: |
      echo "Version=${{ steps.get_version.outputs.version }}"
```

### Inputs

| Name | Required | Description |
| :-- | :-: | :-- |
| project | ✅ | 프로젝트 파일의 경로입니다. |

> 사용가능한 프로젝트 파일
> 
> - NPM package.json
> - .csproj (c# SDK 스타일 프로젝트 파일)

### Outputs

| Name | Description |
| :-- | :-- |
| version | 버전 문자열입니다. 버전을 찾지 못한 경우 예외가 발생합니다. |

