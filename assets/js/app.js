async function loadJSON(path){
  const res = await fetch(path, {cache:'no-store'});
  if(!res.ok) throw new Error(`Failed ${path}`);
  return await res.json();
}

const i18n = {
  tr: {
    services_title:"Hizmetler",
    services_sub:"Yönetilen servisler, ağ altyapısı, güvenlik ve destek.",
    partners_title:"Partner Markalar",
    partners_sub:"Birlikte çalıştığımız teknoloji ortakları.",
    solutions_title:"Çözümler",
    solutions_sub:"Sektörünüze uygun uçtan uca çözüm paketleri.",
    projects_title:"Projeler",
    projects_sub:"Öne çıkan uygulama ve altyapı dönüşümleri.",
    blog_title:"Blog",
    blog_sub:"Güncel ipuçları, güvenlik notları ve rehberler.",
    references_title:"Referanslar",
    references_sub:"Güvenen markalarla uzun soluklu iş birliği.",
    about_cta:"İletişim",
    highlights:"Öne Çıkanlar",
    address:"Adres",
    phone:"Telefon",
    brand:"M2 Teknoloji"
  },
  en: {
    services_title:"Services",
    services_sub:"Managed services, networking, security and support.",
    partners_title:"Partners",
    partners_sub:"Technology partners we work with.",
    solutions_title:"Solutions",
    solutions_sub:"End-to-end solution packages for your industry.",
    projects_title:"Projects",
    projects_sub:"Selected implementations and infrastructure transformations.",
    blog_title:"Blog",
    blog_sub:"Tips, security notes and guides.",
    references_title:"References",
    references_sub:"Long-term collaboration with trusted brands.",
    about_cta:"Contact",
    highlights:"Highlights",
    address:"Address",
    phone:"Phone",
    brand:"M2 Teknoloji"
  }
};

let lang = (localStorage.getItem('m2_lang') || 'tr');

function t(key){
  return (i18n[lang] && i18n[lang][key]) ? i18n[lang][key] : key;
}

function setLang(newLang){
  lang = newLang;
  localStorage.setItem('m2_lang', lang);
  document.documentElement.lang = lang;
  applyI18n();
  renderAll();
}

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent = t(el.getAttribute('data-i18n'));
  });
}

function buildNav(site){
  const nav = document.getElementById('nav');
  nav.innerHTML = '';
  site.nav.forEach(item=>{
    const a = document.createElement('a');
    a.href = '#' + item.id;
    a.textContent = (lang==='tr' ? item.tr : item.en);
    nav.appendChild(a);
  });
  document.querySelector('[data-i18n="brand"]').textContent = site.brand;
  document.title = site.brand;
  document.getElementById('shopBtn').href = site.shop_url;
  document.getElementById('tagline').textContent = (lang==='tr' ? site.tagline_tr : site.tagline_en);
  document.getElementById('footerCopy').textContent = (lang==='tr' ? site.footer_tr : site.footer_en);
}

function cardHTML(item){
  const title = (lang==='tr' ? item.title_tr : item.title_en);
  const ex = (lang==='tr' ? item.excerpt_tr : item.excerpt_en);
  return `
  <article class="card-item">
    <div class="media">${item.image ? `<img src="${item.image}" alt="${title}">` : ''}</div>
    <div class="body">
      <h3 class="title">${title}</h3>
      <p class="excerpt">${ex || ''}</p>
    </div>
  </article>`;
}

function renderGrid(elId, items){
  const el = document.getElementById(elId);
  el.innerHTML = items.map(cardHTML).join('');
}

function renderLogos(elId, items){
  const track = document.getElementById(elId);
  track.innerHTML = items.map(it=>`
    <a class="logo-item" href="${it.url || '#'}" target="${(it.url||'').startsWith('http') ? '_blank' : '_self'}" rel="noopener">
      ${it.logo ? `<img src="${it.logo}" alt="${it.name}">` : `<span>${it.name}</span>`}
    </a>
  `).join('');
}

