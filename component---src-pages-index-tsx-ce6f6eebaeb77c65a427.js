"use strict";(self.webpackChunkbbon_me=self.webpackChunkbbon_me||[]).push([[691],{5768:function(e,t,n){n.d(t,{o:function(){return a},v:function(){return c}});var r=n(7294),a=function(e){var t=e.categories,n=e.selectedCategory,a=e.onChange;return r.createElement("ul",{className:"flex flex-row flex-wrap break-words gap-3 px-4 py-3"},null==t?void 0:t.map((function(e){return r.createElement("li",{key:e.fieldValue,className:"cursor-pointer text-green-600 dark:text-green-600  p-2 "+(n===e.fieldValue?"cursor-not-allowed border-green-600 border-b-2":""),onClick:(t=e.fieldValue,function(){a&&a(t)})},e.fieldValue," (",e.totalCount,")");var t})))},l=n(1082),o=n(1804),s=n.n(o),c=function(e){var t=e.categories;return r.createElement("ul",{className:"list-style-none flex gap-3 flex-wrap break-words"},null==t?void 0:t.map((function(e){return r.createElement("li",{key:e},r.createElement(l.Link,{to:"/categories/"+s()(e),className:"text-base md:text-sm text-green-500 no-underline hover:underline"},e))})))}},3859:function(e,t,n){var r=n(1082),a=n(7294),l=n(5419),o=n(5768);t.Z=function(e){var t,n=e.post;return a.createElement("article",{className:"post-list-item py-6",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",{className:"pt-6"},a.createElement("aside",null,n.node.frontmatter.categories&&a.createElement(o.v,{categories:n.node.frontmatter.categories})),a.createElement("h2",{className:"font-bold font-sans break-words text-gray-900 dark:text-gray-100 pb-2 text-3xl md:text-4xl"},a.createElement(r.Link,{to:n.node.fields.slug,itemProp:"url"},a.createElement("span",{itemProp:"headline"},n.node.frontmatter.title))),a.createElement("small",{className:"text-sm md:text-base font-normal text-gray-600 dark:text-gray-400"},n.node.frontmatter.date.toLocaleString())),a.createElement("section",{className:"article-body mt-1 break-words"},a.createElement("p",{dangerouslySetInnerHTML:{__html:null!==(t=n.node.frontmatter.description||n.node.excerpt)&&void 0!==t?t:""},itemProp:"description"})),a.createElement("footer",null,a.createElement("aside",{className:"text-base md:text-sm text-gray-500 flex flex-row"},a.createElement(l.zy,{tags:n.node.frontmatter.tags}))))}},7200:function(e,t,n){n.r(t);var r=n(7294),a=n(9108),l=n(4001),o=n(3859);t.default=function(e){var t,n=e.data,s=e.location,c=(null===(t=n.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",i=n.allMarkdownRemark.edges;return i&&0===i.length?r.createElement(a.Z,{location:s,title:c},r.createElement(l.Z,{title:"All posts"}),r.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):r.createElement(a.Z,{location:s,title:c},r.createElement(l.Z,{title:"Recent posts"}),r.createElement("ol",{className:"list-style-none"},null==i?void 0:i.map((function(e){return r.createElement("li",{key:e.node.fields.slug},r.createElement(o.Z,{post:e}))}))))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-ce6f6eebaeb77c65a427.js.map