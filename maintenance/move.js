const path = require('path');
const fs = require('fs');
const last = require('lodash/last');

const getFiles = (location) => {
    return fs
        .readdirSync(location)
        .filter((file) => {
            const stat = fs.statSync(path.join(location, file));

            return stat.isFile() && !file.startsWith('.');
        })
        .map((file) => {
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
                nameNameWithoutExt: name,
                ext: ext,
            };
            return info;
        });
};

const existsDirectory = (location) => {
    return fs.existsSync(location);
};

const createDirectory = (location) => {
    fs.mkdirSync(location);

    return existsDirectory(location);
};

const moveToDirectory = (source, destination) => {
    try {
        fs.copyFileSync(source, destination);
        fs.rmSync(source);
    } catch (error) {
        console.error(error);
    }
};

const target = path.join(__dirname, 'source/_posts');

const files = getFiles(target);

console.info(files);

files.forEach((file) => {
    const directoryForPost = path.join(target, file.nameNameWithoutExt);
    const destinationFileName = path.join(directoryForPost, file.fileName);
    const exists = existsDirectory(directoryForPost);
    if (!exists) {
        // create dir
        createDirectory(directoryForPost);
        console.info(`Create '${directoryForPost}' directory`);
    }

    // move
    console.info(
        `Move '${file.fileName}' file to '${directoryForPost}' directory`
    );
    moveToDirectory(file.path, destinationFileName);
});

module.exports = {
    moveToDirectory,
};
