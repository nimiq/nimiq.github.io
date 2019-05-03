require=function e(t,i,r){function f(d,a){if(!i[d]){if(!t[d]){var s="function"==typeof require&&require;if(!a&&s)return s(d,!0);if(n)return n(d,!0);var h=new Error("Cannot find module '"+d+"'");throw h.code="MODULE_NOT_FOUND",h}var c=i[d]={exports:{}};t[d][0].call(c.exports,function(e){var i=t[d][1][e];return f(i||e)},c,c.exports,e,t,i,r)}return i[d].exports}for(var n="function"==typeof require&&require,d=0;d<r.length;d++)f(r[d]);return f}({1:[function(e,t,i){!function(t,i){"use strict";function r(e,t){if(!e)throw new Error(t||"Assertion failed")}function f(e,t){e.super_=t;var i=function(){};i.prototype=t.prototype,e.prototype=new i,e.prototype.constructor=e}function n(e,t,i){if(n.isBN(e))return e;this.negative=0,this.words=null,this.length=0,this.red=null,null!==e&&("le"!==t&&"be"!==t||(i=t,t=10),this._init(e||0,t||10,i||"be"))}function d(e,t,i){for(var r=0,f=Math.min(e.length,i),n=t;n<f;n++){var d=e.charCodeAt(n)-48;r<<=4,r|=d>=49&&d<=54?d-49+10:d>=17&&d<=22?d-17+10:15&d}return r}function a(e,t,i,r){for(var f=0,n=Math.min(e.length,i),d=t;d<n;d++){var a=e.charCodeAt(d)-48;f*=r,f+=a>=49?a-49+10:a>=17?a-17+10:a}return f}function s(e){for(var t=new Array(e.bitLength()),i=0;i<t.length;i++){var r=i/26|0,f=i%26;t[i]=(e.words[r]&1<<f)>>>f}return t}function h(e,t,i){i.negative=t.negative^e.negative;var r=e.length+t.length|0;i.length=r,r=r-1|0;var f=0|e.words[0],n=0|t.words[0],d=f*n,a=67108863&d,s=d/67108864|0;i.words[0]=a;for(var h=1;h<r;h++){for(var c=s>>>26,o=67108863&s,u=Math.min(h,t.length-1),b=Math.max(0,h-e.length+1);b<=u;b++){var l=h-b|0;c+=(d=(f=0|e.words[l])*(n=0|t.words[b])+o)/67108864|0,o=67108863&d}i.words[h]=0|o,s=0|c}return 0!==s?i.words[h]=0|s:i.length--,i.strip()}function c(e,t,i){i.negative=t.negative^e.negative,i.length=e.length+t.length;for(var r=0,f=0,n=0;n<i.length-1;n++){var d=f;f=0;for(var a=67108863&r,s=Math.min(n,t.length-1),h=Math.max(0,n-e.length+1);h<=s;h++){var c=n-h,o=(0|e.words[c])*(0|t.words[h]),u=67108863&o;a=67108863&(u=u+a|0),f+=(d=(d=d+(o/67108864|0)|0)+(u>>>26)|0)>>>26,d&=67108863}i.words[n]=a,r=d,d=f}return 0!==r?i.words[n]=r:i.length--,i.strip()}function o(e,t,i){return(new u).mulp(e,t,i)}function u(e,t){this.x=e,this.y=t}function b(e,t){this.name=e,this.p=new n(t,16),this.n=this.p.bitLength(),this.k=new n(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function l(){b.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function p(){b.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function m(){b.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function v(){b.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function g(e){if("string"==typeof e){var t=n._prime(e);this.m=t.p,this.prime=t}else r(e.gtn(1),"modulus must be greater than 1"),this.m=e,this.prime=null}function y(e){g.call(this,e),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new n(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}"object"==typeof t?t.exports=n:i.BN=n,n.BN=n,n.wordSize=26;var M;try{M=e("buffer").Buffer}catch(e){}n.isBN=function(e){return e instanceof n||null!==e&&"object"==typeof e&&e.constructor.wordSize===n.wordSize&&Array.isArray(e.words)},n.max=function(e,t){return e.cmp(t)>0?e:t},n.min=function(e,t){return e.cmp(t)<0?e:t},n.prototype._init=function(e,t,i){if("number"==typeof e)return this._initNumber(e,t,i);if("object"==typeof e)return this._initArray(e,t,i);"hex"===t&&(t=16),r(t===(0|t)&&t>=2&&t<=36);var f=0;"-"===(e=e.toString().replace(/\s+/g,""))[0]&&f++,16===t?this._parseHex(e,f):this._parseBase(e,t,f),"-"===e[0]&&(this.negative=1),this.strip(),"le"===i&&this._initArray(this.toArray(),t,i)},n.prototype._initNumber=function(e,t,i){e<0&&(this.negative=1,e=-e),e<67108864?(this.words=[67108863&e],this.length=1):e<4503599627370496?(this.words=[67108863&e,e/67108864&67108863],this.length=2):(r(e<9007199254740992),this.words=[67108863&e,e/67108864&67108863,1],this.length=3),"le"===i&&this._initArray(this.toArray(),t,i)},n.prototype._initArray=function(e,t,i){if(r("number"==typeof e.length),e.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(e.length/3),this.words=new Array(this.length);for(var f=0;f<this.length;f++)this.words[f]=0;var n,d,a=0;if("be"===i)for(f=e.length-1,n=0;f>=0;f-=3)d=e[f]|e[f-1]<<8|e[f-2]<<16,this.words[n]|=d<<a&67108863,this.words[n+1]=d>>>26-a&67108863,(a+=24)>=26&&(a-=26,n++);else if("le"===i)for(f=0,n=0;f<e.length;f+=3)d=e[f]|e[f+1]<<8|e[f+2]<<16,this.words[n]|=d<<a&67108863,this.words[n+1]=d>>>26-a&67108863,(a+=24)>=26&&(a-=26,n++);return this.strip()},n.prototype._parseHex=function(e,t){this.length=Math.ceil((e.length-t)/6),this.words=new Array(this.length);for(var i=0;i<this.length;i++)this.words[i]=0;var r,f,n=0;for(i=e.length-6,r=0;i>=t;i-=6)f=d(e,i,i+6),this.words[r]|=f<<n&67108863,this.words[r+1]|=f>>>26-n&4194303,(n+=24)>=26&&(n-=26,r++);i+6!==t&&(f=d(e,t,i+6),this.words[r]|=f<<n&67108863,this.words[r+1]|=f>>>26-n&4194303),this.strip()},n.prototype._parseBase=function(e,t,i){this.words=[0],this.length=1;for(var r=0,f=1;f<=67108863;f*=t)r++;r--,f=f/t|0;for(var n=e.length-i,d=n%r,s=Math.min(n,n-d)+i,h=0,c=i;c<s;c+=r)h=a(e,c,c+r,t),this.imuln(f),this.words[0]+h<67108864?this.words[0]+=h:this._iaddn(h);if(0!==d){var o=1;for(h=a(e,c,e.length,t),c=0;c<d;c++)o*=t;this.imuln(o),this.words[0]+h<67108864?this.words[0]+=h:this._iaddn(h)}},n.prototype.copy=function(e){e.words=new Array(this.length);for(var t=0;t<this.length;t++)e.words[t]=this.words[t];e.length=this.length,e.negative=this.negative,e.red=this.red},n.prototype.clone=function(){var e=new n(null);return this.copy(e),e},n.prototype._expand=function(e){for(;this.length<e;)this.words[this.length++]=0;return this},n.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},n.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},n.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var w=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],S=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],_=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];n.prototype.toString=function(e,t){e=e||10,t=0|t||1;var i;if(16===e||"hex"===e){i="";for(var f=0,n=0,d=0;d<this.length;d++){var a=this.words[d],s=(16777215&(a<<f|n)).toString(16);i=0!==(n=a>>>24-f&16777215)||d!==this.length-1?w[6-s.length]+s+i:s+i,(f+=2)>=26&&(f-=26,d--)}for(0!==n&&(i=n.toString(16)+i);i.length%t!=0;)i="0"+i;return 0!==this.negative&&(i="-"+i),i}if(e===(0|e)&&e>=2&&e<=36){var h=S[e],c=_[e];i="";var o=this.clone();for(o.negative=0;!o.isZero();){var u=o.modn(c).toString(e);i=(o=o.idivn(c)).isZero()?u+i:w[h-u.length]+u+i}for(this.isZero()&&(i="0"+i);i.length%t!=0;)i="0"+i;return 0!==this.negative&&(i="-"+i),i}r(!1,"Base should be between 2 and 36")},n.prototype.toNumber=function(){var e=this.words[0];return 2===this.length?e+=67108864*this.words[1]:3===this.length&&1===this.words[2]?e+=4503599627370496+67108864*this.words[1]:this.length>2&&r(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-e:e},n.prototype.toJSON=function(){return this.toString(16)},n.prototype.toBuffer=function(e,t){return r(void 0!==M),this.toArrayLike(M,e,t)},n.prototype.toArray=function(e,t){return this.toArrayLike(Array,e,t)},n.prototype.toArrayLike=function(e,t,i){var f=this.byteLength(),n=i||Math.max(1,f);r(f<=n,"byte array longer than desired length"),r(n>0,"Requested array length <= 0"),this.strip();var d,a,s="le"===t,h=new e(n),c=this.clone();if(s){for(a=0;!c.isZero();a++)d=c.andln(255),c.iushrn(8),h[a]=d;for(;a<n;a++)h[a]=0}else{for(a=0;a<n-f;a++)h[a]=0;for(a=0;!c.isZero();a++)d=c.andln(255),c.iushrn(8),h[n-a-1]=d}return h},Math.clz32?n.prototype._countBits=function(e){return 32-Math.clz32(e)}:n.prototype._countBits=function(e){var t=e,i=0;return t>=4096&&(i+=13,t>>>=13),t>=64&&(i+=7,t>>>=7),t>=8&&(i+=4,t>>>=4),t>=2&&(i+=2,t>>>=2),i+t},n.prototype._zeroBits=function(e){if(0===e)return 26;var t=e,i=0;return 0==(8191&t)&&(i+=13,t>>>=13),0==(127&t)&&(i+=7,t>>>=7),0==(15&t)&&(i+=4,t>>>=4),0==(3&t)&&(i+=2,t>>>=2),0==(1&t)&&i++,i},n.prototype.bitLength=function(){var e=this.words[this.length-1],t=this._countBits(e);return 26*(this.length-1)+t},n.prototype.zeroBits=function(){if(this.isZero())return 0;for(var e=0,t=0;t<this.length;t++){var i=this._zeroBits(this.words[t]);if(e+=i,26!==i)break}return e},n.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},n.prototype.toTwos=function(e){return 0!==this.negative?this.abs().inotn(e).iaddn(1):this.clone()},n.prototype.fromTwos=function(e){return this.testn(e-1)?this.notn(e).iaddn(1).ineg():this.clone()},n.prototype.isNeg=function(){return 0!==this.negative},n.prototype.neg=function(){return this.clone().ineg()},n.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},n.prototype.iuor=function(e){for(;this.length<e.length;)this.words[this.length++]=0;for(var t=0;t<e.length;t++)this.words[t]=this.words[t]|e.words[t];return this.strip()},n.prototype.ior=function(e){return r(0==(this.negative|e.negative)),this.iuor(e)},n.prototype.or=function(e){return this.length>e.length?this.clone().ior(e):e.clone().ior(this)},n.prototype.uor=function(e){return this.length>e.length?this.clone().iuor(e):e.clone().iuor(this)},n.prototype.iuand=function(e){var t;t=this.length>e.length?e:this;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]&e.words[i];return this.length=t.length,this.strip()},n.prototype.iand=function(e){return r(0==(this.negative|e.negative)),this.iuand(e)},n.prototype.and=function(e){return this.length>e.length?this.clone().iand(e):e.clone().iand(this)},n.prototype.uand=function(e){return this.length>e.length?this.clone().iuand(e):e.clone().iuand(this)},n.prototype.iuxor=function(e){var t,i;this.length>e.length?(t=this,i=e):(t=e,i=this);for(var r=0;r<i.length;r++)this.words[r]=t.words[r]^i.words[r];if(this!==t)for(;r<t.length;r++)this.words[r]=t.words[r];return this.length=t.length,this.strip()},n.prototype.ixor=function(e){return r(0==(this.negative|e.negative)),this.iuxor(e)},n.prototype.xor=function(e){return this.length>e.length?this.clone().ixor(e):e.clone().ixor(this)},n.prototype.uxor=function(e){return this.length>e.length?this.clone().iuxor(e):e.clone().iuxor(this)},n.prototype.inotn=function(e){r("number"==typeof e&&e>=0);var t=0|Math.ceil(e/26),i=e%26;this._expand(t),i>0&&t--;for(var f=0;f<t;f++)this.words[f]=67108863&~this.words[f];return i>0&&(this.words[f]=~this.words[f]&67108863>>26-i),this.strip()},n.prototype.notn=function(e){return this.clone().inotn(e)},n.prototype.setn=function(e,t){r("number"==typeof e&&e>=0);var i=e/26|0,f=e%26;return this._expand(i+1),this.words[i]=t?this.words[i]|1<<f:this.words[i]&~(1<<f),this.strip()},n.prototype.iadd=function(e){var t;if(0!==this.negative&&0===e.negative)return this.negative=0,t=this.isub(e),this.negative^=1,this._normSign();if(0===this.negative&&0!==e.negative)return e.negative=0,t=this.isub(e),e.negative=1,t._normSign();var i,r;this.length>e.length?(i=this,r=e):(i=e,r=this);for(var f=0,n=0;n<r.length;n++)t=(0|i.words[n])+(0|r.words[n])+f,this.words[n]=67108863&t,f=t>>>26;for(;0!==f&&n<i.length;n++)t=(0|i.words[n])+f,this.words[n]=67108863&t,f=t>>>26;if(this.length=i.length,0!==f)this.words[this.length]=f,this.length++;else if(i!==this)for(;n<i.length;n++)this.words[n]=i.words[n];return this},n.prototype.add=function(e){var t;return 0!==e.negative&&0===this.negative?(e.negative=0,t=this.sub(e),e.negative^=1,t):0===e.negative&&0!==this.negative?(this.negative=0,t=e.sub(this),this.negative=1,t):this.length>e.length?this.clone().iadd(e):e.clone().iadd(this)},n.prototype.isub=function(e){if(0!==e.negative){e.negative=0;var t=this.iadd(e);return e.negative=1,t._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(e),this.negative=1,this._normSign();var i=this.cmp(e);if(0===i)return this.negative=0,this.length=1,this.words[0]=0,this;var r,f;i>0?(r=this,f=e):(r=e,f=this);for(var n=0,d=0;d<f.length;d++)n=(t=(0|r.words[d])-(0|f.words[d])+n)>>26,this.words[d]=67108863&t;for(;0!==n&&d<r.length;d++)n=(t=(0|r.words[d])+n)>>26,this.words[d]=67108863&t;if(0===n&&d<r.length&&r!==this)for(;d<r.length;d++)this.words[d]=r.words[d];return this.length=Math.max(this.length,d),r!==this&&(this.negative=1),this.strip()},n.prototype.sub=function(e){return this.clone().isub(e)};var A=function(e,t,i){var r,f,n,d=e.words,a=t.words,s=i.words,h=0,c=0|d[0],o=8191&c,u=c>>>13,b=0|d[1],l=8191&b,p=b>>>13,m=0|d[2],v=8191&m,g=m>>>13,y=0|d[3],M=8191&y,w=y>>>13,S=0|d[4],_=8191&S,A=S>>>13,x=0|d[5],I=8191&x,z=x>>>13,q=0|d[6],k=8191&q,R=q>>>13,P=0|d[7],j=8191&P,L=P>>>13,E=0|d[8],N=8191&E,B=E>>>13,O=0|d[9],F=8191&O,T=O>>>13,C=0|a[0],H=8191&C,Z=C>>>13,J=0|a[1],D=8191&J,U=J>>>13,X=0|a[2],K=8191&X,V=X>>>13,W=0|a[3],Y=8191&W,G=W>>>13,Q=0|a[4],$=8191&Q,ee=Q>>>13,te=0|a[5],ie=8191&te,re=te>>>13,fe=0|a[6],ne=8191&fe,de=fe>>>13,ae=0|a[7],se=8191&ae,he=ae>>>13,ce=0|a[8],oe=8191&ce,ue=ce>>>13,be=0|a[9],le=8191&be,pe=be>>>13;i.negative=e.negative^t.negative,i.length=19;var me=(h+(r=Math.imul(o,H))|0)+((8191&(f=(f=Math.imul(o,Z))+Math.imul(u,H)|0))<<13)|0;h=((n=Math.imul(u,Z))+(f>>>13)|0)+(me>>>26)|0,me&=67108863,r=Math.imul(l,H),f=(f=Math.imul(l,Z))+Math.imul(p,H)|0,n=Math.imul(p,Z);var ve=(h+(r=r+Math.imul(o,D)|0)|0)+((8191&(f=(f=f+Math.imul(o,U)|0)+Math.imul(u,D)|0))<<13)|0;h=((n=n+Math.imul(u,U)|0)+(f>>>13)|0)+(ve>>>26)|0,ve&=67108863,r=Math.imul(v,H),f=(f=Math.imul(v,Z))+Math.imul(g,H)|0,n=Math.imul(g,Z),r=r+Math.imul(l,D)|0,f=(f=f+Math.imul(l,U)|0)+Math.imul(p,D)|0,n=n+Math.imul(p,U)|0;var ge=(h+(r=r+Math.imul(o,K)|0)|0)+((8191&(f=(f=f+Math.imul(o,V)|0)+Math.imul(u,K)|0))<<13)|0;h=((n=n+Math.imul(u,V)|0)+(f>>>13)|0)+(ge>>>26)|0,ge&=67108863,r=Math.imul(M,H),f=(f=Math.imul(M,Z))+Math.imul(w,H)|0,n=Math.imul(w,Z),r=r+Math.imul(v,D)|0,f=(f=f+Math.imul(v,U)|0)+Math.imul(g,D)|0,n=n+Math.imul(g,U)|0,r=r+Math.imul(l,K)|0,f=(f=f+Math.imul(l,V)|0)+Math.imul(p,K)|0,n=n+Math.imul(p,V)|0;var ye=(h+(r=r+Math.imul(o,Y)|0)|0)+((8191&(f=(f=f+Math.imul(o,G)|0)+Math.imul(u,Y)|0))<<13)|0;h=((n=n+Math.imul(u,G)|0)+(f>>>13)|0)+(ye>>>26)|0,ye&=67108863,r=Math.imul(_,H),f=(f=Math.imul(_,Z))+Math.imul(A,H)|0,n=Math.imul(A,Z),r=r+Math.imul(M,D)|0,f=(f=f+Math.imul(M,U)|0)+Math.imul(w,D)|0,n=n+Math.imul(w,U)|0,r=r+Math.imul(v,K)|0,f=(f=f+Math.imul(v,V)|0)+Math.imul(g,K)|0,n=n+Math.imul(g,V)|0,r=r+Math.imul(l,Y)|0,f=(f=f+Math.imul(l,G)|0)+Math.imul(p,Y)|0,n=n+Math.imul(p,G)|0;var Me=(h+(r=r+Math.imul(o,$)|0)|0)+((8191&(f=(f=f+Math.imul(o,ee)|0)+Math.imul(u,$)|0))<<13)|0;h=((n=n+Math.imul(u,ee)|0)+(f>>>13)|0)+(Me>>>26)|0,Me&=67108863,r=Math.imul(I,H),f=(f=Math.imul(I,Z))+Math.imul(z,H)|0,n=Math.imul(z,Z),r=r+Math.imul(_,D)|0,f=(f=f+Math.imul(_,U)|0)+Math.imul(A,D)|0,n=n+Math.imul(A,U)|0,r=r+Math.imul(M,K)|0,f=(f=f+Math.imul(M,V)|0)+Math.imul(w,K)|0,n=n+Math.imul(w,V)|0,r=r+Math.imul(v,Y)|0,f=(f=f+Math.imul(v,G)|0)+Math.imul(g,Y)|0,n=n+Math.imul(g,G)|0,r=r+Math.imul(l,$)|0,f=(f=f+Math.imul(l,ee)|0)+Math.imul(p,$)|0,n=n+Math.imul(p,ee)|0;var we=(h+(r=r+Math.imul(o,ie)|0)|0)+((8191&(f=(f=f+Math.imul(o,re)|0)+Math.imul(u,ie)|0))<<13)|0;h=((n=n+Math.imul(u,re)|0)+(f>>>13)|0)+(we>>>26)|0,we&=67108863,r=Math.imul(k,H),f=(f=Math.imul(k,Z))+Math.imul(R,H)|0,n=Math.imul(R,Z),r=r+Math.imul(I,D)|0,f=(f=f+Math.imul(I,U)|0)+Math.imul(z,D)|0,n=n+Math.imul(z,U)|0,r=r+Math.imul(_,K)|0,f=(f=f+Math.imul(_,V)|0)+Math.imul(A,K)|0,n=n+Math.imul(A,V)|0,r=r+Math.imul(M,Y)|0,f=(f=f+Math.imul(M,G)|0)+Math.imul(w,Y)|0,n=n+Math.imul(w,G)|0,r=r+Math.imul(v,$)|0,f=(f=f+Math.imul(v,ee)|0)+Math.imul(g,$)|0,n=n+Math.imul(g,ee)|0,r=r+Math.imul(l,ie)|0,f=(f=f+Math.imul(l,re)|0)+Math.imul(p,ie)|0,n=n+Math.imul(p,re)|0;var Se=(h+(r=r+Math.imul(o,ne)|0)|0)+((8191&(f=(f=f+Math.imul(o,de)|0)+Math.imul(u,ne)|0))<<13)|0;h=((n=n+Math.imul(u,de)|0)+(f>>>13)|0)+(Se>>>26)|0,Se&=67108863,r=Math.imul(j,H),f=(f=Math.imul(j,Z))+Math.imul(L,H)|0,n=Math.imul(L,Z),r=r+Math.imul(k,D)|0,f=(f=f+Math.imul(k,U)|0)+Math.imul(R,D)|0,n=n+Math.imul(R,U)|0,r=r+Math.imul(I,K)|0,f=(f=f+Math.imul(I,V)|0)+Math.imul(z,K)|0,n=n+Math.imul(z,V)|0,r=r+Math.imul(_,Y)|0,f=(f=f+Math.imul(_,G)|0)+Math.imul(A,Y)|0,n=n+Math.imul(A,G)|0,r=r+Math.imul(M,$)|0,f=(f=f+Math.imul(M,ee)|0)+Math.imul(w,$)|0,n=n+Math.imul(w,ee)|0,r=r+Math.imul(v,ie)|0,f=(f=f+Math.imul(v,re)|0)+Math.imul(g,ie)|0,n=n+Math.imul(g,re)|0,r=r+Math.imul(l,ne)|0,f=(f=f+Math.imul(l,de)|0)+Math.imul(p,ne)|0,n=n+Math.imul(p,de)|0;var _e=(h+(r=r+Math.imul(o,se)|0)|0)+((8191&(f=(f=f+Math.imul(o,he)|0)+Math.imul(u,se)|0))<<13)|0;h=((n=n+Math.imul(u,he)|0)+(f>>>13)|0)+(_e>>>26)|0,_e&=67108863,r=Math.imul(N,H),f=(f=Math.imul(N,Z))+Math.imul(B,H)|0,n=Math.imul(B,Z),r=r+Math.imul(j,D)|0,f=(f=f+Math.imul(j,U)|0)+Math.imul(L,D)|0,n=n+Math.imul(L,U)|0,r=r+Math.imul(k,K)|0,f=(f=f+Math.imul(k,V)|0)+Math.imul(R,K)|0,n=n+Math.imul(R,V)|0,r=r+Math.imul(I,Y)|0,f=(f=f+Math.imul(I,G)|0)+Math.imul(z,Y)|0,n=n+Math.imul(z,G)|0,r=r+Math.imul(_,$)|0,f=(f=f+Math.imul(_,ee)|0)+Math.imul(A,$)|0,n=n+Math.imul(A,ee)|0,r=r+Math.imul(M,ie)|0,f=(f=f+Math.imul(M,re)|0)+Math.imul(w,ie)|0,n=n+Math.imul(w,re)|0,r=r+Math.imul(v,ne)|0,f=(f=f+Math.imul(v,de)|0)+Math.imul(g,ne)|0,n=n+Math.imul(g,de)|0,r=r+Math.imul(l,se)|0,f=(f=f+Math.imul(l,he)|0)+Math.imul(p,se)|0,n=n+Math.imul(p,he)|0;var Ae=(h+(r=r+Math.imul(o,oe)|0)|0)+((8191&(f=(f=f+Math.imul(o,ue)|0)+Math.imul(u,oe)|0))<<13)|0;h=((n=n+Math.imul(u,ue)|0)+(f>>>13)|0)+(Ae>>>26)|0,Ae&=67108863,r=Math.imul(F,H),f=(f=Math.imul(F,Z))+Math.imul(T,H)|0,n=Math.imul(T,Z),r=r+Math.imul(N,D)|0,f=(f=f+Math.imul(N,U)|0)+Math.imul(B,D)|0,n=n+Math.imul(B,U)|0,r=r+Math.imul(j,K)|0,f=(f=f+Math.imul(j,V)|0)+Math.imul(L,K)|0,n=n+Math.imul(L,V)|0,r=r+Math.imul(k,Y)|0,f=(f=f+Math.imul(k,G)|0)+Math.imul(R,Y)|0,n=n+Math.imul(R,G)|0,r=r+Math.imul(I,$)|0,f=(f=f+Math.imul(I,ee)|0)+Math.imul(z,$)|0,n=n+Math.imul(z,ee)|0,r=r+Math.imul(_,ie)|0,f=(f=f+Math.imul(_,re)|0)+Math.imul(A,ie)|0,n=n+Math.imul(A,re)|0,r=r+Math.imul(M,ne)|0,f=(f=f+Math.imul(M,de)|0)+Math.imul(w,ne)|0,n=n+Math.imul(w,de)|0,r=r+Math.imul(v,se)|0,f=(f=f+Math.imul(v,he)|0)+Math.imul(g,se)|0,n=n+Math.imul(g,he)|0,r=r+Math.imul(l,oe)|0,f=(f=f+Math.imul(l,ue)|0)+Math.imul(p,oe)|0,n=n+Math.imul(p,ue)|0;var xe=(h+(r=r+Math.imul(o,le)|0)|0)+((8191&(f=(f=f+Math.imul(o,pe)|0)+Math.imul(u,le)|0))<<13)|0;h=((n=n+Math.imul(u,pe)|0)+(f>>>13)|0)+(xe>>>26)|0,xe&=67108863,r=Math.imul(F,D),f=(f=Math.imul(F,U))+Math.imul(T,D)|0,n=Math.imul(T,U),r=r+Math.imul(N,K)|0,f=(f=f+Math.imul(N,V)|0)+Math.imul(B,K)|0,n=n+Math.imul(B,V)|0,r=r+Math.imul(j,Y)|0,f=(f=f+Math.imul(j,G)|0)+Math.imul(L,Y)|0,n=n+Math.imul(L,G)|0,r=r+Math.imul(k,$)|0,f=(f=f+Math.imul(k,ee)|0)+Math.imul(R,$)|0,n=n+Math.imul(R,ee)|0,r=r+Math.imul(I,ie)|0,f=(f=f+Math.imul(I,re)|0)+Math.imul(z,ie)|0,n=n+Math.imul(z,re)|0,r=r+Math.imul(_,ne)|0,f=(f=f+Math.imul(_,de)|0)+Math.imul(A,ne)|0,n=n+Math.imul(A,de)|0,r=r+Math.imul(M,se)|0,f=(f=f+Math.imul(M,he)|0)+Math.imul(w,se)|0,n=n+Math.imul(w,he)|0,r=r+Math.imul(v,oe)|0,f=(f=f+Math.imul(v,ue)|0)+Math.imul(g,oe)|0,n=n+Math.imul(g,ue)|0;var Ie=(h+(r=r+Math.imul(l,le)|0)|0)+((8191&(f=(f=f+Math.imul(l,pe)|0)+Math.imul(p,le)|0))<<13)|0;h=((n=n+Math.imul(p,pe)|0)+(f>>>13)|0)+(Ie>>>26)|0,Ie&=67108863,r=Math.imul(F,K),f=(f=Math.imul(F,V))+Math.imul(T,K)|0,n=Math.imul(T,V),r=r+Math.imul(N,Y)|0,f=(f=f+Math.imul(N,G)|0)+Math.imul(B,Y)|0,n=n+Math.imul(B,G)|0,r=r+Math.imul(j,$)|0,f=(f=f+Math.imul(j,ee)|0)+Math.imul(L,$)|0,n=n+Math.imul(L,ee)|0,r=r+Math.imul(k,ie)|0,f=(f=f+Math.imul(k,re)|0)+Math.imul(R,ie)|0,n=n+Math.imul(R,re)|0,r=r+Math.imul(I,ne)|0,f=(f=f+Math.imul(I,de)|0)+Math.imul(z,ne)|0,n=n+Math.imul(z,de)|0,r=r+Math.imul(_,se)|0,f=(f=f+Math.imul(_,he)|0)+Math.imul(A,se)|0,n=n+Math.imul(A,he)|0,r=r+Math.imul(M,oe)|0,f=(f=f+Math.imul(M,ue)|0)+Math.imul(w,oe)|0,n=n+Math.imul(w,ue)|0;var ze=(h+(r=r+Math.imul(v,le)|0)|0)+((8191&(f=(f=f+Math.imul(v,pe)|0)+Math.imul(g,le)|0))<<13)|0;h=((n=n+Math.imul(g,pe)|0)+(f>>>13)|0)+(ze>>>26)|0,ze&=67108863,r=Math.imul(F,Y),f=(f=Math.imul(F,G))+Math.imul(T,Y)|0,n=Math.imul(T,G),r=r+Math.imul(N,$)|0,f=(f=f+Math.imul(N,ee)|0)+Math.imul(B,$)|0,n=n+Math.imul(B,ee)|0,r=r+Math.imul(j,ie)|0,f=(f=f+Math.imul(j,re)|0)+Math.imul(L,ie)|0,n=n+Math.imul(L,re)|0,r=r+Math.imul(k,ne)|0,f=(f=f+Math.imul(k,de)|0)+Math.imul(R,ne)|0,n=n+Math.imul(R,de)|0,r=r+Math.imul(I,se)|0,f=(f=f+Math.imul(I,he)|0)+Math.imul(z,se)|0,n=n+Math.imul(z,he)|0,r=r+Math.imul(_,oe)|0,f=(f=f+Math.imul(_,ue)|0)+Math.imul(A,oe)|0,n=n+Math.imul(A,ue)|0;var qe=(h+(r=r+Math.imul(M,le)|0)|0)+((8191&(f=(f=f+Math.imul(M,pe)|0)+Math.imul(w,le)|0))<<13)|0;h=((n=n+Math.imul(w,pe)|0)+(f>>>13)|0)+(qe>>>26)|0,qe&=67108863,r=Math.imul(F,$),f=(f=Math.imul(F,ee))+Math.imul(T,$)|0,n=Math.imul(T,ee),r=r+Math.imul(N,ie)|0,f=(f=f+Math.imul(N,re)|0)+Math.imul(B,ie)|0,n=n+Math.imul(B,re)|0,r=r+Math.imul(j,ne)|0,f=(f=f+Math.imul(j,de)|0)+Math.imul(L,ne)|0,n=n+Math.imul(L,de)|0,r=r+Math.imul(k,se)|0,f=(f=f+Math.imul(k,he)|0)+Math.imul(R,se)|0,n=n+Math.imul(R,he)|0,r=r+Math.imul(I,oe)|0,f=(f=f+Math.imul(I,ue)|0)+Math.imul(z,oe)|0,n=n+Math.imul(z,ue)|0;var ke=(h+(r=r+Math.imul(_,le)|0)|0)+((8191&(f=(f=f+Math.imul(_,pe)|0)+Math.imul(A,le)|0))<<13)|0;h=((n=n+Math.imul(A,pe)|0)+(f>>>13)|0)+(ke>>>26)|0,ke&=67108863,r=Math.imul(F,ie),f=(f=Math.imul(F,re))+Math.imul(T,ie)|0,n=Math.imul(T,re),r=r+Math.imul(N,ne)|0,f=(f=f+Math.imul(N,de)|0)+Math.imul(B,ne)|0,n=n+Math.imul(B,de)|0,r=r+Math.imul(j,se)|0,f=(f=f+Math.imul(j,he)|0)+Math.imul(L,se)|0,n=n+Math.imul(L,he)|0,r=r+Math.imul(k,oe)|0,f=(f=f+Math.imul(k,ue)|0)+Math.imul(R,oe)|0,n=n+Math.imul(R,ue)|0;var Re=(h+(r=r+Math.imul(I,le)|0)|0)+((8191&(f=(f=f+Math.imul(I,pe)|0)+Math.imul(z,le)|0))<<13)|0;h=((n=n+Math.imul(z,pe)|0)+(f>>>13)|0)+(Re>>>26)|0,Re&=67108863,r=Math.imul(F,ne),f=(f=Math.imul(F,de))+Math.imul(T,ne)|0,n=Math.imul(T,de),r=r+Math.imul(N,se)|0,f=(f=f+Math.imul(N,he)|0)+Math.imul(B,se)|0,n=n+Math.imul(B,he)|0,r=r+Math.imul(j,oe)|0,f=(f=f+Math.imul(j,ue)|0)+Math.imul(L,oe)|0,n=n+Math.imul(L,ue)|0;var Pe=(h+(r=r+Math.imul(k,le)|0)|0)+((8191&(f=(f=f+Math.imul(k,pe)|0)+Math.imul(R,le)|0))<<13)|0;h=((n=n+Math.imul(R,pe)|0)+(f>>>13)|0)+(Pe>>>26)|0,Pe&=67108863,r=Math.imul(F,se),f=(f=Math.imul(F,he))+Math.imul(T,se)|0,n=Math.imul(T,he),r=r+Math.imul(N,oe)|0,f=(f=f+Math.imul(N,ue)|0)+Math.imul(B,oe)|0,n=n+Math.imul(B,ue)|0;var je=(h+(r=r+Math.imul(j,le)|0)|0)+((8191&(f=(f=f+Math.imul(j,pe)|0)+Math.imul(L,le)|0))<<13)|0;h=((n=n+Math.imul(L,pe)|0)+(f>>>13)|0)+(je>>>26)|0,je&=67108863,r=Math.imul(F,oe),f=(f=Math.imul(F,ue))+Math.imul(T,oe)|0,n=Math.imul(T,ue);var Le=(h+(r=r+Math.imul(N,le)|0)|0)+((8191&(f=(f=f+Math.imul(N,pe)|0)+Math.imul(B,le)|0))<<13)|0;h=((n=n+Math.imul(B,pe)|0)+(f>>>13)|0)+(Le>>>26)|0,Le&=67108863;var Ee=(h+(r=Math.imul(F,le))|0)+((8191&(f=(f=Math.imul(F,pe))+Math.imul(T,le)|0))<<13)|0;return h=((n=Math.imul(T,pe))+(f>>>13)|0)+(Ee>>>26)|0,Ee&=67108863,s[0]=me,s[1]=ve,s[2]=ge,s[3]=ye,s[4]=Me,s[5]=we,s[6]=Se,s[7]=_e,s[8]=Ae,s[9]=xe,s[10]=Ie,s[11]=ze,s[12]=qe,s[13]=ke,s[14]=Re,s[15]=Pe,s[16]=je,s[17]=Le,s[18]=Ee,0!==h&&(s[19]=h,i.length++),i};Math.imul||(A=h),n.prototype.mulTo=function(e,t){var i=this.length+e.length;return 10===this.length&&10===e.length?A(this,e,t):i<63?h(this,e,t):i<1024?c(this,e,t):o(this,e,t)},u.prototype.makeRBT=function(e){for(var t=new Array(e),i=n.prototype._countBits(e)-1,r=0;r<e;r++)t[r]=this.revBin(r,i,e);return t},u.prototype.revBin=function(e,t,i){if(0===e||e===i-1)return e;for(var r=0,f=0;f<t;f++)r|=(1&e)<<t-f-1,e>>=1;return r},u.prototype.permute=function(e,t,i,r,f,n){for(var d=0;d<n;d++)r[d]=t[e[d]],f[d]=i[e[d]]},u.prototype.transform=function(e,t,i,r,f,n){this.permute(n,e,t,i,r,f);for(var d=1;d<f;d<<=1)for(var a=d<<1,s=Math.cos(2*Math.PI/a),h=Math.sin(2*Math.PI/a),c=0;c<f;c+=a)for(var o=s,u=h,b=0;b<d;b++){var l=i[c+b],p=r[c+b],m=i[c+b+d],v=r[c+b+d],g=o*m-u*v;v=o*v+u*m,m=g,i[c+b]=l+m,r[c+b]=p+v,i[c+b+d]=l-m,r[c+b+d]=p-v,b!==a&&(g=s*o-h*u,u=s*u+h*o,o=g)}},u.prototype.guessLen13b=function(e,t){var i=1|Math.max(t,e),r=1&i,f=0;for(i=i/2|0;i;i>>>=1)f++;return 1<<f+1+r},u.prototype.conjugate=function(e,t,i){if(!(i<=1))for(var r=0;r<i/2;r++){var f=e[r];e[r]=e[i-r-1],e[i-r-1]=f,f=t[r],t[r]=-t[i-r-1],t[i-r-1]=-f}},u.prototype.normalize13b=function(e,t){for(var i=0,r=0;r<t/2;r++){var f=8192*Math.round(e[2*r+1]/t)+Math.round(e[2*r]/t)+i;e[r]=67108863&f,i=f<67108864?0:f/67108864|0}return e},u.prototype.convert13b=function(e,t,i,f){for(var n=0,d=0;d<t;d++)n+=0|e[d],i[2*d]=8191&n,n>>>=13,i[2*d+1]=8191&n,n>>>=13;for(d=2*t;d<f;++d)i[d]=0;r(0===n),r(0==(-8192&n))},u.prototype.stub=function(e){for(var t=new Array(e),i=0;i<e;i++)t[i]=0;return t},u.prototype.mulp=function(e,t,i){var r=2*this.guessLen13b(e.length,t.length),f=this.makeRBT(r),n=this.stub(r),d=new Array(r),a=new Array(r),s=new Array(r),h=new Array(r),c=new Array(r),o=new Array(r),u=i.words;u.length=r,this.convert13b(e.words,e.length,d,r),this.convert13b(t.words,t.length,h,r),this.transform(d,n,a,s,r,f),this.transform(h,n,c,o,r,f);for(var b=0;b<r;b++){var l=a[b]*c[b]-s[b]*o[b];s[b]=a[b]*o[b]+s[b]*c[b],a[b]=l}return this.conjugate(a,s,r),this.transform(a,s,u,n,r,f),this.conjugate(u,n,r),this.normalize13b(u,r),i.negative=e.negative^t.negative,i.length=e.length+t.length,i.strip()},n.prototype.mul=function(e){var t=new n(null);return t.words=new Array(this.length+e.length),this.mulTo(e,t)},n.prototype.mulf=function(e){var t=new n(null);return t.words=new Array(this.length+e.length),o(this,e,t)},n.prototype.imul=function(e){return this.clone().mulTo(e,this)},n.prototype.imuln=function(e){r("number"==typeof e),r(e<67108864);for(var t=0,i=0;i<this.length;i++){var f=(0|this.words[i])*e,n=(67108863&f)+(67108863&t);t>>=26,t+=f/67108864|0,t+=n>>>26,this.words[i]=67108863&n}return 0!==t&&(this.words[i]=t,this.length++),this},n.prototype.muln=function(e){return this.clone().imuln(e)},n.prototype.sqr=function(){return this.mul(this)},n.prototype.isqr=function(){return this.imul(this.clone())},n.prototype.pow=function(e){var t=s(e);if(0===t.length)return new n(1);for(var i=this,r=0;r<t.length&&0===t[r];r++,i=i.sqr());if(++r<t.length)for(var f=i.sqr();r<t.length;r++,f=f.sqr())0!==t[r]&&(i=i.mul(f));return i},n.prototype.iushln=function(e){r("number"==typeof e&&e>=0);var t,i=e%26,f=(e-i)/26,n=67108863>>>26-i<<26-i;if(0!==i){var d=0;for(t=0;t<this.length;t++){var a=this.words[t]&n,s=(0|this.words[t])-a<<i;this.words[t]=s|d,d=a>>>26-i}d&&(this.words[t]=d,this.length++)}if(0!==f){for(t=this.length-1;t>=0;t--)this.words[t+f]=this.words[t];for(t=0;t<f;t++)this.words[t]=0;this.length+=f}return this.strip()},n.prototype.ishln=function(e){return r(0===this.negative),this.iushln(e)},n.prototype.iushrn=function(e,t,i){r("number"==typeof e&&e>=0);var f;f=t?(t-t%26)/26:0;var n=e%26,d=Math.min((e-n)/26,this.length),a=67108863^67108863>>>n<<n,s=i;if(f-=d,f=Math.max(0,f),s){for(var h=0;h<d;h++)s.words[h]=this.words[h];s.length=d}if(0===d);else if(this.length>d)for(this.length-=d,h=0;h<this.length;h++)this.words[h]=this.words[h+d];else this.words[0]=0,this.length=1;var c=0;for(h=this.length-1;h>=0&&(0!==c||h>=f);h--){var o=0|this.words[h];this.words[h]=c<<26-n|o>>>n,c=o&a}return s&&0!==c&&(s.words[s.length++]=c),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},n.prototype.ishrn=function(e,t,i){return r(0===this.negative),this.iushrn(e,t,i)},n.prototype.shln=function(e){return this.clone().ishln(e)},n.prototype.ushln=function(e){return this.clone().iushln(e)},n.prototype.shrn=function(e){return this.clone().ishrn(e)},n.prototype.ushrn=function(e){return this.clone().iushrn(e)},n.prototype.testn=function(e){r("number"==typeof e&&e>=0);var t=e%26,i=(e-t)/26,f=1<<t;return!(this.length<=i)&&!!(this.words[i]&f)},n.prototype.imaskn=function(e){r("number"==typeof e&&e>=0);var t=e%26,i=(e-t)/26;if(r(0===this.negative,"imaskn works only with positive numbers"),this.length<=i)return this;if(0!==t&&i++,this.length=Math.min(i,this.length),0!==t){var f=67108863^67108863>>>t<<t;this.words[this.length-1]&=f}return this.strip()},n.prototype.maskn=function(e){return this.clone().imaskn(e)},n.prototype.iaddn=function(e){return r("number"==typeof e),r(e<67108864),e<0?this.isubn(-e):0!==this.negative?1===this.length&&(0|this.words[0])<e?(this.words[0]=e-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(e),this.negative=1,this):this._iaddn(e)},n.prototype._iaddn=function(e){this.words[0]+=e;for(var t=0;t<this.length&&this.words[t]>=67108864;t++)this.words[t]-=67108864,t===this.length-1?this.words[t+1]=1:this.words[t+1]++;return this.length=Math.max(this.length,t+1),this},n.prototype.isubn=function(e){if(r("number"==typeof e),r(e<67108864),e<0)return this.iaddn(-e);if(0!==this.negative)return this.negative=0,this.iaddn(e),this.negative=1,this;if(this.words[0]-=e,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var t=0;t<this.length&&this.words[t]<0;t++)this.words[t]+=67108864,this.words[t+1]-=1;return this.strip()},n.prototype.addn=function(e){return this.clone().iaddn(e)},n.prototype.subn=function(e){return this.clone().isubn(e)},n.prototype.iabs=function(){return this.negative=0,this},n.prototype.abs=function(){return this.clone().iabs()},n.prototype._ishlnsubmul=function(e,t,i){var f,n=e.length+i;this._expand(n);var d,a=0;for(f=0;f<e.length;f++){d=(0|this.words[f+i])+a;var s=(0|e.words[f])*t;a=((d-=67108863&s)>>26)-(s/67108864|0),this.words[f+i]=67108863&d}for(;f<this.length-i;f++)a=(d=(0|this.words[f+i])+a)>>26,this.words[f+i]=67108863&d;if(0===a)return this.strip();for(r(-1===a),a=0,f=0;f<this.length;f++)a=(d=-(0|this.words[f])+a)>>26,this.words[f]=67108863&d;return this.negative=1,this.strip()},n.prototype._wordDiv=function(e,t){var i=this.length-e.length,r=this.clone(),f=e,d=0|f.words[f.length-1];0!==(i=26-this._countBits(d))&&(f=f.ushln(i),r.iushln(i),d=0|f.words[f.length-1]);var a,s=r.length-f.length;if("mod"!==t){(a=new n(null)).length=s+1,a.words=new Array(a.length);for(var h=0;h<a.length;h++)a.words[h]=0}var c=r.clone()._ishlnsubmul(f,1,s);0===c.negative&&(r=c,a&&(a.words[s]=1));for(var o=s-1;o>=0;o--){var u=67108864*(0|r.words[f.length+o])+(0|r.words[f.length+o-1]);for(u=Math.min(u/d|0,67108863),r._ishlnsubmul(f,u,o);0!==r.negative;)u--,r.negative=0,r._ishlnsubmul(f,1,o),r.isZero()||(r.negative^=1);a&&(a.words[o]=u)}return a&&a.strip(),r.strip(),"div"!==t&&0!==i&&r.iushrn(i),{div:a||null,mod:r}},n.prototype.divmod=function(e,t,i){if(r(!e.isZero()),this.isZero())return{div:new n(0),mod:new n(0)};var f,d,a;return 0!==this.negative&&0===e.negative?(a=this.neg().divmod(e,t),"mod"!==t&&(f=a.div.neg()),"div"!==t&&(d=a.mod.neg(),i&&0!==d.negative&&d.iadd(e)),{div:f,mod:d}):0===this.negative&&0!==e.negative?(a=this.divmod(e.neg(),t),"mod"!==t&&(f=a.div.neg()),{div:f,mod:a.mod}):0!=(this.negative&e.negative)?(a=this.neg().divmod(e.neg(),t),"div"!==t&&(d=a.mod.neg(),i&&0!==d.negative&&d.isub(e)),{div:a.div,mod:d}):e.length>this.length||this.cmp(e)<0?{div:new n(0),mod:this}:1===e.length?"div"===t?{div:this.divn(e.words[0]),mod:null}:"mod"===t?{div:null,mod:new n(this.modn(e.words[0]))}:{div:this.divn(e.words[0]),mod:new n(this.modn(e.words[0]))}:this._wordDiv(e,t)},n.prototype.div=function(e){return this.divmod(e,"div",!1).div},n.prototype.mod=function(e){return this.divmod(e,"mod",!1).mod},n.prototype.umod=function(e){return this.divmod(e,"mod",!0).mod},n.prototype.divRound=function(e){var t=this.divmod(e);if(t.mod.isZero())return t.div;var i=0!==t.div.negative?t.mod.isub(e):t.mod,r=e.ushrn(1),f=e.andln(1),n=i.cmp(r);return n<0||1===f&&0===n?t.div:0!==t.div.negative?t.div.isubn(1):t.div.iaddn(1)},n.prototype.modn=function(e){r(e<=67108863);for(var t=(1<<26)%e,i=0,f=this.length-1;f>=0;f--)i=(t*i+(0|this.words[f]))%e;return i},n.prototype.idivn=function(e){r(e<=67108863);for(var t=0,i=this.length-1;i>=0;i--){var f=(0|this.words[i])+67108864*t;this.words[i]=f/e|0,t=f%e}return this.strip()},n.prototype.divn=function(e){return this.clone().idivn(e)},n.prototype.egcd=function(e){r(0===e.negative),r(!e.isZero());var t=this,i=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var f=new n(1),d=new n(0),a=new n(0),s=new n(1),h=0;t.isEven()&&i.isEven();)t.iushrn(1),i.iushrn(1),++h;for(var c=i.clone(),o=t.clone();!t.isZero();){for(var u=0,b=1;0==(t.words[0]&b)&&u<26;++u,b<<=1);if(u>0)for(t.iushrn(u);u-- >0;)(f.isOdd()||d.isOdd())&&(f.iadd(c),d.isub(o)),f.iushrn(1),d.iushrn(1);for(var l=0,p=1;0==(i.words[0]&p)&&l<26;++l,p<<=1);if(l>0)for(i.iushrn(l);l-- >0;)(a.isOdd()||s.isOdd())&&(a.iadd(c),s.isub(o)),a.iushrn(1),s.iushrn(1);t.cmp(i)>=0?(t.isub(i),f.isub(a),d.isub(s)):(i.isub(t),a.isub(f),s.isub(d))}return{a:a,b:s,gcd:i.iushln(h)}},n.prototype._invmp=function(e){r(0===e.negative),r(!e.isZero());var t=this,i=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var f=new n(1),d=new n(0),a=i.clone();t.cmpn(1)>0&&i.cmpn(1)>0;){for(var s=0,h=1;0==(t.words[0]&h)&&s<26;++s,h<<=1);if(s>0)for(t.iushrn(s);s-- >0;)f.isOdd()&&f.iadd(a),f.iushrn(1);for(var c=0,o=1;0==(i.words[0]&o)&&c<26;++c,o<<=1);if(c>0)for(i.iushrn(c);c-- >0;)d.isOdd()&&d.iadd(a),d.iushrn(1);t.cmp(i)>=0?(t.isub(i),f.isub(d)):(i.isub(t),d.isub(f))}var u;return(u=0===t.cmpn(1)?f:d).cmpn(0)<0&&u.iadd(e),u},n.prototype.gcd=function(e){if(this.isZero())return e.abs();if(e.isZero())return this.abs();var t=this.clone(),i=e.clone();t.negative=0,i.negative=0;for(var r=0;t.isEven()&&i.isEven();r++)t.iushrn(1),i.iushrn(1);for(;;){for(;t.isEven();)t.iushrn(1);for(;i.isEven();)i.iushrn(1);var f=t.cmp(i);if(f<0){var n=t;t=i,i=n}else if(0===f||0===i.cmpn(1))break;t.isub(i)}return i.iushln(r)},n.prototype.invm=function(e){return this.egcd(e).a.umod(e)},n.prototype.isEven=function(){return 0==(1&this.words[0])},n.prototype.isOdd=function(){return 1==(1&this.words[0])},n.prototype.andln=function(e){return this.words[0]&e},n.prototype.bincn=function(e){r("number"==typeof e);var t=e%26,i=(e-t)/26,f=1<<t;if(this.length<=i)return this._expand(i+1),this.words[i]|=f,this;for(var n=f,d=i;0!==n&&d<this.length;d++){var a=0|this.words[d];n=(a+=n)>>>26,a&=67108863,this.words[d]=a}return 0!==n&&(this.words[d]=n,this.length++),this},n.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},n.prototype.cmpn=function(e){var t=e<0;if(0!==this.negative&&!t)return-1;if(0===this.negative&&t)return 1;this.strip();var i;if(this.length>1)i=1;else{t&&(e=-e),r(e<=67108863,"Number is too big");var f=0|this.words[0];i=f===e?0:f<e?-1:1}return 0!==this.negative?0|-i:i},n.prototype.cmp=function(e){if(0!==this.negative&&0===e.negative)return-1;if(0===this.negative&&0!==e.negative)return 1;var t=this.ucmp(e);return 0!==this.negative?0|-t:t},n.prototype.ucmp=function(e){if(this.length>e.length)return 1;if(this.length<e.length)return-1;for(var t=0,i=this.length-1;i>=0;i--){var r=0|this.words[i],f=0|e.words[i];if(r!==f){r<f?t=-1:r>f&&(t=1);break}}return t},n.prototype.gtn=function(e){return 1===this.cmpn(e)},n.prototype.gt=function(e){return 1===this.cmp(e)},n.prototype.gten=function(e){return this.cmpn(e)>=0},n.prototype.gte=function(e){return this.cmp(e)>=0},n.prototype.ltn=function(e){return-1===this.cmpn(e)},n.prototype.lt=function(e){return-1===this.cmp(e)},n.prototype.lten=function(e){return this.cmpn(e)<=0},n.prototype.lte=function(e){return this.cmp(e)<=0},n.prototype.eqn=function(e){return 0===this.cmpn(e)},n.prototype.eq=function(e){return 0===this.cmp(e)},n.red=function(e){return new g(e)},n.prototype.toRed=function(e){return r(!this.red,"Already a number in reduction context"),r(0===this.negative,"red works only with positives"),e.convertTo(this)._forceRed(e)},n.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},n.prototype._forceRed=function(e){return this.red=e,this},n.prototype.forceRed=function(e){return r(!this.red,"Already a number in reduction context"),this._forceRed(e)},n.prototype.redAdd=function(e){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,e)},n.prototype.redIAdd=function(e){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,e)},n.prototype.redSub=function(e){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,e)},n.prototype.redISub=function(e){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,e)},n.prototype.redShl=function(e){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,e)},n.prototype.redMul=function(e){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.mul(this,e)},n.prototype.redIMul=function(e){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.imul(this,e)},n.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},n.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},n.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},n.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},n.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},n.prototype.redPow=function(e){return r(this.red&&!e.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,e)};var x={k256:null,p224:null,p192:null,p25519:null};b.prototype._tmp=function(){var e=new n(null);return e.words=new Array(Math.ceil(this.n/13)),e},b.prototype.ireduce=function(e){var t,i=e;do{this.split(i,this.tmp),t=(i=(i=this.imulK(i)).iadd(this.tmp)).bitLength()}while(t>this.n);var r=t<this.n?-1:i.ucmp(this.p);return 0===r?(i.words[0]=0,i.length=1):r>0?i.isub(this.p):i.strip(),i},b.prototype.split=function(e,t){e.iushrn(this.n,0,t)},b.prototype.imulK=function(e){return e.imul(this.k)},f(l,b),l.prototype.split=function(e,t){for(var i=Math.min(e.length,9),r=0;r<i;r++)t.words[r]=e.words[r];if(t.length=i,e.length<=9)return e.words[0]=0,void(e.length=1);var f=e.words[9];for(t.words[t.length++]=4194303&f,r=10;r<e.length;r++){var n=0|e.words[r];e.words[r-10]=(4194303&n)<<4|f>>>22,f=n}f>>>=22,e.words[r-10]=f,0===f&&e.length>10?e.length-=10:e.length-=9},l.prototype.imulK=function(e){e.words[e.length]=0,e.words[e.length+1]=0,e.length+=2;for(var t=0,i=0;i<e.length;i++){var r=0|e.words[i];t+=977*r,e.words[i]=67108863&t,t=64*r+(t/67108864|0)}return 0===e.words[e.length-1]&&(e.length--,0===e.words[e.length-1]&&e.length--),e},f(p,b),f(m,b),f(v,b),v.prototype.imulK=function(e){for(var t=0,i=0;i<e.length;i++){var r=19*(0|e.words[i])+t,f=67108863&r;r>>>=26,e.words[i]=f,t=r}return 0!==t&&(e.words[e.length++]=t),e},n._prime=function(e){if(x[e])return x[e];var t;if("k256"===e)t=new l;else if("p224"===e)t=new p;else if("p192"===e)t=new m;else{if("p25519"!==e)throw new Error("Unknown prime "+e);t=new v}return x[e]=t,t},g.prototype._verify1=function(e){r(0===e.negative,"red works only with positives"),r(e.red,"red works only with red numbers")},g.prototype._verify2=function(e,t){r(0==(e.negative|t.negative),"red works only with positives"),r(e.red&&e.red===t.red,"red works only with red numbers")},g.prototype.imod=function(e){return this.prime?this.prime.ireduce(e)._forceRed(this):e.umod(this.m)._forceRed(this)},g.prototype.neg=function(e){return e.isZero()?e.clone():this.m.sub(e)._forceRed(this)},g.prototype.add=function(e,t){this._verify2(e,t);var i=e.add(t);return i.cmp(this.m)>=0&&i.isub(this.m),i._forceRed(this)},g.prototype.iadd=function(e,t){this._verify2(e,t);var i=e.iadd(t);return i.cmp(this.m)>=0&&i.isub(this.m),i},g.prototype.sub=function(e,t){this._verify2(e,t);var i=e.sub(t);return i.cmpn(0)<0&&i.iadd(this.m),i._forceRed(this)},g.prototype.isub=function(e,t){this._verify2(e,t);var i=e.isub(t);return i.cmpn(0)<0&&i.iadd(this.m),i},g.prototype.shl=function(e,t){return this._verify1(e),this.imod(e.ushln(t))},g.prototype.imul=function(e,t){return this._verify2(e,t),this.imod(e.imul(t))},g.prototype.mul=function(e,t){return this._verify2(e,t),this.imod(e.mul(t))},g.prototype.isqr=function(e){return this.imul(e,e.clone())},g.prototype.sqr=function(e){return this.mul(e,e)},g.prototype.sqrt=function(e){if(e.isZero())return e.clone();var t=this.m.andln(3);if(r(t%2==1),3===t){var i=this.m.add(new n(1)).iushrn(2);return this.pow(e,i)}for(var f=this.m.subn(1),d=0;!f.isZero()&&0===f.andln(1);)d++,f.iushrn(1);r(!f.isZero());var a=new n(1).toRed(this),s=a.redNeg(),h=this.m.subn(1).iushrn(1),c=this.m.bitLength();for(c=new n(2*c*c).toRed(this);0!==this.pow(c,h).cmp(s);)c.redIAdd(s);for(var o=this.pow(c,f),u=this.pow(e,f.addn(1).iushrn(1)),b=this.pow(e,f),l=d;0!==b.cmp(a);){for(var p=b,m=0;0!==p.cmp(a);m++)p=p.redSqr();r(m<l);var v=this.pow(o,new n(1).iushln(l-m-1));u=u.redMul(v),o=v.redSqr(),b=b.redMul(o),l=m}return u},g.prototype.invm=function(e){var t=e._invmp(this.m);return 0!==t.negative?(t.negative=0,this.imod(t).redNeg()):this.imod(t)},g.prototype.pow=function(e,t){if(t.isZero())return new n(1).toRed(this);if(0===t.cmpn(1))return e.clone();var i=new Array(16);i[0]=new n(1).toRed(this),i[1]=e;for(var r=2;r<i.length;r++)i[r]=this.mul(i[r-1],e);var f=i[0],d=0,a=0,s=t.bitLength()%26;for(0===s&&(s=26),r=t.length-1;r>=0;r--){for(var h=t.words[r],c=s-1;c>=0;c--){var o=h>>c&1;f!==i[0]&&(f=this.sqr(f)),0!==o||0!==d?(d<<=1,d|=o,(4===++a||0===r&&0===c)&&(f=this.mul(f,i[d]),a=0,d=0)):a=0}s=26}return f},g.prototype.convertTo=function(e){var t=e.umod(this.m);return t===e?t.clone():t},g.prototype.convertFrom=function(e){var t=e.clone();return t.red=null,t},n.mont=function(e){return new y(e)},f(y,g),y.prototype.convertTo=function(e){return this.imod(e.ushln(this.shift))},y.prototype.convertFrom=function(e){var t=this.imod(e.mul(this.rinv));return t.red=null,t},y.prototype.imul=function(e,t){if(e.isZero()||t.isZero())return e.words[0]=0,e.length=1,e;var i=e.imul(t),r=i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),f=i.isub(r).iushrn(this.shift),n=f;return f.cmp(this.m)>=0?n=f.isub(this.m):f.cmpn(0)<0&&(n=f.iadd(this.m)),n._forceRed(this)},y.prototype.mul=function(e,t){if(e.isZero()||t.isZero())return new n(0)._forceRed(this);var i=e.mul(t),r=i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),f=i.isub(r).iushrn(this.shift),d=f;return f.cmp(this.m)>=0?d=f.isub(this.m):f.cmpn(0)<0&&(d=f.iadd(this.m)),d._forceRed(this)},y.prototype.invm=function(e){return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)}}(void 0===t||t,this)},{}],2:[function(e,t,i){function r(e){this.rand=e}var f;if(t.exports=function(e){return f||(f=new r(null)),f.generate(e)},t.exports.Rand=r,r.prototype.generate=function(e){return this._rand(e)},r.prototype._rand=function(e){if(this.rand.getBytes)return this.rand.getBytes(e);for(var t=new Uint8Array(e),i=0;i<t.length;i++)t[i]=this.rand.getByte();return t},"object"==typeof self)self.crypto&&self.crypto.getRandomValues?r.prototype._rand=function(e){var t=new Uint8Array(e);return self.crypto.getRandomValues(t),t}:self.msCrypto&&self.msCrypto.getRandomValues?r.prototype._rand=function(e){var t=new Uint8Array(e);return self.msCrypto.getRandomValues(t),t}:"object"==typeof window&&(r.prototype._rand=function(){throw new Error("Not implemented yet")});else try{var n=e("crypto");if("function"!=typeof n.randomBytes)throw new Error("Not supported");r.prototype._rand=function(e){return n.randomBytes(e)}}catch(e){}},{crypto:3}],3:[function(e,t,i){},{}],4:[function(e,t,i){"use strict";function r(e,t){this.type=e,this.p=new n(t.p,16),this.red=t.prime?n.red(t.prime):n.mont(this.p),this.zero=new n(0).toRed(this.red),this.one=new n(1).toRed(this.red),this.two=new n(2).toRed(this.red),this.n=t.n&&new n(t.n,16),this.g=t.g&&this.pointFromJSON(t.g,t.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4);var i=this.n&&this.p.div(this.n);!i||i.cmpn(100)>0?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red))}function f(e,t){this.curve=e,this.type=t,this.precomputed=null}var n=e("bn.js"),d=e("../../elliptic").utils,a=d.getNAF,s=d.getJSF,h=d.assert;t.exports=r,r.prototype.point=function(){throw new Error("Not implemented")},r.prototype.validate=function(){throw new Error("Not implemented")},r.prototype._fixedNafMul=function(e,t){h(e.precomputed);var i=e._getDoubles(),r=a(t,1),f=(1<<i.step+1)-(i.step%2==0?2:1);f/=3;for(var n=[],d=0;d<r.length;d+=i.step){for(var s=0,t=d+i.step-1;t>=d;t--)s=(s<<1)+r[t];n.push(s)}for(var c=this.jpoint(null,null,null),o=this.jpoint(null,null,null),u=f;u>0;u--){for(d=0;d<n.length;d++)(s=n[d])===u?o=o.mixedAdd(i.points[d]):s===-u&&(o=o.mixedAdd(i.points[d].neg()));c=c.add(o)}return c.toP()},r.prototype._wnafMul=function(e,t){var i=4,r=e._getNAFPoints(i);i=r.wnd;for(var f=r.points,n=a(t,i),d=this.jpoint(null,null,null),s=n.length-1;s>=0;s--){for(var t=0;s>=0&&0===n[s];s--)t++;if(s>=0&&t++,d=d.dblp(t),s<0)break;var c=n[s];h(0!==c),d="affine"===e.type?c>0?d.mixedAdd(f[c-1>>1]):d.mixedAdd(f[-c-1>>1].neg()):c>0?d.add(f[c-1>>1]):d.add(f[-c-1>>1].neg())}return"affine"===e.type?d.toP():d},r.prototype._wnafMulAdd=function(e,t,i,r,f){for(var n=this._wnafT1,d=this._wnafT2,h=this._wnafT3,c=0,o=0;o<r;o++){var u=(x=t[o])._getNAFPoints(e);n[o]=u.wnd,d[o]=u.points}for(o=r-1;o>=1;o-=2){var b=o-1,l=o;if(1===n[b]&&1===n[l]){var p=[t[b],null,null,t[l]];0===t[b].y.cmp(t[l].y)?(p[1]=t[b].add(t[l]),p[2]=t[b].toJ().mixedAdd(t[l].neg())):0===t[b].y.cmp(t[l].y.redNeg())?(p[1]=t[b].toJ().mixedAdd(t[l]),p[2]=t[b].add(t[l].neg())):(p[1]=t[b].toJ().mixedAdd(t[l]),p[2]=t[b].toJ().mixedAdd(t[l].neg()));var m=[-3,-1,-5,-7,0,7,5,1,3],v=s(i[b],i[l]);c=Math.max(v[0].length,c),h[b]=new Array(c),h[l]=new Array(c);for(A=0;A<c;A++){var g=0|v[0][A],y=0|v[1][A];h[b][A]=m[3*(g+1)+(y+1)],h[l][A]=0,d[b]=p}}else h[b]=a(i[b],n[b]),h[l]=a(i[l],n[l]),c=Math.max(h[b].length,c),c=Math.max(h[l].length,c)}for(var M=this.jpoint(null,null,null),w=this._wnafT4,o=c;o>=0;o--){for(var S=0;o>=0;){for(var _=!0,A=0;A<r;A++)w[A]=0|h[A][o],0!==w[A]&&(_=!1);if(!_)break;S++,o--}if(o>=0&&S++,M=M.dblp(S),o<0)break;for(A=0;A<r;A++){var x,I=w[A];0!==I&&(I>0?x=d[A][I-1>>1]:I<0&&(x=d[A][-I-1>>1].neg()),M="affine"===x.type?M.mixedAdd(x):M.add(x))}}for(o=0;o<r;o++)d[o]=null;return f?M:M.toP()},r.BasePoint=f,f.prototype.eq=function(){throw new Error("Not implemented")},f.prototype.validate=function(){return this.curve.validate(this)},r.prototype.decodePoint=function(e,t){e=d.toArray(e,t);var i=this.p.byteLength();if((4===e[0]||6===e[0]||7===e[0])&&e.length-1==2*i)return 6===e[0]?h(e[e.length-1]%2==0):7===e[0]&&h(e[e.length-1]%2==1),this.point(e.slice(1,1+i),e.slice(1+i,1+2*i));if((2===e[0]||3===e[0])&&e.length-1===i)return this.pointFromX(e.slice(1,1+i),3===e[0]);throw new Error("Unknown point format")},f.prototype.encodeCompressed=function(e){return this.encode(e,!0)},f.prototype._encode=function(e){var t=this.curve.p.byteLength(),i=this.getX().toArray("be",t);return e?[this.getY().isEven()?2:3].concat(i):[4].concat(i,this.getY().toArray("be",t))},f.prototype.encode=function(e,t){return d.encode(this._encode(t),e)},f.prototype.precompute=function(e){if(this.precomputed)return this;var t={doubles:null,naf:null,beta:null};return t.naf=this._getNAFPoints(8),t.doubles=this._getDoubles(4,e),t.beta=this._getBeta(),this.precomputed=t,this},f.prototype._hasDoubles=function(e){if(!this.precomputed)return!1;var t=this.precomputed.doubles;return!!t&&t.points.length>=Math.ceil((e.bitLength()+1)/t.step)},f.prototype._getDoubles=function(e,t){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var i=[this],r=this,f=0;f<t;f+=e){for(var n=0;n<e;n++)r=r.dbl();i.push(r)}return{step:e,points:i}},f.prototype._getNAFPoints=function(e){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var t=[this],i=(1<<e)-1,r=1===i?null:this.dbl(),f=1;f<i;f++)t[f]=t[f-1].add(r);return{wnd:e,points:t}},f.prototype._getBeta=function(){return null},f.prototype.dblp=function(e){for(var t=this,i=0;i<e;i++)t=t.dbl();return t}},{"../../elliptic":"elliptic","bn.js":1}],5:[function(e,t,i){"use strict";function r(e){this.twisted=1!=(0|e.a),this.mOneA=this.twisted&&-1==(0|e.a),this.extended=this.mOneA,h.call(this,"edwards",e),this.a=new a(e.a,16).umod(this.red.m),this.a=this.a.toRed(this.red),this.c=new a(e.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new a(e.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),c(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==(0|e.c)}function f(e,t,i,r,f){h.BasePoint.call(this,e,"projective"),null===t&&null===i&&null===r?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new a(t,16),this.y=new a(i,16),this.z=r?new a(r,16):this.curve.one,this.t=f&&new a(f,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}var n=e("../curve"),d=e("../../elliptic"),a=e("bn.js"),s=e("inherits"),h=n.base,c=d.utils.assert;s(r,h),t.exports=r,r.prototype._mulA=function(e){return this.mOneA?e.redNeg():this.a.redMul(e)},r.prototype._mulC=function(e){return this.oneC?e:this.c.redMul(e)},r.prototype.jpoint=function(e,t,i,r){return this.point(e,t,i,r)},r.prototype.pointFromX=function(e,t){(e=new a(e,16)).red||(e=e.toRed(this.red));var i=e.redSqr(),r=this.c2.redSub(this.a.redMul(i)),f=this.one.redSub(this.c2.redMul(this.d).redMul(i)),n=r.redMul(f.redInvm()),d=n.redSqrt();if(0!==d.redSqr().redSub(n).cmp(this.zero))throw new Error("invalid point");var s=d.fromRed().isOdd();return(t&&!s||!t&&s)&&(d=d.redNeg()),this.point(e,d)},r.prototype.pointFromY=function(e,t){(e=new a(e,16)).red||(e=e.toRed(this.red));var i=e.redSqr(),r=i.redSub(this.one),f=i.redMul(this.d).redAdd(this.one),n=r.redMul(f.redInvm());if(0===n.cmp(this.zero)){if(t)throw new Error("invalid point");return this.point(this.zero,e)}var d=n.redSqrt();if(0!==d.redSqr().redSub(n).cmp(this.zero))throw new Error("invalid point");return d.isOdd()!==t&&(d=d.redNeg()),this.point(d,e)},r.prototype.validate=function(e){if(e.isInfinity())return!0;e.normalize();var t=e.x.redSqr(),i=e.y.redSqr(),r=t.redMul(this.a).redAdd(i),f=this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(i)));return 0===r.cmp(f)},s(f,h.BasePoint),r.prototype.pointFromJSON=function(e){return f.fromJSON(this,e)},r.prototype.point=function(e,t,i,r){return new f(this,e,t,i,r)},f.fromJSON=function(e,t){return new f(e,t[0],t[1],t[2])},f.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},f.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&0===this.y.cmp(this.z)},f.prototype._extDbl=function(){var e=this.x.redSqr(),t=this.y.redSqr(),i=this.z.redSqr();i=i.redIAdd(i);var r=this.curve._mulA(e),f=this.x.redAdd(this.y).redSqr().redISub(e).redISub(t),n=r.redAdd(t),d=n.redSub(i),a=r.redSub(t),s=f.redMul(d),h=n.redMul(a),c=f.redMul(a),o=d.redMul(n);return this.curve.point(s,h,o,c)},f.prototype._projDbl=function(){var e,t,i,r=this.x.redAdd(this.y).redSqr(),f=this.x.redSqr(),n=this.y.redSqr();if(this.curve.twisted){var d=(h=this.curve._mulA(f)).redAdd(n);if(this.zOne)e=r.redSub(f).redSub(n).redMul(d.redSub(this.curve.two)),t=d.redMul(h.redSub(n)),i=d.redSqr().redSub(d).redSub(d);else{var a=this.z.redSqr(),s=d.redSub(a).redISub(a);e=r.redSub(f).redISub(n).redMul(s),t=d.redMul(h.redSub(n)),i=d.redMul(s)}}else{var h=f.redAdd(n),a=this.curve._mulC(this.c.redMul(this.z)).redSqr(),s=h.redSub(a).redSub(a);e=this.curve._mulC(r.redISub(h)).redMul(s),t=this.curve._mulC(h).redMul(f.redISub(n)),i=h.redMul(s)}return this.curve.point(e,t,i)},f.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},f.prototype._extAdd=function(e){var t=this.y.redSub(this.x).redMul(e.y.redSub(e.x)),i=this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)),r=this.t.redMul(this.curve.dd).redMul(e.t),f=this.z.redMul(e.z.redAdd(e.z)),n=i.redSub(t),d=f.redSub(r),a=f.redAdd(r),s=i.redAdd(t),h=n.redMul(d),c=a.redMul(s),o=n.redMul(s),u=d.redMul(a);return this.curve.point(h,c,u,o)},f.prototype._projAdd=function(e){var t,i,r=this.z.redMul(e.z),f=r.redSqr(),n=this.x.redMul(e.x),d=this.y.redMul(e.y),a=this.curve.d.redMul(n).redMul(d),s=f.redSub(a),h=f.redAdd(a),c=this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(n).redISub(d),o=r.redMul(s).redMul(c);return this.curve.twisted?(t=r.redMul(h).redMul(d.redSub(this.curve._mulA(n))),i=s.redMul(h)):(t=r.redMul(h).redMul(d.redSub(n)),i=this.curve._mulC(s).redMul(h)),this.curve.point(o,t,i)},f.prototype.add=function(e){return this.isInfinity()?e:e.isInfinity()?this:this.curve.extended?this._extAdd(e):this._projAdd(e)},f.prototype.mul=function(e){return this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve._wnafMul(this,e)},f.prototype.mulAdd=function(e,t,i){return this.curve._wnafMulAdd(1,[this,t],[e,i],2,!1)},f.prototype.jmulAdd=function(e,t,i){return this.curve._wnafMulAdd(1,[this,t],[e,i],2,!0)},f.prototype.normalize=function(){if(this.zOne)return this;var e=this.z.redInvm();return this.x=this.x.redMul(e),this.y=this.y.redMul(e),this.t&&(this.t=this.t.redMul(e)),this.z=this.curve.one,this.zOne=!0,this},f.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},f.prototype.getX=function(){return this.normalize(),this.x.fromRed()},f.prototype.getY=function(){return this.normalize(),this.y.fromRed()},f.prototype.eq=function(e){return this===e||0===this.getX().cmp(e.getX())&&0===this.getY().cmp(e.getY())},f.prototype.eqXToP=function(e){var t=e.toRed(this.curve.red).redMul(this.z);if(0===this.x.cmp(t))return!0;for(var i=e.clone(),r=this.curve.redN.redMul(this.z);;){if(i.iadd(this.curve.n),i.cmp(this.curve.p)>=0)return!1;if(t.redIAdd(r),0===this.x.cmp(t))return!0}return!1},f.prototype.toP=f.prototype.normalize,f.prototype.mixedAdd=f.prototype.add},{"../../elliptic":"elliptic","../curve":6,"bn.js":1,inherits:32}],6:[function(e,t,i){"use strict";var r=i;r.base=e("./base"),r.short=e("./short"),r.mont=e("./mont"),r.edwards=e("./edwards")},{"./base":4,"./edwards":5,"./mont":7,"./short":8}],7:[function(e,t,i){"use strict";function r(e){s.call(this,"mont",e),this.a=new d(e.a,16).toRed(this.red),this.b=new d(e.b,16).toRed(this.red),this.i4=new d(4).toRed(this.red).redInvm(),this.two=new d(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function f(e,t,i){s.BasePoint.call(this,e,"projective"),null===t&&null===i?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new d(t,16),this.z=new d(i,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}var n=e("../curve"),d=e("bn.js"),a=e("inherits"),s=n.base,h=e("../../elliptic").utils;a(r,s),t.exports=r,r.prototype.validate=function(e){var t=e.normalize().x,i=t.redSqr(),r=i.redMul(t).redAdd(i.redMul(this.a)).redAdd(t);return 0===r.redSqrt().redSqr().cmp(r)},a(f,s.BasePoint),r.prototype.decodePoint=function(e,t){return this.point(h.toArray(e,t),1)},r.prototype.point=function(e,t){return new f(this,e,t)},r.prototype.pointFromJSON=function(e){return f.fromJSON(this,e)},f.prototype.precompute=function(){},f.prototype._encode=function(){return this.getX().toArray("be",this.curve.p.byteLength())},f.fromJSON=function(e,t){return new f(e,t[0],t[1]||e.one)},f.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},f.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},f.prototype.dbl=function(){var e=this.x.redAdd(this.z).redSqr(),t=this.x.redSub(this.z).redSqr(),i=e.redSub(t),r=e.redMul(t),f=i.redMul(t.redAdd(this.curve.a24.redMul(i)));return this.curve.point(r,f)},f.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},f.prototype.diffAdd=function(e,t){var i=this.x.redAdd(this.z),r=this.x.redSub(this.z),f=e.x.redAdd(e.z),n=e.x.redSub(e.z).redMul(i),d=f.redMul(r),a=t.z.redMul(n.redAdd(d).redSqr()),s=t.x.redMul(n.redISub(d).redSqr());return this.curve.point(a,s)},f.prototype.mul=function(e){for(var t=e.clone(),i=this,r=this.curve.point(null,null),f=this,n=[];0!==t.cmpn(0);t.iushrn(1))n.push(t.andln(1));for(var d=n.length-1;d>=0;d--)0===n[d]?(i=i.diffAdd(r,f),r=r.dbl()):(r=i.diffAdd(r,f),i=i.dbl());return r},f.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},f.prototype.jumlAdd=function(){throw new Error("Not supported on Montgomery curve")},f.prototype.eq=function(e){return 0===this.getX().cmp(e.getX())},f.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},f.prototype.getX=function(){return this.normalize(),this.x.fromRed()}},{"../../elliptic":"elliptic","../curve":6,"bn.js":1,inherits:32}],8:[function(e,t,i){"use strict";function r(e){c.call(this,"short",e),this.a=new s(e.a,16).toRed(this.red),this.b=new s(e.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(e),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function f(e,t,i,r){c.BasePoint.call(this,e,"affine"),null===t&&null===i?(this.x=null,this.y=null,this.inf=!0):(this.x=new s(t,16),this.y=new s(i,16),r&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function n(e,t,i,r){c.BasePoint.call(this,e,"jacobian"),null===t&&null===i&&null===r?(this.x=this.curve.one,this.y=this.curve.one,this.z=new s(0)):(this.x=new s(t,16),this.y=new s(i,16),this.z=new s(r,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}var d=e("../curve"),a=e("../../elliptic"),s=e("bn.js"),h=e("inherits"),c=d.base,o=a.utils.assert;h(r,c),t.exports=r,r.prototype._getEndomorphism=function(e){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var t,i;if(e.beta)t=new s(e.beta,16).toRed(this.red);else{var r=this._getEndoRoots(this.p);t=(t=r[0].cmp(r[1])<0?r[0]:r[1]).toRed(this.red)}if(e.lambda)i=new s(e.lambda,16);else{var f=this._getEndoRoots(this.n);0===this.g.mul(f[0]).x.cmp(this.g.x.redMul(t))?i=f[0]:(i=f[1],o(0===this.g.mul(i).x.cmp(this.g.x.redMul(t))))}var n;return n=e.basis?e.basis.map(function(e){return{a:new s(e.a,16),b:new s(e.b,16)}}):this._getEndoBasis(i),{beta:t,lambda:i,basis:n}}},r.prototype._getEndoRoots=function(e){var t=e===this.p?this.red:s.mont(e),i=new s(2).toRed(t).redInvm(),r=i.redNeg(),f=new s(3).toRed(t).redNeg().redSqrt().redMul(i);return[r.redAdd(f).fromRed(),r.redSub(f).fromRed()]},r.prototype._getEndoBasis=function(e){for(var t,i,r,f,n,d,a,h,c,o=this.n.ushrn(Math.floor(this.n.bitLength()/2)),u=e,b=this.n.clone(),l=new s(1),p=new s(0),m=new s(0),v=new s(1),g=0;0!==u.cmpn(0);){var y=b.div(u);h=b.sub(y.mul(u)),c=m.sub(y.mul(l));var M=v.sub(y.mul(p));if(!r&&h.cmp(o)<0)t=a.neg(),i=l,r=h.neg(),f=c;else if(r&&2==++g)break;a=h,b=u,u=h,m=l,l=c,v=p,p=M}n=h.neg(),d=c;var w=r.sqr().add(f.sqr());return n.sqr().add(d.sqr()).cmp(w)>=0&&(n=t,d=i),r.negative&&(r=r.neg(),f=f.neg()),n.negative&&(n=n.neg(),d=d.neg()),[{a:r,b:f},{a:n,b:d}]},r.prototype._endoSplit=function(e){var t=this.endo.basis,i=t[0],r=t[1],f=r.b.mul(e).divRound(this.n),n=i.b.neg().mul(e).divRound(this.n),d=f.mul(i.a),a=n.mul(r.a),s=f.mul(i.b),h=n.mul(r.b);return{k1:e.sub(d).sub(a),k2:s.add(h).neg()}},r.prototype.pointFromX=function(e,t){(e=new s(e,16)).red||(e=e.toRed(this.red));var i=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),r=i.redSqrt();if(0!==r.redSqr().redSub(i).cmp(this.zero))throw new Error("invalid point");var f=r.fromRed().isOdd();return(t&&!f||!t&&f)&&(r=r.redNeg()),this.point(e,r)},r.prototype.validate=function(e){if(e.inf)return!0;var t=e.x,i=e.y,r=this.a.redMul(t),f=t.redSqr().redMul(t).redIAdd(r).redIAdd(this.b);return 0===i.redSqr().redISub(f).cmpn(0)},r.prototype._endoWnafMulAdd=function(e,t,i){for(var r=this._endoWnafT1,f=this._endoWnafT2,n=0;n<e.length;n++){var d=this._endoSplit(t[n]),a=e[n],s=a._getBeta();d.k1.negative&&(d.k1.ineg(),a=a.neg(!0)),d.k2.negative&&(d.k2.ineg(),s=s.neg(!0)),r[2*n]=a,r[2*n+1]=s,f[2*n]=d.k1,f[2*n+1]=d.k2}for(var h=this._wnafMulAdd(1,r,f,2*n,i),c=0;c<2*n;c++)r[c]=null,f[c]=null;return h},h(f,c.BasePoint),r.prototype.point=function(e,t,i){return new f(this,e,t,i)},r.prototype.pointFromJSON=function(e,t){return f.fromJSON(this,e,t)},f.prototype._getBeta=function(){if(this.curve.endo){var e=this.precomputed;if(e&&e.beta)return e.beta;var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var i=this.curve,r=function(e){return i.point(e.x.redMul(i.endo.beta),e.y)};e.beta=t,t.precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(r)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(r)}}}return t}},f.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},f.fromJSON=function(e,t,i){function r(t){return e.point(t[0],t[1],i)}"string"==typeof t&&(t=JSON.parse(t));var f=e.point(t[0],t[1],i);if(!t[2])return f;var n=t[2];return f.precomputed={beta:null,doubles:n.doubles&&{step:n.doubles.step,points:[f].concat(n.doubles.points.map(r))},naf:n.naf&&{wnd:n.naf.wnd,points:[f].concat(n.naf.points.map(r))}},f},f.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},f.prototype.isInfinity=function(){return this.inf},f.prototype.add=function(e){if(this.inf)return e;if(e.inf)return this;if(this.eq(e))return this.dbl();if(this.neg().eq(e))return this.curve.point(null,null);if(0===this.x.cmp(e.x))return this.curve.point(null,null);var t=this.y.redSub(e.y);0!==t.cmpn(0)&&(t=t.redMul(this.x.redSub(e.x).redInvm()));var i=t.redSqr().redISub(this.x).redISub(e.x),r=t.redMul(this.x.redSub(i)).redISub(this.y);return this.curve.point(i,r)},f.prototype.dbl=function(){if(this.inf)return this;var e=this.y.redAdd(this.y);if(0===e.cmpn(0))return this.curve.point(null,null);var t=this.curve.a,i=this.x.redSqr(),r=e.redInvm(),f=i.redAdd(i).redIAdd(i).redIAdd(t).redMul(r),n=f.redSqr().redISub(this.x.redAdd(this.x)),d=f.redMul(this.x.redSub(n)).redISub(this.y);return this.curve.point(n,d)},f.prototype.getX=function(){return this.x.fromRed()},f.prototype.getY=function(){return this.y.fromRed()},f.prototype.mul=function(e){return e=new s(e,16),this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve.endo?this.curve._endoWnafMulAdd([this],[e]):this.curve._wnafMul(this,e)},f.prototype.mulAdd=function(e,t,i){var r=[this,t],f=[e,i];return this.curve.endo?this.curve._endoWnafMulAdd(r,f):this.curve._wnafMulAdd(1,r,f,2)},f.prototype.jmulAdd=function(e,t,i){var r=[this,t],f=[e,i];return this.curve.endo?this.curve._endoWnafMulAdd(r,f,!0):this.curve._wnafMulAdd(1,r,f,2,!0)},f.prototype.eq=function(e){return this===e||this.inf===e.inf&&(this.inf||0===this.x.cmp(e.x)&&0===this.y.cmp(e.y))},f.prototype.neg=function(e){if(this.inf)return this;var t=this.curve.point(this.x,this.y.redNeg());if(e&&this.precomputed){var i=this.precomputed,r=function(e){return e.neg()};t.precomputed={naf:i.naf&&{wnd:i.naf.wnd,points:i.naf.points.map(r)},doubles:i.doubles&&{step:i.doubles.step,points:i.doubles.points.map(r)}}}return t},f.prototype.toJ=function(){return this.inf?this.curve.jpoint(null,null,null):this.curve.jpoint(this.x,this.y,this.curve.one)},h(n,c.BasePoint),r.prototype.jpoint=function(e,t,i){return new n(this,e,t,i)},n.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var e=this.z.redInvm(),t=e.redSqr(),i=this.x.redMul(t),r=this.y.redMul(t).redMul(e);return this.curve.point(i,r)},n.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},n.prototype.add=function(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var t=e.z.redSqr(),i=this.z.redSqr(),r=this.x.redMul(t),f=e.x.redMul(i),n=this.y.redMul(t.redMul(e.z)),d=e.y.redMul(i.redMul(this.z)),a=r.redSub(f),s=n.redSub(d);if(0===a.cmpn(0))return 0!==s.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var h=a.redSqr(),c=h.redMul(a),o=r.redMul(h),u=s.redSqr().redIAdd(c).redISub(o).redISub(o),b=s.redMul(o.redISub(u)).redISub(n.redMul(c)),l=this.z.redMul(e.z).redMul(a);return this.curve.jpoint(u,b,l)},n.prototype.mixedAdd=function(e){if(this.isInfinity())return e.toJ();if(e.isInfinity())return this;var t=this.z.redSqr(),i=this.x,r=e.x.redMul(t),f=this.y,n=e.y.redMul(t).redMul(this.z),d=i.redSub(r),a=f.redSub(n);if(0===d.cmpn(0))return 0!==a.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var s=d.redSqr(),h=s.redMul(d),c=i.redMul(s),o=a.redSqr().redIAdd(h).redISub(c).redISub(c),u=a.redMul(c.redISub(o)).redISub(f.redMul(h)),b=this.z.redMul(d);return this.curve.jpoint(o,u,b)},n.prototype.dblp=function(e){if(0===e)return this;if(this.isInfinity())return this;if(!e)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var t=this,i=0;i<e;i++)t=t.dbl();return t}for(var r=this.curve.a,f=this.curve.tinv,n=this.x,d=this.y,a=this.z,s=a.redSqr().redSqr(),h=d.redAdd(d),i=0;i<e;i++){var c=n.redSqr(),o=h.redSqr(),u=o.redSqr(),b=c.redAdd(c).redIAdd(c).redIAdd(r.redMul(s)),l=n.redMul(o),p=b.redSqr().redISub(l.redAdd(l)),m=l.redISub(p),v=b.redMul(m);v=v.redIAdd(v).redISub(u);var g=h.redMul(a);i+1<e&&(s=s.redMul(u)),n=p,a=g,h=v}return this.curve.jpoint(n,h.redMul(f),a)},n.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},n.prototype._zeroDbl=function(){var e,t,i;if(this.zOne){var r=this.x.redSqr(),f=this.y.redSqr(),n=f.redSqr(),d=this.x.redAdd(f).redSqr().redISub(r).redISub(n);d=d.redIAdd(d);var a=r.redAdd(r).redIAdd(r),s=a.redSqr().redISub(d).redISub(d),h=n.redIAdd(n);h=(h=h.redIAdd(h)).redIAdd(h),e=s,t=a.redMul(d.redISub(s)).redISub(h),i=this.y.redAdd(this.y)}else{var c=this.x.redSqr(),o=this.y.redSqr(),u=o.redSqr(),b=this.x.redAdd(o).redSqr().redISub(c).redISub(u);b=b.redIAdd(b);var l=c.redAdd(c).redIAdd(c),p=l.redSqr(),m=u.redIAdd(u);m=(m=m.redIAdd(m)).redIAdd(m),e=p.redISub(b).redISub(b),t=l.redMul(b.redISub(e)).redISub(m),i=(i=this.y.redMul(this.z)).redIAdd(i)}return this.curve.jpoint(e,t,i)},n.prototype._threeDbl=function(){var e,t,i;if(this.zOne){var r=this.x.redSqr(),f=this.y.redSqr(),n=f.redSqr(),d=this.x.redAdd(f).redSqr().redISub(r).redISub(n);d=d.redIAdd(d);var a=r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),s=a.redSqr().redISub(d).redISub(d);e=s;var h=n.redIAdd(n);h=(h=h.redIAdd(h)).redIAdd(h),t=a.redMul(d.redISub(s)).redISub(h),i=this.y.redAdd(this.y)}else{var c=this.z.redSqr(),o=this.y.redSqr(),u=this.x.redMul(o),b=this.x.redSub(c).redMul(this.x.redAdd(c));b=b.redAdd(b).redIAdd(b);var l=u.redIAdd(u),p=(l=l.redIAdd(l)).redAdd(l);e=b.redSqr().redISub(p),i=this.y.redAdd(this.z).redSqr().redISub(o).redISub(c);var m=o.redSqr();m=(m=(m=m.redIAdd(m)).redIAdd(m)).redIAdd(m),t=b.redMul(l.redISub(e)).redISub(m)}return this.curve.jpoint(e,t,i)},n.prototype._dbl=function(){var e=this.curve.a,t=this.x,i=this.y,r=this.z,f=r.redSqr().redSqr(),n=t.redSqr(),d=i.redSqr(),a=n.redAdd(n).redIAdd(n).redIAdd(e.redMul(f)),s=t.redAdd(t),h=(s=s.redIAdd(s)).redMul(d),c=a.redSqr().redISub(h.redAdd(h)),o=h.redISub(c),u=d.redSqr();u=(u=(u=u.redIAdd(u)).redIAdd(u)).redIAdd(u);var b=a.redMul(o).redISub(u),l=i.redAdd(i).redMul(r);return this.curve.jpoint(c,b,l)},n.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var e=this.x.redSqr(),t=this.y.redSqr(),i=this.z.redSqr(),r=t.redSqr(),f=e.redAdd(e).redIAdd(e),n=f.redSqr(),d=this.x.redAdd(t).redSqr().redISub(e).redISub(r),a=(d=(d=(d=d.redIAdd(d)).redAdd(d).redIAdd(d)).redISub(n)).redSqr(),s=r.redIAdd(r);s=(s=(s=s.redIAdd(s)).redIAdd(s)).redIAdd(s);var h=f.redIAdd(d).redSqr().redISub(n).redISub(a).redISub(s),c=t.redMul(h);c=(c=c.redIAdd(c)).redIAdd(c);var o=this.x.redMul(a).redISub(c);o=(o=o.redIAdd(o)).redIAdd(o);var u=this.y.redMul(h.redMul(s.redISub(h)).redISub(d.redMul(a)));u=(u=(u=u.redIAdd(u)).redIAdd(u)).redIAdd(u);var b=this.z.redAdd(d).redSqr().redISub(i).redISub(a);return this.curve.jpoint(o,u,b)},n.prototype.mul=function(e,t){return e=new s(e,t),this.curve._wnafMul(this,e)},n.prototype.eq=function(e){if("affine"===e.type)return this.eq(e.toJ());if(this===e)return!0;var t=this.z.redSqr(),i=e.z.redSqr();if(0!==this.x.redMul(i).redISub(e.x.redMul(t)).cmpn(0))return!1;var r=t.redMul(this.z),f=i.redMul(e.z);return 0===this.y.redMul(f).redISub(e.y.redMul(r)).cmpn(0)},n.prototype.eqXToP=function(e){var t=this.z.redSqr(),i=e.toRed(this.curve.red).redMul(t);if(0===this.x.cmp(i))return!0;for(var r=e.clone(),f=this.curve.redN.redMul(t);;){if(r.iadd(this.curve.n),r.cmp(this.curve.p)>=0)return!1;if(i.redIAdd(f),0===this.x.cmp(i))return!0}return!1},n.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},n.prototype.isInfinity=function(){return 0===this.z.cmpn(0)}},{"../../elliptic":"elliptic","../curve":6,"bn.js":1,inherits:32}],9:[function(e,t,i){"use strict";function r(e){"short"===e.type?this.curve=new a.curve.short(e):"edwards"===e.type?this.curve=new a.curve.edwards(e):this.curve=new a.curve.mont(e),this.g=this.curve.g,this.n=this.curve.n,this.hash=e.hash,s(this.g.validate(),"Invalid curve"),s(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function f(e,t){Object.defineProperty(n,e,{configurable:!0,enumerable:!0,get:function(){var i=new r(t);return Object.defineProperty(n,e,{configurable:!0,enumerable:!0,value:i}),i}})}var n=i,d=e("hash.js"),a=e("../elliptic"),s=a.utils.assert;n.PresetCurve=r,f("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:d.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),f("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:d.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),f("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:d.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),f("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:d.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),f("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:d.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),f("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:d.sha256,gRed:!1,g:["9"]}),f("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:d.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});var h;try{h=e("./precomputed/secp256k1")}catch(e){h=void 0}f("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:d.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",h]})},{"../elliptic":"elliptic","./precomputed/secp256k1":16,"hash.js":19}],10:[function(e,t,i){"use strict";function r(e){if(!(this instanceof r))return new r(e);"string"==typeof e&&(a(d.curves.hasOwnProperty(e),"Unknown curve "+e),e=d.curves[e]),e instanceof d.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash}var f=e("bn.js"),n=e("hmac-drbg"),d=e("../../elliptic"),a=d.utils.assert,s=e("./key"),h=e("./signature");t.exports=r,r.prototype.keyPair=function(e){return new s(this,e)},r.prototype.keyFromPrivate=function(e,t){return s.fromPrivate(this,e,t)},r.prototype.keyFromPublic=function(e,t){return s.fromPublic(this,e,t)},r.prototype.genKeyPair=function(e){e||(e={});for(var t=new n({hash:this.hash,pers:e.pers,persEnc:e.persEnc||"utf8",entropy:e.entropy||d.rand(this.hash.hmacStrength),entropyEnc:e.entropy&&e.entropyEnc||"utf8",nonce:this.n.toArray()}),i=this.n.byteLength(),r=this.n.sub(new f(2));;){var a=new f(t.generate(i));if(!(a.cmp(r)>0))return a.iaddn(1),this.keyFromPrivate(a)}},r.prototype._truncateToN=function(e,t){var i=8*e.byteLength()-this.n.bitLength();return i>0&&(e=e.ushrn(i)),!t&&e.cmp(this.n)>=0?e.sub(this.n):e},r.prototype.sign=function(e,t,i,r){"object"==typeof i&&(r=i,i=null),r||(r={}),t=this.keyFromPrivate(t,i),e=this._truncateToN(new f(e,16));for(var d=this.n.byteLength(),a=t.getPrivate().toArray("be",d),s=e.toArray("be",d),c=new n({hash:this.hash,entropy:a,nonce:s,pers:r.pers,persEnc:r.persEnc||"utf8"}),o=this.n.sub(new f(1)),u=0;!0;u++){var b=r.k?r.k(u):new f(c.generate(this.n.byteLength()));if(!((b=this._truncateToN(b,!0)).cmpn(1)<=0||b.cmp(o)>=0)){var l=this.g.mul(b);if(!l.isInfinity()){var p=l.getX(),m=p.umod(this.n);if(0!==m.cmpn(0)){var v=b.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));if(0!==(v=v.umod(this.n)).cmpn(0)){var g=(l.getY().isOdd()?1:0)|(0!==p.cmp(m)?2:0);return r.canonical&&v.cmp(this.nh)>0&&(v=this.n.sub(v),g^=1),new h({r:m,s:v,recoveryParam:g})}}}}}},r.prototype.verify=function(e,t,i,r){e=this._truncateToN(new f(e,16)),i=this.keyFromPublic(i,r);var n=(t=new h(t,"hex")).r,d=t.s;if(n.cmpn(1)<0||n.cmp(this.n)>=0)return!1;if(d.cmpn(1)<0||d.cmp(this.n)>=0)return!1;var a=d.invm(this.n),s=a.mul(e).umod(this.n),c=a.mul(n).umod(this.n);if(!this.curve._maxwellTrick)return!(o=this.g.mulAdd(s,i.getPublic(),c)).isInfinity()&&0===o.getX().umod(this.n).cmp(n);var o=this.g.jmulAdd(s,i.getPublic(),c);return!o.isInfinity()&&o.eqXToP(n)},r.prototype.recoverPubKey=function(e,t,i,r){a((3&i)===i,"The recovery param is more than two bits"),t=new h(t,r);var n=this.n,d=new f(e),s=t.r,c=t.s,o=1&i,u=i>>1;if(s.cmp(this.curve.p.umod(this.curve.n))>=0&&u)throw new Error("Unable to find sencond key candinate");s=u?this.curve.pointFromX(s.add(this.curve.n),o):this.curve.pointFromX(s,o);var b=t.r.invm(n),l=n.sub(d).mul(b).umod(n),p=c.mul(b).umod(n);return this.g.mulAdd(l,s,p)},r.prototype.getKeyRecoveryParam=function(e,t,i,r){if(null!==(t=new h(t,r)).recoveryParam)return t.recoveryParam;for(var f=0;f<4;f++){var n;try{n=this.recoverPubKey(e,t,f)}catch(e){continue}if(n.eq(i))return f}throw new Error("Unable to find valid recovery factor")}},{"../../elliptic":"elliptic","./key":11,"./signature":12,"bn.js":1,"hmac-drbg":31}],11:[function(e,t,i){"use strict";function r(e,t){this.ec=e,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc)}var f=e("bn.js"),n=e("../../elliptic").utils.assert;t.exports=r,r.fromPublic=function(e,t,i){return t instanceof r?t:new r(e,{pub:t,pubEnc:i})},r.fromPrivate=function(e,t,i){return t instanceof r?t:new r(e,{priv:t,privEnc:i})},r.prototype.validate=function(){var e=this.getPublic();return e.isInfinity()?{result:!1,reason:"Invalid public key"}:e.validate()?e.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},r.prototype.getPublic=function(e,t){return"string"==typeof e&&(t=e,e=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,e):this.pub},r.prototype.getPrivate=function(e){return"hex"===e?this.priv.toString(16,2):this.priv},r.prototype._importPrivate=function(e,t){this.priv=new f(e,t||16),this.priv=this.priv.umod(this.ec.curve.n)},r.prototype._importPublic=function(e,t){if(e.x||e.y)return"mont"===this.ec.curve.type?n(e.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||n(e.x&&e.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(e.x,e.y));this.pub=this.ec.curve.decodePoint(e,t)},r.prototype.derive=function(e){return e.mul(this.priv).getX()},r.prototype.sign=function(e,t,i){return this.ec.sign(e,this,t,i)},r.prototype.verify=function(e,t){return this.ec.verify(e,t,this)},r.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"}},{"../../elliptic":"elliptic","bn.js":1}],12:[function(e,t,i){"use strict";function r(e,t){if(e instanceof r)return e;this._importDER(e,t)||(c(e.r&&e.s,"Signature without r or s"),this.r=new s(e.r,16),this.s=new s(e.s,16),void 0===e.recoveryParam?this.recoveryParam=null:this.recoveryParam=e.recoveryParam)}function f(){this.place=0}function n(e,t){var i=e[t.place++];if(!(128&i))return i;for(var r=15&i,f=0,n=0,d=t.place;n<r;n++,d++)f<<=8,f|=e[d];return t.place=d,f}function d(e){for(var t=0,i=e.length-1;!e[t]&&!(128&e[t+1])&&t<i;)t++;return 0===t?e:e.slice(t)}function a(e,t){if(t<128)e.push(t);else{var i=1+(Math.log(t)/Math.LN2>>>3);for(e.push(128|i);--i;)e.push(t>>>(i<<3)&255);e.push(t)}}var s=e("bn.js"),h=e("../../elliptic").utils,c=h.assert;t.exports=r,r.prototype._importDER=function(e,t){e=h.toArray(e,t);var i=new f;if(48!==e[i.place++])return!1;if(n(e,i)+i.place!==e.length)return!1;if(2!==e[i.place++])return!1;var r=n(e,i),d=e.slice(i.place,r+i.place);if(i.place+=r,2!==e[i.place++])return!1;var a=n(e,i);if(e.length!==a+i.place)return!1;var c=e.slice(i.place,a+i.place);return 0===d[0]&&128&d[1]&&(d=d.slice(1)),0===c[0]&&128&c[1]&&(c=c.slice(1)),this.r=new s(d),this.s=new s(c),this.recoveryParam=null,!0},r.prototype.toDER=function(e){var t=this.r.toArray(),i=this.s.toArray();for(128&t[0]&&(t=[0].concat(t)),128&i[0]&&(i=[0].concat(i)),t=d(t),i=d(i);!(i[0]||128&i[1]);)i=i.slice(1);var r=[2];a(r,t.length),(r=r.concat(t)).push(2),a(r,i.length);var f=r.concat(i),n=[48];return a(n,f.length),n=n.concat(f),h.encode(n,e)}},{"../../elliptic":"elliptic","bn.js":1}],13:[function(e,t,i){"use strict";function r(e){if(a("ed25519"===e,"only tested with ed25519 so far"),!(this instanceof r))return new r(e);var e=n.curves[e].curve;this.curve=e,this.g=e.g,this.g.precompute(e.n.bitLength()+1),this.pointClass=e.point().constructor,this.encodingLength=Math.ceil(e.n.bitLength()/8),this.hash=f.sha512}var f=e("hash.js"),n=e("../../elliptic"),d=n.utils,a=d.assert,s=d.parseBytes,h=e("./key"),c=e("./signature");t.exports=r,r.prototype.sign=function(e,t){e=s(e);var i=this.keyFromSecret(t),r=this.hashInt(i.messagePrefix(),e),f=this.g.mul(r),n=this.encodePoint(f),d=this.hashInt(n,i.pubBytes(),e).mul(i.priv()),a=r.add(d).umod(this.curve.n);return this.makeSignature({R:f,S:a,Rencoded:n})},r.prototype.verify=function(e,t,i){e=s(e),t=this.makeSignature(t);var r=this.keyFromPublic(i),f=this.hashInt(t.Rencoded(),r.pubBytes(),e),n=this.g.mul(t.S());return t.R().add(r.pub().mul(f)).eq(n)},r.prototype.hashInt=function(){for(var e=this.hash(),t=0;t<arguments.length;t++)e.update(arguments[t]);return d.intFromLE(e.digest()).umod(this.curve.n)},r.prototype.keyFromPublic=function(e){return h.fromPublic(this,e)},r.prototype.keyFromSecret=function(e){return h.fromSecret(this,e)},r.prototype.makeSignature=function(e){return e instanceof c?e:new c(this,e)},r.prototype.encodePoint=function(e){var t=e.getY().toArray("le",this.encodingLength);return t[this.encodingLength-1]|=e.getX().isOdd()?128:0,t},r.prototype.decodePoint=function(e){var t=(e=d.parseBytes(e)).length-1,i=e.slice(0,t).concat(-129&e[t]),r=0!=(128&e[t]),f=d.intFromLE(i);return this.curve.pointFromY(f,r)},r.prototype.encodeInt=function(e){return e.toArray("le",this.encodingLength)},r.prototype.decodeInt=function(e){return d.intFromLE(e)},r.prototype.isPoint=function(e){return e instanceof this.pointClass}},{"../../elliptic":"elliptic","./key":14,"./signature":15,"hash.js":19}],14:[function(e,t,i){"use strict";function r(e,t){this.eddsa=e,this._secret=d(t.secret),e.isPoint(t.pub)?this._pub=t.pub:this._pubBytes=d(t.pub)}var f=e("../../elliptic").utils,n=f.assert,d=f.parseBytes,a=f.cachedProperty;r.fromPublic=function(e,t){return t instanceof r?t:new r(e,{pub:t})},r.fromSecret=function(e,t){return t instanceof r?t:new r(e,{secret:t})},r.prototype.secret=function(){return this._secret},a(r,"pubBytes",function(){return this.eddsa.encodePoint(this.pub())}),a(r,"pub",function(){return this._pubBytes?this.eddsa.decodePoint(this._pubBytes):this.eddsa.g.mul(this.priv())}),a(r,"privBytes",function(){var e=this.eddsa,t=this.hash(),i=e.encodingLength-1,r=t.slice(0,e.encodingLength);return r[0]&=248,r[i]&=127,r[i]|=64,r}),a(r,"priv",function(){return this.eddsa.decodeInt(this.privBytes())}),a(r,"hash",function(){return this.eddsa.hash().update(this.secret()).digest()}),a(r,"messagePrefix",function(){return this.hash().slice(this.eddsa.encodingLength)}),r.prototype.sign=function(e){return n(this._secret,"KeyPair can only verify"),this.eddsa.sign(e,this)},r.prototype.verify=function(e,t){return this.eddsa.verify(e,t,this)},r.prototype.getSecret=function(e){return n(this._secret,"KeyPair is public only"),f.encode(this.secret(),e)},r.prototype.getPublic=function(e){return f.encode(this.pubBytes(),e)},t.exports=r},{"../../elliptic":"elliptic"}],15:[function(e,t,i){"use strict";function r(e,t){this.eddsa=e,"object"!=typeof t&&(t=s(t)),Array.isArray(t)&&(t={R:t.slice(0,e.encodingLength),S:t.slice(e.encodingLength)}),d(t.R&&t.S,"Signature without R or S"),e.isPoint(t.R)&&(this._R=t.R),t.S instanceof f&&(this._S=t.S),this._Rencoded=Array.isArray(t.R)?t.R:t.Rencoded,this._Sencoded=Array.isArray(t.S)?t.S:t.Sencoded}var f=e("bn.js"),n=e("../../elliptic").utils,d=n.assert,a=n.cachedProperty,s=n.parseBytes;a(r,"S",function(){return this.eddsa.decodeInt(this.Sencoded())}),a(r,"R",function(){return this.eddsa.decodePoint(this.Rencoded())}),a(r,"Rencoded",function(){return this.eddsa.encodePoint(this.R())}),a(r,"Sencoded",function(){return this.eddsa.encodeInt(this.S())}),r.prototype.toBytes=function(){return this.Rencoded().concat(this.Sencoded())},r.prototype.toHex=function(){return n.encode(this.toBytes(),"hex").toUpperCase()},t.exports=r},{"../../elliptic":"elliptic","bn.js":1}],16:[function(e,t,i){t.exports={doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}}},{}],17:[function(e,t,i){"use strict";var r=i,f=e("bn.js"),n=e("minimalistic-assert"),d=e("minimalistic-crypto-utils");r.assert=n,r.toArray=d.toArray,r.zero2=d.zero2,r.toHex=d.toHex,r.encode=d.encode,r.getNAF=function(e,t){for(var i=[],r=1<<t+1,f=e.clone();f.cmpn(1)>=0;){var n;if(f.isOdd()){var d=f.andln(r-1);n=d>(r>>1)-1?(r>>1)-d:d,f.isubn(n)}else n=0;i.push(n);for(var a=0!==f.cmpn(0)&&0===f.andln(r-1)?t+1:1,s=1;s<a;s++)i.push(0);f.iushrn(a)}return i},r.getJSF=function(e,t){var i=[[],[]];e=e.clone(),t=t.clone();for(var r=0,f=0;e.cmpn(-r)>0||t.cmpn(-f)>0;){var n=e.andln(3)+r&3,d=t.andln(3)+f&3;3===n&&(n=-1),3===d&&(d=-1);var a;a=0==(1&n)?0:3!=(h=e.andln(7)+r&7)&&5!==h||2!==d?n:-n,i[0].push(a);var s;if(0==(1&d))s=0;else{var h=t.andln(7)+f&7;s=3!==h&&5!==h||2!==n?d:-d}i[1].push(s),2*r===a+1&&(r=1-r),2*f===s+1&&(f=1-f),e.iushrn(1),t.iushrn(1)}return i},r.cachedProperty=function(e,t,i){var r="_"+t;e.prototype[t]=function(){return void 0!==this[r]?this[r]:this[r]=i.call(this)}},r.parseBytes=function(e){return"string"==typeof e?r.toArray(e,"hex"):e},r.intFromLE=function(e){return new f(e,"hex","le")}},{"bn.js":1,"minimalistic-assert":33,"minimalistic-crypto-utils":34}],18:[function(e,t,i){t.exports={name:"elliptic",version:"6.4.0",description:"EC cryptography",main:"lib/elliptic.js",files:["lib"],scripts:{jscs:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",jshint:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",lint:"npm run jscs && npm run jshint",unit:"istanbul test _mocha --reporter=spec test/index.js",test:"npm run lint && npm run unit",version:"grunt dist && git add dist/"},repository:{type:"git",url:"git@github.com:indutny/elliptic"},keywords:["EC","Elliptic","curve","Cryptography"],author:"Fedor Indutny <fedor@indutny.com>",license:"MIT",bugs:{url:"https://github.com/indutny/elliptic/issues"},homepage:"https://github.com/indutny/elliptic",devDependencies:{brfs:"^1.4.3",coveralls:"^2.11.3",grunt:"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2",istanbul:"^0.4.2",jscs:"^2.9.0",jshint:"^2.6.0",mocha:"^2.1.0"},dependencies:{"bn.js":"^4.4.0",brorand:"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0",inherits:"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"}}},{}],19:[function(e,t,i){var r=i;r.utils=e("./hash/utils"),r.common=e("./hash/common"),r.sha=e("./hash/sha"),r.ripemd=e("./hash/ripemd"),r.hmac=e("./hash/hmac"),r.sha1=r.sha.sha1,r.sha256=r.sha.sha256,r.sha224=r.sha.sha224,r.sha384=r.sha.sha384,r.sha512=r.sha.sha512,r.ripemd160=r.ripemd.ripemd160},{"./hash/common":20,"./hash/hmac":21,"./hash/ripemd":22,"./hash/sha":23,"./hash/utils":30}],20:[function(e,t,i){"use strict";function r(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}var f=e("./utils"),n=e("minimalistic-assert");i.BlockHash=r,r.prototype.update=function(e,t){if(e=f.toArray(e,t),this.pending?this.pending=this.pending.concat(e):this.pending=e,this.pendingTotal+=e.length,this.pending.length>=this._delta8){var i=(e=this.pending).length%this._delta8;this.pending=e.slice(e.length-i,e.length),0===this.pending.length&&(this.pending=null),e=f.join32(e,0,e.length-i,this.endian);for(var r=0;r<e.length;r+=this._delta32)this._update(e,r,r+this._delta32)}return this},r.prototype.digest=function(e){return this.update(this._pad()),n(null===this.pending),this._digest(e)},r.prototype._pad=function(){var e=this.pendingTotal,t=this._delta8,i=t-(e+this.padLength)%t,r=new Array(i+this.padLength);r[0]=128;for(var f=1;f<i;f++)r[f]=0;if(e<<=3,"big"===this.endian){for(var n=8;n<this.padLength;n++)r[f++]=0;r[f++]=0,r[f++]=0,r[f++]=0,r[f++]=0,r[f++]=e>>>24&255,r[f++]=e>>>16&255,r[f++]=e>>>8&255,r[f++]=255&e}else for(r[f++]=255&e,r[f++]=e>>>8&255,r[f++]=e>>>16&255,r[f++]=e>>>24&255,r[f++]=0,r[f++]=0,r[f++]=0,r[f++]=0,n=8;n<this.padLength;n++)r[f++]=0;return r}},{"./utils":30,"minimalistic-assert":33}],21:[function(e,t,i){"use strict";function r(e,t,i){if(!(this instanceof r))return new r(e,t,i);this.Hash=e,this.blockSize=e.blockSize/8,this.outSize=e.outSize/8,this.inner=null,this.outer=null,this._init(f.toArray(t,i))}var f=e("./utils"),n=e("minimalistic-assert");t.exports=r,r.prototype._init=function(e){e.length>this.blockSize&&(e=(new this.Hash).update(e).digest()),n(e.length<=this.blockSize);for(var t=e.length;t<this.blockSize;t++)e.push(0);for(t=0;t<e.length;t++)e[t]^=54;for(this.inner=(new this.Hash).update(e),t=0;t<e.length;t++)e[t]^=106;this.outer=(new this.Hash).update(e)},r.prototype.update=function(e,t){return this.inner.update(e,t),this},r.prototype.digest=function(e){return this.outer.update(this.inner.digest()),this.outer.digest(e)}},{"./utils":30,"minimalistic-assert":33}],22:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;b.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little"}function f(e,t,i,r){return e<=15?t^i^r:e<=31?t&i|~t&r:e<=47?(t|~i)^r:e<=63?t&r|i&~r:t^(i|~r)}function n(e){return e<=15?0:e<=31?1518500249:e<=47?1859775393:e<=63?2400959708:2840853838}function d(e){return e<=15?1352829926:e<=31?1548603684:e<=47?1836072691:e<=63?2053994217:0}var a=e("./utils"),s=e("./common"),h=a.rotl32,c=a.sum32,o=a.sum32_3,u=a.sum32_4,b=s.BlockHash;a.inherits(r,b),i.ripemd160=r,r.blockSize=512,r.outSize=160,r.hmacStrength=192,r.padLength=64,r.prototype._update=function(e,t){for(var i=this.h[0],r=this.h[1],a=this.h[2],s=this.h[3],b=this.h[4],g=i,y=r,M=a,w=s,S=b,_=0;_<80;_++){var A=c(h(u(i,f(_,r,a,s),e[l[_]+t],n(_)),m[_]),b);i=b,b=s,s=h(a,10),a=r,r=A,A=c(h(u(g,f(79-_,y,M,w),e[p[_]+t],d(_)),v[_]),S),g=S,S=w,w=h(M,10),M=y,y=A}A=o(this.h[1],a,w),this.h[1]=o(this.h[2],s,S),this.h[2]=o(this.h[3],b,g),this.h[3]=o(this.h[4],i,y),this.h[4]=o(this.h[0],r,M),this.h[0]=A},r.prototype._digest=function(e){return"hex"===e?a.toHex32(this.h,"little"):a.split32(this.h,"little")};var l=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],p=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],m=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],v=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]},{"./common":20,"./utils":30}],23:[function(e,t,i){"use strict";i.sha1=e("./sha/1"),i.sha224=e("./sha/224"),i.sha256=e("./sha/256"),i.sha384=e("./sha/384"),i.sha512=e("./sha/512")},{"./sha/1":24,"./sha/224":25,"./sha/256":26,"./sha/384":27,"./sha/512":28}],24:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;o.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.W=new Array(80)}var f=e("../utils"),n=e("../common"),d=e("./common"),a=f.rotl32,s=f.sum32,h=f.sum32_5,c=d.ft_1,o=n.BlockHash,u=[1518500249,1859775393,2400959708,3395469782];f.inherits(r,o),t.exports=r,r.blockSize=512,r.outSize=160,r.hmacStrength=80,r.padLength=64,r.prototype._update=function(e,t){for(var i=this.W,r=0;r<16;r++)i[r]=e[t+r];for(;r<i.length;r++)i[r]=a(i[r-3]^i[r-8]^i[r-14]^i[r-16],1);var f=this.h[0],n=this.h[1],d=this.h[2],o=this.h[3],b=this.h[4];for(r=0;r<i.length;r++){var l=~~(r/20),p=h(a(f,5),c(l,n,d,o),b,i[r],u[l]);b=o,o=d,d=a(n,30),n=f,f=p}this.h[0]=s(this.h[0],f),this.h[1]=s(this.h[1],n),this.h[2]=s(this.h[2],d),this.h[3]=s(this.h[3],o),this.h[4]=s(this.h[4],b)},r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h,"big"):f.split32(this.h,"big")}},{"../common":20,"../utils":30,"./common":29}],25:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;n.call(this),this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]}var f=e("../utils"),n=e("./256");f.inherits(r,n),t.exports=r,r.blockSize=512,r.outSize=224,r.hmacStrength=192,r.padLength=64,r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h.slice(0,7),"big"):f.split32(this.h.slice(0,7),"big")}},{"../utils":30,"./256":26}],26:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;v.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=g,this.W=new Array(64)}var f=e("../utils"),n=e("../common"),d=e("./common"),a=e("minimalistic-assert"),s=f.sum32,h=f.sum32_4,c=f.sum32_5,o=d.ch32,u=d.maj32,b=d.s0_256,l=d.s1_256,p=d.g0_256,m=d.g1_256,v=n.BlockHash,g=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];f.inherits(r,v),t.exports=r,r.blockSize=512,r.outSize=256,r.hmacStrength=192,r.padLength=64,r.prototype._update=function(e,t){for(var i=this.W,r=0;r<16;r++)i[r]=e[t+r];for(;r<i.length;r++)i[r]=h(m(i[r-2]),i[r-7],p(i[r-15]),i[r-16]);var f=this.h[0],n=this.h[1],d=this.h[2],v=this.h[3],g=this.h[4],y=this.h[5],M=this.h[6],w=this.h[7];for(a(this.k.length===i.length),r=0;r<i.length;r++){var S=c(w,l(g),o(g,y,M),this.k[r],i[r]),_=s(b(f),u(f,n,d));w=M,M=y,y=g,g=s(v,S),v=d,d=n,n=f,f=s(S,_)}this.h[0]=s(this.h[0],f),this.h[1]=s(this.h[1],n),this.h[2]=s(this.h[2],d),this.h[3]=s(this.h[3],v),this.h[4]=s(this.h[4],g),this.h[5]=s(this.h[5],y),this.h[6]=s(this.h[6],M),this.h[7]=s(this.h[7],w)},r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h,"big"):f.split32(this.h,"big")}},{"../common":20,"../utils":30,"./common":29,"minimalistic-assert":33}],27:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;n.call(this),this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]}var f=e("../utils"),n=e("./512");f.inherits(r,n),t.exports=r,r.blockSize=1024,r.outSize=384,r.hmacStrength=192,r.padLength=128,r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h.slice(0,12),"big"):f.split32(this.h.slice(0,12),"big")}},{"../utils":30,"./512":28}],28:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;R.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=P,this.W=new Array(160)}function f(e,t,i,r,f){var n=e&i^~e&f;return n<0&&(n+=4294967296),n}function n(e,t,i,r,f,n){var d=t&r^~t&n;return d<0&&(d+=4294967296),d}function d(e,t,i,r,f){var n=e&i^e&f^i&f;return n<0&&(n+=4294967296),n}function a(e,t,i,r,f,n){var d=t&r^t&n^r&n;return d<0&&(d+=4294967296),d}function s(e,t){var i=y(e,t,28)^y(t,e,2)^y(t,e,7);return i<0&&(i+=4294967296),i}function h(e,t){var i=M(e,t,28)^M(t,e,2)^M(t,e,7);return i<0&&(i+=4294967296),i}function c(e,t){var i=y(e,t,14)^y(e,t,18)^y(t,e,9);return i<0&&(i+=4294967296),i}function o(e,t){var i=M(e,t,14)^M(e,t,18)^M(t,e,9);return i<0&&(i+=4294967296),i}function u(e,t){var i=y(e,t,1)^y(e,t,8)^w(e,t,7);return i<0&&(i+=4294967296),i}function b(e,t){var i=M(e,t,1)^M(e,t,8)^S(e,t,7);return i<0&&(i+=4294967296),i}function l(e,t){var i=y(e,t,19)^y(t,e,29)^w(e,t,6);return i<0&&(i+=4294967296),i}function p(e,t){var i=M(e,t,19)^M(t,e,29)^S(e,t,6);return i<0&&(i+=4294967296),i}var m=e("../utils"),v=e("../common"),g=e("minimalistic-assert"),y=m.rotr64_hi,M=m.rotr64_lo,w=m.shr64_hi,S=m.shr64_lo,_=m.sum64,A=m.sum64_hi,x=m.sum64_lo,I=m.sum64_4_hi,z=m.sum64_4_lo,q=m.sum64_5_hi,k=m.sum64_5_lo,R=v.BlockHash,P=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];m.inherits(r,R),t.exports=r,r.blockSize=1024,r.outSize=512,r.hmacStrength=192,r.padLength=128,r.prototype._prepareBlock=function(e,t){for(var i=this.W,r=0;r<32;r++)i[r]=e[t+r];for(;r<i.length;r+=2){var f=l(i[r-4],i[r-3]),n=p(i[r-4],i[r-3]),d=i[r-14],a=i[r-13],s=u(i[r-30],i[r-29]),h=b(i[r-30],i[r-29]),c=i[r-32],o=i[r-31];i[r]=I(f,n,d,a,s,h,c,o),i[r+1]=z(f,n,d,a,s,h,c,o)}},r.prototype._update=function(e,t){this._prepareBlock(e,t);var i=this.W,r=this.h[0],u=this.h[1],b=this.h[2],l=this.h[3],p=this.h[4],m=this.h[5],v=this.h[6],y=this.h[7],M=this.h[8],w=this.h[9],S=this.h[10],I=this.h[11],z=this.h[12],R=this.h[13],P=this.h[14],j=this.h[15];g(this.k.length===i.length);for(var L=0;L<i.length;L+=2){var E=P,N=j,B=c(M,w),O=o(M,w),F=f(M,0,S,0,z),T=n(0,w,0,I,0,R),C=this.k[L],H=this.k[L+1],Z=i[L],J=i[L+1],D=q(E,N,B,O,F,T,C,H,Z,J),U=k(E,N,B,O,F,T,C,H,Z,J);E=s(r,u),N=h(r,u),B=d(r,0,b,0,p),O=a(0,u,0,l,0,m);var X=A(E,N,B,O),K=x(E,N,B,O);P=z,j=R,z=S,R=I,S=M,I=w,M=A(v,y,D,U),w=x(y,y,D,U),v=p,y=m,p=b,m=l,b=r,l=u,r=A(D,U,X,K),u=x(D,U,X,K)}_(this.h,0,r,u),_(this.h,2,b,l),_(this.h,4,p,m),_(this.h,6,v,y),_(this.h,8,M,w),_(this.h,10,S,I),_(this.h,12,z,R),_(this.h,14,P,j)},r.prototype._digest=function(e){return"hex"===e?m.toHex32(this.h,"big"):m.split32(this.h,"big")}},{"../common":20,"../utils":30,"minimalistic-assert":33}],29:[function(e,t,i){"use strict";function r(e,t,i){return e&t^~e&i}function f(e,t,i){return e&t^e&i^t&i}function n(e,t,i){return e^t^i}var d=e("../utils").rotr32;i.ft_1=function(e,t,i,d){return 0===e?r(t,i,d):1===e||3===e?n(t,i,d):2===e?f(t,i,d):void 0},i.ch32=r,i.maj32=f,i.p32=n,i.s0_256=function(e){return d(e,2)^d(e,13)^d(e,22)},i.s1_256=function(e){return d(e,6)^d(e,11)^d(e,25)},i.g0_256=function(e){return d(e,7)^d(e,18)^e>>>3},i.g1_256=function(e){return d(e,17)^d(e,19)^e>>>10}},{"../utils":30}],30:[function(e,t,i){"use strict";function r(e){return(e>>>24|e>>>8&65280|e<<8&16711680|(255&e)<<24)>>>0}function f(e){return 1===e.length?"0"+e:e}function n(e){return 7===e.length?"0"+e:6===e.length?"00"+e:5===e.length?"000"+e:4===e.length?"0000"+e:3===e.length?"00000"+e:2===e.length?"000000"+e:1===e.length?"0000000"+e:e}var d=e("minimalistic-assert"),a=e("inherits");i.inherits=a,i.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var i=[];if("string"==typeof e)if(t){if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),r=0;r<e.length;r+=2)i.push(parseInt(e[r]+e[r+1],16))}else for(var r=0;r<e.length;r++){var f=e.charCodeAt(r),n=f>>8,d=255&f;n?i.push(n,d):i.push(d)}else for(r=0;r<e.length;r++)i[r]=0|e[r];return i},i.toHex=function(e){for(var t="",i=0;i<e.length;i++)t+=f(e[i].toString(16));return t},i.htonl=r,i.toHex32=function(e,t){for(var i="",f=0;f<e.length;f++){var d=e[f];"little"===t&&(d=r(d)),i+=n(d.toString(16))}return i},i.zero2=f,i.zero8=n,i.join32=function(e,t,i,r){var f=i-t;d(f%4==0);for(var n=new Array(f/4),a=0,s=t;a<n.length;a++,s+=4){var h;h="big"===r?e[s]<<24|e[s+1]<<16|e[s+2]<<8|e[s+3]:e[s+3]<<24|e[s+2]<<16|e[s+1]<<8|e[s],n[a]=h>>>0}return n},i.split32=function(e,t){for(var i=new Array(4*e.length),r=0,f=0;r<e.length;r++,f+=4){var n=e[r];"big"===t?(i[f]=n>>>24,i[f+1]=n>>>16&255,i[f+2]=n>>>8&255,i[f+3]=255&n):(i[f+3]=n>>>24,i[f+2]=n>>>16&255,i[f+1]=n>>>8&255,i[f]=255&n)}return i},i.rotr32=function(e,t){return e>>>t|e<<32-t},i.rotl32=function(e,t){return e<<t|e>>>32-t},i.sum32=function(e,t){return e+t>>>0},i.sum32_3=function(e,t,i){return e+t+i>>>0},i.sum32_4=function(e,t,i,r){return e+t+i+r>>>0},i.sum32_5=function(e,t,i,r,f){return e+t+i+r+f>>>0},i.sum64=function(e,t,i,r){var f=e[t],n=r+e[t+1]>>>0,d=(n<r?1:0)+i+f;e[t]=d>>>0,e[t+1]=n},i.sum64_hi=function(e,t,i,r){return(t+r>>>0<t?1:0)+e+i>>>0},i.sum64_lo=function(e,t,i,r){return t+r>>>0},i.sum64_4_hi=function(e,t,i,r,f,n,d,a){var s=0,h=t;return s+=(h=h+r>>>0)<t?1:0,s+=(h=h+n>>>0)<n?1:0,e+i+f+d+(s+=(h=h+a>>>0)<a?1:0)>>>0},i.sum64_4_lo=function(e,t,i,r,f,n,d,a){return t+r+n+a>>>0},i.sum64_5_hi=function(e,t,i,r,f,n,d,a,s,h){var c=0,o=t;return c+=(o=o+r>>>0)<t?1:0,c+=(o=o+n>>>0)<n?1:0,c+=(o=o+a>>>0)<a?1:0,e+i+f+d+s+(c+=(o=o+h>>>0)<h?1:0)>>>0},i.sum64_5_lo=function(e,t,i,r,f,n,d,a,s,h){return t+r+n+a+h>>>0},i.rotr64_hi=function(e,t,i){return(t<<32-i|e>>>i)>>>0},i.rotr64_lo=function(e,t,i){return(e<<32-i|t>>>i)>>>0},i.shr64_hi=function(e,t,i){return e>>>i},i.shr64_lo=function(e,t,i){return(e<<32-i|t>>>i)>>>0}},{inherits:32,"minimalistic-assert":33}],31:[function(e,t,i){"use strict";function r(e){if(!(this instanceof r))return new r(e);this.hash=e.hash,this.predResist=!!e.predResist,this.outLen=this.hash.outSize,this.minEntropy=e.minEntropy||this.hash.hmacStrength,this._reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var t=n.toArray(e.entropy,e.entropyEnc||"hex"),i=n.toArray(e.nonce,e.nonceEnc||"hex"),f=n.toArray(e.pers,e.persEnc||"hex");d(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(t,i,f)}var f=e("hash.js"),n=e("minimalistic-crypto-utils"),d=e("minimalistic-assert");t.exports=r,r.prototype._init=function(e,t,i){var r=e.concat(t).concat(i);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var f=0;f<this.V.length;f++)this.K[f]=0,this.V[f]=1;this._update(r),this._reseed=1,this.reseedInterval=281474976710656},r.prototype._hmac=function(){return new f.hmac(this.hash,this.K)},r.prototype._update=function(e){var t=this._hmac().update(this.V).update([0]);e&&(t=t.update(e)),this.K=t.digest(),this.V=this._hmac().update(this.V).digest(),e&&(this.K=this._hmac().update(this.V).update([1]).update(e).digest(),this.V=this._hmac().update(this.V).digest())},r.prototype.reseed=function(e,t,i,r){"string"!=typeof t&&(r=i,i=t,t=null),e=n.toArray(e,t),i=n.toArray(i,r),d(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(e.concat(i||[])),this._reseed=1},r.prototype.generate=function(e,t,i,r){if(this._reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof t&&(r=i,i=t,t=null),i&&(i=n.toArray(i,r||"hex"),this._update(i));for(var f=[];f.length<e;)this.V=this._hmac().update(this.V).digest(),f=f.concat(this.V);var d=f.slice(0,e);return this._update(i),this._reseed++,n.encode(d,t)}},{"hash.js":19,"minimalistic-assert":33,"minimalistic-crypto-utils":34}],32:[function(e,t,i){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var i=function(){};i.prototype=t.prototype,e.prototype=new i,e.prototype.constructor=e}},{}],33:[function(e,t,i){function r(e,t){if(!e)throw new Error(t||"Assertion failed")}t.exports=r,r.equal=function(e,t,i){if(e!=t)throw new Error(i||"Assertion failed: "+e+" != "+t)}},{}],34:[function(e,t,i){"use strict";function r(e){return 1===e.length?"0"+e:e}function f(e){for(var t="",i=0;i<e.length;i++)t+=r(e[i].toString(16));return t}var n=i;n.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var i=[];if("string"!=typeof e){for(r=0;r<e.length;r++)i[r]=0|e[r];return i}if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),r=0;r<e.length;r+=2)i.push(parseInt(e[r]+e[r+1],16));else for(var r=0;r<e.length;r++){var f=e.charCodeAt(r),n=f>>8,d=255&f;n?i.push(n,d):i.push(d)}return i},n.zero2=r,n.toHex=f,n.encode=function(e,t){return"hex"===t?f(e):e}},{}],elliptic:[function(e,t,i){"use strict";var r=i;r.version=e("../package.json").version,r.utils=e("./elliptic/utils"),r.rand=e("brorand"),r.curve=e("./elliptic/curve"),r.curves=e("./elliptic/curves"),r.ec=e("./elliptic/ec"),r.eddsa=e("./elliptic/eddsa")},{"../package.json":18,"./elliptic/curve":6,"./elliptic/curves":9,"./elliptic/ec":10,"./elliptic/eddsa":13,"./elliptic/utils":17,brorand:2}],"fast-sha256":[function(e,t,i){!function(e,i){var r={};i(r);var f=r.default;for(var n in r)f[n]=r[n];"object"==typeof t&&"object"==typeof t.exports?t.exports=f:"function"==typeof define&&define.amd?define(function(){return f}):e.sha256=f}(this,function(e){"use strict";function t(e,t,i,f,n){for(var d,a,s,h,c,o,u,b,l,p,m,v,g;n>=64;){for(d=t[0],a=t[1],s=t[2],h=t[3],c=t[4],o=t[5],u=t[6],b=t[7],p=0;p<16;p++)m=f+4*p,e[p]=(255&i[m])<<24|(255&i[m+1])<<16|(255&i[m+2])<<8|255&i[m+3];for(p=16;p<64;p++)v=((l=e[p-2])>>>17|l<<15)^(l>>>19|l<<13)^l>>>10,g=((l=e[p-15])>>>7|l<<25)^(l>>>18|l<<14)^l>>>3,e[p]=(v+e[p-7]|0)+(g+e[p-16]|0);for(p=0;p<64;p++)v=(((c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7))+(c&o^~c&u)|0)+(b+(r[p]+e[p]|0)|0)|0,g=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&a^d&s^a&s)|0,b=u,u=o,o=c,c=h+v|0,h=s,s=a,a=d,d=v+g|0;t[0]+=d,t[1]+=a,t[2]+=s,t[3]+=h,t[4]+=c,t[5]+=o,t[6]+=u,t[7]+=b,f+=64,n-=64}return f}function i(e){var t=(new f).update(e),i=t.digest();return t.clean(),i}e.digestLength=32,e.blockSize=64;var r=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),f=function(){function i(){this.digestLength=e.digestLength,this.blockSize=e.blockSize,this.state=new Int32Array(8),this.temp=new Int32Array(64),this.buffer=new Uint8Array(128),this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this.reset()}return i.prototype.reset=function(){return this.state[0]=1779033703,this.state[1]=3144134277,this.state[2]=1013904242,this.state[3]=2773480762,this.state[4]=1359893119,this.state[5]=2600822924,this.state[6]=528734635,this.state[7]=1541459225,this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this},i.prototype.clean=function(){for(e=0;e<this.buffer.length;e++)this.buffer[e]=0;for(var e=0;e<this.temp.length;e++)this.temp[e]=0;this.reset()},i.prototype.update=function(e,i){if(void 0===i&&(i=e.length),this.finished)throw new Error("SHA256: can't update because hash was finished.");var r=0;if(this.bytesHashed+=i,this.bufferLength>0){for(;this.bufferLength<64&&i>0;)this.buffer[this.bufferLength++]=e[r++],i--;64===this.bufferLength&&(t(this.temp,this.state,this.buffer,0,64),this.bufferLength=0)}for(i>=64&&(r=t(this.temp,this.state,e,r,i),i%=64);i>0;)this.buffer[this.bufferLength++]=e[r++],i--;return this},i.prototype.finish=function(e){if(!this.finished){var i=this.bytesHashed,r=this.bufferLength,f=i/536870912|0,n=i<<3,d=i%64<56?64:128;this.buffer[r]=128;for(a=r+1;a<d-8;a++)this.buffer[a]=0;this.buffer[d-8]=f>>>24&255,this.buffer[d-7]=f>>>16&255,this.buffer[d-6]=f>>>8&255,this.buffer[d-5]=f>>>0&255,this.buffer[d-4]=n>>>24&255,this.buffer[d-3]=n>>>16&255,this.buffer[d-2]=n>>>8&255,this.buffer[d-1]=n>>>0&255,t(this.temp,this.state,this.buffer,0,d),this.finished=!0}for(var a=0;a<8;a++)e[4*a+0]=this.state[a]>>>24&255,e[4*a+1]=this.state[a]>>>16&255,e[4*a+2]=this.state[a]>>>8&255,e[4*a+3]=this.state[a]>>>0&255;return this},i.prototype.digest=function(){var e=new Uint8Array(this.digestLength);return this.finish(e),e},i.prototype._saveState=function(e){for(var t=0;t<this.state.length;t++)e[t]=this.state[t]},i.prototype._restoreState=function(e,t){for(var i=0;i<this.state.length;i++)this.state[i]=e[i];this.bytesHashed=t,this.finished=!1,this.bufferLength=0},i}();e.Hash=f;var n=function(){function e(e){this.inner=new f,this.outer=new f,this.blockSize=this.inner.blockSize,this.digestLength=this.inner.digestLength;var t=new Uint8Array(this.blockSize);if(e.length>this.blockSize)(new f).update(e).finish(t).clean();else for(i=0;i<e.length;i++)t[i]=e[i];for(i=0;i<t.length;i++)t[i]^=54;this.inner.update(t);for(i=0;i<t.length;i++)t[i]^=106;this.outer.update(t),this.istate=new Uint32Array(this.digestLength/4),this.ostate=new Uint32Array(this.digestLength/4),this.inner._saveState(this.istate),this.outer._saveState(this.ostate);for(var i=0;i<t.length;i++)t[i]=0}return e.prototype.reset=function(){return this.inner._restoreState(this.istate,this.inner.blockSize),this.outer._restoreState(this.ostate,this.outer.blockSize),this},e.prototype.clean=function(){for(var e=0;e<this.istate.length;e++)this.ostate[e]=this.istate[e]=0;this.inner.clean(),this.outer.clean()},e.prototype.update=function(e){return this.inner.update(e),this},e.prototype.finish=function(e){return this.outer.finished?this.outer.finish(e):(this.inner.finish(e),this.outer.update(e,this.digestLength).finish(e)),this},e.prototype.digest=function(){var e=new Uint8Array(this.digestLength);return this.finish(e),e},e}();e.HMAC=n,e.hash=i,e.__esModule=!0,e.default=i,e.hmac=function(e,t){var i=new n(e).update(t),r=i.digest();return i.clean(),r},e.pbkdf2=function(e,t,i,r){for(var f=new n(e),d=f.digestLength,a=new Uint8Array(4),s=new Uint8Array(d),h=new Uint8Array(d),c=new Uint8Array(r),o=0;o*d<r;o++){var u=o+1;for(a[0]=u>>>24&255,a[1]=u>>>16&255,a[2]=u>>>8&255,a[3]=u>>>0&255,f.reset(),f.update(t),f.update(a),f.finish(h),l=0;l<d;l++)s[l]=h[l];for(l=2;l<=i;l++){f.reset(),f.update(h).finish(h);for(var b=0;b<d;b++)s[b]^=h[b]}for(var l=0;l<d&&o*d+l<r;l++)c[o*d+l]=s[l]}for(o=0;o<d;o++)s[o]=h[o]=0;for(o=0;o<4;o++)a[o]=0;return f.clean(),c}})},{}]},{},[]);
if (typeof JDB === 'undefined') {
    var JDB = {};
}
var Proxy; // ensure Proxy exists
(function (exports) {
    exports = typeof exports !== 'undefined' ? exports : {};

class Class {
    static register(cls) {
        if (typeof exports !== 'undefined') exports[cls.name] = cls;
    }
}
Class.register(Class);

class IDBTools {
    /**
     * Converts our KeyRange objects into IDBKeyRange objects.
     * @param {KeyRange} keyRange A KeyRange object.
     * @returns {IDBKeyRange} The corresponding IDBKeyRange.
     */
    static convertKeyRange(keyRange) {
        if (!(keyRange instanceof KeyRange)) return keyRange;
        if (keyRange.exactMatch) {
            return IDBKeyRange.only(keyRange.lower);
        }
        if (keyRange.lower !== undefined && keyRange.upper === undefined) {
            return IDBKeyRange.lowerBound(keyRange.lower, keyRange.lowerOpen);
        }
        if (keyRange.upper !== undefined && keyRange.lower === undefined) {
            return IDBKeyRange.upperBound(keyRange.upper, keyRange.upperOpen);
        }
        return IDBKeyRange.bound(keyRange.lower, keyRange.upper, keyRange.lowerOpen, keyRange.upperOpen);
    }
}
Class.register(IDBTools);

/**
 * A simple object implementing parts of the Transaction's class.
 * It is used to keep track of modifications on a persistent index
 * and to apply them all at once.
 * This class is to be used only internally.
 */
class EncodedTransaction {
    /**
     * Create a new IndexTransaction.
     */
    constructor(tableName) {
        this._tableName = tableName;
        this._modified = new Map();
        this._removed = new Set();
        this._truncated = false;
    }

    /** @type {string} */
    get tableName() {
        return this._tableName;
    }

    /** @type {Map.<string,*>} */
    get modified() {
        return this._modified;
    }

    /** @type {Set.<string>} */
    get removed() {
        return this._removed;
    }

    /** @type {boolean} */
    get truncated() {
        return this._truncated;
    }

    /**
     * Empty the index transaction.
     */
    truncate() {
        this._truncated = true;
        this._modified.clear();
        this._removed.clear();
    }

    /**
     * Put a key-value pair into the transaction.
     * @param {string} key The key.
     * @param {*} value The value.
     */
    put(key, value) {
        this._removed.delete(key);
        this._modified.set(key, value);

    }

    /**
     * Remove a key-value pair from the transaction.
     * @param {string} key The key to remove.
     */
    remove(key) {
        this._removed.add(key);
        this._modified.delete(key);
    }

}
Class.register(EncodedTransaction);

/**
 * This class is a wrapper around the IndexedDB.
 * It manages the access to a single table/object store.
 * @implements {IBackend}
 */
class IDBBackend {
    /**
     * Creates a wrapper given a JungleDB object and table name.
     * @param {JungleDB} db The JungleDB object managing the connection.
     * @param {string} tableName THe table name this object store represents.
     * @param {ICodec} [codec] Optional codec applied before storing/retrieving values in/from the backend (null is the identity codec).
     */
    constructor(db, tableName, codec=null) {
        this._db = db;
        this._tableName = tableName;
        /** @type {Map.<string,IIndex>} */
        this._indices = new Map();
        this._indicesToDelete = [];
        this._codec = codec;
    }

    /** @type {boolean} */
    get connected() {
        return this._db.connected;
    }

    /** @type {IDBDatabase} */
    get _backend() {
        if (!this.connected) {
            throw 'Requires a connected database';
        }
        return this._db.backend;
    }

    /**
     * A map of index names to indices.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        return this._indices;
    }

    /**
     * Internal method called by the JungleDB to create the necessary indices during a version upgrade.
     * @param {IDBObjectStore} objectStore The IDBObjectStore object obtained during a version upgrade.
     * @protected
     */
    init(objectStore) {
        // Delete indices.
        for (const indexName of this._indicesToDelete) {
            objectStore.deleteIndex(indexName);
        }
        delete this._indicesToDelete;

        // Create indices.
        for (const [indexName, index] of this._indices) {
            const keyPath = Array.isArray(index.keyPath) ? index.keyPath.join('.') : index.keyPath;
            objectStore.createIndex(indexName, keyPath, { unique: false, multiEntry: index.multiEntry});
        }
    }

    /**
     * Internal method called to decode a single value.
     * @param {*} value Value to be decoded.
     * @param {string} key Key corresponding to the value.
     * @returns {*} The decoded value.
     */
    decode(value, key) {
        if (value === undefined) {
            return undefined;
        }
        if (this._codec !== null && this._codec !== undefined) {
            return this._codec.decode(value, key);
        }
        return value;
    }

    /**
     * Internal method called to encode a single value.
     * @param {*} value Value to be encoded.
     * @returns {*} The encoded value.
     */
    encode(value) {
        if (value === undefined) {
            return undefined;
        }
        if (this._codec !== null && this._codec !== undefined) {
            return this._codec.encode(value);
        }
        return value;
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    async get(key) {
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const getTx = db.transaction([this._tableName])
                .objectStore(this._tableName)
                .get(key);
            getTx.onsuccess = event => resolve(this.decode(event.target.result, key));
            getTx.onerror = reject;
        });
    }

    /**
     * Inserts or replaces a key-value pair.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async put(key, value) {
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const putTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .put(this.encode(value), key);
            putTx.onsuccess = event => resolve(event.target.result);
            putTx.onerror = reject;
        });
    }

    /**
     * Removes the key-value pair of the given key from the object store.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async remove(key) {
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const deleteTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .delete(key);
            deleteTx.onsuccess = event => resolve(event.target.result);
            deleteTx.onerror = reject;
        });
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null) {
        if (query !== null && query instanceof Query) {
            return query.values(this);
        }
        query = IDBTools.convertKeyRange(query);
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const results = [];
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openCursor(query);
            openCursorRequest.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                    results.push(this.decode(cursor.value, cursor.primaryKey));
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    async keys(query=null) {
        if (query !== null && query instanceof Query) {
            return query.keys(this);
        }
        query = IDBTools.convertKeyRange(query);
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const getRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .getAllKeys(query);
            getRequest.onsuccess = () => resolve(Set.from(getRequest.result));
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async maxValue(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openCursor(query, 'prev');
            openCursorRequest.onsuccess = event => {
                const cursor = event.target.result;
                resolve(cursor ? this.decode(cursor.value, cursor.primaryKey) : undefined);
            };
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async maxKey(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openKeyCursor(query, 'prev');
            openCursorRequest.onsuccess = () => resolve(openCursorRequest.result ? openCursorRequest.result.primaryKey : undefined);
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async minValue(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openCursor(query, 'next');
            openCursorRequest.onsuccess = event => {
                const cursor = event.target.result;
                resolve(cursor ? this.decode(cursor.value, cursor.primaryKey) : undefined);
            };
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async minKey(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openKeyCursor(query, 'next');
            openCursorRequest.onsuccess = () => resolve(openCursorRequest.result ? openCursorRequest.result.primaryKey : undefined);
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const getRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .count(query);
            getRequest.onsuccess = () => resolve(getRequest.result);
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        return this._indices.get(indexName);
    }

    /** @type {Promise.<IDBDatabase>} The underlying IDBDatabase. */
    get backend() {
        return this._db.backend;
    }

    /** @type {string} The own table name. */
    get tableName() {
        return this._tableName;
    }

    /**
     * Internally applies a transaction to the store's state.
     * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
     * or no changes are applied.
     * @param {Transaction} tx The transaction to apply.
     * @returns {Promise} The promise resolves after applying the transaction.
     * @protected
     */
    async _apply(tx) {
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const idbTx = db.transaction([this._tableName], 'readwrite');
            const objSt = idbTx.objectStore(this._tableName);

            if (tx._truncated) {
                objSt.clear();
            }
            for (const key of tx._removed) {
                objSt.delete(key);
            }
            for (const [key, value] of tx._modified) {
                objSt.put(this.encode(value), key);
            }

            idbTx.oncomplete = () => resolve(true);
            idbTx.onerror = reject;
        });
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        const db = this._backend;
        return new Promise((resolve, reject) => {
            const getRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .clear();
            getRequest.onsuccess = resolve;
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Creates a new secondary index on the object store.
     * Currently, all secondary indices are non-unique.
     * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
     * be used to find this entry.
     * If a new object does not possess the key path associated with that index, it is simply ignored.
     *
     * This function may only be called before the database is connected.
     * Moreover, it is only executed on database version updates or on first creation.
     * @param {string} indexName The name of the index.
     * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
     * @param {boolean} [multiEntry]
     */
    createIndex(indexName, keyPath, multiEntry=false) {
        if (this._db.connected) throw 'Cannot create index while connected';
        keyPath = keyPath || indexName;
        const index = new PersistentIndex(this, indexName, keyPath, multiEntry);
        this._indices.set(indexName, index);
    }

    /**
     * Deletes a secondary index from the object store.
     * @param indexName
     * @returns {Promise} The promise resolves after deleting the index.
     */
    async deleteIndex(indexName) {
        if (this._db.connected) throw 'Cannot delete index while connected';
        this._indicesToDelete.push(indexName);
    }

    /**
     * Closes the object store and potential connections.
     * @returns {Promise} The promise resolves after closing the object store.
     */
    close() {
        // Nothing to do here, it is all done on the DB level.
        return this._db.close();
    }

    /**
     * Returns the necessary information in order to flush a combined transaction.
     * @param {Transaction} tx The transaction that should be applied to this backend.
     * @returns {Promise.<EncodedTransaction>} A special transaction object bundling all necessary information.
     */
    async applyCombined(tx) {
        const encodedTx = new EncodedTransaction(this._tableName);

        if (tx._truncated) {
            encodedTx.truncate();
        }

        for (const key of tx._removed) {
            encodedTx.remove(key);
        }
        for (const [key, value] of tx._modified) {
            encodedTx.put(this.encode(value), key);
        }
        return encodedTx;
    }
}
Class.register(IDBBackend);

/**
 * @implements {IJungleDB}
 */
class JungleDB {
    /**
     * Initiates a new database connection. All changes to the database structure
     * require an increase in the version number.
     * Whenever new object stores need to be created, old ones deleted,
     * or indices created/deleted, the dbVersion number has to be increased.
     * When the version number increases, the given function onUpgradeNeeded is called
     * after modifying the database structure.
     * @param {string} name The name of the database.
     * @param {number} dbVersion The current version of the database.
     * @param {function()} [onUpgradeNeeded] A function to be called after upgrades of the structure.
     */
    constructor(name, dbVersion, onUpgradeNeeded) {
        if (dbVersion <= 0) throw 'The version provided must not be less or equal to 0.';
        this._databaseDir = name;
        this._dbVersion = dbVersion;
        this._onUpgradeNeeded = onUpgradeNeeded;
        this._connected = false;
        this._objectStores = new Map();
        this._objectStoreBackends = new Map();
        this._objectStoresToDelete = [];
    }

    /**
     * @type {IDBFactory} The browser's IDB factory.
     * @private
     */
    get _indexedDB() {
        return window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
    }

    /**
     * Connects to the indexedDB.
     * @returns {Promise.<IDBDatabase>} A promise resolving on successful connection.
     * The raw IDBDatabase object should not be used.
     */
    connect() {
        if (this._db) return Promise.resolve(this._db);

        const request = this._indexedDB.open(this._databaseDir, this._dbVersion);
        const that = this;

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                that._connected = true;
                that._db = request.result;
                resolve(request.result);
            };

            request.onupgradeneeded = event => that._initDB(event);
        });
    }

    /**
     * Internal method that is called when a db upgrade is required.
     * @param {*} event The obupgradeneeded event.
     * @returns {Promise.<void>} A promise that resolves after successful completion.
     * @private
     */
    async _initDB(event) {
        const db = event.target.result;

        // Delete existing ObjectStores.
        for (const tableName of this._objectStoresToDelete) {
            db.deleteObjectStore(tableName);
        }
        delete this._objectStoresToDelete;

        // Create new ObjectStores.
        for (const [tableName, objStore] of this._objectStoreBackends) {
            const IDBobjStore = db.createObjectStore(tableName);
            // Create indices.
            objStore.init(IDBobjStore);
        }
        delete this._objectStoreBackends;

        // Call user defined function if requested.
        if (this._onUpgradeNeeded) {
            await this._onUpgradeNeeded();
        }
    }

    /** @type {IDBDatabase} The underlying IDBDatabase. */
    get backend() {
        return this._db;
    }

    /** @type {boolean} Whether a connection is established. */
    get connected() {
        return this._connected;
    }

    /**
     * Returns the ObjectStore object for a given table name.
     * @param {string} tableName The table name to access.
     * @returns {ObjectStore} The ObjectStore object.
     */
    getObjectStore(tableName) {
        return this._objectStores.get(tableName);
    }

    /**
     * Creates a volatile object store (non-persistent).
     * @param {ICodec} [codec] A codec for the object store.
     * @returns {IObjectStore}
     */
    static createVolatileObjectStore(codec=null) {
        return new ObjectStore(new InMemoryBackend('', codec), null);
    }

    /**
     * Creates a new object store (and allows to access it).
     * This method always has to be called before connecting to the database.
     * If it is not called, the object store will not be accessible afterwards.
     * If a call is newly introduced, but the database version did not change,
     * the table does not exist yet.
     * @param {string} tableName The name of the object store.
     * @param {ICodec} [codec] A codec for the object store.
     * @param {boolean} [persistent] If set to false, this object store is not persistent.
     * @returns {IObjectStore}
     */
    createObjectStore(tableName, codec=null, persistent=true) {
        if (this._connected) throw 'Cannot create ObjectStore while connected';
        if (this._objectStores.has(tableName)) {
            return this._objectStores.get(tableName);
        }
        const backend = persistent
            ? new IDBBackend(this, tableName, codec)
            : new InMemoryBackend(tableName, codec);
        const cachedBackend = new CachedBackend(backend);
        const objStore = new ObjectStore(cachedBackend, this);
        this._objectStores.set(tableName, objStore);
        this._objectStoreBackends.set(tableName, backend);
        return objStore;
    }

    /**
     * Deletes an object store.
     * This method has to be called before connecting to the database.
     * @param {string} tableName
     */
    async deleteObjectStore(tableName) {
        if (this._connected) throw 'Cannot delete ObjectStore while connected';
        this._objectStoresToDelete.push(tableName);
    }

    /**
     * Closes the database connection.
     * @returns {Promise} The promise resolves after closing the database.
     */
    async close() {
        if (this._connected) {
            this._connected = false;
            this.backend.close();
        }
    }

    /**
     * Fully deletes the database.
     * @returns {Promise} The promise resolves after deleting the database.
     */
    async destroy() {
        await this.close();
        return new Promise((resolve, reject) => {
            const req = this._indexedDB.deleteDatabase(this._databaseDir);
            req.onsuccess = resolve;
            req.onerror = reject;
        });
    }

    /**
     * Is used to commit multiple transactions atomically.
     * This guarantees that either all transactions are written or none.
     * The method takes a list of transactions (at least two transactions).
     * If the commit was successful, the method returns true, and false otherwise.
     * @param {Transaction|CombinedTransaction} tx1 The first transaction
     * (a CombinedTransaction object is only used internally).
     * @param {Transaction} tx2 The second transaction.
     * @param {...Transaction} txs A list of further transactions to commit together.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    static async commitCombined(tx1, tx2, ...txs) {
        // If tx1 is a CombinedTransaction, flush it to the database.
        if (tx1 instanceof CombinedTransaction) {
            const functions = [];
            /** @type {Array.<EncodedTransaction>} */
            const encodedTxs = [];
            const tableNames = [];

            const infos = await Promise.all(tx1.transactions.map(tx => tx.objectStore._backend.applyCombined(tx)));
            for (const info of infos) {
                let tmp = info;
                if (!Array.isArray(info)) {
                    tmp = [info];
                }
                for (const innerInfo of tmp) {
                    if (typeof innerInfo === 'function') {
                        functions.push(innerInfo);
                    } else {
                        encodedTxs.push(innerInfo);
                        tableNames.push(innerInfo.tableName);
                    }
                }
            }

            const db = tx1.backend !== null ? tx1.backend.backend : null;
            return new Promise((resolve, reject) => {
                if (tableNames.length > 0) {
                    const idbTx = db.transaction(tableNames, 'readwrite');

                    for (const encodedTx of encodedTxs) {
                        const objSt = idbTx.objectStore(encodedTx.tableName);

                        if (encodedTx.truncated) {
                            objSt.clear();
                        }
                        for (const key of encodedTx.removed) {
                            objSt.delete(key);
                        }
                        for (const [key, value] of encodedTx.modified) {
                            objSt.put(value, key);
                        }
                    }

                    idbTx.oncomplete = () => {
                        functions.forEach(f => f());
                        resolve(true);
                    };
                    idbTx.onerror = reject;
                } else {
                    functions.forEach(f => f());
                    resolve(true);
                }
            });
        }
        txs.push(tx1);
        txs.push(tx2);
        if (!txs.every(tx => tx instanceof Transaction)) {
            throw 'Invalid arguments supplied';
        }
        const ctx = new CombinedTransaction(...txs);
        return ctx.commit();
    }
}
Class.register(JungleDB);

/**
 * This class represents a wrapper around the IndexedDB indices.
 * @implements {IIndex}
 */
class PersistentIndex {
    /**
     * @param {IDBBackend} objectStore
     * @param {string} indexName
     * @param {string|Array.<string>} keyPath
     * @param {boolean} multiEntry
     */
    constructor(objectStore, indexName, keyPath, multiEntry=false) {
        this._objectStore = objectStore;
        this._indexName = indexName;
        this._keyPath = keyPath;
        this._multiEntry = multiEntry;
    }

    /**
     * Reinitialises the index.
     * @returns {Promise} The promise resolves after emptying the index.
     */
    async truncate() {
        // Will automatically be truncated.
    }

    /**
     * The key path associated with this index.
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * @type {string|Array.<string>}
     */
    get keyPath() {
        return this._keyPath;
    }

    /**
     * This value determines whether the index supports multiple secondary keys per entry.
     * If so, the value at the key path is considered to be an iterable.
     * @type {boolean}
     */
    get multiEntry() {
        return this._multiEntry;
    }

    /**
     * Internal method to access IDB index.
     * @param {IDBDatabase} db The indexed DB.
     * @returns {IDBIndex} The indexedDB's index object.
     * @private
     */
    _index(db) {
        return db.transaction([this._objectStore.tableName], 'readonly')
            .objectStore(this._objectStore.tableName)
            .index(this._indexName);
    }

    /**
     * Returns a promise of an array of objects whose secondary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the index.
     * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
     * @param {KeyRange} [query] Optional query to check secondary keys against.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const results = [];
            const request = this._index(db).openCursor(query);
            request.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                    results.push(this._objectStore.decode(cursor.value, cursor.primaryKey));
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
     * If the optional query is not given, it returns all primary keys in the index.
     * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
     * @param {KeyRange} [query] Optional query to check the secondary keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
     */
    async keys(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const getRequest = this._index(db).getAllKeys(query);
            getRequest.onsuccess = () => resolve(Set.from(getRequest.result));
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Returns a promise of an array of objects whose secondary key is maximal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async maxValues(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const results = [];
            let maxKey = null;
            const request = this._index(db).openCursor(query, 'prev');
            request.onsuccess = event => {
                const cursor = event.target.result;
                if (maxKey === null) {
                    maxKey = cursor.key;
                }
                // Only iterate until key changes.
                if (cursor && maxKey === cursor.key) {
                    results.push(this._objectStore.decode(cursor.value, cursor.primaryKey));
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async maxKeys(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const results = new Set();
            let maxKey = null;
            const request = this._index(db).openKeyCursor(query, 'prev');
            request.onsuccess = event => {
                const cursor = event.target.result;
                if (maxKey === null) {
                    maxKey = cursor.key;
                }
                // Only iterate until key changes.
                if (cursor && maxKey === cursor.key) {
                    results.add(cursor.primaryKey);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns a promise of an array of objects whose secondary key is minimal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async minValues(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const results = [];
            let maxKey = null;
            const request = this._index(db).openCursor(query, 'next');
            request.onsuccess = event => {
                const cursor = event.target.result;
                if (maxKey === null) {
                    maxKey = cursor.key;
                }
                // Only iterate until key changes.
                if (cursor && maxKey === cursor.key) {
                    results.push(this._objectStore.decode(cursor.value, cursor.primaryKey));
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async minKeys(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const results = new Set();
            let maxKey = null;
            const request = this._index(db).openKeyCursor(query, 'next');
            request.onsuccess = event => {
                const cursor = event.target.result;
                if (maxKey === null) {
                    maxKey = cursor.key;
                }
                // Only iterate until key changes.
                if (cursor && maxKey === cursor.key) {
                    results.add(cursor.primaryKey);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns the count of entries, whose secondary key is in the given range.
     * If the optional query is not given, it returns the count of entries in the index.
     * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const request = this._index(db).count(query);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
Class.register(PersistentIndex);


/*
 B+ Tree processing
 Version 2.0.0
 Based on code by Graham O'Neill, April 2013
 Modified by Pascal Berrang, July 2017

 ------------------------------------------------------------------------------

 Copyright (c) 2017 Graham O'Neill & Pascal Berrang

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 ------------------------------------------------------------------------------

 */

/**
 * This abstract class describes a general Node within a B+Tree.
 * Each node owns an array of keys and has an id.
 */
class Node {
    /**
     * Creates a new node.
     * @param {number} id The node's id.
     * @param {Array.<*>} [keys] Optional array of keys (default is empty).
     */
    constructor(id, keys=[]) {
        this._keys = keys;
        this._id = id;
    }

    /**
     * @type {number} The id of the node.
     */
    get id() {
        return this._id;
    }

    /**
     * @type {Array.<*>} The array of keys.
     */
    get keys() {
        return this._keys;
    }

    /**
     * Converts a node to JSON, which is necessary to persist the B+Tree.
     * @returns {{_id: number, _keys: Array.<*>}} The JSON representation.
     */
    toJSON() {
        return {
            _id: this._id,
            _keys: this._keys
        };
    }

    /**
     * Constructs a node from a JSON object.
     * @param {{isLeaf: boolean, _id: number, _keys: Array.<*>}} o The JSON object to build the node from.
     * @returns {Node} The constructed node.
     */
    static fromJSON(o) {
        if (o.isLeaf === true) {
            return LeafNode.fromJSON(o);
        } else if (o.isLeaf === false) {
            return InnerNode.fromJSON(o);
        }
        return undefined;
    }
}
Class.register(Node);

/**
 * A Leaf Node in the B+Tree.
 * @extends Node
 */
class LeafNode extends Node {
    /**
     * Creates a new leaf node.
     * Leaf nodes store key value pairs,
     * hence the keys and records arrays are required to have the same length.
     * In an index, the keys array usually stores the secondary key,
     * while the records array stores the corresponding primary key.
     * The B+Tree ensures that the items in the keys array are ordered ascending.
     * @param {number} id The node's id.
     * @param {Array.<*>} [keys] Optional array of keys (default is empty).
     * @param {Array.<*>} [records] Optional array of records (default is empty).
     */
    constructor(id, keys=[], records=[]) {
        if (keys.length !== records.length) {
            throw 'Keys and records must have the same length';
        }
        super(id, keys);
        this._records = records;
        this.prevLeaf = null;
        this.nextLeaf = null;
    }

    /**
     * @type {Array.<*>} The list of records associated with the keys.
     */
    get records() {
        return this._records;
    }

    /**
     * Returns whether this is a leaf node.
     * @returns {boolean} True, since it is a leaf node.
     */
    isLeaf() {
        return true;
    }

    /**
     * Converts a node to JSON, which is necessary to persist the B+Tree.
     * @returns {{_id: number, _keys: Array.<*>, _records: Array.<*>, isLeaf: boolean, prevLeaf: number, nextLeaf: number}} The JSON representation.
     */
    toJSON() {
        const o = super.toJSON();
        o.isLeaf = true;
        o._records = this._records;
        o.prevLeaf = this.prevLeaf ? this.prevLeaf.id : this.prevLeaf;
        o.nextLeaf = this.nextLeaf ? this.nextLeaf.id : this.nextLeaf;
        return o;
    }

    /**
     * Constructs a node from a JSON object.
     * @param {{_id: number, _keys: Array.<*>, _records: Array.<*>, isLeaf: boolean, prevLeaf: number, nextLeaf: number}} o The JSON object to build the node from.
     * @returns {Node} The constructed node.
     */
    static fromJSON(o) {
        const leaf = new LeafNode(o._id, o._keys, o._records);
        leaf.prevLeaf = o.prevLeaf;
        leaf.nextLeaf = o.nextLeaf;
        return leaf;
    }

    /**
     * Searches the node for a specific key and returns its position if found.
     * The near parameter allows to find either an exact match or the first key
     * greater/less or equal than the specified key.
     *
     * Since the B+tree limits the number of records per leaf node,
     * the complexity of this method is in O([order/2, order-1]).
     * @param {*} key The key to look for.
     * @param {BTree.NEAR_MODE} near
     * @returns {number} The index of the match if found, -1 otherwise.
     */
    getItem(key, near) {
        const keys = this._keys;
        // Find item matching the query.
        if (near === BTree.NEAR_MODE.GE) {
            for (let i=0, len=keys.length; i<len; ++i) {
                if (key <= keys[i]) return i;
            }
        } else if (near === BTree.NEAR_MODE.LE) {
            for (let i=keys.length - 1; i>=0; --i) {
                if (key >= keys[i]) return i;
            }
        } else {
            for (let i=0, len=keys.length; i<len; ++i) {
                if (key === keys[i]) return i;
            }
        }
        return -1;
    }

    /**
     * Adds a key, record pair to this leaf node.
     * By definition, the key is inserted into the keys of this leaf node,
     * such that the ascending order of the keys is maintained.
     * @param {*} key The key to insert.
     * @param {*} record The corresponding record to insert.
     * @returns {number} The position it was inserted at.
     */
    addKey(key, record) {
        let insertPos = this._keys.length;
        // Find position to insert.
        for (let i=0, len=insertPos; i<len; ++i) {
            // Key already exists.
            if (key === this._keys[i]) {
                return -1;
            }
            // Update potential position.
            if (key <= this._keys[i]) {
                insertPos = i;
                break;
            }
        }
        // Insert key/record.
        this._keys.splice(insertPos, 0, key);
        this._records.splice(insertPos, 0, record);
        return insertPos;
    }

    /**
     * Splits the leaf node into two nodes (this + one new node).
     * The resulting nodes should have almost equal sizes.
     * The new node will return the upper half of the previous entries.
     * @param {number} newId The id to be assigned the new node.
     * @returns {LeafNode} The new leaf node containing the upper half of entries.
     */
    split(newId) {
        const mov = Math.floor(this._keys.length/2);
        const newKeys = [], newRecords = [];
        for (let i = 0; i < mov; ++i) {
            newKeys.unshift(this._keys.pop());
            newRecords.unshift(this._records.pop());
        }
        const newL = new LeafNode(newId, newKeys, newRecords);
        newL.prevLeaf = this;
        newL.nextLeaf = this.nextLeaf;
        if (this.nextLeaf !== null) this.nextLeaf.prevLeaf = newL;
        this.nextLeaf = newL;
        return newL;
    }

    /**
     * Merges two leaf nodes together (this + frNod).
     * The given node frNod is no longer connected afterwards.
     * @param {LeafNode} frNod The node to merge with.
     * @param {InnerNode} paNod The parent node that needs to be updated.
     * @param {*} frKey The key of the old leaf in the parent.
     */
    merge(frNod, paNod, frKey) {
        // Append keys/records.
        for (let i=0, len=frNod.keys.length; i<len; ++i) {
            this._keys.push(frNod.keys[i]);
            this._records.push(frNod.records[i]);
        }
        // Update leaf pointers.
        this.nextLeaf = frNod.nextLeaf;
        if (frNod.nextLeaf !== null) frNod.nextLeaf.prevLeaf = this;
        frNod.prevLeaf = null;
        frNod.nextLeaf = null;
        // Update parent: find position of old leaf.
        let pos = paNod.keys.length-1;
        for (let i=pos; i>=0; --i) {
            if (paNod.keys[i] === frKey) {
                pos = i;
                break;
            }
        }
        // Delete old key from parent.
        paNod.keys.splice(pos, 1);
        paNod.nodePointers.splice(pos+1, 1);
    }

}
Class.register(LeafNode);

/**
 * An Inner Node in the B+Tree.
 * @extends Node
 */
class InnerNode extends Node {
    /**
     * Creates a new inner node.
     * The only key values that appear in the internal nodes are the first key values from each leaf,
     * with the exception of the key from the very first leaf which isn't included.
     * Each key value that appears in the internal nodes only appears once.
     * @param {number} id The node's id.
     * @param {Array.<*>} [keys] The first key of each child node (except for the first one).
     * @param {Array.<Node>} [nodePointers] The pointers to the child nodes.
     */
    constructor(id, keys=[], nodePointers=[]) {
        super(id, keys);
        this._nodePointers = nodePointers;
    }

    /**
     * Returns whether this is a leaf node.
     * @returns {boolean} False, since it is an inner node.
     */
    isLeaf() {
        return false;
    }

    /**
     * @type {Array.<Node>} The pointers to the children.
     */
    get nodePointers() {
        return this._nodePointers;
    }

    /**
     * Converts a node to JSON, which is necessary to persist the B+Tree.
     * @returns {{_id: number, _keys: Array.<*>, isLeaf: boolean, _nodePointers: Array.<number>}} The JSON representation.
     */
    toJSON() {
        const o = super.toJSON();
        const nodePointers = [];
        for (let i=0; i<this._nodePointers.length; ++i) {
            nodePointers.push(this._nodePointers[i] ? this._nodePointers[i].id : this._nodePointers[i]);
        }
        o.isLeaf = false;
        o._nodePointers = nodePointers;
        return o;
    }

    /**
     * Constructs a node from a JSON object.
     * @param {{_id: number, _keys: Array.<*>, isLeaf: boolean, _nodePointers: Array.<number>}} o The JSON object to build the node from.
     * @returns {Node} The constructed node.
     */
    static fromJSON(o) {
        return new InnerNode(o._id, o._keys, o._nodePointers);
    }

    /**
     * Searches the node for a specific key and returns the matching child's position.
     *
     * Since the B+tree limits the number of records per leaf node,
     * the complexity of this method is in O([(order-1)/2, order-1]).
     * @param {*} key The key to look for.
     * @returns {number} The index of the match.
     */
    getItem(key) {
        const len = this._keys.length;
        for (let i=0; i<len; ++i) {
            if (key < this._keys[i]) return i;
        }
        return this._keys.length;
    }

    /**
     * Adds a key corresponding to a new child node to this inner node.
     * By definition, the key is inserted into the keys of this leaf node,
     * such that the ascending order of the keys is maintained.
     * @param {*} key The key to insert.
     * @param {Node} ptrL The pointer to the corresponding child node.
     * @param {Node} ptrR The pointer to the node right of the child node.
     * @returns {number} The position it was inserted at.
     */
    addKey(key, ptrL, ptrR) {
        const len = this._keys.length;
        let insertPos = len;
        // Find position to insert.
        for (let i=0; i<len; ++i) {
            if (key <= this._keys[i]) {
                insertPos = i;
                break;
            }
        }
        // Update keys and pointers.
        this._keys.splice(insertPos, 0, key);
        this._nodePointers.splice(insertPos, 0, ptrL);
        this._nodePointers[insertPos+1] = ptrR;
    }

    /**
     * Splits the node into two nodes (this + one new node).
     * The resulting nodes should have almost equal sizes.
     * The new node will return the upper half of the previous entries.
     * @param {number} newId The id to be assigned the new node.
     * @returns {InnerNode} The new inner node containing the upper half of entries.
     */
    split(newId) {
        const mov = Math.ceil(this._keys.length/2) - 1;
        const newNodePointers = [this._nodePointers.pop()];
        const newKeys = [];
        for (let i=mov-1; i>=0; --i) {
            newKeys.unshift(this._keys.pop());
            newNodePointers.unshift(this._nodePointers.pop());
        }
        return new InnerNode(newId, newKeys, newNodePointers);
    }

    /**
     * Merges two inner nodes together (this + frNod).
     * The given node frNod is no longer connected afterwards.
     * @param {InnerNode} frNod The node to merge with.
     * @param {InnerNode} paNod The parent node that needs to be updated.
     * @param {number} paItm The position in the parent.
     */
    merge(frNod, paNod, paItm) {
        const del = paNod.keys[paItm];
        // Add key from parent.
        this._keys.push(del);
        // Add keys and nodePointers from merged node.
        for (let i=0, len=frNod.keys.length; i<len; ++i) {
            this._keys.push(frNod.keys[i]);
            this._nodePointers.push(frNod.nodePointers[i]);
        }
        // Add last nodePointer as well.
        this._nodePointers.push(frNod.nodePointers[frNod.nodePointers.length-1]);
        paNod.keys.splice(paItm, 1); // Delete old key from parent.
        paNod.nodePointers.splice(paItm+1, 1); // Delete old pointer from parent.
        return del;
    }
}
Class.register(InnerNode);

/**
 * The actual BTree implementation.
 * @implements {IBTree}
 */
class BTree {
    /**
     * Creates a new BTree of a given order.
     * The order specifies how many entries a single node can contain.
     * A leaf node generally contains [order/2, order-1] entries,
     * while an inner node contains [(order-1)/2, order-1] entries.
     * @param {number} order The order of the tree.
     */
    constructor(order=7) {
        this._nodeId = 0; // Needed for persistence.
        this._root = new LeafNode(this._nodeId++);
        this._maxkey = order-1;
        this._minkyl = Math.floor(order/2);
        this._minkyn = Math.floor(this._maxkey/2);
        this._leaf = null;
        this._item = -1;

        this._key = null;
        this._record = null;
        this._length = 0;
        this._eof = true;
        this._found = false;
    }

    /**
     * The total number of records.
     * Note that if the record is a list/set of records, these are not counted.
     * @type {number}
     */
    get length() {
        return this._length;
    }

    /**
     * The current key as returned by any operation.
     * It is null if there is no matching record.
     * @type {*}
     */
    get currentKey() {
        return this._key;
    }

    /**
     * The current record as returned by any operation.
     * It is null if there is no matching record.
     * @type {*}
     */
    get currentRecord() {
        return this._record;
    }

    /**
     * Creates a new TreeTransaction object on this tree.
     * A tree transaction keeps track of the changed nodes and entries,
     * so that these can be updated in a permanent storage.
     * @returns {TreeTransaction}
     */
    transaction() {
        return new TreeTransaction(this);
    }

    /**
     * Inserts a new key-record pair into the BTree, if there is no entry for that key.
     * The current record and current key are set to the new entry in case of success
     * or the existing entry if present.
     * @param {*} key The unique key for the record.
     * @param {*} rec The record associated with the key.
     * @returns {boolean} True if the record was inserted, false if there was already a record with that key.
     */
    insert(key, rec, modified=null) {
        const stack = [];
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            stack.push(this._leaf);
            this._item = this._leaf.getItem(key);
            this._leaf = this._leaf.nodePointers[this._item];
        }
        this._item = this._leaf.addKey(key, rec);
        this._key = key;
        this._eof = false;
        if (this._item === -1) {
            this._found = true;
            this._item = this._leaf.getItem(key, false);
            this._record = this._leaf.records[this._item];
        } else {
            BTree._modifyNode(modified, this._leaf);

            this._found = false;
            this._record = rec;
            this._length++;
            if (this._leaf.keys.length > this._maxkey) {
                let pL = this._leaf;
                let pR = this._leaf.split(this._nodeId++);
                BTree._modifyNode(modified, pL); // we splitted nodes
                BTree._modifyNode(modified, pR);
                let ky = pR.keys[0];
                this._item = this._leaf.getItem(key, false);
                if (this._item === -1) {
                    this._leaf = this._leaf.nextLeaf;
                    this._item = this._leaf.getItem(key, false);
                }
                while (true) { // eslint-disable-line no-constant-condition
                    if (stack.length === 0) {
                        const newN = new InnerNode(this._nodeId++);
                        newN.keys[0] = ky;
                        newN.nodePointers[0] = pL;
                        newN.nodePointers[1] = pR;
                        BTree._modifyNode(modified, newN);
                        this._root = newN;
                        break;
                    }
                    const nod = stack.pop();
                    nod.addKey(ky, pL, pR);
                    BTree._modifyNode(modified, nod);
                    if (nod.keys.length <= this._maxkey) break;
                    pL = nod;
                    pR = nod.split(this._nodeId++);
                    BTree._modifyNode(modified, pL);
                    BTree._modifyNode(modified, pR);
                    ky = nod.keys.pop();
                }
            }
        }
        return (!this._found);
    }

    /**
     * Removes a key-record pair from the BTree.
     * In case of successful deletion, the current record and key will be set to the next entry greater or equal.
     * If no record was found, they will be reset to null.
     * @param {*} key The unique key for the record.
     * @returns {boolean} True if the record was deleted, false if there is no such record.
     */
    remove(key, modified=null, removed=null) {
        if (typeof key === 'undefined') {
            if (this._item === -1) {
                this._eof = true;
                this._found = false;
                return false;
            }
            key = this._leaf.keys[this._item];
        }
        this._del(key, modified, removed);
        if (!this._found) {
            this._item = -1;
            this._eof = true;
            this._key = null;
            this._record = null;
        } else {
            this.seek(key, BTree.NEAR_MODE.GE);
            this._found = true;
        }
        return (this._found);
    }

    /**
     * Searches the tree for a specific key and advances the current key/record pointers if found.
     * By default only an exact key match is found, but the near parameter also allows to advance to the next entry
     * greater/less or equal than the specified key.
     * @param {*} key The key to look for.
     * @param {BTree.NEAR_MODE} [near] Optional parameter, specifies to look for a key k' =/≤/≥ key.
     * @returns {boolean} True if such a key was found, false otherwise.
     */
    seek(key, near=BTree.NEAR_MODE.NONE) {
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            this._item = this._leaf.getItem(key);
            this._leaf = this._leaf.nodePointers[this._item];
        }
        this._item = this._leaf.getItem(key, near);
        if (near === BTree.NEAR_MODE.GE && this._item === -1 && this._leaf.nextLeaf !== null) {
            this._leaf = this._leaf.nextLeaf;
            this._item = 0;
        }
        if (near === BTree.NEAR_MODE.LE && this._item === -1 && this._leaf.prevLeaf !== null) {
            this._leaf = this._leaf.prevLeaf;
            this._item = this._leaf.records.length - 1;
        }
        if (this._item === -1) {
            this._eof = true;
            this._key = null;
            this._found = false;
            this._record = null;
        } else {
            this._eof = false;
            this._found = (this._leaf.keys[this._item] === key);
            this._key = this._leaf.keys[this._item];
            this._record = this._leaf.records[this._item];
        }
        return (!this._eof);
    }

    /**
     * Advances the current key/record pointers by a given number of steps.
     * Default is advancing by 1, which means the next record (the new key will thus be the next larger key).
     * -1 means the previous record (the new key will thus be the next smaller key).
     * @param {number} [cnt] The number of records to advance (may be negative).
     * @returns {boolean} True if there is a record to advance to, false otherwise.
     */
    skip(cnt = 1) {
        if (typeof cnt !== 'number') cnt = 1;
        if (this._item === -1 || this._leaf === null) this._eof = true;
        if (cnt > 0) {
            while (!this._eof && this._leaf.keys.length - this._item - 1 < cnt) {
                cnt = cnt - this._leaf.keys.length + this._item;
                this._leaf = this._leaf.nextLeaf;
                if (this._leaf === null) {
                    this._eof = true;
                } else {
                    this._item = 0;
                }
            }
            if (!this._eof) this._item = this._item + cnt;
        } else {
            cnt = -cnt;
            while (!this._eof && this._item < cnt) {
                cnt = cnt - this._item - 1;
                this._leaf = this._leaf.prevLeaf;
                if (this._leaf === null) {
                    this._eof = true;
                } else {
                    this._item = this._leaf.keys.length-1;
                }
            }
            if (!this._eof) {
                this._item = this._item - cnt;
            }
        }
        if (this._eof) {
            this._item = -1;
            this._found = false;
            this._key = null;
            this._record = null;
        } else {
            this._found = true;
            this._key = this._leaf.keys[this._item];
            this._record = this._leaf.records[this._item];
        }
        return (this._found);
    }

    /**
     * Jumps to the cnt entry starting from the smallest key (i.e., leftmost leaf, first entry) if cnt > 0.
     * If cnt < 0, it jumps to the cnt entry starting from the largest key (i.e., rightmost leaf, last entry).
     * @param {number} [cnt] The record to jump to (may be negative).
     * @returns {boolean} True if there is a record to jump to, false otherwise.
     */
    goto(cnt) {
        if (cnt < 0) {
            this.goBottom();
            if (!this._eof) this.skip(cnt+1);
        } else {
            this.goTop();
            if (!this._eof) this.skip(cnt-1);
        }
        return (this._found);
    }

    /**
     * Returns the index of the current entry (key/record) in a sorted list of all entries.
     * For the B+ Tree, this is done by traversing the leafs from the leftmost leaf, first entry
     * until the respective key is found.
     * @returns {number} The entry position.
     */
    keynum() {
        if (this._leaf === null || this._item === -1) return -1;
        let cnt = this._item + 1;
        let ptr = this._leaf;
        while (ptr.prevLeaf !== null) {
            ptr = ptr.prevLeaf;
            cnt += ptr.keys.length;
        }
        return cnt;
    }

    /**
     * Jumps to the smallest key's entry (i.e., leftmost leaf, first entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goTop() {
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            this._leaf = this._leaf.nodePointers[0];
        }
        if (this._leaf.keys.length === 0) {
            this._item = -1;
            this._eof = true;
            this._found = false;
            this._key = null;
            this._record = null;
        } else {
            this._item = 0;
            this._eof = false;
            this._found = true;
            this._key = this._leaf.keys[0];
            this._record = this._leaf.records[0];
        }
        return (this._found);
    }

    /**
     * Jumps to the largest key's entry (i.e., rightmost leaf, last entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goBottom() {
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            this._leaf = this._leaf.nodePointers[this._leaf.nodePointers.length-1];
        }
        if (this._leaf.keys.length === 0) {
            this._item = -1;
            this._eof = true;
            this._found = false;
            this._key = null;
            this._record = null;
        } else {
            this._item = this._leaf.keys.length-1;
            this._eof = false;
            this._found = true;
            this._key = this._leaf.keys[this._item];
            this._record = this._leaf.records[this._item];
        }
        return (this._found);
    }

    /**
     * Rebuilds/balances the whole tree.
     * Inserting and deleting keys into a tree will result
     * in some leaves and nodes having the minimum number of keys allowed.
     * This routine will ensure that each leaf and node has as many keys as possible,
     * resulting in a denser, flatter tree.
     * False is only returned if the tree is completely empty.
     * @returns {boolean} True if the tree is not completely empty.
     */
    pack(modified=null) {
        let len;
        let i;
        this.goTop(0);
        if (this._leaf === this._root) return false;

        // Pack leaves
        let toN = new LeafNode(this._nodeId++);
        let toI = 0;
        let frN = this._leaf;
        let frI = 0;
        let parKey = [];
        let parNod = [];
        while (true) { // eslint-disable-line no-constant-condition
            BTree._modifyNode(modified, toN);
            BTree._modifyNode(modified, frN);
            toN.keys[toI] = frN.keys[frI];
            toN.records[toI] = frN.records[frI];
            if (toI === 0) parNod.push(toN);
            if (frI === frN.keys.length-1) {
                if (frN.nextLeaf === null) break;
                frN = frN.nextLeaf;
                frI = 0;
            } else {
                frI++;
            }
            if (toI === this._maxkey-1) {
                const tmp = new LeafNode(this._nodeId++);
                toN.nextLeaf = tmp;
                tmp.prevLeaf = toN;
                toN = tmp;
                toI = 0;
            } else {
                toI++;
            }
        }
        let mov = this._minkyl - toN.keys.length;
        frN = toN.prevLeaf;
        if (mov > 0 && frN !== null) {
            BTree._modifyNode(modified, frN);
            // Insert new keys/records.
            for (i = mov-1; i>=0; --i) {
                toN.keys.unshift(frN.keys.pop());
                toN.records.unshift(frN.records.pop());
            }
        }
        for (i=1, len=parNod.length; i<len; ++i) {
            parKey.push(parNod[i].keys[0]);
        }
        parKey[parKey.length] = null;

        // Rebuild nodes
        let kidKey, kidNod;
        while (parKey[0] !== null) {
            kidKey = parKey;
            kidNod = parNod;
            parKey = [];
            parNod = [];
            toI = this._maxkey + 1;
            i = 0;
            len = kidKey.length;
            for (; i<len; i++) {
                if (toI > this._maxkey) {
                    toN = new InnerNode(this._nodeId++);
                    toI = 0;
                    parNod.push(toN);
                }
                toN.keys[toI] = kidKey[i];
                toN.nodePointers[toI] = kidNod[i];
                toI++;
                BTree._modifyNode(modified, toN);
            }
            mov = this._minkyn - toN.keys.length + 1;
            if (mov > 0 && parNod.length > 1) {
                frN = parNod[parNod.length-2];
                BTree._modifyNode(modified, frN);
                for (i = mov-1; i>=0; --i) {
                    toN.keys.unshift(frN.keys.pop());
                    toN.nodePointers.unshift(frN.nodePointers.pop());
                }
            }
            i = 0;
            len = parNod.length;
            for (; i<len; ++i) {
                parKey.push(parNod[i].keys.pop());
            }
        }
        this._root = parNod[0];
        this.goTop();
        return (this._found);
    }

    /**
     * Internal helper method to delete a key from the tree.
     * @param {*} key The unique key for the record.
     * @param [modified] The optional set of modified nodes (will be updated by the method).
     * @param [removed] The optional set of removed nodes (will be updated by the method).
     * @private
     */
    _del(key, modified=null, removed=null) {
        const stack = [];
        let parNod = null;
        let parPtr = -1;
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            stack.push(this._leaf);
            parNod = this._leaf;
            parPtr = this._leaf.getItem(key);
            this._leaf = this._leaf.nodePointers[parPtr];
        }
        this._item = this._leaf.getItem(key,false);

        // Key not in tree
        if (this._item === -1) {
            this._found = false;
            return;
        }
        this._found = true;

        // Delete key from leaf
        this._leaf.keys.splice(this._item, 1);
        this._leaf.records.splice(this._item, 1);
        BTree._modifyNode(modified, this._leaf);
        this._length--;

        // Leaf still valid: done
        if (this._leaf === this._root) {
            return;
        }
        if (this._leaf.keys.length >= this._minkyl) {
            if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
            return;
        }
        let delKey;

        // Steal from left sibling if possible
        let sibL = (parPtr === 0) ? null : parNod.nodePointers[parPtr - 1];
        if (sibL !== null && sibL.keys.length > this._minkyl) {
            delKey = (this._item === 0) ? key : this._leaf.keys[0];
            this._leaf.keys.unshift(sibL.keys.pop());
            this._leaf.records.unshift(sibL.records.pop());
            BTree._fixNodes(stack, delKey, this._leaf.keys[0], modified);
            BTree._modifyNode(modified, sibL);
            return;
        }

        // Steal from right sibling if possible
        let sibR = (parPtr === parNod.keys.length) ? null : parNod.nodePointers[parPtr + 1];
        if (sibR !== null && sibR.keys.length > this._minkyl) {
            this._leaf.keys.push(sibR.keys.shift());
            this._leaf.records.push(sibR.records.shift());
            if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
            BTree._fixNodes(stack, this._leaf.keys[this._leaf.keys.length-1], sibR.keys[0], modified);
            BTree._modifyNode(modified, sibR);
            return;
        }

        // Merge left to make one leaf
        if (sibL !== null) {
            delKey = (this._item === 0) ? key : this._leaf.keys[0];
            sibL.merge(this._leaf, parNod, delKey);
            BTree._modifyNode(modified, sibL);
            BTree._modifyNode(removed, this._leaf);
            this._leaf = sibL;
        } else {
            delKey = sibR.keys[0];
            this._leaf.merge(sibR, parNod, delKey);
            BTree._modifyNode(modified, this._leaf);
            BTree._modifyNode(removed, sibR);
            if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
        }

        if (stack.length === 1 && parNod.keys.length === 0) {
            this._root = this._leaf;
            return;
        }

        let curNod = stack.pop();
        let parItm;

        // Update all nodes
        while (curNod.keys.length < this._minkyn && stack.length > 0) {

            parNod = stack.pop();
            parItm = parNod.getItem(delKey);

            // Steal from right sibling if possible
            sibR = (parItm === parNod.keys.length) ? null : parNod.nodePointers[parItm+1];
            if (sibR !== null && sibR.keys.length > this._minkyn) {
                curNod.keys.push(parNod.keys[parItm]);
                parNod.keys[parItm] = sibR.keys.shift();
                curNod.nodePointers.push(sibR.nodePointers.shift());
                BTree._modifyNode(modified, curNod);
                BTree._modifyNode(modified, sibR);
                BTree._modifyNode(modified, parNod);
                break;
            }

            // Steal from left sibling if possible
            sibL = (parItm === 0) ? null : parNod.nodePointers[parItm-1];
            if (sibL !== null && sibL.keys.length > this._minkyn) {
                curNod.keys.unshift(parNod.keys[parItm-1]);
                parNod.keys[parItm-1] = sibL.keys.pop();
                curNod.nodePointers.unshift(sibL.nodePointers.pop());
                BTree._modifyNode(modified, curNod);
                BTree._modifyNode(modified, sibL);
                BTree._modifyNode(modified, parNod);
                break;
            }

            // Merge left to make one node
            if (sibL !== null) {
                delKey = sibL.merge(curNod, parNod, parItm-1);
                BTree._modifyNode(removed, curNod);
                BTree._modifyNode(modified, sibL);
                curNod = sibL;
            } else if (sibR !== null) {
                delKey = curNod.merge(sibR, parNod, parItm);
                BTree._modifyNode(removed, sibR);
                BTree._modifyNode(modified, curNod);
            }

            // Next level
            if (stack.length === 0 && parNod.keys.length === 0) {
                this._root = curNod;
                break;
            }
            curNod = parNod;
        }
    }

    /**
     * Internal helper method to replace a key within the whole stack.
     * @param {Array.<Node>} stk The stack of nodes to examine.
     * @param {*} frKey The key to replace.
     * @param {*} toKey The new key to put in place.
     * @param {*} [modified] The optional set of modified nodes (will be updated by the method).
     * @private
     */
    static _fixNodes(stk, frKey, toKey, modified) {
        let keys, lvl = stk.length, mor = true;
        do {
            lvl--;
            keys = stk[lvl].keys;
            for (let i=keys.length-1; i>=0; --i) {
                if (keys[i] === frKey) {
                    keys[i] = toKey;
                    BTree._modifyNode(modified, stk[lvl]);
                    mor = false;
                    break;
                }
            }
        } while (mor && lvl>0);
    }

    /**
     * Advances to the smallest key k', such that either k' > lower (if lowerOpen) or k' ≥ lower (if !lowerOpen).
     * If lower is undefined, jump to the smallest key's entry.
     * @param {*} lower A lower bound on the key or undefined.
     * @param {boolean} [lowerOpen] Whether lower may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToLowerBound(lower, lowerOpen=false) {
        // TODO: it might be that there is no exact key match, then we do not need to skip!
        if (lower !== undefined) {
            let success = this.seek(lower, BTree.NEAR_MODE.GE);
            if (success && lowerOpen) {
                success = this.skip();
            }
            return success;
        }
        return this.goTop();
    }

    /**
     * Advances to the largest key k', such that either k' < upper (if upperOpen) or k' ≤ upper (if !upperOpen).
     * If upper is undefined, jump to the largest key's entry.
     * @param {*} upper An upper bound on the key or undefined.
     * @param {boolean} [upperOpen] Whether upper may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToUpperBound(upper, upperOpen=false) {
        // TODO: it might be that there is no exact key match, then we do not need to skip!
        if (upper !== undefined) {
            let success = this.seek(upper, BTree.NEAR_MODE.LE);
            if (success && upperOpen) {
                success = this.skip(-1);
            }
            return success;
        }
        return this.goBottom();
    }

    /**
     * An internal helper method used to add a node to a set.
     * If the given s is not a set, it does not do anything.
     * @param {Set|*} s The set to add the node to.
     * @param {Node} node The node to add to the set.
     * @private
     */
    static _modifyNode(s, node) {
        if (s instanceof Set && node !== undefined) {
            s.add(node);
        }
    }

    /**
     * Load a BTree from JSON objects.
     * This method can be used to load a BTree from a JSON database.
     * @param {number} rootId The id of the root node.
     * @param {Map.<number,Object>} nodes A map mapping node ids to JSON objects.
     * @param {number} [order] The order of the tree the nodes will be added to.
     * This is required to be the same as when storing the tree.
     */
    static loadFromJSON(rootId, nodes, order) {
        const tree = new BTree(order);
        const root = nodes.get(rootId);
        tree._root = root;
        const queue = [root];
        let maxId = 0;
        // Restore all nodes and pointers
        while (queue.length > 0) {
            const node = queue.shift();
            maxId = Math.max(node.id, maxId);

            if (node.isLeaf()) {
                let tmp = nodes.get(prevLeaf);
                node.prevLeaf = tmp ? tmp : null;
                if (node.prevLeaf) {
                    queue.push(node.prevLeaf);
                }
                tmp = nodes.get(nextLeaf);
                node.nextLeaf = tmp ? tmp : null;
                if (node.nextLeaf) {
                    queue.push(node.nextLeaf);
                }
            } else {
                for (let i=0; i<node.nodePointers.length; ++i) {
                    let tmp = nodes.get(node.nodePointers[i]);
                    tmp = tmp ? tmp : null;
                    if (tmp) {
                        queue.push(tmp);
                    }
                    node.nodePointers[i] = tmp;
                }
            }
        }
        tree._nodeId = maxId + 1; // Needed for persistence
    }

    /**
     * Dumps the current state of the tree into a map mapping node ids to JSON objects.
     * This method can be used to store the state of the tree into a JSON key value store.
     * @param {Map.<number,Object>} nodes This should be a reference to an empty map.
     * @returns {number} root The id of the root node.
     */
    dump(nodes) {
        nodes.clear();
        const queue = [this._root];
        // Save all nodes and pointers
        while (queue.length > 0) {
            const node = queue.shift();

            nodes.set(node.id, node.toJSON());

            if (node.isLeaf()) {
                if (node.prevLeaf) {
                    queue.push(node.prevLeaf);
                }
                if (node.nextLeaf) {
                    queue.push(node.nextLeaf);
                }
            } else {
                for (let i=0; i<node.nodePointers.length; ++i) {
                    if (node.nodePointers[i]) {
                        queue.push(node.nodePointers[i]);
                    }
                }
            }
        }
        return this._root.id;
    }
}
/**
 * Allows to specify the seek method of a BTree.
 * @enum {number}
 */
BTree.NEAR_MODE = {
    NONE: 0,
    LE: 1,
    GE: 2
};
Class.register(BTree);

/**
 * A TreeTransaction keeps track of the set of modified and removed nodes
 * during one or multiple operations on an underlying BTree.
 * @implements {IBTree}
 */
class TreeTransaction {
    /**
     * Create a TreeTransaction from a BTree.
     * @param {BTree} tree The underlying BTree.
     */
    constructor(tree) {
        this._tree = tree;

        // We potentially need to keep track of modifications to persist them.
        // To ensure consistency, the caller needs to collect modifications over multiple calls synchronously.
        // Hence, the observer pattern is not applicable here, and we keep modifications in the state if requested.
        this._modified = new Set();
        this._removed = new Set();
    }

    /**
     * This method allows to merge the set of modified and removed nodes
     * from two TreeTransactions.
     * @param {TreeTransaction} treeTx The other TreeTransaction to be merged.
     * @returns {TreeTransaction}
     */
    merge(treeTx) {
        if (!(treeTx instanceof TreeTransaction)) {
            return this;
        }
        this._removed = this._removed.union(treeTx.removed);
        this._modified = this._modified.union(treeTx.modified).difference(this._removed);
        return this;
    }

    /**
     * The set of modified nodes during the transaction.
     * @type {Set.<Node>}
     */
    get modified() {
        return this._modified;
    }

    /**
     * The set of removed nodes during the transaction.
     * @type {Set.<Node>}
     */
    get removed() {
        return this._removed;
    }

    /**
     * The root node of the underlying tree.
     * @type {Node}
     */
    get root() {
        return this._tree._root;
    }

    /**
     * The total number of records.
     * Note that if the record is a list/set of records, these are not counted.
     * @type {number}
     */
    get length() {
        return this._tree.length;
    }

    /**
     * The current key as returned by any operation.
     * It is null if there is no matching record.
     * @type {*}
     */
    get currentKey() {
        return this._tree.currentKey;
    }

    /**
     * The current record as returned by any operation.
     * It is null if there is no matching record.
     * This getter also adds the node to the set of modified nodes
     * as we cannot keep track whether something will be modified.
     * @type {*}
     */
    get currentRecord() {
        // Potentially untracked modification.
        if (this._tree.currentLeaf !== undefined) {
            this._modified.add(this._tree.currentLeaf);
        }
        return this._tree.currentRecord;
    }

    /**
     * Inserts a new key-record pair into the BTree, if there is no entry for that key.
     * The current record and current key are set to the new entry in case of success
     * or the existing entry if present.
     * @param {*} key The unique key for the record.
     * @param {*} rec The record associated with the key.
     * @returns {boolean} True if the record was inserted, false if there was already a record with that key.
     */
    insert(key, rec) {
        return this._tree.insert(key, rec, this._modified);
    }

    /**
     * Removes a key-record pair from the BTree.
     * In case of successful deletion, the current record and key will be set to the next entry greater or equal.
     * If no record was found, they will be reset to null.
     * @param {*} key The unique key for the record.
     * @returns {boolean} True if the record was deleted, false if there is no such record.
     */
    remove(key) {
        return this._tree.remove(key, this._modified, this._removed);
    }

    /**
     * Searches the tree for a specific key and advances the current key/record pointers if found.
     * By default only an exact key match is found, but the near parameter also allows to advance to the next entry
     * greater/less or equal than the specified key.
     * @param {*} key The key to look for.
     * @param {BTree.NEAR_MODE} [near] Optional parameter, specifies to look for a key k' =/≤/≥ key.
     * @returns {boolean} True if such a key was found, false otherwise.
     */
    seek(key, near=BTree.NEAR_MODE.NONE) {
        return this._tree.seek(key, near);
    }

    /**
     * Advances the current key/record pointers by a given number of steps.
     * Default is advancing by 1, which means the next record (the new key will thus be the next larger key).
     * -1 means the previous record (the new key will thus be the next smaller key).
     * @param {number} [cnt] The number of records to advance (may be negative).
     * @returns {boolean} True if there is a record to advance to, false otherwise.
     */
    skip(cnt = 1) {
        return this._tree.skip(cnt);
    }

    /**
     * Jumps to the cnt entry starting from the smallest key (i.e., leftmost leaf, first entry) if cnt > 0.
     * If cnt < 0, it jumps to the cnt entry starting from the largest key (i.e., rightmost leaf, last entry).
     * @param {number} [cnt] The record to jump to (may be negative).
     * @returns {boolean} True if there is a record to jump to, false otherwise.
     */
    goto(cnt) {
        return this._tree.goto(cnt);
    }

    /**
     * Returns the index of the current entry (key/record) in a sorted list of all entries.
     * For the B+ Tree, this is done by traversing the leafs from the leftmost leaf, first entry
     * until the respective key is found.
     * @returns {number} The entry position.
     */
    keynum() {
        return this._tree.keynum();
    }

    /**
     * Jumps to the smallest key's entry (i.e., leftmost leaf, first entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goTop() {
        return this._tree.goTop();
    }

    /**
     * Jumps to the largest key's entry (i.e., rightmost leaf, last entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goBottom() {
        return this._tree.goBottom();
    }

    /**
     * Rebuilds/balances the whole tree.
     * Inserting and deleting keys into a tree will result
     * in some leaves and nodes having the minimum number of keys allowed.
     * This routine will ensure that each leaf and node has as many keys as possible,
     * resulting in a denser, flatter tree.
     * False is only returned if the tree is completely empty.
     * @returns {boolean} True if the tree is not completely empty.
     */
    pack() {
        return this._tree.pack();
    }

    /**
     * Advances to the smallest key k', such that either k' > lower (if lowerOpen) or k' ≥ lower (if !lowerOpen).
     * If lower is undefined, jump to the smallest key's entry.
     * @param {*} lower A lower bound on the key or undefined.
     * @param {boolean} [lowerOpen] Whether lower may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToLowerBound(lower, lowerOpen=false) {
        return this._tree.goToLowerBound(lower, lowerOpen);
    }

    /**
     * Advances to the largest key k', such that either k' < upper (if upperOpen) or k' ≤ upper (if !upperOpen).
     * If upper is undefined, jump to the largest key's entry.
     * @param {*} upper An upper bound on the key or undefined.
     * @param {boolean} [upperOpen] Whether upper may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToUpperBound(upper, upperOpen=false) {
        return this._tree.goToUpperBound(upper, upperOpen);
    }
}
Class.register(TreeTransaction);

/**
 * An implementation of a LRU (least recently used) map.
 * This is a map that contains a maximum of k entries,
 * where k is specified in the constructor.
 * When the maximal number of entries is reached,
 * it will evict the least recently used entry.
 * This behaviour is useful for caches.
 * @template K The keys' type.
 * @template V The values' type.
 */
class LRUMap {
    /**
     * Instantiate a LRU map of maximum size maxSize.
     * @param {number} maxSize The maximum size of the map.
     */
    constructor(maxSize) {
        this._maxSize = maxSize;
        /** @type {Map.<K,V>} */
        this._map = new Map();
        /** @type {Map.<K,number>} */
        this._numAccesses = new Map();
        /** @type {Array.<K>} */
        this._accessQueue = [];
    }

    /**
     * The current size of the map.
     * @type {number}
     */
    get size() {
        return this._map.size;
    }

    /**
     * Clears the map.
     */
    clear() {
        this._numAccesses.clear();
        this._accessQueue = [];
        return this._map.clear();
    }

    /**
     * Deletes a key from the map.
     * @param {K} key The key to delete.
     * @returns {boolean} Whether an entry was deleted.
     */
    delete(key) {
        return this._map.delete(key);
    }

    /**
     * Returns an iterator over key value pairs [k, v].
     * @returns {Iterator.<Array>}
     */
    entries() {
        return this._map.entries();
    }

    /**
     * Execute a given function for each key value pair in the map.
     * @param {function(key:K, value:V):*} callback The function to be called.
     * @param {*} [thisArg] This value will be used as this when executing the function.
     */
    forEach(callback, thisArg) {
        return this._map.forEach(callback, thisArg);
    }

    /**
     * Return the corresponding value to a specified key.
     * @param {K} key The key to look for.
     * @returns {V} The value the key maps to (or undefined if not present).
     */
    get(key) {
        this.access(key);
        return this._map.get(key);
    }

    /**
     * Returns true if the specified key is to be found in the map.
     * @param {K} key The key to look for.
     * @returns {boolean} True, if the key is in the map, false otherwise.
     */
    has(key) {
        return this._map.has(key);
    }

    /**
     * Returns an iterator over the keys of the map.
     * @returns {Iterator.<K>}
     */
    keys() {
        return this._map.keys();
    }

    /**
     * Evicts the k least recently used entries from the map.
     * @param {number} [k] The number of entries to evict (default is 1).
     */
    evict(k=1) {
        while (k > 0 && this._accessQueue.length > 0) {
            const oldest = this._accessQueue.shift();
            let accesses = this._numAccesses.get(oldest);
            --accesses;
            this._numAccesses.set(oldest, accesses);
            // Check if not used in the meanwhile.
            if (accesses !== 0) {
                continue;
            }
            // Otherwise delete that.
            this._numAccesses.delete(oldest);
            // If it was not present however, we need to search further.
            if (!this.delete(oldest)) {
                continue;
            }
            --k;
        }
    }

    /**
     * Marks a key as accessed.
     * This implicitly makes the key the most recently used key.
     * @param {K} key The key to mark as accessed.
     */
    access(key) {
        if (!this._map.has(key)) {
            return;
        }
        let accesses = 0;
        if (this._numAccesses.has(key)) {
            accesses = this._numAccesses.get(key);
        }
        ++accesses;
        this._numAccesses.set(key, accesses);
        this._accessQueue.push(key);
    }

    /**
     * Inserts or replaces a key's value into the map.
     * If the maxSize of the map is exceeded, the least recently used key is evicted first.
     * Inserting a key implicitly accesses it.
     * @param {K} key The key to set.
     * @param {V} value The associated value.
     */
    set(key, value) {
        if (this.size >= this._maxSize) {
            this.evict();
        }
        this._map.set(key, value);
        this.access(key);
    }

    /**
     * Returns an iterator over the values of the map.
     * @returns {Iterator.<V>}
     */
    values() {
        return this._map.values();
    }

    /**
     * Returns an iterator over key value pairs [k, v].
     * @returns {Iterator.<Array>}
     */
    [Symbol.iterator]() {
        return this._map.entries();
    }
}
Class.register(LRUMap);

/**
 * Utils that are related to common JavaScript objects.
 */
class ObjectUtils {
    /**
     * This method returns the value of an object at a given path.
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * @param {Object} obj The JS object to access.
     * @param {string|Array.<string>} path The key path to access.
     * @returns {*} The value at the given path or undefined if the path does not exist..
     */
    static byKeyPath(obj, path) {
        if (!Array.isArray(path)) {
            return obj[path];
        }
        let tmp = obj;
        for (const component of path) {
            if (tmp === undefined) {
                return undefined;
            }
            tmp = tmp[component];
        }
        return tmp;
    }
}
Class.register(ObjectUtils);

/**
 * A class, which inherits from Observable, can notify interested parties
 * on occurrence of specified events.
 */
class Observable {
    /**
     * A special event matching every other event.
     * @type {string}
     * @constant
     */
    static get WILDCARD() {
        return '*';
    }

    constructor() {
        /** @type {Map.<string, Array.<Function>>} */
        this._listeners = new Map();
    }

    /**
     * Registers a handler for a given event.
     * @param {string} type The event to observe.
     * @param {Function} callback The handler to be called on occurrence of the event.
     * @return {number} The handle for this handler. Can be used to unregister it again.
     */
    on(type, callback) {
        if (!this._listeners.has(type)) {
            this._listeners.set(type, [callback]);
            return 0;
        } else {
            return this._listeners.get(type).push(callback) - 1;
        }
    }

    /**
     * Unregisters a handler for a given event.
     * @param {string} type The event to unregister from.
     * @param {number} id The handle received upon calling the on function.
     */
    off(type, id) {
        if (!this._listeners.has(type) || !this._listeners.get(type)[id]) return;
        delete this._listeners.get(type)[id];
    }

    /**
     * Fires an event and notifies all observers.
     * @param {string} type The type of event.
     * @param {...*} args Arguments to pass to the observers.
     */
    fire(type, ...args) {
        // Notify listeners for this event type.
        if (this._listeners.has(type)) {
            for (const i in this._listeners.get(type)) {
                const listener = this._listeners.get(type)[i];
                listener.apply(null, args);
            }
        }

        // Notify wildcard listeners. Pass event type as first argument
        if (this._listeners.has(Observable.WILDCARD)) {
            for (const i in this._listeners.get(Observable.WILDCARD)) {
                const listener = this._listeners.get(Observable.WILDCARD)[i];
                listener.apply(null, arguments);
            }
        }
    }

    /**
     * Registers handlers on another observable, bubbling its events up to the own observers.
     * @param {Observable} observable The observable, whose events should bubble up.
     * @param {...string} types The events to bubble up.
     */
    bubble(observable, ...types) {
        for (const type of types) {
            let callback;
            if (type == Observable.WILDCARD) {
                callback = function() {
                    this.fire.apply(this, arguments);
                };
            } else {
                callback = function() {
                    this.fire.apply(this, [type, ...arguments]);
                };
            }
            observable.on(type, callback.bind(this));
        }
    }
}
Class.register(Observable);

/**
 * Calculates the union of two sets.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {Set} The union of this set and the second set.
 */
Set.prototype.union = function(setB) {
    const union = new Set(this);
    for (const elem of setB) {
        union.add(elem);
    }
    return union;
};

/**
 * Calculates the intersection of two sets.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {Set} The intersection of this set and the second set.
 */
Set.prototype.intersection = function(setB) {
    const intersection = new Set();
    for (const elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
};

/**
 * Calculates the difference of two sets.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {Set} The difference of this set and the second set.
 */
Set.prototype.difference = function(setB) {
    const difference = new Set(this);
    for (const elem of setB) {
        difference.delete(elem);
    }
    return difference;
};

/**
 * Checks whether two sets are equal to each other.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {boolean} True if they contain the same elements, false otherwise.
 */
Set.prototype.equals = function(setB) {
    if (this.size !== setB.size) return false;
    for (const elem of setB) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
};

/**
 * Creates a Set from single values and iterables.
 * If arg is not iterable, it creates a new Set with arg as its single member.
 * If arg is iterable, it iterates over arg and puts all items into the Set.
 * Static method of Set.
 * @memberOf Set
 * @param {*} arg The argument to create the Set from.
 * @returns {Set} The resulting Set.
 */
Set.from = function(arg) {
    // Check if iterable and not string.
    if (arg && typeof arg[Symbol.iterator] === 'function' && typeof arg !== 'string') {
        return new Set(arg);
    }
    return new Set([arg]);
};

/**
 * Returns an element of a Set.
 * Static method of Set.
 * @memberOf Set
 * @template T
 * @param {Set.<T>} s The set to return an element from.
 * @returns {T} An element of the set.
 */
Set.sampleElement = function(s) {
    return s.size > 0 ? s.values().next().value : undefined;
};

class Synchronizer extends Observable {
    constructor() {
        super();
        this._queue = [];
        this._working = false;
    }

    /**
     * Push function to the Synchronizer for later, synchronous execution
     * @template T
     * @param {function():T} fn Function to be invoked later by this Synchronizer
     * @returns {Promise.<T>}
     */
    push(fn) {
        return new Promise((resolve, error) => {
            this._queue.push({fn: fn, resolve: resolve, error: error});
            if (!this._working) {
                this._doWork();
            }
        });
    }

    async _doWork() {
        this._working = true;
        this.fire('work-start', this);

        while (this._queue.length) {
            const job = this._queue.shift();
            try {
                const result = await job.fn();
                job.resolve(result);
            } catch (e) {
                if (job.error) job.error(e);
            }
        }

        this._working = false;
        this.fire('work-end', this);
    }

    /** @type {boolean} */
    get working() {
        return this._working;
    }
}
Class.register(Synchronizer);

/**
 * This is an intermediate layer caching the results of a backend.
 * While simple get/put queries make use of the cache,
 * more advanced queries will be forwarded to the backend.
 * @implements {IBackend}
 */
class CachedBackend {
    /**
     * Creates a new instance of the cached layer using the specified backend.
     * @param {IBackend} backend The backend to use.
     */
    constructor(backend) {
        this._backend = backend;
        /** @type {Map.<string,*>} */
        this._cache = new LRUMap(CachedBackend.MAX_CACHE_SIZE);
    }

    /** @type {boolean} */
    get connected() {
        return this._backend.connected;
    }

    /**
     * A map of index names to indices as defined by the underlying backend.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        return this._backend.indices;
    }

    /**
     * A helper method to retrieve the values corresponding to a set of keys.
     * @param {Set.<string>} keys The set of keys to get the corresponding values for.
     * @returns {Promise.<Array.<*>>} A promise of the array of values.
     * @protected
     */
    async _retrieveValues(keys) {
        const valuePromises = [];
        for (const key of keys) {
            valuePromises.push(this.get(key));
        }
        return Promise.all(valuePromises);
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * If the item is in the cache, the cached value will be returned.
     * Otherwise, the value will be fetched from the backend object store..
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    async get(key) {
        if (this._cache.has(key)) {
            return this._cache.get(key);
        }
        const value = await this._backend.get(key);
        this._cache.set(key, value);
        return value;
    }

    /**
     * Inserts or replaces a key-value pair.
     * Stores the new key-value pair in both the cache and the backend.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    put(key, value) {
        this._cache.set(key, value);
        return this._backend.put(key, value);
    }

    /**
     * Removes the key-value pair of the given key from the cache and the backend.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    remove(key) {
        this._cache.delete(key);
        return this._backend.remove(key);
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query by querying the backend.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    keys(query=null) {
        return this._backend.keys(query);
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query by relying on the backend.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null) {
        const keys = await this.keys(query);
        return this._retrieveValues(keys);
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    maxValue(query=null) {
        return this._backend.maxValue(query);
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    maxKey(query=null) {
        return this._backend.maxKey(query);
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    minKey(query=null) {
        return this._backend.minKey(query);
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    minValue(query=null) {
        return this._backend.minValue(query);
    }

    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    count(query=null) {
        return this._backend.count(query);
    }

    /**
     * Unsupported operation for a cached backend.
     * @param {Transaction} [tx]
     * @returns {Promise.<boolean>}
     */
    async commit(tx) {
        throw 'Unsupported operation';
    }

    /**
     * Unsupported operation for a cached backend.
     * @param {Transaction} [tx]
     */
    async abort(tx) {
        throw 'Unsupported operation';
    }

    /**
     * Internally applies a transaction to the cache's and backend's state.
     * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
     * or no changes are applied.
     * @param {Transaction} tx The transaction to apply.
     * @returns {Promise} The promise resolves after applying the transaction.
     * @protected
     */
    _apply(tx) {
        this._applyLocally(tx);
        return this._backend._apply(tx);
    }

    /**
     * Internally applies a transaction to the cache's state.
     * @param {Transaction} tx The transaction to apply.
     * @returns {Promise} The promise resolves after applying the transaction.
     * @protected
     */
    _applyLocally(tx) {
        // Update local state and push to backend for batch transaction.
        if (tx._truncated) {
            this._cache.clear();
        }
        for (const key of tx._removed) {
            this._cache.delete(key);
        }
        for (const [key, value] of tx._modified) {
            this._cache.set(key, value);
        }
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        this._cache.clear();
        return this._backend.truncate();
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        return this._backend.index(indexName);
    }

    /**
     * Creates a new secondary index on the object store.
     * Currently, all secondary indices are non-unique.
     * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
     * be used to find this entry.
     * If a new object does not possess the key path associated with that index, it is simply ignored.
     *
     * This function may only be called before the database is connected.
     * Moreover, it is only executed on database version updates or on first creation.
     * @param {string} indexName The name of the index.
     * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
     * @param {boolean} [multiEntry]
     */
    createIndex(indexName, keyPath, multiEntry=false) {
        return this._backend.createIndex(indexName, keyPath, multiEntry);
    }

    /**
     * Deletes a secondary index from the object store.
     * @param indexName
     * @returns {Promise} The promise resolves after deleting the index.
     */
    deleteIndex(indexName) {
        return this._backend.deleteIndex(indexName);
    }

    /**
     * Closes the object store and potential connections.
     * @returns {Promise} The promise resolves after closing the object store.
     */
    close() {
        return this._backend.close();
    }

    /**
     * Creates a new transaction, ensuring read isolation
     * on the most recently successfully committed state.
     * @returns {Transaction} The transaction object.
     */
    transaction() {
        throw 'Unsupported operation';
    }

    /**
     * Returns the necessary information in order to flush a combined transaction.
     * @abstract
     * @param {Transaction} tx The transaction that should be applied to this backend.
     * @returns {Promise.<*|function()|Array.<*|function()>>} For non-persistent backends: a function that effectively applies the transaction.
     * Native backends otherwise specify their own information as needed by their JungleDB instance.
     */
    async applyCombined(tx) {
        return [await this._backend.applyCombined(tx), () => this._applyLocally(tx)];
    }
}
/** @type {number} Maximum number of cached elements. */
CachedBackend.MAX_CACHE_SIZE = 5000 /*elements*/;
Class.register(CachedBackend);

/**
 * This is a BTree based index, which is generally stored in memory.
 * It is used by transactions.
 * @implements {IIndex}
 */
class InMemoryIndex {
    /**
     * Creates a new InMemoryIndex for a given object store.
     * The key path describes the path of the secondary key within the stored objects.
     * Only objects for which the key path exists are part of the secondary index.
     *
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     *
     * If a secondary index is a multi entry index, and the value at the key path is iterable,
     * every item of the iterable value will be associated with the object.
     * @param {IObjectStore} objectStore The underlying object store to use.
     * @param {string|Array.<string>} [keyPath] The key path of the indexed attribute.
     * If the keyPath is not given, this is a primary index.
     * @param {boolean} [multiEntry] Whether the indexed attribute is considered to be iterable or not.
     * @param {boolean} [unique] Whether there is a unique constraint on the attribute.
     */
    constructor(objectStore, keyPath, multiEntry=false, unique=false) {
        this._objectStore = objectStore;
        this._keyPath = keyPath;
        this._multiEntry = multiEntry;
        this._unique = unique;
        this._tree = new BTree();
    }

    /**
     * Reinitialises the index.
     * @returns {Promise} The promise resolves after emptying the index.
     */
    async truncate() {
        this._tree = new BTree();
    }

    /**
     * Helper method to return the attribute associated with the key path if it exists.
     * @param {string} key The primary key of the key-value pair.
     * @param {*} obj The value of the key-value pair.
     * @returns {*} The attribute associated with the key path, if it exists, and undefined otherwise.
     * @private
     */
    _indexKey(key, obj) {
        if (this.keyPath) {
            if (obj === undefined) return undefined;
            return ObjectUtils.byKeyPath(obj, this.keyPath);
        }
        return key;
    }

    /**
     * The key path associated with this index.
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * If the keyPath is undefined, this index uses the primary key of the key-value store.
     * @type {string|Array.<string>}
     */
    get keyPath() {
        return this._keyPath;
    }

    /**
     * This value determines whether the index supports multiple secondary keys per entry.
     * If so, the value at the key path is considered to be an iterable.
     * @type {boolean}
     */
    get multiEntry() {
        return this._multiEntry;
    }

    /**
     * A helper method to insert a primary-secondary key pair into the tree.
     * @param {string} key The primary key.
     * @param {*} iKey The indexed key.
     * @param {IBTree} [tree] The optional tree in which to insert the pair.
     * @throws if the uniqueness constraint is violated.
     */
    _insert(key, iKey, tree) {
        tree = tree || this._tree;
        if (!this._multiEntry || !Array.isArray(iKey)) {
            iKey = [iKey];
        }
        // Add all keys.
        for (const component of iKey) {
            if (tree.seek(component)) {
                if (this._unique) {
                    throw `Uniqueness constraint violated for key ${key} on path ${this._keyPath}`;
                }
                tree.currentRecord.add(key);
            } else {
                tree.insert(component, this._unique ? key : Set.from(key));
            }
        }
    }

    /**
     * Inserts a new key-value pair into the index.
     * For replacing an existing pair, the old value has to be passed as well.
     * @param {string} key The primary key of the pair.
     * @param {*} value The value of the pair. The indexed key will be extracted from this.
     * @param {*} [oldValue] The old value associated with the primary key.
     * @returns {TreeTransaction} The TreeTransaction that was needed to insert/replace the key-value pair.
     */
    put(key, value, oldValue) {
        const treeTx = this._tree.transaction();
        const oldIKey = this._indexKey(key, oldValue);
        const newIKey = this._indexKey(key, value);

        if (oldIKey !== undefined) {
            this._remove(key, oldIKey, treeTx);
        }
        this._insert(key, newIKey, treeTx);
        return treeTx;
    }

    /**
     * Removes a key-value pair from the index.
     * @param {string} key The primary key of the pair.
     * @param {*} oldValue The old value of the pair. The indexed key will be extracted from this.
     * @returns {TreeTransaction} The TreeTransaction that was needed to remove the key-value pair.
     */
    remove(key, oldValue) {
        const treeTx = this._tree.transaction();
        if (oldValue !== undefined) {
            const iKey = this._indexKey(key, oldValue);
            this._remove(key, iKey, treeTx);
        }
        return treeTx;
    }

    /**
     * A helper method to remove a primary-secondary key pair from the tree.
     * @param {string} key The primary key.
     * @param {*} iKey The indexed key.
     * @param {IBTree} [tree] The optional tree in which to insert the pair.
     */
    _remove(key, iKey, tree) {
        tree = tree || this._tree;
        if (!this._multiEntry || !Array.isArray(iKey)) {
            iKey = [iKey];
        }
        // Remove all keys.
        for (const component of iKey) {
            if (tree.seek(component)) {
                if (!this._unique && tree.currentRecord.size > 1) {
                    tree.currentRecord.delete(key);
                } else {
                    tree.remove(component);
                }
            }
        }
    }

    /**
     * A helper method to retrieve the values corresponding to a set of keys.
     * @param {Set.<string>} keys The set of keys to get the corresponding values for.
     * @returns {Promise.<Array.<*>>} A promise of the array of values.
     * @protected
     */
    async _retrieveValues(keys) {
        const valuePromises = [];
        for (const key of keys) {
            valuePromises.push(this._objectStore.get(key));
        }
        return Promise.all(valuePromises);
    }

    /**
     * Returns a promise of an array of objects whose secondary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the index.
     * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
     * @param {KeyRange} [query] Optional query to check secondary keys against.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null) {
        const keys = await this.keys(query);
        return this._retrieveValues(keys);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
     * If the optional query is not given, it returns all primary keys in the index.
     * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
     * @param {KeyRange} [query] Optional query to check the secondary keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
     */
    async keys(query=null) {
        let resultSet = new Set();

        // Shortcut for exact match.
        if (query instanceof KeyRange && query.exactMatch) {
            if (this._tree.seek(query.lower)) {
                resultSet = Set.from(this._tree.currentRecord);
            }
            return resultSet;
        }

        // Find lower bound and start from there.
        if (!(query instanceof KeyRange)) {
            this._tree.goTop();
        } else {
            if (!this._tree.goToLowerBound(query.lower, query.lowerOpen)) {
                return resultSet; // empty
            }
        }

        while (!(query instanceof KeyRange) || query.includes(this._tree.currentKey)) {
            resultSet = resultSet.union(Set.from(this._tree.currentRecord));
            if (!this._tree.skip()) {
                break;
            }
        }
        return resultSet;
    }

    /**
     * Returns a promise of an array of objects whose secondary key is maximal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async maxValues(query=null) {
        const keys = await this.maxKeys(query);
        return this._retrieveValues(keys);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async maxKeys(query=null) {
        const isRange = query instanceof KeyRange;
        if (!this._tree.goToUpperBound(isRange ? query.upper : undefined, isRange ? query.upperOpen : false)) {
            return new Set();
        }
        return Set.from(this._tree.currentRecord);
    }

    /**
     * Returns a promise of an array of objects whose secondary key is minimal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async minValues(query=null) {
        const keys = await this.minKeys(query);
        return this._retrieveValues(keys);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async minKeys(query=null) {
        const isRange = query instanceof KeyRange;
        if (!this._tree.goToLowerBound(isRange ? query.lower : undefined, isRange ? query.lowerOpen : false)) {
            return new Set();
        }
        return Set.from(this._tree.currentRecord);
    }

    /**
     * Returns the count of entries, whose secondary key is in the given range.
     * If the optional query is not given, it returns the count of entries in the index.
     * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        return (await this.keys(query)).size;
        // The code below does only work for unique indices.
        // if (!(query instanceof KeyRange)) {
        //     return this._tree.length;
        // }
        // if (!this._tree.goToLowerBound(query.lower, query.lowerOpen)) {
        //     return 0;
        // }
        // const start = this._tree.keynum();
        // if (!this._tree.goToUpperBound(query.upper, query.upperOpen)) {
        //     return 0;
        // }
        // const end = this._tree.keynum();
        // return end - start + 1;
    }
}
Class.register(InMemoryIndex);


/**
 * Transactions are created by calling the transaction method on an ObjectStore object.
 * Transactions ensure read-isolation.
 * On a given state, only *one* transaction can be committed successfully.
 * Other transactions based on the same state will end up in a conflicted state if committed.
 * Transactions opened after the successful commit of another transaction will be based on the
 * new state and hence can be committed again.
 * @implements {IBackend}
 */
class InMemoryBackend {
    constructor(tableName, codec=null) {
        this._cache = new Map();

        /** @type {Map.<string,PersistentIndex>} */
        this._indices = new Map();

        this._primaryIndex = new InMemoryIndex(this, undefined, false, true);
        this._tableName = tableName;
        this._codec = codec;
    }

    /** @type {boolean} */
    get connected() {
        return true;
    }

    /**
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        return this._indices;
    }

    /**
     * @param {string} key
     * @returns {Promise.<*>}
     */
    async get(key) {
        return this.decode(this._cache.get(key), key);
    }

    /**
     * @param {string} key
     * @param {*} value
     * @returns {Promise}
     */
    async put(key, value) {
        const oldValue = await this.get(key);
        this._cache.set(key, this.encode(value));
        const indexPromises = [
            this._primaryIndex.put(key, value, oldValue)
        ];
        for (const index of this._indices.values()) {
            indexPromises.push(index.put(key, value, oldValue));
        }
        return Promise.all(indexPromises);
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    async remove(key) {
        const oldValue = await this.get(key);
        this._cache.delete(key);
        const indexPromises = [
            this._primaryIndex.remove(key, oldValue)
        ];
        for (const index of this._indices.values()) {
            indexPromises.push(index.remove(key, oldValue));
        }
        return Promise.all(indexPromises);
    }

    /**
     * @param {Query|KeyRange} [query]
     * @returns {Promise.<Array.<*>>}
     */
    async values(query=null) {
        if (query !== null && query instanceof Query) {
            return query.values(this);
        }
        const values = [];
        for (const key of this.keys(query)) {
            values.push(await this.get(key));
        }
        return Promise.resolve(values);
    }

    /**
     * @param {Query|KeyRange} [query]
     * @returns {Promise.<Set.<string>>}
     */
    keys(query=null) {
        if (query !== null && query instanceof Query) {
            return query.keys(this);
        }
        return this._primaryIndex.keys(query);
    }

    /**
     * @param {KeyRange} [query]
     * @returns {Promise.<*>}
     */
    async maxValue(query=null) {
        const maxKey = await this.maxKey(query);
        return this.get(maxKey);
    }

    /**
     * @param {KeyRange} [query]
     * @returns {Promise.<string>}
     */
    async maxKey(query=null) {
        const keys = await this._primaryIndex.maxKeys(query);
        return Set.sampleElement(keys);
    }

    /**
     * @param {KeyRange} [query]
     * @returns {Promise.<*>}
     */
    async minValue(query=null) {
        const minKey = await this.minKey(query);
        return this.get(minKey);
    }

    /**
     * @param {KeyRange} [query]
     * @returns {Promise.<string>}
     */
    async minKey(query=null) {
        const keys = await this._primaryIndex.minKeys(query);
        return Set.sampleElement(keys);
    }

    /**
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        return (await this.keys(query)).size;
    }

    /**
     * @param {string} indexName
     * @returns {IIndex}
     */
    index(indexName) {
        return this._indices.get(indexName);
    }

    /**
     * @param {Transaction} tx
     * @returns {Promise.<boolean>}
     * @protected
     */
    async _apply(tx) {
        if (tx._truncated) {
            await this.truncate();
        }

        for (const key of tx._removed) {
            await this._cache.delete(key);
        }
        for (const [key, value] of tx._modified) {
            await this._cache.set(key, this.encode(value));
        }

        // Update all indices.
        const indexPromises = [
            InMemoryBackend._indexApply(this._primaryIndex, tx)
        ];
        for (const index of this._indices.values()) {
            indexPromises.push(InMemoryBackend._indexApply(index, tx));
        }
        return Promise.all(indexPromises);
    }

    /**
     * @param {InMemoryIndex} index
     * @param {Transaction} tx
     * @returns {Promise}
     * @private
     */
    static async _indexApply(index, tx) {
        if (tx._truncated) {
            await index.truncate();
        }

        for (const key of tx._removed) {
            await index.remove(key, tx._originalValues.get(key));
        }
        for (const [key, value] of tx._modified) {
            await index.put(key, value, tx._originalValues.get(key));
        }
    }

    /**
     * @returns {Promise}
     */
    async truncate() {
        this._cache.clear();

        // Truncate all indices.
        const indexPromises = [
            this._primaryIndex.truncate()
        ];
        for (const index of this._indices.values()) {
            indexPromises.push(index.truncate());
        }
        return Promise.all(indexPromises);
    }

    /**
     * @param {function(key:string, value:*)} func
     * @returns {Promise}
     */
    async map(func) {
        for (const [key, value] of this._cache) {
            func(key, value);
        }
    }

    /**
     * @param {string} indexName
     * @param {string|Array.<string>} [keyPath]
     * @param {boolean} [multiEntry]
     */
    createIndex(indexName, keyPath, multiEntry=false) {
        keyPath = keyPath || indexName;
        const index = new InMemoryIndex(this, keyPath, multiEntry);
        this._indices.set(indexName, index);
    }

    /**
     * Internal method called to decode a single value.
     * @param {*} value Value to be decoded.
     * @param {string} key Key corresponding to the value.
     * @returns {*} The decoded value.
     */
    decode(value, key) {
        if (value === undefined) {
            return undefined;
        }
        if (this._codec !== null && this._codec !== undefined) {
            return this._codec.decode(value, key);
        }
        return value;
    }

    /**
     * Internal method called to encode a single value.
     * @param {*} value Value to be encoded.
     * @returns {*} The encoded value.
     */
    encode(value) {
        if (value === undefined) {
            return undefined;
        }
        if (this._codec !== null && this._codec !== undefined) {
            return this._codec.encode(value);
        }
        return value;
    }

    /** @type {string} The own table name. */
    get tableName() {
        return this._tableName;
    }

    /**
     * Returns the necessary information in order to flush a combined transaction.
     * @param {Transaction} tx The transaction that should be applied to this backend.
     * @returns {Promise.<*|function()>} Either the tableName if this is a native, persistent backend
     * or a function that effectively applies the transaction to non-persistent backends.
     */
    async applyCombined(tx) {
        return () => this._apply(tx);
    }
}
Class.register(InMemoryBackend);

/**
 * This class represents range queries on an index (primary and secondary).
 */
class KeyRange {
    /**
     * This constructor is only used internally.
     * See static methods for constructing a KeyRange object.
     * @param {*} lower
     * @param {*} upper
     * @param {boolean} lowerOpen
     * @param {boolean} upperOpen
     * @private
     */
    constructor(lower, upper, lowerOpen, upperOpen) {
        this._lower = lower;
        this._upper = upper;
        this._lowerOpen = lowerOpen;
        this._upperOpen = upperOpen;
    }

    /** @type {*} The lower bound of the range. */
    get lower() {
        return this._lower;
    }

    /** @type {*} The upper bound of the range. */
    get upper() {
        return this._upper;
    }

    /** @type {boolean} Whether the lower bound is NOT part of the range. */
    get lowerOpen() {
        return this._lowerOpen;
    }

    /** @type {boolean} Whether the upper bound is NOT part of the range. */
    get upperOpen() {
        return this._upperOpen;
    }

    /** @type {boolean} Whether it is a query for an exact match. */
    get exactMatch() {
        return this._lower === this._upper && !this._lowerOpen && !this.upperOpen;
    }

    /**
     * Returns true if the given key is included in this range.
     * @param {*} key The key to test for.
     * @returns {boolean} True, if the key is included in the range and false otherwise.
     */
    includes(key) {
        return (this._lower === undefined
                || this._lower < key
                || (!this._lowerOpen && this._lower === key))
            && (this._upper === undefined
                || this._upper > key
                || (!this._upperOpen && this._upper === key));
    }

    /**
     * If upperOpen is false, all keys ≤ upper,
     * all keys < upper otherwise.
     * @param {*} upper The upper bound.
     * @param {boolean} upperOpen Whether the upper bound is NOT part of the range.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static upperBound(upper, upperOpen=false) {
        return new KeyRange(undefined, upper, false, upperOpen);
    }

    /**
     * If lowerOpen is false, all keys ≥ lower,
     * all keys > lower otherwise.
     * @param {*} lower The lower bound.
     * @param {boolean} lowerOpen Whether the lower bound is NOT part of the range.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static lowerBound(lower, lowerOpen=false) {
        return new KeyRange(lower, undefined, lowerOpen, false);
    }

    /**
     * A range bounded by both a lower and upper bound.
     * lowerOpen and upperOpen decide upon whether < (open) or ≤ (inclusive) comparisons
     * should be used for comparison.
     * @param {*} lower The lower bound.
     * @param {*} upper The upper bound.
     * @param {boolean} lowerOpen Whether the lower bound is NOT part of the range.
     * @param {boolean} upperOpen Whether the upper bound is NOT part of the range.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static bound(lower, upper, lowerOpen=false, upperOpen=false) {
        return new KeyRange(lower, upper, lowerOpen, upperOpen);
    }

    /**
     * A range matching only exactly one value.
     * @param {*} value The value to match.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static only(value) {
        return new KeyRange(value, value, false, false);
    }
}
Class.register(KeyRange);

/**
 * This is the main implementation of an object store.
 * It uses a specified backend (which itself implements the very same interface)
 * and builds upon this backend to answer queries.
 * The main task of this object store is to manage transactions
 * and ensure read isolation on these transactions.
 * @implements {IObjectStore}
 * @implements {ICommittable}
 */
class ObjectStore {
    /**
     * Creates a new object store based on a backend and an underlying database.
     * The database is only used to determine the connection status.
     * @param {IBackend} backend The backend underlying this object store.
     * @param {JungleDB} db The database underlying the backend.
     */
    constructor(backend, db) {
        this.__backend = backend;
        this._db = db;
        /** @type {Array.<Transaction>} */
        this._stateStack = [];
        /**
         * Maps transactions to their base states.
         * @type {Map.<number|string,number|string>}
         */
        this._txBaseStates = new Map();
        /**
         * Maps transactions to their base states.
         * @type {Map.<number|string,IObjectStore>}
         */
        this._transactions = new Map();
        this._transactions.set(ObjectStore.BACKEND_ID, this.__backend);
        /**
         * Maps base states to their open child transactions.
         * @type {Map.<number|string,Set.<number>>}
         */
        this._openTransactions = new Map();
        this._openTransactions.set(ObjectStore.BACKEND_ID, new Set());
        /**
         * Set of base states already committed to.
         * @type {Set.<number|string>}
         */
        this._closedBaseStates = new Set();
    }

    /** @type {JungleDB} */
    get jungleDB() {
        return this._db;
    }

    /** @type {boolean} */
    get connected() {
        return this.__backend.connected;
    }

    /** @type {IObjectStore} */
    get _currentState() {
        return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1] : this.__backend;
    }

    /** @type {number|string} */
    get _currentStateId() {
        return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1].id : ObjectStore.BACKEND_ID;
    }

    /**
     * A map of index names to indices.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.indices;
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    get(key) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.get(key);
    }

    /**
     * Inserts or replaces a key-value pair.
     * Implicitly creates a transaction for this operation and commits it.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async put(key, value) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        const tx = this.transaction();
        await tx.put(key, value);
        return tx.commit();
    }

    /**
     * Removes the key-value pair of the given key from the object store.
     * Implicitly creates a transaction for this operation and commits it.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async remove(key) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        const tx = this.transaction();
        await tx.remove(key);
        return tx.commit();
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    keys(query=null) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        if (query !== null && query instanceof Query) {
            return query.keys(this._currentState);
        }
        return this._currentState.keys(query);
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    values(query=null) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        if (query !== null && query instanceof Query) {
            return query.values(this._currentState);
        }
        return this._currentState.values(query);
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    maxValue(query=null) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.maxValue(query);
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    maxKey(query=null) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.maxKey(query);
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    minKey(query=null) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.minKey(query);
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    minValue(query=null) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.minValue(query);
    }

    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    count(query=null) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.count(query);
    }

    /**
     * This method is only used by transactions internally to commit themselves to the corresponding object store.
     * Thus, the tx argument is non-optional.
     * A call to this method checks whether the given transaction can be applied and pushes it to
     * the stack of applied transactions. When there is no other transaction requiring to enforce
     * read isolation, the state will be flattened and all transactions will be applied to the backend.
     * @param {Transaction} tx The transaction to be applied.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     * @protected
     */
    async commit(tx) {
        if (!this._isCommittable(tx)) {
            await this.abort(tx);
            return false;
        }
        await this._commit(tx);
        return true;
    }

    /**
     * Is used to probe whether a transaction can be committed.
     * This, for example, includes a check whether another transaction has already been committed.
     * @protected
     * @param {Transaction} tx The transaction to be applied.
     * @returns {boolean} Whether a commit will be successful.
     */
    _isCommittable(tx) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        if (!(tx instanceof Transaction) || tx.state !== Transaction.STATE.OPEN || !this._txBaseStates.has(tx.id)) {
            throw 'Can only commit open transactions';
        }

        const baseState = this._txBaseStates.get(tx.id);

        // Another transaction was already committed.
        return !this._closedBaseStates.has(baseState);
    }

    /**
     * Is used to commit the transaction.
     * @protected
     * @param {Transaction} tx The transaction to be applied.
     * @returns {Promise} A promise that resolves upon successful application of the transaction.
     */
    async _commit(tx) {
        const baseState = this._txBaseStates.get(tx.id);
        const openTransactions = this._openTransactions.get(baseState);
        openTransactions.delete(tx.id);
        const numOpenTransactions = openTransactions.size;


        // Create new layer on stack (might be immediately removed by a state flattening).
        if (this._stateStack.length >= ObjectStore.MAX_STACK_SIZE) {
            throw 'Transaction stack size exceeded';
        }
        this._stateStack.push(tx);
        this._openTransactions.set(tx.id, new Set());
        this._closedBaseStates.add(baseState);

        // If this is the last transaction, we push our changes to the underlying layer.
        // This only works if the given transaction does not have dependencies or the current state is the backend.
        if (numOpenTransactions === 0 && (tx.dependency === null || baseState === ObjectStore.BACKEND_ID)) {
            // The underlying layer *has to be* the last one in our stack.
            await this._flattenState(tx);
        }
    }

    /**
     * Allows to change the backend of a Transaction when the state has been flushed.
     * @param backend
     * @protected
     */
    set _backend(backend) {
        throw 'Unsupported operation';
    }

    /**
     * @tyoe {IBackend}
     * @protected
     */
    get _backend() {
        return this.__backend;
    }

    /**
     * This method is only used by transactions internally to abort themselves at the corresponding object store.
     * Thus, the tx argument is non-optional.
     * @param {Transaction} tx The transaction to be aborted.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     * @protected
     */
    async abort(tx) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        if (!(tx instanceof Transaction) || tx.state !== Transaction.STATE.OPEN || !this._txBaseStates.has(tx.id)) {
            throw 'Can only abort open transactions';
        }
        const baseState = this._txBaseStates.get(tx.id);

        const openTransactions = this._openTransactions.get(baseState);
        openTransactions.delete(tx.id);
        const numOpenTransactions = openTransactions.size;
        // Cleanup.
        this._txBaseStates.delete(tx.id);
        this._transactions.delete(tx.id);

        if (numOpenTransactions === 0) {
            await this._flattenState();
        }
        return true;
    }

    /**
     * This internal method applies a transaction to the current state
     * and tries flattening the stack of transactions.
     * @param {Transaction} [tx] An optional transaction to apply to the current state.
     * @returns {boolean} If a tx is given, this boolean indicates whether the state has been merged.
     * If tx is not given, the return value is false and does not convey a meaning.
     * @private
     */
    async _flattenState(tx) {
        // If there is a tx argument, merge it with the current state.
        if (tx && (tx instanceof Transaction)) {
            // Check whether the state can be flattened.
            // For this, the following conditions have to hold:
            // 1. the base state does not have open transactions
            // 2. the base state is either the backend or neither the base state nor tx have an onFlush callback
            const baseState = this._txBaseStates.get(tx.id);
            if (this._openTransactions.get(baseState).size > 0) {
                return false;
            }
            if (tx.dependency !== null && baseState !== ObjectStore.BACKEND_ID) {
                return false;
            }

            // Applying is possible.
            // We apply it first and upon successful application, we update transactions.
            // This way, we ensure that intermediate reads still work and that transactions
            // are still consistent even if the application fails.
            const backend = this._transactions.get(baseState);
            const cleanup = () => {
                // Change pointers in child transactions.
                if (this._openTransactions.has(tx.id)) {
                    for (const txId of this._openTransactions.get(tx.id)) {
                        const childTx = this._transactions.get(txId);
                        childTx._backend = backend;
                        this._txBaseStates.set(childTx.id, baseState);
                    }
                }
                // If tx is in the state stack (i.e., a closed base state), update its potential closed child.
                if (this._closedBaseStates.has(tx.id)) {
                    const index = this._stateStack.indexOf(tx);
                    if (index + 1 < this._stateStack.length) {
                        const childTx = this._stateStack[index + 1];
                        childTx._backend = backend;
                        this._txBaseStates.set(childTx.id, baseState);
                    }
                }

                // Copy relevant baseState data to new base state.
                // If tx was a closed base state, the new base state also is.
                // Otherwise remove the base state from the closed states, since we just flushed.
                if (this._closedBaseStates.has(tx.id)) {
                    this._closedBaseStates.add(baseState);
                    this._closedBaseStates.delete(tx.id);
                } else {
                    this._closedBaseStates.delete(baseState);
                }
                // The open transactions transfer from the tx to the open transactions' new base state.
                if (this._openTransactions.has(tx.id)) {
                    this._openTransactions.set(baseState, this._openTransactions.get(tx.id));
                    this._openTransactions.delete(tx.id);
                }

                // Cleanup.
                this._txBaseStates.delete(tx.id);
                this._transactions.delete(tx.id);

                // Look for tx on stack and remove it.
                const statePosition = this._stateStack.indexOf(tx);
                if (statePosition >= 0) {
                    this._stateStack.splice(statePosition, 1);
                }
            };

            if (tx.dependency === null) {
                await backend._apply(tx);
                cleanup();
                return true;
            } else {
                return await tx.dependency.onFlushable(tx, cleanup);
            }
        } else {
            // Check both ends of the stack.
            // Start with the easy part: The last state.
            // Start flattening at the end.
            while (this._stateStack.length > 0) {
                if (!(await this._flattenState(this._currentState))) {
                    break;
                }
            }
            // Then try flattening from the start.
            while (this._stateStack.length > 0) {
                if (!(await this._flattenState(this._stateStack[0]))) {
                    break;
                }
            }
            return false;
        }
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        return this._currentState.index(indexName);
    }

    /**
     * Creates a new secondary index on the object store.
     * Currently, all secondary indices are non-unique.
     * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
     * be used to find this entry.
     * If a new object does not possess the key path associated with that index, it is simply ignored.
     *
     * This function may only be called before the database is connected.
     * Moreover, it is only executed on database version updates or on first creation.
     * @param {string} indexName The name of the index.
     * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
     * @param {boolean} [multiEntry]
     */
    createIndex(indexName, keyPath, multiEntry=false) {
        return this.__backend.createIndex(indexName, keyPath, multiEntry);
    }

    /**
     * Deletes a secondary index from the object store.
     * @param indexName
     * @returns {Promise} The promise resolves after deleting the index.
     */
    deleteIndex(indexName) {
        return this.__backend.deleteIndex(indexName);
    }

    /**
     * Creates a new transaction, ensuring read isolation
     * on the most recently successfully committed state.
     * @returns {Transaction} The transaction object.
     */
    transaction() {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        const tx = new Transaction(this, this._currentState, this);
        this._transactions.set(tx.id, tx);
        this._txBaseStates.set(tx.id, this._currentStateId);
        this._openTransactions.get(this._currentStateId).add(tx.id);
        return tx;
    }

    /**
     * An object store is strongly connected to a backend.
     * Hence, it does not store anything by itself and the _apply method is not supported.
     * @param {Transaction} tx
     * @returns {Promise.<boolean>}
     * @protected
     */
    async _apply(tx) {
        throw 'Unsupported operation';
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        if (!this.__backend.connected) throw 'JungleDB is not connected';
        const tx = this.transaction();
        await tx.truncate();
        return tx.commit();
    }

    /**
     * Closes the object store and potential connections.
     * @returns {Promise} The promise resolves after closing the object store.
     */
    close() {
        // TODO perhaps use a different strategy here
        if (this._stateStack.length > 0) {
            throw 'Cannot close database while transactions are active';
        }
        return this.__backend.close();
    }
}
/** @type {number} The maximum number of states to stack. */
ObjectStore.MAX_STACK_SIZE = 10;
ObjectStore.BACKEND_ID = 'backend';
Class.register(ObjectStore);

/**
 * This class represents a Query object.
 * Queries are constructed using the static helper methods.
 */
class Query {
    /**
     * Internal helper method that translates an operation to a KeyRange object.
     * @param {Query.OPERATORS} op The operator of the query.
     * @param {*} value The first operand of the query.
     * @param {*} [value2] The optional second operand of the query.
     * @private
     */
    static _parseKeyRange(op, value, value2) {
        switch (op) {
            case Query.OPERATORS.GT:
                return KeyRange.lowerBound(value, true);
            case Query.OPERATORS.GE:
                return KeyRange.lowerBound(value, false);
            case Query.OPERATORS.LT:
                return KeyRange.upperBound(value, true);
            case Query.OPERATORS.LE:
                return KeyRange.upperBound(value, false);
            case Query.OPERATORS.EQ:
                return KeyRange.only(value);
            case Query.OPERATORS.BETWEEN:
                return KeyRange.bound(value, value2, true, true);
            case Query.OPERATORS.WITHIN:
                return KeyRange.bound(value, value2, false, false);
        }
        throw 'Unknown operator';
    }

    /**
     * Returns the conjunction of multiple queries.
     * @param {...Query} var_args The list of queries, which all have to be fulfilled.
     * @returns {Query} The conjunction of the queries.
     */
    static and(var_args) {
        const args = Array.from(arguments);
        return new Query(args, Query.OPERATORS.AND);
    }

    /**
     * Returns the disjunction of multiple queries.
     * @param {...Query} var_args The list of queries, out of which at least one has to be fulfilled.
     * @returns {Query} The disjunction of the queries.
     */
    static or(var_args) {
        const args = Array.from(arguments);
        return new Query(args, Query.OPERATORS.OR);
    }

    /**
     * Returns a query for the max key of an index.
     * @param {string} indexName The name of the index, whose maximal key the query matches.
     * @returns {Query} The query for the max key of the index.
     */
    static max(indexName) {
        return new Query(indexName, Query.OPERATORS.MAX);
    }

    /**
     * Returns a query for the min key of an index.
     * @param {string} indexName The name of the index, whose minimal key the query matches.
     * @returns {Query} The query for the min key of the index.
     */
    static min(indexName) {
        return new Query(indexName, Query.OPERATORS.MIN);
    }

    /**
     * Returns a query that matches all keys of an index that are less than a value.
     * The query matches all keys k, such that k < val.
     * @param {string} indexName The name of the index.
     * @param {*} val The upper bound of the query.
     * @returns {Query} The resulting query object.
     */
    static lt(indexName, val) {
        return new Query(indexName, Query.OPERATORS.LT, val);
    }

    /**
     * Returns a query that matches all keys of an index that are less or equal than a value.
     * The query matches all keys k, such that k ≤ val.
     * @param {string} indexName The name of the index.
     * @param {*} val The upper bound of the query.
     * @returns {Query} The resulting query object.
     */
    static le(indexName, val) {
        return new Query(indexName, Query.OPERATORS.LE, val);
    }

    /**
     * Returns a query that matches all keys of an index that are greater than a value.
     * The query matches all keys k, such that k > val.
     * @param {string} indexName The name of the index.
     * @param {*} val The lower bound of the query.
     * @returns {Query} The resulting query object.
     */
    static gt(indexName, val) {
        return new Query(indexName, Query.OPERATORS.GT, val);
    }

    /**
     * Returns a query that matches all keys of an index that are greater or equal than a value.
     * The query matches all keys k, such that k ≥ val.
     * @param {string} indexName The name of the index.
     * @param {*} val The lower bound of the query.
     * @returns {Query} The resulting query object.
     */
    static ge(indexName, val) {
        return new Query(indexName, Query.OPERATORS.GE, val);
    }

    /**
     * Returns a query that matches all keys of an index that equal to a value.
     * The query matches all keys k, such that k = val.
     * @param {string} indexName The name of the index.
     * @param {*} val The value to look for.
     * @returns {Query} The resulting query object.
     */
    static eq(indexName, val) {
        return new Query(indexName, Query.OPERATORS.EQ, val);
    }

    /**
     * Returns a query that matches all keys of an index that are between two values, excluding the boundaries.
     * The query matches all keys k, such that lower < k < upper.
     * @param {string} indexName The name of the index.
     * @param {*} lower The lower bound.
     * @param {*} upper The upper bound.
     * @returns {Query} The resulting query object.
     */
    static between(indexName, lower, upper) {
        return new Query(indexName, Query.OPERATORS.BETWEEN, lower, upper);
    }

    /**
     * Returns a query that matches all keys of an index that are between two values, including the boundaries.
     * The query matches all keys k, such that lower ≤ k ≤ upper.
     * @param {string} indexName The name of the index.
     * @param {*} lower The lower bound.
     * @param {*} upper The upper bound.
     * @returns {Query} The resulting query object.
     */
    static within(indexName, lower, upper) {
        return new Query(indexName, Query.OPERATORS.WITHIN, lower, upper);
    }

    /**
     * Internal constructor for a query.
     * Should not be called directly.
     * @param {string|Array.<Query>} arg Either a list of queries or an index name (depending on the operator).
     * @param {Query.OPERATORS} op The operator to apply.
     * @param {*} [value] The first operand if applicable.
     * @param {*} [value2] The second operand if applicable.
     * @private
     */
    constructor(arg, op, value, value2) {
        // If first argument is an array of queries, this is a combined query.
        if (Array.isArray(arg)) {
            if (arg.some(it => !(it instanceof Query))) {
                throw 'Invalid query';
            }
            if (Query.COMBINED_OPERATORS.indexOf(op) < 0) {
                throw 'Unknown operator';
            }
            this._queryType = Query.Type.COMBINED;
            this._queries = arg;
            this._op = op;
        }
        // Otherwise we have a single query.
        else {
            if (Query.RANGE_OPERATORS.indexOf(op) >= 0) {
                this._queryType = Query.Type.RANGE;
                this._keyRange = Query._parseKeyRange(op, value, value2);
            } else if (Query.ADVANCED_OPERATORS.indexOf(op) >= 0) {
                this._queryType = Query.Type.ADVANCED;
                this._op = op;
            } else {
                throw 'Unknown operator';
            }
            this._indexName = arg;
        }
    }

    /**
     * Returns a promise of an array of objects fulfilling this query.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to this query.
     */
    async values(objectStore) {
        const keys = await this._execute(objectStore);
        const resultPromises = [];
        for (const key of keys) {
            resultPromises.push(objectStore.get(key));
        }
        return Promise.all(resultPromises);
    }

    /**
     * Returns a promise of a set of keys fulfilling this query.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     */
    keys(objectStore) {
        return this._execute(objectStore);
    }

    /**
     * Internal method to execute a query on an object store.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _execute(objectStore) {
        switch (this._queryType) {
            case Query.Type.COMBINED:
                return Promise.resolve(this._executeCombined(objectStore));

            case Query.Type.ADVANCED:
                return Promise.resolve(this._executeAdvanced(objectStore));

            case Query.Type.RANGE:
                return this._executeRange(objectStore);
        }
        return Promise.resolve(new Set());
    }

    /**
     * Internal method for and/or operators.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _executeCombined(objectStore) {
        // Evaluate children.
        const resultPromises = [];
        for (const query of this._queries) {
            resultPromises.push(query._execute(objectStore));
        }
        const results = await Promise.all(resultPromises);

        if (this._op === Query.OPERATORS.AND) {
            // Provide shortcuts.
            if (results.length === 0) {
                return new Set();
            } else if (results.length === 1) {
                return results[0];
            }

            // Set intersection of all keys.
            const firstResult = results.shift();
            const intersection = new Set();
            for (const val of firstResult) {
                if (results.every(result => result.has(val))) {
                    intersection.add(val);
                }
            }
            return intersection;
        } else if (this._op === Query.OPERATORS.OR) {
            // Set union of all keys.
            const union = new Set();
            for (const result of results) {
                result.forEach(val => union.add(val));
            }
            return union;
        }
        return new Set();
    }

    /**
     * Internal method for min/max operators.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _executeAdvanced(objectStore) {
        const index = objectStore.index(this._indexName);
        let results = new Set();
        switch (this._op) {
            case Query.OPERATORS.MAX:
                results = await index.maxKeys();
                break;
            case Query.OPERATORS.MIN:
                results = await index.minKeys();
                break;
        }
        return new Set(results);
    }

    /**
     * Internal method for range operators.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _executeRange(objectStore) {
        const index = objectStore.index(this._indexName);
        return new Set(await index.keys(this._keyRange));
    }
}
/**
 * Enum for supported operators.
 * @enum {number}
 */
Query.OPERATORS = {
    GT: 0,
    GE: 1,
    LT: 2,
    LE: 3,
    EQ: 4,
    // NEQ: 5, not supported
    BETWEEN: 7,
    WITHIN: 8,
    MAX: 9,
    MIN: 10,
    AND: 11,
    OR: 12
};
Query.RANGE_OPERATORS = [
    Query.OPERATORS.GT,
    Query.OPERATORS.GE,
    Query.OPERATORS.LT,
    Query.OPERATORS.LE,
    Query.OPERATORS.EQ,
    Query.OPERATORS.BETWEEN,
    Query.OPERATORS.WITHIN
];
Query.ADVANCED_OPERATORS = [Query.OPERATORS.MAX, Query.OPERATORS.MIN];
Query.COMBINED_OPERATORS = [Query.OPERATORS.AND, Query.OPERATORS.OR];
/**
 * Enum for query types.
 * Each operator belongs to one of these types as specified above.
 * @enum {number}
 */
Query.Type = {
    RANGE: 0,
    ADVANCED: 1,
    COMBINED: 2
};
Class.register(Query);


/**
 * This class constitutes an InMemoryIndex for Transactions.
 * It unifies the results of keys changed during the transaction
 * with the underlying backend.
 */
class TransactionIndex extends InMemoryIndex {
    /**
     * Derives the indices from the backend and returns a new map of transactions.
     * @param {Transaction} objectStore The transaction the index should be based on.
     * @param {IObjectStore} backend The backend underlying the transaction.
     * @returns {Map.<string,TransactionIndex>} A map containing all indices for the transaction.
     */
    static derive(objectStore, backend) {
        const indices = new Map();
        for (const [name, index] of backend.indices) {
            indices.set(name, new TransactionIndex(objectStore, backend, name, index.keyPath, index.multiEntry));
        }
        return indices;
    }

    /** @type {IIndex} The index of the underlying backend. */
    get _index() {
        return this._backend.index(this._databaseDir);
    }

    /**
     * Constructs a new TransactionIndex serving the transaction's changes
     * and unifying the results with the underlying backend.
     * @param {Transaction} objectStore The transaction the index should be based on.
     * @param {IObjectStore} backend The backend underlying the transaction.
     * @param {string|Array.<string>} keyPath The key path of the indexed attribute.
     * @param {boolean} multiEntry Whether the indexed attribute is considered to be iterable or not.
     * @protected
     */
    constructor(objectStore, backend, name, keyPath, multiEntry=false) {
        super(objectStore, keyPath, multiEntry);
        this._backend = backend;
        this._databaseDir = name;
    }

    /**
     * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
     * If the optional query is not given, it returns all primary keys in the index.
     * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
     * @param {KeyRange} [query] Optional query to check the secondary keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
     */
    async keys(query=null) {
        const promises = [];
        promises.push(this._index.keys(query));
        promises.push(InMemoryIndex.prototype.keys.call(this, query));
        let [keys, newKeys] = await Promise.all(promises);
        // Remove keys that have been deleted or modified.
        keys = keys.difference(this._objectStore._removed);
        keys = keys.difference(this._objectStore._modified.keys());
        return keys.union(newKeys);
    }

    /**
     * Returns a promise of an array of objects whose secondary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the index.
     * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
     * @param {KeyRange} [query] Optional query to check secondary keys against.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null) {
        const keys = await this.keys(query);
        return super._retrieveValues(keys);
    }

    /**
     * Returns a promise of an array of objects whose secondary key is maximal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async maxValues(query=null) {
        const keys = await this.maxKeys(query);
        return super._retrieveValues(keys);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async maxKeys(query=null) {
        let backendKeys = await this._index.maxKeys(query);

        // Remove keys that have been deleted or modified.
        let sampleElement = Set.sampleElement(backendKeys);
        const value = await this._backend.get(sampleElement);
        let maxIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
        backendKeys = backendKeys.difference(this._objectStore._removed);
        backendKeys = backendKeys.difference(this._objectStore._modified.keys());

        while (sampleElement !== undefined && backendKeys.size === 0) {
            const tmpQuery = KeyRange.upperBound(maxIKey, true);
            backendKeys = await this._index.maxKeys(tmpQuery);

            // Remove keys that have been deleted or modified.
            sampleElement = Set.sampleElement(backendKeys);
            const value = await this._backend.get(sampleElement);
            maxIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
            backendKeys = backendKeys.difference(this._objectStore._removed);
            backendKeys = backendKeys.difference(this._objectStore._modified.keys());

            // If we get out of the range, stop here.
            if (maxIKey && query !== null && !query.includes(maxIKey)) {
                backendKeys = new Set();
                break;
            }
        }

        const newKeys = await InMemoryIndex.prototype.maxKeys.call(this, query);

        if (backendKeys.size === 0) {
            return newKeys;
        } else if (newKeys.size === 0) {
            return backendKeys;
        }

        // Both contain elements, check which one is larger.
        const valueTx = await this._objectStore.get(Set.sampleElement(newKeys));

        const iKeyBackend = maxIKey;
        const iKeyTx = ObjectUtils.byKeyPath(valueTx, this.keyPath);

        if (iKeyBackend > iKeyTx) {
            return backendKeys;
        } else if (iKeyBackend < iKeyTx) {
            return newKeys;
        }
        return backendKeys.union(newKeys);
    }

    /**
     * Returns a promise of an array of objects whose secondary key is minimal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async minValues(query=null) {
        const keys = await this.minKeys(query);
        return super._retrieveValues(keys);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async minKeys(query=null) {
        let backendKeys = await this._index.minKeys(query);

        // Remove keys that have been deleted or modified.
        let sampleElement = Set.sampleElement(backendKeys);
        const value = await this._backend.get(sampleElement);
        let minIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
        backendKeys = backendKeys.difference(this._objectStore._removed);
        backendKeys = backendKeys.difference(this._objectStore._modified.keys());

        while (sampleElement !== undefined && backendKeys.size === 0) {
            const tmpQuery = KeyRange.lowerBound(minIKey, true);
            backendKeys = await this._index.minKeys(tmpQuery);

            // Remove keys that have been deleted or modified.
            sampleElement = Set.sampleElement(backendKeys);
            const value = await this._backend.get(sampleElement);
            minIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
            backendKeys = backendKeys.difference(this._objectStore._removed);
            backendKeys = backendKeys.difference(this._objectStore._modified.keys());

            // If we get out of the range, stop here.
            if (minIKey && query !== null && !query.includes(minIKey)) {
                backendKeys = new Set();
                break;
            }
        }

        const newKeys = await InMemoryIndex.prototype.minKeys.call(this, query);

        if (backendKeys.size === 0) {
            return newKeys;
        } else if (newKeys.size === 0) {
            return backendKeys;
        }

        // Both contain elements, check which one is larger.
        const valueTx = await this._objectStore.get(Set.sampleElement(newKeys));

        const iKeyBackend = minIKey;
        const iKeyTx = ObjectUtils.byKeyPath(valueTx, this.keyPath);

        if (iKeyBackend < iKeyTx) {
            return backendKeys;
        } else if (iKeyBackend > iKeyTx) {
            return newKeys;
        }
        return backendKeys.union(newKeys);
    }

    /**
     * Returns the count of entries, whose secondary key is in the given range.
     * If the optional query is not given, it returns the count of entries in the index.
     * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        // Unfortunately, we cannot do better than getting keys + counting.
        return (await this.keys(query)).size;
    }
}
Class.register(TransactionIndex);

/**
 * Transactions are created by calling the transaction method on an ObjectStore object.
 * Transactions ensure read-isolation.
 * On a given state, only *one* transaction can be committed successfully.
 * Other transactions based on the same state will end up in a conflicted state if committed.
 * Transactions opened after the successful commit of another transaction will be based on the
 * new state and hence can be committed again.
 * @implements {IObjectStore}
 * @implements {ICommittable}
 */
class Transaction {
    /**
     * This constructor should only be called by an ObjectStore object.
     * Our transactions have a watchdog enabled by default,
     * aborting them after a certain time specified by WATCHDOG_TIMER.
     * This helps to detect unclosed transactions preventing to store the state in
     * the persistent backend.
     * @param {ObjectStore} objectStore The object store this transaction belongs to.
     * @param {IObjectStore} backend The backend on which the transaction is based,
     * i.e., another transaction or the real database.
     * @param {ICommittable} [commitBackend] The object store managing the transactions,
     * i.e., the ObjectStore object.
     * @param {boolean} [enableWatchdog] If this is is set to true (default),
     * transactions will be automatically aborted if left open for longer than WATCHDOG_TIMER.
     * @protected
     */
    constructor(objectStore, backend, commitBackend, enableWatchdog=true) {
        this._id = Transaction._instanceCount++;
        this._objectStore = objectStore;
        this.__backend = backend;
        /** @type {ICommittable} */
        this._commitBackend = commitBackend || backend;
        this._modified = new Map();
        this._removed = new Set();
        this._originalValues = new Map();
        this._truncated = false;
        this._indices = TransactionIndex.derive(this, backend);

        this._state = Transaction.STATE.OPEN;

        // Keep track of nested transactions.
        /** @type {Set.<Transaction>} */
        this._nested = new Set();
        this._nestedCommitted = false;

        // Handle dependencies due to cross-objectstore transactions.
        /** @type {CombinedTransaction} */
        this._dependency = null;

        this._enableWatchdog = enableWatchdog;
        if (this._enableWatchdog) {
            this._watchdog = setTimeout(() => {
                this.abort();
                console.error('Watchdog timer aborted transaction', this);
            }, Transaction.WATCHDOG_TIMER);
        }
    }

    /** @type {ObjectStore} */
    get objectStore() {
        return this._objectStore;
    }

    /** @type {boolean} */
    get nested() {
        return this._commitBackend instanceof Transaction;
    }

    /**
     * @type {CombinedTransaction} If existent, a combined transaction encompassing this object.
     */
    get dependency() {
        return this._dependency;
    }

    /** @type {boolean} */
    get connected() {
        return this._commitBackend.connected;
    }

    /** @type {number} A unique transaction id. */
    get id() {
        return this._id;
    }

    /**
     * A map of index names to indices.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        return this._indices;
    }

    /**
     * The transaction's current state.
     * @returns {Transaction.STATE}
     */
    get state() {
        return this._state;
    }

    /**
     * Internally applies a transaction to the transaction's state.
     * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
     * or no changes are applied.
     * @param {Transaction} tx The transaction to apply.
     * @returns {Promise} The promise resolves after applying the transaction.
     * @protected
     */
    async _apply(tx) {
        if (!(tx instanceof Transaction)) {
            throw 'Can only apply transactions';
        }
        if (tx._truncated) {
            await this.truncate();
        }
        for (const [key, value] of tx._modified) {
            // If this transaction has key in its originalValues, we use it.
            // Otherwise, the original value has to coincide with the transaction's stored original value.
            let oldValue;
            if (this._originalValues.has(key)) {
                oldValue = this._originalValues.get(key);
            } else {
                oldValue = tx._originalValues.get(key);
                this._originalValues.set(key, oldValue);
            }

            this._put(key, value, oldValue);
        }
        for (const key of tx._removed) {
            // If this transaction has key in its originalValues, we use it.
            // Otherwise, the original value has to coincide with the transaction's stored original value.
            let oldValue;
            if (this._originalValues.has(key)) {
                oldValue = this._originalValues.get(key);
            } else {
                oldValue = tx._originalValues.get(key);
                this._originalValues.set(key, oldValue);
            }

            this._remove(key, oldValue);
        }
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        this._truncated = true;
        this._modified.clear();
        this._removed.clear();
        this._originalValues.clear();

        // Update indices.
        for (const index of this._indices.values()) {
            index.truncate();
        }
    }

    /**
     * Commits a transaction to the underlying backend.
     * The state is only written to the persistent backend if no other transaction is open.
     * If the commit was successful, new transactions will always be based on the new state.
     * There are two outcomes for a commit:
     * If there was no other transaction committed that was based on the same state,
     * it will be successful and change the transaction's state to COMMITTED (returning true).
     * Otherwise, the state will be CONFLICTED and the method will return false.
     * @param {Transaction} [tx] The transaction to be applied, only used internally.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async commit(tx) {
        // Transaction is given, so check whether this is a nested one.
        if (tx !== undefined) {
            if (!this._isCommittable(tx)) {
                await this.abort(tx);
                return false;
            }
            await this._commit(tx);
            return true;
        }

        if (this._state !== Transaction.STATE.OPEN) {
            throw 'Transaction already closed or in nested state';
        }
        if (this._enableWatchdog) {
            clearTimeout(this._watchdog);
        }
        if (await this._commitBackend.commit(this)) {
            this._state = Transaction.STATE.COMMITTED;
            return true;
        } else {
            this._state = Transaction.STATE.CONFLICTED;
            return false;
        }
    }

    /**
     * Is used to probe whether a transaction can be committed.
     * This, for example, includes a check whether another transaction has already been committed.
     * @protected
     * @param {Transaction} [tx] The transaction to be applied, if not given checks for the this transaction.
     * @returns {boolean} Whether a commit will be successful.
     */
    _isCommittable(tx) {
        if (tx !== undefined) {
            // Make sure transaction is based on this transaction.
            if (!this._nested.has(tx) || tx.state !== Transaction.STATE.OPEN) {
                throw 'Can only commit open, nested transactions';
            }
            return !this._nestedCommitted;
        }
        return this._commitBackend._isCommittable(this);
    }

    /**
     * Is used to commit the transaction to the in memory state.
     * @protected
     * @param {Transaction} tx The transaction to be applied.
     * @returns {Promise} A promise that resolves upon successful application of the transaction.
     */
    async _commit(tx) {
        this._nested.delete(tx);
        // Apply nested transaction.
        this._nestedCommitted = true;
        await this._apply(tx);
        // If there are no more nested transactions, change back to OPEN state.
        if (this._nested.size === 0) {
            this._state = Transaction.STATE.OPEN;
            this._nestedCommitted = false;
        }
    }

    /**
     * Allows to change the backend of a Transaction when the state has been flushed.
     * @param backend
     * @protected
     */
    set _backend(backend) {
        this.__backend = backend;
    }

    /**
     * Aborts a transaction and (if this was the last open transaction) potentially
     * persists the most recent, committed state.
     * @param {Transaction} [tx] The transaction to be applied, only used internally.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async abort(tx) {
        // Transaction is given, so check whether this is a nested one.
        if (tx !== undefined) {
            // Make sure transaction is based on this transaction.
            if (!this._nested.has(tx) || tx.state !== Transaction.STATE.OPEN) {
                throw 'Can only commit open, nested transactions';
            }
            this._nested.delete(tx);
            // If there are no more nested transactions, change back to OPEN state.
            if (this._nested.size === 0) {
                this._state = Transaction.STATE.OPEN;
                this._nestedCommitted = false;
            }
            return true;
        }

        if (this._state !== Transaction.STATE.OPEN && this._state !== Transaction.STATE.NESTED) {
            throw 'Transaction already closed';
        }
        if (this._state === Transaction.STATE.NESTED) {
            await Promise.all(Array.from(this._nested).map(tx => tx.abort()));
        }
        if (this._enableWatchdog) {
            clearTimeout(this._watchdog);
        }
        await this._commitBackend.abort(this);
        this._state = Transaction.STATE.ABORTED;
        return true;
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    async get(key) {
        // Order is as follows:
        // 1. check if removed,
        // 2. check if modified,
        // 3. check if truncated
        // 4. request from backend
        if (this._removed.has(key)) {
            return undefined;
        }
        if (this._modified.has(key)) {
            return this._modified.get(key);
        }
        if (this._truncated) {
            return undefined;
        }
        return await this.__backend.get(key);
    }

    /**
     * Inserts or replaces a key-value pair.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async put(key, value) {
        if (this._state !== Transaction.STATE.OPEN) {
            throw 'Transaction already closed';
        }

        const oldValue = await this.get(key);

        // Save for indices.
        if (!this._originalValues.has(key)) {
            this._originalValues.set(key, oldValue);
        }

        this._put(key, value, oldValue);
    }

    /**
     * Internal method for inserting/replacing a key-value pair.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @param {*} [oldValue] The old value associated with the key to update the indices (if applicable).
     * @private
     */
    _put(key, value, oldValue) {
        this._removed.delete(key);
        this._modified.set(key, value);

        // Update indices.
        for (const index of this._indices.values()) {
            index.put(key, value, oldValue);
        }
    }

    /**
     * Removes the key-value pair of the given key from the object store.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async remove(key) {
        if (this._state !== Transaction.STATE.OPEN) {
            throw 'Transaction already closed';
        }

        const oldValue = await this.get(key);
        // Only remove if it exists.
        if (oldValue !== undefined) {
            // Save for indices.
            if (!this._originalValues.has(key)) {
                this._originalValues.set(key, oldValue);
            }

            this._remove(key, oldValue);
        }
    }

    /**
     * Internal method for removing a key-value pair.
     * @param {string} key The primary key to delete along with the associated object.
     * @param {*} oldValue The old value associated with the key to update the indices.
     */
    _remove(key, oldValue) {
        this._removed.add(key);
        this._modified.delete(key);

        // Update indices.
        for (const index of this._indices.values()) {
            index.remove(key, oldValue);
        }
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    async keys(query=null) {
        if (query !== null && query instanceof Query) {
            return query.keys(this);
        }
        let keys = new Set();
        if (!this._truncated) {
            keys = await this.__backend.keys(query);
        }
        keys = keys.difference(this._removed);
        for (const key of this._modified.keys()) {
            if (query === null || query.includes(key)) {
                keys.add(key);
            }
        }
        return keys;
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null) {
        if (query !== null && query instanceof Query) {
            return query.values(this);
        }
        const keys = await this.keys(query);
        const valuePromises = [];
        for (const key of keys) {
            valuePromises.push(this.get(key));
        }
        return Promise.all(valuePromises);
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async maxValue(query=null) {
        const maxKey = await this.maxKey(query);
        return this.get(maxKey);
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async maxKey(query=null) {
        // Take underlying maxKey.
        let maxKey = undefined;
        if (!this._truncated) {
            maxKey = await this.__backend.maxKey(query);
        }

        // If this key has been removed, find next best key.
        while (maxKey !== undefined && this._removed.has(maxKey)) {
            const tmpQuery = KeyRange.upperBound(maxKey, true);
            maxKey = await this.__backend.maxKey(tmpQuery);

            // If we get out of the range, stop here.
            if (query !== null && !query.includes(maxKey)) {
                maxKey = undefined;
                break;
            }
        }

        for (const key of this._modified.keys()) {
            // Find better maxKey in modified data.
            if ((query === null || query.includes(key)) && (maxKey === undefined || key > maxKey)) {
                maxKey = key;
            }
        }
        return maxKey;
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async minValue(query=null) {
        const minKey = await this.minKey(query);
        return this.get(minKey);
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async minKey(query=null) {
        // Take underlying minKey.
        let minKey = undefined;
        if (!this._truncated) {
            minKey = await this.__backend.minKey(query);
        }

        // If this key has been removed, find next best key.
        while (minKey !== undefined && this._removed.has(minKey)) {
            const tmpQuery = KeyRange.lowerBound(minKey, true);
            minKey = await this.__backend.minKey(tmpQuery);

            // If we get out of the range, stop here.
            if (query !== null && !query.includes(minKey)) {
                minKey = undefined;
                break;
            }
        }

        for (const key of this._modified.keys()) {
            // Find better maxKey in modified data.
            if ((query === null || query.includes(key)) && (minKey === undefined || key < minKey)) {
                minKey = key;
            }
        }
        return minKey;
    }


    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        // Unfortunately, we cannot do better than getting keys + counting.
        return (await this.keys(query)).size;
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        return this._indices.get(indexName);
    }

    /**
     * This method is not implemented for transactions.
     */
    createIndex() {
        throw 'Cannot create index in transaction';
    }

    /**
     * This method is not implemented for transactions.
     */
    async deleteIndex() {
        throw 'Cannot delete index in transaction';
    }

    /**
     * Alias for abort.
     * @returns {Promise} The promise resolves after successful abortion of the transaction.
     */
    close() {
        return this.abort();
    }

    /**
     * Creates a nested transaction, ensuring read isolation.
     * This makes the current transaction read-only until all sub-transactions have been closed (committed/aborted).
     * The same semantic for commits applies: Only the first transaction that commits will be applied. Subsequent transactions will be conflicted.
     * This behaviour has one exception: If all nested transactions are closed, the outer transaction returns to a normal state and new nested transactions can again be created and committed.
     * @returns {Transaction} The transaction object.
     */
    transaction() {
        if (this._state !== Transaction.STATE.OPEN && this._state !== Transaction.STATE.NESTED) {
            throw 'Transaction already closed';
        }
        const tx = new Transaction(this._objectStore, this, this, this._enableWatchdog);
        this._nested.add(tx);
        this._state = Transaction.STATE.NESTED;
        return tx;
    }

    toString() {
        return `${this._id}`;
    }
}
/** @type {number} Milliseconds to wait until automatically aborting transaction. */
Transaction.WATCHDOG_TIMER = 10000 /*ms*/;
/**
 * The states of a transaction.
 * New transactions are in the state OPEN until they are aborted, committed or a nested transaction is created.
 * Aborted transactions move to the state ABORTED.
 * Committed transactions move to the state COMMITTED,
 * if no other transaction has been applied to the same state.
 * Otherwise, they change their state to CONFLICTED.
 * When creating a nested (not read-isolated) transaction on top of a transaction,
 * the outer transaction moves to the state NESTED until the inner transaction is either aborted or committed.
 * Again, only one inner transaction may be committed.
 * @enum {number}
 */
Transaction.STATE = {
    OPEN: 0,
    COMMITTED: 1,
    ABORTED: 2,
    CONFLICTED: 3,
    NESTED: 4
};
Transaction._instanceCount = 0;
Class.register(Transaction);

/**
 * This class represents a combined transaction across object stores.
 * @implements {ICommittable}
 */
class CombinedTransaction {
    /**
     * @param {...Transaction} transactions The transactions to build the combined transaction from.
     */
    constructor(...transactions) {
        if (!this.isConsistent(transactions)) {
            throw 'Given set of transactions violates rules for combined transactions';
        }
        this._transactions = transactions;
        /** @type {Map.<Transaction,function()>} */
        this._flushable = new Map();

        // Update members.
        this._dependency = this;
    }

    /** @type {JungleDB} */
    get backend() {
        return this._jdb;
    }

    /** @type {Array.<Transaction>} */
    get transactions() {
        return this._transactions;
    }

    /**
     * Verifies the two most important consistency rules for combined transactions:
     * 1. only transactions from different object stores
     * 2. only open transactions
     * 3. only transactions from the same JungleDB instance
     * 4. only non-nested transactions
     * @param {Array.<Transaction>} transactions
     * @returns {boolean} Whether the given set of transactions is suitable for a combined transaction.
     */
    isConsistent(transactions) {
        const objectStores = new Set();
        this._jdb = null;
        for (const tx of transactions) {
            // Rule 2 is violated:
            if (tx.state !== Transaction.STATE.OPEN) {
                return false;
            }
            // Rule 4 is violated:
            if (tx.nested) {
                return false;
            }
            // Rule 1 is violated:
            if (objectStores.has(tx._objectStore)) {
                return false;
            }
            // Rule 3 is violated:
            if (this._jdb === null) {
                this._jdb = tx._objectStore.jungleDB;
            } else if (this._jdb !== tx._objectStore.jungleDB && tx._objectStore.jungleDB !== null) { // null = InMemory
                return false;
            }
            objectStores.add(tx._objectStore);
        }
        return true;
    }

    /**
     * To be called when a transaction is flushable to the persistent state.
     * Triggers combined flush as soon as all transactions are ready.
     * @param {Transaction} tx Transaction to be reported flushable.
     * @param {function()} callback A callback to be called after the transaction is flushed.
     * @returns {Promise.<boolean>} Whether the flushing has been triggered.
     */
    async onFlushable(tx, callback=null) {
        // Save as flushable and prepare and flush only if all are flushable.
        // Afterwards call the callbacks to cleanup the ObjectStores' transaction stacks.
        this._flushable.set(tx, callback);

        // All are flushable, so go ahead.
        if (this._transactions.every(tx => this._flushable.has(tx))) {
            await JungleDB.commitCombined(this);
            for (const value of this._flushable.values()) {
                value();
            }
            return true;
        }
        return false;
    }

    /**
     * Is used to commit the state of an open transaction.
     * A user only needs to call this method on Transactions without arguments.
     * The optional tx argument is only used internally, in order to commit a transaction to the underlying store.
     * If the commit was successful, the method returns true, and false otherwise.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async commit() {
        if (this._isCommittable()) {
            await this._commit();
            return true;
        }
        await this.abort();
        return false;
    }

    /**
     * Is used to abort an open transaction.
     * A user only needs to call this method on Transactions without arguments.
     * The optional tx argument is only used internally, in order to abort a transaction on the underlying store.
     * @returns {Promise} The promise resolves after successful abortion of the transaction.
     */
    async abort() {
        return Promise.all(this._transactions.map(tx => tx.abort()));
    }

    /**
     * Creates a new transaction, ensuring read isolation
     * on the most recently successfully committed state.
     * @returns {Transaction} The transaction object.
     */
    transaction() {
        throw 'Unsupported operation';
    }

    /**
     * Is used to probe whether a transaction can be committed.
     * This, for example, includes a check whether another transaction has already been committed.
     * @protected
     * @returns {boolean} Whether a commit will be successful.
     */
    _isCommittable() {
        return this._transactions.every(tx => tx._isCommittable());
    }

    /**
     * Is used to commit the transaction.
     * @protected
     * @returns {Promise} A promise that resolves upon successful application of the transaction.
     */
    async _commit() {
        return Promise.all(this._transactions.map(tx => tx.commit()));
    }

    /**
     * Allows to change the backend of a Transaction when the state has been flushed.
     * @param backend
     * @protected
     */
    set _backend(backend) {
        throw 'Unsupported operation';
    }

    /**
     * Sets a new CombinedTransaction as dependency.
     * @param {CombinedTransaction} dependency
     * @protected
     */
    set _dependency(dependency) {
        for (const tx of this._transactions) {
            tx._dependency = dependency;
        }
    }

    /**
     * @type {CombinedTransaction} If existent, a combined transaction encompassing this object.
     */
    get dependency() {
        return this;
    }

    /**
     * Returns the object store this transaction belongs to.
     * @type {ObjectStore}
     */
    get objectStore() {
        throw 'Unsupported operation';
    }
}
Class.register(CombinedTransaction);

    exports._loaded = true;
    if (typeof exports._onload === 'function') exports._onload();
    return exports;
})(JDB);



if (typeof Nimiq === 'undefined') {
    var Nimiq = typeof window !== 'undefined' ? window : {};
}
var Proxy; // ensure Proxy exists
(function (exports) {
    exports = typeof exports !== 'undefined' ? exports : {};

class Class {
    static register(cls) {
        if (typeof exports !== 'undefined') exports[cls.name] = cls;
    }
}
Class.register(Class);

class LogNative {
    constructor() {
        this._global_level = Log.TRACE;
        this._tag_levels = {};
        try {
            if (window.localStorage) {
                try {
                    let c = window.localStorage.getItem('log_tag_levels');
                    if (c && typeof c === 'string') c = JSON.parse(c);
                    if (c && typeof c === 'object') this._tag_levels = c;
                } catch (e) {
                    console.warn('Failed to load log configuration from local storage.');
                }
            }
        } catch (e) {
            // ignore
        }
    }

    isLoggable(tag, level) {
        if (tag && this._tag_levels[tag]) {
            return this._tag_levels[tag] <= level;
        }
        if (this._tag_levels['*']) {
            return this._tag_levels['*'] <= level;
        }
        return this._global_level <= level;
    }

    setLoggable(tag, level) {
        if (tag && tag.name) tag = tag.name;
        this._tag_levels[tag] = level;
        if (window.localStorage) {
            window.localStorage.setItem('log_tag_levels', JSON.stringify(this._tag_levels));
        }
    }

    msg(level, tag, args) {
        if (tag && tag.name) tag = tag.name;
        if (!this.isLoggable(tag, level)) return;
        if (tag) args.unshift(tag + ':');
        args.unshift(`[${Log.Level.toStringTag(level)} ${new Date().toTimeString().substr(0, 8)}]`);
        if (console.error && level >= Log.ERROR) {
            console.error.apply(console, args);
        } else if (console.warn && level >= Log.WARNING) {
            console.warn.apply(console, args);
        } else if (console.info && level >= Log.INFO) {
            console.info.apply(console, args);
        } else if (console.debug && level >= Log.DEBUG) {
            console.debug.apply(console, args);
        } else if (console.trace && level <= Log.TRACE) {
            console.trace.apply(console, args);
        } else {
            console.log.apply(console, args);
        }
    }
}
Class.register(LogNative);

class Log {
    /**
     * @returns {Log}
     */
    static get instance() {
        if (!Log._instance) {
            Log._instance = new Log(new LogNative());
        }
        return Log._instance;
    }

    /**
     * @param {LogNative} native
     */
    constructor(native) {
        /** @type {LogNative} */
        this._native = native;
    }

    /**
     * @param {string} tag
     * @param {Log.Level} level
     */
    setLoggable(tag, level) {
        this._native.setLoggable(tag, level);
    }

    /** @type {Log.Level} */
    get level() {
        return this._native._global_level;
    }

    /** @type {Log.Level} */
    set level(l) {
        this._native._global_level = l;
    }

    /**
     * @param {Log.Level} level
     * @param {string|{name:string}} tag
     * @param {Array} args
     */
    msg(level, tag, args) {
        this._native.msg(level, tag, args);
    }

    /**
     * @param {?string|{name:string}} [tag=undefined]
     * @param {string} message
     * @param {...*} args
     */
    static d(tag, message, ...args) {
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.DEBUG, tag, args);
    }

    /**
     * @param {?string|{name:string}} [tag=undefined]
     * @param {string} message
     * @param {...*} args
     */
    static e(tag, message, ...args) {
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.ERROR, tag, args);
    }

    /**
     * @param {?string|{name:string}} [tag=undefined]
     * @param {string} message
     * @param {...*} args
     */
    static i(tag, message, ...args) {
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.INFO, tag, args);
    }

    /**
     * @param {?string|{name:string}} [tag=undefined]
     * @param {string} message
     * @param {...*} args
     */
    static v(tag, message, ...args) {
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.VERBOSE, tag, args);
    }

    /**
     * @param {?string|{name:string}} [tag=undefined]
     * @param {string} message
     * @param {...*} args
     */
    static w(tag, message, ...args) {
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.WARNING, tag, args);
    }

    /**
     * @param {?string|{name:string}} [tag=undefined]
     * @param {string} message
     * @param {...*} args
     */
    static t(tag, message, ...args) {
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.TRACE, tag, args);
    }
}
/**
 * @enum {number}
 */
Log.Level = {
    TRACE: 1,
    VERBOSE: 2,
    DEBUG: 3,
    INFO: 4,
    WARNING: 5,
    ERROR: 6,
    ASSERT: 7,

    /**
     * @param {Log.Level} level
     */
    toStringTag: function (level) {
        switch (level) {
            case Log.TRACE:
                return 'T';
            case Log.VERBOSE:
                return 'V';
            case Log.DEBUG:
                return 'D';
            case Log.INFO:
                return 'I';
            case Log.WARNING:
                return 'W';
            case Log.ERROR:
                return 'E';
            case Log.ASSERT:
                return 'A';
            default:
                return '*';
        }
    }
};
Log.TRACE = Log.Level.TRACE;
Log.VERBOSE = Log.Level.VERBOSE;
Log.DEBUG = Log.Level.DEBUG;
Log.INFO = Log.Level.INFO;
Log.WARNING = Log.Level.WARNING;
Log.ERROR = Log.Level.ERROR;
Log.ASSERT = Log.Level.ASSERT;
Log._instance = null;
Class.register(Log);

class Observable {
    /**
     * @returns {string}
     * @constant
     */
    static get WILDCARD() {
        return '*';
    }

    constructor() {
        /** @type {Map.<string, Array.<Function>>} */
        this._listeners = new Map();
    }

    /**
     * @param {string} type
     * @param {Function} callback
     * @return {number}
     */
    on(type, callback) {
        if (!this._listeners.has(type)) {
            this._listeners.set(type, [callback]);
            return 0;
        } else {
            return this._listeners.get(type).push(callback) - 1;
        }
    }

    /**
     * @param {string} type
     * @param {number} id
     */
    off(type, id) {
        if (!this._listeners.has(type) || !this._listeners.get(type)[id]) return;
        delete this._listeners.get(type)[id];
    }

    /**
     * @param {string} type
     * @param {...*} args
     */
    fire(type, ...args) {
        // Notify listeners for this event type.
        if (this._listeners.has(type)) {
            for (const i in this._listeners.get(type)) {
                const listener = this._listeners.get(type)[i];
                listener.apply(null, args);
            }
        }

        // Notify wildcard listeners. Pass event type as first argument
        if (this._listeners.has(Observable.WILDCARD)) {
            for (const i in this._listeners.get(Observable.WILDCARD)) {
                const listener = this._listeners.get(Observable.WILDCARD)[i];
                listener.apply(null, arguments);
            }
        }
    }

    /**
     * @param {Observable} observable
     * @param {...string} types
     */
    bubble(observable, ...types) {
        for (const type of types) {
            let callback;
            if (type == Observable.WILDCARD) {
                callback = function() {
                    this.fire.apply(this, arguments);
                };
            } else {
                callback = function() {
                    this.fire.apply(this, [type, ...arguments]);
                };
            }
            observable.on(type, callback.bind(this));
        }
    }
}
Class.register(Observable);

class BaseTypedDB {
    static get db() {
        if (BaseTypedDB._db) return Promise.resolve(BaseTypedDB._db);

        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
        const dbVersion = 4;
        const request = indexedDB.open('nimiq', dbVersion);

        return new Promise((resolve, error) => {
            request.onsuccess = () => {
                BaseTypedDB._db = request.result;
                resolve(request.result);
            };

            request.onupgradeneeded = event => {
                const db = event.target.result;

                // XXX For testing, delete local blockchain copy on upgrade.
                // TODO remove for production!!!
                try {
                    db.deleteObjectStore('accounts');
                } catch (e) {
                    // Thrown if the object store doesn't exist, ignore
                }
                try {
                    db.deleteObjectStore('blocks');
                } catch (e) {
                    // Thrown if the object store doesn't exist, ignore
                }

                db.createObjectStore('accounts');
                db.createObjectStore('blocks');

                try {
                    db.createObjectStore('certificate');
                } catch (e) {
                    // Thrown if the object store already exists, ignore
                }
                try {
                    db.createObjectStore('wallet');
                } catch (e) {
                    // Thrown if the object store already exists, ignore
                }
            };
        });
    }

    constructor(tableName, type) {
        if (type && !type.unserialize) throw 'TypedDB requires type with .unserialize()';
        this._tableName = tableName;
        this._type = type;
    }

    _get(key) {
        return BaseTypedDB.db.then(db => new Promise((resolve, error) => {
            const getTx = db.transaction([this._tableName])
                .objectStore(this._tableName)
                .get(key);
            getTx.onsuccess = event => resolve(event.target.result);
            getTx.onerror = error;
        }));
    }

    _put(key, value) {
        return BaseTypedDB.db.then(db => new Promise((resolve, error) => {
            const putTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .put(value, key);
            putTx.onsuccess = event => resolve(event.target.result);
            putTx.onerror = error;
        }));
    }

    getObject(key) {
        return this._get(key).then(value => value && this._type ? this._type.unserialize(new SerialBuffer(value)) : value);
    }

    putObject(key, value) {
        if (this._type && !value.serialize) throw 'TypedDB requires objects with .serialize()';
        return this._put(key, this._type ? value.serialize() : value);
    }

    getString(key) {
        return this._get(key);
    }

    putString(key, value) {
        return this._put(key, value);
    }

    remove(key) {
        return BaseTypedDB.db.then(db => new Promise((resolve, error) => {
            const deleteTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .delete(key);
            deleteTx.onsuccess = event => resolve(event.target.result);
            deleteTx.onerror = error;
        }));
    }

    nativeTransaction() {
        return BaseTypedDB.db.then(db => new NativeDBTransaction(db, this._tableName, this._type));
    }
}
Class.register(BaseTypedDB);

class NativeDBTransaction extends Observable {
    constructor(db, tableName, type) {
        super();
        this._db = db;
        this._tableName = tableName;
        this._type = type;
    }

    open() {
        this._tx = this._db.transaction([this._tableName], 'readwrite');
        this._store = this._tx.objectStore(this._tableName);
        this._finished = false;

        this._tx.oncomplete = () => {
            this.fire('complete');
            this._finished = true;
        };
        this._tx.onerror = e => {
            this.fire('error', e);
            this._finished = true;
        };
    }

    putObject(key, value) {
        if (this._finished) throw 'Transaction is already finished!';
        if (this._type && !value.serialize) throw 'TypedDB requires objects with .serialize()';
        return this._store.put(this._type ? value.serialize() : value, key);
    }

    putString(key, value) {
        if (this._finished) throw 'Transaction is already finished!';
        this._store.put(value, key);
    }

    remove(key) {
        if (this._finished) throw 'Transaction is already finished!';
        this._store.delete(key);
    }

    commit() {
        // no-op on IndexedDB
    }
}
Class.register(NativeDBTransaction);

class TypedDB extends BaseTypedDB {
    constructor(tableName, type) {
        super(tableName, type);
        this._cache = {};
    }

    async getObject(key) {
        if (this._cache[key] === undefined) {
            this._cache[key] = await BaseTypedDB.prototype.getObject.call(this, key);
        }
        return this._cache[key];
    }

    putObject(key, value) {
        this._cache[key] = value;
        return super.putObject(key, value);
    }

    async getString(key) {
        if (this._cache[key] === undefined) {
            this._cache[key] = await BaseTypedDB.prototype.getString.call(this, key);
        }
        return this._cache[key];
    }

    putString(key, value) {
        this._cache[key] = value;
        return super.putString(key, value);
    }

    remove(key) {
        delete this._cache[key];
        return super.remove(key);
    }

    updateCache(values) {
        for (let key in values) {
            this._cache[key] = values[key];
        }
    }

    flushCache(keys) {
        if (!keys) {
            this._cache = {};
        } else {
            for (let key of keys) {
                delete this._cache[key];
            }
        }
    }

    transaction() {
        return new TypedDBTransaction(this);
    }
}
Class.register(TypedDB);

class CryptoLib {
    /**
     * @return {SubtleCrypto|*}
     */
    static get instance() {
        if (!CryptoLib._poly_instance) {
            CryptoLib._poly_instance = CryptoLib._init_poly();
        }
        return CryptoLib._poly_instance;
    }

    static _init_poly() {
        const poly = {
            _nimiq_isSlowCurves: false,
            _nimiq_callDigestDelayedWhenMining: false
        };

        // We can use Webkit's SHA-256
        const subtle = typeof window !== 'undefined' ? (window.crypto.subtle) : (self.crypto.subtle);
        const wk = typeof window !== 'undefined' ? (window.crypto.webkitSubtle) : (self.crypto.webkitSubtle);
        if (poly.digest) {
            // Keep original
        } else if (subtle) {
            poly.digest = subtle.digest.bind(subtle);
        } else if (wk) {
            poly._nimiq_callDigestDelayedWhenMining = true;
            poly.digest = (alg, arr) => wk.digest(alg, arr);
        } else {
            poly._nimiq_callDigestDelayedWhenMining = true;

            if (!('require' in window)) throw 'Crypto polyfill not available.';
            const sha256 = window.require('fast-sha256');
            poly.digest = async (alg, arr) => {
                if (alg !== 'SHA-256') throw 'Unsupported algorithm.';
                return new sha256.Hash().update(arr).digest();
            };
        }

        if (subtle) {
            poly.sign = subtle.sign.bind(subtle);
            poly.verify = subtle.verify.bind(subtle);
            poly.exportKey = subtle.exportKey.bind(subtle);
            poly.generateKey = async (config, exportable, usage) => {
                try {
                    const res = await subtle.generateKey(config, exportable, usage);
                    // Shortcut
                    poly.generateKey = subtle.generateKey.bind(subtle);
                    poly.importKey = subtle.importKey.bind(subtle);
                    return res;
                } catch (e) {
                    CryptoLib._use_elliptic(poly);
                    return poly.generateKey(config, exportable, usage);
                }
            };
            poly.importKey = async (type, key, config, exportable, usage) => {
                try {
                    const res = await subtle.importKey(type, key, config, exportable, usage);
                    // Shortcut
                    poly.generateKey = subtle.generateKey.bind(subtle);
                    poly.importKey = subtle.importKey.bind(subtle);
                    return res;
                } catch (e) {
                    try {
                        await subtle.generateKey(config, exportable, usage);
                        // Shortcut
                        poly.generateKey = subtle.generateKey.bind(subtle);
                        poly.importKey = subtle.importKey.bind(subtle);
                    } catch (e) {
                        CryptoLib._use_elliptic(poly);
                        return poly.importKey(type, key, config, exportable, usage);
                    }
                    throw e;
                }
            };
        } else {
            CryptoLib._use_elliptic(poly);
        }

        return poly;
    }

    static _use_elliptic(poly) {
        poly._nimiq_isSlowCurves = true;

        if (!('require' in window)) throw 'Crypto polyfill not available.';
        const ec = window.require('elliptic').ec('p256');

        poly.generateKey = function (config, exportable, usage) {
            const keyPair = ec.genKeyPair();
            return {privateKey: {type: 'private', pair: keyPair}, publicKey: {type: 'public', pair: keyPair}};
        };

        const fromDER = function (der) {
            let res = [];
            let start = 4;
            for (let i = 0; i < 2; ++i) {
                let len = der[start - 1];
                for (let j = 0; j < Math.max(32 - len, 0); ++j) res.push(0);
                if (len === 33) {
                    res = res.concat(Array.prototype.slice.call(der, start + 1, start + len));
                } else {
                    res = res.concat(Array.prototype.slice.call(der, start, start + len));
                }
                start = start + len + 2;
            }

            return new Uint8Array(res);
        };

        const toDER = function (arr) {
            let res = [48, 0];
            for (let i = 0; i < 2; ++i) {
                res.push(2);
                if ((arr[0] & 0x80) === 0x80) {
                    res.push(33);
                    res.push(0);
                    res = res.concat(Array.prototype.slice.call(arr, (i * 32), (i * 32) + 32));
                } else {
                    let len = 32;
                    while (res[((i + 1) * 32) - len] === 0 && (res[((i + 1) * 32) - len + 1] & 0x80) === 0x80) len--;
                    res.push(len);
                    res = res.concat(Array.prototype.slice.call(arr, ((i + 1) * 32) - len, (i * 32) + 32));
                }
            }
            res[1] = res.length - 2;
            return res;
        };

        poly.sign = async function (config, privateKey, data) {
            const digest = await poly.digest(config.hash, data);
            const msgHash = new Uint8Array(digest);
            return fromDER(privateKey.pair.sign(msgHash).toDER());
        };

        poly.verify = async function (config, publicKey, signature, data) {
            const digest = await poly.digest(config.hash, data);
            const msgHash = new Uint8Array(digest);
            return publicKey.pair.verify(msgHash, {r: signature.slice(0, 32), s: signature.slice(32, 64)});
        };

        const toUri64 = function (arr) {
            return btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        };

        const fromUri64 = function (u64) {
            return Uint8Array.from(atob(u64.replace(/-/g, '+').replace(/_/g, '/') + '='), c => c.charCodeAt(0));
        };

        const toHex = function (arr) {
            return Array.prototype.map.call(arr, x => ('00' + x.toString(16)).slice(-2)).join('');
        };

        poly.exportKey = function (type, key) {
            if (key.type === 'public' && type === 'raw') {
                return key.pair.getPublic().encode();
            } else if (key.type === 'private' && type === 'jwk') {
                let pub = key.pair.getPublic().encode();
                return {
                    crv: 'P-256',
                    d: toUri64(key.pair.getPrivate().toArrayLike(Uint8Array)),
                    ext: true,
                    key_ops: ['sign'],
                    kty: 'EC',
                    x: toUri64(pub.slice(1, 33)),
                    y: toUri64(pub.slice(33)),
                };
            } else {
                throw 'Invalid key or unsupported type.';
            }
        };

        poly.importKey = function (type, key, config, exportable, usage) {
            if (type === 'raw' && key[0] === 4) {
                return {type: 'public', pair: ec.keyFromPublic(key)};
            } else if (type === 'jwk' && key.crv === 'P-256') {
                if (key.d) {
                    let priv = ec.keyFromPrivate(fromUri64(key.d));
                    priv.validate();
                    return {type: 'private', pair: priv};
                }
                if (key.x && key.y) {
                    return {
                        type: 'public',
                        pair: ec.keyFromPublic('04' + toHex(fromUri64(key.x)) + toHex(fromUri64(key.y)), 'hex')
                    };
                }
            }
            throw 'Invalid key or unsupported type.';
        };
        return poly;
    }
}
CryptoLib._poly_instance = null;
Class.register(CryptoLib);

class NetworkConfig {
    static myPeerAddress() {
        if (!PlatformUtils.supportsWebRTC()) {
            return new DumbPeerAddress(
                Services.myServices(), Date.now(), NetAddress.UNSPECIFIED,
                /*id*/ NumberUtils.randomUint64());
        }

        if (!NetworkConfig._mySignalId) {
            throw 'PeerAddress is not configured';
        }

        return new RtcPeerAddress(
            Services.myServices(), Date.now(), NetAddress.UNSPECIFIED,
            NetworkConfig._mySignalId, /*distance*/ 0);
    }

    // Used for filtering peer addresses by protocols.
    static myProtocolMask() {
        return Protocol.WS | Protocol.RTC;
    }

    static canConnect(protocol) {
        switch (protocol) {
            case Protocol.WS:
                return true;
            case Protocol.RTC:
                return PlatformUtils.supportsWebRTC();
            case Protocol.DUMB:
            default:
                return false;
        }
    }

    static configurePeerAddress(signalId) {
        NetworkConfig._mySignalId = signalId;
    }
}
Class.register(NetworkConfig);

// TODO The certificate is going to expire eventually. Automatically renew it.
window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
class WebRtcCertificate {
    static async get() {
        if (!WebRtcCertificate._certificate) {
            WebRtcCertificate._certificate = await WebRtcCertificate._getOrCreate();
        }
        // TODO: solve more cleverly
        // If certificate is expired, renew.
        if (WebRtcCertificate._certificate.expires <= Date.now()) {
            WebRtcCertificate._certificate = await WebRtcCertificate._create();
        }
        return WebRtcCertificate._certificate;
    }

    static async _getOrCreate() {
        const db = new TypedDB('certificate');
        let cert = await db.getObject('certKey');
        if (!cert) {
            cert = await WebRtcCertificate._create(db);
        }
        return cert;
    }

    static async _create(db) {
        db = db || new TypedDB('certificate');
        const cert = await RTCPeerConnection.generateCertificate({
            name: 'ECDSA',
            namedCurve: 'P-256'
        });
        await db.putObject('certKey', cert);
        return cert;
    }
}
WebRtcCertificate._certificate = null;
Class.register(WebRtcCertificate);

class WebRtcConfig {
    static async get() {
        // Initialize singleton.
        if (!WebRtcConfig._config) {
            // If browser does not support WebRTC, simply return empty config.
            if (!PlatformUtils.supportsWebRTC()) {
                WebRtcConfig._config = {};
                return WebRtcConfig._config;
            }

            const certificate = await WebRtcCertificate.get();
            WebRtcConfig._config = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun.nimiq-network.com:19302' }
                ],
                certificates : [certificate]
            };

            // Configure our peer address.
            const signalId = await WebRtcConfig.mySignalId();
            NetworkConfig.configurePeerAddress(signalId);
        }

        return WebRtcConfig._config;
    }

    static async mySignalId() {
        const config = await WebRtcConfig.get();
        const conn = new RTCPeerConnection(config);
        conn.createDataChannel('pseudo');
        return conn.createOffer().then(desc => {
            return WebRtcUtils.sdpToSignalId(desc.sdp);
        });
    }
}
Class.register(WebRtcConfig);

class WebRtcDataChannel extends Observable {
    constructor(nativeChannel) {
        super();
        // We expect WebRtc data channels to be ordered.
        Assert.that(nativeChannel.ordered, 'WebRtc data channel not ordered');
        this._channel = nativeChannel;

        this._channel.onmessage = msg => this._onMessage(msg.data || msg);
        this._channel.onclose = () => this.fire('close', this);
        this._channel.onerror = e => this.fire('error', e, this);

        // Buffer for chunked messages.
        // XXX We currently only support one chunked message at a time.
        this._buffer = null;

        this._timers = new Timers();
    }

    _onMessage(msg) {
        // XXX Convert Blob to ArrayBuffer if necessary.
        // TODO FileReader is slow and this is ugly anyways. Improve!
        if (msg instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => this._onMessage(reader.result);
            reader.readAsArrayBuffer(msg);
            return;
        }

        // Blindly forward empty messages.
        // TODO should we drop them instead?
        const buffer = new SerialBuffer(msg);
        if (buffer.byteLength === 0) {
            Log.w(WebRtcDataChannel, 'Received empty message', buffer, msg);
            this.fire('message', msg, this);
            return;
        }

        // Detect if this is a chunked message.
        switch (buffer.readUint8()) {
            case WebRtcDataChannel.CHUNK_BEGIN_MAGIC: {
                if (this._buffer !== null) {
                    Log.e(WebRtcDataChannel, 'Received CHUNK_BEGIN while already receiving chunked message');
                }

                // Read & check the total message size.
                const messageSize = buffer.readUint32();
                if (messageSize > WebRtcDataChannel.MESSAGE_SIZE_MAX) {
                    Log.e(WebRtcDataChannel, `Received CHUNK_BEGIN with excessive message size ${messageSize} > ${WebRtcDataChannel.MESSAGE_SIZE_MAX}`);
                    return;
                }

                // Create a new SerialBuffer for the chunked message.
                this._buffer = new SerialBuffer(messageSize);

                // Read & store chunk.
                const chunk = buffer.read(buffer.byteLength - buffer.readPos);
                this._buffer.write(chunk);

                // Set timeout.
                this._timers.resetTimeout('chunk', this._onChunkTimeout.bind(this), WebRtcDataChannel.CHUNK_TIMEOUT);

                break;
            }

            case WebRtcDataChannel.CHUNK_INNER_MAGIC: {
                if (!this._buffer) {
                    Log.w(WebRtcDataChannel, 'Received CHUNK_INNER without preceding CHUNK_BEGIN, discarding');
                    return;
                }

                // Read & store chunk.
                const chunk = buffer.read(buffer.byteLength - buffer.readPos);
                this._buffer.write(chunk);

                // Reset timeout.
                this._timers.resetTimeout('chunk', this._onChunkTimeout.bind(this), WebRtcDataChannel.CHUNK_TIMEOUT);

                break;
            }

            case WebRtcDataChannel.CHUNK_END_MAGIC: {
                if (!this._buffer) {
                    Log.w(WebRtcDataChannel, 'Received CHUNK_END without preceding CHUNK_BEGIN, discarding');
                    return;
                }

                // Read & store chunk.
                const chunk = buffer.read(buffer.byteLength - buffer.readPos);
                this._buffer.write(chunk);

                // Clear timeout.
                this._timers.clearTimeout('chunk');

                // Check that we have received the full message.
                if (this._buffer.writePos !== this._buffer.byteLength) {
                    Log.e(WebRtcDataChannel, `Received incomplete chunked message (expected=${this._buffer.byteLength}, received=${this._buffer.writePos}), discarding`);
                    this._buffer = null;
                    return;
                }

                // Full message received, notify listeners and reset buffer.
                this.fire('message', this._buffer.buffer, this);
                this._buffer = null;

                break;
            }

            default:
                // Not a chunked message, notify listeners.
                this.fire('message', msg, this);
        }
    }

    _onChunkTimeout() {
        Log.e(WebRtcDataChannel, 'Timeout while receiving chunked message');
        this._buffer = null;
    }

    send(msg) {
        Assert.that(msg.byteLength <= WebRtcDataChannel.MESSAGE_SIZE_MAX, 'WebRtcDataChannel.send() max message size exceeded');

        if (msg.byteLength > WebRtcDataChannel.CHUNK_SIZE_MAX) {
            // We need to split the message into chunks.
            this._sendChunked(msg);
        } else {
            // The message fits within a chunk, send directly.
            this._channel.send(msg);
        }
    }

    _sendChunked(msg) {
        // Send first chunk.
        let buffer = new SerialBuffer(WebRtcDataChannel.CHUNK_SIZE_MAX);
        buffer.writeUint8(WebRtcDataChannel.CHUNK_BEGIN_MAGIC);
        buffer.writeUint32(msg.byteLength);
        let chunk = new Uint8Array(msg.buffer, 0, WebRtcDataChannel.CHUNK_SIZE_MAX - buffer.writePos);
        buffer.write(chunk);
        this._channel.send(buffer);

        // Send remaining chunks.
        let remaining = msg.byteLength - chunk.byteLength;
        while (remaining > 0) {
            if (remaining >= WebRtcDataChannel.CHUNK_SIZE_MAX) {
                buffer.reset();
                buffer.writeUint8(WebRtcDataChannel.CHUNK_INNER_MAGIC);
                chunk = new Uint8Array(msg.buffer, msg.byteLength - remaining, WebRtcDataChannel.CHUNK_SIZE_MAX - buffer.writePos);
            } else {
                buffer = new SerialBuffer(remaining + 1);
                buffer.writeUint8(WebRtcDataChannel.CHUNK_END_MAGIC);
                chunk = new Uint8Array(msg.buffer, msg.byteLength - remaining, remaining);
            }

            buffer.write(chunk);
            this._channel.send(buffer);
            remaining -= chunk.byteLength;
        }
    }

    close() {
        this._channel.close();
    }

    get readyState() {
        return this._channel.readyState;
    }
}
WebRtcDataChannel.CHUNK_SIZE_MAX = 1024 * 16; // 16 kb
WebRtcDataChannel.MESSAGE_SIZE_MAX = 1024 * 1024; // 1 mb
WebRtcDataChannel.CHUNK_TIMEOUT = 1000 * 2; // 2 seconds

// These must not overlap with the first byte of the Message magic.
WebRtcDataChannel.CHUNK_BEGIN_MAGIC = 0xff;
WebRtcDataChannel.CHUNK_INNER_MAGIC = 0xfe;
WebRtcDataChannel.CHUNK_END_MAGIC = 0xfd;
Class.register(WebRtcDataChannel);

class WebRtcUtils {
    static sdpToSignalId(sdp) {
        return sdp
            .match('fingerprint:sha-256(.*)\r\n')[1]     // parse fingerprint
            .replace(/:/g, '')                           // replace colons
            .slice(1, 33);                               // truncate hash to 16 bytes
    }

    static candidateToNetAddress(candidate) {
        // TODO XXX Ad-hoc parsing of candidates - Improve!
        const parts = candidate.candidate.split(' ');
        if (parts.length < 6) {
            return null;
        }
        return NetAddress.fromIP(parts[4]);
    }
}
Class.register(WebRtcUtils);

class WebRtcConnector extends Observable {
    constructor() {
        super();
        return this._init();
    }

    async _init() {
        this._connectors = {};
        this._config = await WebRtcConfig.get();
        this._timers = new Timers();

        return this;
    }

    connect(peerAddress, signalChannel) {
        if (peerAddress.protocol !== Protocol.RTC) throw 'Malformed peerAddress';

        const signalId = peerAddress.signalId;
        if (this._connectors[signalId]) {
            Log.w(WebRtcConnector, `WebRtc: Already connecting/connected to ${signalId}`);
            return false;
        }

        const connector = new OutboundPeerConnector(this._config, peerAddress, signalChannel);
        connector.on('connection', conn => this._onConnection(conn, signalId));
        this._connectors[signalId] = connector;

        this._timers.setTimeout(`connect_${signalId}`, () => {
            delete this._connectors[signalId];
            this._timers.clearTimeout(`connect_${signalId}`);
            this.fire('error', peerAddress, 'timeout');
        }, WebRtcConnector.CONNECT_TIMEOUT);

        return true;
    }

    isValidSignal(msg) {
        return !!this._connectors[msg.senderId] && this._connectors[msg.senderId].nonce === msg.nonce;
    }

    onSignal(channel, msg) {
        // Check if we received an unroutable/ttl exceeded response from one of the signaling peers.
        if (msg.isUnroutable() || msg.isTtlExceeded()) {
            // Clear the timeout early if we initiated the connection.
            if (this.isValidSignal(msg) && this._connectors[msg.senderId] instanceof OutboundPeerConnector) {
                const peerAddress = this._connectors[msg.senderId].peerAddress;

                delete this._connectors[msg.senderId];
                this._timers.clearTimeout(`connect_${msg.senderId}`);

                // XXX Reason needs to be adapted when more flags are added.
                const reason =  msg.isUnroutable() ? 'unroutable' : 'ttl exceeded';
                this.fire('error', peerAddress, reason);
            }

            return;
        }

        let payload;
        try {
            payload = JSON.parse(BufferUtils.toAscii(msg.payload));
        } catch (e) {
            Log.e(WebRtcConnector, `Failed to parse signal payload from ${msg.senderId}`);
            return;
        }

        if (!payload) {
            Log.w(WebRtcConnector, `Discarding signal from ${msg.senderId} - empty payload`);
            return;
        }

        if (payload.type === 'offer') {
            // Check if we have received an offer on an ongoing connection.
            // This can happen if two peers initiate connections to one another
            // simultaneously. Resolve this by having the peer with the higher
            // signalId discard the offer while the one with the lower signalId
            // accepts it.
            if (this._connectors[msg.senderId]) {
                if (msg.recipientId > msg.senderId) {
                    // Discard the offer.
                    Log.d(WebRtcConnector, `Simultaneous connection, discarding offer from ${msg.senderId} (<${msg.recipientId})`);
                    return;
                } else {
                    // We are going to accept the offer. Clear the connect timeout
                    // from our previous Outbound connection attempt to this peer.
                    Log.d(WebRtcConnector, `Simultaneous connection, accepting offer from ${msg.senderId} (>${msg.recipientId})`);
                    this._timers.clearTimeout(`connect_${msg.senderId}`);
                }
            }

            // Accept the offer.
            const connector = new InboundPeerConnector(this._config, channel, msg.senderId, payload);
            connector.on('connection', conn => this._onConnection(conn, msg.senderId));
            this._connectors[msg.senderId] = connector;

            this._timers.setTimeout(`connect_${msg.senderId}`, () => {
                this._timers.clearTimeout(`connect_${msg.senderId}`);
                delete this._connectors[msg.senderId];
            }, WebRtcConnector.CONNECT_TIMEOUT);
        }

        // If we are already establishing a connection with the sender of this
        // signal, forward it to the corresponding connector.
        else if (this._connectors[msg.senderId]) {
            this._connectors[msg.senderId].onSignal(payload);
        }

        // If none of the above conditions is met, the signal is invalid and we discard it.
    }

    _onConnection(conn, signalId) {
        // Clear the connect timeout.
        this._timers.clearTimeout(`connect_${signalId}`);

        // Clean up when this connection closes.
        conn.on('close', () => this._onClose(signalId));

        // Tell listeners about the new connection.
        this.fire('connection', conn);
    }

    _onClose(signalId) {
        delete this._connectors[signalId];
        this._timers.clearTimeout(`connect_${signalId}`);
    }
}
WebRtcConnector.CONNECT_TIMEOUT = 5000; // ms
Class.register(WebRtcConnector);

class PeerConnector extends Observable {
    constructor(config, signalChannel, signalId, peerAddress) {
        super();
        this._signalChannel = signalChannel;
        this._signalId = signalId;
        this._peerAddress = peerAddress; // null for inbound connections

        this._nonce = NumberUtils.randomUint32();

        this._rtcConnection = new RTCPeerConnection(config);
        this._rtcConnection.onicecandidate = e => this._onIceCandidate(e);

        this._lastIceCandidate = null;
    }

    onSignal(signal) {
        if (signal.sdp) {
            // Validate that the signalId given in the session description matches
            // the advertised signalId.
            const signalId = WebRtcUtils.sdpToSignalId(signal.sdp);
            if (signalId !== this._signalId) {
                // TODO what to do here?
                Log.e(PeerConnector, `Invalid remote description received: expected signalId ${this._signalId}, got {signalId}`);
                return;
            }

            this._rtcConnection.setRemoteDescription(new RTCSessionDescription(signal))
                .then(() => {
                    if (signal.type === 'offer') {
                        this._rtcConnection.createAnswer(this._onDescription.bind(this), this._errorLog);
                    }
                })
                .catch(e => e);
        } else if (signal.candidate) {
            this._lastIceCandidate = new RTCIceCandidate(signal);
            this._rtcConnection.addIceCandidate(this._lastIceCandidate)
                .catch(e => e);
        }
    }

    _signal(signal) {
        this._signalChannel.signal(
            NetworkConfig.myPeerAddress().signalId,
            this._signalId,
            this._nonce,
            Network.SIGNAL_TTL_INITIAL,
            0, /*flags*/
            BufferUtils.fromAscii(JSON.stringify(signal))
        );
    }

    _onIceCandidate(event) {
        if (event.candidate !== null) {
            this._signal(event.candidate);
        }
    }

    _onDescription(description) {
        this._rtcConnection.setLocalDescription(description, () => {
            this._signal(description);
        }, this._errorLog);
    }

    _onDataChannel(event) {
        const channel = new WebRtcDataChannel(event.channel || event.target);

        // There is no API to get the remote IP address. As a crude heuristic, we parse the IP address
        // from the last ICE candidate seen before the connection was established.
        // TODO Can we improve this?
        let netAddress = null;
        if (this._lastIceCandidate) {
            try {
                netAddress = WebRtcUtils.candidateToNetAddress(this._lastIceCandidate);
            } catch(e) {
                Log.w(PeerConnector, `Failed to parse IP from ICE candidate: ${this._lastIceCandidate}`);
            }
        } else {
            // XXX Why does this happen?
            Log.w(PeerConnector, 'No ICE candidate seen for inbound connection');
        }

        const conn = new PeerConnection(channel, Protocol.RTC, netAddress, this._peerAddress);
        this.fire('connection', conn);
    }

    _errorLog(error) {
        Log.e(PeerConnector, error);
    }

    get nonce() {
        return this._nonce;
    }

    get peerAddress() {
        return this._peerAddress;
    }
}
Class.register(PeerConnector);

class OutboundPeerConnector extends PeerConnector {
    constructor(config, peerAddress, signalChannel) {
        super(config, signalChannel, peerAddress.signalId, peerAddress);
        this._peerAddress = peerAddress;

        // Create offer.
        const channel = this._rtcConnection.createDataChannel('data-channel');
        channel.binaryType = 'arraybuffer';
        channel.onopen = e => this._onDataChannel(e);
        this._rtcConnection.createOffer(this._onDescription.bind(this), this._errorLog);
    }
}
Class.register(OutboundPeerConnector);

class InboundPeerConnector extends PeerConnector {
    constructor(config, signalChannel, signalId, offer) {
        super(config, signalChannel, signalId, null);
        this._rtcConnection.ondatachannel = e => this._onDataChannel(e);
        this.onSignal(offer);
    }
}
Class.register(InboundPeerConnector);

class WebSocketConnector extends Observable {
    constructor() {
        super();
        this._timers = new Timers();
    }

    connect(peerAddress) {
        if (peerAddress.protocol !== Protocol.WS) throw 'Malformed peerAddress';

        const timeoutKey = `connect_${peerAddress}`;
        if (this._timers.timeoutExists(timeoutKey)) {
            Log.w(WebSocketConnector, `Already connecting to ${peerAddress}`);
            return false;
        }

        const ws = new WebSocket(`wss://${peerAddress.host}:${peerAddress.port}`);
        ws.onopen = () => {
            this._timers.clearTimeout(timeoutKey);

            // There is no way to determine the remote IP ... thanks for nothing, WebSocket API.
            const conn = new PeerConnection(ws, Protocol.WS, /*netAddress*/ null, peerAddress);
            this.fire('connection', conn);
        };
        ws.onerror = e => {
            this._timers.clearTimeout(timeoutKey);
            this.fire('error', peerAddress, e);
        };

        this._timers.setTimeout(timeoutKey, () => {
            this._timers.clearTimeout(timeoutKey);

            // We don't want to fire the error event again if the websocket
            // connect fails at a later time.
            ws.onerror = null;

            // If the connection succeeds after we have fired the error event,
            // close it.
            ws.onopen = () => {
                Log.w(WebSocketConnector, `Connection to ${peerAddress} succeeded after timeout - closing it`);
                ws.close();
            };

            this.fire('error', peerAddress, 'timeout');
        }, WebSocketConnector.CONNECT_TIMEOUT);

        return true;
    }
}
WebSocketConnector.CONNECT_TIMEOUT = 1000 * 5; // 5 seconds
Class.register(WebSocketConnector);

class Services {
    static myServices() {
        if (!Services._myServices) throw new Error('Services are not configured');
        return Services._myServices;
    }

    // Used for filtering peer addresses by services.
    static myServiceMask() {
        if (!Services._myServiceMask) throw new Error('ServiceMask is not configured');
        return Services._myServiceMask;
    }

    static configureServices(services) {
        Services._myServices = services;
    }

    static configureServiceMask(serviceMask) {
        Services._myServiceMask = serviceMask;
    }

    static isFullNode(services) {
        return (services & Services.FULL) !== 0;
    }

    static isNanoNode(services) {
        return services === Services.NANO;
    }
}
Services.NANO   = 1;
Services.LIGHT  = 2;
Services.FULL   = 4;
Services.INDEX  = 8;
Class.register(Services);

class Synchronizer extends Observable {
    constructor() {
        super();
        this._queue = [];
        this._working = false;
    }

    /**
     * Push function to the Synchronizer for later, synchronous execution
     * @template T
     * @param {function():T} fn Function to be invoked later by this Synchronizer
     * @returns {Promise.<T>}
     */
    push(fn) {
        return new Promise((resolve, reject) => {
            this._queue.push({fn: fn, resolve: resolve, reject: reject});
            if (!this._working) {
                this._doWork();
            }
        });
    }

    /**
     * Reject all jobs in the queue and clear it.
     * @returns {void}
     */
    clear() {
        for (const job of this._queue) {
            if (job.reject) job.reject();
        }
        this._queue = [];
    }

    async _doWork() {
        this._working = true;
        this.fire('work-start', this);

        while (this._queue.length) {
            const job = this._queue.shift();
            try {
                const result = await job.fn();
                job.resolve(result);
            } catch (e) {
                if (job.reject) job.reject(e);
            }
        }

        this._working = false;
        this.fire('work-end', this);
    }

    /** @type {boolean} */
    get working() {
        return this._working;
    }
}
Class.register(Synchronizer);

class Timers {
    constructor() {
        this._timeouts = {};
        this._intervals = {};
    }

    setTimeout(key, fn, waitTime) {
        if (this._timeouts[key]) throw 'Duplicate timeout for key ' + key;
        this._timeouts[key] = setTimeout(fn, waitTime);
    }

    clearTimeout(key) {
        clearTimeout(this._timeouts[key]);
        delete this._timeouts[key];
    }

    resetTimeout(key, fn, waitTime) {
        clearTimeout(this._timeouts[key]);
        this._timeouts[key] = setTimeout(fn, waitTime);
    }

    timeoutExists(key) {
        return this._timeouts[key] !== undefined;
    }

    setInterval(key, fn, intervalTime) {
        if (this._intervals[key]) throw 'Duplicate interval for key ' + key;
        this._intervals[key] = setInterval(fn, intervalTime);
    }

    clearInterval(key) {
        clearInterval(this._intervals[key]);
        delete this._intervals[key];
    }

    resetInterval(key, fn, intervalTime) {
        clearInterval(this._intervals[key]);
        this._intervals[key] = setInterval(fn, intervalTime);
    }

    intervalExists(key) {
        return this._intervals[key] !== undefined;
    }

    clearAll() {
        for (const key in this._timeouts) {
            this.clearTimeout(key);
        }
        for (const key in this._intervals) {
            this.clearInterval(key);
        }
    }
}
Class.register(Timers);

class Version {
    static isCompatible(code) {
        return code === Version.CODE;
    }
}
Version.CODE = 1;
Class.register(Version);

class ArrayUtils {
    /**
     * @template T
     * @param {Array.<T>} arr
     * @return {T}
     */
    static randomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * @param {Uint8Array} uintarr
     * @param {number} begin
     * @param {number} end
     * @return {Uint8Array}
     */
    static subarray(uintarr, begin, end) {
        function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

        if (begin === undefined) { begin = 0; }
        if (end === undefined) { end = uintarr.byteLength; }

        begin = clamp(begin, 0, uintarr.byteLength);
        end = clamp(end, 0, uintarr.byteLength);

        let len = end - begin;
        if (len < 0) {
            len = 0;
        }

        return new Uint8Array(uintarr.buffer, uintarr.byteOffset + begin, len);
    }
}
Class.register(ArrayUtils);

/**
 * @template K,V
 */
class HashMap {
    constructor(fnHash = HashMap._hash) {
        /** @type {Map.<string,V>} */
        this._map = new Map();
        /** @type {function(object): string} */
        this._fnHash = fnHash;
    }

    /**
     * @param {{hashCode: function():string}|*} o
     * @returns {string}
     * @private
     */
    static _hash(o) {
        return o.hashCode ? o.hashCode() : o.toString();
    }

    /**
     * @param {K|*} key
     * @returns {V|*}
     */
    get(key) {
        return this._map.get(this._fnHash(key));
    }

    /**
     * @param {K|*} key
     * @param {V|*} value
     */
    put(key, value) {
        this._map.set(this._fnHash(key), value);
    }

    /**
     * @param {K|*} key
     */
    remove(key) {
        this._map.delete(this._fnHash(key));
    }

    clear() {
        this._map.clear();
    }

    /**
     * @param {K|*} key
     * @returns {boolean}
     */
    contains(key) {
        return this._map.has(this._fnHash(key));
    }

    /**
     * @returns {Array.<K|*>}
     */
    keys() {
        return Array.from(this._map.keys());
    }

    /**
     * @returns {Iterator.<K|*>}
     */
    keyIterator() {
        return this._map.keys();
    }

    /**
     * @returns {Array.<V|*>}
     */
    values() {
        return Array.from(this._map.values());
    }

    /**
     * @returns {Iterator.<V|*>}
     */
    valueIterator() {
        return this._map.values();
    }

    /**
     * @returns {number}
     */
    get length() {
        return this._map.size;
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return this._map.size === 0;
    }
}
Class.register(HashMap);

/**
 * @template V
 */
class HashSet {
    constructor(fnHash = HashSet._hash) {
        /** @type {Map.<string,V>} */
        this._map = new Map();
        /** @type {function(object): string} */
        this._fnHash = fnHash;
    }

    /**
     * @param {{hashCode: function():string}|*} o
     * @returns {string}
     * @private
     */
    static _hash(o) {
        return o.hashCode ? o.hashCode() : o.toString();
    }

    /**
     * @param {V|*} value
     */
    add(value) {
        this._map.set(this._fnHash(value), value);
    }

    /**
     * @param {Array.<V|*>} collection
     */
    addAll(collection) {
        for (const value of collection) {
            this.add(value);
        }
    }

    /**
     * @param {V|*} value
     * @returns {V|*}
     */
    get(value) {
        return this._map.get(this._fnHash(value));
    }

    /**
     * @param {V|*} value
     */
    remove(value) {
        this._map.delete(this._fnHash(value));
    }

    /**
     * @param {Array.<V|*>} collection
     */
    removeAll(collection) {
        for (const value of collection) {
            this.remove(value);
        }
    }

    clear() {
        this._map.clear();
    }

    /**
     * @param {V|*} value
     * @returns {boolean}
     */
    contains(value) {
        return this._map.has(this._fnHash(value));
    }

    /**
     * @returns {Array.<V|*>}
     */
    values() {
        return Array.from(this._map.values());
    }

    /**
     * @returns {Iterator.<V|*>}
     */
    valueIterator() {
        return this._map.values();
    }

    /**
     * @returns {Iterator.<V|*>}
     */
    [Symbol.iterator]() {
        return this.valueIterator();
    }

    /**
     * @returns {number}
     */
    get length() {
        return this._map.size;
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return this._map.size === 0;
    }
}
Class.register(HashSet);

/**
 * @template T
 * @implements {Iterable.<T>}
 */
class LimitIterable {
    /**
     * @param {Iterable.<T>|Iterator.<T>} it
     * @param {number} limit
     */
    constructor(it, limit) {
        /** @type {Iterator.<T>} */
        this._iterator = it[Symbol.iterator] ? it[Symbol.iterator]() : it;
        /** @type {number} */
        this._limit = limit;
    }

    /**
     * @returns {{next: function():object}}
     */
    [Symbol.iterator]() {
        return LimitIterable.iterator(this._iterator, this._limit);
    }

    /**
     * @template V
     * @param {Iterator.<V>} iterator
     * @param {number} limit
     * @returns {{next: function():object}}
     */
    static iterator(iterator, limit) {
        let count = 0;
        return {
            next: () => {
                const done = count++ >= limit;
                const next = iterator.next();
                return {
                    value: done ? undefined : next.value,
                    done: done || next.done
                };
            }
        };
    }
}
Class.register(LimitIterable);

class Queue {
    constructor(fnHash) {
        this._queue = [];
        this._fnHash = fnHash || Queue._hash;
    }

    static _hash(o) {
        return o.hashCode ? o.hashCode() : o.toString();
    }

    enqueue(value) {
        this._queue.push(value);
    }

    dequeue() {
        return this._queue.shift();
    }

    indexOf(value) {
        for (let i = 0; i <= this._queue.length; ++i) {
            if (this._fnHash(value) === this._fnHash(this._queue[i])) {
                return i;
            }
        }
        return -1;
    }

    remove(value) {
        const index = this.indexOf(value);
        if (index > -1) {
            this._queue.splice(index, 1);
        }
    }

    dequeueUntil(value) {
        const index = this.indexOf(value);
        if (index > -1) {
            return this._queue.splice(0, index + 1);
        }
        return [];
    }

    clear() {
        this._queue = [];
    }

    values() {
        return this._queue;
    }

    get length() {
        return this._queue.length;
    }
}
Class.register(Queue);

class Assert {
    /**
     * @param {boolean} condition
     * @param {string} [message]
     * @returns {void}
     */
    static that(condition, message = 'Assertion failed') {
        if (!condition) throw new Error(message);
    }
}
Class.register(Assert);

class BufferUtils {
    /**
     * @param {*} buffer
     * @return {string}
     */
    static toAscii(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

    /**
     * @param {string} string
     * @return {Uint8Array}
     */
    static fromAscii(string) {
        var buf = new Uint8Array(string.length);
        for (let i = 0; i < string.length; ++i) {
            buf[i] = string.charCodeAt(i);
        }
        return buf;
    }

    /**
     * @param {*} buffer
     * @return {string}
     */
    static toBase64(buffer) {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    }

    /**
     * @param {string} base64
     * @return {SerialBuffer}
     */
    static fromBase64(base64) {
        return new SerialBuffer(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
    }

    /**
     * @param {*} buffer
     * @return {string}
     */
    static toBase64Url(buffer) {
        return BufferUtils.toBase64(buffer).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '.');
    }

    /**
     * @param {string} base64
     * @return {SerialBuffer}
     */
    static fromBase64Url(base64) {
        return new SerialBuffer(Uint8Array.from(atob(base64.replace(/_/g, '/').replace(/-/g, '+').replace(/\./g, '=')), c => c.charCodeAt(0)));
    }

    /**
     * @param {*} buffer
     * @return {string}
     */
    static toHex(buffer) {
        return Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');
    }

    /**
     * @param {string} hex
     * @return {SerialBuffer}
     */
    static fromHex(hex) {
        if (hex.length % 2 !== 0) return null;
        return new SerialBuffer(Uint8Array.from(hex.match(/.{2}/g), byte => parseInt(byte, 16)));
    }

    /**
     * @template T
     * @param {T} a
     * @param {*} b
     * @return {T}
     */
    static concatTypedArrays(a, b) {
        const c = new (a.constructor)(a.length + b.length);
        c.set(a, 0);
        c.set(b, a.length);
        return c;
    }

    /**
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    static equals(a, b) {
        if (a.length !== b.length) return false;
        const viewA = new Uint8Array(a);
        const viewB = new Uint8Array(b);
        for (let i = 0; i < a.length; i++) {
            if (viewA[i] !== viewB[i]) return false;
        }
        return true;
    }
}
Class.register(BufferUtils);

class SerialBuffer extends Uint8Array {
    /**
     * @param {*} bufferOrArrayOrLength
     */
    constructor(bufferOrArrayOrLength) {
        super(bufferOrArrayOrLength);
        this._view = new DataView(this.buffer);
        this._readPos = 0;
        this._writePos = 0;
    }

    /**
     * @param {number} start
     * @param {number} end
     * @return {Uint8Array}
     */
    subarray(start, end) {
        return ArrayUtils.subarray(this, start, end);
    }

    /** @type {number} */
    get readPos() {
        return this._readPos;
    }

    /** @type {number} */
    set readPos(value) {
        if (value < 0 || value > this.byteLength) throw `Invalid readPos ${value}`;
        this._readPos = value;
    }

    /** @type {number} */
    get writePos() {
        return this._writePos;
    }

    /** @type {number} */
    set writePos(value) {
        if (value < 0 || value > this.byteLength) throw `Invalid writePos ${value}`;
        this._writePos = value;
    }

    /**
     * Resets the read and write position of the buffer to zero.
     * @returns {void}
     */
    reset() {
        this._readPos = 0;
        this._writePos = 0;
    }

    /**
     * @param {number} length
     * @return {Uint8Array}
     */
    read(length) {
        const value = this.subarray(this._readPos, this._readPos + length);
        this._readPos += length;
        return value;
    }

    /**
     * @param {*} array
     */
    write(array) {
        this.set(array, this._writePos);
        this._writePos += array.byteLength;
    }

    /**
     * @return {number}
     */
    readUint8() {
        return this._view.getUint8(this._readPos++);
    }

    /**
     * @param {number} value
     */
    writeUint8(value) {
        this._view.setUint8(this._writePos++, value);
    }

    /**
     * @return {number}
     */
    readUint16() {
        const value = this._view.getUint16(this._readPos);
        this._readPos += 2;
        return value;
    }

    /**
     * @param {number} value
     */
    writeUint16(value) {
        this._view.setUint16(this._writePos, value);
        this._writePos += 2;
    }

    /**
     * @return {number}
     */
    readUint32() {
        const value = this._view.getUint32(this._readPos);
        this._readPos += 4;
        return value;
    }

    /**
     * @param {number} value
     */
    writeUint32(value) {
        this._view.setUint32(this._writePos, value);
        this._writePos += 4;
    }

    /**
     * @return {number}
     */
    readUint64() {
        const value = this._view.getFloat64(this._readPos);
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        this._readPos += 8;
        return value;
    }

    /**
     * @param {number} value
     */
    writeUint64(value) {
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        this._view.setFloat64(this._writePos, value);
        this._writePos += 8;
    }

    /**
     * @return {number}
     */
    readVarUint() {
        const value = this.readUint8();
        if (value < 0xFD) {
            return value;
        } else if (value === 0xFD) {
            return this.readUint16();
        } else if (value === 0xFE) {
            return this.readUint32();
        } else /*if (value === 0xFF)*/ {
            return this.readUint64();
        }
    }

    /**
     * @param {number} value
     */
    writeVarUint(value) {
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        if (value < 0xFD) {
            this.writeUint8(value);
        } else if (value <= 0xFFFF) {
            this.writeUint8(0xFD);
            this.writeUint16(value);
        } else if (value <= 0xFFFFFFFF) {
            this.writeUint8(0xFE);
            this.writeUint32(value);
        } else {
            this.writeUint8(0xFF);
            this.writeUint64(value);
        }
    }

    /**
     * @param {number} value
     * @returns {number}
     */
    static varUintSize(value) {
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        if (value < 0xFD) {
            return 1;
        } else if (value <= 0xFFFF) {
            return 3;
        } else if (value <= 0xFFFFFFFF) {
            return 5;
        } else {
            return 9;
        }
    }

    /**
     * @return {number}
     */
    readFloat64() {
        const value = this._view.getFloat64(this._readPos);
        this._readPos += 8;
        return value;
    }

    /**
     * @param {number} value
     */
    writeFloat64(value) {
        this._view.setFloat64(this._writePos, value);
        this._writePos += 8;
    }

    /**
     * @param {number} length
     * @return {string}
     */
    readString(length) {
        const bytes = this.read(length);
        return BufferUtils.toAscii(bytes);
    }

    /**
     * @param {string} value
     * @param {number} length
     */
    writeString(value, length) {
        if (StringUtils.isMultibyte(value) || value.length !== length) throw 'Malformed value/length';
        const bytes = BufferUtils.fromAscii(value);
        this.write(bytes);
    }

    /**
     * @param {number} length
     * @return {string}
     */
    readPaddedString(length) {
        const bytes = this.read(length);
        let i = 0;
        while (i < length && bytes[i] !== 0x0) i++;
        const view = new Uint8Array(bytes.buffer, bytes.byteOffset, i);
        return BufferUtils.toAscii(view);
    }

    /**
     * @param {string} value
     * @param {number} length
     */
    writePaddedString(value, length) {
        if (StringUtils.isMultibyte(value) || value.length > length) throw 'Malformed value/length';
        const bytes = BufferUtils.fromAscii(value);
        this.write(bytes);
        const padding = length - bytes.byteLength;
        this.write(new Uint8Array(padding));
    }

    /**
     * @return {string}
     */
    readVarLengthString() {
        const length = this.readUint8();
        if (this._readPos + length > this.length) throw 'Malformed length';
        const bytes = this.read(length);
        return BufferUtils.toAscii(bytes);
    }

    /**
     * @param {string} value
     */
    writeVarLengthString(value) {
        if (StringUtils.isMultibyte(value) || !NumberUtils.isUint8(value.length)) throw 'Malformed value';
        const bytes = BufferUtils.fromAscii(value);
        this.writeUint8(bytes.byteLength);
        this.write(bytes);
    }
}
Class.register(SerialBuffer);

class Crypto {
    static get lib() { return CryptoLib.instance; }

    // Signature implementation using Ed25519 via tweetnacl
    // tweetnacl is rather slow, so not using this for now
    //
    // static get curve() { return require('tweetnacl'); }
    //
    // static get publicKeySize() {
    //     return Crypto.curve.sign.publicKeyLength;
    // }
    //
    // static get publicKeyType() {
    //     return Uint8Array;
    // }
    //
    // static publicKeySerialize(obj) {
    //     return obj;
    // }
    //
    // static publicKeyUnserialize(arr) {
    //     return arr;
    // }
    //
    // static publicKeyDerive(privateKey) {
    //     return Crypto.keyPairPublic(Crypto.keyPairDerive(privateKey));
    // }
    //
    // static get privateKeySize() {
    //     return Crypto.curve.sign.secretKeyLength;
    // }
    //
    // static get privateKeyType() {
    //     return Uint8Array;
    // }
    //
    // static privateKeySerialize(obj) {
    //     return obj;
    // }
    //
    // static privateKeyUnserialize(arr) {
    //     return arr;
    // }
    //
    // static privateKeyGenerate() {
    //     return Crypto.keyPairPrivate(Crypto.keyPairGenerate());
    // }
    //
    // static get keyPairType() {
    //     return Object;
    // }
    //
    // static keyPairGenerate() {
    //     return Crypto.curve.sign.keyPair();
    // }
    //
    // static keyPairDerive(privateKey) {
    //     return Crypto.curve.sign.keyPair.fromSecretKey(privateKey);
    // }
    //
    // static keyPairPrivate(obj) {
    //     return obj.secretKey;
    // }
    //
    // static keyPairPublic(obj) {
    //     return obj.publicKey;
    // }
    //
    // static signatureCreate(privateKey, data) {
    //     return Crypto.curve.sign.detached(data, privateKey);
    // }
    //
    // static signatureVerify(publicKey, data, signature) {
    //     return Crypto.curve.sign.detached.verify(data, signature, publicKey);
    // }
    //
    // static signatureSerialize(obj) {
    //     return obj;
    // }
    //
    // static signatureUnserialize(arr) {
    //     return arr;
    // }
    //
    // static get signatureSize() {
    //     return Crypto.curve.sign.signatureLength;
    // }
    //
    // static get signatureType() {
    //     return Uint8Array;
    // }

    // Signature implementation using P-256/SHA-256 with WebCrypto API
    static get _keyConfig() {
        return {name: 'ECDSA', namedCurve: 'P-256'};
    }

    static get _signConfig() {
        return {name: 'ECDSA', hash: 'SHA-256'};
    }

    static get publicKeySize() {
        return 64;
    }

    static get publicKeyType() {
        return Object;
    }

    static publicKeySerialize(obj) {
        if (obj.raw.length === 64) {
            return obj.raw;
        }  else {
            return obj.raw.slice(1);
        }
    }

    static publicKeyUnserialize(arr) {
        return {raw: arr};
    }

    static async _publicKeyNative(obj) {
        if (!obj._native) {
            let arr;
            if (obj.raw.length === 64) {
                arr = new Uint8Array(65);
                arr[0] = 4;
                arr.set(obj.raw, 1);
            } else {
                arr = obj.raw;
            }
            obj._native = await Crypto.lib.importKey('raw', arr, Crypto._keyConfig, true, ['verify']);
        }
        return obj._native;
    }

    static async publicKeyDerive(privateKey) {
        const derived = await Crypto.keyPairDerive(privateKey);
        return Crypto.keyPairPublic(derived);
    }

    static get privateKeySize() {
        return 96;
    }

    static get privateKeyType() {
        return Object;
    }

    static _jwk_serialize(jwk) {
        const fromUri64 = function (u64) {
            return Array.from(atob(u64.replace(/-/g, '+').replace(/_/g, '/') + '='), c => c.charCodeAt(0));
        };
        return new Uint8Array(fromUri64(jwk.d).concat(fromUri64(jwk.x)).concat(fromUri64(jwk.y)));
    }

    static _jwk_unserialize(arr) {
        const toUri64 = function (arr) {
            return btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        };

        return {
            crv: 'P-256',
            d: toUri64(Array.prototype.slice.call(arr, 0, 32)),
            ext: true,
            key_ops: ['sign'],
            kty: 'EC',
            x: toUri64(Array.prototype.slice.call(arr, 32, 64)),
            y: toUri64(Array.prototype.slice.call(arr, 64)),
        };
    }

    static privateKeySerialize(obj) {
        return Crypto._jwk_serialize(obj.jwk);
    }

    static privateKeyUnserialize(arr) {
        return {jwk: Crypto._jwk_unserialize(arr)};
    }

    static async _privateKeyNative(obj) {
        if (!obj._native) {
            obj._native = await Crypto.lib.importKey('jwk', obj.jwk, Crypto._keyConfig, true, ['sign']);
        }
        return obj._native;
    }

    static async privateKeyGenerate() {
        const generate = await Crypto.keyPairGenerate();
        return Crypto.keyPairPrivate(generate);
    }

    static get keyPairType() {
        return Object;
    }

    static async keyPairGenerate() {
        const key = await Crypto.lib.generateKey(Crypto._keyConfig, true, ['sign', 'verify']);
        const exportedJwk = await Crypto.lib.exportKey('jwk', key.privateKey);
        const exportedRaw = await Crypto.lib.exportKey('raw', key.publicKey);
        return {
            secretKey: {
                _native: key.privateKey,
                jwk: exportedJwk
            },
            publicKey: {
                _native: key.publicKey,
                raw: new Uint8Array(exportedRaw).subarray(1)
            }
        };
    }

    static keyPairDerive(privateKey) {
        return {
            secretKey: privateKey,
            publicKey: Crypto.publicKeyUnserialize(new Uint8Array(Array.prototype.slice.call(Crypto.privateKeySerialize(privateKey), 32)))
        };
    }

    static keyPairPrivate(obj) {
        return obj.secretKey;
    }

    static keyPairPublic(obj) {
        return obj.publicKey;
    }

    static async signatureCreate(privateKey, data) {
        const priv = await Crypto._privateKeyNative(privateKey);
        return new Uint8Array(await Crypto.lib.sign(Crypto._signConfig, priv, data));
    }

    static async signatureVerify(publicKey, data, signature) {
        const pub = await Crypto._publicKeyNative(publicKey);
        return Crypto.lib.verify(Crypto._signConfig, pub, signature, data);
    }

    static signatureSerialize(obj) {
        return obj;
    }

    static signatureUnserialize(arr) {
        return arr;
    }

    static get signatureSize() {
        return 64;
    }

    static get signatureType() {
        return Uint8Array;
    }

    // Light hash implementation using SHA-256 with WebCrypto API and fast-sha256 fallback
    //
    // static get sha256() { return require('fast-sha256'); }
    //
    // static async hashLight(arr) {
    //     if (Crypto.lib) {
    //         return new Uint8Array(await Crypto.lib.digest('SHA-256', arr));
    //     } else {
    //         return new Promise((res) => {
    //             // Performs badly, but better than a dead UI
    //             setTimeout(() => {
    //                 res(new Crypto.sha256.Hash().update(arr).digest());
    //             });
    //         });
    //     }
    // }

    // Light hash implementation using SHA-256 with WebCrypto API
    static async hashLight(arr) {
        return new Uint8Array(await Crypto.lib.digest('SHA-256', arr));
    }

    // Hard hash implementation using double light hash
    //static async hashHard(arr) {
    //    return Crypto.hashLight(await Crypto.hashLight(arr));
    //}

    // Hard hash implementation using light hash
    static async hashHard(arr) {
        if (Crypto.lib._nimiq_callDigestDelayedWhenMining) {
            return await new Promise((resolve, error) => {
                window.setTimeout(() => {
                    Crypto.hashLight(arr).then(resolve);
                });
            });
        } else {
            return Crypto.hashLight(arr);
        }
    }

    static get hashSize() {
        return 32;
    }

    static get hashType() {
        return Uint8Array;
    }
}
Class.register(Crypto);

class CRC32 {
    static _createTable () {
        let b;
        const table = [];

        for (let j = 0; j < 256; ++j) {
            b = j;
            for (let k = 0; k < 8; ++k) {
                b = b & 1 ? CRC32._POLYNOMIAL ^ (b >>> 1) : b >>> 1;
            }
            table[j] = b >>> 0;
        }
        return table;
    }

    /**
     * @param {Uint8Array} buf
     * @returns {number}
     */
    static compute(buf) {
        if (!CRC32._table) CRC32._table = CRC32._createTable();
        if (!CRC32._hex_chars) CRC32._hex_chars = '0123456789abcdef'.split('');

        const message = new Uint8Array(buf);
        const initialValue = -1;

        let crc = initialValue;
        let hex = '';

        for (let i = 0; i < message.length; ++i) {
            crc = CRC32._table[(crc ^ message[i]) & 0xFF] ^ (crc >>> 8);
        }
        crc ^= initialValue;

        hex += CRC32._hex_chars[(crc >> 28) & 0x0F] + CRC32._hex_chars[(crc >> 24) & 0x0F] +
            CRC32._hex_chars[(crc >> 20) & 0x0F] + CRC32._hex_chars[(crc >> 16) & 0x0F] +
            CRC32._hex_chars[(crc >> 12) & 0x0F] + CRC32._hex_chars[(crc >> 8) & 0x0F] +
            CRC32._hex_chars[(crc >> 4) & 0x0F] + CRC32._hex_chars[crc & 0x0F];

        return parseInt(hex, 16);
    }
}
CRC32._table = null;
CRC32._hex_chars = null;
CRC32._POLYNOMIAL = 0xEDB88320;
Class.register(CRC32);

class ObjectDB extends TypedDB {
    constructor(tableName, type) {
        super(tableName, type);
    }

    /**
     * @param {{hash: function():Hash}|{hashCode: function():string}} obj
     * @returns {Promise.<string>}
     */
    async key(obj) {
        if (obj.hash) return (await obj.hash()).toBase64();
        if (obj.hashCode) return obj.hashCode();
        throw 'ObjectDB requires objects with a .hash() or .hashCode() method';
    }

    /**
     * @param {string} key
     * @returns {Promise.<object>}
     */
    async get(key) {
        return await TypedDB.prototype.getObject.call(this, key);
    }

    /**
     * @param {object} obj
     * @returns {Promise.<string>}
     */
    async put(obj) {
        const key = await this.key(obj);
        await TypedDB.prototype.putObject.call(this, key, obj);
        return key;
    }

    /**
     * @param {object} obj
     * @returns {Promise.<string>}
     */
    async remove(obj) {
        const key = await this.key(obj);
        await TypedDB.prototype.remove.call(this, key);
        return key;
    }

    /**
     * @returns {Promise.<{get: Function, put: Function, remove: Function}>}
     */
    async transaction() {
        const tx = await TypedDB.prototype.transaction.call(this);
        const that = this;

        tx.get = key => tx.getObject(key);
        tx.put = async function (obj) {
            const key = await that.key(obj);
            await tx.putObject(key, obj);
            return key;
        };
        const superRemove = tx.remove.bind(tx);
        tx.remove = async function (obj) {
            const key = await that.key(obj);
            await superRemove(key);
            return key;
        };

        return tx;
    }
}
Class.register(ObjectDB);

class TypedDBTransaction {
    /**
     * @param {TypedDB} db
     */
    constructor(db) {
        /** @type {TypedDB} */
        this._db = db;
        this._objects = {};
        this._strings = {};
        this._deletions = {};
    }

    /**
     * @returns {Promise}
     */
    commit() {
        return this._db.nativeTransaction().then( tx => new Promise( (resolve, reject) => {
            tx.open();
            tx.on('complete', () => {
                if (this._db.updateCache && this._db.flushCache) {
                    this._db.updateCache(this._objects);
                    this._db.updateCache(this._strings);
                    this._db.flushCache(Object.keys(this._deletions));
                }

                resolve(true);
            });
            tx.on('error', e => reject(e));

            for (const key in this._objects) {
                // FIXME Firefox seems to hang here!!!
                tx.putObject(key, this._objects[key]);
            }

            for (const key in this._strings) {
                tx.putString(key, this._strings[key]);
            }

            for (const key in this._deletions) {
                tx.remove(key);
            }

            tx.commit();
        }));
    }

    /**
     * @param {string} key
     * @returns {Promise.<object>}
     */
    async getObject(key) {
        if (this._deletions[key]) return undefined;
        if (this._objects[key] !== undefined) return this._objects[key];
        return this._db.getObject(key);
    }

    /**
     * @param {string} key
     * @param {object} value
     */
    putObject(key, value) {
        this._objects[key] = value;
        delete this._deletions[key];
    }

    /**
     * @param {string} key
     * @returns {Promise.<string>}
     */
    async getString(key) {
        if (this._deletions[key]) return undefined;
        if (this._strings[key] !== undefined) return this._strings[key];
        return this._db.getString(key);
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    putString(key, value) {
        this._strings[key] = value;
        delete this._deletions[key];
    }

    /**
     * @param {string} key
     */
    remove(key) {
        this._deletions[key] = true;
        delete this._objects[key];
        delete this._strings[key];
    }
}
Class.register(TypedDBTransaction);

class NumberUtils {
    /**
     * @param {number} val
     * @return {boolean}
     */
    static isUint8(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT8_MAX;
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    static isUint16(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT16_MAX;
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    static isUint32(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT32_MAX;
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    static isUint64(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT64_MAX;
    }

    /**
     * @return {number}
     */
    static randomUint32() {
        return Math.floor(Math.random() * (NumberUtils.UINT32_MAX + 1));
    }

    /**
     * @return {number}
     */
    static randomUint64() {
        return Math.floor(Math.random() * (NumberUtils.UINT64_MAX + 1));
    }
}

NumberUtils.UINT8_MAX = 255;
NumberUtils.UINT16_MAX = 65535;
NumberUtils.UINT32_MAX = 4294967295;
NumberUtils.UINT64_MAX = Number.MAX_SAFE_INTEGER;
//Object.freeze(NumberUtils);
Class.register(NumberUtils);

class MerkleTree {
    /**
     * @param {Array} values
     * @param {function(*):Promise.<Hash>} fnHash
     * @returns {Promise.<Hash>}
     */
    static computeRoot(values, fnHash = MerkleTree._hash) {
        return MerkleTree._computeRoot(values, fnHash);
    }

    /**
     * @param {Array} values
     * @param {function(*):Promise.<Hash>} fnHash
     * @returns {Promise.<Hash>}
     * @private
     */
    static _computeRoot(values, fnHash) {
        const len = values.length;
        if (len === 0) {
            return Hash.light(new Uint8Array(0));
        }
        if (len === 1) {
            return fnHash(values[0]);
        }

        const mid = Math.round(len / 2);
        const left = values.slice(0, mid);
        const right = values.slice(mid);
        return Promise.all([
            MerkleTree._computeRoot(left, fnHash),
            MerkleTree._computeRoot(right, fnHash)
        ]).then(hashes => Hash.light(BufferUtils.concatTypedArrays(hashes[0].serialize(), hashes[1].serialize())));
    }

    /**
     * @param {{hash: function():Promise.<Hash>}|*} o
     * @returns {Promise.<Hash>}
     * @private
     */
    static _hash(o) {
        if (o instanceof Hash) {
            return Promise.resolve(o);
        }
        if (typeof o.hash !== 'function') {
            throw 'MerkleTree objects require a .hash() method';
        }
        return o.hash();
    }
}
Class.register(MerkleTree);

class PlatformUtils {
    /**
     * @returns {boolean}
     */
    static isBrowser() {
        return typeof window !== 'undefined';
    }

    /**
     * @returns {boolean}
     */
    static supportsWebRTC() {
        let RTCPeerConnection = (window.RTCPeerConnection || window.webkitRTCPeerConnection);
        return PlatformUtils.isBrowser() && !!RTCPeerConnection && !!RTCPeerConnection.generateCertificate;
    }
}
Class.register(PlatformUtils);

class StringUtils {
    /**
     * @param {string} str
     * @returns {boolean}
     */
    static isMultibyte(str) {
        return /[\uD800-\uDFFF]/.test(str);
    }

    /**
     * @param {string} str1
     * @param {string} str2
     * @returns {string}
     */
    static commonPrefix(str1, str2) {
        let i = 0;
        for (; i < str1.length; ++i) {
            if (str1[i] !== str2[i]) break;
        }
        return str1.substr(0, i);
    }

}
Class.register(StringUtils);

class Policy {
    /**
     * Convert Nimiq decimal to Number of Satoshis.
     * @param {number} coins Nimiq count in decimal
     * @return {number} Number of Satoshis
     */
    static coinsToSatoshis(coins) {
        return Math.round(coins * Policy.SATOSHIS_PER_COIN);
    }

    /**
     * Convert Number of Satoshis to Nimiq decimal.
     * @param {number} satoshis Number of Satoshis.
     * @return {number} Nimiq count in decimal.
     */
    static satoshisToCoins(satoshis) {
        return satoshis / Policy.SATOSHIS_PER_COIN;
    }

    /**
     * Number of Satoshis per Nimiq.
     * @type {number}
     * @constant
     */
    static get SATOSHIS_PER_COIN() {
        return 1e8;
    }

    /**
     * Targeted block time in seconds.
     * @type {number}
     * @constant
     */
    static get BLOCK_TIME() {
        return 5; // Seconds
    }

    /**
     * Miner reward per block.
     * @type {number}
     * @constant
     */
    static get BLOCK_REWARD() {
        return Policy.coinsToSatoshis(50);
    }

    /**
     * Maximum block size.
     * @type {number}
     * @constant
     */
    static get BLOCK_SIZE_MAX() {
        return 5e5; // 500 KB
    }

    /**
     * The highest (easiest) block hash target.
     * @type {number}
     * @constant
     */
    static get BLOCK_TARGET_MAX() {
        return BlockUtils.compactToTarget(0x1f00ffff); // 16 zero bits, bitcoin uses 32 (0x1d00ffff)
    }

    /**
     * Number of blocks we take into account to calculate next difficulty.
     * @type {number}
     * @constant
     */
    static get DIFFICULTY_BLOCK_WINDOW() {
        return 100; // Blocks
    }

    /**
     * Limits the rate at which the difficulty is adjusted min/max.
     * @type {number}
     * @constant
     */
    static get DIFFICULTY_MAX_ADJUSTMENT_FACTOR() {
        return 2;
    }


    /* NIPoPoW parameters */

    /**
     * Security parameter M
     * FIXME naming
     * @type {number}
     * @constant
     */
    static get M() {
        return 300;
    }

    /**
     * Security parameter K
     * FIXME naming
     * @type {number}
     * @constant
     */
    static get K() {
        return 200;
    }

    /**
     * Security parameter DELTA
     * FIXME naming
     * @type {number}
     * @constant
     */
    static get DELTA() {
        return 0.01;
    }

    /* Snapshot Parameters */
    /**
     * Maximum number of snapshots.
     * @type {number}
     * @constant
     */
    static get NUM_SNAPSHOTS_MAX() {
        return 20;
    }

    /**
     * Security parameter M
     * FIXME naming
     * @type {number}
     * @constant
     */
    static get NUM_BLOCKS_VERIFICATION() {
        return 250;
    }
}
Class.register(Policy);

/**
 * @abstract
 */
class Primitive {
    /**
     * @param arg
     * @param type
     * @param {?number} length
     */
    constructor(arg, type, length) {
        if (type && !(arg instanceof type)) throw 'Primitive: Invalid type';
        if (length && arg.length && arg.length !== length) throw 'Primitive: Invalid length';
        this._obj = arg;
    }

    /**
     * @param {Primitive} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof Primitive && BufferUtils.equals(this.serialize(), o.serialize());
    }

    hashCode() {
        return this.toBase64();
    }

    /**
     * @abstract
     * @param {SerialBuffer} [buf]
     */
    serialize(buf) {}

    /**
     * @return {string}
     */
    toString() {
        return this.toBase64();
    }

    /**
     * @return {string}
     */
    toBase64() {
        return BufferUtils.toBase64(this.serialize());
    }

    /**
     * @return {string}
     */
    toHex() {
        return BufferUtils.toHex(this.serialize());
    }
}
Class.register(Primitive);

class Hash extends Primitive {
    /**
     * @param {{_obj}} o
     * @returns {Hash}
     */
    static copy(o) {
        if (!o) return o;
        // FIXME Move this to Crypto class.
        const obj = new Uint8Array(o._obj);
        return new Hash(obj);
    }

    /**
     * @param {?Uint8Array} arg
     * @private
     */
    constructor(arg) {
        if (arg === null) {
            arg = new Uint8Array(Crypto.hashSize);
        }
        super(arg, Crypto.hashType, Crypto.hashSize);
    }

    /**
     * @param {Uint8Array} arr
     * @return {Promise.<Hash>}
     */
    static async light(arr) {
        return new Hash(await Crypto.hashLight(arr));
    }

    /**
     * @param {Uint8Array} arr
     * @return {Promise.<Hash>}
     */
    static async hard(arr) {
        return new Hash(await Crypto.hashHard(arr));
    }

    /**
     * @param {SerialBuffer} buf
     * @return {Hash}
     */
    static unserialize(buf) {
        return new Hash(buf.read(Crypto.hashSize));
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(this._obj);
        return buf;
    }

    /**
     * @param {number} begin
     * @param {number} end
     * @return {Uint8Array}
     */
    subarray(begin, end) {
        return this._obj.subarray(begin, end);
    }

    /** @type {number} */
    get serializedSize() {
        return Crypto.hashSize;
    }

    /**
     * @param {Primitive} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof Hash && super.equals(o);
    }

    /**
     * @param {string} base64
     * @return {Hash}
     */
    static fromBase64(base64) {
        return new Hash(BufferUtils.fromBase64(base64));
    }

    /**
     * @param {string} hex
     * @return {Hash}
     */
    static fromHex(hex) {
        return new Hash(BufferUtils.fromHex(hex));
    }

    /**
     * @param {Hash} o
     * @return {boolean}
     */
    static isHash(o) {
        return o instanceof Hash;
    }
}
Class.register(Hash);

class PrivateKey extends Primitive {
    /**
     * @param arg
     * @private
     */
    constructor(arg) {
        super(arg, Crypto.privateKeyType, Crypto.privateKeySize);
    }

    /**
     * @return {Promise.<PrivateKey>}
     */
    static async generate() {
        return new PrivateKey(await Crypto.privateKeyGenerate());
    }

    /**
     * @param {SerialBuffer} buf
     * @return {PrivateKey}
     */
    static unserialize(buf) {
        return new PrivateKey(Crypto.privateKeyUnserialize(buf.read(Crypto.privateKeySize)));
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(Crypto.privateKeySerialize(this._obj));
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return Crypto.privateKeySize;
    }

    /**
     * @param {Primitive} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof PrivateKey && super.equals(o);
    }
}

Class.register(PrivateKey);

class PublicKey extends Primitive {
    /**
     * @param {{_obj}} o
     * @returns {PublicKey}
     */
    static copy(o) {
        if (!o) return o;
        // FIXME Move this to Crypto class.
        const obj = {raw: new Uint8Array(o._obj.raw)};
        return new PublicKey(obj);
    }

    /**
     * @param arg
     * @private
     */
    constructor(arg) {
        super(arg, Crypto.publicKeyType, Crypto.publicKeySize);
    }

    /**
     * @param {PrivateKey} privateKey
     * @return {Promise.<PublicKey>}
     */
    static async derive(privateKey) {
        return new PublicKey(await Crypto.publicKeyDerive(privateKey._obj));
    }

    /**
     * @param {SerialBuffer} buf
     * @return {PublicKey}
     */
    static unserialize(buf) {
        return new PublicKey(Crypto.publicKeyUnserialize(buf.read(Crypto.publicKeySize)));
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(Crypto.publicKeySerialize(this._obj));
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return Crypto.publicKeySize;
    }

    /**
     * @param {Primitive} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof PublicKey && super.equals(o);
    }

    /**
     * @return {Promise.<Address>}
     */
    async toAddress() {
        return new Address((await Hash.light(this.serialize())).subarray(0, 20));
    }
}
Class.register(PublicKey);

class KeyPair extends Primitive {
    /**
     * @param arg
     * @private
     */
    constructor(arg) {
        super(arg, Crypto.keyPairType);
    }

    /**
     * @return {Promise.<KeyPair>}
     */
    static async generate() {
        return new KeyPair(await Crypto.keyPairGenerate());
    }

    /**
     * @param {PrivateKey} privateKey
     * @return {Promise.<KeyPair>}
     */
    static async derive(privateKey) {
        return new KeyPair(await Crypto.keyPairDerive(privateKey._obj));
    }

    /**
     * @param {SerialBuffer} buf
     * @return {KeyPair}
     */
    static unserialize(buf) {
        return new KeyPair(Crypto.keyPairDerive(Crypto.privateKeyUnserialize(buf.read(Crypto.privateKeySize))));
    }

    /**
     * @param {string} hexBuf
     * @return {KeyPair}
     */
    static fromHex(hexBuf) {
        return this.unserialize(BufferUtils.fromHex(hexBuf));
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        return this.privateKey.serialize(buf);
    }

    /** @type {PrivateKey} */
    get privateKey() {
        return this._privateKey || (this._privateKey = new PrivateKey(Crypto.keyPairPrivate(this._obj)));
    }

    /** @type {PublicKey} */
    get publicKey() {
        return this._publicKey || (this._publicKey = new PublicKey(Crypto.keyPairPublic(this._obj)));
    }

    /** @type {number} */
    get serializedSize() {
        return this.privateKey.serializedSize;
    }

    /**
     * @param {Primitive} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof KeyPair && super.equals(o);
    }
}
Class.register(KeyPair);

class Signature extends Primitive {
    /**
     * @param {{_obj}} o
     * @returns {Signature}
     */
    static copy(o) {
        if (!o) return o;
        // FIXME Move this to Crypto class.
        const obj = new Uint8Array(o._obj);
        return new Signature(obj);
    }

    /**
     * @param arg
     * @private
     */
    constructor(arg) {
        super(arg, Crypto.signatureType, Crypto.signatureSize);
    }

    /**
     * @param {PrivateKey} privateKey
     * @param {Uint8Array} data
     * @return {Promise.<Signature>}
     */
    static async create(privateKey, data) {
        return new Signature(await Crypto.signatureCreate(privateKey._obj, data));
    }

    /**
     * @param {SerialBuffer} buf
     * @return {Signature}
     */
    static unserialize(buf) {
        return new Signature(Crypto.signatureUnserialize(buf.read(Crypto.signatureSize)));
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(Crypto.signatureSerialize(this._obj));
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return Crypto.signatureSize;
    }

    /**
     * @param {PublicKey} publicKey
     * @param {Uint8Array} data
     * @return {Promise.<boolean>}
     */
    verify(publicKey, data) {
        return Crypto.signatureVerify(publicKey._obj, data, this._obj);
    }

    /**
     * @param {Primitive} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof Signature && super.equals(o);
    }
}
Class.register(Signature);

class Address extends Primitive {
    /**
     * @param {{_obj}} o
     * @returns {Address}
     */
    static copy(o) {
        if (!o) return o;
        const obj = new Uint8Array(o._obj);
        return new Address(obj);
    }

    constructor(arg) {
        super(arg, Uint8Array, Address.SERIALIZED_SIZE);
    }

    /**
     * Create Address object from binary form.
     * @param {SerialBuffer} buf Buffer to read from.
     * @return {Address} Newly created Account object.
     */
    static unserialize(buf) {
        return new Address(buf.read(Address.SERIALIZED_SIZE));
    }

    /**
     * Serialize this Address object into binary form.
     * @param {?SerialBuffer} [buf] Buffer to write to.
     * @return {SerialBuffer} Buffer from `buf` or newly generated one.
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(this._obj);
        return buf;
    }

    subarray(begin, end) {
        return this._obj.subarray(begin, end);
    }

    /**
     * @type {number}
     */
    get serializedSize() {
        return Address.SERIALIZED_SIZE;
    }

    /**
     * @param {Primitive} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof Address
            && super.equals(o);
    }

    /**
     * @param {string} base64
     * @return {Address}
     */
    static fromBase64(base64) {
        return new Address(BufferUtils.fromBase64(base64));
    }

    /**
     * @param {string} hex
     * @return {Address}
     */
    static fromHex(hex) {
        return new Address(BufferUtils.fromHex(hex));
    }
}
Address.SERIALIZED_SIZE = 20;
Address.HEX_SIZE = 40;
Class.register(Address);

class Balance {
    /**
     * @param {{_value, _nonce}} o
     * @returns {Balance}
     */
    static copy(o) {
        if (!o) return o;
        return new Balance(o._value, o._nonce);
    }

    constructor(value = 0, nonce = 0) {
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        if (!NumberUtils.isUint32(nonce)) throw 'Malformed nonce';

        this._value = value;
        this._nonce = nonce;
    }

    static unserialize(buf) {
        let value = buf.readUint64();
        let nonce = buf.readUint32();
        return new Balance(value, nonce);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint64(this._value);
        buf.writeUint32(this._nonce);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return /*value*/ 8
            + /*nonce*/ 4;
    }

    /**
     * @type {number}
     */
    get value() {
        return this._value;
    }

    /**
     * @type {number}
     */
    get nonce() {
        return this._nonce;
    }

    equals(o) {
        return o instanceof Balance
            && this._value === o.value
            && this._nonce === o.nonce;
    }
}
Balance.INITIAL = new Balance();
Class.register(Balance);

class Account {
    /**
     * @param {{_balance}} o
     * @returns {Account}
     */
    static copy(o) {
        if (!o) return o;
        return new Account(Balance.copy(o._balance));
    }

    constructor(balance) {
        if (!balance || !(balance instanceof Balance)) throw 'Malformed balance';
        /** @type {Balance} */
        this._balance = balance;
    }

    /**
     * Create Account object from binary form.
     * @param {SerialBuffer} buf Buffer to read from.
     * @return {Account} Newly created Account object.
     */
    static unserialize(buf) {
        // We currently only support one account type: Basic.
        const type = buf.readUint8();
        if (type !== Account.Type.BASIC) throw 'Malformed account type';

        const balance = Balance.unserialize(buf);
        return new Account(balance);
    }

    /**
     * Serialize this Account object into binary form.
     * @param {?SerialBuffer} buf Buffer to write to.
     * @return {SerialBuffer} Buffer from `buf` or newly generated one.
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint8(Account.Type.BASIC);
        this._balance.serialize(buf);
        return buf;
    }

    /**
     * @return {number}
     */
    get serializedSize() {
        return /*type*/ 1
            + this._balance.serializedSize;
    }

    /**
     * Check if two Accounts are the same.
     * @param {Account} o Object to compare with.
     * @return {boolean} Set if both objects describe the same data.
     */
    equals(o) {
        return o instanceof Account
            && this._balance.equals(o.balance);
    }

    toString() {
        return `BasicAccount{value=${this._balance.value}, nonce=${this._balance.nonce}}`;
    }

    /**
     * @return {Balance} Account balance
     */
    get balance() {
        return this._balance;
    }
}
Account.INITIAL = new Account(Balance.INITIAL);
/**
 * Enum for Account types.
 * @enum {number}
 */
Account.Type = {};
Account.Type.BASIC = 0;
Class.register(Account);

class AccountsTreeNode {
    /**
     * @param {string} prefix
     * @param {Account} account
     * @returns {AccountsTreeNode}
     */
    static terminalNode(prefix, account) {
        return new AccountsTreeNode(AccountsTreeNode.TERMINAL, prefix, account);
    }

    /**
     * @param {string} prefix
     * @param {Array.<string>} childrenSuffixes
     * @param {Array.<Hash>} childrenHashes
     * @returns {AccountsTreeNode}
     */
    static branchNode(prefix, childrenSuffixes = [], childrenHashes = []) {
        if (childrenSuffixes.length !== childrenHashes.length) {
            throw new Error('Invalid list of children for branch node');
        }
        return new AccountsTreeNode(AccountsTreeNode.BRANCH, prefix, childrenSuffixes, childrenHashes);
    }

    /**
     * @param {{_type, _prefix, ?_childrenSuffixes, ?_childrenHashes, ?_account}} o
     * @returns {AccountsTreeNode}
     */
    static copy(o) {
        if (!o) return o;
        let arg, arg2;
        if (AccountsTreeNode.isBranchType(o._type)) {
            arg = o._childrenSuffixes;
            arg2 = o._childrenHashes.map(it => Hash.copy(it));
        } else {
            arg = Account.copy(o._account);
        }
        return new AccountsTreeNode(o._type, o._prefix, arg, arg2);
    }

    /**
     * @param type
     * @param {string} prefix
     * @param {Account|Array.<string>} arg
     * @param {Array.<Hash>} [arg2]
     */
    constructor(type, prefix = '', arg, arg2 = []) {
        this._type = type;
        this._prefix = prefix;
        if (this.isBranch()) {
            /** @type {Array.<string>} */
            this._childrenSuffixes = arg;
            /** @type {Array.<Hash>} */
            this._childrenHashes = arg2;
        } else if (this.isTerminal()) {
            /** @type {Account} */
            this._account = arg;
        } else {
            throw `Invalid AccountsTreeNode type: ${type}`;
        }
    }

    /**
     * @param type
     * @returns {boolean}
     */
    static isTerminalType(type) {
        return type === AccountsTreeNode.TERMINAL;
    }

    /**
     * @param type
     * @returns {boolean}
     */
    static isBranchType(type) {
        return type === AccountsTreeNode.BRANCH;
    }


    /**
     * @param {SerialBuffer} buf
     * @returns {AccountsTreeNode}
     */
    static unserialize(buf) {
        const type = buf.readUint8();
        const prefix = buf.readVarLengthString();

        if (AccountsTreeNode.isTerminalType(type)) {
            // Terminal node
            const account = Account.unserialize(buf);
            return AccountsTreeNode.terminalNode(prefix, account);
        } else if (AccountsTreeNode.isBranchType(type)) {
            // Branch node
            const childrenSuffixes = [], childrenHashes = [];
            const childCount = buf.readUint8();
            for (let i = 0; i < childCount; ++i) {
                const childSuffix = buf.readVarLengthString();
                const childHash = Hash.unserialize(buf);
                const childIndex = parseInt(childSuffix[0], 16);
                childrenSuffixes[childIndex] = childSuffix;
                childrenHashes[childIndex] = childHash;
            }
            return AccountsTreeNode.branchNode(prefix, childrenSuffixes, childrenHashes);
        } else {
            throw `Invalid AccountsTreeNode type: ${type}`;
        }
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint8(this._type);
        buf.writeVarLengthString(this._prefix);
        if (this.isTerminal()) {
            // Terminal node
            this._account.serialize(buf);
        } else {
            // Branch node
            const childCount = this._childrenSuffixes.reduce((count, child) => count + !!child, 0);
            buf.writeUint8(childCount);
            for (let i = 0; i < this._childrenSuffixes.length; ++i) {
                if (this._childrenHashes[i]) {
                    buf.writeVarLengthString(this._childrenSuffixes[i]);
                    this._childrenHashes[i].serialize(buf);
                }
            }
        }
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        let payloadSize;
        if (this.isTerminal()) {
            payloadSize = this._account.serializedSize;
        } else {
            // The children array contains undefined values for non existing children.
            // Only count existing ones.
            const childrenSize = this._childrenHashes.reduce((sum, child, i) => sum + (child ? child.serializedSize + this._childrenSuffixes[i].length + /*suffix varLengthString*/ 1 : 0), 0);
            payloadSize = /*childCount*/ 1 + childrenSize;
        }

        return /*type*/ 1
            + /*extra byte varLengthString prefix*/ 1
            + this._prefix.length
            + payloadSize;
    }

    /**
     * @param {string} prefix
     * @returns {Hash}
     */
    getChildHash(prefix) {
        return this._childrenHashes && this._childrenHashes[this._getChildIndex(prefix)];
    }

    /**
     * @param {string} prefix
     * @returns {string|boolean}
     */
    getChild(prefix) {
        const suffix = this._childrenSuffixes && this._childrenSuffixes[this._getChildIndex(prefix)];
        if (suffix) {
            return this.prefix + suffix;
        }
        return suffix;
    }

    /**
     * @param {string} prefix
     * @param {Hash} childHash
     * @returns {AccountsTreeNode}
     */
    withChild(prefix, childHash) {
        const childrenSuffixes = this._childrenSuffixes.slice() || [];
        const childrenHashes = this._childrenHashes.slice() || [];
        childrenSuffixes[this._getChildIndex(prefix)] = prefix.substr(this.prefix.length);
        childrenHashes[this._getChildIndex(prefix)] = childHash;
        return AccountsTreeNode.branchNode(this._prefix, childrenSuffixes, childrenHashes);
    }

    /**
     * @param {string} prefix
     * @returns {AccountsTreeNode}
     */
    withoutChild(prefix) {
        const childrenSuffixes = this._childrenSuffixes.slice() || [];
        const childrenHashes = this._childrenHashes.slice() || [];
        delete childrenSuffixes[this._getChildIndex(prefix)];
        delete childrenHashes[this._getChildIndex(prefix)];
        return AccountsTreeNode.branchNode(this._prefix, childrenSuffixes, childrenHashes);
    }

    /**
     * @returns {boolean}
     */
    hasChildren() {
        return this._childrenSuffixes && this._childrenSuffixes.some(child => !!child);
    }

    /**
     * @returns {boolean}
     */
    hasSingleChild() {
        return this._childrenSuffixes && this._childrenSuffixes.reduce((count, child) => count + !!child, 0) === 1;
    }

    /**
     * @returns {?string}
     */
    getFirstChild() {
        if (!this._childrenSuffixes) {
            return undefined;
        }
        const suffix = this._childrenSuffixes.find(child => !!child);
        return suffix ? this.prefix + suffix : undefined;
    }

    /**
     * @returns {?string}
     */
    getLastChild() {
        if (!this._childrenSuffixes) {
            return undefined;
        }
        for (let i = this._childrenSuffixes.length-1; i>=0; --i) {
            if (this._childrenSuffixes[i]) {
                return this.prefix + this._childrenSuffixes[i];
            }
        }
        return undefined;
    }

    /**
     * @returns {?Array.<string>}
     */
    getChildren() {
        if (!this._childrenSuffixes) {
            return undefined;
        }
        return this._childrenSuffixes.filter(child => !!child).map(child => this.prefix + child);
    }

    /** @type {Account} */
    get account() {
        return this._account;
    }

    /** @type {string} */
    get prefix() {
        return this._prefix;
    }

    /** @type {string} */
    set prefix(value) {
        this._prefix = value;
        this._hash = undefined;
    }

    /**
     * @param {Account} account
     * @returns {AccountsTreeNode}
     */
    withAccount(account) {
        return AccountsTreeNode.terminalNode(this._prefix, account);
    }

    /**
     * @returns {Promise.<Hash>}
     */
    async hash() {
        if (!this._hash) {
            this._hash = await Hash.light(this.serialize());
        }
        return this._hash;
    }

    /**
     * @returns {boolean}
     */
    isTerminal() {
        return AccountsTreeNode.isTerminalType(this._type);
    }

    /**
     * @returns {boolean}
     */
    isBranch() {
        return AccountsTreeNode.isBranchType(this._type);
    }

    /**
     * @param {string} prefix
     * @returns {number}
     * @private
     */
    _getChildIndex(prefix) {
        Assert.that(prefix.substr(0, this.prefix.length) === this.prefix, 'Prefix is not a child of the current node');
        return parseInt(prefix[this.prefix.length], 16);
    }

    /**
     * @param {AccountsTreeNode} o
     * @returns {boolean}
     */
    equals(o) {
        if (!(o instanceof AccountsTreeNode)) return false;
        if (!Object.is(this.prefix, o.prefix)) return false;
        if (this.isTerminal()) {
            return o.isTerminal() && o._account.equals(this._account);
        } else {
            if (!o.isBranch()) return false;
            if (this._childrenSuffixes.length !== o._childrenSuffixes.length) return false;
            if (o._childrenSuffixes.length !== o._childrenHashes.length) return false;
            for (let i = 0; i < this._childrenSuffixes.length; ++i) {
                // hashes of child nodes
                const ourChild = this._childrenHashes[i];
                const otherChild = o._childrenHashes[i];
                if (ourChild) {
                    if (!otherChild || !ourChild.equals(otherChild)) return false;
                } else {
                    if (otherChild) return false;
                }
                if (this._childrenSuffixes[i] !== o._childrenSuffixes[i]) return false;
            }
        }
        return true;
    }

    /**
     * @returns {{_type: *}}
     */
    stripDown() {
        const obj = {
            _type: this._type
        };

        if (this.isBranch()) {
            obj._childrenSuffixes = this._childrenSuffixes;
            obj._childrenHashes = this._childrenHashes;
        } else {
            obj._account = this._account;
        }

        return obj;
    }
}
AccountsTreeNode.BRANCH = 0x00;
AccountsTreeNode.TERMINAL = 0xff;
Class.register(AccountsTreeNode);

class AccountsTreeStore {
    /**
     * @param {JungleDB} jdb
     */
    static initPersistent(jdb) {
        jdb.createObjectStore('Accounts', new AccountsTreeStoreCodec());
    }

    /**
     * @param {JungleDB} jdb
     * @returns {AccountsTreeStore}
     */
    static getPersistent(jdb) {
        return new AccountsTreeStore(jdb.getObjectStore('Accounts'));
    }

    /**
     * @returns {AccountsTreeStore}
     */
    static createVolatile() {
        const store = JDB.JungleDB.createVolatileObjectStore();
        return new AccountsTreeStore(store);
    }

    /**
     * @param {IObjectStore} store
     */
    constructor(store) {
        this._store = store;
    }

    /**
     * @override
     * @param {string} key
     * @returns {Promise.<AccountsTreeNode>}
     */
    get(key) {
        return this._store.get(key);
    }

    /**
     * @override
     * @param {AccountsTreeNode} node
     * @returns {Promise.<string>}
     */
    async put(node) {
        const key = node.prefix;
        await this._store.put(key, node);
        return key;
    }

    /**
     * @override
     * @param {AccountsTreeNode} node
     * @returns {Promise.<string>}
     */
    async remove(node) {
        const key = node.prefix;
        await this._store.remove(key);
        return key;
    }

    /**
     * @returns {Promise.<AccountsTreeNode>}
     */
    getRootNode() {
        return this.get('');
    }

    /**
     * @param startPrefix This prefix will *not* be included.
     * @param size
     * @returns {Promise.<Array.<AccountsTreeNode>>}
     */
    async getTerminalNodes(startPrefix, size) {
        const relevantKeys = [];
        await this._store.keyStream(key => {
            if (key.length === Address.HEX_SIZE) {
                relevantKeys.push(key);
                if (relevantKeys.length === size) {
                    return false;
                }
            }
            return true;
        }, true, JDB.KeyRange.lowerBound(startPrefix, true));
        const nodes = [];
        for (const key of relevantKeys) {
            nodes.push(this._store.get(key));
        }
        return Promise.all(nodes);
    }

    snapshot() {
        const snapshot = this._store.snapshot();
        return new AccountsTreeStore(snapshot);
    }

    /**
     * @param {boolean} [enableWatchdog}
     * @returns {AccountsTreeStore}
     */
    transaction(enableWatchdog = true) {
        const tx = this._store.transaction(enableWatchdog);
        return new AccountsTreeStore(tx);
    }

    truncate() {
        return this._store.truncate();
    }

    /**
     * @returns {Promise}
     */
    commit() {
        return this._store.commit();
    }

    /**
     * @returns {Promise}
     */
    abort() {
        return this._store.abort();
    }
}
Class.register(AccountsTreeStore);

/**
 * @implements {ICodec}
 */
class AccountsTreeStoreCodec {
    /**
     * @param {*} obj The object to encode before storing it.
     * @returns {*} Encoded object.
     */
    encode(obj) {
        return obj.stripDown();
    }

    /**
     * @param {*} obj The object to decode.
     * @param {string} key The object's primary key.
     * @returns {*} Decoded object.
     */
    decode(obj, key) {
        obj._prefix = key; // Restore prefix.
        return AccountsTreeNode.copy(obj);
    }

    /**
     * @type {{encode: function(val:*):*, decode: function(val:*):*, buffer: boolean, type: string}|void}
     */
    get valueEncoding() {
        return JDB.JungleDB.JSON_ENCODING;
    }
}

class AccountsProof {
    /**
     * @param {Array.<AccountsTreeNode>} nodes
     */
    constructor(nodes) {
        if (!nodes || !NumberUtils.isUint16(nodes.length)
            || nodes.some(it => !(it instanceof AccountsTreeNode))) throw 'Malformed nodes';

        /** @type {Array.<AccountsTreeNode>} */
        this._nodes = nodes;
        /** @type {HashMap.<Hash,AccountsTreeNode>} */
        this._index = null;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {AccountsProof}
     */
    static unserialize(buf) {
        const count = buf.readUint16();
        const nodes = [];
        for (let i = 0; i < count; i++) {
            nodes.push(AccountsTreeNode.unserialize(buf));
        }
        return new AccountsProof(nodes);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint16(this._nodes.length);
        for (const node of this._nodes) {
            node.serialize(buf);
        }
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        let size = /*count*/ 2;
        for (const node of this._nodes) {
            size += node.serializedSize;
        }
        return size;
    }

    /**
     * Assumes nodes to be in post order and hashes nodes to check internal consistency of proof.
     * XXX Abuse this method to index the nodes contained in the proof. This forces callers to explicitly verify()
     * the proof before retrieving accounts.
     * @returns {Promise.<boolean>}
     */
    async verify() {
        /** @type {Array.<AccountsTreeNode>} */
        let children = [];
        this._index = new HashMap();
        for (const node of this._nodes) {
            // If node is a branch node, validate its children.
            if (node.isBranch()) {
                for (const child of children) {
                    const hash = await child.hash(); // eslint-disable-line no-await-in-loop
                    // If the child is not valid, return false.
                    if (!node.getChildHash(child.prefix).equals(hash) || node.getChild(child.prefix) !== child.prefix) {
                        return false;
                    }
                    this._index.put(hash, child);
                }
                children = [];
            }

            // Append child.
            children.push(node);
        }

        // The last element must be the root node.
        return children.length === 1 && children[0].prefix === '' && children[0].isBranch();
    }

    /**
     * @param {Address} address
     * @returns {Account}
     */
    getAccount(address) {
        Assert.that(!!this._index, 'AccountsProof must be verified before retrieving accounts. Call verify() first.');

        const rootNode = this._nodes[this._nodes.length - 1];
        const prefix = address.toHex();
        return this._getAccount(rootNode, prefix);
    }

    /**
     * @param {AccountsTreeNode} node
     * @param {string} prefix
     * @returns {Account}
     * @private
     */
    _getAccount(node, prefix) {
        // Find common prefix between node and requested address.
        const commonPrefix = StringUtils.commonPrefix(node.prefix, prefix);

        // If the prefix does not fully match, the requested account does not exist.
        if (commonPrefix.length !== node.prefix.length) return Account.INITIAL;

        // If the remaining address is empty, we have found the requested node.
        if (commonPrefix === prefix) return node.account;

        // Descend into the matching child node if one exists.
        const childKey = node.getChildHash(prefix);
        if (childKey) {
            const childNode = this._index.get(childKey);

            // If the child exists but is not part of the proof, fail.
            if (!childNode) {
                throw new Error('Requested address not part of AccountsProof');
            }

            return this._getAccount(childNode, prefix);
        }

        // No matching child exists, the requested account does not exist.
        return Account.INITIAL;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `AccountsProof{length=${this.length}}`;
    }

    /**
     * @returns {Promise.<Hash>}
     */
    root() {
        return this._nodes[this._nodes.length - 1].hash();
    }

    /** @type {number} */
    get length() {
        return this._nodes.length;
    }

    get nodes() {
        return this._nodes;
    }
}
Class.register(AccountsProof);

class AccountsTreeChunk {
    /**
     * @param {Array.<AccountsTreeNode>} nodes
     * @param {AccountsProof} proof
     */
    constructor(nodes, proof) {
        if (!nodes || !NumberUtils.isUint16(nodes.length)
            || nodes.some(it => !(it instanceof AccountsTreeNode) || !it.isTerminal())) throw 'Malformed nodes';

        /** @type {Array.<AccountsTreeNode>} */
        this._nodes = nodes;
        this._proof = proof;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {AccountsTreeChunk}
     */
    static unserialize(buf) {
        const count = buf.readUint16();
        const nodes = [];
        for (let i = 0; i < count; i++) {
            nodes.push(AccountsTreeNode.unserialize(buf));
        }
        const proof = AccountsProof.unserialize(buf);
        return new AccountsTreeChunk(nodes, proof);
    }

    /**
     * @param {?SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint16(this._nodes.length);
        for (const node of this._nodes) {
            node.serialize(buf);
        }
        this._proof.serialize(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        let size = /*count*/ 2;
        for (const node of this._nodes) {
            size += node.serializedSize;
        }
        size += this._proof.serializedSize;
        return size;
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async verify() {
        if (!(await this._proof.verify())) {
            return false;
        }
        let lastPrefix = null;
        for (let i=0; i<=this._nodes.length; ++i) {
            const node = i < this._nodes.length ? this._nodes[i] : this.tail;
            if (lastPrefix && lastPrefix >= node.prefix) {
                return false;
            }
            lastPrefix = node.prefix;
        }
        return true;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `AccountsTreeChunk{length=${this.length}}`;
    }

    /**
     * @returns {Promise.<Hash>}
     */
    root() {
        return this._proof.root();
    }

    /** @type {Array.<AccountsTreeNode>} */
    get terminalNodes() {
        return this._nodes.concat([this.tail]);
    }

    /** @type {AccountsProof} */
    get proof() {
        return this._proof;
    }

    /** @type {AccountsTreeNode} */
    get head() {
        return this._nodes[0];
    }

    /** @type {AccountsTreeNode} */
    get tail() {
        return this._proof.nodes[0];
    }

    /** @type {number} */
    get length() {
        return this._nodes.length + 1;
    }

    /** @type {boolean} */
    get empty() {
        return this._nodes.length === 0 && this._proof.length === 0;
    }
}
AccountsTreeChunk.SIZE_MAX = 1000;
AccountsTreeChunk.EMPTY = new AccountsTreeChunk([], new AccountsProof([]));
Class.register(AccountsProof);

class AccountsTree extends Observable {
    /**
     * @returns {Promise.<AccountsTree>}
     */
    static async getPersistent(jdb) {
        const store = AccountsTreeStore.getPersistent(jdb);
        const tree = new AccountsTree(store);
        return tree._init();
    }

    /**
     * @returns {Promise.<AccountsTree>}
     */
    static async createVolatile() {
        const store = AccountsTreeStore.createVolatile();
        const tree = new AccountsTree(store);
        return tree._init();
    }

    /**
     * @private
     * @param {AccountsTreeStore} store
     * @returns {AccountsTree}
     */
    constructor(store) {
        super();
        /** @type {AccountsTreeStore} */
        this._store = store;
        this._synchronizer = new Synchronizer();
    }

    /**
     * @returns {Promise.<AccountsTree>}
     * @protected
     */
    async _init() {
        let rootNode = await this._store.getRootNode();
        if (!rootNode) {
            rootNode = AccountsTreeNode.branchNode(/*prefix*/ '', /*childrenSuffixes*/ [], /*childrenHashes*/ []);
            await this._store.put(rootNode);
        }
        return this;
    }

    /**
     * @param {Address} address
     * @param {Account} account
     * @returns {Promise}
     */
    put(address, account) {
        return this._synchronizer.push(() => {
            return this._put(address, account);
        });
    }

    /**
     * @param {Address} address
     * @param {Account} account
     * @returns {Promise}
     * @private
     */
    async _put(address, account) {
        if (Account.INITIAL.equals(account) && !(await this.get(address))) {
            return;
        }

        // Fetch the root node.
        const rootNode = await this._store.getRootNode();
        Assert.that(!!rootNode, 'Corrupted store: Failed to fetch AccountsTree root node');

        // Insert account into the tree at address.
        const prefix = address.toHex();
        await this._insert(rootNode, prefix, account, []);

        // Tell listeners that the account at address has changed.
        this.fire(address.toBase64(), account, address);
    }

    /**
     * @param {AccountsTreeNode} node
     * @param {string} prefix
     * @param {Account} account
     * @param {Array.<AccountsTreeNode>} rootPath
     * @returns {Promise}
     * @private
     */
    async _insert(node, prefix, account, rootPath) {
        // Find common prefix between node and new address.
        const commonPrefix = StringUtils.commonPrefix(node.prefix, prefix);

        // If the node prefix does not fully match the new address, split the node.
        if (commonPrefix.length !== node.prefix.length) {
            // Insert the new account node.
            const newChild = AccountsTreeNode.terminalNode(prefix, account);
            const newChildHash = await newChild.hash();
            await this._store.put(newChild);

            // Insert the new parent node.
            const newParent = AccountsTreeNode.branchNode(commonPrefix)
                .withChild(node.prefix, await node.hash())
                .withChild(newChild.prefix, newChildHash);
            const newParentHash = await newParent.hash();
            await this._store.put(newParent);

            return this._updateKeys(newParent.prefix, newParentHash, rootPath);
        }

        // If the commonPrefix is the specified address, we have found an (existing) node
        // with the given address. Update the account.
        if (commonPrefix === prefix) {
            // XXX How does this generalize to more than one account type?
            // Special case: If the new balance is the initial balance
            // (i.e. balance=0, nonce=0), it is like the account never existed
            // in the first place. Delete the node in this case.
            if (Account.INITIAL.equals(account)) {
                await this._store.remove(node);
                // We have already deleted the node, remove the subtree it was on.
                return this._prune(node.prefix, rootPath);
            }

            // Update the account.
            node = node.withAccount(account);
            const nodeHash = await node.hash();
            await this._store.put(node);

            return this._updateKeys(node.prefix, nodeHash, rootPath);
        }

        // If the node prefix matches and there are address bytes left, descend into
        // the matching child node if one exists.
        const childPrefix = node.getChild(prefix);
        if (childPrefix) {
            const childNode = await this._store.get(childPrefix);
            rootPath.push(node);
            return this._insert(childNode, prefix, account, rootPath);
        }

        // If no matching child exists, add a new child account node to the current node.
        const newChild = AccountsTreeNode.terminalNode(prefix, account);
        const newChildHash = await newChild.hash();
        await this._store.put(newChild);

        node = node.withChild(newChild.prefix, newChildHash);
        const nodeHash = await node.hash();
        await this._store.put(node);

        return this._updateKeys(node.prefix, nodeHash, rootPath);
    }

    /**
     * @param {string} prefix
     * @param {Array.<AccountsTreeNode>} rootPath
     * @returns {Promise}
     * @private
     */
    async _prune(prefix, rootPath) {
        // Walk along the rootPath towards the root node starting with the
        // immediate predecessor of the node specified by 'prefix'.
        let i = rootPath.length - 1;
        for (; i >= 0; --i) {
            let node = rootPath[i];

            node = node.withoutChild(prefix);

            // If the node has only a single child, merge it with the next node.
            if (node.hasSingleChild() && node.prefix !== '') {
                await this._store.remove(node); // eslint-disable-line no-await-in-loop

                const childPrefix = node.getFirstChild();
                const childNode = await this._store.get(childPrefix); // eslint-disable-line no-await-in-loop

                await this._store.put(childNode); // eslint-disable-line no-await-in-loop
                const childHash = await childNode.hash();
                return this._updateKeys(childNode.prefix, childHash, rootPath.slice(0, i));
            }
            // Otherwise, if the node has children left, update it and all keys on the
            // remaining root path. Pruning finished.
            // XXX Special case: We start with an empty root node. Don't delete it.
            else if (node.hasChildren() || node.prefix === '') {
                const nodeHash = await node.hash();
                await this._store.put(node); // eslint-disable-line no-await-in-loop
                return this._updateKeys(node.prefix, nodeHash, rootPath.slice(0, i));
            }

            // The node has no children left, continue pruning.
            prefix = node.prefix;
        }

        // XXX This should never be reached.
        return undefined;
    }

    /**
     * @param {string} prefix
     * @param {Hash} nodeHash
     * @param {Array.<AccountsTreeNode>} rootPath
     * @returns {Promise}
     * @private
     */
    async _updateKeys(prefix, nodeHash, rootPath) {
        // Walk along the rootPath towards the root node starting with the
        // immediate predecessor of the node specified by 'prefix'.
        let i = rootPath.length - 1;
        for (; i >= 0; --i) {
            let node = rootPath[i];

            node = node.withChild(prefix, nodeHash);
            await this._store.put(node); // eslint-disable-line no-await-in-loop
            nodeHash = await node.hash(); // eslint-disable-line no-await-in-loop
            prefix = node.prefix;
        }

        return nodeHash;
    }

    /**
     * @param {Address} address
     * @returns {Promise.<?Account>}
     */
    async get(address) {
        const node = await this._store.get(address.toHex());
        return node !== undefined ? node.account : null;
    }

    /**
     * @param {Array.<Address>} addresses
     * @returns {Promise.<AccountsProof>}
     */
    async getAccountsProof(addresses) {
        const rootNode = await this._store.getRootNode();
        Assert.that(!!rootNode, 'Corrupted store: Failed to fetch AccountsTree root node');

        const prefixes = [];
        for (const address of addresses) {
            prefixes.push(address.toHex());
        }
        // We sort the addresses to simplify traversal in post order (leftmost addresses first).
        prefixes.sort();

        const nodes = [];
        await this._getAccountsProof(rootNode, prefixes, nodes);
        return new AccountsProof(nodes);
    }

    /**
     * Constructs the accounts proof in post-order.
     * @param {AccountsTreeNode} node
     * @param {Array.<string>} prefixes
     * @param {Array.<AccountsTreeNode>} nodes
     * @returns {Promise.<*>}
     * @private
     */
    async _getAccountsProof(node, prefixes, nodes) {
        // For each prefix, descend the tree individually.
        let includeNode = false;
        for (let i = 0; i < prefixes.length; ) {
            let prefix = prefixes[i];

            // Find common prefix between node and the current requested prefix.
            const commonPrefix = StringUtils.commonPrefix(node.prefix, prefix);

            // If the prefix fully matches, we have found the requested node.
            // If the prefix does not fully match, the requested address is not part of this node.
            // Include the node in the proof nevertheless to prove that the account doesn't exist.
            if (commonPrefix.length !== node.prefix.length || node.prefix === prefix) {
                includeNode = true;
                i++;
                continue;
            }

            // Descend into the matching child node if one exists.
            const childKey = node.getChild(prefix);
            if (childKey) {
                const childNode = await this._store.get(childKey); // eslint-disable-line no-await-in-loop

                // Group addresses with same prefix:
                // Because of our ordering, they have to be located next to the current prefix.
                // Hence, we iterate over the next prefixes, until we don't find commonalities anymore.
                // In the next main iteration we can skip those we already requested here.
                const subPrefixes = [prefix];
                // Find other prefixes to descend into this tree as well.
                let j = i + 1;
                for (; j < prefixes.length; ++j) {
                    // Since we ordered prefixes, there can't be any other prefixes with commonalities.
                    if (!prefixes[j].startsWith(childNode.prefix)) break;
                    // But if there is a commonality, add it to the list.
                    subPrefixes.push(prefixes[j]);
                }
                // Now j is the last index which doesn't have commonalities,
                // we continue from there in the next iteration.
                i = j;

                includeNode = (await this._getAccountsProof(childNode, subPrefixes, nodes)) || includeNode; // eslint-disable-line no-await-in-loop
            }
            // No child node exists with the requested prefix. Include the current node to prove the absence of the requested account.
            else {
                includeNode = true;
                i++;
            }
        }

        // If this branch contained at least one account, we add this node.
        if (includeNode) {
            nodes.push(node);
        }

        return includeNode;
    }

    /**
     * @param {string} startPrefix The prefix to start with.
     * @param {number} size The maximum number of terminal nodes to include.
     * @returns {Promise.<AccountsTreeChunk>}
     */
    async getChunk(startPrefix, size) {
        const chunk = await this._store.getTerminalNodes(startPrefix, size);
        const lastNode = chunk.pop();
        const proof = await this.getAccountsProof([Address.fromHex(lastNode.prefix)]);
        return new AccountsTreeChunk(chunk, proof);
    }

    /**
     * @param {boolean} [enableWatchdog}
     * @returns {Promise.<AccountsTree>}
     */
    transaction(enableWatchdog = true) {
        const tree = new AccountsTree(this._store.transaction(enableWatchdog));
        return tree._init();
    }

    /**
     * @returns {Promise.<PartialAccountsTree>}
     */
    async partialTree() {
        const tx = this._store.transaction();
        await tx.truncate();
        const tree = new PartialAccountsTree(tx);
        return tree._init();
    }

    /**
     * @returns {Promise.<AccountsTree>}
     */
    snapshot() {
        const tree = new AccountsTree(this._store.snapshot());
        return tree._init();
    }

    /**
     * @returns {Promise}
     */
    commit() {
        return this._store.commit();
    }

    /**
     * @returns {Promise}
     */
    abort() {
        return this._store.abort();
    }

    /**
     * @returns {Promise.<Hash>}
     */
    async root() {
        const rootNode = await this._store.getRootNode();
        return rootNode && rootNode.hash();
    }
}
Class.register(AccountsTree);


class PartialAccountsTree extends AccountsTree {
    /**
     * @private
     * @param {AccountsTreeStore} store
     */
    constructor(store) {
        super(store);
        this._complete = false;
        /** @type {string} */
        this._lastPrefix = '';
    }

    /**
     * @param {AccountsTreeChunk} chunk
     * @returns {Promise}
     */
    async pushChunk(chunk) {
        // First verify the proof.
        if (!(await chunk.verify())) {
            return PartialAccountsTree.ERR_INCORRECT_PROOF;
        }

        const tx = await this.transaction();
        // Then apply all
        await tx._putLight(chunk.terminalNodes);


        // Check if proof can be merged.
        if (!(await tx._mergeProof(chunk.proof, chunk.tail.prefix))) {
            await tx.abort();
            return PartialAccountsTree.ERR_UNMERGEABLE;
        }
        this._complete = tx.complete;

        // Now, we can put all nodes into the store.
        await tx.commit();

        // Update last prefix.
        this._lastPrefix = chunk.tail.prefix;

        // And return OK code depending on internal state.
        return this._complete ? PartialAccountsTree.OK_COMPLETE : PartialAccountsTree.OK_UNFINISHED;
    }

    /**
     * @param {AccountsProof} proof
     * @param {string} upperBound
     * @returns {Promise.<boolean>}
     * @private
     */
    async _mergeProof(proof, upperBound) {
        // Retrieve rightmost path of the in-memory tree.
        let node = await this._store.getRootNode();
        let nodeChildren = node.getChildren();
        let complete = true;

        // Iterate over the proof and check for consistency.
        let j = proof.length - 1;
        for (; j > 0; --j) {
            const proofNode = proof.nodes[j];
            // The node's prefix might be shorter than the proof node's prefix if it is a newly
            // introduces node in the proof.
            if (StringUtils.commonPrefix(node.prefix, proofNode.prefix) !== node.prefix) {
                return false;
            }

            const proofChildren = proofNode.getChildren();

            // The tree node may not have more children than the proof node.
            if (nodeChildren.length > proofChildren.length) {
                return false;
            }

            // The nextChild we descend to.
            const nextChild = node.getLastChild();
            let insertedNode = false;

            // There are three cases:
            // 1) the child is in our inner tree (so between lower and upper bound), then the hashes must coincide.
            // 2) the child is left of our chunk, so it must be in the store.
            // 3) the child is right of our chunk, so it is a dangling reference.
            let i = 0;
            for (const proofChild of proofChildren) {
                const upperBoundPrefix = upperBound.substr(0, proofChild.length);
                if (proofChild <= upperBoundPrefix) {
                    // An inner node.
                    const child = nodeChildren.shift();

                    // This is the next child.
                    if (StringUtils.commonPrefix(nextChild, proofChild) === proofChild) {
                        // If it is a real prefix of the next child, we have inserted a new node.
                        if (proofChild !== nextChild) {
                            insertedNode = true;
                        }
                        continue;
                    }

                    if (child !== proofChild) {
                        return false;
                    }
                    // The child is equal and not the next child, so the hash must coincide.
                    const nodeHash = node.getChildHash(child);
                    const proofHash = proofNode.getChildHash(child);
                    if (!nodeHash || !proofHash || !nodeHash.equals(proofHash)) {
                        return false;
                    }
                } else {
                    // The others may be dangling references.
                    break;
                }
                ++i;
            }

            // We must have consumed all children!
            if (nodeChildren.length !== 0) {
                return false;
            }

            // If not all of the proof children have been tested, we are definitely incomplete.
            complete = complete && (i === proofChildren.length - 1);

            // If the prefix was the same, we can move on.
            if (insertedNode) {
                nodeChildren = [nextChild];
            } else {
                // We should never end here with a terminal node.
                if (node.isTerminal()) {
                    return false;
                }
                node = await this._store.get(node.getLastChild());
                nodeChildren = node.getChildren();
                if (node.isTerminal()) {
                    break;
                }
            }
        }

        // Check the terminal nodes.
        if (!node.equals(proof.nodes[0])) {
            return false;
        }

        this._complete = complete;
        return true;
    }

    /**
     * @param {Array.<AccountsTreeNode>} nodes
     * @returns {Promise}
     * @private
     */
    async _putLight(nodes) {
        Assert.that(nodes.every(node => node.isTerminal()), 'Can only build tree from terminal nodes');

        // Fetch the root node.
        let rootNode = await this._store.getRootNode();
        Assert.that(!!rootNode, 'Corrupted store: Failed to fetch AccountsTree root node');

        // TODO: Bulk insertion instead of sequential insertion!
        for (const node of nodes) {
            await this._insertLight(rootNode, node.prefix, node.account, []);
            rootNode = await this._store.getRootNode();
            Assert.that(!!rootNode, 'Corrupted store: Failed to fetch AccountsTree root node');
        }
        await this._updateHashes(rootNode);
    }

    /**
     * This is basically a version of the standard insert method
     * that uses empty hashes instead of hashing the nodes.
     * Hashes are only done once at the end.
     * @param {AccountsTreeNode} node
     * @param {string} prefix
     * @param {Account} account
     * @param {Array.<AccountsTreeNode>} rootPath
     * @returns {Promise}
     * @private
     */
    async _insertLight(node, prefix, account, rootPath) {
        // Find common prefix between node and new address.
        const commonPrefix = StringUtils.commonPrefix(node.prefix, prefix);

        // If the node prefix does not fully match the new address, split the node.
        if (commonPrefix.length !== node.prefix.length) {
            // Insert the new account node.
            const newChild = AccountsTreeNode.terminalNode(prefix, account);
            await this._store.put(newChild);

            // Insert the new parent node.
            const newParent = AccountsTreeNode.branchNode(commonPrefix)
                .withChild(node.prefix, new Hash(null))
                .withChild(newChild.prefix, new Hash(null));
            await this._store.put(newParent);

            return this._updateKeysLight(newParent.prefix, rootPath);
        }

        // If the commonPrefix is the specified address, we have found an (existing) node
        // with the given address. Update the account.
        if (commonPrefix === prefix) {
            // Update the account.
            node = node.withAccount(account);
            await this._store.put(node);

            return this._updateKeysLight(node.prefix, rootPath);
        }

        // If the node prefix matches and there are address bytes left, descend into
        // the matching child node if one exists.
        const childPrefix = node.getChild(prefix);
        if (childPrefix) {
            const childNode = await this._store.get(childPrefix);
            rootPath.push(node);
            return this._insertLight(childNode, prefix, account, rootPath);
        }

        // If no matching child exists, add a new child account node to the current node.
        const newChild = AccountsTreeNode.terminalNode(prefix, account);
        await this._store.put(newChild);

        node = node.withChild(newChild.prefix, new Hash(null));
        await this._store.put(node);

        return this._updateKeysLight(node.prefix, rootPath);
    }

    /**
     * This is a modified version that does not hash nodes.
     * @param {string} prefix
     * @param {Array.<AccountsTreeNode>} rootPath
     * @returns {Promise}
     * @private
     */
    async _updateKeysLight(prefix, rootPath) {
        // Walk along the rootPath towards the root node starting with the
        // immediate predecessor of the node specified by 'prefix'.
        let i = rootPath.length - 1;
        for (; i >= 0; --i) {
            let node = rootPath[i];

            node = node.withChild(prefix, new Hash(null));
            await this._store.put(node); // eslint-disable-line no-await-in-loop
            prefix = node.prefix;
        }
    }

    /**
     * This method updates all empty hashes (and only such).
     * @param {AccountsTreeNode} node
     * @private
     */
    async _updateHashes(node) {
        if (node.isTerminal()) {
            return node.hash();
        }
        // Compute sub hashes if necessary.
        const subHashes = await Promise.all(node.getChildren().map(async child => {
            const currentHash = node.getChildHash(child);
            if (!currentHash.equals(new Hash(null))) {
                return currentHash;
            }
            const childNode = await this._store.get(child);
            return this._updateHashes(childNode);
        }));
        // Then prepare new node and update.
        let newNode = node;
        node.getChildren().forEach((child, i) => {
            newNode = newNode.withChild(child, subHashes[i]);
        });
        await this._store.put(newNode);
        return newNode.hash();
    }

    /** @type {boolean} */
    get complete() {
        return this._complete;
    }

    /** @type {string} */
    get missingPrefix() {
        return this._lastPrefix;
    }

    /**
     * @returns {Promise.<PartialAccountsTree>}
     */
    transaction() {
        const tree = new PartialAccountsTree(this._store.transaction());
        return tree._init();
    }

    /**
     * @returns {Promise}
     */
    commit() {
        return this._store.commit();
    }

    /**
     * @returns {Promise}
     */
    abort() {
        return this._store.abort();
    }
}
PartialAccountsTree.ERR_HASH_MISMATCH = -3;
PartialAccountsTree.ERR_INCORRECT_PROOF = -2;
PartialAccountsTree.ERR_UNMERGEABLE = -1;
PartialAccountsTree.OK_COMPLETE = 0;
PartialAccountsTree.OK_UNFINISHED = 1;
Class.register(PartialAccountsTree);


class Accounts extends Observable {
    /**
     * Generate an Accounts object that is persisted to the local storage.
     * @returns {Promise.<Accounts>} Accounts object
     */
    static async getPersistent(jdb) {
        const tree = await AccountsTree.getPersistent(jdb);
        return new Accounts(tree);
    }

    /**
     * Generate an Accounts object that loses it's data after usage.
     * @returns {Promise.<Accounts>} Accounts object
     */
    static async createVolatile() {
        const tree = await AccountsTree.createVolatile();
        return new Accounts(tree);
    }

    /**
     * @param {AccountsTree} accountsTree
     */
    constructor(accountsTree) {
        super();
        this._tree = accountsTree;

        // Forward balance change events to listeners registered on this Observable.
        this.bubble(this._tree, '*');
    }

    async populate(nodes) {
        // To make sure we have a single transaction, we use a Temporary Tree during populate and commit that.
        const tx = await this._tree.transaction();
        await tx.populate(nodes);
        if (await tx.verify()) {
            await tx.commit();
            this.fire('populated');
            return true;
        } else {
            await tx.abort();
            return false;
        }
    }

    /**
     * @param {Array.<Address>} addresses
     * @returns {Promise.<AccountsProof>}
     */
    getAccountsProof(addresses) {
        return this._tree.getAccountsProof(addresses);
    }

    /**
     * @param {Hash} blockHash
     * @param {string} startPrefix
     * @returns {Promise.<AccountsTreeChunk>}
     */
    async getAccountsTreeChunk(startPrefix) {
        return this._tree.getChunk(startPrefix, AccountsTreeChunk.SIZE_MAX);
    }

    /**
     * @param {Block} block
     * @return {Promise}
     */
    async commitBlock(block) {
        const tree = await this._tree.transaction();
        try {
            await this._execute(tree, block.body, (a, b) => a + b);
        } catch (e) {
            await tree.abort();
            throw e;
        }

        const hash = await tree.root();
        if (!block.accountsHash.equals(hash)) {
            await tree.abort();
            throw new Error('Failed to commit block - AccountsHash mismatch');
        }
        return tree.commit();
    }

    /**
     * @param {BlockBody} body
     * @return {Promise}
     */
    async commitBlockBody(body) {
        const tree = await this._tree.transaction();
        try {
            await this._execute(tree, body, (a, b) => a + b);
        } catch (e) {
            await tree.abort();
            throw e;
        }
        return tree.commit();
    }

    /**
     * @param {Block} block
     * @return {Promise}
     */
    async revertBlock(block) {
        if (!block) throw new Error('block undefined');

        const hash = await this._tree.root();
        if (!block.accountsHash.equals(hash)) {
            throw new Error('Failed to revert block - AccountsHash mismatch');
        }
        return this.revertBlockBody(block.body);
    }

    /**
     * @param {BlockBody} body
     * @return {Promise}
     */
    async revertBlockBody(body) {
        const tree = await this._tree.transaction();
        try {
            await this._execute(tree, body, (a, b) => a - b);
        } catch (e) {
            await tree.abort();
            throw e;
        }
        return tree.commit();
    }

    /**
     * Gets the current balance of an account.
     *
     * We only support basic accounts at this time.
     * @param {Address} address Address of the account to query.
     * @param {AccountsTree} [tree] AccountsTree or transaction to read from.
     * @return {Promise.<Balance>} Current Balance of given address.
     */
    async getBalance(address, tree = this._tree) {
        const account = await tree.get(address);
        if (account) {
            return account.balance;
        } else {
            return Account.INITIAL.balance;
        }
    }

    /**
     * @param {boolean} [enableWatchdog}
     * @returns {Promise.<Accounts>}
     */
    async transaction(enableWatchdog = true) {
        return new Accounts(await this._tree.transaction(enableWatchdog));
    }

    /**
     * @returns {Promise.<Accounts>}
     */
    async snapshot() {
        return new Accounts(await this._tree.snapshot());
    }

    /**
     * @returns {Promise.<PartialAccountsTree>}
     */
    async partialAccountsTree() {
        return this._tree.partialTree();
    }

    /**
     * @returns {Promise}
     */
    commit() {
        return this._tree.commit();
    }

    /**
     * @returns {Promise}
     */
    abort() {
        return this._tree.abort();
    }

    /**
     * @param {AccountsTree} tree
     * @param {BlockBody} body
     * @param {Function} operator
     * @return {Promise.<void>}
     * @private
     */
    async _execute(tree, body, operator) {
        await this._executeTransactions(tree, body, operator);
        await this._rewardMiner(tree, body, operator);
    }

    /**
     * @param {AccountsTree} tree
     * @param {BlockBody} body
     * @param {Function} op
     * @return {Promise.<void>}
     * @private
     */
    async _rewardMiner(tree, body, op) {
        // Sum up transaction fees.
        const txFees = body.transactions.reduce((sum, tx) => sum + tx.fee, 0);
        await this._updateBalance(tree, body.minerAddr, txFees + Policy.BLOCK_REWARD, op);
    }

    /**
     * @param {AccountsTree} tree
     * @param {BlockBody} body
     * @param {Function} op
     * @return {Promise.<void>}
     * @private
     */
    async _executeTransactions(tree, body, op) {
        for (const tx of body.transactions) {
            await this._executeTransaction(tree, tx, op); // eslint-disable-line no-await-in-loop
        }
    }
    async _executeTransaction(tree, tx, op) {
        await this._updateSender(tree, tx, op);
        await this._updateRecipient(tree, tx, op);
    }

    async _updateSender(tree, tx, op) {
        const addr = await tx.getSenderAddr();
        await this._updateBalance(tree, addr, -tx.value - tx.fee, op);
    }

    async _updateRecipient(tree, tx, op) {
        await this._updateBalance(tree, tx.recipientAddr, tx.value, op);
    }

    async _updateBalance(tree, address, value, operator) {
        const balance = await this.getBalance(address, tree);

        const newValue = operator(balance.value, value);
        if (newValue < 0) {
            throw new Error('Balance Error!');
        }

        const newNonce = value < 0 ? operator(balance.nonce, 1) : balance.nonce;
        if (newNonce < 0) {
            throw new Error('Nonce Error!');
        }

        const newBalance = new Balance(newValue, newNonce);
        const newAccount = new Account(newBalance);
        await tree.put(address, newAccount);
    }

    /**
     * @returns {Promise.<Hash>}
     */
    hash() {
        return this._tree.root();
    }
}
Accounts.EMPTY_TREE_HASH = Hash.fromBase64('cJ6AyISHokEeHuTfufIqhhSS0gxHZRUMDHlKvXD4FHw=');
Class.register(Accounts);

class BlockHeader {
    /**
     * @param {{_version, _prevHash, _interlinkHash, _bodyHash, _accountsHash, _nBits, _height, _timestamp, _nonce}} o
     * @returns {BlockHeader}
     */
    static copy(o) {
        if (!o) return o;
        const prevHash = Hash.copy(o._prevHash);
        const interlinkHash = Hash.copy(o._interlinkHash);
        const bodyHash = Hash.copy(o._bodyHash);
        const accountsHash = Hash.copy(o._accountsHash);
        return new BlockHeader(
            prevHash, interlinkHash, bodyHash, accountsHash,
            o._nBits, o._height, o._timestamp, o._nonce, o._version
        );
    }

    /**
     * @param {Hash} prevHash
     * @param {Hash} interlinkHash
     * @param {Hash} bodyHash
     * @param {Hash} accountsHash
     * @param {number} nBits
     * @param {number} height
     * @param {number} timestamp
     * @param {number} nonce
     * @param {number} version
     */
    constructor(prevHash, interlinkHash, bodyHash, accountsHash, nBits, height, timestamp, nonce, version = BlockHeader.CURRENT_VERSION) {
        if (!NumberUtils.isUint16(version)) throw 'Malformed version';
        if (!Hash.isHash(prevHash)) throw 'Malformed prevHash';
        if (!Hash.isHash(interlinkHash)) throw 'Malformed interlinkHash';
        if (!Hash.isHash(bodyHash)) throw 'Malformed bodyHash';
        if (!Hash.isHash(accountsHash)) throw 'Malformed accountsHash';
        if (!NumberUtils.isUint32(nBits) || !BlockUtils.isValidCompact(nBits)) throw 'Malformed nBits';
        if (!NumberUtils.isUint32(height)) throw 'Invalid height';
        if (!NumberUtils.isUint32(timestamp)) throw 'Malformed timestamp';
        if (!NumberUtils.isUint64(nonce)) throw 'Malformed nonce';

        /** @type {number} */
        this._version = version;
        /** @type {Hash} */
        this._prevHash = prevHash;
        /** @type {Hash} */
        this._interlinkHash = interlinkHash;
        /** @type {Hash} */
        this._bodyHash = bodyHash;
        /** @type {Hash} */
        this._accountsHash = accountsHash;
        /** @type {number} */
        this._nBits = nBits;
        /** @type {number} */
        this._height = height;
        /** @type {number} */
        this._timestamp = timestamp;
        /** @type {number} */
        this._nonce = nonce;
    }

    static unserialize(buf) {
        const version = buf.readUint16();
        if (!BlockHeader.SUPPORTED_VERSIONS.includes(version)) throw 'Block version unsupported';
        const prevHash = Hash.unserialize(buf);
        const interlinkHash = Hash.unserialize(buf);
        const bodyHash = Hash.unserialize(buf);
        const accountsHash = Hash.unserialize(buf);
        const nBits = buf.readUint32();
        const height = buf.readUint32();
        const timestamp = buf.readUint32();
        const nonce = buf.readUint64();
        return new BlockHeader(prevHash, interlinkHash, bodyHash, accountsHash, nBits, height, timestamp, nonce, version);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint16(this._version);
        this._prevHash.serialize(buf);
        this._interlinkHash.serialize(buf);
        this._bodyHash.serialize(buf);
        this._accountsHash.serialize(buf);
        buf.writeUint32(this._nBits);
        buf.writeUint32(this._height);
        buf.writeUint32(this._timestamp);
        buf.writeUint64(this._nonce);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return /*version*/ 2
            + this._prevHash.serializedSize
            + this._interlinkHash.serializedSize
            + this._bodyHash.serializedSize
            + this._accountsHash.serializedSize
            + /*nBits*/ 4
            + /*height*/ 4
            + /*timestamp*/ 4
            + /*nonce*/ 8;
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {Promise.<boolean>}
     */
    async verifyProofOfWork(buf) {
        const pow = await this.pow(buf);
        return BlockUtils.isProofOfWork(pow, this.target);
    }

    /**
     * @param {BlockHeader} prevHeader
     * @returns {Promise.<boolean>}
     */
    async isImmediateSuccessorOf(prevHeader) {
        // Check that the height is one higher than the previous height.
        if (this.height !== prevHeader.height + 1) {
            return false;
        }

        // Check that the timestamp is greater or equal to the predecessor's timestamp.
        if (this.timestamp < prevHeader.timestamp) {
            return false;
        }

        // Check that the hash of the predecessor block equals prevHash.
        const prevHash = await prevHeader.hash();
        if (!this.prevHash.equals(prevHash)) {
            return false;
        }

        // Check that the target adjustment between the blocks does not exceed the theoretical limit.
        const adjustmentFactor = this.target / prevHeader.target;
        if (adjustmentFactor > Policy.DIFFICULTY_MAX_ADJUSTMENT_FACTOR
            || adjustmentFactor < 1 / Policy.DIFFICULTY_MAX_ADJUSTMENT_FACTOR) {
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {Promise.<Hash>}
     */
    async hash(buf) {
        this._hash = this._hash || await Hash.light(this.serialize(buf));
        return this._hash;
    }
    
    /**
     * @param {SerialBuffer} [buf]
     * @return {Promise.<Hash>}
     */
    async pow(buf) {
        this._pow = this._pow || await Hash.hard(this.serialize(buf));
        return this._pow;
    }

    /**
     * @param {BlockHeader|*} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof BlockHeader
            && this._prevHash.equals(o.prevHash)
            && this._interlinkHash.equals(o.interlinkHash)
            && this._bodyHash.equals(o.bodyHash)
            && this._accountsHash.equals(o.accountsHash)
            && this._nBits === o.nBits
            && this._height === o.height
            && this._timestamp === o.timestamp
            && this._nonce === o.nonce;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `BlockHeader{`
            + `prevHash=${this._prevHash}, `
            + `interlinkHash=${this._interlinkHash}, `
            + `bodyHash=${this._bodyHash}, `
            + `accountsHash=${this._accountsHash}, `
            + `nBits=${this._nBits.toString(16)}, `
            + `height=${this._height}, `
            + `timestamp=${this._timestamp}, `
            + `nonce=${this._nonce}`
            + `}`;
    }

    /** @type {Hash} */
    get prevHash() {
        return this._prevHash;
    }

    /** @type {Hash} */
    get interlinkHash() {
        return this._interlinkHash;
    }

    /** @type {Hash} */
    get bodyHash() {
        return this._bodyHash;
    }

    /** @type {Hash} */
    get accountsHash() {
        return this._accountsHash;
    }

    /** @type {number} */
    get nBits() {
        return this._nBits;
    }

    /** @type {number} */
    get target() {
        return BlockUtils.compactToTarget(this._nBits);
    }

    /** @type {number} */
    get difficulty() {
        return BlockUtils.compactToDifficulty(this._nBits);
    }

    /** @type {number} */
    get height() {
        return this._height;
    }

    /** @type {number} */
    get timestamp() {
        return this._timestamp;
    }

    /** @type {number} */
    get nonce() {
        return this._nonce;
    }

    // XXX The miner changes the nonce of an existing BlockHeader during the
    // mining process.
    /** @type {number} */
    set nonce(n) {
        this._nonce = n;
        this._hash = null;
        this._pow = null;
    }
}
BlockHeader.CURRENT_VERSION = 1;
BlockHeader.SUPPORTED_VERSIONS = [1];
Class.register(BlockHeader);

class BlockInterlink {
    /**
     * @param {{_hashes}} o
     * @returns {BlockInterlink}
     */
    static copy(o) {
        if (!o) return o;
        const hashes = o._hashes.map(it => Hash.copy(it));
        return new BlockInterlink(hashes);
    }

    /**
     * @param {Array.<Hash>} blockHashes
     */
    constructor(blockHashes) {
        if (!blockHashes || blockHashes.some(it => !(it instanceof Hash))) throw 'Malformed blockHashes';
        /** @type {Array.<Hash>} */
        this._hashes = blockHashes;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {BlockInterlink}
     */
    static unserialize(buf) {
        const count = buf.readUint8();
        const hashes = [];
        for (let i = 0; i < count; i++) {
            hashes.push(Hash.unserialize(buf));
        }
        return new BlockInterlink(hashes);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint8(this._hashes.length);
        for (const hash of this._hashes) {
            hash.serialize(buf);
        }
        return buf;
    }

    /**
     * @type {number}
     */
    get serializedSize() {
        let size = /*count*/ 1;
        for (const hash of this._hashes) {
            size += hash.serializedSize;
        }
        return size;
    }

    /**
     * @param {BlockInterlink|*} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof BlockInterlink
            && this._hashes.length === o._hashes.length
            && this._hashes.every((hash, i) => hash.equals(o.hashes[i]));
    }

    /**
     * @returns {Promise.<Hash>}
     */
    hash() {
        return MerkleTree.computeRoot(this._hashes);
    }

    /**
     * @type {Array.<Hash>}
     */
    get hashes() {
        return this._hashes;
    }

    /**
     * @type {number}
     */
    get length() {
        return this._hashes.length;
    }
}
Class.register(BlockInterlink);

class BlockBody {
    /**
     * @param {{_minerAddr, _transactions}} o
     * @returns {BlockBody}
     */
    static copy(o) {
        if (!o) return o;
        const minerAddr = Address.copy(o._minerAddr);
        const transactions = o._transactions.map(it => Transaction.copy(it));
        return new BlockBody(minerAddr, transactions);
    }

    /**
     * @param {Address} minerAddr
     * @param {Array.<Transaction>} transactions
     */
    constructor(minerAddr, transactions) {
        if (!(minerAddr instanceof Address)) throw 'Malformed minerAddr';
        if (!transactions || transactions.some(it => !(it instanceof Transaction))) throw 'Malformed transactions';
        /** @type {Address} */
        this._minerAddr = minerAddr;
        /** @type {Array.<Transaction>} */
        this._transactions = transactions;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {BlockBody}
     */
    static unserialize(buf) {
        const minerAddr = Address.unserialize(buf);
        const numTransactions = buf.readUint16();
        const transactions = new Array(numTransactions);
        for (let i = 0; i < numTransactions; i++) {
            transactions[i] = Transaction.unserialize(buf);
        }
        return new BlockBody(minerAddr, transactions);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this._minerAddr.serialize(buf);
        buf.writeUint16(this._transactions.length);
        for (let tx of this._transactions) {
            tx.serialize(buf);
        }
        return buf;
    }

    /**
     * @type {number}
     */
    get serializedSize() {
        let size = this._minerAddr.serializedSize
            + /*transactionsLength*/ 2;
        for (const tx of this._transactions) {
            size += tx.serializedSize;
        }
        return size;
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async verify() {
        const senderPubKeys = {};
        for (const tx of this._transactions) {
            // Check that there is only one transaction per sender.
            if (senderPubKeys[tx.senderPubKey]) {
                Log.w(BlockBody, 'Invalid block - more than one transaction per sender');
                return false;
            }
            senderPubKeys[tx.senderPubKey] = true;

            // Check that there are no transactions to oneself.
            const txSenderAddr = await tx.getSenderAddr(); // eslint-disable-line no-await-in-loop
            if (tx.recipientAddr.equals(txSenderAddr)) {
                Log.w(BlockBody, 'Invalid block - sender and recipient coincide');
                return false;
            }

            // Check that all transaction signatures are valid.
            if (!(await tx.verifySignature())) { // eslint-disable-line no-await-in-loop
                Log.w(BlockBody, 'Invalid block - invalid transaction signature');
                return false;
            }
        }

        // Everything checks out.
        return true;
    }

    /**
     * @return {Promise.<Hash>}
     */
    hash() {
        const fnHash = value => value.hash ?
            /*transaction*/ value.hash() : /*miner address*/ Hash.light(value.serialize());
        return MerkleTree.computeRoot([this._minerAddr, ...this._transactions], fnHash);
    }

    equals(o) {
        return o instanceof BlockBody
            && this._minerAddr.equals(o.minerAddr)
            && this._transactions.every((tx, i) => tx.equals(o.transactions[i]));
    }

    /** @type {Address} */
    get minerAddr() {
        return this._minerAddr;
    }

    /** @type {Array.<Transaction>} */
    get transactions() {
        return this._transactions;
    }

    /** @type {number} */
    get transactionCount() {
        return this._transactions.length;
    }
}
Class.register(BlockBody);

class BlockUtils {
    /**
     * @param {number} compact
     * @returns {number}
     */
    static compactToTarget(compact) {
        return (compact & 0xffffff) * Math.pow(2, (8 * ((compact >> 24) - 3)));
    }

    /**
     * @param {number} target
     * @returns {number}
     */
    static targetToCompact(target) {
        if (!Number.isFinite(target) || Number.isNaN(target)) throw 'Invalid Target';

        // Divide to get first byte
        let size = Math.max(Math.ceil(Math.log2(target) / 8), 1);
        const firstByte = target / Math.pow(2, (size - 1) * 8);

        // If the first (most significant) byte is greater than 127 (0x7f),
        // prepend a zero byte.
        if (firstByte >= 0x80) {
            size++;
        }

        // The first byte of the 'compact' format is the number of bytes,
        // including the prepended zero if it's present.
        // The following three bytes are the first three bytes of the above
        // representation. If less than three bytes are present, then one or
        // more of the last bytes of the compact representation will be zero.
        return (size << 24) + ((target / Math.pow(2, (size - 3) * 8)) & 0xffffff);
    }

    /**
     * @param {number} target
     * @returns {number}
     */
    static getTargetHeight(target) {
        return Math.ceil(Math.log2(target));
    }

    /**
     * @param {number} target
     * @returns {number}
     */
    static getTargetDepth(target) {
        return BlockUtils.getTargetHeight(Policy.BLOCK_TARGET_MAX) - BlockUtils.getTargetHeight(target);
    }

    /**
     * @param {number} compact
     * @returns {number}
     */
    static compactToDifficulty(compact) {
        return Policy.BLOCK_TARGET_MAX / BlockUtils.compactToTarget(compact);
    }

    /**
     * @param {number} difficulty
     * @returns {number}
     */
    static difficultyToCompact(difficulty) {
        return BlockUtils.targetToCompact(BlockUtils.difficultyToTarget(difficulty));
    }

    /**
     * @param {number} difficulty
     * @returns {number}
     */
    static difficultyToTarget(difficulty) {
        return Policy.BLOCK_TARGET_MAX / difficulty;
    }

    /**
     * @param {number} target
     * @returns {number}
     */
    static targetToDifficulty(target) {
        return Policy.BLOCK_TARGET_MAX / target;
    }

    /**
     * @param {Hash} hash
     * @returns {number}
     */
    static hashToTarget(hash) {
        return parseInt(hash.toHex(), 16);
    }

    /**
     * @param {Hash} hash
     * @returns {number}
     */
    static realDifficulty(hash) {
        return BlockUtils.targetToDifficulty(BlockUtils.hashToTarget(hash));
    }

    /**
     * @param {Hash} hash
     * @param {number} target
     * @returns {boolean}
     */
    static isProofOfWork(hash, target) {
        return parseInt(hash.toHex(), 16) <= target;
    }

    /**
     * @param {number} compact
     * @returns {boolean}
     */

    static isValidCompact(compact) {
        return BlockUtils.isValidTarget(BlockUtils.compactToTarget(compact));
    }

    /**
     * @param {number} target
     * @returns {boolean}
     */
    static isValidTarget(target) {
        return target >= 1 && target <= Policy.BLOCK_TARGET_MAX;
    }

    /**
     * @param {BlockHeader} headBlock
     * @param {BlockHeader} tailBlock
     * @returns {number}
     */
    static getNextTarget(headBlock, tailBlock) {
        Assert.that((headBlock.height - tailBlock.height === Policy.DIFFICULTY_BLOCK_WINDOW)
            || (headBlock.height <= Policy.DIFFICULTY_BLOCK_WINDOW && tailBlock.height === 1),
            `Tail and head block must be ${Policy.DIFFICULTY_BLOCK_WINDOW} blocks apart`);

        let actualTime = headBlock.timestamp - tailBlock.timestamp;

        // Simulate that the Policy.BLOCK_TIME was achieved for the blocks before the genesis block, i.e. we simulate
        // a sliding window that starts before the genesis block.
        if (headBlock.height <= Policy.DIFFICULTY_BLOCK_WINDOW) {
            actualTime += (Policy.DIFFICULTY_BLOCK_WINDOW - headBlock.height + 1) * Policy.BLOCK_TIME;
        }

        // Compute the target adjustment factor.
        const expectedTime = Policy.DIFFICULTY_BLOCK_WINDOW * Policy.BLOCK_TIME;
        let adjustment = actualTime / expectedTime;

        // Dampen the adjustment.
        adjustment = (adjustment - 1) * 0.5 + 1;

        // Clamp the adjustment factor to [1 / MAX_ADJUSTMENT_FACTOR, MAX_ADJUSTMENT_FACTOR].
        adjustment = Math.max(adjustment, 1 / Policy.DIFFICULTY_MAX_ADJUSTMENT_FACTOR);
        adjustment = Math.min(adjustment, Policy.DIFFICULTY_MAX_ADJUSTMENT_FACTOR);

        // Compute the next target.
        const currentTarget = headBlock.target;
        let nextTarget = currentTarget * adjustment;

        // Make sure the target is below or equal the maximum allowed target (difficulty 1).
        // Also enforce a minimum target of 1.
        nextTarget = Math.min(nextTarget, Policy.BLOCK_TARGET_MAX);
        nextTarget = Math.max(nextTarget, 1);

        return nextTarget;
    }
}
Class.register(BlockUtils);

// TODO V2: Transactions may contain a payment reference such that the chain can prove existence of data
// TODO V2: Copy 'serialized' to detach all outer references
class Transaction {

    /**
     * @param {{_version, _senderPubKey, _recipientAddr, _value, _fee, _nonce, _signature}} o
     * @returns {Transaction}
     */
    static copy(o) {
        if (!o) return o;
        const senderPubKey = PublicKey.copy(o._senderPubKey);
        const recipientAddr = Address.copy(o._recipientAddr);
        const signature = Signature.copy(o._signature);
        return new Transaction(senderPubKey, recipientAddr, o._value, o._fee, o._nonce, signature, o._version);
    }

    /**
     * @param {PublicKey} senderPubKey
     * @param {Address} recipientAddr
     * @param {number} value
     * @param {number} fee
     * @param {number} nonce
     * @param {Signature} [signature]
     * @param {number} version
     */
    constructor(senderPubKey, recipientAddr, value, fee, nonce, signature, version = Transaction.CURRENT_VERSION) {
        if (!NumberUtils.isUint16(version)) throw 'Malformed version';
        if (!(senderPubKey instanceof PublicKey)) throw 'Malformed senderPubKey';
        if (!(recipientAddr instanceof Address)) throw 'Malformed recipientAddr';
        if (!NumberUtils.isUint64(value) || value == 0) throw 'Malformed value';
        if (!NumberUtils.isUint64(fee)) throw 'Malformed fee';
        if (!NumberUtils.isUint32(nonce)) throw 'Malformed nonce';
        // Signature may be initially empty and can be set later.
        if (signature !== undefined && !(signature instanceof Signature)) throw 'Malformed signature';

        // Note that the signature is NOT verified here.
        // Callers must explicitly invoke verifySignature() to check it.

        /** @type {number} */
        this._version = version;
        /** @type {PublicKey} */
        this._senderPubKey = senderPubKey;
        /** @type {Address} */
        this._recipientAddr = recipientAddr;
        /** @type {number} */
        this._value = value;
        /** @type {number} */
        this._fee = fee;
        /** @type {number} */
        this._nonce = nonce;
        /** @type {Signature} */
        this._signature = signature;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {Transaction}
     */
    static unserialize(buf) {
        // We currently only support one transaction type: Basic.
        const version = buf.readUint16();
        if (!Transaction.SUPPORTED_VERSIONS.includes(version)) throw 'Transaction version unsupported';
        const type = buf.readUint8();
        if (type !== Transaction.Type.BASIC) throw 'Malformed transaction type';
        const senderPubKey = PublicKey.unserialize(buf);
        const recipientAddr = Address.unserialize(buf);
        const value = buf.readUint64();
        const fee = buf.readUint64();
        const nonce = buf.readUint32();
        const signature = Signature.unserialize(buf);
        return new Transaction(senderPubKey, recipientAddr, value, fee, nonce, signature, version);
    }

    /**
     * @param {?SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this.serializeContent(buf);
        this._signature.serialize(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return this.serializedContentSize
            + this._signature.serializedSize;
    }

    /**
     * @param {?SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serializeContent(buf) {
        buf = buf || new SerialBuffer(this.serializedContentSize);
        buf.writeUint16(this._version);
        buf.writeUint8(Transaction.Type.BASIC);
        this._senderPubKey.serialize(buf);
        this._recipientAddr.serialize(buf);
        buf.writeUint64(this._value);
        buf.writeUint64(this._fee);
        buf.writeUint32(this._nonce);
        return buf;
    }

    /** @type {number} */
    get serializedContentSize() {
        return /*version*/ 2
            + /*type*/ 1
            + this._senderPubKey.serializedSize
            + this._recipientAddr.serializedSize
            + /*value*/ 8
            + /*fee*/ 8
            + /*nonce*/ 4;
    }

    /**
     * @return {Promise.<boolean>}
     */
    async verifySignature() {
        return this._signature.verify(this._senderPubKey, this.serializeContent());
    }

    /**
     * @return {Promise.<Hash>}
     */
    hash() {
        // Exclude the signature, we don't want transactions to be malleable.
        // TODO Think about this! This means that the signatures will not be
        // captured by the proof of work!
        return Hash.light(this.serializeContent());
    }

    /**
     * @param {Transaction} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof Transaction
            && this._senderPubKey.equals(o.senderPubKey)
            && this._recipientAddr.equals(o.recipientAddr)
            && this._value === o.value
            && this._fee === o.fee
            && this._nonce === o.nonce
            && this._signature.equals(o.signature);
    }

    /**
     * @return {string}
     */
    toString() {
        return `Transaction{`
            + `senderPubKey=${this._senderPubKey.toBase64()}, `
            + `recipientAddr=${this._recipientAddr.toBase64()}, `
            + `value=${this._value}, `
            + `fee=${this._fee}, `
            + `nonce=${this._nonce}, `
            + `signature=${this._signature.toBase64()}`
            + `}`;
    }

    /** @type {PublicKey} */
    get senderPubKey() {
        return this._senderPubKey;
    }

    /**
     * @return {Promise.<Address>}
     */
    getSenderAddr() {
        return this._senderPubKey.toAddress();
    }

    /** @type {Address} */
    get recipientAddr() {
        return this._recipientAddr;
    }

    /** @type {number} */
    get value() {
        return this._value;
    }

    /** @type {number} */
    get fee() {
        return this._fee;
    }

    /** @type {number} */
    get nonce() {
        return this._nonce;
    }

    /** @type {Signature} */
    get signature() {
        return this._signature;
    }

    // Signature is set by the Wallet after signing a transaction.
    /** @type {Signature} */
    set signature(sig) {
        this._signature = sig;
    }
}
Transaction.CURRENT_VERSION = 1;
Transaction.SUPPORTED_VERSIONS = [1];
Transaction.Type = {};
Transaction.Type.BASIC = 0;

Class.register(Transaction);

class Block {
    /**
     * @param {{_header, _interlink, _body}} o
     * @returns {Block}
     */
    static copy(o) {
        if (!o) return o;
        return new Block(
            BlockHeader.copy(o._header),
            BlockInterlink.copy(o._interlink),
            BlockBody.copy(o._body)
        );
    }

    /**
     * @param {BlockHeader} header
     * @param {BlockInterlink} interlink
     * @param {BlockBody} [body]
     */
    constructor(header, interlink, body) {
        if (!(header instanceof BlockHeader)) throw 'Malformed header';
        if (!(interlink instanceof BlockInterlink)) throw 'Malformed interlink';
        if (body && !(body instanceof BlockBody)) throw 'Malformed body';

        /** @type {BlockHeader} */
        this._header = header;
        /** @type {BlockInterlink} */
        this._interlink = interlink;
        /** @type {BlockBody} */
        this._body = body;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {Block}
     */
    static unserialize(buf) {
        const header = BlockHeader.unserialize(buf);
        const interlink = BlockInterlink.unserialize(buf);

        let body = undefined;
        const bodyPresent = buf.readUint8();
        if (bodyPresent) {
            body = BlockBody.unserialize(buf);
        }

        return new Block(header, interlink, body);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this._header.serialize(buf);
        this._interlink.serialize(buf);

        if (this._body) {
            buf.writeUint8(1);
            this._body.serialize(buf);
        } else {
            buf.writeUint8(0);
        }

        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return this._header.serializedSize
            + this._interlink.serializedSize
            + /*bodyPresent*/ 1
            + (this._body ? this._body.serializedSize : 0);
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async verify() {
        // Check that the header hash matches the difficulty.
        if (!(await this._header.verifyProofOfWork())) {
            Log.w(Block, 'Invalid block - PoW verification failed');
            return false;
        }

        // Check that the maximum block size is not exceeded.
        if (this.serializedSize > Policy.BLOCK_SIZE_MAX) {
            Log.w(Block, 'Invalid block - max block size exceeded');
            return false;
        }

        // Verify that the interlink is valid.
        if (!(await this._verifyInterlink())) {
            return false;
        }

        // XXX Verify the body only if it is present.
        if (this.isFull() && !(await this._verifyBody())) {
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @returns {Promise.<boolean>}
     * @private
     */
    async _verifyInterlink() {
        // The genesis block has an empty interlink. Skip all interlink checks for it.
        if (Block.GENESIS.HASH.equals(await this.hash())) {
            return true;
        }

        // Check that the interlink contains at least one block.
        if (this._interlink.length === 0) {
            Log.w(Block, 'Invalid block - empty interlink');
            return false;
        }

        // Check that the interlink connects to the correct genesis block.
        if (!Block.GENESIS.HASH.equals(this._interlink.hashes[0])) {
            Log.w(Block, 'Invalid block - wrong genesis block in interlink');
            return false;
        }

        // Check that all hashes in the interlink are hard enough for their respective depth.
        const targetHeight = BlockUtils.getTargetHeight(this.target);
        for (let depth = 1; depth < this._interlink.length; depth++) {
            if (!BlockUtils.isProofOfWork(this._interlink.hashes[depth], Math.pow(2, targetHeight - depth))) {
                Log.w(Block, 'Invalid block - invalid block in interlink');
                return false;
            }
        }

        // Check that the interlinkHash given in the header matches the actual interlinkHash.
        const interlinkHash = await this._interlink.hash();
        if (!this._header.interlinkHash.equals(interlinkHash)) {
            Log.w(Block, 'Invalid block - interlink hash mismatch');
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @returns {Promise.<boolean>}
     * @private
     */
    async _verifyBody() {
        // Check that the body is valid.
        if (!(await this._body.verify())) {
            return false;
        }

        // Check that bodyHash given in the header matches the actual body hash.
        const bodyHash = await this._body.hash();
        if (!this._header.bodyHash.equals(bodyHash)) {
            Log.w(Block, 'Invalid block - body hash mismatch');
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @param {Block} predecessor
     * @returns {Promise.<boolean>}
     */
    async isImmediateSuccessorOf(predecessor) {
        // Check the header.
        if (!(await this._header.isImmediateSuccessorOf(predecessor.header))) {
            return false;
        }

        // Check that the interlink is correct.
        const interlink = await predecessor.getNextInterlink(this.target);
        if (!this._interlink.equals(interlink)) {
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @param {Block} predecessor
     * @returns {Promise.<boolean>}
     */
    async isInterlinkSuccessorOf(predecessor) {
        // Check that the height is higher than the predecessor's.
        if (this._header.height <= predecessor.header.height) {
            Log.v(Block, 'No interlink predecessor - height');
            return false;
        }

        // Check that the timestamp is greater or equal to the predecessor's timestamp.
        if (this._header.timestamp < predecessor.header.timestamp) {
            Log.v(Block, 'No interlink predecessor - timestamp');
            return false;
        }

        // Check that the hash of the predecessor block is part of the block's interlink.
        const prevHash = await predecessor.hash();
        if (!this._interlink.hashes.some(hash => prevHash.equals(hash))) {
            Log.v(Block, 'No interlink predecessor - not in interlink');
            return false;
        }

        // If the predecessor happens to be the immediate predecessor, check additionally:
        // - that the height of the successor is one higher
        // - that the interlink is correct.
        if (this._header.prevHash.equals(prevHash)) {
            if (this._header.height !== predecessor.header.height + 1) {
                Log.v(Block, 'No interlink predecessor - immediate height');
                return false;
            }

            const interlink = await predecessor.getNextInterlink(this.target);
            const interlinkHash = await interlink.hash();
            if (!this._header.interlinkHash.equals(interlinkHash)) {
                Log.v(Block, 'No interlink predecessor - immediate interlink');
                return false;
            }
        }
        // Otherwise, if the prevHash doesn't match but the blocks should be adjacent according to their height fields,
        // this cannot be a valid successor of predecessor.
        else if (this._header.height === predecessor.height.height + 1) {
            Log.v(Block, 'No interlink predecessor - immediate height (2)');
            return false;
        }
        // Otherwise, check that the interlink construction is valid given the information we have.
        else {
            // TODO Take different targets into account.

            // The number of new blocks in the interlink is bounded by the height difference.
            /** @type {HashSet.<Hash>} */
            const hashes = new HashSet();
            hashes.addAll(this._interlink.hashes);
            hashes.removeAll(predecessor.interlink.hashes);
            if (hashes.length > this._header.height - predecessor.header.height) {
                Log.v(Block, 'No interlink predecessor - too many new blocks');
                return false;
            }

            // Check that the interlink is not too short.
            const thisDepth = BlockUtils.getTargetDepth(this.target);
            const prevDepth = BlockUtils.getTargetDepth(predecessor.target);
            const depthDiff = thisDepth - prevDepth;
            if (this._interlink.length < predecessor.interlink.length - depthDiff) {
                Log.v(Block, 'No interlink predecessor - interlink too short');
                return false;
            }

            // If the same block is found in both interlinks, all blocks at lower depths must be the same in both interlinks.
            let commonBlock = false;
            const thisInterlink = this._interlink.hashes;
            const prevInterlink = predecessor.interlink.hashes;
            for (let i = 1; i < prevInterlink.length && i - depthDiff < thisInterlink.length; i++) {
                if (prevInterlink[i].equals(thisInterlink[i - depthDiff])) {
                    commonBlock = true;
                }
                else if (commonBlock) {
                    Log.v(Block, 'No interlink predecessor - invalid common suffix');
                    return false;
                }
            }
        }

        // Check that the target adjustment between the blocks does not exceed the theoretical limit.
        const adjustmentFactor = this._header.target / predecessor.header.target;
        const heightDiff = this._header.height - predecessor.header.height;
        if (adjustmentFactor > Math.pow(Policy.DIFFICULTY_MAX_ADJUSTMENT_FACTOR, heightDiff)
                || adjustmentFactor < Math.pow(Policy.DIFFICULTY_MAX_ADJUSTMENT_FACTOR, -heightDiff)) {
            Log.v(Block, 'No interlink predecessor - target adjustment out of bounds');
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @param {Block} predecessor
     * @returns {Promise.<boolean>}
     */
    async isSuccessorOf(predecessor) {
        // TODO Improve this! Lots of duplicate checks.
        return await this.isImmediateSuccessorOf(predecessor) || this.isInterlinkSuccessorOf(predecessor);
    }

    /**
     * @param {number} nextTarget
     * @returns {Promise.<BlockInterlink>}
     */
    async getNextInterlink(nextTarget) {
        // Compute how much harder the block hash is than the next target.
        const hash = await this.hash();
        const nextTargetHeight = BlockUtils.getTargetHeight(nextTarget);
        let i = 1, depth = 0;
        while (BlockUtils.isProofOfWork(hash, Math.pow(2, nextTargetHeight - i))) {
            depth = i;
            i++;
        }

        // If the block hash is not hard enough and the target height didn't change, the interlink doesn't change.
        // Exception: The genesis block has an empty interlink, its successor (and all other blocks) contain the genesis hash.
        const targetHeight = BlockUtils.getTargetHeight(this.target);
        if (depth === 0 && targetHeight === nextTargetHeight) {
            return this.interlink.length > 0 ? this.interlink : new BlockInterlink([Block.GENESIS.HASH]);
        }

        // The interlink changes, start constructing a new one.
        /** @type {Array.<Hash>} */
        const hashes = [Block.GENESIS.HASH];

        // Push the current block hash up to depth times onto the new interlink. If depth == 0, it won't be pushed.
        for (let i = 0; i < depth; i++) {
            hashes.push(hash);
        }

        // Push the remaining hashes from the current interlink. If the target height decreases (i.e. the difficulty
        // increases), we omit the block(s) at the beginning of the current interlink as they are not eligible for
        // inclusion anymore.
        const offset = targetHeight - nextTargetHeight;
        for (let j = depth + offset + 1; j < this.interlink.length; j++) {
            hashes.push(this.interlink.hashes[j]);
        }

        return new BlockInterlink(hashes);
    }

    /**
     * @param {Block|*} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof Block
            && this._header.equals(o._header)
            && this._interlink.equals(o._interlink)
            && (this._body ? this._body.equals(o._body) : !o._body);
    }

    /**
     * @returns {boolean}
     */
    isLight() {
        return !this._body;
    }

    /**
     * @returns {boolean}
     */
    isFull() {
        return !!this._body;
    }

    /**
     * @returns {Block}
     */
    toLight() {
        return this.isLight() ? this : new Block(this._header, this._interlink);
    }

    /**
     * @param {BlockBody} body
     * @returns {Block}
     */
    toFull(body) {
        return this.isFull() ? this : new Block(this._header, this._interlink, body);
    }

    /**
     * @type {BlockHeader}
     */
    get header() {
        return this._header;
    }

    /**
     * @type {BlockInterlink}
     */
    get interlink() {
        return this._interlink;
    }

    /**
     * @type {BlockBody}
     */
    get body() {
        if (this.isLight()) {
            throw 'Cannot access body of light block';
        }
        return this._body;
    }

    /**
     * @type {Hash}
     */
    get prevHash() {
        return this._header.prevHash;
    }

    /**
     * @type {Hash}
     */
    get bodyHash() {
        return this._header.bodyHash;
    }

    /**
     * @type {Hash}
     */
    get accountsHash() {
        return this._header.accountsHash;
    }

    /**
     * @type {number}
     */
    get nBits() {
        return this._header.nBits;
    }

    /**
     * @type {number}
     */
    get target() {
        return this._header.target;
    }

    /**
     * @type {number}
     */
    get difficulty() {
        return this._header.difficulty;
    }

    /**
     * @type {number}
     */
    get height() {
        return this._header.height;
    }
    
    /**
     * @type {number}
     */
    get timestamp() {
        return this._header.timestamp;
    }

    /**
     * @type {number}
     */
    get nonce() {
        return this._header.nonce;
    }

    /**
     * @type {Address}
     */
    get minerAddr() {
        return this._body.minerAddr;
    }

    /**
     * @type {Array.<Transaction>}
     */
    get transactions() {
        return this._body.transactions;
    }

    /**
     * @type {number}
     */
    get transactionCount() {
        return this._body.transactionCount;
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {Promise.<Hash>}
     */
    hash(buf) {
        return this._header.hash(buf);
    }
}
Class.register(Block);

/* Genesis Block */
Block.GENESIS = new Block(
    new BlockHeader(
        new Hash(null),
        new Hash(BufferUtils.fromBase64('47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=')),
        new Hash(BufferUtils.fromBase64('Xmju8G32zjPl4m6U/ULB3Nyozs2BkVgX2k9fy5/HeEg=')),
        new Hash(BufferUtils.fromBase64('wkaeMLzQ6UmY25ypNseX94rbfiHou3fiK8bPzQJj/tA=')),
        BlockUtils.difficultyToCompact(1),
        1,
        0,
        111633),
    new BlockInterlink([]),
    new BlockBody(new Address(BufferUtils.fromBase64('kekkD0FSI5gu3DRVMmMHEOlKf1I')), [])
);
// Store hash for synchronous access
Block.GENESIS.HASH = Hash.fromBase64('AADBmeOOWahd2/WOWYPmxXXJnjl4kc+oLoKm8K7V1Yc=');

/**
 * @interface
 */
class IBlockchain extends Observable {
    /**
     * @abstract
     * @type {Block}
     */
    get head() {}

    /**
     * @abstract
     * @type {Hash}
     */
    get headHash() {}

    /**
     * @abstract
     * @type {number}
     */
    get height() {}
}
Class.register(IBlockchain);

/**
 * @abstract
 */
class BaseChain extends IBlockchain {
    /**
     * @param {ChainDataStore} store
     */
    constructor(store) {
        super();
        this._store = store;
    }

    /**
     * @param {Hash} hash
     * @param {boolean} [includeForks]
     * @returns {Promise.<Block>}
     */
    async getBlock(hash, includeForks = false) {
        const chainData = await this._store.getChainData(hash);
        return chainData && (chainData.onMainChain || includeForks) ? chainData.head : undefined;
    }

    /**
     * @param {number} height
     * @returns {Promise.<Block>}
     */
    getBlockAt(height) {
        return this._store.getBlockAt(height);
    }

    /**
     * Computes the target value for the block after the given block or the head of this chain if no block is given.
     * @param {Block} [block]
     * @returns {Promise.<number>}
     */
    async getNextTarget(block) {
        let chainData;
        if (block) {
            const hash = await block.hash();
            chainData = await this._store.getChainData(hash);
            Assert.that(!!chainData);
        } else {
            block = this.head;
            chainData = this._mainChain;
        }

        // Retrieve the timestamp of the block that appears DIFFICULTY_BLOCK_WINDOW blocks before the given block in the chain.
        // The block might not be on the main chain.
        const startHeight = Math.max(block.height - Policy.DIFFICULTY_BLOCK_WINDOW, 1);
        /** @type {Block} */
        let startBlock;
        if (chainData.onMainChain) {
            startBlock = await this._store.getBlockAt(startHeight);
        } else {
            let prevData = chainData;
            for (let i = 0; i < Policy.DIFFICULTY_BLOCK_WINDOW && !prevData.onMainChain; i++) {
                prevData = await this._store.getChainData(prevData.head.prevHash);
                if (!prevData) {
                    // Not enough blocks are available to compute the next target, fail.
                    return -1;
                }
            }

            if (prevData.onMainChain && prevData.head.height > startHeight) {
                startBlock = await this._store.getBlockAt(startHeight);
            } else {
                startBlock = prevData.head;
            }
        }

        if (!startBlock) {
            // Not enough blocks are available to compute the next target, fail.
            return -1;
        }

        return BlockUtils.getNextTarget(block.header, startBlock.header);
    }



    /* NIPoPoW functions */

    /**
     * @returns {Promise.<ChainProof>}
     */
    getChainProof() {
        return this._prove(Policy.M, Policy.K, Policy.DELTA);
    }

    /**
     * The "Prove" algorithm from the NIPoPow paper.
     * @param {number} m
     * @param {number} k
     * @param {number} delta
     * @returns {Promise.<ChainProof>}
     * @private
     */
    async _prove(m, k, delta) {
        Assert.that(m >= 1, 'm must be >= 1');
        Assert.that(delta > 0, 'delta must be > 0');
        let prefix = new BlockChain([]);

        // B <- C[0]
        let startHeight = 1;

        const head = await this.getBlockAt(Math.max(this.height - k, 1)); // C[-k]
        const maxDepth = Math.max(BlockUtils.getTargetDepth(head.target) + head.interlink.length - 1, 0); // |C[-k].interlink|
        // for mu = |C[-k].interlink| down to 0 do
        for (let depth = maxDepth; depth >= 0; depth--) {
            // alpha = C[:-k]{B:}|^mu
            const alpha = await this._getSuperChain(depth, head, startHeight); // eslint-disable-line no-await-in-loop
            // pi = pi (union) alpha
            prefix = BlockChain.merge(prefix, alpha);

            // if good_(delta,m)(C, alpha, mu) then
            if (BaseChain._isGoodSuperChain(alpha, depth, m, delta)) {
                Assert.that(alpha.length >= m, `Good superchain expected to be at least ${m} long`);
                Log.v(BaseChain, `Found good superchain at depth ${depth} with length ${alpha.length} (#${startHeight} - #${head.height})`);
                // B <- alpha[-m]
                startHeight = alpha.blocks[alpha.length - m].height;
            }
        }

        // X <- C[-k:]
        const suffix = await this._getHeaderChain(this.height - head.height);

        // return piX
        return new ChainProof(prefix, suffix);
    }


    /**
     * @param {number} depth
     * @param {Block} [head]
     * @param {number} [tailHeight]
     * @returns {Promise.<BlockChain>}
     * @private
     */
    async _getSuperChain(depth, head = this.head, tailHeight = 1) {
        Assert.that(tailHeight >= 1, 'tailHeight must be >= 1');
        const blocks = [];

        // Include head if it is at the requested depth or below.
        const headHash = await head.hash();
        const headDepth = BlockUtils.getTargetDepth(BlockUtils.hashToTarget(headHash));
        if (headDepth >= depth) {
            blocks.push(head.toLight());
        }

        // Follow the interlink pointers back at the requested depth.
        let references = [head.prevHash, ...head.interlink.hashes.slice(1)];
        let j = Math.max(depth - BlockUtils.getTargetDepth(head.target), 0);
        while (j < references.length && head.height > tailHeight) {
            head = await this.getBlock(references[j]); // eslint-disable-line no-await-in-loop
            Assert.that(!!head, `Corrupted store: Failed to load block ${references[j]} while constructing SuperChain`);
            blocks.push(head.toLight());

            references = [head.prevHash, ...head.interlink.hashes.slice(1)];
            j = Math.max(depth - BlockUtils.getTargetDepth(head.target), 0);
        }

        if (blocks[blocks.length - 1].height > 1 && tailHeight === 1) {
            blocks.push(Block.GENESIS.toLight());
        }

        return new BlockChain(blocks.reverse());
    }

    /**
     * @param {BlockChain} superchain
     * @param {number} depth
     * @param {number} m
     * @param {number} delta
     * @returns {boolean}
     * @private
     */
    static _isGoodSuperChain(superchain, depth, m, delta) {
        // TODO multilevel quality
        return BaseChain._hasSuperQuality(superchain, depth, m, delta);
    }

    /**
     * @param {BlockChain} superchain
     * @param {number} depth
     * @param {number} m
     * @param {number} delta
     * @returns {boolean}
     * @private
     */
    static _hasSuperQuality(superchain, depth, m, delta) {
        Assert.that(m >= 1, 'm must be >= 1');
        if (superchain.length < m) {
            return false;
        }

        for (let i = m; i <= superchain.length; i++) {
            const underlyingLength = superchain.head.height - superchain.blocks[superchain.length - i].height + 1;
            if (!BaseChain._isLocallyGood(i, underlyingLength, depth, delta)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param {number} superLength
     * @param {number} underlyingLength
     * @param {number} depth
     * @param {number} delta
     * @returns {boolean}
     * @private
     */
    static _isLocallyGood(superLength, underlyingLength, depth, delta) {
        // |C'| > (1 - delta) * 2^(-mu) * |C|
        return superLength > (1 - delta) * Math.pow(2, -depth) * underlyingLength;
    }

    /**
     * @param {number} length
     * @param {Block} [head]
     * @returns {Promise.<HeaderChain>}
     * @private
     */
    async _getHeaderChain(length, head = this.head) {
        const headers = [];
        while (head && headers.length < length) {
            headers.push(head.header);
            head = await this.getBlock(head.prevHash); // eslint-disable-line no-await-in-loop
        }
        return new HeaderChain(headers.reverse());
    }
}
Class.register(BaseChain);

class BlockChain {
    /**
     * @param {BlockChain} chain1
     * @param {BlockChain} chain2
     * @returns {BlockChain}
     */
    static merge(chain1, chain2) {
        const merged = [];
        let i1 = 0, i2 = 0;
        while (i1 < chain1.length && i2 < chain2.length) {
            const block1 = chain1.blocks[i1];
            const block2 = chain2.blocks[i2];

            if (block1.height === block2.height) {
                Assert.that(block1.equals(block2), 'Encountered different blocks at same height during chain merge');
                merged.push(block1);
                i1++;
                i2++;
            } else if (block1.height < block2.height) {
                merged.push(block1);
                i1++;
            } else {
                merged.push(block2);
                i2++;
            }
        }

        for (; i1 < chain1.length; i1++) {
            merged.push(chain1.blocks[i1]);
        }
        for (; i2 < chain2.length; i2++) {
            merged.push(chain2.blocks[i2]);
        }

        return new BlockChain(merged);
    }

    /**
     * @param {BlockChain} chain1
     * @param {BlockChain} chain2
     * @returns {?Block}
     */
    static lowestCommonAncestor(chain1, chain2) {
        let i1 = chain1.length - 1;
        let i2 = chain2.length - 1;
        while (i1 >= 0 && i2 >= 0) {
            const block1 = chain1.blocks[i1];
            const block2 = chain2.blocks[i2];

            if (block1.equals(block2)) {
                return block1;
            } else if (block1.height > block2.height) {
                i1--;
            } else {
                i2--;
            }
        }
        return undefined;
    }

    /**
     * @param {Array.<Block>} blocks
     */
    constructor(blocks) {
        if (!blocks || !NumberUtils.isUint16(blocks.length)
            || blocks.some(it => !(it instanceof Block) || !it.isLight())) throw new Error('Malformed blocks');

        /** @type {Array.<Block>} */
        this._blocks = blocks;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {BlockChain}
     */
    static unserialize(buf) {
        const count = buf.readUint16();
        const blocks = [];
        for (let i = 0; i < count; i++) {
            blocks.push(Block.unserialize(buf));
        }
        return new BlockChain(blocks);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint16(this._blocks.length);
        for (const block of this._blocks) {
            block.serialize(buf);
        }
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return /*count*/ 2
            + this._blocks.reduce((sum, block) => sum + block.serializedSize, 0);
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async verify() {
        // Check that all blocks in the chain are valid.
        for (const block of this._blocks) {
            if (!(await block.verify())) { // eslint-disable-line no-await-in-loop
                return false;
            }
        }

        // Check that all blocks in the chain are valid successors of one another.
        for (let i = this._blocks.length - 1; i >= 1; i--) {
            if (!(await this._blocks[i].isSuccessorOf(this._blocks[i - 1]))) { // eslint-disable-line no-await-in-loop
                return false;
            }
        }

        // Everything checks out.
        return true;
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async isDense() {
        for (let i = this._blocks.length - 1; i >= 1; i--) {
            const prevHash = await this._blocks[i - 1].hash(); // eslint-disable-line no-await-in-loop
            if (!prevHash.equals(this._blocks[i].prevHash)) {
                return false;
            }
        }
        return true;
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async isAnchored() {
        return Block.GENESIS.HASH.equals(await this.tail.hash());
    }

    /**
     * @returns {string}
     */
    toString() {
        return `BlockChain{length=${this.length}}`;
    }

    /** @type {number} */
    get length() {
        return this._blocks.length;
    }

    /** @type {Array.<Block>} */
    get blocks() {
        return this._blocks;
    }

    /** @type {Block} */
    get head() {
        return this._blocks[this.length - 1];
    }

    /** @type {Block} */
    get tail() {
        return this._blocks[0];
    }

    /**
     * @returns {number}
     */
    totalDifficulty() {
        return this._blocks.reduce((sum, block) => sum + BlockUtils.targetToDifficulty(block.target), 0);
    }
}
Class.register(BlockChain);

class HeaderChain {
    /**
     * @param {Array.<BlockHeader>} headers
     */
    constructor(headers) {
        if (!headers || !NumberUtils.isUint16(headers.length)
            || headers.some(it => !(it instanceof BlockHeader))) throw new Error('Malformed headers');

        /** @type {Array.<BlockHeader>} */
        this._headers = headers;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {HeaderChain}
     */
    static unserialize(buf) {
        const count = buf.readUint16();
        const headers = [];
        for (let i = 0; i < count; i++) {
            headers.push(BlockHeader.unserialize(buf));
        }
        return new HeaderChain(headers);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint16(this._headers.length);
        for (const header of this._headers) {
            header.serialize(buf);
        }
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return /*count*/ 2
            + this._headers.reduce((sum, header) => sum + header.serializedSize, 0);
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async verify() {
        // Check that all headers in the chain are valid.
        for (const header of this._headers) {
            if (!(await header.verifyProofOfWork())) { // eslint-disable-line no-await-in-loop
                return false;
            }
        }

        // Check that all headers in the chain are valid successors of one another.
        for (let i = this._headers.length - 1; i >= 1; i--) {
            if (!(await this._headers[i].isImmediateSuccessorOf(this._headers[i - 1]))) { // eslint-disable-line no-await-in-loop
                return false;
            }
        }

        // Everything checks out.
        return true;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `HeaderChain{length=${this.length}}`;
    }

    /** @type {number} */
    get length() {
        return this._headers.length;
    }

    /** @type {Array.<BlockHeader>} */
    get headers() {
        return this._headers;
    }

    /** @type {BlockHeader} */
    get head() {
        return this._headers[this.length - 1];
    }

    /** @type {BlockHeader} */
    get tail() {
        return this._headers[0];
    }

    /**
     * @returns {number}
     */
    totalDifficulty() {
        return this._headers.reduce((sum, header) => sum + BlockUtils.targetToDifficulty(header.target), 0);
    }
}
Class.register(HeaderChain);

class ChainProof {
    /**
     * @param {BlockChain} prefix
     * @param {HeaderChain} suffix
     */
    constructor(prefix, suffix) {
        if (!(prefix instanceof BlockChain) || !prefix.length) throw new Error('Malformed prefix');
        if (!(suffix instanceof HeaderChain)) throw new Error('Malformed suffix');

        /** @type {BlockChain} */
        this._prefix = prefix;
        /** @type {HeaderChain} */
        this._suffix = suffix;
    }

    static unserialize(buf) {
        const prefix = BlockChain.unserialize(buf);
        const suffix = HeaderChain.unserialize(buf);
        return new ChainProof(prefix, suffix);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this._prefix.serialize(buf);
        this._suffix.serialize(buf);
        return buf;
    }

    get serializedSize() {
        return this._prefix.serializedSize
            + this._suffix.serializedSize;
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async verify() {
        // Check that the prefix chain is anchored.
        if (!this._prefix.isAnchored()) {
            return false;
        }

        // Check that both prefix and suffix are valid chains.
        if (!(await this._prefix.verify()) || !(await this._suffix.verify())) {
            return false;
        }

        // Check that the suffix connects to the prefix.
        if (this._suffix.length > 0 && !(await this._suffix.tail.isImmediateSuccessorOf(this._prefix.head.header))) {
            return false;
        }

        // Verify the block targets where possible.
        if (!(await this._verifyDifficulty())) {
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @returns {Promise.<boolean>}
     * @private
     */
    async _verifyDifficulty() {
        // Extract the dense suffix of the prefix.
        const denseSuffix = [this.prefix.head.header];
        let head = this.prefix.head;
        for (let i = this.prefix.length - 2; i >= 0; i--) {
            const block = this.prefix.blocks[i];
            const hash = await block.hash();
            if (!hash.equals(head.prevHash)) {
                break;
            }

            denseSuffix.push(block.header);
            head = block;
        }
        denseSuffix.reverse();

        /** Array.<BlockHeader> */
        const denseChain = denseSuffix.concat(this.suffix.headers);
        let headIndex = denseChain.length - 2;
        let tailIndex = headIndex - Policy.DIFFICULTY_BLOCK_WINDOW;

        while (tailIndex >= 0 && headIndex >= 0) {
            const headBlock = denseChain[headIndex];
            const tailBlock = denseChain[tailIndex];
            const target = BlockUtils.getNextTarget(headBlock, tailBlock);
            const nBits = BlockUtils.targetToCompact(target);

            /** @type {BlockHeader} */
            const checkBlock = denseChain[headIndex + 1];
            if (checkBlock.nBits !== nBits) {
                Log.w(ChainProof, `Block target mismatch: expected=${nBits}, got=${checkBlock.nBits}`);
                return false;
            }

            --headIndex;
            if (tailIndex !== 0 || tailBlock.height !== 1) {
                --tailIndex;
            }
        }

        return true;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `ChainProof{prefix=${this._prefix.length}, suffix=${this._suffix.length}, height=${this.head.height}}`;
    }

    /** @type {BlockChain} */
    get prefix() {
        return this._prefix;
    }

    /** @type {HeaderChain} */
    get suffix() {
        return this._suffix;
    }

    /** @type {BlockHeader} */
    get head() {
        return this._suffix.length > 0 ? this._suffix.head : this._prefix.head.header;
    }
}

class ChainData {
    /**
     * @param {{_head, _totalDifficulty, _totalWork, _onMainChain}} o
     * @returns {ChainData}
     */
    static copy(o) {
        if (!o) return o;
        return new ChainData(
            Block.copy(o._head),
            o._totalDifficulty,
            o._totalWork,
            o._onMainChain
        );
    }

    /**
     * @param {Block} head
     * @param {number} totalDifficulty
     * @param {number} totalWork
     * @param {boolean} onMainChain
     */
    constructor(head, totalDifficulty, totalWork, onMainChain = false) {
        this._head = head;
        this._totalDifficulty = totalDifficulty;
        this._totalWork = totalWork;
        this._onMainChain = onMainChain;
    }

    /** @type {Block} */
    get head() {
        return this._head;
    }

    /** @type {number} */
    get totalDifficulty() {
        return this._totalDifficulty;
    }

    /** @type {number} */
    get totalWork() {
        return this._totalWork;
    }

    /** @type {boolean} */
    get onMainChain() {
        return this._onMainChain;
    }

    /** @type {boolean} */
    set onMainChain(onMainChain) {
        this._onMainChain = onMainChain;
    }
}
Class.register(ChainData);

class ChainDataStore {
    /**
     * @param {JungleDB} jdb
     */
    static initPersistent(jdb) {
        const store = jdb.createObjectStore('FullChain', new ChainDataStoreCodec());
        ChainDataStore._createIndexes(store);
    }

    /**
     * @param {JungleDB} jdb
     * @returns {ChainDataStore}
     */
    static getPersistent(jdb) {
        return new ChainDataStore(jdb.getObjectStore('FullChain'));
    }

    /**
     * @returns {ChainDataStore}
     */
    static createVolatile() {
        const store = JDB.JungleDB.createVolatileObjectStore();
        ChainDataStore._createIndexes(store);
        return new ChainDataStore(store);
    }

    /**
     * @param {IObjectStore} store
     * @private
     */
    static _createIndexes(store) {
        store.createIndex('height', ['_head', '_header', '_height']);
    }

    /**
     * @param {IObjectStore} store
     */
    constructor(store) {
        this._store = store;
    }

    /**
     * @param {Hash} key
     * @returns {Promise.<ChainData>}
     */
    getChainData(key) {
        return this._store.get(key.toBase64());
    }

    /**
     * @param {Hash} key
     * @param {ChainData} chainData
     * @returns {Promise.<void>}
     */
    putChainData(key, chainData) {
        return this._store.put(key.toBase64(), chainData);
    }

    /**
     * @param {Hash} key
     * @returns {Block}
     */
    async getBlock(key) {
        const chainData = await this.getChainData(key);
        return chainData ? chainData.head : undefined;
    }

    /**
     * @param {number} height
     * @returns {Promise.<?Block>}
     */
    async getBlockAt(height) {
        /** @type {Array.<ChainData>} */
        const candidates = await this._store.values(JDB.Query.eq('height', height));
        if (!candidates || !candidates.length) {
            return undefined;
        }

        for (const chainData of candidates) {
            if (chainData.onMainChain) {
                return chainData.head;
            }
        }

        // TODO handle corrupted storage
        return undefined;
    }

    /**
     * @param {number} height
     * @returns {Promise.<?Block>}
     */
    async getNearestBlockAt(height, lower=true) {
        const index = this._store.index('height');
        /** @type {Array.<ChainData>} */
        const candidates = lower ?
            await index.maxValues(JDB.KeyRange.upperBound(height)) :
            await index.minValues(JDB.KeyRange.lowerBound(height));
        if (!candidates || !candidates.length) {
            return undefined;
        }

        for (const chainData of candidates) {
            if (chainData.onMainChain) {
                return chainData.head;
            }
        }

        // TODO handle corrupted storage
        throw new Error(`Failed to find main chain block at height ${height}`);
    }

    /**
     * @param {number} startHeight
     * @param {number} [count]
     * @param {boolean} [forward]
     * @returns {Promise.<Array.<Block>>}
     */
    async getBlocks(startHeight, count = 500, forward = true) {
        if (!forward) {
            startHeight = startHeight - count;
        }
        /** @type {Array.<ChainData>} */
        let candidates = await this._store.values(JDB.Query.within('height', startHeight, startHeight + count - 1));
        candidates = candidates
            .filter(chainData => chainData.onMainChain)
            .map(chainData => chainData.head);
        const sortNumber = forward ? ((a, b) => a.height - b.height) : ((a, b) => b.height - a.height);
        candidates.sort(sortNumber);
        return candidates;
    }

    /**
     * @returns {Promise.<Hash|undefined>}
     */
    async getHead() {
        const key = await this._store.get('main');
        return key ? Hash.fromBase64(key) : undefined;
    }

    /**
     * @param {Hash} key
     * @returns {Promise.<void>}
     */
    setHead(key) {
        return this._store.put('main', key.toBase64());
    }

    /**
     * @param {boolean} [enableWatchdog]
     * @returns {ChainDataStore}
     */
    transaction(enableWatchdog = true) {
        const tx = this._store.transaction(enableWatchdog);
        return new ChainDataStore(tx);
    }

    /**
     * @returns {Promise}
     */
    commit() {
        return this._store.commit();
    }

    /**
     * @returns {Promise}
     */
    abort() {
        return this._store.abort();
    }

    /**
     * @returns {Promise}
     */
    truncate() {
        return this._store.truncate();
    }
}
Class.register(ChainDataStore);

/**
 * @implements {ICodec}
 */
class ChainDataStoreCodec {
    /**
     * @param {*} obj The object to encode before storing it.
     * @returns {*} Encoded object.
     */
    encode(obj) {
        return obj;
    }

    /**
     * @param {*} obj The object to decode.
     * @param {string} key The object's primary key.
     * @returns {*} Decoded object.
     */
    decode(obj, key) {
        return typeof obj === 'string' ? obj : ChainData.copy(obj);
    }

    /**
     * @type {{encode: function(val:*):*, decode: function(val:*):*, buffer: boolean, type: string}|void}
     */
    get valueEncoding() {
        return JDB.JungleDB.JSON_ENCODING;
    }
}

class Mempool extends Observable {
    /**
     * @param {IBlockchain} blockchain
     * @param {Accounts} accounts
     */
    constructor(blockchain, accounts) {
        super();
        /** @type {Blockchain} */
        this._blockchain = blockchain;
        /** @type {Accounts} */
        this._accounts = accounts;

        // Our pool of transactions.
        /** @type {HashMap.<Hash, Transaction>} */
        this._transactions = new HashMap();

        // All public keys of transaction senders currently in the pool.
        /** @type {HashSet.<PublicKey>} */
        this._senderPubKeys = new HashSet();

        // Listen for changes in the blockchain head to evict transactions that
        // have become invalid.
        blockchain.on('head-changed', () => this._evictTransactions());
    }

    /**
     * @param {Transaction} transaction
     * @fires Mempool#transaction-added
     * @returns {Promise.<boolean>}
     */
    async pushTransaction(transaction) {
        // Check if we already know this transaction.
        const hash = await transaction.hash();
        if (this._transactions.contains(hash)) {
            Log.v(Mempool, `Ignoring known transaction ${hash.toBase64()}`);
            return false;
        }

        // Fully verify the transaction against the current accounts state.
        if (!(await this._verifyTransaction(transaction))) {
            return false;
        }

        // Only allow one transaction per senderPubKey at a time.
        // TODO This is a major limitation!
        if (this._senderPubKeys.contains(transaction.senderPubKey)) {
            Log.w(Mempool, 'Rejecting transaction - duplicate sender public key');
            return false;
        }
        this._senderPubKeys.add(transaction.senderPubKey);

        // Transaction is valid, add it to the mempool.
        this._transactions.put(hash, transaction);

        // Tell listeners about the new valid transaction we received.
        this.fire('transaction-added', transaction);

        return true;
    }

    /**
     * @param {Hash} hash
     * @returns {Transaction}
     */
    getTransaction(hash) {
        return this._transactions.get(hash);
    }

    /**
     * @param {number} maxCount
     * @returns {Array.<Transaction>}
     */
    getTransactions(maxCount = 5000) {
        // TODO Add logic here to pick the "best" transactions.
        const transactions = [];
        for (const transaction of this._transactions.values()) {
            if (transactions.length >= maxCount) break;
            transactions.push(transaction);
        }
        return transactions;
    }

    /**
     * @param {Transaction} transaction
     * @returns {Promise.<boolean>}
     * @private
     */
    async _verifyTransaction(transaction) {
        // Verify transaction signature.
        if (!(await transaction.verifySignature())) {
            Log.w(Mempool, 'Rejected transaction - invalid signature', transaction);
            return false;
        }

        // Do not allow transactions where sender and recipient coincide.
        const senderAddr = await transaction.getSenderAddr();
        if (transaction.recipientAddr.equals(senderAddr)) {
            Log.w(Mempool, 'Rejecting transaction - sender and recipient coincide');
            return false;
        }

        // Verify transaction balance.
        return this._verifyTransactionBalance(transaction);
    }

    /**
     * @param {Transaction} transaction
     * @param {boolean} quiet
     * @returns {Promise.<boolean>}
     * @private
     */
    async _verifyTransactionBalance(transaction, quiet = false) {
        // Verify balance and nonce:
        // - sender account balance must be greater or equal the transaction value + fee.
        // - sender account nonce must match the transaction nonce.
        const senderAddr = await transaction.getSenderAddr();
        const senderBalance = await this._accounts.getBalance(senderAddr);
        if (senderBalance.value < (transaction.value + transaction.fee)) {
            if (!quiet) Log.w(Mempool, 'Rejected transaction - insufficient funds', transaction);
            return false;
        }

        if (senderBalance.nonce !== transaction.nonce) {
            if (!quiet) Log.w(Mempool, 'Rejected transaction - invalid nonce', transaction);
            return false;
        }

        // Everything checks out.
        return true;
    }

    /**
     * @fires Mempool#transaction-ready
     * @returns {Promise}
     * @private
     */
    async _evictTransactions() {
        // Evict all transactions from the pool that have become invalid due
        // to changes in the account state (i.e. typically because the were included
        // in a newly mined block). No need to re-check signatures.
        const promises = [];
        for (const hash of this._transactions.keys()) {
            const transaction = this._transactions.get(hash);
            promises.push(this._verifyTransactionBalance(transaction, true).then(isValid => {
                if (!isValid) {
                    this._transactions.remove(hash);
                    this._senderPubKeys.remove(transaction.senderPubKey);
                }
            }));
        }
        await Promise.all(promises);

        // Tell listeners that the pool has updated after a blockchain head change.
        /**
         * @event Mempool#transaction-ready
         */
        this.fire('transactions-ready');
    }
}
Class.register(Mempool);

/**
 * An anchored, contiguous chain of full blocks.
 */
class FullChain extends BaseChain {
    /**
     * @param {JungleDB} jdb
     * @param {Accounts} accounts
     * @returns {Promise.<FullChain>}
     */
    static getPersistent(jdb, accounts) {
        const store = ChainDataStore.getPersistent(jdb);
        const chain = new FullChain(store, accounts);
        return chain._init();
    }

    /**
     * @param {Accounts} accounts
     * @returns {Promise.<FullChain>}
     */
    static createVolatile(accounts) {
        const store = ChainDataStore.createVolatile();
        const chain = new FullChain(store, accounts);
        return chain._init();
    }

    /**
     * @param {ChainDataStore} store
     * @param {Accounts} accounts
     * @returns {FullChain}
     */
    constructor(store, accounts) {
        super(store);
        this._accounts = accounts;

        /** @type {HashMap.<Hash,Accounts>} */
        this._snapshots = new HashMap();
        /** @type {Array.<Hash>} */
        this._snapshotOrder = [];

        /** @type {number} */
        this._totalDifficulty = 0;
        /** @type {number} */
        this._totalWork = 0;

        /** @type {ChainData} */
        this._mainChain = null;

        // Blocks arriving fast over the network will create a backlog of blocks
        // in the synchronizer queue. Tell listeners when the blockchain is
        // ready to accept blocks again.
        /**
         * @type {Synchronizer}
         * @private
         *]
         * i
         *
         * i
         */
        this._synchronizer = new Synchronizer();
        this._synchronizer.on('work-end', () => this.fire('ready', this));
    }

    /**
     * @returns {Promise.<FullChain>}
     * @protected
     */
    async _init() {
        this._headHash = await this._store.getHead();
        if (this._headHash) {
            // Load main chain from store.
            this._mainChain = await this._store.getChainData(this._headHash);
            Assert.that(!!this._mainChain, 'Failed to load main chain from storage');

            // TODO Check if chain/accounts state is consistent!
            Assert.that(this._mainChain.head.accountsHash.equals(await this._accounts.hash()), 'Corrupted store: Inconsistent chain/accounts state');
        } else {
            // Initialize chain & accounts with Genesis block.
            this._mainChain = new ChainData(Block.GENESIS, Block.GENESIS.difficulty, BlockUtils.realDifficulty(Block.GENESIS.HASH), true);
            this._headHash = Block.GENESIS.HASH;

            const tx = this._store.transaction();
            await tx.putChainData(Block.GENESIS.HASH, this._mainChain);
            await tx.setHead(Block.GENESIS.HASH);
            await tx.commit();

            await this._accounts.commitBlock(Block.GENESIS);
        }

        return this;
    }

    /**
     * @param {Block} block
     * @returns {Promise.<number>}
     */
    pushBlock(block) {
        return this._synchronizer.push(() => {
            return this._pushBlock(block);
        });
    }

    /**
     * @param {Block} block
     * @returns {Promise.<number>}
     * @fires FullChain#head-changed
     * @protected
     */
    async _pushBlock(block) {
        // Check if we already know this block.
        const hash = await block.hash();
        const knownBlock = await this._store.getBlock(hash);
        if (knownBlock) {
            Log.v(FullChain, `Ignoring known block ${hash}`);
            return FullChain.OK_KNOWN;
        }

        // Check that the given block is a full block (includes block body).
        if (!block.isFull()) {
            Log.w(FullChain, 'Rejecting block - body missing');
            return FullChain.ERR_INVALID;
        }

        // Check all intrinsic block invariants.
        if (!(await block.verify())) {
            return FullChain.ERR_INVALID;
        }

        // Check that all known interlink blocks are valid predecessors of the given block.
        // if (!(await this._verifyInterlink(block))) {
        //     Log.w(FullChain, 'Rejecting block - interlink verification failed');
        //     return FullChain.ERR_INVALID;
        // }

        // Check if the block's immediate predecessor is part of the chain.
        /** @type {ChainData} */
        const prevData = await this._store.getChainData(block.prevHash);
        if (!prevData) {
            Log.w(FullChain, 'Rejecting block - unknown predecessor');
            return FullChain.ERR_ORPHAN;
        }

        // Check that the block is a valid successor of its immediate predecessor.
        const predecessor = prevData.head;
        if (!(await block.isImmediateSuccessorOf(predecessor))) {
            Log.w(FullChain, 'Rejecting block - not a valid immediate successor');
            return FullChain.ERR_INVALID;
        }

        // Check that the difficulty is correct.
        const nextTarget = await this.getNextTarget(predecessor);
        Assert.that(BlockUtils.isValidTarget(nextTarget), 'Failed to compute next target in FullChain');
        if (block.nBits !== BlockUtils.targetToCompact(nextTarget)) {
            Log.w(FullChain, 'Rejecting block - difficulty mismatch');
            return FullChain.ERR_INVALID;
        }

        // Block looks good, create ChainData.
        const totalDifficulty = prevData.totalDifficulty + block.difficulty;
        const totalWork = prevData.totalWork + BlockUtils.realDifficulty(hash);
        const chainData = new ChainData(block, totalDifficulty, totalWork);

        // Check if the block extends our current main chain.
        if (block.prevHash.equals(this.headHash)) {
            // Append new block to the main chain.
            if (!(await this._extend(hash, chainData))) {
                return FullChain.ERR_INVALID;
            }

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return FullChain.OK_EXTENDED;
        }

        // Otherwise, check if the new chain is harder than our current main chain.
        if (totalDifficulty > this.totalDifficulty) {
            // A fork has become the hardest chain, rebranch to it.
            if (!(await this._rebranch(hash, chainData))) {
                return FullChain.ERR_INVALID;
            }

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return FullChain.OK_REBRANCHED;
        }

        // Otherwise, we are creating/extending a fork. Store chain data.
        Log.v(FullChain, `Creating/extending fork with block ${hash}, height=${block.height}, totalDifficulty=${chainData.totalDifficulty}, totalWork=${chainData.totalWork}`);
        await this._store.putChainData(hash, chainData);

        return FullChain.OK_FORKED;
    }

    /**
     * @param {Block} block
     * @returns {Promise.<boolean>}
     * @protected
     */
    async _verifyInterlink(block) {
        // Check that all blocks referenced in the interlink of the given block are valid predecessors of that block.
        // interlink[0] == Genesis is checked in Block.verify().
        for (let i = 1; i < block.interlink.length; i++) {
            const predecessor = await this._store.getBlock(block.interlink.hashes[i]); // eslint-disable-line no-await-in-loop
            if (!predecessor || !(await block.isInterlinkSuccessorOf(predecessor))) { // eslint-disable-line no-await-in-loop
                return false;
            }
        }
        return true;
    }

    /**
     * @param {Hash} blockHash
     * @param {string} startPrefix
     * @returns {Promise.<boolean|AccountsTreeChunk>}
     */
    async getAccountsTreeChunk(blockHash, startPrefix) {
        const snapshot = await this._getSnapshot(blockHash);
        return snapshot && await snapshot.getAccountsTreeChunk(startPrefix);
    }

    /**
     * @param {Hash} blockHash
     * @param {Array.<Address>} addresses
     * @returns {Promise.<boolean|AccountsProof>}
     */
    async getAccountsProof(blockHash, addresses) {
        const snapshot = await this._getSnapshot(blockHash);
        return snapshot && await snapshot.getAccountsProof(addresses);
    }

    /**
     * @param {Hash} blockHash
     * @returns {Promise.<boolean|Accounts>}
     */
    async _getSnapshot(blockHash) {
        const block = await this.getBlock(blockHash);
        // Check if blockHash is a block on the main chain within the allowed window.
        if (!block || this._mainChain.head.height - block.height > Policy.NUM_SNAPSHOTS_MAX) {
            return false;
        }

        // Check if there already is a snapshot, otherwise create it.
        let snapshot = null;
        if (!this._snapshots.contains(blockHash)) {
            const tx = await this._accounts.transaction();
            let currentHash = this._headHash;
            // Save all snapshots up to blockHash (and stop when its predecessor would be next).
            while (!block.prevHash.equals(currentHash)) {
                const currentBlock = await this.getBlock(currentHash);

                if (!this._snapshots.contains(currentHash)) {
                    snapshot = await tx.snapshot();
                    this._snapshotOrder.unshift(currentHash);
                    this._snapshots.put(currentHash, snapshot);
                }

                await tx.revertBlock(currentBlock);
                currentHash = currentBlock.prevHash;
            }
            await tx.abort();
        } else {
            snapshot = this._snapshots.get(blockHash);
        }

        return snapshot;
    }

    /**
     * @param {Hash} blockHash
     * @returns {Promise.<void>}
     * @private
     */
    async _saveSnapshot(blockHash) {
        // Replace oldest snapshot if possible.
        // This ensures snapshots are only created lazily.
        if (this._snapshotOrder.length > 0) {
            const oldestHash = this._snapshotOrder.shift();
            // If the hash is not reused, remove it.
            const oldestSnapshot = this._snapshots.get(oldestHash);
            await oldestSnapshot.abort();
            this._snapshots.remove(oldestHash);

            // Add new snapshot.
            this._snapshotOrder.push(blockHash);
            const snapshot = await this._accounts.snapshot();
            this._snapshots.put(blockHash, snapshot);
        }
    }

    /**
     * @param {Hash} blockHash
     * @param {ChainData} chainData
     * @returns {Promise.<boolean>}
     * @private
     */
    async _extend(blockHash, chainData) {
        try {
            await this._accounts.commitBlock(chainData.head);
        } catch (e) {
            // AccountsHash mismatch. This can happen if someone gives us an invalid block.
            // TODO error handling
            Log.w(FullChain, 'Rejecting block - AccountsHash mismatch');
            return false;
        }

        // New block on main chain, so store a new snapshot.
        await this._saveSnapshot(blockHash);

        chainData.onMainChain = true;

        const tx = await this._store.transaction();
        await tx.putChainData(blockHash, chainData);
        await tx.setHead(blockHash);
        await tx.commit();

        this._mainChain = chainData;
        this._headHash = blockHash;

        return true;
    }

    /**
     * @param {Hash} blockHash
     * @param {ChainData} chainData
     * @returns {Promise.<boolean>}
     * @private
     */
    async _rebranch(blockHash, chainData) {
        Log.v(FullChain, `Rebranching to fork ${blockHash}, height=${chainData.head.height}, totalDifficulty=${chainData.totalDifficulty}, totalWork=${chainData.totalWork}`);

        // Drop all snapshots.
        for (const hash of this._snapshotOrder) {
            const snapshot = this._snapshots.get(hash);
            snapshot.abort(); // We do not need to wait for the abortion as long as it has been triggered.
        }
        this._snapshots.clear();
        this._snapshotOrder = [];


        // Find the common ancestor between our current main chain and the fork chain.
        // Walk up the fork chain until we find a block that is part of the main chain.
        // Store the chain along the way.
        const forkChain = [];
        const forkHashes = [];

        let curData = chainData;
        let curHash = blockHash;
        while (!curData.onMainChain) {
            forkChain.push(curData);
            forkHashes.push(curHash);

            curHash = curData.head.prevHash;
            curData = await this._store.getChainData(curHash); // eslint-disable-line no-await-in-loop
            Assert.that(!!curData, 'Corrupted store: Failed to find fork predecessor while rebranching');
        }

        Log.v(FullChain, `Found common ancestor ${curHash.toBase64()} ${forkChain.length} blocks up`);

        // Validate all accountsHashes on the fork. Revert the AccountsTree to the common ancestor state first.
        const accountsTx = await this._accounts.transaction();
        let headHash = this._headHash;
        let head = this._mainChain.head;
        while (!headHash.equals(curHash)) {
            try {
                await accountsTx.revertBlock(head);
            } catch (e) {
                Log.e(FullChain, 'Failed to revert main chain while rebranching', e);
                await accountsTx.abort();
                return false;
            }

            headHash = head.prevHash;
            head = await this._store.getBlock(headHash);
            Assert.that(!!head, 'Corrupted store: Failed to find main chain predecessor while rebranching');
            Assert.that(head.accountsHash.equals(await accountsTx.hash()), 'Failed to revert main chain - inconsistent state');
        }

        // Try to apply all fork blocks.
        for (let i = forkChain.length - 1; i >= 0; i--) {
            try {
                await accountsTx.commitBlock(forkChain[i].head);
            } catch (e) {
                // A fork block is invalid.
                // TODO delete invalid block and its successors from store.
                Log.e(FullChain, 'Failed to apply fork block while rebranching', e);
                await accountsTx.abort();
                return false;
            }
        }

        // Fork looks good. Unset onMainChain flag on the current main chain up to (excluding) the common ancestor.
        const chainTx = this._store.transaction();
        headHash = this._headHash;
        let headData = this._mainChain;
        while (!headHash.equals(curHash)) {
            headData.onMainChain = false;
            await chainTx.putChainData(headHash, headData);

            headHash = headData.head.prevHash;
            headData = await chainTx.getChainData(headHash);
            Assert.that(!!headData, 'Corrupted store: Failed to find main chain predecessor while rebranching');
        }

        // Set onMainChain flag on the fork.
        for (let i = forkChain.length - 1; i >= 0; i--) {
            const forkData = forkChain[i];
            forkData.onMainChain = true;
            await chainTx.putChainData(forkHashes[i], forkData);
        }

        // Update head & commit transactions.
        // TODO commit both transactions atomically.
        await chainTx.setHead(blockHash);
        // await JDB.JungleDB.commitCombined(chainTx, accountsTx);
        await chainTx.commit();
        await accountsTx.commit();

        this._mainChain = chainData;
        this._headHash = blockHash;

        return true;
    }

    /**
     *
     * @param {number} startHeight
     * @param {number} count
     * @param {boolean} forward
     * @returns {Promise.<Array.<Block>>}
     */
    getBlocks(startHeight, count = 500, forward = true) {
        return this._store.getBlocks(startHeight, count, forward);
    }

    /** @type {Block} */
    get head() {
        return this._mainChain.head;
    }

    /** @type {Hash} */
    get headHash() {
        return this._headHash;
    }

    get height() {
        return this._mainChain.head.height;
    }

    /** @type {number} */
    get totalDifficulty() {
        return this._mainChain.totalDifficulty;
    }

    /** @type {number} */
    get totalWork() {
        return this._mainChain.totalWork;
    }

    /** @type {boolean} */
    get busy() {
        return this._synchronizer.working;
    }

    /** @type {Accounts} */
    // XXX Do we really want to expose this?
    get accounts() {
        return this._accounts;
    }

    /**
     * @returns {Promise.<Hash>}
     */
    // XXX Do we really want to expose this?
    accountsHash() {
        return this._accounts.hash();
    }
}
FullChain.ERR_ORPHAN = -2;
FullChain.ERR_INVALID = -1;
FullChain.OK_KNOWN = 0;
FullChain.OK_EXTENDED = 1;
FullChain.OK_REBRANCHED = 2;
FullChain.OK_FORKED = 3;
Class.register(FullChain);

class FullConsensusAgent extends Observable {
    /**
     * @param {FullChain} blockchain
     * @param {Mempool} mempool
     * @param {Peer} peer
     */
    constructor(blockchain, mempool, peer) {
        super();
        /** @type {FullChain} */
        this._blockchain = blockchain;
        /** @type {Mempool} */
        this._mempool = mempool;
        /** @type {Peer} */
        this._peer = peer;

        // Flag indicating that we are currently syncing our blockchain with the peer's.
        /** @type {boolean} */
        this._syncing = false;

        // Flag indicating that have synced our blockchain with the peer's.
        /** @type {boolean} */
        this._synced = false;

        // The height of our blockchain when we last attempted to sync the chain.
        /** @type {number} */
        this._lastChainHeight = 0;

        // The number of failed blockchain sync attempts.
        /** @type {number} */
        this._failedSyncs = 0;

        // Set of all objects (InvVectors) that we think the remote peer knows.
        /** @type {HashSet.<InvVector>} */
        this._knownObjects = new HashSet();

        // InvVectors we want to request via getData are collected here and
        // periodically requested.
        /** @type {HashSet.<InvVector>} */
        this._objectsToRequest = new HashSet();

        // Objects that are currently being requested from the peer.
        /** @type {HashSet.<InvVector>} */
        this._objectsInFlight = null;

        // Helper object to keep track of timeouts & intervals.
        /** @type {Timers} */
        this._timers = new Timers();

        // Listen to consensus messages from the peer.
        peer.channel.on('inv', msg => this._onInv(msg));
        peer.channel.on('get-data', msg => this._onGetData(msg));
        peer.channel.on('get-header', msg => this._onGetHeader(msg));
        peer.channel.on('not-found', msg => this._onNotFound(msg));
        peer.channel.on('block', msg => this._onBlock(msg));
        peer.channel.on('tx', msg => this._onTx(msg));
        peer.channel.on('get-blocks', msg => this._onGetBlocks(msg));
        peer.channel.on('mempool', msg => this._onMempool(msg));

        peer.channel.on('get-chain-proof', msg => this._onGetChainProof(msg));
        peer.channel.on('get-accounts-proof', msg => this._onGetAccountsProof(msg));
        peer.channel.on('get-accounts-tree-chunk', msg => this._onGetAccountsTreeChunk(msg));

        // Clean up when the peer disconnects.
        peer.channel.on('close', () => this._onClose());

        // Wait for the blockchain to processes queued blocks before requesting more.
        this._blockchain.on('ready', () => {
            if (this._syncing) this.syncBlockchain();
        });
    }

    /**
     * @param {Block} block
     * @return {Promise}
     */
    async relayBlock(block) {
        // Don't relay if no consensus established yet.
        if (!this._synced) {
            return;
        }

        // Create InvVector.
        const hash = await block.hash();
        const vector = new InvVector(InvVector.Type.BLOCK, hash);

        // Don't relay block to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay block to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this block now.
        this._knownObjects.add(vector);
    }

    /**
     * @param {Transaction} transaction
     * @return {Promise}
     */
    async relayTransaction(transaction) {
        // TODO Don't relay if no consensus established yet ???

        // Create InvVector.
        const hash = await transaction.hash();
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);

        // Don't relay transaction to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay transaction to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this transaction now.
        this._knownObjects.add(vector);
    }

    async syncBlockchain() {
        this._syncing = true;

        // If the blockchain is still busy processing blocks, wait for it to catch up.
        if (this._blockchain.busy) {
            Log.v(FullConsensusAgent, 'Blockchain busy, waiting ...');
            return;
        }

        // We only sync with other full nodes.
        if (!Services.isFullNode(this._peer.peerAddress.services)) {
            this._syncFinished();
            return;
        }

        // If we know the peer's head block, there is nothing more to be learned from this peer.
        const head = await this._blockchain.getBlock(this._peer.headHash, /*includeForks*/ true);
        if (head) {
            this._syncFinished();
            return;
        }

        // If we already requested blocks from the peer but it didn't give us any
        // good ones, retry or drop the peer.
        if (this._lastChainHeight === this._blockchain.height) {
            this._failedSyncs++;
            if (this._failedSyncs < FullConsensusAgent.MAX_SYNC_ATTEMPTS) {
                this._requestBlocks();
            } else {
                this._peer.channel.ban('blockchain sync failed');
            }
            return;
        }

        // We don't know the peer's head block, request blocks from it.
        this._lastChainHeight = this._blockchain.height;
        this._requestBlocks();
    }

    _syncFinished() {
        this._syncing = false;
        this._synced = true;
        this.fire('sync');
    }

    async _requestBlocks() {
        // XXX Only one getBlocks request at a time.
        if (this._timers.timeoutExists('getBlocks')) {
            Log.e(FullConsensusAgent, 'Duplicate _requestBlocks()');
            return;
        }

        // Request blocks starting from our hardest chain head going back to
        // the genesis block. Push top 10 hashes first, then back off exponentially.
        /** @type {Array.<Hash>} */
        const locators = [this._blockchain.headHash];
        let block = this._blockchain.head;
        for (let i = Math.min(10, this._blockchain.height) - 1; i > 0; i--) {
            locators.push(block.prevHash);
            block = await this._blockchain.getBlock(block.prevHash); // eslint-disable-line no-await-in-loop
        }

        let step = 2;
        for (let i = this._blockchain.height - 10 - step; i > 0; i -= step) {
            block = await this._blockchain.getBlockAt(i); // eslint-disable-line no-await-in-loop
            locators.push(await block.hash()); // eslint-disable-line no-await-in-loop
            step *= 2;
        }

        // Push the genesis block hash.
        if (locators.length === 0 || !locators[locators.length - 1].equals(Block.GENESIS.HASH)) {
            locators.push(Block.GENESIS.HASH);
        }

        // Request blocks from peer.
        this._peer.channel.getBlocks(locators);

        // Drop the peer if it doesn't start sending InvVectors for its chain within the timeout.
        this._timers.setTimeout('getBlocks', () => {
            this._timers.clearTimeout('getBlocks');
            this._peer.channel.close('getBlocks timeout');
        }, FullConsensusAgent.REQUEST_TIMEOUT);
    }

    /**
     * @param {InvMessage} msg
     * @return {Promise}
     * @private
     */
    async _onInv(msg) {
        // Clear the getBlocks timeout.
        this._timers.clearTimeout('getBlocks');

        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the advertised objects we know
        // Request unknown objects, ignore known ones.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    // Ignore block announcements from nano clients as they will ignore our getData requests anyways (they only know headers).
                    if (Services.isNanoNode(this._peer.peerAddress.services)) {
                        continue;
                    }

                    const block = await this._blockchain.getBlock(vector.hash, /*includeForks*/ true); // eslint-disable-line no-await-in-loop
                    if (!block) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION: {
                    const tx = await this._mempool.getTransaction(vector.hash); // eslint-disable-line no-await-in-loop
                    if (!tx) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        Log.v(FullConsensusAgent, `[INV] ${msg.vectors.length} vectors (${unknownObjects.length} new) received from ${this._peer.peerAddress}`);

        if (unknownObjects.length > 0) {
            // Store unknown vectors in objectsToRequest.
            this._objectsToRequest.addAll(unknownObjects);

            // Clear the request throttle timeout.
            this._timers.clearTimeout('inv');

            // If there are enough objects queued up, send out a getData request.
            if (this._objectsToRequest.length >= FullConsensusAgent.REQUEST_THRESHOLD) {
                this._requestData();
            }
            // Otherwise, wait a short time for more inv messages to arrive, then request.
            else {
                this._timers.setTimeout('inv', () => this._requestData(), FullConsensusAgent.REQUEST_THROTTLE);
            }
        } else {
            // XXX The peer is weird. Give him another chance.
            this._noMoreData();
        }
    }

    _requestData() {
        // Only one request at a time.
        if (this._objectsInFlight) return;

        // Don't do anything if there are no objects queued to request.
        if (this._objectsToRequest.isEmpty()) return;

        // Request queued objects from the peer. Only request up to VECTORS_MAX_COUNT objects at a time.
        const vectorsMaxCount = BaseInventoryMessage.VECTORS_MAX_COUNT;
        /** @type {Array.<InvVector>} */
        let vectors;
        if (this._objectsToRequest.length > vectorsMaxCount) {
            vectors = Array.from(new LimitIterable(this._objectsToRequest.valueIterator(), vectorsMaxCount));

            // Mark the requested objects as in-flight.
            this._objectsInFlight = new HashSet();
            this._objectsInFlight.addAll(vectors);

            // Remove requested objects from queue.
            this._objectsToRequest.removeAll(vectors);
        } else {
            vectors = Array.from(this._objectsToRequest.valueIterator());

            // Mark the requested objects as in-flight.
            this._objectsInFlight = this._objectsToRequest;

            // Reset the queue.
            this._objectsToRequest = new HashSet();
        }

        // Send getData request to peer.
        this._peer.channel.getData(vectors);

        // Set timer to detect end of request / missing objects
        this._timers.setTimeout('getData', () => this._noMoreData(), FullConsensusAgent.REQUEST_TIMEOUT);
    }

    _noMoreData() {
        // Cancel the request timeout timer.
        this._timers.clearTimeout('getData');

        // Reset objects in flight.
        this._objectsInFlight = null;

        // If there are more objects to request, request them.
        if (!this._objectsToRequest.isEmpty()) {
            this._requestData();
        }
        // Otherwise, request more blocks if we are still syncing the blockchain.
        else if (this._syncing) {
            this.syncBlockchain();
        }
    }

    /**
     * @param {BlockMessage} msg
     * @return {Promise}
     * @private
     */
    async _onBlock(msg) {
        const hash = await msg.block.hash();

        // Check if we have requested this block.
        const vector = new InvVector(InvVector.Type.BLOCK, hash);
        if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
            Log.w(FullConsensusAgent, `Unsolicited block ${hash} received from ${this._peer.peerAddress}, discarding`);
            // TODO What should happen here? ban? drop connection?
            // Might not be unsolicited but just arrive after our timeout has triggered.
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // Put block into blockchain.
        const status = await this._blockchain.pushBlock(msg.block);

        // TODO send reject message if we don't like the block
        if (status === FullChain.ERR_INVALID) {
            this._peer.channel.ban('received invalid block');
        }
    }

    /**
     * @param {TxMessage} msg
     * @return {Promise}
     * @private
     */
    async _onTx(msg) {
        const hash = await msg.transaction.hash();
        Log.i(FullConsensusAgent, `[TX] Received transaction ${hash} from ${this._peer.peerAddress}`);

        // Check if we have requested this transaction.
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);
        if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
            Log.w(FullConsensusAgent, `Unsolicited transaction ${hash} received from ${this._peer.peerAddress}, discarding`);
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // Put transaction into mempool.
        this._mempool.pushTransaction(msg.transaction);

        // TODO send reject message if we don't like the transaction
        // TODO what to do if the peer keeps sending invalid transactions?
    }

    /**
     * @param {NotFoundMessage} msg
     * @private
     */
    _onNotFound(msg) {
        Log.d(FullConsensusAgent, `[NOTFOUND] ${msg.vectors.length} unknown objects received from ${this._peer.peerAddress}`);

        // Remove unknown objects from in-flight list.
        for (const vector of msg.vectors) {
            if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
                Log.w(FullConsensusAgent, `Unsolicited notfound vector received from ${this._peer.peerAddress}, discarding`);
                continue;
            }

            this._onObjectReceived(vector);
        }
    }

    /**
     * @param {InvVector} vector
     * @private
     */
    _onObjectReceived(vector) {
        if (!this._objectsInFlight) return;

        // Remove the vector from the objectsInFlight.
        this._objectsInFlight.remove(vector);

        // Reset the request timeout if we expect more objects to come.
        if (!this._objectsInFlight.isEmpty()) {
            this._timers.resetTimeout('getData', () => this._noMoreData(), FullConsensusAgent.REQUEST_TIMEOUT);
        } else {
            this._noMoreData();
        }
    }


    /* Request endpoints */

    /**
     * @param {GetDataMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetData(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the requested objects we know.
        // Send back all known objects.
        // Send notFound for unknown objects.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash); // eslint-disable-line no-await-in-loop
                    if (block) {
                        // We have found a requested block, send it back to the sender.
                        this._peer.channel.block(block);
                    } else {
                        // Requested block is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION: {
                    const tx = this._mempool.getTransaction(vector.hash);
                    if (tx) {
                        // We have found a requested transaction, send it back to the sender.
                        this._peer.channel.tx(tx);
                    } else {
                        // Requested transaction is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        // Report any unknown objects back to the sender.
        if (unknownObjects.length) {
            this._peer.channel.notFound(unknownObjects);
        }
    }

    /**
     * @param {GetHeaderMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetHeader(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the requested objects we know.
        // Send back all known objects.
        // Send notFound for unknown objects.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash); // eslint-disable-line no-await-in-loop
                    if (block) {
                        // We have found a requested block, send it back to the sender.
                        this._peer.channel.header(block.header);
                    } else {
                        // Requested block is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION:
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        // Report any unknown objects back to the sender.
        if (unknownObjects.length) {
            this._peer.channel.notFound(unknownObjects);
        }
    }

    /**
     * @param {GetBlocksMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetBlocks(msg) {
        Log.v(FullConsensusAgent, `[GETBLOCKS] ${msg.locators.length} block locators maxInvSize ${msg.maxInvSize} received from ${this._peer.peerAddress}`);

        // A peer has requested blocks. Check all requested block locator hashes
        // in the given order and pick the first hash that is found on our main
        // chain, ignore the rest. If none of the requested hashes is found,
        // pick the genesis block hash. Send the main chain starting from the
        // picked hash back to the peer.
        let startBlock = Block.GENESIS;
        for (const locator of msg.locators) {
            const block = await this._blockchain.getBlock(locator);
            if (block) {
                // We found a block, ignore remaining block locator hashes.
                startBlock = block;
                break;
            }
        }

        // Collect up to GETBLOCKS_VECTORS_MAX inventory vectors for the blocks starting right
        // after the identified block on the main chain.
        const blocks = await this._blockchain.getBlocks(startBlock.height + 1,
            Math.min(msg.maxInvSize, FullConsensusAgent.GETBLOCKS_VECTORS_MAX),
            msg.direction === GetBlocksMessage.Direction.FORWARD);
        const vectors = [];
        for (const block of blocks) {
            const hash = await block.hash();
            vectors.push(new InvVector(InvVector.Type.BLOCK, hash));
        }

        // Send the vectors back to the requesting peer.
        this._peer.channel.inv(vectors);
    }

    /**
     * @param {GetChainProofMessage} msg
     * @private
     */
    async _onGetChainProof(msg) {
        const proof = await this._blockchain.getChainProof();
        this._peer.channel.chainProof(proof);
    }

    /**
     * @param {GetAccountsProofMessage} msg
     * @private
     */
    async _onGetAccountsProof(msg) {
        const proof = await this._blockchain.getAccountsProof(msg.blockHash, msg.addresses);
        if (!proof) {
            this._peer.channel.rejectAccounts();
        } else {
            this._peer.channel.accountsProof(msg.blockHash, proof);
        }
    }

    /**
     * @param {GetAccountsTreeChunkMessage} msg
     * @private
     */
    async _onGetAccountsTreeChunk(msg) {
        const chunk = await this._blockchain.getAccountsTreeChunk(msg.blockHash, msg.startPrefix);
        if (!chunk) {
            this._peer.channel.rejectAccounts();
        } else {
            this._peer.channel.accountsTreeChunk(msg.blockHash, chunk);
        }
    }

    /**
     * @param {MempoolMessage} msg
     * @return {Promise}
     * @private
     */
    async _onMempool(msg) {
        // Query mempool for transactions
        const transactions = await this._mempool.getTransactions();

        // Send transactions back to sender.
        for (const tx of transactions) {
            this._peer.channel.tx(tx);
        }
    }

    /**
     * @private
     * @returns {void}
     */
    _onClose() {
        // Clear all timers and intervals when the peer disconnects.
        this._timers.clearAll();

        this.fire('close', this);
    }

    /** @type {Peer} */
    get peer() {
        return this._peer;
    }

    /** @type {boolean} */
    get synced() {
        return this._synced;
    }
}
/**
 * Number of InvVectors in invToRequest pool to automatically trigger a getData request.
 * @type {number}
 */
FullConsensusAgent.REQUEST_THRESHOLD = 50;
/**
 * Time (ms) to wait after the last received inv message before sending getData.
 * @type {number}
 */
FullConsensusAgent.REQUEST_THROTTLE = 500;
/**
 * Maximum time (ms) to wait after sending out getData or receiving the last object for this request.
 * @type {number}
 */
FullConsensusAgent.REQUEST_TIMEOUT = 5000;
/**
 * Maximum number of blockchain sync retries before closing the connection.
 * XXX If the peer is on a long fork, it will count as a failed sync attempt
 * if our blockchain doesn't switch to the fork within 500 (max InvVectors returned by getBlocks)
 * blocks.
 * @type {number}
 */
FullConsensusAgent.MAX_SYNC_ATTEMPTS = 5;
/**
 * Maximum number of inventory vectors to sent in the response for onGetBlocks.
 * @type {number}
 */
FullConsensusAgent.GETBLOCKS_VECTORS_MAX = 500;
Class.register(FullConsensusAgent);

class FullConsensus extends Observable {
    /**
     * @param {FullChain} blockchain
     * @param {Mempool} mempool
     * @param {Network} network
     */
    constructor(blockchain, mempool, network) {
        super();
        /** @type {FullChain} */
        this._blockchain = blockchain;
        /** @type {Mempool} */
        this._mempool = mempool;
        /** @type {Network} */
        this._network = network;

        /** @type {HashMap.<Peer, FullConsensusAgent>} */
        this._agents = new HashMap();
        /** @type {Timers} */
        this._timers = new Timers();
        /** @type {boolean} */
        this._syncing = false;
        /** @type {boolean} */
        this._established = false;

        network.on('peer-joined', peer => this._onPeerJoined(peer));
        network.on('peer-left', peer => this._onPeerLeft(peer));

        // Notify peers when our blockchain head changes.
        blockchain.on('head-changed', head => {
            // Don't announce head changes if we are not synced yet.
            if (!this._established) return;

            for (const agent of this._agents.values()) {
                agent.relayBlock(head);
            }
        });

        // Relay new (verified) transactions to peers.
        mempool.on('transaction-added', tx => {
            // Don't relay transactions if we are not synced yet.
            if (!this._established) return;

            for (const agent of this._agents.values()) {
                agent.relayTransaction(tx);
            }
        });
    }

    /**
     * @param {Peer} peer
     * @private
     */
    _onPeerJoined(peer) {
        // Create a ConsensusAgent for each peer that connects.
        const agent = new FullConsensusAgent(this._blockchain, this._mempool, peer);
        this._agents.put(peer.id, agent);

        // If no more peers connect within the specified timeout, start syncing.
        this._timers.resetTimeout('sync', this._syncBlockchain.bind(this), FullConsensus.SYNC_THROTTLE);
    }

    /**
     * @param {Peer} peer
     * @private
     */
    _onPeerLeft(peer) {
        this._agents.remove(peer.id);
    }

    /**
     * @private
     */
    _syncBlockchain() {
        // Wait for ongoing sync to finish.
        if (this._syncing) {
            return;
        }

        // Choose a random peer which we aren't sync'd with yet.
        const agent = ArrayUtils.randomElement(this._agents.values().filter(agent => !agent.synced));
        if (!agent) {
            // We are synced with all connected peers.
            this._syncing = false;

            if (this._agents.length > 0) {
                // Report consensus-established if we have at least one connected peer.
                // TODO !!! Check peer types (at least one full node, etc.) !!!
                if (!this._established) {
                    Log.d(FullConsensus, `Synced with all connected peers (${this._agents.length}), consensus established.`);
                    Log.d(FullConsensus, `Blockchain: height=${this._blockchain.height}, totalWork=${this._blockchain.totalWork}, headHash=${this._blockchain.headHash}`);

                    this._established = true;
                    this.fire('established');
                }
            } else {
                // We are not connected to any peers anymore. Report consensus-lost.
                this._established = false;
                this.fire('lost');
            }

            return;
        }

        Log.v(FullConsensus, `Syncing blockchain with peer ${agent.peer.peerAddress}`);

        this._syncing = true;

        agent.on('sync', () => this._onPeerSynced());
        agent.on('close', () => {
            this._onPeerLeft(agent.peer);
            this._onPeerSynced();
        });
        agent.syncBlockchain();
    }

    /**
     * @private
     */
    _onPeerSynced() {
        this._syncing = false;
        this._syncBlockchain();
    }

    /** @type {boolean} */
    get established() {
        return this._established;
    }

    // TODO confidence level?

    /** @type {IBlockchain} */
    get blockchain() {
        return this._blockchain;
    }

    /** @type {Mempool} */
    get mempool() {
        return this._mempool;
    }

    /** @type {Network} */
    get network() {
        return this._network;
    }
}
FullConsensus.SYNC_THROTTLE = 1500; // ms
Class.register(FullConsensus);

class LightChain extends FullChain {
    /**
    * @param {JungleDB} jdb
    * @param {Accounts} accounts
    * @returns {Promise.<LightChain>}
    */
    static getPersistent(jdb, accounts) {
        const store = ChainDataStore.getPersistent(jdb);
        const chain = new LightChain(store, accounts);
        return chain._init();
    }

    /**
     * @param {Accounts} accounts
     * @returns {Promise.<LightChain>}
     */
    static createVolatile(accounts) {
        const store = ChainDataStore.createVolatile();
        const chain = new LightChain(store, accounts);
        return chain._init();
    }

    /**
     * @param {ChainDataStore} store
     * @param {Accounts} accounts
     * @returns {PartialLightChain}
     */
    constructor(store, accounts) {
        super(store, accounts);

        this._proof = new ChainProof(new BlockChain([Block.GENESIS.toLight()]), new HeaderChain([]));
    }

    async partialChain() {
        const partialChain = new PartialLightChain(this._store, this._accounts, this._proof);
        partialChain.on('committed', async (proof, headHash, mainChain) => {
            this._proof = proof;
            this._headHash = headHash;
            this._mainChain = mainChain;
            this.fire('head-changed', this.head);
        });
        await partialChain._init();
        return partialChain;
    }
}
Class.register(LightChain);

class LightConsensusAgent extends Observable {
    /**
     * @param {LightChain} blockchain
     * @param {Mempool} mempool
     * @param {Peer} peer
     */
    constructor(blockchain, mempool, peer) {
        super();
        /** @type {LightChain} */
        this._blockchain = blockchain;
        /** @type {PartialLightChain} */
        this._partialChain = null;
        /** @type {Mempool} */
        this._mempool = mempool;
        /** @type {Peer} */
        this._peer = peer;

        /** @type {boolean} */
        this._syncing = false;

        // Flag indicating whether we do a full catchup or request a proof.
        /** @type {boolean} */
        this._catchup = false;

        // Flag indicating whether we believe to be on the main chain of the client.
        /** @type {boolean} */
        this._onMainChain = false;

        /** @type {Array.<Block>} */
        this._orphanedBlocks = [];

        // Flag indicating that have synced our blockchain with the peer's.
        /** @type {boolean} */
        this._synced = false;

        /** @type {boolean} */
        this._busy = false;

        // The height of our blockchain when we last attempted to sync the chain.
        /** @type {number} */
        this._lastChainHeight = 0;

        // The number of failed blockchain sync attempts.
        /** @type {number} */
        this._failedSyncs = 0;

        // Set of all objects (InvVectors) that we think the remote peer knows.
        /** @type {HashSet.<InvVector>} */
        this._knownObjects = new HashSet();
        this._knownObjects.add(new InvVector(InvVector.Type.BLOCK, peer.headHash));

        // InvVectors we want to request via getData are collected here and
        // periodically requested.
        /** @type {HashSet.<InvVector>} */
        this._objectsToRequest = new HashSet();

        // Objects that are currently being requested from the peer.
        /** @type {HashSet.<InvVector>} */
        this._objectsInFlight = null;

        // Helper object to keep track of timeouts & intervals.
        /** @type {Timers} */
        this._timers = new Timers();

        /** @type {Synchronizer} */
        this._synchronizer = new Synchronizer();

        // Helper object to keep track of the accounts we're requesting from the peer.
        this._accountsRequest = null;

        // Listen to consensus messages from the peer.
        peer.channel.on('inv', msg => this._onInv(msg));
        peer.channel.on('get-data', msg => this._onGetData(msg));
        peer.channel.on('get-header', msg => this._onGetHeader(msg));
        peer.channel.on('not-found', msg => this._onNotFound(msg));
        peer.channel.on('block', msg => this._onBlock(msg));
        peer.channel.on('tx', msg => this._onTx(msg));
        peer.channel.on('get-blocks', msg => this._onGetBlocks(msg));
        peer.channel.on('mempool', msg => this._onMempool(msg));
        peer.channel.on('header', msg => this._onHeader(msg));

        peer.channel.on('chain-proof', msg => this._onChainProof(msg));
        peer.channel.on('accounts-tree-chunk', msg => this._onAccountsTreeChunk(msg));
        peer.channel.on('accounts-rejected', msg => this._onAccountsRejected(msg));

        peer.channel.on('get-chain-proof', msg => this._onGetChainProof(msg));
        peer.channel.on('get-accounts-proof', msg => this._onGetAccountsProof(msg));
        peer.channel.on('get-accounts-tree-chunk', msg => this._onGetAccountsTreeChunk(msg));

        // Clean up when the peer disconnects.
        peer.channel.on('close', () => this._onClose());

        // Wait for the blockchain to processes queued blocks before requesting more.
        this._blockchain.on('ready', () => {
            if (this._syncing && this._catchup) this.syncBlockchain();
        });
    }

    /**
     * @param {Block} block
     * @return {Promise}
     */
    async relayBlock(block) {
        // Don't relay if no consensus established yet.
        if (!this._synced) {
            return;
        }

        // Create InvVector.
        const hash = await block.hash();
        const vector = new InvVector(InvVector.Type.BLOCK, hash);

        // Don't relay block to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay block to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this block now.
        this._knownObjects.add(vector);
    }

    /**
     * @param {Transaction} transaction
     * @return {Promise}
     */
    async relayTransaction(transaction) {
        // TODO Don't relay if no consensus established yet ???

        // Create InvVector.
        const hash = await transaction.hash();
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);

        // Don't relay transaction to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay transaction to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this transaction now.
        this._knownObjects.add(vector);
    }

    /**
     * @returns {Promise.<void>}
     */
    async syncBlockchain() {
        // Ban peer if the sync failed more often than allowed.
        if (this._failedSyncs >= LightConsensusAgent.MAX_SYNC_ATTEMPTS) {
            this._peer.channel.ban('blockchain sync failed');
            if (this._partialChain) {
                await this._partialChain.abort();
            }
        }

        // Check if we know head block.
        const block = this._partialChain
            ? await this._partialChain.getBlock(this._peer.headHash)
            : await this._blockchain.getBlock(this._peer.headHash);

        /*
         * Three cases:
         * 1) We know block and are not yet syncing: All is done.
         * 2) We don't know the block and are not yet syncing: Start syncing.
         *    and determine sync mode (full catchup or not).
         * 3) We are syncing. Behave differently based on sync mode.
         *    Note that we can switch from catchup to proof if we notice that
         *    we're on a fork and get an INV vector starting from the genesis block.
         */

        // Case 1: We're up to date.
        if (block && !this._syncing) {
            this._syncFinished();
            return;
        }

        // Case 2: Check header.
        if (!block && !this._syncing) {
            this._syncing = true;

            let header;
            try {
                header = await this.getHeader(this._peer.headHash);
            } catch(err) {
                this._peer.channel.close('Did not get requested header');
                return;
            }

            // Check how to sync:
            this._catchup = header.height - this._blockchain.height <= Policy.NUM_BLOCKS_VERIFICATION;
            Log.d(LightConsensusAgent, `Start syncing, catchup mode: ${this._catchup}`);
        }

        // Case 3: We are are syncing.
        if (this._syncing && !this._busy) {
            if (this._catchup) {
                if (block) {
                    this._syncFinished();
                } else {
                    // If the blockchain is still busy processing blocks, wait for it to catch up.
                    if (this._blockchain.busy) {
                        Log.v(FullConsensusAgent, 'Blockchain busy, waiting ...');
                        return;
                    }

                    this._requestBlocks();
                }
            } else {
                // Initialize partial chain on first call.
                if (!this._partialChain) {
                    await this._initChainProofSync();
                }

                // If the blockchain is still busy processing blocks, wait for it to catch up.
                if (this._partialChain.busy) {
                    Log.v(FullConsensusAgent, 'Blockchain busy, waiting ...');
                    return;
                }

                switch (this._partialChain.state) {
                    case PartialLightChain.State.PROVE_CHAIN:
                        this._requestChainProof();
                        this._onMainChain = true;
                        break;
                    case PartialLightChain.State.PROVE_ACCOUNTS_TREE:
                        this._requestAccountsTree();
                        break;
                    case PartialLightChain.State.PROVE_BLOCKS:
                        this._requestProofBlocks();
                        break;
                    case PartialLightChain.State.COMPLETE:
                        // Commit state on success.
                        this._busy = true;
                        await this._partialChain.commit();
                        await this._applyOrphanedBlocks();
                        this._syncFinished();
                        break;
                    case PartialLightChain.State.ABORTED:
                        this._syncFinished();
                        break;
                }
            }
        }
    }

    /**
     * @returns {Promise.<void>}
     * @private
     */
    async _initChainProofSync() {
        this._syncing = true;
        this._synced = false;
        this._catchup = false;

        if (this._partialChain) {
            await this._partialChain.abort();
        }

        this._partialChain = await this._blockchain.partialChain();
        // Wait for the blockchain to processes queued blocks before requesting more.
        this._partialChain.on('ready', () => {
            if (this._syncing && (this._partialChain.state === PartialLightChain.State.PROVE_BLOCKS
                || this._partialChain.state === PartialLightChain.State.COMPLETE)) {
                this.syncBlockchain();
            }
        });
    }

    /**
     * @returns {void}
     * @private
     */
    _syncFinished() {
        if (this._partialChain) {
            this._partialChain = null;
        }
        this._busy = false;
        this._syncing = false;
        this._failedSyncs = 0;

        this._synced = true;
        this.fire('sync');
    }

    /**
     * @returns {Promise.<void>}
     * @private
     */
    async _applyOrphanedBlocks() {
        const len = this._orphanedBlocks.length;
        for (let i = 0; i < len; ++i) {
            const block = this._orphanedBlocks.shift();
            const status = await this._blockchain.pushBlock(block);
            if (status === LightChain.ERR_INVALID) {
                this._peer.channel.ban('received invalid block');
                break;
            }
        }
    }

    /**
     * @returns {Promise.<void>}
     * @private
     */
    async _requestProofBlocks() {
        Assert.that(this._partialChain && this._partialChain.state === PartialLightChain.State.PROVE_BLOCKS);

        // If nothing happend since the last request, increase failed syncs.
        if (this._lastChainHeight === this._partialChain.proofHeadHeight) {
            this._failedSyncs++;
        }
        this._lastChainHeight = this._partialChain.proofHeadHeight;

        // XXX Only one getBlocks request at a time.
        if (this._timers.timeoutExists('getBlocks')) {
            Log.e(LightConsensusAgent, 'Duplicate _requestProofBlocks()');
            return;
        }

        // Request blocks from peer.
        this._peer.channel.getBlocks(await this._partialChain.getBlockLocators(), this._partialChain.numBlocksNeeded(), false);

        // Drop the peer if it doesn't start sending InvVectors for its chain within the timeout.
        // TODO should we ban here instead?
        this._timers.setTimeout('getBlocks', () => {
            this._timers.clearTimeout('getBlocks');
            this._peer.channel.close('getBlocks timeout');
        }, LightConsensusAgent.REQUEST_TIMEOUT);
    }

    /**
     * @returns {Promise.<void>}
     * @private
     */
    async _requestBlocks() {
        // XXX Only one getBlocks request at a time.
        if (this._timers.timeoutExists('getBlocks')) {
            Log.e(LightConsensusAgent, 'Duplicate _requestBlocks()');
            return;
        }

        // Request blocks starting from our hardest chain head going back to
        // the genesis block. Push top 10 hashes first, then back off exponentially.
        /** @type {Array.<Hash>} */
        const locators = [this._blockchain.headHash];
        let block = this._blockchain.head;
        for (let i = Math.min(10, this._blockchain.height) - 1; i > 0; i--) {
            locators.push(block.prevHash);
            block = await this._blockchain.getBlock(block.prevHash); // eslint-disable-line no-await-in-loop
        }

        let step = 2;
        for (let i = this._blockchain.height - 10 - step; i > 0; i -= step) {
            block = await this._blockchain.getBlockAt(i); // eslint-disable-line no-await-in-loop
            if (!block) {
                break;
            }
            locators.push(await block.hash()); // eslint-disable-line no-await-in-loop
            step *= 2;
        }

        // Push the genesis block hash.
        if (locators.length === 0 || !locators[locators.length - 1].equals(Block.GENESIS.HASH)) {
            locators.push(Block.GENESIS.HASH);
        }

        // Request blocks from peer.
        this._peer.channel.getBlocks(locators, this._onMainChain ? LightConsensusAgent.GETBLOCKS_VECTORS_MAX : 1);

        // Drop the peer if it doesn't start sending InvVectors for its chain within the timeout.
        // TODO should we ban here instead?
        this._timers.setTimeout('getBlocks', () => {
            this._timers.clearTimeout('getBlocks');
            this._peer.channel.close('getBlocks timeout');
        }, LightConsensusAgent.REQUEST_TIMEOUT);
    }

    /**
     * @private
     */
    _requestAccountsTree() {
        Assert.that(this._partialChain && this._partialChain.state === PartialLightChain.State.PROVE_ACCOUNTS_TREE);
        this._busy = true;

        this._requestAccountsTreeChunk(this._partialChain.getMissingAccountsPrefix(), this._partialChain.headHash);
    }

    /**
     * @param {string} startPrefix
     * @param {Hash} headHash
     * @private
     */
    _requestAccountsTreeChunk(startPrefix, headHash) {
        Assert.that(!this._timers.timeoutExists('getAccountsTreeChunk'));

        Log.d(LightConsensusAgent, `Requesting AccountsTreeChunk starting at ${startPrefix} from ${this._peer.peerAddress}`);

        this._accountsRequest = {
            startPrefix: startPrefix,
            blockHash: headHash
        };

        // Request AccountsProof from peer.
        this._peer.channel.getAccountsTreeChunk(headHash, startPrefix);

        // Drop the peer if it doesn't send the accounts proof within the timeout.
        this._timers.setTimeout('getAccountsTreeChunk', () => {
            this._peer.channel.close('getAccountsTreeChunk timeout');
        }, LightConsensusAgent.ACCOUNTS_TREE_CHUNK_REQUEST_TIMEOUT);
    }

    /**
     * @returns {void}
     * @private
     */
    _requestChainProof() {
        Assert.that(this._partialChain && this._partialChain.state === PartialLightChain.State.PROVE_CHAIN);
        Assert.that(!this._timers.timeoutExists('getChainProof'));
        this._busy = true;

        // Request ChainProof from peer.
        this._peer.channel.getChainProof();

        // Drop the peer if it doesn't send the chain proof within the timeout.
        // TODO should we ban here instead?
        this._timers.setTimeout('getChainProof', () => {
            this._peer.channel.close('getChainProof timeout');
        }, LightConsensusAgent.CHAINPROOF_REQUEST_TIMEOUT);
    }

    /**
     * @param {ChainProofMessage} msg
     * @returns {Promise.<void>}
     * @private
     */
    async _onChainProof(msg) {
        Assert.that(this._partialChain && this._partialChain.state === PartialLightChain.State.PROVE_CHAIN);
        Log.d(LightConsensusAgent, `[CHAIN-PROOF] Received from ${this._peer.peerAddress}: ${msg.proof} (${msg.proof.serializedSize} bytes)`);

        // Check if we have requested an interlink chain, reject unsolicited ones.
        if (!this._timers.timeoutExists('getChainProof')) {
            Log.w(LightConsensusAgent, `Unsolicited chain proof received from ${this._peer.peerAddress}`);
            // TODO close/ban?
            return;
        }

        // Clear timeout.
        this._timers.clearTimeout('getChainProof');

        // Check that the peer's head block is contained in the proof suffix.
        let headFound = false;
        const suffix = msg.proof.suffix;
        for (let i = suffix.length - 1; i >= 0; i--) {
            const header = suffix.headers[i];
            const hash = await header.hash();
            if (hash.equals(this._peer.headHash)) {
                headFound = true;
                break;
            }
        }
        if (!headFound) {
            Log.w(LightConsensusAgent, `Invalid chain proof received from ${this._peer.peerAddress} - unexpected head`);
            // TODO ban instead?
            this._peer.channel.close('invalid chain proof');
            return;
        }

        // Push the proof into the LightChain.
        if (!(await this._partialChain.pushProof(msg.proof))) {
            Log.w(LightConsensusAgent, `Invalid chain proof received from ${this._peer.peerAddress} - verification failed`);
            // TODO ban instead?
            this._peer.channel.close('invalid chain proof');
            return;
        }

        // TODO add all blocks from the chain proof to knownObjects.
        this._busy = false;
        this.syncBlockchain();
    }


    /**
     * @param {InvMessage} msg
     * @return {Promise}
     * @private
     */
    async _onInv(msg) {
        // Clear the getBlocks timeout.
        this._timers.clearTimeout('getBlocks');

        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the advertised objects we know
        // Request unknown objects, ignore known ones.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash); // eslint-disable-line no-await-in-loop
                    if (!block || !block.isFull()) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION: {
                    const tx = await this._mempool.getTransaction(vector.hash); // eslint-disable-line no-await-in-loop
                    if (!tx) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        Log.v(LightConsensusAgent, `[INV] ${msg.vectors.length} vectors (${unknownObjects.length} new) received from ${this._peer.peerAddress}`);

        if (unknownObjects.length > 0) {
            // Store unknown vectors in objectsToRequest.
            this._objectsToRequest.addAll(unknownObjects);

            // Clear the request throttle timeout.
            this._timers.clearTimeout('inv');

            // If there are enough objects queued up, send out a getData request.
            if (this._objectsToRequest.length >= LightConsensusAgent.REQUEST_THRESHOLD) {
                this._requestData();
            }
            // Otherwise, wait a short time for more inv messages to arrive, then request.
            else {
                this._timers.setTimeout('inv', () => this._requestData(), LightConsensusAgent.REQUEST_THROTTLE);
            }
        }
    }

    /**
     * @private
     */
    _requestData() {
        // Only one request at a time.
        if (this._objectsInFlight) return;

        // Don't do anything if there are no objects queued to request.
        if (this._objectsToRequest.isEmpty()) return;

        // Request queued objects from the peer. Only request up to VECTORS_MAX_COUNT objects at a time.
        const vectorsMaxCount = BaseInventoryMessage.VECTORS_MAX_COUNT;
        /** @type {Array.<InvVector>} */
        let vectors;
        if (this._objectsToRequest.length > vectorsMaxCount) {
            vectors = Array.from(new LimitIterable(this._objectsToRequest.valueIterator(), vectorsMaxCount));

            // Mark the requested objects as in-flight.
            this._objectsInFlight = new HashSet();
            this._objectsInFlight.addAll(vectors);

            // Remove requested objects from queue.
            this._objectsToRequest.removeAll(vectors);
        } else {
            vectors = Array.from(this._objectsToRequest.valueIterator());

            // Mark the requested objects as in-flight.
            this._objectsInFlight = this._objectsToRequest;

            // Reset the queue.
            this._objectsToRequest = new HashSet();
        }

        // Send getData request to peer.
        this._peer.channel.getData(vectors);

        // Set timer to detect end of request / missing objects
        this._timers.setTimeout('getData', () => this._noMoreData(), LightConsensusAgent.REQUEST_TIMEOUT);
    }

    /**
     * @private
     */
    _noMoreData() {
        // Cancel the request timeout timer.
        this._timers.clearTimeout('getData');

        // Reset objects in flight.
        this._objectsInFlight = null;

        // If there are more objects to request, request them.
        if (!this._objectsToRequest.isEmpty()) {
            this._requestData();
        }
        // Otherwise, request more blocks if we are still syncing the blockchain.
        else if (this._syncing) {
            this.syncBlockchain();
        }
    }

    /**
     * @param {BlockMessage} msg
     * @return {Promise}
     * @private
     */
    async _onBlock(msg) {
        const hash = await msg.block.hash();

        // Check if we have requested this block.
        const vector = new InvVector(InvVector.Type.BLOCK, hash);
        if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
            Log.w(LightConsensusAgent, `Unsolicited block ${hash} received from ${this._peer.peerAddress}, discarding`);
            // TODO What should happen here? ban? drop connection?
            // Might not be unsolicited but just arrive after our timeout has triggered.
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // If we find that we are on a fork far away from our chain, resync.
        if (msg.block.height < this._chain.height - Policy.NUM_BLOCKS_VERIFICATION
            && (!this._partialChain || this._partialChain.state !== PartialLightChain.State.PROVE_BLOCKS)) {
            this._onMainChain = false;
            await this._initChainProofSync();
            this.syncBlockchain();
            return;
        } else {
            this._onMainChain = true;
        }

        // Put block into blockchain.
        const status = await this._chain.pushBlock(msg.block);

        // Queue orphaned blocks.
        if (status === LightChain.ERR_ORPHAN
            && this._partialChain) {
            this._orphanedBlocks.push(msg.block);
        }

        // TODO send reject message if we don't like the block
        if (status === LightChain.ERR_INVALID) {
            this._peer.channel.ban('received invalid block');
        }
    }

    /**
     * @param {TxMessage} msg
     * @return {Promise}
     * @private
     */
    async _onTx(msg) {
        const hash = await msg.transaction.hash();
        Log.i(LightConsensusAgent, `[TX] Received transaction ${hash} from ${this._peer.peerAddress}`);

        // Check if we have requested this transaction.
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);
        if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
            Log.w(LightConsensusAgent, `Unsolicited transaction ${hash} received from ${this._peer.peerAddress}, discarding`);
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // Put transaction into mempool.
        this._mempool.pushTransaction(msg.transaction);

        // TODO send reject message if we don't like the transaction
        // TODO what to do if the peer keeps sending invalid transactions?
    }

    /**
     * @param {Hash} hash
     * @return {Promise.<BlockHeader>}
     */
    getHeader(hash) {
        Assert.that(!this._headerRequest);

        return new Promise((resolve, reject) => {
            const vector = new InvVector(InvVector.Type.BLOCK, hash);
            this._headerRequest = {
                hash: hash,
                resolve: resolve,
                reject: reject
            };

            this._peer.channel.getHeader([vector]);

            // Drop the peer if it doesn't send the accounts proof within the timeout.
            this._timers.setTimeout('getHeader', () => {
                this._headerRequest = null;
                this._peer.channel.close('getHeader timeout');
                reject(new Error('timeout')); // TODO error handling
            }, LightConsensusAgent.REQUEST_TIMEOUT);
        });
    }

    /**
     * @param {HeaderMessage} msg
     * @return {Promise}
     * @private
     */
    async _onHeader(msg) {
        const hash = await msg.header.hash();

        // Check if we have requested this block.
        if (!this._headerRequest) {
            Log.w(NanoConsensusAgent, `Unsolicited header ${hash} received from ${this._peer.peerAddress}, discarding`);
            // TODO What should happen here? ban? drop connection?
            return;
        }

        // Clear the request timeout.
        this._timers.clearTimeout('getHeader');

        const requestedHash = this._headerRequest.hash;
        const resolve = this._headerRequest.resolve;
        const reject = this._headerRequest.reject;

        // Check that it is the correct hash.
        if (!requestedHash.equals(hash)) {
            Log.w(LightConsensusAgent, `Received wrong header from ${this._peer.peerAddress}`);
            this._peer.channel.close('Received wrong header');
            reject(new Error('Received wrong header'));
            return;
        }

        resolve(msg.header);
    }

    /**
     * @param {NotFoundMessage} msg
     * @private
     */
    _onNotFound(msg) {
        Log.d(LightConsensusAgent, `[NOTFOUND] ${msg.vectors.length} unknown objects received from ${this._peer.peerAddress}`);

        // Remove unknown objects from in-flight list.
        for (const vector of msg.vectors) {
            if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
                Log.w(LightConsensusAgent, `Unsolicited notfound vector received from ${this._peer.peerAddress}, discarding`);
                continue;
            }

            this._onObjectReceived(vector);
        }
    }

    /**
     * @param {InvVector} vector
     * @private
     */
    _onObjectReceived(vector) {
        if (!this._objectsInFlight) return;

        // Remove the vector from the objectsInFlight.
        this._objectsInFlight.remove(vector);

        // Reset the request timeout if we expect more objects to come.
        if (!this._objectsInFlight.isEmpty()) {
            this._timers.resetTimeout('getData', () => this._noMoreData(), LightConsensusAgent.REQUEST_TIMEOUT);
        } else {
            this._noMoreData();
        }
    }

    /* Request endpoints */

    /**
     * @param {GetDataMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetData(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the requested objects we know.
        // Send back all known objects.
        // Send notFound for unknown objects.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash); // eslint-disable-line no-await-in-loop
                    if (block) {
                        // We have found a requested block, send it back to the sender.
                        this._peer.channel.block(block);
                    } else {
                        // Requested block is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION: {
                    const tx = await this._mempool.getTransaction(vector.hash); // eslint-disable-line no-await-in-loop
                    if (tx) {
                        // We have found a requested transaction, send it back to the sender.
                        this._peer.channel.tx(tx);
                    } else {
                        // Requested transaction is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        // Report any unknown objects back to the sender.
        if (unknownObjects.length) {
            this._peer.channel.notFound(unknownObjects);
        }
    }

    /**
     * @param {GetHeaderMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetHeader(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the requested objects we know.
        // Send back all known objects.
        // Send notFound for unknown objects.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash); // eslint-disable-line no-await-in-loop
                    if (block) {
                        // We have found a requested block, send it back to the sender.
                        this._peer.channel.header(block.header);
                    } else {
                        // Requested block is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION:
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        // Report any unknown objects back to the sender.
        if (unknownObjects.length) {
            this._peer.channel.notFound(unknownObjects);
        }
    }

    /**
     * @param {GetBlocksMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetBlocks(msg) {
        Log.v(LightConsensusAgent, `[GETBLOCKS] ${msg.locators.length} block locators received from ${this._peer.peerAddress}`);

        // A peer has requested blocks. Check all requested block locator hashes
        // in the given order and pick the first hash that is found on our main
        // chain, ignore the rest. If none of the requested hashes is found,
        // pick the genesis block hash. Send the main chain starting from the
        // picked hash back to the peer.
        let startBlock = Block.GENESIS;
        for (const locator of msg.locators) {
            const block = await this._blockchain.getBlock(locator);
            if (block) {
                // We found a block, ignore remaining block locator hashes.
                startBlock = block;
                break;
            }
        }

        // Collect up to GETBLOCKS_VECTORS_MAX inventory vectors for the blocks starting right
        // after the identified block on the main chain.
        const blocks = await this._blockchain.getBlocks(startBlock.height + 1,
            Math.min(msg.maxInvSize, LightConsensusAgent.GETBLOCKS_VECTORS_MAX),
            msg.direction === GetBlocksMessage.Direction.FORWARD);
        const vectors = [];
        for (const block of blocks) {
            const hash = await block.hash();
            vectors.push(new InvVector(InvVector.Type.BLOCK, hash));
        }

        // Send the vectors back to the requesting peer.
        this._peer.channel.inv(vectors);
    }

    /**
     * @param {GetAccountsProofMessage} msg
     * @private
     */
    async _onGetAccountsProof(msg) {
        const proof = await this._blockchain.getAccountsProof(msg.blockHash, msg.addresses);
        if (!proof) {
            this._peer.channel.rejectAccounts();
        } else {
            this._peer.channel.accountsProof(msg.blockHash, proof);
        }
    }

    /**
     * @param {GetAccountsTreeChunkMessage} msg
     * @private
     */
    async _onGetAccountsTreeChunk(msg) {
        const chunk = await this._blockchain.getAccountsTreeChunk(msg.blockHash, msg.startPrefix);
        if (!chunk) {
            this._peer.channel.rejectAccounts();
        } else {
            this._peer.channel.accountsTreeChunk(msg.blockHash, chunk);
        }
    }

    /**
     * @param {MempoolMessage} msg
     * @return {Promise}
     * @private
     */
    async _onMempool(msg) {
        // Query mempool for transactions
        const transactions = await this._mempool.getTransactions();

        // Send transactions back to sender.
        for (const tx of transactions) {
            this._peer.channel.tx(tx);
        }
    }

    /**
     * @param {AccountsTreeChunkMessage} msg
     * @returns {Promise.<void>}
     * @private
     */
    async _onAccountsTreeChunk(msg) {
        Assert.that(this._partialChain && this._partialChain.state === PartialLightChain.State.PROVE_ACCOUNTS_TREE);
        
        Log.d(LightConsensusAgent, `[ACCOUNTS-TREE-CHUNK] Received from ${this._peer.peerAddress}: blockHash=${msg.blockHash}, proof=${msg.chunk}`);

        // Check if we have requested an accounts proof, reject unsolicited ones.
        if (!this._accountsRequest) {
            Log.w(LightConsensusAgent, `Unsolicited accounts tree chunk received from ${this._peer.peerAddress}`);
            // TODO close/ban?
            return;
        }

        // Clear the request timeout.
        this._timers.clearTimeout('getAccountsTreeChunk');

        const startPrefix = this._accountsRequest.startPrefix;
        const blockHash = this._accountsRequest.blockHash;

        // Reset accountsRequest.
        this._accountsRequest = null;

        // Check that we know the reference block.
        if (!blockHash.equals(msg.blockHash) || msg.chunk.head.prefix <= startPrefix) {
            Log.w(LightConsensusAgent, `Received AccountsTreeChunk for block != head or wrong start prefix from ${this._peer.peerAddress}`);
            this._peer.channel.close('Invalid AccountsTreeChunk');
            return;
        }

        // Verify the proof.
        const chunk = msg.chunk;
        if (!(await chunk.verify())) {
            Log.w(LightConsensusAgent, `Invalid AccountsTreeChunk received from ${this._peer.peerAddress}`);
            // TODO ban instead?
            this._peer.channel.close('Invalid AccountsTreeChunk');
            return;
        }

        // Check that the proof root hash matches the accountsHash in the reference block.
        const rootHash = await chunk.root();
        const block = await this._partialChain.getBlock(blockHash);
        if (!block.accountsHash.equals(rootHash)) {
            Log.w(LightConsensusAgent, `Invalid AccountsTreeChunk (root hash) received from ${this._peer.peerAddress}`);
            // TODO ban instead?
            this._peer.channel.close('AccountsTreeChunk root hash mismatch');
            return;
        }

        // Return the retrieved accounts.
        const result = await this._partialChain.pushAccountsTreeChunk(chunk);

        // Something went wrong!
        if (result !== PartialAccountsTree.OK_UNFINISHED && result !== PartialAccountsTree.OK_COMPLETE) {
            // TODO maybe ban?
            Log.e(`AccountsTree sync failed with error code ${result} from ${this._peer.peerAddress}`);
            this._peer.channel.close('AccountsTreeChunk root hash mismatch');
        }

        this._busy = false;
        this.syncBlockchain();
    }

    /**
     * @param {AccountsRejectedMessage} msg
     * @returns {Promise.<void>}
     * @private
     */
    async _onAccountsRejected(msg) {
        Log.d(LightConsensusAgent, `[ACCOUNTS-REJECTED] Received from ${this._peer.peerAddress}`);

        // Check if we have requested an accounts proof, reject unsolicited ones.
        if (!this._accountsRequest) {
            Log.w(LightConsensusAgent, `Unsolicited accounts rejected received from ${this._peer.peerAddress}`);
            // TODO close/ban?
            return;
        }

        // Clear the request timeout.
        this._timers.clearTimeout('getAccountsTreeChunk');

        // Reset accountsRequest.
        this._accountsRequest = null;

        // Restart syncing.
        await this._partialChain.abort();
        this._partialChain = null;
        this._syncing = false;
        this._failedSyncs++;
    }

    /**
     * @param {GetChainProofMessage} msg
     * @private
     */
    async _onGetChainProof(msg) {
        const proof = await this._blockchain.getChainProof();
        this._peer.channel.chainProof(proof);
    }

    /**
     * @returns {void}
     * @private
     */
    _onClose() {
        // Clear all timers and intervals when the peer disconnects.
        this._timers.clearAll();

        // Clear the synchronizer queue.
        this._synchronizer.clear();

        if (this._partialChain) {
            this._partialChain.abort();
        }

        this.fire('close', this);
    }

    /**
     * @param {Hash} blockHash
     * @returns {boolean}
     */
    knowsBlock(blockHash) {
        const vector = new InvVector(InvVector.Type.BLOCK, blockHash);
        return this._knownObjects.contains(vector);
    }

    /** @type {Peer} */
    get peer() {
        return this._peer;
    }

    /** @type {boolean} */
    get synced() {
        return this._synced;
    }

    /** @type {LightChain} */
    get _chain() {
        if (this._syncing && !this._catchup) {
            Assert.that(!!this._partialChain);
            return this._partialChain;
        }
        return this._blockchain;
    }
}
/**
 * Number of InvVectors in invToRequest pool to automatically trigger a getData request.
 * @type {number}
 */
LightConsensusAgent.REQUEST_THRESHOLD = 50;
/**
 * Time (ms) to wait after the last received inv message before sending getData.
 * @type {number}
 */
LightConsensusAgent.REQUEST_THROTTLE = 500;
/**
 * Maximum time (ms) to wait after sending out getData or receiving the last object for this request.
 * @type {number}
 */
LightConsensusAgent.REQUEST_TIMEOUT = 1000 * 5;
/**
 * Maximum time (ms) to wait for chainProof after sending out getChainProof before dropping the peer.
 * @type {number}
 */
LightConsensusAgent.CHAINPROOF_REQUEST_TIMEOUT = 1000 * 10;
/**
 * Maximum time (ms) to wait for chainProof after sending out getChainProof before dropping the peer.
 * @type {number}
 */
LightConsensusAgent.ACCOUNTS_TREE_CHUNK_REQUEST_TIMEOUT = 1000 * 5;
/**
 * Maximum number of blockchain sync retries before closing the connection.
 * XXX If the peer is on a long fork, it will count as a failed sync attempt
 * if our blockchain doesn't switch to the fork within 500 (max InvVectors returned by getBlocks)
 * blocks.
 * @type {number}
 */
LightConsensusAgent.MAX_SYNC_ATTEMPTS = 5;
/**
 * Maximum number of inventory vectors to sent in the response for onGetBlocks.
 * @type {number}
 */
LightConsensusAgent.GETBLOCKS_VECTORS_MAX = 500;
Class.register(LightConsensusAgent);

class LightConsensus extends Observable {
    /**
     * @param {LightChain} blockchain
     * @param {Mempool} mempool
     * @param {Network} network
     */
    constructor(blockchain, mempool, network) {
        super();
        /** @type {LightChain} */
        this._blockchain = blockchain;
        /** @type {Mempool} */
        this._mempool = mempool;
        /** @type {Network} */
        this._network = network;

        /** @type {HashMap.<Peer, LightConsensusAgent>} */
        this._agents = new HashMap();
        /** @type {Timers} */
        this._timers = new Timers();
        /** @type {boolean} */
        this._syncing = false;
        /** @type {boolean} */
        this._established = false;

        network.on('peer-joined', peer => this._onPeerJoined(peer));
        network.on('peer-left', peer => this._onPeerLeft(peer));

        // Notify peers when our blockchain head changes.
        blockchain.on('head-changed', head => {
            // Don't announce head changes if we are not synced yet.
            if (!this._established) return;

            for (const agent of this._agents.values()) {
                agent.relayBlock(head);
            }
        });

        // Relay new (verified) transactions to peers.
        mempool.on('transaction-added', tx => {
            // Don't relay transactions if we are not synced yet.
            if (!this._established) return;

            for (const agent of this._agents.values()) {
                agent.relayTransaction(tx);
            }
        });
    }

    /**
     * @param {Peer} peer
     * @private
     */
    _onPeerJoined(peer) {
        // Create a ConsensusAgent for each peer that connects.
        const agent = new LightConsensusAgent(this._blockchain, this._mempool, peer);
        this._agents.put(peer.id, agent);

        // If no more peers connect within the specified timeout, start syncing.
        this._timers.resetTimeout('sync', this._syncBlockchain.bind(this), LightConsensus.SYNC_THROTTLE);
    }

    /**
     * @param {Peer} peer
     * @private
     */
    _onPeerLeft(peer) {
        this._agents.remove(peer.id);
    }

    /**
     * @private
     */
    _syncBlockchain() {
        // Wait for ongoing sync to finish.
        if (this._syncing) {
            return;
        }

        // Choose a random peer which we aren't sync'd with yet.
        const agent = ArrayUtils.randomElement(this._agents.values().filter(agent => !agent.synced));
        if (!agent) {
            // We are synced with all connected peers.
            this._syncing = false;

            if (this._agents.length > 0) {
                // Report consensus-established if we have at least one connected peer.
                // TODO !!! Check peer types (at least one full node, etc.) !!!
                if (!this._established) {
                    Log.d(LightConsensus, `Synced with all connected peers (${this._agents.length}), consensus established.`);
                    Log.d(LightConsensus, `Blockchain: height=${this._blockchain.height}, headHash=${this._blockchain.headHash}`);

                    this._established = true;
                    this.fire('established');
                }
            } else {
                // We are not connected to any peers anymore. Report consensus-lost.
                this._established = false;
                this.fire('lost');
            }

            return;
        }

        Log.v(LightConsensus, `Syncing blockchain with peer ${agent.peer.peerAddress}`);

        this._syncing = true;

        agent.on('sync', () => this._onPeerSynced());
        agent.on('close', () => {
            this._onPeerLeft(agent.peer);
            this._onPeerSynced();
        });
        agent.syncBlockchain();
    }

    /**
     * @private
     */
    _onPeerSynced() {
        this._syncing = false;
        this._syncBlockchain();
    }

    /** @type {boolean} */
    get established() {
        return this._established;
    }

    // TODO confidence level?

    /** @type {IBlockchain} */
    get blockchain() {
        return this._blockchain;
    }

    /** @type {Mempool} */
    get mempool() {
        return this._mempool;
    }

    /** @type {Network} */
    get network() {
        return this._network;
    }
}
LightConsensus.SYNC_THROTTLE = 1000; // ms
Class.register(LightConsensus);

class PartialLightChain extends LightChain {
    /**
     * @param {ChainDataStore} store
     * @param {Accounts} accounts
     * @param {ChainProof} proof
     * @returns {PartialLightChain}
     */
    constructor(store, accounts, proof) {
        const tx = store.transaction(false);
        super(tx, accounts);

        this._proof = proof;

        /** @type {PartialLightChain.State} */
        this._state = PartialLightChain.State.PROVE_CHAIN;
        /** @type {PartialAccountsTree} */
        this._partialTree = null;
        /** @type {Accounts} */
        this._accountsTx = null;
        /** @type {ChainData} */
        this._proofHead = null;
    }

    /**
     * @param {ChainProof} proof
     * @returns {Promise.<boolean>}
     */
    pushProof(proof) {
        return this._synchronizer.push(() => {
            return this._pushProof(proof);
        });
    }

    /**
     * @param {ChainProof} proof
     * @returns {Promise.<boolean>}
     * @private
     */
    async _pushProof(proof) {
        // Check that the proof is valid.
        if (!(await proof.verify())) {
            Log.w(PartialLightChain, 'Rejecting proof - verification failed');
            return false;
        }

        // Check that the suffix is long enough.
        if (proof.suffix.length !== Policy.K && proof.suffix.length !== proof.head.height - 1) {
            Log.w(PartialLightChain, 'Rejecting proof - invalid suffix length');
            return false;
        }

        // Compute and verify interlinks for the suffix.
        const suffixBlocks = [];
        let head = proof.prefix.head;
        for (const header of proof.suffix.headers) {
            const interlink = await head.getNextInterlink(header.target);
            const interlinkHash = await interlink.hash();
            if (!header.interlinkHash.equals(interlinkHash)) {
                Log.w(PartialLightChain, 'Rejecting proof - invalid interlink hash in proof suffix');
                return false;
            }

            head = new Block(header, interlink);
            suffixBlocks.push(head);
        }

        // If the given proof is better than our current proof, adopt the given proof as the new best proof.
        if (await PartialLightChain._isBetterProof(proof, this._proof, Policy.M)) {
            await this._acceptProof(proof, suffixBlocks);
        } else {
            await this.abort();
        }

        return true;
    }

    /**
     * @param {ChainProof} proof1
     * @param {ChainProof} proof2
     * @param {number} m
     * @returns {boolean}
     * @private
     */
    static async _isBetterProof(proof1, proof2, m) {
        const lca = BlockChain.lowestCommonAncestor(proof1.prefix, proof2.prefix);
        const score1 = await PartialLightChain._getProofScore(proof1.prefix, lca, m);
        const score2 = await PartialLightChain._getProofScore(proof2.prefix, lca, m);
        return score1 === score2
            ? proof1.suffix.totalDifficulty() >= proof2.suffix.totalDifficulty()
            : score1 > score2;
    }

    /**
     *
     * @param {BlockChain} chain
     * @param {Block} lca
     * @param {number} m
     * @returns {Promise.<number>}
     * @private
     */
    static async _getProofScore(chain, lca, m) {
        const counts = [];
        for (const block of chain.blocks) {
            if (block.height < lca.height) {
                continue;
            }

            const target = BlockUtils.hashToTarget(await block.hash()); // eslint-disable-line no-await-in-loop
            const depth = BlockUtils.getTargetDepth(target);
            counts[depth] = counts[depth] ? counts[depth] + 1 : 1;
        }

        let sum = 0;
        let depth;
        for (depth = counts.length - 1; depth >= 0; depth--) {
            sum += counts[depth] ? counts[depth] : 0;
            if (sum >= m) {
                break;
            }
        }

        return Math.pow(2, Math.max(depth, 0)) * sum;
    }

    /**
     * @param {ChainProof} proof
     * @param {Array.<Block>} suffix
     * @returns {Promise.<void>}
     * @protected
     */
    async _acceptProof(proof, suffix) {
        // If the proof prefix head is not part of our current dense chain suffix, reset store and start over.
        // TODO use a store transaction here?
        const head = proof.prefix.head;
        const headHash = await head.hash();
        const headData = await this._store.getChainData(headHash);
        if (!headData || headData.totalDifficulty <= 0) {
            // Delete our current chain.
            await this._store.truncate();

            // Set the prefix head as the new chain head.
            // TODO use the tail end of the dense suffix of the prefix instead.
            this._headHash = headHash;
            this._mainChain = new ChainData(head, head.difficulty, BlockUtils.realDifficulty(headHash), true);
            await this._store.putChainData(headHash, this._mainChain);

            // Put all other prefix blocks in the store as well (so they can be retrieved via getBlock()/getBlockAt()),
            // but don't allow blocks to be appended to them by setting totalDifficulty = -1;
            for (let i = 0; i < proof.prefix.length - 1; i++) {
                const block = proof.prefix.blocks[i];
                const hash = await block.hash();
                const data = new ChainData(block, /*totalDifficulty*/ -1, /*totalWork*/ -1, true);
                await this._store.putChainData(hash, data);
            }
        }

        // Push all suffix blocks.
        for (const block of suffix) {
            const result = await this._pushLightBlock(block, false); // eslint-disable-line no-await-in-loop
            Assert.that(result >= 0);
        }

        this._state = PartialLightChain.State.PROVE_ACCOUNTS_TREE;
        this._partialTree = await this._accounts.partialAccountsTree();
        this._proofHead = this._mainChain;
        await this._store.setHead(this.headHash);

        this._proof = proof;
    }

    async _pushLightBlock(block) {
        // Check if we already know this header/block.
        const hash = await block.hash();
        const knownBlock = await this._store.getBlock(hash);
        if (knownBlock) {
            return NanoChain.OK_KNOWN;
        }

        // Retrieve the immediate predecessor.
        /** @type {ChainData} */
        const prevData = await this._store.getChainData(block.prevHash);
        if (!prevData || prevData.totalDifficulty <= 0) {
            return NanoChain.ERR_ORPHAN;
        }

        return this._pushBlockInternal(block, hash, prevData);
    }

    async _pushBlockInternal(block, blockHash, prevData) {
        // Block looks good, create ChainData.
        const totalDifficulty = prevData.totalDifficulty + block.difficulty;
        const totalWork = prevData.totalWork + BlockUtils.realDifficulty(blockHash);
        const chainData = new ChainData(block, totalDifficulty, totalWork);

        // Check if the block extends our current main chain.
        if (block.prevHash.equals(this.headHash)) {
            // Append new block to the main chain.
            chainData.onMainChain = true;
            await this._store.putChainData(blockHash, chainData);

            this._mainChain = chainData;
            this._headHash = blockHash;

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return NanoChain.OK_EXTENDED;
        }

        // Otherwise, check if the new chain is harder than our current main chain.
        if (totalDifficulty > this._mainChain.totalDifficulty) {
            // A fork has become the hardest chain, rebranch to it.
            await this._rebranch(blockHash, chainData);

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return NanoChain.OK_REBRANCHED;
        }

        // Otherwise, we are creating/extending a fork. Store chain data.
        Log.v(NanoChain, `Creating/extending fork with block ${blockHash}, height=${block.height}, totalDifficulty=${chainData.totalDifficulty}, totalWork=${chainData.totalWork}`);
        await this._store.putChainData(blockHash, chainData);

        return NanoChain.OK_FORKED;
    }

    /**
     * @override
     * @param {Block} block
     * @returns {Promise.<number>}
     */
    async _pushBlock(block) {
        // Queue new blocks while syncing.
        if (this._state === PartialLightChain.State.PROVE_BLOCKS) {
            const blockHash = await block.hash();
            if (this._proofHead.head.prevHash.equals(blockHash)) {
                return this._pushBlockBackwards(block);
            } else if ((await this._proofHead.head.hash()).equals(blockHash)) {
                return this._pushHeadBlock(block);
            }
        }

        return FullChain.ERR_ORPHAN;
    }

    /**
     * @param {Block} block
     * @returns {Promise.<number>}
     * @private
     */
    async _pushHeadBlock(block) {
        // Check if we already know this block.
        const hash = await block.hash();

        // Check that the given block is a full block (includes block body).
        if (!block.isFull()) {
            Log.w(PartialLightChain, 'Rejecting block - body missing');
            return FullChain.ERR_INVALID;
        }

        // Check all intrinsic block invariants.
        if (!(await block.verify())) {
            return FullChain.ERR_INVALID;
        }

        // Check that all known interlink blocks are valid predecessors of the given block.
        if (!(await this._verifyInterlink(block))) {
            Log.w(PartialLightChain, 'Rejecting block - interlink verification failed');
            return FullChain.ERR_INVALID;
        }

        // We know that the current proof head is the successor.
        // Check that the block is a valid predecessor of its immediate successor.
        const prevData = await this._store.getChainData(block.prevHash);
        if (!prevData) {
            Log.w(PartialLightChain, 'Rejecting block - unknown predecessor');
            return FullChain.ERR_ORPHAN;
        }

        // Check that the block is a valid successor of its immediate predecessor.
        const predecessor = prevData.head;
        if (!(await block.isImmediateSuccessorOf(predecessor))) {
            Log.w(PartialLightChain, 'Rejecting block - not a valid immediate successor');
            return FullChain.ERR_INVALID;
        }

        // Check that the difficulty is correct.
        const nextTarget = await this.getNextTarget(predecessor);
        if (BlockUtils.isValidTarget(nextTarget)) {
            if (block.nBits !== BlockUtils.targetToCompact(nextTarget)) {
                Log.w(PartialLightChain, 'Rejecting block - difficulty mismatch');
                return FullChain.ERR_INVALID;
            }
        } else {
            Log.w(NanoChain, 'Skipping difficulty verification - not enough blocks available');
        }

        // Block looks good, create ChainData.
        const totalDifficulty = prevData.totalDifficulty + block.difficulty;
        const totalWork = prevData.totalWork + BlockUtils.realDifficulty(hash);
        const chainData = new ChainData(block, totalDifficulty, totalWork);

        // Prepend new block to the main chain.
        if (!(await this._prepend(hash, chainData))) {
            return FullChain.ERR_INVALID;
        }

        this._mainChain = chainData;
        this._proofHead = chainData; // So now it is a full block.
        this._headHash = hash;

        // Check whether we're complete.
        if (!this.needsMoreBlocks()) {
            await this._complete();
        }

        return FullChain.OK_EXTENDED;
    }

    /**
     * @param {Block} block
     * @returns {Promise.<number>}
     * @private
     */
    async _pushBlockBackwards(block) {
        // Check if we already know this block.
        const hash = await block.hash();

        // Check that the given block is a full block (includes block body).
        if (!block.isFull()) {
            Log.w(PartialLightChain, 'Rejecting block - body missing');
            return FullChain.ERR_INVALID;
        }

        // Check all intrinsic block invariants.
        if (!(await block.verify())) {
            return FullChain.ERR_INVALID;
        }

        // Check that all known interlink blocks are valid predecessors of the given block.
        if (!(await this._verifyInterlink(block))) {
            Log.w(PartialLightChain, 'Rejecting block - interlink verification failed');
            return FullChain.ERR_INVALID;
        }

        // We know that the current proof head is the successor.
        // Check that the block is a valid predecessor of its immediate successor.
        if (!(await this._proofHead.head.isImmediateSuccessorOf(block))) {
            Log.w(PartialLightChain, 'Rejecting block - not a valid immediate predecessor');
            return FullChain.ERR_INVALID;
        }

        // Check that the difficulty is correct.
        const nextTarget = await this.getNextTarget(block);
        if (BlockUtils.isValidTarget(nextTarget)) {
            if (this._proofHead.head.nBits !== BlockUtils.targetToCompact(nextTarget)) {
                Log.w(PartialLightChain, 'Rejecting block - difficulty mismatch');
                return FullChain.ERR_INVALID;
            }
        } else {
            Log.w(NanoChain, 'Skipping difficulty verification - not enough blocks available');
        }

        // Block looks good, create ChainData.
        const totalDifficulty = this._proofHead.totalDifficulty - this._proofHead.head.difficulty;
        const totalWork = this._proofHead.totalWork - BlockUtils.realDifficulty(await this._proofHead.head.hash());
        const chainData = new ChainData(block, totalDifficulty, totalWork);

        // Prepend new block to the main chain.
        if (!(await this._prepend(hash, chainData))) {
            return FullChain.ERR_INVALID;
        }

        return FullChain.OK_EXTENDED;
    }

    /**
     * @param {Hash} blockHash
     * @param {ChainData} chainData
     * @returns {Promise.<boolean>}
     * @private
     */
    async _prepend(blockHash, chainData) {
        try {
            await this._accountsTx.revertBlock(chainData.head);
        } catch (e) {
            // AccountsHash mismatch. This can happen if someone gives us an invalid block.
            // TODO error handling
            Log.w(PartialLightChain, 'Rejecting block - AccountsHash mismatch');
            return false;
        }

        chainData.onMainChain = true;

        await this._store.putChainData(blockHash, chainData);

        this._proofHead = chainData;

        // Check whether we're complete.
        if (!this.needsMoreBlocks()) {
            await this._complete();
        }

        return true;
    }

    /**
     * @param {AccountsTreeChunk} chunk
     * @returns {Promise.<number>}
     */
    async pushAccountsTreeChunk(chunk) {
        if (this._state !== PartialLightChain.State.PROVE_ACCOUNTS_TREE) {
            return PartialAccountsTree.ERR_INCORRECT_PROOF;
        }

        const result = await this._partialTree.pushChunk(chunk);

        // If we're done, prepare next phase.
        if (result === PartialAccountsTree.OK_COMPLETE) {
            this._state = PartialLightChain.State.PROVE_BLOCKS;
            await this._partialTree.commit();
            this._partialTree = null;
            this._accountsTx = await this._accounts.transaction(false);
        }

        return result;
    }

    /**
     * @returns {Promise.<void>}
     * @private
     */
    async _complete() {
        this._state = PartialLightChain.State.COMPLETE;
        if (this._accountsTx) {
            await this._accountsTx.abort();
        }
        this.fire('complete', this._proof, this._headHash, this._mainChain);
    }

    /**
     * @returns {Promise.<boolean>}
     */
    async commit() {
        const result = await this._store.commit();
        this.fire('committed', this._proof, this._headHash, this._mainChain);
        return result;
    }

    /**
     * @returns {Promise.<void>}
     */
    async abort() {
        this._state = PartialLightChain.State.ABORTED;
        if (this._partialTree) {
            await this._partialTree.abort();
        }
        if (this._accountsTx) {
            await this._accountsTx.abort();
        }
        await this._store.abort();
        this.fire('aborted');
    }

    /**
     * @returns {string}
     */
    getMissingAccountsPrefix() {
        if (this._partialTree) {
            return this._partialTree.missingPrefix;
        }
        return '';
    }

    /**
     * @returns {Promise.<Array.<Hash>>}
     */
    async getBlockLocators() {
        return this._proofHead ? [await this._proofHead.head.hash()] : [this.headHash];
    }

    /**
     * @returns {number}
     */
    numBlocksNeeded() {
        if (!this._proofHead) {
            return Policy.NUM_BLOCKS_VERIFICATION;
        }
        let numBlocks = Policy.NUM_BLOCKS_VERIFICATION - (this.height - this._proofHead.head.height + 1);
        // If we begin syncing, we need one block additionally.
        if (!this._proofHead.head.isFull()) {
            numBlocks++;
        }
        return numBlocks;
    }

    /**
     * @returns {boolean}
     */
    needsMoreBlocks() {
        return this.numBlocksNeeded() > 0;
    }

    /** @type {PartialLightChain.State} */
    get state() {
        return this._state;
    }

    /** @type {number} */
    get proofHeadHeight() {
        return this._proofHead.head.height;
    }
}
/**
 * @enum {number}
 */
PartialLightChain.State = {
    ABORTED: -1,
    PROVE_CHAIN: 0,
    PROVE_ACCOUNTS_TREE: 1,
    PROVE_BLOCKS: 2,
    COMPLETE: 3
};
Class.register(PartialLightChain);

class NanoChain extends BaseChain {
    /**
     * @returns {Promise.<NanoChain>}
     */
    constructor() {
        super(ChainDataStore.createVolatile());

        this._proof = new ChainProof(new BlockChain([Block.GENESIS.toLight()]), new HeaderChain([]));

        this._headHash = Block.GENESIS.HASH;

        this._mainChain = new ChainData(Block.GENESIS, Block.GENESIS.difficulty, BlockUtils.realDifficulty(Block.GENESIS.HASH), true);

        this._synchronizer = new Synchronizer();

        return this._init();
    }

    async _init() {
        await this._store.putChainData(Block.GENESIS.HASH, this._mainChain);
        return this;
    }

    /**
     * @param {ChainProof} proof
     * @returns {Promise.<boolean>}
     */
    pushProof(proof) {
        return this._synchronizer.push(() => {
            return this._pushProof(proof);
        });
    }

    /**
     * @param {ChainProof} proof
     * @returns {Promise.<boolean>}
     * @private
     */
    async _pushProof(proof) {
        // Check that the proof is valid.
        if (!(await proof.verify())) {
            Log.w(NanoChain, 'Rejecting proof - verification failed');
            return false;
        }

        // Check that the suffix is long enough.
        if (proof.suffix.length !== Policy.K && proof.suffix.length !== proof.head.height - 1) {
            Log.w(NanoChain, 'Rejecting proof - invalid suffix length');
            return false;
        }

        // Compute and verify interlinks for the suffix.
        const suffixBlocks = [];
        let head = proof.prefix.head;
        for (const header of proof.suffix.headers) {
            const interlink = await head.getNextInterlink(header.target);
            const interlinkHash = await interlink.hash();
            if (!header.interlinkHash.equals(interlinkHash)) {
                Log.w(NanoChain, 'Rejecting proof - invalid interlink hash in proof suffix');
                return false;
            }

            head = new Block(header, interlink);
            suffixBlocks.push(head);
        }

        // If the given proof is better than our current proof, adopt the given proof as the new best proof.
        if (await NanoChain._isBetterProof(proof, this._proof, Policy.M)) {
            await this._acceptProof(proof, suffixBlocks);
        }

        return true;
    }

    /**
     * @param {ChainProof} proof1
     * @param {ChainProof} proof2
     * @param {number} m
     * @returns {boolean}
     * @private
     */
    static async _isBetterProof(proof1, proof2, m) {
        const lca = BlockChain.lowestCommonAncestor(proof1.prefix, proof2.prefix);
        const score1 = await NanoChain._getProofScore(proof1.prefix, lca, m);
        const score2 = await NanoChain._getProofScore(proof2.prefix, lca, m);
        return score1 === score2
            ? proof1.suffix.totalDifficulty() >= proof2.suffix.totalDifficulty()
            : score1 > score2;
    }

    /**
     *
     * @param {BlockChain} chain
     * @param {Block} lca
     * @param {number} m
     * @returns {Promise.<number>}
     * @private
     */
    static async _getProofScore(chain, lca, m) {
        const counts = [];
        for (const block of chain.blocks) {
            if (block.height < lca.height) {
                continue;
            }

            const target = BlockUtils.hashToTarget(await block.hash()); // eslint-disable-line no-await-in-loop
            const depth = BlockUtils.getTargetDepth(target);
            counts[depth] = counts[depth] ? counts[depth] + 1 : 1;
        }

        let sum = 0;
        let depth;
        for (depth = counts.length - 1; depth >= 0; depth--) {
            sum += counts[depth] ? counts[depth] : 0;
            if (sum >= m) {
                break;
            }
        }

        return Math.pow(2, Math.max(depth, 0)) * sum;
    }

    /**
     * @param {ChainProof} proof
     * @param {Array.<Block>} suffix
     * @returns {Promise.<void>}
     * @private
     */
    async _acceptProof(proof, suffix) {
        // If the proof prefix head is not part of our current dense chain suffix, reset store and start over.
        // TODO use a store transaction here?
        const head = proof.prefix.head;
        const headHash = await head.hash();
        const headData = await this._store.getChainData(headHash);
        if (!headData || headData.totalDifficulty <= 0) {
            // Delete our current chain.
            await this._store.truncate();

            // Set the prefix head as the new chain head.
            // TODO use the tail end of the dense suffix of the prefix instead.
            this._headHash = headHash;
            this._mainChain = new ChainData(head, head.difficulty, BlockUtils.realDifficulty(headHash), true);
            await this._store.putChainData(headHash, this._mainChain);

            // Put all other prefix blocks in the store as well (so they can be retrieved via getBlock()/getBlockAt()),
            // but don't allow blocks to be appended to them by setting totalDifficulty = -1;
            for (let i = 0; i < proof.prefix.length - 1; i++) {
                const block = proof.prefix.blocks[i];
                const hash = await block.hash();
                const data = new ChainData(block, /*totalDifficulty*/ -1, /*totalWork*/ -1, true);
                await this._store.putChainData(hash, data);
            }
        }

        // Push all suffix blocks.
        for (const block of suffix) {
            const result = await this._pushBlock(block); // eslint-disable-line no-await-in-loop
            Assert.that(result >= 0);
        }

        this._proof = proof;
    }

    async _pushBlock(block) {
        // Check if we already know this header/block.
        const hash = await block.hash();
        const knownBlock = await this._store.getBlock(hash);
        if (knownBlock) {
            return NanoChain.OK_KNOWN;
        }

        // Retrieve the immediate predecessor.
        /** @type {ChainData} */
        const prevData = await this._store.getChainData(block.prevHash);
        if (!prevData || prevData.totalDifficulty <= 0) {
            return NanoChain.ERR_ORPHAN;
        }

        return this._pushBlockInternal(block, hash, prevData);
    }

    /**
     * @param {BlockHeader} header
     * @returns {Promise.<number>}
     */
    pushHeader(header) {
        return this._synchronizer.push(() => {
            return this._pushHeader(header);
        });
    }

    /**
     * @param {BlockHeader} header
     * @returns {Promise.<number>}
     * @private
     */
    async _pushHeader(header) {
        // Check if we already know this header/block.
        const hash = await header.hash();
        const knownBlock = await this._store.getBlock(hash);
        if (knownBlock) {
            return NanoChain.OK_KNOWN;
        }

        // Verify proof of work.
        if (!(await header.verifyProofOfWork())) {
            Log.w(NanoChain, 'Rejecting header - PoW verification failed');
            return NanoChain.ERR_INVALID;
        }

        // Retrieve the immediate predecessor.
        /** @type {ChainData} */
        const prevData = await this._store.getChainData(header.prevHash);
        if (!prevData || prevData.totalDifficulty <= 0) {
            Log.w(NanoChain, 'Rejecting header - unknown predecessor');
            return NanoChain.ERR_ORPHAN;
        }

        // Check that the block is valid successor to its predecessor.
        /** @type {Block} */
        const predecessor = prevData.head;
        if (!(await header.isImmediateSuccessorOf(predecessor.header))) {
            Log.w(NanoChain, 'Rejecting header - not a valid successor');
            return NanoChain.ERR_INVALID;
        }

        // Check that the difficulty is correct (if we can compute the next target)
        const nextTarget = await this.getNextTarget(predecessor);
        if (BlockUtils.isValidTarget(nextTarget)) {
            if (header.nBits !== BlockUtils.targetToCompact(nextTarget)) {
                Log.w(NanoChain, 'Rejecting header - difficulty mismatch');
                return NanoChain.ERR_INVALID;
            }
        } else {
            Log.w(NanoChain, 'Skipping difficulty verification - not enough blocks available');
        }

        // Compute and verify interlink.
        const interlink = await predecessor.getNextInterlink(header.target);
        const interlinkHash = await interlink.hash();
        if (!interlinkHash.equals(header.interlinkHash)) {
            Log.w(NanoChain, 'Rejecting header - interlink verification failed');
            return NanoChain.ERR_INVALID;
        }

        const block = new Block(header, interlink);
        return this._pushBlockInternal(block, hash, prevData);
    }

    async _pushBlockInternal(block, blockHash, prevData) {
        // Block looks good, create ChainData.
        const totalDifficulty = prevData.totalDifficulty + block.difficulty;
        const totalWork = prevData.totalWork + BlockUtils.realDifficulty(blockHash);
        const chainData = new ChainData(block, totalDifficulty, totalWork);

        // Check if the block extends our current main chain.
        if (block.prevHash.equals(this.headHash)) {
            // Append new block to the main chain.
            chainData.onMainChain = true;
            await this._store.putChainData(blockHash, chainData);

            this._mainChain = chainData;
            this._headHash = blockHash;

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return NanoChain.OK_EXTENDED;
        }

        // Otherwise, check if the new chain is harder than our current main chain.
        if (totalDifficulty > this._mainChain.totalDifficulty) {
            // A fork has become the hardest chain, rebranch to it.
            await this._rebranch(blockHash, chainData);

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return NanoChain.OK_REBRANCHED;
        }

        // Otherwise, we are creating/extending a fork. Store chain data.
        Log.v(NanoChain, `Creating/extending fork with block ${blockHash}, height=${block.height}, totalDifficulty=${chainData.totalDifficulty}, totalWork=${chainData.totalWork}`);
        await this._store.putChainData(blockHash, chainData);

        return NanoChain.OK_FORKED;
    }

    /**
     * @param {Hash} blockHash
     * @param {ChainData} chainData
     * @returns {Promise}
     * @private
     */
    async _rebranch(blockHash, chainData) {
        Log.v(NanoChain, `Rebranching to fork ${blockHash}, height=${chainData.head.height}, totalDifficulty=${chainData.totalDifficulty}, totalWork=${chainData.totalWork}`);

        // Find the common ancestor between our current main chain and the fork chain.
        // Walk up the fork chain until we find a block that is part of the main chain.
        // Store the chain along the way.
        const forkChain = [];
        const forkHashes = [];

        let curData = chainData;
        let curHash = blockHash;
        while (!curData.onMainChain) {
            forkChain.push(curData);
            forkHashes.push(curHash);

            curHash = curData.head.prevHash;
            curData = await this._store.getChainData(curHash); // eslint-disable-line no-await-in-loop
            Assert.that(!!curData, 'Failed to find fork predecessor while rebranching');
        }

        Log.v(NanoChain, `Found common ancestor ${curHash.toBase64()} ${forkChain.length} blocks up`);

        // Unset onMainChain flag on the current main chain up to (excluding) the common ancestor.
        let headHash = this._headHash;
        let headData = this._mainChain;
        while (!headHash.equals(curHash)) {
            headData.onMainChain = false;
            await this._store.putChainData(headHash, headData);

            headHash = headData.head.prevHash;
            headData = await this._store.getChainData(headHash);
            Assert.that(!!headData, 'Failed to find main chain predecessor while rebranching');
        }

        // Set onMainChain flag on the fork.
        for (let i = forkChain.length - 1; i >= 0; i--) {
            const forkData = forkChain[i];
            forkData.onMainChain = true;
            await this._store.putChainData(forkHashes[i], forkData);
        }

        this._mainChain = chainData;
        this._headHash = blockHash;
    }

    /** @type {Block} */
    get head() {
        return this._mainChain.head;
    }

    /** @type {Hash} */
    get headHash() {
        return this._headHash;
    }

    /** @type {number} */
    get height() {
        return this._mainChain.head.height;
    }
}
NanoChain.ERR_ORPHAN = -2;
NanoChain.ERR_INVALID = -1;
NanoChain.OK_KNOWN = 0;
NanoChain.OK_EXTENDED = 1;
NanoChain.OK_REBRANCHED = 2;
NanoChain.OK_FORKED = 3;
Class.register(NanoChain);

class NanoConsensusAgent extends Observable {
    /**
     * @param {NanoChain} blockchain
     * @param {NanoMempool} mempool
     * @param {Peer} peer
     */
    constructor(blockchain, mempool, peer) {
        super();
        /** @type {NanoChain} */
        this._blockchain = blockchain;
        /** @type {NanoMempool} */
        this._mempool = mempool;
        /** @type {Peer} */
        this._peer = peer;

        // Flag indicating that have synced our blockchain with the peer's.
        /** @type {boolean} */
        this._synced = false;

        // Set of all objects (InvVectors) that we think the remote peer knows.
        /** @type {HashSet.<InvVector>} */
        this._knownObjects = new HashSet();
        this._knownObjects.add(new InvVector(InvVector.Type.BLOCK, peer.headHash));

        // InvVectors we want to request via getData are collected here and
        // periodically requested.
        /** @type {HashSet.<InvVector>} */
        this._objectsToRequest = new HashSet();

        // Objects that are currently being requested from the peer.
        /** @type {HashSet.<InvVector>} */
        this._objectsInFlight = null;

        // Helper object to keep track of timeouts & intervals.
        /** @type {Timers} */
        this._timers = new Timers();

        /** @type {Synchronizer} */
        this._synchronizer = new Synchronizer();

        // Helper object to keep track of the accounts we're requesting from the peer.
        this._accountsRequest = null;

        // Listen to consensus messages from the peer.
        peer.channel.on('inv', msg => this._onInv(msg));
        peer.channel.on('get-data', msg => this._onGetData(msg));
        peer.channel.on('get-header', msg => this._onGetHeader(msg));
        peer.channel.on('not-found', msg => this._onNotFound(msg));
        peer.channel.on('header', msg => this._onHeader(msg));
        peer.channel.on('tx', msg => this._onTx(msg));

        peer.channel.on('chain-proof', msg => this._onChainProof(msg));
        peer.channel.on('accounts-proof', msg => this._onAccountsProof(msg));
        peer.channel.on('accounts-rejected', msg => this._onAccountsRejected(msg));

        peer.channel.on('get-chain-proof', msg => this._onGetChainProof(msg));

        // Clean up when the peer disconnects.
        peer.channel.on('close', () => this._onClose());
    }

    /**
     * @param {Block} block
     * @return {Promise}
     */
    async relayBlock(block) {
        // Don't relay if no consensus established yet.
        if (!this._synced) {
            return;
        }

        // Create InvVector.
        const hash = await block.hash();
        const vector = new InvVector(InvVector.Type.BLOCK, hash);

        // Don't relay block to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay block to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this block now.
        this._knownObjects.add(vector);
    }

    /**
     * @param {Transaction} transaction
     * @return {Promise}
     */
    async relayTransaction(transaction) {
        // TODO Don't relay if no consensus established yet ???

        // Create InvVector.
        const hash = await transaction.hash();
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);

        // Don't relay transaction to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay transaction to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this transaction now.
        this._knownObjects.add(vector);
    }

    /**
     * @returns {Promise.<void>}
     */
    async syncBlockchain() {
        const headBlock = await this._blockchain.getBlock(this._peer.headHash);
        if (!headBlock) {
            this._requestChainProof();
        } else {
            this._syncFinished();
        }
    }

    /**
     * @returns {void}
     * @private
     */
    _syncFinished() {
        this._synced = true;
        this.fire('sync');
    }

    /**
     * @returns {void}
     * @private
     */
    _requestChainProof() {
        Assert.that(!this._timers.timeoutExists('getChainProof'));

        // Request ChainProof from peer.
        this._peer.channel.getChainProof();

        // Drop the peer if it doesn't send the chain proof within the timeout.
        // TODO should we ban here instead?
        this._timers.setTimeout('getChainProof', () => {
            this._peer.channel.close('getChainProof timeout');
        }, NanoConsensusAgent.CHAINPROOF_REQUEST_TIMEOUT);
    }

    /**
     * @param {ChainProofMessage} msg
     * @returns {Promise.<void>}
     * @private
     */
    async _onChainProof(msg) {
        Log.d(NanoConsensusAgent, `[CHAIN-PROOF] Received from ${this._peer.peerAddress}: ${msg.proof} (${msg.proof.serializedSize} bytes)`);

        // Check if we have requested an interlink chain, reject unsolicited ones.
        if (!this._timers.timeoutExists('getChainProof')) {
            Log.w(NanoConsensusAgent, `Unsolicited chain proof received from ${this._peer.peerAddress}`);
            // TODO close/ban?
            return;
        }

        // Clear timeout.
        this._timers.clearTimeout('getChainProof');

        // Check that the peer's head block is contained in the proof suffix.
        let headFound = false;
        const suffix = msg.proof.suffix;
        for (let i = suffix.length - 1; i >= 0; i--) {
            const header = suffix.headers[i];
            const hash = await header.hash();
            if (hash.equals(this._peer.headHash)) {
                headFound = true;
                break;
            }
        }
        if (!headFound) {
            Log.w(NanoConsensusAgent, `Invalid chain proof received from ${this._peer.peerAddress} - unexpected head`);
            // TODO ban instead?
            this._peer.channel.close('invalid chain proof');
            return;
        }

        // Push the proof into the NanoChain.
        if (!(await this._blockchain.pushProof(msg.proof))) {
            Log.w(NanoConsensusAgent, `Invalid chain proof received from ${this._peer.peerAddress} - verification failed`);
            // TODO ban instead?
            this._peer.channel.close('invalid chain proof');
            return;
        }

        // TODO add all blocks from the chain proof to knownObjects.

        this._syncFinished();
    }


    /**
     * @param {InvMessage} msg
     * @return {Promise}
     * @private
     */
    async _onInv(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the advertised objects we know
        // Request unknown objects, ignore known ones.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash); // eslint-disable-line no-await-in-loop
                    if (!block) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION: {
                    const tx = await this._mempool.getTransaction(vector.hash); // eslint-disable-line no-await-in-loop
                    if (!tx) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        Log.v(NanoConsensusAgent, `[INV] ${msg.vectors.length} vectors (${unknownObjects.length} new) received from ${this._peer.peerAddress}`);

        if (unknownObjects.length > 0) {
            // Store unknown vectors in objectsToRequest.
            this._objectsToRequest.addAll(unknownObjects);

            // Clear the request throttle timeout.
            this._timers.clearTimeout('inv');

            // If there are enough objects queued up, send out a getData request.
            if (this._objectsToRequest.length >= NanoConsensusAgent.REQUEST_THRESHOLD) {
                this._requestData();
            }
            // Otherwise, wait a short time for more inv messages to arrive, then request.
            else {
                this._timers.setTimeout('inv', () => this._requestData(), NanoConsensusAgent.REQUEST_THROTTLE);
            }
        }
    }

    /**
     * @private
     */
    _requestData() {
        // Only one request at a time.
        if (this._objectsInFlight) return;

        // Don't do anything if there are no objects queued to request.
        if (this._objectsToRequest.isEmpty()) return;

        this._objectsInFlight = new HashSet();

        // Request queued objects from the peer. Only request up to VECTORS_MAX_COUNT objects at a time.
        const vectorsMaxCount = BaseInventoryMessage.VECTORS_MAX_COUNT;
        /** @type {Array.<InvVector>} */
        const blocks = [];
        /** @type {Array.<InvVector>} */
        const transactions = [];
        for (const vector of this._objectsToRequest) {
            if (vector.type === InvVector.Type.BLOCK) {
                blocks.push(vector);
            } else {
                transactions.push(vector);
            }

            this._objectsInFlight.add(vector);
            this._objectsToRequest.remove(vector);

            if (blocks.length >= vectorsMaxCount || transactions.length >= vectorsMaxCount) {
                break;
            }
        }

        // Request headers and transactions from peer.
        this._peer.channel.getHeader(blocks);
        this._peer.channel.getData(transactions);

        // Set timer to detect end of request / missing objects
        this._timers.setTimeout('getData', () => this._noMoreData(), NanoConsensusAgent.REQUEST_TIMEOUT);
    }

    /**
     * @private
     */
    _noMoreData() {
        // Cancel the request timeout timer.
        this._timers.clearTimeout('getData');

        // Reset objects in flight.
        this._objectsInFlight = null;

        // If there are more objects to request, request them.
        if (!this._objectsToRequest.isEmpty()) {
            this._requestData();
        }
    }

    /**
     * @param {HeaderMessage} msg
     * @return {Promise}
     * @private
     */
    async _onHeader(msg) {
        const hash = await msg.header.hash();

        // Check if we have requested this block.
        const vector = new InvVector(InvVector.Type.BLOCK, hash);
        if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
            Log.w(NanoConsensusAgent, `Unsolicited header ${hash} received from ${this._peer.peerAddress}, discarding`);
            // TODO What should happen here? ban? drop connection?
            // Might not be unsolicited but just arrive after our timeout has triggered.
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // Put block into blockchain.
        const status = await this._blockchain.pushHeader(msg.header);

        // TODO send reject message if we don't like the block
        if (status === NanoChain.ERR_INVALID) {
            this._peer.channel.ban('received invalid header');
        }
    }

    /**
     * @param {TxMessage} msg
     * @return {Promise}
     * @private
     */
    async _onTx(msg) {
        const hash = await msg.transaction.hash();
        Log.i(NanoConsensusAgent, `[TX] Received transaction ${hash} from ${this._peer.peerAddress}`);

        // Check if we have requested this transaction.
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);
        if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
            Log.w(NanoConsensusAgent, `Unsolicited transaction ${hash} received from ${this._peer.peerAddress}, discarding`);
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // Put transaction into mempool.
        this._mempool.pushTransaction(msg.transaction);

        // TODO send reject message if we don't like the transaction
        // TODO what to do if the peer keeps sending invalid transactions?
    }

    /**
     * @param {NotFoundMessage} msg
     * @private
     */
    _onNotFound(msg) {
        Log.d(NanoConsensusAgent, `[NOTFOUND] ${msg.vectors.length} unknown objects received from ${this._peer.peerAddress}`);

        // Remove unknown objects from in-flight list.
        for (const vector of msg.vectors) {
            if (!this._objectsInFlight || !this._objectsInFlight.contains(vector)) {
                Log.w(NanoConsensusAgent, `Unsolicited notfound vector received from ${this._peer.peerAddress}, discarding`);
                continue;
            }

            this._onObjectReceived(vector);
        }
    }

    /**
     * @param {InvVector} vector
     * @private
     */
    _onObjectReceived(vector) {
        if (!this._objectsInFlight) return;

        // Remove the vector from the objectsInFlight.
        this._objectsInFlight.remove(vector);

        // Reset the request timeout if we expect more objects to come.
        if (!this._objectsInFlight.isEmpty()) {
            this._timers.resetTimeout('getData', () => this._noMoreData(), NanoConsensusAgent.REQUEST_TIMEOUT);
        } else {
            this._noMoreData();
        }
    }

    /**
     * @param {GetDataMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetData(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the requested objects we know.
        // Send back all known objects.
        // Send notFound for unknown objects.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK:
                    // Nano client cannot supply full blocks.
                    unknownObjects.push(vector);
                    break;

                case InvVector.Type.TRANSACTION: {
                    const tx = this._mempool.getTransaction(vector.hash); // eslint-disable-line no-await-in-loop
                    if (tx) {
                        // We have found a requested transaction, send it back to the sender.
                        this._peer.channel.tx(tx);
                    } else {
                        // Requested transaction is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }

                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        // Report any unknown objects back to the sender.
        if (unknownObjects.length) {
            this._peer.channel.notFound(unknownObjects);
        }
    }

    /**
     * @param {GetHeaderMessage} msg
     * @return {Promise}
     * @private
     */
    async _onGetHeader(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the requested objects we know.
        // Send back all known objects.
        // Send notFound for unknown objects.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash); // eslint-disable-line no-await-in-loop
                    if (block) {
                        // We have found a requested block, send it back to the sender.
                        this._peer.channel.header(block.header);
                    } else {
                        // Requested block is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }

                case InvVector.Type.TRANSACTION:
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        // Report any unknown objects back to the sender.
        if (unknownObjects.length) {
            this._peer.channel.notFound(unknownObjects);
        }
    }

    /**
     * @param {Hash} blockHash
     * @param {Array.<Address>} addresses
     * @returns {Promise.<Array.<Account>>}
     */
    getAccounts(blockHash, addresses) {
        return this._synchronizer.push(() => {
            return this._getAccounts(blockHash, addresses);
        });
    }

    /**
     * @param {Hash} blockHash
     * @param {Array.<Address>} addresses
     * @returns {Promise.<Array<Account>>}
     * @private
     */
    _getAccounts(blockHash, addresses) {
        Assert.that(this._accountsRequest === null);

        Log.d(NanoConsensusAgent, `Requesting AccountsProof for ${addresses} from ${this._peer.peerAddress}`);

        return new Promise((resolve, reject) => {
            this._accountsRequest = {
                addresses: addresses,
                blockHash: blockHash,
                resolve: resolve,
                reject: reject
            };

            // Request AccountsProof from peer.
            this._peer.channel.getAccountsProof(blockHash, addresses);

            // Drop the peer if it doesn't send the accounts proof within the timeout.
            this._timers.setTimeout('getAccountsProof', () => {
                this._peer.channel.close('getAccountsProof timeout');
                reject(new Error('timeout')); // TODO error handling
            }, NanoConsensusAgent.ACCOUNTSPROOF_REQUEST_TIMEOUT);
        });
    }

    /**
     * @param {AccountsProofMessage} msg
     * @returns {Promise.<void>}
     * @private
     */
    async _onAccountsProof(msg) {
        Log.d(NanoConsensusAgent, `[ACCOUNTS-PROOF] Received from ${this._peer.peerAddress}: blockHash=${msg.blockHash}, proof=${msg.proof}`);

        // Check if we have requested an accounts proof, reject unsolicited ones.
        if (!this._accountsRequest) {
            Log.w(NanoConsensusAgent, `Unsolicited accounts proof received from ${this._peer.peerAddress}`);
            // TODO close/ban?
            return;
        }

        // Clear the request timeout.
        this._timers.clearTimeout('getAccountsProof');

        const addresses = this._accountsRequest.addresses;
        const blockHash = this._accountsRequest.blockHash;
        const resolve = this._accountsRequest.resolve;
        const reject = this._accountsRequest.reject;

        // Reset accountsRequest.
        this._accountsRequest = null;

        // Check that we know the reference block.
        // TODO Which blocks should be accept here?
        // XXX For now, we ONLY accept our head block. This will not work well in face of block propagation delays.
        if (!blockHash.equals(msg.blockHash)) {
            Log.w(NanoConsensusAgent, `Received AccountsProof for block != head from ${this._peer.peerAddress}`);
            reject(new Error('Invalid reference block'));
            return;
        }

        // Verify the proof.
        const proof = msg.proof;
        if (!(await proof.verify())) {
            Log.w(NanoConsensusAgent, `Invalid AccountsProof received from ${this._peer.peerAddress}`);
            // TODO ban instead?
            this._peer.channel.close('Invalid AccountsProof');
            reject(new Error('Invalid AccountsProof'));
            return;
        }

        // Check that the proof root hash matches the accountsHash in the reference block.
        const rootHash = await proof.root();
        const block = await this._blockchain.getBlock(blockHash);
        if (!block.accountsHash.equals(rootHash)) {
            Log.w(NanoConsensusAgent, `Invalid AccountsProof (root hash) received from ${this._peer.peerAddress}`);
            // TODO ban instead?
            this._peer.channel.close('AccountsProof root hash mismatch');
            reject(new Error('AccountsProof root hash mismatch'));
            return;
        }

        // Check that all requested accounts are part of this proof.
        // XXX return a map address -> account instead?
        const accounts = [];
        for (const address of addresses) {
            try {
                const account = proof.getAccount(address);
                accounts.push(account);
            } catch (e) {
                Log.w(NanoConsensusAgent, `Incomplete AccountsProof received from ${this._peer.peerAddress}`);
                // TODO ban instead?
                this._peer.channel.close('Incomplete AccountsProof');
                reject(new Error('Incomplete AccountsProof'));
                return;
            }
        }

        // Return the retrieved accounts.
        resolve(accounts);
    }

    /**
     * @param {AccountsRejectedMessage} msg
     * @returns {Promise.<void>}
     * @private
     */
    async _onAccountsRejected(msg) {
        Log.d(NanoConsensusAgent, `[ACCOUNTS-REJECTED] Received from ${this._peer.peerAddress}`);

        // Check if we have requested an accounts proof, reject unsolicited ones.
        if (!this._accountsRequest) {
            Log.w(NanoConsensusAgent, `Unsolicited accounts rejected received from ${this._peer.peerAddress}`);
            // TODO close/ban?
            return;
        }

        // Clear the request timeout.
        this._timers.clearTimeout('getAccountsProof');
        const reject = this._accountsRequest.reject;

        // Reset accountsRequest.
        this._accountsRequest = null;


        reject(new Error('Accounts request was rejected'));
    }

    /**
     * @param {GetChainProofMessage} msg
     * @private
     */
    async _onGetChainProof(msg) {
        const proof = await this._blockchain.getChainProof();
        this._peer.channel.chainProof(proof);
    }

    /**
     * @returns {void}
     * @private
     */
    _onClose() {
        // Clear all timers and intervals when the peer disconnects.
        this._timers.clearAll();

        // Clear the synchronizer queue.
        this._synchronizer.clear();

        this.fire('close', this);
    }

    /**
     * @param {Hash} blockHash
     * @returns {boolean}
     */
    knowsBlock(blockHash) {
        const vector = new InvVector(InvVector.Type.BLOCK, blockHash);
        return this._knownObjects.contains(vector);
    }

    /** @type {Peer} */
    get peer() {
        return this._peer;
    }

    /** @type {boolean} */
    get synced() {
        return this._synced;
    }
}
/**
 * Number of InvVectors in invToRequest pool to automatically trigger a getData request.
 * @type {number}
 */
NanoConsensusAgent.REQUEST_THRESHOLD = 50;
/**
 * Time (ms) to wait after the last received inv message before sending getData.
 * @type {number}
 */
NanoConsensusAgent.REQUEST_THROTTLE = 500;
/**
 * Maximum time (ms) to wait after sending out getData or receiving the last object for this request.
 * @type {number}
 */
NanoConsensusAgent.REQUEST_TIMEOUT = 1000 * 5;
/**
 * Maximum time (ms) to wait for chainProof after sending out getChainProof before dropping the peer.
 * @type {number}
 */
NanoConsensusAgent.CHAINPROOF_REQUEST_TIMEOUT = 1000 * 10;
/**
 * Maximum time (ms) to wait for chainProof after sending out getChainProof before dropping the peer.
 * @type {number}
 */
NanoConsensusAgent.ACCOUNTSPROOF_REQUEST_TIMEOUT = 1000 * 5;
Class.register(NanoConsensusAgent);

class NanoConsensus extends Observable {
    /**
     * @param {NanoChain} blockchain
     * @param {NanoMempool} mempool
     * @param {Network} network
     */
    constructor(blockchain, mempool, network) {
        super();
        /** @type {NanoChain} */
        this._blockchain = blockchain;
        /** @type {NanoMempool} */
        this._mempool = mempool;
        /** @type {Network} */
        this._network = network;

        /** @type {HashMap.<Peer, NanoConsensusAgent>} */
        this._agents = new HashMap();
        /** @type {Timers} */
        this._timers = new Timers();
        /** @type {boolean} */
        this._syncing = false;
        /** @type {boolean} */
        this._established = false;

        network.on('peer-joined', peer => this._onPeerJoined(peer));
        network.on('peer-left', peer => this._onPeerLeft(peer));

        // Notify peers when our blockchain head changes.
        blockchain.on('head-changed', head => {
            // Don't announce head changes if we are not synced yet.
            if (!this._established) return;

            for (const agent of this._agents.values()) {
                agent.relayBlock(head);
            }
        });
    }

    /**
     * @param {Peer} peer
     * @private
     */
    _onPeerJoined(peer) {
        // Create a ConsensusAgent for each peer that connects.
        const agent = new NanoConsensusAgent(this._blockchain, this._mempool, peer);
        this._agents.put(peer.id, agent);

        // If no more peers connect within the specified timeout, start syncing.
        this._timers.resetTimeout('sync', this._syncBlockchain.bind(this), NanoConsensus.SYNC_THROTTLE);
    }

    /**
     * @param {Peer} peer
     * @private
     */
    _onPeerLeft(peer) {
        this._agents.remove(peer.id);
    }

    /**
     * @private
     */
    _syncBlockchain() {
        // Wait for ongoing sync to finish.
        if (this._syncing) {
            return;
        }

        // Choose a random peer which we aren't sync'd with yet.
        const agent = ArrayUtils.randomElement(this._agents.values().filter(agent => !agent.synced));
        if (!agent) {
            // We are synced with all connected peers.
            this._syncing = false;

            if (this._agents.length > 0) {
                // Report consensus-established if we have at least one connected peer.
                // TODO !!! Check peer types (at least one full node, etc.) !!!
                if (!this._established) {
                    Log.d(NanoConsensus, `Synced with all connected peers (${this._agents.length}), consensus established.`);
                    Log.d(NanoConsensus, `Blockchain: height=${this._blockchain.height}, headHash=${this._blockchain.headHash}`);

                    this._established = true;
                    this.fire('established');
                }
            } else {
                // We are not connected to any peers anymore. Report consensus-lost.
                this._established = false;
                this.fire('lost');
            }

            return;
        }

        Log.v(NanoConsensus, `Syncing blockchain with peer ${agent.peer.peerAddress}`);

        this._syncing = true;

        agent.on('sync', () => this._onPeerSynced());
        agent.on('close', () => {
            this._onPeerLeft(agent.peer);
            this._onPeerSynced();
        });
        agent.syncBlockchain();
    }

    /**
     * @private
     */
    _onPeerSynced() {
        this._syncing = false;
        this._syncBlockchain();
    }

    /**
     * @param {Address} address
     * @param {Hash} [blockHash]
     * @returns {Promise.<Account>}
     */
    async getAccount(address, blockHash=null) {
        return (await this.getAccounts([address], blockHash))[0];
    }

    /**
     * @param {Array.<Address>} addresses
     * @param {Hash} [blockHash]
     * @returns {Promise.<Array<Account>>}
     */
    async getAccounts(addresses, blockHash=null) {
        blockHash = blockHash ? blockHash : this._blockchain.headHash;
        const syncedFullNodes = this._agents.values().filter(
            agent => agent.synced
            && agent.knowsBlock(blockHash)
            && Services.isFullNode(agent.peer.peerAddress.services)
        );

        for (const agent of syncedFullNodes) {
            try {
                return await agent.getAccounts(blockHash, addresses); // eslint-disable-line no-await-in-loop
            } catch (e) {
                Log.w(NanoConsensus, `Failed to retrieve accounts ${addresses} from ${agent.peer.peerAddress}`, e);
                // Try the next peer.
            }
        }

        // No peer supplied the requested account, fail.
        throw new Error(`Failed to retrieve accounts ${addresses}`);
    }

    /**
     * @param {Transaction} transaction
     */
    async relayTransaction(transaction) {
        await this._mempool.pushTransaction(transaction);

        for (const agent of this._agents.values()) {
            agent.relayTransaction(transaction);
        }
    }

    /** @type {boolean} */
    get established() {
        return this._established;
    }

    // TODO confidence level?

    /** @type {IBlockchain} */
    get blockchain() {
        return this._blockchain;
    }

    /** @type {NanoMempool} */
    get mempool() {
        return this._mempool;
    }

    /** @type {Network} */
    get network() {
        return this._network;
    }
}
NanoConsensus.SYNC_THROTTLE = 1000; // ms
Class.register(NanoConsensus);

class NanoMempool extends Observable {
    constructor() {
        super();

        // Our pool of transactions.
        /** @type {HashMap.<Hash, Transaction>} */
        this._transactions = new HashMap();
    }

    /**
     * @param {Transaction} transaction
     * @fires Mempool#transaction-added
     * @returns {Promise.<boolean>}
     */
    async pushTransaction(transaction) {
        // Check if we already know this transaction.
        const hash = await transaction.hash();
        if (this._transactions.contains(hash)) {
            Log.v(Mempool, `Ignoring known transaction ${hash.toBase64()}`);
            return false;
        }

        // Verify transaction.
        if (!(await NanoMempool._verifyTransaction(transaction))) {
            return false;
        }

        // Evict the oldest transactions from the mempool if it grows too large.
        if (this._transactions.length >= NanoMempool.TRANSACTIONS_MAX_COUNT) {
            this._evictTransactions();
        }

        // Transaction is valid, add it to the mempool.
        this._transactions.put(hash, transaction);

        // Tell listeners about the new transaction we received.
        this.fire('transaction-added', transaction);

        return true;
    }

    /**
     * @param {Hash} hash
     * @returns {Transaction}
     */
    getTransaction(hash) {
        return this._transactions.get(hash);
    }

    /**
     * @param {number} maxCount
     * @returns {Array.<Transaction>}
     */
    getTransactions(maxCount = 5000) {
        // TODO Add logic here to pick the "best" transactions.
        const transactions = [];
        for (const transaction of this._transactions.values()) {
            if (transactions.length >= maxCount) break;
            transactions.push(transaction);
        }
        return transactions;
    }

    /**
     * @param {Transaction} transaction
     * @returns {Promise.<boolean>}
     * @private
     */
    static async _verifyTransaction(transaction) {
        // Verify transaction signature.
        if (!(await transaction.verifySignature())) {
            Log.w(Mempool, 'Rejected transaction - invalid signature', transaction);
            return false;
        }

        // Do not allow transactions where sender and recipient coincide.
        const senderAddr = await transaction.getSenderAddr();
        if (transaction.recipientAddr.equals(senderAddr)) {
            Log.w(Mempool, 'Rejecting transaction - sender and recipient coincide');
            return false;
        }

        return true;
    }

    /**
     * @private
     */
    _evictTransactions() {
        const keyIterator = this._transactions.keyIterator();
        let {hash, done} = keyIterator.next();
        for (let i = 0; !done && i < NanoMempool.TRANSACTIONS_EVICT_COUNT; i++) {
            /** @type {Transaction} */
            this._transactions.remove(hash);

            ({hash, done} = keyIterator.next());
        }
    }
}
NanoMempool.TRANSACTIONS_MAX_COUNT = 50000;
NanoMempool.TRANSACTIONS_EVICT_COUNT = 5000;
Class.register(NanoMempool);

class ConsensusDB extends JDB.JungleDB {
    /**
     * @returns {Promise.<ConsensusDB>}
     */
    static async get() {
        if (!ConsensusDB._instance) {
            ConsensusDB._instance = await new ConsensusDB();
        }
        return ConsensusDB._instance;
    }

    /**
     * @returns {Promise.<ConsensusDB>}
     */
    constructor() {
        super('consensus', ConsensusDB.VERSION);
        return this._init();
    }

    /**
     * @returns {Promise.<ConsensusDB>}
     * @private
     */
    async _init() {
        // Initialize object stores.
        AccountsTreeStore.initPersistent(this);
        ChainDataStore.initPersistent(this);

        // Establish connection to database.
        await this.connect();

        return this;
    }
}
ConsensusDB._instance = null;
ConsensusDB.VERSION = 1;
Class.register(ConsensusDB);

class Consensus {
    static async full() {
        Services.configureServices(Services.FULL);
        Services.configureServiceMask(Services.FULL);

        /** @type {ConsensusDB} */
        const db = await ConsensusDB.get();
        /** @type {Accounts} */
        const accounts = await Accounts.getPersistent(db);
        /** @type {FullChain} */
        const blockchain = await FullChain.getPersistent(db, accounts);
        /** @type {Mempool} */
        const mempool = new Mempool(blockchain, accounts);
        /** @type {Network} */
        const network = await new Network(blockchain);

        return new FullConsensus(blockchain, mempool, network);
    }

    static async light() {
        Services.configureServices(Services.LIGHT);
        Services.configureServiceMask(Services.LIGHT | Services.FULL);

        /** @type {ConsensusDB} */
        const db = await ConsensusDB.get();
        /** @type {Accounts} */
        const accounts = await Accounts.getPersistent(db);
        /** @type {FullChain} */
        const blockchain = await LightChain.getPersistent(db, accounts);
        /** @type {Mempool} */
        const mempool = new Mempool(blockchain, accounts);
        /** @type {Network} */
        const network = await new Network(blockchain);

        return new LightConsensus(blockchain, mempool, network);
    }

    static async nano() {
        Services.configureServices(Services.NANO);
        Services.configureServiceMask(Services.NANO | Services.LIGHT | Services.FULL);

        /** @type {NanoChain} */
        const blockchain = await new NanoChain();
        /** @type {NanoMempool} */
        const mempool = new NanoMempool();
        /** @type {Network} */
        const network = await new Network(blockchain);

        return new NanoConsensus(blockchain, mempool, network);
    }
}
Class.register(Consensus);

class Protocol {
}
Protocol.DUMB = 0;
Protocol.WS = 1;
Protocol.RTC = 2;
Class.register(Protocol);

class NetAddress {
    /**
     * @param {string} ip
     * @return {NetAddress}
     */
    static fromIP(ip) {
        const saneIp = NetUtils.sanitizeIP(ip);
        return new NetAddress(saneIp);
    }

    /**
     * @param {string} ip
     */
    constructor(ip) {
        /** @type {string} */
        this._ip = ip;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {NetAddress}
     */
    static unserialize(buf) {
        const ip = buf.readVarLengthString();

        // Allow empty NetAddresses.
        if (!ip) {
            return NetAddress.UNSPECIFIED;
        }

        return NetAddress.fromIP(ip);
    }

    /**
     * @param {?SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeVarLengthString(this._ip);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return /*extraByte VarLengthString ip*/ 1
            + /*ip*/ this._ip.length;
    }

    /**
     * @param {NetAddress} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof NetAddress
            && this._ip === o.ip;
    }

    hashCode() {
        return this.toString();
    }

    /**
     * @return {string}
     */
    toString() {
        return `${this._ip}`;
    }

    /** @type {string} */
    get ip() {
        return this._ip;
    }

    /**
     * @return {boolean}
     */
    isPseudo() {
        return !this._ip || NetAddress.UNKNOWN.equals(this);
    }

    /**
     * @return {boolean}
     */
    isPrivate() {
        return this.isPseudo() || NetUtils.isPrivateIP(this._ip);
    }
}
NetAddress.UNSPECIFIED = new NetAddress('');
NetAddress.UNKNOWN = new NetAddress('<unknown>');
Class.register(NetAddress);

class PeerAddress {
    /**
     * @param {number} protocol
     * @param {number} services
     * @param {number} timestamp
     * @param {NetAddress} netAddress
     */
    constructor(protocol, services, timestamp, netAddress) {
        this._protocol = protocol;
        this._services = services;
        this._timestamp = timestamp;
        this._netAddress = netAddress || NetAddress.UNSPECIFIED;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {PeerAddress}
     */
    static unserialize(buf) {
        const protocol = buf.readUint8();
        switch (protocol) {
            case Protocol.WS:
                return WsPeerAddress.unserialize(buf);

            case Protocol.RTC:
                return RtcPeerAddress.unserialize(buf);

            case Protocol.DUMB:
                return DumbPeerAddress.unserialize(buf);

            default:
                throw `Malformed PeerAddress protocol ${protocol}`;
        }
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint8(this._protocol);
        buf.writeUint32(this._services);
        buf.writeUint64(this._timestamp);

        // Never serialize private netAddresses.
        if (this._netAddress.isPrivate()) {
            NetAddress.UNSPECIFIED.serialize(buf);
        } else {
            this._netAddress.serialize(buf);
        }

        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return /*protocol*/ 1
            + /*services*/ 4
            + /*timestamp*/ 8
            + this._netAddress.serializedSize;
    }

    /**
     * @param {PeerAddress|*} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof PeerAddress
            && this._protocol === o.protocol;
            /* services is ignored */
            /* timestamp is ignored */
            /* netAddress is ignored */
    }

    /** @type {number} */
    get protocol() {
        return this._protocol;
    }

    /** @type {number} */
    get services() {
        return this._services;
    }

    /** @type {number} */
    get timestamp() {
        return this._timestamp;
    }

    /** @type {number} */
    set timestamp(value) {
        // Never change the timestamp of a seed address.
        if (this.isSeed()) {
            return;
        }
        this._timestamp = value;
    }

    /** @type {NetAddress} */
    get netAddress() {
        return this._netAddress.isPseudo() ? null : this._netAddress;
    }

    /** @type {NetAddress} */
    set netAddress(value) {
        this._netAddress = value || NetAddress.UNSPECIFIED;
    }

    /**
     * @returns {boolean}
     */
    isSeed() {
        return this._timestamp === 0;
    }
}
Class.register(PeerAddress);

class WsPeerAddress extends PeerAddress {
    /**
     * @param {string} host
     * @param {number} port
     * @returns {WsPeerAddress}
     */
    static seed(host, port) {
        return new WsPeerAddress(Services.DEFAULT, /*timestamp*/ 0, NetAddress.UNSPECIFIED, host, port);
    }

    /**
     * @param {number} services
     * @param {number} timestamp
     * @param {NetAddress} netAddress
     * @param {string} host
     * @param {number} port
     */
    constructor(services, timestamp, netAddress, host, port) {
        super(Protocol.WS, services, timestamp, netAddress);
        if (!host) throw 'Malformed host';
        if (!NumberUtils.isUint16(port)) throw 'Malformed port';
        this._host = host;
        this._port = port;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {WsPeerAddress}
     */
    static unserialize(buf) {
        const services = buf.readUint32();
        const timestamp = buf.readUint64();
        const netAddress = NetAddress.unserialize(buf);
        const host = buf.readVarLengthString();
        const port = buf.readUint16();
        return new WsPeerAddress(services, timestamp, netAddress, host, port);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeVarLengthString(this._host);
        buf.writeUint16(this._port);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*extra byte VarLengthString host*/ 1
            + this._host.length
            + /*port*/ 2;
    }

    /**
     * @override
     * @param {PeerAddress|*} o
     * @returns {boolean}
     */
    equals(o) {
        return super.equals(o)
            && o instanceof WsPeerAddress
            && this._host === o.host
            && this._port === o.port;
    }

    hashCode() {
        return this.toString();
    }

    /**
     * @returns {string}
     */
    toString() {
        return `wss://${this._host}:${this._port}`;
    }

    /** @type {string} */
    get host() {
        return this._host;
    }

    /** @type {number} */
    get port() {
        return this._port;
    }
}
Class.register(WsPeerAddress);

class RtcPeerAddress extends PeerAddress {
    /**
     * @param {number} services
     * @param {number} timestamp
     * @param {NetAddress} netAddress
     * @param {string} signalId
     * @param {number} distance
     */
    constructor(services, timestamp, netAddress, signalId, distance) {
        super(Protocol.RTC, services, timestamp, netAddress);
        if (!RtcPeerAddress.isSignalId(signalId)) throw 'Malformed signalId';
        if (!NumberUtils.isUint8(distance)) throw 'Malformed distance';
        this._signalId = signalId;
        this._distance = distance;
    }

    /**
     * @param {string} arg
     * @returns {boolean}
     */
    static isSignalId(arg) {
        return /[a-z0-9]{32}/i.test(arg);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {RtcPeerAddress}
     */
    static unserialize(buf) {
        const services = buf.readUint32();
        const timestamp = buf.readUint64();
        const netAddress = NetAddress.unserialize(buf);
        const signalId = buf.readString(32);
        const distance = buf.readUint8();
        return new RtcPeerAddress(services, timestamp, netAddress, signalId, distance);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeString(this._signalId, 32);
        buf.writeUint8(this._distance);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*signalId*/ 32
            + /*distance*/ 1;
    }

    /**
     * @override
     * @param {PeerAddress|*} o
     * @returns {boolean}
     */
    equals(o) {
        return super.equals(o)
            && o instanceof RtcPeerAddress
            && this._signalId === o.signalId;
    }

    hashCode() {
        return this.toString();
    }

    /**
     * @returns {string}
     */
    toString() {
        return `rtc://${this._signalId}`;
    }

    /** @type {string} */
    get signalId() {
        return this._signalId;
    }

    /** @type {number} */
    get distance() {
        return this._distance;
    }

    // Changed when passed on to other peers.
    /** @type {number} */
    set distance(value) {
        this._distance = value;
    }
}
Class.register(RtcPeerAddress);

class DumbPeerAddress extends PeerAddress {
    /**
     * @param {number} services
     * @param {number} timestamp
     * @param {NetAddress} netAddress
     * @param {number} id
     */
    constructor(services, timestamp, netAddress, id) {
        super(Protocol.DUMB, services, timestamp, netAddress);
        this._id = id;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {DumbPeerAddress}
     */
    static unserialize(buf) {
        const services = buf.readUint32();
        const timestamp = buf.readUint64();
        const netAddress = NetAddress.unserialize(buf);
        const id = buf.readUint64();
        return new DumbPeerAddress(services, timestamp, netAddress, id);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint64(this._id);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*id*/ 8;
    }

    /**
     * @override
     * @param {PeerAddress} o
     * @returns {boolean}
     */
    equals(o) {
        return super.equals(o)
            && o instanceof DumbPeerAddress
            && this._id === o.id;
    }

    hashCode() {
        return this.toString();
    }

    /**
     * @returns {string}
     */
    toString() {
        return `dumb://${this._id}`;
    }

    /** @type {number} */
    get id() {
        return this._id;
    }
}
Class.register(DumbPeerAddress);

// TODO Limit the number of addresses we store.
class PeerAddresses extends Observable {
    constructor() {
        super();

        /**
         * Set of PeerAddressStates of all peerAddresses we know.
         * @type {HashSet.<PeerAddressState>}
         * @private
         */
        this._store = new HashSet();

        /**
         * Map from signalIds to RTC peerAddresses.
         * @type {HashMap.<string,PeerAddressState>}
         * @private
         */
        this._signalIds = new HashMap();

        // Number of WebSocket/WebRTC peers.
        /** @type {number} */
        this._peerCountWs = 0;
        /** @type {number} */
        this._peerCountRtc = 0;
        /** @type {number} */
        this._peerCountDumb = 0;

        // Init seed peers.
        this.add(/*channel*/ null, PeerAddresses.SEED_PEERS);

        // Setup housekeeping interval.
        setInterval(() => this._housekeeping(), PeerAddresses.HOUSEKEEPING_INTERVAL);
    }

    /**
     * @returns {?PeerAddress}
     */
    pickAddress() {
        const addresses = this._store.values();
        const numAddresses = addresses.length;

        // Pick a random start index.
        const index = Math.floor(Math.random() * numAddresses);

        // Score up to 1000 addresses starting from the start index and pick the
        // one with the highest score. Never pick addresses with score < 0.
        const minCandidates = Math.min(numAddresses, 1000);
        const candidates = new HashMap();
        for (let i = 0; i < numAddresses; i++) {
            const idx = (index + i) % numAddresses;
            const address = addresses[idx];
            const score = this._scoreAddress(address);
            if (score >= 0) {
                candidates.put(score, address);
                if (candidates.length >= minCandidates) {
                    break;
                }
            }
        }

        if (candidates.length === 0) {
            return null;
        }

        // Return the candidate with the highest score.
        const scores = candidates.keys().sort((a, b) => b - a);
        const winner = candidates.get(scores[0]);
        return winner.peerAddress;
    }

    /**
     * @param {PeerAddressState} peerAddressState
     * @returns {number}
     * @private
     */
    _scoreAddress(peerAddressState) {
        const peerAddress = peerAddressState.peerAddress;

        // Filter addresses that we cannot connect to.
        if (!NetworkConfig.canConnect(peerAddress.protocol)) {
            return -1;
        }

        // Filter addresses that are too old.
        if (this._exceedsAge(peerAddress)) {
            return -1;
        }

        const score = this._scoreProtocol(peerAddress)
            * ((peerAddress.timestamp / 1000) + 1);

        switch (peerAddressState.state) {
            case PeerAddressState.CONNECTING:
            case PeerAddressState.CONNECTED:
            case PeerAddressState.BANNED:
                return -1;

            case PeerAddressState.NEW:
            case PeerAddressState.TRIED:
                return score;

            case PeerAddressState.FAILED:
                return (1 - (peerAddressState.failedAttempts / peerAddressState.maxFailedAttempts)) * score;

            default:
                return -1;
        }
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {number}
     * @private
     */
    _scoreProtocol(peerAddress) {
        let score = 1;

        // We want at least two websocket connection
        if (this._peerCountWs < 2) {
            score *= peerAddress.protocol === Protocol.WS ? 3 : 1;
        } else {
            score *= peerAddress.protocol === Protocol.RTC ? 3 : 1;
        }

        // Prefer WebRTC addresses with lower distance:
        //  distance = 0: self
        //  distance = 1: direct connection
        //  distance = 2: 1 hop
        //  ...
        // We only expect distance >= 2 here.
        if (peerAddress.protocol === Protocol.RTC) {
            score *= 1 + ((PeerAddresses.MAX_DISTANCE - peerAddress.distance) / 2);
        }

        return score;
    }

    /** @type {number} */
    get peerCount() {
        return this._peerCountWs + this._peerCountRtc + this._peerCountDumb;
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {PeerAddress|null}
     */
    get(peerAddress) {
        /** @type {PeerAddressState} */
        const peerAddressState = this._store.get(peerAddress);
        return peerAddressState ? peerAddressState.peerAddress : null;
    }

    /**
     * @param {string} signalId
     * @returns {PeerAddress|null}
     */
    getBySignalId(signalId) {
        /** @type {PeerAddressState} */
        const peerAddressState = this._signalIds.get(signalId);
        return peerAddressState ? peerAddressState.peerAddress : null;
    }

    /**
     * @param {string} signalId
     * @returns {PeerChannel}
     */
    getChannelBySignalId(signalId) {
        const peerAddressState = this._signalIds.get(signalId);
        if (peerAddressState && peerAddressState.bestRoute) {
            return peerAddressState.bestRoute.signalChannel;
        }
        return null;
    }

    /**
     * @todo improve this by returning the best addresses first.
     * @param {number} protocolMask
     * @param {number} serviceMask
     * @param {number} maxAddresses
     * @returns {Array.<PeerAddress>}
     */
    query(protocolMask, serviceMask, maxAddresses = 1000) {
        // XXX inefficient linear scan
        const now = Date.now();
        const addresses = [];
        for (const peerAddressState of this._store.values()) {
            // Never return banned or failed addresses.
            if (peerAddressState.state === PeerAddressState.BANNED
                    || peerAddressState.state === PeerAddressState.FAILED) {
                continue;
            }

            // Never return seed peers.
            const address = peerAddressState.peerAddress;
            if (address.isSeed()) {
                continue;
            }

            // Only return addresses matching the protocol mask.
            if ((address.protocol & protocolMask) === 0) {
                continue;
            }

            // Only return addresses matching the service mask.
            if ((address.services & serviceMask) === 0) {
                continue;
            }

            // Update timestamp for connected peers.
            if (peerAddressState.state === PeerAddressState.CONNECTED) {
                address.timestamp = now;
                // Also update timestamp for RTC connections
                if (peerAddressState.bestRoute) {
                    peerAddressState.bestRoute.timestamp = now;
                }
            }

            // Never return addresses that are too old.
            if (this._exceedsAge(address)) {
                continue;
            }

            // Return this address.
            addresses.push(address);

            // Stop if we have collected maxAddresses.
            if (addresses.length >= maxAddresses) {
                break;
            }
        }
        return addresses;
    }

    /**
     * @param {PeerChannel} channel
     * @param {PeerAddress|Array.<PeerAddress>} arg
     */
    add(channel, arg) {
        const peerAddresses = Array.isArray(arg) ? arg : [arg];
        const newAddresses = [];

        for (const addr of peerAddresses) {
            if (this._add(channel, addr)) {
                newAddresses.push(addr);
            }
        }

        // Tell listeners that we learned new addresses.
        if (newAddresses.length) {
            this.fire('added', newAddresses, this);
        }
    }

    /**
     * @param {PeerChannel} channel
     * @param {PeerAddress|RtcPeerAddress} peerAddress
     * @returns {boolean}
     * @private
     */
    _add(channel, peerAddress) {
        // Ignore our own address.
        if (NetworkConfig.myPeerAddress().equals(peerAddress)) {
            return false;
        }

        // Ignore address if it is too old.
        // Special case: allow seed addresses (timestamp == 0) via null channel.
        if (channel && this._exceedsAge(peerAddress)) {
            Log.d(PeerAddresses, `Ignoring address ${peerAddress} - too old (${new Date(peerAddress.timestamp)})`);
            return false;
        }

        // Ignore address if its timestamp is too far in the future.
        if (peerAddress.timestamp > Date.now() + PeerAddresses.MAX_TIMESTAMP_DRIFT) {
            Log.d(PeerAddresses, `Ignoring addresses ${peerAddress} - timestamp in the future`);
            return false;
        }

        // Increment distance values of RTC addresses.
        if (peerAddress.protocol === Protocol.RTC) {
            peerAddress.distance++;

            // Ignore address if it exceeds max distance.
            if (peerAddress.distance > PeerAddresses.MAX_DISTANCE) {
                Log.d(PeerAddresses, `Ignoring address ${peerAddress} - max distance exceeded`);
                // Drop any route to this peer over the current channel. This may prevent loops.
                const peerAddressState = this._store.get(peerAddress);
                if (peerAddressState) {
                    peerAddressState.deleteRoute(channel);
                }
                return false;
            }
        }

        // Check if we already know this address.
        let peerAddressState = this._store.get(peerAddress);
        if (peerAddressState) {
            const knownAddress = peerAddressState.peerAddress;

            // Ignore address if it is banned.
            if (peerAddressState.state === PeerAddressState.BANNED) {
                return false;
            }

            // Never update the timestamp of seed peers.
            if (knownAddress.isSeed()) {
                peerAddress.timestamp = 0;
            }

            // Never erase NetAddresses.
            if (knownAddress.netAddress && !peerAddress.netAddress) {
                peerAddress.netAddress = knownAddress.netAddress;
            }

            // Ignore address if it is a websocket address and we already know this address with a more recent timestamp.
            if (peerAddress.protocol === Protocol.WS && knownAddress.timestamp >= peerAddress.timestamp) {
                return false;
            }
        } else {
            // Add new peerAddressState.
            peerAddressState = new PeerAddressState(peerAddress);
            this._store.add(peerAddressState);
            if (peerAddress.protocol === Protocol.RTC) {
                // Index by signalId.
                this._signalIds.put(peerAddress.signalId, peerAddressState);
            }
        }

        // Add route.
        if (peerAddress.protocol === Protocol.RTC) {
            peerAddressState.addRoute(channel, peerAddress.distance, peerAddress.timestamp);
        }

        // If we are currently connected, allow only updates to the netAddress and only if we don't know it yet.
        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            if (!peerAddressState.peerAddress.netAddress && peerAddress.netAddress) {
                peerAddressState.peerAddress.netAddress = peerAddress.netAddress;
            }

            return false;
        }

        // Update the address.
        peerAddressState.peerAddress = peerAddress;

        return true;
    }

    /**
     * Called when a connection to this peerAddress is being established.
     * @param {PeerAddress} peerAddress
     * @returns {void}
     */
    connecting(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }
        if (peerAddressState.state === PeerAddressState.BANNED) {
            throw 'Connecting to banned address';
        }
        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            throw `Duplicate connection to ${peerAddress}`;
        }

        peerAddressState.state = PeerAddressState.CONNECTING;
    }

    /**
     * Called when a connection to this peerAddress has been established.
     * The connection might have been initiated by the other peer, so address
     * may not be known previously.
     * If it is already known, it has been updated by a previous version message.
     * @param {PeerChannel} channel
     * @param {PeerAddress|RtcPeerAddress} peerAddress
     * @returns {void}
     */
    connected(channel, peerAddress) {
        let peerAddressState = this._store.get(peerAddress);
        
        if (!peerAddressState) {
            peerAddressState = new PeerAddressState(peerAddress);

            if (peerAddress.protocol === Protocol.RTC) {
                this._signalIds.put(peerAddress.signalId, peerAddressState);
            }

            this._store.add(peerAddressState);
        } else {
            // Never update the timestamp of seed peers.
            if (peerAddressState.peerAddress.isSeed()) {
                peerAddress.timestamp = 0;
            }
        }

        if (peerAddressState.state === PeerAddressState.BANNED
            // Allow recovering seed peer's inbound connection to succeed.
            && !peerAddressState.peerAddress.isSeed()) {

            throw 'Connected to banned address';
        }

        if (peerAddressState.state !== PeerAddressState.CONNECTED) {
            this._updateConnectedPeerCount(peerAddress, 1);
        }

        peerAddressState.state = PeerAddressState.CONNECTED;
        peerAddressState.lastConnected = Date.now();
        peerAddressState.failedAttempts = 0;

        peerAddressState.peerAddress = peerAddress;
        peerAddressState.peerAddress.timestamp = Date.now();

        // Add route.
        if (peerAddress.protocol === Protocol.RTC) {
            peerAddressState.addRoute(channel, peerAddress.distance, peerAddress.timestamp);
        }
    }

    /**
     * Called when a connection to this peerAddress is closed.
     * @param {PeerChannel} channel
     * @param {boolean} closedByRemote
     * @returns {void}
     */
    disconnected(channel, closedByRemote) {
        const peerAddress = channel.peerAddress;
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }
        if (peerAddressState.state !== PeerAddressState.CONNECTING
            && peerAddressState.state !== PeerAddressState.CONNECTED) {
            throw `disconnected() called in unexpected state ${peerAddressState.state}`;
        }

        // Delete all addresses that were signalable over the disconnected peer.
        this._removeBySignalChannel(channel);

        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            this._updateConnectedPeerCount(peerAddress, -1);
        }

        // Always set state to tried, even when deciding to delete this address.
        // In the latter case, this will not influence the deletion,
        // but it will prevent decrementing the peer count twice when banning seed nodes.
        peerAddressState.state = PeerAddressState.TRIED;

        // XXX Immediately delete address if the remote host closed the connection.
        // Also immediately delete dumb clients, since we cannot connect to those anyway.
        if (closedByRemote || peerAddress.protocol === Protocol.DUMB) {
            this._remove(peerAddress);
        }
    }

    /**
     * Called when a connection attempt to this peerAddress has failed.
     * @param {PeerAddress} peerAddress
     * @returns {void}
     */
    unreachable(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }
        if (peerAddressState.state === PeerAddressState.BANNED) {
            return;
        }

        peerAddressState.state = PeerAddressState.FAILED;
        peerAddressState.failedAttempts++;

        if (peerAddressState.failedAttempts >= peerAddressState.maxFailedAttempts) {
            this._remove(peerAddress);
        }
    }

    /**
     * Called when a message has been returned as unroutable.
     * @param {PeerChannel} channel
     * @param {PeerAddress} peerAddress
     * @returns {void}
     */
    unroutable(channel, peerAddress) {
        if (!peerAddress) {
            return;
        }

        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }

        if (!peerAddressState.bestRoute || !peerAddressState.bestRoute.signalChannel.equals(channel)) {
            Log.w(PeerAddresses, `Got unroutable for ${peerAddress} on a channel other than the best route.`);
            return;
        }

        peerAddressState.deleteBestRoute();
        if (!peerAddressState.hasRoute()) {
            this._remove(peerAddressState.peerAddress);
        }
    }

    /**
     * @param {PeerAddress} peerAddress
     * @param {number} duration in minutes
     * @returns {void}
     */
    ban(peerAddress, duration = 10 /*minutes*/) {
        let peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            peerAddressState = new PeerAddressState(peerAddress);
            this._store.add(peerAddressState);
        }
        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            this._updateConnectedPeerCount(peerAddress, -1);
        }

        peerAddressState.state = PeerAddressState.BANNED;
        peerAddressState.bannedUntil = Date.now() + duration * 60 * 1000;

        // Drop all routes to this peer.
        peerAddressState.deleteAllRoutes();
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {boolean}
     */
    isConnecting(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        return peerAddressState && peerAddressState.state === PeerAddressState.CONNECTING;
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {boolean}
     */
    isConnected(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        return peerAddressState && peerAddressState.state === PeerAddressState.CONNECTED;
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {boolean}
     */
    isBanned(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        return peerAddressState
            && peerAddressState.state === PeerAddressState.BANNED
            // XXX Never consider seed peers to be banned. This allows us to use
            // the banning mechanism to prevent seed peers from being picked when
            // they are down, but still allows recovering seed peers' inbound
            // connections to succeed.
            && !peerAddressState.peerAddress.isSeed();
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {void}
     * @private
     */
    _remove(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }

        // Never delete seed addresses, ban them instead for 5 minutes.
        if (peerAddressState.peerAddress.isSeed()) {
            this.ban(peerAddress, 5);
            return;
        }

        // Delete from signalId index.
        if (peerAddress.protocol === Protocol.RTC) {
            this._signalIds.remove(peerAddress.signalId);
        }

        // Don't delete bans.
        if (peerAddressState.state === PeerAddressState.BANNED) {
            return;
        }

        // Delete the address.
        this._store.remove(peerAddress);
    }

    /**
     * Delete all RTC-only routes that are signalable over the given peer.
     * @param {PeerChannel} channel
     * @returns {void}
     * @private
     */
    _removeBySignalChannel(channel) {
        // XXX inefficient linear scan
        for (const peerAddressState of this._store.values()) {
            if (peerAddressState.peerAddress.protocol === Protocol.RTC) {
                peerAddressState.deleteRoute(channel);
                if (!peerAddressState.hasRoute()) {
                    this._remove(peerAddressState.peerAddress);
                }
            }
        }
    }

    /**
     * @param {PeerAddress} peerAddress
     * @param {number} delta
     * @returns {void}
     * @private
     */
    _updateConnectedPeerCount(peerAddress, delta) {
        switch (peerAddress.protocol) {
            case Protocol.WS:
                this._peerCountWs += delta;
                break;
            case Protocol.RTC:
                this._peerCountRtc += delta;
                break;
            case Protocol.DUMB:
                this._peerCountDumb += delta;
                break;
            default:
                Log.w(PeerAddresses, `Unknown protocol ${peerAddress.protocol}`);
        }
    }

    /**
     * @returns {void}
     * @private
     */
    _housekeeping() {
        const now = Date.now();
        const unbannedAddresses = [];

        for (/** @type {PeerAddressState} */ const peerAddressState of this._store.values()) {
            const addr = peerAddressState.peerAddress;

            switch (peerAddressState) {
                case PeerAddressState.NEW:
                case PeerAddressState.TRIED:
                case PeerAddressState.FAILED:
                    // Delete all new peer addresses that are older than MAX_AGE.
                    if (this._exceedsAge(addr)) {
                        Log.d(PeerAddresses, `Deleting old peer address ${addr}`);
                        this._remove(addr);
                    }
                    break;

                case PeerAddressState.BANNED:
                    if (peerAddressState.bannedUntil <= now) {
                        if (addr.isSeed()) {
                            // Restore banned seed addresses to the NEW state.
                            peerAddressState.state = PeerAddressState.NEW;
                            peerAddressState.failedAttempts = 0;
                            peerAddressState.bannedUntil = -1;
                            unbannedAddresses.push(addr);
                        } else {
                            // Delete expires bans.
                            this._store.remove(addr);
                        }
                    }
                    break;

                case PeerAddressState.CONNECTED:
                    // Keep timestamp up-to-date while we are connected.
                    addr.timestamp = now;
                    // Also update timestamp for RTC connections
                    if (peerAddressState.bestRoute) {
                        peerAddressState.bestRoute.timestamp = now;
                    }
                    break;

                default:
                    // TODO What about peers who are stuck connecting? Can this happen?
                    // Do nothing for CONNECTING peers.
            }
        }

        if (unbannedAddresses.length) {
            this.fire('added', unbannedAddresses, this);
        }
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {boolean}
     * @private
     */
    _exceedsAge(peerAddress) {
        // Seed addresses are never too old.
        if (peerAddress.isSeed()) {
            return false;
        }

        const age = Date.now() - peerAddress.timestamp;
        switch (peerAddress.protocol) {
            case Protocol.WS:
                return age > PeerAddresses.MAX_AGE_WEBSOCKET;

            case Protocol.RTC:
                return age > PeerAddresses.MAX_AGE_WEBRTC;

            case Protocol.DUMB:
                return age > PeerAddresses.MAX_AGE_DUMB;
        }
        return false;
    }

    /** @type {number} */
    get peerCountWs() {
        return this._peerCountWs;
    }

    /** @type {number} */
    get peerCountRtc() {
        return this._peerCountRtc;
    }

    /** @type {number} */
    get peerCountDumb() {
        return this._peerCountDumb;
    }
}
PeerAddresses.MAX_AGE_WEBSOCKET = 1000 * 60 * 15; // 15 minutes
PeerAddresses.MAX_AGE_WEBRTC = 1000 * 45; // 45 seconds
PeerAddresses.MAX_AGE_DUMB = 1000 * 45; // 45 seconds
PeerAddresses.MAX_DISTANCE = 4;
PeerAddresses.MAX_FAILED_ATTEMPTS_WS = 3;
PeerAddresses.MAX_FAILED_ATTEMPTS_RTC = 2;
PeerAddresses.MAX_TIMESTAMP_DRIFT = 1000 * 60 * 10; // 10 minutes
PeerAddresses.HOUSEKEEPING_INTERVAL = 1000 * 60 * 3; // 3 minutes
PeerAddresses.SEED_PEERS = [
    WsPeerAddress.seed('dev.nimiq-network.com', 8080)
    // WsPeerAddress.seed('localhost', 8080)
];
Class.register(PeerAddresses);

class PeerAddressState {
    /**
     * @param {PeerAddress} peerAddress
     */
    constructor(peerAddress) {
        /** @type {PeerAddress} */
        this.peerAddress = peerAddress;

        /** @type {number} */
        this.state = PeerAddressState.NEW;
        /** @type {number} */
        this.lastConnected = -1;
        /** @type {number} */
        this.bannedUntil = -1;

        /** @type {SignalRoute} */
        this._bestRoute = null;
        /** @type {HashSet.<SignalRoute>} */
        this._routes = new HashSet();

        /** @type {number} */
        this._failedAttempts = 0;
    }

    /** @type {number} */
    get maxFailedAttempts() {
        switch (this.peerAddress.protocol) {
            case Protocol.RTC:
                return PeerAddresses.MAX_FAILED_ATTEMPTS_RTC;
            case Protocol.WS:
                return PeerAddresses.MAX_FAILED_ATTEMPTS_WS;
            default:
                return 0;
        }
    }

    /** @type {number} */
    get failedAttempts() {
        if (this._bestRoute) {
            return this._bestRoute.failedAttempts;
        } else {
            return this._failedAttempts;
        }
    }

    /** @type {number} */
    set failedAttempts(value) {
        if (this._bestRoute) {
            this._bestRoute.failedAttempts = value;
            this._updateBestRoute(); // scores may have changed
        } else {
            this._failedAttempts = value;
        }
    }

    /** @type {SignalRoute} */
    get bestRoute() {
        return this._bestRoute;
    }

    /**
     * @param {PeerChannel} signalChannel
     * @param {number} distance
     * @param {number} timestamp
     * @returns {void}
     */
    addRoute(signalChannel, distance, timestamp) {
        const oldRoute = this._routes.get(signalChannel);
        const newRoute = new SignalRoute(signalChannel, distance, timestamp);

        if (oldRoute) {
            // Do not reset failed attempts.
            newRoute.failedAttempts = oldRoute.failedAttempts;
        }
        this._routes.add(newRoute);

        if (!this._bestRoute || newRoute.score > this._bestRoute.score
            || (newRoute.score === this._bestRoute.score && timestamp > this._bestRoute.timestamp)) {

            this._bestRoute = newRoute;
            this.peerAddress.distance = this._bestRoute.distance;
        }
    }

    /**
     * @returns {void}
     */
    deleteBestRoute() {
        if (this._bestRoute) {
            this.deleteRoute(this._bestRoute.signalChannel);
        }
    }

    /**
     * @param {PeerChannel} signalChannel
     * @returns {void}
     */
    deleteRoute(signalChannel) {
        this._routes.remove(signalChannel); // maps to same hashCode
        if (this._bestRoute && this._bestRoute.signalChannel.equals(signalChannel)) {
            this._updateBestRoute();
        }
    }

    /**
     * @returns {void}
     */
    deleteAllRoutes() {
        this._bestRoute = null;
        this._routes = new HashSet();
    }

    /**
     * @returns {boolean}
     */
    hasRoute() {
        return this._routes.length > 0;
    }

    /**
     * @returns {void}
     * @private
     */
    _updateBestRoute() {
        let bestRoute = null;
        // Choose the route with minimal distance and maximal timestamp.
        for (const route of this._routes.values()) {
            if (bestRoute === null || route.score > bestRoute.score
                || (route.score === bestRoute.score && route.timestamp > bestRoute.timestamp)) {

                bestRoute = route;
            }
        }
        this._bestRoute = bestRoute;
        if (this._bestRoute) {
            this.peerAddress.distance = this._bestRoute.distance;
        } else {
            this.peerAddress.distance = PeerAddresses.MAX_DISTANCE + 1;
        }
    }

    /**
     * @param {PeerAddressState|*} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof PeerAddressState
            && this.peerAddress.equals(o.peerAddress);
    }

    /**
     * @returns {string}
     */
    hashCode() {
        return this.peerAddress.hashCode();
    }

    /**
     * @returns {string}
     */
    toString() {
        return `PeerAddressState{peerAddress=${this.peerAddress}, state=${this.state}, `
            + `lastConnected=${this.lastConnected}, failedAttempts=${this.failedAttempts}, `
            + `bannedUntil=${this.bannedUntil}}`;
    }
}
PeerAddressState.NEW = 1;
PeerAddressState.CONNECTING = 2;
PeerAddressState.CONNECTED = 3;
PeerAddressState.TRIED = 4;
PeerAddressState.FAILED = 5;
PeerAddressState.BANNED = 6;
Class.register(PeerAddressState);

class SignalRoute {
    /**
     * @param {PeerChannel} signalChannel
     * @param {number} distance
     * @param {number} timestamp
     */
    constructor(signalChannel, distance, timestamp) {
        this.failedAttempts = 0;
        this.timestamp = timestamp;
        this._signalChannel = signalChannel;
        this._distance = distance;
    }

    /** @type {PeerChannel} */
    get signalChannel() {
        return this._signalChannel;
    }

    /** @type {number} */
    get distance() {
        return this._distance;
    }

    /** @type {number} */
    get score() {
        return ((PeerAddresses.MAX_DISTANCE - this._distance) / 2) * (1 - (this.failedAttempts / PeerAddresses.MAX_FAILED_ATTEMPTS_RTC));
    }

    /**
     * @param {SignalRoute} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof SignalRoute
            && this._signalChannel.equals(o._signalChannel);
    }

    /**
     * @returns {string}
     */
    hashCode() {
        return this._signalChannel.hashCode();
    }

    /**
     * @returns {string}
     */
    toString() {
        return `SignalRoute{signalChannel=${this._signalChannel}, distance=${this._distance}, timestamp=${this.timestamp}, failedAttempts=${this.failedAttempts}}`;
    }
}
Class.register(SignalRoute);

class Message {
    /**
     * Create a new Message instance. This is usually not called directly but by subclasses.
     * @param {Message.Type} type Message type
     */
    constructor(type) {
        if (!NumberUtils.isUint64(type)) throw 'Malformed type';
        /** @type {Message.Type} */
        this._type = type;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {Message.Type}
     */
    static peekType(buf) {
        // Store current read position.
        const pos = buf.readPos;

        // Set read position past the magic to the beginning of the type string.
        buf.readPos = 4;

        // Read the type string.
        const type = buf.readVarUint();

        // Reset the read position to original.
        buf.readPos = pos;

        return type;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {Message}
     */
    static unserialize(buf) {
        // XXX Direct buffer manipulation currently requires this.
        Assert.that(buf.readPos === 0, 'Message.unserialize() requires buf.readPos == 0');

        const magic = buf.readUint32();
        const type = buf.readVarUint();
        buf.readUint32(); // length is ignored
        const checksum = buf.readUint32();

        // Validate magic.
        if (magic !== Message.MAGIC) throw 'Malformed magic';

        // Validate checksum.
        Message._writeChecksum(type, buf, 0);
        const calculatedChecksum = CRC32.compute(buf);
        if (checksum !== calculatedChecksum) throw new Error('Invalid checksum');

        return new Message(type);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        // XXX Direct buffer manipulation currently requires this.
        Assert.that(buf.writePos === 0, 'Message.serialize() requires buf.writePos == 0');

        buf.writeUint32(Message.MAGIC);
        buf.writeVarUint(this._type);
        buf.writeUint32(this.serializedSize);
        buf.writeUint32(0); // written later by _setChecksum()

        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return /*magic*/ 4
            + /*type*/ SerialBuffer.varUintSize(this._type)
            + /*length*/ 4
            + /*checksum*/ 4;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {void}
     * @protected
     */
    _setChecksum(buf) {
        const checksum = CRC32.compute(buf);
        Message._writeChecksum(this._type, buf, checksum);
    }

    /**
     * @param {Message.Type} type
     * @param {SerialBuffer} buf
     * @param {number} value
     * @returns {void}
     * @private
     */
    static _writeChecksum(type, buf, value) {
        // Store current write position.
        const pos = buf.writePos;

        // Set write position past the magic, type, and length fields to the
        // beginning of the checksum value.
        buf.writePos = /*magic*/ 4
            + /*type*/ SerialBuffer.varUintSize(type)
            + /*length*/ 4;

        // Write the checksum value.
        buf.writeUint32(value);

        // Reset the write position to original.
        buf.writePos = pos;
    }

    /** @type {Message.Type} */
    get type() {
        return this._type;
    }
}
Message.MAGIC = 0x42042042;
/**
 * Enum for message types.
 * @enum {number}
 */
Message.Type = {
    VERSION:    0,
    INV:        1,
    GET_DATA:   2,
    GET_HEADER: 3,
    NOT_FOUND:  4,
    GET_BLOCKS: 5,
    BLOCK:      6,
    HEADER:     7,
    TX:         8,
    MEMPOOL:    9,
    REJECT:     10,

    ADDR:       20,
    GET_ADDR:   21,
    PING:       22,
    PONG:       23,

    SIGNAL:     30,

    GET_CHAIN_PROOF:            40,
    CHAIN_PROOF:                41,
    GET_ACCOUNTS_PROOF:         42,
    ACCOUNTS_PROOF:             43,
    GET_ACCOUNTS_TREE_CHUNK:    44,
    ACCOUNTS_TREE_CHUNK:        45,
    ACCOUNTS_REJECTED:          46
};
Class.register(Message);

class AddrMessage extends Message {
    /**
     * @param {Array.<PeerAddress>} addresses
     */
    constructor(addresses) {
        super(Message.Type.ADDR);
        if (!addresses || !NumberUtils.isUint16(addresses.length)
            || addresses.some(it => !(it instanceof PeerAddress))) throw 'Malformed addresses';
        this._addresses = addresses;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {AddrMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const addresses = [];
        for (let i = 0; i < count; ++i) {
            addresses.push(PeerAddress.unserialize(buf));
        }
        return new AddrMessage(addresses);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint16(this._addresses.length);
        for (const addr of this._addresses) {
            addr.serialize(buf);
        }
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        let size = super.serializedSize
            + /*count*/ 2;
        for (const addr of this._addresses) {
            size += addr.serializedSize;
        }
        return size;
    }

    /** @type {Array.<PeerAddress>} */
    get addresses() {
        return this._addresses;
    }
}
Class.register(AddrMessage);

class BlockMessage extends Message {
    /**
     * @param {Block} block
     */
    constructor(block) {
        super(Message.Type.BLOCK);
        // TODO Bitcoin block messages start with a block version
        /** @type {Block} */
        this._header = block;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {BlockMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const block = Block.unserialize(buf);
        return new BlockMessage(block);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._header.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + this._header.serializedSize;
    }

    /** @type {Block} */
    get block() {
        return this._header;
    }
}
Class.register(BlockMessage);

class GetAddrMessage extends Message {
    /**
     * @param {number} protocolMask
     * @param {number} serviceMask
     */
    constructor(protocolMask, serviceMask) {
        super(Message.Type.GET_ADDR);
        if (!NumberUtils.isUint8(protocolMask)) throw 'Malformed protocolMask';
        if (!NumberUtils.isUint32(serviceMask)) throw 'Malformed serviceMask';
        this._protocolMask = protocolMask;
        this._serviceMask = serviceMask;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {GetAddrMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const protocolMask = buf.readUint8();
        const serviceMask = buf.readUint32();
        return new GetAddrMessage(protocolMask, serviceMask);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint8(this._protocolMask);
        buf.writeUint32(this._serviceMask);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*protocolMask*/ 1
            + /*serviceMask*/ 4;
    }

    /** @type {number} */
    get protocolMask() {
        return this._protocolMask;
    }

    /** @type {number} */
    get serviceMask() {
        return this._serviceMask;
    }
}
Class.register(GetAddrMessage);

class GetBlocksMessage extends Message {
    /**
     * @param {Array.<Hash>} locators
     * @param {number} maxInvSize
     * @param {GetBlocksMessage.Direction} direction
     */
    constructor(locators, maxInvSize=BaseInventoryMessage.VECTORS_MAX_COUNT, direction=GetBlocksMessage.Direction.FORWARD) {
        super(Message.Type.GET_BLOCKS);
        if (!locators || !NumberUtils.isUint16(locators.length)
            || locators.some(it => !Hash.isHash(it))) throw 'Malformed locators';
        if (!NumberUtils.isUint16(maxInvSize)) throw 'Malformed maxInvSize';
        if (!NumberUtils.isUint8(direction)) throw 'Malformed direction';
        /** @type {Array.<Hash>} */
        this._locators = locators;
        this._maxInvSize = maxInvSize;
        this._direction = direction;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {GetBlocksMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const locators = [];
        for (let i = 0; i < count; i++) {
            locators.push(Hash.unserialize(buf));
        }
        const maxInvSize = buf.readUint16();
        const direction = buf.readUint8();
        return new GetBlocksMessage(locators, maxInvSize, direction);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint16(this._locators.length);
        for (const locator of this._locators) {
            locator.serialize(buf);
        }
        buf.writeUint16(this._maxInvSize);
        buf.writeUint8(this._direction);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        let size = super.serializedSize
            + /*count*/ 2
            + /*direction*/ 1
            + /*maxInvSize*/ 2;
        for (const locator of this._locators) {
            size += locator.serializedSize;
        }
        return size;
    }

    /** @type {Array.<Hash>} */
    get locators() {
        return this._locators;
    }

    /** @type {GetBlocksMessage.Direction} */
    get direction() {
        return this._direction;
    }

    /** @type {number} */
    get maxInvSize() {
        return this._maxInvSize;
    }
}
/**
 * @enum {number}
 */
GetBlocksMessage.Direction = {
    FORWARD: 0x1,
    BACKWARD: 0x2
};
Class.register(GetBlocksMessage);

class HeaderMessage extends Message {
    /**
     * @param {BlockHeader} header
     */
    constructor(header) {
        super(Message.Type.HEADER);
        /** @type {BlockHeader} */
        this._header = header;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {HeaderMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const header = BlockHeader.unserialize(buf);
        return new HeaderMessage(header);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @return {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._header.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + this._header.serializedSize;
    }

    /** @type {BlockHeader} */
    get header() {
        return this._header;
    }
}
Class.register(HeaderMessage);

class InvVector {
    /**
     * @param {Block} block
     * @returns {Promise.<InvVector>}
     */
    static async fromBlock(block) {
        const hash = await block.hash();
        return new InvVector(InvVector.Type.BLOCK, hash);
    }

    /**
     * @param {BlockHeader} header
     * @returns {Promise.<InvVector>}
     */
    static async fromHeader(header) {
        const hash = await header.hash();
        return new InvVector(InvVector.Type.BLOCK, hash);
    }

    /**
     * @param {Transaction} tx
     * @returns {Promise.<InvVector>}
     */
    static async fromTransaction(tx) {
        const hash = await tx.hash();
        return new InvVector(InvVector.Type.TRANSACTION, hash);
    }

    /**
     * @param {InvVector.Type} type
     * @param {Hash} hash
     */
    constructor(type, hash) {
        // TODO validate type
        if (!Hash.isHash(hash)) throw 'Malformed hash';
        /** @type {InvVector.Type} */
        this._type = type;
        /** @type {Hash} */
        this._hash = hash;
    }

    /**
     * @param {SerialBuffer} buf
     * @return {InvVector}
     */
    static unserialize(buf) {
        const type = InvVector.Type.unserialize(buf);
        const hash = Hash.unserialize(buf);
        return new InvVector(type, hash);
    }

    /**
     * @param {?SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint32(this._type);
        this._hash.serialize(buf);
        return buf;
    }

    /**
     * @param {InvVector} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof InvVector
            && this._type === o.type
            && this._hash.equals(o.hash);
    }

    hashCode() {
        return `${this._type}|${this._hash}`;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `InvVector{type=${this._type}, hash=${this._hash}}`;
    }

    /** @type {number} */
    get serializedSize() {
        return /*invType*/ 4
            + this._hash.serializedSize;
    }

    /** @type {InvVector.Type} */
    get type() {
        return this._type;
    }

    /** @type {Hash} */
    get hash() {
        return this._hash;
    }
}
/**
 * @enum {number}
 */
InvVector.Type = {
    ERROR: 0,
    TRANSACTION: 1,
    BLOCK: 2,

    /**
     * @param {SerialBuffer} buf
     * @returns {InvVector.Type}
     */
    unserialize: function (buf) {
        return /** @type {InvVector.Type} */ (buf.readUint32());
    }
};
Class.register(InvVector);

class BaseInventoryMessage extends Message {
    /**
     * @param {Message.Type} type
     * @param {Array.<InvVector>} vectors
     */
    constructor(type, vectors) {
        super(type);
        if (!vectors || !NumberUtils.isUint16(vectors.length)
            || vectors.some(it => !(it instanceof InvVector))
            || vectors.length > BaseInventoryMessage.VECTORS_MAX_COUNT) throw 'Malformed vectors';
        /** @type {Array.<InvVector>} */
        this._vectors = vectors;
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint16(this._vectors.length);
        for (const vector of this._vectors) {
            vector.serialize(buf);
        }
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        let size = super.serializedSize
            + /*count*/ 2;
        for (const vector of this._vectors) {
            size += vector.serializedSize;
        }
        return size;
    }

    /** @type {Array.<InvVector>} */
    get vectors() {
        return this._vectors;
    }
}
BaseInventoryMessage.VECTORS_MAX_COUNT = 1000;
Class.register(BaseInventoryMessage);

class InvMessage extends BaseInventoryMessage {
    /**
     * @param {Array.<InvVector>} vectors
     */
    constructor(vectors) {
        super(Message.Type.INV, vectors);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {InvMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const vectors = [];
        for (let i = 0; i < count; ++i) {
            vectors.push(InvVector.unserialize(buf));
        }
        return new InvMessage(vectors);
    }
}
Class.register(InvMessage);

class GetDataMessage extends BaseInventoryMessage {
    /**
     * @param {Array.<InvVector>} vectors
     */
    constructor(vectors) {
        super(Message.Type.GET_DATA, vectors);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {GetDataMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const vectors = [];
        for (let i = 0; i < count; ++i) {
            vectors.push(InvVector.unserialize(buf));
        }
        return new GetDataMessage(vectors);
    }
}
Class.register(GetDataMessage);

class GetHeaderMessage extends BaseInventoryMessage {
    /**
     * @param {Array.<InvVector>} vectors
     */
    constructor(vectors) {
        super(Message.Type.GET_HEADER, vectors);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {GetHeaderMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const vectors = [];
        for (let i = 0; i < count; ++i) {
            vectors.push(InvVector.unserialize(buf));
        }
        return new GetHeaderMessage(vectors);
    }
}
Class.register(GetHeaderMessage);

class NotFoundMessage extends BaseInventoryMessage {
    /**
     * @param {Array.<InvVector>} vectors
     */
    constructor(vectors) {
        super(Message.Type.NOT_FOUND, vectors);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {NotFoundMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const vectors = [];
        for (let i = 0; i < count; ++i) {
            vectors.push(InvVector.unserialize(buf));
        }
        return new NotFoundMessage(vectors);
    }
}
Class.register(NotFoundMessage);

class MempoolMessage extends Message {
    constructor() {
        super(Message.Type.MEMPOOL);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {MempoolMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        return new MempoolMessage();
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize;
    }
}
Class.register(MempoolMessage);

class PingMessage extends Message {
    /**
     * @param {number} nonce
     */
    constructor(nonce) {
        super(Message.Type.PING);
        /** @type {number} */
        this._nonce = nonce;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {PingMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const nonce = buf.readUint32();
        return new PingMessage(nonce);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint32(this._nonce);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*nonce*/ 4;
    }

    /** @type {number} */
    get nonce() {
        return this._nonce;
    }
}
Class.register(PingMessage);

class PongMessage extends Message {
    /**
     * @param {number} nonce
     */
    constructor(nonce) {
        super(Message.Type.PONG);
        this._nonce = nonce;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {PongMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const nonce = buf.readUint32();
        return new PongMessage(nonce);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint32(this._nonce);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*nonce*/ 4;
    }

    /** @type {number} */
    get nonce() {
        return this._nonce;
    }
}
Class.register(PongMessage);

class RejectMessage extends Message {
    /**
     * @param {Message.Type} messageType
     * @param {RejectMessage.Code} code
     * @param {string} reason
     * @param {Uint8Array} extraData
     */
    constructor(messageType, code, reason, extraData) {
        super(Message.Type.REJECT);
        if (StringUtils.isMultibyte(messageType) || messageType.length > 12) throw 'Malformed type';
        if (!NumberUtils.isUint8(code)) throw 'Malformed code';
        if (StringUtils.isMultibyte(reason) || reason.length > 255) throw 'Malformed reason';
        if (!extraData || !(extraData instanceof Uint8Array) || !NumberUtils.isUint16(extraData.byteLength)) throw 'Malformed extraData';

        /** @type {Message.Type} */
        this._messageType = messageType;
        /** @type {RejectMessage.Code} */
        this._code = code;
        /** @type {string} */
        this._reason = reason;
        /** @type {Uint8Array} */
        this._extraData = extraData;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {RejectMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const messageType = Message.Type.readVarString(buf);
        const code = RejectMessage.Code.read(buf);
        const reason = buf.readVarLengthString();
        const length = buf.readUint16();
        const extraData = buf.read(length);
        return new RejectMessage(messageType, code, reason, extraData);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeVarLengthString(this._messageType);
        buf.writeUint8(this._code);
        buf.writeVarLengthString(this._reason);
        buf.writeUint16(this._extraData.byteLength);
        buf.write(this._extraData);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*messageType VarLengthString extra byte*/ 1
            + this._messageType.length
            + /*code*/ 1
            + /*reason VarLengthString extra byte*/ 1
            + this._reason.length
            + /*extraDataLength*/ 2
            + this._extraData.byteLength;
    }

    /** @type {Message.Type} */
    get messageType() {
        return this._messageType;
    }

    /** @type {RejectMessage.Code} */
    get code() {
        return this._code;
    }

    /** @type {string} */
    get reason() {
        return this._reason;
    }

    /** @type {Uint8Array} */
    get extraData() {
        return this._extraData;
    }
}
/**
 * @enum {number}
 */
RejectMessage.Code = {
    DUPLICATE: 0x12,

    /**
     * @param {SerialBuffer} buf
     * @returns {RejectMessage.Code}
     */
    read: function (buf) {
        return /** @type {RejectMessage.Code} */ (buf.readUint8());
    }
};
Class.register(RejectMessage);

class SignalMessage extends Message {
    /**
     * @param {string} senderId
     * @param {string} recipientId
     * @param {number} nonce
     * @param {number} ttl
     * @param {SignalMessage.Flags|number} flags
     * @param {Uint8Array} payload
     */
    constructor(senderId, recipientId, nonce, ttl, flags = 0, payload = new Uint8Array(0)) {
        super(Message.Type.SIGNAL);
        if (!senderId || !RtcPeerAddress.isSignalId(senderId)) throw 'Malformed senderId';
        if (!recipientId || !RtcPeerAddress.isSignalId(recipientId)) throw 'Malformed recipientId';
        if (!NumberUtils.isUint32(nonce)) throw 'Malformed nonce';
        if (!NumberUtils.isUint8(ttl)) throw 'Malformed ttl';
        if (!NumberUtils.isUint8(flags)) throw 'Malformed flags';
        if (!payload || !(payload instanceof Uint8Array) || !NumberUtils.isUint16(payload.byteLength)) throw 'Malformed payload';
        this._senderId = senderId;
        this._recipientId = recipientId;
        this._nonce = nonce;
        this._ttl = ttl;
        this._flags = flags;
        this._payload = payload;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {SignalMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const senderId = buf.readString(32);
        const recipientId = buf.readString(32);
        const nonce = buf.readUint32();
        const ttl = buf.readUint8();
        const flags = buf.readUint8();
        const length = buf.readUint16();
        const payload = buf.read(length);
        return new SignalMessage(senderId, recipientId, nonce, ttl, flags, payload);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeString(this._senderId, 32);
        buf.writeString(this._recipientId, 32);
        buf.writeUint32(this._nonce);
        buf.writeUint8(this._ttl);
        buf.writeUint8(this._flags);
        buf.writeUint16(this._payload.byteLength);
        buf.write(this._payload);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*senderId*/ 32
            + /*recipientId*/ 32
            + /*nonce*/ 4
            + /*ttl*/ 1
            + /*flags*/ 1
            + /*payloadLength*/ 2
            + this._payload.byteLength;
    }

    /** @type {string} */
    get senderId() {
        return this._senderId;
    }

    /** @type {string} */
    get recipientId() {
        return this._recipientId;
    }

    /** @type {number} */
    get nonce() {
        return this._nonce;
    }

    /** @type {number} */
    get ttl() {
        return this._ttl;
    }

    /** @type {SignalMessage.Flags|number} */
    get flags() {
        return this._flags;
    }

    /** @type {Uint8Array} */
    get payload() {
        return this._payload;
    }

    /**
     * @returns {boolean}
     */
    isUnroutable() {
        return (this._flags & SignalMessage.Flags.UNROUTABLE) !== 0;
    }

    /**
     * @returns {boolean}
     */
    isTtlExceeded() {
        return (this._flags & SignalMessage.Flags.TTL_EXCEEDED) !== 0;
    }
}
/**
 * @enum {number}
 */
SignalMessage.Flags = {
    UNROUTABLE: 0x1,
    TTL_EXCEEDED: 0x2
};
Class.register(SignalMessage);

class TxMessage extends Message {
    /**
     * @param {Transaction} transaction
     * @param {?AccountsProof} [accountsProof]
     */
    constructor(transaction, accountsProof) {
        super(Message.Type.TX);
        /** @type {Transaction} */
        this._transaction = transaction;
        /** @type {AccountsProof} */
        this._accountsProof = accountsProof;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {TxMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const transaction = Transaction.unserialize(buf);
        const hasAccountsProof = buf.readUint8();
        if (hasAccountsProof === 1) {
            const accountsProof = AccountsProof.unserialize(buf);
            return new TxMessage(transaction, accountsProof);
        }
        return new TxMessage(transaction);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._transaction.serialize(buf);
        buf.writeUint8(this._accountsProof ? 1 : 0);
        if (this._accountsProof) {
            this._accountsProof.serialize(buf);
        }
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        let size = super.serializedSize
            + this._transaction.serializedSize
            + /*hasAccountsProof*/ 1;
        if (this._accountsProof) {
            size += this._accountsProof.serializedSize;
        }
        return size;
    }

    /** @type {Transaction} */
    get transaction() {
        return this._transaction;
    }

    /** @type {boolean} */
    get hasAccountsProof() {
        return !!this._accountsProof;
    }

    /** @type {AccountsProof} */
    get accountsProof() {
        return this._accountsProof;
    }
}
Class.register(TxMessage);

class VersionMessage extends Message {
    /**
     * @param {number} version
     * @param {PeerAddress} peerAddress
     * @param {Hash} genesisHash
     * @param {Hash} headHash
     */
    constructor(version, peerAddress, genesisHash, headHash) {
        super(Message.Type.VERSION);
        if (!NumberUtils.isUint32(version)) throw 'Malformed version';
        if (!peerAddress || !(peerAddress instanceof PeerAddress)) throw 'Malformed peerAddress';
        if (!Hash.isHash(genesisHash)) throw 'Malformed genesisHash';
        if (!Hash.isHash(headHash)) throw 'Malformed headHash';

        /** @type {number} */
        this._version = version;
        /** @type {PeerAddress} */
        this._peerAddress = peerAddress;
        /** @type {Hash} */
        this._genesisHash = genesisHash;
        /** @type {Hash} */
        this._headHash = headHash;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {VersionMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const version = buf.readUint32();
        const peerAddress = PeerAddress.unserialize(buf);
        const genesisHash = Hash.unserialize(buf);
        const headHash = Hash.unserialize(buf);
        return new VersionMessage(version, peerAddress, genesisHash, headHash);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint32(this._version);
        this._peerAddress.serialize(buf);
        this._genesisHash.serialize(buf);
        this._headHash.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + /*version*/ 4
            + this._peerAddress.serializedSize
            + this._genesisHash.serializedSize
            + this._headHash.serializedSize;
    }

    /** @type {number} */
    get version() {
        return this._version;
    }

    /** @type {PeerAddress} */
    get peerAddress() {
        return this._peerAddress;
    }

    /** @type {Hash} */
    get genesisHash() {
        return this._genesisHash;
    }

    /** @type {Hash} */
    get headHash() {
        return this._headHash;
    }
}
Class.register(VersionMessage);

class AccountsProofMessage extends Message {
    /**
     * @param {Hash} blockHash
     * @param {AccountsProof} accountsProof
     */
    constructor(blockHash, accountsProof) {
        super(Message.Type.ACCOUNTS_PROOF);
        if (!(blockHash instanceof Hash)) throw 'Malformed blockHash';
        if (!(accountsProof instanceof AccountsProof)) throw 'Malformed proof';
        /** @type {Hash} */
        this._blockHash = blockHash;
        /** @type {AccountsProof} */
        this._accountsProof = accountsProof;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {AccountsProofMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const blockHash = Hash.unserialize(buf);
        const accountsProof = AccountsProof.unserialize(buf);
        return new AccountsProofMessage(blockHash, accountsProof);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._blockHash.serialize(buf);
        this._accountsProof.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + this._blockHash.serializedSize
            + this._accountsProof.serializedSize;
    }

    /** @type {Hash} */
    get blockHash() {
        return this._blockHash;
    }

    /** @type {AccountsProof} */
    get proof() {
        return this._accountsProof;
    }
}
Class.register(AccountsProofMessage);

class GetAccountsProofMessage extends Message {
    /**
     * @param {Hash} blockHash
     * @param {Array.<Address>} addresses
     */
    constructor(blockHash, addresses) {
        super(Message.Type.GET_ACCOUNTS_PROOF);
        if (!blockHash || !(blockHash instanceof Hash)) throw 'Malformed block hash';
        if (!addresses || !NumberUtils.isUint16(addresses.length)
            || addresses.some(it => !(it instanceof Address))) throw 'Malformed addresses';
        this._blockHash = blockHash;
        /** @type {Array.<Address>} */
        this._addresses = addresses;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {GetAccountsProofMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const blockHash = Hash.unserialize(buf);
        const count = buf.readUint16();
        const addresses = [];
        for (let i = 0; i < count; i++) {
            addresses.push(Address.unserialize(buf));
        }
        return new GetAccountsProofMessage(blockHash, addresses);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._blockHash.serialize(buf);
        buf.writeUint16(this._addresses.length);
        for (const address of this._addresses) {
            address.serialize(buf);
        }
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + this._blockHash.serializedSize
            + /*count*/ 2
            + this._addresses.reduce((sum, address) => sum + address.serializedSize, 0);
    }

    /** @type {Array.<Address>} */
    get addresses() {
        return this._addresses;
    }

    /** @type {Hash} */
    get blockHash() {
        return this._blockHash;
    }
}
Class.register(GetAccountsProofMessage);

class ChainProofMessage extends Message {
    /**
     * @param {ChainProof} proof
     */
    constructor(proof) {
        super(Message.Type.CHAIN_PROOF);
        if (!(proof instanceof ChainProof)) throw 'Malformed chainProof';

        /** @type {ChainProof} */
        this._proof = proof;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {ChainProofMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const proof = ChainProof.unserialize(buf);
        return new ChainProofMessage(proof);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._proof.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + this._proof.serializedSize;
    }

    /** @type {ChainProof} */
    get proof() {
        return this._proof;
    }
}
Class.register(ChainProofMessage);

class GetChainProofMessage extends Message {
    constructor() {
        super(Message.Type.GET_CHAIN_PROOF);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {GetChainProofMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        return new GetChainProofMessage();
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize;
    }
}
Class.register(GetChainProofMessage);

class AccountsTreeChunkMessage extends Message {
    /**
     * @param {Hash} blockHash
     * @param {AccountsTreeChunk} accountsTreeChunk
     */
    constructor(blockHash, accountsTreeChunk) {
        super(Message.Type.ACCOUNTS_TREE_CHUNK);
        if (!(blockHash instanceof Hash)) throw 'Malformed blockHash';
        if (!(accountsTreeChunk instanceof AccountsTreeChunk)) throw 'Malformed chunk';
        /** @type {Hash} */
        this._blockHash = blockHash;
        /** @type {AccountsTreeChunk} */
        this._accountsTreeChunk = accountsTreeChunk;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {AccountsTreeChunkMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const blockHash = Hash.unserialize(buf);
        const accountsTreeChunk = AccountsTreeChunk.unserialize(buf);
        return new AccountsTreeChunkMessage(blockHash, accountsTreeChunk);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._blockHash.serialize(buf);
        this._accountsTreeChunk.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + this._blockHash.serializedSize
            + this._accountsTreeChunk.serializedSize;
    }

    /** @type {Hash} */
    get blockHash() {
        return this._blockHash;
    }

    /** @type {AccountsTreeChunk} */
    get chunk() {
        return this._accountsTreeChunk;
    }
}
Class.register(AccountsTreeChunkMessage);

class GetAccountsTreeChunkMessage extends Message {
    /**
     * @param {Hash} blockHash
     * @param {string} startPrefix
     */
    constructor(blockHash, startPrefix) {
        super(Message.Type.GET_ACCOUNTS_TREE_CHUNK);
        if (!blockHash || !(blockHash instanceof Hash)) throw 'Malformed block hash';
        if (StringUtils.isMultibyte(startPrefix)
            || !NumberUtils.isUint8(startPrefix.length)) throw 'Malformed start prefix';
        /** @type {Hash} */
        this._blockHash = blockHash;
        this._startPrefix = startPrefix;
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {GetAccountsTreeChunkMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        const blockHash = Hash.unserialize(buf);
        const startPrefix = buf.readVarLengthString();
        return new GetAccountsTreeChunkMessage(blockHash, startPrefix);
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._blockHash.serialize(buf);
        buf.writeVarLengthString(this._startPrefix);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize
            + this._blockHash.serializedSize
            + /*length of prefix*/ 1
            + this._startPrefix.length;
    }

    /** @type {Hash} */
    get blockHash() {
        return this._blockHash;
    }

    /** @type {string} */
    get startPrefix() {
        return this._startPrefix;
    }
}
Class.register(GetAccountsTreeChunkMessage);

class AccountsRejectedMessage extends Message {
    constructor() {
        super(Message.Type.ACCOUNTS_REJECTED);
    }

    /**
     * @param {SerialBuffer} buf
     * @returns {AccountsTreeChunkMessage}
     */
    static unserialize(buf) {
        Message.unserialize(buf);
        return new AccountsRejectedMessage();
    }

    /**
     * @param {SerialBuffer} [buf]
     * @returns {SerialBuffer}
     */
    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    /** @type {number} */
    get serializedSize() {
        return super.serializedSize;
    }
}
Class.register(AccountsRejectedMessage);

class MessageFactory {
    static parse(buffer) {
        const buf = new SerialBuffer(buffer);
        const type = Message.peekType(buf);
        const clazz = MessageFactory.CLASSES[type];
        if (!clazz || !clazz.unserialize) throw `Invalid message type: ${type}`;
        return clazz.unserialize(buf);
    }
}
/**
 * @dict 
 * @type {object}
 */
MessageFactory.CLASSES = {};
MessageFactory.CLASSES[Message.Type.VERSION] = VersionMessage;
MessageFactory.CLASSES[Message.Type.INV] = InvMessage;
MessageFactory.CLASSES[Message.Type.GET_DATA] = GetDataMessage;
MessageFactory.CLASSES[Message.Type.GET_HEADER] = GetHeaderMessage;
MessageFactory.CLASSES[Message.Type.NOT_FOUND] = NotFoundMessage;
MessageFactory.CLASSES[Message.Type.BLOCK] = BlockMessage;
MessageFactory.CLASSES[Message.Type.HEADER] = HeaderMessage;
MessageFactory.CLASSES[Message.Type.TX] = TxMessage;
MessageFactory.CLASSES[Message.Type.GET_BLOCKS] = GetBlocksMessage;
MessageFactory.CLASSES[Message.Type.MEMPOOL] = MempoolMessage;
MessageFactory.CLASSES[Message.Type.REJECT] = RejectMessage;
MessageFactory.CLASSES[Message.Type.ADDR] = AddrMessage;
MessageFactory.CLASSES[Message.Type.GET_ADDR] = GetAddrMessage;
MessageFactory.CLASSES[Message.Type.PING] = PingMessage;
MessageFactory.CLASSES[Message.Type.PONG] = PongMessage;
MessageFactory.CLASSES[Message.Type.SIGNAL] = SignalMessage;
MessageFactory.CLASSES[Message.Type.GET_CHAIN_PROOF] = GetChainProofMessage;
MessageFactory.CLASSES[Message.Type.CHAIN_PROOF] = ChainProofMessage;
MessageFactory.CLASSES[Message.Type.GET_ACCOUNTS_PROOF] = GetAccountsProofMessage;
MessageFactory.CLASSES[Message.Type.ACCOUNTS_PROOF] = AccountsProofMessage;
MessageFactory.CLASSES[Message.Type.GET_ACCOUNTS_TREE_CHUNK] = GetAccountsTreeChunkMessage;
MessageFactory.CLASSES[Message.Type.ACCOUNTS_TREE_CHUNK] = AccountsTreeChunkMessage;
MessageFactory.CLASSES[Message.Type.ACCOUNTS_REJECTED] = AccountsRejectedMessage;
Class.register(MessageFactory);

class NetworkAgent extends Observable {
    /**
     * @param {IBlockchain} blockchain
     * @param {PeerAddresses} addresses
     * @param {PeerChannel} channel
     *
     * @listens PeerChannel#version
     * @listens PeerChannel#addr
     * @listens PeerChannel#getAddr
     * @listens PeerChannel#ping
     * @listens PeerChannel#pong
     * @listens PeerChannel#close
     */
    constructor(blockchain, addresses, channel) {
        super();
        /** @type {IBlockchain} */
        this._blockchain = blockchain;
        /** @type {PeerAddresses} */
        this._addresses = addresses;
        /** @type {PeerChannel} */
        this._channel = channel;

        /**
         * The peer object we create after the handshake completes.
         * @type {Peer}
         * @private
         */
        this._peer = null;

        /**
         * All peerAddresses that we think the remote peer knows.
         * @type {HashSet.<PeerAddress>}
         * @private
         */
        this._knownAddresses = new HashSet();

        /**
         * Helper object to keep track of timeouts & intervals.
         * @type {Timers}
         * @private
         */
        this._timers = new Timers();

        /**
         * True if we have received the peer's version message.
         * @type {boolean}
         * @private
         */
        this._versionReceived = false;

        /**
         * True if we have successfully sent our version message.
         * @type {boolean}
         * @private
         */
        this._versionSent = false;

        /**
         * Number of times we have tried to send out the version message.
         * @type {number}
         * @private
         */
        this._versionAttempts = 0;

        // Listen to network/control messages from the peer.
        channel.on('version', msg => this._onVersion(msg));
        channel.on('addr', msg => this._onAddr(msg));
        channel.on('get-addr', msg => this._onGetAddr(msg));
        channel.on('ping', msg => this._onPing(msg));
        channel.on('pong', msg => this._onPong(msg));

        // Clean up when the peer disconnects.
        channel.on('close', closedByRemote => this._onClose(closedByRemote));
    }

    /**
     * @param {Array.<PeerAddress|RtcPeerAddress>} addresses
     */
    relayAddresses(addresses) {
        // Don't relay if the handshake hasn't finished yet.
        if (!this._versionReceived || !this._versionSent) {
            return;
        }

        // Only relay addresses that the peer doesn't know yet. If the address
        // the peer knows is older than RELAY_THROTTLE, relay the address again.
        const filteredAddresses = addresses.filter(addr => {
            // Exclude RTC addresses that are already at MAX_DISTANCE.
            if (addr.protocol === Protocol.RTC && addr.distance >= PeerAddresses.MAX_DISTANCE) {
                return false;
            }

            // Exclude DumbPeerAddresses.
            if (addr.protocol === Protocol.DUMB) {
                return false;
            }

            const knownAddress = this._knownAddresses.get(addr);
            return !addr.isSeed() // Never relay seed addresses.
                && (!knownAddress || knownAddress.timestamp < Date.now() - NetworkAgent.RELAY_THROTTLE);
        });

        if (filteredAddresses.length) {
            this._channel.addr(filteredAddresses);

            // We assume that the peer knows these addresses now.
            for (const address of filteredAddresses) {
                this._knownAddresses.add(address);
            }
        }
    }


    /* Handshake */

    handshake() {
        // Kick off the handshake by telling the peer our version, network address & blockchain head hash.
        // Firefox sends the data-channel-open event too early, so sending the version message might fail.
        // Try again in this case.
        if (!this._channel.version(NetworkConfig.myPeerAddress(), this._blockchain.headHash)) {
            this._versionAttempts++;
            if (this._versionAttempts >= NetworkAgent.VERSION_ATTEMPTS_MAX) {
                this._channel.close('sending of version message failed');
                return;
            }

            setTimeout(this.handshake.bind(this), NetworkAgent.VERSION_RETRY_DELAY);
            return;
        }

        this._versionSent = true;

        // Drop the peer if it doesn't send us a version message.
        // Only do this if we haven't received the peer's version message already.
        if (!this._versionReceived) {
            // TODO Should we ban instead?
            this._timers.setTimeout('version', () => {
                this._timers.clearTimeout('version');
                this._channel.close('version timeout');
            }, NetworkAgent.HANDSHAKE_TIMEOUT);
        } else {
            // The peer has sent us his version message already.
            this._finishHandshake();
        }
    }

    /**
     * @param {VersionMessage} msg
     * @private
     */
    _onVersion(msg) {
        Log.d(NetworkAgent, `[VERSION] ${msg.peerAddress} ${msg.headHash.toBase64()}`);

        const now = Date.now();

        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Clear the version timeout.
        this._timers.clearTimeout('version');

        // Check if the peer is running a compatible version.
        if (!Version.isCompatible(msg.version)) {
            this._channel.close(`incompatible version (ours=${Version.CODE}, theirs=${msg.version})`);
            return;
        }

        // Check if the peer is working on the same genesis block.
        if (!Block.GENESIS.HASH.equals(msg.genesisHash)) {
            this._channel.close(`different genesis block (${msg.genesisHash})`);
            return;
        }

        // TODO check services?

        // Check that the given peerAddress matches the one we expect.
        // In case of inbound WebSocket connections, this is the first time we
        // see the remote peer's peerAddress.
        // TODO We should validate that the given peerAddress actually resolves
        // to the peer's netAddress!
        if (this._channel.peerAddress) {
            if (!this._channel.peerAddress.equals(msg.peerAddress)) {
                this._channel.close('unexpected peerAddress in version message');
                return;
            }
        }

        // The client might not send its netAddress. Set it from our address database if we have it.
        const peerAddress = msg.peerAddress;
        if (!peerAddress.netAddress) {
            /** @type {PeerAddress} */
            const storedAddress = this._addresses.get(peerAddress);
            if (storedAddress && storedAddress.netAddress) {
                peerAddress.netAddress = storedAddress.netAddress;
            }
        }
        this._channel.peerAddress = peerAddress;

        // Create peer object. Since the initial version message received from the
        // peer contains their local timestamp, we can use it to calculate their
        // offset to our local timestamp and store it for later (last argument).
        this._peer = new Peer(
            this._channel,
            msg.version,
            msg.headHash,
            peerAddress.timestamp - now
        );

        // Remember that the peer has sent us this address.
        this._knownAddresses.add(peerAddress);

        this._versionReceived = true;

        if (this._versionSent) {
            this._finishHandshake();
        }
    }

    _finishHandshake() {
        // Setup regular connectivity check.
        // TODO randomize interval?
        this._timers.setInterval('connectivity',
            () => this._checkConnectivity(),
            NetworkAgent.CONNECTIVITY_CHECK_INTERVAL);

        // Regularly announce our address.
        this._timers.setInterval('announce-addr',
            () => this._channel.addr([NetworkConfig.myPeerAddress()]),
            NetworkAgent.ANNOUNCE_ADDR_INTERVAL);

        // Tell listeners about the new peer that connected.
        this.fire('handshake', this._peer, this);

        // Request new network addresses from the peer.
        this._requestAddresses();
    }


    /* Addresses */

    _requestAddresses() {
        // Request addresses from peer.
        this._channel.getAddr(NetworkConfig.myProtocolMask(), Services.myServiceMask());

        // We don't use a timeout here. The peer will not respond with an addr message if
        // it doesn't have any new addresses.
    }

    /**
     * @param {AddrMessage} msg
     * @return {Promise}
     * @private
     */
    async _onAddr(msg) {
        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Reject messages that contain more than 1000 addresses, ban peer (bitcoin).
        if (msg.addresses.length > 1000) {
            Log.w(NetworkAgent, 'Rejecting addr message - too many addresses');
            this._channel.ban('addr message too large');
            return;
        }

        // Remember that the peer has sent us these addresses.
        for (const addr of msg.addresses) {
            this._knownAddresses.add(addr);
        }

        // Put the new addresses in the address pool.
        await this._addresses.add(this._channel, msg.addresses);

        // Tell listeners that we have received new addresses.
        this.fire('addr', msg.addresses, this);
    }

    /**
     * @param {GetAddrMessage} msg
     * @private
     */
    _onGetAddr(msg) {
        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Find addresses that match the given serviceMask.
        const addresses = this._addresses.query(msg.protocolMask, msg.serviceMask);

        const filteredAddresses = addresses.filter(addr => {
            // Exclude RTC addresses that are already at MAX_DISTANCE.
            if (addr.protocol === Protocol.RTC && addr.distance >= PeerAddresses.MAX_DISTANCE) {
                return false;
            }

            // Exclude known addresses from the response unless they are older than RELAY_THROTTLE.
            const knownAddress = this._knownAddresses.get(addr);
            return !knownAddress || knownAddress.timestamp < Date.now() - NetworkAgent.RELAY_THROTTLE;
        });

        // Send the addresses back to the peer.
        // If we don't have any new addresses, don't send the message at all.
        if (filteredAddresses.length) {
            this._channel.addr(filteredAddresses);
        }
    }


    /* Connectivity Check */

    _checkConnectivity() {
        // Generate random nonce.
        const nonce = NumberUtils.randomUint32();

        // Send ping message to peer.
        // If sending the ping message fails, assume the connection has died.
        if (!this._channel.ping(nonce)) {
            this._channel.close('sending ping message failed');
            return;
        }

        // Drop peer if it doesn't answer with a matching pong message within the timeout.
        this._timers.setTimeout(`ping_${nonce}`, () => {
            this._timers.clearTimeout(`ping_${nonce}`);
            this._channel.close('ping timeout');
        }, NetworkAgent.PING_TIMEOUT);
    }

    /**
     * @param {PingMessage} msg
     * @private
     */
    _onPing(msg) {
        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Respond with a pong message
        this._channel.pong(msg.nonce);
    }

    /**
     * @param {PongMessage} msg
     * @private
     */
    _onPong(msg) {
        // Clear the ping timeout for this nonce.
        this._timers.clearTimeout(`ping_${msg.nonce}`);
    }

    /**
     * @param {boolean} closedByRemote
     * @private
     */
    _onClose(closedByRemote) {
        // Clear all timers and intervals when the peer disconnects.
        this._timers.clearAll();

        // Tell listeners that the peer has disconnected.
        this.fire('close', this._peer, this._channel, closedByRemote, this);
    }

    /**
     * @param {Message} msg
     * @return {boolean}
     * @private
     */
    _canAcceptMessage(msg) {
        // The first message must be the version message.
        if (!this._versionReceived && msg.type !== Message.Type.VERSION) {
            Log.w(NetworkAgent, `Discarding ${msg.type} message from ${this._channel}`
                + ' - no version message received previously');
            return false;
        }
        return true;
    }

    /** @type {PeerChannel} */
    get channel() {
        return this._channel;
    }

    /** @type {Peer} */
    get peer() {
        return this._peer;
    }
}
NetworkAgent.HANDSHAKE_TIMEOUT = 1000 * 3; // 3 seconds
NetworkAgent.PING_TIMEOUT = 1000 * 10; // 10 seconds
NetworkAgent.CONNECTIVITY_CHECK_INTERVAL = 1000 * 60; // 1 minute
NetworkAgent.ANNOUNCE_ADDR_INTERVAL = 1000 * 60 * 10; // 10 minutes
NetworkAgent.RELAY_THROTTLE = 1000 * 60 * 5; // 5 minutes
NetworkAgent.VERSION_ATTEMPTS_MAX = 10;
NetworkAgent.VERSION_RETRY_DELAY = 500; // 500 ms
Class.register(NetworkAgent);

class Network extends Observable {
    /**
     * @type {number}
     * @constant
     */
    static get PEER_COUNT_MAX() {
        return PlatformUtils.isBrowser() ? 15 : 50000;
    }

    /**
     * @type {number}
     * @constant
     */
    static get PEER_COUNT_PER_IP_WS_MAX() {
        return PlatformUtils.isBrowser() ? 1 : 25;
    }

    /**
     * @type {number}
     * @constant
     */
    static get PEER_COUNT_PER_IP_RTC_MAX() {
        return 2;
    }

    /**
     * @param {IBlockchain} blockchain
     * @return {Promise.<Network>}
     */
    constructor(blockchain) {
        super();
        /** @type {IBlockchain} */
        this._blockchain = blockchain;
        return this._init();
    }

    /**
     * @listens PeerAddresses#added
     * @listens WebSocketConnector#connection
     * @listens WebSocketConnector#error
     * @listens WebRtcConnector#connection
     * @listens WebRtcConnector#error
     * @return {Promise.<Network>}
     * @private
     */
    async _init() {
        /**
         * Flag indicating whether we should actively connect to other peers
         * if our peer count is below PEER_COUNT_DESIRED.
         * @type {boolean}
         * @private
         */
        this._autoConnect = false;
        /**
         * Save the old state when going offline, to restore it when going online again.
         * @type {boolean}
         * @private
         */
        this._savedAutoConnect = false;

        /**
         * Number of ongoing outbound connection attempts.
         * @type {number}
         * @private
         */
        this._connectingCount = 0;

        /**
         * Map of agents indexed by connection ids.
         * @type {HashMap.<number,NetworkAgent>}
         * @private
         */
        this._agents = new HashMap();

        /**
         * Map from netAddress.host -> number of connections to this host.
         * @type {HashMap.<string,number>}
         * @private
         */
        this._connectionCounts = new HashMap();

        // Total bytes sent/received on past connections.
        /** @type {number} */
        this._bytesSent = 0;
        /** @type {number} */
        this._bytesReceived = 0;

        /** @type {WebSocketConnector} */
        this._wsConnector = new WebSocketConnector();
        this._wsConnector.on('connection', conn => this._onConnection(conn));
        this._wsConnector.on('error', peerAddr => this._onError(peerAddr));

        /** @type {WebRtcConnector} */
        this._rtcConnector = await new WebRtcConnector();
        this._rtcConnector.on('connection', conn => this._onConnection(conn));
        this._rtcConnector.on('error', (peerAddr, reason) => this._onError(peerAddr, reason));

        /**
         * Helper objects to manage PeerAddresses.
         * Must be initialized AFTER the WebSocket/WebRtcConnector.
         * @type {PeerAddresses}
         * @private
         */
        this._addresses = new PeerAddresses();

        // Relay new addresses to peers.
        this._addresses.on('added', addresses => {
            this._relayAddresses(addresses);
            this._checkPeerCount();
        });

        // If in browser, add event listener for online/offline detection.
        if (PlatformUtils.isBrowser()) {
            window.addEventListener('online', () => this._onOnline());
            window.addEventListener('offline', () => this._onOffline());
        }

        /** @type {SignalStore} */
        this._forwards = new SignalStore();

        /** @type {number} */
        this._timeOffset = 0;

        return this;
    }

    connect() {
        this._autoConnect = true;
        this._savedAutoConnect = true;

        // Start connecting to peers.
        this._checkPeerCount();
    }

    /**
     * @param {string|*} reason
     */
    disconnect(reason) {
        this._autoConnect = false;
        this._savedAutoConnect = false;

        // Close all active connections.
        for (const agent of this._agents.values()) {
            agent.channel.close(reason || 'manual network disconnect');
        }
    }

    /**
     * @return {boolean}
     */
    isOnline() {
        // If in doubt, return true.
        return (!PlatformUtils.isBrowser() || !('onLine' in window.navigator)) || window.navigator.onLine;
    }

    /**
     * @return {number}
     */
    getTime() {
        return Date.now() + this._timeOffset;
    }

    _onOnline() {
        this._autoConnect = this._savedAutoConnect;

        if (this._autoConnect) {
            this._checkPeerCount();
        }
    }

    _onOffline() {
        this._savedAutoConnect = this._autoConnect;
        this.disconnect('network disconnect');
    }

    // XXX For testing
    disconnectWebSocket() {
        this._autoConnect = false;

        // Close all websocket connections.
        for (const agent of this._agents.values()) {
            if (agent.peer.peerAddress.protocol === Protocol.WS) {
                agent.channel.close('manual websocket disconnect');
            }
        }
    }

    /**
     * @param {Array.<PeerAddress>} addresses
     * @returns {void}
     * @private
     */
    _relayAddresses(addresses) {
        // Pick PEER_COUNT_RELAY random peers and relay addresses to them if:
        // - number of addresses <= 10
        // TODO more restrictions, see Bitcoin
        if (addresses.length > 10) {
            return;
        }

        // XXX We don't protect against picking the same peer more than once.
        // The NetworkAgent will take care of not sending the addresses twice.
        // In that case, the address will simply be relayed to less peers. Also,
        // the peer that we pick might already know the address.
        const agents = this._agents.values();
        for (let i = 0; i < Network.PEER_COUNT_RELAY; ++i) {
            const agent = ArrayUtils.randomElement(agents);
            if (agent) {
                agent.relayAddresses(addresses);
            }
        }
    }

    _checkPeerCount() {
        if (this._autoConnect // && this.isOnline() Do we need this? Not really if _onOnline/_onOffline is working.
            && this.peerCount + this._connectingCount < Network.PEER_COUNT_DESIRED
            && this._connectingCount < Network.CONNECTING_COUNT_MAX) {

            // Pick a peer address that we are not connected to yet.
            const peerAddress = this._addresses.pickAddress();

            // We can't connect if we don't know any more addresses.
            if (!peerAddress) {
                return;
            }

            // Connect to this address.
            this._connect(peerAddress);
        }
    }

    /**
     * @param {PeerAddress} peerAddress
     * @returns {void}
     * @private
     */
    _connect(peerAddress) {
        switch (peerAddress.protocol) {
            case Protocol.WS:
                Log.d(Network, `Connecting to ${peerAddress} ...`);
                if (this._wsConnector.connect(peerAddress)) {
                    this._addresses.connecting(peerAddress);
                    this._connectingCount++;
                }
                break;

            case Protocol.RTC: {
                const signalChannel = this._addresses.getChannelBySignalId(peerAddress.signalId);
                Log.d(Network, `Connecting to ${peerAddress} via ${signalChannel.peerAddress}...`);
                if (this._rtcConnector.connect(peerAddress, signalChannel)) {
                    this._addresses.connecting(peerAddress);
                    this._connectingCount++;
                }
                break;
            }

            default:
                Log.e(Network, `Cannot connect to ${peerAddress} - unsupported protocol`);
                this._onError(peerAddress);
        }
    }

    /**
     * @listens PeerChannel#signal
     * @listens PeerChannel#ban
     * @listens NetworkAgent#handshake
     * @listens NetworkAgent#close
     * @param {PeerConnection} conn
     * @returns {void}
     * @private
     */
    _onConnection(conn) {
        // Decrement connectingCount if we have initiated this connection.
        if (conn.outbound && this._addresses.isConnecting(conn.peerAddress)) {
            this._connectingCount--;
        }

        // If the connector was able to determine the peer's netAddress,
        // enforce the max connections per IP limit here.
        if (conn.netAddress && !this._incrementConnectionCount(conn)) {
            return;
        }

        // Reject connection if we are already connected to this peer address.
        // This can happen if the peer connects (inbound) while we are
        // initiating a (outbound) connection to it.
        if (conn.outbound && this._addresses.isConnected(conn.peerAddress)) {
            conn.close('duplicate connection (outbound, pre handshake)');
            return;
        }

        // Reject peer if we have reached max peer count.
        if (this.peerCount >= Network.PEER_COUNT_MAX) {
            conn.close(`max peer count reached (${Network.PEER_COUNT_MAX})`);
            return;
        }

        // Connection accepted.
        const connType = conn.inbound ? 'inbound' : 'outbound';
        Log.d(Network, `Connection established (${connType}) #${conn.id} ${conn.netAddress || conn.peerAddress || '<pending>'}`);

        // Create peer channel.
        const channel = new PeerChannel(conn);
        channel.on('signal', msg => this._onSignal(channel, msg));
        channel.on('ban', reason => this._onBan(channel, reason));

        // Create network agent.
        const agent = new NetworkAgent(this._blockchain, this._addresses, channel);
        agent.on('handshake', peer => this._onHandshake(peer, agent));
        agent.on('close', (peer, channel, closedByRemote) => this._onClose(peer, channel, closedByRemote));

        // Store the agent.
        this._agents.put(conn.id, agent);

        // Initiate handshake with the peer.
        agent.handshake();

        // Call _checkPeerCount() here in case the peer doesn't send us any (new)
        // addresses to keep on connecting.
        // Add a delay before calling it to allow RTC peer addresses to be sent to us.
        setTimeout(() => this._checkPeerCount(), Network.ADDRESS_UPDATE_DELAY);
    }


    /**
     * Handshake with this peer was successful.
     * @fires Network#peer-joined
     * @fires Network#peers-changed
     * @param {Peer} peer
     * @param {NetworkAgent} agent
     * @returns {void}
     * @private
     */
    _onHandshake(peer, agent) {
        // If the connector was able the determine the peer's netAddress, update the peer's advertised netAddress.
        if (peer.channel.netAddress) {
            // TODO What to do if it doesn't match the currently advertised one?
            if (peer.peerAddress.netAddress && !peer.peerAddress.netAddress.equals(peer.channel.netAddress)) {
                Log.w(Network, `Got different netAddress ${peer.channel.netAddress} for peer ${peer.peerAddress} `
                    + `- advertised was ${peer.peerAddress.netAddress}`);
            }

            // Only set the advertised netAddress if we have the public IP of the peer.
            // WebRTC connectors might return local IP addresses for peers on the same LAN.
            if (!peer.channel.netAddress.isPrivate()) {
                peer.peerAddress.netAddress = peer.channel.netAddress;
            }
        }
        // Otherwise, use the netAddress advertised for this peer if available.
        else if (peer.channel.peerAddress.netAddress) {
            peer.channel.netAddress = peer.channel.peerAddress.netAddress;

            // Enforce the max connection limit per IP here.
            if (!this._incrementConnectionCount(peer.channel.connection)) {
                return;
            }
        }
        // Otherwise, we don't know the netAddress of this peer. Use a pseudo netAddress.
        else {
            peer.channel.netAddress = NetAddress.UNKNOWN;
        }

        // Close connection if we are already connected to this peer.
        if (this._addresses.isConnected(peer.peerAddress)) {
            agent.channel.close('duplicate connection (post handshake)');
            return;
        }

        // Close connection if this peer is banned.
        if (this._addresses.isBanned(peer.peerAddress)) {
            agent.channel.close('peer is banned');
            return;
        }

        // Recalculate the network adjusted offset
        this._updateTimeOffset();

        // Mark the peer's address as connected.
        this._addresses.connected(agent.channel, peer.peerAddress);

        // Tell others about the address that we just connected to.
        this._relayAddresses([peer.peerAddress]);

        // Let listeners know about this peer.
        this.fire('peer-joined', peer);

        // Let listeners know that the peers changed.
        this.fire('peers-changed');

        Log.d(Network, `[PEER-JOINED] ${peer.peerAddress} ${peer.netAddress} (version=${peer.version}, services=${peer.peerAddress.services}, headHash=${peer.headHash.toBase64()})`);
    }

    /**
     * Connection to this peer address failed.
     * @param {PeerAddress} peerAddress
     * @param {string|*} [reason]
     * @returns {void}
     * @private
     */
    _onError(peerAddress, reason) {
        Log.w(Network, `Connection to ${peerAddress} failed` + (reason ? ` - ${reason}` : ''));

        if (this._addresses.isConnecting(peerAddress)) {
            this._connectingCount--;
        }

        this._addresses.unreachable(peerAddress);

        this._checkPeerCount();
    }

    /**
     * This peer channel was closed.
     * @fires Network#peer-left
     * @fires Network#peers-changed
     * @param {Peer} peer
     * @param {PeerChannel} channel
     * @param {boolean} closedByRemote
     * @returns {void}
     * @private
     */
    _onClose(peer, channel, closedByRemote) {
        // Delete agent.
        this._agents.remove(channel.id);

        // Decrement connection count per IP if we already know the peer's netAddress.
        if (channel.netAddress && !channel.netAddress.isPseudo()) {
            this._decrementConnectionCount(channel.netAddress);
        }

        // Update total bytes sent/received.
        this._bytesSent += channel.connection.bytesSent;
        this._bytesReceived += channel.connection.bytesReceived;

        // peerAddress is undefined for incoming connections pre-handshake.
        if (channel.peerAddress) {
            // Check if the handshake with this peer has completed.
            if (this._addresses.isConnected(channel.peerAddress)) {
                // Mark peer as disconnected.
                this._addresses.disconnected(channel, closedByRemote);

                // Tell listeners that this peer has gone away.
                this.fire('peer-left', peer);

                // Let listeners know that the peers changed.
                this.fire('peers-changed');

                const kbTransferred = ((channel.connection.bytesSent
                    + channel.connection.bytesReceived) / 1000).toFixed(2);
                Log.d(Network, `[PEER-LEFT] ${peer.peerAddress} ${peer.netAddress} `
                    + `(version=${peer.version}, headHash=${peer.headHash.toBase64()}, `
                    + `transferred=${kbTransferred} kB)`);
            } else {
                // Treat connections closed pre-handshake as failed attempts.
                Log.w(Network, `Connection to ${channel.peerAddress} closed pre-handshake (by ${closedByRemote ? 'remote' : 'us'})`);
                this._addresses.unreachable(channel.peerAddress);
            }
        }

        // Recalculate the network adjusted offset
        this._updateTimeOffset();

        this._checkPeerCount();
    }

    /**
     * This peer channel was banned.
     * @param {PeerChannel} channel
     * @param {string|*} [reason]
     * @returns {void}
     * @private
     */
    _onBan(channel, reason) {
        // TODO If this is an inbound connection, the peerAddres might not be set yet.
        // Ban the netAddress in this case.
        // XXX We should probably always ban the netAddress as well.
        if (channel.peerAddress) {
            this._addresses.ban(channel.peerAddress);
        } else {
            // TODO ban netAddress
        }
    }

    /**
     * @param {PeerConnection} conn
     * @returns {boolean}
     * @private
     */
    _incrementConnectionCount(conn) {
        let numConnections = this._connectionCounts.get(conn.netAddress) || 0;
        numConnections++;
        this._connectionCounts.put(conn.netAddress, numConnections);

        // Enforce max connections per IP limit.
        const maxConnections = conn.protocol === Protocol.WS ?
            Network.PEER_COUNT_PER_IP_WS_MAX : Network.PEER_COUNT_PER_IP_RTC_MAX;
        if (numConnections > maxConnections) {
            conn.close(`connection limit per ip (${maxConnections}) reached`);
            return false;
        }
        return true;
    }

    /**
     * @param {NetAddress} netAddress
     * @returns {void}
     * @private
     */
    _decrementConnectionCount(netAddress) {
        let numConnections = this._connectionCounts.get(netAddress) || 1;
        numConnections = Math.max(numConnections - 1, 0);
        this._connectionCounts.put(netAddress, numConnections);
    }

    /**
     * Updates the network time offset by calculating the median offset
     * from all our peers.
     * @returns {void}
     * @private
     */
    _updateTimeOffset() {
        const agents = this._agents.values();

        const offsets = [0]; // Add our own offset.
        agents.forEach(agent => {
            // The agent.peer property is null pre-handshake.
            if (agent.peer) {
                offsets.push(agent.peer.timeOffset);
            }
        });

        const offsetsLength = offsets.length;
        offsets.sort((a, b) => a - b);

        if ((offsetsLength % 2) === 0) {
            this._timeOffset = (offsets[(offsetsLength / 2) - 1] + offsets[offsetsLength / 2]) / 2;
        } else {
            this._timeOffset = offsets[(offsetsLength - 1) / 2];
        }
    }

    /* Signaling */

    /**
     * @param {PeerChannel} channel
     * @param {SignalMessage} msg
     * @returns {void}
     * @private
     */
    _onSignal(channel, msg) {
        // Discard signals with invalid TTL.
        if (msg.ttl > Network.SIGNAL_TTL_INITIAL) {
            channel.ban('invalid signal ttl');
            return;
        }

        // Can be undefined for non-rtc nodes.
        const mySignalId = NetworkConfig.myPeerAddress().signalId;

        // Discard signals from myself.
        if (msg.senderId === mySignalId) {
            Log.w(Network, `Received signal from myself to ${msg.recipientId} from ${channel.peerAddress} (myId: ${mySignalId})`);
            return;
        }

        // If the signal has the unroutable flag set and we previously forwarded a matching signal,
        // mark the route as unusable.
        if (msg.isUnroutable() && this._forwards.signalForwarded(/*senderId*/ msg.recipientId, /*recipientId*/ msg.senderId, /*nonce*/ msg.nonce)) {
            const senderAddr = this._addresses.getBySignalId(msg.senderId);
            this._addresses.unroutable(channel, senderAddr);
        }

        // If the signal is intended for us, pass it on to our WebRTC connector.
        if (msg.recipientId === mySignalId) {
            // If we sent out a signal that did not reach the recipient because of TTL
            // or it was unroutable, delete this route.
            if (this._rtcConnector.isValidSignal(msg) && (msg.isUnroutable() || msg.isTtlExceeded())) {
                const senderAddr = this._addresses.getBySignalId(msg.senderId);
                this._addresses.unroutable(channel, senderAddr);
            }
            this._rtcConnector.onSignal(channel, msg);
            return;
        }

        // Discard signals that have reached their TTL.
        if (msg.ttl <= 0) {
            Log.w(Network, `Discarding signal from ${msg.senderId} to ${msg.recipientId} - TTL reached`);
            // Send signal containing TTL_EXCEEDED flag back in reverse direction.
            if (msg.flags === 0) {
                channel.signal(/*senderId*/ msg.recipientId, /*recipientId*/ msg.senderId, msg.nonce, Network.SIGNAL_TTL_INITIAL, SignalMessage.Flags.TTL_EXCEEDED);
            }
            return;
        }

        // Otherwise, try to forward the signal to the intended recipient.
        const signalChannel = this._addresses.getChannelBySignalId(msg.recipientId);
        if (!signalChannel) {
            Log.w(Network, `Failed to forward signal from ${msg.senderId} to ${msg.recipientId} - no route found`);
            // If we don't know a route to the intended recipient, return signal to sender with unroutable flag set and payload removed.
            // Only do this if the signal is not already a unroutable response.
            if (msg.flags === 0) {
                channel.signal(/*senderId*/ msg.recipientId, /*recipientId*/ msg.senderId, msg.nonce, Network.SIGNAL_TTL_INITIAL, SignalMessage.Flags.UNROUTABLE);
            }
            return;
        }

        // Discard signal if our shortest route to the target is via the sending peer.
        // XXX Why does this happen?
        if (signalChannel.peerAddress.equals(channel.peerAddress)) {
            Log.e(Network, `Discarding signal from ${msg.senderId} to ${msg.recipientId} - shortest route via sending peer`);
            return;
        }

        // Decrement ttl and forward signal.
        signalChannel.signal(msg.senderId, msg.recipientId, msg.nonce, msg.ttl - 1, msg.flags, msg.payload);

        // We store forwarded messages if there are no special flags set.
        if (msg.flags === 0) {
            this._forwards.add(msg.senderId, msg.recipientId, msg.nonce);
        }

        // XXX This is very spammy!!!
        Log.v(Network, `Forwarding signal (ttl=${msg.ttl}) from ${msg.senderId} `
            + `(received from ${channel.peerAddress}) to ${msg.recipientId} `
            + `(via ${signalChannel.peerAddress})`);
    }

    /** @type {number} */
    get peerCount() {
        return this._addresses.peerCount;
    }

    /** @type {number} */
    get peerCountWebSocket() {
        return this._addresses.peerCountWs;
    }

    /** @type {number} */
    get peerCountWebRtc() {
        return this._addresses.peerCountRtc;
    }

    /** @type {number} */
    get peerCountDumb() {
        return this._addresses.peerCountDumb;
    }

    /** @type {number} */
    get bytesSent() {
        return this._bytesSent
            + this._agents.values().reduce((n, agent) => n + agent.channel.connection.bytesSent, 0);
    }

    /** @type {number} */
    get bytesReceived() {
        return this._bytesReceived
            + this._agents.values().reduce((n, agent) => n + agent.channel.connection.bytesReceived, 0);
    }
}
Network.PEER_COUNT_DESIRED = 6;
Network.PEER_COUNT_RELAY = 4;
Network.CONNECTING_COUNT_MAX = 2;
Network.SIGNAL_TTL_INITIAL = 3;
Network.ADDRESS_UPDATE_DELAY = 1000; // 1 second
Class.register(Network);

class SignalStore {
    /**
     * @param {number} maxSize maximum number of entries
     */
    constructor(maxSize = 1000) {
        /** @type {number} */
        this._maxSize = maxSize;
        /** @type {Queue.<ForwardedSignal>} */
        this._queue = new Queue();
        /** @type {HashMap.<ForwardedSignal, number>} */
        this._store = new HashMap();
    }

    /** @type {number} */
    get length() {
        return this._queue.length;
    }

    /**
     * @param {string} senderId
     * @param {string} recipientId
     * @param {number} nonce
     */
    add(senderId, recipientId, nonce) {
        // If we already forwarded such a message, just update timestamp.
        if (this.contains(senderId, recipientId, nonce)) {
            const signal = new ForwardedSignal(senderId, recipientId, nonce);
            this._store.put(signal, Date.now());
            this._queue.remove(signal);
            this._queue.enqueue(signal);
            return;
        }

        // Delete oldest if needed.
        if (this.length >= this._maxSize) {
            const oldest = this._queue.dequeue();
            this._store.remove(oldest);
        }
        const signal = new ForwardedSignal(senderId, recipientId, nonce);
        this._queue.enqueue(signal);
        this._store.put(signal, Date.now());
    }

    /**
     * @param {string} senderId
     * @param {string} recipientId
     * @param {number} nonce
     * @return {boolean}
     */
    contains(senderId, recipientId, nonce) {
        const signal = new ForwardedSignal(senderId, recipientId, nonce);
        return this._store.contains(signal);
    }

    /**
     * @param {string} senderId
     * @param {string} recipientId
     * @param {number} nonce
     * @return {boolean}
     */
    signalForwarded(senderId, recipientId, nonce) {
        const signal = new ForwardedSignal(senderId, recipientId, nonce);
        const lastSeen = this._store.get(signal);
        if (!lastSeen) {
            return false;
        }
        const valid = lastSeen + ForwardedSignal.SIGNAL_MAX_AGE > Date.now();
        if (!valid) {
            // Because of the ordering, we know that everything after that is invalid too.
            const toDelete = this._queue.dequeueUntil(signal);
            for (const dSignal of toDelete) {
                this._store.remove(dSignal);
            }
        }
        return valid;
    }
}
SignalStore.SIGNAL_MAX_AGE = 10 /* seconds */;
Class.register(SignalStore);

class ForwardedSignal {
    /**
     * @param {string} senderId
     * @param {string} recipientId
     * @param {number} nonce
     */
    constructor(senderId, recipientId, nonce) {
        /** @type {string} */
        this._senderId = senderId;
        /** @type {string} */
        this._recipientId = recipientId;
        /** @type {number} */
        this._nonce = nonce;
    }

    /**
     * @param {ForwardedSignal} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof ForwardedSignal
            && this._senderId === o._senderId
            && this._recipientId === o._recipientId
            && this._nonce === o._nonce;
    }

    hashCode() {
        return this.toString();
    }

    /**
     * @returns {string}
     */
    toString() {
        return `ForwardedSignal{senderId=${this._senderId}, recipientId=${this._recipientId}, nonce=${this._nonce}}`;
    }
}
Class.register(ForwardedSignal);

class NetUtils {
    /**
     * @param {string} ip
     * @return {boolean}
     */
    static isPrivateIP(ip) {
        if (NetUtils.isLocalIP(ip)) {
            return true;
        }

        if (NetUtils.isIPv4Address(ip)) {
            for (const subnet of NetUtils.IPv4_PRIVATE_NETWORK) {
                if (NetUtils.isIPv4inSubnet(ip, subnet)) {
                    return true;
                }
            }
            return false;
        }

        if (NetUtils.isIPv6Address(ip)) {
            const parts = ip.toLowerCase().split(':');
            const isEmbeddedIPv4 = NetUtils.isIPv4Address(parts[parts.length - 1]);
            if (isEmbeddedIPv4) {
                return NetUtils.isPrivateIP(parts[parts.length - 1]);
            }

            // Private subnet is fc00::/7.
            // So, we only check the first 7 bits of the address to be equal fc00.
            // The mask shifts by 16-7=9 bits (one part - mask size).
            if ((parseInt(parts[0], 16) & (-1<<9)) === 0xfc00) {
                return true;
            }

            // Link-local addresses are fe80::/10.
            // Shifting has to be carried out by 16-10=6 bits.
            if ((parseInt(parts[0], 16) & (-1<<6)) === 0xfe80) {
                return true;
            }

            // Does not seem to be a private IP.
            return false;
        }

        throw `Malformed IP address ${ip}`;
    }

    /**
     * @param {string} ip
     * @returns {boolean}
     */
    static isLocalIP(ip) {
        const saneIp = NetUtils._normalizeIP(ip);
        if (NetUtils.isIPv4Address(ip)) {
            return saneIp === '127.0.0.1';
        } else {
            return saneIp === '::1';
        }
    }

    /**
     * @param {string} ip
     * @param {string} subnet
     * @return {boolean}
     */
    static isIPv4inSubnet(ip, subnet) {
        let [subIp, mask] = subnet.split('/');
        mask = -1<<(32-parseInt(mask));
        return (NetUtils._IPv4toLong(ip) & mask) === NetUtils._IPv4toLong(subIp);
    }

    /**
     * @param {string} ip
     * @return {boolean}
     */
    static isIPv4Address(ip) {
        const match = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
        return !!match && parseInt(match[1]) <= 255 && parseInt(match[2]) <= 255
            && parseInt(match[3]) <= 255 && parseInt(match[4]) <= 255;
    }

    /**
     * @param {string} ip
     * @return {boolean}
     */
    static isIPv6Address(ip) {
        const parts = ip.toLowerCase().split(':');
        // An IPv6 address consists of at most 8 parts and at least 3.
        if (parts.length > 8 || parts.length < 3) {
            return false;
        }

        const isEmbeddedIPv4 = NetUtils.isIPv4Address(parts[parts.length - 1]);

        let innerEmpty = false;
        for (let i = 0; i < parts.length; ++i) {
            // Check whether each part is valid.
            // Note: the last part may be a IPv4 address!
            // They can be embedded in the last part. Remember that they take 32bit.
            if (!(/^[a-f0-9]{0,4}$/.test(parts[i])
                    || (i === parts.length - 1
                        && isEmbeddedIPv4
                        && parts.length < 8))) {
                return false;
            }
            // Inside the parts, there has to be at most one empty part.
            if (parts[i].length === 0 && i > 0 && i < parts.length - 1) {
                if (innerEmpty) {
                    return false; // at least two empty parts
                }
                innerEmpty = true;
            }
        }

        // In the special case of embedded IPv4 addresses, everything but the last 48 bit must be 0.
        if (isEmbeddedIPv4) {
            // Exclude the last two parts.
            for (let i=0; i<parts.length-2; ++i) {
                if (!/^0{0,4}$/.test(parts[i])) {
                    return false;
                }
            }
        }

        // If the first part is empty, the second has to be empty as well (e.g., ::1).
        if (parts[0].length === 0) {
            return parts[1].length === 0;
        }

        // If the last part is empty, the second last has to be empty as well (e.g., 1::).
        if (parts[parts.length - 1].length === 0) {
            return parts[parts.length - 2].length === 0;
        }

        // If the length is less than 7 and an IPv4 address is embedded, there has to be an empty part.
        if (isEmbeddedIPv4 && parts.length < 7) {
            return innerEmpty;
        }

        // Otherwise if the length is less than 8, there has to be an empty part.
        if (parts.length < 8) {
            return innerEmpty;
        }

        return true;
    }

    /**
     * @param {string} ip
     * @return {string}
     */
    static sanitizeIP(ip) {
        const saneIp = NetUtils._normalizeIP(ip);
        // FIXME
        if (NetUtils.IP_BLACKLIST.indexOf(saneIp) >= 0) {
            throw `Malformed IP address ${ip}`;
        }
        // TODO reject IPv6 broadcast addresses
        return saneIp;
    }

    /**
     * @param {string} ip
     * @return {string}
     */
    static _normalizeIP(ip) {
        if (NetUtils.isIPv4Address(ip)) {
            // Re-create IPv4 address to strip possible leading zeros.
            // Embed into IPv6 format.
            const match = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
            return `${parseInt(match[1])}.${parseInt(match[2])}.${parseInt(match[3])}.${parseInt(match[4])}`;
        }

        if (NetUtils.isIPv6Address(ip)) {
            // Shorten IPv6 address according to RFC 5952.

            // Only use lower-case letters.
            ip = ip.toLowerCase();

            // Split into parts.
            const parts = ip.split(':');

            // Return normalized IPv4 address if embedded.
            if (NetUtils.isIPv4Address(parts[parts.length - 1])) {
                return NetUtils._normalizeIP(parts[parts.length - 1]);
            }

            // If it is already shortened at one point, blow it up again.
            // It may be the case, that the current shortening is not as described in the RFC.
            const emptyIndex = parts.indexOf('');
            if (emptyIndex >= 0) {
                parts[emptyIndex] = '0';
                // Also check parts before and after emptyIndex and fill them up if necessary.
                if (emptyIndex > 0 && parts[emptyIndex-1] === '') {
                    parts[emptyIndex-1] = '0';
                }
                if (emptyIndex < parts.length - 1 && parts[emptyIndex+1] === '') {
                    parts[emptyIndex+1] = '0';
                }

                // Add 0s until we have a normal IPv6 length.
                const necessaryAddition = 8-parts.length;
                for (let i=0; i<necessaryAddition; ++i) {
                    parts.splice(emptyIndex, 0, '0');
                }
            }

            let maxZeroSeqStart = -1;
            let maxZeroSeqLength = 0;
            let curZeroSeqStart = -1;
            let curZeroSeqLength = 1;
            for (let i = 0; i < parts.length; ++i) {
                // Remove leading zeros from each part, but keep at least one number.
                parts[i] = parts[i].replace(/^0+([a-f0-9])/, '$1');

                // We look for the longest, leftmost consecutive sequence of zero parts.
                if (parts[i] === '0') {
                    // Freshly started sequence.
                    if (curZeroSeqStart < 0) {
                        curZeroSeqStart = i;
                    } else {
                        // Known sequence, so increment length.
                        curZeroSeqLength++;
                    }
                } else {
                    // A sequence just ended, check if it is of better length.
                    if (curZeroSeqStart >= 0 && curZeroSeqLength > maxZeroSeqLength) {
                        maxZeroSeqStart = curZeroSeqStart;
                        maxZeroSeqLength = curZeroSeqLength;
                        curZeroSeqStart = -1;
                        curZeroSeqLength = 1;
                    }
                }
            }

            if (curZeroSeqStart >= 0 && curZeroSeqLength > maxZeroSeqLength) {
                maxZeroSeqStart = curZeroSeqStart;
                maxZeroSeqLength = curZeroSeqLength;
            }

            // Remove consecutive zeros.
            if (maxZeroSeqStart >= 0 && maxZeroSeqLength > 1) {
                if (maxZeroSeqLength === parts.length) {
                    return '::';
                } else if (maxZeroSeqStart === 0 || maxZeroSeqStart + maxZeroSeqLength === parts.length) {
                    parts.splice(maxZeroSeqStart, maxZeroSeqLength, ':');
                } else {
                    parts.splice(maxZeroSeqStart, maxZeroSeqLength, '');
                }
            }

            return parts.join(':');
        }

        throw `Malformed IP address ${ip}`;
    }

    /**
     * @param {string} ip
     * @return {number}
     */
    static _IPv4toLong(ip) {
        const match = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
        return (parseInt(match[1])<<24) + (parseInt(match[2])<<16) + (parseInt(match[3])<<8) + (parseInt(match[4]));
    }
}
NetUtils.IP_BLACKLIST = [
    '0.0.0.0',
    '255.255.255.255',
    '::',
];
NetUtils.IPv4_PRIVATE_NETWORK = [
    '10.0.0.0/8',
    '172.16.0.0/12',
    '192.168.0.0/16',
    '100.64.0.0/10', // link-local

    // Actually, the following one is only an approximation,
    // the first and the last /24 subnets in the range should be excluded.
    '169.254.0.0/16'
];
Class.register(NetUtils);

class PeerChannel extends Observable {
    /**
     * @listens PeerConnection#message
     * @param {PeerConnection} connection
     */
    constructor(connection) {
        super();
        this._conn = connection;
        this._conn.on('message', msg => this._onMessage(msg));

        // Forward specified events on the connection to listeners of this Observable.
        this.bubble(this._conn, 'close', 'error', 'ban');
    }

    /**
     * @param {Uint8Array} rawMsg
     * @private
     */
    _onMessage(rawMsg) {
        let msg;
        try {
            msg = MessageFactory.parse(rawMsg);
        } catch(e) {
            Log.w(PeerChannel, `Failed to parse message from ${this.peerAddress || this.netAddress}`, e);

            // Ban peer if it sends junk.
            // TODO We should probably be more lenient here. Bitcoin sends a
            // reject message if the message can't be decoded.
            // From the Bitcoin Reference:
            //  "Be careful of reject message feedback loops where two peers
            //   each don’t understand each other’s reject messages and so keep
            //   sending them back and forth forever."
            this.ban('junk received');
        }

        if (!msg) return;

        try {
            this.fire(PeerChannel.Event[msg.type], msg, this);
        } catch (e) {
            Log.w(PeerChannel, `Error while processing ${msg.type} message from ${this.peerAddress || this.netAddress}: ${e}`);
        }
    }

    /**
     * @param {Message} msg
     * @return {boolean}
     * @private
     */
    _send(msg) {
        return this._conn.send(msg.serialize());
    }

    /**
     * @param {string} [reason]
     */
    close(reason) {
        this._conn.close(reason);
    }

    /**
     * @param {string} [reason]
     */
    ban(reason) {
        this._conn.ban(reason);
    }

    /**
     * @param {PeerAddress} peerAddress
     * @param {Hash} headHash
     * @return {boolean}
     */
    version(peerAddress, headHash) {
        return this._send(new VersionMessage(Version.CODE, peerAddress, Block.GENESIS.HASH, headHash));
    }

    /**
     * @param {Array.<InvVector>} vectors
     * @return {boolean}
     */
    inv(vectors) {
        return this._send(new InvMessage(vectors));
    }

    /**
     * @param {Array.<InvVector>} vectors
     * @return {boolean}
     */
    notFound(vectors) {
        return this._send(new NotFoundMessage(vectors));
    }

    /**
     * @param {Array.<InvVector>} vectors
     * @return {boolean}
     */
    getData(vectors) {
        return this._send(new GetDataMessage(vectors));
    }

    /**
     * @param {Array.<InvVector>} vectors
     * @return {boolean}
     */
    getHeader(vectors) {
        return this._send(new GetHeaderMessage(vectors));
    }

    /**
     * @param {Block} block
     * @return {boolean}
     */
    block(block) {
        return this._send(new BlockMessage(block));
    }

    /**
     * @param {BlockHeader} header
     * @return {boolean}
     */
    header(header) {
        return this._send(new HeaderMessage(header));
    }

    /**
     * @param {Transaction} transaction
     * @param {?AccountsProof} [accountsProof]
     * @return {boolean}
     */
    tx(transaction, accountsProof) {
        return this._send(new TxMessage(transaction, accountsProof));
    }

    /**
     * @param {Array.<Hash>} locators
     * @param {number} maxInvSize
     * @param {boolean} [ascending]
     * @return {boolean}
     */
    getBlocks(locators, maxInvSize=BaseInventoryMessage.VECTORS_MAX_COUNT, ascending=true) {
        return this._send(new GetBlocksMessage(locators, maxInvSize, ascending ? GetBlocksMessage.Direction.FORWARD : GetBlocksMessage.Direction.BACKWARD));
    }

    /**
     * @return {boolean}
     */
    mempool() {
        return this._send(new MempoolMessage());
    }

    /**
     * @param {Message.Type} messageType
     * @param {RejectMessage.Code} code
     * @param {string} reason
     * @param {Uint8Array} extraData
     * @return {boolean}
     */
    reject(messageType, code, reason, extraData) {
        return this._send(new RejectMessage(messageType, code, reason, extraData));
    }

    /**
     * @param {Array.<PeerAddress>} addresses
     * @return {boolean}
     */
    addr(addresses) {
        return this._send(new AddrMessage(addresses));
    }

    /**
     * @param {number} protocolMask
     * @param {number} serviceMask
     * @return {boolean}
     */
    getAddr(protocolMask, serviceMask) {
        return this._send(new GetAddrMessage(protocolMask, serviceMask));
    }

    /**
     * @param {number} nonce
     * @return {boolean}
     */
    ping(nonce) {
        return this._send(new PingMessage(nonce));
    }

    /**
     * @param {number} nonce
     * @return {boolean}
     */
    pong(nonce) {
        return this._send(new PongMessage(nonce));
    }

    /**
     * @param {string} senderId
     * @param {string} recipientId
     * @param {number} nonce
     * @param {number} ttl
     * @param {SignalMessage.Flags|number} flags
     * @param {Uint8Array} [payload]
     * @return {boolean}
     */
    signal(senderId, recipientId, nonce, ttl, flags, payload) {
        return this._send(new SignalMessage(senderId, recipientId, nonce, ttl, flags, payload));
    }

    /**
     * @param {Hash} blockHash
     * @param {Array.<Address>} addresses
     * @return {boolean}
     */
    getAccountsProof(blockHash, addresses) {
        return this._send(new GetAccountsProofMessage(blockHash, addresses));
    }

    /**
     * @param {Hash} blockHash
     * @param {AccountsProof} proof
     * @return {boolean}
     */
    accountsProof(blockHash, proof) {
        return this._send(new AccountsProofMessage(blockHash, proof));
    }

    /**
     * @return {boolean}
     */
    getChainProof() {
        return this._send(new GetChainProofMessage());
    }

    /**
     * @param {ChainProof} proof
     * @return {boolean}
     */
    chainProof(proof) {
        return this._send(new ChainProofMessage(proof));
    }

    /**
     * @param {Hash} blockHash
     * @param {string} startPrefix
     * @return {boolean}
     */
    getAccountsTreeChunk(blockHash, startPrefix) {
        return this._send(new GetAccountsTreeChunkMessage(blockHash, startPrefix));
    }

    /**
     * @param {Hash} blockHash
     * @param {AccountsTreeChunk} chunk
     * @return {boolean}
     */
    accountsTreeChunk(blockHash, chunk) {
        return this._send(new AccountsTreeChunkMessage(blockHash, chunk));
    }

    /**
     * @returns {boolean}
     */
    rejectAccounts() {
        return this._send(new AccountsRejectedMessage());
    }

    /**
     * @param {PeerChannel} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof PeerChannel
            && this._conn.equals(o.connection);
    }

    hashCode() {
        return this._conn.hashCode();
    }

    /**
     * @return {string}
     */
    toString() {
        return `PeerChannel{conn=${this._conn}}`;
    }

    /** @type {PeerConnection} */
    get connection() {
        return this._conn;
    }

    /** @type {number} */
    get id() {
        return this._conn.id;
    }

    /** @type {number} */
    get protocol() {
        return this._conn.protocol;
    }

    /** @type {PeerAddress} */
    get peerAddress() {
        return this._conn.peerAddress;
    }

    /** @type {PeerAddress} */
    set peerAddress(value) {
        this._conn.peerAddress = value;
    }

    /** @type {NetAddress} */
    get netAddress() {
        return this._conn.netAddress;
    }

    /** @type {NetAddress} */
    set netAddress(value) {
        this._conn.netAddress = value;
    }

    /** @type {boolean} */
    get closed() {
        return this._conn.closed;
    }
}
Class.register(PeerChannel);

PeerChannel.Event = {};
PeerChannel.Event[Message.Type.VERSION] = 'version';
PeerChannel.Event[Message.Type.INV] = 'inv';
PeerChannel.Event[Message.Type.GET_DATA] = 'get-data';
PeerChannel.Event[Message.Type.GET_HEADER] = 'get-header';
PeerChannel.Event[Message.Type.NOT_FOUND] = 'not-found';
PeerChannel.Event[Message.Type.GET_BLOCKS] = 'get-blocks';
PeerChannel.Event[Message.Type.BLOCK] = 'block';
PeerChannel.Event[Message.Type.HEADER] = 'header';
PeerChannel.Event[Message.Type.TX] = 'tx';
PeerChannel.Event[Message.Type.MEMPOOL] = 'mempool';
PeerChannel.Event[Message.Type.REJECT] = 'reject';
PeerChannel.Event[Message.Type.ADDR] = 'addr';
PeerChannel.Event[Message.Type.GET_ADDR] = 'get-addr';
PeerChannel.Event[Message.Type.PING] = 'ping';
PeerChannel.Event[Message.Type.PONG] = 'pong';
PeerChannel.Event[Message.Type.SIGNAL] = 'signal';
PeerChannel.Event[Message.Type.GET_CHAIN_PROOF] = 'get-chain-proof';
PeerChannel.Event[Message.Type.CHAIN_PROOF] = 'chain-proof';
PeerChannel.Event[Message.Type.GET_ACCOUNTS_PROOF] = 'get-accounts-proof';
PeerChannel.Event[Message.Type.ACCOUNTS_PROOF] = 'accounts-proof';
PeerChannel.Event[Message.Type.GET_ACCOUNTS_TREE_CHUNK] = 'get-accounts-tree-chunk';
PeerChannel.Event[Message.Type.ACCOUNTS_TREE_CHUNK] = 'accounts-tree-chunk';
PeerChannel.Event[Message.Type.ACCOUNTS_REJECTED] = 'accounts-rejected';

// TODO: DO NOT try to use different native channel objects from one entity, use abstraction layer!
class PeerConnection extends Observable {
    /**
     * @param {object} nativeChannel
     * @param {number} protocol
     * @param {NetAddress} netAddress
     * @param {PeerAddress} peerAddress
     */
    constructor(nativeChannel, protocol, netAddress, peerAddress) {
        super();
        this._channel = nativeChannel;

        /** @type {number} */
        this._protocol = protocol;
        /** @type {NetAddress} */
        this._netAddress = netAddress;
        /** @type {PeerAddress} */
        this._peerAddress = peerAddress;

        /** @type {number} */
        this._bytesSent = 0;
        /** @type {number} */
        this._bytesReceived = 0;

        /** @type {boolean} */
        this._inbound = !peerAddress;
        /** @type {boolean} */
        this._closedByUs = false;
        /** @type {boolean} */
        this._closed = false;

        // Unique id for this connection.
        /** @type {number} */
        this._id = PeerConnection._instanceCount++;

        if (this._channel.on) {
            this._channel.on('message', msg => this._onMessage(msg.data || msg));
            this._channel.on('close', () => this._onClose());
            this._channel.on('error', e => this.fire('error', e, this));
        } else {
            this._channel.onmessage = msg => this._onMessage(msg.data || msg);
            this._channel.onclose = () => this._onClose();
            this._channel.onerror = e => this.fire('error', e, this);
        }
    }

    _onMessage(msg) {
        // Don't emit messages if this channel is closed.
        if (this._closed) {
            return;
        }

        // XXX Cleanup!
        if (!PlatformUtils.isBrowser() || !(msg instanceof Blob)) {
            this._bytesReceived += msg.byteLength || msg.length;
            this.fire('message', msg, this);
        } else {
            // Browser only
            // TODO FileReader is slow and this is ugly anyways. Improve!
            const reader = new FileReader();
            reader.onloadend = () => this._onMessage(reader.result);
            reader.readAsArrayBuffer(msg);
        }
    }

    _onClose() {
        // Don't fire close event again when already closed.
        if (this._closed) {
            return;
        }

        // Mark this connection as closed.
        this._closed = true;

        // Tell listeners that this connection has closed.
        this.fire('close', !this._closedByUs, this);
    }

    _close() {
        this._closedByUs = true;

        // Don't wait for the native close event to fire.
        this._onClose();

        // Close the native channel.
        this._channel.close();
    }

    /**
     * @return {boolean}
     * @private
     */
    _isChannelOpen() {
        return this._channel.readyState === WebSocket.OPEN
            || this._channel.readyState === 'open';
    }

    /**
     * @return {boolean}
     * @private
     */
    _isChannelClosing() {
        return this._channel.readyState === WebSocket.CLOSING
            || this._channel.readyState === 'closing';
    }

    /**
     * @return {boolean}
     * @private
     */
    _isChannelClosed() {
        return this._channel.readyState === WebSocket.CLOSED
            || this._channel.readyState === 'closed';
    }

    /**
     * @param {Uint8Array} msg
     * @return {boolean}
     */
    send(msg) {
        const logAddress = this._peerAddress || this._netAddress;
        if (this._closed) {
            // XXX Debug, spammy!!!
            Log.e(PeerConnection, `Tried to send data over closed connection to ${logAddress}`, MessageFactory.parse(msg));
            return false;
        }

        // Fire close event (early) if channel is closing/closed.
        if (this._isChannelClosing() || this._isChannelClosed()) {
            Log.w(PeerConnection, `Not sending data to ${logAddress} - channel closing/closed (${this._channel.readyState})`);
            this._onClose();
            return false;
        }

        // Don't attempt to send if channel is not (yet) open.
        if (!this._isChannelOpen()) {
            Log.w(PeerConnection, `Not sending data to ${logAddress} - channel not open (${this._channel.readyState})`);
            return false;
        }

        try {
            this._channel.send(msg);
            this._bytesSent += msg.byteLength || msg.length;
            return true;
        } catch (e) {
            Log.e(PeerConnection, `Failed to send data to ${logAddress}: ${e.message || e}`);
            return false;
        }
    }

    /**
     * @param {string} [reason]
     */
    close(reason) {
        const connType = this._inbound ? 'inbound' : 'outbound';
        Log.d(PeerConnection, `Closing ${connType} connection #${this._id} ${this._peerAddress || this._netAddress}` + (reason ? ` - ${reason}` : ''));
        this._close();
    }

    /**
     * @param {string} [reason]
     */
    ban(reason) {
        Log.w(PeerConnection, `Banning peer ${this._peerAddress || this._netAddress}` + (reason ? ` - ${reason}` : ''));
        this._close();
        this.fire('ban', reason, this);
    }

    /**
     * @param {PeerConnection} o
     * @return {boolean}
     */
    equals(o) {
        return o instanceof PeerConnection
            && this._id === o.id;
    }

    hashCode() {
        return this._id;
    }

    /**
     * @return {string}
     */
    toString() {
        return `PeerConnection{id=${this._id}, protocol=${this._protocol}, peerAddress=${this._peerAddress}, netAddress=${this._netAddress}}`;
    }

    /** @type {number} */
    get id() {
        return this._id;
    }

    /** @type {number} */
    get protocol() {
        return this._protocol;
    }

    /** @type {PeerAddress} */
    get peerAddress() {
        return this._peerAddress;
    }

    /** @type {PeerAddress} */
    set peerAddress(value) {
        this._peerAddress = value;
    }

    /** @type {NetAddress} */
    get netAddress() {
        return this._netAddress;
    }

    /** @type {NetAddress} */
    set netAddress(value) {
        this._netAddress = value;
    }

    /** @type {number} */
    get bytesSent() {
        return this._bytesSent;
    }

    /** @type {number} */
    get bytesReceived() {
        return this._bytesReceived;
    }

    /** @type {boolean} */
    get inbound() {
        return this._inbound;
    }

    /** @type {boolean} */
    get outbound() {
        return !this._inbound;
    }

    /** @type {boolean} */
    get closed() {
        return this._closed;
    }
}
// Used to generate unique PeerConnection ids.
PeerConnection._instanceCount = 0;
Class.register(PeerConnection);

class Peer {
    /**
     * @param {PeerChannel} channel
     * @param {number} version
     * @param {Hash} headHash
     * @param {number} timeOffset
     */
    constructor(channel, version, headHash, timeOffset) {
        /** @type {PeerChannel} */
        this._channel = channel;
        /** @type {number} */
        this._version = version;
        /** @type {Hash} */
        this._headHash = headHash;
        /**
         * Offset between the peer's time and our local time.
         * @type {number}
         */
        this._timeOffset = timeOffset;
    }

    /** @type {PeerChannel} */
    get channel() {
        return this._channel;
    }

    /** @type {number} */
    get version() {
        return this._version;
    }

    /** @type {Hash} */
    get headHash() {
        return this._headHash;
    }

    /** @type {number} */
    get timeOffset() {
        return this._timeOffset;
    }

    /** @type {number} */
    get id() {
        return this._channel.id;
    }

    /** @type {PeerAddress} */
    get peerAddress() {
        return this._channel.peerAddress;
    }

    /** @type {NetAddress} */
    get netAddress() {
        return this._channel.netAddress;
    }

    /**
     * @param {Peer} o
     * @returns {boolean}
     */
    equals(o) {
        return o instanceof Peer
            && this._channel.equals(o.channel);
    }

    hashCode() {
        return this._channel.hashCode();
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Peer{version=${this._version}, headHash=${this._headHash}, `
            + `peerAddress=${this.peerAddress}, netAddress=${this.netAddress}}`;
    }
}
Class.register(Peer);

class Miner extends Observable {
    /**
     * @param {Blockchain} blockchain
     * @param {Mempool} mempool
     * @param {Address} minerAddress
     *
     * @listens Mempool#transaction-added
     * @listens Mempool#transaction-ready
     */
    constructor(blockchain, mempool, minerAddress) {
        super();
        /** @type {Blockchain} */
        this._blockchain = blockchain;
        /** @type {Mempool} */
        this._mempool = mempool;
        /** @type {Address} */
        this._address = minerAddress;

        /**
         * Number of hashes computed since the last hashrate update.
         * @type {number}
         * @private
         */
        this._hashCount = 0;

        /**
         * Timestamp of the last hashrate update.
         * @type {number}
         * @private
         */
        this._lastHashrate = 0;

        /**
         * Hashrate computation interval handle.
         * @private
         */
        this._hashrateWorker = null;

        /**
         * The current hashrate of this miner.
         * @type {number}
         * @private
         */
        this._hashrate = 0;

        /**
         * The last hash counts used in the moving average.
         * @type {Array.<number>}
         * @private
         */
        this._lastHashCounts = [];

        /**
         * The total hashCount used in the current moving average.
         * @type {number}
         * @private
         */
        this._totalHashCount = 0;

        /**
         * The time elapsed for the last measurements used in the moving average.
         * @type {Array.<number>}
         * @private
         */
        this._lastElapsed = [];

        /**
         * The total time elapsed used in the current moving average.
         * @type {number}
         * @private
         */
        this._totalElapsed = 0;

        // Flag indicating that the mempool has changed since we started mining the current block.
        this._mempoolChanged = false;

        // Listen to changes in the mempool which evicts invalid transactions
        // after every blockchain head change and then fires 'transactions-ready'
        // when the eviction process finishes. Restart work on the next block
        // with fresh transactions when this fires.
        this._mempool.on('transactions-ready', () => this._startWork());

        // Immediately start processing transactions when they come in.
        this._mempool.on('transaction-added', () => this._mempoolChanged = true);
    }

    startWork() {
        if (this.working) {
            return;
        }

        // Initialize hashrate computation.
        this._hashCount = 0;
        this._lastElapsed = [];
        this._lastHashCounts = [];
        this._totalHashCount = 0;
        this._totalElapsed = 0;
        this._lastHashrate = Date.now();
        this._hashrateWorker = setInterval(() => this._updateHashrate(), 1000);

        // Tell listeners that we've started working.
        this.fire('start', this);

        // Kick off the mining process.
        this._startWork();
    }

    async _startWork() {
        // XXX Needed as long as we cannot unregister from transactions-ready events.
        if (!this.working) {
            return;
        }

        // Construct next block.
        const block = await this._getNextBlock();
        const buffer = block.header.serialize();
        this._mempoolChanged = false;

        Log.i(Miner, `Starting work on ${block.header}, transactionCount=${block.transactionCount}, hashrate=${this._hashrate} H/s`);

        // Start hashing.
        this._mine(block, buffer);
    }


    async _mine(block, buffer) {
        // If the mempool has changed, restart work with the changed transactions.
        if (this._mempoolChanged) {
            this._startWork();
            return;
        }

        // Abort mining if the blockchain head changed.
        if (!this._blockchain.headHash.equals(block.prevHash)) {
            return;
        }

        // Abort mining if the user stopped the miner.
        if (!this.working) {
            return;
        }

        // Reset the write position of the buffer before re-using it.
        buffer.writePos = 0;

        // Compute hash and check if it meets the proof of work condition.
        const isPoW = await block.header.verifyProofOfWork(buffer);

        // Keep track of how many hashes we have computed.
        this._hashCount++;

        // Check if we have found a block.
        if (isPoW) {
            // Tell listeners that we've mined a block.
            this.fire('block-mined', block, this);

            // Push block into blockchain.
            this._blockchain.pushBlock(block);
        } else {
            // Increment nonce.
            block.header.nonce++;

            // Continue mining.
            this._mine(block, buffer);
        }
    }

    /**
     * @return {Promise.<Block>}
     * @private
     */
    async _getNextBlock() {
        const nextTarget = await this._blockchain.getNextTarget();
        const interlink = await this._getNextInterlink(nextTarget);
        const body = this._getNextBody();
        const header = await this._getNextHeader(nextTarget, interlink, body);
        return new Block(header, interlink, body);
    }

    /**
     * @param {number} nextTarget
     * @param {BlockInterlink} interlink
     * @param {BlockBody} body
     * @return {Promise.<BlockHeader>}
     * @private
     */
    async _getNextHeader(nextTarget, interlink, body) {
        const prevHash = this._blockchain.headHash;
        const interlinkHash = await interlink.hash();

        // Compute next accountsHash.
        const accounts = await this._blockchain.accounts.transaction();
        let accountsHash;
        try {
            await accounts.commitBlockBody(body);
            accountsHash = await accounts.hash();
            await accounts.abort();
        } catch (e) {
            await accounts.abort();
            throw new Error('Invalid block body');
        }

        const bodyHash = await body.hash();
        const height = this._blockchain.height + 1;
        const timestamp = this._getNextTimestamp();
        const nBits = BlockUtils.targetToCompact(nextTarget);
        const nonce = Math.round(Math.random() * 100000);
        return new BlockHeader(prevHash, interlinkHash, bodyHash, accountsHash, nBits, height, timestamp, nonce);
    }

    /**
     * @param {number} nextTarget
     * @returns {Promise.<BlockInterlink>}
     * @private
     */
    _getNextInterlink(nextTarget) {
        return this._blockchain.head.getNextInterlink(nextTarget);
    }

    /**
     * @return {BlockBody}
     * @private
     */
    _getNextBody() {
        // Get transactions from mempool (default is maxCount=5000).
        // TODO Completely fill up the block with transactions until the size limit is reached.
        const transactions = this._mempool.getTransactions();
        return new BlockBody(this._address, transactions);
    }

    /**
     * @return {number}
     * @private
     */
    _getNextTimestamp() {
        const now = Math.floor(Date.now() / 1000);
        return Math.max(now, this._blockchain.head.timestamp + 1);
    }

    /**
     * @fires Miner#stop
     */
    stopWork() {
        // TODO unregister from blockchain head-changed events.
        if (!this.working) {
            return;
        }

        clearInterval(this._hashrateWorker);
        this._hashrateWorker = null;
        this._hashrate = 0;
        this._lastElapsed = [];
        this._lastHashCounts = [];
        this._totalHashCount = 0;
        this._totalElapsed = 0;

        // Tell listeners that we've stopped working.
        this.fire('stop', this);

        Log.i(Miner, 'Stopped work');
    }

    /**
     * @fires Miner#hashrate-changed
     * @private
     */
    _updateHashrate() {
        const elapsed = (Date.now() - this._lastHashrate) / 1000;
        const hashCount = this._hashCount;
        // Enable next measurement.
        this._hashCount = 0;
        this._lastHashrate = Date.now();

        // Update stored information on moving average.
        this._lastElapsed.push(elapsed);
        this._lastHashCounts.push(hashCount);
        this._totalElapsed += elapsed;
        this._totalHashCount += hashCount;

        if (this._lastElapsed.length > Miner.MOVING_AVERAGE_MAX_SIZE) {
            const oldestElapsed = this._lastElapsed.shift();
            const oldestHashCount = this._lastHashCounts.shift();
            this._totalElapsed -= oldestElapsed;
            this._totalHashCount -= oldestHashCount;
        }

        this._hashrate = Math.round(this._totalHashCount / this._totalElapsed);

        // Tell listeners about our new hashrate.
        this.fire('hashrate-changed', this._hashrate, this);
    }

    /** @type {Address} */
    get address() {
        return this._address;
    }

    /** @type {boolean} */
    get working() {
        return !!this._hashrateWorker;
    }

    /** @type {number} */
    get hashrate() {
        return this._hashrate;
    }
}
Miner.MOVING_AVERAGE_MAX_SIZE = 10;
Class.register(Miner);

class WalletStore extends TypedDB {
    constructor() {
        super('wallet', KeyPair);
    }

    async get(key) {
        return this.getObject(key);
    }

    async put(key, value) {
        return this.putObject(key, value);
    }
}
Class.register(WalletStore);

// TODO V2: Store private key encrypted
class Wallet {
    /**
     * Create a Wallet with persistent storage backend.
     * @returns {Promise.<Wallet>} A Wallet object. If the persisted storage already stored a Wallet before, this will be reused.
     */
    static async getPersistent() {
        const db = new WalletStore();
        let keys = await db.get('keys');
        if (!keys) {
            keys = await KeyPair.generate();
            await db.put('keys', keys);
        }
        return new Wallet(keys);
    }

    /**
     * Create a Wallet that will loose its data after this session.
     * @returns {Promise.<Wallet>} Newly created Wallet.
     */
    static async createVolatile() {
        return new Wallet(await KeyPair.generate());
    }

    static load(hexBuf) {
        const hexMatch = hexBuf.match(/[0-9A-Fa-f]*/);
        if (hexBuf.length / 2 !== Crypto.privateKeySize || hexMatch[0] !== hexBuf) {
            throw Wallet.ERR_INVALID_WALLET_SEED;
        }

        return new Wallet(KeyPair.fromHex(hexBuf));
    }

    /**
     * Create a new Wallet object.
     * @param {KeyPair} keyPair KeyPair owning this Wallet.
     * @returns {Promise.<Wallet>} A newly generated Wallet.
     */
    constructor(keyPair) {
        /** @type {KeyPair} */
        this._keyPair = keyPair;
        /** @type {Address} */
        this._address = undefined;
        return this._init();
    }

    async _init() {
        this._address = await this._keyPair.publicKey.toAddress();
        return this;
    }

    /**
     * Create a Transaction that is signed by the owner of this Wallet.
     * @param {Address} recipientAddr Address of the transaction receiver
     * @param {number} value Number of Satoshis to send.
     * @param {number} fee Number of Satoshis to donate to the Miner.
     * @param {number} nonce The nonce representing the current balance of the sender.
     * @returns {Promise.<Transaction>} A prepared and signed Transaction object. This still has to be sent to the network.
     */
    createTransaction(recipientAddr, value, fee, nonce) {
        const transaction = new Transaction(this._keyPair.publicKey, recipientAddr, value, fee, nonce);
        return this._signTransaction(transaction);
    }

    /**
     * @param {Transaction} transaction
     * @returns {Promise.<Transaction>}
     * @private
     */
    async _signTransaction(transaction) {
        transaction.signature = await Signature.create(this._keyPair.privateKey, transaction.serializeContent());
        return transaction;
    }

    /**
     * The address of the Wallet owner.
     * @type {Address}
     */
    get address() {
        return this._address;
    }

    /**
     * The public key of the Wallet owner
     * @type {PublicKey}
     */
    get publicKey() {
        return this._keyPair.publicKey;
    }

    /** @type {KeyPair} */
    get keyPair() {
        return this._keyPair;
    }

    /** 
     * @returns {string}
     */
    dump() {
        return this._keyPair.toHex();
    }
}

Wallet.ERR_INVALID_WALLET_SEED = -100;

Class.register(Wallet);

/**
 * @deprecated
 */
class Core {
    /**
     * Initialize the Core object
     * @return {Promise.<Core>} The created Core object.
     */
    constructor() {
        return this._init();
    }

    async _init() {
        this.consensus = await Consensus.full();

        // XXX Legacy API
        this.blockchain = this.consensus.blockchain;
        this.accounts = this.blockchain.accounts;
        this.mempool = this.consensus.mempool;
        this.network = this.consensus.network;

        // XXX Legacy components
        this.wallet = await Wallet.getPersistent();
        this.miner = new Miner(this.blockchain, this.mempool, this.wallet.address);

        Object.freeze(this);
        return this;
    }
}
Class.register(Core);

    exports._loaded = true;
    if (typeof exports._onload === 'function') exports._onload();
    return exports;
})(Nimiq);

//# sourceMappingURL=web-crypto.js.map
