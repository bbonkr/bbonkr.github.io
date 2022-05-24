---
title: "Enumerable String Union Type"
date: 2022-05-24
categories:
  - blog
  - HowTo
  - computing
tags:
  - typescript
  - tip
draft: true
featuredImage: 
comments: false
---    

지정된 문자열만 사용할 수 있는 문자열 변수를 선언할 때, 문자열 조합 형식 <small>String Union Type</small>을 사용합니다.

```typescript
type Status = 'Todo' | 'InProgress' | 'Done';

const status: Status = 'Todo'; // ✔️ OK
const status2: Status = 'None'; // ❌ Error
```

이 때, 문자열 조합 형식이 허용하는 문자열을 출력하려고 하면, 쉬운 방법이 생각나지 않습니다.

> 아래 코드는 임의로 작성한 코드이고, 동작하지 않습니다.

```jsx
const some: Status // ??
<select>
	{typeof(Status).map(status => <option value={status}>{status}</option>)} // ??
</select>
```

이를 위해 아래와 같이 형식 정의를 변경할 수 있습니다.

```typescript
const statusTypes = ['Todo', 'InProgress', 'Done'] as const;
type Status = typeof statusTypes[number];

const status: Status = 'Todo'; // ✔️ OK
const status2: Status = 'None'; // ❌ Error
```

첫번째, 두번째 `Status` 형식 정의는 동일하게 동작합니다.

이제 문자열 조합 형식이 허용하는 문자열을 쉽게 출력할 수 있습니다.

```jsx
<select>
	{statusTypes.map(status => <option value={status}>{status}</option>)} // 🙂
</select>
```



