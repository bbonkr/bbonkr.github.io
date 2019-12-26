## Hexo 설치

```bash
$ npm install hexo-cli -g
```

## 사용하지 않습니다.

```bash
$ git submodule init
$ git submodule update
```

## cactus 테마 사용

```bash
$ git remote add theme-cactus git@github.com:kyujin-cho/hexo-theme-cactus.git
$ git subtree add --prefix=themes/cactus theme-cactus master
$ cd themes/cactus
$ npm i
```

## mango 테마 사용

```bash
$ git remote add themes-mango https://github.com/mango-tree/hexo-theme-mango.git
$ git subtree add --prefix=themes/mango themes-mango master
$ cd themes/mango
$ npm install
$ npm run build #run grunt task
$ cd ../..
$ npm install
$ hexo clean
$ hexo generate
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
