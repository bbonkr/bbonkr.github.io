---
title: Delete batch using Entity Framework Core
date: 2022-01-08
categories: 
  - "blog"
  - "computing"
  - "repository"
tags: 
  - "dotnet"
  - "net-6"
  - "ef"
  - "ef-core"
  - "efcore"
  - "entityframework"
  - "entityframeworkcore"
  - "github"
  - "github-repository"
github: # If you want to show github buttons, fill owner and repo
  owner: bbonkr
  repo: sample.ef.batch
---    

[Entity Framework Core: Bulk updates](https://docs.microsoft.com/en-us/ef/core/performance/efficient-updating#bulk-updates) 를 읽고, 어느 정도 성능향상이 있을까 궁금해서 간략하게 코드를 작성해서 실행 시간을 측정했습니다.

## 프로젝트 설명

### 환경

- Visual Studio 2022 (v17.0.4)
- Localdb (appsettings.json 에서 연결문자열을 확인하세요.)
- .NET 6
- EntityFrameworkCore v6.0.1

### 마이그레이션

엔티티를 변경해서 확인하려면 아래 명령을 참조해서 마이그레이션 코드를 추가해야 합니다.

```bash
# DataContext 가 포함된 프로젝트 디렉터리로 이동합니다.
$ cd src/Sample.Data
# 마이그레이션 코드를 작성합니다.
$ dotnet ef migrations add "Initialize database" --context AppDbContext --startup-project ../Sample.App --project ../Sample.Data.SqlServer --json
```

## 확인

### 행 추가 (#1-1, #1-2)

```sql
-- Declaring variables 

DECLARE @inserted0 TABLE ([Id] bigint, [_Position] [int]);

MERGE [UserToken] USING (
VALUES (@p0, @p1, @p2, @p3, 0),
(@p4, @p5, @p6, @p7, 1),
(@p8, @p9, @p10, @p11, 2),
-- 생략
(@p160, @p161, @p162, @p163, 40),
(@p164, @p165, @p166, @p167, 41)) AS i ([CreatedAt], [ExpiresAt], [Purpose], [Token], _Position) ON 1=0
WHEN NOT MATCHED THEN
INSERT ([CreatedAt], [ExpiresAt], [Purpose], [Token])
VALUES (i.[CreatedAt], i.[ExpiresAt], i.[Purpose], i.[Token])
OUTPUT INSERTED.[Id], i._Position
INTO @inserted0;
```

### 행 삭제 (#2)

DELETE 문이 각 행별로 작성되어 실행됩니다.

1,000 행을 대상으로 약 507 밀리초가 소요되었습니다.

```csharp
var deleteCandidate = Context.UserTokens.Where(x => x.ExpiresAt <= DateTime.UtcNow);

Context.UserTokens.RemoveRange(deleteCandidate);

await Context.SaveChangesAsync();
```

```sql
-- Declaring variables 

DELETE FROM [UserToken]
WHERE [Id] = @p0;
SELECT @@ROWCOUNT;

DELETE FROM [UserToken]
WHERE [Id] = @p1;
SELECT @@ROWCOUNT;

DELETE FROM [UserToken]
WHERE [Id] = @p2;
SELECT @@ROWCOUNT;

-- 생략
```

### 행 삭제 (#4)

SQL 문으로 삭제 명령을 정의하고, 실행합니다.

> ANSI sql 문으로 작성하면 DBMS 의존을 줄일 수 있다고 생각합니다.

1,000 행을 대상으로 약 17 밀리초가 소요되었습니다.

```csharp
var sql = string.Empty;
sql += $"DELETE FROM {nameof(UserToken)} ";
sql += $" WHERE {nameof(UserToken.ExpiresAt)} <= GetUtcDate()";

await Context.Database.ExecuteSqlRawAsync(sql);
```

### SQL 문 실행시 트랜잭션 확인 (#3)

SQL 문으로 명령을 실행할 때, 트랜잭션을 확인합니다.

SQL 문의 결과가 커밋되지 않고 정상적으로 롤백됨을 확인했습니다.

```csharp
using (var transaction = Context.Database.BeginTransaction())
{
    try
    {
        await Context.Database.ExecuteSqlRawAsync(sql);
        throw new Exception("Test");
        await transaction.CommitAsync();
    }
    catch (Exception)
    {
        await transaction.RollbackAsync();
    }
}
```

## 마침

일괄 작업으로 변경, 삭제 작업을 실행할 때, 성능향상을 위해 SQL 문을 고려할 필요가 있을 것 같습니다.

만료된 토큰 정리, 로그 정리 등에 사용하면 좋을 것으로 생각됩니다.
