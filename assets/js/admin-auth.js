;(function(){
  const KEY='ADMIN_AUTH_TOKEN';
  function isAuthed(){ return localStorage.getItem(KEY)==='OK'; }
  function login(u,p){ if(u==='admin'&&p==='admin112233'){ localStorage.setItem(KEY,'OK'); return true; } return false; }
  function logout(){ localStorage.removeItem(KEY); }
  window.AdminAuth={ isAuthed, login, logout };
})();
