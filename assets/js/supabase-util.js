;(function(){
  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src; s.async=true; s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
    });
  }
  async function ensureLibrary(){
    if(window.supabase && window.supabase.createClient) return true;
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.47.4/dist/umd/supabase.min.js');
    } catch(e){
      try { await loadScript('https://unpkg.com/@supabase/supabase-js@2.47.4/dist/umd/supabase.min.js'); }
      catch(err){ return false; }
    }
    const start=Date.now();
    while(!(window.supabase && window.supabase.createClient)){
      if(Date.now()-start>5000) return false;
      await new Promise(r=>setTimeout(r,100));
    }
    return true;
  }
  async function ensureConfig(){
    if(window.SUPABASE_URL && window.SUPABASE_ANON_KEY) return true;
    const base = location.pathname.indexOf('/web/')!==-1 ? '../' : '';
    try { await loadScript(base+'assets/js/supabase-config.js'); }
    catch(err){ return false; }
    return !!(window.SUPABASE_URL && window.SUPABASE_ANON_KEY);
  }
  async function getClient(){
    const okLib = await ensureLibrary();
    const okCfg = await ensureConfig();
    if(!okLib || !okCfg) return null;
    return window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }
  window.SupaUtil = { getClient };
})();
