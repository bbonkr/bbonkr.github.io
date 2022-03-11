/*! For license information please see component---src-templates-blog-post-tsx-83bd41f17e68cfd30749.js.LICENSE.txt */
"use strict";(self.webpackChunkbbon_me=self.webpackChunkbbon_me||[]).push([[7],{3258:function(e,t,r){r.r(t),r.d(t,{render:function(){return M}});var o=window.document,n=window.Math,a=window.HTMLElement,l=window.XMLHttpRequest,i=function(e,t){for(var r=0,o=e.length;r<o;r++)t(e[r])},c=function(e){return function(t,r,o){var n=e.createElement(t);if(null!=r)for(var a in r){var l=r[a];null!=l&&(null!=n[a]?n[a]=l:n.setAttribute(a,l))}return null!=o&&i(o,(function(t){n.appendChild("string"==typeof t?e.createTextNode(t):t)})),n}},s=c(o),d=function(e,t){return{}.hasOwnProperty.call(e,t)},u=function(e){return(""+e).toLowerCase()},f="github.com",m=l&&"prototype"in l&&"withCredentials"in l.prototype,g=m&&a&&"attachShadow"in a.prototype&&!("prototype"in a.prototype.attachShadow),h=function(e,t,r){e.addEventListener?e.addEventListener(t,r,!1):e.attachEvent("on"+t,r)},p=function(e,t,r){e.removeEventListener?e.removeEventListener(t,r,!1):e.detachEvent("on"+t,r)},b={light:".btn{color:#24292f;background-color:#ebf0f4;border-color:#ccd1d5;border-color:rgba(27,31,36,.15);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f6f8fa'/%3e%3cstop offset='90%25' stop-color='%23ebf0f4'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #f6f8fa, #ebf0f4 90%);background-image:linear-gradient(180deg, #f6f8fa, #ebf0f4 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF6F8FA', endColorstr='#FFEAEFF3')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#e9ebef;background-position:0 -0.5em;border-color:#caccd1;border-color:rgba(27,31,36,.15);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f3f4f6'/%3e%3cstop offset='90%25' stop-color='%23e9ebef'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #f3f4f6, #e9ebef 90%);background-image:linear-gradient(180deg, #f3f4f6, #e9ebef 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF3F4F6', endColorstr='#FFE8EAEE')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#e5e9ed;border-color:#c7cbcf;border-color:rgba(27,31,36,.15);box-shadow:inset 0 .15em .3em rgba(27,31,36,.15);background-image:none;filter:none}.social-count{color:#24292f;background-color:#fff;border-color:#ddddde;border-color:rgba(27,31,36,.15)}.social-count:focus,.social-count:hover{color:#0969da}.octicon-heart{color:#bf3989}",light_high_contrast:".btn{color:#0e1116;background-color:#e7ecf0;border-color:#2f3237;border-color:rgba(1,4,9,.8);background-image:none;filter:none}.btn:focus,.btn:hover{background-color:#c4cdd5;background-position:0 -0.5em;border-color:#282c32;border-color:rgba(1,4,9,.8);background-image:none;filter:none}.btn:active{background-color:#d8dde1;border-color:#2c2f34;border-color:rgba(1,4,9,.8);box-shadow:inset 0 .15em .3em rgba(1,4,9,.15)}.social-count{color:#0e1116;background-color:#fff;border-color:#34363a;border-color:rgba(1,4,9,.8)}.social-count:focus,.social-count:hover{color:#0349b4}.octicon-heart{color:#971368}",dark:".btn{color:#c9d1d9;background-color:#1a1e23;border-color:#2f3439;border-color:rgba(240,246,252,.1);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2321262d'/%3e%3cstop offset='90%25' stop-color='%231a1e23'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #21262d, #1a1e23 90%);background-image:linear-gradient(180deg, #21262d, #1a1e23 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF21262D', endColorstr='#FF191D22')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#292e33;background-position:0 -0.5em;border-color:#8b949e;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2330363d'/%3e%3cstop offset='90%25' stop-color='%23292e33'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #30363d, #292e33 90%);background-image:linear-gradient(180deg, #30363d, #292e33 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF30363D', endColorstr='#FF282D32')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#161719;border-color:#8b949e;box-shadow:inset 0 .15em .3em rgba(1,4,9,.15);background-image:none;filter:none}.social-count{color:#c9d1d9;background-color:#0d1117;border-color:#24282e;border-color:rgba(240,246,252,.1)}.social-count:focus,.social-count:hover{color:#58a6ff}.octicon-heart{color:#db61a2}",dark_dimmed:".btn{color:#adbac7;background-color:#30363d;border-color:#40464e;border-color:rgba(205,217,229,.1);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23373e47'/%3e%3cstop offset='90%25' stop-color='%2330363d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #373e47, #30363d 90%);background-image:linear-gradient(180deg, #373e47, #30363d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF373E47', endColorstr='#FF2F353C')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#3c444d;background-position:0 -0.5em;border-color:#768390;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23444c56'/%3e%3cstop offset='90%25' stop-color='%233c444d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #444c56, #3c444d 90%);background-image:linear-gradient(180deg, #444c56, #3c444d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF444C56', endColorstr='#FF3B434C')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#2e3031;border-color:#768390;box-shadow:inset 0 .15em .3em rgba(28,33,40,.15);background-image:none;filter:none}.social-count{color:#adbac7;background-color:#22272e;border-color:#333940;border-color:rgba(205,217,229,.1)}.social-count:focus,.social-count:hover{color:#539bf5}.octicon-heart{color:#c96198}",dark_high_contrast:".btn{color:#f0f3f6;background-color:#272b33;border-color:#7a828e;background-image:none;filter:none}.btn:focus,.btn:hover{background-color:#4a515b;background-position:0 -0.5em;border-color:#bdc4cc;background-image:none;filter:none}.btn:active{background-color:#1d1d1f;border-color:#bdc4cc;box-shadow:inset 0 .15em .3em rgba(1,4,9,.15)}.social-count{color:#f0f3f6;background-color:#0a0c10;border-color:#7a828e}.social-count:focus,.social-count:hover{color:#71b7ff}.octicon-heart{color:#ef6eb1}"},v=function(e,t){return"@media(prefers-color-scheme:"+e+"){"+b[d(b,t)?t:e]+"}"},y=function(e){if(null==e)return b.light;if(d(b,e))return b[e];var t=function(e,t,r,o){null==t&&(t="&"),null==r&&(r="="),null==o&&(o=window.decodeURIComponent);var n={};return i(e.split(t),(function(e){if(""!==e){var t=e.split(r);n[o(t[0])]=null!=t[1]?o(t.slice(1).join(r)):void 0}})),n}(e,";",":",(function(e){return e.replace(/^[ \t\n\f\r]+|[ \t\n\f\r]+$/g,"")}));return b[d(b,t["no-preference"])?t["no-preference"]:"light"]+v("light",t.light)+v("dark",t.dark)},w={"comment-discussion":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M1.5 2.75a.25.25 0 01.25-.25h8.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-3.5a.75.75 0 00-.53.22L3.5 11.44V9.25a.75.75 0 00-.75-.75h-1a.25.25 0 01-.25-.25v-5.5zM1.75 1A1.75 1.75 0 000 2.75v5.5C0 9.216.784 10 1.75 10H2v1.543a1.457 1.457 0 002.487 1.03L7.061 10h3.189A1.75 1.75 0 0012 8.25v-5.5A1.75 1.75 0 0010.25 1h-8.5zM14.5 4.75a.25.25 0 00-.25-.25h-.5a.75.75 0 110-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.457 1.457 0 01-2.487 1.03L9.22 12.28a.75.75 0 111.06-1.06l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25v-5.5z"></path>'}}},download:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path>'}}},eye:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>'}}},heart:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path>'}}},"issue-opened":{heights:{16:{width:16,path:'<path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>'}}},"mark-github":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>'}}},package:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path>'}}},play:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z"></path>'}}},"repo-forked":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>'}}},"repo-template":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M6 .75A.75.75 0 016.75 0h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 .75zm5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.5h-.75A.75.75 0 0111 .75zM4.992.662a.75.75 0 01-.636.848c-.436.063-.783.41-.846.846a.75.75 0 01-1.485-.212A2.501 2.501 0 014.144.025a.75.75 0 01.848.637zM2.75 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 012.75 4zm10.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM2.75 8a.75.75 0 01.75.75v.268A1.72 1.72 0 013.75 9h.5a.75.75 0 010 1.5h-.5a.25.25 0 00-.25.25v.75c0 .28.114.532.3.714a.75.75 0 01-1.05 1.072A2.495 2.495 0 012 11.5V8.75A.75.75 0 012.75 8zm10.5 0a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-.75a.75.75 0 010-1.5h.75v-.25a.75.75 0 01.75-.75zM6 9.75A.75.75 0 016.75 9h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 9.75zm-1 2.5v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>'}}},star:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>'}}}},x=function(e,t){e=u(e).replace(/^octicon-/,""),d(w,e)||(e="mark-github");var r=t>=24&&24 in w[e].heights?24:16,o=w[e].heights[r];return'<svg viewBox="0 0 '+o.width+" "+r+'" width="'+t*o.width/r+'" height="'+t+'" class="octicon octicon-'+e+'" aria-hidden="true">'+o.path+"</svg>"},k={},E=function(e,t){var r=k[e]||(k[e]=[]);if(!(r.push(t)>1)){var o=function(e){var t;return function(){t||(t=1,e.apply(this,arguments))}}((function(){for(delete k[e];t=r.shift();)t.apply(null,arguments)}));if(m){var n=new l;h(n,"abort",o),h(n,"error",o),h(n,"load",(function(){var e;try{e=JSON.parse(this.responseText)}catch(t){return void o(t)}o(200!==this.status,e)})),n.open("GET",e),n.send()}else{var a=this||window;a._=function(e){a._=null,o(200!==e.meta.status,e.data)};var i=c(a.document)("script",{async:!0,src:e+(-1!==e.indexOf("?")?"&":"?")+"callback=_"}),s=function(){a._&&a._({meta:{}})};h(i,"load",s),h(i,"error",s),function(e,t,r){if(null!=e.readyState){var o="readystatechange";h(e,o,(function n(){if(t.test(e.readyState))return p(e,o,n),r.apply(this,arguments)}))}}(i,/de|m/,s),a.document.getElementsByTagName("head")[0].appendChild(i)}}},C=function(e,t,r){var o=c(e.ownerDocument),n=e.appendChild(o("style",{type:"text/css"})),a="body{margin:0}a{text-decoration:none;outline:0}.widget{display:inline-block;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:0;line-height:0;white-space:nowrap}.btn,.social-count{position:relative;display:inline-block;display:inline-flex;height:14px;padding:2px 5px;font-size:11px;font-weight:600;line-height:14px;vertical-align:bottom;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:repeat-x;background-position:-1px -1px;background-size:110% 110%;border:1px solid}.btn{border-radius:.25em}.btn:not(:last-child){border-radius:.25em 0 0 .25em}.social-count{border-left:0;border-radius:0 .25em .25em 0}.widget-lg .btn,.widget-lg .social-count{height:16px;padding:5px 10px;font-size:12px;line-height:16px}.octicon{display:inline-block;vertical-align:text-top;fill:currentColor;overflow:visible}"+y(t["data-color-scheme"]);n.styleSheet?n.styleSheet.cssText=a:n.appendChild(e.ownerDocument.createTextNode(a));var l="large"===u(t["data-size"]),i=o("a",{className:"btn",href:t.href,rel:"noopener",target:"_blank",title:t.title||void 0,"aria-label":t["aria-label"]||void 0,innerHTML:x(t["data-icon"],l?16:14)+"&nbsp;"},[o("span",{},[t["data-text"]||""])]),s=e.appendChild(o("div",{className:"widget"+(l?" widget-lg":"")},[i])),d=i.hostname.replace(/\.$/,"");if(("."+d).substring(d.length-f.length)!=="."+f)return i.removeAttribute("href"),void r(s);var m=(" /"+i.pathname).split(/\/+/);if(((d===f||d==="gist."+f)&&"archive"===m[3]||d===f&&"releases"===m[3]&&("download"===m[4]||"latest"===m[4]&&"download"===m[5])||d==="codeload."+f)&&(i.target="_top"),"true"===u(t["data-show-count"])&&d===f&&"marketplace"!==m[1]&&"sponsors"!==m[1]&&"orgs"!==m[1]&&"users"!==m[1]&&"-"!==m[1]){var g,h;if(!m[2]&&m[1])h="followers",g="?tab=followers";else if(!m[3]&&m[2])h="stargazers_count",g="/stargazers";else if(m[4]||"subscription"!==m[3])if(m[4]||"fork"!==m[3]){if("issues"!==m[3])return void r(s);h="open_issues_count",g="/issues"}else h="forks_count",g="/network/members";else h="subscribers_count",g="/watchers";var p=m[2]?"/repos/"+m[1]+"/"+m[2]:"/users/"+m[1];E.call(this,"https://api.github.com"+p,(function(e,t){if(!e){var n=t[h];s.appendChild(o("a",{className:"social-count",href:t.html_url+g,rel:"noopener",target:"_blank","aria-label":n+" "+h.replace(/_count$/,"").replace("_"," ").slice(0,n<2?-1:void 0)+" on GitHub"},[(""+n).replace(/\B(?=(\d{3})+(?!\d))/g,",")]))}r(s)}))}else r(s)},z=window.devicePixelRatio||1,F=function(e){return(z>1?n.ceil(n.round(e*z)/z*2)/2:n.ceil(e))||0},N=function(e,t){e.style.width=t[0]+"px",e.style.height=t[1]+"px"},M=function(e,t){if(null!=e&&null!=t)if(e.getAttribute&&(e=function(e){var t={href:e.href,title:e.title,"aria-label":e.getAttribute("aria-label")};return i(["icon","color-scheme","text","size","show-count"],(function(r){var o="data-"+r;t[o]=e.getAttribute(o)})),null==t["data-text"]&&(t["data-text"]=e.textContent||e.innerText),t}(e)),g){var r=s("span");C(r.attachShadow({mode:"closed"}),e,(function(){t(r)}))}else{var a=s("iframe",{src:"javascript:0",title:e.title||void 0,allowtransparency:!0,scrolling:"no",frameBorder:0});N(a,[0,0]),a.style.border="none";h(a,"load",(function r(){var l,i=a.contentWindow;try{l=i.document.body}catch(c){return void o.body.appendChild(a.parentNode.removeChild(a))}p(a,"load",r),C.call(i,l,e,(function(r){var o=function(e){var t=e.offsetWidth,r=e.offsetHeight;if(e.getBoundingClientRect){var o=e.getBoundingClientRect();t=n.max(t,F(o.width)),r=n.max(r,F(o.height))}return[t,r]}(r);a.parentNode.removeChild(a),function(e,t,r){h(e,t,(function o(){return p(e,t,o),r.apply(this,arguments)}))}(a,"load",(function(){N(a,o)})),a.src="https://unpkg.com/github-buttons@2.21.1/dist/buttons.html#"+(a.name=function(e,t,r,o){null==t&&(t="&"),null==r&&(r="="),null==o&&(o=window.encodeURIComponent);var n=[];for(var a in e){var l=e[a];null!=l&&n.push(o(a)+r+o(l))}return n.join(t)}(e)),t(a)}))})),o.body.appendChild(a)}}},9139:function(e,t,r){r.d(t,{o:function(){return n},v:function(){return c}});var o=r(7294),n=function(e){var t=e.categories,r=e.selectedCategory,n=e.onChange;return o.createElement("ul",{className:"flex flex-row flex-wrap break-words gap-3 px-4 py-3"},null==t?void 0:t.map((function(e){return o.createElement("li",{key:e.fieldValue,className:"cursor-pointer text-green-600 dark:text-green-600  p-2 "+(r===e.fieldValue?"cursor-not-allowed border-green-600 border-b-2":""),onClick:(t=e.fieldValue,function(){n&&n(t)})},e.fieldValue," (",e.totalCount,")");var t})))},a=r(1597),l=r(1804),i=r.n(l),c=function(e){var t=e.categories;return o.createElement("ul",{className:"list-style-none flex gap-3 flex-wrap break-words"},null==t?void 0:t.map((function(e){return o.createElement("li",{key:e},o.createElement(a.Link,{to:"/categories/"+i()(e),className:"text-base md:text-sm text-green-500 no-underline hover:underline"},e))})))}},5666:function(e,t,r){r.r(t),r.d(t,{default:function(){return C}});var o=r(7294),n=r(1597),a=r(396),l=r(4769),i=r(7431);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var d=r(9611);function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function f(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,o=m(e);if(t){var n=m(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return f(this,r)}}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&(0,d.Z)(e,t)}(i,e);var t,n,a,l=p(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=l.call(this,e)).$=o.createRef(),t._=o.createRef(),t}return t=i,(n=[{key:"render",value:function(){return o.createElement("span",{ref:this.$},o.createElement("a",h(h({},this.props),{},{ref:this._}),this.props.children))}},{key:"componentDidMount",value:function(){this.paint()}},{key:"getSnapshotBeforeUpdate",value:function(){return this.reset(),null}},{key:"componentDidUpdate",value:function(){this.paint()}},{key:"componentWillUnmount",value:function(){this.reset()}},{key:"paint",value:function(){var e=this,t=this.$.current.appendChild(document.createElement("span"));Promise.resolve().then(r.bind(r,3258)).then((function(r){var o=r.render;null!=e._.current&&o(t.appendChild(e._.current),(function(e){try{t.parentNode.replaceChild(e,t)}catch(t){}}))}))}},{key:"reset",value:function(){this.$.current.replaceChild(this._.current,this.$.current.lastChild)}}])&&s(t.prototype,n),a&&s(t,a),Object.defineProperty(t,"prototype",{writable:!1}),i}(o.PureComponent),v=o.memo((function(e){var t=e.owner,r=e.repo,n=e.size,a=e.showCount,l=e.theme,i="https://github.com/"+t+"/"+r,c=[{type:"Star",url:i,icon:"octicon-star",label:"Star "+t+"/"+r+" on GitHub"},{type:"Watch",url:i+"/subscription",icon:"octicon-eye",label:"Watch "+t+"/"+r+" on GitHub"},{type:"Fork",url:i+"/fork",icon:"octicon-repo-forked",label:"Fork "+t+"/"+r+" on GitHub"},{type:"Issue",url:i+"/issues",icon:"octicon-issue-opened",label:"Issue "+t+"/"+r+" on GitHub"},{type:"Follow",url:"https://github.com/"+t,label:"Follow "+t+"/"+r+" on GitHub",text:"Follow @"+t}];return o.createElement("ul",{className:"github-buttons flex gap-2 flex-wrap"},c.map((function(e){var t,r;return o.createElement("li",{key:e.type,className:"py-0 list-none"},o.createElement(b,{href:e.url,"data-color-scheme":(r=l,r||"no-preference: light; light: light; dark: dark;"),"data-show-count":a,"data-size":n,"data-icon":e.icon,"aria-label":e.label},null!==(t=e.text)&&void 0!==t?t:e.type))})))})),y=r(3529),w=r(8062),x=r(9139),k=r(1279),E=function(e){var t,r=e.theme,n=o.useState({loading:!0,succeess:!1}),a=n[0],l=n[1],i=o.useRef(null);return o.useEffect((function(){var e=i.current,t=null==e?void 0:e.firstChild;t&&(null==e||e.removeChild(t)),l((function(){return{loading:!0,succeess:!1}}));var o=document.createElement("script");o.onload=function(){l((function(e){return{loading:!1,succeess:!0}}))},o.onerror=function(e,t,r,o,n){l((function(e){var t;return{loading:!1,succeess:!1,message:null!==(t=null==n?void 0:n.message)&&void 0!==t?t:"Failed to load 'Utterances' script."}}))},o.async=!0,o.src="https://utteranc.es/client.js",o.setAttribute("repo","bbonkr/bbonkr.github.io"),o.setAttribute("issue-term","pathname"),o.setAttribute("label","Blog Comment"),o.setAttribute("theme","dark"===r?"github-dark":"light"===r?"github-light":"preferred-color-scheme"),o.setAttribute("crossorigin","anonymous"),null==e||e.appendChild(o)}),[r]),o.createElement("div",{className:"comments-wrapper"},a.loading&&o.createElement("div",{className:"flex flex-col gap-3 flex-1 justify-center items-center"},o.createElement(k.xz6,{className:"animate-spin"}),o.createElement("span",null,"Loading script...")),!a.loading&&!a.succeess&&o.createElement("div",{className:"flex flex-col gap-3 flex-1 justify-center items-center"},o.createElement("div",null,null!==(t=a.message)&&void 0!==t?t:"Error. Please try again."," ")),o.createElement("div",{className:!a.loading&&a.succeess?"":"hidden",ref:i}))},C=function(e){var t,r,c,s,d,u,f,m,g,h,p=e.data,b=e.location,k=p.markdownRemark,C=(null===(t=p.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",z=p.previous,F=p.next,N=Boolean(null===(r=k.frontmatter.featuredImage)||void 0===r||null===(c=r.childImageSharp)||void 0===c?void 0:c.gatsbyImageData),M=null!==(s=k.frontmatter.featuredImage)&&void 0!==s&&null!==(d=s.childImageSharp)&&void 0!==d&&d.gatsbyImageData?(0,a.e)(null===(u=k.frontmatter.featuredImage)||void 0===u||null===(f=u.childImageSharp)||void 0===f?void 0:f.gatsbyImageData):void 0;return o.createElement(l.Z,{location:b,title:C},o.createElement(i.Z,{title:k.frontmatter.title,description:k.frontmatter.description||k.excerpt,image:M}),o.createElement("article",{className:"blog-post py-6",itemScope:!0,itemType:"http://schema.org/Article"},o.createElement("header",{className:"font-sans relative"},(null===(m=k.frontmatter.featuredImage)||void 0===m||null===(g=m.childImageSharp)||void 0===g?void 0:g.gatsbyImageData)&&o.createElement(o.Fragment,null,o.createElement(a.G,{image:null===(h=k.frontmatter.featuredImage.childImageSharp)||void 0===h?void 0:h.gatsbyImageData,alt:"Featured image for "+k.frontmatter.title,className:"blur-sm max-w-full max-h-80"})),o.createElement("div",{className:N?"px-3 py-3 bg-gray-900 absolute bottom-0 l-2 r-2 w-full opacity-80 ":""},o.createElement("p",{className:"text-base md:text-sm text-green-500 font-bold"},"<"," ",o.createElement(n.Link,{to:"/blog",className:"text-base md:text-sm text-green-500 font-bold no-underline hover:underline"},"BACK TO BLOG")),o.createElement("aside",{className:"pt-6"},k.frontmatter.categories&&o.createElement(x.v,{categories:k.frontmatter.categories})),o.createElement("h1",{className:"font-bold font-sans break-normal "+(N?"text-gray-100":"text-gray-900 dark:text-gray-100")+"    pb-2 text-3xl md:text-4xl break-words"},k.frontmatter.title),o.createElement("p",{className:"text-sm md:text-base font-normal "+(N?"text-gray-400":"text-gray-600 dark:text-gray-400")+"  "},k.frontmatter.date))),o.createElement("section",{className:"article-body pt-6",dangerouslySetInnerHTML:{__html:k.html},itemProp:"articleBody"}),k.frontmatter.github&&k.frontmatter.github.owner&&k.frontmatter.github.repo&&o.createElement("section",{className:"article-body"},o.createElement("h2",null,"GitHub Repository"),o.createElement(w.Z.Consumer,null,(function(e){return o.createElement(v,{repo:k.frontmatter.github.repo,owner:k.frontmatter.github.owner,showCount:!0,size:"large",theme:e.theme})}))),o.createElement("aside",{className:"text-base md:text-sm text-gray-500 py-6"},o.createElement("span",null,"Tags:"),o.createElement("ul",{className:"list-style-none flex gap-3 flex-wrap"},o.createElement(y.zy,{tags:k.frontmatter.tags}))),o.createElement("hr",{className:"border-b-2 border-gray-400 mb-8"}),o.createElement("footer",null,o.createElement("nav",null,o.createElement("div",{className:"font-sans container max-w-4xl mx-auto flex"},o.createElement("div",{className:"w-full mx-auto flex flex-wrap"},o.createElement("div",{className:"flex-start text-left md:w-1/2 flex-1"},z&&o.createElement(o.Fragment,null,o.createElement("span",{className:"text-xs md:text-sm font-normal text-gray-600"},"< Previous Post"),o.createElement(n.Link,{to:z.fields.slug,rel:"prev",className:"break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"},o.createElement("br",null),z.frontmatter.title))),o.createElement("div",{className:"flex-end text-right md:w-1/2 flex-1"},F&&o.createElement(o.Fragment,null,o.createElement("span",{className:"text-xs md:text-sm font-normal text-gray-600"},"Next Post >"),o.createElement("br",null),o.createElement(n.Link,{to:F.fields.slug,rel:"next",className:"break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"},F.frontmatter.title)))))),o.createElement(w.Z.Consumer,null,(function(e){return o.createElement(E,{theme:e.theme})})))))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-83bd41f17e68cfd30749.js.map