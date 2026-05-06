const input = document.querySelector("[data-search-input]");
const cards = Array.from(document.querySelectorAll("[data-vessel-card]"));
const emptyState = document.querySelector("[data-empty-state]");

if (input) {
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const matches = card.dataset.searchText.includes(term);
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }
  });
}
