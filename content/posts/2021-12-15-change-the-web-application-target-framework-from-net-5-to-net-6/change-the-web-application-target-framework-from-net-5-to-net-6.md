---
title: Change the web application target framework from .NET 5 to .NET 6
date: 2021-12-15
categories: 
  - "blog"
  - "computing"
  - "repository"
tags: 
  - "dotnet"
  - "dotnet 5"
  - "dotnet 6"
  - "github"
  - "github-repository"
github: # If you want to show github buttons, fill owner and repo
  owner: bbonkr 
  repo: bing-wallpaper
---    


.NET 5 웹 응용프로그램을 .NET 6 웹 응용프로그램으로 변환하고, 관련 내용을 요약해서 작성했습니다.

## Target Project

[GitHub: bbonkr/bing-wallpaper](https://github.com/bbonkr/bing-wallpaper) 웹 응용프로그램의 대상 프레임워크를 .NET 5 에서 .NET 6(으)로 변경합니다.

## Requirements

- 대상 프레임워크를 .NET 6(으)로 변경
- Program.cs 파일의 내용을 최상위 문 (Top level statements) 으로 재작성
- 파일 범위 네임스페이스 (File scoped namespace) 를 사용

## Task logs

### Change target framework

.NET 5 웹 응용프로그램을 .NET 6 웹 응용프로그램으로 변경하는 작업은 다른 이슈가 없으면 매우 간단한 작업입니다.

프로젝트 파일을 편집기로 열고, TargetFramework 요소의 값을 `net5.0` 에서 `net6.0` 으로 변경하면 기본 작업은 끝입니다.

> 사용중인 (의존) 패키지가 .NET 6 에서 사용할 수 없다면 문제가 발생할 수 있으므로, 대상 프레임워크를 변경하기 전에 사용중인 (의존) 패키지가 .NET 6 에서 사용가능한지 검토후 진행여부를 결정해야 합니다.

### Top level statements

.NET 6 (을)를 대상으로 웹 응용프로그램 프로젝트를 작성하면, Program.cs 파일에 최상위 문으로 웹응용프로그램(WebApplication) 구성하는 코드가 제공됩니다.

.NET 5 로 작성된 웹 응용프로그램 코드도 매우 간편하게 최상위 문을 사용하도록 코드를 변경할 수 있습니다.

Program.cs 파일의 기존 코드는 그대로 남겨두고, 파일이 마지막 줄에 작성을 시작합니다.

먼저, 웹 응용프로그램 빌더 인스턴스를 작성합니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
```

편의를 위해 구역을 설정합니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
// configure service
// [1]
// configure
// [2]
// run
// [3]
```

\[1\] 부분에는 `Startup.cs` 파일의 `ConfigureServices` 메서드의 코드를 가져옵니다.

```csharp
public class Startup 
{
    public void ConfigureServices(IServiceCollection services)
    {
        // 생략
        services.AddControllersWithViews();
        // 생략
    }
}
```

`ConfigureServices` 메서드의 내용을 가져온 후 `builder.Services` 속성을 사용해서 아래와 같이 작성될 수 있습니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
// configure service
// 생략
builder.Services.AddControllersWithViews();
// 생략
// configure
// [2]
// run
// [3]
```

\[2\] 부분에는 `Startup.cs` 파일의 `Configure` 메서드의 코드를 가져옵니다.

```csharp
public class Startup 
{
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // 생략
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        });     
        // 생략
    }
}
```

`Configure` 메서드의 내용을 가져온 후 아래와 같이 작성될 수 있습니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
// configure service
// 생략
builder.Services.AddControllersWithViews();
// 생략
// configure
var app = builder.Build();
// 생략
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});     
// 생략
// run
// [3]
```

> 다른 구성은 app.Services 속성, app.Environment 속성을 참조하면 동일하게 코드를 작성할 수 있습니다.

\[3\] 부분에는 `Program.cs` 에 작성되어 있는 Main 메서드의 내용을 가져옵니다.

완성된 `Program.cs` 파일은 아래와 같습니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
// configure service
// 생략
builder.Services.AddControllersWithViews();
// 생략
// configure
var app = builder.Build();
// 생략
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});     
// 생략
// run
app.run();
```

이후, `Program.cs` 파일의 기존 내용 namespace 포함해서 `Program` 클래스를 제거합니다.

### Use File scoped namespace

나머지 파일을 하나씩 열어서 네임스페이스 블럭을 파일 범위 네임스페이스로 변경합니다.

> 한번에 적용하는 방법을 아직 못찾아서 하나씩 변경했습니다.

```csharp
using System;

namespace SomeNamesapce {
    // 생략
}
```

아래와 같이 블럭을 제거하는 작업입니다.

```csharp
using System;

namespace SomeNamesapce;

// 생략
```

> Visual Studio 를 사용중이면, namespace 이름에서 컨텍스트 메뉴 (Ctrl + .)를 확인하면 파일 범위 네임스페이스로 변경 메뉴가 있습니다.

### Dockerfile

도커 이미지 빌드를 사용중이면, 빌드 이미지와 런타임 이미지를 변경합니다.

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
# 생략
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
# 생략
```

아래와 같이 .NET 6 환경으로 변경합니다.

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
# 생략
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
# 생략
```

### CI/CD Environment

GitHub Action 또는 Azure pipeline 등 다른 CI/CD 를 사용주이면 작업 정의에서 환경 구성시 사용되는 .NET SDK 버전을 .NET 6 (으)로 변경합니다.

GitHub Actions 의 `actions/setup-dotnet@v1` 패키지의 환경변수 값을 6.0.x 로 지정합니다.

```yaml
# 생략
jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      # 생략
      - name: Setup dotnet
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 6.0.x
      # 생략
```

## Conclusion

.NET 6 (으)로 대상 프레임워크 변경만으로 성능향상이 있다고 하니, 시간되실 때 변경해보시면 좋을 것 같습니다.

실제 작성된 .NET 6 (으)로 변경작업을 확인하고 싶으시면 [GitHub: bbonkr/bing-images feature/dotnet6 branch](https://github.com/bbonkr/bing-wallpaper/tree/feature/dotnet6) 에서 코드 변경사항을 참조하십시오.

