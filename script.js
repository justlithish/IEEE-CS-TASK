// Preloader: hide after window load
(function(){
  const pre = document.getElementById('preloader');
  window.addEventListener('load', ()=>{
    pre.classList.add('hidden');
    setTimeout(()=>pre.remove(),700);
  });
  // fallback
  setTimeout(()=>{ if(pre && !pre.classList.contains('hidden')){ pre.classList.add('hidden'); setTimeout(()=>pre.remove(),700);} }, 4000);
})();

// Header reveal/hide (direction + threshold)
(function(){
  const header = document.getElementById('siteHeader');
  let lastY = window.scrollY, ticking=false, shown=false;
  function onScroll(){
    const y = window.scrollY;
    if(y < 80){ header.classList.add('show'); shown=true; }
    else if(y > lastY && shown){ header.classList.remove('show'); shown=false; }
    else if(y < lastY && !shown){ header.classList.add('show'); shown=true; }
    lastY = y;
  }
  window.addEventListener('scroll', ()=>{ if(!ticking){ requestAnimationFrame(()=>{ onScroll(); ticking=false }); ticking=true; } });
  if(window.scrollY < 100) header.classList.add('show');
})();

// Steps -> phone mock updates using IntersectionObserver
(function(){
  const phone = document.getElementById('phoneScreen');
  const phoneMock = document.getElementById('phoneMock');
  const steps = document.querySelectorAll('.step');
  const texts = [
    'Welcome to Companion — your assistant for fast decisions.',
    'Sync across devices and keep your team aligned.',
    'Insight cards, quick actions, and in-app guidance.'
  ];
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const idx = Array.from(steps).indexOf(entry.target);
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        if(idx >= 0) phone.textContent = texts[idx] || 'Preview';
        phoneMock.classList.add('scrolled');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },{threshold:0.6});
  steps.forEach(s=>io.observe(s));
})();

// Smooth internal links
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
})();

// Lottie placeholder: try to load a local JSON if available and keep a reference
(function(){
  const holder = document.getElementById('lottieHolder');
  try{
    // keep for later control (speed changes on hover)
    window._heroLottie = lottie.loadAnimation({ container: holder, renderer: 'svg', loop: true, autoplay: true, path: 'assets/sample-lottie.json' });
  }catch(e){ if(holder) holder.textContent = ''; }
})();

// Video autoplay when phone is visible (muted/autoplay policy friendly)
(function(){
  const video = document.getElementById('phoneVideoEl');
  const img = document.getElementById('phoneVideo');
  if(!video) return;
  const localSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
  const fallbackSrc = localSrc;
  // try local first
  video.src = localSrc;
  // if local fails, switch to fallback
  video.addEventListener('error', ()=>{ if(video.src !== fallbackSrc){ video.src = fallbackSrc; } });

  // observer to play/pause when visible
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        // attempt to play; muted allows autoplay
        video.style.display = 'block'; img.style.display = 'none';
        const p = video.play();
        if(p && p.catch){ p.catch(()=>{ /* autoplay prevented; keep image */ video.style.display='none'; img.style.display='block'; }); }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  },{threshold:0.6});
  io.observe(document.getElementById('phoneMock'));
})();

// Staggered headline word animation
(function(){
  const title = document.getElementById('heroTitle');
  if(!title) return;
  const words = Array.from(title.querySelectorAll('.word'));
  function showWords(){
    words.forEach((w,i)=> setTimeout(()=> w.classList.add('show'), i * 90));
  }
  // If hero is visible, animate when scrolled into view
  const hero = document.querySelector('.hero');
  if('IntersectionObserver' in window && hero){
    const io = new IntersectionObserver((entries, o)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ showWords(); o.disconnect(); } });
    },{threshold:0.4});
    io.observe(hero);
  } else {
    window.addEventListener('load', showWords);
  }
})();

// MutationObserver: remove any injected taptop links
(function(){
  const obs = new MutationObserver((mutations)=>{
    for(const m of mutations){
      m.addedNodes && m.addedNodes.forEach(n=>{
        try{ if(n.nodeType===1){ const a = n.querySelectorAll? n.querySelectorAll('a') : []; if(n.tagName==='A' && n.href && n.href.includes('taptop.pro')) n.remove(); a.forEach(el=>{ if(el.href && el.href.includes('taptop.pro')) el.remove(); }); }}catch(e){}
      });
    }
  });
  obs.observe(document.body,{childList:true,subtree:true});
})();

