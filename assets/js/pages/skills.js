// Module: Skills Page Scripts | Author: 潇 | Updated: 2025-11-27
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{document.querySelectorAll('.progress').forEach(p=>{p.style.width=p.classList.contains('w-4/5')?'80%':'75%';});},500);
  document.querySelectorAll('.skill-card').forEach(card=>{
    card.addEventListener('mouseenter',()=>{card.style.transform='translateY(-8px) scale(1.02)';});
    card.addEventListener('mouseleave',()=>{card.style.transform='translateY(0) scale(1)';});
  });
});
