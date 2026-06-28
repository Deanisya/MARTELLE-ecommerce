// Фильтрация каталога по категориям: Все / Женское / Мужское / Аксессуары
(function () {
    const chips = document.querySelectorAll(".catalog__filters .chip");
    const cards = document.querySelectorAll("#catalogGrid .product-card");
    const countEl = document.getElementById("catalogCount");

    if (!chips.length || !cards.length) return;

    function plural(n) {
        const d10 = n % 10;
        const d100 = n % 100;
        if (d10 === 1 && d100 !== 11) return n + " товар";
        if (d10 >= 2 && d10 <= 4 && (d100 < 10 || d100 >= 20)) return n + " товара";
        return n + " товаров";
    }

    function applyFilter(filter) {
        let visible = 0;
        cards.forEach((card) => {
            const match = filter === "all" || card.dataset.category === filter;
            card.style.display = match ? "" : "none";
            if (match) visible++;
        });
        if (countEl) countEl.textContent = plural(visible);
    }

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chips.forEach((c) => c.classList.remove("chip--active"));
            chip.classList.add("chip--active");
            applyFilter(chip.dataset.filter);
        });
    });
})();
