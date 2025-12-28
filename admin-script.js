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
    const githubSaveUrl = `https://api.github.com/repos/votre-utilisateur/ma-liste-envies/contents/wishlist.json`;
    const token = prompt("Entrez votre token GitHub (nécessaire pour écrire) :");

    fetch(githubSaveUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Mise à jour de la liste d\'envies',
            content: btoa(JSON.stringify(wishes, null, 2))
        })
    })
    .then(response => response.json())
    .then(data => alert("Sauvegardé avec succès !"))
    .catch(error => alert("Erreur : " + error.message));
}
