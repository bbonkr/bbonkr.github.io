---
layout: post
title: "Exchange Web Service"
description: "Exchange Web Service"
category: Computing
tags: [".net",
        "exchange",
        "csharp",
        "c#",
        "dotnet"
        ]
image:        
---


[EWS Managed API](https://github.com/OfficeDev/ews-managed-api/)

GitHub에 코드가 공개되어 있습니다.

### Ignore EWS Certification Error

SSL 인증서 유효성 검사를 통과하지 못하는 경우 무시하고 진행할 수 있습니다.

{% highlight cs %}
ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
{% endhighlight %}
