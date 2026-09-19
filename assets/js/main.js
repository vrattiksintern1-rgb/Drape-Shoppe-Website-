/* ==========================================================================
   Drape Shoppe — drapeshoppe.co.in
   Vanilla JS, no dependencies, no build step.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — the only block the agency needs to edit day to day.
     ------------------------------------------------------------------ */
  var DS_CONFIG = {

    /* Tracking. Leave empty and nothing loads — no errors, no console noise.
       Open items 11: Meta Pixel ID and GA4 measurement ID from the agency. */
    tracking: {
      metaPixelId: '',        // e.g. '1234567890123456'
      ga4Id: ''               // e.g. 'G-XXXXXXXXXX'
    },

    /* Reviews. Rating and count are NOT hardcoded in the markup — they are
       read from here (spec §5.9). Add review objects to `items` and the
       Reviews section reveals itself automatically.
       Use real Google reviews only. */
    reviews: {
      rating: 4.4,
      count: 35,
      items: [
        // { text: 'Review text, 2 to 3 lines maximum.', name: 'First name', date: 'Month Year' }
      ]
    },

    /* Hero video (spec §8): on mobile we hold the poster and only fetch the
       video when bandwidth looks fine, or after the first interaction. */
    heroVideo: {
      mobileBreakpoint: 767,
      respectSaveData: true
    }
  };

  window.DS_CONFIG = DS_CONFIG;

  var doc = document;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }


  /* ==================================================================
     1. TRACKING — Meta Pixel + GA4
     ================================================================== */

  function loadMetaPixel(id) {
    if (!id) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', id);
    window.fbq('track', 'PageView');
  }

  function loadGA4(id) {
    if (!id) return;
    var s = doc.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    doc.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }

  loadMetaPixel(DS_CONFIG.tracking.metaPixelId);
  loadGA4(DS_CONFIG.tracking.ga4Id);

  function fbTrack(event, params) {
    if (typeof window.fbq === 'function') window.fbq('track', event, params || {});
  }
  function gaTrack(event, params) {
    if (typeof window.gtag === 'function') window.gtag('event', event, params || {});
  }

  /* Delegated CTA tracking. Every CTA carries data-cta, so events are
     labelled without hunting through selectors (spec §10). */
  doc.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-cta]') : null;
    if (!el) return;

    var cta = el.getAttribute('data-cta') || '';
    var category = el.getAttribute('data-category') || '';
    var href = el.getAttribute('href') || '';
    var isWhatsApp = href.indexOf('wa.me') > -1;
    var isCall = href.indexOf('tel:') === 0;
    var isDirections = href.indexOf('maps.app.goo.gl') > -1 || href.indexOf('google.com/maps') > -1;

    if (category) {
      fbTrack('ViewContent', { content_name: category, content_category: 'Collections', source: cta });
      gaTrack('view_item', { item_name: category, cta: cta });
    }

    if (isWhatsApp || isCall) {
      fbTrack('Contact', { section: cta, method: isWhatsApp ? 'whatsapp' : 'call' });
    }

    if (isWhatsApp) gaTrack('whatsapp_click', { cta: cta, category: category || undefined });
    if (isCall) gaTrack('call_click', { cta: cta });
    if (isDirections) gaTrack('directions_click', { cta: cta });
  }, true);


  /* ==================================================================
     2. UTM PASS-THROUGH into the WhatsApp prefill (spec §10)
     ================================================================== */

  function utmSuffix() {
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var stored = {};

    try {
      stored = JSON.parse(sessionStorage.getItem('ds_utm') || '{}');
    } catch (err) { stored = {}; }

    var params = new URLSearchParams(window.location.search);
    var found = false;

    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) { stored[k] = v; found = true; }
    });

    if (found) {
      try { sessionStorage.setItem('ds_utm', JSON.stringify(stored)); } catch (err) { /* ignore */ }
    }

    var parts = keys
      .filter(function (k) { return stored[k]; })
      .map(function (k) { return k.replace('utm_', '') + '=' + stored[k]; });

    return parts.length ? '\n\n(ref: ' + parts.join(', ') + ')' : '';
  }

  function applyUtm() {
    var suffix = utmSuffix();
    if (!suffix) return;

    $$('a[data-wa]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var split = href.split('?text=');
      if (split.length !== 2) return;
      var text = decodeURIComponent(split[1]);
      if (text.indexOf('(ref: ') > -1) return;
      a.setAttribute('href', split[0] + '?text=' + encodeURIComponent(text + suffix));
    });
  }


  /* ==================================================================
     3. STICKY HEADER — solid white after 80px of scroll (spec §5.0)
     ================================================================== */

  var header = $('#siteHeader');
  var scrollTicking = false;

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  }

  /* One class check per frame at most; the fade itself is pure CSS. */
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function () {
      scrollTicking = false;
      onScroll();
    });
  }, { passive: true });
  onScroll();


  /* ==================================================================
     4. MOBILE NAVIGATION
     ================================================================== */

  var navToggle = $('#navToggle');
  var nav = $('#primaryNav');
  var scrim = $('#navScrim');

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    doc.body.classList.toggle('is-locked', open);
    if (scrim) scrim.hidden = !open;
    if (open) header && header.classList.add('is-scrolled');
    else onScroll();
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (scrim) scrim.addEventListener('click', function () { setNav(false); });

  $$('#primaryNav a').forEach(function (a) {
    a.addEventListener('click', function () { setNav(false); });
  });

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
      setNav(false);
      navToggle.focus();
    }
  });


  /* ==================================================================
     5. IMAGE SPACE HOLDING
     Every image already reserves its box in CSS (aspect-ratio) and in
     markup (width/height). If a file is not on the server yet, hide the
     broken-image glyph and leave the reserved space blank.
     ================================================================== */

  function markMissing(img) { img.classList.add('is-missing'); }

  $$('img').forEach(function (img) {
    img.addEventListener('error', function () { markMissing(img); });
    if (img.complete && img.naturalWidth === 0) markMissing(img);
  });


  /* ==================================================================
     6. HERO VIDEO — preload="none" + poster, loaded when sensible
     ================================================================== */

  function initHeroVideo() {
    var video = $('#heroVideo');
    if (!video) return;

    var src = video.getAttribute('data-src');
    if (!src) return;

    if (prefersReducedMotion) return;   // poster only

    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var saveData = !!(conn && conn.saveData);
    var slow = !!(conn && /(^|-)2g$/.test(conn.effectiveType || ''));
    var isMobile = window.matchMedia('(max-width: ' + DS_CONFIG.heroVideo.mobileBreakpoint + 'px)').matches;

    if (DS_CONFIG.heroVideo.respectSaveData && (saveData || slow)) return;   // poster only

    var loaded = false;

    function load() {
      if (loaded) return;
      loaded = true;
      var source = doc.createElement('source');
      source.src = src;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.load();
      var p = video.play();
      if (p && typeof p.catch === 'function') p.catch(function () { /* poster stays */ });
      removeInteractionListeners();
    }

    var events = ['touchstart', 'pointerdown', 'scroll', 'keydown'];
    function removeInteractionListeners() {
      events.forEach(function (ev) { window.removeEventListener(ev, load); });
    }

    if (isMobile) {
      /* Mobile: wait for the first interaction so the poster carries LCP. */
      events.forEach(function (ev) { window.addEventListener(ev, load, { once: true, passive: true }); });
    } else {
      /* Desktop: load once the page has settled. */
      if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 2500 });
      else window.setTimeout(load, 1200);
    }
  }


  /* ==================================================================
     7. LAZY EMBEDS — Google Map + Instagram reel
     ================================================================== */

  function whenVisible(el, cb) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { io.disconnect(); cb(); }
      });
    }, { rootMargin: '300px 0px' });
    io.observe(el);
  }

  function initMap() {
    var frame = $('#mapFrame');
    if (!frame) return;
    whenVisible(frame, function () {
      var iframe = doc.createElement('iframe');
      iframe.src = frame.getAttribute('data-map-src');
      iframe.title = 'Drape Shoppe showroom location on Google Maps';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      frame.appendChild(iframe);
    });
  }

  function initReel() {
    var frame = $('#reelFrame');
    var fallback = $('#reelFallback');
    if (!frame) return;

    /* Drop the placeholder tint as soon as the iframe lands (see CSS). */
    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function () {
        if (frame.querySelector('iframe')) {
          frame.classList.add('is-embedded');
          mo.disconnect();
        }
      });
      mo.observe(frame, { childList: true, subtree: true });
    }

    whenVisible(frame, function () {
      var s = doc.createElement('script');
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';

      s.onerror = showFallback;
      s.onload = function () {
        if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
        /* If the embed has not rendered an iframe in time, fall back to a
           showroom still with a caption (spec §5.4). */
        window.setTimeout(function () {
          if (!frame.querySelector('iframe')) showFallback();
        }, 3500);
      };

      doc.body.appendChild(s);
      window.setTimeout(function () {
        if (!frame.querySelector('iframe') && !window.instgrm) showFallback();
      }, 6000);
    });

    function showFallback() {
      if (!fallback || !fallback.hidden) return;
      var blockquote = frame.querySelector('.instagram-media');
      if (blockquote) blockquote.remove();
      fallback.hidden = false;
      frame.style.minHeight = '0';
    }
  }


  /* ==================================================================
     8. GALLERY LIGHTBOX
     ================================================================== */

  function initLightbox() {
    var lightbox = $('#lightbox');
    var lbImg = $('#lightboxImg');
    var lbCaption = $('#lightboxCaption');
    var btnClose = $('#lightboxClose');
    var btnPrev = $('#lightboxPrev');
    var btnNext = $('#lightboxNext');
    var triggers = $$('.gallery-btn');

    if (!lightbox || !triggers.length) return;

    var slides = triggers.map(function (btn) {
      var img = btn.querySelector('img');
      var caption = btn.querySelector('.gallery-caption');
      return {
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') : '',
        caption: caption ? caption.textContent : ''
      };
    });

    var index = 0;
    var lastFocused = null;

    function show(i) {
      index = (i + slides.length) % slides.length;
      var slide = slides[index];
      lbImg.classList.remove('is-missing');
      lbImg.src = slide.src;
      lbImg.alt = slide.alt;
      lbCaption.textContent = slide.caption;
    }

    function open(i) {
      lastFocused = doc.activeElement;
      show(i);
      lightbox.hidden = false;
      doc.body.classList.add('is-locked');
      btnClose.focus();
    }

    function close() {
      lightbox.hidden = true;
      doc.body.classList.remove('is-locked');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    triggers.forEach(function (btn, i) {
      btn.addEventListener('click', function () { open(i); });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(index - 1); });
    btnNext.addEventListener('click', function () { show(index + 1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    lbImg.addEventListener('error', function () { lbImg.classList.add('is-missing'); });

    doc.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'Tab') {
        /* keep focus inside the dialog */
        var focusables = [btnClose, btnPrev, btnNext];
        var pos = focusables.indexOf(doc.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? pos - 1 : pos + 1;
        focusables[(next + focusables.length) % focusables.length].focus();
      }
    });
  }


  /* ==================================================================
     9. REVIEWS — rendered from DS_CONFIG.reviews
     ================================================================== */

  function initReviews() {
    var cfg = DS_CONFIG.reviews || {};
    var section = $('#reviews');
    var grid = $('#reviewGrid');

    /* Rating is written everywhere it appears, including the hero trust row. */
    $$('[data-rating]').forEach(function (el) { el.textContent = cfg.rating; });
    $$('[data-review-count]').forEach(function (el) { el.textContent = cfg.count; });

    if (!section || !grid) return;

    var items = Array.isArray(cfg.items) ? cfg.items : [];
    if (!items.length) { section.hidden = true; return; }

    grid.innerHTML = '';
    items.forEach(function (review) {
      var li = doc.createElement('li');
      li.className = 'review-card';

      var quote = doc.createElement('blockquote');
      var p = doc.createElement('p');
      p.textContent = '“' + review.text + '”';
      var cite = doc.createElement('cite');
      cite.textContent = '— ' + review.name + ', ' + review.date;

      quote.appendChild(p);
      quote.appendChild(cite);
      li.appendChild(quote);
      grid.appendChild(li);
    });

    section.hidden = false;
  }


  /* ==================================================================
     10. SCROLL REVEAL
     Content fades and rises 12px as it comes into view. Text is revealed
     line by line — each heading, paragraph, quote or list item is its own
     target — never word by word. Only opacity and transform move, so there
     is no layout shift. Anything already on screen at load is left alone
     (the hero has its own CSS load-in), so nothing above the fold is ever
     hidden. Skipped entirely for reduced motion.
     Keep targets un-nested: an element and its parent must not both
     reveal, or the fades compound.
     ================================================================== */

  var REVEAL_TARGETS = [
    /* text, one line/block at a time */
    '.section-head > *',
    '.grid-closing',
    '.story-text > *',
    '.gallery-note',
    '.custom-text > *',
    '.trade-inner > :not(.trade-points)', '.trade-points > li',
    '.reviews-link',
    '.visit-facts > li', '.visit-actions', '.map-note',
    '.footer-grid > *',
    /* cards and media */
    '.collection-grid > .tile',
    '.story-media',
    '.gallery',
    '.custom-media',
    '.steps > .step', '.process-media',
    '.review-grid > .review-card',
    '.visit-media', '.map-frame'
  ].join(',');

  var REVEAL_STEP = 70;       // ms between elements that arrive together
  var REVEAL_MAX_STEPS = 5;   // cap, so a big batch never trails off slowly

  function initReveal() {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    var viewH = window.innerHeight;

    var targets = $$(REVEAL_TARGETS).filter(function (el) {
      if (el.closest('[hidden]')) return false;
      return el.getBoundingClientRect().top > viewH;   // below the fold only
    });

    targets.forEach(function (el) { el.classList.add('reveal'); });

    /* After the reveal, strip the classes so the element's own hover
       transitions (e.g. tile lift) are not slowed by the reveal delay. */
    function settle(el) {
      el.classList.remove('reveal', 'is-visible');
      el.style.removeProperty('--reveal-delay');
    }

    /* The stagger is decided on arrival: everything that enters the
       viewport in the same frame (a heading and its paragraphs, a row of
       tiles) goes in document order, REVEAL_STEP apart. Lines revealed
       one at a time by slow scrolling get no delay at all. */
    var io = new IntersectionObserver(function (entries) {
      var arriving = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .map(function (entry) { return entry.target; })
        .sort(function (a, b) {
          return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        });

      arriving.forEach(function (el, i) {
        io.unobserve(el);
        var delay = Math.min(i, REVEAL_MAX_STEPS) * REVEAL_STEP;
        el.style.setProperty('--reveal-delay', delay + 'ms');
        el.classList.add('is-visible');
        var done = false;
        function finish() { if (!done) { done = true; settle(el); } }
        el.addEventListener('transitionend', function te(e) {
          if (e.target !== el || e.propertyName !== 'opacity') return;
          el.removeEventListener('transitionend', te);
          finish();
        });
        window.setTimeout(finish, delay + 800);   // backstop if transitionend never fires
      });
    /* A fixed 40px inset, not a percentage: content at the very end of the
       page must still be able to cross the line when scrolled to bottom. */
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  }


  /* ==================================================================
     11. COUNT-UP STATS
     [data-count] numbers (hero trust row) count up once when visible.
     The markup holds the real value, so no-JS and reduced-motion users
     simply see the final number. Width is locked first so the row
     beside it never shifts.
     ================================================================== */

  var COUNT_DURATION = 400;   // ms
  /* The hero trust row fades in 240ms after load (see .trust-row in the
     CSS hero load-in), so a count inside the hero waits for it. */
  var HERO_COUNT_DELAY = 240;   // ms

  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length || prefersReducedMotion || !('IntersectionObserver' in window)) return;

    /* Set to zero straight away, while the hero row is still faded out,
       so the number is never seen jumping from its final value to 0. */
    els = els.filter(function (el) {
      var finalText = el.textContent.trim();
      if (isNaN(parseFloat(finalText))) return false;
      el.setAttribute('data-count', finalText);
      el.style.display = 'inline-block';
      el.style.minWidth = el.getBoundingClientRect().width + 'px';
      el.style.textAlign = 'right';
      el.textContent = (0).toFixed((finalText.split('.')[1] || '').length);
      return true;
    });

    function run(el) {
      var finalText = el.getAttribute('data-count');
      var target = parseFloat(finalText);
      var decimals = (finalText.split('.')[1] || '').length;

      var start = null;
      function frame(now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / COUNT_DURATION, 1);
        var eased = 1 - Math.pow(1 - t, 3);   // ease-out cubic
        el.textContent = t < 1 ? (target * eased).toFixed(decimals) : finalText;
        if (t < 1) window.requestAnimationFrame(frame);
      }
      window.setTimeout(function () {
        window.requestAnimationFrame(frame);
      }, el.closest('.hero') ? HERO_COUNT_DELAY : 0);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        run(entry.target);
      });
    }, { threshold: 0.6 });

    els.forEach(function (el) { io.observe(el); });
  }


  /* ==================================================================
     12. BOOT
     ================================================================== */

  applyUtm();
  initHeroVideo();
  initMap();
  initReel();
  initLightbox();
  initReviews();   // before reveal + counters: it renders cards and the rating
  initReveal();
  initCounters();

})();
