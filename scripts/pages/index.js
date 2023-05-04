    import { photographerFactory } from '../factories/photographer.js';
    import { getPhotographers } from '../utils/photographerAPI.js';



  /**
   Affiche les données des photographes sur la page.
   @async
   @param {Object[]} photographers - Une liste d'objets contenant les informations des photographes à afficher.
   @returns {void}
   */
    async function displayData(photographers) {
      const photographersSection = document.querySelector(".photographer_section");

      console.log('Section pour les photographes récupérée :', photographersSection);

      photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      });
      console.log('Affichage des photographes terminé');
    }

    /**
     Fonction d'initialisation qui récupère et affiche les données des photographes.
     @async
     */
    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    init().then(() => {
      console.log("Initialisation terminée avec succès !");
    }).catch((error) => {
      console.error("Une erreur s'est produite lors de l'initialisation : ", error);
    });

