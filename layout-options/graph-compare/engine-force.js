(function(){
 if(typeof ForceGraph!=='function')return;
 function idOf(x){return x&&x.id?x.id:x}
 function shortTitle(str){
  if(!str||str.length<=12)return str||'';
  return str.slice(0,11)+'…';
 }
 function roundRect(ctx,x,y,w,h,r){
  var rad=Math.min(r,w/2,h/2);
  ctx.beginPath();
  ctx.moveTo(x+rad,y);
  ctx.arcTo(x+w,y,x+w,y+h,rad);
  ctx.arcTo(x+w,y+h,x,y+h,rad);
  ctx.arcTo(x,y+h,x,y,rad);
  ctx.arcTo(x,y,x+w,y,rad);
  ctx.closePath();
 }
 function traceShape(ctx,kind,x,y,r){
  ctx.beginPath();
  if(kind==='paper'){
   ctx.moveTo(x,y-r);ctx.lineTo(x+r,y);ctx.lineTo(x,y+r);ctx.lineTo(x-r,y);ctx.closePath();return;
  }
  if(kind==='patent'){
   for(var i=0;i<6;i++){
    var a=-Math.PI/2+i*Math.PI/3;
    var px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;
    if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py);
   }
   ctx.closePath();return;
  }
  if(kind==='award'){
   for(var j=0;j<5;j++){
    var b=-Math.PI/2+j*2*Math.PI/5;
    var qx=x+Math.cos(b)*r,qy=y+Math.sin(b)*r;
    if(j)ctx.lineTo(qx,qy);else ctx.moveTo(qx,qy);
   }
   ctx.closePath();return;
  }
  if(kind==='career'){
   ctx.moveTo(x,y-r);ctx.lineTo(x+r*0.95,y+r*0.82);ctx.lineTo(x-r*0.95,y+r*0.82);ctx.closePath();return;
  }
  if(kind==='layer'){ctx.ellipse(x,y,r*1.35,r*0.72,0,0,Math.PI*2);return}
  if(kind==='book'){ctx.rect(x-r*0.68,y-r*1.15,r*1.36,r*2.3);return}
  if(kind==='write'){ctx.rect(x-r*1.3,y-r*0.68,r*2.6,r*1.36);return}
  if(kind==='talk'){roundRect(ctx,x-r*1.22,y-r*0.7,r*2.44,r*1.4,Math.min(8,r*0.4));return}
  ctx.arc(x,y,r,0,Math.PI*2);
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
   .warmupTicks(ctx.state().motion?24:140)
   .cooldownTime(ctx.state().motion?12000:0)
   .d3AlphaDecay(0.035)
   .d3VelocityDecay(0.42)
   .nodeCanvasObjectMode(function(){return 'replace'})
   .nodeCanvasObject(drawNode)
   .nodePointerAreaPaint(function(node,color,c){
    c.fillStyle=color;
    c.beginPath();
    c.arc(node.x,node.y,(node.group==='keyword'?28:36),0,Math.PI*2);
    c.fill();
   })
   .linkColor(function(l){return edgeHot(l)?ctx.colors().fg:ctx.colors().line})
   .linkWidth(function(l){return window.graphLinePx(edgeHot(l))})
   .linkLineDash(function(l){
    if(edgeHot(l))return null;
    var z=Graph.zoom()||1;
    return [4/z,3/z];
   })
   .linkCanvasObjectMode(function(l){
    var key=idOf(l.source)+'|'+idOf(l.target);
    return window.__edgeShow&&window.__edgeShow[key]?'after':undefined;
   })
   .linkCanvasObject(drawLinkLabel)
   .linkDirectionalParticles(function(l){
    if(!ctx.state().motion)return 0;
    var s=ctx.state().selected;
    return idOf(l.source)===s||idOf(l.target)===s?1:0;
   })
   .linkDirectionalParticleWidth(1.5)
   .linkDirectionalParticleSpeed(0.004)
   .linkDirectionalParticleColor(function(){return ctx.colors().teal})
   .onNodeHover(function(node){ctx.onHover(node?node.id:null)})
   .onNodeClick(function(node){
    if(dragged){dragged=false;return}
    if(node&&node.group==='keyword')ctx.onSelect(node.id);
   })
   .onNodeDrag(function(){
    if(!ctx.state().motion)return;
    dragged=true;
    followUntil=0;
    setAlpha(0.32);
   })
   .onNodeDragEnd(function(node){
    if(!ctx.state().motion){
     node.fx=node.x;node.fy=node.y;return;
    }
    node.fx=null;node.fy=null;
    setAlpha(0);
   })
   .onEngineStop(function(){ctx.onReady()})
   .onRenderFramePre(function(){
    planLabels();
    if(followUntil&&performance.now()<followUntil){
     var n=nodeBy[ctx.state().selected];
     if(n&&n.x!=null)Graph.centerAt(n.x,n.y,0);
    }
   })
   .onZoom(function(){planLabels()});
  Graph.d3Force('gather',function(alpha){
   var st=ctx.state();
   if(!st.motion)return;
   var hub=nodeBy[st.selected];
   if(!hub||hub.x==null)return;
   var hot=window.graphHot();
   nodes.forEach(function(n){
    if(n.x==null||n.fx!=null)return;
    var pull=n.id===st.selected?0.4:(hot[n.id]?0.09:0.02);
    var tx=hub.x,ty=hub.y;
    if(!hot[n.id]&&n.id!==st.selected){
     var dx=n.x-hub.x,dy=n.y-hub.y,dist=Math.hypot(dx,dy)||1;
     tx=hub.x+dx/dist*340;
     ty=hub.y+dy/dist*260;
    }
    n.vx+=(tx-n.x)*pull*alpha;
    n.vy+=(ty-n.y)*pull*alpha;
   });
  });
  function edgeHot(l){return window.graphShowEdge(l)}
  function setAlpha(v){
   if(typeof Graph.d3AlphaTarget==='function')Graph.d3AlphaTarget(v);
  }
  function drawNode(node,c,globalScale){
   if(node.x==null)return;
   var st=ctx.state();
   var col=ctx.colors();
   var hot=window.graphHot();
   var dim=!hot[node.id];
   var z=globalScale||1;
   var r=node.group==='keyword'?16:15;
   c.save();
   traceShape(c,node.kind,node.x,node.y,r);
   c.fillStyle=col.card;
   c.fill();
   c.lineWidth=(node.id===st.selected?4:dim?2:3.5)/z;
   c.strokeStyle=dim?col.line:col.fg;
   c.setLineDash(dim?[5/z,4/z]:[]);
   c.stroke();
   if(node.id===st.focused){
    c.setLineDash([]);
    c.beginPath();
    c.arc(node.x,node.y,r+8/z,0,Math.PI*2);
    c.strokeStyle=col.teal;
    c.lineWidth=3/z;
    c.stroke();
   }
   var size=14/z;
   c.font='700 '+size+'px "Zen Maru Gothic","Hiragino Maru Gothic ProN",sans-serif';
   c.textBaseline='middle';
   c.fillStyle=dim?col.sub:col.fg;
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
    var ox=out.x*(r+8/z),oy=out.y*(r+8/z);
    lines.forEach(function(text,i){
     c.fillText(text,node.x+ox+out.x*i*gap,node.y+oy+out.y*i*gap);
    });
   }
   c.restore();
  }
  function drawLinkLabel(link,c,globalScale){
   var a=link.source,b=link.target;
   if(!a||a.x==null||!b||b.x==null)return;
   var ang=window.graphReadableAngle(b.x-a.x,b.y-a.y);
   window.graphDrawEdgeLabel(c,(a.x+b.x)/2,(a.y+b.y)/2,ang,link.label,link.provisional,1/(globalScale||1));
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
   if(!link)return;
   var sel=ctx.state().selected;
   link.distance(function(l){
    var a=idOf(l.source),b=idOf(l.target);
    return a===sel||b===sel?72:150;
   }).strength(function(l){
    var a=idOf(l.source),b=idOf(l.target);
    return a===sel||b===sel?0.62:0.05;
   });
   var charge=Graph.d3Force('charge');
   if(charge)charge.strength(-80);
  }
  function frameStill(){
   var hub=nodeBy[ctx.state().selected];
   var scale=window.graphFrameScale(host.clientWidth||320,host.clientHeight||360);
   Graph.zoom(scale,0);
   Graph.centerAt(hub&&hub.x!=null?hub.x:0,hub&&hub.y!=null?hub.y:0,0);
  }
  function arrangeStatic(){
   var sel=ctx.state().selected;
   var pos=window.graphLayout(nodes.map(function(n){return n.id}),sel);
   nodes.forEach(function(n){
    var p=pos[n.id];
    if(!p)return;
    n.x=p.x;n.y=p.y;
   });
   nodes.forEach(function(n){n.fx=n.x;n.fy=n.y});
   frameStill();
  }
  function planLabels(){
   var z=Graph.zoom()||1;
   var edges=[];
   (Graph.graphData().links||[]).forEach(function(l){
    var a=l.source,b=l.target;
    if(!a||a.x==null||!b||b.x==null)return;
    edges.push({key:idOf(a)+'|'+idOf(b),source:idOf(a),target:idOf(b),label:l.label,x1:a.x,y1:a.y,x2:b.x,y2:b.y});
   });
   window.__edgeShow=window.graphPickLabels(edges,z);
  }
  function poke(){
   var c=Graph.centerAt();
   if(c&&c.x!=null&&!(followUntil&&performance.now()<followUntil))Graph.centerAt(c.x,c.y,0);
   planLabels();
  }
  var canvas=host.querySelector('canvas');
  if(canvas)canvas.setAttribute('aria-hidden','true');
  return {
   refresh:function(){
    var st=ctx.state();
    syncNodes();
    Graph.graphData({nodes:nodes,links:linkData()});
    tune();
    Graph.backgroundColor(ctx.colors().bg);
    if(!st.motion){
     Graph.enableNodeDrag(false);
     Graph.autoPauseRedraw(true);
     if(laidFor!==st.selected||nodes.some(function(n){return n.x==null})){
      arrangeStatic();
      laidFor=st.selected;
     }else nodes.forEach(function(n){if(n.x!=null){n.fx=n.x;n.fy=n.y}});
     setAlpha(0);
     Graph.cooldownTime(0);
    }else{
     Graph.enableNodeDrag(true);
     Graph.autoPauseRedraw(false);
     nodes.forEach(function(n){n.fx=null;n.fy=null});
     Graph.cooldownTime(12000);
     if(booted&&typeof Graph.d3ReheatSimulation==='function')Graph.d3ReheatSimulation();
     booted=true;
     laidFor=null;
    }
    planLabels();
    if(!st.motion)ctx.onReady();
   },
   paint:function(){poke()},
   resize:function(){
    Graph.width(host.clientWidth||320).height(host.clientHeight||360);
    poke();
   },
   fit:function(){
    followUntil=0;
    Graph.zoomToFit(ctx.state().motion?650:0,40);
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
     if((Graph.zoom()||1)<0.75)Graph.zoom(1,900);
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
     nodes.forEach(function(n){if(n.x!=null){n.fx=n.x;n.fy=n.y}});
     poke();
    }
   },
   pause:function(){
    followUntil=0;
    setAlpha(0);
    Graph.cooldownTime(0);
   }
  };
 };
})();
