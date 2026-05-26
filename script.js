/* ============ THEME ============ */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function getTheme() { return localStorage.getItem('theme') || 'light'; }
function applyTheme(t) {
  root.setAttribute('data-theme', t);
  themeIcon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', t);
}
applyTheme(getTheme());
themeBtn.addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));

/* ============ PARTICLES ============ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  const hero = document.querySelector('.hero-section');
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

function createParticle() {
  return { x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + .5, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, o: Math.random() * .5 + .1 };
}

function initParticles() { particles = Array.from({ length: 150 }, createParticle); }

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isDark = getTheme() === 'dark';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? `rgba(255,255,255,${p.o})` : `rgba(0,0,0,${p.o})`;
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(drawParticles);
}

resize(); initParticles(); drawParticles();
window.addEventListener('resize', () => { resize(); initParticles(); });

/* ============ MOBILE DRAWER ============ */
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const hamburger = document.getElementById('hamburger');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() { drawer.classList.add('open'); drawerOverlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeDrawer() { drawer.classList.remove('open'); drawerOverlay.classList.remove('show'); document.body.style.overflow = ''; }

hamburger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

drawer.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeModal(); } });

/* ============ CONTACT MODAL ============ */
const modal = document.getElementById('contact-modal');
const openModalBtns = document.querySelectorAll('#open-modal, #footer-contact');
const modalClose = document.getElementById('modal-close');

function openModal() { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }

openModalBtns.forEach(b => b.addEventListener('click', openModal));
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });



/* ============ SCROLL TOP ============ */
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============ REVEAL ON SCROLL ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============ ACTIVE NAV LINK ============ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--fg)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));



/* ============ SCROLL PROGRESS BAR ============ */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

/* ============ STATEFUL DOWNLOAD BUTTON ============ */
function initStatefulDownload() {
  const btn = document.getElementById('cv-download-btn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    if (btn.classList.contains('state-loading') || btn.classList.contains('state-success')) {
      e.preventDefault();
      return;
    }

    const originalHTML = btn.innerHTML;

    btn.classList.add('state-loading');
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Downloading...</span>`;

    setTimeout(() => {
      btn.classList.remove('state-loading');
      btn.classList.add('state-success');
      btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Done!</span>`;

      setTimeout(() => {
        btn.classList.remove('state-success');
        btn.innerHTML = originalHTML;
      }, 2000);
    }, 4000);
  });
}

initStatefulDownload();


/* ============ HIGHLIGHT UNDERLINE ============ */
function initHighlightUnderline() {
  const els = document.querySelectorAll('.highlight-underline');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Small delay so the section reveal animation finishes first
        setTimeout(() => entry.target.classList.add('animate'), 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

initHighlightUnderline();