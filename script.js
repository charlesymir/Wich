// Données initiales (exemple)
let wishes = [
    {
        name: "Cartouche de CO2",
        category: "Airsoft",
        price: 8,
        site: "Gun-Evasion",
        link: "https://air-soft.gun-evasion.com/cartouches-de-co2-12g-powair-tarifs-degressifs.html",
        image: "https://air-soft.gun-evasion.com/upload/image/cartouches-de-co2-12g-powair---tarifs-degressifs-p-image-46130-grande.jpg"
    }
    {
        name: "Cartouche",
        category: "Airsoft",
        price: 8,
        site: "Gun-Evasion",
        link: "https://air-soft.gun-evasion.com/cartouches-de-co2-12g-powair-tarifs-degressifs.html",
        image: "https://air-soft.gun-evasion.com/upload/image/cartouches-de-co2-12g-powair---tarifs-degressifs-p-image-46130-grande.jpg"
    }
];

// Afficher les envies
function displayWishes(wishesToDisplay) {
    const wishlistElement = document.getElementById("wishlist");
    wishlistElement.innerHTML = "";

    wishesToDisplay.forEach(wish => {
        const card = document.createElement("div");
        card.className = `wish-card ${wish.category}`;
        card.innerHTML = `
            <img src="${wish.image}" alt="${wish.name}">
            <h3>${wish.name}</h3>
            <p><strong>Catégorie:</strong> ${wish.category}</p>
            <p><strong>Prix:</strong> ${wish.price}€</p>
            <p><strong>Site:</strong> ${wish.site}</p>
            <a href="${wish.link}" target="_blank">Voir le produit</a>
        `;
        wishlistElement.appendChild(card);
    });
}

// Filtrer les envies
function filterWishes() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const categoryFilter = document.getElementById("category-filter").value;
    const priceFilter = document.getElementById("price-filter").value;
    const siteFilter = document.getElementById("site-filter").value;

    const filteredWishes = wishes.filter(wish => {
        const matchesSearch = wish.name.toLowerCase().includes(searchTerm) ||
                              wish.category.toLowerCase().includes(searchTerm) ||
                              wish.site.toLowerCase().includes(searchTerm);
        const matchesCategory = (categoryFilter === "all") || (wish.category === categoryFilter);
        const matchesPrice = (priceFilter === "all") ||
                             (priceFilter === "low" && wish.price < 50) ||
                             (priceFilter === "medium" && wish.price >= 50 && wish.price <= 200) ||
                             (priceFilter === "high" && wish.price > 200);
        const matchesSite = (siteFilter === "all") || (wish.site === siteFilter);

        return matchesSearch && matchesCategory && matchesPrice && matchesSite;
    });

    displayWishes(filteredWishes);
}

// Trier par prix
function sortByPrice() {
    wishes.sort((a, b) => a.price - b.price);
    filterWishes(); // Réapplique les filtres après le tri
}

// Ajouter une envie
function addWish() {
    const name = document.getElementById("wish-name").value;
    const category = document.getElementById("wish-category").value;
    const price = parseFloat(document.getElementById("wish-price").value);
    const site = document.getElementById("wish-site").value;
    const link = document.getElementById("wish-link").value;
    const image = document.getElementById("wish-image").value;

    if (name && category && price && site) {
        wishes.push({ name, category, price, site, link, image });
        filterWishes(); // Rafraîchit l'affichage
        // Réinitialise le formulaire
        document.getElementById("wish-name").value = "";
        document.getElementById("wish-category").value = "";
        document.getElementById("wish-price").value = "";
        document.getElementById("wish-site").value = "";
        document.getElementById("wish-link").value = "";
        document.getElementById("wish-image").value = "";
    } else {
        alert("Veuillez remplir tous les champs obligatoires (nom, catégorie, prix, site).");
    }
}

// Affichage initial
displayWishes(wishes);

