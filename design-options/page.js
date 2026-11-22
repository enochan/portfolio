(function(){
 var els=document.querySelectorAll('.reveal');
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
  try{
   var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});
   document.documentElement.classList.add('reveal-ready');
   els.forEach(function(e){io.observe(e)});
  }catch(err){
   document.documentElement.classList.remove('reveal-ready');
   els.forEach(function(e){e.classList.add('on')});
  }
 }else{els.forEach(function(e){e.classList.add('on')})}
 function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
 function visibleDate(d){
  var m=String(d||'').match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if(!m)return '';
  var s=Number(m[1])+'年'+Number(m[2])+'月';
  if(m[3])s+=Number(m[3])+'日';
  return s;
 }
 function todayTokyo(){
  try{
   var parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
   var o={};
   parts.forEach(function(p){if(p.type!=='literal')o[p.type]=p.value});
   if(!o.year||!o.month||!o.day)return '';
   return o.year+'-'+o.month+'-'+o.day;
  }catch(e){return ''}
 }
 var today=todayTokyo();
 var upcoming=document.getElementById('upcoming'),upList=upcoming.querySelector('ol'),more=document.querySelector('.more');
 var countText=document.getElementById('count-text'),tlEmpty=document.getElementById('tl-empty'),tlResetWrap=document.getElementById('tl-reset-wrap');
 var tlError=document.getElementById('tl-error');

 function buildItem(d){
  var li=el('li'),ev=el('div','ev'),meta=el('div','meta'),time=el('time'),title=el('h4');
  li.dataset.type=d.type;
  time.setAttribute('datetime',d.date);
  time.textContent=visibleDate(d.date);
  meta.appendChild(el('span','badge',d.label));meta.appendChild(time);
  if(d.media)meta.appendChild(el('span','',d.media));
  if(d.url){var a=el('a','',d.title);a.href=d.url;title.appendChild(a)}else title.textContent=d.title;
  ev.appendChild(meta);ev.appendChild(title);
  if(d.detail)ev.appendChild(el('span','w',d.detail));
  li.appendChild(ev);
  return li;
 }
 function yearList(y){
  var blocks=document.querySelectorAll('.year:not(#upcoming)');
  for(var i=0;i<blocks.length;i++){
   var h=blocks[i].querySelector('h3').textContent.trim();
   if(h===y)return blocks[i].querySelector('ol');
   if(h<y)break;
  }
  var block=el('div','year'),ol=el('ol','tl');
  block.appendChild(el('h3','',y));block.appendChild(ol);
  (blocks[i]||more).parentNode.insertBefore(block,blocks[i]||more);
  return ol;
 }
 function dateOf(li){var t=li.querySelector('time');return t?t.getAttribute('datetime'):''}
 function insertSorted(ol,li,asc){
  var d=dateOf(li),sib=[].find.call(ol.children,function(x){return asc?dateOf(x)>d:dateOf(x)<d});
  ol.insertBefore(li,sib||null);
 }
 function toPlan(li){
  var badge=el('span','badge plan','予定');
  li.classList.add('plan');
  var meta=li.querySelector('.meta');
  meta.insertBefore(badge,meta.firstChild);
  insertSorted(upList,li,true);
 }
 if(today){
  document.querySelectorAll('.year:not(#upcoming) ol.tl li').forEach(function(li){
   var d=dateOf(li);
   if(/^\d{4}-\d{2}-\d{2}$/.test(d)&&d>today){var ol=li.parentNode;toPlan(li);if(!ol.children.length)ol.parentNode.remove()}
  });
 }
 upcoming.hidden=!upList.children.length;

 function choiceOf(root){
  var input=root.querySelector('input:checked');
  return {value:input.value,label:input.closest('label').textContent.replace(/\s+/g,' ').trim()};
 }
 var tlCurrent='all';
 function applyFilter(){
  var n=0,plans=0,picked=choiceOf(document.getElementById('tl-filters')),label=picked.label;
  tlCurrent=picked.value;
  document.querySelectorAll('#timeline ol.tl li').forEach(function(li){var show=tlCurrent==='all'||li.dataset.type===tlCurrent;li.hidden=!show;if(show){n++;if(li.classList.contains('plan'))plans++}});
  document.querySelectorAll('#timeline .year').forEach(function(y){y.hidden=!y.querySelector('li:not([hidden])')});
  countText.textContent=label+'：'+n+'件を表示しています'+(plans?'（うち予定'+plans+'件）':'');
  var none=n===0;
  tlEmpty.hidden=!none;
  tlResetWrap.hidden=!none;
 }
 document.getElementById('tl-filters').addEventListener('change',applyFilter);
 document.getElementById('tl-reset').addEventListener('click',function(){
  var all=document.querySelector('#tl-filters input[value="all"]');
  all.checked=true;
  all.focus();
  applyFilter();
 });
 applyFilter();

 fetch('../events.json',{cache:'no-cache'})
  .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
  .then(function(data){
   if(!Array.isArray(data))throw new Error('トップレベルが配列ではありません');
   data.forEach(function(d){
    if(!d||!/^\d{4}-\d{2}-\d{2}$/.test(d.date||'')||!d.title||!d.type||!d.label){console.error('events.json の項目に date（YYYY-MM-DD）、type、label、title のいずれかがありません',d);return}
    var li=buildItem(d);
    if(today&&d.date>today)toPlan(li);else insertSorted(yearList(d.date.slice(0,4)),li,false);
   });
   upcoming.hidden=!upList.children.length;
   applyFilter();
  })
  .catch(function(e){
   console.error('events.json を読み込めませんでした',e);
   tlError.textContent='追加の予定を表示できませんでした';
  });

 var worksLoaded=false,worksCurrent='all';
 var worksList=document.getElementById('works-list');
 var worksCountText=document.getElementById('works-count-text');
 var worksEmpty=document.getElementById('works-empty'),worksResetWrap=document.getElementById('works-reset-wrap');
 var worksError=document.getElementById('works-error');
 var workLabel={paper:'論文',patent:'特許',award:'受賞',book:'書籍'};
 function buildWork(d){
  var li=el('li'),ev=el('div','ev'),meta=el('div','meta'),title=el('h3'),sub=el('span','w'),bits=[];
  li.dataset.type=d.type;
  meta.appendChild(el('span','badge',workLabel[d.type]||d.type));
  if(d.type==='patent')meta.appendChild(el('span','when',d.number));
  else if(d.year){var time=el('time');time.setAttribute('datetime',String(d.year));time.textContent=d.year+'年';meta.appendChild(time)}
  if(d.reviewed)meta.appendChild(el('span','rev','査読あり'));
  title.textContent=d.title;
  if(d.lang==='en'||(/[A-Za-z]/.test(d.title)&&!/[\u3040-\u30ff\u4e00-\u9faf]/.test(d.title)))title.lang='en';
  if(d.work)bits.push('「'+d.work+'」');
  if(d.venue)bits.push(d.venue);
  if(d.people)bits.push(d.people);
  if(d.note)bits.push(d.note);
  sub.textContent=bits.join('。')+(bits.length?'。':'');
  ev.appendChild(meta);ev.appendChild(title);ev.appendChild(sub);
  li.appendChild(ev);
  return li;
 }
 function applyWorks(){
  var n=0,picked=choiceOf(document.getElementById('works-filters')),label=picked.label;
  worksCurrent=picked.value;
  worksList.querySelectorAll('li').forEach(function(li){var show=worksCurrent==='all'||li.dataset.type===worksCurrent;li.hidden=!show;if(show)n++});
  worksCountText.textContent=label+'：'+n+'件を表示しています';
  var none=worksLoaded&&n===0;
  worksEmpty.hidden=!none;
  worksResetWrap.hidden=!none;
 }
 document.getElementById('works-filters').addEventListener('change',applyWorks);
 document.getElementById('works-reset').addEventListener('click',function(){
  var all=document.querySelector('#works-filters input[value="all"]');
  all.checked=true;
  all.focus();
  applyWorks();
 });
 fetch('../works.json',{cache:'no-cache'})
  .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
  .then(function(data){
   if(!Array.isArray(data))throw new Error('トップレベルが配列ではありません');
   data.forEach(function(d){
    if(!d||!d.type||!d.title||!workLabel[d.type]){console.error('works.json の項目に type か title がありません',d);return}
    if(d.type==='patent'&&!d.number){console.error('works.json の特許に番号がありません',d);return}
    worksList.appendChild(buildWork(d));
   });
   worksLoaded=true;
   applyWorks();
  })
  .catch(function(e){
   console.error('works.json を読み込めませんでした',e);
   worksError.textContent='研究業績を表示できませんでした';
  });


 var form=document.getElementById('contact-form'),status=document.getElementById('form-status'),submit=form.querySelector('.submit'),sending=false,tried=false;
 form.noValidate=true;
 var checks=[
  {el:form.elements.namedItem('name'),msg:function(v){return v?'':'お名前を入力してください。'}},
  {el:form.elements.namedItem('email'),msg:function(v,e){return !v?'メールアドレスを入力してください。':e.validity.typeMismatch?'メールアドレスの形式で入力してください（例：name@example.com）。':''}},
  {el:form.elements.namedItem('message'),msg:function(v){return v?'':'お問い合わせ内容を入力してください。'}}
 ];
 function validate(){
  var bad=[];
  checks.forEach(function(c){
   var m=c.msg(c.el.value.trim(),c.el);
   document.getElementById(c.el.id+'-err').textContent=m;
   if(m){c.el.setAttribute('aria-invalid','true');bad.push(c.el)}else c.el.removeAttribute('aria-invalid');
  });
  return bad;
 }
 function setStatus(cls,text){status.className='status'+(cls?' '+cls:'');status.textContent=text}
 checks.forEach(function(c){c.el.addEventListener('input',function(){if(tried)validate()})});
 form.addEventListener('submit',function(e){
  e.preventDefault();
  if(sending)return;
  tried=true;
  var bad=validate();
  if(bad.length){setStatus('error','入力内容に'+bad.length+'件の問題があります。各項目のメッセージを確認してください。');bad[0].focus();return}
  sending=true;
  submit.setAttribute('aria-disabled','true');
  setStatus('sending','送信しています…');
  var body={};new FormData(form).forEach(function(v,k){body[k]=v});
  fetch('https://formsubmit.co/ajax/dffb1aba5090e823fb3f12306cceace2',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(body)})
   .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok||String(j.success)!=='true')throw new Error(j.message||r.status)})})
   .then(function(){
    form.reset();tried=false;
    setStatus('done','お問い合わせを送信しました。ありがとうございました。');
    status.focus();
   })
   .catch(function(err){
    console.error(err);
    setStatus('error','送信できませんでした。通信状況を確認して、もう一度お試しください。');
   })
   .then(function(){sending=false;submit.removeAttribute('aria-disabled')});
 });

 var themeBtn=document.getElementById('theme'),themeReset=document.getElementById('theme-reset');
 function lockedTheme(){return document.documentElement.getAttribute('data-theme')}
 function effectiveDark(){
  var t=lockedTheme();
  if(t==='dark'||t==='light')return t==='dark';
  return matchMedia('(prefers-color-scheme: dark)').matches;
 }
 function themeLabel(){themeBtn.textContent=effectiveDark()?'明るい表示にする':'暗い表示にする'}
 function setSchemeMeta(value){
  var m=document.querySelector('meta[name="color-scheme"]');
  if(m)m.setAttribute('content',value);
 }
 function themeColor(t){
  var root=document.documentElement;
  var contrast=matchMedia('(prefers-contrast: more)').matches;
  if(t==='dark') return contrast?(root.getAttribute('data-dark-contrast')||root.getAttribute('data-dark')):root.getAttribute('data-dark');
  return root.getAttribute('data-light');
 }
 function setThemeColor(t){
  var metas=[].slice.call(document.querySelectorAll('meta[name="theme-color"]'));
  if(t==='dark'||t==='light'){
   var color=themeColor(t);
   metas.forEach(function(m){m.setAttribute('content',color);m.removeAttribute('media')});
  }else if(metas[0]&&metas[1]){
   var root=document.documentElement;
   metas[0].setAttribute('content',root.getAttribute('data-light'));
   metas[0].setAttribute('media','(prefers-color-scheme: light)');
   metas[1].setAttribute('content',root.getAttribute('data-dark'));
   metas[1].setAttribute('media','(prefers-color-scheme: dark)');
  }
 }
 function syncReset(){themeReset.hidden=!lockedTheme()}
 themeLabel();
 syncReset();
 themeBtn.addEventListener('click',function(){
  var next=effectiveDark()?'light':'dark';
  document.documentElement.setAttribute('data-theme',next);
  try{localStorage.setItem('design-tone-theme',next)}catch(e){}
  setSchemeMeta(next);
  setThemeColor(next);
  themeLabel();
  syncReset();
 });
 themeReset.addEventListener('click',function(){
  try{localStorage.removeItem('design-tone-theme')}catch(e){}
  document.documentElement.removeAttribute('data-theme');
  setSchemeMeta('light dark');
  setThemeColor(null);
  themeLabel();
  syncReset();
  themeBtn.focus();
 });
 matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){
  if(!lockedTheme()){setSchemeMeta('light dark');setThemeColor(null);themeLabel()}
  else setThemeColor(lockedTheme());
 });
 matchMedia('(prefers-contrast: more)').addEventListener('change',function(){
  if(lockedTheme())setThemeColor(lockedTheme());
 });
})();
