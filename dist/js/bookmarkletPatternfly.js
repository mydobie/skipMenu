javascript: (() => {  const css = document.createElement('style');  css.innerHTML = '[data-skip-menu]{position:absolute;left:50%;transform:translate(-50%);z-index:999;top:0}[data-skip-menu].skipMenu-hidden{top:-1000px;width:1px;height:1px;overflow:hidden}[data-skip-menu] .tooltip{opacity:1;display:none}[data-skip-menu] .tooltip .tooltip-arrow{left:1.5rem}[data-skip-menu] [role=separator]{padding:.25rem .5rem;border-bottom:1px solid #757575;font-weight:bold}[data-skip-menu] [role=menuitem]{cursor:pointer}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-2{padding-left:2em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-3{padding-left:3em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-4{padding-left:4em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-5{padding-left:5em}[data-skip-menu] [role=menuitem].skipMenu-menu-header-level-6{padding-left:6em}[data-skip-menu] .dropdown-menu{max-height:calc(85vh - 30px);overflow:scroll;box-shadow:3px 3px 10px #ccc}.tooltip{position:absolute;z-index:1080}.dropdown-menu{position:absolute}.dropdown-item{white-space:nowrap}[data-skip-menu]>.pf-c-button.pf-m-tertiary{background-color:var(--pf-global--Color--dark-100);color:var(--pf-global--Color--light-100)}';  document.getElementsByTagName('head')[0].appendChild(css);  (()=>{"use strict";var e=function(t){if(9===t.nodeType||null===t.parentElement)return!0;var n=window.getComputedStyle(t),a=n.getPropertyValue("display"),o=n.getPropertyValue("visibility"),i=n.getPropertyValue("width"),r=n.getPropertyValue("height"),d=t.getAttribute("hidden");return"none"!==a&&"hidden"!==o&&null===d&&"0px"!==i&&"0px"!==r&&e(t.parentNode)},t=function(e){var t=document.getElementById(e.menuContainerId);if(t){var n=document.getElementById(e.buttonId);t.style.display="block",n.setAttribute("aria-expanded","true"),t.querySelector('[role="menuitem"]').focus()}},n=function(e,t){void 0===t&&(t=!1);var n=document.getElementById(e.menuContainerId);if(n){var a=document.getElementById(e.buttonId);a.setAttribute("aria-expanded","false"),n.style.display="none",t||e.alwaysShow||document.getElementById(e.id).classList.add("skipMenu-hidden"),a.focus()}},a=function(e,t){if("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)return null;var n=window.navigator.userAgent.toLowerCase(),a=/(macintosh|macintel|macppc|mac68k|macos)/.test(n),o=/(opera|opr)/.test(n),i=/(firefox)/.test(n),r=t;return(r+=a&&o?"Control + Alt":a?"Control + Option":i?"Alt + Shift":"Alt")+" + "+e},o=function(t,a,o){var i=document.createElement("div"),r=function(e,t,n){var a=function(e,t){var n=e.tagName;switch(e.getAttribute("role")){case"main":return t.text.mainLabel;case"search":return t.text.searchLabel;case"navigation":return t.text.navigationLabel;case"region":return t.text.regionLabel;case"complementary":return t.text.complementaryLabel;case"banner":return t.text.bannerLabel;case"contentinfo":return t.text.footerLabel}switch(n.toLowerCase()){case"main":return t.text.mainLabel;case"nav":return t.text.navigationLabel;case"section":return t.text.sectionLabel;case"form":return t.text.formLabel;case"aside":return t.text.complementaryLabel;case"header":return t.text.bannerLabel;case"footer":return t.text.footerLabel}return null}(e,n),o="";return e.hasAttribute("aria-label")?o=e.getAttribute("aria-label"):e.hasAttribute("aria-labelledby")?o=document.getElementById(e.getAttribute("aria-labelledby")).innerText.trim():e.hasAttribute("title")&&(o=e.getAttribute("title")),a?o?"".concat(a,": ").concat(o):a:t?(o||e.innerText).trim():e.tagName.toLocaleLowerCase()}(t,!!a,o);if(!r||""===r||t.classList.contains(o.ignoreClass))return null;a&&(i.className="".concat(o.id,"-menu-header-level-").concat(a),r="".concat(a,") ").concat(r));var d=document.createElement("span");d.classList.add("pf-c-menu__item");var l=document.createTextNode(r);return d.appendChild(l),i.appendChild(d),i.setAttribute("role","menuitem"),i.classList.add("dropdown-item","pf-c-menu__list-item"),i.setAttribute("tabindex","-1"),function(t,a,o){var i=o.buttonId;return t.addEventListener("click",(function(e){n(o),a.focus(),e.stopPropagation(),e.preventDefault()})),t.addEventListener("keydown",(function(t){"Enter"!==t.key&&" "!==t.key||(n(o),a.focus()),t.stopPropagation(),t.preventDefault(),"Tab"===t.key&&(n(o),t.shiftKey?document.getElementById(i).focus():function(t){void 0===t&&(t="skipMenu_button");var n,a=document.querySelectorAll('a:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'),o=Array.from(a).findIndex((function(e){return e.isEqualNode(document.getElementById(t))})),i=document.getElementById(t).tabIndex||0;if(0===i)for(var r=o+1;r<a.length&&!n;r++)e(a[r])&&0===a[r].tabIndex&&(n=a[r]);else{for(r=o+1;r<a.length&&!n;r++)e(a[r])&&a[r].tabIndex>=i&&(n=a[r]);for(r=0;r<o&&!n;r++)e(a[r])&&0===a[r].tabIndex&&(n=a[r])}n?n.focus():document.getElementById(t).focus()}(i))})),t}(i,t,o)},i=function(t,n,a,i){if(0===t.length)return null;var r=document.createElement("div");r.setAttribute("role","group"),r.classList.add("pf-c-menu__list"),r.id=a,r.setAttribute("aria-labelledby","".concat(a,"-title"));var d=document.createElement("div");return d.setAttribute("role","separator"),d.id="".concat(a,"-title"),d.appendChild(document.createTextNode(n)),r.appendChild(d),t.forEach((function(t){if(e(t)){var n=parseInt(t.tagName.substring(1));t.getAttribute("aria-level")&&(n=parseInt(t.getAttribute("aria-level"))),function(e){if(null!==e.getAttribute("href")||e.hasAttribute("contentEditable")&&"false"!==e.getAttribute("contentEditable").toLowerCase()||null!==e.getAttribute("tabindex"))return!0;var t=e.tagName.toLowerCase();return["button","details","input","iframe","select","textarea"].some((function(e){return e===t}))}(t)||(t.tabIndex=-1),o(t,n,i)&&r.appendChild(o(t,n,i))}})),r},r=function(e){var t=document.createElement("div");t.setAttribute("aria-live","off"),t.setAttribute("role","menu"),t.classList.add("pf-c-menu"),t.id=e.menuId;var a=i(document.querySelectorAll(e.headers),e.text.headingsLabel,"".concat(e.id,"_headings"),e),o=i(document.querySelectorAll(e.landmarks),e.text.landmarksLabel,"".concat(e.id,"_landmarks"),e);return null!==o&&t.appendChild(o),null!==a&&t.appendChild(a),null!==a||null!==o?(function(e,t){var a=e.querySelectorAll('[role="menuitem"]');a.forEach((function(e,o){e.tabIndex=-1,e.addEventListener("keydown",(function(e){"ArrowDown"!=e.key&&"ArrowUp"!=e.key||(e.stopPropagation(),e.preventDefault(),"ArrowDown"===e.key&&(a[o+1]?a[o+1].focus():a[0].focus()),"ArrowUp"===e.key&&(a[o-1]?a[o-1].focus():a[a.length-1].focus())),"Escape"===e.key&&n(t)}))}))}(t,e),t):null},d=function(){return d=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},d.apply(this,arguments)},l=function(){function e(e){var t={id:"skipMenu",attachTo:document.getElementsByTagName("body")[0],alwaysShow:!0,headers:"h1, h2, h3, h4, h5, h6, [role=heading]",landmarks:"main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]",reloadOnChange:!1,useAccessKey:!1,accessKey:"0",tabIndex:null,isRemoved:!1,ignoreClass:"skipMenu-ignore",text:{buttonLabel:"Skip to content",headingsLabel:"Headings",landmarksLabel:"Landmarks",tooltipLabel:"Shortcut: ",controlKeyLabel:"Control",optionKeyLabel:"Option",altKeyLabel:"Alt",shiftKeyLabel:"Shift",mainLabel:"Main",searchLabel:"Search",navigationLabel:"Navigation",regionLabel:"Region",complementaryLabel:"Complementary",bannerLabel:"Banner",footerLabel:"Footer",sectionLabel:"Section",formLabel:"Form"},ensureAbsoluteParent:!0};this.config=d(d({},t),e),(null==e?void 0:e.text)&&(this.config.text=d(d({},t.text),e.text)),this.config.menuId=this.config.id+"_menu",this.config.menuContainerId=this.config.menuId+"-container",this.config.buttonId=this.config.id+"_button",this.config.tooltipId=this.config.id+"_tooltip",this.update=this.update.bind(this),this.getConfig=this.getConfig.bind(this)}return e.prototype.getConfig=function(){return this.config},e.prototype.init=function(){var e,t;e=this.config,t=this.update,e.reloadOnChange&&new MutationObserver((function(n){n.forEach((function(n){var a;Array.from(n.removedNodes).some((function(t){return t.id===e.id}))||Array.from(n.addedNodes).some((function(t){return t.id===e.id}))||n.target.closest("#".concat(e.id))||"tabindex"===n.attributeName||"\n\n"===(null===(a=n.addedNodes[0])||void 0===a?void 0:a.data)||n.target.id===e.id||n.target.id===e.menuId||t()}))})).observe(document,{attributes:!0,subtree:!0,childList:!0}),function(e){document.addEventListener("click",(function(t){var a=document.getElementById(e.menuContainerId);a&&"none"!==a.style.display&&!t.target.closest("#".concat(e.id))&&n(e)}))}(this.config),this._add()},e.prototype._add=function(){if(this.config.isRemoved)return null;var e=document.createDocumentFragment(),o=document.createElement("div");e.appendChild(o),o.id=this.config.id,o.setAttribute("data-skip-menu","true"),this.config.alwaysShow||o.classList.add("skipMenu-hidden");var i=function(e){var o=document.createDocumentFragment(),i=document.createElement("button");if(i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded","false"),i.setAttribute("aria-controls",e.menuId),i.classList.add("btn","btn-secondary","pf-c-button","pf-m-tertiary"),i.id=e.buttonId,i.textContent=e.text.buttonLabel,e.tabIndex&&(i.tabIndex=e.tabIndex),i.addEventListener("click",(function(a){a.stopPropagation(),a.preventDefault(),function(e,a){void 0===a&&(a=!1);var o=document.getElementById(e.menuContainerId);o&&("none"!==o.style.display?n(e,a):t(e))}(e,!0)})),e.alwaysShow||(i.addEventListener("focus",(function(){document.getElementById(e.id).classList.remove("skipMenu-hidden")})),i.addEventListener("blur",(function(){"false"===i.getAttribute("aria-expanded")&&document.getElementById(e.id).classList.add("skipMenu-hidden")}))),o.appendChild(i),e.useAccessKey){var r=function(e){if(!a(e.accessKey,e.text.tooltipLabel))return null;var t=document.createElement("div");t.id=e.tooltipId,t.classList.add("tooltip","bs-tooltip-bottom","pf-c-tooltip","pf-m-bottom"),t.setAttribute("role","tooltip");var n=document.createElement("div");n.classList.add("tooltip-arrow","pf-c-tooltip__arrow"),t.appendChild(n);var o=document.createElement("div");return o.classList.add("tooltip-inner","pf-c-tooltip__content"),o.textContent=a(e.accessKey,e.text.tooltipLabel),t.appendChild(o),t}(e);r&&(i.addEventListener("focus",(function(){"false"===i.getAttribute("aria-expanded")&&(r.style.display="block")})),i.addEventListener("blur",(function(){r.style.display="none"})),i.addEventListener("mouseover",(function(){"false"===i.getAttribute("aria-expanded")&&(r.style.display="block")})),i.addEventListener("mouseout",(function(){r.style.display="none"})),o.appendChild(r),i.setAttribute("accesskey",e.accessKey))}return o}(this.config);o.appendChild(i);var d=r(this.config);if(null!==d){var l=document.createElement("div");l.id=this.config.menuContainerId,l.classList.add("dropdown-menu"),l.style.display="none",l.appendChild(d),o.appendChild(l);var s=window.getComputedStyle(this.config.attachTo);this.config.ensureAbsoluteParent&&"body"!==this.config.attachTo.tagName.toLocaleLowerCase()&&!["sticky","absolute","fixed","relative","-webkit-sticky"].some((function(e){return e===s.getPropertyValue("position")}))&&(this.config.attachTo.style.position="relative"),this.config.attachTo.prepend(o)}else console.warn("No landmarks or headers found  - skipmenu could not be built")},e.prototype.update=function(){var e=document.getElementById(this.config.menuId),t=r(this.config);if(e&&t&&!e.isEqualNode(t)){var n=document.activeElement;e.setAttribute("aria-busy","true"),e.replaceWith(t),e.setAttribute("aria-busy","false"),t.querySelectorAll('[role="menuitem"]').forEach((function(e){n.isEqualNode(e)&&e.focus()}))}t&&!e&&this._add(),!t&&e&&this._remove()},e.prototype.open=function(){t(this.getConfig())},e.prototype.close=function(){n(this.getConfig())},e.prototype._remove=function(){var e=document.getElementById(this.config.id);e&&e.remove()},e.prototype.remove=function(){this.config.isRemoved=!0,this._remove()},e.version="v1.2.0",e}();window.SkipMenu=l})();  const skipMenu = new SkipMenu({ useAccessKey: true, reloadOnChange: true });  skipMenu.init();})();