/* ==========================================================================
   Joshua M. Madulid — Portfolio Interaction Engine
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initThemeToggle();
    initSoundToggle();
    initMobileMenu();
    initFloatingNavScroll();
    initActiveNavOnScroll();
    initRevealOnScroll();
    initLiveClock();
    initCopyEmail();
    initFilterTabs();
    initHeroTilt();
    initGalleryModal();
    initCertModal();
    initAiModal();
    initModalDismiss();
  }

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function playTick() {
    if (document.body.classList.contains('sound-off')) return;
    try {
      var ctx = playTick._ctx || (playTick._ctx = new (window.AudioContext || window.webkitAudioContext)());
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 720;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) { /* audio unsupported — silently ignore */ }
  }

  /* ------------------------------------------------------------------ *
   * Theme toggle (persisted)
   * ------------------------------------------------------------------ */
  function initThemeToggle() {
    var root = document.documentElement;
    var btn = $('#theme-toggle');
    var saved = localStorage.getItem('jm-theme');
    if (saved === 'light' || saved === 'dark') {
      root.setAttribute('data-theme', saved);
    }
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('jm-theme', next);
      playTick();
    });
  }

  /* ------------------------------------------------------------------ *
   * Sound toggle (persisted)
   * ------------------------------------------------------------------ */
  function initSoundToggle() {
    var btn = $('#sound-toggle');
    var saved = localStorage.getItem('jm-sound');
    if (saved === 'off') {
      document.body.classList.add('sound-off');
    }
    if (!btn) return;
    btn.addEventListener('click', function () {
      document.body.classList.toggle('sound-off');
      var isOff = document.body.classList.contains('sound-off');
      localStorage.setItem('jm-sound', isOff ? 'off' : 'on');
      if (!isOff) playTick();
    });
  }

  /* ------------------------------------------------------------------ *
   * Mobile drawer
   * ------------------------------------------------------------------ */
  function initMobileMenu() {
    var toggle = $('#mobile-toggle');
    var drawer = $('#mobile-drawer');
    if (!toggle || !drawer) return;

    function close() {
      drawer.classList.remove('open');
    }

    toggle.addEventListener('click', function () {
      drawer.classList.toggle('open');
    });

    $all('a', drawer).forEach(function (link) {
      link.addEventListener('click', close);
    });

    document.addEventListener('click', function (e) {
      if (!drawer.classList.contains('open')) return;
      if (drawer.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ------------------------------------------------------------------ *
   * Floating nav shadow on scroll
   * ------------------------------------------------------------------ */
  function initFloatingNavScroll() {
    var nav = $('.floating-nav');
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 16) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------ *
   * Active nav link tracking
   * ------------------------------------------------------------------ */
  function initActiveNavOnScroll() {
    var sections = $all('main section[id], footer[id]');
    var links = $all('.nav-item a');
    if (!sections.length || !links.length) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') map[id.slice(1)] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('active'); });
        var link = map[entry.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  /* ------------------------------------------------------------------ *
   * Scroll reveal
   * ------------------------------------------------------------------ */
  function initRevealOnScroll() {
    var items = $all('.reveal-on-scroll');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = Math.min(i * 40, 240);
          setTimeout(function () { el.classList.add('in-view'); }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------ *
   * Live Philippines time
   * ------------------------------------------------------------------ */
  function initLiveClock() {
    var el = $('#live-time');
    if (!el) return;

    function tick() {
      try {
        var formatter = new Intl.DateTimeFormat('en-PH', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        el.textContent = formatter.format(new Date()) + ' PHT';
      } catch (e) {
        el.textContent = new Date().toLocaleTimeString();
      }
    }

    tick();
    setInterval(tick, 30000);
  }

  /* ------------------------------------------------------------------ *
   * Copy email to clipboard
   * ------------------------------------------------------------------ */
  function initCopyEmail() {
    var buttons = $all('.copy-email-btn');
    var toast = $('#toast-notification');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var email = btn.getAttribute('data-email');
        if (!email) return;

        var done = function () {
          showToast(toast, 'Email copied to clipboard!');
          playTick();
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(done).catch(function () {
            fallbackCopy(email);
            done();
          });
        } else {
          fallbackCopy(email);
          done();
        }
      });
    });

    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* noop */ }
      document.body.removeChild(ta);
    }
  }

  var toastTimer = null;
  function showToast(toast, message) {
    if (!toast) return;
    if (message) toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2600);
  }

  /* ------------------------------------------------------------------ *
   * Project filter tabs
   * ------------------------------------------------------------------ */
  function initFilterTabs() {
    var tabs = $all('.filter-btn');
    var cards = $all('.project-card');
    if (!tabs.length || !cards.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var filter = tab.getAttribute('data-filter');

        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Hero avatar 3D tilt
   * ------------------------------------------------------------------ */
  function initHeroTilt() {
    var card = $('.hero-card');
    if (!card || window.matchMedia('(pointer: coarse)').matches) return;

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      var rotateY = x * 10;
      var rotateX = y * -10;
      card.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ------------------------------------------------------------------ *
   * Generic modal open/close helpers
   * ------------------------------------------------------------------ */
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initModalDismiss() {
    $all('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal(overlay);
      });
      var closeBtn = $('.modal-close', overlay);
      if (closeBtn) closeBtn.addEventListener('click', function () { closeModal(overlay); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      $all('.modal-overlay.open').forEach(closeModal);
    });
  }

  /* ------------------------------------------------------------------ *
   * ATOM AI screens gallery modal
   * ------------------------------------------------------------------ */
  function initGalleryModal() {
    var modal = $('#gallery-modal');
    var buttons = $all('.open-gallery-btn');
    if (!modal || !buttons.length) return;

    var mainImg = $('#gallery-main-image', modal);
    var title = $('#gallery-screen-title', modal);
    var counter = $('#gallery-screen-counter', modal);
    var thumbsWrap = $('#gallery-thumbnails', modal);
    var prevBtn = $('#gallery-prev-btn', modal);
    var nextBtn = $('#gallery-next-btn', modal);

    var screens = [];
    var index = 0;

    function render() {
      var screen = screens[index];
      if (!screen) return;
      mainImg.src = screen.image;
      mainImg.alt = screen.title;
      title.textContent = screen.title;
      counter.textContent = (index + 1) + ' of ' + screens.length;

      $all('.gallery-thumb', thumbsWrap).forEach(function (thumb, i) {
        thumb.classList.toggle('active', i === index);
      });
    }

    function buildThumbnails() {
      thumbsWrap.innerHTML = '';
      screens.forEach(function (screen, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gallery-thumb';
        btn.setAttribute('aria-label', screen.title);
        var img = document.createElement('img');
        img.src = screen.image;
        img.alt = '';
        img.loading = 'lazy';
        btn.appendChild(img);
        btn.addEventListener('click', function () {
          index = i;
          render();
        });
        thumbsWrap.appendChild(btn);
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var raw = btn.getAttribute('data-screens');
        try {
          screens = JSON.parse(raw) || [];
        } catch (e) {
          screens = [];
        }
        index = 0;
        if (!screens.length) return;
        buildThumbnails();
        render();
        openModal(modal);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (!screens.length) return;
        index = (index - 1 + screens.length) % screens.length;
        render();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (!screens.length) return;
        index = (index + 1) % screens.length;
        render();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open') || !screens.length) return;
      if (e.key === 'ArrowLeft') { index = (index - 1 + screens.length) % screens.length; render(); }
      if (e.key === 'ArrowRight') { index = (index + 1) % screens.length; render(); }
    });
  }

  /* ------------------------------------------------------------------ *
   * Certificate lightbox modal
   * ------------------------------------------------------------------ */
  function initCertModal() {
    var modal = $('#cert-modal');
    var cards = $all('.cert-card');
    if (!modal || !cards.length) return;

    var issuerEl = $('#cert-modal-issuer', modal);
    var titleEl = $('#cert-modal-title', modal);
    var imgEl = $('#cert-modal-img', modal);
    var dateEl = $('#cert-modal-date', modal);
    var idEl = $('#cert-modal-id', modal);
    var verifyEl = $('#cert-modal-verify', modal);
    var descEl = $('#cert-modal-desc', modal);
    var skillsEl = $('#cert-modal-skills', modal);

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        issuerEl.textContent = card.getAttribute('data-issuer') || '';
        titleEl.textContent = card.getAttribute('data-title') || '';
        imgEl.src = card.getAttribute('data-img') || '';
        imgEl.alt = card.getAttribute('data-title') || 'Certificate';
        dateEl.textContent = card.getAttribute('data-date') || '';
        idEl.textContent = 'ID: ' + (card.getAttribute('data-id') || '');

        var verifyUrl = card.getAttribute('data-verify');
        if (verifyUrl && verifyUrl !== '#') {
          verifyEl.href = verifyUrl;
          verifyEl.style.display = '';
        } else {
          verifyEl.style.display = 'none';
        }

        descEl.textContent = card.getAttribute('data-desc') || '';

        var skills = [];
        try { skills = JSON.parse(card.getAttribute('data-skills') || '[]'); } catch (e) { /* noop */ }
        skillsEl.innerHTML = '';
        skills.forEach(function (skill) {
          var pill = document.createElement('span');
          pill.className = 'project-tag';
          pill.textContent = skill;
          skillsEl.appendChild(pill);
        });

        openModal(modal);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * "Ask about Joshua" AI Q&A modal
   * ------------------------------------------------------------------ */
  function initAiModal() {
    var modal = $('#ai-modal');
    var openBtn = $('#open-ai-modal');
    if (!modal || !openBtn) return;

    var pills = $all('.ai-q-pill', modal);
    var responseEl = $('#ai-response-text', modal);

    openBtn.addEventListener('click', function () {
      openModal(modal);
    });

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        responseEl.textContent = pill.getAttribute('data-answer') || '';
        playTick();
      });
    });
  }

})();
