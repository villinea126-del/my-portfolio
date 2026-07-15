/* =========================================================================
   Abhay Kale — Portfolio interactions
   Vanilla ES6+, no dependencies.
   ========================================================================= */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */
  const THEME_KEY = 'portfolio-theme';
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeToggle?.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      themeToggle?.setAttribute('aria-pressed', 'false');
    }
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      applyTheme(stored);
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      applyTheme(prefersLight ? 'light' : 'dark');
    }
  }

  themeToggle?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  initTheme();

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('is-hidden'), 350);
  });
  // Fallback in case 'load' already fired or is slow
  setTimeout(() => loader?.classList.add('is-hidden'), 1800);

  /* ---------- Mobile nav ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    menuToggle?.classList.remove('is-open');
    navLinks?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', !!isOpen);
    menuToggle.setAttribute('aria-expanded', String(!!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Sticky nav shadow + active link ---------- */
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

  function onScrollNav() {
    nav?.classList.toggle('is-scrolled', window.scrollY > 12);

    let currentId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) currentId = section.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById('scrollProgressBar');
  function onScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${pct}%`;
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  function onScrollBackToTop() {
    backToTop?.classList.toggle('is-visible', window.scrollY > 480);
  }
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  let scrollTicking = false;
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      onScrollNav();
      onScrollProgress();
      onScrollBackToTop();
      scrollTicking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Magnetic buttons ---------- */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.setProperty('--mx', `${x * 0.18}px`);
        btn.style.setProperty('--my', `${y * 0.28}px`);
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    subject: (v) => v.trim().length >= 3 || 'Subject needs at least 3 characters.',
    message: (v) => v.trim().length >= 10 || 'Message needs at least 10 characters.',
  };

  function validateField(field) {
    const row = field.closest('.form-row');
    const errorEl = row?.querySelector('.field-error');
    const result = validators[field.name]?.(field.value) ?? true;
    if (result === true) {
      row?.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
    row?.classList.add('has-error');
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  if (form) {
    form.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-row')?.classList.contains('has-error')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = Array.from(form.querySelectorAll('input, textarea'));
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        if (formStatus) {
          formStatus.textContent = 'Please fix the highlighted fields.';
          formStatus.style.color = 'var(--accent-rose)';
        }
        return;
      }

      // No backend wired up — replace this block with a real submit
      // (fetch to your API, Formspree, EmailJS, etc.) when ready.
      if (formStatus) {
        formStatus.style.color = 'var(--accent-teal)';
        formStatus.textContent = 'Message ready — connect a form backend in script.js to send it.';
      }
      form.reset();
    });
  }
  
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
