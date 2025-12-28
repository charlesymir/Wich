let wishes = [];

// Charger les envies depuis GitHub
fetch('wishlist.json')
    .then(response => response.json())
    .then(data => {
        wishes = data;
        displayAdminWishes();
    });

// Afficher les envies (version admin)
function displayAdminWishes() {
    document.getElementById('admin-wishlist').innerHTML = wishes.map((wish, index) => `
        <div class="wish-card">
            <h3>${wish.name} <button onclick="deleteWish(${index})">Supprimer</button></h3>
            <p>${wish.category} | ${wish.price}€ | ${wish.site}</p>
        </div>
    `).join('');
}

// Ajouter une envie
function addWish() {
    const newWish = {
        name: document.getElementById('wish-name').value,
        category: document.getElementById('wish-category').value,
        price: parseFloat(document.getElementById('wish-price').value),
        site: document.getElementById('wish-site').value,
        link: document.getElementById('wish-link').value,
        image: document.getElementById('wish-image').value
    };
    wishes.push(newWish);
    displayAdminWishes();
    clearForm();
}

// Supprimer une envie
function deleteWish(index) {
    wishes.splice(index, 1);
    displayAdminWishes();
}

// Effacer le formulaire
function clearForm() {
    document.querySelectorAll('.add-wish input').forEach(input => input.value = '');
}

// Sauvegarder sur GitHub (via une URL spéciale)
function saveToGitHub() {
    const token = prompt("Entrez votre token GitHub :");
    if (!token) return;

    fetch(`https://api.github.com/repos/votre-utilisateur/ma-liste-envies/contents/wishlist.json`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Mise à jour de la liste d\'envies',
            content: btoa(JSON.stringify(wishes, null, 2)),
            sha: currentSha // Ajout du SHA pour éviter les conflits
        })
    })
    .then(response => {
        if (!response.ok) throw new Error("Erreur lors de la sauvegarde");
        return response.json();
    })
    .then(data => {
        alert("Sauvegardé avec succès ! La page va recharger les données.");
        // Recharger les données depuis GitHub après la sauvegarde
        fetch('wishlist.json')
            .then(response => response.json())
            .then(updatedWishes => {
                wishes = updatedWishes;
                displayAdminWishes(); // Rafraîchir l'affichage
            });
    })
    .catch(error => {
        console.error("Erreur détaillée :", error);
        alert("Échec de la sauvegarde. Voir la console pour plus de détails.");
    });
}

// Ajoutez cette variable globale pour stocker le SHA du fichier
let currentSha;

// Chargez le SHA lors du chargement initial des données
fetch('wishlist.json')
    .then(response => response.json())
    .then(data => {
        wishes = data;
        displayAdminWishes();
        // Récupérer le SHA du fichier (nécessaire pour les mises à jour)
        return fetch(`https://api.github.com/repos/votre-utilisateur/ma-liste-envies/contents/wishlist.json`);
    })
    .then(response => response.json())
    .then(data => {
        currentSha = data.sha; // Stocker le SHA pour les futures mises à jour
    });
