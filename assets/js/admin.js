;(function(){
  async function getClient(){ if(window.SupaUtil && window.SupaUtil.getClient){ return await window.SupaUtil.getClient(); } return null; }
  async function fillStats(c){
    const tStart=new Date(); tStart.setHours(0,0,0,0);
    try{ const { count: total } = await c.from('contact_messages').select('*',{count:'exact',head:true}); document.getElementById('count-msg')&&(document.getElementById('count-msg').textContent=total||0); }catch(e){}
    try{ const { count: today } = await c.from('contact_messages').select('*',{count:'exact',head:true}).gte('created_at', tStart.toISOString()); document.getElementById('count-today')&&(document.getElementById('count-today').textContent=today||0); }catch(e){}
    try{ const { count: err24 } = await c.from('api_logs').select('*',{count:'exact',head:true}).gte('created_at', new Date(Date.now()-24*3600*1000).toISOString()).not('error','is',null); document.getElementById('count-error')&&(document.getElementById('count-error').textContent=err24||0); }catch(e){}
  }
  async function fillRecent(c){
    try{ const { data } = await c.from('api_logs').select('*').order('created_at',{ascending:false}).limit(10);
      const el=document.getElementById('recent'); if(!el) return; el.innerHTML=(data||[]).map(x=>{
        const ok = x.status_code && Number(x.status_code) < 400;
        return `<div class="flex items-center flex-wrap gap-2">
          <span class="text-gray-500">${new Date(x.created_at).toLocaleString()}</span>
          <span class="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs">${(x.direction||'').toUpperCase()}</span>
          <span class="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">${x.endpoint||''}</span>
          ${x.status_code?`<span class="px-2 py-1 rounded-full ${ok?'bg-emerald-100 text-emerald-700':'bg-red-100 text-red-700'} text-xs">${x.status_code}</span>`:''}
          ${x.latency_ms?`<span class="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs">${x.latency_ms}ms</span>`:''}
          ${x.error?`<span class="px-2 py-1 rounded bg-red-50 text-red-700 text-xs">${x.error}</span>`:''}
        </div>`;
      }).join('');
    }catch(e){}
  }
  function bindRealtime(c, onChange){ try{ c.channel('admin').on('postgres_changes',{event:'INSERT',schema:'public',table:'contact_messages'},()=>onChange&&onChange()).on('postgres_changes',{event:'INSERT',schema:'public',table:'api_logs'},()=>onChange&&onChange()).subscribe(); }catch(e){} }
  async function initMessages(c){
    const tbl=document.getElementById('msg-table'); const totalEl=document.getElementById('msg-total'); const pageEl=document.getElementById('msg-page'); const prev=document.getElementById('msg-prev'); const next=document.getElementById('msg-next');
    if(!tbl||!prev||!next) return;
    let page=1; const size=10; let total=0;
    async function render(){
      const from=(page-1)*size; const to=page*size-1;
      const q=await c.from('contact_messages').select('*',{count:'exact'}).order('created_at',{ascending:false}).range(from,to);
      const rows=(q.data||[]).map(x=>`<tr class="border-b hover:bg-gray-50"><td class="px-4 py-2">${x.name||''}</td><td class="px-4 py-2">${x.email||x.contact||''}</td><td class="px-4 py-2">${x.subject||''}</td><td class="px-4 py-2">${x.message||''}</td><td class="px-4 py-2">${x.created_at?new Date(x.created_at).toLocaleString():''}</td><td class="px-4 py-2"><button class="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200" data-id="${x.id}">删除</button></td></tr>`).join('');
      tbl.querySelector('tbody').innerHTML=rows; total=q.count||0; totalEl&&(totalEl.textContent=total); pageEl&&(pageEl.textContent=page);
      prev.disabled=page<=1; next.disabled=page>=Math.ceil(total/size);
      tbl.querySelectorAll('button[data-id]').forEach(b=>{ b.addEventListener('click',async ()=>{ const id=b.getAttribute('data-id'); if(!id) return; await c.from('contact_messages').delete().eq('id',id); await render(); }); });
    }
    prev.addEventListener('click',async ()=>{ if(page>1){ page--; await render(); } });
    next.addEventListener('click',async ()=>{ if(page<Math.ceil(total/size)){ page++; await render(); } });
    await render();
  }
  async function initIndex(){
    if(window.AdminAuth && !AdminAuth.isAuthed()){ location.href='login.html'; return; }
    const c=await getClient();
    if(!c){ const m=document.getElementById('msg-total'); if(m) m.textContent='0'; return; }
    await fillStats(c); await fillRecent(c); bindRealtime(c, async()=>{ await fillStats(c); await fillRecent(c); });
    await initMessages(c);
  }
  window.Admin={ getClient, initIndex };
})();
