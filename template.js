//alert("deneme")

// WOW animasyon başlatma
new WOW({
  boxClass: 'wow',
  animateClass: 'animate__animated',
  offset: 0,
  mobile: true,
  live: true,
}).init();

// counterUp2 (CDN ile global window.counterUp)
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((el) => {
    window.counterUp(el, {
      duration: 2000,
      delay: 16,
    });
  });
});
