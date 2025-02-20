document.addEventListener("DOMContentLoaded", function () {
    console.log("Скрипт загружен");

    // === КНОПКИ "ЗАПИСЬ" ===
    function showAlert() {
        alert("Функция записи еще не реализована");
    }

    // Находим все кнопки "Запись" и добавляем обработчик
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

    // === БУРГЕР-МЕНЮ ===
    const burger = document.querySelector(".hamburger-btn");
    const nav = document.querySelector(".nav");

    if (burger && nav) {
        burger.addEventListener("click", function () {
            nav.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (!burger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove("show");
            }
        });
    }

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

    // === ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ ===
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
