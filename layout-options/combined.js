(function(){
 var page=document.querySelector('.combo');
 if(!page||typeof d3==='undefined')return;
 var host=document.getElementById('force-host');
 var detail=document.getElementById('detail');
 var status=document.getElementById('graph-status');
 var note=document.getElementById('graph-noscript');
 var notesBody=document.getElementById('notes-body');
 var notesList=document.getElementById('notes-list');
 var notesEmpty=document.getElementById('notes-empty');
 var notesOpen=document.getElementById('notes-open');
 var notesCopy=document.getElementById('notes-copy');
 var notesStatus=document.getElementById('notes-copy-status');
 if(!host||!detail)return;
 var STORE='layout-memo';

 function el(tag,cls,text){
  var n=document.createElement(tag);
  if(cls)n.className=cls;
  if(text!=null)n.textContent=text;
  return n;
 }
 function isEn(title){
  return /[A-Za-z]/.test(title)&&!/[\u3040-\u30ff\u4e00-\u9faf]/.test(title);
 }
 function textWidth(str){
  var w=0;
  for(var i=0;i<str.length;i++)w+=str.charCodeAt(i)<128?8.2:14;
  return w;
 }
 function loadNotes(){
  try{var raw=JSON.parse(localStorage.getItem(STORE)||'[]');return Array.isArray(raw)?raw:[]}catch(e){return []}
 }
 function saveNotes(list){
  try{localStorage.setItem(STORE,JSON.stringify(list))}catch(e){}
 }
 function findNote(id){
  return loadNotes().filter(function(n){return n.id===id})[0]||null;
 }

 fetch('keywords.json',{cache:'no-cache'})
  .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
  .then(build)
  .catch(function(e){
   console.error(e);
   if(status)status.textContent='キーワードのデータを表示できませんでした。下の一覧で同じ内容を読めます。';
   page.setAttribute('data-view','list');
  });

 function build(data){
  if(note)note.hidden=true;
  var keywords=data.keywords||[];
  var items=(data.items||[]).filter(function(it){return it&&it.id&&it.title});
  var kwBy={};
  keywords.forEach(function(k){kwBy[k.id]=k});
  var count={};
  keywords.forEach(function(k){count[k.id]=0});
  items.forEach(function(it){(it.keywords||[]).forEach(function(k){if(count[k]!=null)count[k]++})});
  var center=keywords.slice().sort(function(a,b){return (count[b.id]||0)-(count[a.id]||0)})[0];
  if(!center)return;

  var catalog={};
  keywords.forEach(function(k){
   catalog['kw-'+k.id]={id:'kw-'+k.id,raw:k.id,group:'keyword',kind:'keyword',full:k.label,kindLabel:'キーワード',lang:k.lang||null};
  });
  items.forEach(function(it){
   catalog['it-'+it.id]={id:'it-'+it.id,raw:it.id,group:'item',kind:it.kind,full:it.title,kindLabel:it.kindLabel||it.kind,lang:isEn(it.title)?'en':null,href:it.href||'',note:it.note||'',dateLabel:it.dateLabel||'',number:it.number||'',keywords:it.keywords||[]};
  });

  var kwLinks=[];
  var seen={};
  var adj={};
  keywords.forEach(function(k){adj['kw-'+k.id]=[]});
  items.forEach(function(it){
   var ks=(it.keywords||[]).filter(function(k){return kwBy[k]});
   ks.forEach(function(k){adj['kw-'+k].push('it-'+it.id)});
   for(var i=0;i<ks.length;i++)for(var j=i+1;j<ks.length;j++){
    var a=ks[i],b=ks[j];
    if(a>b){var t=a;a=b;b=t}
    var key=a+'|'+b;
    if(seen[key])continue;
    seen[key]=1;
    kwLinks.push({source:'kw-'+a,target:'kw-'+b});
    adj['kw-'+a].push('kw-'+b);
    adj['kw-'+b].push('kw-'+a);
   }
  });

  var mode='near';
  var selected='kw-'+center.id;
  var nodes=[],links=[];
  var sim=d3.forceSimulation().stop()
   .force('link',d3.forceLink().id(function(d){return d.id}).distance(36).strength(0.15))
   .force('charge',d3.forceManyBody().strength(-40))
   .force('center',d3.forceCenter())
   .force('collide',d3.forceCollide().radius(function(d){return d.hit}).iterations(4))
   .alphaDecay(0.12)
   .on('tick',ticked)
   .on('end',function(){window.__graphReady=true});
  var svg=d3.select(host).append('svg').attr('class','force-svg').attr('role','group').attr('aria-label','キーワード');
  var linkG=svg.append('g');
  var nodeG=svg.append('g');
  var linkSel=linkG.selectAll('line');
  var nodeSel=nodeG.selectAll('g');

  function relatedKeywords(id){
   var set={};
   (adj[id]||[]).forEach(function(n){if(catalog[n]&&catalog[n].group==='keyword'&&n!==id)set[n]=1});
   return Object.keys(set).map(function(k){return catalog[k]});
  }
  function relatedItems(id){
   var raw=catalog[id].raw;
   return items.filter(function(it){return (it.keywords||[]).indexOf(raw)!==-1}).map(function(it){return catalog['it-'+it.id]});
  }
  function visibleIds(){
   if(mode==='all')return keywords.map(function(k){return 'kw-'+k.id});
   var ids=[selected];
   relatedKeywords(selected).forEach(function(k){ids.push(k.id)});
   return ids;
  }

  function rebuild(){
   window.__graphReady=false;
   var keep={};
   nodes.forEach(function(n){if(n.x!=null)keep[n.id]={x:n.x,y:n.y}});
   var width=Math.max(280,host.clientWidth||320);
   var ids=visibleIds();
   nodes=ids.map(function(id,i){
    var base=catalog[id];
    var label=base.full;
    var w=textWidth(label);
    var r=18;
    var hit=Math.max(r+42,w/2+14);
    var n={id:id,full:base.full,kindLabel:base.kindLabel,lang:base.lang,w:w,r:r,hit:hit};
    if(keep[id]){n.x=keep[id].x;n.y=keep[id].y}
    else{
     var ang=-Math.PI/2+i*2*Math.PI/Math.max(ids.length,1);
     n.x=width/2+Math.cos(ang)*Math.min(width,420)*0.28;
     n.y=220+Math.sin(ang)*120;
    }
    return n;
   });
   var area=0;
   nodes.forEach(function(n){area+=(n.hit*2+16)*(n.hit*2+16)});
   var height=Math.max(340,Math.round(area/Math.max(width,1))+40);
   if(nodes.length<4)height=340;
   var cssH=Math.max(280,Math.round(height*(host.clientWidth||width)/width));
   svg.attr('viewBox','0 0 '+width+' '+height).style('width','100%').style('height',cssH+'px');
   var idset={};
   nodes.forEach(function(n){idset[n.id]=1});
   links=kwLinks.filter(function(l){return idset[l.source]&&idset[l.target]}).map(function(l){return {source:l.source,target:l.target}});
   sim.force('center').x(width/2).y(height/2);
   sim.nodes(nodes);
   sim.force('link').links(links);
   sim.alpha(1).stop();
   for(var t=0;t<240;t++)sim.tick();
   paint();
   window.__graphReady=true;
  }
  function ticked(){
   var vb=(svg.attr('viewBox')||'').split(' ');
   var width=+vb[2]||1,height=+vb[3]||1;
   nodes.forEach(function(n){
    n.x=Math.max(n.hit+2,Math.min(width-n.hit-2,n.x));
    n.y=Math.max(n.hit+2,Math.min(height-n.hit-2,n.y));
   });
   paint();
  }
  function paint(){
   var near={};
   near[selected]=1;
   relatedKeywords(selected).forEach(function(k){near[k.id]=1});
   linkSel=linkSel.data(links,function(d){return (d.source.id||d.source)+'|'+(d.target.id||d.target)});
   linkSel.exit().remove();
   linkSel=linkSel.enter().append('line').merge(linkSel);
   linkSel
    .attr('x1',function(d){return d.source.x}).attr('y1',function(d){return d.source.y})
    .attr('x2',function(d){return d.target.x}).attr('y2',function(d){return d.target.y})
    .attr('class',function(d){
     var a=d.source.id,b=d.target.id;
     if(a===selected||b===selected)return 'is-hot';
     if(near[a]&&near[b])return '';
     return 'is-dim';
    });
   nodeSel=nodeSel.data(nodes,function(d){return d.id});
   nodeSel.exit().remove();
   var enter=nodeSel.enter().append('g').attr('class','force-node').attr('tabindex','0').attr('role','button')
    .on('click',function(ev,d){ev.preventDefault();choose(d.id,false)})
    .on('keydown',function(ev,d){
     if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();choose(d.id,false)}
     else if(/^Arrow/.test(ev.key)){ev.preventDefault();moveFocus(d,ev.key)}
    });
   enter.append('circle').attr('class','plate');
   enter.append('text').attr('class','nameline').attr('text-anchor','middle');
   enter.append('text').attr('class','pick').attr('text-anchor','middle');
   nodeSel=enter.merge(nodeSel);
   nodeSel.attr('transform',function(d){return 'translate('+d.x+','+d.y+')'})
    .attr('data-id',function(d){return d.id})
    .attr('aria-label',function(d){return d.full+(d.id===selected?'選択中':'')+'、キーワード'})
    .attr('aria-pressed',function(d){return d.id===selected?'true':'false'})
    .classed('is-on',function(d){return d.id===selected})
    .classed('is-hot',function(d){return !!near[d.id]})
    .classed('is-dim',function(d){return !near[d.id]});
   nodeSel.select('circle').attr('r',function(d){return d.r});
   nodeSel.select('.nameline').text(function(d){return d.full}).attr('y',function(d){return d.r+16})
    .attr('lang',function(d){return d.lang||null});
   nodeSel.select('.pick').text(function(d){return d.id===selected?'選択中':''}).attr('y',function(d){return d.r+32});
  }
  function moveFocus(d,key){
   var best=null,score=1e12;
   nodes.forEach(function(n){
    if(n.id===d.id)return;
    var dx=n.x-d.x,dy=n.y-d.y;
    if(key==='ArrowRight'&&dx<=6)return;
    if(key==='ArrowLeft'&&dx>=-6)return;
    if(key==='ArrowDown'&&dy<=6)return;
    if(key==='ArrowUp'&&dy>=-6)return;
    var dist=dx*dx+dy*dy;
    if(dist<score){score=dist;best=n}
   });
   if(!best)return;
   var g=host.querySelector('[data-id="'+best.id+'"]');
   if(g)g.focus();
  }

  function memoButton(entry){
   var b=el('button','memo-btn');
   b.type='button';
   b.dataset.memo=entry.id;
   b.addEventListener('click',function(){toggleMemo(entry)});
   labelMemo(b);
   return b;
  }
  function labelMemo(b){
   var on=!!findNote(b.dataset.memo);
   b.textContent=on?'メモに残しました':'メモに残す';
   b.setAttribute('aria-pressed',on?'true':'false');
  }
  function refreshMemos(){
   document.querySelectorAll('[data-memo]').forEach(labelMemo);
   renderNotes();
  }
  function toggleMemo(entry){
   var list=loadNotes();
   var i=list.findIndex(function(n){return n.id===entry.id});
   if(i>=0)list.splice(i,1);
   else list.unshift({id:entry.id,title:entry.full,kind:entry.kindLabel,comment:''});
   saveNotes(list);
   refreshMemos();
  }
  function renderNotes(){
   if(!notesList)return;
   var list=loadNotes();
   notesList.textContent='';
   if(notesEmpty)notesEmpty.hidden=list.length>0;
   list.forEach(function(n){
    var li=el('li');
    var head=el('p');
    head.appendChild(el('span','badge',n.kind||''));
    head.appendChild(document.createTextNode(' '+n.title));
    li.appendChild(head);
    var lab=el('label');
    lab.appendChild(document.createTextNode('一言'));
    var input=el('input');
    input.type='text';
    input.value=n.comment||'';
    input.setAttribute('aria-label',n.title+'への一言');
    input.addEventListener('input',function(){
     var cur=loadNotes();
     var hit=cur.filter(function(x){return x.id===n.id})[0];
     if(hit){hit.comment=input.value;saveNotes(cur)}
    });
    lab.appendChild(input);
    li.appendChild(lab);
    var del=el('button',null,'このメモを消す');
    del.type='button';
    del.addEventListener('click',function(){
     saveNotes(loadNotes().filter(function(x){return x.id!==n.id}));
     refreshMemos();
    });
    li.appendChild(del);
    notesList.appendChild(li);
   });
  }
  function notesText(){
   return loadNotes().map(function(n){
    return n.title+'（'+n.kind+'）'+(n.comment?'\n'+n.comment:'');
   }).join('\n\n');
  }

  function paintPanel(fromList){
   var cur=catalog[selected];
   detail.textContent='';
   var h=el('h3',null,cur.full);
   h.id='detail-h';
   if(cur.lang)h.lang=cur.lang;
   detail.appendChild(h);
   var tools=el('p','row');
   tools.appendChild(memoButton(cur));
   detail.appendChild(tools);
   var kws=relatedKeywords(selected);
   detail.appendChild(el('h4',null,'関連するキーワード'));
   if(!kws.length)detail.appendChild(el('p',null,'同じ項目でつながるキーワードは、このデータにはありません。'));
   else{
    var ul=el('ul','rel-keys');
    kws.forEach(function(k){
     var li=el('li');
     var b=el('button',null,k.full);
     b.type='button';
     if(k.lang)b.lang=k.lang;
     b.addEventListener('click',function(){choose(k.id,false)});
     li.appendChild(b);
     ul.appendChild(li);
    });
    detail.appendChild(ul);
   }
   var rel=relatedItems(selected);
   detail.appendChild(el('h4',null,'このキーワードの中身'));
   if(!rel.length)detail.appendChild(el('p',null,'このキーワードに付いた項目は、このデータにはありません。'));
   var list=el('ul','kw-items');
   rel.forEach(function(it){
    var li=el('li');
    li.dataset.type=it.kind;
    var ev=el('div','ev');
    var meta=el('p','meta');
    meta.appendChild(el('span','badge',it.kindLabel));
    if(it.number)meta.appendChild(el('span','when',it.number));
    else if(it.dateLabel)meta.appendChild(el('time',null,it.dateLabel));
    ev.appendChild(meta);
    var title=el('p','item-title');
    if(it.lang)title.lang='en';
    if(it.href){var a=el('a',null,it.full);a.href=it.href;title.appendChild(a)}
    else title.textContent=it.full;
    ev.appendChild(title);
    if(it.note)ev.appendChild(el('p','w',it.note));
    ev.appendChild(memoButton(it));
    li.appendChild(ev);
    list.appendChild(li);
   });
   if(rel.length)detail.appendChild(list);
   if(status)status.textContent=cur.full+'を選んでいます。関連するキーワードは'+kws.length+'件、項目は'+rel.length+'件です。';
   document.querySelectorAll('#list .kw-block').forEach(function(sec){
    var on=sec.id==='s-list-'+cur.raw;
    if(on)sec.setAttribute('aria-current','true');
    else sec.removeAttribute('aria-current');
   });
   if(fromList){
    if(page.getAttribute('data-view')!=='graph')detail.focus();
   }
  }
  function choose(id,fromList){
   if(!catalog[id]||catalog[id].group!=='keyword')return;
   selected=id;
   if(mode==='near')rebuild();
   else paint();
   paintPanel(fromList);
  }

  document.querySelectorAll('#list .kw-block').forEach(function(sec){
   var raw=sec.id.replace(/^s-list-/,'');
   var entry=catalog['kw-'+raw];
   if(!entry)return;
   var bar=el('p','row');
   var see=el('button','textbtn','このキーワードを見る');
   see.type='button';
   see.addEventListener('click',function(){choose(entry.id,true)});
   bar.appendChild(see);
   bar.appendChild(memoButton(entry));
   sec.querySelector('h3').after(bar);
   sec.querySelectorAll('.item-title').forEach(function(title){
    var name=title.textContent.replace(/\s+/g,' ').trim();
    var it=items.filter(function(x){return x.title===name})[0];
    if(!it)return;
    var p=el('p','row');
    p.appendChild(memoButton(catalog['it-'+it.id]));
    title.after(p);
   });
  });

  document.getElementById('to-near').addEventListener('click',function(){
   mode='near';
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-all').setAttribute('aria-pressed','false');
   rebuild();
   paintPanel(false);
  });
  document.getElementById('to-all').addEventListener('click',function(){
   mode='all';
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-near').setAttribute('aria-pressed','false');
   rebuild();
   paintPanel(false);
  });
  document.getElementById('to-graph').addEventListener('click',function(){
   page.setAttribute('data-view','graph');
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-list').setAttribute('aria-pressed','false');
   rebuild();
   paintPanel(false);
  });
  document.getElementById('to-list').addEventListener('click',function(){
   page.setAttribute('data-view','list');
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-graph').setAttribute('aria-pressed','false');
  });
  if(notesOpen)notesOpen.addEventListener('click',function(){
   var open=notesBody.hidden;
   notesBody.hidden=!open;
   notesOpen.setAttribute('aria-expanded',open?'true':'false');
   notesOpen.textContent=open?'メモを閉じる':'メモを見る';
  });
  if(notesCopy)notesCopy.addEventListener('click',function(){
   var text=notesText();
   if(!text){if(notesStatus)notesStatus.textContent='コピーするメモはまだありません。';return}
   function done(){if(notesStatus)notesStatus.textContent='メモをテキストとしてコピーしました。'}
   if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(function(){fallbackCopy(text,done)});
   }else fallbackCopy(text,done);
  });
  function fallbackCopy(text,done){
   var ta=el('textarea');
   ta.value=text;
   ta.setAttribute('aria-label','コピーするメモ');
   detail.appendChild(ta);
   ta.select();
   try{document.execCommand('copy');done()}catch(e){if(notesStatus)notesStatus.textContent='コピーできませんでした。メモの文字を選択してコピーしてください。'}
   ta.remove();
  }

  page.setAttribute('data-view','graph');
  renderNotes();
  var resizeTimer=0;
  window.addEventListener('resize',function(){
   clearTimeout(resizeTimer);
   resizeTimer=setTimeout(rebuild,200);
  });
  rebuild();
  paintPanel(false);
 }
})();
