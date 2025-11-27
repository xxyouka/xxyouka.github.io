;(function(){
  const KEY='ADMIN_AUTH_TOKEN';
  function read(storage){ try{ const v=storage.getItem(KEY); if(!v) return null; const o=JSON.parse(v); if(o.exp && Date.now()>o.exp){ storage.removeItem(KEY); return null; } return o; }catch(e){ return null; } }
  function isAuthed(){ return !!(read(localStorage)||read(sessionStorage)); }
  function write(storage){ storage.setItem(KEY, JSON.stringify({ ok:true, exp: Date.now()+7*24*3600*1000 })); }
  function writeSession(){ sessionStorage.setItem(KEY, JSON.stringify({ ok:true })); }
  function login(u,p,opts){ const remember=!!(opts&&opts.remember); if(u==='admin'&&p==='admin112233'){ if(remember) write(localStorage); else writeSession(); return true; } return false; }
  function logout(){ localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); }
  window.AdminAuth={ isAuthed, login, logout };
})();
