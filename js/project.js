(function(){
// Shared project renderer: used by project.html directly and by the in-page project viewer on index.html
var P=window.PROJECTS||[];
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function pic(s,w,h,alt,size,lazy){return '<picture><source type="image/webp" srcset="images/p/'+s+'-1600.webp"'+(size?' sizes="'+size+'"':'')+'><img src="images/p/'+s+'-1600.jpg" width="'+w+'" height="'+h+'" alt="'+esc(alt)+'"'+(lazy?' loading="lazy"':'')+' onerror="var q=this.parentNode;if(q&&!this.dataset.r){this.dataset.r=1;[].slice.call(q.querySelectorAll(\'source\')).forEach(function(e){e.remove()});var u=this.getAttribute(\'src\');this.removeAttribute(\'src\');this.src=u+(u.indexOf(\'?\')<0?\'?r=\'+Date.now():\'\')}"></picture>'}
function html(slug){
 var i=P.findIndex(function(p){return p.slug===slug});if(i<0)return null;
 var p=P[i],n=P[(i+1)%P.length];
 var h='<div class="lead">'+pic(p.lead.src,p.lead.w,p.lead.h,p.name+', lead image','100vw')+'</div><div class="head"><p class="eyebrow">'+esc(p.category)+' · '+esc(p.year)+(p.tag?' · '+esc(p.tag):'')+'</p><h1>'+esc(p.name)+'</h1><hr class="rule"><div class="desc">'+p.description.map(function(d){return '<p>'+esc(d)+'</p>'}).join('')+'</div></div>';
 p.images.forEach(function(im,k){var alt=p.name+(im.title?', '+im.title:', image '+(k+1));
  h+='<figure>'+pic(im.src,im.w,im.h,alt,'(max-width:1280px) 100vw, 1280px',true)+'</figure>'});
 h+='<div class="ft"><a class="btn" href="index.html#projects">Back to the gallery wall</a><a class="btn fill" href="project.html?project='+n.slug+'">Next project: '+esc(n.name)+' →</a></div>';
 return {html:h,name:p.name};
}
var zoomBound=false;
function bindZoom(root){
 var z=document.getElementById('zoom');if(!z)return;var zi=z.querySelector('img');
 root.addEventListener('click',function(e){var t=e.target;if(t.tagName==='IMG'&&t.closest('figure')){zi.src=t.currentSrc||t.src;zi.alt=t.alt;z.showModal()}});
 if(!zoomBound){zoomBound=true;z.addEventListener('click',function(){z.close()})}
}
window.SalmaProject={html:html,bindZoom:bindZoom};
var m=document.querySelector('main.pp');
if(m){
 var slug=(location.search.match(/project=([^&]+)/)||[])[1],r=html(slug);
 if(!r){m.innerHTML='<p style="text-align:center;padding:4rem 1rem">Project not found. <a href="index.html#projects">Back to the gallery wall</a></p>'}
 else{document.title=r.name+' | Salma Ibrahim';m.innerHTML=r.html;bindZoom(m)}
}
})();
