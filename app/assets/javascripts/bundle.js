!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/js/",t(t.s=0)}([function(e,t,n){"use strict";document.addEventListener("DOMContentLoaded",function(){function e(e){var t=1,n=setInterval(function(){t<=.1&&(clearInterval(n),e.style.display="none"),e.style.opacity=t,e.style.filter="alpha(opacity="+100*t+")",t-=.1*t},100)}function t(e){return e.charAt(0).toUpperCase()+e.slice(1)}console.log("dom is fully loaded, pokemon util running");for(var n=[],r=[],a=[],i=null,o=null,c=null,s=null,u=void 0,l=void 0,m=void 0,d={},p={},h=void 0,f=void 0,g="player1",v=0;v<6;v++){document.createElement("img").src="http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png"}(function(){return $.ajax({method:"GET",url:"http://pokeapi.co/api/v2/pokemon/?limit=150",success:function(e){n=n.concat(e.results)}})})().then(function(){return $.ajax({method:"POST",url:"api/pokemon",data:{pokemon:n}}).then(function(e){window.pokemon=e}).then(function(){return k()})});var y=function(e){return $.ajax({method:"GET",url:"http://pokeapi.co/api/v2/pokemon/"+e+"/"}).then(function(e){return u=e})},T=function(e){return $.ajax({method:"GET",url:"http://pokeapi.co/api/v2/pokemon/"+e+"/"}).then(function(e){return l=e})},b=function(e){return $.ajax({method:"POST",url:"api/twitter",data:{pokemon:e}})},w=function(e){return $.ajax({method:"GET",url:""+e}).then(function(e){h=e})},k=function(){for(var e=$("#pokemon-list"),t=[],n=0;n<150;n++)t.push(window.pokemon[n]);t.forEach(function(t){var n=(t.name,document.createElement("div")),r=(document.createElement("p"),document.createElement("img"));n.setAttribute("class","pokemon-item"),n.addEventListener("click",function(e){return E(t)}),r.src=t.image_url,n.appendChild(r),e.append(n)})},E=function(e){if(r.length<6){r.push(e);var t=document.createElement("img");t.src=e.image_url;$(".team-container")[0].appendChild(t),6===r.length&&C()}},C=function(){document.getElementById("ready-btn").setAttribute("class","show")},x=function(e){return $.ajax({method:"POST",url:"api/tones",data:{tweet:e}})},A=function(e,t){return $.ajax({method:"GET",url:"http://api.giphy.com/v1/gifs/search?q="+e+"+"+t+"&api_key=dc6zaTOxFJmzC",success:function(e){m=e}})},H=function(){document.getElementById("gamescreen-canvas").width+=1},I=function(){G();var e=setInterval(H,10);setTimeout(function(){return clearInterval(e)},500),setTimeout(_,1e3),setTimeout(B,2e3),setTimeout(function(){return $("html, body").animate({scrollTop:"1000px"})},4e3)},M=function(){for(var e=0;e<6;e++){var t=Math.floor(Math.random()*n.length);a.push(window.pokemon[t])}var r=document.createElement("div");r.setAttribute("class","background-modal");var i=$(document).height().toString()+"px";r.style.height=i,document.getElementsByTagName("BODY")[0].appendChild(r),P()};$("#ready-btn").on("click",function(){return M()});var P=function(){var e=document.createElement("canvas");e.setAttribute("id","gamescreen-canvas");e.getContext("2d");$(".background-modal")[0].appendChild(e),setTimeout(function(){return $("html, body").animate({scrollTop:"0px"})},500),setTimeout(function(){return I()},1e3)},_=function(){var e=document.getElementById("gamescreen-canvas"),t=e.getContext("2d"),n=document.createElement("img"),i=document.createElement("img");n.setAttribute("class","player1-pokeballs"),i.setAttribute("class","player2-pokeballs"),n.src="http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png",i.src="http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png",n.onload=function(){for(var o=0;o<r.length;)t.drawImage(n,.01*e.width+15*o,10,20,20*n.height/n.width),o+=1;for(o=0;o<a.length;)t.drawImage(i,.72*e.width+15*o,10,20,20*n.height/n.width),o+=1}},B=function(){var e=document.getElementsByClassName("background-modal")[0],t=document.createElement("img"),n=document.createElement("img");t.setAttribute("class","player1-sprite"),n.setAttribute("class","player2-sprite"),t.src="http://fc01.deviantart.net/fs71/f/2011/003/f/e/pokemon_trainer_denny_by_tsunami_dono-d36cgr5.png",n.src="http://s-media-cache-ak0.pinimg.com/originals/d8/5a/5c/d85a5cb0fe99e3fcf312f91026637eb1.png",e.appendChild(t),e.appendChild(n),S(),L()},L=function(){var e=Math.floor(Math.random()*a.length);T(a[e].id).then(function(){var t=l.stats[5].base_stat+l.base_experience,n=l.stats[4].base_stat,r=l.stats[3].base_stat,i=l.stats[0].base_stat;p[l.name]={totalHP:t,currentHP:t,attack:n,defense:r,speed:i,name:l.name,id:l.id},o=p[l.name],b(a[e]).then(function(t){p[l.name].tweets=t.tweets,setTimeout(function(){return le(a[e],"player2")},3e3)})})},N=function e(){o?(f={name:l.name,player:"player2",pokemon:p[l.name]},J(p[o.name].tweets),setTimeout(function(){100*Math.random()>50&&$(".next-btn").trigger("click"),$(".tweet-container").trigger("click")},4e3)):(L(),setTimeout(function(){return e()},6e3))},S=function(){var e=document.getElementsByClassName("background-modal")[0],t=document.createElement("div"),n=document.createElement("div");t.setAttribute("class","waiting-area-container-p1"),n.setAttribute("class","waiting-area-container-p2"),e.appendChild(t),e.appendChild(n),r.forEach(function(e){var n=document.createElement("img");n.src=e.image_url,n.addEventListener("click",function(t){return z(e)}),setTimeout(function(){return t.appendChild(n)},1e3)}),a.forEach(function(e){var t=document.createElement("img");t.src=e.image_url,setTimeout(function(){return n.appendChild(t)},1e3)})},j=function(){var e=document.getElementById("gamescreen-canvas"),t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),_(),O(t)},O=function(e){e.beginPath(),D&&(D.width<50&&D.width>25?e.strokeStyle="orange":D.width<25?e.strokeStyle="red":e.strokeStyle="green",D.width<=1&&(D={x:D.x,y:D.y,width:D.width,height:0}),e.strokeRect(D.x,D.y,D.width,D.height)),e.beginPath(),q&&(q.width<50&&q.width>25?e.strokeStyle="orange":q.width<25?e.strokeStyle="red":e.strokeStyle="green",q.width<=1&&(q={x:q.x,y:q.y,width:q.width,height:0}),e.strokeRect(q.x,q.y,q.width,q.height))},G=function(){var e=document.getElementById("gamescreen-canvas"),t=e.getContext("2d");setTimeout(function(){t.strokeText("C",.35*e.width,10)},1e3),setTimeout(function(){t.strokeText("H",.4*e.width,10)},1050),setTimeout(function(){t.strokeText("O",.45*e.width,10)},1100),setTimeout(function(){t.strokeText("O",.5*e.width,10)},1150),setTimeout(function(){t.strokeText("S",.55*e.width,10)},1200),setTimeout(function(){t.strokeText("E",.6*e.width,10)},1250),setTimeout(j,1800),setTimeout(function(){t.strokeText("Y",.4*e.width,10)},2e3),setTimeout(function(){t.strokeText("O",.45*e.width,10)},2050),setTimeout(function(){t.strokeText("U",.5*e.width,10)},2100),setTimeout(function(){t.strokeText("R",.55*e.width,10)},2150),setTimeout(j,2600),setTimeout(function(){t.strokeText("P",.35*e.width,10)},2700),setTimeout(function(){t.strokeText("O",.4*e.width,10)},2750),setTimeout(function(){t.strokeText("K",.45*e.width,10)},2800),setTimeout(function(){t.strokeText("E",.5*e.width,10)},2850),setTimeout(function(){t.strokeText("M",.55*e.width,10)},2900),setTimeout(function(){t.strokeText("O",.6*e.width,10)},2950),setTimeout(function(){t.strokeText("N",.65*e.width,10)},3e3),setTimeout(j,3300)},R=1,D=void 0,W=1,q=void 0,K=function(e){if("player1"===e){var t=i.currentHP/i.totalHP,n=80*t;R+=1;var r=document.getElementById("gamescreen-canvas"),a=r.getContext("2d");a.beginPath(),a.lineWidth="4",a.strokeStyle="green",R<n&&(a.rect(10,30,0+R,1),D={x:10,y:30,width:R,height:1},a.stroke())}else if("player2"===e){var c=o.currentHP/o.totalHP,s=80*c;W+=1;var u=document.getElementById("gamescreen-canvas"),l=u.getContext("2d");l.beginPath(),l.lineWidth="4",l.strokeStyle="green",W<s&&(l.rect(338-W,30,0+W,1),q={x:360-W,y:30,width:W,height:1},l.stroke())}},U=function(e,t,n){var r=document.getElementById("gamescreen-canvas"),a=r.getContext("2d");if(a.beginPath(),a.lineWidth="4",a.strokeStyle="green","player1"===e){var i=n.currentHP/n.totalHP,o=t/n.totalHP,c=Math.floor(80*i);o>=1&&(q={x:255,y:q.y,width:q.width,height:q.height});var s=setInterval(function(){q.width>=c&&q.width>=1&&(q={x:q.x+1,y:q.y,width:q.width-1,height:q.height},j())},50);setTimeout(function(){return clearInterval(s)},4e3)}else{var u=n.currentHP/n.totalHP,l=t/n.totalHP,m=Math.floor(80*u);l>=1&&(D={x:10,y:D.y,width:D.width,height:D.height});var d=setInterval(function(){D.width>=m&&D.width>=1&&(D={x:D.x,y:D.y,width:D.width-1,height:D.height},j())},50);setTimeout(function(){return clearInterval(d)},4e3)}},Y=function(e){var t=setInterval(function(){return K(e)},50);setTimeout(function(){return clearInterval(t)},4e3)},z=function(e){null===i&&"player1"===g&&(i="fetching...",y(e.id).then(function(){var t=u.stats[5].base_stat+u.base_experience,n=u.stats[4].base_stat,r=u.stats[3].base_stat,a=u.stats[0].base_stat;d[u.name]={totalHP:t,currentHP:t,attack:n,defense:r,speed:a,name:u.name,id:u.id},i=d[u.name],f={name:u.name,player:"player1",pokemon:d[u.name]},le(e,"player1"),b(e).then(function(e){d[u.name].tweets=e.tweets,J(e.tweets)})}))},F=function(e){for(var t=[];t.length<4;){var n=Math.floor(Math.random()*e.tweets.length),r=e.tweets[n];"en"==r.lang&&t.push(r)}return t},J=function(e){var t=F(e),n=document.getElementsByClassName("background-modal")[0],r=document.createElement("div"),a=document.createElement("div");r.setAttribute("class","options-container"),a.setAttribute("class","options-container-cover");var i=document.createElement("h3");i.innerHTML="SELECT A TWEET ATTACK!",r.appendChild(i);var o=document.createElement("img");o.setAttribute("class","next-btn"),o.src="http://vignette1.wikia.nocookie.net/pokemongo/images/1/1b/Button_Next.png/revision/latest?cb=20160908143000",o.addEventListener("click",Z),r.appendChild(o),c=t;var s=ue(c[0]);r.appendChild(s),n.appendChild(r),"player2"===g&&n.appendChild(a)},Z=function(){document.getElementsByClassName("tweet-container")[0].setAttribute("class","hide");var e=document.getElementsByClassName("options-container")[0],t=c[0];c.shift(),c.push(t);var n=ue(c[0]);setTimeout(function(){return e.appendChild(n)},1e3),e.appendChild(n)},Q=function(e){$("html, body").animate({scrollTop:"0px"}),me(e.text,g),x(e).then(function(e){s=e;var t=se(e);setTimeout(function(){return V(t)},3e3)})},V=function(e){var t=void 0,n=void 0;t="player1"===g?u.moves:l.moves;var r=void 0;if("anger"===e){n=f.name;var a=Math.floor(30*Math.random());r=t[a].move.name,w(t[a].move.url).then(function(){ee()})}else if("disgust"===e)n="nicolas+cage",r="nicolas+cage";else if("fear"===e)n="scared",r="scared";else if("joy"===e){n=f.name;var i=Math.floor(30*Math.random());r=t[i].move.name,w(t[i].move.url).then(function(){ee()})}else"sadness"===e?(n="crying",r="crying"):"none"===e&&(n="confused",r="confused");A(n,r).then(function(){return ie(r,e)})},X=function(e){return e[Math.floor(Math.random()*e.length)]},ee=function(){var e=f.pokemon.attack,t=Math.floor(100*Math.random()),n=h.power,r=(h.accuracy,e+n);if("player1"===f.player){var a=p[l.name].currentHP;p[l.name].currentHP-=r-p[l.name].defense,p[l.name].currentHP<=0&&(o=null,W=1),setTimeout(function(){return te(f.player,a,p[l.name])},3e3)}else{var c=d[u.name].currentHP;d[u.name].currentHP-=r-d[u.name].defense,d[u.name].currentHP<=0&&(i=null,R=1),setTimeout(function(){return te(f.player,c,d[u.name])},3e3)}},te=function(e,t,n){if("player1"===f.player){var r=document.getElementsByClassName("pokemon-gif-p2")[0],a=setInterval(function(){return r.setAttribute("id","invert-img")},200),i=setInterval(function(){return r.setAttribute("id","invert-img-none")},400);U(e,t,n),setTimeout(function(){return clearInterval(a)},2e3),setTimeout(function(){return clearInterval(i)},2400),n.currentHP<=0&&setTimeout(function(){return ne(n,e)},3500)}else{var o=document.getElementsByClassName("pokemon-gif-p1")[0],c=setInterval(function(){return o.setAttribute("id","invert-img")},200),s=setInterval(function(){return o.setAttribute("id","invert-img-none")},400);U(e,t,n),setTimeout(function(){return clearInterval(c)},2e3),setTimeout(function(){return clearInterval(s)},2400),n.currentHP<=0&&setTimeout(function(){return ne(n,e)},3500)}},ne=function(e,t){if("player1"===t){var n=[];a.length>0?a.forEach(function(t){t.id!==e.id&&n.push(t)}):setTimeout(function(){return re(t)},8e3),a=n,ae(e,t);var o=document.getElementsByClassName("pokemon-gif-p2")[0];o.setAttribute("id","invert-img-half");var c=setInterval(function(){o.setAttribute("id","invert-img-quarter")},100),s=setInterval(function(){o.setAttribute("id","invert-img-half")},300);setTimeout(function(){return clearInterval(c)},2e3),setTimeout(function(){return clearInterval(s)},2e3),setTimeout(function(){return $(".pokemon-gif-p2").remove()},2e3)}else{r.length<1&&setTimeout(function(){return re(t)},8e3),i=null,ae(e,t);var u=document.getElementsByClassName("pokemon-gif-p1")[0];u.setAttribute("id","invert-img-half");var l=setInterval(function(){u.setAttribute("id","invert-img-quarter")},100),m=setInterval(function(){u.setAttribute("id","invert-img-half")},300);setTimeout(function(){return clearInterval(l)},2e3),setTimeout(function(){return clearInterval(m)},2e3),setTimeout(function(){return $(".pokemon-gif-p1").remove()},2e3)}},re=function(e){var t=document.createElement("div");t.setAttribute("class","end-game-modal");var n=$(document).height().toString()+"px";t.style.height=n,document.getElementsByTagName("BODY")[0].appendChild(t)},ae=function(e,t){if("player1"===t)for(var n=document.getElementsByClassName("waiting-area-container-p2")[0],r=n.children,a=0;a<r.length;a++){var i=r[a],o=i.src.slice(0,i.src.length-4),c=parseInt(o.slice(37));c===e.id&&n.removeChild(i)}else for(var s=document.getElementsByClassName("waiting-area-container-p1")[0],u=s.children,l=0;l<u.length;l++){var m=u[l],d=m.src.slice(0,m.src.length-4),p=parseInt(d.slice(37));p===e.id&&s.removeChild(m)}},ie=function(n,r){var a=document.createElement("div"),i=document.getElementsByClassName("background-modal")[0];a.setAttribute("class","attack-message"),"anger"===r||"joy"===r?a.innerHTML=t(f.name)+" uses "+n+"!":"sadness"===r?a.innerHTML=t(f.name)+" begins to cry!":"disgust"===r?a.innerHTML=t(f.name)+" is disgusted!":"none"===r?a.innerHTML=t(f.name)+" is confused...":"fear"===r&&(a.innerHTML=t(f.name)+" is afraid..."),$(".options-container").remove(),$(".options-container-cover").remove(),i.appendChild(a);var o=X(m.data),c=document.createElement("img");c.setAttribute("class","pokemon-gif");var s="http://media.giphy.com/media/"+o.embed_url.slice(23)+"/giphy.gif";c.src=s,i.appendChild(c),setTimeout(function(){return i.removeChild(c)},5e3),setTimeout(function(){return e(a)},2e3),setTimeout(function(){return i.removeChild(a)},5e3),setTimeout(function(){return oe()},8e3)},oe=function(){g="player1"===g?"player2":"player1","player2"===g?N():ce()},ce=function(){i&&(f={name:u.name,player:"player1",pokemon:d[u.name]},J(d[u.name].tweets))},se=function(e){var t="Unavailable"!==e.scores?e.scores:{anger:{score:0},disgust:{score:0},fear:{score:0},joy:{score:0},sadness:{score:0}},n=0,r="none",a=t.anger?t.anger.score:0;a>n&&(r="anger",n=a);var i=t.disgust.score;i>n&&(r="disgust",n=i);var o=t.fear.score;o>n&&(r="fear",n=o);var c=t.joy.score;c>n&&(r="joy",n=c);var s=t.sadness.score;return s>n&&(r="sadness",n=s),r},ue=function(e){var t=document.createElement("div");t.setAttribute("class","tweet-container"),t.addEventListener("click",function(){return Q(e)});var n=document.createElement("div");n.setAttribute("class","tweet-header");var r=document.createElement("div");r.setAttribute("class","tweet-name-container");var a=document.createElement("div");a.setAttribute("class","tweet-image-container");var i=document.createElement("img");i.src=e.user.profile_image_url,a.appendChild(i);var o=document.createElement("h2");o.innerHTML=e.user.name;var c=document.createElement("p");c.innerHTML="@"+e.user.screen_name,r.appendChild(o),r.appendChild(c),n.appendChild(a),n.appendChild(r),t.appendChild(n);var s=document.createElement("p");s.setAttribute("class","tweet-text"),s.innerHTML=e.text,t.appendChild(s);var u=document.createElement("p");u.setAttribute("class","tweet-date"),u.innerHTML=e.created_at,t.appendChild(u);var l=document.createElement("div");l.setAttribute("class","tweet-stats");var m=document.createElement("div");m.setAttribute("class","retweet-container");var d=document.createElement("img");d.src="http://simpleicon.com/wp-content/uploads/retweet.png";var p=document.createElement("p");p.innerHTML=e.retweet_count,m.appendChild(d),m.appendChild(p);var h=document.createElement("div");h.setAttribute("class","favorites-container");var f=document.createElement("img");f.src="http://www.clker.com/cliparts/H/Z/c/f/2/H/solid-dark-grey-heart-md.png";var g=document.createElement("p");g.innerHTML=e.favorite_count,h.appendChild(f),h.appendChild(g);var v=document.createElement("p");return v.innerHTML=e.user.location,l.appendChild(m),l.appendChild(h),l.appendChild(v),t.appendChild(l),t},le=function(e,n){setTimeout(function(){return $("html, body").animate({scrollTop:"0"})},10),me(t(e.name)+", I choose you!",n),Y(n);var r=void 0,a=void 0,i=void 0;"player1"===n?(r="pokeball-gif-p1",a="smoke-gif-p1",i="pokemon-gif-p1"):(r="pokeball-gif-p2",a="smoke-gif-p2",i="pokemon-gif-p2");var o=document.getElementById("gamescreen-canvas"),c=o.offsetLeft,s=document.getElementsByClassName("background-modal")[0],u=document.createElement("img");u.src="http://media.giphy.com/media/DJM88aCmEeaNG/giphy.gif",u.setAttribute("class",r),"player1"===n?u.style.left=(c-10).toString()+"px":(c=o.offsetRight,u.style.right=(c-10).toString()+"px");var l=document.createElement("img");l.setAttribute("class",a),l.src="http://media.giphy.com/media/drj4KPFH32Mw/giphy.gif",s.appendChild(u);var m=document.createElement("img");m.setAttribute("class",i),m.src=e.gif_url,setTimeout(function(){u.setAttribute("class","hide")},2400),setTimeout(function(){return s.appendChild(l)},2500),setTimeout(function(){l.setAttribute("class","hide")},3e3),setTimeout(function(){return s.appendChild(m)},3e3)},me=function(e,t){var n=document.createElement("div"),r=document.getElementsByClassName("background-modal")[0];"player1"===t?($(".speech-bubble-p1").remove(),n.setAttribute("class","speech-bubble-p1")):($(".speech-bubble-p2").remove(),n.setAttribute("class","speech-bubble-p2")),setTimeout(function(){return r.removeChild(n)},3500),n.innerHTML=de(e),r.appendChild(n)},de=function(e){return e.length>60&&(e=e.slice(0,50)),e}})}]);