const root=document.documentElement;
const themeToggle=document.querySelector('.theme-toggle');
const themeIcon=document.querySelector('.theme-icon');
const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
const metaTheme=document.querySelector('meta[name="theme-color"]');
const motionReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setTheme(theme,persist=true){
  root.dataset.theme=theme;
  if(persist)localStorage.setItem('portfolio-theme',theme);
  const dark=theme==='dark';
  themeIcon.textContent=dark?'☀':'☾';
  themeToggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  themeToggle.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');
  if(metaTheme)metaTheme.setAttribute('content',dark?'#0d0d0d':'#eeede9');
}
setTheme(root.dataset.theme||'light',false);

themeToggle?.addEventListener('click',()=>{
  setTheme(root.dataset.theme==='dark'?'light':'dark');
});

menuToggle?.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
  menuToggle?.setAttribute('aria-label','Open navigation');
}));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-links a')];
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting)links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
    });
  },{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(section=>sectionObserver.observe(section));
}

const revealItems=document.querySelectorAll('.reveal,.reveal-text');
if(!motionReduced&&'IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -7% 0px'});
  revealItems.forEach(item=>revealObserver.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add('is-visible'));
}
