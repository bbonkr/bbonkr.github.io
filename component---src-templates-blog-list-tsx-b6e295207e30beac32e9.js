"use strict";(self.webpackChunkbbon_me=self.webpackChunkbbon_me||[]).push([[959],{1909:function(e,t,a){a.d(t,{Z:function(){return s}});var n=a(7294),r=a(396),l=a(1597),c=a(3201),o=function(e){var t=e.social,a=e.openNewWindow,r=a?"_blank":"_self",l="noreferrer "+(a?"external":"");return n.createElement("ul",{className:"social-list"},(null==t?void 0:t.github)&&n.createElement("li",null,n.createElement("a",{href:"https://github.com/"+((null==t?void 0:t.github)||""),target:r,rel:l},n.createElement(c.hJX,{size:"1.3rem"}))),(null==t?void 0:t.twitter)&&n.createElement("li",null,n.createElement("a",{href:"https://twitter.com/"+((null==t?void 0:t.twitter)||""),target:r,rel:l},n.createElement(c.fWC,{size:"1.3rem"}))),(null==t?void 0:t.facebook)&&n.createElement("li",null,n.createElement("a",{href:"https://www.facebook.com/"+((null==t?void 0:t.facebook)||""),target:r,rel:l},n.createElement(c.Am9,{size:"1.3rem"}))),(null==t?void 0:t.linkedin)&&n.createElement("li",null,n.createElement("a",{href:"https://www.linkedin.com/in/"+((null==t?void 0:t.linkedin)||"")+"/",target:r,rel:l},n.createElement(c.ltd,{size:"1.3rem"}))))},s=function(){var e,t,c,s=(c=(0,l.useStaticQuery)("3199328057"),Object.assign({},c)).site,i=null===(e=s.siteMetadata)||void 0===e?void 0:e.author,m=null===(t=s.siteMetadata)||void 0===t?void 0:t.social;return n.createElement("div",{id:"bio",className:"flex w-full items-center font-sans px-4 py-12"},n.createElement(r.S,{className:"w-10 h-10 rounded-full mr-4",layout:"fixed",formats:["auto","webp","avif"],src:"../images/me.png",width:50,height:50,quality:95,alt:"Profile picture",__imageData:a(7647)}),(null==i?void 0:i.name)&&n.createElement("div",{className:"flex-1 px-2"},n.createElement("p",{className:"text-base font-bold md:text-xl leading-none mb-1"},i.name),(null==i?void 0:i.summary)&&n.createElement("p",{className:"text-gray-600 dark:text-gray-400 text-xs md:text-base mb-1"},null==i?void 0:i.summary),m&&n.createElement("div",{className:"justify-end"},n.createElement(o,{social:m}))))}},9139:function(e,t,a){a.d(t,{o:function(){return r},v:function(){return s}});var n=a(7294),r=function(e){var t=e.categories,a=e.selectedCategory,r=e.onChange;return n.createElement("ul",{className:"flex flex-row flex-wrap break-words gap-3 px-4 py-3"},null==t?void 0:t.map((function(e){return n.createElement("li",{key:e.fieldValue,className:"cursor-pointer text-green-600 dark:text-green-600  p-2 "+(a===e.fieldValue?"cursor-not-allowed border-green-600 border-b-2":""),onClick:(t=e.fieldValue,function(){r&&r(t)})},e.fieldValue," (",e.totalCount,")");var t})))},l=a(1597),c=a(1804),o=a.n(c),s=function(e){var t=e.categories;return n.createElement("ul",{className:"list-style-none flex gap-3 flex-wrap break-words"},null==t?void 0:t.map((function(e){return n.createElement("li",{key:e},n.createElement(l.Link,{to:"/categories/"+o()(e),className:"text-base md:text-sm text-green-500 no-underline hover:underline"},e))})))}},2248:function(e,t,a){a.d(t,{Hr:function(){return r}});var n=a(7294),r=function(){return n.createElement("hr",{className:"border-b-2 border-gray-400 my-8"})}},3032:function(e,t,a){a.d(t,{T:function(){return l}});var n=a(7294),r=a(1597),l=function(e){var t=e.current,a=e.total,l=e.path,c=e.showDescription,o=e.useShortcut,s=n.useState(""+t),i=s[0],m=s[1];return n.createElement("nav",null,n.createElement("div",{className:"font-sans container max-w-4xl mx-auto flex flex-col justify-center items-center"},n.createElement("div",{className:"w-full mx-auto flex flex-wrap"},n.createElement("div",{className:"flex-start text-left md:w-1/2 flex-1"},t>1&&n.createElement(n.Fragment,null,n.createElement("span",{className:"text-xs md:text-sm font-normal text-gray-600"},"< Previous Page"),n.createElement(r.Link,{to:l+(t-1<2?"":"/"+(t-1)),rel:"prev",className:"break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"},n.createElement("br",null),"Previous Page"))),n.createElement("div",{className:"flex-end text-right md:w-1/2 flex-1"},t<a&&n.createElement(n.Fragment,null,n.createElement("span",{className:"text-xs md:text-sm font-normal text-gray-600"},"Next Page >"),n.createElement("br",null),n.createElement(r.Link,{to:l+"/"+(t+1),rel:"next",className:"break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"},"Next Page")))),n.createElement("div",{className:"flex-1 flex justify-center items-center w-full gap-3 my-6 flex-wrap"},c&&n.createElement("div",{className:""},n.createElement("h2",{className:"flex gap-2 text-sm"},n.createElement("span",null,"Posts on"),n.createElement("span",{className:"text-green-500"},""+t),n.createElement("span",null,"of"),n.createElement("span",null,a+" page"+(a>1?"s":"")))),o&&n.createElement("form",{onSubmit:function(e){e.preventDefault(),i&&i!==""+t&&(0,r.navigate)(l+("1"===i?"":"/"+i))},className:"flex gap-1"},n.createElement("select",{className:"rounded-md shadow-sm border-green-600 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50",onChange:function(e){var t=e.target.value;m((function(e){return t}))},value:i},Array.from({length:a}).map((function(e,t){return n.createElement("option",{key:t+1,value:t+1},t+1)}))),n.createElement("button",{type:"submit",className:"button bg-green-600 text-gray-100 focus:ring focus:ring-green-200 focus:ring-opacity-50"},"Go")))))}},2191:function(e,t,a){var n=a(1597),r=a(7294),l=a(3529),c=a(9139);t.Z=function(e){var t,a=e.post;return r.createElement("article",{className:"post-list-item py-6",itemScope:!0,itemType:"http://schema.org/Article"},r.createElement("header",{className:"pt-6"},r.createElement("aside",null,a.node.frontmatter.categories&&r.createElement(c.v,{categories:a.node.frontmatter.categories})),r.createElement("h2",{className:"font-bold font-sans break-words text-gray-900 dark:text-gray-100 pb-2 text-3xl md:text-4xl"},r.createElement(n.Link,{to:a.node.fields.slug,itemProp:"url"},r.createElement("span",{itemProp:"headline"},a.node.frontmatter.title))),r.createElement("small",{className:"text-sm md:text-base font-normal text-gray-600 dark:text-gray-400"},a.node.frontmatter.date)),r.createElement("section",{className:"article-body mt-1 break-words"},r.createElement("p",{dangerouslySetInnerHTML:{__html:null!==(t=a.node.frontmatter.description||a.node.excerpt)&&void 0!==t?t:""},itemProp:"description"})),r.createElement("footer",null,r.createElement("aside",{className:"text-base md:text-sm text-gray-500 flex flex-row"},r.createElement(l.zy,{tags:a.node.frontmatter.tags}))))}},300:function(e,t,a){a.r(t);var n=a(7294),r=a(1909),l=a(2248),c=a(2348),o=a(3032),s=a(2191),i=a(7431);t.default=function(e){var t,a=e.data,m=e.pageContext,u=e.location,d=a.site.siteMetadata,f=a.allMarkdownRemark.edges;return n.createElement(c.Z,{location:u,title:null!==(t=null==d?void 0:d.title)&&void 0!==t?t:""},n.createElement(i.Z,{title:"Posts on "+m.currentPage+" of "+m.totalPages+" page"+(m.totalPages>1?"s":"")}),n.createElement(r.Z,null),n.createElement("main",null,null==f?void 0:f.map((function(e){return n.createElement(s.Z,{key:e.node.fields.slug,post:e})}))),n.createElement(l.Hr,null),n.createElement("footer",null,n.createElement(o.T,{current:m.currentPage,total:m.totalPages,path:m.basePath,showDescription:!0,useShortcut:!0})))}},7647:function(e){e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/e5610/me.png","srcSet":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/e5610/me.png 50w,\\n/static/6a9fa0654c3ca06c7d85244d47f7ac93/e9b55/me.png 100w","sizes":"50px"},"sources":[{"srcSet":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/d4bf4/me.avif 50w,\\n/static/6a9fa0654c3ca06c7d85244d47f7ac93/ee81f/me.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/6a9fa0654c3ca06c7d85244d47f7ac93/3faea/me.webp 50w,\\n/static/6a9fa0654c3ca06c7d85244d47f7ac93/6a679/me.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')}}]);
//# sourceMappingURL=component---src-templates-blog-list-tsx-b6e295207e30beac32e9.js.map