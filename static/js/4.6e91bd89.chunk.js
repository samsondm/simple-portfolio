(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{133:function(e,t,n){e.exports=n(135)},134:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",function(){return r})},135:function(e,t,n){var r=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,e.exports=n(136),o)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(a){r.regeneratorRuntime=void 0}},136:function(e,t){!function(t){"use strict";var n,r=Object.prototype,o=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag",u="object"===typeof e,l=t.regeneratorRuntime;if(l)u&&(e.exports=l);else{(l=t.regeneratorRuntime=u?e.exports:{}).wrap=w;var f="suspendedStart",m="suspendedYield",h="executing",p="completed",d={},v={};v[a]=function(){return this};var g=Object.getPrototypeOf,y=g&&g(g(j([])));y&&y!==r&&o.call(y,a)&&(v=y);var b=x.prototype=k.prototype=Object.create(v);_.prototype=b.constructor=x,x.constructor=_,x[s]=_.displayName="GeneratorFunction",l.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===_||"GeneratorFunction"===(t.displayName||t.name))},l.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,x):(e.__proto__=x,s in e||(e[s]="GeneratorFunction")),e.prototype=Object.create(b),e},l.awrap=function(e){return{__await:e}},E(N.prototype),N.prototype[c]=function(){return this},l.AsyncIterator=N,l.async=function(e,t,n,r){var o=new N(w(e,t,n,r));return l.isGeneratorFunction(t)?o:o.next().then(function(e){return e.done?e.value:o.next()})},E(b),b[s]="Generator",b[a]=function(){return this},b.toString=function(){return"[object Generator]"},l.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},l.values=j,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(I),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=n)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,o){return c.type="throw",c.arg=e,t.next=r,o&&(t.method="next",t.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var s=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),I(n),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;I(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:j(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=n),d}}}function w(e,t,n,r){var o=t&&t.prototype instanceof k?t:k,i=Object.create(o.prototype),a=new P(r||[]);return i._invoke=function(e,t,n){var r=f;return function(o,i){if(r===h)throw new Error("Generator is already running");if(r===p){if("throw"===o)throw i;return T()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=S(a,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var s=L(e,t,n);if("normal"===s.type){if(r=n.done?p:m,s.arg===d)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=p,n.method="throw",n.arg=s.arg)}}}(e,n,a),i}function L(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(r){return{type:"throw",arg:r}}}function k(){}function _(){}function x(){}function E(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function N(e){var t;this._invoke=function(n,r){function i(){return new Promise(function(t,i){!function t(n,r,i,a){var c=L(e[n],e,r);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"===typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,i,a)},function(e){t("throw",e,i,a)}):Promise.resolve(u).then(function(e){s.value=e,i(s)},function(e){return t("throw",e,i,a)})}a(c.arg)}(n,r,t,i)})}return t=t?t.then(i,i):i()}}function S(e,t){var r=e.iterator[t.method];if(r===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=n,S(e,t),"throw"===t.method))return d;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=L(r,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,d;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=n),t.delegate=null,d):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function I(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function j(e){if(e){var t=e[a];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(o.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=n,t.done=!0,t};return i.next=i}}return{next:T}}function T(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},137:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(s){o=!0,i=s}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",function(){return r})},153:function(e,t,n){},155:function(e,t){e.exports={prefix:"fas",iconName:"arrow-down",icon:[448,512,[],"f063","M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"]}},156:function(e,t){e.exports={prefix:"fas",iconName:"arrow-up",icon:[448,512,[],"f062","M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"]}},157:function(e,t){e.exports={prefix:"fas",iconName:"play",icon:[448,512,[],"f04b","M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"]}},158:function(e,t){e.exports={prefix:"fas",iconName:"pause",icon:[448,512,[],"f04c","M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"]}},159:function(e,t){e.exports={prefix:"fas",iconName:"sync",icon:[512,512,[],"f021","M440.935 12.574l3.966 82.766C399.416 41.904 331.674 8 256 8 134.813 8 33.933 94.924 12.296 209.824 10.908 217.193 16.604 224 24.103 224h49.084c5.57 0 10.377-3.842 11.676-9.259C103.407 137.408 172.931 80 256 80c60.893 0 114.512 30.856 146.104 77.801l-101.53-4.865c-6.845-.328-12.574 5.133-12.574 11.986v47.411c0 6.627 5.373 12 12 12h200.333c6.627 0 12-5.373 12-12V12c0-6.627-5.373-12-12-12h-47.411c-6.853 0-12.315 5.729-11.987 12.574zM256 432c-60.895 0-114.517-30.858-146.109-77.805l101.868 4.871c6.845.327 12.573-5.134 12.573-11.986v-47.412c0-6.627-5.373-12-12-12H12c-6.627 0-12 5.373-12 12V500c0 6.627 5.373 12 12 12h47.385c6.863 0 12.328-5.745 11.985-12.599l-4.129-82.575C112.725 470.166 180.405 504 256 504c121.187 0 222.067-86.924 243.704-201.824 1.388-7.369-4.308-14.176-11.807-14.176h-49.084c-5.57 0-10.377 3.842-11.676 9.259C408.593 374.592 339.069 432 256 432z"]}},173:function(e,t,n){"use strict";n.r(t);var r=n(133),o=n.n(r),i=n(134),a=n(137),c=n(4),s=n(5),u=n(7),l=n(6),f=n(8),m=n(0),h=n.n(m),p=(n(153),n(23)),d=function(e){var t=e.onClick,n=e.icon,r=e.className;return h.a.createElement("div",{className:r,onClick:t},h.a.createElement(p.a,{icon:n}))},v=n(155),g=n.n(v),y=n(156),b=n.n(y),w=function(e){var t=e.time,n=e.onIncrease,r=e.onDecrease,o=e.label;return h.a.createElement("div",{className:"pomodoro-clock__setting"},h.a.createElement("div",{id:o+"-label"},o),h.a.createElement(d,{className:"pomodoro-clock__button "+o+"-decrement",onClick:r,icon:g.a}),h.a.createElement("span",{id:o+"-length"},t),h.a.createElement(d,{className:"pomodoro-clock__button "+o+"-increment",onClick:n,icon:b.a}))},L=function(e){if(e<0)throw new Error("minutes are out of bounds");return 60*e},k=function(e){if(e<0||e>3600)throw new Error("seconds are out of bounds");var t=Math.floor(e/60),n=e%60;return(t<10?"0"+t:t.toString())+":"+(n<10?"0"+n:n.toString())},_=function(e){var t=e.time,n=e.label,r=e.className;return h.a.createElement("div",{className:"timer "+r},h.a.createElement("div",{className:"timer__label"},n),h.a.createElement("div",{className:"timer__time-left"},t))},x=n(157),E=n.n(x),N=n(158),S=n.n(N),O=function(e){var t=e.onStart,n=e.onStop,r=e.isRunning;return h.a.createElement("div",{className:"pomodoro-clock__control"},r?h.a.createElement(d,{className:"pomodoro-clock__button pomodoro-clock__button_start-pause",onClick:n,icon:S.a}):h.a.createElement(d,{className:"pomodoro-clock__button pomodoro-clock__button_start-pause",onClick:t,icon:E.a}))},I=n(1),P=n.n(I),j=h.a.forwardRef(function(e,t){var n=e.src,r=e.id;return h.a.createElement("audio",{ref:t,id:r,src:n})});j.propTypes={src:P.a.string,id:P.a.string},j.defaultProps={src:"http://www.soundjay.com/button/beep-07.wav"};var T=j,R=function(e){var t=e.radius,n=e.strokeColor,r=e.strokeWidth,o=e.progressLeftPercent,i=e.className,a=2*(t+r),c=a/2,s=2*Math.PI*t,u=s*o/100;return h.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",baseProfile:"full",className:"progress-circle "+i,viewBox:"0 0 ".concat(a," ").concat(a),preserveAspectRatio:"xMinYMin",width:"100%",height:"100%"},h.a.createElement("circle",{className:"progress-circle__move",cx:"50%",cy:"50%",r:t,id:"progress-circle",fill:"none",stroke:n,strokeWidth:r,strokeDasharray:"".concat(u," ").concat(s-u),transform:"rotate(-90, ".concat(c,", ").concat(c,")")}))},D=n(159),U=n.n(D),C=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:100)/(1e3*e)},F=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).initInstance=function(e){return n.timeoutID=null,n.rafID=null,n.beep=null,n.beepCount=0,n.hasLabelUpdated=!1,n.timeLeft=L(e.session),n.animationVelocity=C(n.timeLeft),n.timeOfLastUpdate=null,n.pauseTime=null,n.timeTillNextUpdate=1e3,n.isSvgAnimating=!1,{timerLabel:"session",timerFace:k(n.timeLeft),break:e.break,session:e.session,hasStarted:!1,isRunning:!1,animationLeftPercent:100}},n.changeSetting=function(e,t){if(!n.state.hasStarted){var r="increase"===t?[60,1]:[1,-1],o=Object(a.a)(r,2),c=o[0],s=o[1];n.state[e]!==c&&n.setState(function(t){var r;return t.timerLabel===e?(n.timeLeft=L(t[e]+s),n.animationVelocity=C(n.timeLeft),r=k(n.timeLeft)):r=t.timerFace,Object(i.a)({timerFace:r},e,t[e]+s)})}},n.sessionDecrease=function(){return n.changeSetting("session","decrease")},n.sessionIncrease=function(){return n.changeSetting("session","increase")},n.breakDecrease=function(){return n.changeSetting("break","decrease")},n.breakIncrease=function(){return n.changeSetting("break","increase")},n.svgAnimation=function(e,t){if(n._isMounted)if(n.isSvgAnimating){if(!n.timeLeft&&n.hasLabelUpdated){n.hasLabelUpdated=!1;var r=n.state.animationLeftPercent/n.animationVelocity,o=e-t-r;n.setState(function(e){return n.animationVelocity="break"===e.timerLabel?C(L(n.state.break)):C(L(n.state.session)),{animationLeftPercent:100-n.animationVelocity*o}})}else n.setState(function(r){return{animationLeftPercent:r.animationLeftPercent-n.animationVelocity*(e-t)}});n.rafID=window.requestAnimationFrame(function(t){return n.svgAnimation(t,e)})}else n.setState(function(e){return{animationLeftPercent:e.animationLeftPercent-n.animationVelocity*(n.pauseTime-t)}})},n.timerUpdate=function(){if(n._isMounted){var e=performance.now(),t=e-(n.timeOfLastUpdate+n.timeTillNextUpdate);n.timeTillNextUpdate=1e3-t,n.timeOfLastUpdate=e,n.timeLeft=n.timeLeft?n.timeLeft-1:"break"===n.state.timerLabel?L(n.state.break)-1:L(n.state.session)-1,n.timeLeft===n.audioDuration&&n.audio.current.play(),n.timeLeft?n.setState({timerFace:k(n.timeLeft)}):(n.setState(function(e){return{timerLabel:"session"===e.timerLabel?"break":"session",timerFace:k(n.timeLeft)}}),n.hasLabelUpdated=!0),n.timeoutID=setTimeout(n.timerUpdate,n.timeTillNextUpdate)}},n.timerStart=function(){n.state.hasStarted||n.setState({hasStarted:!0}),n.state.isRunning||(n.setState({isRunning:!0}),n.timeOfLastUpdate=performance.now(),n.isSvgAnimating=!0,n.rafID=window.requestAnimationFrame(function(e){return n.svgAnimation(e,n.timeOfLastUpdate)}),n.timeoutID=setTimeout(n.timerUpdate,n.timeTillNextUpdate))},n.timerPause=function(){n.state.isRunning&&(n.pauseTime=performance.now(),n.setState({isRunning:!1}),n.isSvgAnimating=!1,n.timeTillNextUpdate-=n.pauseTime-n.timeOfLastUpdate,n.audio.current.pause(),clearTimeout(n.timeoutID))},n.timerRefresh=function(){clearTimeout(n.timeoutID),cancelAnimationFrame(n.rafID),n.audio.current.pause(),n.audio.current.currentTime=0,null!==n.beep&&n.beep.return(),n.setState(function(e,t){return n.initInstance(t)})},n._isMounted=!1,n.state=n.initInstance(e),n.audio=h.a.createRef(),n.audioDuration=10,n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,clearTimeout(this.timeoutID)}},{key:"beepGen",value:o.a.mark(function e(t,n){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t-- >0)){e.next=5;break}return e.next=3,n();case 3:e.next=0;break;case 5:case"end":return e.stop()}},e,this)})},{key:"render",value:function(){return h.a.createElement("div",{className:"pomodoro-clock"},h.a.createElement("div",{className:"pomodoro-clock__settings"},h.a.createElement(w,{time:this.state.break,onDecrease:this.breakDecrease,onIncrease:this.breakIncrease,label:"break"}),h.a.createElement(d,{className:"pomodoro-clock__button pomodoro-clock__button_reset",onClick:this.timerRefresh,icon:U.a}),h.a.createElement(w,{time:this.state.session,onDecrease:this.sessionDecrease,onIncrease:this.sessionIncrease,label:"session"})),h.a.createElement("div",{className:"pomodoro-clock__timer"},h.a.createElement(_,{className:"pomodoro-clock__timer__digital",time:this.state.timerFace,label:this.state.timerLabel}),h.a.createElement(R,{className:"pomodoro-clock__timer__circle",radius:150,strokeColor:"white",strokeWidth:10,progressLeftPercent:this.state.animationLeftPercent}),h.a.createElement(O,{onStart:this.timerStart,onStop:this.timerPause,isRunning:this.state.isRunning})),h.a.createElement(T,{ref:this.audio,id:"beep",src:"http://freesound.org/data/previews/107/107341_831592-lq.mp3"}))}}]),t}(m.Component);F.defaultProps={session:25,break:5};t.default=F}}]);
//# sourceMappingURL=4.6e91bd89.chunk.js.map