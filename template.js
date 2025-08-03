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
/* ~~~~ JAVASCRIPT ~~~~ */

// -----------------------------------------------------------
/* ~~~~ RÊGISTER~~~~ */
/* RÊGISTER */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    const fields = [
      document.getElementById('fullname'),
      document.getElementById('email'),
      document.getElementById('password'),
      document.getElementById('confirmPassword'),
      document.getElementById('terms'),
    ];


    // Hata temizleme fonksiyonu
    const clearError = (field) => {
      field.classList.remove('is-invalid');
      const feedback = field.parentElement.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = '';
    };

    // Alan değiştiğinde (kullanıcı yazarken veya seçim yaparken) hatayı temizle
    fields.forEach((field) => {
      const eventType = field.type === 'checkbox' ? 'change' : 'input';
      field.addEventListener(eventType, () => clearError(field));
    });

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Tüm alanları sıfırla
      fields.forEach((f) => clearError(f));

      let hasError = false;

      const fullname = document.getElementById('fullname');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const terms = document.getElementById('terms');

      // Ad Soyad
      if (fullname.value.trim().length < 3) {
        fullname.classList.add('is-invalid');
        fullname.parentElement.querySelector('.invalid-feedback').textContent =
          'Ad Soyad en az 3 karakter olmalıdır.';
        hasError = true;
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add('is-invalid');
        email.parentElement.querySelector('.invalid-feedback').textContent =
          'Geçerli bir e-posta adresi giriniz.';
        hasError = true;
      }

      // Şifre
      if (password.value.trim().length < 6) {
        password.classList.add('is-invalid');
        password.parentElement.querySelector('.invalid-feedback').textContent =
          'Şifre en az 6 karakter olmalıdır.';
        hasError = true;
      }

      // Şifre tekrar
      if (password.value.trim() !== confirmPassword.value.trim()) {
        confirmPassword.classList.add('is-invalid');
        confirmPassword.parentElement.querySelector('.invalid-feedback').textContent =
          'Şifreler eşleşmiyor.';
        hasError = true;
      }

      // Kullanım koşulları
      if (!terms.checked) {
        terms.classList.add('is-invalid');
        terms.parentElement.querySelector('.invalid-feedback').textContent =
          'Kullanım koşullarını kabul etmelisiniz.';
        hasError = true;
      }

      if (!hasError) {
        alert('Kayıt başarılı!');
        registerForm.reset();
      }
    });
  }
});


/* ~~~~ RÊGISTER~~~~ */
/* RÊGISTER */
document.addEventListener('DOMContentLoaded', () => {});

// -----------------------------------------------------------
/* ~~~~ FOOTER YEAR
/* YEAR */
// Arrow Function  ()=>{}
document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  // alert(currentYear);
  // console.log(currentYear);
  const footerDate = document.getElementById('footer_year');
  if (footerDate) {
    footerDate.textContent = ` ${currentYear} ©️ Bütün haklar saklıdır`;
  }
});

// -----------------------------------------------------------
/* ~~~~ JQUERY ~~~~ */
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
/* ~~~~ JQUERY BACKTO_TOP SHOW/HIDE ~~~~ */
/* BACKTO_TOP SHOW/HIDE */
// jquery backto_top davranışını yavaş, göster, gizleme özelliğni  ekleyeceğiz
$(document).ready(function () {
  // backtop id almak
  const backTop = $('#back_top_id');

  // scrollTop mesafesi 80 olduğunda gizle
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 80) {
      backTop.fadeIn(300);
    } else {
      backTop.fadeOut(300);
    }
  }); // end scroll

  // Butona tıklayınca yukarı doğru çok yavaş (linear) kaydır
  backTop.on('click', function (e) {
    e.preventDefault();

    $('html, body').animate(
      { scrollTop: 0 },
      1500, // 1,5 saniyede çok yavaş kayma
      'linear', // sabit hızda yavaş ilerle
      function () {
        // Animasyon bitince butonu gizle
        backTop.fadeOut(300);
      }
    );
  });
});

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
