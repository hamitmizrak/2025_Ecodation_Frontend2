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

    // --- Hataları temizleme fonksiyonu ---
    const clearError = (field) => {
      field.classList.remove('is-invalid');
      const feedback = field.parentElement.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = '';
    };

    // Alanlarda değişiklik olduğunda hata mesajını otomatik temizle
    fields.forEach((field) => {
      const eventType = field.type === 'checkbox' ? 'change' : 'input';
      field.addEventListener(eventType, () => clearError(field));
    });

    // Form submit olunca çalışacak ana kısım
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Sayfanın yenilenmesini engelle

      // Önce tüm hataları temizle
      fields.forEach((f) => clearError(f));

      let hasError = false;

      // Alanları yakala
      const fullname = document.getElementById('fullname');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const terms = document.getElementById('terms');

      // --- Validasyon Kontrolleri ---
      if (fullname.value.trim().length < 3) {
        fullname.classList.add('is-invalid');
        fullname.parentElement.querySelector('.invalid-feedback').textContent =
          'Ad Soyad en az 3 karakter olmalıdır.';
        hasError = true;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add('is-invalid');
        email.parentElement.querySelector('.invalid-feedback').textContent =
          'Geçerli bir e-posta adresi giriniz.';
        hasError = true;
      }

      if (password.value.trim().length < 6) {
        password.classList.add('is-invalid');
        password.parentElement.querySelector('.invalid-feedback').textContent =
          'Şifre en az 6 karakter olmalıdır.';
        hasError = true;
      }

      if (password.value.trim() !== confirmPassword.value.trim()) {
        confirmPassword.classList.add('is-invalid');
        confirmPassword.parentElement.querySelector('.invalid-feedback').textContent =
          'Şifreler eşleşmiyor.';
        hasError = true;
      }

      if (!terms.checked) {
        terms.classList.add('is-invalid');
        terms.parentElement.querySelector('.invalid-feedback').textContent =
          'Kullanım koşullarını kabul etmelisiniz.';
        hasError = true;
      }

      // --- Eğer hata yoksa başarılı durumda yapılacaklar ---
      if (!hasError) {
        // Kullanıcı bilgilerini localStorage'a kaydet
        const userData = {
          fullname: fullname.value.trim(),
          email: email.value.trim(),
          password: password.value.trim(), // NOT: Gerçek uygulamada bu şekilde kaydedilmez
        };
        localStorage.setItem('registerData', JSON.stringify(userData));

        // SweetAlert2 popup ile başarı mesajı
        let timerInterval; // Geri sayım için değişken
        Swal.fire({
          position: 'center', // Ortada göster
          title: 'Başarılı!',
          html: 'Kayıt başarılı.<br><b></b> saniye içinde kapanacak.',
          icon: 'success',
          timer: 3000, // 3 saniye
          timerProgressBar: true, // İlerleme çubuğu göster
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            // SweetAlert içindeki <b> etiketini bul
            const content = Swal.getHtmlContainer().querySelector('b');
            // Geri sayımı başlat
            timerInterval = setInterval(() => {
              // Kalan zamanı saniye cinsine çevir ve yaz
              const timeLeft = Math.ceil(Swal.getTimerLeft() / 1000);
              content.textContent = timeLeft;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval); // Timer kapatıldığında interval'i temizle
          },
        }).then(() => {
          // Popup kapanınca register modal'ını kapat
          const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerId'));
          if (registerModal) registerModal.hide();

          // Popup kapanınca login modal'ını aç
          const loginModalElement = document.getElementById('loginId');
          const loginModal = new bootstrap.Modal(loginModalElement);
          loginModal.show();
        });

        // Formu temizle
        registerForm.reset();
      }
    });
  }
});

// -----------------------------------------------------------
/* ~~~~ LOGIN ~~~~ */
/* LOGIN */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  const LOGIN_ATTEMPTS_KEY = 'loginAttempts';
  const REMEMBER_EMAIL_KEY = 'rememberedEmail';

  // Eğer önceden "Beni Hatırla" ile email kaydedildiyse doldur
  const rememberedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
  if (rememberedEmail) {
    document.getElementById('loginEmail').value = rememberedEmail;
    document.getElementById('rememberMe').checked = true;
  }

  const clearError = (field) => {
    field.classList.remove('is-invalid');
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = '';
  };

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberMe = document.getElementById('rememberMe');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Alanlardaki eski hataları temizle
    clearError(emailInput);
    clearError(passwordInput);

    let attempts = parseInt(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0', 10);

    // 3 yanlış girişte kilit
    if (attempts >= 3) {
      Swal.fire({
        icon: 'error',
        title: 'Hesap Kilitli',
        text: '3 defa yanlış giriş yaptınız. Hesabınız kilitlendi!',
        confirmButtonText: 'Tamam',
      });
      return;
    }

    // Kayıtlı kullanıcı bilgileri
    const storedUser = JSON.parse(localStorage.getItem('registerData') || '{}');

    let hasError = false;

    // Alan boş mu?
    if (!email) {
      emailInput.classList.add('is-invalid');
      emailInput.parentElement.querySelector('.invalid-feedback').textContent =
        'Email alanı boş bırakılamaz.';
      hasError = true;
    }

    if (!password) {
      passwordInput.classList.add('is-invalid');
      passwordInput.parentElement.querySelector('.invalid-feedback').textContent =
        'Şifre alanı boş bırakılamaz.';
      hasError = true;
    }

    if (hasError) return;

    // Email ve şifre kontrolü
    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem(LOGIN_ATTEMPTS_KEY, '0'); // Deneme sayısını sıfırla

      // Beni Hatırla seçiliyse email kaydet, değilse sil
      if (rememberMe.checked) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      // SweetAlert ile başarılı giriş bildir
      Swal.fire({
        title: 'Giriş Başarılı',
        icon: 'success',
        html: 'Admin sayfasına yönlendiriliyorsunuz... <br><b></b> saniye içinde',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          const content = Swal.getHtmlContainer().querySelector('b');
          setInterval(() => {
            const timeLeft = Math.ceil(Swal.getTimerLeft() / 1000);
            content.textContent = timeLeft;
          }, 100);
        },
      }).then(() => {
        window.location.href = 'admin/admin.html';
      });

      loginForm.reset();
    } else {
      // Yanlış giriş
      attempts++;
      localStorage.setItem(LOGIN_ATTEMPTS_KEY, attempts.toString());

      const kalan = 3 - attempts;
      const hataMesaji =
        kalan > 0
          ? `Kullanıcı adı veya şifre yanlış. Kalan deneme hakkınız: ${kalan}`
          : '3 defa yanlış giriş yaptınız. Hesabınız kilitlendi!';

      Swal.fire({
        icon: 'error',
        title: 'Giriş Hatalı',
        text: hataMesaji,
        confirmButtonText: 'Tamam',
      });

      passwordInput.classList.add('is-invalid');
      passwordInput.parentElement.querySelector('.invalid-feedback').textContent =
        'Kullanıcı adı veya şifre yanlış.';
    }
  });
});


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
/* ~~~~ Sweet Alert ~~~~ */
/* Sweet Alert */
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

// Kullanımı
Toast.fire({
  icon: 'success',
  title: 'Kayıt başarılı',
});

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
