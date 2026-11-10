(function(){
var $=function(s,c){return(c||document).querySelector(s)};
// pins
var board=$('#board'),dlg=$('#pd'),PINS=window.PINS||[],cur=0,last=null;
if(board&&dlg){
 if(/debug=pins/.test(location.search))board.classList.add('debug');
 PINS.forEach(function(p,i){var b=document.createElement('button');b.className='pin';b.type='button';b.dataset.id=p.id;b.setAttribute('aria-label','View inspiration: '+p.alt);b.style.cssText='left:'+p.x+'%;top:'+p.y+'%;width:'+p.w+'%;height:'+p.h+'%';b.addEventListener('click',function(){last=b;show(i);lock(true);dlg.showModal()});board.appendChild(b)});
 function show(i){cur=(i+PINS.length)%PINS.length;var p=PINS[cur],im=$('#pdimg');im.src='images/'+p.image+'.jpg';im.alt=p.alt;$('#pdnote').textContent=p.note}
 function lock(on){document.body.style.overflow=on?'hidden':''}
 function close(){dlg.close()}
 dlg.addEventListener('close',function(){lock(false);if(last)last.focus({preventScroll:true})});
 $('.x',dlg).addEventListener('click',close);$('.pv',dlg).addEventListener('click',function(){show(cur-1)});$('.nx',dlg).addEventListener('click',function(){show(cur+1)});
 dlg.addEventListener('click',function(e){if(e.target===dlg)close()});
 dlg.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
 var sx=null;dlg.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});dlg.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d<0?1:-1));sx=null});
}
})();
// project viewer: opens projects inside the page so the background music never restarts
(function(){
var pv=document.getElementById('pv'),box=document.getElementById('pvmain'),SP=window.SalmaProject;
if(!pv||!SP)return;
var opener=null,isOpen=false;SP.bindZoom(box);
function render(slug){var r=SP.html(slug);if(!r)return false;box.innerHTML=r.html;pv.scrollTop=0;document.title=r.name+' | Salma Ibrahim';return true}
function open(slug,from){
 if(!render(slug))return false;
 if(!isOpen){opener=from||null;isOpen=true;pv.hidden=false;document.body.style.overflow='hidden';
  try{history.pushState({pv:slug},'','#project-'+slug)}catch(e){}
  pv.querySelector('.pview-back').focus({preventScroll:true})}
 else{try{history.replaceState({pv:slug},'','#project-'+slug)}catch(e){}}
 return true}
function hide(){if(!isOpen)return;isOpen=false;pv.hidden=true;box.innerHTML='';document.body.style.overflow='';document.title='Salma Ibrahim | Interior Design Portfolio';
 if(opener){try{opener.focus({preventScroll:true})}catch(e){}}}
function close(){if(history.state&&history.state.pv){history.back()}else hide()}
addEventListener('popstate',function(){if(isOpen&&!(history.state&&history.state.pv))hide();else if(!isOpen&&history.state&&history.state.pv)open(history.state.pv)});
document.addEventListener('click',function(e){
 if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
 var h=a.getAttribute('href'),m=h.match(/^project\.html\?project=([^&]+)$/);
 if(m&&(isOpen||a.closest('#projects'))){if(open(m[1],a))e.preventDefault();return}
 if(isOpen&&h==='index.html#projects'){e.preventDefault();close()}
});
pv.querySelector('.pview-back').addEventListener('click',close);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&isOpen&&!document.querySelector('dialog[open]'))close()});
var m=location.hash.match(/^#project-(.+)$/);if(m){try{history.replaceState({pv:m[1]},'',location.hash)}catch(e){}open(m[1])}
})();
