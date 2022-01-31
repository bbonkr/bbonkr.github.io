---
title: .NET Core 3.1 프로젝트를 .NET 5 로 마이그레이션
date: 2020-11-14 20:12:11
categories:
    - HowTo
tags:
    - dotnet
    - dotnet 5
    - migration
intro:
comments:
---


변환 대상은 .NET Core 3.1 을 사용해서 작성된 응용프로그램입니다.

전체 코드는 340eb28b1ea510a2c59e8627659cd81b689b7244 커밋에서 확인할 수 있습니다.

[`Commit <> 340eb28b1ea510a2c59e8627659cd81b689b7244`](https://github.com/bbonkr/bing-wallpaper/tree/340eb28b1ea510a2c59e8627659cd81b689b7244)

.NET Core 3.1 을 사용해서 작성된 응용프로그램을 .NET 5를 사용하는 응용프로그램으로 마이그레이션하려면, 솔루션의 모든 프로젝트의 대상 프레임워크를 `net5.0`으로 변경하고, 의존 패키지를 .NET 5 호환 버전으로 업데이트하면 됩니다.

의존 패키지가 .NET 5 를 지원하지 않는 경우가 아니라면 큰 문제없이 마이그레이션을 마칠 수 있을 것이라 생각합니다.

## 대상 프레임워크 변경

솔루션 파일을 Visual Studio 에서 열고, 포함된 프로젝트의 대상 프레임워크 <small>TargetFramework</small>를 아래 표와 같이 `net5.0`으로 변경합니다.

| 이전 대상 프레임워크 | 변경 대상 프레임워크 |
| :------------------: | :------------------: |
|    netstandard2.1    |        net5.0        |
|    netcoreapp3.0     |        net5.0        |

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>
</Project>
```

## Nuget 패키지 업데이트

의존하는 모든 Nuget 패키지를 .NET 5 호환 가능한 버전으로 업데이트합니다.

## Docker 이미지 변경

build-time image: `mcr.microsoft.com/dotnet/sdk:5.0`
run-time image: `mcr.microsoft.com/dotnet/runtime:5.0`

도커 이미지 정보는 아래 `.NET Runtime - Docker Hub` 페이지에서 확인할 수 있습니다.

[.NET Runtime - Docker Hub](https://hub.docker.com/_/microsoft-dotnet-runtime/)

`.NET Runtime - Docker Hub` 페이지에서 관련 저장소를 확인하세요.

아래는 .NET 5 프로젝트에서 사용되는 도커파일 예제입니다.

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY . .
RUN dotnet restore

# copy everything else and build app
RUN cd Bing.Wallpaper.Service.App && dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/runtime:5.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "Bing.Wallpaper.Service.App.dll"]
```

## 확인

의존 패키지가 .NET 5 호환 가능한 버전이 존재해서 큰 문제없이 변경되었습니다.

[`Commit <> d3151bedcadefdcbf7c144c568a871c7718a94cb`](https://github.com/bbonkr/bing-wallpaper/tree/d3151bedcadefdcbf7c144c568a871c7718a94cb)
