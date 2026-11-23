(function(){
 if(typeof d3==='undefined')return;
 function idOf(x){return x&&x.id?x.id:x}
 function shortTitle(str){
  if(!str||str.length<=12)return str||'';
  return str.slice(0,11)+'…';
 }
 function shapePath(kind,r){
  function pts(arr){
   return arr.map(function(p,i){return (i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)}).join('')+'Z';
  }
  if(kind==='paper')return pts([[0,-r],[r,0],[0,r],[-r,0]]);
  if(kind==='patent'){
   var h=[];
   for(var i=0;i<6;i++){var a=-Math.PI/2+i*Math.PI/3;h.push([Math.cos(a)*r,Math.sin(a)*r])}
   return pts(h);
  }
  if(kind==='award'){
   var s=[];
   for(var j=0;j<5;j++){var b=-Math.PI/2+j*2*Math.PI/5;s.push([Math.cos(b)*r,Math.sin(b)*r])}
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
 window.GRAPH_ENGINE=function(ctx){
  var host=ctx.host;
  var nodeBy={};
  var nodes=[];
  var links=[];
  var width=320,height=360,zoomK=1;
  var laidFor=null;
  var booted=false;
  var followUntil=0;
  var centering=false;
  var svg=d3.select(host).append('svg').attr('class','force-svg').attr('aria-hidden','true');
  svg.append('rect').attr('class','zoom-bg').attr('fill','transparent');
  var world=svg.append('g');
  var linkG=world.append('g');
  var labelG=world.append('g');
  var nodeG=world.append('g');
  var linkSel=linkG.selectAll('line');
  var labelSel=labelG.selectAll('g');
  var nodeSel=nodeG.selectAll('g');
  var zoom=d3.zoom().scaleExtent([0.3,3.2]).filter(function(event){
   if(event.type==='dblclick')return false;
   if(event.type==='wheel')return true;
   var tgt=event.target;
   if(tgt&&tgt.closest&&tgt.closest('.force-node'))return false;
   return true;
  }).on('zoom',function(event){
   zoomK=event.transform.k;
   world.attr('transform',event.transform);
   if(!centering)paint();
  });
  svg.call(zoom);
  var drag=d3.drag().on('start',function(event,d){
   if(!ctx.state().motion)return;
   d._dragged=false;
  }).on('drag',function(event,d){
   if(!ctx.state().motion)return;
   if(!d._dragged){
    d._dragged=true;
    if(!event.active)sim.alphaTarget(0.35).restart();
   }
   d.fx=event.x;d.fy=event.y;
  }).on('end',function(event,d){
   if(!ctx.state().motion||!d._dragged)return;
   d._dragged=false;
   if(!event.active)sim.alphaTarget(0);
   d.fx=null;d.fy=null;
   if(sim.alpha()<0.25)sim.alpha(0.25).restart();
  });
  var sim=d3.forceSimulation()
   .force('link',d3.forceLink().id(function(d){return d.id}).distance(function(d){
    var sel=ctx.state().selected;
    return d.source.id===sel||d.target.id===sel||d.source===sel||d.target===sel?78:148;
   }).strength(function(d){
    var sel=ctx.state().selected;
    return d.source.id===sel||d.target.id===sel||d.source===sel||d.target===sel?0.6:0.08;
   }))
   .force('charge',d3.forceManyBody().strength(-90))
   .force('collide',d3.forceCollide().radius(36).iterations(2))
   .force('gather',gather)
   .alphaDecay(0.035)
   .velocityDecay(0.4)
   .on('tick',function(){syncFrame();track()})
   .on('end',function(){ctx.onReady()});
  function gather(alpha){
   var st=ctx.state();
   if(!st.motion)return;
   var hub=nodeBy[st.selected];
   if(!hub||hub.x==null)return;
   var hot=window.graphHot();
   nodes.forEach(function(n){
    if(n.x==null||n.fx!=null)return;
    var pull=n.id===st.selected?0.42:(hot[n.id]?0.1:0.02);
    var tx=hub.x,ty=hub.y;
    if(!hot[n.id]){
     var dx=n.x-hub.x,dy=n.y-hub.y,dist=Math.hypot(dx,dy)||1;
     tx=hub.x+dx/dist*340;ty=hub.y+dy/dist*250;
    }
    n.vx+=(tx-n.x)*pull*alpha;
    n.vy+=(ty-n.y)*pull*alpha;
   });
  }
  function measure(){
   width=Math.max(280,host.clientWidth||320);
   height=Math.max(220,host.clientHeight||360);
   svg.attr('viewBox','0 0 '+width+' '+height);
   svg.select('.zoom-bg').attr('width',width).attr('height',height);
  }
  function syncNodes(){
   var ids=ctx.visibleIds();
   var keep={};
   ids.forEach(function(id){keep[id]=1});
   Object.keys(nodeBy).forEach(function(id){if(!keep[id])delete nodeBy[id]});
   var cx=width/2,cy=height/2;
   nodes=ids.map(function(id,i){
    if(!nodeBy[id]){
     var b=ctx.model.catalog[id];
     var ang=i*0.7;
     nodeBy[id]={id:id,group:b.group,kind:b.kind,full:b.full,kindLabel:b.kindLabel,lang:b.lang,r:b.group==='keyword'?16:15,x:cx+Math.cos(ang)*40,y:cy+Math.sin(ang)*40};
    }
    return nodeBy[id];
   });
   var have={};
   nodes.forEach(function(n){have[n.id]=1});
   links=ctx.model.links.filter(function(l){return have[l.source]&&have[l.target]}).map(function(l){
    return {source:l.source,target:l.target,label:l.label,provisional:l.provisional};
   });
  }
  function edgeHot(l){return window.graphShowEdge(l)}
  function linkKey(d){return idOf(d.source)+'|'+idOf(d.target)}
  function paint(){
   var st=ctx.state();
   var hot=window.graphHot();
   var size=14/Math.max(0.3,zoomK);
   nodeSel.classed('is-on',function(d){return d.id===st.selected})
    .classed('is-hot',function(d){return !!hot[d.id]&&d.id!==st.selected})
    .classed('is-dim',function(d){return !hot[d.id]})
    .classed('is-focus',function(d){return d.id===st.focused});
   nodeSel.select('.nameline').attr('font-size',size);
   nodeSel.select('.pick').attr('font-size',size).text(function(d){
    if(d.group==='keyword')return d.id===st.selected?'選択中':'';
    return shortTitle(d.full);
   });
   nodeSel.select('.focusline').attr('font-size',size).text(function(d){return d.id===st.focused?'フォーカス':''});
   placeCaptions(size);
   syncFrame();
  }
  function syncFrame(){
   var z=Math.max(0.3,zoomK);
   var ready=links.filter(function(l){return l.source&&l.source.x!=null&&l.target&&l.target.x!=null});
   var show=window.graphPickLabels(ready.map(function(l){
    return {key:linkKey(l),source:idOf(l.source),target:idOf(l.target),label:l.label,x1:l.source.x,y1:l.source.y,x2:l.target.x,y2:l.target.y};
   }),z);
   linkSel.attr('class',function(d){return edgeHot(d)?'is-hot':'is-dim'})
    .attr('stroke-width',function(d){return window.graphLinePx(edgeHot(d))/z})
    .attr('stroke-dasharray',function(d){return edgeHot(d)?null:(5/z)+' '+(4/z)});
   var shown=ready.filter(function(l){return show[linkKey(l)]});
   labelSel=labelSel.data(shown,linkKey);
   labelSel.exit().remove();
   var enter=labelSel.enter().append('g').attr('class','edge-label');
   enter.append('rect');
   enter.append('text');
   labelSel=enter.merge(labelSel);
   var size=14/z;
   labelSel.classed('is-provisional',function(d){return !!d.provisional});
   labelSel.select('text').text(function(d){return d.label||'仮'})
    .attr('text-anchor','middle').attr('dominant-baseline','middle').attr('font-size',size).attr('y',0);
   labelSel.each(function(d){
    var m=window.graphLabelMetrics(d.label);
    var node=d3.select(this);
    var text=node.select('text').node();
    var tw=text&&text.getComputedTextLength?text.getComputedTextLength():m.textW/z;
    if(!tw)tw=m.textW/z;
    var pad=m.padX/z;
    var h=Math.max(20/z,size+m.padY*2/z);
    node.select('rect')
     .attr('x',-(tw/2+pad)).attr('y',-h/2)
     .attr('width',tw+pad*2).attr('height',h).attr('rx',Math.min(h/2,8/z))
     .attr('stroke',m.border?null: 'none')
     .attr('stroke-width',m.border?m.border/z:0)
     .attr('stroke-dasharray',d.provisional&&m.border?(4/z)+' '+(3/z):null);
   });
   place();
  }
  function placeCaptions(size){
   var st=ctx.state();
   var hub=nodeBy[st.selected];
   var hx=hub&&hub.x!=null?hub.x:0,hy=hub&&hub.y!=null?hub.y:0;
   nodeSel.each(function(d){
    var node=d3.select(this);
    var lines=[];
    if(node.select('.nameline').text())lines.push('nameline');
    if(node.select('.pick').text())lines.push('pick');
    if(node.select('.focusline').text())lines.push('focusline');
    var gap=size*1.15;
    if(d.id===st.selected){
     var shift=(lines.length-1)*gap/2;
     lines.forEach(function(cls,i){
      node.select('.'+cls).attr('text-anchor','middle').attr('x',0).attr('y',i*gap-shift);
     });
     return;
    }
    var out=window.graphOutward(d.x,d.y,hx,hy);
    var anchor=out.x>0.35?'start':out.x<-0.35?'end':'middle';
    lines.forEach(function(cls,i){
     node.select('.'+cls)
      .attr('text-anchor',anchor)
      .attr('x',out.x*(d.r+8)+out.x*i*gap)
      .attr('y',out.y*(d.r+8)+out.y*i*gap);
    });
   });
  }
  function place(){
   linkSel.attr('x1',function(d){return d.source.x}).attr('y1',function(d){return d.source.y})
    .attr('x2',function(d){return d.target.x}).attr('y2',function(d){return d.target.y});
   nodeSel.attr('transform',function(d){return 'translate('+d.x+','+d.y+')'});
   labelSel.attr('transform',function(d){
    if(!d.source||d.source.x==null||!d.target||d.target.x==null)return null;
    var ang=window.graphReadableAngle(d.target.x-d.source.x,d.target.y-d.source.y)*180/Math.PI;
    var x=(d.source.x+d.target.x)/2,y=(d.source.y+d.target.y)/2;
    return 'translate('+x+','+y+') rotate('+ang+')';
   });
   placeCaptions(14/Math.max(0.3,zoomK));
  }
  function bind(){
   linkSel=linkG.selectAll('line').data(links,function(d){return idOf(d.source)+'|'+idOf(d.target)});
   linkSel.exit().remove();
   linkSel=linkSel.enter().append('line').merge(linkSel);
   nodeSel=nodeG.selectAll('g').data(nodes,function(d){return d.id});
   nodeSel.exit().remove();
   var enter=nodeSel.enter().append('g').attr('class','force-node');
   enter.append('path').attr('class','ring');
   enter.append('path').attr('class','plate');
   enter.append('text').attr('class','nameline').attr('text-anchor','middle');
   enter.append('text').attr('class','pick').attr('text-anchor','middle');
   enter.append('text').attr('class','focusline').attr('text-anchor','middle');
   enter.call(drag);
   enter.on('click',function(event,d){
    event.stopPropagation();
    if(d.group==='keyword')ctx.onSelect(d.id);
   }).on('mouseenter',function(event,d){ctx.onHover(d.id)}).on('mouseleave',function(){ctx.onHover(null)});
   nodeSel=enter.merge(nodeSel);
   nodeSel.select('.plate').attr('d',function(d){return shapePath(d.kind,d.r)});
   nodeSel.select('.ring').attr('d',function(d){return shapePath('keyword',d.r+8)});
   nodeSel.select('.nameline').text(function(d){return d.group==='keyword'?d.full:d.kindLabel})
    .attr('lang',function(d){return d.group==='keyword'?(d.lang||null):null});
   nodeSel.select('.pick').attr('lang',function(d){return d.group==='item'?(d.lang||null):null});
  }
  function settle(){
   sim.stop();
   for(var i=0;i<360;i++)sim.tick();
   place();
   paint();
   ctx.onReady();
  }
  function frameStill(){
   var hub=nodeBy[ctx.state().selected];
   if(!hub)return;
   var scale=window.graphFrameScale(width,height);
   var t=d3.zoomIdentity.translate(width/2-scale*hub.x,height/2-scale*hub.y).scale(scale);
   centering=true;
   svg.call(zoom.transform,t);
   centering=false;
   zoomK=scale;
  }
  function arrangeStatic(){
   var sel=ctx.state().selected;
   var pos=window.graphLayout(nodes.map(function(n){return n.id}),sel);
   nodes.forEach(function(n){
    var p=pos[n.id];
    if(!p)return;
    n.x=p.x;n.y=p.y;n.fx=p.x;n.fy=p.y;
   });
   frameStill();
  }
  function wake(){
   nodes.forEach(function(n){n.fx=null;n.fy=null});
   sim.alpha(0.9).alphaTarget(0).restart();
  }
  function centerTransform(){
   var n=nodeBy[ctx.state().selected];
   if(!n||n.x==null)return null;
   var scale=zoomK<0.75?1:zoomK;
   return d3.zoomIdentity.translate(width/2-scale*n.x,height/2-scale*n.y).scale(scale);
  }
  function track(){
   if(!followUntil||performance.now()>=followUntil)return;
   var t=centerTransform();
   if(!t)return;
   centering=true;
   svg.call(zoom.transform,t);
   centering=false;
  }
  function center(animate){
   var t=centerTransform();
   if(!t)return;
   if(animate&&ctx.state().motion){
    followUntil=performance.now()+900;
    centering=true;
    svg.transition().duration(700).call(zoom.transform,t).on('end',function(){centering=false});
   }else{
    followUntil=0;
    centering=true;
    svg.call(zoom.transform,t);
    centering=false;
   }
  }
  measure();
  return {
   refresh:function(){
    measure();
    var st=ctx.state();
    syncNodes();
    bind();
    sim.nodes(nodes);
    sim.force('link').links(links);
    if(!st.motion){
     if(laidFor!==st.selected){arrangeStatic();laidFor=st.selected}
     else nodes.forEach(function(n){n.fx=n.x;n.fy=n.y});
     settle();
    }else{
     laidFor=null;
     nodes.forEach(function(n){n.fx=null;n.fy=null});
     if(booted)wake();
     else{booted=true;sim.alpha(1).restart()}
     paint();
    }
   },
   paint:paint,
   resize:function(){measure();paint()},
   fit:function(){
    if(!nodes.length)return;
    var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    nodes.forEach(function(n){
     minX=Math.min(minX,n.x-40);minY=Math.min(minY,n.y-40);
     maxX=Math.max(maxX,n.x+40);maxY=Math.max(maxY,n.y+40);
    });
    var dx=Math.max(80,maxX-minX),dy=Math.max(80,maxY-minY);
    var scale=Math.max(0.3,Math.min(3.2,Math.min(width/dx,height/dy)*0.86));
    var t=d3.zoomIdentity.translate(width/2-scale*(minX+maxX)/2,height/2-scale*(minY+maxY)/2).scale(scale);
    if(ctx.state().motion)svg.transition().duration(600).call(zoom.transform,t);
    else svg.call(zoom.transform,t);
   },
   zoomBy:function(k){
    if(ctx.state().motion)svg.transition().duration(250).call(zoom.scaleBy,k);
    else svg.call(zoom.scaleBy,k);
   },
   positions:function(){
    var out={};
    nodes.forEach(function(n){if(n.x!=null)out[n.id]={x:n.x,y:n.y}});
    return out;
   },
   focusOn:function(){if(ctx.state().motion)center(true);else frameStill()},
   setMotion:function(on){
    if(!on){sim.stop();sim.alphaTarget(0);nodes.forEach(function(n){n.fx=n.x;n.fy=n.y});place()}
   },
   pause:function(){sim.stop()}
  };
 };
})();
