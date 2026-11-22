(function(){
 var themeBtn=document.getElementById('theme'),themeReset=document.getElementById('theme-reset');
 function lockedTheme(){return document.documentElement.getAttribute('data-theme')}
 function effectiveDark(){
  var t=lockedTheme();
  if(t==='dark'||t==='light')return t==='dark';
  return matchMedia('(prefers-color-scheme: dark)').matches;
 }
 function themeLabel(){if(themeBtn)themeBtn.textContent=effectiveDark()?'明るい表示にする':'暗い表示にする'}
 function setSchemeMeta(value){
  var m=document.querySelector('meta[name="color-scheme"]');
  if(m)m.setAttribute('content',value);
 }
 function themeColor(t){
  var contrast=matchMedia('(prefers-contrast: more)').matches;
  return t==='dark'?(contrast?'#14110f':'#1f1b18'):'#fffaf3';
 }
 function setThemeColor(t){
  var metas=[].slice.call(document.querySelectorAll('meta[name="theme-color"]'));
  if(t==='dark'||t==='light'){
   var color=themeColor(t);
   metas.forEach(function(m){m.setAttribute('content',color);m.removeAttribute('media')});
  }else if(metas[0]&&metas[1]){
   metas[0].setAttribute('content','#fffaf3');
   metas[0].setAttribute('media','(prefers-color-scheme: light)');
   metas[1].setAttribute('content','#1f1b18');
   metas[1].setAttribute('media','(prefers-color-scheme: dark)');
  }
 }
 function syncReset(){if(themeReset)themeReset.hidden=!lockedTheme()}
 themeLabel();
 syncReset();
 if(themeBtn)themeBtn.addEventListener('click',function(){
  var next=effectiveDark()?'light':'dark';
  document.documentElement.setAttribute('data-theme',next);
  try{localStorage.setItem('layout-theme',next)}catch(e){}
  setSchemeMeta(next);
  setThemeColor(next);
  themeLabel();
  syncReset();
 });
 if(themeReset)themeReset.addEventListener('click',function(){
  try{localStorage.removeItem('layout-theme')}catch(e){}
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

 function wireFilters(rootId,countId,emptyId,resetWrapId,resetId){
  var root=document.getElementById(rootId);
  if(!root)return;
  var countText=document.getElementById(countId);
  var empty=document.getElementById(emptyId);
  var resetWrap=document.getElementById(resetWrapId);
  function choice(){
   var input=root.querySelector('input:checked');
   return {value:input.value,label:input.closest('label').textContent.replace(/\s+/g,' ').trim()};
  }
  function apply(){
   var n=0,plans=0,picked=choice();
   root.querySelectorAll('ol li').forEach(function(li){
    var show=picked.value==='all'||li.dataset.type===picked.value;
    li.hidden=!show;
    if(show){n++;if(li.classList.contains('plan'))plans++}
   });
   root.querySelectorAll('.year').forEach(function(y){y.hidden=!y.querySelector('li:not([hidden])')});
   if(countText)countText.textContent=picked.label+'：'+n+'件を表示しています'+(plans?'（うち予定'+plans+'件）':'');
   if(empty)empty.hidden=n!==0;
   if(resetWrap)resetWrap.hidden=n!==0;
  }
  root.addEventListener('change',apply);
  var reset=document.getElementById(resetId);
  if(reset)reset.addEventListener('click',function(){
   var all=root.querySelector('input[value="all"]');
   all.checked=true;
   all.focus();
   apply();
  });
 }
 wireFilters('timeline','count-text','tl-empty','tl-reset-wrap','tl-reset');
 wireFilters('works','works-count-text','works-empty','works-reset-wrap','works-reset');

 var form=document.getElementById('contact-form');
 if(!form)return;
 var status=document.getElementById('form-status'),submit=form.querySelector('.submit'),sending=false,tried=false;
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
})();
