var drupal=drupal||{};
drupal.api=function(){return{resource:"",endpoint:function(){return drupal.endpoint||""},getURL:function(a){var b=this.endpoint(),b=b+(this.resource?"/"+this.resource:"");return b+=a&&a.id?"/"+a.id:""},call:function(a,b,c,d,e){a={url:a,dataType:b,type:c,success:function(a,b){console.log(a);"success"==b?e&&e(a):console.log("Error: "+b)},error:function(a){console.log(a.responseText);e&&e(null)}};d&&(a.data=d);jQuery.ajax(a)},get:function(a,b,c){a=this.getURL(a);a=a+".jsonp"+(b?"?"+decodeURIComponent(jQuery.param(b,
!0)):"");this.call(a,"jsonp","GET",null,c)},execute:function(a,b,c){this.call(this.getURL(b)+"/"+a,"json","POST",b,c)},save:function(a,b){var c=a.id?"PUT":"POST";this.call(this.getURL(a),"json",c,a,b)},remove:function(a,b){this.call(this.getURL(a),"json","DELETE",null,b)}}};drupal=drupal||{};drupal.hasStorage=!1;drupal.entity=function(a,b){a&&this.set(a);b&&this.load(b)};drupal.entity.prototype.update=function(a,b){a&&this.set(a);this.store();b&&b.call(this,this)};
drupal.entity.prototype.store=function(){if(this.id&&drupal.hasStorage){var a=this.get(),b="",c;for(c in a)a.hasOwnProperty(c)&&a[c]&&(b=this.entityName+"-"+this.id+"-"+c,localStorage.setItem(b,a[c]))}};drupal.entity.prototype.retrieve=function(){var a=null,b="",b="";if(this.id&&drupal.hasStorage){var a=this.get(),c;for(c in a)if(b=this.entityName+"-"+this.id+"-"+c,b=localStorage.getItem(b))a[c]=b}return a};
drupal.entity.prototype.clear=function(){if(this.id&&drupal.hasStorage){var a=this.get(),b="",c;for(c in a)b=this.entityName+"-"+this.id+"-"+c,localStorage.removeItem(b)}};drupal.entity.prototype.set=function(a){this.api=this.api||null;this.id=a.id||this.id||"";this.entityName="entity"};drupal.entity.prototype.get=function(){return{id:this.id}};drupal.entity.prototype.setQuery=function(a,b,c){a[b]=c};drupal.entity.prototype.getPOST=function(){var a=this.get();a.id||delete a.id;return a};
drupal.entity.prototype.getQuery=function(){var a=this.get(),b={},c;for(c in a)a.hasOwnProperty(c)&&a[c]&&this.setQuery(b,c,a[c]);delete b.id;return b};drupal.entity.prototype.load=function(a){var b=null;(b=this.retrieve())?this.update(b,a):this.api&&this.api.get(this.get(),this.getQuery(),function(b){return function(d){if(d)if(d[0]){for(var e=d.length;e--;)d[e]=new b.constructor(d[e]),d[e].store();a.call(b,d)}else b.update(d,a);else a(null)}}(this))};
drupal.entity.prototype.save=function(a){this.api&&this.api.save(this.getPOST(),function(b){return function(c){b.update(c,a)}}(this))};drupal.entity.prototype.remove=function(a){this.id&&(this.api.remove(this.get(),a),this.clear())};drupal=drupal||{};
drupal.cookie=function(a,b,c){if(1<arguments.length&&(!/Object/.test(Object.prototype.toString.call(b))||null===b||void 0===b)){c=$.extend({},c);if(null===b||void 0===b)c.expires=-1;if("number"===typeof c.expires){var d=c.expires,e=c.expires=new Date;e.setDate(e.getDate()+d)}b=""+b;return document.cookie=[encodeURIComponent(a),"=",c.raw?b:encodeURIComponent(b),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var c=
b||{},d=c.raw?function(a){return a}:decodeURIComponent,e=document.cookie.split("; "),f=0,g;g=e[f]&&e[f].split("=");f++)if(d(g[0])===a)return d(g[1]||"");return null};drupal.system=function(a){drupal.entity.call(this,{},a)};drupal.system.prototype=new drupal.entity;drupal.system.prototype.constructor=drupal.system;drupal.system.api=jQuery.extend(new drupal.api,{resource:"system"});
drupal.system.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="system";this.api=drupal.system.api;this.user=new drupal.user(a.user);this.user.setSession(a.session_name,a.sessid)};drupal.system.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{user:this.user.get()})};drupal.system.prototype.load=function(a){this.api.execute("connect",null,function(b){return function(c){b.update(c,a)}}(this))};
drupal.system.prototype.get_variable=function(a,b,c){this.api.execute("get_variable",{name:a,"default":b},c)};drupal.system.prototype.set_variable=function(a,b,c){this.api.execute("set_variable",{name:a,value:b},c)};drupal.system.prototype.del_variable=function(a,b){this.api.execute("del_variable",{name:a},b)};drupal=drupal||{};drupal.node=function(a,b){drupal.entity.call(this,a,b)};drupal.node.prototype=new drupal.entity;drupal.node.prototype.constructor=drupal.node;
drupal.node.api=jQuery.extend(new drupal.api,{resource:"node"});drupal.node.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="node";this.api=drupal.node.api;this.id=a.nid||this.id||0;this.title=a.title||this.title||"";this.type=a.type||this.type||"";this.status=a.status||this.status||0;this.uid=a.uid||this.uid||0};drupal.node.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{title:this.title,type:this.type,status:this.status,uid:this.uid})};
drupal.node.prototype.setQuery=function(a,b,c){a["parameters["+b+"]"]=c};drupal=drupal||{};drupal.current_user=null;drupal.user=function(a,b){drupal.entity.call(this,a,b)};drupal.user.prototype=new drupal.entity;drupal.user.prototype.constructor=drupal.user;drupal.user.api=jQuery.extend(new drupal.api,{resource:"user"});
drupal.user.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="user";this.api=drupal.user.api;this.id=a.uid||this.id||0;this.name=a.name||this.name||"";this.mail=a.mail||this.mail||"";this.pass=a.pass||this.pass||"";this.status=a.status||this.status||1};drupal.user.prototype.setSession=function(a,b){this.sessid=b;this.id&&a&&(this.session_name=a,drupal.cookie(a,b),drupal.current_user=this)};
drupal.user.prototype.login=function(a){this.api&&this.api.execute("login",{username:this.name,password:this.pass},function(b){return function(c){b.update(c.user);b.setSession(c.session_name,c.sessid);a&&a.call(b,b)}}(this))};drupal.user.prototype.register=function(a){this.api&&this.api.execute("register",this.getPOST(),function(b){return function(c){b.update(c,a)}}(this))};drupal.user.prototype.logout=function(a){this.api&&this.api.execute("logout",null,a)};
drupal.user.prototype.getPOST=function(){var a=drupal.entity.prototype.getPOST.call(this);a.pass=this.pass;return a};drupal.user.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{name:this.name,mail:this.mail,status:this.status})};
