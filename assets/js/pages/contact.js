// Module: Contact Page Scripts | Author: 潇 | Updated: 2025-11-27
document.addEventListener('DOMContentLoaded',()=>{
  const notification=document.getElementById('notification');
  function showNotification(message,type='success'){notification.textContent=message;notification.className=`notification ${type}`;notification.classList.add('show');setTimeout(()=>{notification.classList.remove('show');},4000);} 
  const contactForm=document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',async(e)=>{
      e.preventDefault();
      if(contactForm.querySelector('input[name="_gotcha"]').value){return;}
      const submitBtn=document.getElementById('submit-btn');
      const submitText=document.getElementById('submit-text');
      if(submitBtn) submitBtn.disabled=true; if(submitText) submitText.textContent='发送中...';
      if(!window.SupaUtil){
        const s=document.createElement('script');s.src='../assets/js/supabase-util.js';document.head.appendChild(s);
      }
      const client=await (window.SupaUtil?window.SupaUtil.getClient():null);
      if(!client){showNotification('配置错误：Supabase 未加载','error');if(submitBtn) submitBtn.disabled=false;if(submitText) submitText.textContent='发送消息';return;}
      const fd=new FormData(contactForm);
      const data={name:fd.get('name'),email:fd.get('contact'),subject:fd.get('subject'),message:fd.get('message')};
      if(!data.name||!data.email||!data.subject||!data.message){showNotification('请填写所有必填字段','error');if(submitBtn) submitBtn.disabled=false;if(submitText) submitText.textContent='发送消息';return;}
      try{
        const {error}=await client.from('contact_messages').insert(data);
        if(error){showNotification(`发送失败：${error.message}`,'error');}
        else{showNotification('已发送成功');contactForm.reset();}
      }catch(err){showNotification(`发送失败：${err.message}`,'error');}
      finally{if(submitBtn) submitBtn.disabled=false;if(submitText) submitText.textContent='发送消息';}
    });
  }
});
