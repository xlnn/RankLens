/* RankLens landing — theme switching + reveal animations */

(function () {
  "use strict";

  var docEl = document.documentElement;

  /* ---------- theme toggle ---------- */

  var toggle = document.getElementById("themeToggle");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    docEl.dataset.theme = theme;
    try { localStorage.setItem("ranklens-theme", theme); } catch (e) {}
    if (metaTheme) metaTheme.setAttribute("content", theme === "light" ? "#f4f6fc" : "#080c18");
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

  /* ---------- reveal animations ---------- */

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 520, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }
        );
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".feature-grid article, .metrics div, .site-cloud span, .steps li")
    .forEach(function (el) {
      observer.observe(el);
    });
})();
