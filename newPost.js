#!/usr/bin/env node

const createPost = require('./helpers/createPost');

const args = process.argv.slice(2);
let title;
let date;

if (args.length > 0) {
    title = args[0].trim();
}

if (args.length > 1) {
    date = args[1].trim();
}

if (typeof title === 'undefined' || !title) {
    console.info(`
Please run newPost.js with title argument

node newPost.js <\x1b[32mtitle\x1b[0m> <date>
  * title: required, File name will be using kebabcase of title
  * date: optional, If does not input, it uses today


e.g.)
$ node newPost.js "title of post" "2022-01-01"

    `);
} else {
    createPost(__dirname, title, date);
}
