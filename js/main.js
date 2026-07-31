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

  // ---------- Launch open-day bar (TEMPORARY) ----------
  // Grand Open Day, Monday 10 August 2026. Injected site-wide so it can be
  // removed in one place. To take it down: delete this whole block (and the
  // .launch-bar styles). It also auto-hides from 11/08/2026 as a safety net.
  //
  // WHEN THE BOOKING PAGE IS LIVE: paste the real URL into LAUNCH_BOOKING_URL
  // below. The pill turns into a clickable "Book your slot" link automatically;
  // no other change needed.
  (function () {
    var LAUNCH_BOOKING_URL = 'https://bookwhen.com/nta-norfolk/e/ev-soiom-20260810080000';  // '' = show non-clickable "Bookings open soon"
    var LAUNCH_EXPIRES = new Date(2026, 7, 11, 0, 0, 0);  // 00:00 on 11/08/2026 (day after the event)
    if (new Date() >= LAUNCH_EXPIRES) return;

    var cta = LAUNCH_BOOKING_URL
      ? '<a class="launch-bar__cta" href="' + LAUNCH_BOOKING_URL + '">Book your slot &rarr;</a>'
      : '<span class="launch-bar__cta">Booking coming soon</span>';

    var bar = document.createElement('div');
    bar.className = 'launch-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Open day announcement');
    bar.innerHTML =
      '<div class="container launch-bar__inner">' +
        '<p class="launch-bar__text">' +
          '<span class="launch-bar__tag">Grand Opening</span>' +
          '<span class="launch-bar__detail"><strong>12 hours of free padel &mdash; Monday 10 August, 8am&ndash;8pm.</strong> Coaching, socials and open court time all day; the Lord Mayor of Norwich opens the courts at 10am.</span>' +
        '</p>' +
        cta +
      '</div>';
    document.body.insertBefore(bar, document.body.firstChild);
  })();
})();
