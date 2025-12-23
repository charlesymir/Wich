let wishes = [];

// Charger les données depuis le fichier JSON
fetch('wishlist.json')
    .then(response => response.json())
    .then(data => {
        wishes = data;
        displayWishes();
    })
    .catch(error => console.error('Erreur:', error));

// Afficher les envies
function displayWishes() {
    const categoryFilter = document.getElementById("category-filter").value;
    const priceFilter = document.getElementById("price-filter").value;

    const filteredWishes = wishes.filter(wish => {
        const categoryMatch = (categoryFilter === "all") || (wish.category === categoryFilter);
        const priceMatch =
            (priceFilter === "all") ||
            (priceFilter === "low" && wish.price < 50) ||
            (priceFilter === "medium" && wish.price >= 50 && wish.price <= 200) ||
            (priceFilter === "high" && wish.price > 200);

        return categoryMatch && priceMatch;
    });

    const wishlistElement = document.getElementById("wishlist");
    wishlistElement.innerHTML = "";

    filteredWishes.forEach(wish => {
        const card = document.createElement("div");
        card.className = `wish-card ${wish.category}`;
        card.innerHTML = `
            ${wish.image ? `<img src="${wish.image}" alt="${wish.name}" class="wish-image">` : ''}
            <h3>${wish.name}</h3>
            <p><strong>Catégorie :</strong> ${wish.category}</p>
            <p><strong>Prix :</strong> ${wish.price}€</p>
            <p><strong>Statut :</strong> ${wish.status}</p>
            <a href="${wish.link}" target="_blank">Voir le produit</a>
        `;
        wishlistElement.appendChild(card);
    });
}

// Rechercher des envies
function searchWishes() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filteredWishes = wishes.filter(wish =>
        wish.name.toLowerCase().includes(searchTerm) ||
        wish.category.toLowerCase().includes(searchTerm)
    );

    const wishlistElement = document.getElementById("wishlist");
    wishlistElement.innerHTML = "";

    filteredWishes.forEach(wish => {
        const card = document.createElement("div");
        card.className = `wish-card ${wish.category}`;
        card.innerHTML = `
            ${wish.image ? `<img src="${wish.image}" alt="${wish.name}" class="wish-image">` : ''}
            <h3>${wish.name}</h3>
            <p><strong>Catégorie :</strong> ${wish.category}</p>
            <p><strong>Prix :</strong> ${wish.price}€</p>
        `;
        wishlistElement.appendChild(card);
    });
}
