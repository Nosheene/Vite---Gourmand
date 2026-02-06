// assets/js/menu-filter.js
console.log('menu-filter.js chargé');

document.addEventListener('DOMContentLoaded', function () {
  const norm = v => String(v || '').toLowerCase().trim();

  const allButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const resetBtn = document.getElementById('reset-filters');
  const toggleBtn = document.getElementById('toggle-filters');
  const filtersWrapper = document.querySelector('.filters-wrapper');
  const filtersContent = document.getElementById('filters-content');

  // ne cibler que les .col avec data-category (évite collisions)
  const cols = Array.from(document.querySelectorAll('.row > .col')).filter(c =>
    typeof c.dataset.category !== 'undefined' && String(c.dataset.category).trim() !== ''
  );

  const state = { categories: new Set(), sizes: new Set(), priceMin: null, priceMax: null };

  function readItemData(col) {
    return {
      cats: (col.dataset.category || '').split(/\s+/).map(norm).filter(Boolean),
      price: Number(col.dataset.price || 0) || 0,
      size: norm(col.dataset.size || '')
    };
  }

  function applyFilters() {
    let visible = 0;
    cols.forEach(col => {
      const { cats, price, size } = readItemData(col);
      let ok = true;

      if (state.categories.size > 0) {
        if (!cats.some(c => state.categories.has(c))) ok = false;
      }
      if (state.sizes.size > 0) {
        if (!state.sizes.has(size)) ok = false;
      }
      if (state.priceMin !== null && price < state.priceMin) ok = false;
      if (state.priceMax !== null && price > state.priceMax) ok = false;

      col.classList.toggle('d-none', !ok);
      if (ok) visible++;
    });
    console.log('Filtres appliqués — visibles :', visible);
  }

  function clearGroupVisual(type) {
    allButtons.forEach(b => {
      if ((b.dataset.filterType || '').toLowerCase() === type) b.classList.remove('active');
    });
  }

  function toggleButton(btn) {
    const type = (btn.dataset.filterType || '').toLowerCase();
    const rawVal = btn.dataset.filterValue;
    const value = norm(rawVal);
    if (!type) return;

    if (type === 'category') {
      if (btn.classList.contains('active')) { btn.classList.remove('active'); state.categories.delete(value); }
      else { btn.classList.add('active'); state.categories.add(value); }
    } else if (type === 'size') {
      if (btn.classList.contains('active')) { btn.classList.remove('active'); state.sizes.delete(value); }
      else { btn.classList.add('active'); state.sizes.add(value); }
    } else if (type === 'price-min') {
      const num = Number(rawVal);
      if (state.priceMin === num) { state.priceMin = null; btn.classList.remove('active'); }
      else { clearGroupVisual('price-min'); state.priceMin = num; btn.classList.add('active'); }
    } else if (type === 'price-max') {
      const num = Number(rawVal);
      if (state.priceMax === num) { state.priceMax = null; btn.classList.remove('active'); }
      else { clearGroupVisual('price-max'); state.priceMax = num; btn.classList.add('active'); }
    }
    applyFilters();
  }

  allButtons.forEach(btn => btn.addEventListener('click', function (e) { e.preventDefault(); toggleButton(this); }));

  if (resetBtn) {
    resetBtn.addEventListener('click', function (e) {
      e.preventDefault();
      allButtons.forEach(b => b.classList.remove('active'));
      state.categories.clear(); state.sizes.clear(); state.priceMin = null; state.priceMax = null;
      applyFilters();
    });
  }

  if (toggleBtn && filtersWrapper && filtersContent) {
    toggleBtn.addEventListener('click', function () {
      const collapsed = filtersWrapper.classList.toggle('collapsed');
      toggleBtn.setAttribute('aria-expanded', String(!collapsed));
      toggleBtn.textContent = collapsed ? 'Afficher' : 'Masquer';
      filtersContent.setAttribute('aria-hidden', String(collapsed));
    });
  }

  // initial
  applyFilters();
});