let wishes = [];
let userSelections = JSON.parse(localStorage.getItem('userSelections')) || {};

// Charger les envies depuis GitHub
fetch('wishlist.json')
    .then(response => response.json())
    .then(data => {
        wishes = data;
        displayWishes();
    });

// Afficher les envies avec cases à cocher
function displayWishes() {
    const wishlistElement = document.getElementById('wishlist');
    wishlistElement.innerHTML = wishes.map(wish => `
        <div class="wish-card">
            <img src="${wish.image}" alt="${wish.name}">
            <h3>${wish.name}</h3>
            <p>${wish.category} | ${wish.price}€ | ${wish.site}</p>
            <a href="${wish.link}" target="_blank">Voir</a>
            <div class="checkbox-container">
                <label>
                    <input type="checkbox" ${userSelections[wish.name] ? 'checked' : ''}
                           onchange="toggleSelection('${wish.name}', this.checked)">
                    Je veux ce produit !
                </label>
            </div>
        </div>
    `).join('');
}

// Sauvegarder la sélection de l'utilisateur
function toggleSelection(wishName, isChecked) {
    userSelections[wishName] = isChecked;
    localStorage.setItem('userSelections', JSON.stringify(userSelections));
}

// Filtrer les envies
function filterWishes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;

    const filteredWishes = wishes.filter(wish =>
        wish.name.toLowerCase().includes(searchTerm) &&
        (categoryFilter === 'all' || wish.category === categoryFilter)
    );
    wishes = filteredWishes;
    displayWishes();
}
