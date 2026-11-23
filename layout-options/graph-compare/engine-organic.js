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
  var mag=0.1+(h%9)*0.035;
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
 function tracePebble(ctx,x,y,r,seed){
  var steps=7;
  ctx.beginPath();
  for(var i=0;i<=steps;i++){
   var a=i/steps*Math.PI*2;
   var wob=1+0.18*Math.sin(a*2+seed)+0.1*Math.sin(a*3-seed);
   var px=x+Math.cos(a)*r*wob;
   var py=y+Math.sin(a)*r*wob*0.92;
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
   .linkDirectionalParticleWidth(4)
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
   var breath=1+0.075*Math.sin(t*0.48);
   var driftX=Math.sin(t*0.22)*18;
   var driftY=Math.cos(t*0.17)*13;
   nodes.forEach(function(n){
    if(n.x==null||n.fx!=null)return;
    if(n.homeX==null){n.homeX=n.x;n.homeY=n.y}
    var phase=(hash(n.id)%628)/100;
    var sway=0.055*Math.sin(t*0.72+phase);
    var tx=n.homeX*(breath+sway)+Math.cos(t*0.33+phase)*11+driftX;
    var ty=n.homeY*(breath*0.9+sway)+Math.sin(t*0.29+phase*1.3)*9+driftY;
    n.vx+=(tx-n.x)*0.16;
    n.vy+=(ty-n.y)*0.16;
   });
  });
  function edgeHot(l){return window.graphShowEdge(l)}
  function organicLinePx(hot){
   if(ctx.state().labelMode==='thin')return hot?0.7:0.45;
   return hot?1:0.6;
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
  function flowBetween(l){
   var flow=ctx.model&&ctx.model.flow;
   if(!flow)return null;
   return flow.between(idOf(l.source),idOf(l.target));
  }
  function particleCount(l){
   if(!ctx.state().motion)return 0;
   var f=flowBetween(l);
   if(!f||f.provisional)return 0;
   if((ctx.state().flowMode||'time')==='strength'){
    if(f.itemEdge||!f.count)return 0;
    return Math.min(f.count,4);
   }
   return f.dir?2:0;
  }
  function particleSpeed(l){
   var f=flowBetween(l);
   if((ctx.state().flowMode||'time')==='strength'){
    var n=f&&f.count?f.count:1;
    return Math.min(0.01,0.0022+n*0.0011);
   }
   if(!f||!f.dir)return 0.004;
   return f.dir>0?0.004:-0.004;
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
    curved:true,
    flow:ctx.state().flowMode||'time'
   };
  }
  function drawNode(node,c,globalScale){
   if(node.x==null)return;
   var st=ctx.state();
   var col=ctx.colors();
   var z=globalScale||1;
   var seed=hash(node.id)%628/100;
   var r=(node.group==='keyword'?11:9)*(node.id===st.selected?1.35:1);
   var system=forcedColors();
   var fill=node.group==='keyword'?(col.teal||'#17675a'):(col.accent||'#b4441f');
   c.save();
   tracePebble(c,node.x,node.y,r,seed);
   c.fillStyle=system?'Canvas':fill;
   c.fill();
   if(system){
    c.lineWidth=1.6/z;
    c.strokeStyle='CanvasText';
    c.stroke();
   }
   if(node.id===st.focused){
    c.setLineDash([]);
    c.beginPath();
    c.arc(node.x,node.y,r+7/z,0,Math.PI*2);
    c.strokeStyle=system?'Highlight':col.teal;
    c.lineWidth=2/z;
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
    var top=node.y-r-8/z-(lines.length-1)*gap;
    lines.forEach(function(text,i){c.fillText(text,node.x,top+i*gap)});
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
   if(!ctx.state().motion)drawStillMark(c,a,b,ctrl,z,hot,col,system);
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
    link.distance(170).strength(0.01);
   }
   var charge=Graph.d3Force('charge');
   if(charge)charge.strength(-4);
  }
  function curvePoint(ax,ay,bx,by,cx,cy,t){
   var u=1-t;
   return {x:u*u*ax+2*u*t*cx+t*t*bx,y:u*u*ay+2*u*t*cy+t*t*by};
  }
  function curveDeriv(ax,ay,bx,by,cx,cy,t){
   var u=1-t;
   return {x:2*u*(cx-ax)+2*t*(bx-cx),y:2*u*(cy-ay)+2*t*(by-cy)};
  }
  function drawStillMark(c,a,b,ctrl,z,hot,col,system){
   var f=flowBetween({source:a,target:b});
   if(!f||f.provisional)return;
   var mode=ctx.state().flowMode||'time';
   var ink=system?'CanvasText':(hot?col.fg:dimStroke(col));
   if(mode==='strength'){
    if(f.itemEdge||!f.count)return;
    var n=Math.min(f.count,5);
    for(var i=0;i<n;i++){
     var p=curvePoint(a.x,a.y,b.x,b.y,ctrl.x,ctrl.y,(i+1)/(n+1));
     c.beginPath();
     c.arc(p.x,p.y,2.4/z,0,Math.PI*2);
     c.fillStyle=ink;
     c.fill();
    }
    return;
   }
   if(!f.dir)return;
   var t=0.72;
   var p=curvePoint(a.x,a.y,b.x,b.y,ctrl.x,ctrl.y,t);
   var d=curveDeriv(a.x,a.y,b.x,b.y,ctrl.x,ctrl.y,t);
   var len=Math.hypot(d.x,d.y)||1;
   var ux=d.x/len*(f.dir>0?1:-1),uy=d.y/len*(f.dir>0?1:-1);
   var s=8/z;
   c.beginPath();
   c.moveTo(p.x+ux*s,p.y+uy*s);
   c.lineTo(p.x-uy*s*0.62,p.y+ux*s*0.62);
   c.lineTo(p.x+uy*s*0.62,p.y-ux*s*0.62);
   c.closePath();
   c.fillStyle=ink;
   c.fill();
  }
  function frameStill(){
   var maxR=120;
   nodes.forEach(function(n){
    var r=Math.hypot(n.homeX||0,n.homeY||0);
    if(r>maxR)maxR=r;
   });
   maxR+=40;
   var w=host.clientWidth||320,h=host.clientHeight||360;
   var scale=Math.max(0.45,Math.min(1.6,Math.min(w,h)*0.42/maxR));
   var hub=nodeBy[ctx.state().selected];
   Graph.zoom(scale,0);
   Graph.centerAt(hub&&hub.x!=null?hub.x:0,hub&&hub.y!=null?hub.y:0,0);
  }
  function placeCloud(fix){
   var sel=ctx.state().selected;
   var hot=window.graphHot();
   var near=[],far=[];
   nodes.forEach(function(n){
    if(n.id===sel)return;
    if(hot[n.id])near.push(n);else far.push(n);
   });
   var hub=nodeBy[sel];
   if(hub){hub.x=0;hub.y=0;hub.homeX=0;hub.homeY=0}
   function scatter(list,r0,r1){
    var rot=(hash(sel+'rot')%628)/100;
    var squash=0.55+(hash(sel+'sq')%35)/100;
    list.forEach(function(n){
     var ang=(hash(n.id+'a')%1000)/1000*Math.PI*2;
     var radius=r0+(r1-r0)*((hash(n.id+'r')%100)/100);
     var x=Math.cos(ang)*radius;
     var y=Math.sin(ang)*radius*squash;
     n.x=x*Math.cos(rot)-y*Math.sin(rot);
     n.y=x*Math.sin(rot)+y*Math.cos(rot);
    });
    for(var step=0;step<14;step++){
     list.forEach(function(a){
      list.forEach(function(b){
       if(a===b)return;
       var dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy)||0.01;
       if(dist<78){
        var push=(78-dist)/dist*0.32;
        a.x+=dx*push;a.y+=dy*push;
       }
      });
      var hubDist=Math.hypot(a.x,a.y);
      if(hubDist<r0*0.45){
       var s=r0*0.45/hubDist;
       a.x*=s;a.y*=s;
      }
     });
    }
    list.forEach(function(n){
     n.homeX=n.x;n.homeY=n.y;
     if(fix){n.fx=n.x;n.fy=n.y}else{n.fx=null;n.fy=null}
    });
   }
   scatter(near,70,280);
   scatter(far,240,420);
   nodes.forEach(function(n){
    if(n.id===sel){
     if(fix){n.fx=0;n.fy=0}else{n.fx=null;n.fy=null}
    }
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
  var shownFlow='';
  function refreshParticles(){
   clearParticles();
   Graph.linkDirectionalParticles(function(l){return particleCount(l)});
   Graph.linkDirectionalParticleSpeed(function(l){return particleSpeed(l)});
  }
  function poke(){
   var sig=(ctx.state().flowMode||'time')+'|'+(ctx.state().motion?1:0);
   if(sig!==shownFlow){shownFlow=sig;refreshParticles()}
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
    if(relayout)placeCloud(!st.motion);
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
