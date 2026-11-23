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
 var motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');

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
 function shortTitle(str){
  if(!str||str.length<=12)return str||'';
  return str.slice(0,11)+'…';
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
 function shapePath(kind,r){
  function pts(arr){
   return arr.map(function(p,i){return (i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('')+'Z';
  }
  if(kind==='paper')return pts([[0,-r],[r,0],[0,r],[-r,0]]);
  if(kind==='patent'){
   var h=[];
   for(var i=0;i<6;i++){var a=-Math.PI/2+i*Math.PI/3;h.push([Math.cos(a)*r,Math.sin(a)*r]);}
   return pts(h);
  }
  if(kind==='award'){
   var s=[];
   for(var j=0;j<5;j++){var b=-Math.PI/2+j*2*Math.PI/5;s.push([Math.cos(b)*r,Math.sin(b)*r]);}
   return pts(s);
  }
  if(kind==='career')return pts([[0,-r],[r*0.95,r*0.82],[-r*0.95,r*0.82]]);
  if(kind==='layer'){
   var rx=r*1.35,ry=r*0.72;
   return 'M'+rx+',0 A'+rx+','+ry+' 0 1,1 '+(-rx)+',0 A'+rx+','+ry+' 0 1,1 '+rx+',0Z';
  }
  if(kind==='book')return pts([[-r*0.68,-r*1.15],[r*0.68,-r*1.15],[r*0.68,r*1.15],[-r*0.68,r*1.15]]);
  if(kind==='write')return pts([[-r*1.3,-r*0.68],[r*1.3,-r*0.68],[r*1.3,r*0.68],[-r*1.3,r*0.68]]);
  if(kind==='talk'){
   var w=r*1.22,hh=r*0.7,rad=6;
   return 'M'+(-w+rad)+','+(-hh)+' H'+(w-rad)+' Q'+w+','+(-hh)+' '+w+','+(-hh+rad)+' V'+(hh-rad)+' Q'+w+','+hh+' '+(w-rad)+','+hh+' H'+(-w+rad)+' Q'+(-w)+','+hh+' '+(-w)+','+(hh-rad)+' V'+(-hh+rad)+' Q'+(-w)+','+(-hh)+' '+(-w+rad)+','+(-hh)+'Z';
  }
  return 'M'+r+',0 A'+r+','+r+' 0 1,1 '+(-r)+',0 A'+r+','+r+' 0 1,1 '+r+',0Z';
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

  var labelBy={};
  (data.edges||[]).forEach(function(e){
   labelBy[e.from+'|'+e.to]=e;
   labelBy[e.to+'|'+e.from]=e;
  });
  function edgeInfo(a,b){
   return labelBy[a+'|'+b]||{label:'仮',provisional:true};
  }
  var kwLinks=[];
  var itemLinks=[];
  var seen={};
  var adj={};
  keywords.forEach(function(k){adj['kw-'+k.id]=[]});
  items.forEach(function(it){
   var id='it-'+it.id;
   adj[id]=[];
   var ks=(it.keywords||[]).filter(function(k){return kwBy[k]});
   ks.forEach(function(k){
    adj['kw-'+k].push(id);
    adj[id].push('kw-'+k);
    var info=edgeInfo(k,it.id);
    itemLinks.push({source:'kw-'+k,target:id,label:info.label,provisional:!!info.provisional});
   });
   for(var i=0;i<ks.length;i++)for(var j=i+1;j<ks.length;j++){
    var a=ks[i],b=ks[j];
    if(a>b){var t=a;a=b;b=t}
    var key=a+'|'+b;
    if(seen[key])continue;
    seen[key]=1;
    var info=edgeInfo(a,b);
    kwLinks.push({source:'kw-'+a,target:'kw-'+b,label:info.label,provisional:!!info.provisional});
    adj['kw-'+a].push('kw-'+b);
    adj['kw-'+b].push('kw-'+a);
   }
  });

  var mode='all';
  var selected='kw-'+center.id;
  var pointed=null;
  var motionStopped=!!motionQuery.matches;
  var nodeBy={};
  var nodes=[];
  var links=[];
  var width=320,height=360;
  var svg=d3.select(host).append('svg').attr('class','force-svg').attr('role','group').attr('aria-label','キーワードと実績');
  svg.append('rect').attr('class','zoom-bg').attr('fill','transparent');
  var world=svg.append('g').attr('class','world');
  var linkG=world.append('g');
  var labelG=world.append('g').attr('class','edge-labels');
  var nodeG=world.append('g');
  var linkSel=linkG.selectAll('line');
  var labelSel=labelG.selectAll('g');
  var nodeSel=nodeG.selectAll('g');
  var zoomK=1;

  var zoom=d3.zoom().scaleExtent([0.28,2.8]).filter(function(event){
   if(event.type==='dblclick')return false;
   if(event.type==='wheel')return true;
   var tgt=event.target;
   if(tgt&&tgt.closest&&tgt.closest('.force-node'))return false;
   return true;
  }).on('zoom',function(event){
   var prev=zoomK>=1.15;
   zoomK=event.transform.k;
   world.attr('transform',event.transform);
   if(prev!==(zoomK>=1.15))paintLabels();
   else placeLabels();
  });
  svg.call(zoom);

  var drag=d3.drag().on('start',function(event,d){
   if(motionStopped)return;
   d._dragged=false;
  }).on('drag',function(event,d){
   if(motionStopped)return;
   if(!d._dragged){
    d._dragged=true;
    if(!event.active)sim.alphaTarget(0.38).restart();
   }
   d.fx=event.x;
   d.fy=event.y;
  }).on('end',function(event,d){
   if(motionStopped||!d._dragged)return;
   d._dragged=false;
   if(!event.active)sim.alphaTarget(0);
   d.fx=null;
   d.fy=null;
   if(sim.alpha()<0.28)sim.alpha(0.28).restart();
  });

  var sim=d3.forceSimulation()
   .force('link',d3.forceLink().id(function(d){return d.id}).distance(function(d){return d.item?132:104}).strength(0.55))
   .force('charge',d3.forceManyBody().strength(-150))
   .force('x',d3.forceX(function(d){return d.tx}).strength(function(d){return d.pull||0.05}))
   .force('y',d3.forceY(function(d){return d.ty}).strength(function(d){return d.pull||0.05}))
   .force('collide',d3.forceCollide().radius(function(d){return d.hit}).iterations(3).strength(1))
   .alphaDecay(0.032)
   .velocityDecay(0.38)
   .on('tick',place)
   .on('end',function(){window.__graphReady=true;window.__settled=true});

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
  function visibleIds(){
   var ids=[];
   var seenId={};
   function add(id){if(!seenId[id]&&catalog[id]){seenId[id]=1;ids.push(id)}}
   if(mode==='all')keywords.forEach(function(k){add('kw-'+k.id)});
   else add(selected);
   relatedKeywords(selected).forEach(function(k){add(k.id)});
   relatedItems(selected).forEach(function(it){add(it.id)});
   return ids;
  }
  function makeNode(id){
   var base=catalog[id];
   var line1=base.group==='keyword'?base.full:base.kindLabel;
   var line2=base.group==='keyword'?'選択中':shortTitle(base.full);
   var w=Math.max(textWidth(line1),textWidth(line2));
   var r=base.group==='keyword'?16:15;
   return {id:id,full:base.full,group:base.group,kind:base.kind,kindLabel:base.kindLabel,lang:base.lang,r:r,hit:Math.max(r+40,w/2+16),tx:width/2,ty:height/2,pull:0.05};
  }
  function ensure(id){
   if(nodeBy[id])return nodeBy[id];
   var n=makeNode(id);
   var hub=nodeBy[selected];
   var spin=Object.keys(nodeBy).length+1;
   if(hub&&hub.x!=null){
    n.x=hub.x+Math.cos(spin)*28;
    n.y=hub.y+Math.sin(spin)*28;
   }
   nodeBy[id]=n;
   return n;
  }
  function measure(){
   width=Math.max(280,host.clientWidth||320);
   height=Math.max(240,host.clientHeight||360);
   svg.attr('viewBox','0 0 '+width+' '+height);
   svg.select('.zoom-bg').attr('width',width).attr('height',height);
  }
  function viewCenter(){
   var t=d3.zoomTransform(svg.node());
   return [t.invertX(width/2),t.invertY(height/2)];
  }
  function layoutTargets(){
   var c=viewCenter();
   var relK=relatedKeywords(selected);
   var relI=relatedItems(selected);
   var relSet={};
   relSet[selected]=1;
   relK.forEach(function(k){relSet[k.id]=1});
   relI.forEach(function(it){relSet[it.id]=1});
   var others=nodes.filter(function(n){return !relSet[n.id]});
   var hub=nodeBy[selected];
   if(hub){hub.tx=c[0];hub.ty=c[1];hub.pull=0.28}
   relK.forEach(function(k,i){
    var n=nodeBy[k.id];if(!n)return;
    var a=-Math.PI/2+i*2*Math.PI/Math.max(relK.length,1);
    n.tx=c[0]+Math.cos(a)*168;
    n.ty=c[1]+Math.sin(a)*150;
    n.pull=0.08;
   });
   relI.forEach(function(it,i){
    var n=nodeBy[it.id];if(!n)return;
    var a=i*2*Math.PI/Math.max(relI.length,1)+0.2;
    n.tx=c[0]+Math.cos(a)*248;
    n.ty=c[1]+Math.sin(a)*210;
    n.pull=0.07;
   });
   others.forEach(function(n,i){
    var a=-Math.PI/2+i*2*Math.PI/Math.max(others.length,1);
    n.tx=c[0]+Math.cos(a)*620;
    n.ty=c[1]+Math.sin(a)*460;
    n.pull=0.03;
   });
  }
  function syncVisible(){
   var ids=visibleIds();
   var keep={};
   ids.forEach(function(id){keep[id]=1});
   Object.keys(nodeBy).forEach(function(id){if(!keep[id])delete nodeBy[id]});
   nodes=ids.map(ensure);
   layoutTargets();
   nodes.forEach(function(n){if(n.x==null){n.x=n.tx;n.y=n.ty}});
   var idset={};
   nodes.forEach(function(n){idset[n.id]=1});
   links=kwLinks.concat(itemLinks).filter(function(l){return idset[l.source]&&idset[l.target]}).map(function(l){
    return {source:l.source,target:l.target,item:String(l.source).indexOf('it-')===0||String(l.target).indexOf('it-')===0,label:l.label||'仮',provisional:!!l.provisional};
   });
   sim.nodes(nodes);
   sim.force('link').links(links);
   bind();
  }
  function neighborhood(id){
   var set={};
   if(!id)return set;
   set[id]=1;
   (adj[id]||[]).forEach(function(n){if(nodeBy[n])set[n]=1});
   return set;
  }
  function bind(){
   linkSel=linkSel.data(links,function(d){return (d.source.id||d.source)+'|'+(d.target.id||d.target)});
   linkSel.exit().remove();
   linkSel=linkSel.enter().append('line').merge(linkSel);
   nodeSel=nodeSel.data(nodes,function(d){return d.id});
   nodeSel.exit().remove();
   var enter=nodeSel.enter().append('g').attr('class','force-node').attr('tabindex','0')
    .on('click',function(event,d){
     if(d._dragged)return;
     if(d.group==='keyword')choose(d.id,false);
    })
    .on('keydown',function(event,d){
     if((event.key==='Enter'||event.key===' ')&&d.group==='keyword'){event.preventDefault();choose(d.id,false)}
     else if(/^Arrow/.test(event.key)){event.preventDefault();moveFocus(d,event.key)}
    })
    .on('pointerenter',function(event,d){pointed=d.id;paintClasses()})
    .on('pointerleave',function(){pointedFromFocus();paintClasses()})
    .on('focus',function(event,d){pointed=d.id;paintClasses()})
    .on('blur',function(){pointedFromFocus();paintClasses()});
   enter.append('path').attr('class','plate');
   enter.append('text').attr('class','nameline').attr('text-anchor','middle');
   enter.append('text').attr('class','pick').attr('text-anchor','middle');
   enter.call(drag);
   nodeSel=enter.merge(nodeSel);
   nodeSel.attr('data-id',function(d){return d.id})
    .attr('role',function(d){return d.group==='keyword'?'button':'group'});
   nodeSel.select('.plate').attr('d',function(d){return shapePath(d.kind,d.r)});
   nodeSel.select('.nameline')
    .text(function(d){return d.group==='keyword'?d.full:d.kindLabel})
    .attr('y',function(d){return d.r+16})
    .attr('lang',function(d){return d.group==='keyword'?(d.lang||null):null});
   nodeSel.select('.pick')
    .attr('y',function(d){return d.r+32})
    .attr('lang',function(d){return d.group==='item'?(d.lang||null):null});
   paintClasses();
  }
  function pointedFromFocus(){
   var a=document.activeElement;
   var id=a&&a.getAttribute&&a.getAttribute('data-id');
   pointed=id&&nodeBy[id]?id:null;
  }
  function paintClasses(){
   var hub=pointed||selected;
   var near=neighborhood(hub);
   nodeSel
    .classed('is-on',function(d){return d.id===selected})
    .classed('is-hot',function(d){return d.id!==selected&&!!near[d.id]})
    .classed('is-dim',function(d){return d.id!==selected&&!near[d.id]})
    .attr('aria-pressed',function(d){return d.group==='keyword'?(d.id===selected?'true':'false'):null})
    .attr('aria-label',function(d){
     if(d.group==='keyword')return d.full+(d.id===selected?'選択中':'')+'、キーワード';
     return d.kindLabel+shortTitle(d.full)+'、'+d.full;
    });
   nodeSel.select('.pick').text(function(d){
    if(d.group==='keyword')return d.id===selected?'選択中':'';
    return shortTitle(d.full);
   });
   linkSel.attr('class',function(d){
    var a=d.source.id||d.source,b=d.target.id||d.target;
    if(a===hub||b===hub)return 'is-hot';
    if(near[a]&&near[b])return '';
    return 'is-dim';
   });
   paintLabels();
  }
  function labelVisible(l){
   if(zoomK>=1.15)return true;
   var a=l.source.id||l.source,b=l.target.id||l.target;
   if(a===selected||b===selected)return true;
   if(pointed&&(a===pointed||b===pointed))return true;
   return false;
  }
  function paintLabels(){
   var shown=links.filter(labelVisible);
   labelSel=labelSel.data(shown,function(d){return (d.source.id||d.source)+'|'+(d.target.id||d.target)});
   labelSel.exit().remove();
   var enter=labelSel.enter().append('g').attr('class','edge-label').attr('pointer-events','none');
   enter.append('rect');
   enter.append('text');
   labelSel=enter.merge(labelSel);
   labelSel.classed('is-provisional',function(d){return !!d.provisional});
   labelSel.select('text').text(function(d){return d.label||'仮'}).attr('text-anchor','middle').attr('y',5);
   labelSel.select('rect').attr('x',function(d){return -(textWidth(d.label||'仮')+16)/2})
    .attr('y',-12).attr('width',function(d){return textWidth(d.label||'仮')+16}).attr('height',24).attr('rx',12);
   placeLabels();
  }
  function placeLabels(){
   labelSel.attr('transform',function(d){
    if(!d.source||d.source.x==null||!d.target||d.target.x==null)return null;
    return 'translate('+((d.source.x+d.target.x)/2)+','+((d.source.y+d.target.y)/2)+')';
   });
  }
  function place(){
   linkSel
    .attr('x1',function(d){return d.source.x}).attr('y1',function(d){return d.source.y})
    .attr('x2',function(d){return d.target.x}).attr('y2',function(d){return d.target.y});
   nodeSel.attr('transform',function(d){return 'translate('+d.x+','+d.y+')'});
   placeLabels();
  }
  function settleNow(){
   sim.stop();
   for(var i=0;i<380;i++)sim.tick();
   place();
   paintClasses();
   window.__graphReady=true;
   window.__settled=true;
  }
  function wake(){
   window.__settled=false;
   sim.alpha(0.92).alphaTarget(0).restart();
  }
  function moveFocus(d,key){
   var best=null,score=1e12;
   nodes.forEach(function(n){
    if(n.id===d.id||n.x==null)return;
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
  function fitAll(){
   if(!nodes.length)return;
   var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
   nodes.forEach(function(n){
    minX=Math.min(minX,n.x-n.hit);
    minY=Math.min(minY,n.y-n.hit);
    maxX=Math.max(maxX,n.x+n.hit);
    maxY=Math.max(maxY,n.y+n.hit);
   });
   var dx=Math.max(80,maxX-minX),dy=Math.max(80,maxY-minY);
   var scale=Math.min(8,width/dx,height/dy)*0.9;
   scale=Math.max(0.28,Math.min(2.8,scale));
   var tx=width/2-scale*(minX+maxX)/2;
   var ty=height/2-scale*(minY+maxY)/2;
   var t=d3.zoomIdentity.translate(tx,ty).scale(scale);
   if(motionStopped)svg.call(zoom.transform,t);
   else svg.transition().duration(480).call(zoom.transform,t);
  }
  function zoomBy(k){
   if(motionStopped)svg.call(zoom.scaleBy,k);
   else svg.transition().duration(180).call(zoom.scaleBy,k);
  }
  function applyMotionButton(){
   var btn=document.getElementById('motion-stop');
   host.setAttribute('data-motion',motionStopped?'off':'on');
   if(!btn)return;
   btn.setAttribute('aria-pressed',motionStopped?'true':'false');
   btn.textContent=motionStopped?'動きを止めています':'動きを止める';
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
     var info=edgeInfo(cur.raw,k.raw);
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
    var info=edgeInfo(cur.raw,it.raw);
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
  function choose(id,fromList){
   if(!catalog[id]||catalog[id].group!=='keyword')return;
   selected=id;
   pointed=null;
   syncVisible();
   paintPanel(fromList);
   if(motionStopped)settleNow();
   else wake();
  }
  function showGraph(){
   page.setAttribute('data-view','graph');
   document.getElementById('to-graph').setAttribute('aria-pressed','true');
   document.getElementById('to-list').setAttribute('aria-pressed','false');
   measure();
   syncVisible();
   if(motionStopped)settleNow();
   else wake();
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
   syncVisible();
   if(motionStopped)settleNow();else wake();
  });
  document.getElementById('to-all').addEventListener('click',function(){
   mode='all';
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-near').setAttribute('aria-pressed','false');
   syncVisible();
   if(motionStopped)settleNow();else wake();
  });
  document.getElementById('to-near').setAttribute('aria-pressed','false');
  document.getElementById('to-all').setAttribute('aria-pressed','true');
  document.getElementById('to-graph').addEventListener('click',showGraph);
  document.getElementById('to-list').addEventListener('click',function(){
   page.setAttribute('data-view','list');
   this.setAttribute('aria-pressed','true');
   document.getElementById('to-graph').setAttribute('aria-pressed','false');
   sim.stop();
  });
  document.getElementById('to-fit').addEventListener('click',fitAll);
  document.getElementById('to-in').addEventListener('click',function(){zoomBy(1.25)});
  document.getElementById('to-out').addEventListener('click',function(){zoomBy(0.8)});
  document.getElementById('motion-stop').addEventListener('click',function(){
   motionStopped=!motionStopped;
   applyMotionButton();
   if(motionStopped){
    sim.stop();
    sim.alphaTarget(0);
    nodes.forEach(function(n){n.fx=null;n.fy=null});
   }else wake();
  });
  if(typeof motionQuery.addEventListener==='function'){
   motionQuery.addEventListener('change',function(){
    motionStopped=!!motionQuery.matches;
    applyMotionButton();
    if(motionStopped)sim.stop();
    else wake();
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

  page.setAttribute('data-view','graph');
  renderNotes();
  applyMotionButton();
  measure();
  syncVisible();
  paintPanel(false);
  settleNow();
  var resizeTimer=0;
  window.addEventListener('resize',function(){
   clearTimeout(resizeTimer);
   resizeTimer=setTimeout(function(){
    measure();
    layoutTargets();
    if(motionStopped)settleNow();
    else wake();
   },180);
  });
 }
})();
