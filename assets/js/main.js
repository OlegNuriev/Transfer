// 🔹 Контейнер для секций
const sectionsContainer = document.getElementById("sections");

// 🔹 Рендерим секции из данных
sectionsData.forEach((section, index) => {
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("content-block");

  // Вставляем HTML в секцию
  sectionEl.innerHTML = `
    <h2 class="block-title">${section.title}</h2>
    <div class="block-content">
      <div class="text-content">
        ${section.text.map(p => `<p>${p}</p>`).join("")}
        <ul class="features">
          ${section.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
      </div>
      <div class="gallery">
        <div class="gallery-grid">
          ${section.images.map(img => `
            <a href="${img.src}" data-fancybox="gallery${index}" data-caption="${img.caption}">
              <img src="${img.src}" alt="${img.caption}" loading="lazy">
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  sectionsContainer.appendChild(sectionEl);
});

// 🔹 Подключаем Fancybox
Fancybox.bind("[data-fancybox]", {
  Thumbs: false,
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: ["zoomIn", "zoomOut", "toggle1to1"],
      right: ["slideshow", "thumbs", "close"],
    },
  },
  preload: 1, // Предзагружает 1 соседнее изображение
  wheel: "slide", // Прокрутка мышью для навигации
  transition: "slide", // Плавное slide-переключение
});

// 🔹 Анимация появления блоков при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Чтобы анимация была только один раз
    }
  });
}, { threshold: 0.2 });

// Наблюдаем за всеми секциями
document.querySelectorAll(".content-block").forEach(block => {
  observer.observe(block);
});

// 🔹 Кнопка "Наверх" - ОБНОВЛЕННЫЙ КОД
// Ждем полной загрузки DOM, чтобы скрипт точно нашел кнопку
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Получаем кнопку из HTML (не создаем через createElement)
    const scrollButton = document.getElementById('scrollToTop');
    
    // 2. Если кнопка не найдена, выходим
    if (!scrollButton) {
        console.error('Кнопка #scrollToTop не найдена в HTML!');
        return;
    }
    
    // 3. Обработчик клика
    scrollButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 4. Обработчик прокрутки
    window.addEventListener('scroll', function() {
        // Проверяем поддержку pageYOffset для кроссбраузерности
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrolled > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // Инициализация: скрываем кнопку при загрузке
    scrollButton.style.display = 'none';
    
    console.log('Кнопка "Наверх" инициализирована!'); // Для отладки
});