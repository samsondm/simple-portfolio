(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{149:function(e,t,r){},151:function(e,t,r){},170:function(e,t,r){"use strict";r.r(t);var a=r(4),n=r(5),o=r(7),c=r(6),i=r(8),u=r(0),s=r.n(u),d=(r(149),r(131)),m=function(e){var t=e.className,r=e.display;return s.a.createElement("div",{className:t},r)},l=Object(d.b)(function(e){return{display:e.display}},null)(m),p=function(){return{type:"CHANGE_POWER"}},h=(r(151),function(e){var t=e.title,r=e.state,a=e.handleClick;return s.a.createElement("div",{className:"toggle-button"},s.a.createElement("div",{className:"toggle-button__title"},t),s.a.createElement("input",{type:"checkbox",className:"toggle-button__input",id:t,checked:r,onChange:a}),s.a.createElement("label",{className:"toggle-button__label",htmlFor:t}))}),y=Object(d.b)(function(e){return{state:e.power}},function(e){return{handleClick:function(){return e(p())}}})(h),k=function(){return{type:"CHANGE_BANK"}},f=Object(d.b)(function(e){return{state:(t=e.bank,"one"===t)};var t},function(e){return{handleClick:function(){return e(k())}}})(h),v=function(e){var t=e.min,r=void 0===t?0:t,a=e.max,n=void 0===a?100:a,o=e.step,c=void 0===o?1:o,i=e.curr,u=e.showCurr,d=e.changeCurr,m=e.power,l=e.className;return s.a.createElement("div",{className:l},s.a.createElement("input",{type:"range",min:r,max:n,step:c,value:i,onChange:function(e){if(m){var t=e.target.value;d(t),u(t)}}}))},g=function(e){return{type:"CHANGE_VOLUME",volume:e}},C=function(e){return{type:"CHANGE_DISPLAY",display:e}},w=Object(d.b)(function(e){return{curr:e.volume,power:e.power}},function(e){return{changeCurr:function(t){return e(g(t))},showCurr:function(t){return e(C(function(e){return"Volume ".concat(e)}(t)))}}})(v),b=function(e){return s.a.createElement("div",{className:"drum-pad-control"},s.a.createElement(y,{title:"Power"}),s.a.createElement(l,{className:"drum-pad-display"}),s.a.createElement(w,{className:"volume"}),s.a.createElement(f,{title:"Bank"}))},E=function(e){function t(e){var r;return Object(a.a)(this,t),(r=Object(o.a)(this,Object(c.a)(t).call(this,e))).handleClick=function(e){e.preventDefault(),r.props.power&&r.playAudio(r.audio.current)},r.handleKeyUp=function(e){e.keyCode===r.props.keyCode&&(e.preventDefault(),r.isKeyRepeated=!1)},r.handleKeyDown=function(e){!r.props.power||e.keyCode!==r.props.keyCode||e.repeat||r.state.active||r.isKeyRepeated||(e.preventDefault(),r.isKeyRepeated=!0,r.playAudio(r.audio.current))},r.changeActive=function(e){r.setState({active:!1})},r.playAudio=function(e){r.setState({active:!0}),e.volume=r.props.volume,e.play(),r.props.showName(r.props.clipName)},r.state={active:!1,lastUrl:null},r.isKeyRepeated=!1,r.audio=s.a.createRef(),r}return Object(i.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp),this.audio.current.addEventListener("ended",this.changeActive)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp),this.audio.current.removeEventListener("ended",this.changeActive)}},{key:"render",value:function(){var e=this.state.active?" active":"";return s.a.createElement("div",{id:this.props.clipName,className:"drum-pad"+e,onClick:this.handleClick},this.props.keyName,s.a.createElement("audio",{ref:this.audio,className:"clip",id:this.props.keyName,src:this.props.url}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.url!==t.lastUrl?{active:!1,lastUrl:e.url}:null}}]),t}(u.Component),N=Object(d.b)(function(e){return{power:e.power,volume:e.volume/100}},function(e){return{showName:function(t){return e(C(t))}}})(E),_=[{keyCode:81,keyTrigger:"Q",id:"Heater-1",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},{keyCode:87,keyTrigger:"W",id:"Heater-2",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},{keyCode:69,keyTrigger:"E",id:"Heater-3",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},{keyCode:65,keyTrigger:"A",id:"Heater-4",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},{keyCode:83,keyTrigger:"S",id:"Clap",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},{keyCode:68,keyTrigger:"D",id:"Open-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},{keyCode:90,keyTrigger:"Z",id:"Kick-n'-Hat",url:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},{keyCode:88,keyTrigger:"X",id:"Kick",url:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},{keyCode:67,keyTrigger:"C",id:"Closed-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}],H=[{keyCode:81,keyTrigger:"Q",id:"Chord-1",url:"https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"},{keyCode:87,keyTrigger:"W",id:"Chord-2",url:"https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"},{keyCode:69,keyTrigger:"E",id:"Chord-3",url:"https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"},{keyCode:65,keyTrigger:"A",id:"Shaker",url:"https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"},{keyCode:83,keyTrigger:"S",id:"Open-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"},{keyCode:68,keyTrigger:"D",id:"Closed-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"},{keyCode:90,keyTrigger:"Z",id:"Punchy-Kick",url:"https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"},{keyCode:88,keyTrigger:"X",id:"Side-Stick",url:"https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"},{keyCode:67,keyTrigger:"C",id:"Snare",url:"https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"}],O=function(e){var t=("one"===e.bankNumber?_:H).map(function(e){return s.a.createElement(N,{key:e.keyTrigger,keyName:e.keyTrigger,clipName:e.id,url:e.url,keyCode:e.keyCode})});return s.a.createElement("div",{className:"drum-pad-container"},t)},A=Object(d.b)(function(e){return{bankNumber:e.bank}},null)(O),T=r(132),j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_DISPLAY":return t.display;default:return e}},z=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];switch((arguments.length>1?arguments[1]:void 0).type){case"CHANGE_POWER":return!e;default:return e}},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch((arguments.length>1?arguments[1]:void 0).type){case"CHANGE_BANK":return"one"!==e?"one":"two";default:return e}},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_VOLUME":return t.volume;default:return e}},S=Object(T.c)({display:j,power:z,bank:K,volume:D}),L=function(e){function t(){var e,r;Object(a.a)(this,t);for(var n=arguments.length,i=new Array(n),u=0;u<n;u++)i[u]=arguments[u];return(r=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).store=Object(T.d)(S,{display:String.fromCharCode(160),power:!0,bank:"one",volume:30}),r}return Object(i.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){return s.a.createElement(d.a,{store:this.store},s.a.createElement("div",{className:"drum-machine"},s.a.createElement(A,null),s.a.createElement(b,null)))}}]),t}(u.Component);t.default=L}}]);
//# sourceMappingURL=3.77d0aa4f.chunk.js.map