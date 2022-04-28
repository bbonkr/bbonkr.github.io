---
title: "Typescript project with eslint@8"
date: 2022-04-28
categories:
  - howto
tags:
  - typescript
  - eslint
  - npm
featuredImage: 
comments: false
github: # If you want to show github buttons, fill owner and repo
  owner: bbonkr
  repo: bbon-formatter
---    

타입스크립트를 사용하는 프로젝트에 린트를 구성해서 사용하고 있습니다.

[eslint](https://www.npmjs.com/package/eslint) 패키지를 업데이트(v8.x) 하고 나니,  린트 실행시 오류가 발생합니다.

오류 메시지는 아래와 같습니다.
```plaintext
Oops! Something went wrong! :(

ESLint: 8.14.0

TypeError: Failed to load plugin '@typescript-eslint' declared in '.eslintrc': Class extends value undefined is not a constructor or null
```

## 해결 방법

동일한 문제에 대한 [깃허브 이슈](https://github.com/eslint/eslint/issues/15149#issuecomment-943117082)가 있습니다.

아래 두 패키지가 [eslint](https://www.npmjs.com/package/eslint)@7 을 대상으로 하고 있습니다.

- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)@4
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)@4

다행히 두 패키지 모두 [eslint](https://www.npmjs.com/package/eslint)@8을 대상으로한 업데이트가 있습니다.

```bash
$ npm i @typescript-eslint/parser@5 @typescript-eslint/eslint-plugin@5
```

두 패키지를 업데이트(v5)한 후 린트가 정상적으로 동작합니다.

## 관련 링크

- [Fail to lint with eslint@8 #108](https://github.com/bbonkr/bbon-formatter/issues/108)

