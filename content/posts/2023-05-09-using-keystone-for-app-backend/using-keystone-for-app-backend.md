---
title: 'Using Keystone for app Backend'
date: 2023-05-09
categories:
    - Blog
    - Computing
tags:
    - keystonejs
    - nodejs
    - typescript
featuredImage:
comments: false
github: # If you want to show github buttons, fill owner and repo
    owner: bbonkr
    repo: resume-backend-keystone
---

최근 이력사항 데이터를 정리하면서, 이력사항 데이터 관리를 위한 백엔드 응용프로그램 작성을 진행하고 있었습니다.

익숙한 .NET 환경에서 시작하려고, [저장소를 추가](https://github.com/bbonkr/resume.management)하고 프로젝트를 준비한 후 엔티티 모델을 정의했습니다.

계획했던 내용은 아래와 같습니다.

-   데이터 처리를 위한 백엔드 응용프로그램: ASP.NET Core
-   백엔드 API 를 활용하는 프론트엔드 응용프로그램: next.js

최근 업무가 늘어 진도가 잘 나가지 않습니다.

그래서, 귀찮음을 이겨내기 위해 다른 도구를 찾아보기 시작했습니다.

## KeystoneJS

> The superpowered CMS for developers

[KeystoneJS](https://keystonejs.com) 를 사용하면, 관리하려고 하는 데이터의 스키마를 기술하면 데이터를 관리하기 위한 엔드포인트와 간략한 UI 까지 작성된다고 합니다.

데이터를 관리하기 위한 엔드포인트는 [GraphQL](https://graphql.org) API 라고 합니다.

매우 편리해 보여, 기존 계획했던 구현사항을 모두 폐기하고, KeystoneJS 를 사용해서 이력사항 데이터를 관리하는 것으로 결정했습니다.

### 준비

[시작하기 위한 문서](https://keystonejs.com/docs/getting-started)가 간략하게 잘 정리되어 있습니다.

```shell
# nodejs 환경이 준비되어 있는지 확인합니다
$ node -v
v18.16.0
$  npm -v
9.5.1
# 작업 디렉터리를 작성할 위치로 이동합니다
$ cd your/path/
# 프로젝트를 작성합니다.
$ npx create-keystone-app@latest
✨ You're about to generate a project using Keystone 6 packages.

✔ What directory should create-keystone-app generate your app into? resume-backend-keystone

⠋ Installing dependencies with yarn. This may take a few minutes.
⚠ Failed to install with yarn.
✔ Installed dependencies with npm.


🎉  Keystone created a starter project in: resume-backend-keystone

  To launch your app, run:

  - cd resume-backend-keystone
  - npm run dev

  Next steps:

  - Read resume-backend-keystone/README.md for additional getting started details.
  - Edit resume-backend-keystone/keystone.ts to customize your app.
  - Open the Admin UI
  - Open the Graphql API
  - Read the docs
  - Star Keystone on GitHub
```

`create-keystone-app@latest` CLI 도구를 실행하면 필요한 정보를 문답식으로 입력받는 절차가 시작됩니다.

간단하게 프로젝트 이름만 지정하면, 입력된 프로젝트 이름을 기반으로 디렉터리를 작성하고, 해당 디렉터리에 기본적으로 필요한 파일들이 복사됩니다.

```shell
# 작성된 프로젝트 디렉터리로 이동합니다.
$ cd path/to/project
# 의존 패키지를 설치합니다.
$ npm install
...
# 기본 구성으로 개발서버를 시작합니다.
$ npm run dev
```

웹 브라우저를 열고, 주소창에 개발서버의 주소를 입력합니다.

`http://localhost:3000`

웹 브라우저에서 사용자 작성 절차가 진행되고, 이 후 추가한 사용자로 로그인하면, User 와 Post 항목을 확인할 수 있습니다.

웹 브라우저에서 확인해보니, 기본적인 조회, 입력, 수정, 삭제가 구현되어 있습니다.

GraphQL API 백엔드 서버와 nextjs 프론트엔드 서버가 통합되어 실행되는 구조인 것 같습니다.

원하는 기능을 추가하려고 하지만 않으면, 매우 편리하게 금방 완료할 수 있을 것 같습니다.

### 스키마

프로젝트 디렉터리의 `schema.ts` 파일을 열고, 편집을 시작합니다.

필요한 엔티티를 결정하고, 스키마를 기술했습니다.

스키마를 정의하는 형식은 아래 코드와 같습니다.

목록의 이름을 결정하고, 액세스와 필드 목록, 필요하면 훅을 작성합니다.

```typescript
import { list } from '@keystone-6/core';

export const lists: Lists = {
    // 목록 (데이터 집합)의 이름; 데이터베이스의 테이블
    User: list({
        // 목록 접근 제어
        access: {
            // 작성된 UI 에서 데이터 접근제어
            operation: {},
            // ... 필요가 없을 것 같아 찾아보지 않았습니다.
            item: {},
            // GraphQL API 에서 데이터 접근제어
            filter: {},
        },
        // 관리할 데이터 목록; 데이터베이스의 열(Column)
        fields: {},
        // 데이터 입출력시 추가적으로 동작할 기능
        hooks: {},
    }),
    // ...
};
```

목록의 필드를 정의할 때, `relationship` 형식을 사용해서 다른 목록과의 관계를 설정할 수 있게 되어 있습니다.

```typescript
import { relationship } from '@keystone-6/core/fields';
```

Post 와 Tag 목록의 다대다 관례설정의 예는 아래와 같습니다.

```typescript
import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';

export const lists: Lists = {
    // ...
    Post: list({
        // ...
        fields: {
            tags: relationship({
                ref: 'Tag.posts',
                many: true,
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    inlineEdit: { fields: ['name'] },
                    linkToItem: true,
                    inlineConnect: true,
                    inlineCreate: { fields: ['name', 'owner'] },
                },
            }),
        },
        // ...
    }),
    // ...
    Tag: list({
        // ...
        fields: {
            posts: relationship({
                ref: 'Post.tags',
                many: true,
                ui: { hideCreate: true, displayMode: 'count' },
            }),
        },
        // ...
    }),
    // ...
};
```

접근제어를 설정하기 위해 사용할 수 있는 함수는 아래와 같습니다.

예1) 로그인된 사용자만 UI 에서 리스트 목록을 확인 가능

```typescript
import { list } from '@keystone-6/core';

const isAuthorized = ({ session }: { session: Session }) =>
    Boolean(session?.data?.id);

export const lists: Lists = {
    User: list({
        access: {
            operation: {
                query: isAuthorized,
                // ...
            },
            item: {},
            // GraphQL API 에서 데이터 접근제어
            filter: {},
        },
        // ...
    }),
    // ...
};
```

예2) 로그인 사용자는 본인이 작성자한 항목만 조회 가능

> 목록의 필드에 소유자를 표시하는 owner 필드가 있어야 합니다.

```typescript
import { list } from '@keystone-6/core';

const filterByOwner = ({ session }: { session: Session }) => {
    if (session?.data?.isAdmin ?? true) {
        return true;
    }

    if (session?.data?.id) {
        return {
            owner: {
                id: {
                    equals: session.data.id,
                },
            },
        };
    }

    return false;
};

export const lists: Lists = {
    User: list({
        access: {
            filter: {
                query: filterByOwner,
            },
        },
        // ...
    }),
    // ...
};
```

[문서](https://keystonejs.com/docs/fields/overview)를 확인하고, 지원하는 필드를 활용해서 필요한 필드들을 모두 정의합니다.

필드를 모두 정의한 후 개발서버를 시작해서 데이터 입출력이 모두 정상적으로 동작하는지 확인해보니, 의도한 것과 같이 잘 동작하는 것을 확인했습니다.

### 데이터베이스

매우 중요한 데이터가 아니고, 많은 트래픽을 처리할 대상이 아니기 때문에 편리하게 파일로 관리할 수 있는 `Sqlite` 를 사용하는 것으로 결정했습니다.

Sqlite 를 데이터베이스로 사용하면 스키마가 변경될 때 복잡하게 마이그레이션을 진행할 필요도 없는 것으로 확인했습니다.

### 도커

GitHub workflows 를 활용해서 이미지를 빌드하고, 관리중인 레지스트리에 업로드하려고 하니 이미지 파일의 크기가 처리할 수 있는 한계를 넘어서 버려 로컬 서버에서 빌드해서 업로드하는 것으로 관리방법을 채택했습니다.

자동화하면 편리한데, GitHub workflows 에서는 500MB (정확한 크기는 잘 모르겠습니다) 보다 큰 파일은 처리할 수 없는 것 같습니다.

`413 Request Entity Too Large`

로컬서버에서 이미지를 빌드한 후 동일한 레지스트리에 docker push 를 실행하면 문제없이 업로드되고 있어 더이상 해결방법을 찾는 것을 중지했습니다.

### 게시

작성된 이력사항 백엔드 응용프로그램이 실행될 서버에 `docker-compose.yml` 파일을 작성해서 컨테이너를 실행할 준비를 합니다.

sqlite 파일을 마운트해서 컨테이너 외부에서 파일을 관리합니다.

문제없이 실행된 것을 확인하고, 역 프록시 구성으로, 도메인을 연결해서 웹브라우저에서 확인합니다.

로그인, 데이터 조회, ... 잘 동작합니다.

그런데, 데이터를 입력하거나, 변경, 삭제를 시도하면 오류 메시지가 출력되고, 데이터 변경이 반영되지 않습니다.

컨테이너의 사용자가 컨테이너에 마운트한 파일에 쓰기 권한이 없는 것 같습니다.

이미지를 빌드한 기반 이미지를 확인하니, 사용자 이름 node 그룹 node 로 확인됩니다.

> [Non-root user](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user)

```shell
# 컨테이너 내부 사용자 정보
$ id node
uid=1000(node) gid=1000(node) groups=1000(node)
```

호스트 서버에서 sqlite 데이터베이스 파일의 소유자를 1000:1000 으로 변경해서 권한 문제를 해결할 수 있습니다.

```shell
$ chwon -R 1000:1000 ./sqlite.db
```

소유자를 변경한 후 데이터 입력이 정상적으로 실행됩니다.

### 연동

환경변수로 CORS 허용 원본을 설정할 수 있게 구성해뒀습니다.

컨테이너 실행시 [이력사항 웹앱](https://resume.bbon.me)의 주소를 환경변수에 입력해서, 이력사항 웹앱이 요청하면 정상응답하도록 했습니다.

이력사항 웹앱 서버측에서 이력사항 백엔드 GraphQL API 를 사용해서 데이터를 요청하게 변경한 후 게시하여 데이터 연동을 완료합니다.

```graphql
query User($where: UserWhereUniqueInput!) {
  user(where: $where) {
    # ...
    aboutMe: # ...
    contentCategories: # ...
    contents: # ...
    skillCategories: # ...
    skills:  # ...
  }
}
```

GraphQL 서버를 작성하는 것은 싫어하지만 사용하는 입장에서 생각하면 한번에 필요한 데이터를 원하는 모양으로 가져올 수 있어 좋은 것 같습니다.

### 완료

길게 계획하고 천천히 진행하려고 했는데, 대부분의 구현이 KeystoneJS 내부에서 처리되어 금방 끝나버렸습니다.

## 마치며

사이드 프로젝트로 재미난 서비스를 준비할 때, KeystoneJS를 사용해서 백엔드를 구성하면 매우 빠르게 구현할 수 있을 것이라 생각합니다.

서비스를 확장해야 하는 시점이 오면, 그 때 필요한 기능의 백엔드를 구현하기 시작해도 될 것 같습니다.

---

관련 저장소:

-   https://github.com/bbonkr/resume-backend-keystone
-   https://github.com/bbonkr/resume
-   https://github.com/keystonejs/keystone
