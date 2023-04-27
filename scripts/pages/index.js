    import { photographerFactory } from '../factories/photographer.js';
    import { getPhotographers } from '../utils/photographerAPI.js';



  /**
   Affiche les données des photographes sur la page.
   @async
   @param {Object[]} photographers - Une liste d'objets contenant les informations des photographes à afficher.
   @returns {void}
   */
    async function displayData(photographers) {
      const photographersSection = document.querySelector(".photographer_section");// L'élément HTML qui va contenir les photographes

      console.log('Section pour les photographes récupérée :', photographersSection);

      photographers.forEach((photographer) => {// Pour chaque photographe dans le tableau
        const photographerModel = photographerFactory(photographer);// Utiliser la fonction photographerFactory pour générer les éléments HTML
        const userCardDOM = photographerModel.getUserCardDOM();// Récupérer les éléments HTML générés pour le photographe
        photographersSection.appendChild(userCardDOM);// Ajouter les éléments HTML au conteneur pour les photographes dans la page
      });
      console.log('Affichage des photographes terminé');
    }

    /**
     Fonction d'initialisation qui récupère et affiche les données des photographes.
     @async
     @returns {void}
     */
    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();

      // Affiche les données des photographes, prend en entrée la liste d'objet de photographes récupérés
        displayData(photographers);
    }

    // Appelle la fonction `init` au chargement de la page pour récupérer et afficher les données des photographes
    init();
