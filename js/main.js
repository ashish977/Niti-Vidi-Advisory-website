// ============================================================
// NEPGOV CONSULT — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky header shadow ----
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ---- Mobile hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on nav link click (mobile)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // ---- Active nav link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---- Scroll-reveal animation ----
  const revealTargets = document.querySelectorAll(
    '.service-card, .why-item, .testimonial-card, .insight-card, .sector-pill, .credential-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

  // Add a global CSS rule for revealed state
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // ---- Smooth anchor scroll for same-page links ----
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href.startsWith('#') || (href.includes(window.location.pathname) && href.includes('#'))) {
        const hash = href.split('#')[1];
        const target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          const offset = document.getElementById('site-header').offsetHeight + 24;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // ---- Current year in footer ----
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