function applyBanner(section, cfg, kind){
  // kind: hero or cta
  if(kind==='hero'){
    document.querySelector('.hero').style.setProperty('--hero-h', cfg.height || '78vh');
    document.querySelector('.hero').style.setProperty('--overlay', cfg.overlay ?? 0.78);
    document.querySelector('.hero').style.setProperty('--blur', (cfg.blur ?? 0) + 'px');
    document.getElementById('heroBg').style.backgroundImage = cfg.bg_image ? `url(${cfg.bg_image})` : '';
    const inner = document.getElementById('heroInner');
    inner.innerHTML = `
      <div class="pill">${lang==='tr' ? cfg.kicker_tr : cfg.kicker_en}</div>
      <h1>${lang==='tr' ? cfg.title_tr : cfg.title_en}</h1>
      <p>${lang==='tr' ? cfg.subtitle_tr : cfg.subtitle_en}</p>
      <div class="btn-row">
        <a class="btn primary" href="${cfg.cta1_href || '#contact'}">${lang==='tr' ? cfg.cta1_tr : cfg.cta1_en}</a>
        <a class="btn" href="${cfg.cta2_href || '#services'}">${lang==='tr' ? cfg.cta2_tr : cfg.cta2_en}</a>
      </div>`;
  } else {
    document.querySelector('.cta').style.setProperty('--cta-h', cfg.height || '420px');
    document.querySelector('.cta').style.setProperty('--overlay', cfg.overlay ?? 0.78);
    document.querySelector('.cta').style.setProperty('--blur', (cfg.blur ?? 0) + 'px');
    document.getElementById('ctaBg').style.backgroundImage = cfg.bg_image ? `url(${cfg.bg_image})` : '';
    const inner = document.getElementById('ctaInner');
    inner.innerHTML = `
      <h2>${lang==='tr' ? cfg.title_tr : cfg.title_en}</h2>
      <p>${lang==='tr' ? cfg.subtitle_tr : cfg.subtitle_en}</p>
      <div class="btn-row">
        <a class="btn primary" href="${cfg.cta1_href || '#contact'}">${lang==='tr' ? cfg.cta1_tr : cfg.cta1_en}</a>
        <a class="btn" href="${cfg.cta2_href || '#'}" target="${(cfg.cta2_href||'').startsWith('http')?'_blank':'_self'}" rel="noopener">${lang==='tr' ? cfg.cta2_tr : cfg.cta2_en}</a>
      </div>`;
  }
}

function renderAbout(cfg){
  document.getElementById('aboutTitle').textContent = (lang==='tr' ? cfg.title_tr : cfg.title_en);
  document.getElementById('aboutText').textContent = (lang==='tr' ? cfg.text_tr : cfg.text_en);
  const bullets = (lang==='tr' ? cfg.bullets_tr : cfg.bullets_en) || [];
  document.getElementById('aboutBullets').innerHTML = bullets.map(b=>`<li>${b}</li>`).join('');
}

function renderContact(cfg){
  document.getElementById('contactTitle').textContent = (lang==='tr' ? cfg.title_tr : cfg.title_en);
  document.getElementById('contactSubtitle').textContent = (lang==='tr' ? cfg.subtitle_tr : cfg.subtitle_en);
  document.getElementById('contactAddress').textContent = (lang==='tr' ? cfg.address_tr : cfg.address_en);
  document.getElementById('contactPhone').textContent = cfg.phone || '';
  document.getElementById('contactEmail').textContent = cfg.email || '';
  const wa = (cfg.whatsapp || '').replace(/\s+/g,'');
  const waBtn = document.getElementById('waBtn');
  if(wa){
    const waNum = wa.replace(/^\+/, '');
    waBtn.href = `https://wa.me/${waNum}`;
    waBtn.textContent = 'WhatsApp';
  } else {
    waBtn.style.display = 'none';
  }
  const mailBtn = document.getElementById('mailBtn');
  mailBtn.href = `mailto:${cfg.email || ''}`;
  document.getElementById('mapFrame').src = cfg.map_embed_url || '';
}

async function renderAll(){
  const [site, hero, services, partners, solutions, projects, blog, references, about, contact, bottom] = await Promise.all([
    loadJSON('/content/settings/site.json'),
    loadJSON('/content/sections/hero.json'),
    loadJSON('/content/collections/services.json'),
    loadJSON('/content/collections/partners.json'),
    loadJSON('/content/collections/solutions.json'),
    loadJSON('/content/collections/projects.json'),
    loadJSON('/content/collections/blog.json'),
    loadJSON('/content/collections/references.json'),
    loadJSON('/content/sections/about.json'),
    loadJSON('/content/sections/contact.json'),
    loadJSON('/content/sections/bottom_banner.json'),
  ]);
  buildNav(site);
  applyBanner('hero', hero, 'hero');
  renderGrid('servicesGrid', services);
  renderLogos('partnersTrack', partners);
  renderGrid('solutionsGrid', solutions);
  renderGrid('projectsGrid', projects);
  renderGrid('blogGrid', blog);
  renderLogos('referencesTrack', references);
  renderAbout(about);
  renderContact(contact);
  applyBanner('cta', bottom, 'cta');
}

function initHeader(){
  function onScroll(){
    const h = document.querySelector('.m2-header');
    if(window.scrollY > 10) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

function initSliders(){
  document.querySelectorAll('.logo-slider[data-autoscroll="1"]').forEach(slider=>{
    const track = slider.querySelector('.logo-track');
    const speed = parseInt(slider.getAttribute('data-speed') || '25', 10);
    let raf=null; let last=performance.now();
    function step(now){
      const dt=(now-last)/1000; last=now;
      track.scrollLeft += speed * dt;
      if(track.scrollLeft >= (track.scrollWidth - track.clientWidth - 2)) track.scrollLeft = 0;
      raf=requestAnimationFrame(step);
    }
    function start(){ if(raf) return; last=performance.now(); raf=requestAnimationFrame(step); }
    function stop(){ if(!raf) return; cancelAnimationFrame(raf); raf=null; }
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    start();
  });
}

document.getElementById('langTR').addEventListener('click', ()=>setLang('tr'));
document.getElementById('langEN').addEventListener('click', ()=>setLang('en'));

applyI18n();
initHeader();
renderAll().then(initSliders).catch(err=>{
  console.error(err);
});
