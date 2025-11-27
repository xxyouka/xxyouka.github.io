const Admin = (()=>{
  let client=null;
  async function getClient(){
    if(!client){
      client = await (window.SupaUtil ? window.SupaUtil.getClient() : null);
    }
    return client;
  }
  async function log(direction, endpoint, status_code, latency_ms, error, payload){
    try{
      const c = await getClient(); if(!c) return;
      const email = (await c.auth.getUser()).data?.user?.email || null;
      await c.from('api_logs').insert({direction,endpoint,status_code,latency_ms,error,payload, user_email: email});
    }catch(e){ /* ignore */ }
  }
  async function request(action){
    const c = await getClient(); if(!c) throw new Error('No client');
    const start = performance.now();
    try{
      const res = await action(c);
      const latency = Math.round(performance.now()-start);
      await log('response', 'supabase', 200, latency, null, res);
      return res;
    }catch(e){
      const latency = Math.round(performance.now()-start);
      await log('response', 'supabase', 500, latency, e?.message, { error: e?.message });
      throw e;
    }
  }
  return { getClient, log, request };
})();
