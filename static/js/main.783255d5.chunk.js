(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{109:function(e,t,n){},111:function(e,t,n){},117:function(e,t,n){},119:function(e,t,n){},121:function(e,t,n){},123:function(e,t,n){},125:function(e,t,n){},127:function(e,t,n){},130:function(e,t,n){"use strict";n.r(t);n(71);var i=n(0),o=n.n(i),r=n(64),a=n.n(r),s=(n(107),n(109),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function c(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}var l=n(4),d=n(5),u=n(7),h=n(6),m=n(8),p=n(177),v=n(169),f=(n(111),n(23)),g=n(65),w=n.n(g),E=n(66),b=n.n(E),k=n(67),y=n.n(k),C=(n(117),function(e){var t=e.onClick;return o.a.createElement("section",{className:"welcome min-height-flex-fix"},o.a.createElement("div",{className:"welcome__content"},o.a.createElement("div",{className:"welcome__hi"},"Hi, my name is Dmitry.",o.a.createElement("br",null),"I'm junior frontend developer."),o.a.createElement("div",{className:"welcome__links"},o.a.createElement("a",{title:"Github",href:"https://github.com/samsondm",target:"_blank",rel:"noopener noreferrer"},o.a.createElement(f.a,{icon:w.a,size:"sm",className:"welcome__links__icon"})),o.a.createElement("a",{title:"Codepen",href:"https://codepen.io/samsondm",target:"_blank",rel:"noopener noreferrer"},o.a.createElement(f.a,{icon:b.a,size:"sm",className:"welcome__links__icon"})))),o.a.createElement("div",{className:"welcome__scroll-container"},o.a.createElement(f.a,{icon:y.a,className:"welcome__scroll-icon",onClick:t})))}),S=(n(119),o.a.forwardRef(function(e,t){var n=e.children;return o.a.createElement("section",{className:"projects min-height-flex-fix",ref:t},o.a.createElement("div",null,o.a.createElement("h1",{className:"projects__header"},"Projects"),n))})),T=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(d.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return!e.transitioning}},{key:"render",value:function(){var e=this.props.beenViewed&&this.props.currentSlide===this.props.index&&!this.props.transitioning?o.a.cloneElement(this.props.children,{isViewed:!0}):this.props.children;return o.a.createElement("div",{className:"slide",style:this.props.style,index:this.props.index},e)}}]),t}(i.Component),j=function(e){var t=e.beenViewed,n=e.transitioning,r=e.currentSlide,a=e.children,s=e.slideWidth,c=e.style,l=e.onTransitionEnd,d=e.onClick,u=e.handleGesture,h=i.Children.count(a),m={width:s};return o.a.createElement("div",Object.assign({className:"track",style:c,onClickCapture:d,onTransitionEnd:l},u),o.a.createElement(T,{key:"clone-last",style:m,index:-1},o.a.cloneElement(a[h-1])),i.Children.map(a,function(e,i){return o.a.createElement(T,{key:"slide-"+i,style:m,index:i,children:e,currentSlide:r,transitioning:n,beenViewed:t})}),o.a.createElement(T,{key:"clone-first",style:m,index:h},o.a.cloneElement(a[0])))},_=function(e){var t=e.children;return o.a.createElement("div",{className:"slider"},t)},M=n(63),P=function(e){var t=e.currentSlide,n=e.slideCount,i=e.onClick;return o.a.createElement("div",{className:"dots"},Object(M.a)(Array(n)).map(function(e,n){return n===t?o.a.createElement("div",{key:n,index:n,className:"dots__dot dots__dot_active"}):o.a.createElement("div",{key:n,index:n,className:"dots__dot",onClickCapture:i})}))},G=function(e){var t,n=e.direction,i=e.onClickCapture;switch(n){case"left":t=0;break;case"right":t=180;break;case"top":t=90;break;case"bottom":t=270}var r={display:"block",lineHeight:0,transform:"rotate(".concat(t,"deg)"),WebkitTransform:"rotate(".concat(t,"deg)"),msTransform:"rotate(".concat(t,"deg)")};return o.a.createElement("div",{style:r},o.a.createElement("i",{className:"icon-arrow",onClickCapture:i}))},O=(n(121),n(68)),x=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.bubbles,o=void 0!==i&&i,r=n.cancelable,a=void 0!==r&&r,s=n.view,c=void 0===s?null:s,l=n.detail,d=void 0===l?0:l,u=n.screenX,h=void 0===u?0:u,m=n.screenY,p=void 0===m?0:m,v=n.clientX,f=void 0===v?0:v,g=n.clientY,w=void 0===g?0:g,E=n.ctrlKey,b=void 0!==E&&E,k=n.altKey,y=void 0!==k&&k,C=n.shiftKey,S=void 0!==C&&C,T=n.metaKey,j=void 0!==T&&T,_=n.button,M=void 0===_?0:_,P=n.relatedTarget,G=void 0===P?null:P,O=n.offsetXArg,x=void 0===O?0:O,D=n.offsetY,N=void 0===D?0:D,H=n.width,R=void 0===H?1:H,W=n.height,L=void 0===W?1:W,A=n.pressure,z=void 0===A?0:A,B=n.twist,V=void 0===B?0:B,X=n.tiltX,I=void 0===X?0:X,U=n.tiltY,Y=void 0===U?0:U,q=n.pointerId,K=void 0===q?0:q,F=n.pointerType,J=void 0===F?"":F,Q=n.timeStamp,$=void 0===Q?0:Q,Z=n.isPrimary,ee=void 0!==Z&&Z;return"function"===typeof window.PointerEvent?t=new window.PointerEvent(e,n):(t=window.MSPointerEvent?document.createEvent("MSPointerEvent"):document.createEvent("PointerEvent")).initPointerEvent(e,o,a,c,d,h,p,f,w,b,y,S,j,M,G,x,N,R,L,z,V,I,Y,K,J,$,ee),t},D=function(e,t){var n=null;var i=function(e,t){var n=!1;return function(){n||(n=!0,e(),setTimeout(function(){n=!1},t))}}(function(){if("none"===window.getComputedStyle(n).display)return!1;var i=document.scrollingElement||document.documentElement,o=n.getBoundingClientRect(),r=o.height,a=Math.max(o.top,0),s=Math.min(o.bottom,i.clientHeight),c=(s-a)/r*100;if(c<t)return!1;for(var l=n;l!==i&&null!==(l=l.parentNode);){var d=window.getComputedStyle(l);if("none"===d.display)return!1;if(!(l.clientHeight<=l.scrollHeight||l===i||"visible"===d.overflow)&&(a=Math.max(a,l.top),s=Math.min(s,l.bottom),(c=(s-a)/r*100)<t))return!1}return e(),!0},100);return Object.freeze({observe:function(e){n=e,window.addEventListener("resize",i,!0),document.addEventListener("scroll",i,!0)},disconnect:function(){n=null,window.removeEventListener("resize",i,!0),document.removeEventListener("scroll",i,!0)}})},N=function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a))))._isMounted=!1,n.isPointerSupported=Boolean(window.PointerEvent),n.carousel=o.a.createRef(),n.carouseResizeObserver=null,n.activeClone="none",n.pointerDown=!1,n.pointerDownCoord=null,n.sliding=!1,n.scrolling=!1,n.animating=!1,n.transitionTime=500,n.state={beenViewed:!1,transitioning:!1,currentSlide:0,slideCount:0,slideWidth:0,slideHeight:0,trackStyle:{}},n.initCarousel=function(){var e=n.carousel.current.getBoundingClientRect(),t=Math.round(100*e.width)/100,o=e.height,r=i.Children.count(n.props.children),a="translateX(".concat(-(1+n.state.currentSlide)*t,"px)");n.setState({slideCount:r,slideWidth:t,slideHeight:o,trackStyle:{transition:"",WebkitTransition:"",width:(2+r)*t,transform:a,WebkitTransform:a,msTransform:a}})},n.carouselBeenViewed=function(){n._isMounted&&!n.beenViewed&&(n.setState({beenViewed:!0}),n.carouselViewObserver.disconnect(),n.carouselViewObserver=null)},n.handleArrowClick=function(e){if(!n.state.transitioning&&!n.pointerDown){var t="left"===e?-1:1;n.changeSlide(t)}},n.handleDotClick=function(e){if(!n.state.transitioning){var t=+e.currentTarget.getAttribute("index")-n.state.currentSlide;n.changeSlide(t)}},n.changeSlide=function(e){n.setState(function(t){var i;t.currentSlide===t.slideCount-1&&1===e?(i=0,n.activeClone="right"):0===t.currentSlide&&-1===e?(i=t.slideCount-1,n.activeClone="left"):i=t.currentSlide+e;var o="translateX(".concat(-(1+t.currentSlide+e)*t.slideWidth,"px)");return{transitioning:!0,currentSlide:i,trackStyle:{transition:"transform ".concat(n.transitionTime,"ms ease"),WebkitTransition:"-webkit-transform ".concat(n.transitionTime,"ms ease"),width:t.trackStyle.width,transform:o,WebkitTransform:o,msTransform:o}}})},n.handleTransitionEnd=function(e){n._isMounted&&n.setState(function(e){var t="none"===n.activeClone?e.trackStyle.transform:"left"===n.activeClone?"translateX(".concat(-e.slideCount*e.slideWidth,"px)"):"translateX(".concat(-e.slideWidth,"px)");return n.activeClone="none",{transitioning:!1,trackStyle:{transition:"",WebkitTransition:"",width:e.trackStyle.width,transform:t,WebkitTransform:t,msTransform:t}}})},n.getPointerCoord=function(e){return e.changedTouches?{x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}:{x:e.clientX,y:e.clientY}},n.pointerMoveAnimation=function(e){if(n._isMounted&&n.animating){var t="translateX(".concat(-(1+n.state.currentSlide)*n.state.slideWidth+e,"px)");n.setState({trackStyle:{transition:"",WebkitTransition:"",width:n.state.trackStyle.width,transform:t,WebkitTransform:t,msTransform:t}}),n.animating=!1}},n.handleGestureStart=function(e){n.state.transitioning?e.stopPropagation():e.touches&&e.touches.length>1||(n.isPointerSupported?(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId)):(document.addEventListener("mousemove",n.handleGestureMove,!0),document.addEventListener("mouseup",n.handleGestureEnd,!0)),n.pointerDown=!0,n.pointerDownCoord=n.getPointerCoord(e))},n.handleGestureMove=function(e){if(n.pointerDownCoord&&!n.scrolling&&n.pointerDown){var t=n.getPointerCoord(e),i=t.x-n.pointerDownCoord.x,o=t.y-n.pointerDownCoord.y;if(!n.sliding&&Math.abs(o/n.state.slideHeight)>.01&&Math.abs(i/n.state.slideWidth)<.1)n.scrolling=!0;else if(n.sliding||Math.abs(i/n.state.slideWidth)>.01){if(e.preventDefault(),n.sliding=!0,(e.touches||e.pointerType)&&Math.abs(i)>.9*n.state.slideWidth){var r={bubbles:!0,cancelable:!0,composed:!0,pointerId:e.pointerId,pointerType:e.pointerType,clientX:e.clientX,clientY:e.clientY},a=x("pointercancel",r);return void e.currentTarget.dispatchEvent(a)}if(!n.animating){if(0===i)return;n.animating=!0,window.requestAnimationFrame(function(){return n.pointerMoveAnimation(i)})}}}},n.handleGestureEnd=function(e){if(n.pointerDown){if(n.scrolling||e.preventDefault(),!(e.touches&&e.touches.length>0)){if(n.pointerDown=!1,n.animating=!1,n.sliding=!1,n.scrolling)n.scrolling=!1;else{var t=(n.state.trackStyle.transform.match(/-?\d+(?:\.\d+)?/)[0]- -(1+n.state.currentSlide)*n.state.slideWidth)/n.state.slideWidth;0!==t&&(Math.abs(t)<.2?n.changeSlide(0):t>0?n.changeSlide(-1):n.changeSlide(1))}n.isPointerSupported?e.currentTarget.releasePointerCapture(e.pointerId):(document.removeEventListener("mousemove",n.handleGestureMove,!0),document.removeEventListener("mouseup",n.handleGestureEnd,!0)),n.pointerDownCoord=null}}else e.stopPropagation()},n.handleGesture=n.isPointerSupported?{onPointerDownCapture:n.handleGestureStart,onPointerMoveCapture:n.handleGestureMove,onPointerUpCapture:n.handleGestureEnd,onPointerCancelCapture:n.handleGestureEnd}:{onMouseDownCapture:n.handleGestureStart,onTouchStartCapture:n.handleGestureStart,onTouchMoveCapture:n.handleGestureMove,onTouchEndCapture:n.handleGestureEnd},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.initCarousel(),this.carouselViewObserver=D(this.carouselBeenViewed,30),this.carouselViewObserver.observe(this.carousel.current),window.addEventListener("resize",this.initCarousel),this.carouseResizeObserver=new O.a(this.initCarousel),this.carouseResizeObserver.observe(this.carousel.current)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,window.removeEventListener("resize",this.initCarousel),this.carouseResizeObserver.disconnect()}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{ref:this.carousel,className:"carousel-wrapper"},o.a.createElement("div",{className:"arrow slide-prev"},o.a.createElement(G,{direction:"left",onClickCapture:function(){return e.handleArrowClick("left")}})),o.a.createElement(_,null,o.a.createElement(j,{beenViewed:this.state.beenViewed,transitioning:this.state.transitioning,currentSlide:this.state.currentSlide,style:this.state.trackStyle,slideWidth:this.state.slideWidth,onTransitionEnd:this.handleTransitionEnd,handleGesture:this.handleGesture,children:this.props.children})),o.a.createElement("div",{className:"arrow slide-next"},o.a.createElement(G,{direction:"right",onClickCapture:function(){return e.handleArrowClick("right")}})),o.a.createElement(P,{slideCount:this.state.slideCount,currentSlide:this.state.currentSlide,onClick:this.handleDotClick}))}}]),t}(i.Component),H=(n(123),function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).scrollingElement=document.scrollingElement||document.documentElement,n.scrollPosition=0,n.handleClick=function(e){e.stopPropagation(),document.title="Portfolio",n.props.history.push("/")},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.scrollPosition=this.scrollingElement.scrollTop,this.scrollingElement.style.overflow="hidden",this.scrollingElement.style.width="100%",this.scrollingElement.style.position="fixed",this.scrollingElement.style.top=-this.scrollPosition+"px"}},{key:"componentWillUnmount",value:function(){this.scrollingElement.style.overflow="",this.scrollingElement.style.width="",this.scrollingElement.style.position="",this.scrollingElement.style.top="",this.scrollingElement.scrollTop=this.scrollPosition}},{key:"render",value:function(){return o.a.createElement("div",{className:"layer",onClick:this.handleClick},o.a.createElement("div",{className:"layer__scroll-container"},this.props.children))}}]),t}(i.Component)),R=n(57),W=n.n(R),L=n(58),A=n.n(L),z=n(59),B=n.n(z),V=n(60),X=n.n(V),I=n(61),U=n.n(I),Y=(n(125),function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={style:{background:""}},n.changeBackground=function(e){n.setState({style:{background:e}})},n.handleClick=function(e){return e.stopPropagation()},n.handleBackClick=function(e){e.stopPropagation(),document.title="Portfolio",n.props.history.push("/")},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){document.title=this.props.title}},{key:"render",value:function(){return o.a.createElement("div",{className:"project-wrapper min-height-flex-fix "+this.props.className,style:this.state.style,onClick:this.handleClick},o.a.createElement("div",{className:"project-wrapper__back-container"},o.a.createElement("div",{className:"project-wrapper__back",onClick:this.handleBackClick})),this.props.render({changeBackground:this.changeBackground}))}}]),t}(i.Component)),q=function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];for(var t=document.scrollingElement||document.documentElement,n=[],i=e,o=e,r=0;i!==t&&null!==(i=i.parentNode);)if(!(i.scrollHeight<=i.clientHeight)||t===i&&t===document.body){var a=i.getBoundingClientRect().top,s=i.clientTop,c=o.getBoundingClientRect().top,l=i===t?c+r:c-(a+s)+r,d=i.scrollHeight-(i.scrollTop+i.clientHeight);n.push({node:i,initScrollPosition:i.scrollTop,scrollDistance:l}),r=d<l?l-d:0,o=i}var u=performance.now();window.requestAnimationFrame(function e(t){var i=(t-u)/500;n.forEach(function(e){var t,n=(t=i)*(2-t)*e.scrollDistance;e.node.scrollTop=i<1?e.initScrollPosition+n:e.initScrollPosition+e.scrollDistance}),i<1&&window.requestAnimationFrame(e)})},K=(n(127),n(176)),F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.x,n=e.y,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=i.x,r=i.y;return void 0!==t&&void 0!==n&&void 0!==o&&void 0!==r?Math.sqrt(Math.pow(o-t,2)+Math.pow(r-n,2)):null},J=function(e){return e.touches&&e.changedTouches[0]?{x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY}:{x:e.pageX,y:e.pageY}},Q=function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={isHovered:!1},n.dragTriggerDelta=3,n.hasGestureStarted=!1,n.hasDragged=!1,n.isPointerSupported=window.PointerEvent,n.linkRef=o.a.createRef(),n.handleMouseLeave=function(e){n.setState({isHovered:!1})},n.handleTransitionEnd=function(e){return e.stopPropagation()},n.handleGestureStart=function(e){n.hasGestureStarted||(n.hasGestureStarted=!0,n.startGestureCoord=J(e),n.isPointerSupported&&(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId)),n.setState({isHovered:!0}))},n.handleGestureMove=function(e){if(n.hasGestureStarted&&n.state.isHovered){if(n.currGestureCoord=J(e),F(n.startGestureCoord,n.currGestureCoord)<=n.dragTriggerDelta)return;n.setState({isHovered:!1}),n.hasDragged=!0}else n.hasGestureStarted||n.state.isHovered||n.setState({isHovered:!0})},n.handleGestureEnd=function(e){n.hasGestureStarted&&(n.isPointerSupported&&(e.preventDefault(),e.currentTarget.releasePointerCapture(e.pointerId)),n.hasGestureStarted=!1,n.hasDragged?n.hasDragged=!1:(n.setState({isHovered:!1}),"pointercancel"!==e.type&&window.setTimeout(function(){return n.props.history.push("/"+n.props.link)},50)))},n.handleGesture=n.isPointerSupported?{onPointerDown:n.handleGestureStart,onPointerMove:n.handleGestureMove,onPointerUp:n.handleGestureEnd,onPointerCancel:n.handleGestureEnd}:{onMouseDown:n.handleGestureStart,onMouseMove:n.handleGestureMove,onMouseUp:n.handleGestureEnd,onTouchMove:n.handleGestureMove,onTouchEnd:n.handleGestureEnd},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.isPointerSupported||this.linkRef.current.addEventListener("touchstart",this.handleGestureStart)}},{key:"render",value:function(){var e=this.props,t=e.imgUrl,n=e.title,i=e.stack,r=e.description,a=e.isViewed,s={backgroundImage:"url(".concat(t,")")},c="project-slide__link semi-transparent-bg "+(this.state.isHovered?"semi-transparent-bg_hover":""),l="project-slide__description semi-transparent-bg "+(a?"project-slide__description_viewed":""),d="project-slide__stack semi-transparent-bg "+(a?"project-slide__stack_viewed":"");return o.a.createElement("div",{className:"project-slide aspect-ratio-wrapper"},o.a.createElement("div",{className:"project-slide__background",style:s}),o.a.createElement("div",{className:"project-slide__content",onTransitionEnd:this.handleTransitionEnd},o.a.createElement("div",{className:"project-slide__title semi-transparent-bg "},n),o.a.createElement("div",{className:l},r),o.a.createElement("div",{className:d},i),o.a.createElement("div",Object.assign({className:c,ref:this.linkRef},this.handleGesture,{onMouseLeave:this.handleMouseLeave}),"EXPLORE")))}}]),t}(o.a.Component),$=Object(K.a)(Q),Z=o.a.lazy(function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,171))}),ee=o.a.lazy(function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,170))}),te=o.a.lazy(function(){return n.e(4).then(n.bind(null,173))}),ne=o.a.lazy(function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,174))}),ie=o.a.lazy(function(){return n.e(6).then(n.bind(null,175))}),oe=function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).componentsMap={"random-quote-machine":{component:ne,title:"Random Quote Machine",image:X.a,description:"Get random quotes about design.",stack:"React, Redux, Redux-Thunk, REST API"},"drum-machine":{component:ee,title:"Drum Machine",image:A.a,description:"Drop some beats.",stack:"React, Redux, SASS"},calc:{component:Z,title:"Calculator",image:W.a,description:"Simple javascript calculator.",stack:"React, Redux, Redux-Thunk"},"pomodoro-clock":{component:te,title:"Pomodoro Clock",image:B.a,description:"Use the Pomodoro Technique to help you increase your focus.",stack:"React, SASS"},"weather-app":{component:ie,title:"Weather App",image:U.a,description:"Check weather in your current location or in other cities.",stack:"React, SASS, REST API"}},n.projectsRef=o.a.createRef(),n.scrollToProjects=function(){q(n.projectsRef.current)},n.container=document.body,n.hasHoverClass=!1,n.lastTouchTime=0,n.enableHover=function(e){if(!n.hasHoverClass){"touchstart"!==e.type&&performance.now()-n.lastTouchTime<650||(n.container.classList.add("hasHover"),n.hasHoverClass=!0)}},n.disableHover=function(e){n.hasHoverClass&&(n.container.classList.remove("hasHover"),n.hasHoverClass=!1)},n.updateLastTouchTime=function(){n.lastTouchTime=performance.now()},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("touchend",this.updateLastTouchTime,!0),document.addEventListener("touchend",this.disableHover,!0),document.addEventListener("touchstart",this.enableHover,!0),document.addEventListener("mousemove",this.enableHover,!0)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("touchend",this.updateLastTouchTime,!0),document.removeEventListener("touchend",this.disableHover,!0),document.removeEventListener("touchstart",this.enableHover,!0),document.removeEventListener("mousemove",this.enableHover,!0),this.disableHover()}},{key:"render",value:function(){var e=this,t=Object.keys(this.componentsMap).map(function(t){return o.a.createElement($,{imgUrl:e.componentsMap[t].image,title:e.componentsMap[t].title,description:e.componentsMap[t].description,stack:e.componentsMap[t].stack,key:t,link:t})});return o.a.createElement("div",{className:"App"},o.a.createElement(C,{onClick:this.scrollToProjects}),o.a.createElement(S,{ref:this.projectsRef},o.a.createElement(N,null,t)),o.a.createElement(p.a,null,o.a.createElement(v.a,{path:"/layer",component:H}),o.a.createElement(v.a,{path:"/:project",render:function(t){var n=t.history,r=t.match.params.project,a=e.componentsMap[r].component,s=e.componentsMap[r].title;return o.a.createElement(H,{history:n},o.a.createElement(Y,{title:s,className:"".concat(r,"-wrapper"),history:n,render:function(e){var t=e.changeBackground;return o.a.createElement(i.Suspense,{fallback:null},o.a.createElement(a,{changeBackground:t}))}}))}})))}}]),t}(i.Component),re=n(172);a.a.render(o.a.createElement(re.a,null,o.a.createElement(oe,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/simple-portfolio",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/simple-portfolio","/service-worker.js");s?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):c(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):c(e)})}}()},57:function(e,t,n){e.exports=n.p+"static/media/calc.b0c0716f.png"},58:function(e,t,n){e.exports=n.p+"static/media/drum-machine.b0706d73.png"},59:function(e,t,n){e.exports=n.p+"static/media/pomodoro-clock.7e933802.png"},60:function(e,t,n){e.exports=n.p+"static/media/random-quote-machine.a66cf96c.png"},61:function(e,t,n){e.exports=n.p+"static/media/weather-app.42d2c6ff.png"},70:function(e,t,n){e.exports=n(130)}},[[70,8,7]]]);
//# sourceMappingURL=main.783255d5.chunk.js.map