(()=>{"use strict";const{history:r,addEventListener:e,removeEventListener:t}=window,o=()=>new URLSearchParams(document.location.search),n=function(r,e){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(!Array.isArray(e)&&"string"!==typeof e)return!1;if(!Array.isArray(e))return n(r,[e],t);if(!t||!t.getAll)return n(r,e,o());for(let o of t.getAll(r))if(o&&"string"===typeof o)for(let r of e)if(o.toLowerCase()===r.toLowerCase())return!0;return!1},i=r=>r.replace(/https?:\/\//,"").replace(/\/+$/,"").toLowerCase(),a=(r,e)=>{if(!Array.isArray(r)&&"string"!==typeof r)return!1;if(!Array.isArray(r))return a([r],e);if("string"!==typeof e)return a(r,document.referrer);for(let t of r)if(i(e)===i(t))return!0;return!1},s=r=>{const{referrers:e,utmSources:t,callback:o}=r;(n("utm_source",t)||a(e))&&o(r)},f=o=>{let{url:n}=o;n&&((o,n)=>{const i=window.location.href,a=r=>{let{target:e}=r;return setTimeout((()=>{e.location.href===n&&e.location.reload(),t("popstate",a)}))};r.replaceState(o,"",n),r.pushState({},"",i),e("popstate",a)})({},n)};window.addEventListener("load",(()=>{const r=Object.assign({referrers:[],utmSources:[]},window.BYG||{});"function"!==typeof r.trigger?r.url&&("function"!==typeof r.trigger&&(r.trigger=s),"function"!==typeof r.callback&&(r.callback=f),r.trigger(r)):r.trigger(r)}))})();