---
title: 'Troubleshooting issues that upgrades Dotnet Maui v7 to v8'
date: 2024-07-15
categories:
    - Blog
    - Computing
tags:
    - dotnet
    - maui
    - troubleshooting
    - android
    - macos
    - ios
draft: false
featuredImage:
comments: false
github: # If you want to show github buttons, fill owner and repo
    owner:
    repo:
---

## Environments

### Apple SDK

> 개발 장치가 macOS 인 경우

Xcode 를 열고, 지원 플랫폼 목록에서 아래 플랫폼 지원을 위한 SDK 를 설치해야 합니다.

-   macOS 14.5 SDK (Xcode 설치시 기본으로 설치됩니다)
-   iOS 17.5 SDK

### Android SDK

SDK 관리자에서 `API 34` 관련 도구를 설치해야 합니다.

## Troubleshooting

### 프로젝트 파일 자동 포맷팅 관련 문제

`.csproj` 파일은 XML 형식으로 관리됩니다.

일부 편집기에서 포맷팅을 하는 경우 아래와 같이 변경되는 경우가 있습니다.

```xml
<SupportedOSPlatformVersion
			Condition="$([MSBuild]::GetTargetPlatformIdentifier('$(TargetFramework)')) == 'ios'">
			17.2</SupportedOSPlatformVersion>
<SupportedOSPlatformVersion
			Condition="$([MSBuild]::GetTargetPlatformIdentifier('$(TargetFramework)')) == 'maccatalyst'">
			14.5</SupportedOSPlatformVersion>
```

이 경우, `SupportedOSPlatformVersion` 요소의 값인 `17.2` 에 빈문자열이 추가되어, 빌드시 문제가 발생할 수 있습니다.

요소의 문자열 값에 문자열이 추가되지 않도록 아래와 같이 작성되어져야 합니다.

```xml
<SupportedOSPlatformVersion Condition="$([MSBuild]::GetTargetPlatformIdentifier('$(TargetFramework)')) == 'ios'"
			>17.2</SupportedOSPlatformVersion>
<SupportedOSPlatformVersion Condition="$([MSBuild]::GetTargetPlatformIdentifier('$(TargetFramework)')) == 'maccatalyst'"
			>14.5</SupportedOSPlatformVersion>
```

### 전역 스타일 사용시 FlyoutItem 에 대한 클래스 이름 관련 문제

Dotnet Maui 예제 코드를 사용했던 것으로 기억하는데, 스타일 클래스 이름을 `MenuItemLayoutStyle` 으로 사용하는 경우 문제가 발생합니다.

```xml
<Style TargetType="Label"
       Class="MenuItemLayoutStyle"
       ApplyToDerivedTypes="True">
    <Setter Property="TextColor"
            Value="....." />
</Style>
```

내부적으로 처리되는 클래스 이름으로 예상됩니다.

`AppMenuItemLayoutStyle` 등과 같이 내부적으로 사용되는 클래스 이름을 회피할 수 있게 이름을 변경해야 합니다.

### 중첩된 FlexLayout 사용 관련 문제

아래와 같이 `FlexLayout` 을 중첩해서 사용하는 경우 Android 에서 레이블 크기 계산에 문제가 있는 것 같습니다.

> 점수를 출력하기 위해 레이블을 사용하고 있는데, 한자리 숫자로 표시될 후 값이 증가해서 두자리가 되면 레이블 크기가 조정되지 않아 두줄로 값이 표현되고, 두줄이 모두 보이지 않아 첫자리만 출력되는 문제가 있었습니다.

```xml
<FlexLayout>

  <FlexLayout>
    <Label />
  </FlexLayout>

<FlexLayout>
```

중첩된 `FlexLayout` 을 제거하고, `GridLayout` 을 사용하게 변경해서 문제를 해결할 수 있습니다.

```xml
<FlexLayout>

  <Grid ColumnDefinitions="*" RowDefinitions="*">
    <Label Grid.Row="0" Grid.Column="0" />
  </Grid>

<FlexLayout>
```

## Android

### Play Console 개발자 계정 본인 인증

이름과 주소가 확인되는 공과금 고지서 등의 문서를 사진 촬영 후 업로드하여 개인 인증을 할 수 있다고 합니다.

저는 대부분의 고지서를 모바일로 받고 있어, 촬영할 문서를 찾기 힘들었습니다.

검색해보니, 주민등록등본으로 처리가 가능하다고 하여, 가까운 주민센터를 방문해서 발급받은 후 촬영하여 본인 인증을 마칠 수 있었습니다.

> 집에 출력이 가능한 장치가 없어서, 주민센터를 방문했습니다.

### 최신 Android 버전을 타겟팅하도록 앱을 업데이트

Dotnet Muai v8 에 대한 개발환경을 준비하려면, andoird api 34 sdk 를 설치해야 하므로, 개발환경이 준비되었다면, Dotnet Maui 최신 버전을 적용해서 앱을 제출하면 해결됩니다.

## 마침

이렇게 올해도 무사히 구글 플레이 콘솔의 요구사항을 적절히 맞춰 넘어갈 수 있었습니다.
