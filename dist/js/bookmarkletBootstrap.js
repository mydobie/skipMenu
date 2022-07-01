javascript: (() => {  const css = document.createElement('style');  css.innerHTML = '[data-skip-menu]{position:absolute;left:50%;transform:translate(-50%);z-index:999;top:0}[data-skip-menu].skipMenu-hidden{top:-1000px;width:1px;height:1px;overflow:hidden}[data-skip-menu] .tooltip{opacity:1;display:none}[data-skip-menu] .tooltip .tooltip-arrow{left:1.5rem}[data-skip-menu] [role=separator]{padding:.25rem .5rem;border-bottom:1px solid #757575;font-weight:bold}[data-skip-menu] [role=menuitem]{cursor:pointer}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-2{padding-left:2em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-3{padding-left:3em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-4{padding-left:4em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-5{padding-left:5em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-6{padding-left:6em}[data-skip-menu] .dropdown-menu{max-height:calc(85vh - 30px);overflow:scroll;box-shadow:3px 3px 10px #ccc}[data-skip-menu] .pf-c-menu__item{display:block}[data-skip-menu] .pf-c-menu__item span{display:inline-block}[data-skip-menu] .pf-c-menu__item span::first-letter{text-decoration:underline}';  document.getElementsByTagName('head')[0].appendChild(css);  (()=>{"use strict";var e=function(t){if(9===t.nodeType||null===t.parentElement)return!0;var n=window.getComputedStyle(t),a=n.getPropertyValue("display"),o=n.getPropertyValue("visibility"),i=n.getPropertyValue("width"),r=n.getPropertyValue("height"),d=t.getAttribute("hidden");return"none"!==a&&"hidden"!==o&&null===d&&"0px"!==i&&"0px"!==r&&e(t.parentNode)},t=function(e,t){void 0===t&&(t=!1);var n=document.getElementById(e.menuContainerId);if(n){var a=document.getElementById(e.buttonId);n.style.display="block",a.setAttribute("aria-expanded","true");var o=n.querySelectorAll('[role="menuitem"]');t?o[o.length-1].focus():o[0].focus()}},n=function(e,t){void 0===t&&(t=!1);var n=document.getElementById(e.menuContainerId);if(n){var a=document.getElementById(e.buttonId);a.removeAttribute("aria-expanded"),n.style.display="none",t||e.alwaysShow||document.getElementById(e.id).classList.add("skipMenu-hidden"),a.focus()}},a=function(e,t){if("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)return null;var n=window.navigator.userAgent.toLowerCase(),a=/(macintosh|macintel|macppc|mac68k|macos)/.test(n),o=/(opera|opr)/.test(n),i=/(firefox)/.test(n),r=t;return(r+=a&&o?"Control + Alt":a?"Control + Option":i?"Alt + Shift":"Alt")+" + "+e},o=function(t,a,o){var i=document.createElement("div"),r=function(e,t,n){var a=function(e,t){var n=e.tagName;switch(e.getAttribute("role")){case"main":return t.text.mainLabel;case"search":return t.text.searchLabel;case"navigation":return t.text.navigationLabel;case"region":return t.text.regionLabel;case"complementary":return t.text.complementaryLabel;case"banner":return t.text.bannerLabel;case"contentinfo":return t.text.footerLabel}switch(n.toLowerCase()){case"main":return t.text.mainLabel;case"nav":return t.text.navigationLabel;case"section":return t.text.sectionLabel;case"form":return t.text.formLabel;case"aside":return t.text.complementaryLabel;case"header":return t.text.bannerLabel;case"footer":return t.text.footerLabel}return null}(e,n),o="";return e.hasAttribute("aria-label")?o=e.getAttribute("aria-label"):e.hasAttribute("aria-labelledby")?o=document.getElementById(e.getAttribute("aria-labelledby")).innerText.trim():e.hasAttribute("title")&&(o=e.getAttribute("title")),a?o?"".concat(a,": ").concat(o):a:t?(o||e.innerText).trim():e.tagName.toLocaleLowerCase()}(t,!!a,o);if(!r||""===r||t.classList.contains(o.ignoreClass))return null;var d=document.createElement("span");if(d.classList.add("pf-c-menu__item"),a){i.className="skipMenu-menu-header-level-".concat(a);var s=document.createElement("span");s.classList.add("menu__item-depth");var l=document.createTextNode("".concat(a));s.appendChild(l),d.appendChild(s),d.appendChild(document.createTextNode(") "))}var c=document.createTextNode(r),u=document.createElement("span");return u.classList.add("menu__item-text"),u.appendChild(c),d.appendChild(u),i.appendChild(d),i.setAttribute("role","menuitem"),i.classList.add("dropdown-item","pf-c-menu__list-item"),i.setAttribute("tabindex","-1"),function(t,a,o){var i=o.buttonId;return t.addEventListener("click",(function(e){n(o),a.focus(),e.stopPropagation(),e.preventDefault()})),t.addEventListener("keydown",(function(t){"Enter"!==t.key&&" "!==t.key||(n(o),a.focus()),t.stopPropagation(),t.preventDefault(),"Tab"===t.key&&(n(o),t.shiftKey?document.getElementById(i).focus():function(t){void 0===t&&(t="skipMenu_button");var n,a=document.querySelectorAll('a:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'),o=Array.from(a).findIndex((function(e){return e.isEqualNode(document.getElementById(t))})),i=document.getElementById(t).tabIndex||0;if(0===i)for(var r=o+1;r<a.length&&!n;r++)e(a[r])&&0===a[r].tabIndex&&(n=a[r]);else{for(r=o+1;r<a.length&&!n;r++)e(a[r])&&a[r].tabIndex>=i&&(n=a[r]);for(r=0;r<o&&!n;r++)e(a[r])&&0===a[r].tabIndex&&(n=a[r])}n?n.focus():document.getElementById(t).focus()}(i))})),t}(i,t,o)},i=function(t,n,a,i){if(0===t.length)return null;var r=document.createElement("div");r.setAttribute("role","group"),r.classList.add("pf-c-menu__list"),r.id=a,r.setAttribute("aria-labelledby","".concat(a,"-title"));var d=document.createElement("div");return d.setAttribute("role","separator"),d.id="".concat(a,"-title"),d.appendChild(document.createTextNode(n)),r.appendChild(d),t.forEach((function(t){if(e(t)){var n=parseInt(t.tagName.substring(1));t.getAttribute("aria-level")&&(n=parseInt(t.getAttribute("aria-level"))),function(e){if(null!==e.getAttribute("href")||e.hasAttribute("contentEditable")&&"false"!==e.getAttribute("contentEditable").toLowerCase()||null!==e.getAttribute("tabindex"))return!0;var t=e.tagName.toLowerCase();return["button","details","input","iframe","select","textarea"].some((function(e){return e===t}))}(t)||(t.tabIndex=-1),o(t,n,i)&&r.appendChild(o(t,n,i))}})),r},r=function(e,t,n,a){var o,i=/^([0-9]\) )?\s*([\S])/,r=/^([0-9])?/;return t.forEach((function(t,d){var s,l,c,u;u=parseInt(e)?null===(s=t.innerText)||void 0===s?void 0:s.match(r)[1]:null===(c=null===(l=t.innerText)||void 0===l?void 0:l.match(i)[2])||void 0===c?void 0:c.toLocaleLowerCase(),d>=n&&d<=a&&!o&&u===e.toLowerCase()&&(o=d)})),o},d=function(e){var t=document.createElement("div");t.setAttribute("aria-live","off"),t.setAttribute("role","menu"),t.classList.add("pf-c-menu"),t.id=e.menuId;var a=e.headings?i(document.querySelectorAll(e.headings),e.text.headingsLabel,"".concat(e.id,"_headings"),e):null,o=e.landmarks?i(document.querySelectorAll(e.landmarks),e.text.landmarksLabel,"".concat(e.id,"_landmarks"),e):null;return null!==o&&t.appendChild(o),null!==a&&t.appendChild(a),null!==a||null!==o?(function(e,t){var a=e.querySelectorAll('[role="menuitem"]');a.forEach((function(e,o){e.tabIndex=-1,e.addEventListener("keydown",(function(e){switch(e.key){case"ArrowDown":e.stopImmediatePropagation(),e.preventDefault(),a[o+1]?a[o+1].focus():a[0].focus();break;case"ArrowUp":e.stopImmediatePropagation(),e.preventDefault(),a[o-1]?a[o-1].focus():a[a.length-1].focus();break;case"Escape":n(t);break;case"Home":a[0].focus();break;case"End":a[a.length-1].focus();break;default:if(/^[a-zA-Z1-9]$/.test(e.key)){var i=function(e,t,n){var a;return(a=r(e,t,n+1,t.length-1))||(a=r(e,t,0,n-1)),a}(e.key,a,o);void 0!==i&&a[i].focus()}}}))}))}(t,e),t):null},s=function(){return s=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},s.apply(this,arguments)},l=function(){function e(e){var t={id:"skipMenu",attachTo:document.getElementsByTagName("body")[0],alwaysShow:!0,headings:"h1, h2, h3, h4, h5, h6, [role=heading]",landmarks:"main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]",reloadOnChange:!1,useAccessKey:!1,accessKey:"0",tabIndex:null,isRemoved:!1,ignoreClass:"skipMenu-ignore",text:{buttonLabel:"Skip to content",headingsLabel:"Headings",landmarksLabel:"Landmarks",tooltipLabel:"Shortcut: ",controlKeyLabel:"Control",optionKeyLabel:"Option",altKeyLabel:"Alt",shiftKeyLabel:"Shift",mainLabel:"Main",searchLabel:"Search",navigationLabel:"Navigation",regionLabel:"Region",complementaryLabel:"Complementary",bannerLabel:"Banner",footerLabel:"Footer",sectionLabel:"Section",formLabel:"Form"},ensureAbsoluteParent:!0};this.config=s(s({},t),e),(null==e?void 0:e.headers)&&(this.config.headings=e.headers),(null==e?void 0:e.text)&&(this.config.text=s(s({},t.text),e.text)),this.config.menuId=this.config.id+"_menu",this.config.menuContainerId=this.config.menuId+"-container",this.config.buttonId=this.config.id+"_button",this.config.tooltipId=this.config.id+"_tooltip",this.update=this.update.bind(this),this.getConfig=this.getConfig.bind(this)}return e.prototype.getConfig=function(){return this.config},e.prototype.init=function(){var e,t;e=this.config,t=this.update,e.reloadOnChange&&new MutationObserver((function(n){n.forEach((function(n){var a;Array.from(n.removedNodes).some((function(t){return t.id===e.id}))||Array.from(n.addedNodes).some((function(t){return t.id===e.id}))||n.target.closest("#".concat(e.id))||"tabindex"===n.attributeName||"\n\n"===(null===(a=n.addedNodes[0])||void 0===a?void 0:a.data)||n.target.id===e.id||n.target.id===e.menuId||t()}))})).observe(document,{attributes:!0,subtree:!0,childList:!0}),function(e){document.addEventListener("click",(function(t){var a=document.getElementById(e.menuContainerId);a&&"none"!==a.style.display&&!t.target.closest("#".concat(e.id))&&n(e)}))}(this.config),this._add()},e.prototype._add=function(){if(this.config.isRemoved)return null;var e=document.createDocumentFragment(),o=document.createElement("div");e.appendChild(o),o.id=this.config.id,o.setAttribute("data-skip-menu","true"),this.config.alwaysShow||o.classList.add("skipMenu-hidden");var i=function(e){var o=document.createDocumentFragment(),i=document.createElement("button");i.setAttribute("aria-haspopup","true"),i.removeAttribute("aria-expanded"),i.setAttribute("aria-controls",e.menuContainerId),i.classList.add("btn","btn-secondary","dropdown-toggle","pf-c-button","pf-m-tertiary"),i.id=e.buttonId,i.textContent=e.text.buttonLabel;var r=document.createElement("span");if(r.classList.add("pf-c-dropdown__toggle-icon"),i.appendChild(r),e.tabIndex&&(i.tabIndex=e.tabIndex),i.addEventListener("click",(function(a){a.stopPropagation(),a.preventDefault(),function(e,a){void 0===a&&(a=!1);var o=document.getElementById(e.menuContainerId);o&&("none"!==o.style.display?n(e,a):t(e))}(e,!0)})),i.addEventListener("keydown",(function(n){"ArrowDown"!=n.key&&"ArrowUp"!=n.key||(n.stopPropagation(),n.preventDefault(),"ArrowDown"==n.key?t(e):t(e,!0))})),e.alwaysShow||(i.addEventListener("focus",(function(){document.getElementById(e.id).classList.remove("skipMenu-hidden")})),i.addEventListener("blur",(function(){i.hasAttribute("aria-expanded")||document.getElementById(e.id).classList.add("skipMenu-hidden")}))),o.appendChild(i),e.useAccessKey){var d=function(e){if(!a(e.accessKey,e.text.tooltipLabel))return null;var t=document.createElement("div");t.id=e.tooltipId,t.classList.add("tooltip","bs-tooltip-bottom","pf-c-tooltip","pf-m-bottom"),t.setAttribute("role","tooltip");var n=document.createElement("div");n.classList.add("tooltip-arrow","pf-c-tooltip__arrow"),t.appendChild(n);var o=document.createElement("div");return o.classList.add("tooltip-inner","pf-c-tooltip__content"),o.textContent=a(e.accessKey,e.text.tooltipLabel),t.appendChild(o),t}(e);d&&(i.addEventListener("focus",(function(){i.hasAttribute("aria-expanded")||(d.style.display="block")})),i.addEventListener("blur",(function(){d.style.display="none"})),i.addEventListener("mouseover",(function(){i.hasAttribute("aria-expanded")||(d.style.display="block")})),i.addEventListener("mouseout",(function(){d.style.display="none"})),o.appendChild(d),i.setAttribute("accesskey",e.accessKey))}return o}(this.config);o.appendChild(i);var r=d(this.config);if(null!==r){var s=document.createElement("div");s.id=this.config.menuContainerId,s.classList.add("dropdown-menu"),s.style.display="none",s.appendChild(r),o.appendChild(s);var l=window.getComputedStyle(this.config.attachTo);this.config.ensureAbsoluteParent&&"body"!==this.config.attachTo.tagName.toLocaleLowerCase()&&!["sticky","absolute","fixed","relative","-webkit-sticky"].some((function(e){return e===l.getPropertyValue("position")}))&&(this.config.attachTo.style.position="relative"),this.config.attachTo.prepend(o)}else console.warn("No landmarks or headings found  - skipmenu could not be built")},e.prototype.update=function(){var e=document.getElementById(this.config.menuId),t=d(this.config);if(e&&t&&!e.isEqualNode(t)){var n=document.activeElement;e.setAttribute("aria-busy","true"),e.replaceWith(t),e.setAttribute("aria-busy","false"),t.querySelectorAll('[role="menuitem"]').forEach((function(e){n.isEqualNode(e)&&e.focus()}))}t&&!e&&this._add(),!t&&e&&this._remove()},e.prototype.open=function(){t(this.getConfig())},e.prototype.close=function(){n(this.getConfig())},e.prototype._remove=function(){var e=document.getElementById(this.config.id);e&&e.remove()},e.prototype.remove=function(){this.config.isRemoved=!0,this._remove()},e.version="v1.3.0",e}();window.SkipMenu=l})();  const skipMenu = new SkipMenu({ useAccessKey: true, reloadOnChange: true });  skipMenu.init();})();