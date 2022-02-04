"use strict";(self.webpackChunkbbon_me=self.webpackChunkbbon_me||[]).push([[691],{1909:function(e,t,a){a.d(t,{Z:function(){return o}});var l=a(7294),n=a(6125),r=a(5444),c=a(3201),i=function(e){var t=e.social,a=e.openNewWindow,n=a?"_blank":"_self",r="noreferrer "+(a?"external":"");return l.createElement("ul",{className:"social-list"},(null==t?void 0:t.github)&&l.createElement("li",null,l.createElement("a",{href:"https://github.com/"+((null==t?void 0:t.github)||""),target:n,rel:r},l.createElement(c.hJX,{size:"1.3rem"}))),(null==t?void 0:t.twitter)&&l.createElement("li",null,l.createElement("a",{href:"https://twitter.com/"+((null==t?void 0:t.twitter)||""),target:n,rel:r},l.createElement(c.fWC,{size:"1.3rem"}))),(null==t?void 0:t.facebook)&&l.createElement("li",null,l.createElement("a",{href:"https://www.facebook.com/"+((null==t?void 0:t.facebook)||""),target:n,rel:r},l.createElement(c.Am9,{size:"1.3rem"}))),(null==t?void 0:t.linkedin)&&l.createElement("li",null,l.createElement("a",{href:"https://www.linkedin.com/in/"+((null==t?void 0:t.linkedin)||"")+"/",target:n,rel:r},l.createElement(c.ltd,{size:"1.3rem"}))))},o=function(){var e,t,c,o=(c=(0,r.useStaticQuery)("3199328057"),Object.assign({},c)).site,s=null===(e=o.siteMetadata)||void 0===e?void 0:e.author,m=null===(t=o.siteMetadata)||void 0===t?void 0:t.social;return l.createElement("div",{id:"bio",className:"flex w-full items-center font-sans px-4 py-12"},l.createElement(n.S,{className:"w-10 h-10 rounded-full mr-4",layout:"fixed",formats:["auto","webp","avif"],src:"../images/me.png",width:50,height:50,quality:95,alt:"Profile picture",__imageData:a(7647)}),(null==s?void 0:s.name)&&l.createElement("div",{className:"flex-1 px-2"},l.createElement("p",{className:"text-base font-bold md:text-xl leading-none mb-1"},s.name),(null==s?void 0:s.summary)&&l.createElement("p",{className:"text-gray-600 dark:text-gray-400 text-xs md:text-base mb-1"},null==s?void 0:s.summary),m&&l.createElement("div",{className:"justify-end"},l.createElement(i,{social:m}))))}},9139:function(e,t,a){a.d(t,{o:function(){return n},v:function(){return o}});var l=a(7294),n=function(e){var t=e.categories,a=e.selectedCategory,n=e.onChange;return l.createElement("ul",{className:"flex flex-row flex-wrap break-words gap-3 px-4 py-3"},null==t?void 0:t.map((function(e){return l.createElement("li",{key:e.fieldValue,className:"cursor-pointer text-green-600 dark:text-green-600  p-2 "+(a===e.fieldValue?"cursor-not-allowed border-green-600 border-b-2":""),onClick:(t=e.fieldValue,function(){n&&n(t)})},e.fieldValue," (",e.totalCount,")");var t})))},r=a(5444),c=a(1804),i=a.n(c),o=function(e){var t=e.categories;return l.createElement("ul",{className:"list-style-none flex gap-3 flex-wrap break-words"},null==t?void 0:t.map((function(e){return l.createElement("li",{key:e},l.createElement(r.Link,{to:"/categories/"+i()(e),className:"text-base md:text-sm text-green-500 no-underline hover:underline"},e))})))}},2191:function(e,t,a){var l=a(5444),n=a(7294),r=a(3529),c=a(9139);t.Z=function(e){var t,a=e.post;return n.createElement("article",{className:"post-list-item py-6",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",{className:"pt-6"},n.createElement("aside",null,a.node.frontmatter.categories&&n.createElement(c.v,{categories:a.node.frontmatter.categories})),n.createElement("h2",{className:"font-bold font-sans break-words text-gray-900 dark:text-gray-100 pb-2 text-3xl md:text-4xl"},n.createElement(l.Link,{to:a.node.fields.slug,itemProp:"url"},n.createElement("span",{itemProp:"headline"},a.node.frontmatter.title))),n.createElement("small",{className:"text-sm md:text-base font-normal text-gray-600 dark:text-gray-400"},a.node.frontmatter.date)),n.createElement("section",{className:"article-body mt-1 break-words"},n.createElement("p",{dangerouslySetInnerHTML:{__html:null!==(t=a.node.frontmatter.description||a.node.excerpt)&&void 0!==t?t:""},itemProp:"description"})),n.createElement("footer",null,n.createElement("aside",{className:"text-base md:text-sm text-gray-500 flex flex-row"},n.createElement(r.zy,{tags:a.node.frontmatter.tags}))))}},6738:function(e,t,a){a.r(t);var l=a(7294),n=a(1909),r=a(2348),c=a(7431),i=a(2191);t.default=function(e){var t,a=e.data,o=e.location,s=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",m=a.allMarkdownRemark.edges;return m&&0===m.length?l.createElement(r.Z,{location:o,title:s},l.createElement(c.Z,{title:"All posts"}),l.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).'),l.createElement(n.Z,null)):l.createElement(r.Z,{location:o,title:s},l.createElement(c.Z,{title:"Recent posts"}),l.createElement(n.Z,null),l.createElement("ol",{className:"list-style-none"},null==m?void 0:m.map((function(e){return l.createElement("li",{key:e.node.fields.slug},l.createElement(i.Z,{post:e}))}))))}},7647:function(e){e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/e5610/me.png","srcSet":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/e5610/me.png 50w,\\n/static/6a9fa0654c3ca06c7d85244d47f7ac93/e9b55/me.png 100w","sizes":"50px"},"sources":[{"srcSet":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/d4bf4/me.avif 50w,\\n/static/6a9fa0654c3ca06c7d85244d47f7ac93/ee81f/me.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/3faea/me.webp 50w,\\n/static/6a9fa0654c3ca06c7d85244d47f7ac93/6a679/me.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')}}]);
//# sourceMappingURL=component---src-pages-index-tsx-b5bd690345b5cbd1adfb.js.map