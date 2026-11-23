(function(){
 if(typeof cytoscape!=='function')return;
 function shortTitle(str){
  if(!str||str.length<=12)return str||'';
  return str.slice(0,11)+'…';
 }
 function shapeOf(kind){
  if(kind==='paper')return 'diamond';
  if(kind==='patent')return 'hexagon';
  if(kind==='award')return 'pentagon';
  if(kind==='career')return 'triangle';
  if(kind==='book')return 'round-rectangle';
  if(kind==='write')return 'rectangle';
  if(kind==='talk')return 'round-rectangle';
  if(kind==='layer')return 'ellipse';
  return 'ellipse';
 }
 function box(kind){
  if(kind==='book')return {w:30,h:46};
  if(kind==='write')return {w:46,h:30};
  if(kind==='layer')return {w:46,h:30};
  if(kind==='talk')return {w:42,h:30};
  return {w:34,h:34};
 }
 window.GRAPH_ENGINE=function(ctx){
  var host=ctx.host;
  var boxEl=document.createElement('div');
  boxEl.className='cy';
  host.appendChild(boxEl);
   var laidFor=null;
  var layoutRunning=false;
  var pendingFocus=null;
  var cy=cytoscape({
   container:boxEl,
   elements:[],
   minZoom:0.3,
   maxZoom:3,
   wheelSensitivity:0.25,
   boxSelectionEnabled:false,
   autoungrabify:!ctx.state().motion,
   userPanningEnabled:true,
   userZoomingEnabled:true,
   style:[{selector:'node',style:{label:'',width:34,height:34}}]
  });
  host.querySelectorAll('canvas').forEach(function(c){c.setAttribute('aria-hidden','true')});
  var lock=false;
  cy.on('drag','node',function(evt){
   if(!ctx.state().motion||lock)return;
   lock=true;
   var n=evt.target,p=n.position();
   n.neighborhood('node').forEach(function(nb){
    var q=nb.position();
    var dx=p.x-q.x,dy=p.y-q.y,dist=Math.hypot(dx,dy)||1;
    var pull=(dist-96)*0.14;
    nb.position({x:q.x+dx/dist*pull,y:q.y+dy/dist*pull});
   });
   lock=false;
  });
  cy.on('dragfree','node',function(){if(ctx.state().motion)runLayout(true)});
  cy.on('tap','node',function(evt){
   if(evt.target.data('group')==='keyword')ctx.onSelect(evt.target.id());
  });
  cy.on('mouseover','node',function(evt){ctx.onHover(evt.target.id())});
  cy.on('mouseout','node',function(){ctx.onHover(null)});
  cy.on('zoom pan',function(){paint()});
  function applyStyle(){
   var c=ctx.colors();
   var font=14/Math.max(0.35,cy.zoom()||1);
   cy.style()
    .resetToDefault()
    .selector('node').style({
     'shape':'data(shape)',
     'width':'data(w)',
     'height':'data(h)',
     'background-color':c.card,
     'border-width':2.5,
     'border-color':c.line,
     'border-style':'solid',
     'label':'data(caption)',
     'font-size':font,
     'font-family':'Zen Maru Gothic, "Hiragino Maru Gothic ProN", sans-serif',
     'font-weight':700,
     'color':c.fg,
     'text-valign':'bottom',
     'text-halign':'center',
     'text-margin-y':4,
     'text-wrap':'wrap',
     'text-max-width':140,
     'opacity':1,
     'text-opacity':1
    })
    .selector('node.dim').style({'border-style':'dashed','border-color':c.line,'color':c.sub})
    .selector('node.hot').style({'border-style':'solid','border-width':3.5,'border-color':c.fg,'color':c.fg})
    .selector('node.on').style({'border-style':'solid','border-width':4,'border-color':c.fg,'color':c.fg})
    .selector('node.focus').style({
     'underlay-color':c.teal,
     'underlay-opacity':1,
     'underlay-padding':8,
     'underlay-shape':'ellipse',
     'border-color':c.teal
    })
    .selector('edge').style({
     'width':1.5,
     'line-color':c.line,
     'line-style':'dashed',
     'curve-style':'straight',
     'label':'',
     'font-size':font,
     'font-family':'Zen Maru Gothic, "Hiragino Maru Gothic ProN", sans-serif',
     'font-weight':700,
     'color':c.fg,
     'text-background-color':c.card,
     'text-background-opacity':1,
     'text-background-padding':'3px',
     'text-background-shape':'roundrectangle',
     'text-border-width':1.5,
     'text-border-color':c.line,
     'text-border-opacity':1,
     'opacity':1,
     'text-opacity':1
    })
    .selector('edge.hot').style({'width':2.6,'line-color':c.fg,'line-style':'solid'})
    .selector('edge.show-label').style({'label':'data(label)'})
    .update();
  }
  function caption(n){
   var st=ctx.state();
   var parts=[n.data('line1')];
   if(n.data('group')==='item'&&n.data('line2'))parts.push(n.data('line2'));
   if(n.data('group')==='keyword'&&n.id()===st.selected)parts.push('選択中');
   if(n.id()===st.focused)parts.push('フォーカス');
   return parts.join('\n');
  }
  function paint(){
   var st=ctx.state();
   var hot=window.graphHot();
   var z=cy.zoom()||1;
   cy.batch(function(){
    cy.nodes().forEach(function(n){
     var id=n.id();
     n.toggleClass('on',id===st.selected);
     n.toggleClass('hot',!!hot[id]&&id!==st.selected);
     n.toggleClass('dim',!hot[id]);
     n.toggleClass('focus',id===st.focused);
     n.data('caption',caption(n));
    });
    cy.edges().forEach(function(e){
     var link={source:e.data('source'),target:e.data('target')};
     e.toggleClass('hot',window.graphShowEdge(link,0));
     e.toggleClass('show-label',window.graphShowEdge(link,z));
    });
   });
   window.__labelCount=cy.edges('.show-label').length;
   window.__zoom=z;
  }
  function sync(){
   var ids=ctx.visibleIds();
   var have={};
   ids.forEach(function(id){have[id]=1});
   cy.nodes().forEach(function(n){if(!have[n.id()])n.remove()});
   ids.forEach(function(id){
    if(cy.getElementById(id).nonempty())return;
    var b=ctx.model.catalog[id];
    var size=box(b.kind);
    var ang=cy.nodes().length*0.62;
    cy.add({group:'nodes',data:{
     id:id,group:b.group,kind:b.kind,shape:shapeOf(b.kind),
     line1:b.group==='keyword'?b.full:b.kindLabel,
     line2:b.group==='item'?shortTitle(b.full):'',
     w:size.w,h:size.h,caption:b.group==='keyword'?b.full:b.kindLabel
    },position:{x:Math.cos(ang)*120,y:Math.sin(ang)*90}});
   });
   cy.edges().remove();
   var idset={};
   ids.forEach(function(id){idset[id]=1});
   ctx.model.links.forEach(function(l){
    if(!idset[l.source]||!idset[l.target])return;
    cy.add({group:'edges',data:{id:l.source+'|'+l.target,source:l.source,target:l.target,label:l.label,provisional:l.provisional?1:0}});
   });
   if(ctx.state().motion)cy.nodes().grabify();
   else cy.nodes().ungrabify();
  }
  function runLayout(animate){
   var motion=ctx.state().motion&&animate;
   layoutRunning=true;
   var layout=cy.layout({
    name:'cose',
    animate:!!motion,
    animationDuration:700,
    animationEasing:'ease-out',
    randomize:false,
    fit:false,
    padding:28,
    nodeRepulsion:9000,
    idealEdgeLength:function(edge){return edge.hasClass('hot')?80:150},
    gravity:0.35,
    numIter:motion?180:320
   });
   layout.one('layoutstop',function(){
    layoutRunning=false;
    ctx.onReady();
    paint();
    if(pendingFocus)applyFocus(pendingFocus);
   });
   layout.run();
   if(!motion){layoutRunning=false;paint();ctx.onReady();if(pendingFocus)applyFocus(pendingFocus)}
  }
  function applyFocus(id){
   var ele=cy.getElementById(id);
   if(!ele||ele.empty())return;
   var z=cy.zoom()||1;
   if(z<0.75)z=1;
   if(ctx.state().motion)cy.animate({center:{eles:ele},zoom:z},{duration:700,easing:'ease-out'});
   else{cy.zoom(z);cy.center(ele)}
  }
  function focusOn(id){
   pendingFocus=id;
   if(!layoutRunning)applyFocus(id);
  }
  return {
   refresh:function(){
    var st=ctx.state();
    sync();
    applyStyle();
    paint();
    if(!st.motion){
     if(laidFor!==st.selected){runLayout(false);laidFor=st.selected}
     else cy.nodes().lock();
     cy.autoungrabify(true);
    }else{
     cy.nodes().unlock();
     cy.autoungrabify(false);
     laidFor=null;
     runLayout(true);
    }
   },
   paint:function(){applyStyle();paint()},
   resize:function(){cy.resize();paint()},
   fit:function(){
    if(ctx.state().motion)cy.animate({fit:{eles:cy.elements(),padding:36}},{duration:600,easing:'ease-out'});
    else cy.fit(cy.elements(),36);
   },
   zoomBy:function(k){
    var z=Math.max(cy.minZoom(),Math.min(cy.maxZoom(),(cy.zoom()||1)*k));
    if(ctx.state().motion)cy.animate({zoom:z},{duration:250,easing:'ease-out'});
    else cy.zoom(z);
   },
   positions:function(){
    var out={};
    cy.nodes().forEach(function(n){var p=n.position();out[n.id()]={x:p.x,y:p.y}});
    return out;
   },
   focusOn:focusOn,
   setMotion:function(on){
    if(!on){cy.stop();cy.nodes().ungrabify();cy.autoungrabify(true)}
    else{cy.nodes().grabify();cy.autoungrabify(false)}
   },
   pause:function(){cy.stop()}
  };
 };
})();
