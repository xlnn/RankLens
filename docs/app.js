/* RankLens landing — theme switching, nav state, count-up + reveal animations */

(function () {
  "use strict";

  var docEl = document.documentElement;

  /* ---------- theme toggle ---------- */

  var toggle = document.getElementById("themeToggle");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    docEl.dataset.theme = theme;
    try { localStorage.setItem("ranklens-theme", theme); } catch (e) {}
    if (metaTheme) metaTheme.setAttribute("content", theme === "light" ? "#f3f6fd" : "#060a17");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = docEl.dataset.theme === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }

  /* follow system changes when the user has not chosen manually */
  if (window.matchMedia) {
    var media = window.matchMedia("(prefers-color-scheme: light)");
    var onSystemChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem("ranklens-theme"); } catch (err) {}
      if (!saved) applyTheme(e.matches ? "light" : "dark");
    };
    if (media.addEventListener) media.addEventListener("change", onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  /* ---------- frozen animation clock fallback ----------
     A few embedded webviews never advance the animation clock
     (CSS + WAAPI), which would leave animated elements stuck at
     their from-state. Detect it with a throwaway animation and,
     when frozen, add html.no-anim so every element stays visible. */

  (function () {
    var probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;left:-9999px;top:0;width:2px;height:2px;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
    if (typeof probe.animate !== "function") {
      docEl.classList.add("no-anim");
      probe.remove();
      return;
    }
    var anim = probe.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
    setTimeout(function () {
      if (!anim.currentTime || anim.currentTime <= 0) {
        docEl.classList.add("no-anim");
      }
      probe.remove();
    }, 150);
  })();

  /* ---------- nav glass state ---------- */

  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- count-up for metrics ---------- */

  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    if (!isFinite(target) || target === 0) return;
    var suffix = el.dataset.suffix || "";
    var duration = 1300;
    var start = performance.now();

    // setTimeout-stepped (not rAF) so the counter also runs in
    // webviews that throttle requestAnimationFrame.
    function step() {
      var now = performance.now();
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
      if (p < 1) setTimeout(step, 20);
    }
    setTimeout(step, 20);
  }

  /* ---------- reveal animations ----------
     Elements are visible by default; the `.in` class triggers a
     short pop-in (CSS animation, so it is also disabled by the
     no-anim fallback). Sweep on load, then on scroll / resize. */

  var SELECTOR =
    ".feature-grid article, .metrics div, .site-cloud span, .step-card, .cta";
  var pending = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));

  function inView(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.bottom < 0 || rect.top > vh) return false;
    var visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    return visible / Math.max(rect.height, 1) >= 0.15;
  }

  function reveal(el) {
    el.classList.add("in");
    if (el.matches(".metrics div")) {
      var num = el.querySelector("strong[data-count]");
      if (num) animateCount(num);
    }
  }

  function sweep() {
    for (var i = pending.length - 1; i >= 0; i--) {
      if (inView(pending[i])) {
        reveal(pending[i]);
        pending.splice(i, 1);
      }
    }
  }

  window.addEventListener("scroll", sweep, { passive: true });
  window.addEventListener("resize", sweep, { passive: true });
  window.addEventListener("load", sweep);
  setTimeout(sweep, 120);
  setTimeout(sweep, 500);
  sweep();
})();
