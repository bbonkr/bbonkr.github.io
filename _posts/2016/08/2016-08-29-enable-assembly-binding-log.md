---
layout: post
title: "어셈블리 바인딩 로깅 <small>Assembly Binding Logging</small>"
description: '어셈블리 바인딩 로깅'
tags: [
"windows",
"microsoft",
"github"
]
categories:
- Computing
twitter_text: '어셈블리 바인딩 로깅'
github_buttons: true
github_user: bbonkr
github_repo: activate-assembly-binding-error-log
---

런타임<small>Runtime</small>에 어셈블리 바인딩 오류가 발생하는 경우 아래와 같은 내용을 확인할 수 있습니다.

```markup
이 대화 상자 대신 JIT(Just-in-time) 디버깅을 호출하는
방법에 대한 자세한 내용은 이 메시지의 뒷부분을 참조하십시오.

************** 예외 텍스트 **************
System.IO.FileNotFoundException: 파일이나 어셈블리 'SampleNamespace, Version=1.0.0.1, Culture=neutral, PublicKeyToken=aaaaaaaaaaaaaaaa' 또는 여기에 종속되어 있는 파일이나 어셈블리 중 하나를 로드할 수 없습니다. 지정된 파일을 찾을 수 없습니다.
파일 이름: 'SampleNamespace, Version=1.0.0.0, Culture=neutral, PublicKeyToken=aaaaaaaaaaaaaaaa'
   위치: OtherNamespace.MyClass..ctor()

경고: 어셈블리 바인딩 로깅이 꺼져 있습니다.
어셈블리 바인딩 오류 로깅 기능을 사용하려면 레지스트리 값 [HKLM\Software\Microsoft\Fusion!EnableLog] (DWORD)를 1로 설정하십시오.
참고: 어셈블리 바인딩 오류 로깅 기능을 사용하도록 설정하면 그렇지 않은 경우보다 성능이 약간 떨어집니다.
이 기능을 끄려면 레지스트리 값 [HKLM\Software\Microsoft\Fusion!EnableLog]를 제거하십시오.



************** 로드된 어셈블리 **************
mscorlib
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34209 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.NET/Framework/v4.0.30319/mscorlib.dll
----------------------------------------
System
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34238 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/System/v4.0_4.0.0.0__b77a5c561934e089/System.dll
----------------------------------------
System.Windows.Forms
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34251 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/System.Windows.Forms/v4.0_4.0.0.0__b77a5c561934e089/System.Windows.Forms.dll
----------------------------------------
System.Drawing
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34209 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/System.Drawing/v4.0_4.0.0.0__b03f5f7f11d50a3a/System.Drawing.dll
----------------------------------------
System.Configuration
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34209 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/System.Configuration/v4.0_4.0.0.0__b03f5f7f11d50a3a/System.Configuration.dll
----------------------------------------
System.Xml
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34234 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/System.Xml/v4.0_4.0.0.0__b77a5c561934e089/System.Xml.dll
----------------------------------------
OtherNamespace.MyClass
    어셈블리 버전: 1.0.0.0
    Win32 버전: N/A
    코드베이스: http://bbon.me/Apps/OtherNamespace.DLL
----------------------------------------
IFW.Windows.Forms
    어셈블리 버전: 4.0.0.6
    Win32 버전: 4.0.0.6
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/IFW.Windows.Forms/v4.0_4.0.0.6__6b3a265306332740/IFW.Windows.Forms.dll
----------------------------------------
mscorlib.resources
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34209 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/mscorlib.resources/v4.0_4.0.0.0_ko_b77a5c561934e089/mscorlib.resources.dll
----------------------------------------
System.Windows.Forms.resources
    어셈블리 버전: 4.0.0.0
    Win32 버전: 4.0.30319.34209 built by: FX452RTMGDR
    코드베이스: file:///C:/Windows/Microsoft.Net/assembly/GAC_MSIL/System.Windows.Forms.resources/v4.0_4.0.0.0_ko_b77a5c561934e089/System.Windows.Forms.resources.dll
----------------------------------------

************** JIT 디버깅 **************
JIT(Just In Time) 디버깅을 사용하려면 이 응용 프로그램 또는 컴퓨터의
config 파일(machine.config)의 jitDebugging 값을
system.windows.forms 섹션에 설정해야 합니다.
또한 응용 프로그램은 디버깅할 수 있도록 컴파일되어야
합니다.

예:

<configuration>
    <system.windows.forms jitDebugging="true" />
</configuration>

JIT 디버깅을 사용하면 처리되지 않은 모든 예외는
이 대화 상자에서 처리되지 않고 컴퓨터에 등록된 JIT
디버거에 보내집니다.
```

