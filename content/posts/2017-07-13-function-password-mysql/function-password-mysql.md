---
title: "Mysql Password 함수"
date: 2017-07-13
description: "Mysql Password 함수"
tags:
    - mysql
    - password
    - function
categories: Computing
comments: false
---

MySql 의 PASSWORD 함수는 해시값을 계산한 문자열을 반환하는 함수입니다.

비밀번호를 처리할 때 많이 사용됩니다. 실제 서버의 계정 비밀번호도 PASSWORD 함수를 사용해서 처리하게 됩니다.

> 주의
> 해시가 계산된 값이 4.1.0 이전 버전과 4.1.1 이후 버전이 다릅니다.
> [Password Hashing in MySQL](https://dev.mysql.com/doc/refman/5.7/en/password-hashing.html) 페이지 참조하십시오.

4.1.1 이후 버전에서 PASSWORD 함수 결과는 아래와 같습니다.
결과는 문자열입니다.

```sql
MYSQL> select password('hello');
```

> 결과
> `*6B4F89A54E2D27ECD7E8DA05B4AB8FD9D1D8B119`

PASSWORD 함수의 동작에 대한 내용을 [HASHING ALGORITHM IN MYSQL PASSWORD()](https://www.pythian.com/blog/hashing-algorithm-in-mysql-password-2/) 페이지에서 찾을 수 있습니다.

위 링크 페이지의 내용에서는 아래와 같이 동일한 값을 얻을 수 있다고 합니다.

```sql
MYSQL> select password('hello') as result
union all
select concat('*', convert(sha1(unhex(sha1('hello'))) USING utf8));
```

> `*6B4F89A54E2D27ECD7E8DA05B4AB8FD9D1D8B119`
 > `*6b4f89a54e2d27ecd7e8da05b4ab8fd9d1d8b119`

password 함수는 sha1 해시 값을 다시 sha1 해시 값을 계산한 값을 문자열로 표현하고, '`*`' 을 앞에 붙인 것과 동일합니다.

기존 시스템이 MySql 로 운영되고 있을 때, 이를 다른 DBMS로 이관을 해야하면 문자열을 그대로 이관하고, PASSWORD 함수와 동일한 동작을 할 수 있는 해시 함수를 작성해서 처리할 수 있습니다.

```csharp
public string GenerateMySQLHash(string key)
{
    byte[] keyArray = Encoding.UTF8.GetBytes(key);
    SHA1Managed enc = new SHA1Managed();
    byte[] encodedKey = enc.ComputeHash(enc.ComputeHash(keyArray));
    StringBuilder myBuilder = new StringBuilder(encodedKey.Length);

    foreach (byte b in encodedKey)
    {
        myBuilder.Append(b.ToString("X2"));
    }

    return "*" + myBuilder.ToString();
}
```

```csharp
GenerateMySQLHash('hello');
```

> 결과
> `*6B4F89A54E2D27ECD7E8DA05B4AB8FD9D1D8B119`
