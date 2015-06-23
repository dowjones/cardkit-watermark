!function(){"use strict";angular.module("cardkitApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","colorpicker.module","draganddrop","colorpicker.module","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/watermark"),a.state("watermark",{url:"/watermark",templateUrl:"views/watermark.html",controller:"SettingsFormCtrl as form",name:"watermark",resolve:{themeConfig:["$state","themeConfigProvider",function(a,b){return a.current.newname=this.name,b()}]}})}]).run(["$rootScope","$state","$stateParams",function(a,b,c){a.$state=b,a.$stateParams=c}])}(),function(){"use strict";angular.module("cardkitApp").controller("SettingsFormCtrl",["$scope","saveSvgAsPng","themeConfig","$filter","$timeout",function(a,b,c,d,e){function f(a,b,c){if(c=angular.isUndefined(c)?!1:c,"object"!=typeof a||null===a)return c;for(var d=b.split(".");d.length;){var e=d.shift();if(!(e in a))return c;a=a[e]}return a}function g(a){switch(typeof a){case"function":return a();default:return a}}function h(){f(a,"image")&&(n(),a.warning.tooSmall=o("width")||o("height"))}function i(b,c){var d=new FileReader;d.onload=function(){var b=new Image;b.onload=function(){a.image={width:this.width,height:this.height,ratio:this.height/this.width},a.config.svg.elements[c].src=d.result,j(),a.$apply()},b.src=d.result},d.readAsDataURL(b)}function j(){if("Custom"===a.size.name){var b=f(a.image,"ratio",.6),c=f(a.image,"width");c&&c<d("filter")(a.config.sizes,{name:"Custom"})[0].width&&(a.size.width=c),a.size.height=m(b*a.size.width,10),f(a.size,"locked")&&f(a.image,"width")&&a.fitImage()}delete a.imageEl.transform}function k(a){return a.stopPropagation(),a.preventDefault(),a.dataTransfer||null}function l(){if(f(a,"image")){var b=a.image.width;f(a.theme,"maxWidth")&&a.size.width<=a.theme.maxWidth&&a.image.width>a.theme.maxWidth&&(b=a.theme.maxWidth);var c=b/g(a.imageEl.width);return c>=2?2:c>1?m(c,10):1}return 1}function m(a,b){return Math.floor(a*b)/b}function n(){var b=g(a.imageEl.width);b>a.image.width?a.warning.tooBig=!0:a.warning.tooBig=!1}function o(b){var c=g(a.imageEl[b]);return c<g(a.size[b])?!0:!1}a.config={themes:c,output:{scale:1,editable:{scale:!1}},svg:{canvas:{height:function(){return a.size.height},width:function(){return a.size.width},fill:"#fff"},elements:[{name:"Background",type:"rect",height:function(){return a.size.height},width:function(){return a.size.width},hide:!0,fill:"",defaultFill:function(){return"#000"},editable:{fill:{White:"#fff",Black:"#000"}}},{name:"Image",type:"image",width:function(){return a.size.width},height:function(){var b=f(a.image,"ratio",1);return b*g(a.imageEl.width)},src:"",x:"0%",y:"0%",preserveAspectRatio:"xMinYMin slice",draggable:!0,dragLockX:!0,editable:{src:!0,width:!0,dragLockX:!0}},{name:"Shadow",type:"text",text:function(){return g(a.credit.text)},fill:function(){return f(a.theme,"shadow."+a.credit.fill,"#000")},fontSize:function(){return f(a.theme,"fontSize","12")},fontFamily:function(){return f(a.theme,"fontFamily","helvetica")},fontWeight:function(){return f(a.theme,"fontWeight","normal")},fontStyle:function(){return f(a.theme,"fontStyle","normal")},opacity:function(){return f(a.theme,"opacity",.9)},x:function(){return g(a.credit.x)+1},y:function(){return g(a.credit.y)+1},textAnchor:function(){return g(a.credit.textAnchor)}},{name:"Credit",type:"text",text:function(){return f(a.theme,"defaultText","")},value:function(){return f(a.theme,"defaultText","")},change:function(){var b=g(this.value)+(this.suffix?f(a.theme,"suffix.value"):"");this.text=f(a.theme,"uppercase")?b.toUpperCase():b},fill:function(){return f(a.theme,"colors."+f(a.theme,"defaultColor","White"),"#fff")},defaultFill:function(){return f(a.theme,"colors."+f(a.theme,"defaultColor","White"),"#fff")},helpText:function(){return f(a.theme,"helpText","")},fontSize:function(){return f(a.theme,"fontSize","12")},fontFamily:function(){return f(a.theme,"fontFamily","helvetica")},fontWeight:function(){return f(a.theme,"fontWeight","normal")},fontStyle:function(){return f(a.theme,"fontStyle","normal")},opacity:function(){return f(a.theme,"opacity",.9)},x:function(){return f(a.theme,"margin",20)},defaultX:function(){return f(a.theme,"margin",20)},y:function(){return a.size.height-f(a.theme,"margin",20)},textAnchor:function(){return g(a.credit.x)!==f(a.theme,"margin",20)?"end":"start"},suffix:!1,editable:{fill:c[0].colors,x:{Left:c[0].margin,Right:function(){return a.size.width-f(a.theme,"margin",20)}},suffix:{Off:!1,On:!0},text:!0}},{name:"Logo",type:"image",enabled:function(){return f(a.theme,"logo.enabled",!1)},width:function(){return f(a.theme,"logo.width",0)},height:function(){return f(a.theme,"logo.height",0)},src:function(){return"string"==typeof f(a.theme,"logo.src")?a.theme.logo.src:"object"==typeof f(a.theme,"logo.src")?a.theme.logo.src[a.credit.fill]:void 0},opacity:function(){return f(a.theme,"logo.opacity",.5)},x:function(){return a.size.width-f(a.theme,"margin",20)-this.width()},y:function(){return f(a.theme,"margin",20)},preserveAspectRatio:"xMinYMin slice",display:function(){return f(a.theme,"logo.display","none")},defaultDisplay:function(){return f(a.theme,"logo.display","none")},editable:{display:{Off:"none",On:"block"}}}]}},a.theme=a.config.themes[0],a.imageEl=d("filter")(a.config.svg.elements,{name:"Image"})[0],a.credit=d("filter")(a.config.svg.elements,{name:"Credit"})[0],a.config.sizes=a.theme.sizes,"undefined"!=typeof a.config.sizes&&(a.size=a.config.sizes.length<1?null:a.config.sizes[0]),this.size=a.config.sizes[0],a.$watch("theme",function(){a.$broadcast("changeTheme")}),a.$watch("size",function(){j(),a.$broadcast("changeSize")}),a.$watchGroup(["size.width","size.height"],function(){f(a.size,"locked")&&j()}),a.$watch("size.locked",function(){f(a.size,"locked")&&j()}),a.warning={tooBig:!1,tooSmall:!1},a.$watchGroup(["size","imageEl.width","imageEl.src"],function(){h()}),a.$watchGroup(["size","imageEl.width"],function(){a.imageEl.dragLockX=!1}),a.$watch("imageEl.src",function(){a.imageEl.dragLockX=!0}),a.onDrop=function(a,b,c){var d=k(b);i(d.files[0],c)},a.fileChanged=function(a){i(angular.element(a)[0].files[0],angular.element(a).data("key"))},a.fitImage=function(){var b=0,c=0;a.image.ratio<a.size.height/a.size.width?(a.imageEl.width=a.size.width,b=(a.size.height-a.imageEl.width*a.image.ratio)/2):(a.imageEl.width=a.size.height/a.image.ratio,c=(a.size.width-a.imageEl.width)/2),a.imageEl.transform="matrix(1, 0, 0, 1, "+c+", "+b+")",h(),e(function(){delete a.imageEl.transform},0)},a.fillImage=function(){a.image.ratio>a.size.height/a.size.width?a.imageEl.width=a.size.width:a.imageEl.width=a.size.height/a.image.ratio,a.imageEl.transform="matrix(1, 0, 0, 1, 0, 0)",h(),e(function(){delete a.imageEl.transform},0)},a.removeImage=function(b){a.config.svg.elements[b].src=""},a.downloadSvg=function(){var c=l();b(document.getElementById("snap-svg"),f(a.theme,"name","Watermark")+"-image.png",{scale:c,width:a.size.width,height:a.size.height})},a.canIDownload=function(){var a=document.createElement("a");return"undefined"!=typeof a.download?!0:!1}}])}(),angular.module("cardkitApp").service("snapSVG",["$window",function(a){return a.Snap}]),angular.module("cardkitApp").directive("snapSvg",["snapSVG",function(a){return{template:'<svg id="snap-svg" style="max-width: {{width}}px"></svg>',restrict:"E",scope:{svgConfig:"=",svgTheme:"=",width:"@width"},link:function(b,c){function d(a){var b={};for(var c in a)switch(typeof a[c]){case"function":b[c]=a[c]();break;default:b[c]=a[c]}return b}function e(a){var b;switch(a=d(a),a.type){case"atext":case"text":b=i.text(a.x,a.y);break;case"image":b=i.image(a.src,0,0,"100%",a.height);break;case"rect":b=i.rect(a.x,a.y,a.width,a.height,0,0);break;case"circle":break;case"polygon":b=i.polygon(a.points);break;case"group":var c;b="",angular.forEach(a.elements,function(a,d){c=e(a),f(c,a),0===d?b=i.group(c):b.group(c)});break;default:return!1}return b}function f(a,b){var c=d(b),e=c;return delete e.$$hashKey,"text"===e.type&&(e.text=e.text.split("\n")),a.attr(e),"text"===e.type&&a.selectAll("tspan").forEach(function(a,b){var c=angular.isUndefined(e.dy)?e.fontSize*b:e.dy*b,d={x:e.x,y:e.y+c};angular.isUndefined(e.tspan)?a.attr({x:e.x,y:e.y+c}):Array.isArray(e.tspan)?a.attr(angular.extend({},d,e.tspan[b])):a.attr(angular.extend({},d,e.tspan))}),a}function g(){var a=d(b.svgConfig.canvas);i.attr({height:a.width<=a.maxWidth?a.height:"100%",width:a.width<=a.maxWidth?a.width:"100%",viewBox:"0, 0, "+a.width+", "+a.height,"data-width":a.width,"data-height":a.height}),f(k,b.svgConfig.canvas);var c;angular.forEach(b.svgConfig.elements,function(a,g){var h=d(a);if("undefined"!=typeof m[g]){if(l=m[g],"image"===l.type){c=l.matrix;var i=e(b.svgConfig.elements[g]);if(i===!1)return;l.after(i),i.transform(c),l.remove(),l=i,m[g]=l}if("g"===l.type){if(c=l.matrix,l.remove(),l=e(b.svgConfig.elements[g]),l===!1)return;l.transform(c),m[g]=l}}else{if(l=e(a),l===!1)return;m.push(l)}var j=a;delete j.$$hashKey,f(l,a),h.draggable?(l.undrag(),l.altDrag(a.dragLockX)):l.transform("0").undrag()})}var h=angular.fromJson(b.svgConfig);a.plugin(function(a,b,c,d){b.prototype.altDrag=function(a){return this.dragLockX=a||!1,this.drag(f,e,g),this};var e=function(a,b,c){this.data("ot",this.transform().local)},f=function(a,b,c,d,e){this.dragLockX&&(a=0);var f,g,h=this.transform().diffMatrix.invert();h.e=h.f=0,f=h.x(a,b),g=h.y(a,b),this.transform(this.data("ot")+"t"+[f,g])},g=function(){}});var i=a(c[0].children[0]);i.attr({height:"100%",width:"100%","max-width":"100%","max-height":"100%"});var j=d(h.canvas),k=i.rect(0,0,j.width,j.height,0,0).attr(j);j.draggable===!0&&k.altDrag();var l,m=[];b.$watch("svgConfig",g,!0),b.$on("changeTheme",g),b.$on("changeSize",g)}}}]),angular.module("cardkitApp").service("saveSvgAsPng",["$window",function(a){return a.saveSvgAsPng}]),angular.module("cardkitApp").factory("themeConfigProvider",["$state","$http","$q","$rootScope",function(a,b,c,d){return function(){if(angular.isUndefined(d[a.current.newname])){var e="modes/"+a.current.newname+".config.json",f=b.get(e)["catch"](function(a){return 404===a.status?[]:c.reject(a)});return c.all([f]).then(function(b){return d[a.current.newname]=b[0].data,b[0].data})}return d[a.current.newname]}}]),angular.module("cardkitApp").directive("imageEditor",function(){return{template:'<div><div class="dropzone" drop="onDrop($data, $event, key)" drop-effect="copy" drop-accept="\'Files\'" drag-over-class="drag-over-accept"><div class="fileInputWrapper btn btn-primary">or select an image<input onchange="angular.element(this).scope().$parent.fileChanged(this, event)" data-key="{{key}}" type="file" accept="image/*" /></div></div></div>',restrict:"E",scope:{key:"=",onDrop:"="}}});