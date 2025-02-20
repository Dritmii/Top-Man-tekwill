document.addEventListener("DOMContentLoaded", function () {
    // Проверка и привязка обработчика для кнопки записи
    const bookingButton = document.querySelector('.hero .btn');
    if (bookingButton) {
        console.log("Кнопка записи найдена");  // Логирование для отладки
        bookingButton.addEventListener("click", showAlert);
    } else {
        console.error("Кнопка записи не найдена!");
    }

    // Функция для отображения алерта
    function showAlert() {
        const lang = document.documentElement.lang || 'ru';
        if (typeof translations === 'undefined' || !translations[lang]) {
            console.error("Ошибка: объект translations не найден или не поддерживает язык", lang);
            return;
        }
        alert(translations[lang].alerts.booking);
    }

    // Инициализация переменных для карусели
    let currentIndex = 0;
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalSlides = items.length || 1;
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    
    // Функция обновления карусели
    function updateCarousel() {
        if (!carousel) {
            console.error("Карусель не найдена!");
            return;
        }
        carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
    
    // Функция для перехода к следующему слайду
    function nextSlide() {
        if (totalSlides === 0) return;
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    // Функция для перехода к предыдущему слайду
    function prevSlide() {
        if (totalSlides === 0) return;
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
     document.addEventListener("DOMContentLoaded", function () {
        const wrapper = document.querySelector(".carousel-wrapper");
        const slides = document.querySelectorAll(".slide");
        let index = 0;
        
        function nextSlide() {
            index = (index + 1) % slides.length;  
            wrapper.style.transform = `translateX(-${index * 300}px)`;
        }

        setInterval(nextSlide, 10000);
    
    // Привязка кнопок управления каруселью
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    } else {
        console.error("Не найдены кнопки управления каруселью!");
    }

    // Функция для обработки выбора языка
    const languageSelect = document.querySelector('#languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function () {
            const selectedLanguage = languageSelect.value;
            document.documentElement.lang = selectedLanguage;
            changeLanguage(selectedLanguage);
        });
    } else {
        console.error("Не найден элемент выбора языка!");
    }

    // Функция для изменения языка
    function changeLanguage(language) {
        const translationElements = document.querySelectorAll('[data-translate]');
        translationElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".hamburger-btn");
    const nav = document.querySelector(".nav");

    burger.addEventListener("click", function () {
        nav.classList.toggle("show");
    });
});
