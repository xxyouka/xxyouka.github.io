(function(){
  var base = location.pathname.indexOf('/web/')!==-1 ? '../' : '';
  var s = document.createElement('script');
  s.src = base + 'assets/js/site.js';
  s.defer = true;
  document.head.appendChild(s);
})();
