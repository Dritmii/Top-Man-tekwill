document.addEventListener("DOMContentLoaded", function () {
    // === Меню ===
    const burger = document.querySelector(".hamburger-btn");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav a");
  
    if (burger && nav) {
      burger.addEventListener("click", function (event) {
        event.stopPropagation();
        nav.classList.toggle("show");
      });
  
      document.addEventListener("click", function (event) {
        if (!burger.contains(event.target) && !nav.contains(event.target)) {
          nav.classList.remove("show");
        }
      });
  
      navLinks.forEach((link) => {
        link.addEventListener("click", function () {
          nav.classList.remove("show");
        });
      });
    }
  
    // === Карусель ===
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");
  
    let index = 0;
  
    function updateCarousel() {
      const slideWidth = slides[0]?.offsetWidth || 0;
      if (carousel && slideWidth > 0) {
        carousel.style.transform = `translateX(-${index * slideWidth}px)`;
      }
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
  
    // Автоматическая смена слайдов с задержкой для корректной загрузки элементов
    setTimeout(() => setInterval(nextSlide, 5000), 1000);
    window.addEventListener("resize", updateCarousel);
    setTimeout(updateCarousel, 100);
  
    // === Анимация при прокрутке ===
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
  
  // Добавление класса для header при прокрутке страницы
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  