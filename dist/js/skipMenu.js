/*! skipMenu - v1.3.1 - 2022-07-04 - Commit 687d5f3
 https://github.com/mydobie/skipMenu

Copyright (c) 2022 Kim Doberstein and myDobie. All rights reserved.

This work is licensed under the terms of the MIT license.  
For a copy, see <https://opensource.org/licenses/MIT>.

*/
/* ********************* */
(()=>{"use strict";var e=function(t){if(9===t.nodeType||null===t.parentElement)return!0;var n=window.getComputedStyle(t),a=n.getPropertyValue("display"),o=n.getPropertyValue("visibility"),i=n.getPropertyValue("width"),r=n.getPropertyValue("height"),d=t.getAttribute("hidden");return"none"!==a&&"hidden"!==o&&null===d&&"0px"!==i&&"0px"!==r&&e(t.parentNode)},t=function(e,t){void 0===t&&(t=!1);var n=document.getElementById(e.menuContainerId);if(n){var a=document.getElementById(e.buttonId);n.style.display="block",null==a||a.setAttribute("aria-expanded","true");var o=n.querySelectorAll('[role="menuitem"]');t?o[o.length-1].focus():o[0].focus()}},n=function(e,t){var n;void 0===t&&(t=!1);var a=document.getElementById(e.menuContainerId);if(a){var o=document.getElementById(e.buttonId);null==o||o.removeAttribute("aria-expanded"),a.style.display="none",t||e.alwaysShow||null===(n=document.getElementById(e.id))||void 0===n||n.classList.add("skipMenu-hidden"),null==o||o.focus()}},a=function(e,t){if("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)return null;var n=window.navigator.userAgent.toLowerCase(),a=/(macintosh|macintel|macppc|mac68k|macos)/.test(n),o=/(opera|opr)/.test(n),i=/(firefox)/.test(n),r=t;return(r+=a&&o?"Control + Alt":a?"Control + Option":i?"Alt + Shift":"Alt")+" + "+e},o=function(t,a,o){var i=document.createElement("div"),r=function(e,t,n){var a,o=function(e,t){var n=e.tagName;switch(e.getAttribute("role")){case"main":return t.text.mainLabel;case"search":return t.text.searchLabel;case"navigation":return t.text.navigationLabel;case"region":return t.text.regionLabel;case"complementary":return t.text.complementaryLabel;case"banner":return t.text.bannerLabel;case"contentinfo":return t.text.footerLabel}switch(n.toLowerCase()){case"main":return t.text.mainLabel;case"nav":return t.text.navigationLabel;case"section":return t.text.sectionLabel;case"form":return t.text.formLabel;case"aside":return t.text.complementaryLabel;case"header":return t.text.bannerLabel;case"footer":return t.text.footerLabel}return null}(e,n),i="";if(e.hasAttribute("aria-label"))i=e.getAttribute("aria-label");else if(e.hasAttribute("aria-labelledby")){var r=e.getAttribute("aria-labelledby")||"";i=(null===(a=document.getElementById(r))||void 0===a?void 0:a.innerText.trim())||""}else e.hasAttribute("title")&&(i=e.getAttribute("title"));if(o)return i?"".concat(o,": ").concat(i):o;if(t){var d=i||e.innerText;return null==d?void 0:d.trim()}return e.tagName.toLocaleLowerCase()}(t,!!a,o);if(!r||""===r||t.classList.contains(o.ignoreClass))return null;var d=document.createElement("span");if(d.classList.add("pf-c-menu__item"),a){i.className="skipMenu-menu-header-level-".concat(a);var l=document.createElement("span");l.classList.add("menu__item-depth");var s=document.createTextNode("".concat(a));l.appendChild(s),d.appendChild(l),d.appendChild(document.createTextNode(") "))}var u=document.createTextNode(r),c=document.createElement("span");return c.classList.add("menu__item-text"),c.appendChild(u),d.appendChild(c),i.appendChild(d),i.setAttribute("role","menuitem"),i.classList.add("dropdown-item","pf-c-menu__list-item"),i.setAttribute("tabindex","-1"),function(t,a,o){var i=o.buttonId;return t.addEventListener("click",(function(e){n(o),a.focus(),e.stopPropagation(),e.preventDefault()})),t.addEventListener("keydown",(function(t){var r;"Enter"!==t.key&&" "!==t.key||(n(o),a.focus()),t.stopPropagation(),t.preventDefault(),"Tab"===t.key&&(n(o),t.shiftKey?null===(r=document.getElementById(i))||void 0===r||r.focus():function(t){var n,a;void 0===t&&(t="skipMenu_button");var o,i=document.querySelectorAll('a:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'),r=Array.from(i).findIndex((function(e){return e.isEqualNode(document.getElementById(t))})),d=(null===(n=document.getElementById(t))||void 0===n?void 0:n.tabIndex)||0;if(0===d)for(var l=r+1;l<i.length&&!o;l++)e(i[l])&&0===i[l].tabIndex&&(o=i[l]);else{for(l=r+1;l<i.length&&!o;l++)e(i[l])&&i[l].tabIndex>=d&&(o=i[l]);for(l=0;l<r&&!o;l++)e(i[l])&&0===i[l].tabIndex&&(o=i[l])}o?o.focus():null===(a=document.getElementById(t))||void 0===a||a.focus()}(i))})),t}(i,t,o)},i=function(t,n,a,i){if(0===t.length)return null;var r=document.createElement("div");r.setAttribute("role","group"),r.classList.add("pf-c-menu__list"),r.id=a,r.setAttribute("aria-labelledby","".concat(a,"-title"));var d=document.createElement("div");return d.setAttribute("role","separator"),d.id="".concat(a,"-title"),d.appendChild(document.createTextNode(n)),r.appendChild(d),t.forEach((function(t){if(e(t)){var n=parseInt(t.tagName.substring(1));t.getAttribute("aria-level")&&(n=parseInt(t.getAttribute("aria-level")||"")),function(e){var t;if(null!==e.getAttribute("href")||e.hasAttribute("contentEditable")&&"false"!==(null===(t=e.getAttribute("contentEditable"))||void 0===t?void 0:t.toLowerCase())||null!==e.getAttribute("tabindex"))return!0;var n=e.tagName.toLowerCase();return["button","details","input","iframe","select","textarea"].some((function(e){return e===n}))}(t)||(t.tabIndex=-1);var a=o(t,n,i);a&&r.appendChild(a)}})),r},r=function(e,t,n,a){var o,i=/^([0-9]\) )?\s*([\S])/,r=/^([0-9])?/;return t.forEach((function(t,d){var l,s,u,c,m;c=parseInt(e)?null==(m=null===(l=t.innerText)||void 0===l?void 0:l.match(r))?void 0:m[1]:null===(u=null==(m=null===(s=t.innerText)||void 0===s?void 0:s.match(i))?void 0:m[2])||void 0===u?void 0:u.toLocaleLowerCase(),d>=n&&d<=a&&!o&&c===e.toLowerCase()&&(o=d)})),o},d=function(e){var t=document.createElement("div");t.setAttribute("aria-live","off"),t.setAttribute("role","menu"),t.classList.add("pf-c-menu"),t.id=e.menuId;var a=e.headings?i(document.querySelectorAll(e.headings),e.text.headingsLabel,"".concat(e.id,"_headings"),e):null,o=e.landmarks?i(document.querySelectorAll(e.landmarks),e.text.landmarksLabel,"".concat(e.id,"_landmarks"),e):null;return null!==o&&t.appendChild(o),null!==a&&t.appendChild(a),null!==a||null!==o?(function(e,t){var a=e.querySelectorAll('[role="menuitem"]');a.forEach((function(e,o){e.tabIndex=-1,e.addEventListener("keydown",(function(e){switch(e.key){case"ArrowDown":e.stopImmediatePropagation(),e.preventDefault(),a[o+1]?a[o+1].focus():a[0].focus();break;case"ArrowUp":e.stopImmediatePropagation(),e.preventDefault(),a[o-1]?a[o-1].focus():a[a.length-1].focus();break;case"Escape":n(t);break;case"Home":a[0].focus();break;case"End":a[a.length-1].focus();break;default:if(/^[a-zA-Z1-9]$/.test(e.key)){var i=function(e,t,n){var a;return(a=r(e,t,n+1,t.length-1))||(a=r(e,t,0,n-1)),a}(e.key,a,o);void 0!==i&&a[i].focus()}}}))}))}(t,e),t):null},l={id:"skipMenu",attachTo:document.getElementsByTagName("body")[0],alwaysShow:!0,headings:"h1, h2, h3, h4, h5, h6, [role=heading]",landmarks:"main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]",reloadOnChange:!1,useAccessKey:!1,accessKey:"0",tabIndex:null,isRemoved:!1,ignoreClass:"skipMenu-ignore",text:{buttonLabel:"Skip to content",headingsLabel:"Headings",landmarksLabel:"Landmarks",tooltipLabel:"Shortcut: ",controlKeyLabel:"Control",optionKeyLabel:"Option",altKeyLabel:"Alt",shiftKeyLabel:"Shift",mainLabel:"Main",searchLabel:"Search",navigationLabel:"Navigation",regionLabel:"Region",complementaryLabel:"Complementary",bannerLabel:"Banner",footerLabel:"Footer",sectionLabel:"Section",formLabel:"Form"},ensureAbsoluteParent:!0,buttonId:"",menuId:"",menuContainerId:"",headers:"",tooltipId:"",mutationObserver:null},s=function(){return s=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},s.apply(this,arguments)},u=function(){function e(e){this.config=s(s({},l),e),(null==e?void 0:e.headers)&&(this.config.headings=e.headers),(null==e?void 0:e.text)&&(this.config.text=s(s({},l.text),e.text)),this.config.menuId=this.config.id+"_menu",this.config.menuContainerId=this.config.menuId+"-container",this.config.buttonId=this.config.id+"_button",this.config.tooltipId=this.config.id+"_tooltip",this.update=this.update.bind(this),this.getConfig=this.getConfig.bind(this)}return e.prototype.getConfig=function(){return this.config},e.prototype.init=function(){var e,t=this;!function(e,n,a){if(e.reloadOnChange){var o=new MutationObserver((function(t){t.forEach((function(t){var a;Array.from(t.removedNodes).some((function(t){return t.id===e.id}))||Array.from(t.addedNodes).some((function(t){return t.id===e.id}))||t.target.closest("#".concat(e.id))||"tabindex"===t.attributeName||"\n\n"===(null===(a=t.addedNodes[0])||void 0===a?void 0:a.data)||t.target.id===e.id||t.target.id===e.menuId||n()}))}));(function(e){t.config.mutationObserver=e})(o),o.observe(document,{attributes:!0,subtree:!0,childList:!0})}}(this.config,this.update),e=this.config,document.addEventListener("click",(function(t){var a=document.getElementById(e.menuContainerId);a&&"none"!==a.style.display&&!t.target.closest("#".concat(e.id))&&n(e)})),this._add()},e.prototype._add=function(){if(this.config.isRemoved)return null;var e=document.createDocumentFragment(),o=document.createElement("div");e.appendChild(o),o.id=this.config.id,o.setAttribute("data-skip-menu","true"),this.config.alwaysShow||o.classList.add("skipMenu-hidden");var i=function(e){var o=document.createDocumentFragment(),i=document.createElement("button");i.setAttribute("aria-haspopup","true"),i.removeAttribute("aria-expanded"),i.setAttribute("aria-controls",e.menuContainerId),i.classList.add("btn","btn-secondary","dropdown-toggle","pf-c-button","pf-m-tertiary"),i.id=e.buttonId,i.textContent=e.text.buttonLabel;var r=document.createElement("span");if(r.classList.add("pf-c-dropdown__toggle-icon"),i.appendChild(r),e.tabIndex&&(i.tabIndex=e.tabIndex),i.addEventListener("click",(function(a){a.stopPropagation(),a.preventDefault(),function(e,a){void 0===a&&(a=!1);var o=document.getElementById(e.menuContainerId);o&&("none"!==o.style.display?n(e,a):t(e))}(e,!0)})),i.addEventListener("keydown",(function(n){"ArrowDown"!=n.key&&"ArrowUp"!=n.key||(n.stopPropagation(),n.preventDefault(),"ArrowDown"==n.key?t(e):t(e,!0))})),e.alwaysShow||(i.addEventListener("focus",(function(){var t;null===(t=document.getElementById(e.id))||void 0===t||t.classList.remove("skipMenu-hidden")})),i.addEventListener("blur",(function(){var t;i.hasAttribute("aria-expanded")||null===(t=document.getElementById(e.id))||void 0===t||t.classList.add("skipMenu-hidden")}))),o.appendChild(i),e.useAccessKey){var d=function(e){if(!a(e.accessKey,e.text.tooltipLabel))return null;var t=document.createElement("div");t.id=e.tooltipId,t.classList.add("tooltip","bs-tooltip-bottom","pf-c-tooltip","pf-m-bottom"),t.setAttribute("role","tooltip");var n=document.createElement("div");n.classList.add("tooltip-arrow","pf-c-tooltip__arrow"),t.appendChild(n);var o=document.createElement("div");return o.classList.add("tooltip-inner","pf-c-tooltip__content"),o.textContent=a(e.accessKey,e.text.tooltipLabel),t.appendChild(o),t}(e);d&&(i.addEventListener("focus",(function(){i.hasAttribute("aria-expanded")||(d.style.display="block")})),i.addEventListener("blur",(function(){d.style.display="none"})),i.addEventListener("mouseover",(function(){i.hasAttribute("aria-expanded")||(d.style.display="block")})),i.addEventListener("mouseout",(function(){d.style.display="none"})),o.appendChild(d),i.setAttribute("accesskey",e.accessKey))}return o}(this.config);o.appendChild(i);var r=d(this.config);if(null!==r){var l=document.createElement("div");l.id=this.config.menuContainerId,l.classList.add("dropdown-menu"),l.style.display="none",l.appendChild(r),o.appendChild(l);var s=window.getComputedStyle(this.config.attachTo);this.config.ensureAbsoluteParent&&"body"!==this.config.attachTo.tagName.toLocaleLowerCase()&&!["sticky","absolute","fixed","relative","-webkit-sticky"].some((function(e){return e===s.getPropertyValue("position")}))&&(this.config.attachTo.style.position="relative"),this.config.attachTo.prepend(o)}else console.warn("No landmarks or headings found  - skipmenu could not be built")},e.prototype.update=function(){var e=document.getElementById(this.config.menuId),t=d(this.config);if(e&&t&&!e.isEqualNode(t)){var n=document.activeElement;e.setAttribute("aria-busy","true"),e.replaceWith(t),e.setAttribute("aria-busy","false"),t.querySelectorAll('[role="menuitem"]').forEach((function(e){n&&n.isEqualNode(e)&&e.focus()}))}t&&!e&&this._add(),!t&&e&&this._remove()},e.prototype.open=function(){t(this.getConfig())},e.prototype.close=function(){n(this.getConfig())},e.prototype._remove=function(){var e=document.getElementById(this.config.id);e&&e.remove()},e.prototype.remove=function(){var e;this.config.isRemoved=!0,null===(e=this.config.mutationObserver)||void 0===e||e.disconnect(),this.config.mutationObserver=null,this._remove()},e.version="v1.3.1",e}();window.SkipMenu=u})();
//# sourceMappingURL=skipMenu.js.map