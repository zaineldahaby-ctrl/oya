(()=>{
  /* إصلاح النصوص العربية/المكسورة المتبقّية في الوضع الإنجليزي */
  const FIX={
   "Edit مجموعة خصائص":"Edit attribute set",
   "عدّل الحزمة والخصائص وSectorات المرتبطة":"Edit the bundle, attributes and linked sectors",
   "إخفاء الإنجليزية":"Hide English",
   "مجموعات صفات مُضمّنة":"Included attribute sets",
   "(تُضاف كل صفاتها لهذه المجموعة — تداخل زي زوهو)":"(All their attributes are added to this set — Zoho-style nesting)",
   "لا مجموعات مُضمّنة — أضف From اليمين":"No included sets — add from the right",
   "اسحب أو أضف خصائص From اليمين":"Drag or add attributes from the right",
   "المُضمّنة (":"Included (",
   "ربط":"Link",
   "فكّ الربط":"Unlink",
   "حذف نهائي لتعريف المجموعة":"Permanent deletion of the set definition",
   "لا يمكن تضمين المجموعة داخل نفسها":"A set cannot be included within itself",
   "لا يمكن حذف مجموعة مرتبطة بـ 1 قطاع. افصل القطاعات أولًا.":"A set linked to 1 sector cannot be deleted. Unlink the sectors first.",
   "اSearch للوصول للصناعات والمزيد":"Search to reach industries and more",
   /* أسماء الخصائص */
   "رمز النظام الFromسّق":"Harmonized System code",
   "نوع الFromتج":"Product type",
   "شكل الFromتج":"Product form",
   "نوع الClose":"Closure type",
   "بلد الFromشأ":"Country of origin",
   "الجنس الFromاسب":"Suitable gender",
   "Fromتج نباتي":"Plant-based product",
   "Fromاسب للسفر":"Travel-friendly",
   "Fromفذ شحن USB":"USB charging port",
   /* أسماء المجموعات */
   "خصائص الFromسوجات":"Textile attributes",
   "خصائص التعبئة والPackaging":"Packaging attributes",
   "خصائص الصناعات الغذائية والسلامة":"Food safety attributes",
   "خصائص الLeather":"Leather attributes",
   "خصائص الFurniture":"Furniture attributes",
   "خصائص الFromتجات الكيماوية":"Chemical products attributes",
   "خصائص Security":"Security attributes",
   /* سمات (title / placeholder / aria-label / value) */
   "طيّ/فتح القائمة":"Collapse / expand list",
   "غير مرتبط — اضغط للربط":"Not linked — click to link",
   "مرتبط — اضغط لفكّ الربط":"Linked — click to unlink",
   "طيّ العمود":"Collapse column",
   "اSearch عن مجموعة لإضافتها...":"Search for a set to add...",
   "مطلوب (تجاوز)":"Required (override)",
   "اختيارات للView only — تُدار From مكتبة الصفات":"Read-only options — managed from the attribute library",
   "خصائص السلامة الغذائية":"Food safety attributes"
  };
  const RX=[
   [/^(\d+)\s*صفة$/,"$1 attrs"],
   [/^\+(\d+)\s*أخرى — اSearch للتضييق$/,"+$1 more — search to narrow"],
   [/صفة/g,"attrs"]
  ];
  const apply=()=>{
    const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let n;let c=0;
    while(n=w.nextNode()){
      let t=n.nodeValue; if(!t||!/[\u0600-\u06FF]/.test(t)) continue;
      const k=t.trim();
      if(FIX[k]){ n.nodeValue=t.replace(k,FIX[k]); c++; continue; }
      for(const [rx,rep] of RX){ if(rx.test(k)){ n.nodeValue=t.replace(rx,rep); c++; break; } }
    }
    /* العناوين والتلميحات في السمات */
    document.querySelectorAll('*').forEach(e=>{
      ['title','placeholder','aria-label','value','alt'].forEach(a=>{
        const v=e.getAttribute&&e.getAttribute(a);
        if(!v||!/[\u0600-\u06FF]/.test(v))return;
        if(FIX[v]){e.setAttribute(a,FIX[v]);if(a==='value'&&'value' in e)e.value=FIX[v];c++;return;}
        for(const [rx,rep] of RX){if(rx.test(v)){const nv=v.replace(rx,rep);e.setAttribute(a,nv);
          if(a==='value'&&'value' in e)e.value=nv;c++;break;}}});});
    return c;
  };
  const n=apply();
  window.__oyaFixEN=apply;
  new MutationObserver(()=>{apply();}).observe(document.body,{childList:true,subtree:true});
  return 'fixed:'+n;
})()
