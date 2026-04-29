/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM refs ─────────────────────────────────────────── */
  const cards      = document.querySelectorAll('.card');
  const overlay    = document.getElementById('overlay');
  const overlayCard = document.getElementById('overlayCard');
  const closeBtn   = document.getElementById('overlayClose');
  const oTag       = document.getElementById('overlayTag');
  const oTitle     = document.getElementById('overlayTitle');
  const oImage     = document.getElementById('overlayImage');
  const oDesc      = document.getElementById('overlayDescription');
  const oBtn       = document.getElementById('overlayBtn');

  /* ── Staggered entrance animation ────────────────────── */
  function animateCardsIn () {
    cards.forEach(function (card, i) {
      setTimeout(function () {
        card.classList.add('card--visible');
      }, 120 + i * 160);
    });
  }

  /* Run on load — small delay so the page paint is done */
  window.addEventListener('load', function () {
    setTimeout(animateCardsIn, 80);
  });

  /* ── Placeholder graphic clone helper ────────────────── */
  function cloneGraphic (sourceCard) {
    const src = sourceCard.querySelector('.placeholder-graphic');
    if (!src) return null;
    return src.cloneNode(true);
  }

  /* ── Open overlay ─────────────────────────────────────── */
  function openOverlay (card) {
    const title = card.dataset.title || '';
    const tag   = card.dataset.tag   || '';
    const desc  = card.dataset.description || '';
    const link  = card.dataset.link  || '#';

    oTag.textContent   = tag;
    oTitle.textContent = title;
    oDesc.textContent  = desc;
    oBtn.href          = link;

    /* Clear + repopulate image area */
    oImage.innerHTML = '';
    const graphic = cloneGraphic(card);
    if (graphic) oImage.appendChild(graphic);

    /* Open */
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('overlay--open');
    document.body.style.overflow = 'hidden';

    /* Trap focus on close button */
    requestAnimationFrame(function () {
      closeBtn.focus();
    });
  }

  /* ── Close overlay ────────────────────────────────────── */
  function closeOverlay () {
    overlay.classList.remove('overlay--open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ── Event listeners ──────────────────────────────────── */
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openOverlay(card);
    });

    /* Keyboard accessibility */
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openOverlay(card);
      }
    });
  });

  closeBtn.addEventListener('click', closeOverlay);

  /* Click outside card closes overlay */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeOverlay();
  });

  /* Escape key closes overlay */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('overlay--open')) {
      closeOverlay();
    }
  });

})();