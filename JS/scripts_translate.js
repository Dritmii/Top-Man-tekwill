document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.querySelector("#languageSelect");

    // Переводы для разных языков
    const translations = {
        ru: {
            indexTitle: "Top Man Barbershop",
            aboutTitle: "О нас | Барбершоп",
            aboutHeader: "О нас",
            wantLookPerfectHeader: "Хочешь выглядеть безупречно?",
            wantLookPerfectText: "Приглашаем тебя в наш барбершоп! Опытные мастера создадут неповторимый образ, который подчеркнет твою индивидуальность. Современные стрижки, стильная борода, качественные средства для ухода – все это ждет тебя у нас!",
            visitUsHeader: "Посети нас",
            workingHours: "Пн-Пт: 9:00 - 19:00 | Сб-Вс: 9:00 - 17:00",
            ourTeamHeader: "Наша команда",
            teamMemberAlexandr: "Александр",
            teamMemberTopBarber: "Главный барбер",
            teamMemberRadu: "Раду",
            teamMemberBarber: "Барбер",
            teamMemberEkaterina: "Екатерина",
            teamMemberIvan: "Иван",
            teamMemberJuniorBarber: "Младший барбер",
            services: "Услуги",
            contacts: "Контакты",
            address: "Balti, Alexandru cel Bun 40a",
            projectNote: "Сайт сделан в рамках проекта Tekwill",
            slogan: '"Стильный уход для джентльменов"',
            booking: "Запись",
            services: "Услуги",
            haircut: "Стрижка от 200 лей",
            beard: "Оформление бороды от 160 лей",
            waxing: "Ваксинг от 100 лей",
            whyUs: "Почему мы?",
            whyUsText1: "Наши барберы — профессионалы своего дела...",
            whyUsText2: "В нашем барбершопе ты сможешь расслабиться...",
            whyUsText3: "Мы предлагаем не просто стрижки и бритье...",
            whyUsText4: "Мы используем только проверенные средства...",
            whyUsText5: "Каждое посещение — это время для себя...",
        },
        en: {
            indexTitle: "Top Man Barbershop",
            aboutTitle: "About Us | Barbershop",
            aboutHeader: "About Us",
            wantLookPerfectHeader: "Want to look perfect?",
            wantLookPerfectText: "We invite you to our barbershop! Experienced barbers will create a unique look that emphasizes your individuality. Modern haircuts, stylish beard grooming, high-quality care products – all of this awaits you with us!",
            visitUsHeader: "Visit Us",
            workingHours: "Mon-Fri: 9:00 AM - 7:00 PM | Sat-Sun: 9:00 AM - 5:00 PM",
            ourTeamHeader: "Our Team",
            teamMemberAlexandr: "Alexandr",
            teamMemberTopBarber: "Top barber",
            teamMemberRadu: "Radu",
            teamMemberBarber: "Barber",
            teamMemberEkaterina: "Ekaterina",
            teamMemberIvan: "Ivan",
            teamMemberJuniorBarber: "Junior barber",
            services: "Services",
            contacts: "Contacts",
            address: "Balti, Alexandru cel Bun 40a",
            projectNote: "Website created as part of the Tekwill project",
            slogan: '"Stylish care for gentlemen"',
            booking: "Booking",
            services: "Services",
            haircut: "Haircut from 200 lei",
            beard: "Beard trimming from 160 lei",
            waxing: "Waxing from 100 lei",
            whyUs: "Why Us?",
            whyUsText1: "Our barbers are professionals in their field...",
            whyUsText2: "In our barbershop, you can relax...",
            whyUsText3: "We offer not just haircuts and shaves...",
            whyUsText4: "We only use trusted products...",
            whyUsText5: "Every visit is time for yourself..."
        },
        ro: {
            indexTitle: "Top Man Barbershop",
            aboutTitle: "Despre noi | Barbershop",
            aboutHeader: "Despre noi",
            wantLookPerfectHeader: "Vrei să arăți perfect?",
            wantLookPerfectText: "Te invităm la barbershop-ul nostru! Barbierii experimentați vor crea un look unic care îți va sublinia individualitatea. Tunsori moderne, îngrijire stilată a bărbii, produse de calitate – toate astea te așteaptă la noi!",
            visitUsHeader: "Vizitează-ne",
            workingHours: "Luni-Vineri: 9:00 - 19:00 | Sâmbătă-Duminică: 9:00 - 17:00",
            ourTeamHeader: "Echipa noastră",
            teamMemberAlexandr: "Alexandr",
            teamMemberTopBarber: "Barber de top",
            teamMemberRadu: "Radu",
            teamMemberBarber: "Barber",
            teamMemberEkaterina: "Ekaterina",
            teamMemberIvan: "Ivan",
            teamMemberJuniorBarber: "Barber junior",
            services: "Servicii",
            contacts: "Contacte",
            address: "Balti, Alexandru cel Bun 40a",
            projectNote: "Site creat în cadrul proiectului Tekwill",
            slogan: '"Îngrijire stilată pentru bărbați"',
            booking: "Programare",
            services: "Servicii",
            haircut: "Tuns de la 200 lei",
            beard: "Tunsul bărbii de la 160 lei",
            waxing: "Vaksing de la 100 lei",
            whyUs: "De ce noi?",
            whyUsText1: "Barbierii noștri sunt profesioniști în domeniul lor...",
            whyUsText2: "În barbershop-ul nostru poți să te relaxezi...",
            whyUsText3: "Oferim nu doar tunsori și bărbierit...",
            whyUsText4: "Folosim doar produse de încredere...",
            whyUsText5: "Fiecare vizită este timpul tău pentru tine...",
            projectNote: "Site-ul a fost creat în cadrul proiectului Tekwill",
            address: "Balti, Alexandru cel Bun 40a"
        }
    };

    // Функция для изменения языка на странице
    function changeLanguage(event) {
        const lang = event.target.value;
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Обновляем title страницы
        document.title = translations[lang].aboutTitle;
    }

    // Слушатель на изменение языка
    languageSelect.addEventListener("change", changeLanguage);

    // Проверка на наличие сохраненного языка в localStorage
    if (localStorage.getItem("language")) {
        const savedLanguage = localStorage.getItem("language");
        languageSelect.value = savedLanguage;
        changeLanguage({ target: { value: savedLanguage } });
    }

    // Сохранение выбранного языка в localStorage
    languageSelect.addEventListener("change", function() {
        localStorage.setItem("language", languageSelect.value);
    });
});

