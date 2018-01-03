---
layout: post
title: "Gulp: 자동화 도구"
description: 'Gulp Task Automation'
tags:
- gulp
- npm
- nodejs
- task
- automation
categories:
- Computing
twitter_text: 'Gulp Task Automation'
---


## Gulp

Gulp는 시간을 소모하는 개발 업무 흐름을 자동화하기 위한 도구입니다.

자세한 내용은 [gulpjs.com](https://gulpjs.com/) 에서 확인할 수 있습니다.


## 시작하기

```sh
$ npm install gulp-cli -g
$ npm install gulp -D
$ touch gulpfile.js
$ gulp --help
```

> [gulpjs.com](https://gulpjs.com/) 에서 발췌

CLI 도구를 설치하고, 패키지를 설치한 후 gulpfile.js 파일을 만들어서 시작합니다.


## 뭘 할 수 있지?

gulp는 작업 흐름을 정의하고, 정의된 작업을 실행하는 도구입니다.

어떻게 활용할 것인지를 생각하고, 하고 싶은 동작을 구현해 놓은 플러그인의 도움을 받으면 대부분의 빌드 작업을 자동화할 수 있습니다.


## 예제

### PGU & LESS

[gulpjs.com](https://gulpjs.com/) 의 gulpfile.js 의 내용과 같이 pug 파일에서 html 을 생성하고, less 파일에서 css 파일을 생성한 후 축소 <small>minify</small>하는 작업을 정의하고 실행할 수 있습니다.

```js
var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifycss = reuqire('gulp-csso');

// html 처리 작업
gulp.task('html',  function() {
    return gulp.src('client/templates/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build/html'));
});

// css 처리 작업
gulp.task('css', function() {
    return gulp.src('client/templates/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

// 기본 작업으로 html 작업, css 작업을 지정
gulp.task('default', ['html', 'css']);
```


### Typescript

타입스크립트를 컴파일해서 필요한 위치에 출력하는 작업을 gulp로 작성한 예제입니다.

`[ProjectDir]/Scripts/**/*.ts` 파일을 컴파일해서 `[ProjectDir]/wwwroot/js/**/*.js` 로 출력합니다.

```js
const
    gulp = require('gulp'),
    rename = require('gulp-rename2'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    ts = require('gulp-typescript');

const
    wwwroot = './wwwroot/',
    sourceroot = './Scripts/';

const paths = {
    ts: sourceroot + '**/*.ts',
    tsDefinitionFiles: 'npm_modules/@types/**/*.d.ts',
    jsDest: `${wwwroot}js/`
};

gulp.task('typescript', ()=>{
    var tsProject = ts.createProject('tsconfig.json');

    return gulp.src([paths.tsDefinitionFiles, paths.ts, '!'+ paths.minJS], {base: '.'})
        .pipe(tsProject())
        .pipe(uglify())
        .pipe(rename((pathObj, file)=>{
            return pathObj.join(pathObj.dirname(file).replace(/^Scripts\/?\\?/, ''), pathObj.basename(file));
        }))
        .pipe(clean({}))
        .pipe(gulp.dest(paths.jsDest));
})

gulp.task('default', ['typescript']);
```
