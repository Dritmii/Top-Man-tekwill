document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.querySelector("#languageSelect");

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
            slogan: '"Стильный уход для джентльменов"',
            booking: "Запись",
            services: "Услуги",
            haircut: "Стрижка",
            beard: "Оформление бороды",
            waxing: "Ваксинг",
            kidsHaircut: "Детская стрижка",
            shaving: "Бритье",
            styling: "Укладка волос",
            whyUs: "Почему мы?",
            whyUsText1: "Наши барберы — профессионалы своего дела...",
            whyUsText2: "В нашем барбершопе ты сможешь расслабиться...",
            whyUsText3: "Мы предлагаем не просто стрижки и бритье...",
            whyUsText4: "Мы используем только проверенные средства...",
            whyUsText5: "Каждое посещение — это время для себя...",
            contacts: "Контакты",
            home: "Главная",
            about: "О нас",
            address: "Balti, Alexandru cel Bun 40a",
            projectNote: "Сайт сделан в рамках проекта Tekwill",
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
            slogan: '"Stylish care for gentlemen"',
            booking: "Booking",
            services: "Services",
            haircut: "Haircut",
            beard: "Beard trimming",
            waxing: "Waxing",
            kidsHaircut: "Children's haircut",
            shaving: "Shaving",
            styling: "Hair styling",
            whyUs: "Why Us?",
            whyUsText1: "Our barbers are professionals in their field...",
            whyUsText2: "In our barbershop, you can relax...",
            whyUsText3: "We offer not just haircuts and shaves...",
            whyUsText4: "We only use trusted products...",
            whyUsText5: "Every visit is time for yourself...",
            contacts: "Contacts",
            home: "Home",
            about: "About us",
            address: "Balti, Alexandru cel Bun 40a",
            projectNote: "Website created as part of the Tekwill project",
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
            slogan: '"Îngrijire stilată pentru bărbați"',
            booking: "Programare",
            services: "Servicii",
            haircut: "Tuns",
            beard: "Tunsul bărbii",
            waxing: "Vaksing",
            kidsHaircut: "Tunsoare pentru copii",
            shaving: "Bărbierit",
            styling: "Coafură",
            whyUs: "De ce noi?",
            whyUsText1: "Barbierii noștri sunt profesioniști în domeniul lor...",
            whyUsText2: "În barbershop-ul nostru poți să te relaxezi...",
            whyUsText3: "Oferim nu doar tunsori și bărbierit...",
            whyUsText4: "Folosim doar produse de încredere...",
            whyUsText5: "Fiecare vizită este timpul tău pentru tine...",
            contacts: "Contacte",
            home: "Principală",
            about: "Despre noi ",
            address: "Balti, Alexandru cel Bun 40a",
            projectNote: "Site-ul a fost creat în cadrul proiectului Tekwill",
        }
    };

    function changeLanguage(event) {
        const lang = event.target.value;
        document.documentElement.lang = lang;
        localStorage.setItem("language", lang);

        document.querySelectorAll("[data-translate]").forEach((element) => {
            const key = element.getAttribute("data-translate");
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Меняем title страницы
        if (translations[lang].indexTitle) {
            document.title = translations[lang].indexTitle;
        }
    }

    // Слушатель на изменение языка
    languageSelect.addEventListener("change", changeLanguage);

    // Проверяем сохраненный язык
    const savedLanguage = localStorage.getItem("language") || "ru";
    languageSelect.value = savedLanguage;
    changeLanguage({ target: { value: savedLanguage } });
});
