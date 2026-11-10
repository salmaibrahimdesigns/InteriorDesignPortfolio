(function(){
// Quiet background music with a one-tap on/off button. Starts only after the visitor's first tap or key press
// (browsers block sound before that). The choice and playback position carry over to project pages.
var VOL=.18,KEY='salma-music',a=new Audio('audio/amberlight.mp3');
a.loop=true;a.preload='none';a.volume=0;
var st={};try{st=JSON.parse(sessionStorage.getItem(KEY)||'{}')}catch(e){}
var b=document.createElement('button');b.type='button';b.className='music';
b.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path class="w" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/><path class="x" d="M16 9.5l5 5M21 9.5l-5 5"/></svg><span class="t"></span>';
document.body.appendChild(b);
var playing=false,fade=null;
function ui(){b.classList.toggle('on',playing);b.setAttribute('aria-pressed',playing);b.setAttribute('aria-label',playing?'Mute background music':'Play background music');b.querySelector('.t').textContent=playing?'Music on':'Music off'}
function ramp(to,done){clearInterval(fade);fade=setInterval(function(){var d=to-a.volume;if(Math.abs(d)<.012){a.volume=to;clearInterval(fade);done&&done()}else a.volume=Math.max(0,Math.min(1,a.volume+(d>0?.012:-.012)))},60)}
function save(){try{sessionStorage.setItem(KEY,JSON.stringify({on:playing,t:a.currentTime||0}))}catch(e){}}
function play(){if(st.t&&!play.seeked){try{a.currentTime=st.t}catch(e){}play.seeked=1}
 var r=a.play();playing=true;ui();ramp(VOL);
 if(r&&r.catch)r.catch(function(){playing=false;ui()})}
function pause(){playing=false;ui();ramp(0,function(){a.pause();save()});save()}
b.addEventListener('click',function(e){e.stopPropagation();armed=false;playing?pause():play();save()});
// first interaction starts it (unless the visitor muted it earlier this visit)
var armed=st.on!==false;
function first(e){if(!armed||b.contains(e.target))return;armed=false;remove();play();save()}
function remove(){['pointerdown','keydown','touchend'].forEach(function(ev){document.removeEventListener(ev,first,true)})}
['pointerdown','keydown','touchend'].forEach(function(ev){document.addEventListener(ev,first,true)});
addEventListener('pagehide',save);setInterval(function(){if(playing)save()},4000);
document.addEventListener('visibilitychange',function(){if(document.hidden&&playing){a.pause()}else if(!document.hidden&&playing){a.play().catch(function(){})}});
ui();
})();
