---
title: 나의 NPM 패키지 만들기
date: 2020-04-25 22:41:36
categories:
  - HowTo
tags:
  - npm
  - typescript
intro:
comments:
---

자주 사용되는 기능을 Typescript 로 작성해서 NPM 에 게시한 후 다른 프로젝트에서 사용하고 싶어 NPM 에 패키지를 어떻게 공개하는지를 확인했습니다.

저는 `@bbon` 스코프를 사용해서 `@bbon/formatter` 패키지를 게시할 것입니다.

> [스코프 npm-scope](https://docs.npmjs.com/using-npm/scope.html) 페이지에서 정보를 확인할 수 있습니다.

npm 패키지는 이름이 고유해야 하는데, 약 1,268,126 개의 공개된 패키지 (2020-04-25 현재) 가 존재하는 상태에서 패키지 이름을 결정하는 것은 매우 어렵습니다만, 스코프를 사용하면 원하는 패키지 이름을 사용할 수 있다고 생각되었습니다.

따라하면서 패키지를 게시하시려면 아래 내용을 확인하기 전에 [npm](https://www.npmjs.com/) 계정을 만들고 시작하는 것을 제안합니다.

## 프로젝트 구성

GitHub 에 저장소를 만들고, 로컬 저장소로 복제한 후 시작합니다.

### 프로젝트 초기화

프로젝트를 초기화합니다.

```bash
$ npm init
```

`package.json` 파일을 편집기로 열고 필요한 정보를 편집합니다.

> [package.json](https://github.com/bbonkr/bbon-formatter/blob/master/package.json) 파일을 확인하십시오.

```json
{
  "name": "@bbon/formatter",
  "version": "1.0.0",
  "description": "Format the entered values.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bbonkr/bbon-formatter.git"
  },
  "homepage": "https://github.com/bbonkr/bbon-formatter",
  "bugs": {
    "url": "https://github.com/bbonkr/bbon-formatter/issues"
  },
  "keywords": ["formatting", "string", "utility"],
  "author": "Pon Cheol Ku <dev@bbon.kr> (http://bbon.kr)",
  "license": "MIT"
}
```

> package.json 파일의 명세는 [npm-package.json](https://docs.npmjs.com/files/package.json) 페이지에서 확인할 수 있습니다.

### 프로젝트 설정

기능을 구현하기 위해서 타입스크립트를 사용합니다.

코드 작성 규칙 지정을 위해 eslint, prettier 를 사용합니다.

단위테스트는 jest를 사용합니다.

의존 패키지를 설치합니다.

```bash
$ npm install --save-dev typescript eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-prettier jest @types/jest @types/node ts-jest
```

`.prettierrc` 파일을 만들고, 구성 내용을 입력합니다.

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 4
}
```

`.eslintrc` 파일을 만들고, 구성 내용을 입력합니다.

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018, // Allows for the parsing of modern ECMAScript features
    "sourceType": "module" // Allows for the use of imports
  },
  "rules": {
    "no-console": "warn"
  }
}
```

`.eslintignore` 파일을 만들고 내용을 편집합니다.

```plaintext
dist/
```

.gitignore 파일을 만들고 내용을 편집합니다.

```plaintext
node_modules/
dist/
.jest/
```

### 타입스크립트 프로젝트 추가

`tsc --init` 명령으로 타입스크립트 프로젝트 파일 `tsconfig.json`을 추가합니다.

```bash
$ npx tsc --init
```

> tsconfig.json 파일의 명세는 [tsconfig.json - typescript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 페이지에서 확인할 수 있습니다.

만들어진 `tsocnfig.json` 파일의 내용을 편집합니다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "exclude": ["__test__", "./**/*.spec.ts", "dist"]
}
```

### 코드 작성

src 디렉터리를 만들고 코드를 작성합니다.

`src/StringFormatter.ts` 파일의 내용입니다.

```typescript
/**
 * 포맷팅 기능을 제공합니다.
 *
 * @export
 * @class StringFormatter
 */
export class StringFormatter {
  /**
   * 숫자에 1000 단위 구분자를 추가해서 문자열로 출력합니다.
   *
   * @param {(number | string)} value
   * @param {string} delimiter 구분자; 기본값: **,** 콤마 문자
   * @returns {string}
   * @memberof StringFormatter
   */
  public NumberWithDelimiter(value: number | string, delimiter = ","): string {
    let stringValue = "";
    let fraction = "";
    if (typeof value === "number") {
      stringValue = value.toString();
    }

    if (typeof value === "string") {
      stringValue = value;
    }

    if (stringValue.indexOf(".") >= 0) {
      const splittedValue = stringValue.split(".");

      if (splittedValue.length > 1) {
        stringValue = splittedValue[0];
        fraction = splittedValue[1];
      }
    }

    stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

    return `${stringValue}${fraction ? `.${fraction}` : ""}`;
  }
}
```

`src/index.ts` 파일의 내용입니다.

```typescript
export { StringFormatter } from "./StringFormatter";
```

### 단위테스트 추가

`src/StringFormatter.spec.ts` 파일의 내용입니다.

```typescript
import { StringFormatter } from "./StringFormatter";

describe("StringFormatter", () => {
  const formatter = new StringFormatter();
  it("세자리마다 구분자가 추가된 숫자 형식의 문자열", () => {
    expect(formatter.NumberWithDelimiter(1000)).toBe("1,000");
  });

  it("큰 숫자도 세자리마다 구분자가 추가된 숫자 형식의 문자열", () => {
    expect(formatter.NumberWithDelimiter(12345678901234)).toBe(
      "12,345,678,901,234"
    );
  });

  it("소수점 아래 값은 구분자가 추가되지 않습니다.", () => {
    expect(formatter.NumberWithDelimiter(1000.1234)).toBe("1,000.1234");
  });

  it("숫자형식의 문자열을 입력하면 세자리마다 구분자가 추가된 숫자 형식의 문자열", () => {
    expect(formatter.NumberWithDelimiter("1000")).toBe("1,000");
  });

  it("숫자형식의 문자열을 입력하면 소수점 아래 값은 구분자가 추가되지 않습니다.", () => {
    expect(formatter.NumberWithDelimiter("1000.1234")).toBe("1,000.1234");
  });

  it("빈 분자열은 빈 문자열을 반환합니다.", () => {
    expect(formatter.NumberWithDelimiter("")).toBe("");
  });
});
```

jest 구성내용을 package.json 파일에 추가합니다.

```json
{
  // ... 이전 내용
  "jest": {
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "globals": {
      "ts-jest": {
        "tsConfig": "tsconfig.json"
      }
    },
    "testRegex": "\\.(test|spec)\\.((js|ts))$",
    "setupFilesAfterEnv": ["./__test__/setup.ts"],
    "cacheDirectory": "./.jest/cache"
  }
}
```

## NPM 스크립트

빌드, 린트, 테스트 스크립트를 추가합니다.

```json
{
  // ... 이전내용
  "scripts": {
    "test": "jest",
    "build": "tsc",
    "lint": "eslint ./src/**/*.ts",
    "lint:fix": "eslint ./src/**/*.ts --fix"
  }
}
```

빌드 스크립트 실행 명령은 아래와 같습니다.

```bash
$ npm run build
```

빌드 스크립트를 실행하면 dist 디렉터리가 만들어지고, dist 디렉터리에 타입스크립트로 작성한 코드에서 트랜스파일된 `StringFormatter.js`, `index.js`, `StringFormatter.d.ts`, `index.d.ts` 파일이 만들어 집니다.

테스트 스크립트 실행 명령은 아래와 같습니다.

```bash
$ npm run test

> @bbon/formatter@1.0.1 test D:\repos\formatter
> jest

 PASS  src/StringFormatter.spec.ts
  StringFormatter
    √ 세자리마다 구분자가 추가된 숫자 형식의 문자열 (1ms)
    √ 큰 숫자도 세자리마다 구분자가 추가된 숫자 형식의 문자열
    √ 소수점 아래 값은 구분자가 추가되지 않습니다. (1ms)
    √ 숫자형식의 문자열을 입력하면 세자리마다 구분자가 추가된 숫자 형식의 문자열
    √ 숫자형식의 문자열을 입력하면 소수점 아래 값은 구분자가 추가되지 않습니다.
    √ 빈 분자열은 빈 문자열을 반환합니다.

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.646s, estimated 3s
Ran all test suites.
```

## NPM 패키지 게시 준비

NPM 패키지를 게시하기 전에 패키지에 포함될 파일을 지정합니다.

패키지를 사용하는 분의 입장에서 필요없는 파일은 제외하고, 꼭 필요한 파일만 전달하는 것이 좋겠습니다.

현재 구성된 프로젝트를 빌드하면 dist 디렉터리가 만들어지고, 타입스크립트로 작성된 코드의 트랜스파일 결과가 저장됩니다.

따라서, dist 디렉터리의 내용은 NPM 패키지에 꼭 포함되어야 합니다.

다른 유명한 패키지의 내용을 확인해보니, 패키지 정보와 라이선스 정보도 포함하고 있습니다.

필요한 파일만 전달되도록 구성하기 위해 `.npmignore` 파일을 만들고 내용을 편집합니다.

`.npmignore` 파일의 내용입니다.

```plaintext
__test__/
src/
.jest/
.eslintignore
.eslintrc
.prettierrc
tsconfig.json
```

npm 패키지에서 제외하는 이유는 아래와 같습니다.

\_\_test\_\_ 디렉터리는 jest 전역 구성을 위한 코드가 있습니다.

src 디렉터리는 타입스크립트로 작성된 소스코드가 있습니다.

.jest 디렉터리는 jest 테스트의 캐시 파일이 있습니다.

npm 패키지 정보에 메인 파일이름과 형식 파일이름을 추가합니다.

package.json 파일의 내용입니다.

```json
{
  // ...이전 내용
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

## NPM 패키지 게시

npm 패키지를 게시하기 위해 인증 정보를 저장합니다.

`npm login` 명령으로 인증정보를 저장할 수 있습니다.

```bash
$ npm login
```

계정이름, 비밀번호, 전자우편주소, 다중인증을 사용중이면 다중인증정보를 입력하면 인증정보가 저장됩니다.

`npm config ls` 명령으로 정보를 확인할 수 있습니다.

```bash
$ npm config ls
```

로그인이 되었으면, 준비해둔 npm 스크립트로 빌드합니다.

```bash
$ npm run build
```

dist 디렉터리에 파일 작성된 것을 확인합니다.

### NPM 패키지 최초 게시

문제가 없으면 npm publish 명령으로 게시합니다.

이 때, 스코프 패키지는 기본적으로 비공개 패키지로 게시됩니다. 저는 공개 패키지로 게시할 것이므로 `--access public` 옵션을 사용합니다.

```
$ npm publish --access public
```

정상적으로 게시되면 npm 사이트에서 게시된 패키지를 확인할 수 있습니다.

[@bbon/formatter](https://www.npmjs.com/package/@bbon/formatter) 페이지와 같이 정보가 제공됩니다.

### NPM 패키지 판올림

이후 변경된 내용으로 NPM 패키지를 업데이트하려면 package.json 파일의 버전을 변경해서 게시해야 합니다.

```
{
    // ... 이전내용
    "version": "1.0.1"
}
```

빌드 스크립트를 실행해서 변경된 내용을 dist 디렉터리 파일에 반영합니다.

문제가 없으면 npm publish 명령으로 게시합니다.

이 때, 스코프 패키지는 기본적으로 비공개 패키지로 게시됩니다. 저는 공개 패키지로 게시할 것이므로 `--access public` 옵션을 사용합니다.

```
$ npm publish --access public
```

> [Creating and publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) 페이지에서 관련 정보를 확인할 수 있습니다.

정상적으로 게시되면 npm 사이트에서 게시된 패키지를 확인할 수 있습니다.

[@bbon/formatter](https://www.npmjs.com/package/@bbon/formatter) 페이지와 같이 정보가 제공됩니다.

## NPM 패키지 사용

게시한 NPM 패키지는 다른 패키지 사용과 동일하게 사용할 수 있습니다.

새로은 프로젝트를 준비하고, 아래 명령으로 패키지를 설치합니다.

```bash
$ npm install --save @bbon/formatter
```

설치된 패키지의 내용을 확인합니다.

> node_modules/@bbon/formatter 디렉터리에서 확인할 수 있습니다.

dist 디렉터리와 라이선스 파일, 패키지 정보, README.md 파일만 포함되어 있음을 확인할 수 있습니다.

```plaintext
프로젝트 디렉터리
│  index.js
│  package-lock.json
│  package.json
│
└─node_modules
    └─@bbon
        └─formatter
            │  LICENSE
            │  package.json
            │  README.md
            │
            └─dist
                    index.d.ts
                    index.js
                    StringFormatter.d.ts
                    StringFormatter.js
```

## 마침

전체 코드는 [GitHub: bbon-formatter](https://github.com/bbonkr/bbon-formatter) 에서 확인할 수 있습니다.
