/* =========================================================
   KULDEEP KUMAR — PORTFOLIO SCRIPTS
   Particles • Typing • Reveal • Counters • Cursor • Nav
   ========================================================= */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ----------------------------------------------------
     1) PRELOADER
  ---------------------------------------------------- */
  const preloader = $('#preloader');

  function hidePreloader() {
    if (!preloader || preloader.classList.contains('hidden')) return;
    preloader.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    startTyping();
  }

  window.addEventListener('load', () => setTimeout(hidePreloader, 900));
  setTimeout(hidePreloader, 3200); // safety fallback

  /* ----------------------------------------------------
     2) CUSTOM CURSOR (desktop only)
  ---------------------------------------------------- */
  const dot = $('#cursorDot');
  const ring = $('#cursorRing');

  if (finePointer && !prefersReduced && dot && ring) {
    document.documentElement.classList.add('has-custom-cursor');

    let mx = -100, my = -100, rx = -100, ry = -100;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      if (!rafId) loop();
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    const hoverables = 'a, button, .chip, input, textarea, .tilt';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) ring.classList.add('hovering');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) ring.classList.remove('hovering');
    });

    function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    }
  }

  /* ----------------------------------------------------
     3) PARTICLES BACKGROUND
  ---------------------------------------------------- */
  const canvas = $('#particles');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    const PALETTE = [[52, 211, 153], [34, 211, 238], [163, 230, 53]];
    let particles = [];
    let W = 0, H = 0;
    const mouse = { x: null, y: null };

    function sizeCanvas() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function buildParticles() {
      const count = Math.min(90, Math.floor(W / 16));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.8,
        c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        a: Math.random() * 0.35 + 0.25
      }));
    }

    window.addEventListener('resize', () => { sizeCanvas(); buildParticles(); }, { passive: true });
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    sizeCanvas();
    buildParticles();

    (function animate() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, W, H);
        const LINK = 130;

        for (const p of particles) {
          // mouse repulsion
          if (mouse.x !== null) {
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < 120 && d > 0.01) {
              const f = (120 - d) / 120 * 0.35;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }
          // speed cap
          p.vx = Math.max(-1.1, Math.min(1.1, p.vx));
          p.vy = Math.max(-1.1, Math.min(1.1, p.vy));
          // natural damping toward base speed
          p.vx *= 0.995; p.vy *= 0.995;

          p.x += p.vx; p.y += p.vy;
          if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, ${p.a})`;
          ctx.fill();
        }

        // linking lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < LINK * LINK) {
              const alpha = (1 - Math.sqrt(d2) / LINK) * 0.16;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(148, 214, 194, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(animate);
    })();
  }

  /* ----------------------------------------------------
     4) TYPING EFFECT
  ---------------------------------------------------- */
  const typedEl = $('#typed');
  const ROLES = [
    'Full Stack Developer',
    'PHP • Python • Java Developer',
    'AI & Data Science Enthusiast',
    'IoT Explorer',
    'Digital Marketing Enthusiast',
    'Tech Educator'
  ];
  let typingStarted = false;

  function startTyping() {
    if (typingStarted || !typedEl) return;
    typingStarted = true;

    if (prefersReduced) {
      typedEl.textContent = ROLES[0];
      return;
    }

    let roleIdx = 0, charIdx = 0, deleting = false;

    (function tick() {
      const word = ROLES[roleIdx];
      charIdx += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, charIdx);

      let delay = deleting ? 38 : 72;

      if (!deleting && charIdx === word.length) {
        delay = 1500;                       // hold full word
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
        delay = 420;                        // pause before next word
      }
      setTimeout(tick, delay);
    })();
  }

  /* ----------------------------------------------------
     5) NAVBAR — scrolled state, mobile menu, active link
  ---------------------------------------------------- */
  const navbar = $('#navbar');
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navbar.classList.remove('menu-open');
    document.body.classList.remove('no-scroll');
  }

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navbar.classList.toggle('menu-open', open);
    document.body.classList.toggle('no-scroll', open);
  });

  $$('.nav-link', navMenu).forEach((link) =>
    link.addEventListener('click', closeMenu)
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // active section highlight
  const sections = $$('main section[id]');
  const navLinks = $$('.nav-link', navMenu);
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((l) =>
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`)
        );
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => sectionObserver.observe(s));
  }

  /* ----------------------------------------------------
     6) REVEAL ON SCROLL
  ---------------------------------------------------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ----------------------------------------------------
     7) ANIMATED COUNTERS
  ---------------------------------------------------- */
  const statNums = $$('.stat-num');
  if ('IntersectionObserver' in window && statNums.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        statObserver.unobserve(el);

        const target = parseInt(el.dataset.target, 10) || 0;
        const suffix = el.dataset.suffix || '';

        if (prefersReduced) { el.textContent = target + suffix; return; }

        const dur = 1600;
        const t0 = performance.now();
        (function step(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.4 });
    statNums.forEach((el) => statObserver.observe(el));
  }

  /* ----------------------------------------------------
     8) 3D TILT CARDS (desktop only)
  ---------------------------------------------------- */
  if (finePointer && !prefersReduced) {
    $$('.tilt').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          `perspective(800px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ----------------------------------------------------
     9) SCROLL: progress bar, navbar bg, back-to-top
  ---------------------------------------------------- */
  const progress = $('#scrollProgress');
  const backToTop = $('#backToTop');
  let scrollTicking = false;

  function onScroll() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;

    progress.style.width = pct + '%';
    navbar.classList.toggle('scrolled', scrollTop > 30);
    backToTop.classList.toggle('show', scrollTop > 420);
    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  /* ----------------------------------------------------
     10) CONTACT FORM → mailto compose
  ---------------------------------------------------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#cf-name').value.trim();
      const email = $('#cf-email').value.trim();
      const message = $('#cf-message').value.trim();

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:kuldeep2021.98@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ----------------------------------------------------
     11) FOOTER YEAR
  ---------------------------------------------------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
