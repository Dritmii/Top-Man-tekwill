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
    
    // Привязка событий для кнопок карусели
    if (prevButton && nextButton) {
        prevButton.addEventListener("click", prevSlide);
        nextButton.addEventListener("click", nextSlide);
    } else {
        console.error("Кнопки карусели не найдены!");
    }
    
    // Настройка автоматического переключения слайдов
    if (totalSlides > 1) {
        setInterval(nextSlide, 10000);
    }

    // Обработчик для плавной прокрутки по ссылкам в навигации
    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.includes("#")) {
                e.preventDefault();
                const targetId = href.substring(1);  // Получаем id из хеша
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,  // Учитываем отступ (можно изменить)
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Функция для смены языка
    function changeLanguage(event) {
        const lang = event.target.value;
        document.documentElement.lang = lang;
        
        if (!translations[lang]) {
            console.error("Язык не найден в translations:", lang);
            return;
        }

        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Привязка обработчика события для кнопок карусели
    document.querySelectorAll(".carousel-item .btn").forEach(button => {
        button.addEventListener("click", showAlert);
    });

    // Привязка обработчика для изменения языка через селект
    document.querySelector('#languageSelect').addEventListener('change', changeLanguage);
});



// Содержимое для разных языков
const languageContent = {
    en: {
        greeting: "Hello, world!",
        description: "This is an example page with language switching."
    },
    ru: {
        greeting: "Привет, мир!",
        description: "Это пример страницы с переключением языка."
    }
};

// Получаем язык из localStorage или устанавливаем по умолчанию 'ru'
let currentLanguage = localStorage.getItem('language') || 'ru';

// Функция для обновления текста на странице
function updateContent() {
    document.getElementById('greeting').textContent = languageContent[currentLanguage].greeting;
    document.getElementById('description').textContent = languageContent[currentLanguage].description;
}

// Функция для переключения языка
document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';  // Меняем язык
    localStorage.setItem('language', currentLanguage);  // Сохраняем язык в localStorage
    updateContent();  // Обновляем контент на странице
});

// Инициализация контента на странице
updateContent();
