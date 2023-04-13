// Fonction pour afficher la fenêtre modale de contact
function displayModal() {
    console.log("Affichage de la fenêtre modale de contact");
    const modal = document.getElementById("contact_modal");
	  modal.style.display = "block";
}

// Fonction pour fermer la fenêtre modale de contact
function closeModal() {
    console.log("Fermeture de la fenêtre modale de contact");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
