// Module: Projects Page Scripts | Author: 潇 | Updated: 2025-11-27
const projectData={
  1:{title:"个人网站搭建",description:"我已成功构建并部署个人作品集网站到GitHub Pages，展示我的学习成果和学习项目。这个项目帮助我掌握了现代前端开发技术和最佳实践。",achievements:["实现了响应式设计，确保在各种设备上良好显示","使用HTML5语义化标签和现代CSS布局技术","通过JavaScript实现了交互功能","优化了网站性能和加载速度","成功部署到GitHub Pages"],technologies:["HTML5","CSS3","JavaScript","Tailwind CSS","Git","GitHub Pages"],github:"https://github.com/xxyouka/xxyouka.github.io",demo:"#",status:"已完成",progress:100},
  2:{title:"微信小程序开发",description:"我正在学习微信小程序开发，已了解基础概念和框架，计划开发一个实用的个人工具类小程序。",learningGoals:["理解微信小程序的基本架构和开发流程","掌握WXML和WXSS的使用方法","学习小程序组件的使用和自定义组件开发","掌握小程序API的调用和数据管理","了解小程序云开发和服务端集成"],currentProgress:"已了解小程序基础概念和框架，正在实践页面布局和基础组件使用。",nextSteps:["设计并实现个人工具类小程序的原型","学习小程序数据绑定和事件处理","掌握小程序API调用和云开发","完成小程序的测试和发布流程"],technologies:["微信小程序","JavaScript","WXML/WXSS","小程序云开发"],status:"进行中",progress:25},
  3:{title:"安卓App开发",description:"我正在学习Android应用开发，已了解部分知识，目标是开发一个完整的个人管理类应用。",learningGoals:["掌握Android应用的基本架构和生命周期","学习使用Android Studio和开发工具","理解Activity、Fragment和布局设计","掌握数据存储和网络请求","学习Material Design设计原则"],currentProgress:"已了解Android开发环境和基础UI组件，正在实践布局设计和简单交互。",nextSteps:["设计个人管理应用的界面和功能","学习Android数据存储(SQLite/SharedPreferences)","掌握网络请求和API集成","了解应用发布流程和商店上架"],technologies:["Android","Java","Kotlin","Android Studio","Material Design"],status:"进行中",progress:20},
  4:{title:"单片机学习",description:"我正在学习单片机原理和编程，已了解部分知识，计划制作一个智能家居控制原型。",learningGoals:["理解单片机的基本原理和架构","掌握C/C++在嵌入式开发中的应用","学习传感器数据采集和处理","了解通信协议(I2C, SPI, UART)","掌握简单的电路设计和焊接技能"],currentProgress:"已了解单片机基础概念和Arduino编程，正在实践简单的传感器控制。",nextSteps:["设计智能家居控制系统的原型","学习多种传感器的集成和使用","掌握无线通信模块的应用","完成一个完整的物联网项目"],technologies:["Arduino","C/C++","嵌入式系统","电子电路","传感器"],status:"进行中",progress:15},
  5:{title:"Java编程学习",description:"我正在系统学习Java编程语言，已掌握基础语法和面向对象概念，正在深入学习数据结构和算法。",learningGoals:["掌握Java语言基础和面向对象编程","理解常用数据结构和算法","学习Java集合框架和IO操作","掌握异常处理和多线程编程","了解Java网络编程和数据库连接"],currentProgress:"已掌握Java基础语法和面向对象概念，正在实践数据结构和算法实现。",nextSteps:["深入学习Java集合框架和泛型","掌握多线程编程和并发控制","学习Java网络编程和Socket通信","实践数据库连接和JDBC使用"],technologies:["Java","面向对象","数据结构","算法","集合框架"],status:"进行中",progress:50},
  6:{title:"JUnit单元测试学习",description:"我正在学习JUnit单元测试框架，已掌握基础用法，正在实践测试驱动开发方法。",learningGoals:["掌握JUnit测试框架的基本使用","理解测试驱动开发(TDD)方法论","学习Mockito等测试辅助工具","掌握测试覆盖率和代码质量分析","了解持续集成中的自动化测试"],currentProgress:"已掌握JUnit基础用法，正在实践单元测试编写和测试驱动开发流程。",nextSteps:["深入学习Mockito等模拟框架","实践测试驱动开发完整流程","掌握测试覆盖率和代码质量工具","学习集成测试和系统测试方法"],technologies:["JUnit","单元测试","测试驱动开发","Mockito","代码质量"],status:"进行中",progress:40}
};
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{document.querySelectorAll('.progress-fill').forEach(p=>{const w=p.style.width;p.style.width='0';setTimeout(()=>{p.style.width=w;},100);});},500);
  const filterButtons=document.querySelectorAll('.filter-btn');
  const projectCards=document.querySelectorAll('.project-card');
  filterButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterButtons.forEach(b=>{b.classList.remove('active','bg-indigo-500','text-white');b.classList.add('bg-gray-200','text-gray-700');});
      btn.classList.add('active','bg-indigo-500','text-white');btn.classList.remove('bg-gray-200','text-gray-700');
      const fv=btn.getAttribute('data-filter');
      projectCards.forEach(card=>{
        if(fv==='all'||card.getAttribute('data-status')===fv){card.style.display='flex';card.classList.add('animate-fadeInUp');}
        else{card.style.display='none';card.classList.remove('animate-fadeInUp');}
      });
    });
  });
  const modal=document.getElementById('project-modal');
  const closeModal=document.getElementById('close-modal');
  const modalTitle=document.getElementById('modal-title');
  const modalContent=document.getElementById('modal-content');
  document.querySelectorAll('.view-details').forEach(button=>{
    button.addEventListener('click',()=>{
      const pid=button.getAttribute('data-project');const p=projectData[pid];
      if(p){
        modalTitle.textContent=p.title;
        if(p.status==='已完成'){
          modalContent.innerHTML=`<div class="mb-6"><span class="project-status status-completed">${p.status}</span><div class="mt-2"><div class="flex justify-between text-sm text-gray-600"><span>完成进度</span><span>${p.progress}%</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${p.progress}%"></div></div></div></div><p class="text-gray-700 mb-6">${p.description}</p><div class="mb-6"><h4 class="font-semibold text-lg mb-3 text-gray-800">项目成果</h4><ul class="achievement-list text-gray-700 space-y-2">${p.achievements.map(a=>`<li>${a}</li>`).join('')}</ul></div><div class="mb-6"><h4 class="font-semibold text-lg mb-3 text-gray-800">技术栈</h4><div class="flex flex-wrap gap-2">${p.technologies.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div></div><div class="pt-4 flex gap-4"><a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link text-indigo-500 hover:text-indigo-600 font-medium"><i class="fab fa-github"></i> 查看源码</a></div>`;
        }else{
          modalContent.innerHTML=`<div class="mb-6"><span class="project-status status-in-progress">${p.status}</span><div class="mt-2"><div class="flex justify-between text-sm text-gray-600"><span>学习进度</span><span>${p.progress}%</span></div><div class="progress-bar"><div class="progress-fill" style="width: ${p.progress}%"></div></div></div></div><p class="text-gray-700 mb-6">${p.description}</p><div class="mb-6"><h4 class="font-semibold text-lg mb-3 text-gray-800">学习目标</h4><ul class="goal-list text-gray-700 space-y-2">${p.learningGoals.map(g=>`<li>${g}</li>`).join('')}</ul></div><div class="mb-6"><h4 class="font-semibold text-lg mb-3 text-gray-800">当前进展</h4><p class="text-gray-700">${p.currentProgress}</p></div><div class="mb-6"><h4 class="font-semibold text-lg mb-3 text-gray-800">下一步计划</h4><ul class="step-list text-gray-700 space-y-2">${p.nextSteps.map(s=>`<li>${s}</li>`).join('')}</ul></div><div class="mb-6"><h4 class="font-semibold text-lg mb-3 text-gray-800">技术栈</h4><div class="flex flex-wrap gap-2">${p.technologies.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div></div>`;
        }
        modal.classList.add('open');document.body.style.overflow='hidden';
      }
    });
  });
  closeModal.addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow='';});
  modal.addEventListener('click',(e)=>{if(e.target===modal){modal.classList.remove('open');document.body.style.overflow='';}});
});
