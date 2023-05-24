import { photographerName } from "./photographerInfos.js";

const contactButton = document.getElementById("contactButton");

const nameElement = document.createElement("p");
nameElement.classList.add("contact-name");

const modal = document.getElementById("contact_modal");
modal.appendChild(nameElement);



// Fonction pour afficher la fenêtre modale de contact
export function displayModal() {
  console.log("Affichage de la fenêtre modale de contact");
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("tabindex", "0");

  const elementsToHide = [document.querySelector("header"), document.querySelector("main"), document.querySelector("aside")];
  elementsToHide.forEach(element => element.setAttribute("aria-hidden", "true"));

  modal.focus();

  // Utilise photographerName pour afficher le nom du photographe
  nameElement.innerHTML = photographerName;
}



// Fonction pour fermer la fenêtre modale de contact
export function closeModal() {
  console.log("Fermeture de la fenêtre modale de contact");
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("tabindex", '0');

  const elementsToUnhide = [document.querySelector("header"), document.querySelector("main"), document.querySelector("aside")];
  elementsToUnhide.forEach(element => element.removeAttribute("aria-hidden"));
  contactButton.focus();
}
