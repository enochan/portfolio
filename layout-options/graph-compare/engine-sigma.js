(function(){
 var B=window.GraphSigmaBundle;
 if(!B||typeof B.Sigma!=='function'||typeof B.Graph!=='function')return;
 function shortTitle(str){
  if(!str||str.length<=12)return str||'';
  return str.slice(0,11)+'…';
 }
 function shapeOf(kind){
  if(kind==='paper')return 'diamond';
  if(kind==='award'||kind==='career')return 'triangle';
  if(kind==='patent'||kind==='talk')return 'square';
  if(kind==='book'||kind==='write'||kind==='layer')return 'rectangle';
  return 'circle';
 }
 window.GRAPH_ENGINE=function(ctx){
  var host=ctx.host;
  var graph=new B.Graph({multi:false,type:'undirected'});
  var fa={gravity:0.5,scalingRatio:12,slowDown:6,barnesHutOptimize:false,strongGravityMode:false};
  var raf=0;
  var dragId=null;
  var followUntil=0;
  var laidFor=null;
  var nodesStyle=Object.assign({},B.DEFAULT_STYLES.nodes,{
   shape:{attribute:'shape',defaultValue:'circle'},
   labelSize:14,
   labelFont:'Zen Maru Gothic, "Hiragino Maru Gothic ProN", sans-serif',
   labelVisibility:'visible',
   labelColor:{attribute:'labelColor',defaultValue:'#2b2a33'},
   color:{attribute:'color',defaultValue:'#fffaf3'},
   size:{attribute:'size',defaultValue:12},
   backdropVisibility:{attribute:'backdrop',defaultValue:'hidden'},
   backdropBorderColor:{attribute:'borderColor',defaultValue:'#17675a'},
   backdropBorderWidth:3,
   backdropPadding:10,
   backdropColor:{attribute:'backdropColor',defaultValue:'#fffaf3'}
  });
  var edgesStyle=Object.assign({},B.DEFAULT_STYLES.edges,{
   labelSize:14,
   labelFont:'Zen Maru Gothic, "Hiragino Maru Gothic ProN", sans-serif',
   labelColor:{attribute:'labelColor',defaultValue:'#2b2a33'},
   labelBackgroundColor:{attribute:'labelBg',defaultValue:'#ffffff'},
   labelBackgroundPadding:4,
   labelVisibility:{attribute:'labelVisibility',defaultValue:'hidden'},
   size:{attribute:'size',defaultValue:1.4},
   color:{attribute:'color',defaultValue:'#a38a66'}
  });
  var primitives={
   nodes:Object.assign({},B.DEFAULT_PRIMITIVES.nodes,{shapes:[B.sdfCircle(),B.sdfDiamond(),B.sdfTriangle(),B.sdfSquare(),B.sdfRectangle()]}),
   edges:Object.assign({},B.DEFAULT_PRIMITIVES.edges,{layers:[B.layerDashed({
    dashSize:{value:8,mode:'pixels'},
    gapSize:{attribute:'gap',default:0,mode:'pixels'}
   })]})
  };
  var settings={
   renderLabels:true,
   renderEdgeLabels:true,
   labelRenderedSizeThreshold:0,
   labelDensity:0.55,
   enableNodeDrag:!!ctx.state().motion,
   hideLabelsOnMove:false,
   hideEdgesOnMove:false,
   minCameraRatio:0.05,
   maxCameraRatio:12,
   itemSizesReference:'screen',
   autoRescale:true,
   zoomDuration:280
  };
  var renderer;
  try{
   renderer=new B.Sigma(graph,host,{styles:{nodes:nodesStyle,edges:edgesStyle},primitives:primitives,settings:settings});
  }catch(err){
   console.error(err);
   renderer=new B.Sigma(graph,host,{settings:settings});
  }
  host.querySelectorAll('canvas').forEach(function(c){c.setAttribute('aria-hidden','true')});
  renderer.on('clickNode',function(e){
   if(graph.getNodeAttribute(e.node,'group')==='keyword')ctx.onSelect(e.node);
  });
  renderer.on('enterNode',function(e){ctx.onHover(e.node)});
  renderer.on('leaveNode',function(){ctx.onHover(null)});
  renderer.on('nodeDragStart',function(e){dragId=e.node;followUntil=0});
  renderer.on('nodeDragEnd',function(){dragId=null});
  function step(){
   raf=0;
   if(!ctx.state().motion)return;
   var pin=null;
   if(dragId&&graph.hasNode(dragId))pin={x:graph.getNodeAttribute(dragId,'x'),y:graph.getNodeAttribute(dragId,'y')};
   try{B.forceAtlas2.assign(graph,{iterations:1,settings:fa})}catch(e){}
   if(pin&&graph.hasNode(dragId)){
    graph.setNodeAttribute(dragId,'x',pin.x);
    graph.setNodeAttribute(dragId,'y',pin.y);
   }
   if(followUntil&&performance.now()<followUntil){
    var id=ctx.state().selected;
    if(graph.hasNode(id)){
     var cam=renderer.getCamera();
     var vp=renderer.graphToViewport({x:graph.getNodeAttribute(id,'x'),y:graph.getNodeAttribute(id,'y')});
     cam.setState(renderer.getViewportZoomedState(vp,cam.ratio));
    }
   }
   renderer.refresh();
   raf=requestAnimationFrame(step);
  }
  function start(){if(!raf)raf=requestAnimationFrame(step)}
  function stop(){if(raf)cancelAnimationFrame(raf);raf=0}
  function sync(){
   var ids=ctx.visibleIds();
   var have={};
   ids.forEach(function(id){have[id]=1});
   var drop=[];
   graph.forEachNode(function(id){if(!have[id])drop.push(id)});
   drop.forEach(function(id){graph.dropNode(id)});
   ids.forEach(function(id,i){
    if(graph.hasNode(id))return;
    var b=ctx.model.catalog[id];
    var ang=i*0.55;
    graph.addNode(id,{
     x:Math.cos(ang)*8,y:Math.sin(ang)*8,
     shape:shapeOf(b.kind),group:b.group,
     line1:b.group==='keyword'?b.full:b.kindLabel,
     line2:b.group==='item'?shortTitle(b.full):'',
     size:12,label:b.full,color:'#fffaf3'
    });
   });
   var edges=[];
   graph.forEachEdge(function(edge){edges.push(edge)});
   edges.forEach(function(edge){graph.dropEdge(edge)});
   ctx.model.links.forEach(function(l){
    if(!have[l.source]||!have[l.target]||graph.hasEdge(l.source,l.target))return;
    graph.addEdge(l.source,l.target,{label:l.label,provisional:!!l.provisional,gap:0,size:1.4});
   });
  }
  function paint(){
   var st=ctx.state();
   var hot=window.graphHot();
   var col=ctx.colors();
   var cam=renderer.getCamera();
   var zoomed=(window.__fitRatio||cam.ratio)/Math.max(0.0001,cam.ratio);
   var shown=0;
   graph.forEachNode(function(id,attrs){
    var parts=[attrs.line1];
    if(attrs.group==='item'&&attrs.line2)parts.push(attrs.line2);
    if(attrs.group==='keyword'&&id===st.selected)parts.push('選択中');
    if(id===st.focused)parts.push('フォーカス');
    var dim=!hot[id];
    graph.mergeNodeAttributes(id,{
     label:parts.join(' '),
     labelColor:dim?col.sub:col.fg,
     color:id===st.selected?col.fg:(dim?col.line:col.teal),
     size:id===st.selected?18:14,
     backdrop:id===st.focused?'visible':'hidden',
     borderColor:col.teal,
     backdropColor:col.card
    });
   });
   graph.forEachEdge(function(edge,attrs,source,target){
    var link={source:source,target:target};
    var isHot=window.graphShowEdge(link,0);
    var show=window.graphShowEdge(link,zoomed>=1.15?1.15:0);
    if(show)shown++;
    graph.mergeEdgeAttributes(edge,{
     label:attrs.label,
     labelVisibility:show?'visible':'hidden',
     labelColor:col.fg,
     labelBg:col.card,
     color:isHot?col.fg:col.line,
     size:isHot?3:1.3,
     gap:isHot?0:7
    });
   });
   window.__labelCount=shown;
   window.__zoom=zoomed;
   renderer.refresh();
  }
  function settle(iters){
   try{B.forceAtlas2.assign(graph,{iterations:iters,settings:fa})}catch(e){}
   renderer.refresh();
  }
  return {
   refresh:function(){
    var st=ctx.state();
    sync();
    if(!st.motion){
     stop();
     renderer.setSetting('enableNodeDrag',false);
     if(laidFor!==st.selected){settle(80);laidFor=st.selected}
     paint();
     ctx.onReady();
    }else{
     renderer.setSetting('enableNodeDrag',true);
     laidFor=null;
     paint();
     start();
     ctx.onReady();
    }
   },
   paint:paint,
   resize:function(){renderer.resize();paint()},
   fit:function(){
    followUntil=0;
    var cam=renderer.getCamera();
    cam.reset({duration:ctx.state().motion?650:0}).then(function(){
     window.__fitRatio=renderer.getCamera().ratio;
     paint();
    });
   },
   zoomBy:function(k){
    var cam=renderer.getCamera();
    var ratio=Math.max(0.05,Math.min(12,cam.ratio/k));
    cam.animate({ratio:ratio},{duration:ctx.state().motion?280:0}).then(function(){paint()});
   },
   positions:function(){
    var out={};
    graph.forEachNode(function(id,attrs){out[id]={x:attrs.x,y:attrs.y}});
    return out;
   },
   focusOn:function(id){
    if(!graph.hasNode(id))return;
    var cam=renderer.getCamera();
    var vp=renderer.graphToViewport({x:graph.getNodeAttribute(id,'x'),y:graph.getNodeAttribute(id,'y')});
    var ratio=Math.min(cam.ratio||1,0.9);
    var next=renderer.getViewportZoomedState(vp,ratio);
    if(ctx.state().motion){
     followUntil=performance.now()+900;
     cam.animate(next,{duration:700});
    }else{
     followUntil=0;
     cam.setState(next);
     renderer.refresh();
    }
   },
   setMotion:function(on){
    renderer.setSetting('enableNodeDrag',!!on);
    if(!on){followUntil=0;stop()}
   },
   pause:function(){followUntil=0;stop()}
  };
 };
})();
