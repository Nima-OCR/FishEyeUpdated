import {photographerFactory} from "../factories/photographer.js";


    /**
     * Affiche les informations du photographe sélectionné.
     *
     * @param {Object} selectedPhotographer - L'objet photographe à afficher.
     * @param {string} selectedPhotographer.name - Le nom du photographe.
     * @param {string} selectedPhotographer.city - La ville du photographe.
     * @param {string} selectedPhotographer.country - Le pays du photographe.
     * @param {string} selectedPhotographer.tagline - La description du photographe.
     * @param {string} selectedPhotographer.portrait - Le nom du fichier image du photographe.
     */

    export let photographerName = "";

    export function displayPhotographerInfo(selectedPhotographer) {
      const namePhotographer = photographerFactory(selectedPhotographer);



      // Affiche le nom du photographe
      const nameElement = document.querySelector('#photographerName');
      nameElement.innerHTML = selectedPhotographer.name;

      const contactNameElement = document.querySelector('.contact-name');
      contactNameElement.innerHTML = selectedPhotographer.name;


      // Affiche la localisation du photographe
      const locationElement = document.querySelector('#photographerLocation');
      locationElement.innerHTML = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;

      // Affiche la description du photographe
      const taglineElement = document.querySelector('#photographerTagline');
      taglineElement.innerHTML = selectedPhotographer.tagline;

      // Affiche l'image du photographe
      const imageElement = document.querySelector('#photographerImage');
      imageElement.src = `./assets/photographers/${selectedPhotographer.portrait}`;
      imageElement.alt = selectedPhotographer.name;
      imageElement.alt = `${namePhotographer.name}`;


      // Stocke le nom du photographe dans la variable globale
      photographerName = selectedPhotographer.name;
    }

