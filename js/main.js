/* Eaton Park Padel — main.js
   Tiny. Mobile nav toggle + footer year. No tracking, no storage. */

(function () {
  'use strict';

  // Footer year
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });

    // Close on link tap (mobile)
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 899px)').matches) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
