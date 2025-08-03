/* 
Project name: jquery with web design
- Author  : MsC Hamit Mızrak
- Version : V1.0.0
- Description : 
- Technology  : html5,css3,bootstrap, jquery, JS, TS, +ES5
- Summary     : 
*/

/*
JS Variable
var ==> Global
let,const  ==> Local
*/

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */
// ready :
$(document).ready(function () {
  const searchData = [
    'Adana',
    'Ağrı',
    'Bursa',
    'Bitlis',
    'Denizli',
    'Diyarbakır',
    'Elazığ',
    'Hatay',
    'Sivas',
    'Malatya',
    'Van',
  ];

  $('#search_id').autocomplete({
    source: searchData,
  });
});

// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */
$(document).ready(function () {});

// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */
$(document).ready(function () {});
// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */

// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */

// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */

// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */

// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */

// -----------------------------------------------------------

// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */

// -----------------------------------------------------------
// -----------------------------------------------------------
/* ~~~~ JQUERY SEARCH ~~~~ */
/* SEARCH */

// WOW animasyon başlatma
new WOW({
  boxClass: 'wow',
  animateClass: 'animate__animated',
  offset: 0,
  mobile: true,
  live: true,
}).init();

// -----------------------------------------------------------
/* ~~~~ BOOTSTRAP: SCROLLSPY ~~~~ */
/* SEARCH */

// ScrollSpy başlatma
document.addEventListener('DOMContentLoaded', () => {
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar_second',
    offset: 100,
  });
});

// -----------------------------------------------------------
/* ~~~~ COUNTERUP2 ~~~~ */
/* COUNTERUP2 */

// COUNTERUP2
document.addEventListener('DOMContentLoaded', () => {
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains('counted')) {
        counterUp(el, {
          duration: 2000,
          delay: 16,
        });
        el.classList.add('counted');
      }
    });
  };

  const observer = new IntersectionObserver(callback, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach((counter) => {
    observer.observe(counter);
  });
});