응용 프로그램 런타임에 어셈블리 바인딩 오류 로그를 활성화하여 문제를 추적할 수 있습니다.

어떤 어셈블리를 바인딩하려다 오류가 발생하는지는 로깅을 활성화하면 확인할 수 있습니다.


## 로깅 활성화

레지스트리 편집기를 실행하고 아래 키로 이동 후 값을 추가합니다.

`HKLM\SOFTWARE\Microsoft\Fusion`

<div class="table-responsive">
<table class="table table-striped">
<thead>
<tr>
<th>이름</th>
<th>타입</th>
<th>값</th>
</tr>
</thead>
<tbody>
<tr>
<td>EnableLog</td>
<td>DWORD</td>
<td>1</td>
</tr>
<tr>
<td>ForceLog</td>
<td>DWORD</td>
<td>1</td>
</tr>
<tr>
<td>LogFailures</td>
<td>DWORD</td>
<td>1</td>
</tr>
<tr>
<td>LogResourceBinds</td>
<td>DWORD</td>
<td>1</td>
</tr>
<tr>
<td>LogPath</td>
<td>STRING</td>
<td><code>PATH TO LOG FILES;e.g.)c:\FusionLog\</code></td>
</tr>
</tbody>
</table>
</div>


아래와 같이 레지스트리 값을 추가하면 로깅이 활성화됩니다.

![설정이미지](/images/2016/08/2016-08-29-enable-assembly-binding-log/regedit-fusion-log.png)

## 로그확인

레지스트리 값 중 `LogPath`에 설정한 디렉터리에 로그 파일이 만들어집니다.

탐색기에서 디렉터리로 이동하면 Default, NativeImage 두 개의 하위 디렉터리가 만들어져 있습니다.

그리고, 각 디렉터리에 실행된 어셈블리 이름 디렉터리가 존재하고, `HTML` 파일로 내용이 저장되어져 있습니다.

각 `HTML`파일을 확인하여 실패 내용을 추적할 수 있습니다.


## 어셈블리 바인딩 로깅 활성화 응용 프로그램

<a href="https://github.com/bbonkr/activate-assembly-binding-error-log" class="button button-flat"><i class="fa fa-github"></i> bbonkr: activate-assembly-binding-error-log</a>

<a href="https://github.com/bbonkr/activate-assembly-binding-error-log/releases" class="button button-flat"><i class="fa fa-download"></i> Release 1.0.0.0</a>

프로젝트를 빌드하기 위해서는 아래 요구사항을 만족해야 합니다.

- Visual Studio 2015
- .NET Framework 4.5.2

Release 파일을 다운로드 받고 실행하면 아래와 같이 간단한 모양으로 실행됩니다.


![](/images/2016/08/2016-08-29-enable-assembly-binding-log/fusionlog-01.png)


![](/images/2016/08/2016-08-29-enable-assembly-binding-log/fusionlog-02.png)


Check 버튼으로 현재 상태를 확인할 수 있고, Activate, Deactivate 버튼으로 활성, 비활성으로 상태를 변경할 수 있습니다.

활성은 레지스트리에 값을 추가하고, 비활성은 레지스트리 값을 제거합니다.
