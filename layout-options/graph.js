(function(){
 var page=document.querySelector('.netpage');
 if(!page)return;
 var dyn=document.getElementById('dyn');
 var err=document.getElementById('net-error');
 var rulesBody=document.getElementById('rules-body');

 function el(tag,cls,text){
  var n=document.createElement(tag);
  if(cls)n.className=cls;
  if(text!=null)n.textContent=text;
  return n;
 }
 function isEn(title){
  return /[A-Za-z]/.test(title)&&!/[\u3040-\u30ff\u4e00-\u9faf]/.test(title);
 }
 function fillRules(data){
  if(!rulesBody)return;
  rulesBody.textContent='';
  var ol=el('ol');
  (data.rules||[]).forEach(function(r){ol.appendChild(el('li',null,r))});
  rulesBody.appendChild(ol);
  if(data.omitted&&data.omitted.length){
   rulesBody.appendChild(el('p','subhead','キーワードにしなかったもの'));
   var ul=el('ul');
   data.omitted.forEach(function(r){ul.appendChild(el('li',null,r))});
   rulesBody.appendChild(ul);
  }
 }
 function itemCard(it){
  var li=el('li');
  li.dataset.type=it.kind;
  li.dataset.item=it.id;
  li.dataset.kws=(it.keywords||[]).join(' ');
  var ev=el('div','ev');
  var meta=el('p','meta');
  meta.appendChild(el('span','badge',it.kindLabel||it.kind));
  if(it.number)meta.appendChild(el('span','when',it.number));
  else if(it.date){
   var time=el('time',null,it.dateLabel||it.date);
   time.setAttribute('datetime',it.date);
   meta.appendChild(time);
  }
  if(it.reviewed)meta.appendChild(el('span','rev','査読あり'));
  ev.appendChild(meta);
  var title=el('p','item-title');
  if(isEn(it.title))title.lang='en';
  if(it.href){
   var a=el('a',null,it.title);
   a.href=it.href;
   title.appendChild(a);
  }else title.textContent=it.title;
  ev.appendChild(title);
  if(it.note)ev.appendChild(el('p','w',it.note));
  li.appendChild(ev);
  return li;
 }

 fetch('keywords.json',{cache:'no-cache'})
  .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
  .then(function(data){
   if(!data||!Array.isArray(data.keywords)||!Array.isArray(data.items))throw new Error('形が違います');
   fillRules(data);
   build(data);
  })
  .catch(function(e){
   console.error(e);
   if(err)err.textContent='キーワードのデータを表示できませんでした。下の一覧は、書き出した控えです。';
   page.classList.add('fallback-show');
  });

 function build(data){
  var items=data.items.filter(function(it){return it&&it.id&&it.title&&it.keywords&&it.keywords.length});
  var count={};
  data.keywords.forEach(function(k){count[k.id]=0});
  items.forEach(function(it){it.keywords.forEach(function(k){if(count[k]==null)count[k]=0;count[k]++})});
  var keywords=data.keywords.slice().sort(function(a,b){
   var d=(count[b.id]||0)-(count[a.id]||0);
   if(d)return d;
   return a.label.localeCompare(b.label,'ja');
  });
  var byId={};
  keywords.forEach(function(k){byId[k.id]=k});

  var edges=[];
  var seen={};
  items.forEach(function(it){
   var ks=it.keywords.filter(function(k){return byId[k]});
   for(var i=0;i<ks.length;i++)for(var j=i+1;j<ks.length;j++){
    var a=ks[i],b=ks[j];
    if(a>b){var t=a;a=b;b=t}
    var key=a+'|'+b;
    if(!seen[key]){seen[key]=1;edges.push([a,b])}
   }
  });

  dyn.textContent='';
  var switcher=el('div','switch');
  switcher.setAttribute('role','group');
  switcher.setAttribute('aria-label','表示の切り替え');
  var btnG=el('button',null,'グラフ');
  var btnL=el('button',null,'一覧');
  btnG.type='button';btnL.type='button';
  btnG.id='to-graph';btnL.id='to-list';
  btnG.setAttribute('aria-pressed','true');
  btnL.setAttribute('aria-pressed','false');
  switcher.appendChild(btnG);switcher.appendChild(btnL);

  var graphView=el('div');
  graphView.id='graph-view';
  graphView.appendChild(el('h2',null,'グラフ'));
  var help=el('p','legend','キーワードを選ぶと、関連する項目が横（狭い画面では下）に出ます。選んでいるキーワードは太い実線の枠、同じ項目でつながるキーワードは実線の枠、それ以外は破線の枠です。線も同じで、選んでいるつながりは実線、それ以外は破線です。');
  help.id='graph-help';
  graphView.appendChild(help);

  var layoutBox=el('div','net-layout');
  var canvas=el('div','net');
  canvas.id='net';
  canvas.setAttribute('role','group');
  canvas.setAttribute('aria-label','キーワード');
  canvas.setAttribute('aria-describedby','graph-help');
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('aria-hidden','true');
  svg.classList.add('net-svg');
  canvas.appendChild(svg);
  var graphOrder=keywords.slice();
  var hubAt=graphOrder.findIndex(function(k){return k.id==='ai'});
  if(hubAt>=0){
   var hub=graphOrder.splice(hubAt,1)[0];
   graphOrder.splice(Math.floor(graphOrder.length/2),0,hub);
  }
  var nodes=[];
  graphOrder.forEach(function(k){
   var a=el('a','net-node');
   a.href='#list-'+k.id;
   a.dataset.id=k.id;
   if(k.lang)a.lang=k.lang;
   var name=el('span','net-label',k.label);
   if(k.lang)name.lang=k.lang;
   a.appendChild(name);
   a.appendChild(el('span','net-n',(count[k.id]||0)+'件'));
   a.addEventListener('click',function(e){e.preventDefault();select(k.id)});
   canvas.appendChild(a);
   nodes.push(a);
  });
  var lines=edges.map(function(e){
   var line=document.createElementNS('http://www.w3.org/2000/svg','line');
   line.dataset.a=e[0];line.dataset.b=e[1];
   svg.appendChild(line);
   return line;
  });

  var picked=el('div','picked');
  picked.id='picked';
  var pickedH=el('h2');
  pickedH.id='picked-h';
  var status=el('p','live');
  status.id='pick-status';
  status.setAttribute('aria-live','polite');
  var pickedList=el('ul','kw-items');
  picked.appendChild(pickedH);picked.appendChild(status);picked.appendChild(pickedList);
  layoutBox.appendChild(canvas);layoutBox.appendChild(picked);
  graphView.appendChild(layoutBox);

  var listView=el('div');
  listView.id='list-view';
  listView.hidden=true;
  listView.appendChild(el('h2',null,'一覧'));
  listView.appendChild(el('p',null,'キーワードから、関連する項目をたどれます。グラフと同じつながりです。'));
  keywords.forEach(function(k){
   var sec=el('section','kw-block');
   sec.id='list-'+k.id;
   sec.dataset.label=k.label;
   if(k.lang)sec.lang=k.lang;
   var h=el('h3',null,k.label);
   if(k.lang)h.lang=k.lang;
   sec.appendChild(h);
   sec.appendChild(el('p','meta',(count[k.id]||0)+'件'));
   var ul=el('ul','kw-items');
   items.forEach(function(it){if(it.keywords.indexOf(k.id)!==-1)ul.appendChild(itemCard(it))});
   sec.appendChild(ul);
   listView.appendChild(sec);
  });

  dyn.appendChild(switcher);
  dyn.appendChild(graphView);
  dyn.appendChild(listView);

  function show(view){
   var graphOn=view!=='list';
   graphView.hidden=!graphOn;
   listView.hidden=graphOn;
   btnG.setAttribute('aria-pressed',graphOn?'true':'false');
   btnL.setAttribute('aria-pressed',graphOn?'false':'true');
   if(graphOn)layout();
  }
  btnG.addEventListener('click',function(){show('graph');btnG.focus()});
  btnL.addEventListener('click',function(){show('list');btnL.focus()});

  var current=null;
  function select(id){
   current=id;
   var kw=byId[id];
   if(!kw)return;
   var linked={};
   edges.forEach(function(e){
    if(e[0]===id)linked[e[1]]=1;
    if(e[1]===id)linked[e[0]]=1;
   });
   nodes.forEach(function(n){
    var on=n.dataset.id===id;
    n.classList.toggle('on',!!linked[n.dataset.id]);
    if(on)n.setAttribute('aria-current','true');
    else n.removeAttribute('aria-current');
   });
   lines.forEach(function(line){
    line.classList.toggle('on',line.dataset.a===id||line.dataset.b===id);
   });
   pickedH.textContent=kw.label;
   if(kw.lang)pickedH.lang=kw.lang;else pickedH.removeAttribute('lang');
   pickedList.textContent='';
   var n=0;
   items.forEach(function(it){
    if(it.keywords.indexOf(id)===-1)return;
    pickedList.appendChild(itemCard(it));
    n++;
   });
   status.textContent=kw.label+'。関連は'+n+'件です。';
  }

  function layout(){
   if(graphView.hidden)return;
   var width=canvas.clientWidth;
   var height=canvas.offsetHeight;
   if(width<48||height<20)return;
   var origin=canvas.getBoundingClientRect();
   var pos={};
   nodes.forEach(function(n){
    var r=n.getBoundingClientRect();
    pos[n.dataset.id]={x:r.left+r.width/2-origin.left,y:r.top+r.height/2-origin.top};
   });
   svg.setAttribute('viewBox','0 0 '+width+' '+height);
   svg.style.width=width+'px';
   svg.style.height=height+'px';
   lines.forEach(function(line){
    var a=pos[line.dataset.a],b=pos[line.dataset.b];
    if(!a||!b)return;
    line.setAttribute('x1',a.x);
    line.setAttribute('y1',a.y);
    line.setAttribute('x2',b.x);
    line.setAttribute('y2',b.y);
   });
   canvas.classList.add('is-laid');
  }

  var timer=0;
  window.addEventListener('resize',function(){
   clearTimeout(timer);
   timer=setTimeout(layout,150);
  });
  show('graph');
  select('ai');
  function settle(){layout();if(current)select(current)}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(settle);
  requestAnimationFrame(settle);
 }
})();
