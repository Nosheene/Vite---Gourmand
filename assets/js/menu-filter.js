document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ menu-filter.js chargé !');
    
    // Sélection des éléments
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.menu-card');
    const resetBtn = document.getElementById('reset-filters');
    const toggleBtn = document.getElementById('toggle-filters');
    const filtersWrapper = document.querySelector('.collapsible-filters');
    
    console.log(`🔍 Trouvé : ${filterBtns.length} boutons filtres, ${cards.length} cartes`);
    
    // État des filtres actifs
    let activeFilters = {
        category: [],
        'price-min': [],
        'price-max': [],
        size: []
    };
    
    // GESTION DES CLICS SUR LES BOUTONS FILTRES
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔥 Clic sur bouton filtre:', this.dataset.filter, this.dataset.value);
            
            // Toggle de la classe active
            this.classList.toggle('active');
            
            const filterType = this.dataset.filter;
            const filterValue = this.dataset.value;
            
            // Mise à jour des filtres actifs
            if (this.classList.contains('active')) {
                if (!activeFilters[filterType].includes(filterValue)) {
                    activeFilters[filterType].push(filterValue);
                }
            } else {
                activeFilters[filterType] = activeFilters[filterType].filter(v => v !== filterValue);
            }
            
            console.log('📊 Filtres actifs:', activeFilters);
            applyFilters();
        });
    });
    
    // BOUTON RESET
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔄 Reset des filtres');
            
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Vider les filtres actifs
            activeFilters = {
                category: [],
                'price-min': [],
                'price-max': [],
                size: []
            };
            
            // Réafficher toutes les cartes
            applyFilters();
        });
    }
    
    // BOUTON TOGGLE (MASQUER/AFFICHER)
    if (toggleBtn && filtersWrapper) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('👁️ Toggle filtres');
            
            filtersWrapper.classList.toggle('collapsed');
            
            const icon = this.querySelector('i');
            let span = this.querySelector('span');
            
            // Créer le span s'il n'existe pas
            if (!span) {
                span = document.createElement('span');
                this.appendChild(span);
            }
            
            if (filtersWrapper.classList.contains('collapsed')) {
                if (icon) icon.className = 'bi bi-chevron-down';
                span.textContent = 'Afficher';
            } else {
                if (icon) icon.className = 'bi bi-chevron-up';
                span.textContent = 'Masquer';
            }
        });
    }
    
    // FONCTION PRINCIPALE DE FILTRAGE
    function applyFilters() {
        console.log('🎯 Application des filtres...');
        let visibleCount = 0;
        
        cards.forEach(card => {
            let shouldShow = true;
            
            // FILTRE CATÉGORIE
            if (activeFilters.category.length > 0) {
                const cardCategory = card.dataset.category;
                if (!activeFilters.category.includes(cardCategory)) {
                    shouldShow = false;
                }
            }
            
            // FILTRE TAILLE
            if (activeFilters.size.length > 0) {
                const cardSize = card.dataset.size;
                if (!activeFilters.size.includes(cardSize)) {
                    shouldShow = false;
                }
            }
            
            // FILTRE PRIX MIN
            if (activeFilters['price-min'].length > 0) {
                const cardPrice = parseInt(card.dataset.price) || 0;
                const minPrice = Math.max(...activeFilters['price-min'].map(p => parseInt(p)));
                if (cardPrice < minPrice) {
                    shouldShow = false;
                }
            }
            
            // FILTRE PRIX MAX
            if (activeFilters['price-max'].length > 0) {
                const cardPrice = parseInt(card.dataset.price) || 999999;
                const maxPrice = Math.min(...activeFilters['price-max'].map(p => parseInt(p)));
                if (cardPrice > maxPrice) {
                    shouldShow = false;
                }
            }
            
            // Affichage/masquage de la carte
            if (shouldShow) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        console.log(`✅ ${visibleCount} carte(s) visible(s) sur ${cards.length}`);
    }
    
    // Affichage initial de toutes les cartes
    applyFilters();
});
