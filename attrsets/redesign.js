(()=>{
  /* ===== طبقة تعديلات التصميم المعتمد (من كانفس فيجما) ===== */
  const st=document.createElement('style'); st.id='oya-redesign';
  st.textContent=`
  /* 1) أزرار الطيّ الجانبية محذوفة */
  .asx-edge-fold{display:none!important}
  /* 2) صف المجموعة: سطر واحد بلا وصف */
  .asx-set-m > span{display:none!important}
  .asx-set{padding-top:9px!important;padding-bottom:9px!important}
  .asx-set-m > b{font-size:12.5px!important;font-weight:700!important}
  /* 3) بطاقة الخاصية: مدمجة — بلا B2B وبلا سطر الوصف */
  .asx-attr-m > b > .asx-attr-tag.b2b:last-of-type{display:none!important}   /* شريحة B2B */
  .asx-attr-m > span{display:none!important}                                  /* سطر الوصف */
  .asx-attr{padding:9px 10px!important}
  .asx-attr-h{align-items:center!important;gap:8px!important}
  .asx-attr-m > b{display:flex!important;flex-wrap:wrap;align-items:center;gap:6px;
    font-size:12.5px!important;line-height:1.25!important}
  .asx-attr-tag{font-size:10.5px!important;padding:2px 7px!important;white-space:nowrap}
  `;
  document.head.appendChild(st);

  /* 4) المصطلحات: الكلمة الكاملة بدل الاختصار — دائمة رغم إعادة البناء */
  const TERM={'Req':'Required','مطلوب':'Required'};
  const applyTerms=()=>{document.querySelectorAll('.asx-attr-tag').forEach(t=>{
    const v=(t.textContent||'').trim(); if(TERM[v]) t.textContent=TERM[v];});};
  applyTerms();
  window.__oyaApplyTerms=applyTerms;
  const mo=new MutationObserver(()=>{applyTerms();});
  mo.observe(document.body,{childList:true,subtree:true});

  /* 5) كود القطاع يبقى كما هو (SEC-FOO) بلا ترجمة */
  document.querySelectorAll('[class*=asx-c3] [class*=code],.asx-c3-titlerow span').forEach(e=>{
    const v=(e.textContent||'').trim();
    const m=v.match(/^(SEC|ASET)-[A-Z]{2,4}$/);
    if(m) e.setAttribute('data-locked','1');
  });
  return 'redesign-applied';
})()
