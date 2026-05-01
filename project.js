/* ============================================================
   project.js — scroll reveals + progress bar
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll progress bar ────────────────────────────── */
  var progressBar = document.getElementById('scrollProgress');

  function updateProgress() {
    var scrollTop    = window.scrollY || document.documentElement.scrollTop;
    var docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    var pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct.toFixed(2) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Scroll reveal via IntersectionObserver ─────────── */
  var revealTargets = document.querySelectorAll(
    '.reveal-up, .reveal-text, .reveal-image'
  );

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: just show everything */
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Hero entrance animation ────────────────────────── */
  /* Title and meta row animate in on load without needing to scroll */
  var heroTitle   = document.querySelector('.hero-title-wrap');
  var heroTop     = document.querySelector('.hero-top');
  var heroMeta    = document.querySelector('.hero-meta-row');

  function animateHero() {
    [heroTop, heroTitle, heroMeta].forEach(function (el, i) {
      if (!el) return;
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(32px)';
      el.style.transition = 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.34,1.2,0.64,1)';

      setTimeout(function () {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 140);
    });
  }

  window.addEventListener('load', function () {
    setTimeout(animateHero, 60);

    /* Also kick the hero image reveal right away */
    var heroImg = document.querySelector('.hero-image-wrap');
    if (heroImg) {
      setTimeout(function () {
        heroImg.classList.add('is-visible');
      }, 450);
    }
  });

})();