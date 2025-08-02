// WOW animasyon başlatma
new WOW({
  boxClass: 'wow',
  animateClass: 'animate__animated',
  offset: 0,
  mobile: true,
  live: true,
}).init();

// ScrollSpy başlatma
document.addEventListener('DOMContentLoaded', () => {
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar_second',
    offset: 100,
  });
});


// COUNTERUP2
document.addEventListener("DOMContentLoaded", () => {
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("counted")) {
        counterUp(el, {
          duration: 2000,
          delay: 16,
        });
        el.classList.add("counted");
      }
    });
  };

  const observer = new IntersectionObserver(callback, { threshold: 0.5 });
  document.querySelectorAll(".counter").forEach((counter) => {
    observer.observe(counter);
  });
});
