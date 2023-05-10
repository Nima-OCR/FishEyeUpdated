const contactButton = document.getElementById("contactButton");

// Fonction pour afficher la fenêtre modale de contact
export function displayModal() {
  console.log("Affichage de la fenêtre modale de contact");
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("tabindex", "-1");
  modal.focus();
}

// Fonction pour fermer la fenêtre modale de contact
export function closeModal() {
  console.log("Fermeture de la fenêtre modale de contact");
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("tabindex", null);
  contactButton.focus();
}
