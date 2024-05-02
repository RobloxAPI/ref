(()=>{var V=class{constructor(e){this.funcs=new Map(e),this.targets=new Map}Link(e,n,s){if(!(s instanceof Array))throw new Error("caller must be an Array");let i=this.funcs.get(s[0]);if(!i)throw new Error("unknown function "+s[0]);this.targets.get(e)&&this.Unlink(e);let r=s.slice(1),u=!1;for(let c=0;c<i.arguments.length;c++){let f=r[c],h=i.arguments[c];if(h instanceof Array){let d=!1;for(let m of h)if(m===void 0){if(f===void 0){d=!0;break}}else if(m===null){if(f===null){d=!0;break}}else if(typeof m=="string"){if(typeof f===m){d=!0;break}}else if(f instanceof m){d=!0;break}if(!d){u=c;break}}else if(typeof h=="string"){if(typeof f!==h){u=c;break}}else if(!(f instanceof h)){u=c;break}}if(u)throw new Error("bad argument #"+(u+1)+" to "+s[0]);let a=i.update.bind(void 0,e,r),o={autoupdate:!!n,func:i,args:r,update:a};n&&(o.value=i.construct(r,a)),this.targets.set(e,o),a()}Unlink(e){let n=this.targets.get(e);n&&(this.targets.delete(e),n.func.destruct(n.args,n.update,n.value))}Autoupdate(e,n){let s=this.targets.get(e);s&&s.autoupdate!==n&&(s.autoupdate=!!n,enbled?s.value=s.func.construct(s.args,s.update):(s.func.destruct(s.args,s.update,s.value),s.value=void 0))}Update(){for(let e of arguments){let n=this.targets.get(e);if(!n)return;n.update()}}UpdateAll(){for(let e of Array.from(this.targets.values()))e.update()}QuickLink(e,n,s){let i=document.querySelector(e),r=document.querySelector(n);if(!i){console.log(`skipped missing target: ${e}`);return}if(!r){console.log(`skipped missing referent: ${n}`);return}s.splice(1,0,r),this.Link(i,!1,s)}};function W(t,e){return e[0]===">"?(e=e.slice(1),Array.from(t.children).filter(function(n){return n.matches(e)})):t.querySelectorAll(e)}function oe(t,e){let n=0;for(let s of W(t,e))getComputedStyle(s).display!=="none"&&n++;return n}var l=new V([["HideIfZero",{arguments:[Element,"string"],construct:function(t,e){let n=new IntersectionObserver(e,{root:t[0]});for(let s of W(t[0],t[1]))n.observe(s);return n},destruct:function(t,e,n){n.takeRecords().length>0&&e(),n.disconnect()},update:function(t,e){oe(e[0],e[1])===0?t.style.display="none":t.style.display=""}}],["Count",{arguments:[Element,"string",[Function,void 0],[Function,void 0]],construct:function(t,e){let n=new IntersectionObserver(e,{root:t[0]});for(let s of W(t[0],t[1]))n.observe(s);return n},destruct:function(t,e,n){n.takeRecords().length>0&&e(),n.disconnect()},update:function(t,e){let n=oe(e[0],e[1]);e[2]&&e[3]?n===1?n=e[2](n):n=e[3](n):e[2]&&(n=e[2](n)),t.innerText=n}}]]);var N=["All","Server","CoreScript","BuiltinPlugin","Command","Plugin","Script"],j=new Map([["",[1,1,1,1,1,1,1]],["None",[1,1,1,1,1,1,1]],["RobloxPlaceSecurity",[1,1,1,1,1,1,0]],["PluginSecurity",[1,1,1,1,1,1,0]],["LocalUserSecurity",[1,1,1,0,1,0,0]],["RobloxScriptSecurity",[1,1,1,1,0,0,0]],["RobloxSecurity",[1,1,0,0,0,0,0]],["NotAccessibleSecurity",[1,0,0,0,0,0,0]]]);function le(t,e){let n=N.indexOf(t);return n<0&&(n=0),j.get(e)[n]===1}var K=[{name:"Theme",type:"radio",default:"Auto",options:[{text:"Auto",value:"Auto"},{text:"Light",value:"Light"},{text:"Dark",value:"Dark"}]},{name:"SecurityIdentity",type:"select",default:N[0],text:"Permission",options:N.map(t=>({value:t}))},{name:"ExpandMembers",type:"checkbox",default:!1,text:"Expand all members"},{name:"ShowDeprecated",type:"checkbox",default:!0,text:"Show deprecated",method:"show",class:"deprecated"},{name:"ShowNotBrowsable",type:"checkbox",default:!0,text:"Show unbrowsable",method:"show",class:"unbrowsable"},{name:"ShowNotScriptable",type:"checkbox",default:!0,text:"Show unscriptable",method:"show",class:"unscriptable"},{name:"ShowHidden",type:"checkbox",default:!0,text:"Show hidden",method:"show",class:"hidden"},{name:"ShowRemoved",type:"checkbox",default:!0,text:"Show removed",method:"show",class:"removed"}];function Ce(t,e,n){let s=document.createElement("form"),i="setting-";for(let r of e){let u=window.localStorage.getItem(r.name);u===null&&(u=r.default);let a=document.createElement("div");if(a.className=r.type,r.type==="checkbox"){u=u===!0||u==="true";let o=document.createElement("input");o.type="checkbox",o.id=i+r.name,o.name=r.name,o.disabled=r.disabled,o.defaultChecked=u,o.addEventListener("change",function(f){n(f.target.name,f.target.checked,!1)});let c=document.createElement("label");c.htmlFor=o.id,c.textContent=r.text,a.appendChild(o),a.appendChild(c)}else if(r.type==="radio")for(let o of r.options){let c=document.createElement("input");c.type="radio",c.id=i+r.name+"-"+o.value,c.name=r.name,c.value=o.value,c.disabled=r.disabled||o.disabled,c.defaultChecked=u===o.value,c.addEventListener("change",function(h){n(h.target.name,h.target.value,!1)});let f=document.createElement("label");f.htmlFor=c.id,f.textContent=o.text||o.value,a.appendChild(c),a.appendChild(f)}else if(r.type==="select"){let o=document.createElement("select");o.id=i+r.name,o.disabled=r.disabled;for(let f of r.options){let h=document.createElement("option");h.value=f.value,h.text=f.text||f.value,h.disabled=r.disabled||f.disabled,h.defaultSelected=u===f.value,o.appendChild(h)}o.addEventListener("change",function(f){n(r.name,f.target.value,!1)});let c=document.createElement("label");c.htmlFor=o.id,c.textContent=r.text,a.appendChild(o),a.appendChild(c)}s.appendChild(a)}t.appendChild(s)}var z=class{constructor(){this.settings=new Map}Listen(e,n){let s=this.settings.get(e);if(s===void 0)throw"unknown setting "+e;if(typeof n!="function")throw"listener must be a function";s.listeners.push(n);let i=window.localStorage.getItem(e);i===null&&(i=s.config.default),s.config.type==="checkbox"&&(i=i===!0||i==="true"),n(e,i,!0)}Value(e){let n={value:null};return this.Listen(e,function(s,i){n.value=i}),n}Changed(e,n,s){let i=this.settings.get(e);if(i!==void 0){window.localStorage.setItem(e,n);for(let r of i.listeners)r(e,n,s)}}},b=new z;for(let t of K)b.settings.set(t.name,{config:t,listeners:[]}),t.migrate&&t.migrate(window.localStorage),!t.disabled&&window.localStorage.getItem(t.name)===null&&window.localStorage.setItem(t.name,t.default);b.Listen("Theme",function(t,e,n){n||(document.documentElement.className=e)});for(let t of K){if(t.method!=="show")continue;let e=document.createElement("style");e.innerHTML=`
		.set.${t.class} { display:none }
		.class-tree .set.${t.class} + ul { padding-left:0; border-left:none }
	`,b.Listen(t.name,function(n,s,i){s?e.remove():document.head.appendChild(e),l.UpdateAll()})}var ce=new Map;for(let t=0;t<N.length;t++){let e="";for(let s of j)if(s[1][t]===0){e+=".set.sec-"+s[0];for(let i of j)i[1][t]===1&&(e+=":not(.sec-"+i[0]+")");e+=`,
`}if(e==="")continue;e=e.slice(0,-2)+` {
	display: none;
}
`;let n=document.createElement("style");n.innerHTML=e,ce.set(N[t],n)}b.Listen("SecurityIdentity",function(t,e,n){for(let s of ce)e===s[0]?document.head.appendChild(s[1]):s[1].remove();l.UpdateAll()});function _e(){let t=document.getElementById("settings-panel");if(!t)return;let e=t.querySelector(":scope > section");if(e){Ce(e,K,function(n,s,i){b.Changed(n,s,i)});for(let n of document.querySelectorAll(".settings-focuser"))n.classList.remove("js");t.classList.remove("js")}}new Promise(t=>{document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}).then(()=>{_e(),b.Listen("ExpandMembers",function(t,e,n){if(n&&e){let s=document.location.hash.slice(1);if(s!==""&&document.getElementById(s))return}for(let s of document.querySelectorAll(".inherited-members input"))s.checked=e})});function X(t,e){let c=0,f=0,h=t.length,d=0,m=e.length,p=!1,E=!1,L=!0,C=null,w=null,I=null,T=0,re=[];for(;d!=m;){let P=f!=h?t.charAt(f):null,k=e.charAt(d),ae=P!=null?P.toLowerCase():null,R=k.toLowerCase(),$=k.toUpperCase(),G=P&&ae==R,ge=C&&w==R,Ae=G&&C,Le=C&&P&&w==ae;if((Ae||Le)&&(c+=T,re.push(I),C=null,w=null,I=null,T=0),G||ge){let M=0;if(f==0){let be=Math.max(d*-3,-9);c+=be}p&&(M+=5),L&&(M+=10),E&&k==$&&R!=$&&(M+=10),G&&++f,M>=T&&(C!=null&&(c+=-1),C=k,w=C.toLowerCase(),I=d,T=M),p=!0}else c+=-1,p=!1;E=k==R&&R!=$,L=k=="_"||k==" ",++d}return C&&(c+=T,re.push(I)),t.toLowerCase()===e.toLowerCase()&&(c+=100),[f==h,c]}var F=null;function ke(){return F||(F=new Promise((t,e)=>{let n=document.head.querySelector('meta[name="resources"]');if(n===null){e();return}t(n.content)}).then(t=>fetch(t).then(e=>e.ok?e.json():null)).then(t=>(console.log("RESOURCES",t),t)),F)}function x(t,e){let n=document.createElement("span");return n.classList.add("picture"),ke().then(s=>{let i,r;switch(e||="link",e){case"hub":i=s.Hub,r=s.Hub;case"doc":i=s.Hub,r=s.Hub}let u=!1,a=t.type;switch(a){case"Class":let o=t.primary;i=s.Entity.Class[o].Light,r=s.Entity.Class[o].Dark;break;case"Property":(t.field_name("READ_SECURITY")||t.field_name("READ_SECURITY"))&&(u=!0);case"Function":case"Event":case"Callback":if(t.field_name("SECURITY")&&(u=!0),u){i=s.Protected[a].Light,r=s.Protected[a].Dark;break}case"Enum":case"EnumItem":i=s.Entity[a].Light,r=s.Entity[a].Dark;break;case"Type":let c=s.Entity[a][t.field_name("TYPE_CAT")];c||(c=s.Entity[a].Primitive),i=c.Light,r=c.Dark;break}if(n.setAttribute("data-type",a),i||r){let o=document.createElement("span");o.classList.add("icon"),i&&o.style.setProperty("--light",`url('${i}')`),r&&o.style.setProperty("--dark",`url('${r}')`),n.appendChild(o)}return n}).catch(()=>n)}var de="";{let t=document.head.querySelector('meta[name="path-sub"]');t&&(de=t.content)}function J(t){return t.replaceAll("<","").replaceAll(">","")}function ue(t){switch(t.toLowerCase()){case"class":return"class";case"property":return"class";case"function":return"class";case"event":return"class";case"callback":return"class";case"enum":return"enum";case"enumitem":return"enum";case"type":return"type"}}function Te(t,e){let n;switch(t){case"link":return n=`${de}/${ue(e.type)}/${J(e.primary)}.html`,e.secondary&&(n+=`#member-${e.secondary}`),n}let s=e.type;switch(ue(e.type)){case"class":s="classes";break;case"enum":s="enums";break;case"type":s="datatypes";break}switch(t){case"hub":n=`https://create.roblox.com/docs/reference/engine/${s}/${J(e.primary)}`,e.secondary&&(n+=`#${e.secondary}`);break;case"doc":n=`https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/engine/${s}/${J(e.primary)}.yaml`;break}return n}function _(t,e,n){e||="link";let s;switch(e){case"nolink":s=document.createElement("span");break;default:s=document.createElement("a"),s.classList.add("entity-link"),s.href=Te(e,t);break}switch(e){case"hub":return n||x(t,e).then(r=>s.insertAdjacentElement("afterbegin",r)),s.appendChild(new Text("CreatorHub")),s;case"doc":return n||x(t,e).then(r=>s.insertAdjacentElement("afterbegin",r)),s.appendChild(new Text("Doc source")),s}n||(s.classList.add("deco"),t.tag("Deprecated")&&s.classList.add("deprecated"),t.tag("NotBrowsable")&&s.classList.add("unbrowsable"),t.tag("Hidden")&&s.classList.add("hidden"),t.removed&&s.classList.add("removed")),n||x(t,e).then(r=>s.insertAdjacentElement("afterbegin",r));let i="";return n?t.secondary?i+=`${t.secondary}`:i+=`${t.primary}`:(i+=`${t.primary}`,t.secondary&&(i+=`.${t.secondary}`)),s.appendChild(new Text(i)),s}function S(t,e){let n=document.createElement(t);return n.textContent=e,n}function g(t,e){return t.getUint8(e)}function Z(t,e){return t.getUint16(e,!0)}function Re(t,e){return t.getUint16(e,!0)+(t.getUint8(e+2)<<16)}function pe(t,e){return t.getUint32(e,!0)}var te=class{constructor(e){this.buf=e,this.data=new DataView(e),this.LEN_STRINGS=Z(this.data,0),this.LEN_BLOB=Re(this.data,2),this.LEN_TYPES=g(this.data,5),this.LEN_TAGS=g(this.data,6),this.LEN_SECS=g(this.data,7),this.LEN_SAFES=g(this.data,8),this.LEN_CATS=g(this.data,9),this.OFF_STRINGS=10+this.LEN_TYPES*2,this.OFF_BLOB=this.OFF_STRINGS+this.LEN_STRINGS,this.OFF_TYPES=this.OFF_BLOB+this.LEN_BLOB,this.OFF_TAGS=this.OFF_TYPES+this.LEN_TYPES,this.OFF_SECS=this.OFF_TAGS+this.LEN_TAGS,this.OFF_SAFES=this.OFF_SECS+this.LEN_SECS,this.OFF_CATS=this.OFF_SAFES+this.LEN_SAFES,this.OFF_ROWS=this.OFF_CATS+this.LEN_CATS,this.SIZ_ROW=23,this.strings=Array(this.LEN_STRINGS);let n=new TextDecoder;for(let s=0,i=0;s<this.LEN_STRINGS;s++){let r=g(this.data,this.OFF_STRINGS+s),u=e.slice(this.OFF_BLOB+i,this.OFF_BLOB+i+r);this.strings[s]=n.decode(u),i+=r}this.types=Array(this.LEN_TYPES);for(let s=0;s<this.LEN_TYPES;s++)this.types[s]=this.strings[g(this.data,this.OFF_TYPES+s)];this.tags=new Map;for(let s=0;s<this.LEN_TAGS;s++){let i=this.strings[g(this.data,this.OFF_TAGS+s)];this.tags.set(i,s+1)}this.secs=Array(this.LEN_SECS);for(let s=0;s<this.LEN_SECS;s++)this.secs[s]=this.strings[g(this.data,this.OFF_SECS+s)];this.safes=Array(this.LEN_SAFES);for(let s=0;s<this.LEN_SAFES;s++)this.safes[s]=this.strings[g(this.data,this.OFF_SAFES+s)];this.cats=Array(this.LEN_CATS);for(let s=0;s<this.LEN_CATS;s++)this.cats[s]=this.strings[g(this.data,this.OFF_CATS+s)];this.tables=new Map,this.LEN_ROWS=0,this.EOF=this.OFF_ROWS;for(let s=0;s<this.LEN_TYPES;s++){let i=Z(this.data,10+s*2);this.tables.set(this.types[s],{offset:this.EOF,length:i}),this.LEN_ROWS+=i,this.EOF+=i*this.SIZ_ROW}console.assert(this.EOF===e.byteLength,this),this.T={};for(let s of this.types)this.T[s.toUpperCase()]=s;this.T.ALL=this.types,this.T.PRIMARY=["Class","Enum","Type"],this.T.MEMBERS=this.types.filter(s=>!["Class","Enum","EnumItem","Type"].includes(s)),this.T.SECONDARY=this.T.MEMBERS.concat(["EnumItem"])}length(e){return this.tables.get(e).length}string(e){return this.strings[e]}row(e,n){return new q(this,e,n)}};function Y(t,e,n,s){let i=(g(e,n)&15)>>0;if(i!=15)return t[s][i]}function U(t,e,n,s){let i=(g(e,n)&240)>>4;if(i!=15)return t[s][i]}function y(t,e,n){let s=Z(e,n);if(s!=65535)return t.strings[s]}function Me(t,e,n){let s=pe(e,n);if(s!=4294967295)return s}function ee(t,e,n){let s=g(e,n);if(s!=255)return s}function O(t,e,n){let s=Z(e,n);if(s!=65535)return s}function Ne(t,e,n){let s=pe(e,n);if(s!=4294967295)return s}function B(t,e,n){let s=g(e,n);if(s!=255)return s!=0}var A={PRIMARY:[y,0],SECONDARY:[y,2],FLAGS:[Me,4],CLASS_NAME:[y,0],SUPERCLASSES:[ee,8],SUBCLASSES:[O,9],MEMBERS:[O,11],SUPERCLASS:[y,15],SUBCLASS:[y,17],MEM_CAT:[y,19],MEMBER_NAME:[y,2],THREAD_SAFETY:[Y,13,"safes"],SECURITY:[U,13,"secs"],CAN_SAVE:[B,11],CAN_LOAD:[B,12],READ_SECURITY:[U,13,"secs"],WRITE_SECURITY:[Y,14,"secs"],VALUE_TYPE_CAT:[U,14,"cats"],VALUE_TYPE_NAME:[y,15],CATEGORY:[y,19],DEFAULT:[y,21],RETURNS:[ee,8],PARAMETERS:[O,9],PARAM_TYPE_OPT:[B,11],RETURN_TYPE_OPT:[B,12],PARAM_TYPE_CAT:[Y,14,"cats"],RETURN_TYPE_CAT:[U,14,"cats"],RETURN_TYPE_NAME:[y,15],PARAM_TYPE_NAME:[y,17],PARAM_NAME:[y,19],PARAM_DEFAULT:[y,21],ENUM_NAME:[y,0],ENUM_ITEMS:[O,9],ITEM_NAME:[y,2],LEGACY_NAMES:[ee,8],ITEM_VALUE:[Ne,9],LEGACY_NAME:[y,15],TYPE_NAME:[y,0],TYPE_CAT:[Y,14,"cats"]},fe={FUZZY:function(t,e){let[n,s]=X(e,t);return n?s:-1},FUZZY_ALL:function(t,e){let[n,s]=X(e,t);return s},REGEXP:function(t,e,n){let s=new RegExp(e,n);return t.match(s)?1:-1},REMOVED:function(t){return t&1?1:-1},RANGE:function(t,e,n){return e<=t&&t<=n?1:-1},EQ:function(t,e){return t===e?1:-1},NE:function(t,e){return t!==e?1:-1},LT:function(t,e){return t<e?1:-1},LE:function(t,e){return t<=e?1:-1},GT:function(t,e){return t>e?1:-1},GE:function(t,e){return t>=e?1:-1},TRUE:function(t,e,n){return 1}};function Q(t,e){switch(e.expr){case"op":if(!e.types.includes(t.type))return 0;let n=t.field(e.field);return n===void 0?0:Math.max(-1,e.method(n,...e.args));case"flag":if(!e.types.includes(t.type))return 0;let s=t.field(e.field);if(s===void 0)return 0;let i=t.db.tags.get(flag);return i?s&1<<i?1:-1:0;case"any":return e.types.includes(t.type)?1:-1;case"true":return 1;case"false":return-1;case"and":let r=1/0;for(let u of e.operands){let a=Q(t,u);if(a<r&&(r=a),a<=0)break}return r;case"or":for(let u of e.operands){let a=Q(t,u);if(a>0)return a}return-1;case"not":return Math.max(-1,-Q(t,e.operand))}return-1}function D(t,e){switch(e.expr){case"op":t.push(...e.types);break;case"and":for(let n of e.operands)D(t,n);break;case"or":for(let n of e.operands)D(t,n);break;case"not":D(t,e.operand);break}}function ve(t,e){let n=[];D(n,e),n=[...new Set(n)];let s=[];for(let u of n){let a=t.tables.get(u).length;for(let o=0;o<a;o++){let c=new q(t,u,o),f=Q(c,e);f>0&&s.push({row:c,score:f})}}let i=new Set,r=[];for(let u of s){let a=u.row,o=a.type+"\0"+a.primary+(a.secondary?"\0"+a.secondary:"");i.has(o)||(i.add(o),r.push(u))}return r.sort((u,a)=>a.score-u.score),new ne(t,r,50)}function Ee(t,e){switch(t.type){case"Property":if(e(t.field(A.READ_SECURITY))===!1||e(t.field(A.WRITE_SECURITY))===!1)return;case"Function":case"Event":case"Callback":if(e(t.field(A.SECURITY))===!1)return}}var ne=class{constructor(e,n,s){this.database=e,this.rows=n,this.limit=s}render(e){let n=this.rows.length;if(n===0){e.appendChild(S("i","No results found."));return}this.limit&&this.limit>0&&this.limit<n&&(n=this.limit);for(let s=0;s<n;s++){let i=this.rows[s],r=i.row,u=i.score,a=document.createElement("li");a.title=`score: ${u}`,a.classList.add("set"),r.tag("Deprecated")&&a.classList.add("deprecated"),r.tag("NotBrowsable")&&a.classList.add("unbrowsable"),r.tag("Hidden")&&a.classList.add("hidden"),r.removed&&a.classList.add("removed"),Ee(r,function(o){o===""||o==="None"||a.classList.add(`sec-${o}`)}),a.appendChild(_(r)),e.appendChild(a)}}},q=class{constructor(e,n,s){this.db=e,this.type=n,this.i=s,this.o=e.tables.get(n).offset,this.o+=e.SIZ_ROW*s,this.buf=e.buf.slice(this.o,this.o+e.SIZ_ROW),this.data=new DataView(this.buf)}field(e){return e[0](this.db,this.data,e[1],e[2])}field_name(e){let n=A[e];return n?n[0](this.db,this.data,n[1],n[2]):undefiend}get primary(){return this.field(A.PRIMARY)}get secondary(){return this.field(A.SECONDARY)}get flags(){return this.field(A.FLAGS)}tag(e){let n=this.flags;if(n===void 0)return;let s=this.db.tags.get(e);if(s)return(n&1<<s)!==0}get removed(){let e=this.flags;if(e!==void 0)return(e&1)!==0}},H=null;function ye(){return H||(H=new Promise(function(t,e){let n=document.head.querySelector('meta[name="search-db"]');if(n===null){e("Error: database path not found");return}t(n.content)}).then(t=>fetch(t).then(e=>{if(!e.ok)throw console.log("FETCH DATABASE",e),"failed to fetch database";return e.arrayBuffer()})).then(t=>{let e=new te(t);return console.log("DATABASE",e),e}),H)}var me={Class:["CLASS_NAME","SUPERCLASSES","SUBCLASSES","MEMBERS","SUPERCLASS","SUBCLASS","MEM_CAT"],Property:["CLASS_NAME","MEMBER_NAME","CAN_SAVE","CAN_LOAD","THREAD_SAFETY","READ_SECURITY","WRITE_SECURITY","VALUE_TYPE_CAT","VALUE_TYPE_NAME","CATEGORY","DEFAULT"],Function:["CLASS_NAME","MEMBER_NAME","RETURNS","PARAMETERS","PARAM_TYPE_OPT","RETURN_TYPE_OPT","THREAD_SAFETY","SECURITY","PARAM_TYPE_CAT","RETURN_TYPE_CAT","RETURN_TYPE_NAME","PARAM_TYPE_NAME","PARAM_NAME","PARAM_DEFAULT"],Event:["CLASS_NAME","MEMBER_NAME","PARAMETERS","PARAM_TYPE_OPT","THREAD_SAFETY","SECURITY","PARAM_TYPE_CAT","PARAM_TYPE_NAME","PARAM_NAME"],Callback:["CLASS_NAME","MEMBER_NAME","RETURNS","PARAMETERS","PARAM_TYPE_OPT","RETURN_TYPE_OPT","THREAD_SAFETY","SECURITY","PARAM_TYPE_CAT","RETURN_TYPE_CAT","RETURN_TYPE_NAME","PARAM_TYPE_NAME","PARAM_NAME"],Enum:["ENUM_NAME","ENUM_ITEMS"],EnumItem:["ENUM_NAME","ITEM_NAME","LEGACY_NAMES","ITEM_VALUE","LEGACY_NAME"],Type:["TYPE_NAME","TYPE_CAT"]};function v(t,e){let n=S("li",t),s=document.createElement("ul");for(let i of e)s.appendChild(S("li",i));return n.appendChild(s),n}function we(t,e,n,s,i){let r;switch(!0){case i==="CLASS_NAME":case i==="SUPERCLASS":case i==="SUBCLASS":t.appendChild(_({type:"Class",primary:e},"link","simple"));return;case i==="MEMBER_NAME":let u=s.field(A.CLASS_NAME);t.appendChild(_({type:"Class",primary:u,secondary:e},"link","simple"));return;case i==="ENUM_NAME":t.appendChild(_({type:"Enum",primary:e},"link","simple"));return;case i==="ITEM_NAME":let a=s.field(A.ENUM_NAME);t.appendChild(_({type:"Enum",primary:a,secondary:e},"link","simple"));return;case i==="TYPE_NAME":t.appendChild(_({type:"Type",primary:e},"link","simple"));return;case i==="VALUE_TYPE_NAME":r=s.field(A.VALUE_TYPE_CAT);case i==="RETURN_TYPE_NAME":r=s.field(A.RETURN_TYPE_CAT);case i==="PARAM_TYPE_NAME":switch(i==="PARAM_TYPE_NAME"&&(r=s.field(A.PARAM_TYPE_CAT)),r){case"Class":case"Enum":break;default:r="Type";break}t.appendChild(_({type:r,primary:e},"link","simple"));return}t.textContent=e}function Ie(){let t=document.getElementById("root-main");t&&(t.style.display="block",t.style.margin="var(--halfbase)",t.replaceChildren(),ye().then(function(e){t.appendChild(S("h2","Database enumerations"));let n=document.createElement("ul");n.style="display:flex; flex-flow:wrap row; gap:var(--indent)",n.appendChild(v(`Type (${e.types.length})`,e.types)),n.appendChild(v(`Tag (${e.tags.size})`,[...e.tags.keys()])),n.appendChild(v(`Security (${e.secs.length})`,e.secs)),n.appendChild(v(`ThreadSafety (${e.safes.length})`,e.safes)),n.appendChild(v(`TypeCategory (${e.cats.length})`,e.cats)),t.appendChild(n),t.appendChild(S("h2",`Database tables (${e.LEN_ROWS} rows)`));for(let i of e.types){let r=e.length(i),u=document.createElement("details");u.appendChild(S("summary",`${i} (${r} rows)`));let a=document.createElement("table"),o=document.createElement("thead"),c=document.createElement("tbody");a.appendChild(o),a.appendChild(c),u.appendChild(a),a.classList.add("search-database");let f=document.createElement("tr");o.appendChild(f),f.appendChild(S("th","Row")),f.appendChild(S("th","Type"));for(let h of me[i])f.appendChild(S("th",h));if(f.appendChild(S("th","removed")),i!=="Type")for(let[h]of e.tags)f.appendChild(S("th",h));for(let h=0;h<r;h++){let d=e.row(i,h),m=document.createElement("tr");m.appendChild(S("td",h)),m.appendChild(S("td",i));for(let p of me[i]){let E=d.field(A[p]),L=document.createElement("td");E===void 0?L.classList.add("x"):we(L,E,i,d,p),m.appendChild(L)}{let p=d.removed,E=document.createElement("td");p===void 0?E.classList.add("x"):E.textContent=p?"true":"",m.appendChild(E)}if(i!=="Type")for(let[p]of e.tags){let E=d.tag(p),L=document.createElement("td");E===void 0?L.classList.add("x"):L.textContent=E?"true":"",m.appendChild(L)}c.appendChild(m)}t.appendChild(u)}let s=document.createElement("div");s.classList.add("gap"),t.appendChild(s)}).catch(function(e,n){console.log(e,n),t.appendChild(S("p",e))}))}function Pe(){let t=document.getElementById("search-data");if(!t)return;let e=t.querySelector(".replace");if(e){let n=document.createElement("button");n.textContent="Click",n.addEventListener("click",function(s){n.disabled=!0,Ie()}),e.replaceWith(n)}}var he=b.Value("SecurityIdentity"),Fe=b.Value("ShowDeprecated"),xe=b.Value("ShowNotBrowsable"),Ye=b.Value("ShowHidden"),Ue=b.Value("ShowRemoved");function Oe(t){return t.rows=t.rows.filter(function(e){let n=e.row;if(!Fe.value&&n.tag("Deprecated")||!xe.value&&n.tag("NotBrowsable")||!Ye.value&&n.tag("Hidden")||!Ue.value&&n.removed)return!1;if(he.value!=="All"){let s=!0;if(Ee(n,function(i){if(!le(he.value,i))return s=!1,!1}),!s)return!1}return!0}),t}function Be(){let t=document.getElementById("search-form");if(!t)return;let e=document.getElementById("search-input");if(!e)return;let n=document.getElementById("root-main");if(!n)return;let s=document.getElementById("focus-search");if(!s)return;let i=document.getElementById("focus-none");if(!i)return;t.classList.remove("js");let r=document.createElement("section");r.id="search-results",r.style.display="none",n.insertAdjacentElement("beforebegin",r);let u=S("h2","Search results");r.appendChild(u);function a(d){if(r.replaceChildren(u),!d){n.style.display="",r.style.display="none";return}switch(n.style.display="none",r.style.display="",!0){case typeof d=="string":r.appendChild(S("p",d));return;case d instanceof Error:r.appendChild(S("p",`Error: ${d.message}`));return}let m=document.createElement("ul");d.render(m),r.appendChild(m)}function o(d,m){if(m||=a,d.length===0){m(null);return}console.log("SEARCHING",d),m("Searching..."),ye().then(function(p){let E={expr:"or",operands:[{expr:"op",types:p.T.PRIMARY,field:A.PRIMARY,method:fe.FUZZY,args:[d]},{expr:"op",types:p.T.SECONDARY,field:A.SECONDARY,method:fe.FUZZY,args:[d]}]};m(Oe(ve(p,E)))}).catch(function(p,E){console.log(p,E),m(p)})}function c(){s.checked=!0,e.focus(),e.select()}function f(){a(null),e.blur(),i.checked=!0}document.addEventListener("keydown",function(d){if(!(d.altKey||d.ctrlKey||d.metaKey)){if(d.key==="Escape"&&e===document.activeElement){f();return}if((d.key==="s"||d.key==="S")&&e!==document.activeElement){d.preventDefault(),c();return}}}),e.addEventListener("focus",function(){c()}),s.addEventListener("change",function(){c()});for(let d of document.querySelectorAll("input[name='focused-panel']"))d!==s&&d.addEventListener("change",function(){a(null)});let h;if(e.addEventListener("input",function(){h&&clearTimeout(h),h=window.setTimeout(function(){o(e.value)},500)}),r.addEventListener("click",function(d){let m=d.target.closest("a");m!==null&&document.location.origin==m.origin&&document.location.pathname==m.pathname&&a(null)}),e.addEventListener("focus",function(){(e.value.length>0||r.style.display!=="none")&&o(e.value)}),t.addEventListener("submit",function(d){d.preventDefault();let m=r.querySelector("a");m&&(document.location.origin==m.origin&&document.location.pathname==m.pathname?(a(null),m.hash.length>0&&(document.location.hash=m.hash)):document.location=m.href)}),e.value.length>0)c(),o(e.value);else{let d=new URLSearchParams(document.location.search),m=d.get("q");m!==null&&m!==""&&o(m,function(p){if(!p||typeof p=="string")return;let E=d.get("go");if(!E&&d.get("devhub")&&(E="hub"),!E){a(p);return}let L=p.rows[0];if(!L)return;let C=_(L.row,E,"simple");if(C.href===""){a(p);return}document.location=C.href})}}new Promise(t=>{document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}).then(()=>{Pe(),Be()});function He(t){let e=t.target.closest(".update");if(e===null)return;let n=e.querySelector(".change-list");n!==null&&(n.style.display==="none"?n.style.display="":n.style.display="none")}function se(t,e){let n;for(let s of document.querySelectorAll("#update-list > li .change-list")){let i=s.parentElement.querySelector(":target");i!==null&&(n=i),t||i!==null?s.style.display="":s.style.display="none"}e&&n!==void 0&&n.scrollIntoView(!0)}new Promise(t=>{document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}).then(()=>{if(!document.body.matches(".type-updates"))return;new Promise(n=>{document.readyState==="complete"?n():window.addEventListener("load",n)}).then(()=>{let n=document.createElement("style");n.innerHTML=".change-list-toggle {cursor: pointer}",document.head.appendChild(n)});for(let n of document.querySelectorAll(".expand-all-changes"))n.classList.remove("js");for(let n of document.querySelectorAll("#update-list > li .change-list-toggle"))n.addEventListener("click",He);let t=document.getElementById("expand-all");t!==null?(t.addEventListener("click",function(n){se(n.target.checked,!1)}),se(t.checked,!0)):se(!1,!0);let e=document.location.hash.slice(1);if(e!==""){let n=document.getElementById(e);if(n){let s=n.closest(".change-list");if(s){s.style.display="",n.scrollIntoView(!0);return}if(s=n.querySelector(".change-list"),s){s.style.display="",n.scrollIntoView(!0);return}}}for(let n of document.querySelectorAll("#update-list .update")){let s=n.querySelector(".change-list");if(s!==null&&(s.style.display="",s.querySelector(".no-changes")===null))break}});function Se(t){for(;t.lastChild;)t.removeChild(t.lastChild)}function Qe(t,e,n){Se(t);for(let s of n)s[1].appendChild(s[0])}function De(t,e,n){Se(t);for(let s of e)s[2]?t.appendChild(s[0]):s[0].remove()}new Promise(t=>{document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}).then(()=>{for(let t of document.getElementsByClassName("class-sort")){let e=t.closest(".class-container");if(!e)continue;let n=e.querySelector(".class-tree");if(!n)continue;let s=t.querySelectorAll("label");t.classList.remove("js");let i=!!t.closest("#removed-classes"),r=[],u=[];for(let o of n.querySelectorAll("li")){let f=o.querySelector(".entity-link").textContent.trim();r.push([o,f,!i||o.matches(":scope:has(> .removed)")]),u.push([o,o.parentNode])}r.sort(function(o,c){return o[1].localeCompare(c[1])});let a={Tree:Qe,Name:De};for(let o of s){let c=document.getElementById(o.htmlFor);if(!c)continue;let f=a[c.value];if(!f)continue;let h=function(d){f(n,r,u)};c.addEventListener("click",h),c.checked&&h()}}});var ie=new Promise(t=>{document.readyState==="complete"?t():window.addEventListener("load",t)}).then(()=>{let t=new Map;for(let e of document.styleSheets)for(let n of e.cssRules){if(!(n instanceof CSSMediaRule))continue;let s=n.cssRules.item(0);!s||!s.selectorText.startsWith("#LAYOUT_")||t.set(s.selectorText.replace("#LAYOUT_",""),window.matchMedia(n.conditionText))}return t});new Promise(t=>{document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t()}).then(()=>{let t=document.body;if(t.matches(".kind-home, .kind-section")&&(l.QuickLink("#present-classes > header .element-count","#present-classes > .class-tree",["Count","li > .entity-link"]),l.QuickLink("#removed-classes > header .element-count","#removed-classes > .class-tree",["Count","li > .entity-link.set.removed"]),l.QuickLink("#removed-classes","#removed-classes > .class-tree",["HideIfZero",">*"]),l.QuickLink("#present-enums > header .element-count","#present-enums > .enum-list",["Count",">*"]),l.QuickLink("#removed-enums > header .element-count","#removed-enums > .enum-list",["Count",">*"]),l.QuickLink("#removed-enums","#removed-enums > .enum-list",["HideIfZero",">*"])),t.matches(".kind-page.type-class")){l.QuickLink("#toc-superclasses","#superclasses > ul",["HideIfZero",">*"]),l.QuickLink("#superclasses","#superclasses > ul",["HideIfZero",">*"]),l.QuickLink("#superclasses > header .element-count","#superclasses > ul",["Count",">*"]),l.QuickLink("#toc-subclasses","#subclasses > ul",["HideIfZero",">*"]),l.QuickLink("#subclasses","#subclasses > ul",["HideIfZero",">*"]),l.QuickLink("#subclasses > header .element-count","#subclasses > ul",["Count",">*"]),l.QuickLink("#toc-sibclasses","#sibclasses > ul",["HideIfZero",">*"]),l.QuickLink("#sibclasses","#sibclasses > ul",["HideIfZero",">*"]),l.QuickLink("#sibclasses > header .element-count","#sibclasses > ul",["Count",">*"]),l.QuickLink("#toc-hierarchy","#toc-hierarchy > ol",["HideIfZero",">*"]),l.QuickLink("#hierarchy","#hierarchy",["HideIfZero",">*"]),l.QuickLink("#members-index > header .element-count","#members-index > .index-card > tbody:first-of-type",["Count",">:not(.empty)"]);for(let n of document.querySelectorAll("#members-index thead.inherited-members")){let s=n.nextElementSibling;s.matches("tbody")&&(l.Link(n,!1,["HideIfZero",s,">:not(.empty)"]),l.Link(s,!1,["HideIfZero",s,">:not(.empty)"]),l.Link(n.querySelector(".element-count"),!1,["Count",s,">:not(.empty)"]))}l.QuickLink("#toc-removed-members-index","#removed-members-index > .index-card > tbody:first-of-type",["HideIfZero",">:not(.empty)"]),l.QuickLink("#removed-members-index","#removed-members-index > .index-card > tbody:first-of-type",["HideIfZero",">:not(.empty)"]),l.QuickLink("#removed-members-index > header .element-count","#removed-members-index > .index-card > tbody:first-of-type",["Count",">:not(.empty)"]),l.QuickLink("#history > header .element-count","#history > ul",["Count",">*"]);let e=document.querySelector("#history > header .element-count");document.querySelector("#history input.filter-input").addEventListener("change",function(){l.Update(e)}),l.QuickLink("#toc-members","#toc-members > ol",["HideIfZero",">*"]),l.QuickLink("#members","#members > .members-sections",["HideIfZero",">*"]),l.QuickLink("#members > header .element-count","#members-index > .index-card > tbody:first-of-type",["Count",">:not(.empty)"]),l.QuickLink("#toc-removed-members","#toc-removed-members > ol",["HideIfZero",">*"]),l.QuickLink("#removed-members","#removed-members > .members-sections",["HideIfZero",">*"]),l.QuickLink("#removed-members > header .element-count","#removed-members-index > .index-card > tbody:first-of-type",["Count",">:not(.empty)"]),l.QuickLink("#toc-references","#toc-references > ol",["HideIfZero",">*"]),l.QuickLink("#toc-related-classes","#related-classes > ul",["HideIfZero",">*"]),l.QuickLink("#related-classes","#related-classes > ul",["HideIfZero",">*"]),l.QuickLink("#related-classes > header .element-count","#related-classes > ul",["Count",">*"]),l.QuickLink("#toc-related-members","#related-members > ul",["HideIfZero",">*"]),l.QuickLink("#related-members","#related-members > ul",["HideIfZero",">*"]),l.QuickLink("#related-members > header .element-count","#related-members > ul",["Count",">*"]),l.QuickLink("#toc-related-enums","#related-enums > ul",["HideIfZero",">*"]),l.QuickLink("#related-enums","#related-enums > ul",["HideIfZero",">*"]),l.QuickLink("#related-enums > header .element-count","#related-enums > ul",["Count",">*"]),l.QuickLink("#toc-related-types","#related-types > ul",["HideIfZero",">*"]),l.QuickLink("#related-types","#related-types > ul",["HideIfZero",">*"]),l.QuickLink("#related-types > header .element-count","#related-types > ul",["Count",">*"])}if(t.matches(".kind-page.type-enum")){l.QuickLink("#members-index > header .element-count","#members-index > .index-card > tbody:first-of-type",["Count",">:not(.empty)"]),l.QuickLink("#toc-removed-members-index","#removed-members-index > .index-card > tbody:first-of-type",["HideIfZero",">:not(.empty)"]),l.QuickLink("#removed-members-index","#removed-members-index > .index-card > tbody:first-of-type",["HideIfZero",">:not(.empty)"]),l.QuickLink("#removed-members-index > header .element-count","#removed-members-index > .index-card > tbody:first-of-type",["Count",">:not(.empty)"]),l.QuickLink("#history > header .element-count","#history > ul",["Count",">*"]);let e=document.querySelector("#history > header .element-count");document.querySelector("#history input.filter-input").addEventListener("change",function(){l.Update(e)}),l.QuickLink("#toc-references","#related-members > ul",["HideIfZero",">*"]),l.QuickLink("#related-members","#related-members > ul",["HideIfZero",">*"]),l.QuickLink("#related-members > header .element-count","#related-members > ul",["Count",">*"])}t.matches(".kind-page.type-type")&&(l.QuickLink("#related-members","#related-members > ul",["HideIfZero",">*"]),l.QuickLink("#related-members > header .element-count","#related-members > ul",["Count",">*"]))});ie.then(t=>{let e=t.get("small");if(!e)return;let n=document.getElementById("focus-none");if(!n)return;function s(r){if(!e.matches||!(r.target instanceof HTMLAnchorElement))return;let u=window.location,a=new URL(r.target.href);a.origin!==u.origin||a.pathname!==u.pathname||(n.checked=!0)}function i(r){let u=document.getElementById(r);if(u){let a=u.querySelector(":scope > section");a&&a.addEventListener("click",s)}}i("nav-panel")});ie.then(t=>{let e=t.get("standard");if(!e)return;let n=document.getElementById("focus-settings"),s=document.getElementById("focus-none");s&&e.addEventListener("change",i=>{i.matches&&(n&&n.checked||(s.checked=!0))})});})();
