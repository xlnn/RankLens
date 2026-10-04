const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 520,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "both"
        }
      );

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".feature-grid article, .metrics div, .site-cloud span, .steps li")
  .forEach((el) => observer.observe(el));
