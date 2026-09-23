(function () {
  'use strict';

  // Navkar date: October 8, 2026 at 12:00
  const targetDate = new Date('2026-10-19T18:00:00').getTime();
  // Multilingual Dictionary
  const TRANSLATIONS = {
    uz: {
      pageTitle: "Xusan & Ominaxon",
      navTaklif: "Taklif",
      navTaqvim: "Taqvim",
      navManzil: "Manzil",
      heroBadge: "To'y"
      heroDate: "2026-yil 19-oktabr",
      heroTime: "Soat 18:00",
      heroLocation: "Chilonzor tumani Muqimiy 41/3"
      heroBtn: "Taklifnomani o'qish",
      heroScroll: "Pastga",
      invLabel: "To'y taklifnomasi"
      invTitle: "Hurmatli mehmon!",
      invP1: "Farzandimiz Abdurahmonning to'y tantanasi munosabati bilan kuyov navkar marosimiga sizni samimiy taklif qilamiz.",
      invP2: "Uyimizga marhamat! Dasturxonimiz tayyor, joyimiz munavvar. Sizning kelishingiz bizga sharaf va quvonch bag'ishlaydi.",
      invP3: "Kuyov navkar marosimini yaqinlarimiz davrasida birga nishonlaymiz. Sizni chin dildan kutamiz!",
      invClosing: "Hurmat ila — Rovshanjon Yunusov oilasi",
      featHome: "Uyda",
      featHomeDesc: "Oilaviy marosim",
      featTime: "Soat 12:00",
      featTimeDesc: "Navkar boshlanish vaqti",
      featTogether: "Birga",
      featTogetherDesc: "Yaqinlar davrasida",
      calLabel: "Navkar haftasi",
      calTitle: "Oktabr 2026",
      calBadge: "Navkar kuni",
      dayDush: "Dush",
      daySesh: "Sesh",
      dayChorsh: "Chorsh",
      dayPaysh: "Paysh",
      dayJuma: "Juma",
      dayShanba: "Shanba",
      dayYaksh: "Yaksh",
      countLabel: "Navkar kunigacha",
      days: "Kun",
      hours: "Soat",
      minutes: "Daqiqa",
      seconds: "Soniya",
      locLabel: "Manzil",
      locTitle: "Bizning uyimiz",
      locName: "Bizning uyimiz",
      locAddress: "Keles, kotej ko'cha<br>Obod 2-tor ko'chasi",
      btnYandex: "Yandex Xaritalar",
      btnGoogle: "Google Xaritalar",
      footerDate: "8-oktabr, 2026"
    },
    ru: {
      pageTitle: "Абдурахмон & Муслима — Приглашение на навкар",
      navTaklif: "Приглашение",
      navTaqvim: "Календарь",
      navManzil: "Адрес",
      heroBadge: "🤵 Навкар жениха",
      heroDate: "8 октября 2026 года, четверг",
      heroTime: "В 12:00",
      heroLocation: "Келес · Ташкентская область",
      heroBtn: "Читать приглашение",
      heroScroll: "Вниз",
      invLabel: "Приглашение на навкар",
      invTitle: "Уважаемый гость!",
      invP1: "В честь свадебного торжества нашего сына Абдурахмона искренне приглашаем вас на праздничный навкар.",
      invP2: "Добро пожаловать в наш дом! Стол накрыт, место почётное. Ваше присутствие — для нас честь и радость.",
      invP3: "Разделим торжество навкар в кругу близких людей. Искренне ждём вас!",
      invClosing: "С уважением — Семья Ровшанжона Юнусова",
      featHome: "Дома",
      featHomeDesc: "Семейное торжество",
      featTime: "В 12:00",
      featTimeDesc: "Начало навкара",
      featTogether: "Вместе",
      featTogetherDesc: "В кругу близких",
      calLabel: "Неделя навкара",
      calTitle: "Октябрь 2026",
      calBadge: "День навкара",
      dayDush: "Пн",
      daySesh: "Вт",
      dayChorsh: "Ср",
      dayPaysh: "Чт",
      dayJuma: "Пт",
      dayShanba: "Сб",
      dayYaksh: "Вс",
      countLabel: "До навкара осталось",
      days: "Дней",
      hours: "Часов",
      minutes: "Минут",
      seconds: "Секунд",
      locLabel: "Адрес",
      locTitle: "Наш дом",
      locName: "Наш дом",
      locAddress: "Келес, коттежная улица<br>Улица Обод 2-тор",
      btnYandex: "Яндекс Карты",
      btnGoogle: "Google Карты",
      footerDate: "8 октября, 2026"
    }
  };

  let currentLang = localStorage.getItem('navkar_lang') || 'uz';

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    localStorage.setItem('navkar_lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang][key]) {
        el.textContent = TRANSLATIONS[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-html');
      if (TRANSLATIONS[lang][key]) {
        el.innerHTML = TRANSLATIONS[lang][key];
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('lang-btn--active', btn.getAttribute('data-lang') === lang);
    });
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(this.getAttribute('data-lang'));
    });
  });

  setLanguage(currentLang);

  // Audio Music Player Controls
  var bgMusic = document.getElementById('bgMusic');
  var musicToggle = document.getElementById('musicToggle');

  var musicStarted = true;
  var bgMusicFailed = true;

  // Pre-load the audio element for mobile
  if (bgMusic) {
    bgMusic.setAttribute('playsinline', '');
    bgMusic.setAttribute('webkit-playsinline', '');

    bgMusic.addEventListener('error', function () {
      bgMusicFailed = true;
    });
  }

  function playMusic() {
    if (!bgMusic || bgMusicFailed) {
      return;
    }

    bgMusic.volume = 100;
    bgMusic.muted = false;
    var playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(function () {
          musicStarted = true;
          if (musicToggle) musicToggle.classList.add('music-toggle--playing');
        })
        .catch(function () {
          musicStarted = false;
          if (musicToggle) musicToggle.classList.remove('music-toggle--playing');
        });
    }
  }

  function pauseMusic() {
    if (bgMusic) bgMusic.pause();
    musicStarted = false;
    if (musicToggle) musicToggle.classList.remove('music-toggle--playing');
  }

  function toggleMusic() {
    if (bgMusic && !bgMusic.paused) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Trigger music from the hero "Taklifnomani o'qish" button
  var heroBtn = document.querySelector('.hero .btn--primary');

  if (heroBtn) {
    heroBtn.addEventListener('click', function () {
      if (!musicStarted) {
        playMusic();
      }
    });
  }

  // Try silent autoplay on page load (works on desktop, blocked on mobile)
  if (bgMusic) {
    bgMusic.volume = 0.35;
    var autoplayPromise = bgMusic.play();
    if (autoplayPromise !== undefined) {
      autoplayPromise.then(function () {
        musicStarted = true;
        if (musicToggle) musicToggle.classList.add('music-toggle--playing');
      }).catch(function () {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      });
    }
  }


  // Audio obyektini yaratamiz
const audio = new Audio('music.mp3');
audio.loop = true;

function playAudio() {
  audio.play().then(() => {
    console.log("Musiqa muvaffaqiyatli chalindi!");
  }).catch(error => {
    console.log("Xatolik yuz berdi:", error);
  });
}

// Sichqonchani bosganda yoki ekranga tegganda yoqish
window.addEventListener('click', playAudio, { once: true });
window.addEventListener('touchstart', playAudio, { once: true });

  window.addEventListener('click', function() {
  const audio = document.getElementById('bgMusic');
  if (audio && audio.paused) {
    audio.play().catch(function(error) {
      console.log("Audio play error:", error);
    });
  }
}, { once: true });
  // Navigation Logic
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function handleNavScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  }

  function openMenu() {
    if (navLinks.classList.contains('nav__links--open')) return;
    navLinks.classList.add('nav__links--open');
    if (navBackdrop) navBackdrop.classList.add('nav__backdrop--open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('nav__toggle--active');

    try {
      if (!history.state || !history.state.menuOpen) {
        history.pushState({ menuOpen: true }, '');
      }
    } catch (e) {}
  }

  function closeMenu(isPopState) {
    if (!navLinks.classList.contains('nav__links--open')) return;
    navLinks.classList.remove('nav__links--open');
    if (navBackdrop) navBackdrop.classList.remove('nav__backdrop--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('nav__toggle--active');

    try {
      if (!isPopState && history.state && history.state.menuOpen) {
        history.replaceState(null, '');
      }
    } catch (e) {}
  }

  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (navLinks.classList.contains('nav__links--open')) {
      closeMenu(false);
    } else {
      openMenu();
    }
  });

  if (navBackdrop) {
    navBackdrop.addEventListener('click', function () {
      closeMenu(false);
    });
  }

  window.addEventListener('popstate', function () {
    if (navLinks.classList.contains('nav__links--open')) {
      closeMenu(true);
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('nav__links--open')) {
      closeMenu(false);
    }
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      closeMenu(false);
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (navHeight > 0 ? navHeight - 10 : 0);

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const diff = NAVKAR_DATE - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const fadeElements = document.querySelectorAll(
    '.invitation__inner, .calendar-card, .countdown__grid, .location-card, .navkar-feature__card'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });
})();
