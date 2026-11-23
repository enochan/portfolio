(function(){
 if(typeof ForceGraph!=='function')return;
 function idOf(x){return x&&x.id?x.id:x}
 function shortTitle(str){
  if(!str||str.length<=12)return str||'';
  return str.slice(0,11)+'…';
 }
 function hash(str){
  var h=2166136261;
  var s=String(str||'');
  for(var i=0;i<s.length;i++){
   h^=s.charCodeAt(i);
   h=Math.imul(h,16777619);
  }
  return h>>>0;
 }
 function forcedColors(){
  try{return matchMedia('(forced-colors: active)').matches}catch(e){return false}
 }
 function curveOf(link){
  var h=hash(idOf(link.source)+'|'+idOf(link.target));
  var mag=0.18+(h%6)*0.025;
  return (h&1)?mag:-mag;
 }
 function controlPoint(ax,ay,bx,by,curv){
  var dx=bx-ax,dy=by-ay;
  var len=Math.hypot(dx,dy)||1;
  var ang=Math.atan2(dy,dx);
  var off=len*curv;
  return {
   x:(ax+bx)/2+off*Math.cos(ang-Math.PI/2),
   y:(ay+by)/2+off*Math.sin(ang-Math.PI/2)
  };
 }
 function curveAt(ax,ay,bx,by,curv,t){
  var c=controlPoint(ax,ay,bx,by,curv);
  var u=1-t;
  return {
   x:u*u*ax+2*u*t*c.x+t*t*bx,
   y:u*u*ay+2*u*t*c.y+t*t*by,
   cx:c.x,
   cy:c.y
  };
 }
 function labelAnchor(a,b,mode,selected){
  var curv=curveOf({source:a,target:b});
  if(mode!=='direct')return curveAt(a.x,a.y,b.x,b.y,curv,0.5);
  var hub=idOf(a)===selected?a:(idOf(b)===selected?b:null);
  var outer=hub===a?b:(hub===b?a:null);
  if(!hub||!outer||hub.x==null||outer.x==null)return curveAt(a.x,a.y,b.x,b.y,curv,0.5);
  var best=null,bestScore=1e9;
  for(var i=1;i<20;i++){
   var t=i/20;
   var p=curveAt(a.x,a.y,b.x,b.y,curv,t);
   var dHub=Math.hypot(p.x-hub.x,p.y-hub.y);
   var dOut=Math.hypot(p.x-outer.x,p.y-outer.y);
   if(dHub<58||dOut<40)continue;
   var score=Math.abs(dHub/(dHub+dOut)-0.62);
   if(score<bestScore){bestScore=score;best=p}
  }
  return best;
 }
 function traceBlob(ctx,x,y,r,seed,time){
  var steps=36;
  ctx.beginPath();
  for(var i=0;i<=steps;i++){
   var a=i/steps*Math.PI*2;
   var wob=1+0.055*Math.sin(a*3+seed)+0.03*Math.sin(a*5-seed*1.4+time*0.8);
   var px=x+Math.cos(a)*r*wob;
   var py=y+Math.sin(a)*r*wob;
   if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py);
  }
  ctx.closePath();
 }
 window.GRAPH_ENGINE=function(ctx){
  var host=ctx.host;
  var nodeBy={};
  var nodes=[];
  var followUntil=0;
  var dragged=false;
  var booted=false;
  var laidFor=null;
  var Graph=ForceGraph()(host)
   .width(host.clientWidth||320)
   .height(host.clientHeight||360)
   .backgroundColor(ctx.colors().bg)
   .nodeId('id')
   .nodeLabel(function(){return ''})
   .autoPauseRedraw(true)
   .enableNodeDrag(!!ctx.state().motion)
   .enableZoomInteraction(true)
   .enablePanInteraction(true)
   .minZoom(0.3)
   .maxZoom(3.2)
   .warmupTicks(0)
   .cooldownTicks(1e15)
   .cooldownTime(ctx.state().motion?1e12:0)
   .d3AlphaDecay(0.06)
   .d3VelocityDecay(0.45)
   .nodeCanvasObjectMode(function(){return 'replace'})
   .nodeCanvasObject(drawNode)
   .nodePointerAreaPaint(function(node,color,c){
    c.fillStyle=color;
    c.beginPath();
    c.arc(node.x,node.y,(node.group==='keyword'?30:34),0,Math.PI*2);
    c.fill();
   })
   .linkCurvature(curveOf)
   .linkColor(function(){return 'rgba(0,0,0,0)'})
   .linkWidth(0.01)
   .linkCanvasObjectMode(function(){return 'replace'})
   .linkCanvasObject(drawLink)
   .linkDirectionalParticles(particleCount)
   .linkDirectionalParticleWidth(6)
   .linkDirectionalParticleSpeed(particleSpeed)
   .linkDirectionalParticleColor(function(){
    return forcedColors()?'CanvasText':ctx.colors().accent||'#b4441f';
   })
   .onNodeHover(function(node){ctx.onHover(node?node.id:null)})
   .onNodeClick(function(node){
    if(dragged){dragged=false;return}
    if(node&&node.group==='keyword')ctx.onSelect(node.id);
   })
   .onNodeDrag(function(){
    if(!ctx.state().motion)return;
    dragged=true;
    followUntil=0;
    setAlpha(0.2);
   })
   .onNodeDragEnd(function(node){
    if(!ctx.state().motion){
     node.fx=node.x;node.fy=node.y;return;
    }
    node.fx=null;node.fy=null;
    node.homeX=node.x;node.homeY=node.y;
    setAlpha(0.03);
   })
   .onEngineStop(function(){ctx.onReady()})
   .onRenderFramePre(function(){
    if(!ctx.state().motion)clearParticles();
    planLabels();
    publishState();
    if(followUntil&&performance.now()<followUntil){
     var n=nodeBy[ctx.state().selected];
     if(n&&n.x!=null)Graph.centerAt(n.x,n.y,0);
    }
   })
   .onZoom(function(){planLabels()});
  if(typeof Graph.d3AlphaTarget==='function')Graph.d3AlphaTarget(ctx.state().motion?0.03:0);
  Graph.d3Force('drift',function(){
   if(!ctx.state().motion)return;
   var t=performance.now()/1000;
   nodes.forEach(function(n,i){
    if(n.x==null||n.fx!=null)return;
    if(n.homeX==null){n.homeX=n.x;n.homeY=n.y}
    var phase=i*1.9;
    var ox=Math.cos(t*0.62+phase)*12;
    var oy=Math.sin(t*0.48+phase*1.15)*9;
    n.vx+=(n.homeX+ox-n.x)*0.42;
    n.vy+=(n.homeY+oy-n.y)*0.42;
   });
  });
  function edgeHot(l){return window.graphShowEdge(l)}
  function organicLinePx(hot){
   // 共有の太さは、選んだ線 3・それ以外 1.7。細い線は 1.2・0.55。
   // 有機的な版だけ、その約 3 分の 2 にする。細い線はさらに一段下げる。
   if(ctx.state().labelMode==='thin')return hot?0.8:0.45;
   return hot?2:1.15;
  }
  function channel(hex,i){return parseInt(String(hex||'').replace('#','').slice(i,i+2),16)||0}
  function relLum(hex){
   function lin(c){c=c/255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)}
   return 0.2126*lin(channel(hex,0))+0.7152*lin(channel(hex,2))+0.0722*lin(channel(hex,4));
  }
  function dimStroke(col){
   // 明るい背景の --line は 3.17:1 で、1px 未満だと背景に溶ける。
   // 同じ系統の濃い茶（#fffaf3 に対して 5.3:1）にする。暗い背景の --line はそのまま。
   var bg=col.bg||'#fffaf3';
   if(relLum(bg)>0.4)return '#7d6544';
   return col.line;
  }
  function setAlpha(v){
   if(typeof Graph.d3AlphaTarget==='function')Graph.d3AlphaTarget(v);
  }
  function particleCount(l){
   if(!ctx.state().motion)return 0;
   var s=idOf(l.source),t=idOf(l.target),sel=ctx.state().selected;
   return s===sel||t===sel?2:0;
  }
  function particleSpeed(l){
   var s=idOf(l.source),t=idOf(l.target),sel=ctx.state().selected;
   if(t===sel&&s!==sel)return -0.0035;
   return 0.0035;
  }
  function clearParticles(){
   (Graph.graphData().links||[]).forEach(function(l){if(l.__photons)delete l.__photons});
  }
  function publishState(){
   var count=0;
   (Graph.graphData().links||[]).forEach(function(l){
    if(l.__photons)count+=l.__photons.length;
   });
   window.__organicState={
    motion:!!ctx.state().motion,
    particles:count,
    curved:true
   };
  }
  function drawNode(node,c,globalScale){
   if(node.x==null)return;
   var st=ctx.state();
   var col=ctx.colors();
   var hot=window.graphHot();
   var dim=!hot[node.id];
   var z=globalScale||1;
   var motion=!!st.motion;
   var time=motion?performance.now()/1000:0;
   var seed=hash(node.id)%628/100;
   var base=node.group==='keyword'?18:16;
   var breath=motion?1+0.045*Math.sin(time*1.15+seed):1;
   var r=base*breath;
   var system=forcedColors();
   var halo=node.group==='keyword'?(col.teal||'#17675a'):(col.accent||'#b4441f');
   c.save();
   if(!system){
    traceBlob(c,node.x,node.y,r*1.42,seed,time);
    c.globalAlpha=0.22;
    c.fillStyle=halo;
    c.fill();
    c.globalAlpha=1;
   }
   traceBlob(c,node.x,node.y,r,seed,time);
   c.fillStyle=system?'Canvas':col.card;
   c.fill();
   c.lineWidth=((node.id===st.selected?4.5:dim?2:3.25))/z;
   c.strokeStyle=system?'CanvasText':(dim?col.line:col.fg);
   c.setLineDash(dim?[5/z,4/z]:[]);
   c.lineJoin='round';
   c.stroke();
   if(node.id!==st.selected){
    c.beginPath();
    c.arc(node.x,node.y,r*0.34,0,Math.PI*2);
    c.fillStyle=system?'CanvasText':(node.group==='keyword'?col.mint||col.teal:col.peach||col.accent);
    c.globalAlpha=system?1:0.95;
    c.fill();
    c.globalAlpha=1;
    c.lineWidth=1.5/z;
    c.strokeStyle=system?'CanvasText':col.fg;
    c.setLineDash([]);
    c.stroke();
   }
   if(node.id===st.focused){
    c.setLineDash([]);
    c.beginPath();
    c.arc(node.x,node.y,r+8/z,0,Math.PI*2);
    c.strokeStyle=system?'Highlight':col.teal;
    c.lineWidth=3/z;
    c.stroke();
   }
   var size=14/z;
   c.font='700 '+size+'px "Zen Maru Gothic","Hiragino Maru Gothic ProN",sans-serif';
   c.textBaseline='middle';
   c.fillStyle=system?'CanvasText':col.fg;
   c.setLineDash([]);
   var hub=nodeBy[st.selected];
   var line1=node.group==='keyword'?node.full:node.kindLabel;
   var line2=node.group==='keyword'?(node.id===st.selected?'選択中':''):shortTitle(node.full);
   var line3=node.id===st.focused?'フォーカス':'';
   var gap=size*1.15;
   var lines=[line1,line2,line3].filter(Boolean);
   if(!hub||node.id===st.selected){
    c.textAlign='center';
    var shift0=(lines.length-1)*gap/2;
    lines.forEach(function(text,i){c.fillText(text,node.x,node.y+i*gap-shift0)});
   }else{
    var out=window.graphOutward(node.x,node.y,hub.x,hub.y);
    c.textAlign=out.x>0.35?'left':out.x<-0.35?'right':'center';
    var ox=out.x*(r+10/z),oy=out.y*(r+10/z);
    lines.forEach(function(text,i){
     c.fillText(text,node.x+ox+out.x*i*gap,node.y+oy+out.y*i*gap);
    });
   }
   c.restore();
  }
  function drawLink(link,c,globalScale){
   var a=link.source,b=link.target;
   if(!a||a.x==null||!b||b.x==null)return;
   var z=globalScale||1;
   var hot=edgeHot(link);
   var col=ctx.colors();
   var system=forcedColors();
   var ctrl=controlPoint(a.x,a.y,b.x,b.y,curveOf(link));
   c.save();
   c.beginPath();
   c.moveTo(a.x,a.y);
   c.quadraticCurveTo(ctrl.x,ctrl.y,b.x,b.y);
   c.strokeStyle=system?'CanvasText':(hot?col.fg:dimStroke(col));
   c.lineWidth=organicLinePx(hot)/z;
   c.lineCap='round';
   c.setLineDash(hot?[]:[5/z,4/z]);
   c.stroke();
   c.restore();
   var key=idOf(a)+'|'+idOf(b);
   var stNow=ctx.state();
   var mid=labelAnchor(a,b,stNow.labelMode,stNow.selected);
   if(mid&&window.__edgeShow&&window.__edgeShow[key]){
    window.graphDrawEdgeLabel(c,mid.x,mid.y,window.graphReadableAngle(b.x-a.x,b.y-a.y),link.label,link.provisional,1/z);
   }
  }
  function syncNodes(){
   var ids=ctx.visibleIds();
   var keep={};
   ids.forEach(function(id){keep[id]=1});
   Object.keys(nodeBy).forEach(function(id){if(!keep[id])delete nodeBy[id]});
   nodes=ids.map(function(id){
    if(!nodeBy[id]){
     var b=ctx.model.catalog[id];
     nodeBy[id]={id:id,group:b.group,kind:b.kind,full:b.full,kindLabel:b.kindLabel,lang:b.lang};
    }
    return nodeBy[id];
   });
  }
  function linkData(){
   var have={};
   nodes.forEach(function(n){have[n.id]=1});
   return ctx.model.links.filter(function(l){return have[l.source]&&have[l.target]}).map(function(l){
    return {source:l.source,target:l.target,label:l.label,provisional:l.provisional};
   });
  }
  function tune(){
   var link=Graph.d3Force('link');
   if(link){
    link.distance(180).strength(0.02);
   }
   var charge=Graph.d3Force('charge');
   if(charge)charge.strength(-8);
  }
  function frameStill(){
   var hub=nodeBy[ctx.state().selected];
   var scale=window.graphFrameScale(host.clientWidth||320,host.clientHeight||360);
   Graph.zoom(scale,0);
   Graph.centerAt(hub&&hub.x!=null?hub.x:0,hub&&hub.y!=null?hub.y:0,0);
  }
  function placeRing(fix){
   var sel=ctx.state().selected;
   var pos=window.graphLayout(nodes.map(function(n){return n.id}),sel);
   nodes.forEach(function(n){
    var p=pos[n.id];
    if(!p)return;
    var j=(hash(n.id)%9)-4;
    n.x=p.x+j;
    n.y=p.y+((hash(n.id+'y')%9)-4);
    n.homeX=n.x;n.homeY=n.y;
    if(fix){n.fx=n.x;n.fy=n.y}else{n.fx=null;n.fy=null}
   });
  }
  function planLabels(){
   var z=Graph.zoom()||1;
   var edges=[];
   (Graph.graphData().links||[]).forEach(function(l){
    var a=l.source,b=l.target;
    if(!a||a.x==null||!b||b.x==null)return;
    var st=ctx.state();
    var mid=labelAnchor(a,b,st.labelMode,st.selected);
    if(!mid)return;
    edges.push({
     key:idOf(a)+'|'+idOf(b),
     source:idOf(a),
     target:idOf(b),
     label:l.label,
     x1:a.x,y1:a.y,x2:b.x,y2:b.y,
     mx:mid.x,my:mid.y
    });
   });
   window.__edgeShow=window.graphPickLabels(edges,z);
  }
  function poke(){
   var c=Graph.centerAt();
   if(c&&c.x!=null&&!(followUntil&&performance.now()<followUntil))Graph.centerAt(c.x,c.y,0);
   planLabels();
   publishState();
  }
  var canvas=host.querySelector('canvas');
  if(canvas)canvas.setAttribute('aria-hidden','true');
  return {
   refresh:function(){
    var st=ctx.state();
    syncNodes();
    var relayout=laidFor!==st.selected||nodes.some(function(n){return n.x==null});
    if(relayout)placeRing(!st.motion);
    Graph.graphData({nodes:nodes,links:linkData()});
    tune();
    Graph.backgroundColor(ctx.colors().bg);
    if(!st.motion){
     Graph.enableNodeDrag(false);
     Graph.autoPauseRedraw(true);
     nodes.forEach(function(n){if(n.x!=null){n.fx=n.x;n.fy=n.y}});
     setAlpha(0);
     Graph.cooldownTime(0);
     clearParticles();
     if(relayout)frameStill();
     laidFor=st.selected;
    }else{
     Graph.enableNodeDrag(true);
     Graph.autoPauseRedraw(false);
     nodes.forEach(function(n){n.fx=null;n.fy=null});
     Graph.cooldownTime(1e12);
     Graph.cooldownTicks(1e15);
     setAlpha(0.03);
     if(booted&&typeof Graph.d3ReheatSimulation==='function'&&relayout)Graph.d3ReheatSimulation();
     booted=true;
     laidFor=st.selected;
     if(relayout)frameStill();
    }
    planLabels();
    publishState();
    if(!st.motion)ctx.onReady();
   },
   paint:function(){poke()},
   resize:function(){
    Graph.width(host.clientWidth||320).height(host.clientHeight||360);
    if(!ctx.state().motion)frameStill();
    poke();
   },
   fit:function(){
    followUntil=0;
    Graph.zoomToFit(ctx.state().motion?650:0,48);
   },
   zoomBy:function(k){
    var z=Graph.zoom()||1;
    Graph.zoom(Math.max(0.3,Math.min(3.2,z*k)),ctx.state().motion?280:0);
   },
   positions:function(){
    var out={};
    nodes.forEach(function(n){if(n.x!=null)out[n.id]={x:n.x,y:n.y}});
    return out;
   },
   focusOn:function(id){
    var n=nodeBy[id];
    if(!n||n.x==null)return;
    if(ctx.state().motion){
     followUntil=performance.now()+900;
     frameStill();
    }else{
     followUntil=0;
     frameStill();
    }
   },
   setMotion:function(on){
    Graph.enableNodeDrag(!!on);
    Graph.autoPauseRedraw(!on);
    if(!on){
     followUntil=0;
     setAlpha(0);
     Graph.cooldownTime(0);
     nodes.forEach(function(n){if(n.x!=null){n.fx=n.x;n.fy=n.y;n.homeX=n.x;n.homeY=n.y}});
     clearParticles();
     poke();
    }else{
     nodes.forEach(function(n){n.fx=null;n.fy=null});
     Graph.cooldownTime(1e12);
     setAlpha(0.03);
     if(typeof Graph.d3ReheatSimulation==='function')Graph.d3ReheatSimulation();
    }
   },
   pause:function(){
    followUntil=0;
    setAlpha(0);
    Graph.cooldownTime(0);
    clearParticles();
   }
  };
 };
})();
