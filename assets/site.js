// Section bar: bold the link of the section being read, keep it in view when
// the links scroll sideways on phones, and fade the edges that hide links.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.section-nav a'));
  if (!links.length) return;
  var headings = links.map(function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  }).filter(Boolean);
  if (!headings.length) return;

  var topbar = document.querySelector('.topbar');
  var bar = document.querySelector('.section-nav');
  var scroller = bar.querySelector('.section-nav__links');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = null;
  var pinned = null; // a clicked link stays active until the reader scrolls by hand

  function activeId() {
    if (pinned) return pinned;
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
      return headings[headings.length - 1].id;
    }
    var offset = (topbar ? topbar.offsetHeight : 0) + window.innerHeight * 0.25;
    var id = headings[0].id;
    headings.forEach(function (h) {
      if (h.getBoundingClientRect().top <= offset) id = h.id;
    });
    return id;
  }

  function update() {
    var id = activeId();
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    var active = scroller.querySelector('a.active');
    if (active && scroller.scrollWidth > scroller.clientWidth + 1) {
      scroller.scrollTo({
        left: active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    }
  }

  function updateFades() {
    var max = scroller.scrollWidth - scroller.clientWidth;
    bar.classList.toggle('more-left', scroller.scrollLeft > 1);
    bar.classList.toggle('more-right', scroller.scrollLeft < max - 1);
  }

  var ticking = false;
  function schedule() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      update();
    });
  }

  links.forEach(function (a) {
    a.addEventListener('click', function () {
      pinned = a.getAttribute('href').slice(1);
      update();
    });
  });
  ['wheel', 'touchstart', 'keydown'].forEach(function (type) {
    window.addEventListener(type, function () {
      if (!pinned) return;
      pinned = null;
      schedule();
    }, { passive: true });
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', function () {
    current = null;
    schedule();
    updateFades();
  });
  scroller.addEventListener('scroll', updateFades, { passive: true });
  update();
  updateFades();
})();

// Contact: copy the real address; where the clipboard is refused, show it and select it.
(function () {
  var btn = document.getElementById('copy-email');
  var text = document.getElementById('email-text');
  if (!btn || !text) return;
  var address = ['aabdelraouf', 'kse.org.ua'].join('@');
  var timer = null;

  function say(label) {
    btn.textContent = label;
    clearTimeout(timer);
    timer = setTimeout(function () { btn.textContent = 'Copy address'; }, 2200);
  }
  function selectAddress() {
    text.textContent = address;
    var range = document.createRange();
    range.selectNodeContents(text);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    say('Address selected');
  }
  btn.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(function () { say('Copied'); }, selectAddress);
    } else {
      selectAddress();
    }
  });
})();
