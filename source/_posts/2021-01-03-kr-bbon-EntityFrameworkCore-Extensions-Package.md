---
title: kr.bbon.EntityFrameworkCore.Extensions Package
date: 2021-01-03 20:21:05
categories:
    - Package
tags:
    - nuget
    - .net
    - ef
    - entity-framework
intro:
comments:
---

|  |  |  |
| :--: | :--: | :--: | 
| [![](https://img.shields.io/nuget/v/kr.bbon.EntityFrameworkCore.Extensions)](https://www.nuget.org/packages/kr.bbon.EntityFrameworkCore.Extensions) | [![](https://img.shields.io/nuget/dt/kr.bbon.EntityFrameworkCore.Extensions)](https://www.nuget.org/packages/kr.bbon.EntityFrameworkCore.Extensions) | ![publish to nuget](https://github.com/bbonkr/kr.bbon.EntityFrameworkCore.Extensions/workflows/publish%20to%20nuget/badge.svg) |


[Nuget: kr.bbon.EntityFrameworkCore.Extensions](https://www.nuget.org/packages/kr.bbon.EntityFrameworkCore.Extensions) 페이지에서 패키지를 찾을 수 있습니다.

## 개요

[Microsoft.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore) 패키지를 사용하면서, 데이터를 정렬를 자주 사용합니다.

이 때, 문자열 형식으로 필드 이름으로 정렬할 수 있으면 편리할 것 같아서 확장을 작성했습니다.

## 기능

### Sort 확장 메서드

IQueryable<T> 인터페이스에 Sort 확장 메서드를 추가합니다.

Sort 확장메서드는 내부적으로 OderBy, OrderByDescending, ThenBy, ThenByDescending 확장 메서드를 사용합니다.

`Sort(string fieldName, [bool isAscending = true])`

> fieldName 은 대소문자를 구분하지 않습니다.
> fieldName 에 해당하는 필드를 찾을 수 없으면 예외가 발생합니다.

사용법:

[Document 형식](https://github.com/bbonkr/kr.bbon.EntityFrameworkCore.Extensions/blob/6833ee59ac8c15e29db2a1e95422387f2f772183/example/Example.App/Document.cs#L5)의 Content 오름차순, Id 내림차순으로 정렬하는 코드입니다. [[코드 보기](https://github.com/bbonkr/kr.bbon.EntityFrameworkCore.Extensions/blob/6833ee59ac8c15e29db2a1e95422387f2f772183/example/Example.App/Program.cs#L48)]

```cshap
using(var ctx = new ExampleDbContext()){
    var result = ctx.Documents.Sort(nameof(Document.Content)).Sort(nameof(Document.Id), false);
}
```

## 관련 링크

-   [GitHub: kr.bbon.EntityFrameworkCore.Extensions](https://github.com/bbonkr/kr.bbon.EntityFrameworkCore.Extensions)
-   [Nuget: kr.bbon.EntityFrameworkCore.Extensions](https://www.nuget.org/packages/kr.bbon.EntityFrameworkCore.Extensions)
-   [.NET](https://dotnet.microsoft.com/)
-   [Nuget: Microsoft.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore)
