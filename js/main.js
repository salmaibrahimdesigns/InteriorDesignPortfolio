(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var nav=$('.nav'),hero=$('.hero');
window.addEventListener('load',function(){hero.classList.add('in')});
var burger=$('.burger'),list=$('#menu');
burger.addEventListener('click',function(){var o=list.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.textContent=o?'CLOSE':'MENU'});
$$('a',list).forEach(function(a){a.addEventListener('click',function(){list.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.textContent='MENU'})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&list.classList.contains('open'))burger.click()});
// room scroll
var room=$('.room'),steps=$$('.step'),count=$('.count'),cur=-1,rm=matchMedia('(prefers-reduced-motion:reduce)');
function tick(){
 nav.classList.toggle('solid',scrollY>hero.offsetHeight-90);
 if(rm.matches)return;
 var r=room.getBoundingClientRect(),t=room.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/t));
 var i=Math.min(steps.length-1,Math.floor(p*steps.length*0.98));
 if(r.top>innerHeight*.5||r.bottom<0)i=-1===i?i:i;
 if(i!==cur){cur=i;steps.forEach(function(s,k){s.classList.toggle('on',k===i);s.setAttribute('aria-hidden',k!==i)});count.textContent='0'+(i+1)+' / 0'+steps.length}
}
var q=false;addEventListener('scroll',function(){if(!q){q=true;requestAnimationFrame(function(){q=false;tick()})}},{passive:true});addEventListener('resize',tick);
function rmSet(){steps.forEach(function(s){s.removeAttribute('aria-hidden')});if(!rm.matches){cur=-1}tick()}
rm.addEventListener&&rm.addEventListener('change',rmSet);rmSet();
// nav highlight + reveals
var links=$$('a.l'),io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('cur',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(function(s){io.observe(s)});
var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}})},{threshold:.15});
$$('.reveal').forEach(function(el){rv.observe(el)});
})();
