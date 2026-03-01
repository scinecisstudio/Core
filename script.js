const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((el) => el.classList.add('show'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 70, 280)}ms`;
    observer.observe(el);
  });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#site-nav');

if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.classList.contains('open')) {
      return;
    }

    if (!(event.target instanceof Element)) {
      return;
    }

    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });
}
