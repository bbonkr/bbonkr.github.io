"use strict";(self.webpackChunkbbon_me=self.webpackChunkbbon_me||[]).push([[691],{5768:function(e,t,a){a.d(t,{o:function(){return l},v:function(){return c}});var r=a(7294);const l=e=>{let{categories:t,selectedCategory:a,onChange:l}=e;return r.createElement("ul",{className:"flex flex-row flex-wrap break-words gap-3 px-4 py-3"},null==t?void 0:t.map((e=>{return r.createElement("li",{key:e.fieldValue,className:"cursor-pointer text-green-600 dark:text-green-600  p-2 "+(a===e.fieldValue?"cursor-not-allowed border-green-600 border-b-2":""),onClick:(t=e.fieldValue,()=>{l&&l(t)})},e.fieldValue," (",e.totalCount,")");var t})))};var n=a(1883),o=a(1804),s=a.n(o);const c=e=>{let{categories:t}=e;return r.createElement("ul",{className:"list-style-none flex gap-3 flex-wrap break-words"},null==t?void 0:t.map((e=>r.createElement("li",{key:e},r.createElement(n.Link,{to:`/categories/${s()(e)}`,className:"text-base md:text-sm text-green-500 no-underline hover:underline"},e)))))}},3859:function(e,t,a){var r=a(1883),l=a(7294),n=a(5419),o=a(5768);t.Z=e=>{var t;let{post:a}=e;const s=+new Date<Date.parse(`${a.node.frontmatter.date}`)+6912e5;return l.createElement("article",{className:"post-list-item py-6",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",{className:"pt-6"},l.createElement("aside",null,a.node.frontmatter.categories&&l.createElement(o.v,{categories:a.node.frontmatter.categories})),l.createElement("h2",{className:"font-bold font-sans break-words text-gray-900 dark:text-gray-100 pb-2 text-3xl md:text-4xl "},l.createElement(r.Link,{to:a.node.fields.slug,itemProp:"url"},l.createElement("span",{itemProp:"headline"},a.node.frontmatter.title))),l.createElement("div",{className:"indicator pr-10"},s&&l.createElement("span",{className:"indicator-item indicator-end indicator-middle badge badge-secondary"},"NEW"),l.createElement("div",null,l.createElement("span",{className:"pr-2"},"🗓️"),l.createElement("small",{className:"text-sm md:text-base font-normal text-gray-600 dark:text-gray-400"},a.node.frontmatter.date.toLocaleString())))),l.createElement("section",{className:"article-body mt-1 break-words"},l.createElement("p",{dangerouslySetInnerHTML:{__html:null!==(t=a.node.frontmatter.description||a.node.excerpt)&&void 0!==t?t:""},itemProp:"description"})),l.createElement("footer",null,l.createElement("aside",{className:"text-base md:text-sm text-gray-500 flex flex-row"},l.createElement(n.zy,{tags:a.node.frontmatter.tags}))))}},7200:function(e,t,a){a.r(t);var r=a(7294),l=a(9108),n=a(4001),o=a(3859);t.default=e=>{var t;let{data:a,location:s}=e;const c=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",i=a.allMarkdownRemark.edges;return i&&0===i.length?r.createElement(l.Z,{location:s,title:c},r.createElement(n.Z,{title:"All posts"}),r.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):r.createElement(l.Z,{location:s,title:c},r.createElement(n.Z,{title:"Recent posts"}),r.createElement("ol",{className:"list-style-none"},null==i?void 0:i.map((e=>r.createElement("li",{key:e.node.fields.slug},r.createElement(o.Z,{post:e}))))))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-dc2ea1bdb618320761f6.js.map