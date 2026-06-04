/* Eaton Park Padel — main.js
   Mobile nav toggle, accessible tabs, footer year. No tracking, no storage. */

(function () {
  'use strict';

  // ---------- Footer year ----------
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Mobile nav ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 899px)').matches) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Tabs ----------
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var tabs = root.querySelectorAll('[role="tab"]');
    var panels = root.querySelectorAll('[role="tabpanel"]');

    function activate(idx) {
      tabs.forEach(function (t, i) {
        var on = i === idx;
        t.setAttribute('aria-selected', String(on));
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      panels.forEach(function (p, i) {
        p.classList.toggle('is-active', i === idx);
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(i); });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var dir = e.key === 'ArrowRight' ? 1 : -1;
          var next = (i + dir + tabs.length) % tabs.length;
          tabs[next].focus();
          activate(next);
        }
      });
    });

    // Initial state — first tab on if none marked
    var initial = 0;
    tabs.forEach(function (t, i) { if (t.getAttribute('aria-selected') === 'true') initial = i; });
    activate(initial);
  });
})();
