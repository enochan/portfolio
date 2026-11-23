(function(){
 var page=document.querySelector('.compare');
 if(!page||typeof window.GRAPH_ENGINE!=='function')return;
 var host=document.getElementById('graph-host');
 var detail=document.getElementById('detail');
 var status=document.getElementById('graph-status');
 var note=document.getElementById('graph-noscript');
 var keys=document.getElementById('graph-keys');
 var notesBody=document.getElementById('notes-body');
 var notesList=document.getElementById('notes-list');
 var notesEmpty=document.getElementById('notes-empty');
 var notesOpen=document.getElementById('notes-open');
 var notesCopy=document.getElementById('notes-copy');
 var notesStatus=document.getElementById('notes-copy-status');
 if(!host||!detail||!keys)return;
 var STORE='layout-memo';
 var motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
 var engine=null;
 var catalog={};
 var adj={};
 var items=[];
 var keywords=[];
 var model=null;
 var mode='all';
 var selected=null;
 var pointed=null;
 var focused=null;
 var motionStopped=!!motionQuery.matches;
 var sig='';

 function el(tag,cls,text){
  var n=document.createElement(tag);
  if(cls)n.className=cls;
  if(text!=null)n.textContent=text;
  return n;
 }
 function isEn(title){
  return /[A-Za-z]/.test(title)&&!/[\u3040-\u30ff\u4e00-\u9faf]/.test(title);
 }
 function colors(){
  var s=getComputedStyle(document.documentElement);
  function v(name,fb){var x=(s.getPropertyValue(name)||'').trim();return x||fb}
  return {fg:v('--fg','#2b2a33'),sub:v('--sub','#575463'),card:v('--card','#ffffff'),line:v('--line','#a38a66'),bg:v('--bg','#fffaf3'),teal:v('--teal','#17675a')};
 }
 function state(){
  return {selected:selected,mode:mode,motion:!motionStopped,focused:focused,pointed:pointed};
 }
 function visibleIds(){
  var ids=[];
  var seen={};
  function add(id){if(!seen[id]&&catalog[id]){seen[id]=1;ids.push(id)}}
  if(mode==='all')keywords.forEach(function(k){add('kw-'+k.id)});
  else add(selected);
  relatedKeywords(selected).forEach(function(k){add(k.id)});
  relatedItems(selected).forEach(function(it){add(it.id)});
  return ids;
 }
 function relatedKeywords(id){
  var set={};
  (adj[id]||[]).forEach(function(n){if(catalog[n]&&catalog[n].group==='keyword'&&n!==id)set[n]=1});
  return Object.keys(set).map(function(k){return catalog[k]});
 }
 function relatedItems(id){
  if(!catalog[id]||catalog[id].group!=='keyword')return [];
  var raw=catalog[id].raw;
  return items.filter(function(it){return (it.keywords||[]).indexOf(raw)!==-1}).map(function(it){return catalog['it-'+it.id]});
 }
 function hotMap(){
  var hot={};
  function add(id){
   if(!id||!catalog[id])return;
   hot[id]=1;
   (adj[id]||[]).forEach(function(n){if(catalog[n])hot[n]=1});
  }
  add(selected);add(pointed);add(focused);
  return hot;
 }
 window.graphHot=hotMap;
 window.graphShowEdge=function(link,zoom){
  if(zoom>=1.15)return true;
  var a=link.source&&link.source.id?link.source.id:link.source;
  var b=link.target&&link.target.id?link.target.id:link.target;
  return a===selected||b===selected||(pointed&&(a===pointed||b===pointed))||(focused&&(a===focused||b===focused));
 };

 function loadNotes(){
  try{var raw=JSON.parse(localStorage.getItem(STORE)||'[]');return Array.isArray(raw)?raw:[]}catch(e){return []}
 }
 function saveNotes(list){
  try{localStorage.setItem(STORE,JSON.stringify(list))}catch(e){}
 }
 function findNote(id){
  return loadNotes().filter(function(n){return n.id===id})[0]||null;
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
 function buttonName(node){
  var parts=[];
  if(node.group==='item')parts.push(node.kindLabel);
  parts.push(node.full);
  if(node.id===selected)parts.push('選択中');
  if(node.id===focused)parts.push('フォーカス');
  parts.push(node.group==='keyword'?'キーワード':'項目');
  return parts.join('、');
 }
 function syncKeys(rebuild){
  var ids=visibleIds();
  if(!focused||ids.indexOf(focused)===-1)focused=selected;
  var same=!rebuild&&keys.childElementCount===ids.length;
  if(same){
   for(var i=0;i<ids.length;i++){if(keys.children[i].dataset.key!==ids[i]){same=false;break}}
  }
  var active=document.activeElement;
  var activeId=active&&active.dataset?active.dataset.key:null;
  if(!same){
   keys.textContent='';
   ids.forEach(function(id){
    var node=catalog[id];
    var b=el('button',null,buttonName(node));
    b.type='button';
    b.dataset.key=id;
    if(node.lang)b.lang=node.lang;
    b.tabIndex=id===focused?0:-1;
    if(node.group==='keyword')b.setAttribute('aria-pressed',id===selected?'true':'false');
    b.addEventListener('focus',function(){
     if(focused===id)return;
     focused=id;
     paintKeys();
     if(engine&&engine.paint)engine.paint();
    });
    b.addEventListener('keydown',function(ev){
     if((ev.key==='Enter'||ev.key===' ')&&node.group==='keyword'){
      ev.preventDefault();
      choose(id,false);
     }else if(ev.key==='ArrowRight'||ev.key==='ArrowLeft'||ev.key==='ArrowDown'||ev.key==='ArrowUp'){
      ev.preventDefault();
      moveFocus(id,ev.key);
     }
    });
    keys.appendChild(b);
   });
   if(activeId){
    var again=keys.querySelector('[data-key="'+activeId.replace(/"/g,'')+'"]');
    if(again&&active&&active.dataset&&active.dataset.key===activeId)again.focus();
   }
  }
  paintKeys();
 }
 function paintKeys(){
  Array.prototype.forEach.call(keys.children,function(b){
   var id=b.dataset.key;
   var node=catalog[id];
   if(!node)return;
   b.textContent=buttonName(node);
   b.tabIndex=id===focused?0:-1;
   if(node.group==='keyword')b.setAttribute('aria-pressed',id===selected?'true':'false');
  });
 }
 function moveFocus(id,key){
  var pos=engine&&engine.positions?engine.positions():{};
  var here=pos[id];
  if(!here)return;
  var best=null,score=1e12;
  visibleIds().forEach(function(nid){
   if(nid===id||!pos[nid])return;
   var dx=pos[nid].x-here.x,dy=pos[nid].y-here.y;
   if(key==='ArrowRight'&&dx<=4)return;
   if(key==='ArrowLeft'&&dx>=-4)return;
   if(key==='ArrowDown'&&dy<=4)return;
   if(key==='ArrowUp'&&dy>=-4)return;
   var dist=dx*dx+dy*dy;
   if(dist<score){score=dist;best=nid}
  });
   if(!best)return;
  focused=best;
  paintKeys();
  if(engine&&engine.paint)engine.paint();
  var btn=keys.querySelector('[data-key="'+best.replace(/"/g,'')+'"]');
  if(btn)btn.focus();
 }
 function paintPanel(fromList){
  var cur=catalog[selected];
  if(!cur)return;
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
    var info=model.edgeInfo(cur.raw,k.raw);
    li.appendChild(el('span',info.provisional?'rel-label is-provisional':'rel-label',info.label));
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
   var info=model.edgeInfo(cur.raw,it.raw);
   meta.appendChild(el('span',info.provisional?'rel-label is-provisional':'rel-label',info.label));
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
  if(fromList&&page.getAttribute('data-view')!=='graph')detail.focus();
 }
 function applyGraph(force){
  if(!engine)return;
  var next=mode+'|'+selected+'|'+(motionStopped?1:0)+'|'+visibleIds().join(',');
  if(force||next!==sig){
   sig=next;
   engine.refresh();
   syncKeys(true);
  }else if(engine.paint){
   engine.paint();
   syncKeys(false);
  }
 }
 function choose(id,fromList){
  if(!catalog[id]||catalog[id].group!=='keyword')return;
  selected=id;
  pointed=null;
  focused=id;
  paintPanel(fromList);
  applyGraph(true);
  if(engine.focusOn)engine.focusOn(id);
 }
 function applyMotionButton(){
  var btn=document.getElementById('motion-stop');
  host.setAttribute('data-motion',motionStopped?'off':'on');
  if(!btn)return;
  btn.setAttribute('aria-pressed',motionStopped?'true':'false');
  btn.textContent=motionStopped?'動きを止めています':'動きを止める';
 }
 function showGraph(){
  page.setAttribute('data-view','graph');
  document.getElementById('to-graph').setAttribute('aria-pressed','true');
  document.getElementById('to-list').setAttribute('aria-pressed','false');
  if(engine&&engine.resize)engine.resize();
  applyGraph(true);
 }
 function wireList(){
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
   var h3=sec.querySelector('h3');
   if(h3)h3.after(bar);
   sec.querySelectorAll('.item-title').forEach(function(title){
    var name=title.textContent.replace(/\s+/g,' ').trim();
    var it=items.filter(function(x){return x.title===name})[0];
    if(!it)return;
    var p=el('p','row');
    p.appendChild(memoButton(catalog['it-'+it.id]));
    title.after(p);
   });
  });
 }

 fetch('../keywords.json',{cache:'no-cache'})
  .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
  .then(build)
  .catch(function(e){
   console.error(e);
   if(status)status.textContent='キーワードのデータを表示できませんでした。下の一覧で同じ内容を読めます。';
   page.setAttribute('data-view','list');
  });

 function build(data){
  if(note)note.hidden=true;
  keywords=data.keywords||[];
  items=(data.items||[]).filter(function(it){return it&&it.id&&it.title});
  var kwBy={};
  keywords.forEach(function(k){kwBy[k.id]=k});
  var count={};
  keywords.forEach(function(k){count[k.id]=0});
  items.forEach(function(it){(it.keywords||[]).forEach(function(k){if(count[k]!=null)count[k]++})});
  var center=keywords.slice().sort(function(a,b){return (count[b.id]||0)-(count[a.id]||0)})[0];
  if(!center)return;
  keywords.forEach(function(k){
   catalog['kw-'+k.id]={id:'kw-'+k.id,raw:k.id,group:'keyword',kind:'keyword',full:k.label,kindLabel:'キーワード',lang:k.lang||null};
  });
  items.forEach(function(it){
   catalog['it-'+it.id]={id:'it-'+it.id,raw:it.id,group:'item',kind:it.kind,full:it.title,kindLabel:it.kindLabel||it.kind,lang:isEn(it.title)?'en':null,href:it.href||'',note:it.note||'',dateLabel:it.dateLabel||'',number:it.number||'',keywords:it.keywords||[]};
  });
  var labelBy={};
  (data.edges||[]).forEach(function(e){
   labelBy[e.from+'|'+e.to]=e;
   labelBy[e.to+'|'+e.from]=e;
  });
  function edgeInfo(a,b){return labelBy[a+'|'+b]||{label:'仮',provisional:true}}
  var links=[];
  var seen={};
  keywords.forEach(function(k){adj['kw-'+k.id]=[]});
  items.forEach(function(it){
   var id='it-'+it.id;
   adj[id]=[];
   var ks=(it.keywords||[]).filter(function(k){return kwBy[k]});
   ks.forEach(function(k){
    adj['kw-'+k].push(id);
    adj[id].push('kw-'+k);
    var info=edgeInfo(k,it.id);
    links.push({source:'kw-'+k,target:id,label:info.label,provisional:!!info.provisional,item:true});
   });
   for(var i=0;i<ks.length;i++)for(var j=i+1;j<ks.length;j++){
    var a=ks[i],b=ks[j];
    if(a>b){var t=a;a=b;b=t}
    var key=a+'|'+b;
    if(seen[key])continue;
    seen[key]=1;
    var info=edgeInfo(a,b);
    links.push({source:'kw-'+a,target:'kw-'+b,label:info.label,provisional:!!info.provisional,item:false});
    adj['kw-'+a].push('kw-'+b);
    adj['kw-'+b].push('kw-'+a);
   }
  });
  selected='kw-'+center.id;
  focused=selected;
  model={catalog:catalog,adj:adj,links:links,keywords:keywords,items:items,edgeInfo:edgeInfo,centerId:selected};
  var ctx={
   host:host,
   model:model,
   state:state,
   colors:colors,
   visibleIds:visibleIds,
   onSelect:function(id){choose(id,false)},
   onHover:function(id){
    if(pointed===id)return;
    pointed=id||null;
    if(engine&&engine.paint)engine.paint();
    paintKeys();
   },
   onReady:function(){window.__graphReady=true;window.__settled=true}
  };
  engine=window.GRAPH_ENGINE(ctx);
  window.__engine=page.getAttribute('data-engine');
  wireList();
  renderNotes();
  applyMotionButton();
  paintPanel(false);
  page.setAttribute('data-view','graph');
  applyGraph(true);
  if(engine.focusOn)engine.focusOn(selected);

  document.getElementById('to-near').addEventListener('click',function(){
   mode='near';
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-all').setAttribute('aria-pressed','false');
   applyGraph(true);
  });
  document.getElementById('to-all').addEventListener('click',function(){
   mode='all';
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-near').setAttribute('aria-pressed','false');
   applyGraph(true);
  });
  document.getElementById('to-near').setAttribute('aria-pressed','false');
  document.getElementById('to-all').setAttribute('aria-pressed','true');
  document.getElementById('to-graph').addEventListener('click',showGraph);
  document.getElementById('to-list').addEventListener('click',function(){
   page.setAttribute('data-view','list');
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-graph').setAttribute('aria-pressed','false');
   if(engine&&engine.pause)engine.pause();
  });
  document.getElementById('to-fit').addEventListener('click',function(){if(engine&&engine.fit)engine.fit()});
  document.getElementById('to-in').addEventListener('click',function(){if(engine&&engine.zoomBy)engine.zoomBy(1.25)});
  document.getElementById('to-out').addEventListener('click',function(){if(engine&&engine.zoomBy)engine.zoomBy(0.8)});
  document.getElementById('motion-stop').addEventListener('click',function(){
   motionStopped=!motionStopped;
   applyMotionButton();
   if(engine&&engine.setMotion)engine.setMotion(!motionStopped);
   applyGraph(true);
  });
  if(typeof motionQuery.addEventListener==='function'){
   motionQuery.addEventListener('change',function(){
    motionStopped=!!motionQuery.matches;
    applyMotionButton();
    if(engine&&engine.setMotion)engine.setMotion(!motionStopped);
    applyGraph(true);
   });
  }
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
  var resizeTimer=0;
  window.addEventListener('resize',function(){
   clearTimeout(resizeTimer);
   resizeTimer=setTimeout(function(){if(engine&&engine.resize)engine.resize()},180);
  });
  var themeObs=new MutationObserver(function(){if(engine&&engine.paint)engine.paint()});
  themeObs.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 }
})();
