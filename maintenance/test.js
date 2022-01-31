const kebabCase = require('lodash/kebabCase');

const rewriteSlug = (slug) => {
    let datePart = '';
    let title = '';

    const tokens = slug.split('/').filter((token) => Boolean(token));

    if (tokens.length > 0) {
        datePart = tokens[0];
        if (tokens.length > 1 && tokens[1].toLowerCase() !== 'index') {
            title = tokens[1];
        }
    }

    const dayRegExp =
        /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])(?:-(.*))?$/g;
    if (datePart.match(dayRegExp)) {
        if (!title || title.toLowerCase() === 'index') {
            title = datePart.replace(dayRegExp, '$4');
        }

        title = kebabCase(title);
        datePart = datePart.replace(dayRegExp, '$1/$2/$3');
    }

    slug = `/${datePart}/${title}/`;
    return slug;
};

// const slug = `/2022-01-29/테스트-문서/`;
// const slug = `/2022-01-29-테스트-문서/테스트-문서/`;
const slug1 = `/2022-01-29-테스트-문서/index/`;
const slug2 = `/2022-01-29/테스트-문서/`;
const slug3 = `/2022-01-29-테스트-문서/문서/`;
const slug4 = `/2022-01-29-테스트-문서-#2/`;
const slug5 = `/2022-01-29/테스트-문서-#2/`;

console.info(`slug1 ${slug1} -> ${rewriteSlug(slug1)}`);
console.info(`slug2 ${slug2} -> ${rewriteSlug(slug2)}`);
console.info(`slug2 ${slug3} -> ${rewriteSlug(slug3)}`);
console.info(`slug4 ${slug4} -> ${rewriteSlug(slug4)}`);
console.info(`slug5 ${slug5} -> ${rewriteSlug(slug5)}`);
