// Code d'accès (à personnaliser)
const ACCESS_CODE = "1234";

// Données des envies
const wishes = [
    { id: 1, name: "Drone DJI Mavic 3", category: "Technologie", price: 1500, priority: "Haute", link: "#", status: "En attente" },
    { id: 2, name: "Le Prince", category: "Livres", price: 20, priority: "Moyenne", link: "#", status: "Acheté" },
    // Ajoutez d'autres envies ici
];

// Vérifier le code d'accès
function checkAccess() {
    const code = document.getElementById("access-code").value;
    if (code === ACCESS_CODE) {
        document.getElementById("login-modal").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        displayWishes();
    } else {
        alert("Code incorrect !");
    }
}

// Afficher les envies (avec filtres)
function displayWishes() {
    const categoryFilter = document.getElementById("category-filter").value;
    const priceFilter = document.getElementById("price-filter").value;
    const priorityFilter = document.getElementById("priority-filter").value;

    const filteredWishes = wishes.filter(wish => {
        // Filtre par catégorie
        const categoryMatch = (categoryFilter === "all") || (wish.category === categoryFilter);
        // Filtre par prix
        const priceMatch =
            (priceFilter === "all") ||
            (priceFilter === "low" && wish.price < 50) ||
            (priceFilter === "medium" && wish.price >= 50 && wish.price <= 200) ||
            (priceFilter === "high" && wish.price > 200);
        // Filtre par priorité
        const priorityMatch = (priorityFilter === "all") || (wish.priority === priorityFilter);

        return categoryMatch && priceMatch && priorityMatch;
    });

    // Affichage des résultats
    const wishlistElement = document.getElementById("wishlist");
    wishlistElement.innerHTML = "";
    filteredWishes.forEach(wish => {
        const card = document.createElement("div");
        card.className = `wish-card ${wish.category}`;
        card.innerHTML = `
            <h3>${wish.name}</h3>
            <p><strong>Catégorie :</strong> ${wish.category}</p>
            <p><strong>Prix :</strong> ${wish.price}€</p>
            <p><strong>Priorité :</strong> ${wish.priority}</p>
            <p><strong>Statut :</strong> ${wish.status}</p>
            <a href="${wish.link}" target="_blank">Lien</a>
        `;
        wishlistElement.appendChild(card);
    });
}

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
            <h3>${wish.name}</h3>
            <p><strong>Catégorie :</strong> ${wish.category}</p>
            <p><strong>Prix :</strong> ${wish.price}€</p>
        `;
        wishlistElement.appendChild(card);
    });
}


function sortByPrice() {
    wishes.sort((a, b) => a.price - b.price);
    displayWishes(); // Rafraîchit l'affichage
}

// Écouter les changements de filtre
document.getElementById("category-filter").addEventListener("change", displayWishes);
document.getElementById("price-filter").addEventListener("change", displayWishes);
document.getElementById("priority-filter").addEventListener("change", displayWishes);