// Number counters with easing and requestAnimationFrame
(function(){
  const nums = document.querySelectorAll('.num');
  if(!nums.length) return;
  nums.forEach(el=>{
    const io = new IntersectionObserver((entries,o)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const target = +el.dataset.target || 0; const duration = 1400; let startTime = null;
          function step(ts){ if(!startTime) startTime = ts; const t = Math.min((ts - startTime)/duration, 1); const eased = Math.pow(t, 0.6); el.textContent = Math.floor(eased * target).toLocaleString(); if(t < 1) requestAnimationFrame(step); }
          requestAnimationFrame(step);
          o.unobserve(el);
        }
      });
    },{threshold:0.6});
    io.observe(el);
  });
})();

// Make spec cards expandable and keyboard accessible
(function(){
  const specs = document.querySelectorAll('.spec');
  specs.forEach(s=>{
    s.addEventListener('click', ()=> s.classList.toggle('open'));
    s.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') s.classList.toggle('open'); });
  });
})();

// Simple phone parallax on scroll
(function(){
  const phone = document.getElementById('phoneMock');
  if(!phone) return;
  window.addEventListener('scroll', ()=>{
    const sc = window.scrollY; const t = Math.min(Math.max((sc/800), 0), 0.06);
    phone.style.transform = `translateY(${ -t * 100 }px)`;
  });
})();

// Slide-in observer with stagger assignment and reduced-motion respect
(function(){
  const nodes = Array.from(document.querySelectorAll('.slide-in'));
  if(!nodes.length) return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  nodes.forEach((n,i)=> n.style.setProperty('--d', `${i * 80}ms`));
  if(prefersReduced){ nodes.forEach(n=> n.classList.add('in')); return; }
  const io = new IntersectionObserver((entries,o)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transitionDelay = entry.target.style.transitionDelay || getComputedStyle(entry.target).getPropertyValue('--d') || '0ms';
        entry.target.classList.add('in');
        o.unobserve(entry.target);
      }
    });
  },{threshold:0.28});
  nodes.forEach(n=> io.observe(n));
})();

// Card tilt interaction
(function(){
  const cards = document.querySelectorAll('.card');
  cards.forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (y - 0.5) * 8;
      const ry = (x - 0.5) * -10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
    card.addEventListener('mouseenter', ()=>{ card.style.transition = 'transform .12s ease'; });
  });
})();

// How-it-works: activate step and swap media with a fade
(function(){
  const steps = document.querySelectorAll('.how-step');
  const media = document.getElementById('howMedia');
  if(!steps.length || !media) return;
  const setActive = (el)=>{
    steps.forEach(s=> s.classList.toggle('active', s===el));
    const img = el.getAttribute('data-img');
    if(img){ media.style.opacity = 0; setTimeout(()=>{ media.src = img; media.style.opacity = 1; }, 260); }
  };
  steps.forEach((s)=>{
    s.addEventListener('click', ()=> setActive(s));
    s.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' ') setActive(s); });
  });
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) setActive(entry.target); }); },{threshold:0.6});
    steps.forEach(s=> io.observe(s));
  } else setActive(steps[0]);
})();

// Hero subtle parallax and Lottie micro-speed control
(function(){
  const hero = document.querySelector('.hero');
  const inner = document.querySelector('.hero-inner');
  const lholder = document.getElementById('lottieHolder');
  if(!hero || !inner) return;
  hero.addEventListener('mousemove', (e)=>{
    const r = hero.getBoundingClientRect(); const x = (e.clientX - r.left)/r.width - 0.5; const y = (e.clientY - r.top)/r.height - 0.5;
    inner.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
    if(lholder) lholder.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
  });
  hero.addEventListener('mouseenter', ()=>{ if(window._heroLottie && window._heroLottie.setSpeed) window._heroLottie.setSpeed(1.5); });
  hero.addEventListener('mouseleave', ()=>{ inner.style.transform=''; if(lholder) lholder.style.transform=''; if(window._heroLottie && window._heroLottie.setSpeed) window._heroLottie.setSpeed(1); });
})();

// Button ripple effect
(function(){
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const r = document.createElement('span'); r.className='ripple';
      const size = Math.max(rect.width, rect.height) * 1.2; r.style.width = r.style.height = size+'px';
      r.style.left = (e.clientX - rect.left - size/2) + 'px'; r.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(r); r.style.animation = 'ripple .6s ease'; setTimeout(()=> r.remove(), 650);
    });
  });
})();