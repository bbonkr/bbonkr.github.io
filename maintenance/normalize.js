const path = require('path');
const fs = require('fs');
const last = require('lodash/last');
const { moveToDirectory } = require('./move');

const normalize = (location) => {
    return fs
        .readdirSync(location)
        .filter((file) => {
            return !file.startsWith('.');
        })
        .forEach((file) => {
            const stat = fs.statSync(path.join(location, file));

            if (stat.isDirectory()) {
                normalize(path.join(location, file));
            } else {
                let name;
                let ext;
                const tokens = file.split('.');

                if (tokens.length > 0) {
                    name = tokens
                        .filter((_, index, arr) => index !== arr.length - 1)
                        .join('.');

                    if (tokens.length > 1) {
                        ext = last(tokens);
                    }
                }

                const info = {
                    path: path.join(location, file),
                    fileName: file,
                    nameWithoutExt: name,
                    ext: ext,
                };

                if (['md', 'markdown'].includes(info.ext.toLocaleLowerCase())) {
                    const regex = /^\d{4}-\d{2}-\d{2}-(.*)$/g;
                    if (regex.test(info.nameWithoutExt)) {
                        const title = info.nameWithoutExt.replace(regex, '$1');
                        const moveTo = path.join(
                            location,
                            `${title}.${info.ext}`
                        );
                        console.info(`Move ${info.path} to ${moveTo}`);
                        moveToDirectory(info.path, moveTo);
                    }
                }
            }
        });
};

const target = path.join(__dirname, 'source/_posts');

normalize(target);
