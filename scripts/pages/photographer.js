import { getPhotographers } from '../utils/photographerAPI.js';

// Récupération des paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);

// Récupération du paramètre "id" depuis l'URL
const photographerId = urlParams.get("id");

// Affichage des paramètres récupérés dans la console
console.log("ID du photographe sélectionné :", photographerId);

async function fetchData() {
  const dataFrom = await getPhotographers();

  // Trouver le photographe avec l'ID spécifié et le retourner directement
  return dataFrom.photographers.find(photographer => photographer.id === parseInt(photographerId));
}


fetchData().then((selectedPhotographer) => {
  if (selectedPhotographer) {
    console.log("Photographe sélectionné :", selectedPhotographer);
    console.log("Les données ont été récupérées avec succès.");

    // Afficher le nom du photographe
    const nameElement = document.querySelector('#photographerName');
    nameElement.innerHTML = selectedPhotographer.name;

    // Afficher la localisation du photographe
    const locationElement = document.querySelector('#photographerLocation');
    locationElement.innerHTML = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;

    // Afficher la description du photographe
    const taglineElement = document.querySelector('#photographerTagline');
    taglineElement.innerHTML = selectedPhotographer.tagline;

    // Afficher l'image du photographe
    const imageElement = document.querySelector('#photographerImage');
    imageElement.src = `./assets/photographers/${selectedPhotographer.portrait}`;
    imageElement.alt = selectedPhotographer.name;

    // Récupération du bouton de contact
    const contactButton = document.querySelector('#contactButton');

// Ajout du texte dans le bouton
    contactButton.innerHTML = 'Contactez-moi';

  } else {
    console.error("Aucun photographe ne correspond à l'ID :", photographerId);
  }
})
  .catch((error) => {
    console.error("Une erreur est survenue lors de la récupération des données :", error);
  });

