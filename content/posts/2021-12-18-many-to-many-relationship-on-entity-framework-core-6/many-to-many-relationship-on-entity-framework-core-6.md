---
title: Many to many relationship on EntityFrameworkCore 6
date: 2021-12-18
categories: 
  - "blog"
  - "computing"
  - "repository"
tags: 
  - "dotnet"
  - "ef"
  - "efcore"
  - "entityframework"
  - "entityframeworkcore"
  - "github"
  - "github-repository"
github: # If you want to show github buttons, fill owner and repo
  owner: bbonkr
  repo: sample.ef.mtom 
---    

EntityFrameworkCore 6 에서 다대다 관계 구성이 향상되었다고 해서 관련 내용을 확인했습니다.

데이터 입출력시 중간 테이블을 거치지 않고 구현이 가능합니다.

[GitHub: bbonkr/sample.ef.mtom](https://github.com/bbonkr/sample.ef.mtom) 저장소에서 코드를 확인할 수 있습니다.

## 예제 테이블

### Student

| Name | Nullable | Constaint |
| :-- | :-: | :-: |
| Id | NN | PK |
| Name | NN |  |

### Cource

| Name | Nullable | Constaint |
| :-- | :-: | :-: |
| Id | NN | PK |
| Title | NN |  |

### Enrollment

| Name | Nullable | Constaint |
| :-- | :-: | :-: |
| StudentId | NN | PK |
| CourseId | NN | PK |

## 엔티티 타입 구성

### .net core 3.1

[features/net3](https://github.com/bbonkr/sample.ef.mtom/tree/features/net3) 브랜치에서 관련 코드를 확인할 수 있습니다.

```csharp
public class EnrollmentEntityTypeConfiguration : IEntityTypeConfiguration<Enrollment>
{
    public void Configure(EntityTypeBuilder<Enrollment> builder)
    {
        builder.HasKey(x => new { x.StudentId, x.CourseId });

        builder.Property(x => x.StudentId)
            .IsRequired();

        builder.Property(x => x.CourseId)
            .IsRequired();

        builder.HasOne(x => x.Student)
            .WithMany(x => x.Enrollments)
            .HasForeignKey(x => x.StudentId);

        builder.HasOne(x => x.Course)
            .WithMany(x => x.Enrollments)
            .HasForeignKey(x => x.CourseId);                
    }
}
```

### .NET 5

[features/net5](https://github.com/bbonkr/sample.ef.mtom/tree/features/net5) 브랜치에서 관련 코드를 확인할 수 있습니다.

.net core 3.1 구성에서 변경사항이 없습니다.

### .NET 6

EnrollmentEntityTypeConfiguration 클래스를 제거하고, CourseEntityTypeConfiguration 클래스에서 다대다 관계를 설정합니다.

[features/net6](https://github.com/bbonkr/sample.ef.mtom/tree/features/net6) 브랜치 혹은 main 브랜치에서 관련 코드를 확인할 수 있습니다.

```csharp
public class CourseEntityTypeConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Title)
            .IsRequired();

        builder.HasMany(x => x.Students)
            .WithMany(x => x.Courses)
            .UsingEntity<Enrollment>(
                j => j.HasOne(x => x.Student).WithMany(x => x.Enrollments).HasForeignKey(x => x.StudentId),
                j => j.HasOne(x => x.Course).WithMany(x => x.Enrollments).HasForeignKey(x => x.CourseId),
                j =>
                {
                    j.HasKey(x => new { x.StudentId, x.CourseId });
                });
    }
}
```

> 엔티티 타입 구성을 변경한 후 마이그레이션 코드를 작성해도 변경사항이 없습니다. 엔티티 타입 구성을 변경한 후 작성된 마이그레이션 코드: [20211218051811\_Change mtom](https://github.com/bbonkr/sample.ef.mtom/blob/features/net6/src/Sample.Data.SqlServer/Migrations/20211218051811_Change%20mtom.cs)

## 사용

### .net core 3.1

학생의 수업정보를 입력합니다.

```csharp
var enrollments = Context.Courses
    .ToList()
    .Where((_, index) => index < value)
    .Select(x => new Enrollment
    {
        CourseId = x.Id,
    });

student.Enrollments
    .AddRange(enrollments);
```

학생 정보와 학생의 수업을 쿼리합니다.

```csharp
var students = await Context.Students
    .Include(x => x.Enrollments)
    .Select(student => new
    {
        Name = student.Name,
        Courses = x.Enrollments.Select(enrollment => new
        {
            Title = enrollment.Course.Title,
        }),
    });
```

### .NET 5

변경사항이 없습니다.

### .NET 6

학생의 수업정보를 입력합니다.

Enrollments 를 사용해서 입력하지 않고, Courses 사용해서 입력할 수 있습니다.

```csharp
var coursesToEnroll = Context.Courses
    .ToList()
    .Where((_, index) => index < value);

student.Courses.AddRange(coursesToEnroll);
```

학생 정보와 수업정보를 쿼리합니다.

Enrollments 를 사용하지 않고, Courses 를 쿼리할 수 있어 직관적으로 사용할 수 있다고 생각됩니다.

```csharp
var students = await Context.Students
    .Include(x => x.Courses)
    .Select(student => new
    {
        Name = student.Name,
        Courses = student.Courses.Select(course => new
        {
            Title = course.Title,
        }),
    })
```

## 그 외

### dotnet-ef tool

dotnet CLI 를 사용해서 dotnet 도구를 해당 프로젝트 범위에서 관리하려면, 매니페스트 파일을 먼저 작성해야 합니다.

```bash
$ dotnet new tool-manifest
```

> 참조: [nuget: dotnet-ef](https://www.nuget.org/packages/dotnet-ef/) versions tab.

.net core 3.1

```bash
$ dotnet tool install --local dotnet-ef --version 3.1.22
```

.net 5

```bash
$ dotnet tool update --local dotnet-ef --version 5.0.13
```

.net 6

```bash
$ dotnet tool update --local dotnet-ef --version 6.0.1
```

### 마이그레이션 코드 작성

`Sample.App` 프로젝트를 시작프로젝트로 설정하고, AppDbContext 를 대상으로 `Sample.Data.SqlServer` 프로젝트에 마이그레이션 코드를 작성합니다.

```bash
$ cd src/Sample.Data
$ dotnet ef migrations add "Migrations name" --context AppDbContext --startup-project ../Sample.App --project ../Sample.Data.SqlServer 
```

> 마이그레이션 코드를 다른 프로젝트에서 관리할 수 있습니다.

## 결론

EFCore 6 에서 드디어 다대다 관계의 구현이 정리되어, 문제없이 원하는 모양으로 설정할 수 있었습니다.

그리고, 데이터 입출력도 직관적인 방식으로 구현이 가능해졌습니다.

