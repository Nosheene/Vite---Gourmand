document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ menu-filters.js chargé !');
  
  // FILTRES - CHANGE ICI 👇
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.menu-card');
  const resetBtns = document.querySelectorAll('#reset-filters');
  
  console.log(`🔍 ${filterBtns.length} boutons, ${cards.length} cartes`);
  
  let activeFilters = {};
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      
      const filterType = this.dataset.filter;
      const filterValue = this.dataset.value;
      
      if (this.classList.contains('active')) {
        activeFilters[filterType] = activeFilters[filterType] || [];
        if (!activeFilters[filterType].includes(filterValue)) {
          activeFilters[filterType].push(filterValue);
        }
      } else {
        activeFilters[filterType] = activeFilters[filterType]?.filter(v => v !== filterValue) || [];
        if (activeFilters[filterType].length === 0) delete activeFilters[filterType];
      }
      
      console.log('🎯 Filtres:', activeFilters);
      applyFilters();
    });
  });
  
  // RESET
  resetBtns.forEach(btn => {
    btn?.addEventListener('click', function(e) {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      activeFilters = {};
      applyFilters();
      console.log('🔄 Réinitialisé');
    });
  });
  
  // RÉTRACTABLE
  const toggleBtn = document.getElementById('toggle-filters');
  const filtersWrapper = document.querySelector('.collapsible-filters');
  if (toggleBtn && filtersWrapper) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      filtersWrapper.classList.toggle('collapsed');
      const icon = this.querySelector('i');
      const span = this.querySelector('span');
      if (filtersWrapper.classList.contains('collapsed')) {
        icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
        span.textContent = 'Afficher';
      } else {
        icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
        span.textContent = 'Masquer';
      }
    });
  }
  
  function applyFilters() {
    cards.forEach(card => {
      let show = true;
      
      if (activeFilters.category && !activeFilters.category.includes(card.dataset.category)) {
        show = false;
      }
      if (activeFilters['price-min']) {
        const minPrice = Math.max(...activeFilters['price-min'].map(p => parseInt(p)));
        if (parseInt(card.dataset.price || 0) < minPrice) show = false;
      }
      if (activeFilters['price-max']) {
        const maxPrice = Math.min(...activeFilters['price-max'].map(p => parseInt(p)));
        if (parseInt(card.dataset.price || 0) > maxPrice) show = false;
      }
      if (activeFilters.size && !activeFilters.size.includes(card.dataset.size)) {
        show = false;
      }
      
      card.style.display = show ? '' : 'none';
    });
    
    const visible = Array.from(cards).filter(c => c.style.display !== 'none').length;
    console.log(`🎯 ${visible} carte(s) visible(s)`);
  }
});
