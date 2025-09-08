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
              <img src="${img.src}" alt="${img.caption}">
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