document.addEventListener("DOMContentLoaded", function () {
    console.log("Скрипт загружен");

    // === КНОПКА ЗАПИСИ ===
    const bookingButton = document.querySelector('.hero .btn');
    if (bookingButton) {
        console.log("Кнопка записи найдена");
        bookingButton.addEventListener("click", showAlert);
    } else {
        console.error("Кнопка записи не найдена!");
    }

    function showAlert() {
        const lang = document.documentElement.lang || 'ru';
        if (typeof translations === 'undefined' || !translations[lang]) {
            console.error("Ошибка: объект translations не найден или не поддерживает язык", lang);
            return;
        }
        alert(translations[lang].alerts.booking);
    }

    // === КАРУСЕЛЬ ===
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");

    let index = 0;

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth; // Получаем ширину слайда
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
    } else {
        console.error("Кнопки карусели не найдены!");
    }

    setInterval(nextSlide, 5000); // Автопрокрутка каждые 5 секунд

    function resizeCarousel() {
        const screenWidth = window.innerWidth;
        slides.forEach(slide => {
            const img = slide.querySelector("img");
            img.style.width = screenWidth < 768 ? "100vw" : "300px";
        });
        updateCarousel();
    }

    window.addEventListener("resize", resizeCarousel);
    resizeCarousel();

    // === БУРГЕР-МЕНЮ ===
    const burger = document.querySelector(".hamburger-btn");
    const nav = document.querySelector(".nav");

    if (burger && nav) {
        burger.addEventListener("click", function () {
            nav.classList.toggle("show");
        });
    } else {
        console.error("Бургер-меню не найдено!");
    }

    // === СМЕНА ЯЗЫКА ===
    const languageSelect = document.querySelector("#languageSelect");
    if (languageSelect) {
        languageSelect.addEventListener("change", function () {
            const selectedLanguage = languageSelect.value;
            document.documentElement.lang = selectedLanguage;
            changeLanguage(selectedLanguage);
        });
    } else {
        console.error("Не найден элемент выбора языка!");
    }

    function changeLanguage(language) {
        const translationElements = document.querySelectorAll("[data-translate]");
        translationElements.forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    }
});
