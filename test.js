const rewriteSlug = (slug) => {
    let datePart = '';
    let title = '';

    const dayRegExp =
        /^\/(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])[-|\/](?:([\w가-힣\-]+)\/)(?:([\w가-힣\-]+)\/)?$/g;
    if (slug.match(dayRegExp)) {
        title = slug.replace(dayRegExp, '$4');
        const title2nd = slug.replace(dayRegExp, '$5');
        if (!title) {
            title = title2nd;
        }

        if (title2nd && title !== title2nd && title2nd !== 'index') {
            title = title2nd;
        }

        datePart = slug.replace(dayRegExp, '$1/$2/$3');
    }

    // if (slug.endsWith('/')) {
    //     datePart = datePart.substring(0, slug.length - 1);
    //     // console.info('datePart', datePart);
    // }

    slug = `/${datePart}/${title}/`;
    return slug;
};

// const slug = `/2022-01-29/테스트-문서/`;
// const slug = `/2022-01-29-테스트-문서/테스트-문서/`;
const slug1 = `/2022-01-29-테스트-문서/index/`;
const slug2 = `/2022-01-29/테스트-문서/`;
const slug3 = `/2022-01-29-테스트-문서/문서/`;
const slug4 = `/2022-01-29-테스트-문서/`;

console.info(`slug1 ${slug1} -> ${rewriteSlug(slug1)}`);
console.info(`slug2 ${slug2} -> ${rewriteSlug(slug2)}`);
console.info(`slug2 ${slug3} -> ${rewriteSlug(slug3)}`);
console.info(`slug4 ${slug4} -> ${rewriteSlug(slug4)}`);
