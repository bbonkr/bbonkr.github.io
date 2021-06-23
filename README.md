## Hexo 설치

```bash
$ npm install hexo-cli -g
```

## Themes

### Chianmai

[stunstunstun/hexo-theme-chiangmai](https://github.com/stunstunstun/hexo-theme-chiangmai) 테마로 변경합니다.

Fork 된 저장소 [bbonkr/hexo-theme-chiangmai](https://github.com/bbonkr/hexo-theme-chiangmai)를 사용합니다.

```bash
# // 원격 테마 저장소를 추가합니다.
$ git remote add theme.chiangmai https://github.com/bbonkr/hexo-theme-chiangmai.git
# // 서브 트리를 추가합니다.
$ git subtree add --prefix themes/chiangmai theme.chiangmai master
```

## 확인

```bash
$ hexo serve
```

## 게시

```bash
$ hexo deploy
```

## 글작성

```bash
$ hexo new [layout=post] <title>
```

```bash
$ hexo new post "new title"
```
