/* ═══════════════════════════════════════════════
   VINITH KABILAR — PORTFOLIO SCRIPTS
═══════════════════════════════════════════════ */

// ─── CUSTOM CURSOR ────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.18;
  curY += (mouseY - curY) * 0.18;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorDot.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '0.7';
  cursorDot.style.opacity = '1';
});


// ─── STICKY NAVBAR ───────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ─── HAMBURGER MENU ──────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ─── SCROLL REVEAL ───────────────────────────
const reveals = document.querySelectorAll('.reveal, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));


// ─── SKILL BAR ANIMATION ─────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ─── HERO COUNTER ANIMATION ──────────────────
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 30);
}

// Trigger counters when hero is visible (on load)
window.addEventListener('load', () => {
  // Stagger hero animations
  const heroReveal = document.querySelectorAll('#hero .reveal, #hero .reveal-right');
  heroReveal.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
    setTimeout(() => el.classList.add('visible'), 100 + i * 120);
  });
});


// ─── ACTIVE NAV LINK ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => activeObserver.observe(s));


// ─── CONTACT FORM ────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;

  [name, email, message].forEach(field => field.classList.remove('error'));

  if (!name.value.trim()) { name.classList.add('error'); valid = false; }
  if (!email.value.trim() || !email.value.includes('@')) {
    email.classList.add('error'); valid = false;
  }
  if (!message.value.trim()) { message.classList.add('error'); valid = false; }

  if (!valid) return;

  // Simulate send
  const btn = contactForm.querySelector('button[type="submit"]');
  const btnText = btn.querySelector('.btn-text');
  btnText.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btnText.textContent = 'Send Message';
    btn.disabled = false;
    contactForm.reset();
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1500);
});

// Remove error styling on input
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});


// ─── SMOOTH SCROLL FOR ALL ANCHORS ───────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ─── TILT EFFECT ON PROJECT CARDS ────────────
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotX   = ((y - cy) / cy) * -5;
    const rotY   = ((x - cx) / cx) *  5;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ─── TYPING EFFECT FOR HERO TITLE ────────────
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const titles  = ['Data Analyst & Python Developer', 'EDA & Visualization Expert', 'Django & SQL Engineer'];
  let tIdx = 0, cIdx = 0, deleting = false;
  const typeDelay = 80, deleteDelay = 40, pauseDelay = 2000;

  function typeLoop() {
    const current = titles[tIdx];
    if (!deleting) {
      heroTitle.textContent = current.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, pauseDelay);
        return;
      }
      setTimeout(typeLoop, typeDelay);
    } else {
      heroTitle.textContent = current.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % titles.length;
      }
      setTimeout(typeLoop, deleteDelay);
    }
  }

  setTimeout(typeLoop, 1500);
}


// ─── PARTICLE TRAIL (subtle) ─────────────────
function createParticle(x, y) {
  const p = document.createElement('div');
  p.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 4px;
    height: 4px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.6;
    transform: translate(-50%, -50%);
    transition: all 0.8s ease;
  `;
  document.body.appendChild(p);
  setTimeout(() => {
    p.style.opacity = '0';
    p.style.transform = `translate(-50%, -50%) scale(2) translateY(-20px)`;
  }, 50);
  setTimeout(() => p.remove(), 850);
}

let trailCount = 0;
document.addEventListener('mousemove', e => {
  trailCount++;
  if (trailCount % 8 === 0) createParticle(e.clientX, e.clientY);
});


// ─── CODE CARD TYPING ANIMATION ──────────────
const codeLines = document.querySelectorAll('.code-body');
codeLines.forEach(block => {
  const originalHTML = block.innerHTML;
  block.style.opacity = '0';
  setTimeout(() => {
    block.style.opacity = '1';
    block.style.transition = 'opacity 1s ease';
  }, 1200);
});
