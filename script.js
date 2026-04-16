/* ═══════════════════════════════════════════════════
   FOOD OF SHIMLA — script.js
   Uses: GSAP + ScrollTrigger + Lucide Icons
═══════════════════════════════════════════════════ */

// ── Init Lucide Icons ──
lucide.createIcons();

// ── Register GSAP ScrollTrigger ──
gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════
   NAVBAR: scroll state + hamburger toggle
════════════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  // swap icon
  hamburger.innerHTML = isOpen
    ? '<i data-lucide="x"></i>'
    : '<i data-lucide="menu" id="hamburger-icon"></i>';
  lucide.createIcons();
});

// Close menu on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ════════════════════════════════════════════
   MENU TABS
════════════════════════════════════════════ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const menuGrids = { lunch: document.getElementById('tab-lunch'), dinner: document.getElementById('tab-dinner') };

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    // update buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // swap grid with fade
    Object.entries(menuGrids).forEach(([key, grid]) => {
      if (key === tab) {
        grid.classList.remove('hidden');
        gsap.fromTo(grid, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        // animate cards in
        gsap.fromTo(grid.querySelectorAll('.food-card'),
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.08 }
        );
      } else {
        grid.classList.add('hidden');
      }
    });
  });
});

/* ════════════════════════════════════════════
   GSAP PAGE LOAD ANIMATIONS
════════════════════════════════════════════ */
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.from('.navbar', { y: -80, opacity: 0, duration: 0.7 })
  .from('.hero-badge',    { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero-title',    { y: 40, opacity: 0, duration: 0.65 }, '-=0.3')
  .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.5 }, '-=0.4')
  .from('.hero-ctas',     { y: 25, opacity: 0, duration: 0.5 }, '-=0.35')
  .from('.hero-stats',    { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero-img',      { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.6)' }, '-=0.7')
  .from('.hero-img-ring', { scale: 0.6, opacity: 0, duration: 0.7 }, '-=0.8')
  .from('.floating-tag',  { y: 15, opacity: 0, stagger: 0.15, duration: 0.5 }, '-=0.4')
  .from('.blob-1, .blob-2', { scale: 0, opacity: 0, duration: 1.2, ease: 'power2.out', stagger: 0.2 }, 0);

/* ════════════════════════════════════════════
   GSAP SCROLL ANIMATIONS
════════════════════════════════════════════ */

// Why Us cards
gsap.utils.toArray('.why-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0, y: 50, duration: 0.6, delay: i * 0.1, ease: 'power2.out'
  });
});

// Section titles
gsap.utils.toArray('.section-title, .section-label').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%' },
    opacity: 0, y: 30, duration: 0.6, ease: 'power2.out'
  });
});

// Menu food cards (initial lunch tab)
gsap.utils.toArray('#tab-lunch .food-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 92%' },
    opacity: 0, y: 40, scale: 0.95,
    duration: 0.5, delay: i * 0.09,
    ease: 'back.out(1.4)'
  });
});

// Steps
gsap.utils.toArray('.step').forEach((step, i) => {
  gsap.from(step, {
    scrollTrigger: { trigger: step, start: 'top 88%' },
    opacity: 0, y: 40, duration: 0.6, delay: i * 0.15, ease: 'power2.out'
  });
});

// CTA Banner
gsap.from('.cta-content', {
  scrollTrigger: { trigger: '.cta-banner', start: 'top 80%' },
  opacity: 0, y: 40, duration: 0.7, ease: 'power2.out'
});

// Floating WhatsApp button entrance
gsap.from('.float-wa', {
  delay: 1.5, scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.8)'
});

/* ════════════════════════════════════════════
   FLOATING WA BUTTON: pulse animation
════════════════════════════════════════════ */
gsap.to('.float-wa', {
  boxShadow: '0 0 0 14px rgba(37,211,102,0)',
  repeat: -1,
  duration: 1.6,
  ease: 'power2.out',
  yoyo: false,
  delay: 2
});
