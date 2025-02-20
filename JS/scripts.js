document.addEventListener("DOMContentLoaded", function () {
    console.log("Скрипт загружен");
  
    const burger = document.querySelector(".hamburger-btn");
    const nav = document.querySelector(".nav");
  
    // Проверка на наличие элементов на странице
    if (burger && nav) {
      // Слушатель нажатия на бургер-меню
      burger.addEventListener("click", function (event) {
        event.stopPropagation(); // Останавливаем всплытие, чтобы не сработал click вне меню
        nav.classList.toggle("show"); // Переключаем класс show
      });
  
      // Закрытие меню при клике вне бургер-меню или навигации
      document.addEventListener("click", function (event) {
        if (!burger.contains(event.target) && !nav.contains(event.target)) {
          nav.classList.remove("show"); // Убираем класс show, если клик не по бургеру или меню
        }
      });
    }
  
    burger.addEventListener("click", function (event) {
        console.log("Бургер кликнут");
        event.stopPropagation(); // Останавливаем всплытие, чтобы не сработал click вне меню
        nav.classList.toggle("show"); // Переключаем класс show
    });
    
    if (burger && nav) {
        burger.addEventListener("click", function (event) {
            event.stopPropagation();
            nav.classList.toggle("show");
            console.log(nav.classList.contains("show") ? "Меню открыто" : "Меню закрыто");
        });
    }
        

    // === КНОПКИ "ЗАПИСЬ" ===
    function showAlert() {
        alert("Функция записи еще не реализована");
    }

    const bookingButtons = document.querySelectorAll(".btn[data-translate='booking']");
    bookingButtons.forEach(button => {
        button.addEventListener("click", showAlert);
    });

    // === КАРУСЕЛЬ ===
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");

    let index = 0;

    function updateCarousel() {
        const slideWidth = slides[0]?.offsetWidth || 0;
        carousel.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", prevSlide);
        nextButton.addEventListener("click", nextSlide);
    }

    setInterval(nextSlide, 5000);
    window.addEventListener("resize", updateCarousel);
    updateCarousel();

    // === СМЕНА ЯЗЫКА ===
    const languageSelect = document.querySelector("#languageSelect");
    if (languageSelect) {
        languageSelect.addEventListener("change", function () {
            const selectedLanguage = languageSelect.value;
            localStorage.setItem("lang", selectedLanguage);
            location.reload();
        });

        const savedLang = localStorage.getItem("lang") || "ru";
        languageSelect.value = savedLang;
    }

    // === АНИМАЦИЯ ПРИ ПРОКРУТКЕ ===
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
});