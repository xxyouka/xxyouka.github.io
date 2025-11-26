document.addEventListener('DOMContentLoaded',()=>{
  const y=document.getElementById('year');
  if(y)y.textContent=new Date().getFullYear();
  const cy=document.getElementById('current-year');
  if(cy)cy.textContent=new Date().getFullYear();
  const navToggle=document.getElementById('nav-toggle');
  const mobileNav=document.getElementById('mobile-nav');
  const closeNav=document.getElementById('close-nav');
  if(navToggle&&mobileNav){
    navToggle.addEventListener('click',()=>{
      mobileNav.classList.add('open');
      document.body.style.overflow='hidden';
    });
  }
  if(closeNav&&mobileNav){
    closeNav.addEventListener('click',()=>{
      mobileNav.classList.remove('open');
      document.body.style.overflow='';
    });
  }
  if(mobileNav){
    mobileNav.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click',()=>{
        mobileNav.classList.remove('open');
        document.body.style.overflow='';
      });
    });
  }
});
