(function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.menu-card');
  const resetBtn = document.getElementById('reset-filters');
  const toggleBtn = document.getElementById('toggle-filters');
  const filtersWrapper = document.querySelector('.collapsible-filters');
  const filtersContent = document.querySelector('.filters-content');

  const active = {
    category: null,
    'price-min': null,
    'price-max': null,
    size: null
  };

  function applyFilters() {
    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      const cardPrice = Number(card.dataset.price);
      const cardSize = Number(card.dataset.size);

      let visible = true;

      if (active.category && cardCategory !== active.category) {
        visible = false;
      }

      if (active['price-min'] && cardPrice < Number(active['price-min'])) {
        visible = false;
      }

      if (active['price-max'] && cardPrice > Number(active['price-max'])) {
        visible = false;
      }

      if (active.size && cardSize !== Number(active.size)) {
        visible = false;
      }

      card.style.display = visible ? 'block' : 'none';
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.filter;
      const value = btn.dataset.value;

      filterButtons.forEach(b => {
        if (b.dataset.filter === type) {
          b.classList.remove('active');
        }
      });

      if (active[type] === value) {
        active[type] = null;
      } else {
        active[type] = value;
        btn.classList.add('active');
      }

      applyFilters();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      Object.keys(active).forEach(k => (active[k] = null));
      filterButtons.forEach(b => b.classList.remove('active'));
      cards.forEach(card => (card.style.display = 'block'));
    });
  }

  if (toggleBtn && filtersWrapper && filtersContent) {
    toggleBtn.addEventListener('click', () => {
      const collapsed = filtersWrapper.classList.toggle('collapsed');
      const icon = toggleBtn.querySelector('i');
      const text = toggleBtn.querySelector('span');

      filtersContent.style.display = collapsed ? 'none' : 'block';

      if (collapsed) {
        icon.classList.remove('bi-chevron-up');
        icon.classList.add('bi-chevron-down');
        text.textContent = 'Afficher';
      } else {
        icon.classList.remove('bi-chevron-down');
        icon.classList.add('bi-chevron-up');
        text.textContent = 'Masquer';
      }
    });
  }

  applyFilters();
})();
