---
title: "Exchange Web Service"
date: 2015-01-14 09:00:00
intro: "Exchange Web Service"
categories: 
    - Computing
tags:
    - dotnet
    - exchange
    - csharp
    - dotnet
comments: false
---

[EWS Managed API](https://github.com/OfficeDev/ews-managed-api/)

GitHub에 코드가 공개되어 있습니다.

## Troubleshooting

### Ignore EWS Certification Error

SSL 인증서 유효성 검사를 통과하지 못하는 경우 무시하고 진행할 수 있습니다.

```csharp
ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
```
