!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/js/",t(t.s=0)}([function(e,t,n){"use strict";document.addEventListener("DOMContentLoaded",function(){function e(e){var t=1,n=setInterval(function(){t<=.1&&(clearInterval(n),e.style.display="none"),e.style.opacity=t,e.style.filter="alpha(opacity="+100*t+")",t-=.1*t},100)}function t(e){return e.charAt(0).toUpperCase()+e.slice(1)}console.log("dom is fully loaded, pokemon util running");for(var n=[],a=[],r=[],o=null,i=null,s=null,c=null,u=void 0,l=void 0,m=void 0,d={},p={},h=void 0,f=void 0,g="player1",v=0;v<6;v++){document.createElement("img").src="http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png"}(function(){return $.ajax({method:"GET",url:"http://pokeapi.co/api/v2/pokemon/?limit=150",success:function(e){$(".loader").remove(),n=n.concat(e.results)}})})().then(function(){return $.ajax({method:"POST",url:"api/pokemon",data:{pokemon:n}}).then(function(e){window.pokemon=e}).then(function(){return w()})});var y=function(e){return $.ajax({method:"GET",url:"http://pokeapi.co/api/v2/pokemon/"+e+"/"}).then(function(e){return u=e})},b=function(e){return $.ajax({method:"GET",url:"http://pokeapi.co/api/v2/pokemon/"+e+"/"}).then(function(e){return l=e})},T=function(e){return $.ajax({method:"POST",url:"api/twitter",data:{pokemon:e}})},k=function(e){return $.ajax({method:"GET",url:""+e}).then(function(e){h=e})},w=function(){for(var e=$("#pokemon-list"),t=[],n=0;n<150;n++)t.push(window.pokemon[n]);t.forEach(function(t){var n=(t.name,document.createElement("div")),a=(document.createElement("p"),document.createElement("img"));n.setAttribute("class","pokemon-item"),n.addEventListener("click",function(e){return E(t)}),a.src=t.image_url,n.appendChild(a),e.append(n)})},E=function(e){if(a.length<6){a.push(e);var t=document.createElement("img");t.src=e.image_url;$(".team-container")[0].appendChild(t),6===a.length&&C()}},C=function(){document.getElementById("ready-btn").setAttribute("class","show")},x=function(e){return $.ajax({method:"POST",url:"api/tones",data:{tweet:e}})},A=function(e,t){return $.ajax({method:"GET",url:"http://api.giphy.com/v1/gifs/search?q="+e+"+"+t+"&api_key=dc6zaTOxFJmzC",success:function(e){m=e}})},M=function(){document.getElementById("gamescreen-canvas").width+=1},H=function(){R();var e=setInterval(M,10);setTimeout(function(){return clearInterval(e)},500),setTimeout(P,1e3),setTimeout(B,2e3),setTimeout(function(){return $("html, body").animate({scrollTop:"1000px"})},4e3)},I=function(){for(var e=0;e<6;e++){var t=Math.floor(Math.random()*n.length);r.push(window.pokemon[t])}var a=document.createElement("div"),o=document.createElement("AUDIO");o.src="https://s3.amazonaws.com/beathub-dev/Poke%CC%81mon+Red++Blue+-+Final+Battle+Theme++vs+Rival+%5BHQ%5D.mp3",o.autoplay,o.loop=!0,a.setAttribute("class","background-modal"),a.appendChild(o);var i=$(document).height().toString()+"px";a.style.height=i,document.getElementsByTagName("BODY")[0].appendChild(a),o.play(),_()};$("#ready-btn").on("click",function(){return I()});var _=function(){var e=document.createElement("canvas");e.setAttribute("id","gamescreen-canvas");e.getContext("2d");$(".background-modal")[0].appendChild(e),setTimeout(function(){return $("html, body").animate({scrollTop:"0px"})},500),setTimeout(function(){return H()},1e3)},P=function(){var e=document.getElementById("gamescreen-canvas"),t=e.getContext("2d"),n=document.createElement("img"),o=document.createElement("img");n.setAttribute("class","player1-pokeballs"),o.setAttribute("class","player2-pokeballs"),n.src="http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png",o.src="http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png",n.onload=function(){for(var i=0;i<a.length;)t.drawImage(n,.01*e.width+15*i,10,20,20*n.height/n.width),i+=1;for(i=0;i<r.length;)t.drawImage(o,.72*e.width+15*i,10,20,20*n.height/n.width),i+=1}},B=function(){var e=document.getElementsByClassName("background-modal")[0],t=document.createElement("img"),n=document.createElement("img");t.setAttribute("class","player1-sprite"),n.setAttribute("class","player2-sprite"),t.src="http://fc01.deviantart.net/fs71/f/2011/003/f/e/pokemon_trainer_denny_by_tsunami_dono-d36cgr5.png",n.src="http://s-media-cache-ak0.pinimg.com/originals/d8/5a/5c/d85a5cb0fe99e3fcf312f91026637eb1.png",e.appendChild(t),e.appendChild(n),S(),N()},N=function(){var e=Math.floor(Math.random()*r.length);b(r[e].id).then(function(){var t=l.stats[5].base_stat+l.base_experience,n=l.stats[4].base_stat,a=l.stats[3].base_stat,o=l.stats[0].base_stat;p[l.name]={totalHP:t,currentHP:t,attack:n,defense:a,speed:o,name:l.name,id:l.id},i=p[l.name],T(r[e]).then(function(t){p[l.name].tweets=t.tweets,setTimeout(function(){return le(r[e],"player2")},3e3)})})},L=function e(){0===r.length&&ae("player1"),i?(f={name:l.name,player:"player2",pokemon:p[l.name]},Y(p[i.name].tweets),setTimeout(function(){100*Math.random()>50&&$(".next-btn").trigger("click"),$(".tweet-container").trigger("click")},3e3)):(N(),setTimeout(function(){return e()},6e3))},S=function(){var e=document.getElementsByClassName("background-modal")[0],t=document.createElement("div"),n=document.createElement("div");t.setAttribute("class","waiting-area-container-p1"),n.setAttribute("class","waiting-area-container-p2"),e.appendChild(t),e.appendChild(n),a.forEach(function(e){var n=document.createElement("img");n.src=e.image_url,n.addEventListener("click",function(t){return z(e)}),setTimeout(function(){return t.appendChild(n)},1e3)}),r.forEach(function(e){var t=document.createElement("img");t.src=e.image_url,setTimeout(function(){return n.appendChild(t)},1e3)})},j=function(){var e=document.getElementById("gamescreen-canvas"),t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),P(),O(t)},O=function(e){e.beginPath(),D&&(D.width<50&&D.width>25?e.strokeStyle="orange":D.width<25?e.strokeStyle="red":e.strokeStyle="green",D.width<=0&&(D={x:D.x,y:D.y,width:D.width,height:0}),e.strokeRect(D.x,D.y,D.width,D.height)),e.beginPath(),J&&(J.width<50&&J.width>25?e.strokeStyle="orange":J.width<25?e.strokeStyle="red":e.strokeStyle="green",J.width<=0&&(J={x:J.x,y:J.y,width:J.width,height:0}),e.strokeRect(J.x,J.y,J.width,J.height))},R=function(){var e=document.getElementById("gamescreen-canvas"),t=e.getContext("2d");setTimeout(function(){t.strokeText("C",.35*e.width,10)},1e3),setTimeout(function(){t.strokeText("H",.4*e.width,10)},1050),setTimeout(function(){t.strokeText("O",.45*e.width,10)},1100),setTimeout(function(){t.strokeText("O",.5*e.width,10)},1150),setTimeout(function(){t.strokeText("S",.55*e.width,10)},1200),setTimeout(function(){t.strokeText("E",.6*e.width,10)},1250),setTimeout(j,1800),setTimeout(function(){t.strokeText("Y",.4*e.width,10)},2e3),setTimeout(function(){t.strokeText("O",.45*e.width,10)},2050),setTimeout(function(){t.strokeText("U",.5*e.width,10)},2100),setTimeout(function(){t.strokeText("R",.55*e.width,10)},2150),setTimeout(j,2600),setTimeout(function(){t.strokeText("P",.35*e.width,10)},2700),setTimeout(function(){t.strokeText("O",.4*e.width,10)},2750),setTimeout(function(){t.strokeText("K",.45*e.width,10)},2800),setTimeout(function(){t.strokeText("E",.5*e.width,10)},2850),setTimeout(function(){t.strokeText("M",.55*e.width,10)},2900),setTimeout(function(){t.strokeText("O",.6*e.width,10)},2950),setTimeout(function(){t.strokeText("N",.65*e.width,10)},3e3),setTimeout(j,3300)},G=1,D=void 0,F=1,J=void 0,U=function(e){if("player1"===e){var t=o.currentHP/o.totalHP,n=80*t;G+=1;var a=document.getElementById("gamescreen-canvas"),r=a.getContext("2d");r.beginPath(),r.lineWidth="4",r.strokeStyle="green",G<n&&(r.rect(10,30,0+G,1),D={x:10,y:30,width:G,height:1},r.stroke())}else if("player2"===e){var s=i.currentHP/i.totalHP,c=80*s;F+=1;var u=document.getElementById("gamescreen-canvas"),l=u.getContext("2d");l.beginPath(),l.lineWidth="4",l.strokeStyle="green",F<c&&(l.rect(338-F,30,0+F,1),J={x:360-F,y:30,width:F,height:1},l.stroke())}},W=function(e,t,n){var a=document.getElementById("gamescreen-canvas"),r=a.getContext("2d");if(r.beginPath(),r.lineWidth="4",r.strokeStyle="green","player1"===e){var o=n.currentHP/n.totalHP,i=t/n.totalHP,s=Math.floor(80*o);i>=1&&(J={x:255,y:J.y,width:80,height:J.height});var c=setInterval(function(){J.width>=s&&J.width>=0&&(J={x:J.x+1,y:J.y,width:J.width-1,height:J.height},j())},50);setTimeout(function(){return clearInterval(c)},4e3)}else{var u=n.currentHP/n.totalHP,l=t/n.totalHP,m=Math.floor(80*u);l>=1&&(D={x:10,y:D.y,width:D.width,height:D.height});var d=setInterval(function(){D.width>=m&&D.width>=1&&(D={x:D.x,y:D.y,width:D.width-1,height:D.height},j())},50);setTimeout(function(){return clearInterval(d)},4e3)}},q=function(e){var t=setInterval(function(){return U(e)},50);setTimeout(function(){return clearInterval(t)},4e3)},z=function(e){if(null===o&&"player1"===g)if(d[e.name])u=d[e.name],o=d[e.name],f={name:u.name,player:"player1",pokemon:d[u.name]},le(e,"player1"),Y(d[e.name].tweets);else{o="fetching...";var t=document.createElement("div"),n=document.createElement("img");n.src="http://codepen.io/boltaway/pen/BjyFb/image/large.png",t.appendChild(n);var a=document.getElementsByClassName("background-modal")[0];t.setAttribute("class","loader"),t.setAttribute("id","fetching-pokemon-loader"),console.log("appending fetching div...."),a.appendChild(t),y(e.id).then(function(){t.remove();var n=u.stats[5].base_stat+u.base_experience,a=u.stats[4].base_stat,r=u.stats[3].base_stat,i=u.stats[0].base_stat;d[u.name]={totalHP:n,currentHP:n,attack:a,defense:r,speed:i,name:u.name,id:u.id,moves:u.moves},o=d[u.name],f={name:u.name,player:"player1",pokemon:d[u.name]},le(e,"player1"),T(e).then(function(e){d[u.name].tweets=e.tweets,Y(e.tweets)})})}else if("player1"===g)if(console.log("pokemon already in play"),$(".pokemon-gif-p1").remove(),$(".options-container").remove(),d[e.name])u=d[e.name],o=d[e.name],f={name:u.name,player:"player1",pokemon:d[u.name]},le(e,"player1"),T(e),ie();else{o="fetching...";var r=document.createElement("div"),i=document.createElement("img");i.src="http://codepen.io/boltaway/pen/BjyFb/image/large.png",r.appendChild(i);var s=document.getElementsByClassName("background-modal")[0];r.setAttribute("class","loader"),r.setAttribute("id","fetching-pokemon-loader"),s.appendChild(r),y(e.id).then(function(){r.remove();var t=u.stats[5].base_stat+u.base_experience,n=u.stats[4].base_stat,a=u.stats[3].base_stat,i=u.stats[0].base_stat;d[u.name]={totalHP:t,currentHP:t,attack:n,defense:a,speed:i,name:u.name,id:u.id},o=d[u.name],f={name:u.name,player:"player1",pokemon:d[u.name]},le(e,"player1"),T(e).then(function(e){d[u.name].tweets=e.tweets}),ie()})}},K=function(e){for(var t=[];t.length<4;){var n=Math.floor(Math.random()*e.tweets.length),a=e.tweets[n];"en"==a.lang&&t.push(a)}return t},Y=function(e){var t=K(e),n=document.getElementsByClassName("background-modal")[0],a=document.createElement("div"),r=document.createElement("div");a.setAttribute("class","options-container"),r.setAttribute("class","options-container-cover");var o=document.createElement("h3");o.innerHTML="SELECT A TWEET ATTACK!",a.appendChild(o);var i=document.createElement("img");i.setAttribute("class","next-btn"),i.src="http://vignette1.wikia.nocookie.net/pokemongo/images/1/1b/Button_Next.png/revision/latest?cb=20160908143000",i.addEventListener("click",V),a.appendChild(i),s=t;var c=ue(s[0]);a.appendChild(c),n.appendChild(a),"player2"===g&&n.appendChild(r)},V=function(){document.getElementsByClassName("tweet-container")[0].setAttribute("class","hide");var e=document.getElementsByClassName("options-container")[0],t=s[0];s.shift(),s.push(t);var n=ue(s[0]);setTimeout(function(){return e.appendChild(n)},1e3),e.appendChild(n)},Q=function(e){$("html, body").animate({scrollTop:"0px"}),me(e.text,g),x(e).then(function(e){c=e;var t=ce(e);setTimeout(function(){return Z(t)},2e3)})},Z=function(e){var t=void 0,n=void 0;t="player1"===g?u.moves:l.moves;var a=void 0;if("anger"===e){n=f.name;var r=Math.floor(Math.random()*t.length-1);a=t[r].move.name,k(t[r].move.url).then(function(){ee()})}else if("disgust"===e){var o=Math.floor(100*Math.random());if(o>35)n="nicolas+cage",a="nicolas+cage";else{n=f.name;var i=Math.floor(Math.random()*t.length-1);a=t[i].move.name,k(t[i].move.url).then(function(){return ee()})}}else if("fear"===e)n="scared",a="scared";else if("joy"===e){n=f.name;var s=Math.floor(Math.random()*t.length-1);a=t[s].move.name,k(t[s].move.url).then(function(){ee()})}else if("sadness"===e){var c=Math.floor(100*Math.random());if(c>50)n="crying",a="crying";else{n=f.name;var m=Math.floor(Math.random()*t.length-1);a=t[m].move.name,k(t[m].move.url).then(function(){return ee()})}}else if("none"===e){var d=Math.floor(100*Math.random());if(d>50)n="confused",a="confused";else{n=f.name;var p=Math.floor(Math.random()*t.length-1);a=t[p].move.name,k(t[p].move.url).then(function(){return ee()})}}A(n,a).then(function(){return oe(a,e)})},X=function(e){return e[Math.floor(Math.random()*e.length)]},ee=function(){var e=f.pokemon.attack,t=Math.floor(100*Math.random()),n=h.power,a=(h.accuracy,e+n);if("player1"===f.player){var r=p[l.name].currentHP;p[l.name].currentHP-=a-p[l.name].defense,p[l.name].currentHP<=0&&(i=null,F=1),setTimeout(function(){return te(f.player,r,p[l.name])},3e3)}else{var s=d[u.name].currentHP;d[u.name].currentHP-=a-d[u.name].defense,d[u.name].currentHP<=0&&(o=null,G=1),setTimeout(function(){return te(f.player,s,d[u.name])},3e3)}},te=function(e,t,n){if("player1"===f.player){var a=document.getElementsByClassName("pokemon-gif-p2")[0],r=setInterval(function(){return a.setAttribute("id","invert-img")},200),o=setInterval(function(){return a.setAttribute("id","invert-img-none")},400);W(e,t,n),setTimeout(function(){return clearInterval(r)},1e3),setTimeout(function(){return clearInterval(o)},1400),n.currentHP<=0&&setTimeout(function(){return ne(n,e)},2e3)}else{var i=document.getElementsByClassName("pokemon-gif-p1")[0],s=setInterval(function(){return i.setAttribute("id","invert-img")},200),c=setInterval(function(){return i.setAttribute("id","invert-img-none")},400);W(e,t,n),setTimeout(function(){return clearInterval(s)},1e3),setTimeout(function(){return clearInterval(c)},1400),n.currentHP<=0&&setTimeout(function(){return ne(n,e)},2e3)}},ne=function(e,t){if("player1"===t){var n=[];r.forEach(function(t){t.id!==e.id&&n.push(t)}),r=n,re(e,t);var o=document.getElementsByClassName("pokemon-gif-p2")[0];o.setAttribute("id","invert-img-half");var i=setInterval(function(){o.setAttribute("id","invert-img-quarter")},100),s=setInterval(function(){o.setAttribute("id","invert-img-half")},300);setTimeout(function(){return clearInterval(i)},2e3),setTimeout(function(){return clearInterval(s)},2e3),setTimeout(function(){return $(".pokemon-gif-p2").remove()},2e3)}else{var c=[];a.forEach(function(t){t.id!==e.id&&c.push(t)}),a=c,re(e,t);var u=document.getElementsByClassName("pokemon-gif-p1")[0];u.setAttribute("id","invert-img-half");var l=setInterval(function(){u.setAttribute("id","invert-img-quarter")},100),m=setInterval(function(){u.setAttribute("id","invert-img-half")},300);setTimeout(function(){return clearInterval(l)},2e3),setTimeout(function(){return clearInterval(m)},2e3),setTimeout(function(){return $(".pokemon-gif-p1").remove()},2e3)}},ae=function(e){var t=document.createElement("div"),n=document.createElement("img"),a=document.createElement("div"),r=document.createElement("div"),o=document.createElement("div");n.src="http://cdn.bulbagarden.net/upload/thumb/8/8e/Nurse_Joy_OS.png/125px-Nurse_Joy_OS.png",n.setAttribute("class","nurse-joy"),t.setAttribute("class","end-game-modal"),a.setAttribute("class","game-over"),r.setAttribute("class","game-winner"),o.setAttribute("class","start-over"),o.innerHTML="START OVER",o.addEventListener("click",function(){return location.reload()}),a.innerHTML="GAME OVER",r.innerHTML=e+" wins!";var i=$(document).height().toString()+"px";t.style.height=i,t.appendChild(n),t.appendChild(a),t.appendChild(r),t.appendChild(o),document.getElementsByTagName("BODY")[0].appendChild(t)},re=function(e,t){if("player1"===t)for(var n=document.getElementsByClassName("waiting-area-container-p2")[0],a=n.children,r=0;r<a.length;r++){var o=a[r],i=o.src.slice(0,o.src.length-4),s=parseInt(i.slice(37));s===e.id&&n.removeChild(o)}else for(var c=document.getElementsByClassName("waiting-area-container-p1")[0],u=c.children,l=0;l<u.length;l++){var m=u[l],d=m.src.slice(0,m.src.length-4),p=parseInt(d.slice(37));p===e.id&&c.removeChild(m)}},oe=function(n,a){var r=document.createElement("div"),o=document.getElementsByClassName("background-modal")[0];r.setAttribute("class","attack-message"),r.innerHTML="anger"===a||"joy"===a?t(f.name)+" uses "+n+"!":"sadness"===a&&"crying"===n?t(f.name)+" begins to cry!":"disgust"===a&&"nicolas+cage"===n?t(f.name)+" is disgusted!":"none"===a&&"confused"===n?t(f.name)+" is confused...":"fear"===a&&"scared"===n?t(f.name)+" is afraid...":t(f.name)+" uses "+n+"!",$(".options-container").remove(),$(".options-container-cover").remove(),o.appendChild(r);var i=X(m.data),s=document.createElement("img");s.setAttribute("class","pokemon-gif");var c="http://media.giphy.com/media/"+i.embed_url.slice(23)+"/giphy.gif";s.src=c,o.appendChild(s),setTimeout(function(){return o.removeChild(s)},5e3),setTimeout(function(){return e(r)},2e3),setTimeout(function(){return o.removeChild(r)},6e3),setTimeout(function(){return ie()},8e3)},ie=function(){g="player1"===g?"player2":"player1","player2"===g?L():se()},se=function(){0===a.length&&ae("player2"),o&&(f={name:u.name,player:"player1",pokemon:d[u.name]},Y(d[u.name].tweets))},ce=function(e){var t="Unavailable"!==e.scores?e.scores:{anger:{score:0},disgust:{score:0},fear:{score:0},joy:{score:0},sadness:{score:0}},n=0,a="none",r=t.anger?t.anger.score:0;r>n&&(a="anger",n=r);var o=t.disgust.score;o>n&&(a="disgust",n=o);var i=t.fear.score;i>n&&(a="fear",n=i);var s=t.joy.score;s>n&&(a="joy",n=s);var c=t.sadness.score;return c>n&&(a="sadness",n=c),a},ue=function(e){var t=document.createElement("div");t.setAttribute("class","tweet-container"),t.addEventListener("click",function(){return Q(e)});var n=document.createElement("div");n.setAttribute("class","tweet-header");var a=document.createElement("div");a.setAttribute("class","tweet-name-container");var r=document.createElement("div");r.setAttribute("class","tweet-image-container");var o=document.createElement("img");o.src=e.user.profile_image_url,r.appendChild(o);var i=document.createElement("h2");i.innerHTML=e.user.name;var s=document.createElement("p");s.innerHTML="@"+e.user.screen_name,a.appendChild(i),a.appendChild(s),n.appendChild(r),n.appendChild(a),t.appendChild(n);var c=document.createElement("p");c.setAttribute("class","tweet-text"),c.innerHTML=e.text,t.appendChild(c);var u=document.createElement("p");u.setAttribute("class","tweet-date"),u.innerHTML=e.created_at,t.appendChild(u);var l=document.createElement("div");l.setAttribute("class","tweet-stats");var m=document.createElement("div");m.setAttribute("class","retweet-container");var d=document.createElement("img");d.src="http://simpleicon.com/wp-content/uploads/retweet.png";var p=document.createElement("p");p.innerHTML=e.retweet_count,m.appendChild(d),m.appendChild(p);var h=document.createElement("div");h.setAttribute("class","favorites-container");var f=document.createElement("img");f.src="http://www.clker.com/cliparts/H/Z/c/f/2/H/solid-dark-grey-heart-md.png";var g=document.createElement("p");g.innerHTML=e.favorite_count,h.appendChild(f),h.appendChild(g);var v=document.createElement("p");return v.innerHTML=e.user.location,l.appendChild(m),l.appendChild(h),l.appendChild(v),t.appendChild(l),t},le=function(e,n){setTimeout(function(){return $("html, body").animate({scrollTop:"0"})},10),me(t(e.name)+", I choose you!",n),q(n);var a=void 0,r=void 0,o=void 0;"player1"===n?(a="pokeball-gif-p1",r="smoke-gif-p1",o="pokemon-gif-p1"):(a="pokeball-gif-p2",r="smoke-gif-p2",o="pokemon-gif-p2");var i=document.getElementById("gamescreen-canvas"),s=i.offsetLeft,c=document.getElementsByClassName("background-modal")[0],u=document.createElement("img");u.src="http://media.giphy.com/media/DJM88aCmEeaNG/giphy.gif",u.setAttribute("class",a),"player1"===n?u.style.left=(s-10).toString()+"px":(s=i.offsetRight,u.style.right=(s-10).toString()+"px");var l=document.createElement("img");l.setAttribute("class",r),l.src="http://media.giphy.com/media/drj4KPFH32Mw/giphy.gif",c.appendChild(u);var m=document.createElement("img");m.setAttribute("class",o),m.src=e.gif_url,setTimeout(function(){u.setAttribute("class","hide")},2400),setTimeout(function(){return c.appendChild(l)},2500),setTimeout(function(){l.setAttribute("class","hide")},3e3),setTimeout(function(){return c.appendChild(m)},3e3)},me=function(e,t){var n=document.createElement("div"),a=document.getElementsByClassName("background-modal")[0];"player1"===t?($(".speech-bubble-p1").remove(),n.setAttribute("class","speech-bubble-p1")):($(".speech-bubble-p2").remove(),n.setAttribute("class","speech-bubble-p2")),setTimeout(function(){return a.removeChild(n)},3500),n.innerHTML=de(e),a.appendChild(n)},de=function(e){return e.length>60&&(e=e.slice(0,50)),e}})}]);