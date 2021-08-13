window.protonLibraries=window.protonLibraries||{},window.protonLibraries["signature-library"]=window.protonLibraries["signature-library"]||{},window.protonLibraries["signature-library"]["1.0.1"]=function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports=window.React},function(t,e){t.exports=window.ReactNative},function(t,e,n){"use strict";n.r(e),n.d(e,"components",(function(){return C})),n.d(e,"config",(function(){return E}));var o=n(0),i=n.n(o),r=n(1);
/*!
 * Signature Pad v2.3.2
 * https://github.com/szimek/signature_pad
 *
 * Copyright 2017 Szymon Nowak
 * Released under the MIT license
 *
 * The main idea and some parts of the code (e.g. drawing variable width Bézier curve) are taken from:
 * http://corner.squareup.com/2012/07/smoother-signatures.html
 *
 * Implementation of interpolation using cubic Bézier curves is taken from:
 * http://benknowscode.wordpress.com/2012/09/14/path-interpolation-using-cubic-bezier-and-control-point-estimation-in-javascript
 *
 * Algorithm for approximated length of a Bézier curve is taken from:
 * http://www.lemoda.net/maths/bezier-length/index.html
 *
 */
function a(t,e,n){this.x=t,this.y=e,this.time=n||(new Date).getTime()}function s(t,e,n,o){this.startPoint=t,this.control1=e,this.control2=n,this.endPoint=o}function u(t,e){var n=this,o=e||{};this.velocityFilterWeight=o.velocityFilterWeight||.7,this.minWidth=o.minWidth||.5,this.maxWidth=o.maxWidth||2.5,this.throttle="throttle"in o?o.throttle:16,this.minDistance="minDistance"in o?o.minDistance:5,this.throttle?this._strokeMoveUpdate=function(t,e,n){var o,i,r,a=null,s=0;n||(n={});var u=function(){s=!1===n.leading?0:Date.now(),a=null,r=t.apply(o,i),a||(o=i=null)};return function(){var c=Date.now();s||!1!==n.leading||(s=c);var h=e-(c-s);return o=this,i=arguments,h<=0||h>e?(a&&(clearTimeout(a),a=null),s=c,r=t.apply(o,i),a||(o=i=null)):a||!1===n.trailing||(a=setTimeout(u,h)),r}}(u.prototype._strokeUpdate,this.throttle):this._strokeMoveUpdate=u.prototype._strokeUpdate,this.dotSize=o.dotSize||function(){return(this.minWidth+this.maxWidth)/2},this.penColor=o.penColor||"black",this.backgroundColor=o.backgroundColor||"rgba(0,0,0,0)",this.onBegin=o.onBegin,this.onEnd=o.onEnd,this._canvas=t,this._ctx=t.getContext("2d"),this.clear(),this._handleMouseDown=function(t){1===t.which&&(n._mouseButtonDown=!0,n._strokeBegin(t))},this._handleMouseMove=function(t){n._mouseButtonDown&&n._strokeMoveUpdate(t)},this._handleMouseUp=function(t){1===t.which&&n._mouseButtonDown&&(n._mouseButtonDown=!1,n._strokeEnd(t))},this._handleTouchStart=function(t){if(1===t.targetTouches.length){var e=t.changedTouches[0];n._strokeBegin(e)}},this._handleTouchMove=function(t){t.preventDefault();var e=t.targetTouches[0];n._strokeMoveUpdate(e)},this._handleTouchEnd=function(t){t.target===n._canvas&&(t.preventDefault(),n._strokeEnd(t))},this.on()}a.prototype.velocityFrom=function(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):1},a.prototype.distanceTo=function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))},a.prototype.equals=function(t){return this.x===t.x&&this.y===t.y&&this.time===t.time},s.prototype.length=function(){for(var t=0,e=void 0,n=void 0,o=0;o<=10;o+=1){var i=o/10,r=this._point(i,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),a=this._point(i,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(o>0){var s=r-e,u=a-n;t+=Math.sqrt(s*s+u*u)}e=r,n=a}return t},s.prototype._point=function(t,e,n,o,i){return e*(1-t)*(1-t)*(1-t)+3*n*(1-t)*(1-t)*t+3*o*(1-t)*t*t+i*t*t*t},u.prototype.clear=function(){var t=this._ctx,e=this._canvas;t.fillStyle=this.backgroundColor,t.clearRect(0,0,e.width,e.height),t.fillRect(0,0,e.width,e.height),this._data=[],this._reset(),this._isEmpty=!0},u.prototype.fromDataURL=function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=new Image,i=n.ratio||window.devicePixelRatio||1,r=n.width||this._canvas.width/i,a=n.height||this._canvas.height/i;this._reset(),o.src=t,o.onload=function(){e._ctx.drawImage(o,0,0,r,a)},this._isEmpty=!1},u.prototype.toDataURL=function(t){var e;switch(t){case"image/svg+xml":return this._toSVG();default:for(var n=arguments.length,o=Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return(e=this._canvas).toDataURL.apply(e,[t].concat(o))}},u.prototype.on=function(){this._handleMouseEvents(),this._handleTouchEvents()},u.prototype.off=function(){this._canvas.removeEventListener("mousedown",this._handleMouseDown),this._canvas.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp),this._canvas.removeEventListener("touchstart",this._handleTouchStart),this._canvas.removeEventListener("touchmove",this._handleTouchMove),this._canvas.removeEventListener("touchend",this._handleTouchEnd)},u.prototype.isEmpty=function(){return this._isEmpty},u.prototype._strokeBegin=function(t){this._data.push([]),this._reset(),this._strokeUpdate(t),"function"==typeof this.onBegin&&this.onBegin(t)},u.prototype._strokeUpdate=function(t){var e=t.clientX,n=t.clientY,o=this._createPoint(e,n),i=this._data[this._data.length-1],r=i&&i[i.length-1],a=r&&o.distanceTo(r)<this.minDistance;if(!r||!a){var s=this._addPoint(o),u=s.curve,c=s.widths;u&&c&&this._drawCurve(u,c.start,c.end),this._data[this._data.length-1].push({x:o.x,y:o.y,time:o.time,color:this.penColor})}},u.prototype._strokeEnd=function(t){var e=this.points.length>2,n=this.points[0];if(!e&&n&&this._drawDot(n),n){var o=this._data[this._data.length-1],i=o[o.length-1];n.equals(i)||o.push({x:n.x,y:n.y,time:n.time,color:this.penColor})}"function"==typeof this.onEnd&&this.onEnd(t)},u.prototype._handleMouseEvents=function(){this._mouseButtonDown=!1,this._canvas.addEventListener("mousedown",this._handleMouseDown),this._canvas.addEventListener("mousemove",this._handleMouseMove),document.addEventListener("mouseup",this._handleMouseUp)},u.prototype._handleTouchEvents=function(){this._canvas.style.msTouchAction="none",this._canvas.style.touchAction="none",this._canvas.addEventListener("touchstart",this._handleTouchStart),this._canvas.addEventListener("touchmove",this._handleTouchMove),this._canvas.addEventListener("touchend",this._handleTouchEnd)},u.prototype._reset=function(){this.points=[],this._lastVelocity=0,this._lastWidth=(this.minWidth+this.maxWidth)/2,this._ctx.fillStyle=this.penColor},u.prototype._createPoint=function(t,e,n){var o=this._canvas.getBoundingClientRect();return new a(t-o.left,e-o.top,n||(new Date).getTime())},u.prototype._addPoint=function(t){var e=this.points;if(e.push(t),e.length>2){3===e.length&&e.unshift(e[0]);var n=this._calculateCurveControlPoints(e[0],e[1],e[2]).c2,o=this._calculateCurveControlPoints(e[1],e[2],e[3]).c1,i=new s(e[1],n,o,e[2]),r=this._calculateCurveWidths(i);return e.shift(),{curve:i,widths:r}}return{}},u.prototype._calculateCurveControlPoints=function(t,e,n){var o=t.x-e.x,i=t.y-e.y,r=e.x-n.x,s=e.y-n.y,u=(t.x+e.x)/2,c=(t.y+e.y)/2,h=(e.x+n.x)/2,l=(e.y+n.y)/2,d=Math.sqrt(o*o+i*i),p=Math.sqrt(r*r+s*s),f=p/(d+p),y=h+(u-h)*f,v=l+(c-l)*f,_=e.x-y,g=e.y-v;return{c1:new a(u+_,c+g),c2:new a(h+_,l+g)}},u.prototype._calculateCurveWidths=function(t){var e=t.startPoint,n=t.endPoint,o={start:null,end:null},i=this.velocityFilterWeight*n.velocityFrom(e)+(1-this.velocityFilterWeight)*this._lastVelocity,r=this._strokeWidth(i);return o.start=this._lastWidth,o.end=r,this._lastVelocity=i,this._lastWidth=r,o},u.prototype._strokeWidth=function(t){return Math.max(this.maxWidth/(t+1),this.minWidth)},u.prototype._drawPoint=function(t,e,n){var o=this._ctx;o.moveTo(t,e),o.arc(t,e,n,0,2*Math.PI,!1),this._isEmpty=!1},u.prototype._drawCurve=function(t,e,n){var o=this._ctx,i=n-e,r=Math.floor(t.length());o.beginPath();for(var a=0;a<r;a+=1){var s=a/r,u=s*s,c=u*s,h=1-s,l=h*h,d=l*h,p=d*t.startPoint.x;p+=3*l*s*t.control1.x,p+=3*h*u*t.control2.x,p+=c*t.endPoint.x;var f=d*t.startPoint.y;f+=3*l*s*t.control1.y,f+=3*h*u*t.control2.y,f+=c*t.endPoint.y;var y=e+c*i;this._drawPoint(p,f,y)}o.closePath(),o.fill()},u.prototype._drawDot=function(t){var e=this._ctx,n="function"==typeof this.dotSize?this.dotSize():this.dotSize;e.beginPath(),this._drawPoint(t.x,t.y,n),e.closePath(),e.fill()},u.prototype._fromData=function(t,e,n){for(var o=0;o<t.length;o+=1){var i=t[o];if(i.length>1)for(var r=0;r<i.length;r+=1){var s=i[r],u=new a(s.x,s.y,s.time),c=s.color;if(0===r)this.penColor=c,this._reset(),this._addPoint(u);else if(r!==i.length-1){var h=this._addPoint(u),l=h.curve,d=h.widths;l&&d&&e(l,d,c)}}else this._reset(),n(i[0])}},u.prototype._toSVG=function(){var t=this,e=this._data,n=this._canvas,o=Math.max(window.devicePixelRatio||1,1),i=n.width/o,r=n.height/o,a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttributeNS(null,"width",n.width),a.setAttributeNS(null,"height",n.height),this._fromData(e,(function(t,e,n){var o=document.createElement("path");if(!(isNaN(t.control1.x)||isNaN(t.control1.y)||isNaN(t.control2.x)||isNaN(t.control2.y))){var i="M "+t.startPoint.x.toFixed(3)+","+t.startPoint.y.toFixed(3)+" C "+t.control1.x.toFixed(3)+","+t.control1.y.toFixed(3)+" "+t.control2.x.toFixed(3)+","+t.control2.y.toFixed(3)+" "+t.endPoint.x.toFixed(3)+","+t.endPoint.y.toFixed(3);o.setAttribute("d",i),o.setAttribute("stroke-width",(2.25*e.end).toFixed(3)),o.setAttribute("stroke",n),o.setAttribute("fill","none"),o.setAttribute("stroke-linecap","round"),a.appendChild(o)}}),(function(e){var n=document.createElement("circle"),o="function"==typeof t.dotSize?t.dotSize():t.dotSize;n.setAttribute("r",o),n.setAttribute("cx",e.x),n.setAttribute("cy",e.y),n.setAttribute("fill",e.color),a.appendChild(n)}));var s='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 '+i+" "+r+'" width="'+i+'" height="'+r+'">',u=a.innerHTML;if(void 0===u){var c=document.createElement("dummy"),h=a.childNodes;c.innerHTML="";for(var l=0;l<h.length;l+=1)c.appendChild(h[l].cloneNode(!0));u=c.innerHTML}return"data:image/svg+xml;base64,"+btoa(s+u+"</svg>")},u.prototype.fromData=function(t){var e=this;this.clear(),this._fromData(t,(function(t,n){return e._drawCurve(t,n.start,n.end)}),(function(t){return e._drawDot(t)})),this._data=t},u.prototype.toData=function(){return this._data};var c=u;function h(t,e,n,o){var i,r=!1,a=0;function s(){i&&clearTimeout(i)}function u(){for(var u=arguments.length,c=new Array(u),h=0;h<u;h++)c[h]=arguments[h];var l=this,d=Date.now()-a;function p(){a=Date.now(),n.apply(l,c)}function f(){i=void 0}r||(o&&!i&&p(),s(),void 0===o&&d>t?p():!0!==e&&(i=setTimeout(o?f:p,void 0===o?t-d:t)))}return"boolean"!=typeof e&&(o=n,n=e,e=void 0),u.cancel=function(){s(),r=!0},u}function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,e,n){return t(n={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&n.path)}},n.exports),n.exports}var p=d((function(t){function e(){return t.exports=e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},e.apply(this,arguments)}t.exports=e}));function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var y=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},v=d((function(t){function e(n,o){return t.exports=e=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},e(n,o)}t.exports=e})),_=d((function(t){function e(n){return"function"==typeof Symbol&&"symbol"==l(Symbol.iterator)?t.exports=e=function(t){return l(t)}:t.exports=e=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":l(t)},e(n)}t.exports=e})),g=function(t,e){return!e||"object"!==_(e)&&"function"!=typeof e?y(t):e},m=d((function(t){function e(n){return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},e(n)}t.exports=e})),w=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t};var x=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(a,o.PureComponent);var e,n,r=(e=a,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,o=m(e);if(n){var i=m(this).constructor;t=Reflect.construct(o,arguments,i)}else t=o.apply(this,arguments);return g(this,t)});function a(t){var e,n,o,i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=r.call(this,t)).state={canvasWidth:0,canvasHeight:0},e._callResizeHandler=(n=e.props.debounceInterval,o=e.handleResize.bind(y(e)),void 0===i?h(n,o,!1):h(n,i,!1!==o)),e}return function(t,e,n){e&&f(t.prototype,e),n&&f(t,n)}(a,[{key:"componentDidMount",value:function(){this._canvas&&(this.props.width&&this.props.height||(this._canvas.style.width="100%"),this.scaleCanvas(),this.props.width&&this.props.height||window.addEventListener("resize",this._callResizeHandler),this._signaturePad=new c(this._canvas,this.props.options))}},{key:"componentWillUnmount",value:function(){this.props.width&&this.props.height||window.removeEventListener("resize",this._callResizeHandler),this._signaturePad.off()}},{key:"isEmpty",value:function(){return this._signaturePad.isEmpty()}},{key:"clear",value:function(){this._signaturePad.clear()}},{key:"fromDataURL",value:function(t){this._signaturePad.fromDataURL(t)}},{key:"toDataURL",value:function(t){return this._signaturePad.toDataURL(t)}},{key:"fromData",value:function(t){this._signaturePad.fromData(t)}},{key:"toData",value:function(){return this._signaturePad.toData()}},{key:"off",value:function(){this._signaturePad.off()}},{key:"on",value:function(){this._signaturePad.on()}},{key:"handleResize",value:function(){this.scaleCanvas()}},{key:"scaleCanvas",value:function(){var t,e=Math.max(window.devicePixelRatio||1,1),n=(this.props.width||this._canvas.offsetWidth)*e,o=(this.props.height||this._canvas.offsetHeight)*e,i=this.state,r=i.canvasWidth,a=i.canvasHeight;n===r&&o===a||(this.props.redrawOnResize&&this._signaturePad&&(t=this._signaturePad.toDataURL()),this._canvas.width=n,this._canvas.height=o,this.setState({canvasWidth:n,canvasHeight:o}),this._canvas.getContext("2d").scale(e,e),this.props.redrawOnResize&&this._signaturePad?this._signaturePad.fromDataURL(t):this._signaturePad&&this._signaturePad.clear())}},{key:"render",value:function(){var t=this,e=this.props.canvasProps;return i.a.createElement("canvas",p({ref:function(e){return t._canvas=e}},e))}},{key:"instance",get:function(){return this._signaturePad}},{key:"canvas",get:function(){return this._canvas}},{key:"dotSize",set:function(t){this._signaturePad.dotSize=t},get:function(){return this._signaturePad.dotSize}},{key:"minWidth",set:function(t){this._signaturePad.minWidth=t},get:function(){return this._signaturePad.minWidth}},{key:"maxWidth",set:function(t){this._signaturePad.maxWidth=t},get:function(){return this._signaturePad.maxWidth}},{key:"throttle",set:function(t){this._signaturePad.throttle=t},get:function(){return this._signaturePad.throttle}},{key:"backgroundColor",set:function(t){this._signaturePad.backgroundColor=t},get:function(){return this._signaturePad.backgroundColor}},{key:"penColor",set:function(t){this._signaturePad.penColor=t},get:function(){return this._signaturePad.penColor}},{key:"velocityFilterWeight",set:function(t){this._signaturePad.velocityFilterWeight=t},get:function(){return this._signaturePad.velocityFilterWeight}},{key:"onBegin",set:function(t){if(!t||"function"!=typeof t)throw new Error("Invalid argument passed to onBegin()");this._signaturePad.onBegin=t}},{key:"onEnd",set:function(t){if(!t||"function"!=typeof t)throw new Error("Invalid argument passed to onEnd()");this._signaturePad.onEnd=t}}]),a}();w(x,"displayName","react-signature-pad-wrapper"),w(x,"defaultProps",{redrawOnResize:!1,debounceInterval:150});var b=x;var P=function(t,e,n,a,s,u,c,h,l,d){var p=Object(o.useRef)(),f={width:"50%",height:"20%",margin:0,display:"block",float:"left",textAlign:"center"},y={backgroundColor:n,borderTop:"2px solid ".concat(c),color:u,width:"100%",display:"block",margin:0,padding:5};return p.penColor=e,p.backgroundColor=t,i.a.createElement(r.View,{style:{backgroundColor:t}},i.a.createElement(b,{ref:p,options:{penColor:e}}),i.a.createElement(r.View,{style:{display:"flex",flexDirection:"row",width:"100%"}},i.a.createElement(r.TouchableOpacity,{style:f,onPress:function(){p.current.isEmpty()||p.current.clear()}},i.a.createElement(r.Text,{style:y},a)),i.a.createElement(r.TouchableOpacity,{style:f,onPress:function(){p.current.isEmpty()||(h&&h(p.current.toDataURL()),p.current.clear())}},i.a.createElement(r.Text,{style:[y,{borderLeft:"2px solid ".concat(c)}]},s))))};var k=r.StyleSheet.create({wrapper:{display:"flex",alignItems:"center",justifyContent:"center"}}),C={Signature:function(t){var e=t.backgroundColor,n=t.penColor,o=t.buttonColor,a=t.clearText,s=t.saveText,u=t.buttonTextColor,c=t.borderColor,h=t.action,l=t._height,d=t._width;return i.a.createElement(r.View,{style:(k.wrapper,{border:"2px solid ".concat(c)})},P(e,n,o,a,s,u,c,h,l,d))}},E={logo:"./example-logo.png",displayName:"Signature",name:"signature-library",version:"1.0.1",components:[{name:"Signature",displayName:"Signature",icon:"./example-thumbnail.png",defaultWidth:162,defaultHeight:111,props:[{name:"backgroundColor",displayName:"Background Color",type:"color",default:"@background"},{name:"penColor",displayName:"Pen Color",type:"color",default:"@text"},{name:"buttonColor",displayName:"Button Background Color",type:"color",default:"@primary"},{name:"clearText",displayName:"Clear Button Text",type:"text",default:"Clear"},{name:"saveText",displayName:"Save Button Text",type:"text",default:"Save"},{name:"buttonTextColor",displayName:"Button Text Color",type:"color",default:"@background"},{name:"borderColor",displayName:"Border Color",type:"color",default:"@text"},{name:"action",displayName:"Action on Saved Signature",type:"action",arguments:[{type:"text",displayName:"Signature Image"}]}]}]}}]);