---
title: How to separate projects in asp net core web application
date: 2019-07-25 21:17:00
categories:
- Howto
tags:
- aspnetcore
- mvc
- webapi
intro:
comments:
---

ASP.NET Core 웹 응용프로그램을 작성할 때, 웹 응용프로그램 프로젝트에서 컨트롤러를 다른 프로젝트로 분리하기를 원하면 이런 방법이 검토해 보십시오.

## 신규 프로젝트 작성

컨트롤러를 분리할 프로젝트를 작성합니다.

> .NET Standard 클래스 라이브러리 템플릿 사용

```bash
$ mkdir Blog.Backend.Api.Account
$ cd Blog.Backend.Api.Account
$ dotnet new classlib
```

필요한 Nuget 패키지를 추가합니다.

```bash
$ dotnet add package Microsoft.AspNetCore.Mvc --version 2.2.0
$ dotnet add package Microsoft.Extensions.Logging --version 2.2.0
```

> 예제:
> [porject file](https://github.com/bbonkr/blog-aspnetcore-backend/blob/304183f7f767fe492ae0278bebd1706ea6550f6e/Blog.Backend.Api.Account/Blog.Backend.Api.Account.csproj#L7)

컨트롤러 클래스를 새로 추가한 프로젝트로 복사하고, 네임스페이스를 조정합니다.

IServiceCollection 에 확장 메서드를 추가합니다.

```csharp
public static class ServicesConfigureExtesion
{
    public static IServiceCollection AddAccountApiController(this IServiceCollection services)
    {
        // 옮긴 컨트롤러 클래스를 IoC 컨테이너에 등록합니다.
        services.AddTransient<UserController>();
        services.AddTransient<AccountController>();
        return services;
    }

    public static IMvcBuilder AddAccountApiController(this IMvcBuilder builder)
    {
        var currentAssembly = typeof(ServicesConfigureExtesion).GetTypeInfo().Assembly;

        builder
            .AddApplicationPart(currentAssembly)
            ;

        return builder;
    }
}
```

> 예제:
> [IServiceCollection 확장메서드](https://github.com/bbonkr/blog-aspnetcore-backend/blob/304183f7f767fe492ae0278bebd1706ea6550f6e/Blog.Backend.Api.Account/ServicesConfigureExtesion.cs#L7)

## 웹 응용프로그램 코드 변경

다른 프로젝트로 옮긴 컨트롤러 클래스를 웹 응용프로그램에서 사용할 수 있도록 프로젝트 참조를 추가하고, Startup 클래스의 ConfigureServices 메서드에 새로운 프로젝트에서 정의한 IServiceCollection 확장메서드를 사용하는 코드를 추가합니다.

```csharp
public void ConfigureServices(IServiceCollection services)
{
    /* 중략 */

    services
        /* IServiceCollection 확장메서드 */
        /* IoC 컨테이너에 타입을 등록 */
        .AddAccountApiController()
        .AddMvc()
        /* IMvcBuilder 확장메서드 */
        /* 다른 어셈블리의 컨트롤러를 사용하도록 구성 */
        .AddAccountApiController()
        .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_2)
        .AddControllersAsServices()
        ;

    /* 중략 */
}
```

> 예제:
> [Startup.cs 예제](https://github.com/bbonkr/blog-aspnetcore-backend/blob/304183f7f767fe492ae0278bebd1706ea6550f6e/Blog.Backend/Startup.cs#L98)

## 추가

라우트 구성이 변경되어야 하면 Startup 클래스의 Configure 메서드에서 라우트를 추가합니다.

> 예제:
> [Startup.cs 예제](https://github.com/bbonkr/blog-aspnetcore-backend/blob/304183f7f767fe492ae0278bebd1706ea6550f6e/Blog.Backend/Startup.cs#L150)
