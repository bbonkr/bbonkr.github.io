/**
 * Create post
 *
 * Arguments
 * - title
 * - date (default: now)
 * */

const path = require('path');
const fs = require('fs');
const kebabCase = require('lodash/kebabCase');

const getDateString = (date) => {
    const value = typeof date === 'string' ? new Date(date) : new Date();
    return value.toISOString().substring(0, 10);
};

const getContent = (title, date) => {
    return `---
title: ${title}
date: ${date}
categories:
  - categories here
tags:
  - tags here
draft: true
image: 
comments: false
github: # If you want to show github buttons, fill owner and repo
  owner:  
  repo: 
---    

<!-- post content here -->

    `;
};

const createPost = (baseDirectory, title, date) => {
    const normalizedTitle = kebabCase(title);
    const postDate = getDateString(date);

    // content/posts/yyyy-mm-dd-title-kebabcase/title-kebabcase
    const contentBaseDir = path.join(
        'content',
        'posts',
        `${postDate}-${normalizedTitle}`
    );

    // If directory does not exists, create directory.
    const contentDir = path.resolve(baseDirectory, contentBaseDir);
    const isTargetDirectoryExsits = fs.existsSync(contentDir);
    console.info(
        `[INFO] Target directory is exists: `,
        isTargetDirectoryExsits
    );

    if (!isTargetDirectoryExsits) {
        fs.mkdirSync(contentDir);
        console.info(`[INFO] Target directory is created: `, contentDir);
    }

    const filePath = path.resolve(
        baseDirectory,
        path.join(contentBaseDir, `${normalizedTitle}.md`)
    );

    try {
        fs.writeFileSync(filePath, getContent(title, postDate));
        console.info(`
[INFO] Title: ${title}
[INFO] Date: ${postDate}
[INFO] File: ${normalizedTitle}.md
[INFO] Path: ${filePath}

[\x1b[32mOK\x1b[0m] File created`);
    } catch (error) {
        console.error(
            `[\x1b[31mFAIL\x1b[0m] Could not create a file. (${error.message})`
        );
    }
};

module.exports = createPost;
