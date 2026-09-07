document.addEventListener('DOMContentLoaded', function(){
 (function(){
 var path = window.location.pathname.toLowerCase();
 path = path.replace(/\.html$/, '').replace(/\/$/, '') || '/';
 document.querySelectorAll('nav > ul > li > a:not(.nav-cta)').forEach(function(link){
 link.classList.remove('active');
 var href = (link.getAttribute('href') || '').toLowerCase();
 href = href.replace(/\.html$/, '').replace(/\/$/, '') || '/';
 if(path === href){ link.classList.add('active'); }
 });
 })();

 document.querySelectorAll('nav > ul > li.has-dropdown').forEach(function(item){
 item.addEventListener('mouseenter', function(){ if(window.innerWidth > 992) this.classList.add('show'); });
 item.addEventListener('mouseleave', function(){ if(window.innerWidth > 992) this.classList.remove('show'); });
 });

 var menu = document.getElementById('servicesMenu');
 var drop = document.getElementById('servicesDrop');
 var arrow = document.getElementById('servicesArrow');
 if(menu && drop){
 menu.addEventListener('mouseenter', function(){
 if(window.innerWidth > 992){
 drop.style.display='block';
 if(arrow) arrow.style.transform='rotate(180deg)';
 menu.querySelector('a').setAttribute('aria-expanded','true');
 }
 });
 menu.addEventListener('mouseleave', function(){
 if(window.innerWidth > 992){
 drop.style.display='none';
 if(arrow) arrow.style.transform='rotate(0deg)';
 menu.querySelector('a').setAttribute('aria-expanded','false');
 }
 });
 }

 var toggle = document.querySelector('.menu-toggle');
 var navUl = document.querySelector('nav > ul');
 var barsSVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';

 // Close button jo menu ke andar hoga
 var closeBtn = document.createElement('button');
 closeBtn.style.cssText = 'position:absolute;top:14px;right:14px;width:36px;height:36px;background:#f5f5f5;border:none;border-radius:8px;font-size:20px;cursor:pointer;color:#1d3557;display:flex;align-items:center;justify-content:center;z-index:100000;line-height:1;';
 closeBtn.innerHTML = '&#10005;';
 closeBtn.setAttribute('aria-label', 'Menu band karein');

 function openMenu(){
 navUl.style.cssText = 'display:flex !important;flex-direction:column;position:fixed;top:0;right:0;left:auto;height:100vh;width:290px;background:#fff;z-index:99999;padding:70px 20px 30px;box-shadow:-5px 0 30px rgba(0,0,0,.25);overflow-y:auto;gap:0;max-width:290px;';
 navUl.appendChild(closeBtn);
 toggle.setAttribute('aria-expanded','true');
 toggle.innerHTML = barsSVG;
 }

 function closeMenu(){
 navUl.style.cssText = 'display:none !important;';
 if(closeBtn.parentNode) closeBtn.parentNode.removeChild(closeBtn);
 toggle.setAttribute('aria-expanded','false');
 toggle.innerHTML = barsSVG;
 // Mobile dropdown bhi band karo
 document.querySelectorAll('nav ul li.has-dropdown').forEach(function(d){
 d.classList.remove('show');
 var subUl = d.querySelector('ul');
 if(subUl) subUl.style.cssText = '';
 });
 if(drop) drop.style.display = 'none';
 }

 closeBtn.addEventListener('click', function(e){
 e.stopPropagation();
 closeMenu();
 });

 if(toggle && navUl){
 if(window.innerWidth > 992){ navUl.style.cssText = ''; }

 toggle.addEventListener('click', function(){
 var isOpen = navUl.style.cssText.indexOf('flex') > -1;
 if(isOpen){ closeMenu(); } else { openMenu(); }
 });

 document.querySelectorAll('nav > ul > li:not(.has-dropdown) > a').forEach(function(link){
 link.addEventListener('click', function(){
 if(window.innerWidth <= 992){ closeMenu(); }
 });
 });

 window.addEventListener('resize', function(){
 if(window.innerWidth > 992){
 closeMenu();
 navUl.style.cssText = '';
 }
 });
 }

 // Mobile mein Services dropdown
 document.querySelectorAll('nav > ul > li.has-dropdown > a').forEach(function(link){
 link.addEventListener('click', function(e){
 if(window.innerWidth <= 992){
 e.preventDefault();
 e.stopPropagation();
 var li = this.closest('li.has-dropdown');
 var isOpen = li.classList.contains('show');

 // Sab band karo pehle
 document.querySelectorAll('nav ul li.has-dropdown').forEach(function(d){
 d.classList.remove('show');
 var subUl = d.querySelector('ul');
 if(subUl) subUl.setAttribute('style', 'display:none');
 });
 if(drop) drop.setAttribute('style', 'display:none');

 // Agar yeh wala band tha toh kholo
 if(!isOpen){
 li.classList.add('show');
 var subUl = li.querySelector('ul');
 if(subUl){
 subUl.setAttribute('style', 'display:block !important; position:static !important; transform:none !important; box-shadow:none !important; background:rgba(230,57,70,.04) !important; border:none !important; border-left:3px solid #e63946 !important; padding:4px 10px !important; margin:4px 0 4px 8px !important; border-radius:0 8px 8px 0 !important; min-width:auto !important; width:auto !important; max-width:240px !important; z-index:auto !important;');
 }
 }
 }
 });
 });

 document.addEventListener('keydown', function(e){
 if(e.key === 'Escape'){ closeMenu(); }
 });

 var header = document.querySelector('header');
 if(header){
 window.addEventListener('scroll', function(){
 header.classList.toggle('scrolled', window.scrollY > 50);
 }, {passive:true});
 }

 document.querySelectorAll('.faq-item').forEach(function(item){
 var q = item.querySelector('.faq-q');
 var a = item.querySelector('.faq-a');
 if(q){ q.addEventListener('click', function(){
 var active = item.classList.contains('active');
 document.querySelectorAll('.faq-item').forEach(function(i){
 i.classList.remove('active');
 var ia = i.querySelector('.faq-a');
 if(ia) ia.style.maxHeight = null;
 });
 if(!active){
 item.classList.add('active');
 if(a) a.style.maxHeight = a.scrollHeight + 'px';
 }
 }); }
 });

 var observer = new IntersectionObserver(function(entries){
 entries.forEach(function(entry){
 if(entry.isIntersecting) entry.target.classList.add('active');
 });
 }, {threshold:0.1});
 document.querySelectorAll('.reveal').forEach(function(el){
 el.classList.add('active');
 observer.observe(el);
 });

 var counters = document.querySelectorAll('.counter');
 if(counters.length){
 var cObs = new IntersectionObserver(function(entries){
 entries.forEach(function(entry){
 if(!entry.isIntersecting) return;
 var el = entry.target;
 var target = +el.getAttribute('data-target');
 var duration = 2000; var start = null;
 function step(ts){
 if(!start) start = ts;
 var progress = Math.min((ts - start)/duration, 1);
 el.textContent = Math.floor(progress * target).toLocaleString();
 if(progress < 1) requestAnimationFrame(step);
 else el.textContent = target.toLocaleString();
 }
 requestAnimationFrame(step);
 cObs.unobserve(el);
 });
 }, {threshold:0.5});
 counters.forEach(function(c){ cObs.observe(c); });
 }

 var today = new Date().toISOString().split('T')[0];
 document.querySelectorAll('input[type="date"]').forEach(function(i){ i.setAttribute('min', today); });
});
