webpackJsonp([4],{210:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),c=n.n(a),u=n(281),s=(n.n(u),n(24)),l=n(214),f=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.componentDidMount=function(){return n.props.socket.channel.on("count",function(e){return n.setState({count:e.count})})},n.render=function(){return c.a.createElement(l.a,{title:n.state.count+" currently connected"},c.a.createElement("div",{className:"counter-master-container"},c.a.createElement("span",{className:"count-number"},n.state.count)))},n.state={count:0},n}return i(t,e),t}(a.Component),T=function(e){return{socket:e.socket}};t.default=Object(s.connect)(T)(f)},212:function(e,t){t.__esModule=!0;var n=(t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"}),r=(t.VALID_TAG_NAMES=Object.keys(n).map(function(e){return n[e]}),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(r).reduce(function(e,t){return e[r[t]]=t,e},{}),t.SELF_CLOSING_TAGS=[n.NOSCRIPT,n.SCRIPT,n.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},213:function(e,t,n){e.exports=n.p+"static/media/favicon.9777cf39.png"},214:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(0),u=n.n(c),s=n(25),l=n(215),f=n.n(l),T=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p="https://www.sitaratas.eu/",E=n(213),d="M\xc4NGI! Kaotaja on Sitaratas",A=function(e){function t(){var e,n,a,c;o(this,t);for(var s=arguments.length,l=Array(s),T=0;T<s;T++)l[T]=arguments[T];return n=a=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),a.render=function(){var e=a.props,t=e.children,n=e.id,o=e.className,i=r(e,["children","id","className"]);return u.a.createElement("div",{id:n,className:o},u.a.createElement(f.a,{htmlAttributes:{lang:"en"},title:i.title?i.title+" | Sitaratas.eu":d,link:[{rel:"canonical",href:p+a.props.location.pathname},{rel:"icon",type:"image/png",href:i.icon}],meta:a.getMetaTags(i,a.props.location.pathname)}),t)},c=n,i(a,c)}return a(t,e),T(t,[{key:"getMetaTags",value:function(e,t){var n=e.title,r=e.description,o=e.image,i=e.icon,a=e.contentType,c=e.twitter,u=e.noCrawl,s=e.published,l=e.updated,f=e.category,T=e.tags,A=n||d,y=r?r.length>150?r.substring(0,155)+"...":r:"K\xf5ige parem kaardim\xe4ng+karantiini garantii",h=o?""+p+o:"https://i.imgur.com/jvszDw8.png",m=i||E,S=[{itemprop:"name",content:A},{itemprop:"description",content:y},{itemprop:"image",content:h},{itemprop:"icon",content:m},{name:"description",content:y},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:"@who"},{name:"twitter:title",content:A},{name:"twitter:description",content:y},{name:"twitter:creator",content:c||"@who"},{name:"twitter:image",content:h},{property:"og:title",content:A},{property:"og:type",content:a||"website"},{property:"og:url",content:"https://www.sitaratas.eu"+t},{property:"og:image",content:h},{property:"og:description",content:y},{property:"og:site_name",content:d}];return u&&S.push({name:"robots",content:"noindex, nofollow"}),s&&S.push({name:"article:published_time",content:s}),l&&S.push({name:"article:modified_time",content:l}),f&&S.push({name:"article:section",content:f}),T&&S.push({name:"article:tag",content:T}),S}}]),t}(c.Component);t.a=Object(s.withRouter)(A)},215:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function c(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.Helmet=void 0;var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),f=r(l),T=n(2),p=r(T),E=n(216),d=r(E),A=n(218),y=r(A),h=n(219),m=n(212),S=function(){return null},_=(0,d.default)(h.reducePropsToState,h.handleClientStateChange,h.mapStateOnServer)(S),b=function(e){var t,n;return n=t=function(t){function n(){return i(this,n),a(this,t.apply(this,arguments))}return c(n,t),n.prototype.shouldComponentUpdate=function(e){return!(0,y.default)(this.props,e)},n.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case m.TAG_NAMES.SCRIPT:case m.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case m.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},n.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return u({},r,(t={},t[n.type]=[].concat(r[n.type]||[],[u({},o,this.mapNestedChildrenToProps(n,i))]),t))},n.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(r.type){case m.TAG_NAMES.TITLE:return u({},o,(t={},t[r.type]=a,t.titleAttributes=u({},i),t));case m.TAG_NAMES.BODY:return u({},o,{bodyAttributes:u({},i)});case m.TAG_NAMES.HTML:return u({},o,{htmlAttributes:u({},i)})}return u({},o,(n={},n[r.type]=u({},i),n))},n.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=u({},t);return Object.keys(e).forEach(function(t){var r;n=u({},n,(r={},r[t]=e[t],r))}),n},n.prototype.warnOnInvalidChildren=function(e,t){return!0},n.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return f.default.Children.forEach(e,function(e){if(e&&e.props){var i=e.props,a=i.children,c=o(i,["children"]),u=(0,h.convertReactPropstoHtmlAttributes)(c);switch(n.warnOnInvalidChildren(e,a),e.type){case m.TAG_NAMES.LINK:case m.TAG_NAMES.META:case m.TAG_NAMES.NOSCRIPT:case m.TAG_NAMES.SCRIPT:case m.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:u,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:u,nestedChildren:a})}}}),t=this.mapArrayTypeChildrenToProps(r,t)},n.prototype.render=function(){var t=this.props,n=t.children,r=o(t,["children"]),i=u({},r);return n&&(i=this.mapChildrenToProps(n,i)),f.default.createElement(e,i)},s(n,null,[{key:"canUseDOM",set:function(t){e.canUseDOM=t}}]),n}(f.default.Component),t.propTypes={base:p.default.object,bodyAttributes:p.default.object,children:p.default.oneOfType([p.default.arrayOf(p.default.node),p.default.node]),defaultTitle:p.default.string,defer:p.default.bool,encodeSpecialCharacters:p.default.bool,htmlAttributes:p.default.object,link:p.default.arrayOf(p.default.object),meta:p.default.arrayOf(p.default.object),noscript:p.default.arrayOf(p.default.object),onChangeClientState:p.default.func,script:p.default.arrayOf(p.default.object),style:p.default.arrayOf(p.default.object),title:p.default.string,titleAttributes:p.default.object,titleTemplate:p.default.string},t.defaultProps={defer:!0,encodeSpecialCharacters:!0},t.peek=e.peek,t.rewind=function(){var t=e.rewind();return t||(t=(0,h.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},n}(_);b.renderStatic=b.rewind,t.Helmet=b,t.default=b},216:function(e,t,n){"use strict";function r(e){return e&&"object"===typeof e&&"default"in e?e.default:e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function a(e,t,n){function r(e){return e.displayName||e.name||"Component"}if("function"!==typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!==typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if("undefined"!==typeof n&&"function"!==typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(a){function f(){T=e(p.map(function(e){return e.props})),E.canUseDOM?t(T):n&&(T=n(T))}if("function"!==typeof a)throw new Error("Expected WrappedComponent to be a React component.");var T,p=[],E=function(e){function t(){return e.apply(this,arguments)||this}i(t,e),t.peek=function(){return T},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=T;return T=void 0,p=[],e};var n=t.prototype;return n.shouldComponentUpdate=function(e){return!s(e,this.props)},n.componentWillMount=function(){p.push(this),f()},n.componentDidUpdate=function(){f()},n.componentWillUnmount=function(){var e=p.indexOf(this);p.splice(e,1),f()},n.render=function(){return u.createElement(a,this.props)},t}(c.Component);return o(E,"displayName","SideEffect("+r(a)+")"),o(E,"canUseDOM",l),E}}var c=n(0),u=r(c),s=r(n(217)),l=!("undefined"===typeof window||!window.document||!window.document.createElement);e.exports=a},217:function(e,t){e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(t),u=0;u<i.length;u++){var s=i[u];if(!c(s))return!1;var l=e[s],f=t[s];if(!1===(o=n?n.call(r,l,f,s):void 0)||void 0===o&&l!==f)return!1}return!0}},218:function(e,t,n){"use strict";function r(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){var n,u,s,l=o(e),f=o(t);if(l&&f){if((u=e.length)!=t.length)return!1;for(n=u;0!==n--;)if(!r(e[n],t[n]))return!1;return!0}if(l!=f)return!1;var T=e instanceof Date,p=t instanceof Date;if(T!=p)return!1;if(T&&p)return e.getTime()==t.getTime();var E=e instanceof RegExp,d=t instanceof RegExp;if(E!=d)return!1;if(E&&d)return e.toString()==t.toString();var A=i(e);if((u=A.length)!==i(t).length)return!1;for(n=u;0!==n--;)if(!a.call(t,A[n]))return!1;if(c&&e instanceof Element&&t instanceof Element)return e===t;for(n=u;0!==n--;)if(("_owner"!==(s=A[n])||!e.$$typeof)&&!r(e[s],t[s]))return!1;return!0}return e!==e&&t!==t}var o=Array.isArray,i=Object.keys,a=Object.prototype.hasOwnProperty,c="undefined"!==typeof Element;e.exports=function(e,t){try{return r(e,t)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}}},219:function(e,t,n){(function(e){function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(0),c=r(a),u=n(23),s=r(u),l=n(212),f=function(e){return!1===(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},T=function(e){var t=y(e,l.TAG_NAMES.TITLE),n=y(e,l.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,function(){return t});var r=y(e,l.HELMET_PROPS.DEFAULT_TITLE);return t||r||void 0},p=function(e){return y(e,l.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},E=function(e,t){return t.filter(function(t){return"undefined"!==typeof t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return i({},e,t)},{})},d=function(e,t){return t.filter(function(e){return"undefined"!==typeof e[l.TAG_NAMES.BASE]}).map(function(e){return e[l.TAG_NAMES.BASE]}).reverse().reduce(function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o],a=i.toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t},[])},A=function(e,t,n){var r={};return n.filter(function(t){return!!Array.isArray(t[e])||("undefined"!==typeof t[e]&&O("Helmet: "+e+' should be of type "Array". Instead found type "'+o(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,n){var o={};n.filter(function(e){for(var n=void 0,i=Object.keys(e),a=0;a<i.length;a++){var c=i[a],u=c.toLowerCase();-1===t.indexOf(u)||n===l.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||u===l.TAG_PROPERTIES.REL&&"stylesheet"===e[u].toLowerCase()||(n=u),-1===t.indexOf(c)||c!==l.TAG_PROPERTIES.INNER_HTML&&c!==l.TAG_PROPERTIES.CSS_TEXT&&c!==l.TAG_PROPERTIES.ITEM_PROP||(n=c)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],u=(0,s.default)({},r[c],o[c]);r[c]=u}return e},[]).reverse()},y=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},h=function(e){return{baseTag:d([l.TAG_PROPERTIES.HREF],e),bodyAttributes:E(l.ATTRIBUTE_NAMES.BODY,e),defer:y(e,l.HELMET_PROPS.DEFER),encode:y(e,l.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:E(l.ATTRIBUTE_NAMES.HTML,e),linkTags:A(l.TAG_NAMES.LINK,[l.TAG_PROPERTIES.REL,l.TAG_PROPERTIES.HREF],e),metaTags:A(l.TAG_NAMES.META,[l.TAG_PROPERTIES.NAME,l.TAG_PROPERTIES.CHARSET,l.TAG_PROPERTIES.HTTPEQUIV,l.TAG_PROPERTIES.PROPERTY,l.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:A(l.TAG_NAMES.NOSCRIPT,[l.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:p(e),scriptTags:A(l.TAG_NAMES.SCRIPT,[l.TAG_PROPERTIES.SRC,l.TAG_PROPERTIES.INNER_HTML],e),styleTags:A(l.TAG_NAMES.STYLE,[l.TAG_PROPERTIES.CSS_TEXT],e),title:T(e),titleAttributes:E(l.ATTRIBUTE_NAMES.TITLE,e)}},m=function(){var e=Date.now();return function(t){var n=Date.now();n-e>16?(e=n,t(n)):setTimeout(function(){m(t)},0)}}(),S=function(e){return clearTimeout(e)},_="undefined"!==typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||m:e.requestAnimationFrame||m,b="undefined"!==typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||S:e.cancelAnimationFrame||S,O=function(e){return console&&"function"===typeof console.warn&&console.warn(e)},g=null,P=function(e){g&&b(g),e.defer?g=_(function(){R(e,function(){g=null})}):(R(e),g=null)},R=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.onChangeClientState,s=e.scriptTags,f=e.styleTags,T=e.title,p=e.titleAttributes;w(l.TAG_NAMES.BODY,r),w(l.TAG_NAMES.HTML,o),M(T,p);var E={baseTag:C(l.TAG_NAMES.BASE,n),linkTags:C(l.TAG_NAMES.LINK,i),metaTags:C(l.TAG_NAMES.META,a),noscriptTags:C(l.TAG_NAMES.NOSCRIPT,c),scriptTags:C(l.TAG_NAMES.SCRIPT,s),styleTags:C(l.TAG_NAMES.STYLE,f)},d={},A={};Object.keys(E).forEach(function(e){var t=E[e],n=t.newTags,r=t.oldTags;n.length&&(d[e]=n),r.length&&(A[e]=E[e].oldTags)}),t&&t(),u(e,d,A)},v=function(e){return Array.isArray(e)?e.join(""):e},M=function(e,t){"undefined"!==typeof e&&document.title!==e&&(document.title=v(e)),w(l.TAG_NAMES.TITLE,t)},w=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(l.HELMET_ATTRIBUTE),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(t),c=0;c<a.length;c++){var u=a[c],s=t[u]||"";n.getAttribute(u)!==s&&n.setAttribute(u,s),-1===o.indexOf(u)&&o.push(u);var f=i.indexOf(u);-1!==f&&i.splice(f,1)}for(var T=i.length-1;T>=0;T--)n.removeAttribute(i[T]);o.length===i.length?n.removeAttribute(l.HELMET_ATTRIBUTE):n.getAttribute(l.HELMET_ATTRIBUTE)!==a.join(",")&&n.setAttribute(l.HELMET_ATTRIBUTE,a.join(","))}},C=function(e,t){var n=document.head||document.querySelector(l.TAG_NAMES.HEAD),r=n.querySelectorAll(e+"["+l.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return t&&t.length&&t.forEach(function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===l.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===l.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c="undefined"===typeof t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute(l.HELMET_ATTRIBUTE,"true"),o.some(function(e,t){return a=t,n.isEqualNode(e)})?o.splice(a,1):i.push(n)}),o.forEach(function(e){return e.parentNode.removeChild(e)}),i.forEach(function(e){return n.appendChild(e)}),{oldTags:o,newTags:i}},I=function(e){return Object.keys(e).reduce(function(t,n){var r="undefined"!==typeof e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},N=function(e,t,n,r){var o=I(n),i=v(t);return o?"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+">"+f(i,r)+"</"+e+">":"<"+e+" "+l.HELMET_ATTRIBUTE+'="true">'+f(i,r)+"</"+e+">"},L=function(e,t,n){return t.reduce(function(t,r){var o=Object.keys(r).filter(function(e){return!(e===l.TAG_PROPERTIES.INNER_HTML||e===l.TAG_PROPERTIES.CSS_TEXT)}).reduce(function(e,t){var o="undefined"===typeof r[t]?t:t+'="'+f(r[t],n)+'"';return e?e+" "+o:o},""),i=r.innerHTML||r.cssText||"",a=-1===l.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+(a?"/>":">"+i+"</"+e+">")},"")},G=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.REACT_TAG_MAP[n]||n]=e[n],t},t)},j=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.HTML_TAG_MAP[n]||n]=e[n],t},t)},H=function(e,t,n){var r,o=(r={key:t},r[l.HELMET_ATTRIBUTE]=!0,r),i=G(n,o);return[c.default.createElement(l.TAG_NAMES.TITLE,i,t)]},k=function(e,t){return t.map(function(t,n){var r,o=(r={key:n},r[l.HELMET_ATTRIBUTE]=!0,r);return Object.keys(t).forEach(function(e){var n=l.REACT_TAG_MAP[e]||e;if(n===l.TAG_PROPERTIES.INNER_HTML||n===l.TAG_PROPERTIES.CSS_TEXT){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]}),c.default.createElement(e,o)})},x=function(e,t,n){switch(e){case l.TAG_NAMES.TITLE:return{toComponent:function(){return H(0,t.title,t.titleAttributes)},toString:function(){return N(e,t.title,t.titleAttributes,n)}};case l.ATTRIBUTE_NAMES.BODY:case l.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return G(t)},toString:function(){return I(t)}};default:return{toComponent:function(){return k(e,t)},toString:function(){return L(e,t,n)}}}},B=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,u=e.scriptTags,s=e.styleTags,f=e.title,T=void 0===f?"":f,p=e.titleAttributes;return{base:x(l.TAG_NAMES.BASE,t,r),bodyAttributes:x(l.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:x(l.ATTRIBUTE_NAMES.HTML,o,r),link:x(l.TAG_NAMES.LINK,i,r),meta:x(l.TAG_NAMES.META,a,r),noscript:x(l.TAG_NAMES.NOSCRIPT,c,r),script:x(l.TAG_NAMES.SCRIPT,u,r),style:x(l.TAG_NAMES.STYLE,s,r),title:x(l.TAG_NAMES.TITLE,{title:T,titleAttributes:p},r)}};t.convertReactPropstoHtmlAttributes=j,t.handleClientStateChange=P,t.mapStateOnServer=B,t.reducePropsToState=h,t.requestAnimationFrame=_,t.warn=O}).call(t,n(1))},281:function(e,t){}});
//# sourceMappingURL=4.c26279f5.chunk.js.map