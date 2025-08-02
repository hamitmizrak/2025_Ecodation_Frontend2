// template.js
import counterUp from 'counterup2';

// WOW.js başlatma
new WOW({
  boxClass: 'wow',
  animateClass: 'animate__animated',
  offset: 0,
  mobile: true,
  live: true,
}).init();

document.addEventListener('DOMContentLoaded', () => {
  // Sayaç elemanlarını seç
  const counters = document.querySelectorAll('.counter');

  // counterup2 kendi IntersectionObserver'i ile görünür olunca otomatik çalışır
  counters.forEach((el) => {
    counterUp(el, {
      duration: 2000,
      delay: 16,
    });
  });
});
